namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Complete book comparison results for the copy books dialog.
///
/// === NEW IN PT10 ===
/// Reason: PAPI command pattern - response type for CompareBooks API
/// Maps to: CAP-007
///
/// Contains comparison information for all books in both projects,
/// plus project metadata needed for UI display.
/// </summary>
/// <param name="Books">List of book comparison information (union of books from both projects).</param>
/// <param name="SourceProject">Source project metadata including type and IsStudyBible flag.</param>
/// <param name="DestProject">Destination project metadata including type and IsStudyBible flag.</param>
public record BookComparisonResult(
    BookComparisonInfo[] Books,
    ProjectInfo SourceProject,
    ProjectInfo DestProject
);
