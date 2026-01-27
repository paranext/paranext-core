namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for derived project operations (e.g., copying books from base project).
/// </summary>
internal static class DerivedProjectService
{
    public static Task<CopyBaseBooksResult> CopyBaseBooksAsync(
        CopyBaseBooksRequest request,
        CancellationToken cancellationToken = default
    )
    {
        throw new NotImplementedException();
    }
}
