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
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Nuevo mensaje de contacto</title>
            </head>
            <body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc;padding:24px 12px;">
                <tr>
                  <td align="center">
                    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;border:1px solid #e2e8f0;">
                      <tr>
                        <td style="background-color:#0e7490;padding:28px 24px;text-align:center;border-top-left-radius:8px;border-top-right-radius:8px;">
                          <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;font-family:Arial,Helvetica,sans-serif;">Nuevo mensaje de contacto</h1>
                          <p style="margin:6px 0 0;color:#cffafe;font-size:13px;font-family:Arial,Helvetica,sans-serif;">Recibido el {now:dd/MM/yyyy} a las {now:HH:mm}h</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:24px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,Helvetica,sans-serif;" valign="top">Nombre</td>
                              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#1e293b;font-size:14px;font-family:Arial,Helvetica,sans-serif;" valign="top">{Sanitize(request.Nombre)}</td>
                            </tr>
                            <tr>
                              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,Helvetica,sans-serif;" valign="top">Email</td>
                              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#1e293b;font-size:14px;font-family:Arial,Helvetica,sans-serif;" valign="top"><a href="mailto:{Sanitize(request.Email)}" style="color:#0e7490;text-decoration:none;">{Sanitize(request.Email)}</a></td>
                            </tr>
                            <tr>
                              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,Helvetica,sans-serif;" valign="top">Teléfono</td>
                              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#1e293b;font-size:14px;font-family:Arial,Helvetica,sans-serif;" valign="top"><a href="tel:{Sanitize(request.Telefono)}" style="color:#0e7490;text-decoration:none;">{Sanitize(request.Telefono)}</a></td>
                            </tr>
                            <tr>
                              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,Helvetica,sans-serif;" valign="top">Empresa</td>
                              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#1e293b;font-size:14px;font-family:Arial,Helvetica,sans-serif;" valign="top">{empresa}</td>
                            </tr>
                            <tr>
                              <td style="padding:14px 0 6px;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,Helvetica,sans-serif;" valign="top" colspan="2">Mensaje</td>
                            </tr>
                            <tr>
                              <td style="padding:6px 0 0;color:#1e293b;font-size:14px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;" valign="top" colspan="2">{Sanitize(request.Mensaje).Replace("\n", "<br>")}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="background-color:#f1f5f9;padding:16px 24px;text-align:center;border-bottom-left-radius:8px;border-bottom-right-radius:8px;">
                          <p style="margin:0;color:#94a3b8;font-size:11px;font-family:Arial,Helvetica,sans-serif;">Email generado automáticamente desde el formulario de contacto de <strong>mantenimientospc.com</strong></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """;
    }

    public async Task<bool> SendContactConfirmationAsync(ContactRequest request, CancellationToken ct = default)
    {
        try
        {
            var message = new EmailMessage
            {
                From = $"{_settings.FromName} <{_settings.FromEmail}>",
                Subject = "Hemos recibido tu mensaje - Mantenimiento PC Madrid",
                HtmlBody = BuildConfirmationHtmlBody(request),
                TextBody = BuildConfirmationTextBody(request),
            };
            message.To.Add(request.Email.Trim());

            await _resend.EmailSendAsync(message, ct);

            _logger.LogInformation(
                "Email de confirmación enviado al usuario. Para: {Email}",
                request.Email);

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error al enviar email de confirmación. Para: {Email}",
                request.Email);

            return false;
        }
    }

    private static string BuildConfirmationHtmlBody(ContactRequest request)
    {
        var nombre = Sanitize(request.Nombre);
        return $"""
            <!DOCTYPE html>
            <html lang="es">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Hemos recibido tu mensaje</title>
            </head>
            <body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc;padding:24px 12px;">
                <tr>
                  <td align="center">
                    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;border:1px solid #e2e8f0;">
                      <tr>
                        <td style="background-color:#0e7490;padding:32px 24px;text-align:center;border-top-left-radius:8px;border-top-right-radius:8px;">
                          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;font-family:Arial,Helvetica,sans-serif;">¡Gracias por contactarnos!</h1>
                          <p style="margin:10px 0 0;color:#cffafe;font-size:14px;font-family:Arial,Helvetica,sans-serif;">Hemos recibido tu mensaje correctamente</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:28px 24px;color:#1e293b;font-size:15px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">
                          <p style="margin:0 0 16px;">Hola <strong>{nombre}</strong>,</p>
                          <p style="margin:0 0 16px;">Gracias por ponerte en contacto con <strong>Mantenimiento PC Madrid</strong>. Tu solicitud ha sido recibida correctamente y uno de nuestros técnicos la revisará lo antes posible.</p>
                          <p style="margin:0 0 16px;">Nos pondremos en contacto contigo a la mayor brevedad, normalmente en menos de 24 horas laborables.</p>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;border-radius:6px;margin:20px 0;">
                            <tr>
                              <td style="padding:16px 20px;color:#475569;font-size:13px;font-family:Arial,Helvetica,sans-serif;">
                                <strong style="color:#0e7490;">Resumen de tu mensaje:</strong><br><br>
                                {Sanitize(request.Mensaje).Replace("\n", "<br>")}
                              </td>
                            </tr>
                          </table>
                          <p style="margin:16px 0 0;">Si tu consulta es urgente, también puedes llamarnos directamente al teléfono que aparece en nuestra web.</p>
                          <p style="margin:24px 0 0;color:#64748b;font-size:14px;">Un saludo,<br><strong>El equipo de Mantenimiento PC Madrid</strong></p>
                        </td>
                      </tr>
                      <tr>
                        <td style="background-color:#f1f5f9;padding:16px 24px;text-align:center;border-bottom-left-radius:8px;border-bottom-right-radius:8px;">
                          <p style="margin:0;color:#94a3b8;font-size:11px;font-family:Arial,Helvetica,sans-serif;">Este es un email automático de confirmación. No es necesario que respondas.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """;
    }

    private static string BuildConfirmationTextBody(ContactRequest request)
    {
        var sb = new StringBuilder();
        sb.AppendLine($"Hola {request.Nombre.Trim()},");
        sb.AppendLine();
        sb.AppendLine("Gracias por ponerte en contacto con Mantenimiento PC Madrid.");
        sb.AppendLine("Tu solicitud ha sido recibida correctamente y uno de nuestros");
        sb.AppendLine("técnicos la revisará lo antes posible.");
        sb.AppendLine();
        sb.AppendLine("Nos pondremos en contacto contigo a la mayor brevedad,");
        sb.AppendLine("normalmente en menos de 24 horas laborables.");
        sb.AppendLine();
        sb.AppendLine("--- Resumen de tu mensaje ---");
        sb.AppendLine(request.Mensaje.Trim());
        sb.AppendLine();
        sb.AppendLine("Un saludo,");
        sb.AppendLine("El equipo de Mantenimiento PC Madrid");
        sb.AppendLine();
        sb.AppendLine("---");
        sb.AppendLine("Este es un email automático de confirmación. No es necesario que respondas.");
        return sb.ToString();
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
        sb.AppendLine("Enviado desde el formulario de contacto de mantenimientospc.com");

        return sb.ToString();
    }

    /// <summary>Sanitiza HTML para prevenir XSS en el email.</summary>
    private static string Sanitize(string input)
    {
        return System.Net.WebUtility.HtmlEncode(input.Trim());
    }
}
