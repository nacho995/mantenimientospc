namespace Backend.Configuration;

/// <summary>
/// Configuración tipada para Resend.
/// Se mapea desde la sección "Resend" de appsettings.json.
/// </summary>
public sealed class ResendSettings
{
    public const string SectionName = "Resend";

    /// <summary>API key de Resend (re_xxxxxxxx).</summary>
    public required string ApiKey { get; init; }

    /// <summary>
    /// Dirección "From" para los emails.
    /// Debe ser un dominio verificado en Resend o "onboarding@resend.dev" para testing.
    /// </summary>
    public required string FromEmail { get; init; }

    /// <summary>Nombre que aparece como remitente.</summary>
    public required string FromName { get; init; }

    /// <summary>Email donde se reciben los formularios de contacto.</summary>
    public required string ToEmail { get; init; }
}
