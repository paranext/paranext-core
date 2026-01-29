namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for registration status operations including registration code normalization,
/// email validation, and guest status change detection.
/// This is a static service for stateless validation operations.
/// </summary>
public static class RegistrationStatusService
{
    /// <summary>
    /// Normalizes a registration code by converting confusable characters.
    /// Per FB 48040: S->5, I->1, L->1, O->0.
    /// </summary>
    /// <param name="rawCode">The raw registration code to normalize.</param>
    /// <returns>The normalized registration code.</returns>
    public static string NormalizeRegistrationCode(string rawCode)
    {
        if (string.IsNullOrEmpty(rawCode))
            return rawCode;

        // Per FB 48040: Convert confusable characters
        // S->5, I->1, L->1, O->0 (case-insensitive)
        return rawCode
            .Replace('S', '5')
            .Replace('s', '5')
            .Replace('I', '1')
            .Replace('i', '1')
            .Replace('L', '1')
            .Replace('l', '1')
            .Replace('O', '0')
            .Replace('o', '0');
    }

    /// <summary>
    /// Validates an email address and returns the validation result.
    /// </summary>
    /// <param name="email">The email address to validate.</param>
    /// <param name="serverMode">Whether running in server mode (email required).</param>
    /// <returns>The validation result.</returns>
    public static EmailValidationResult ValidateEmail(string email, bool serverMode)
    {
        // Check for empty/null/whitespace
        if (string.IsNullOrWhiteSpace(email))
        {
            return serverMode
                ? EmailValidationResult.EmptyRequireConfirmation
                : EmailValidationResult.Empty;
        }

        // Basic format validation: must contain @ and . after @
        // Also check for invalid patterns
        var atIndex = email.IndexOf('@');
        if (atIndex <= 0) // No @ or @ at start
            return EmailValidationResult.InvalidFormat;

        if (atIndex >= email.Length - 1) // @ at end
            return EmailValidationResult.InvalidFormat;

        var domainPart = email.Substring(atIndex + 1);
        if (!domainPart.Contains('.'))
            return EmailValidationResult.InvalidFormat;

        // Check for spaces (invalid)
        if (email.Contains(' '))
            return EmailValidationResult.InvalidFormat;

        return EmailValidationResult.Valid;
    }

    /// <summary>
    /// Evaluates whether the user's guest status has changed.
    /// </summary>
    /// <param name="wasGuest">Whether the user was previously a guest.</param>
    /// <param name="isGuest">Whether the user is currently a guest.</param>
    /// <returns>The type of user change detected.</returns>
    public static UserChangeType EvaluateGuestStatusChange(bool wasGuest, bool isGuest)
    {
        // If guest status changed (either direction), it's a GuestStatusChange
        if (wasGuest != isGuest)
            return UserChangeType.GuestStatusChange;

        // No change in guest status
        return UserChangeType.NoChange;
    }
}
