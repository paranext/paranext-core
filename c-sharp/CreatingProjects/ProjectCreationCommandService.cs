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
    #region Constructors, consts, and fields

    /// <summary>
    /// Command prefix for all project creation commands.
    /// </summary>
    private const string CommandPrefix = "command:paratextProjectCreation.";

    private PapiClient PapiClient { get; } = papiClient;

    #endregion

    #region Public properties and methods

    /// <summary>
    /// Initializes the command service by registering all PAPI commands.
    /// </summary>
    /// <returns>Task that completes when all commands are registered.</returns>
    public async Task InitializeAsync()
    {
        // CAP-CMD-001: getTypeConfiguration
        await PapiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "getTypeConfiguration",
            GetTypeConfiguration
        );

        // CAP-CMD-002: canBeBasedOnType
        await PapiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "canBeBasedOnType",
            CanBeBasedOnType
        );

        // CAP-CMD-003: getValidBaseProjects
        await PapiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "getValidBaseProjects",
            GetValidBaseProjects
        );

        // CAP-CMD-004: validateShortName
        await PapiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "validateShortName",
            ValidateShortName
        );

        // CAP-CMD-005: generateShortName
        await PapiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "generateShortName",
            GenerateShortName
        );

        // CAP-CMD-006: generateUniqueName
        await PapiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "generateUniqueName",
            GenerateUniqueName
        );

        // CAP-CMD-007: getRegistrationState
        await PapiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "getRegistrationState",
            GetRegistrationState
        );

        // CAP-CMD-008: validateLanguage
        await PapiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "validateLanguage",
            ValidateLanguage
        );

        // CAP-CMD-009: createProject
        await PapiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "createProject",
            CreateProject
        );

        // CAP-CMD-011: cleanupProject
        await PapiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "cleanupProject",
            CleanupProject
        );

        // CAP-CMD-012: updateProject
        await PapiClient.RegisterRequestHandlerAsync(
            CommandPrefix + "updateProject",
            UpdateProject
        );
    }

    #endregion

    #region Private properties and methods

    /// <summary>
    /// Gets the configuration for a project type.
    /// </summary>
    /// <param name="projectType">Integer representation of ProjectCreationType.</param>
    /// <returns>Configuration for the specified project type.</returns>
    private ProjectTypeConfiguration GetTypeConfiguration(int projectType)
    {
        return ProjectTypeService.GetTypeConfiguration((ProjectCreationType)projectType);
    }

    /// <summary>
    /// Gets the list of project types that can be used as a base for the given type.
    /// </summary>
    /// <param name="projectType">Integer representation of ProjectCreationType.</param>
    /// <returns>List of allowed base project types.</returns>
    private IReadOnlyList<ProjectCreationType> CanBeBasedOnType(int projectType)
    {
        return ProjectTypeService.GetAllowedBaseTypes((ProjectCreationType)projectType);
    }

    /// <summary>
    /// Gets all projects that can be used as a base for the specified project type.
    /// </summary>
    /// <param name="projectType">Integer representation of ProjectCreationType.</param>
    /// <returns>List of valid base projects.</returns>
    private IReadOnlyList<ProjectReference> GetValidBaseProjects(int projectType)
    {
        return ProjectTypeService.GetValidBaseProjects((ProjectCreationType)projectType);
    }

    /// <summary>
    /// Validates a project short name.
    /// </summary>
    /// <param name="shortName">The short name to validate.</param>
    /// <param name="isNewProject">True if creating a new project.</param>
    /// <param name="originalName">Original name if editing existing project.</param>
    /// <returns>Validation result.</returns>
    private ValidationResult ValidateShortName(
        string shortName,
        bool isNewProject,
        string? originalName
    )
    {
        return ProjectNameService.ValidateShortName(shortName, isNewProject, originalName);
    }

    /// <summary>
    /// Generates a short name from a full name.
    /// </summary>
    /// <param name="fullName">The full project name.</param>
    /// <returns>Generated short name.</returns>
    private string GenerateShortName(string fullName)
    {
        return ProjectNameService.GenerateShortName(fullName);
    }

    /// <summary>
    /// Generates a unique project name.
    /// </summary>
    /// <param name="baseShortName">Base short name to make unique.</param>
    /// <param name="baseLongName">Base long name to make unique.</param>
    /// <param name="forceNumbered">If true, always append number.</param>
    /// <returns>Response containing unique short and long names.</returns>
    private GenerateUniqueNameResponse GenerateUniqueName(
        string baseShortName,
        string baseLongName,
        bool forceNumbered
    )
    {
        var (shortName, longName) = ProjectNameService.GenerateUniqueName(
            baseShortName,
            baseLongName,
            forceNumbered
        );
        return new GenerateUniqueNameResponse { ShortName = shortName, LongName = longName };
    }

    /// <summary>
    /// Gets the registration state for a project.
    /// </summary>
    /// <param name="projectType">Integer representation of ProjectCreationType.</param>
    /// <param name="baseProjectGuid">Base project GUID (if derived type).</param>
    /// <param name="isBaseProjectRegistered">True if base project is registered.</param>
    /// <returns>Registration state.</returns>
    private RegistrationState GetRegistrationState(
        int projectType,
        string? baseProjectGuid,
        bool isBaseProjectRegistered
    )
    {
        return RegistrationService.GetRegistrationState(
            (ProjectCreationType)projectType,
            baseProjectGuid,
            isBaseProjectRegistered
        );
    }

    /// <summary>
    /// Validates a language selection.
    /// </summary>
    /// <param name="languageId">Selected language ID.</param>
    /// <param name="languageName">User-specified language name.</param>
    /// <param name="existingNames">List of existing language names.</param>
    /// <param name="initialName">Original name (for edit mode).</param>
    /// <returns>Validation result.</returns>
    private ValidationResult ValidateLanguage(
        string languageId,
        string languageName,
        IReadOnlyList<string> existingNames,
        string? initialName
    )
    {
        return LanguageService.ValidateLanguageSelection(
            languageId,
            languageName,
            existingNames,
            initialName
        );
    }

    /// <summary>
    /// Creates a new project.
    /// </summary>
    /// <param name="request">Project creation request.</param>
    /// <returns>Result of the creation operation.</returns>
    private CreateProjectResult CreateProject(CreateProjectRequest request)
    {
        return ProjectDefaultsService.CreateProjectAsync(request).Result;
    }

    /// <summary>
    /// Cleans up a partial or cancelled project.
    /// </summary>
    /// <param name="request">Cleanup request.</param>
    private void CleanupProject(CleanupProjectRequest request)
    {
        ProjectCleanupService.CleanupProjectAsync(request).Wait();
    }

    /// <summary>
    /// Updates an existing project.
    /// </summary>
    /// <param name="request">Update request.</param>
    /// <returns>Result of the update operation.</returns>
    private UpdateProjectResult UpdateProject(UpdateProjectRequest request)
    {
        return ProjectUpdateService.UpdateProjectAsync(request).Result;
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
