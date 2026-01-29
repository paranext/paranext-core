using Paranext.DataProvider.Services;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service that registers PAPI commands for project creation operations.
/// Maps to CAP-022 (PAPICommandRegistration) and CAP-023 (EventPublishing).
/// </summary>
internal class ProjectCreationCommandService(PapiClient papiClient)
{
    #region Constants

    // Command names must match backend-alignment.md
    private const string CMD_CREATE_PROJECT = "command:platformScripture.createProject";
    private const string CMD_GET_PROJECT_OPTIONS = "command:platformScripture.getProjectOptions";
    private const string CMD_VALIDATE_PROJECT_NAMES =
        "command:platformScripture.validateProjectNames";
    private const string CMD_GENERATE_SHORT_NAME = "command:platformScripture.generateShortName";
    private const string CMD_VALIDATE_FILE_PATTERN =
        "command:platformScripture.validateFilePattern";
    private const string CMD_SAVE_INTERLINEAR_SETUP =
        "command:platformScripture.saveInterlinearSetup";
    private const string CMD_VALIDATE_INTERLINEAR_SETUP =
        "command:platformScripture.validateInterlinearSetup";
    private const string CMD_GET_REGISTRATION_STATUS =
        "command:platformScripture.getRegistrationStatus";
    private const string CMD_GET_INTERLINEAR_SETUPS =
        "command:platformScripture.getInterlinearSetups";

    // Event type names
    internal const string EVENT_PROJECT_CREATED = "platformScripture:projectCreated";
    internal const string EVENT_INTERLINEAR_SETUP_CHANGED =
        "platformScripture:interlinearSetupChanged";
    internal const string EVENT_REGISTRATION_STATUS_CHANGED =
        "platformScripture:registrationStatusChanged";

    #endregion

    #region Private fields

    private PapiClient PapiClient { get; } = papiClient;

    // Note: Services are static classes, no instances needed
    // - ProjectCreationService (static)
    // - ProjectNamingService (static)
    // - InterlinearService (static)
    // - RegistrationStatusService (static)

    #endregion

    #region Public methods

    /// <summary>
    /// Initializes the service by registering all PAPI command handlers.
    /// </summary>
    public async Task InitializeAsync()
    {
        // Register all command handlers
        // TODO: Implement command handlers - tests will FAIL (RED state)
        throw new NotImplementedException("Command registration not yet implemented");
    }

    #endregion

    #region Command handlers (to be implemented)

    // TODO: Add command handler methods

    #endregion

    #region Event publishing (to be implemented)

    /// <summary>
    /// Publishes a ProjectCreatedEvent when a project is successfully created.
    /// </summary>
    internal Task PublishProjectCreatedEventAsync(ProjectInfo project)
    {
        // TODO: Implement event publishing
        throw new NotImplementedException("Event publishing not yet implemented");
    }

    /// <summary>
    /// Publishes an InterlinearSetupChangedEvent when a setup is created, updated, or deleted.
    /// </summary>
    internal Task PublishInterlinearSetupChangedEventAsync(
        InterlinearSetupInfo setup,
        InterlinearSetupAction action
    )
    {
        // TODO: Implement event publishing
        throw new NotImplementedException("Event publishing not yet implemented");
    }

    /// <summary>
    /// Publishes a RegistrationStatusChangedEvent when registration status changes.
    /// </summary>
    internal Task PublishRegistrationStatusChangedEventAsync(
        string projectGuid,
        RegistrationMessageType newStatus
    )
    {
        // TODO: Implement event publishing
        throw new NotImplementedException("Event publishing not yet implemented");
    }

    #endregion
}
