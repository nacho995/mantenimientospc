using System.Text;
using Backend.Configuration;
using Backend.Models;
using Microsoft.Extensions.Options;
using Resend;

namespace Backend.Services;

/// <summary>
/// Implementación concreta del servicio de email usando Resend SDK.
/// Single Responsibility: solo sabe construir y enviar emails via Resend.
/// Open/Closed: si necesitas otro proveedor, crea otra clase que implemente IEmailService.
/// </summary>
public sealed class ResendEmailService : IEmailService
{
    private readonly IResend _resend;
    private readonly ResendSettings _settings;
    private readonly ILogger<ResendEmailService> _logger;

    public ResendEmailService(
        IResend resend,
        IOptions<ResendSettings> settings,
        ILogger<ResendEmailService> logger)
    {
        _resend = resend;
        _settings = settings.Value;
        _logger = logger;
    }

    public async Task<bool> SendContactNotificationAsync(ContactRequest request, CancellationToken ct = default)
    {
        try
        {
            var message = new EmailMessage
            {
                From = $"{_settings.FromName} <{_settings.FromEmail}>",
                Subject = $"Nuevo contacto web: {Sanitize(request.Nombre)}",
                HtmlBody = BuildHtmlBody(request),
                TextBody = BuildTextBody(request),
            };
            message.To.Add(_settings.ToEmail);

            // ReplyTo para poder responder directamente al cliente
            message.ReplyTo ??= [];
            message.ReplyTo.Add(request.Email.Trim());

            await _resend.EmailSendAsync(message, ct);

            _logger.LogInformation(
                "Email de contacto enviado correctamente. De: {Email}, Nombre: {Nombre}",
                request.Email,
                request.Nombre);

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error al enviar email de contacto. De: {Email}, Nombre: {Nombre}",
                request.Email,
                request.Nombre);

            return false;
        }
    }

    private static string BuildHtmlBody(ContactRequest request)
    {
        var empresa = string.IsNullOrWhiteSpace(request.Empresa) ? "No especificada" : Sanitize(request.Empresa);
        var now = TimeZoneInfo.ConvertTimeFromUtc(
            DateTime.UtcNow,
            TimeZoneInfo.FindSystemTimeZoneById("Europe/Madrid"));

        return $"""
            <!DOCTYPE html>
            <html lang="es">
            <head><meta charset="utf-8"></head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; padding: 32px;">
              <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #0e7490, #06b6d4); padding: 32px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 600;">
                    Nuevo mensaje de contacto
                  </h1>
                  <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">
                    Recibido el {now:dd/MM/yyyy} a las {now:HH:mm}h
                  </p>
                </div>

                <!-- Body -->
                <div style="padding: 32px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; width: 120px; vertical-align: top;">
                        Nombre
                      </td>
                      <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 15px;">
                        {Sanitize(request.Nombre)}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">
                        Email
                      </td>
                      <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 15px;">
                        <a href="mailto:{Sanitize(request.Email)}" style="color: #0e7490; text-decoration: none;">
                          {Sanitize(request.Email)}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">
                        Teléfono
                      </td>
                      <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 15px;">
                        <a href="tel:{Sanitize(request.Telefono)}" style="color: #0e7490; text-decoration: none;">
                          {Sanitize(request.Telefono)}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">
                        Empresa
                      </td>
                      <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 15px;">
                        {empresa}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 16px; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">
                        Mensaje
                      </td>
                      <td style="padding: 12px 16px; color: #1e293b; font-size: 15px; line-height: 1.6;">
                        {Sanitize(request.Mensaje).Replace("\n", "<br>")}
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Footer -->
                <div style="background: #f1f5f9; padding: 20px 32px; text-align: center;">
                  <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                    Este email fue generado automáticamente desde el formulario de contacto de
                    <strong>mantenimientopcmadrid.es</strong>
                  </p>
                </div>
              </div>
            </body>
            </html>
            """;
    }

    private static string BuildTextBody(ContactRequest request)
    {
        var empresa = string.IsNullOrWhiteSpace(request.Empresa) ? "No especificada" : request.Empresa.Trim();
        var now = TimeZoneInfo.ConvertTimeFromUtc(
            DateTime.UtcNow,
            TimeZoneInfo.FindSystemTimeZoneById("Europe/Madrid"));

        var sb = new StringBuilder();
        sb.AppendLine("=== NUEVO MENSAJE DE CONTACTO ===");
        sb.AppendLine($"Recibido: {now:dd/MM/yyyy HH:mm}h");
        sb.AppendLine();
        sb.AppendLine($"Nombre:   {request.Nombre.Trim()}");
        sb.AppendLine($"Email:    {request.Email.Trim()}");
        sb.AppendLine($"Teléfono: {request.Telefono.Trim()}");
        sb.AppendLine($"Empresa:  {empresa}");
        sb.AppendLine();
        sb.AppendLine("--- Mensaje ---");
        sb.AppendLine(request.Mensaje.Trim());
        sb.AppendLine();
        sb.AppendLine("---");
        sb.AppendLine("Enviado desde el formulario de contacto de mantenimientopcmadrid.es");

        return sb.ToString();
    }

    /// <summary>Sanitiza HTML para prevenir XSS en el email.</summary>
    private static string Sanitize(string input)
    {
        return System.Net.WebUtility.HtmlEncode(input.Trim());
    }
}
