using Paranext.DataProvider.Projects;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service for book comparison operations.
/// Provides functionality for comparing books between projects for copy dialog.
///
/// Contains CAP-022 (BookDisplayStyling) and CAP-013 (GetCompatibleCopyTargets).
/// </summary>
internal static class BookComparisonService
{
    /// <summary>
    /// Get compatible copy target projects for a source project.
    ///
    /// === CAP-013: GetCompatibleCopyTargets ===
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
        // TDD RED phase stub - implementation will be added by tdd-implementer
        throw new NotImplementedException(
            "CAP-013: GetCompatibleCopyTargets not yet implemented. "
                + "This stub exists for TDD RED phase - tests should compile but fail."
        );
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
