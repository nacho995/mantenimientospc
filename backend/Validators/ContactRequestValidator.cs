using System.Text.RegularExpressions;
using Backend.Models;

namespace Backend.Validators;

/// <summary>
/// Validación server-side del formulario de contacto.
/// Single Responsibility: solo valida, no sabe nada de HTTP ni email.
/// Replica las mismas reglas que useContactForm.ts en el frontend.
/// </summary>
public static partial class ContactRequestValidator
{
    private static readonly Regex EmailRegex = MyEmailRegex();
    private static readonly Regex PhoneRegex = MyPhoneRegex();

    [GeneratedRegex(@"^[^\s@]+@[^\s@]+\.[^\s@]+$", RegexOptions.Compiled)]
    private static partial Regex MyEmailRegex();

    [GeneratedRegex(@"^[0-9\s\+\-]{6,20}$", RegexOptions.Compiled)]
    private static partial Regex MyPhoneRegex();

    /// <summary>
    /// Valida el request y devuelve una lista de errores.
    /// Lista vacía = válido.
    /// </summary>
    public static List<string> Validate(ContactRequest request)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(request.Nombre))
            errors.Add("El nombre es obligatorio.");
        else if (request.Nombre.Trim().Length < 2)
            errors.Add("El nombre debe tener al menos 2 caracteres.");
        else if (request.Nombre.Trim().Length > 100)
            errors.Add("El nombre no puede superar los 100 caracteres.");

        if (string.IsNullOrWhiteSpace(request.Email))
            errors.Add("El email es obligatorio.");
        else if (!EmailRegex.IsMatch(request.Email.Trim()))
            errors.Add("El formato del email no es válido.");
        else if (request.Email.Trim().Length > 254)
            errors.Add("El email no puede superar los 254 caracteres.");

        if (string.IsNullOrWhiteSpace(request.Telefono))
            errors.Add("El teléfono es obligatorio.");
        else if (!PhoneRegex.IsMatch(request.Telefono.Trim()))
            errors.Add("El formato del teléfono no es válido.");

        if (request.Empresa is not null && request.Empresa.Trim().Length > 200)
            errors.Add("El nombre de empresa no puede superar los 200 caracteres.");

        if (string.IsNullOrWhiteSpace(request.Mensaje))
            errors.Add("El mensaje es obligatorio.");
        else if (request.Mensaje.Trim().Length < 10)
            errors.Add("El mensaje debe tener al menos 10 caracteres.");
        else if (request.Mensaje.Trim().Length > 5000)
            errors.Add("El mensaje no puede superar los 5000 caracteres.");

        return errors;
    }
}
