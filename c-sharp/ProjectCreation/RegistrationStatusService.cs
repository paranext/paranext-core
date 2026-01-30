namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for registration status operations including registration code normalization,
/// email validation, guest status change detection, and user change evaluation.
/// This is a static service for stateless validation operations.
/// </summary>
public static class RegistrationStatusService
{
    // Registration status message constants (for localization readiness)
    private const string MessageNoTypeSelected =
        "Select a project type to see registration status.";
    private const string MessageInheritsFromBase =
        "This project will share the registration of its base project.";
    private const string MessageNotRegisteredType =
        "This project type does not require registration.";
    private const string MessageRegistered = "This project is registered.";
    private const string MessageCanRegister = "This project is not registered. Click to register.";
    private const string MessageUnregistered = "This project is not registered.";

    /// <summary>
    /// Threshold for showing confirmation dialog when changing user.
    /// Per EXT-B2-003: 5+ affected projects triggers confirmation.
    /// </summary>
    private const int ConfirmationThreshold = 5;

    /// <summary>
    /// Normalizes a registration code by converting confusable characters.
    /// Per FB 48040: S->5, I->1, L->1, O->0.
    /// </summary>
    /// <param name="rawCode">The raw registration code to normalize.</param>
    /// <returns>The normalized registration code, or the original value if null/empty.</returns>
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
    /// <returns>
    /// <see cref="EmailValidationResult.Valid"/> if valid,
    /// <see cref="EmailValidationResult.Empty"/> or <see cref="EmailValidationResult.EmptyRequireConfirmation"/> if empty,
    /// <see cref="EmailValidationResult.InvalidFormat"/> if malformed.
    /// </returns>
    public static EmailValidationResult ValidateEmail(string email, bool serverMode)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            return serverMode
                ? EmailValidationResult.EmptyRequireConfirmation
                : EmailValidationResult.Empty;
        }

        // Basic format validation: must contain @ with content before and after
        var atIndex = email.IndexOf('@');
        if (atIndex <= 0 || atIndex >= email.Length - 1)
            return EmailValidationResult.InvalidFormat;

        // Domain must contain a dot
        var domainPart = email.Substring(atIndex + 1);
        if (!domainPart.Contains('.'))
            return EmailValidationResult.InvalidFormat;

        // No spaces allowed
        if (email.Contains(' '))
            return EmailValidationResult.InvalidFormat;

        return EmailValidationResult.Valid;
    }

    /// <summary>
    /// Evaluates whether the user's guest status has changed.
    /// </summary>
    /// <param name="wasGuest">Whether the user was previously a guest.</param>
    /// <param name="isGuest">Whether the user is currently a guest.</param>
    /// <returns>
    /// <see cref="UserChangeType.GuestStatusChange"/> if guest status changed,
    /// <see cref="UserChangeType.NoChange"/> otherwise.
    /// </returns>
    public static UserChangeType EvaluateGuestStatusChange(bool wasGuest, bool isGuest)
    {
        return wasGuest != isGuest ? UserChangeType.GuestStatusChange : UserChangeType.NoChange;
    }

    /// <summary>
    /// Gets the registration status for a project based on its type and registration state.
    /// Returns UI display information including message type, text, and action flags.
    /// Maps to EXT-009.
    /// </summary>
    /// <param name="request">The registration status request containing project details.</param>
    /// <returns>The registration status result with UI flags.</returns>
    public static Task<RegistrationStatusResult> GetRegistrationStatusAsync(
        RegistrationStatusRequest request
    )
    {
        var result = DetermineRegistrationStatus(request);
        return Task.FromResult(result);
    }

    /// <summary>
    /// Evaluates a user change to determine if commits are required and if confirmation is needed.
    /// Per EXT-B2-003, 5+ affected projects triggers a confirmation dialog.
    /// </summary>
    /// <param name="currentUser">The current user name (unused, reserved for future user comparison).</param>
    /// <param name="newUser">The new user name (unused, reserved for future user comparison).</param>
    /// <param name="commitChanges">Whether to commit changes to projects.</param>
    /// <param name="affectedProjectCount">The number of projects affected by this change.</param>
    /// <returns>The user change evaluation result with commit and confirmation flags.</returns>
    public static UserChangeResult EvaluateUserChange(
        string currentUser,
        string newUser,
        bool commitChanges,
        int affectedProjectCount
    )
    {
        bool showConfirmation = affectedProjectCount >= ConfirmationThreshold;

        string? confirmationMessage = showConfirmation
            ? $"This will affect {affectedProjectCount} projects"
            : null;

        return new UserChangeResult
        {
            RequiresCommit = commitChanges,
            ShowConfirmation = showConfirmation,
            AffectedProjectCount = affectedProjectCount,
            ConfirmationMessage = confirmationMessage,
        };
    }

    /// <summary>
    /// Synchronously determines the registration status based on the request.
    /// Implements the state machine described in EXT-009.
    /// </summary>
    private static RegistrationStatusResult DetermineRegistrationStatus(
        RegistrationStatusRequest request
    )
    {
        // State 1: No project type selected
        if (request.ProjectType is null)
        {
            return new RegistrationStatusResult
            {
                MessageType = RegistrationMessageType.NoTypeSelected,
                MessageText = MessageNoTypeSelected,
                ShowRegisterButton = false,
                ShowManageLink = false,
                ShowOfflineCheckbox = false,
                BlocksCreation = false,
            };
        }

        // State 2: Derived types inherit from base project (DC-002)
        if (InheritsFromBaseProject(request.ProjectType.Value))
        {
            return new RegistrationStatusResult
            {
                MessageType = RegistrationMessageType.InheritsFromBase,
                MessageText = MessageInheritsFromBase,
                ShowRegisterButton = false,
                ShowManageLink = false,
                ShowOfflineCheckbox = false,
                BlocksCreation = false,
            };
        }

        // State 3: Types that don't require registration
        if (request.ProjectType == ProjectType.ConsultantNotes)
        {
            return new RegistrationStatusResult
            {
                MessageType = RegistrationMessageType.NotRegisteredType,
                MessageText = MessageNotRegisteredType,
                ShowRegisterButton = false,
                ShowManageLink = false,
                ShowOfflineCheckbox = false,
                BlocksCreation = false,
            };
        }

        // State 4: Project has a GUID - it's registered (DC-001)
        if (!string.IsNullOrEmpty(request.ProjectGuid))
        {
            return new RegistrationStatusResult
            {
                MessageType = RegistrationMessageType.Registered,
                MessageText = MessageRegistered,
                ShowRegisterButton = false,
                ShowManageLink = true,
                ShowOfflineCheckbox = false,
                BlocksCreation = false,
            };
        }

        // State 5: Unregistered but can register (DC-001)
        if (RequiresOwnRegistration(request.ProjectType.Value))
        {
            return new RegistrationStatusResult
            {
                MessageType = RegistrationMessageType.CanRegister,
                MessageText = MessageCanRegister,
                ShowRegisterButton = true,
                ShowManageLink = false,
                ShowOfflineCheckbox = false,
                BlocksCreation = false,
            };
        }

        // Default: Unregistered state
        return new RegistrationStatusResult
        {
            MessageType = RegistrationMessageType.Unregistered,
            MessageText = MessageUnregistered,
            ShowRegisterButton = false,
            ShowManageLink = false,
            ShowOfflineCheckbox = false,
            BlocksCreation = false,
        };
    }

    /// <summary>
    /// Determines if a project type inherits registration from its base project.
    /// DC-002: BackTranslation, Auxiliary, Transliteration types share base project license.
    /// </summary>
    private static bool InheritsFromBaseProject(ProjectType projectType)
    {
        return projectType switch
        {
            ProjectType.BackTranslation => true,
            ProjectType.Auxiliary => true,
            ProjectType.TransliterationManual => true,
            ProjectType.TransliterationWithEncoder => true,
            _ => false,
        };
    }

    /// <summary>
    /// Determines if a project type requires its own registration.
    /// DC-001: Standard, Daughter, StudyBibleAdditions require own registration.
    /// </summary>
    private static bool RequiresOwnRegistration(ProjectType projectType)
    {
        return projectType switch
        {
            ProjectType.Standard => true,
            ProjectType.Daughter => true,
            ProjectType.StudyBibleAdditions => true,
            _ => false,
        };
    }
}
