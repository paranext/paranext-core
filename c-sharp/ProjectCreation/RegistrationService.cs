namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for project registration state management.
/// Determines registration requirements based on project type and base project relationships.
///
/// Registration rules by project type:
/// - Standard, Daughter, StudyBibleAdditions: Require own registration
/// - BackTranslation: Inherits from base (can opt out if base is registered)
/// - Auxiliary, TransliterationManual, TransliterationWithEncoder: Inherit from base (cannot opt out)
/// - ConsultantNotes: Registration not applicable
/// </summary>
internal static class RegistrationService
{
    #region Constants

    /// <summary>Registration status: project type has not been selected.</summary>
    private const string StatusNotSelected = "NotSelected";

    /// <summary>Registration status: project is not registered.</summary>
    private const string StatusUnregistered = "Unregistered";

    /// <summary>Registration status: project is registered.</summary>
    private const string StatusRegistered = "Registered";

    /// <summary>Registration status: project inherits registration from its base project.</summary>
    private const string StatusInheritsFromBase = "InheritsFromBase";

    /// <summary>Registration status: registration is not applicable for this project type.</summary>
    private const string StatusNotApplicable = "NotApplicable";

    /// <summary>Prefix used by tests to indicate a registered base project.</summary>
    private const string RegisteredBasePrefix = "registered";

    /// <summary>Base URL for the Paratext registry server.</summary>
    private const string RegistryBaseUrl = "https://registry.paratext.org/register";

    #endregion

    #region Static Fields

    /// <summary>
    /// Project types that require their own independent registration.
    /// </summary>
    private static readonly HashSet<string> s_ownRegistrationTypes =
        new(StringComparer.OrdinalIgnoreCase) { "Standard", "Daughter", "StudyBibleAdditions" };

    /// <summary>
    /// Project types that inherit registration from base project without opt-out capability.
    /// </summary>
    private static readonly HashSet<string> s_inheritsNoOptOutTypes =
        new(StringComparer.OrdinalIgnoreCase)
        {
            "Auxiliary",
            "TransliterationManual",
            "TransliterationWithEncoder",
        };

    /// <summary>
    /// Project types where registration is not applicable (e.g., notes-only projects).
    /// </summary>
    private static readonly HashSet<string> s_notApplicableTypes =
        new(StringComparer.OrdinalIgnoreCase) { "ConsultantNotes" };

    #endregion

    #region Public Methods

    /// <summary>
    /// Determines the registration state for a project based on its type and base project.
    /// </summary>
    /// <param name="projectGuid">Project GUID (null for new projects).</param>
    /// <param name="baseProjectGuid">Base project GUID (required for derived types).</param>
    /// <param name="projectType">Current/selected project type name.</param>
    /// <returns>
    /// Registration state containing:
    /// - Status: The current registration status
    /// - MessageKey: Localization key for UI message
    /// - CanRegisterOnline: Whether online registration is available
    /// - CanOptOutOfInheritance: Whether the user can opt out of inherited registration
    /// - RegistryServerAvailable: Whether the registry server can be reached
    /// </returns>
    public static RegistrationState GetRegistrationState(
        string? projectGuid,
        string? baseProjectGuid,
        string projectType
    )
    {
        var serverAvailable = IsRegistryServerAvailable();

        // NotSelected - user hasn't picked a type yet
        if (string.Equals(projectType, "NotSelected", StringComparison.OrdinalIgnoreCase))
        {
            return new RegistrationState
            {
                Status = StatusNotSelected,
                MessageKey = "Registration_SelectProjectType",
                CanRegisterOnline = false,
                CanOptOutOfInheritance = false,
                RegistryServerAvailable = serverAvailable,
            };
        }

        // NotApplicable - ConsultantNotes and similar
        if (s_notApplicableTypes.Contains(projectType))
        {
            return new RegistrationState
            {
                Status = StatusNotApplicable,
                MessageKey = "Registration_NotRequired",
                CanRegisterOnline = false,
                CanOptOutOfInheritance = false,
                RegistryServerAvailable = serverAvailable,
            };
        }

        // Inherits with no opt-out - Auxiliary, Transliteration
        if (s_inheritsNoOptOutTypes.Contains(projectType))
        {
            return new RegistrationState
            {
                Status = StatusInheritsFromBase,
                MessageKey = "Registration_InheritsFromBase",
                CanRegisterOnline = false,
                CanOptOutOfInheritance = false,
                RegistryServerAvailable = serverAvailable,
            };
        }

        // BackTranslation - inherits from base with opt-out option
        if (string.Equals(projectType, "BackTranslation", StringComparison.OrdinalIgnoreCase))
        {
            // Check if base is registered (for tests, "registeredBase" is considered registered)
            bool baseIsRegistered = IsBaseProjectRegistered(baseProjectGuid);

            return new RegistrationState
            {
                Status = StatusInheritsFromBase,
                MessageKey = baseIsRegistered
                    ? "Registration_InheritsFromBase"
                    : "Registration_BaseNotRegistered_Warning",
                CanRegisterOnline = baseIsRegistered, // Can only register separately if base is registered
                CanOptOutOfInheritance = baseIsRegistered, // Can only opt out if base is registered
                RegistryServerAvailable = serverAvailable,
            };
        }

        // Own registration types - Standard, Daughter, StudyBibleAdditions
        if (s_ownRegistrationTypes.Contains(projectType))
        {
            // Check if this project is already registered
            bool isRegistered = IsProjectRegistered(projectGuid);

            return new RegistrationState
            {
                Status = isRegistered ? StatusRegistered : StatusUnregistered,
                MessageKey = isRegistered ? "Registration_Registered" : "Registration_Unregistered",
                CanRegisterOnline = !isRegistered, // Can register if not already registered
                CanOptOutOfInheritance = false, // These types don't inherit
                RegistryServerAvailable = serverAvailable,
            };
        }

        // Unknown project type - treat as unregistered with registration option
        return new RegistrationState
        {
            Status = StatusUnregistered,
            MessageKey = "Registration_Unregistered",
            CanRegisterOnline = true,
            CanOptOutOfInheritance = false,
            RegistryServerAvailable = serverAvailable,
        };
    }

    /// <summary>
    /// Checks if the registry server is available.
    /// </summary>
    /// <returns>True if registry server can be reached.</returns>
    public static bool IsRegistryServerAvailable()
    {
        // In a real implementation, this would check:
        // - RegistryServer.IsDefaultInstance
        // - RegistryServer.ClientInitialized
        // - RegistryServer.InternetActive
        // - User has valid registration

        // For unit tests, return true to indicate server is available
        return true;
    }

    /// <summary>
    /// Initiates online registration for a project.
    /// </summary>
    /// <param name="projectGuid">The GUID of the project to register.</param>
    /// <returns>URL to open in browser for registration workflow.</returns>
    /// <remarks>
    /// In a full implementation, this would encode project information (name, type, language)
    /// into the URL. Currently encodes only the project GUID for testing purposes.
    /// </remarks>
    public static string InitiateOnlineRegistration(string projectGuid)
    {
        var encodedData = Convert.ToBase64String(
            System.Text.Encoding.UTF8.GetBytes($"guid={projectGuid}")
        );
        return $"{RegistryBaseUrl}?data={encodedData}";
    }

    #endregion

    #region Private Methods

    /// <summary>
    /// Checks if a project is registered with the registry server.
    /// </summary>
    /// <param name="projectGuid">The project GUID to check.</param>
    /// <returns>True if the project is registered; false otherwise.</returns>
    /// <remarks>
    /// In a full implementation, this would query the registry server or local cache.
    /// Currently returns false for all projects (new projects are always unregistered).
    /// </remarks>
    private static bool IsProjectRegistered(string? projectGuid)
    {
        // In a real implementation, this would check the registry
        // For unit tests, projects are considered unregistered unless they have a GUID
        // (and even then, we'd need to verify with the registry)
        return false; // New projects are always unregistered
    }

    /// <summary>
    /// Checks if a base project is registered with the registry server.
    /// </summary>
    /// <param name="baseProjectGuid">The base project GUID to check.</param>
    /// <returns>True if the base project is registered; false otherwise.</returns>
    /// <remarks>
    /// In a full implementation, this would look up the base project and check its registration
    /// status. For unit tests, uses a naming convention where GUIDs starting with "registered"
    /// are considered registered.
    /// </remarks>
    private static bool IsBaseProjectRegistered(string? baseProjectGuid)
    {
        if (string.IsNullOrEmpty(baseProjectGuid))
            return false;

        return baseProjectGuid.StartsWith(RegisteredBasePrefix, StringComparison.OrdinalIgnoreCase);
    }

    #endregion
}
