namespace Paranext.DataProvider.Checks;

public class CheckResultsInvalidated(List<string> checkIds, string projectId, string? bookId)
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
