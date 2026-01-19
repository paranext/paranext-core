namespace Paranext.DataProvider.CreatingProjects
{
    /// <summary>
    /// Progress report for book copying operations (e.g., Study Bible base copy).
    /// </summary>
    /// <param name="BookNum">The book number being processed (1-based canonical book number)</param>
    /// <param name="Current">The current book index in the sequence (1-based)</param>
    /// <param name="Total">The total number of books to process</param>
    /// <seealso cref="EXT-004 in extraction-plan.md"/>
    public record BookCopyProgress(int BookNum, int Current, int Total);

    /// <summary>
    /// Progress report for USFM conversion operations.
    /// </summary>
    /// <param name="BookNum">The book number being processed (1-based canonical book number)</param>
    /// <param name="Current">The current book index in the sequence (1-based)</param>
    /// <param name="Total">The total number of books to process</param>
    /// <param name="Message">Descriptive message about current operation</param>
    /// <seealso cref="EXT-009 in extraction-plan.md"/>
    public record ConversionProgress(int BookNum, int Current, int Total, string Message);
}
