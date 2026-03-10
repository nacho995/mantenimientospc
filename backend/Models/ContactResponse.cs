namespace Backend.Models;

/// <summary>
/// Respuesta al frontend tras enviar el formulario.
/// Coincide con ContactResponse de contactService.ts.
/// </summary>
public sealed class ContactResponse
{
    public required string Message { get; init; }
}
