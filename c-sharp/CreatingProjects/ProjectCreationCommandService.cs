#nullable enable

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// PAPI command service for project creation operations.
/// Registers all project creation commands on the PAPI.
/// </summary>
/// <remarks>
/// <para>Implements Micro-Phase 6: PAPI Command Registration</para>
/// <para>
/// Commands registered:
/// <list type="bullet">
/// <item>CAP-CMD-001: paratextProjectCreation.getTypeConfiguration</item>
/// <item>CAP-CMD-002: paratextProjectCreation.canBeBasedOnType</item>
/// <item>CAP-CMD-003: paratextProjectCreation.getValidBaseProjects</item>
/// <item>CAP-CMD-004: paratextProjectCreation.validateShortName</item>
/// <item>CAP-CMD-005: paratextProjectCreation.generateShortName</item>
/// <item>CAP-CMD-006: paratextProjectCreation.generateUniqueName</item>
/// <item>CAP-CMD-007: paratextProjectCreation.getRegistrationState</item>
/// <item>CAP-CMD-008: paratextProjectCreation.validateLanguage</item>
/// <item>CAP-CMD-009: paratextProjectCreation.createProject</item>
/// <item>CAP-CMD-011: paratextProjectCreation.cleanupProject</item>
/// <item>CAP-CMD-012: paratextProjectCreation.updateProject</item>
/// </list>
/// </para>
/// </remarks>
internal class ProjectCreationCommandService(PapiClient papiClient)
{
    #region Constants

    /// <summary>
    /// Command prefix for all project creation commands.
    /// </summary>
    private const string CommandPrefix = "command:paratextProjectCreation.";

    #endregion

    #region Fields

    private readonly PapiClient _papiClient = papiClient;

    #endregion

    #region Public Methods

    /// <summary>
    /// Initializes the command service by registering all PAPI commands.
    /// </summary>
    /// <returns>Task that completes when all commands are registered.</returns>
    public async Task InitializeAsync()
    {
        // NOTE: This is a STUB implementation for TDD RED phase.
        // All command handlers throw NotImplementedException to ensure tests FAIL.
        // The TDD Implementer will replace these with real implementations.

        // CAP-CMD-001: getTypeConfiguration
        await _papiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "getTypeConfiguration",
            GetTypeConfiguration_Stub
        );

        // CAP-CMD-002: canBeBasedOnType
        await _papiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "canBeBasedOnType",
            CanBeBasedOnType_Stub
        );

        // CAP-CMD-003: getValidBaseProjects
        await _papiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "getValidBaseProjects",
            GetValidBaseProjects_Stub
        );

        // CAP-CMD-004: validateShortName
        await _papiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "validateShortName",
            ValidateShortName_Stub
        );

        // CAP-CMD-005: generateShortName
        await _papiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "generateShortName",
            GenerateShortName_Stub
        );

        // CAP-CMD-006: generateUniqueName
        await _papiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "generateUniqueName",
            GenerateUniqueName_Stub
        );

        // CAP-CMD-007: getRegistrationState
        await _papiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "getRegistrationState",
            GetRegistrationState_Stub
        );

        // CAP-CMD-008: validateLanguage
        await _papiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "validateLanguage",
            ValidateLanguage_Stub
        );

        // CAP-CMD-009: createProject
        await _papiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "createProject",
            CreateProject_Stub
        );

        // CAP-CMD-011: cleanupProject
        await _papiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "cleanupProject",
            CleanupProject_Stub
        );

        // CAP-CMD-012: updateProject
        await _papiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "updateProject",
            UpdateProject_Stub
        );
    }

    #endregion

    #region Stub Methods (to be implemented in GREEN phase)

    // These stub methods throw NotImplementedException to ensure RED state.
    // The TDD Implementer will replace them with real implementations.

    private ProjectTypeConfiguration GetTypeConfiguration_Stub(int projectType)
    {
        throw new NotImplementedException("CAP-CMD-001: GetTypeConfiguration not implemented");
    }

    private IReadOnlyList<ProjectCreationType> CanBeBasedOnType_Stub(int projectType)
    {
        throw new NotImplementedException("CAP-CMD-002: CanBeBasedOnType not implemented");
    }

    private IReadOnlyList<ProjectReference> GetValidBaseProjects_Stub(int projectType)
    {
        throw new NotImplementedException("CAP-CMD-003: GetValidBaseProjects not implemented");
    }

    private ValidationResult ValidateShortName_Stub(
        string shortName,
        bool isNewProject,
        string? originalName
    )
    {
        throw new NotImplementedException("CAP-CMD-004: ValidateShortName not implemented");
    }

    private string GenerateShortName_Stub(string fullName)
    {
        throw new NotImplementedException("CAP-CMD-005: GenerateShortName not implemented");
    }

    private GenerateUniqueNameResponse GenerateUniqueName_Stub(
        string baseShortName,
        string baseLongName,
        bool forceNumbered
    )
    {
        throw new NotImplementedException("CAP-CMD-006: GenerateUniqueName not implemented");
    }

    private RegistrationState GetRegistrationState_Stub(
        int projectType,
        string? baseProjectGuid,
        bool isBaseProjectRegistered
    )
    {
        throw new NotImplementedException("CAP-CMD-007: GetRegistrationState not implemented");
    }

    private ValidationResult ValidateLanguage_Stub(
        string languageId,
        string languageName,
        IReadOnlyList<string> existingNames,
        string? initialName
    )
    {
        throw new NotImplementedException("CAP-CMD-008: ValidateLanguage not implemented");
    }

    private CreateProjectResult CreateProject_Stub(CreateProjectRequest request)
    {
        throw new NotImplementedException("CAP-CMD-009: CreateProject not implemented");
    }

    private void CleanupProject_Stub(CleanupProjectRequest request)
    {
        throw new NotImplementedException("CAP-CMD-011: CleanupProject not implemented");
    }

    private UpdateProjectResult UpdateProject_Stub(UpdateProjectRequest request)
    {
        throw new NotImplementedException("CAP-CMD-012: UpdateProject not implemented");
    }

    #endregion
}

/// <summary>
/// Response type for GenerateUniqueName command.
/// </summary>
public record GenerateUniqueNameResponse
{
    public required string ShortName { get; init; }
    public required string LongName { get; init; }
}
