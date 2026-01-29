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

/// <summary>
/// Result of project name validation.
/// Maps to EXT-002.
/// </summary>
public record ProjectNameValidationResult
{
    public required bool IsValid { get; init; }
    public string? FullNameError { get; init; }
    public string? ShortNameError { get; init; }
    public IReadOnlyList<string>? ShortNameSuggestions { get; init; }
}

/// <summary>
/// Result of short name generation.
/// Maps to EXT-001.
/// </summary>
public record ShortNameGenerationResult
{
    public required string Abbreviation { get; init; }
    public required bool WasModified { get; init; }
}

/// <summary>
/// Result of file naming pattern validation.
/// Maps to EXT-B2-006, BHV-254.
/// </summary>
public record FileNamingPatternResult
{
    public required bool IsValid { get; init; }
    public string? PrefixError { get; init; }
    public string? SuffixError { get; init; }
    public string? ExtensionError { get; init; }
    public FileNamingExamples? Examples { get; init; }
}

/// <summary>
/// Examples of file naming patterns.
/// </summary>
public record FileNamingExamples
{
    public required string Genesis { get; init; }
    public required string Matthew { get; init; }
    public required string SongOfThree { get; init; }
}

/// <summary>
/// Translation information for derived project types.
/// Used to link derived projects to their base projects.
/// Maps to SPEC-002, BHV-104.
/// </summary>
public record TranslationInfo
{
    public required ProjectType Type { get; init; }
    public string? BaseProjectName { get; init; }
    public string? BaseProjectGuid { get; init; }

    /// <summary>
    /// Returns true if this TranslationInfo is empty (no base project).
    /// </summary>
    public bool IsEmpty =>
        string.IsNullOrEmpty(BaseProjectName) && string.IsNullOrEmpty(BaseProjectGuid);

    /// <summary>
    /// Serializes to format: "Type:BaseProjectName:BaseProjectGuid"
    /// </summary>
    public override string ToString()
    {
        if (IsEmpty)
            return Type.ToString();
        return $"{Type}:{BaseProjectName}:{BaseProjectGuid}";
    }
}
