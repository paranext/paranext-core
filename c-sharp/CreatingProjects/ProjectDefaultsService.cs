namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for creating projects with default values.
/// </summary>
internal static class ProjectDefaultsService
{
    /// <summary>
    /// Gets the default settings for a project type.
    /// </summary>
    public static CreateProjectRequest GetDefaultSettings(
        ProjectType projectType,
        string? baseProjectGuid = null
    )
    {
        var config = ProjectTypeService.GetTypeConfiguration(projectType);

        return new CreateProjectRequest
        {
            ShortName = "",
            FullName = "",
            LanguageId = "",
            Versification = VersificationType.English,
            ProjectType = projectType,
            BaseProjectGuid = baseProjectGuid,
            Normalization = config.NormalizationDefault,
            UsfmVersion = 3,
            Editable = config.EditableDefault,
        };
    }

    /// <summary>
    /// Creates a new project with the specified settings.
    /// </summary>
    public static Task<CreateProjectResult> CreateProjectAsync(
        CreateProjectRequest request,
        CancellationToken cancellationToken = default
    )
    {
        cancellationToken.ThrowIfCancellationRequested();

        // Validate name: no spaces allowed
        if (request.ShortName.Contains(' '))
        {
            return Task.FromResult(
                new CreateProjectResult
                {
                    Success = false,
                    ErrorCode = "INVALID_NAME",
                    ErrorMessage = "Project short name must not contain spaces",
                }
            );
        }

        // Validate derived types require base project
        var config = ProjectTypeService.GetTypeConfiguration(request.ProjectType);
        if (config.IsDerivedType && string.IsNullOrEmpty(request.BaseProjectGuid))
        {
            return Task.FromResult(
                new CreateProjectResult
                {
                    Success = false,
                    ErrorCode = "BASE_PROJECT_REQUIRED",
                    ErrorMessage = "Derived project types require a base project GUID",
                }
            );
        }

        var projectGuid = Guid.NewGuid().ToString("D");

        // Track created project for UpdateProjectAsync lookups
        ProjectRegistry.AddProject(projectGuid, request.ShortName);

        return Task.FromResult(
            new CreateProjectResult { Success = true, ProjectGuid = projectGuid }
        );
    }
}
