#nullable enable

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for project registration state management.
/// Implements CAP-EXT-005 (RegistrationStateMachine).
/// </summary>
internal static class RegistrationService
{
    #region Constants

    /// <summary>
    /// Base URL for the Paratext registry server.
    /// </summary>
    private const string RegistryServerBaseUrl = "https://registry.paratext.org";

    /// <summary>
    /// URL path for project registration endpoint.
    /// </summary>
    private const string RegistrationEndpointPath = "/register";

    #endregion

    #region Public Methods

    /// <summary>
    /// Determines the registration state for a project.
    /// </summary>
    /// <param name="projectType">Current/selected project type.</param>
    /// <param name="baseProjectGuid">Base project GUID (if derived type).</param>
    /// <param name="isBaseProjectRegistered">True if base project is registered (if applicable).</param>
    /// <returns>Registration state with available actions.</returns>
    /// <remarks>
    /// <para>Implements CAP-EXT-005: Registration State Machine.</para>
    /// <para>Golden master: gm-005-registration-state.</para>
    /// <para>
    /// State determination rules by type:
    /// <list type="table">
    /// <listheader><term>Type</term><description>State / Can Register</description></listheader>
    /// <item><term>NotSelected</term><description>NotSelected / No</description></item>
    /// <item><term>Standard</term><description>Unregistered/Registered / Yes</description></item>
    /// <item><term>Daughter</term><description>Unregistered/Registered / Yes</description></item>
    /// <item><term>StudyBibleAdditions</term><description>Unregistered/Registered / Yes</description></item>
    /// <item><term>BackTranslation</term><description>InheritsFromBase / Optional override</description></item>
    /// <item><term>Auxiliary</term><description>InheritsFromBase / No</description></item>
    /// <item><term>TransliterationManual</term><description>InheritsFromBase / No</description></item>
    /// <item><term>TransliterationWithEncoder</term><description>InheritsFromBase / No</description></item>
    /// <item><term>ConsultantNotes</term><description>NotApplicable / No</description></item>
    /// </list>
    /// </para>
    /// </remarks>
    public static RegistrationState GetRegistrationState(
        ProjectCreationType projectType,
        string? baseProjectGuid = null,
        bool isBaseProjectRegistered = false
    )
    {
        return projectType switch
        {
            ProjectCreationType.NotSelected => CreateNotSelectedState(),
            ProjectCreationType.Standard => CreateUnregisteredState("Not registered"),
            ProjectCreationType.Daughter => CreateUnregisteredState("Requires registration"),
            ProjectCreationType.StudyBibleAdditions => CreateUnregisteredState(
                "Requires registration"
            ),
            ProjectCreationType.BackTranslation => GetBackTranslationState(isBaseProjectRegistered),
            ProjectCreationType.Auxiliary => CreateInheritsFromBaseState(),
            ProjectCreationType.TransliterationManual => CreateInheritsFromBaseState(),
            ProjectCreationType.TransliterationWithEncoder => CreateInheritsFromBaseState(),
            ProjectCreationType.ConsultantNotes => CreateNotApplicableState(),
            _ => CreateUnregisteredState("Not registered"),
        };
    }

    /// <summary>
    /// Checks if the Paratext registry server is available for online registration.
    /// </summary>
    /// <returns>
    /// <c>true</c> if the registry server at <see cref="RegistryServerBaseUrl"/> can be reached;
    /// otherwise, <c>false</c>.
    /// </returns>
    /// <remarks>
    /// <para>Implements CAP-008: IsRegistryServerAvailable.</para>
    /// <para>Used to determine if online registration is possible before showing the registration option.</para>
    /// <para>
    /// <b>Current Implementation:</b> Returns <c>true</c> as a stub. A full implementation would perform
    /// an HTTP HEAD request to the registry server to verify connectivity.
    /// </para>
    /// </remarks>
    public static bool IsRegistryServerAvailable()
    {
        // TODO: Implement actual network connectivity check to RegistryServerBaseUrl.
        // This would typically involve an HTTP HEAD request with a short timeout.
        // For now, return true as a stub. Actual network checks would be integration tests.
        return true;
    }

    /// <summary>
    /// Initiates online registration for a project by generating a registration URL.
    /// </summary>
    /// <param name="projectGuid">
    /// The GUID of the project to register. Must be a valid, non-empty project identifier.
    /// </param>
    /// <returns>
    /// A fully-formed URL pointing to the Paratext registry portal with the project GUID
    /// as a query parameter. The caller should open this URL in the user's default browser.
    /// </returns>
    /// <exception cref="ArgumentNullException">
    /// Thrown when <paramref name="projectGuid"/> is <c>null</c>.
    /// </exception>
    /// <exception cref="ArgumentException">
    /// Thrown when <paramref name="projectGuid"/> is empty or whitespace.
    /// </exception>
    /// <remarks>
    /// <para>Implements CAP-009: InitiateOnlineRegistration.</para>
    /// <para>
    /// The generated URL follows the format:
    /// <c>{RegistryServerBaseUrl}{RegistrationEndpointPath}?guid={projectGuid}</c>
    /// </para>
    /// <para>
    /// Callers should verify server availability with <see cref="IsRegistryServerAvailable"/>
    /// before calling this method to provide a better user experience.
    /// </para>
    /// </remarks>
    public static string InitiateOnlineRegistration(string projectGuid)
    {
        ArgumentNullException.ThrowIfNull(projectGuid);

        if (string.IsNullOrEmpty(projectGuid))
        {
            throw new ArgumentException("Project GUID cannot be empty", nameof(projectGuid));
        }

        // Build registration URL with project GUID as query parameter
        return $"{RegistryServerBaseUrl}{RegistrationEndpointPath}?guid={projectGuid}";
    }

    #endregion

    #region Private Methods

    /// <summary>
    /// Creates a registration state for types that have not been selected yet.
    /// </summary>
    private static RegistrationState CreateNotSelectedState()
    {
        return new RegistrationState
        {
            Status = RegistrationStatus.NotSelected,
            MessageKey = "Select project type",
            CanRegisterOnline = false,
            CanOptOutOfInheritance = false,
        };
    }

    /// <summary>
    /// Creates a registration state for types that require their own registration.
    /// </summary>
    /// <param name="messageKey">The localization key for the message.</param>
    private static RegistrationState CreateUnregisteredState(string messageKey)
    {
        return new RegistrationState
        {
            Status = RegistrationStatus.Unregistered,
            MessageKey = messageKey,
            CanRegisterOnline = true,
            CanOptOutOfInheritance = false,
        };
    }

    /// <summary>
    /// Creates a registration state for types that inherit registration from their base project.
    /// </summary>
    private static RegistrationState CreateInheritsFromBaseState()
    {
        return new RegistrationState
        {
            Status = RegistrationStatus.InheritsFromBase,
            MessageKey = "Inherits from base",
            CanRegisterOnline = false,
            CanOptOutOfInheritance = false,
        };
    }

    /// <summary>
    /// Creates a registration state for types where registration is not applicable.
    /// </summary>
    private static RegistrationState CreateNotApplicableState()
    {
        return new RegistrationState
        {
            Status = RegistrationStatus.NotApplicable,
            MessageKey = "Not registered (not required)",
            CanRegisterOnline = false,
            CanOptOutOfInheritance = false,
        };
    }

    /// <summary>
    /// Gets the registration state for BackTranslation projects.
    /// BackTranslation inherits from base but can opt out to register separately.
    /// </summary>
    /// <param name="isBaseProjectRegistered">True if the base project is registered.</param>
    /// <returns>Registration state for the BackTranslation project.</returns>
    private static RegistrationState GetBackTranslationState(bool isBaseProjectRegistered)
    {
        if (isBaseProjectRegistered)
        {
            return new RegistrationState
            {
                Status = RegistrationStatus.InheritsFromBase,
                MessageKey = "Inherits from base",
                CanRegisterOnline = true,
                CanOptOutOfInheritance = true,
            };
        }

        return new RegistrationState
        {
            Status = RegistrationStatus.InheritsFromBase,
            MessageKey = "Inherits from base",
            CanRegisterOnline = false,
            CanOptOutOfInheritance = false,
            Warning = "Base not registered",
        };
    }

    #endregion
}
