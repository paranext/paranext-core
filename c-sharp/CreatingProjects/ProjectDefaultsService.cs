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
    /// Stub -- implementation pending (CAP-012).
    /// </summary>
    public static Task<CreateProjectResult> CreateProjectAsync(
        CreateProjectRequest request,
        CancellationToken cancellationToken = default
    )
    {
        throw new NotImplementedException("CAP-012: CreateProjectAsync not yet implemented");
    }
}
