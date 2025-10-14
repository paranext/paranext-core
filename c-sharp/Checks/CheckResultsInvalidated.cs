namespace Paranext.DataProvider.Checks;

/// <summary>
/// Represents check results that have been invalidated for a project.  This class must
/// serialize to the CheckResultsInvalidated type defined in TypeScript.
/// </summary>
public sealed class CheckResultsInvalidated(List<string> checkIds, string projectId, string? bookId)
{
    public List<string> CheckIds { get; init; } =
        (checkIds != null && checkIds.Count > 0)
            ? checkIds
            : throw new ArgumentNullException(nameof(checkIds));
    public string ProjectId { get; init; } =
        projectId ?? throw new ArgumentNullException(nameof(projectId));
    public string Scope { get; init; } = string.IsNullOrEmpty(bookId) ? "all" : "book";
    public string? BookId { get; init; } = bookId;
};
