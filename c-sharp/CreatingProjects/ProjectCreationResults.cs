namespace Paranext.DataProvider.CreatingProjects;

public record CreateProjectResult
{
    public required bool Success { get; init; }
    public string? ProjectGuid { get; init; }
    public string? ErrorCode { get; init; }
    public string? ErrorMessage { get; init; }
}

public record UpdateProjectResult
{
    public required bool Success { get; init; }
    public string? ErrorCode { get; init; }
    public string? ErrorMessage { get; init; }
}

public record CreateBooksResult
{
    public required bool Success { get; init; }
    public required int LastCreatedBookNum { get; init; }
    public IReadOnlyList<string> Errors { get; init; } = Array.Empty<string>();
    public IReadOnlyList<int> CreatedBooks { get; init; } = Array.Empty<int>();
}

public record CopyBaseBooksResult
{
    public required bool Success { get; init; }
    public IReadOnlyList<int> CopiedBooks { get; init; } = Array.Empty<int>();
    public string? ErrorCode { get; init; }
    public string? ErrorMessage { get; init; }
}
