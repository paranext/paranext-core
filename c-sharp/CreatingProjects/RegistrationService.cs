#nullable enable

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for project registration state management.
/// Implements CAP-EXT-005 (RegistrationStateMachine).
/// </summary>
internal static class RegistrationService
{
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
    /// Checks if the registry server is available.
    /// </summary>
    /// <returns>True if registry server can be reached.</returns>
    /// <remarks>
    /// <para>Implements CAP-008: IsRegistryServerAvailable.</para>
    /// <para>Used to determine if online registration is possible.</para>
    /// </remarks>
    public static bool IsRegistryServerAvailable()
    {
        // In a real implementation, this would check network connectivity to the registry server.
        // For now, return true as a stub. Actual network checks would be integration tests.
        return true;
    }

    /// <summary>
    /// Initiates online registration for a project.
    /// </summary>
    /// <param name="projectGuid">Project GUID to register.</param>
    /// <returns>URL to open in browser for registration.</returns>
    /// <exception cref="InvalidOperationException">
    /// Thrown when registry server is unavailable.
    /// </exception>
    /// <remarks>
    /// <para>Implements CAP-009: InitiateOnlineRegistration.</para>
    /// <para>Returns a URL that opens the registration portal for the project.</para>
    /// </remarks>
    public static string InitiateOnlineRegistration(string projectGuid)
    {
        ArgumentNullException.ThrowIfNull(projectGuid);

        if (string.IsNullOrEmpty(projectGuid))
        {
            throw new ArgumentException("Project GUID cannot be empty", nameof(projectGuid));
        }

        // Return a placeholder registration URL containing the project GUID
        return $"https://registry.paratext.org/register?guid={projectGuid}";
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
