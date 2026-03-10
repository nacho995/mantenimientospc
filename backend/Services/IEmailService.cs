using Backend.Models;

namespace Backend.Services;

/// <summary>
/// Abstracción del servicio de email.
/// Dependency Inversion: el Controller depende de esta interfaz,
/// no de Resend directamente. Si mañana cambias a SendGrid, solo
/// creas otra implementación.
/// </summary>
public interface IEmailService
{
    /// <summary>
    /// Envía la notificación del formulario de contacto.
    /// </summary>
    /// <param name="request">Datos del formulario validados.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>True si el envío fue exitoso.</returns>
    Task<bool> SendContactNotificationAsync(ContactRequest request, CancellationToken ct = default);
}
