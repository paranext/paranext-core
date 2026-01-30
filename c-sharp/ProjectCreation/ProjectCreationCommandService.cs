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

    #endregion

    #region Public methods

    /// <summary>
    /// Initializes the service by registering all PAPI command handlers.
    /// </summary>
    public async Task InitializeAsync()
    {
        // Register all 9 command handlers
        // Note: Handlers must be synchronous (not return Task) because PapiClient.SendRequestAsync
        // uses DynamicInvoke which does not await Task results.
        await PapiClient.RegisterRequestHandlerAsync(CMD_CREATE_PROJECT, HandleCreateProject);
        await PapiClient.RegisterRequestHandlerAsync(
            CMD_GET_PROJECT_OPTIONS,
            HandleGetProjectOptions
        );
        await PapiClient.RegisterRequestHandlerAsync(
            CMD_VALIDATE_PROJECT_NAMES,
            HandleValidateProjectNames
        );
        await PapiClient.RegisterRequestHandlerAsync(
            CMD_GENERATE_SHORT_NAME,
            HandleGenerateShortName
        );
        await PapiClient.RegisterRequestHandlerAsync(
            CMD_VALIDATE_FILE_PATTERN,
            HandleValidateFilePattern
        );
        await PapiClient.RegisterRequestHandlerAsync(
            CMD_SAVE_INTERLINEAR_SETUP,
            HandleSaveInterlinearSetup
        );
        await PapiClient.RegisterRequestHandlerAsync(
            CMD_VALIDATE_INTERLINEAR_SETUP,
            HandleValidateInterlinearSetup
        );
        await PapiClient.RegisterRequestHandlerAsync(
            CMD_GET_REGISTRATION_STATUS,
            HandleGetRegistrationStatus
        );
        await PapiClient.RegisterRequestHandlerAsync(
            CMD_GET_INTERLINEAR_SETUPS,
            HandleGetInterlinearSetups
        );
    }

    #endregion

    #region Command handlers

    /// <summary>
    /// Handles createProject command.
    /// </summary>
    private ProjectCreationResult HandleCreateProject(ProjectCreationRequest request)
    {
        // ProjectCreationService.CreateProjectAsync returns Task but is synchronous in implementation
        var result = ProjectCreationService.CreateProjectAsync(request).GetAwaiter().GetResult();

        // Publish event on success (CAP-023)
        if (result.Success && result.Project != null)
        {
            PublishProjectCreatedEventAsync(result.Project).GetAwaiter().GetResult();
        }

        return result;
    }

    /// <summary>
    /// Handles getProjectOptions command.
    /// </summary>
    private ProjectOptionsResult HandleGetProjectOptions()
    {
        return ProjectCreationService.GetProjectOptionsAsync().GetAwaiter().GetResult();
    }

    /// <summary>
    /// Handles validateProjectNames command.
    /// </summary>
    private ProjectNameValidationResult HandleValidateProjectNames(
        ProjectNameValidationRequest request
    )
    {
        return ProjectNamingService.ValidateProjectNames(request);
    }

    /// <summary>
    /// Handles generateShortName command.
    /// </summary>
    private ShortNameGenerationResult HandleGenerateShortName(ShortNameGenerationRequest request)
    {
        return ProjectNamingService.GenerateShortName(request);
    }

    /// <summary>
    /// Handles validateFilePattern command.
    /// </summary>
    private FileNamingPatternResult HandleValidateFilePattern(FileNamingPatternRequest request)
    {
        return ProjectCreationService.ValidateFileNamingPattern(request);
    }

    /// <summary>
    /// Handles saveInterlinearSetup command.
    /// </summary>
    private InterlinearSetupResult HandleSaveInterlinearSetup(InterlinearSetupRequest request)
    {
        var result = InterlinearService.SaveSetup(request);

        // Publish event on success (CAP-023)
        if (result.Success && result.Setup != null)
        {
            // Determine action: Created vs Updated
            var action = string.IsNullOrEmpty(request.ExistingSetupId)
                ? InterlinearSetupAction.Created
                : InterlinearSetupAction.Updated;

            PublishInterlinearSetupChangedEventAsync(result.Setup, action).GetAwaiter().GetResult();
        }

        return result;
    }

    /// <summary>
    /// Handles validateInterlinearSetup command.
    /// </summary>
    private InterlinearValidationResult HandleValidateInterlinearSetup(
        InterlinearSetupRequest request
    )
    {
        return InterlinearService.ValidateSetup(request);
    }

    /// <summary>
    /// Handles getRegistrationStatus command.
    /// </summary>
    private RegistrationStatusResult HandleGetRegistrationStatus(RegistrationStatusRequest request)
    {
        return RegistrationStatusService
            .GetRegistrationStatusAsync(request)
            .GetAwaiter()
            .GetResult();
    }

    /// <summary>
    /// Handles getInterlinearSetups command.
    /// </summary>
    private IReadOnlyList<InterlinearSetupInfo> HandleGetInterlinearSetups(string projectName)
    {
        return InterlinearService.GetSetups(projectName);
    }

    #endregion

    #region Event publishing

    /// <summary>
    /// Publishes a ProjectCreatedEvent when a project is successfully created.
    /// </summary>
    internal async Task PublishProjectCreatedEventAsync(ProjectInfo project)
    {
        var eventPayload = new ProjectCreatedEvent
        {
            Project = project,
            Timestamp = DateTime.UtcNow,
        };

        await PapiClient.SendEventAsync(EVENT_PROJECT_CREATED, eventPayload);
    }

    /// <summary>
    /// Publishes an InterlinearSetupChangedEvent when a setup is created, updated, or deleted.
    /// </summary>
    internal async Task PublishInterlinearSetupChangedEventAsync(
        InterlinearSetupInfo setup,
        InterlinearSetupAction action
    )
    {
        var eventPayload = new InterlinearSetupChangedEvent
        {
            Setup = setup,
            Action = action,
            Timestamp = DateTime.UtcNow,
        };

        await PapiClient.SendEventAsync(EVENT_INTERLINEAR_SETUP_CHANGED, eventPayload);
    }

    /// <summary>
    /// Publishes a RegistrationStatusChangedEvent when registration status changes.
    /// </summary>
    internal async Task PublishRegistrationStatusChangedEventAsync(
        string projectGuid,
        RegistrationMessageType newStatus
    )
    {
        var eventPayload = new RegistrationStatusChangedEvent
        {
            ProjectGuid = projectGuid,
            NewStatus = newStatus,
            Timestamp = DateTime.UtcNow,
        };

        await PapiClient.SendEventAsync(EVENT_REGISTRATION_STATUS_CHANGED, eventPayload);
    }

    #endregion
}
