namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for registration status operations including registration code normalization,
/// email validation, and guest status change detection.
/// This is a static service for stateless validation operations.
/// </summary>
/// <remarks>
/// STUB: Created for TDD RED phase. All methods throw NotImplementedException.
/// Implementation will be completed by TDD Implementer agent.
/// </remarks>
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
        // TDD RED: This will cause tests to fail
        throw new NotImplementedException("CAP-013: NormalizeRegistrationCode not yet implemented");
    }

    /// <summary>
    /// Validates an email address and returns the validation result.
    /// </summary>
    /// <param name="email">The email address to validate.</param>
    /// <param name="serverMode">Whether running in server mode (email required).</param>
    /// <returns>The validation result.</returns>
    public static EmailValidationResult ValidateEmail(string email, bool serverMode)
    {
        // TDD RED: This will cause tests to fail
        throw new NotImplementedException("CAP-014: ValidateEmail not yet implemented");
    }

    /// <summary>
    /// Evaluates whether the user's guest status has changed.
    /// </summary>
    /// <param name="wasGuest">Whether the user was previously a guest.</param>
    /// <param name="isGuest">Whether the user is currently a guest.</param>
    /// <returns>The type of user change detected.</returns>
    public static UserChangeType EvaluateGuestStatusChange(bool wasGuest, bool isGuest)
    {
        // TDD RED: This will cause tests to fail
        throw new NotImplementedException("CAP-015: EvaluateGuestStatusChange not yet implemented");
    }
}

/// <summary>
/// Enum for user change detection results.
/// Used by EvaluateGuestStatusChange (CAP-015).
/// </summary>
public enum UserChangeType
{
    /// <summary>No change in user status</summary>
    NoChange,

    /// <summary>Regular user change (name, etc.) without guest status change</summary>
    RegularChange,

    /// <summary>Change involving guest status (guest to regular or vice versa)</summary>
    GuestStatusChange,
}
