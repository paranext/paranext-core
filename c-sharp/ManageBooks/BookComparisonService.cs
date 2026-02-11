namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service for book comparison operations.
/// Provides functionality for comparing books between projects for copy dialog.
///
/// Contains CAP-022 (BookDisplayStyling) and will contain future capabilities.
/// </summary>
internal static class BookComparisonService
{
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
