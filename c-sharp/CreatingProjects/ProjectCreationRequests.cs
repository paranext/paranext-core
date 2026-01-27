namespace Paranext.DataProvider.CreatingProjects;

public record CreateProjectRequest
{
    public required string ShortName { get; init; }
    public required string FullName { get; init; }
    public required string LanguageId { get; init; }
    public required VersificationType Versification { get; init; }
    public required ProjectType ProjectType { get; init; }
    public string? BaseProjectGuid { get; init; }
    public string? Copyright { get; init; }
    public ProjectNormalization? Normalization { get; init; }
    public int? UsfmVersion { get; init; }
    public bool? Editable { get; init; }
    public string? EncodingConverter { get; init; }
    public bool? EncoderReverseDirection { get; init; }
}

public record UpdateProjectRequest
{
    public required string ProjectGuid { get; init; }
    public string? ShortName { get; init; }
    public string? FullName { get; init; }
    public string? Copyright { get; init; }
    public string? LanguageId { get; init; }
    public VersificationType? Versification { get; init; }
    public ProjectType? ProjectType { get; init; }
    public string? BaseProjectGuid { get; init; }
    public string? EncodingConverter { get; init; }
    public bool? EncoderReverseDirection { get; init; }
    public ProjectNormalization? Normalization { get; init; }
    public int? UsfmVersion { get; init; }
    public bool? Editable { get; init; }
    public IReadOnlyList<int>? PlannedBooks { get; init; }
}

public record CreateBooksRequest
{
    public required string ProjectGuid { get; init; }
    public required IReadOnlyList<int> BookNumbers { get; init; }
    public required BookCreationMode Mode { get; init; }
    public string? ModelProjectGuid { get; init; }
}

public record CopyBaseBooksRequest
{
    public required string DerivedProjectGuid { get; init; }
    public required string BaseProjectGuid { get; init; }
}

public record CleanupProjectRequest
{
    public required string ProjectGuid { get; init; }
    public required bool WasRegistered { get; init; }
    public ProjectMetadata? Registration { get; init; }
}
