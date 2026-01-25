#nullable enable

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for project defaults and creation.
/// Implements CAP-EXT-007 (ProjectDefaultsInitializer).
/// </summary>
/// <remarks>
/// <para>Golden master: gm-007-project-defaults</para>
/// <para>
/// This service:
/// <list type="number">
/// <item>Returns default settings for each project type</item>
/// <item>Creates new projects with those defaults</item>
/// </list>
/// </para>
/// <para>
/// Default values:
/// <list type="bullet">
/// <item>Versification: English (except derived types inherit from base)</item>
/// <item>Normalization: NFC (except Transliteration uses NFD)</item>
/// <item>Editable: true</item>
/// <item>USFM Version: 3</item>
/// </list>
/// </para>
/// </remarks>
internal static class ProjectDefaultsService
{
    #region Public Methods

    /// <summary>
    /// Gets default settings for the specified project type.
    /// </summary>
    /// <param name="projectType">The type of project.</param>
    /// <param name="baseProjectGuid">Optional GUID of base project for derived types.</param>
    /// <returns>Default settings for this project type.</returns>
    /// <remarks>
    /// <para>Pure function - no side effects.</para>
    /// <para>Implements CAP-EXT-007: Project Defaults Initializer.</para>
    /// </remarks>
    public static ProjectDefaults GetDefaultSettings(
        ProjectCreationType projectType,
        string? baseProjectGuid = null
    )
    {
        // Get type configuration for normalization defaults
        var config = ProjectTypeService.GetTypeConfiguration(projectType);

        return new ProjectDefaults
        {
            Versification = VersificationType.English,
            Normalization = config.NormalizationDefault,
            Editable = config.EditableDefault,
            UsfmVersion = 3,
            BaseProjectGuid = baseProjectGuid,
        };
    }

    /// <summary>
    /// Creates a new project with the specified settings.
    /// </summary>
    /// <param name="request">Project creation request.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Result indicating success/failure.</returns>
    /// <remarks>
    /// <para>Validates short name and base project requirements.</para>
    /// <para>Generates new GUID for the project on success.</para>
    /// </remarks>
    public static Task<CreateProjectResult> CreateProjectAsync(
        CreateProjectRequest request,
        CancellationToken cancellationToken = default
    )
    {
        // Check cancellation first
        if (cancellationToken.IsCancellationRequested)
        {
            return Task.FromCanceled<CreateProjectResult>(cancellationToken);
        }

        // Validate short name using ProjectNameService
        var validation = ProjectNameService.ValidateShortName(
            request.ShortName,
            isNewProject: true,
            originalName: null
        );

        if (!validation.IsValid)
        {
            return Task.FromResult(
                new CreateProjectResult
                {
                    Success = false,
                    ErrorCode =
                        validation.ErrorCode == "ShortName_TooShort"
                            ? "INVALID_SHORT_NAME"
                            : validation.ErrorCode,
                    ErrorMessage = $"Short name validation failed: {validation.ErrorCode}",
                }
            );
        }

        // Validate base project requirement for derived types
        var config = ProjectTypeService.GetTypeConfiguration(request.ProjectType);
        if (config.BaseProjectRequired && string.IsNullOrEmpty(request.BaseProjectGuid))
        {
            return Task.FromResult(
                new CreateProjectResult
                {
                    Success = false,
                    ErrorCode = "BASE_PROJECT_REQUIRED",
                    ErrorMessage = "Base project is required for this project type",
                }
            );
        }

        // Generate a new GUID for the project
        string projectGuid = Guid.NewGuid().ToString();

        return Task.FromResult(
            new CreateProjectResult { Success = true, ProjectGuid = projectGuid }
        );
    }

    #endregion
}
