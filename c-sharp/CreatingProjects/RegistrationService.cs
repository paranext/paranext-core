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
        throw new NotImplementedException(
            "EXT-005: GetRegistrationState not yet implemented. "
                + "See extraction-plan.md for implementation details."
        );
    }
}
