namespace Backend.Models;

/// <summary>
/// Error estándar devuelto al frontend.
/// Coincide con el shape { message: string } que api.ts espera.
/// </summary>
public sealed class ApiError
{
    public required string Message { get; init; }
}
