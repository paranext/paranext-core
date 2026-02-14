namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Result of a book operation.
/// </summary>
/// <remarks>
/// === NEW IN PT10 ===
/// Reason: Type definition for PAPI command contract result handling
/// Maps to: CAP-016, data-contracts.md
/// </remarks>
public record BookOperationResult
{
    /// <summary>Whether the operation succeeded.</summary>
    public required bool Success { get; init; }

    /// <summary>Book numbers that were affected.</summary>
    public int[]? BooksAffected { get; init; }

    /// <summary>Last book number affected (for navigation).</summary>
    public int LastBookNum { get; init; }

    /// <summary>Error code if failed.</summary>
    public BookErrorCode? ErrorCode { get; init; }

    /// <summary>User-friendly error message.</summary>
    public string? ErrorMessage { get; init; }

    /// <summary>Books that failed (for partial success).</summary>
    public int[]? FailedBooks { get; init; }

    /// <summary>Warning messages (non-fatal issues).</summary>
    public List<string>? Warnings { get; init; }

    /// <summary>
    /// Creates a success result.
    /// </summary>
    public static BookOperationResult SuccessResult(int[] booksAffected, int lastBookNum)
    {
        return new BookOperationResult
        {
            Success = true,
            BooksAffected = booksAffected,
            LastBookNum = lastBookNum,
        };
    }

    /// <summary>
    /// Creates a success result with warnings.
    /// </summary>
    public static BookOperationResult SuccessResultWithWarnings(
        int[] booksAffected,
        int lastBookNum,
        List<string> warnings
    )
    {
        return new BookOperationResult
        {
            Success = true,
            BooksAffected = booksAffected,
            LastBookNum = lastBookNum,
            Warnings = warnings,
        };
    }

    /// <summary>
    /// Creates an error result.
    /// </summary>
    public static BookOperationResult ErrorResult(BookErrorCode errorCode, string errorMessage)
    {
        return new BookOperationResult
        {
            Success = false,
            ErrorCode = errorCode,
            ErrorMessage = errorMessage,
        };
    }

    /// <summary>
    /// Creates an error result with failed books.
    /// </summary>
    public static BookOperationResult ErrorResultWithFailedBooks(
        BookErrorCode errorCode,
        string errorMessage,
        int[] failedBooks
    )
    {
        return new BookOperationResult
        {
            Success = false,
            ErrorCode = errorCode,
            ErrorMessage = errorMessage,
            FailedBooks = failedBooks,
        };
    }
}
