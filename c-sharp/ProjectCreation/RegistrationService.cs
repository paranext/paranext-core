namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for project registration state management.
/// Determines registration requirements based on project type and base project relationships.
///
/// Registration rules by project type:
/// - Standard, Daughter, StudyBibleAdditions: Require own registration
/// - BackTranslation: Inherits from base (can opt out)
/// - Auxiliary, TransliterationManual, TransliterationWithEncoder: Inherit from base (cannot opt out)
/// - ConsultantNotes: Registration not applicable
/// </summary>
internal static class RegistrationService
{
    /// <summary>
    /// Determines the registration state for a project.
    /// </summary>
    /// <param name="projectGuid">Project GUID (null for new projects).</param>
    /// <param name="baseProjectGuid">Base project GUID (if derived type).</param>
    /// <param name="projectType">Current/selected project type name.</param>
    /// <returns>Registration state with status and available actions.</returns>
    /// <remarks>
    /// State determination rules by type:
    /// | Type | State | Can Register | Can Opt Out |
    /// |------|-------|--------------|-------------|
    /// | NotSelected | NotSelected | No | No |
    /// | Standard | Unregistered/Registered | Yes | No |
    /// | Daughter | Unregistered/Registered | Yes | No |
    /// | StudyBibleAdditions | Unregistered/Registered | Yes | No |
    /// | BackTranslation (reg base) | InheritsFromBase | Yes | Yes |
    /// | BackTranslation (unreg base) | InheritsFromBase | No | No |
    /// | Auxiliary | InheritsFromBase | No | No |
    /// | TransliterationManual | InheritsFromBase | No | No |
    /// | TransliterationWithEncoder | InheritsFromBase | No | No |
    /// | ConsultantNotes | NotApplicable | No | No |
    /// </remarks>
    public static RegistrationState GetRegistrationState(
        string? projectGuid,
        string? baseProjectGuid,
        string projectType
    )
    {
        // TODO: Implement registration state determination
        // This is a stub that throws NotImplementedException to ensure tests FAIL (RED state)
        throw new NotImplementedException(
            $"RegistrationService.GetRegistrationState not implemented for type '{projectType}'"
        );
    }

    /// <summary>
    /// Checks if the registry server is available.
    /// </summary>
    /// <returns>True if registry server can be reached.</returns>
    /// <remarks>
    /// Conditions for availability:
    /// - Is default RegistryServer instance
    /// - Client is initialized
    /// - Internet is active
    /// - User has valid registration
    /// </remarks>
    public static bool IsRegistryServerAvailable()
    {
        // TODO: Implement registry server availability check
        // This is a stub that throws NotImplementedException to ensure tests FAIL (RED state)
        throw new NotImplementedException(
            "RegistrationService.IsRegistryServerAvailable not implemented"
        );
    }

    /// <summary>
    /// Initiates online registration for a project.
    /// </summary>
    /// <param name="projectGuid">Project to register.</param>
    /// <returns>URL to open in browser for registration.</returns>
    /// <remarks>
    /// Process:
    /// 1. Encodes project information to Base64
    /// 2. Returns URL to registry.paratext.org with encoded data
    /// 3. Browser registration is handled externally
    /// </remarks>
    public static string InitiateOnlineRegistration(string projectGuid)
    {
        // TODO: Implement online registration initiation
        // This is a stub that throws NotImplementedException to ensure tests FAIL (RED state)
        throw new NotImplementedException(
            $"RegistrationService.InitiateOnlineRegistration not implemented for GUID '{projectGuid}'"
        );
    }
}
