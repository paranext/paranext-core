namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Comparison information for a single book.
///
/// Used by the copy books dialog to display comparison status and default selection.
/// </summary>
/// <param name="BookNum">Book number (1-123).</param>
/// <param name="BookName">Display name of the book.</param>
/// <param name="Comparison">Comparison result (SourceNewer, DestNewer, Same, OnlyInSource, OnlyInDest).</param>
/// <param name="SourceModified">Source file modification date (null if not in source).</param>
/// <param name="DestModified">Destination file modification date (null if not in dest).</param>
/// <param name="DefaultSelected">Whether this book should be selected by default for copying.</param>
public record BookComparisonInfo(
    int BookNum,
    string BookName,
    ComparisonResult Comparison,
    DateTime? SourceModified,
    DateTime? DestModified,
    bool DefaultSelected
);
