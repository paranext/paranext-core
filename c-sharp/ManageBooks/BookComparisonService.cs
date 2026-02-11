using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service for book comparison operations.
/// Provides functionality for comparing books between projects for copy dialog.
///
/// Contains CAP-021 (CompareBooks), CAP-022 (BookDisplayStyling), and CAP-013 (GetCompatibleCopyTargets).
/// </summary>
internal static class BookComparisonService
{
    /// <summary>
    /// Get compatible copy target projects for a source project.
    ///
    /// === NEW IN PT10 ===
    /// Reason: PAPI command pattern for copy books dialog
    /// Maps to: CAP-013
    ///
    /// Filters projects based on source project type compatibility.
    ///
    /// Rules (from PT9):
    /// - INV-007: StudyBible projects can only copy to other StudyBible projects
    /// - INV-008: SBA (StudyBibleAdditions) projects can only copy to other SBA projects
    /// - Standard projects can copy to multiple compatible types
    ///
    /// Maps to: BHV-552, BHV-553, BHV-554
    /// Golden Masters: gm-003, gm-004, gm-005
    /// </summary>
    /// <param name="sourceProjectId">ID of the source project</param>
    /// <param name="paratextProjects">Project repository for accessing project metadata</param>
    /// <returns>Array of compatible target projects (never null)</returns>
    public static ProjectInfo[] GetCompatibleCopyTargets(
        string sourceProjectId,
        LocalParatextProjects paratextProjects
    )
    {
        // Get the source project using shared helper
        ScrText? sourceScrText = BookServiceHelpers.FindScrText(sourceProjectId);
        if (sourceScrText == null)
        {
            // Source project not found - return empty array
            return [];
        }

        // Get source project type information
        var sourceType = sourceScrText.Settings.TranslationInfo.Type;
        bool sourceIsSBA = sourceScrText.Settings.IsStudyBibleAdditions;
        bool sourceIsStudyBible = sourceType == ProjectType.StudyBible;

        // Get all available projects
        var allProjects = ScrTextCollection.ScrTexts(IncludeProjects.ScriptureOnly);

        var compatibleTargets = new List<ProjectInfo>();

        foreach (var targetScrText in allProjects)
        {
            // Exclude the source project from its own target list
            // Use case-insensitive comparison because HexId.ToString() may differ in case
            if (
                string.Equals(
                    targetScrText.Guid.ToString(),
                    sourceProjectId,
                    StringComparison.OrdinalIgnoreCase
                )
            )
                continue;

            var targetType = targetScrText.Settings.TranslationInfo.Type;
            bool targetIsSBA = targetScrText.Settings.IsStudyBibleAdditions;
            bool targetIsStudyBible = targetType == ProjectType.StudyBible;

            // Apply compatibility rules:
            // INV-007: StudyBible can only copy to StudyBible
            if (sourceIsStudyBible && !targetIsStudyBible)
                continue;

            // INV-008: SBA can only copy to SBA
            if (sourceIsSBA && !targetIsSBA)
                continue;

            // For standard projects (not StudyBible, not SBA):
            // Can copy to most types including StudyBible and SBA per gm-003
            // No additional filtering needed for standard projects

            // Project is compatible - add to results
            compatibleTargets.Add(
                new ProjectInfo(
                    ProjectId: targetScrText.Guid.ToString(),
                    ProjectName: targetScrText.Name,
                    ProjectType: targetType.ToString() ?? "Unknown",
                    IsStudyBible: targetIsStudyBible || targetIsSBA
                )
            );
        }

        return [.. compatibleTargets];
    }

    /// <summary>
    /// Compare books between source and destination projects.
    /// Determines newer/older/same status for each book.
    ///
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs:279-363
    /// Method: CopyBooksForm.LoadBooks
    /// Maps to: EXT-007, CAP-021, BHV-303, BHV-T009, BHV-552-555
    ///
    /// Algorithm (from EXT-007):
    /// 1. Get union of BooksPresentSet from source and dest projects
    /// 2. For each book, check BookPresent() in both projects
    /// 3. If both have book, compare file modification dates
    /// 4. Set DefaultSelected = true only for SourceNewer and OnlyInSource
    /// </summary>
    /// <param name="sourceScrText">Source project</param>
    /// <param name="destScrText">Destination project</param>
    /// <returns>List of BookComparisonInfo with comparison states</returns>
    public static List<BookComparisonInfo> CompareBooks(ScrText sourceScrText, ScrText destScrText)
    {
        var result = new List<BookComparisonInfo>();

        // Get union of books present in both projects
        // PT9 uses: BookSet allBooks = fromScrText.Settings.BooksPresentSet | toScrText.Settings.BooksPresentSet;
        // We iterate through all possible book numbers and check presence via file existence
        // because BooksPresentSet may not be updated in DummyScrText test scenarios

        var allBookNumbers = new HashSet<int>();

        // Scan source for present books
        for (
            int bookNum = BookServiceHelpers.FirstBookNum;
            bookNum <= BookServiceHelpers.LastBookNum;
            bookNum++
        )
        {
            if (IsBookPresent(sourceScrText, bookNum) || IsBookPresent(destScrText, bookNum))
            {
                allBookNumbers.Add(bookNum);
            }
        }

        // Process each book in the union
        foreach (int bookNum in allBookNumbers.OrderBy(n => n))
        {
            bool sourceHasBook = IsBookPresent(sourceScrText, bookNum);
            bool destHasBook = IsBookPresent(destScrText, bookNum);

            DateTime? sourceModified = sourceHasBook
                ? GetBookModificationDate(sourceScrText, bookNum)
                : null;
            DateTime? destModified = destHasBook
                ? GetBookModificationDate(destScrText, bookNum)
                : null;

            // Determine comparison state
            var comparison = DetermineComparisonResult(
                sourceHasBook,
                destHasBook,
                sourceModified,
                destModified
            );

            // Default selection: select if source is newer or only in source (per gm-023)
            bool defaultSelected =
                comparison == ComparisonResult.SourceNewer
                || comparison == ComparisonResult.OnlyInSource;

            // Get book name
            string bookName = BookServiceHelpers.GetBookName(bookNum);

            result.Add(
                new BookComparisonInfo(
                    BookNum: bookNum,
                    BookName: bookName,
                    Comparison: comparison,
                    SourceModified: sourceModified,
                    DestModified: destModified,
                    DefaultSelected: defaultSelected
                )
            );
        }

        return result;
    }

    /// <summary>
    /// Determines the comparison result based on book presence and modification dates.
    /// </summary>
    /// <param name="sourceHasBook">Whether source project has the book.</param>
    /// <param name="destHasBook">Whether destination project has the book.</param>
    /// <param name="sourceModified">Source file modification date (null if not present).</param>
    /// <param name="destModified">Destination file modification date (null if not present).</param>
    /// <returns>The comparison result for the book.</returns>
    private static ComparisonResult DetermineComparisonResult(
        bool sourceHasBook,
        bool destHasBook,
        DateTime? sourceModified,
        DateTime? destModified
    )
    {
        if (sourceHasBook && destHasBook)
        {
            // Both have the book - compare dates
            if (sourceModified > destModified)
                return ComparisonResult.SourceNewer;
            if (destModified > sourceModified)
                return ComparisonResult.DestNewer;
            return ComparisonResult.Same;
        }

        if (sourceHasBook)
            return ComparisonResult.OnlyInSource;

        return ComparisonResult.OnlyInDest;
    }

    /// <summary>
    /// Checks if a book is present in a project by checking if the book file exists.
    /// This is more reliable than BookPresent() for DummyScrText test scenarios.
    /// </summary>
    private static bool IsBookPresent(ScrText scrText, int bookNum)
    {
        try
        {
            // First try the canonical BookPresent method
            if (scrText.BookPresent(bookNum))
            {
                return true;
            }

            // Fallback: Check if book file exists directly
            // This handles cases where BooksPresentSet isn't updated (e.g., in-memory tests)
            string bookFilePath = scrText.BookFilePath(bookNum);
            return !string.IsNullOrEmpty(bookFilePath) && scrText.FileManager.Exists(bookFilePath);
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Gets the modification date of a book file.
    /// </summary>
    private static DateTime? GetBookModificationDate(ScrText scrText, int bookNum)
    {
        try
        {
            string bookFilePath = scrText.BookFilePath(bookNum);
            if (!string.IsNullOrEmpty(bookFilePath) && scrText.FileManager.Exists(bookFilePath))
            {
                return scrText.FileManager.GetLastWriteTime(bookFilePath);
            }
        }
        catch
        {
            // If we can't get the date, return null
        }

        return null;
    }

    /// <summary>
    /// Determine display style based on comparison state.
    ///
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/FileMenu/ImportBooksForm.cs:114-156
    /// Method: ImportBooksForm.StyleDataGridRow
    /// Maps to: EXT-008, BHV-T009
    /// </summary>
    /// <param name="state">Comparison result</param>
    /// <returns>Style to apply (Bold for newer, Gray for missing, Regular for same)</returns>
    public static BookDisplayStyle GetDisplayStyle(ComparisonResult state)
    {
        return state switch
        {
            ComparisonResult.SourceNewer => new BookDisplayStyle(
                SourceBold: true,
                DestBold: false,
                SourceGray: false,
                DestGray: false
            ),
            ComparisonResult.DestNewer => new BookDisplayStyle(
                SourceBold: false,
                DestBold: true,
                SourceGray: false,
                DestGray: false
            ),
            ComparisonResult.Same => new BookDisplayStyle(
                SourceBold: false,
                DestBold: false,
                SourceGray: false,
                DestGray: false
            ),
            ComparisonResult.OnlyInSource => new BookDisplayStyle(
                SourceBold: false,
                DestBold: false,
                SourceGray: false,
                DestGray: true
            ),
            ComparisonResult.OnlyInDest => new BookDisplayStyle(
                SourceBold: false,
                DestBold: false,
                SourceGray: true,
                DestGray: false
            ),
            _ => throw new ArgumentOutOfRangeException(
                nameof(state),
                state,
                "Unknown ComparisonResult value"
            ),
        };
    }
}
