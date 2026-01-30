namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Result of project creation operation.
/// </summary>
public record ProjectCreationResult
{
    public required bool Success { get; init; }
    public ProjectInfo? Project { get; init; }
    public ProjectCreationError? Error { get; init; }

    public static ProjectCreationResult Succeeded(ProjectInfo project) =>
        new() { Success = true, Project = project };

    public static ProjectCreationResult Failed(
        ProjectCreationErrorCode code,
        string message,
        string? field = null
    ) =>
        new()
        {
            Success = false,
            Error = new ProjectCreationError
            {
                Code = code,
                Message = message,
                Field = field,
            },
        };
}

/// <summary>
/// Information about a created project.
/// </summary>
public record ProjectInfo
{
    public required string ShortName { get; init; }
    public required string FullName { get; init; }
    public required string Guid { get; init; }
    public required ProjectType ProjectType { get; init; }
    public required string LanguageId { get; init; }
    public required string Versification { get; init; }
    public required DateTime CreatedAt { get; init; }
    public string? BaseProjectName { get; init; }
    public string? BaseProjectGuid { get; init; }
    public required string SettingsFilePath { get; init; }
}

/// <summary>
/// Project creation error details.
/// </summary>
public record ProjectCreationError
{
    public required ProjectCreationErrorCode Code { get; init; }
    public required string Message { get; init; }
    public string? Field { get; init; }
    public IDictionary<string, object>? Details { get; init; }
}
