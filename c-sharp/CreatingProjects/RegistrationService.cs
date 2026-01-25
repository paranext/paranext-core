namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for project registration state management.
/// Implements EXT-005 (RegistrationStateMachine).
/// </summary>
public static class RegistrationService
{
    /// <summary>
    /// Determines the registration state for a project.
    /// </summary>
    /// <param name="projectType">Current/selected project type</param>
    /// <param name="baseProjectGuid">Base project GUID (if derived type)</param>
    /// <param name="isBaseProjectRegistered">True if base project is registered (if applicable)</param>
    /// <returns>Registration state with available actions</returns>
    /// <remarks>
    /// Implements EXT-005: Registration State Machine
    /// Golden master: gm-005-registration-state
    ///
    /// State determination rules by type:
    /// | Type | State | Can Register |
    /// |------|-------|--------------|
    /// | NotSelected | NotSelected | No |
    /// | Standard | Unregistered/Registered | Yes |
    /// | Daughter | Unregistered/Registered | Yes |
    /// | StudyBibleAdditions | Unregistered/Registered | Yes |
    /// | BackTranslation | InheritsFromBase | Optional override |
    /// | Auxiliary | InheritsFromBase | No |
    /// | TransliterationManual | InheritsFromBase | No |
    /// | TransliterationWithEncoder | InheritsFromBase | No |
    /// | ConsultantNotes | NotApplicable | No |
    /// </remarks>
    public static RegistrationState GetRegistrationState(
        ProjectCreationType projectType,
        string? baseProjectGuid = null,
        bool isBaseProjectRegistered = false
    )
    {
        return projectType switch
        {
            // Not selected - waiting for type selection
            ProjectCreationType.NotSelected => new RegistrationState
            {
                Status = RegistrationStatus.NotSelected,
                MessageKey = "Select project type",
                CanRegisterOnline = false,
                CanOptOutOfInheritance = false,
            },

            // Standard project - requires its own registration
            ProjectCreationType.Standard => new RegistrationState
            {
                Status = RegistrationStatus.Unregistered,
                MessageKey = "Not registered",
                CanRegisterOnline = true,
                CanOptOutOfInheritance = false,
            },

            // Daughter project - requires its own registration (even though derived)
            ProjectCreationType.Daughter => new RegistrationState
            {
                Status = RegistrationStatus.Unregistered,
                MessageKey = "Requires registration",
                CanRegisterOnline = true,
                CanOptOutOfInheritance = false,
            },

            // StudyBibleAdditions - requires its own registration
            ProjectCreationType.StudyBibleAdditions => new RegistrationState
            {
                Status = RegistrationStatus.Unregistered,
                MessageKey = "Requires registration",
                CanRegisterOnline = true,
                CanOptOutOfInheritance = false,
            },

            // BackTranslation - inherits from base, but can opt out
            ProjectCreationType.BackTranslation => GetBackTranslationState(
                baseProjectGuid,
                isBaseProjectRegistered
            ),

            // Auxiliary - inherits from base, no opt out
            ProjectCreationType.Auxiliary => new RegistrationState
            {
                Status = RegistrationStatus.InheritsFromBase,
                MessageKey = "Inherits from base",
                CanRegisterOnline = false,
                CanOptOutOfInheritance = false,
            },

            // TransliterationManual - inherits from base, no opt out
            ProjectCreationType.TransliterationManual => new RegistrationState
            {
                Status = RegistrationStatus.InheritsFromBase,
                MessageKey = "Inherits from base",
                CanRegisterOnline = false,
                CanOptOutOfInheritance = false,
            },

            // TransliterationWithEncoder - inherits from base, no opt out
            ProjectCreationType.TransliterationWithEncoder => new RegistrationState
            {
                Status = RegistrationStatus.InheritsFromBase,
                MessageKey = "Inherits from base",
                CanRegisterOnline = false,
                CanOptOutOfInheritance = false,
            },

            // ConsultantNotes - registration not applicable
            ProjectCreationType.ConsultantNotes => new RegistrationState
            {
                Status = RegistrationStatus.NotApplicable,
                MessageKey = "Not registered (not required)",
                CanRegisterOnline = false,
                CanOptOutOfInheritance = false,
            },

            // Default case (StudyBible, etc.)
            _ => new RegistrationState
            {
                Status = RegistrationStatus.Unregistered,
                MessageKey = "Not registered",
                CanRegisterOnline = true,
                CanOptOutOfInheritance = false,
            },
        };
    }

    /// <summary>
    /// Gets the registration state for BackTranslation projects.
    /// BackTranslation inherits from base but can opt out to register separately.
    /// </summary>
    private static RegistrationState GetBackTranslationState(
        string? baseProjectGuid,
        bool isBaseProjectRegistered
    )
    {
        if (isBaseProjectRegistered)
        {
            return new RegistrationState
            {
                Status = RegistrationStatus.InheritsFromBase,
                MessageKey = "Inherits from base",
                CanRegisterOnline = true, // Can opt out
                CanOptOutOfInheritance = true,
            };
        }
        else
        {
            return new RegistrationState
            {
                Status = RegistrationStatus.InheritsFromBase,
                MessageKey = "Inherits from base",
                CanRegisterOnline = false, // Can't register without base
                CanOptOutOfInheritance = false,
                Warning = "Base not registered",
            };
        }
    }
}
