namespace Backend.Models;

/// <summary>
/// DTO que refleja exactamente lo que envía el frontend.
/// Coincide con ContactPayload de contactService.ts.
/// </summary>
public sealed class ContactRequest
{
    public required string Nombre { get; init; }
    public required string Email { get; init; }
    public required string Telefono { get; init; }
    public string? Empresa { get; init; }
    public required string Mensaje { get; init; }
}
