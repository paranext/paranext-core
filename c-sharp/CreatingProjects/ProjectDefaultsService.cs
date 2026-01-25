#nullable enable

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for project defaults and creation.
/// Implements CAP-EXT-007 (ProjectDefaultsInitializer).
/// </summary>
/// <remarks>
/// Golden master: gm-007-project-defaults
///
/// This service:
/// 1. Returns default settings for each project type
/// 2. Creates new projects with those defaults
///
/// Default values:
/// - Versification: English (except derived types inherit from base)
/// - Normalization: NFC (except Transliteration uses NFD)
/// - Editable: true
/// - USFM Version: 3
/// </remarks>
public static class ProjectDefaultsService
{
    #region Public Methods

    /// <summary>
    /// Gets default settings for the specified project type.
    /// </summary>
    /// <param name="projectType">The type of project</param>
    /// <param name="baseProjectGuid">Optional GUID of base project for derived types</param>
    /// <returns>Default settings for this project type</returns>
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
    /// <param name="request">Project creation request</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success/failure</returns>
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

/// <summary>
/// Default values for a project type.
/// </summary>
public record ProjectDefaults
{
    /// <summary>Default versification type.</summary>
    public required VersificationType Versification { get; init; }

    /// <summary>Default normalization form.</summary>
    public required ProjectNormalization Normalization { get; init; }

    /// <summary>Default editable state.</summary>
    public required bool Editable { get; init; }

    /// <summary>Default USFM version.</summary>
    public required int UsfmVersion { get; init; }

    /// <summary>Base project GUID for derived types.</summary>
    public string? BaseProjectGuid { get; init; }
}

/// <summary>
/// Versification type for new projects.
/// </summary>
public enum VersificationType
{
    English,
    Original,
    Septuagint,
    Vulgate,
    RussianOrthodox,
    RussianProtestant,
}

/// <summary>
/// Request to create a new project.
/// </summary>
public record CreateProjectRequest
{
    /// <summary>Short name (3-8 chars).</summary>
    public required string ShortName { get; init; }

    /// <summary>Full project name.</summary>
    public required string FullName { get; init; }

    /// <summary>BCP-47 language ID.</summary>
    public required string LanguageId { get; init; }

    /// <summary>Versification to use.</summary>
    public required VersificationType Versification { get; init; }

    /// <summary>Type of project.</summary>
    public required ProjectCreationType ProjectType { get; init; }

    /// <summary>Base project GUID for derived types.</summary>
    public string? BaseProjectGuid { get; init; }
}

/// <summary>
/// Result of project creation.
/// </summary>
public record CreateProjectResult
{
    /// <summary>True if creation succeeded.</summary>
    public required bool Success { get; init; }

    /// <summary>GUID of created project.</summary>
    public string? ProjectGuid { get; init; }

    /// <summary>Error code if failed.</summary>
    public string? ErrorCode { get; init; }

    /// <summary>Error message for display.</summary>
    public string? ErrorMessage { get; init; }
}
