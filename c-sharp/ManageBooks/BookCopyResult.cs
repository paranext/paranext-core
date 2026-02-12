namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Result of a book copy operation.
/// </summary>
/// <remarks>
/// === NEW IN PT10 ===
/// Reason: Result type for CopyBooks operation (CAP-020)
/// Maps to: CAP-020, EXT-006
/// </remarks>
public record BookCopyResult
{
    /// <summary>Whether the copy operation succeeded.</summary>
    public required bool Success { get; init; }

    /// <summary>Book numbers that were successfully copied.</summary>
    public required List<int> CopiedBooks { get; init; }

    /// <summary>Last book number that was copied (for navigation).</summary>
    public int LastCopiedBookNum { get; init; }

    /// <summary>Book numbers that failed to copy.</summary>
    public List<int> FailedBooks { get; init; } = [];

    /// <summary>Error messages for failed operations.</summary>
    public List<string> Errors { get; init; } = [];

    /// <summary>
    /// Creates a success result.
    /// </summary>
    public static BookCopyResult SuccessResult(List<int> copiedBooks, int lastCopiedBookNum)
    {
        return new BookCopyResult
        {
            Success = true,
            CopiedBooks = copiedBooks,
            LastCopiedBookNum = lastCopiedBookNum,
        };
    }

    /// <summary>
    /// Creates an error result.
    /// </summary>
    public static BookCopyResult ErrorResult(string errorMessage, int? failedBookNum = null)
    {
        return new BookCopyResult
        {
            Success = false,
            CopiedBooks = [],
            LastCopiedBookNum = 0,
            FailedBooks = failedBookNum.HasValue ? [failedBookNum.Value] : [],
            Errors = [errorMessage],
        };
    }

    /// <summary>
    /// Creates a partial success result with both copied and failed books.
    /// </summary>
    public static BookCopyResult PartialResult(
        List<int> copiedBooks,
        int lastCopiedBookNum,
        List<int> failedBooks,
        List<string> errors
    )
    {
        return new BookCopyResult
        {
            Success = copiedBooks.Count > 0 && failedBooks.Count == 0,
            CopiedBooks = copiedBooks,
            LastCopiedBookNum = lastCopiedBookNum,
            FailedBooks = failedBooks,
            Errors = errors,
        };
    }
}
