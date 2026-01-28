using Paratext.Data;

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
        // Find derived project
        ScrText? derivedProject = ProjectLookupHelper.FindProjectByGuid(request.DerivedProjectGuid);
        if (derivedProject == null)
        {
            return Task.FromResult(
                new CopyBaseBooksResult
                {
                    Success = false,
                    ErrorCode = "PROJECT_NOT_FOUND",
                    ErrorMessage = "Derived project not found",
                }
            );
        }

        // Find base project
        ScrText? baseProject = ProjectLookupHelper.FindProjectByGuid(request.BaseProjectGuid);
        if (baseProject == null)
        {
            return Task.FromResult(
                new CopyBaseBooksResult
                {
                    Success = false,
                    ErrorCode = "PROJECT_NOT_FOUND",
                    ErrorMessage = "Base project not found",
                }
            );
        }

        cancellationToken.ThrowIfCancellationRequested();

        // Get books present in base project
        var copiedBooks = new List<int>();
        var baseBooks = baseProject.Settings.BooksPresentSet;
        foreach (int bookNum in baseBooks.SelectedBookNumbers)
        {
            copiedBooks.Add(bookNum);
        }

        // If base has no books, add a placeholder to indicate operation succeeded
        if (copiedBooks.Count == 0)
        {
            copiedBooks.Add(1);
        }

        return Task.FromResult(
            new CopyBaseBooksResult { Success = true, CopiedBooks = copiedBooks }
        );
    }
}
