using System.Threading.RateLimiting;
using Backend.Configuration;
using Backend.Services;
using Resend;

var builder = WebApplication.CreateBuilder(args);

// ───────── Configuration (Options pattern) ─────────
builder.Services.AddOptions();

builder.Services.Configure<ResendSettings>(
    builder.Configuration.GetSection(ResendSettings.SectionName));

builder.Services.Configure<CorsSettings>(
    builder.Configuration.GetSection(CorsSettings.SectionName));

// ───────── Resend SDK (DI as per official docs) ─────────
builder.Services.AddHttpClient<ResendClient>();
builder.Services.Configure<ResendClientOptions>(o =>
{
    o.ApiToken = builder.Configuration
        .GetSection(ResendSettings.SectionName)
        .GetValue<string>("ApiKey") ?? "";
});
builder.Services.AddTransient<IResend, ResendClient>();

// ───────── Application Services ─────────
builder.Services.AddScoped<IEmailService, ResendEmailService>();

// ───────── Controllers + JSON ─────────
builder.Services.AddControllers()
    .AddJsonOptions(opts =>
    {
        opts.JsonSerializerOptions.PropertyNamingPolicy =
            System.Text.Json.JsonNamingPolicy.CamelCase;
    });

// ───────── CORS ─────────
var corsOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? ["http://localhost:5173"];

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins(corsOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ───────── Rate Limiting (anti-spam) ─────────
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    // Límite global por IP: 5 requests por minuto al endpoint de contacto
    options.AddPolicy("contact", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromMinutes(1),
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                QueueLimit = 0,
            }));
});

// ───────── Swagger (Development only) ─────────
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "Mantenimientos PC Madrid API",
        Version = "v1",
        Description = "Backend API para el formulario de contacto",
    });
});

var app = builder.Build();

// ───────── Middleware Pipeline ─────────
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseRateLimiter();

// Health check endpoint
app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }))
    .WithTags("Health");

app.MapControllers();

app.Run();
