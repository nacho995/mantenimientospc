using Backend.Models;
using Backend.Services;
using Backend.Validators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Backend.Controllers;

/// <summary>
/// Controller para el formulario de contacto.
/// Single Responsibility: orquesta validación + envío de email.
/// No contiene lógica de negocio directa.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public sealed class ContactController : ControllerBase
{
    private readonly IEmailService _emailService;
    private readonly ILogger<ContactController> _logger;

    public ContactController(IEmailService emailService, ILogger<ContactController> logger)
    {
        _emailService = emailService;
        _logger = logger;
    }

    /// <summary>
    /// POST /api/contact
    /// Recibe el formulario de contacto, valida, y envía notificación por email.
    /// </summary>
    [HttpPost]
    [EnableRateLimiting("contact")]
    [ProducesResponseType(typeof(ContactResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status429TooManyRequests)]
    public async Task<IActionResult> Submit(
        [FromBody] ContactRequest request,
        CancellationToken ct)
    {
        // 1. Validación server-side
        var errors = ContactRequestValidator.Validate(request);
        if (errors.Count > 0)
        {
            _logger.LogWarning("Validación fallida: {Errors}", string.Join("; ", errors));
            return BadRequest(new ApiError { Message = errors[0] });
        }

        // 2. Enviar email
        var sent = await _emailService.SendContactNotificationAsync(request, ct);
        if (!sent)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new ApiError { Message = "No se pudo enviar el mensaje. Por favor, inténtalo de nuevo o llámanos directamente." });
        }

        // 3. Respuesta exitosa
        return Ok(new ContactResponse
        {
            Message = "Mensaje enviado correctamente. Nos pondremos en contacto contigo lo antes posible."
        });
    }
}
