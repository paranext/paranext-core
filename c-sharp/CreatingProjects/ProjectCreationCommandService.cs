using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Registers project creation commands on the PAPI.
/// Commands:
/// - platformScripture.createProject
/// - platformScripture.validateShortName
/// - platformScripture.generateProjectName
/// - platformScripture.generateAbbreviation
/// - platformScripture.getProjectTypeInfo
/// - platformScripture.updateProjectSettings
/// - platformScripture.convertToUsfm3
/// - platformScripture.getProjectInfo
/// </summary>
/// <seealso cref="CAP-016 in strategic-plan.md"/>
internal class ProjectCreationCommandService
{
    public ProjectCreationCommandService(PapiClient papiClient)
    {
        ArgumentNullException.ThrowIfNull(papiClient);
        PapiClient = papiClient;
    }

    #region Constants

    /// <summary>
    /// Command prefix for platform scripture commands.
    /// </summary>
    private const string COMMAND_PREFIX = "command:platformScripture.";

    /// <summary>
    /// Command names for project creation operations.
    /// </summary>
    public static class Commands
    {
        public const string CreateProject = COMMAND_PREFIX + "createProject";
        public const string ValidateShortName = COMMAND_PREFIX + "validateShortName";
        public const string GenerateProjectName = COMMAND_PREFIX + "generateProjectName";
        public const string GenerateAbbreviation = COMMAND_PREFIX + "generateAbbreviation";
        public const string GetProjectTypeInfo = COMMAND_PREFIX + "getProjectTypeInfo";
        public const string UpdateProjectSettings = COMMAND_PREFIX + "updateProjectSettings";
        public const string ConvertToUsfm3 = COMMAND_PREFIX + "convertToUsfm3";
        public const string GetProjectInfo = COMMAND_PREFIX + "getProjectInfo";
    }

    #endregion

    #region Properties

    private PapiClient PapiClient { get; }

    #endregion

    #region Public Methods

    /// <summary>
    /// Initializes the service by registering all commands on the PAPI.
    /// </summary>
    /// <returns>Task that completes when all commands are registered</returns>
    public async Task InitializeAsync()
    {
        await PapiClient.RegisterRequestHandlerAsync(Commands.CreateProject, CreateProject);
        await PapiClient.RegisterRequestHandlerAsync(Commands.ValidateShortName, ValidateShortName);
        await PapiClient.RegisterRequestHandlerAsync(
            Commands.GenerateProjectName,
            GenerateProjectName
        );
        await PapiClient.RegisterRequestHandlerAsync(
            Commands.GenerateAbbreviation,
            GenerateAbbreviation
        );
        await PapiClient.RegisterRequestHandlerAsync(
            Commands.GetProjectTypeInfo,
            GetProjectTypeInfo
        );
        await PapiClient.RegisterRequestHandlerAsync(
            Commands.UpdateProjectSettings,
            UpdateProjectSettings
        );
        await PapiClient.RegisterRequestHandlerAsync(Commands.ConvertToUsfm3, ConvertToUsfm3);
        await PapiClient.RegisterRequestHandlerAsync(Commands.GetProjectInfo, GetProjectInfo);
    }

    #endregion

    #region Command Handlers (private)

    /// <summary>
    /// Creates a new Paratext project.
    /// Delegates to <see cref="ProjectCreationService.CreateProject"/>.
    /// </summary>
    private CreateProjectResult CreateProject(CreateProjectRequest request)
    {
        return ProjectCreationService.CreateProject(request);
    }

    /// <summary>
    /// Validates a project short name.
    /// Delegates to <see cref="ProjectValidationService.ValidateShortName"/>.
    /// </summary>
    private ValidationResult ValidateShortName(ValidateShortNameRequest request)
    {
        return ProjectValidationService.ValidateShortName(
            request.ShortName,
            request.IsNewProject,
            request.OriginalName
        );
    }

    /// <summary>
    /// Generates a unique project name.
    /// Delegates to <see cref="ProjectNameService.NextUnusedProjectName"/>.
    /// </summary>
    private GeneratedProjectName GenerateProjectName(GenerateProjectNameRequest request)
    {
        var (shortName, fullName) = ProjectNameService.NextUnusedProjectName(
            request.ShortName ?? "",
            request.FullName ?? "",
            request.ForceNumbered
        );
        return new GeneratedProjectName { ShortName = shortName, FullName = fullName };
    }

    /// <summary>
    /// Generates an abbreviation from a full name.
    /// Delegates to <see cref="ProjectNameService.FormTextNameAbbrev"/>.
    /// </summary>
    private string GenerateAbbreviation(GenerateAbbreviationRequest request)
    {
        return ProjectNameService.FormTextNameAbbrev(request.FullName);
    }

    /// <summary>
    /// Gets project type information.
    /// Delegates to extension method on <see cref="Paratext.Data.Enum{ProjectType}"/>.
    /// </summary>
    private ProjectTypeInfo GetProjectTypeInfo(string projectType)
    {
        var type = new Enum<ProjectType>(projectType);
        return new ProjectTypeInfo
        {
            Type = projectType,
            IsDerivedType = type.IsDerivedType(),
            SharesLicenseWithParent = type.SharesProjectLicenseWithParent(),
            StandardStyleSheetName = type.StandardStyleSheetName(),
        };
    }

    /// <summary>
    /// Updates settings on an existing project.
    /// Delegates to <see cref="ProjectCreationService.UpdateProjectSettings"/>.
    /// </summary>
    private UpdateProjectResult UpdateProjectSettings(UpdateProjectSettingsRequest request)
    {
        return ProjectCreationService.UpdateProjectSettings(request);
    }

    /// <summary>
    /// Converts a project from USFM 2 to USFM 3.
    /// Delegates to <see cref="ProjectCreationService.ConvertProjectToUsfm3"/>.
    /// </summary>
    private UpdateProjectResult ConvertToUsfm3(ConvertToUsfm3Request request)
    {
        var scrText = ScrTextCollection
            .ScrTexts(IncludeProjects.Everything)
            .FirstOrDefault(p =>
                string.Equals(p.Name, request.ProjectName, StringComparison.OrdinalIgnoreCase)
            );
        if (scrText == null)
        {
            return UpdateProjectResult.Failed(
                ProjectConstants.ProjectNotFoundErrorCode,
                $"Project '{request.ProjectName}' not found"
            );
        }
        ProjectCreationService.ConvertProjectToUsfm3(scrText);
        return UpdateProjectResult.Succeeded();
    }

    /// <summary>
    /// Gets basic information about an existing project.
    /// Delegates to <see cref="ProjectCreationService.GetProjectInfo"/>.
    /// </summary>
    private ProjectInfo? GetProjectInfo(string projectName)
    {
        return ProjectCreationService.GetProjectInfo(projectName);
    }

    #endregion
}

/// <summary>
/// Information about a project type.
/// Used by CAP-016: getProjectTypeInfo command.
/// </summary>
/// <seealso cref="Section 3.5 in data-contracts.md"/>
public record ProjectTypeInfo
{
    /// <summary>
    /// The project type name.
    /// </summary>
    public string Type { get; init; } = "";

    /// <summary>
    /// Whether this is a derived type (requires base project).
    /// </summary>
    public bool IsDerivedType { get; init; }

    /// <summary>
    /// Whether this type shares license with parent project.
    /// </summary>
    public bool SharesLicenseWithParent { get; init; }

    /// <summary>
    /// The standard stylesheet file name for this type.
    /// </summary>
    public string StandardStyleSheetName { get; init; } = "";
}
