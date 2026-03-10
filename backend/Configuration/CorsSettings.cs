namespace Backend.Configuration;

/// <summary>
/// Orígenes CORS permitidos. Se mapea desde la sección "Cors" de appsettings.json.
/// </summary>
public sealed class CorsSettings
{
    public const string SectionName = "Cors";

    /// <summary>Lista de orígenes frontend permitidos.</summary>
    public required string[] AllowedOrigins { get; init; }
}
