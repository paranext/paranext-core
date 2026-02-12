using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service providing book deletion operations.
/// </summary>
/// <remarks>
/// This service implements:
/// - CAP-004 (GetDeleteConfirmation) - confirmation message generation
/// - CAP-023 (DeleteBooksWithConfirmation) - orchestrated book deletion
/// Ported from PT9/Paratext/ToolsMenu/DeleteBooksForm.cs
/// </remarks>
internal static class BookDeletionService
{
    /// <summary>
    /// Get delete confirmation information for the specified books.
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/DeleteBooksForm.cs:72-98
    /// Method: DeleteBooksForm.DeleteBooks (confirmation section)
    /// Maps to: EXT-009, BHV-T012, BHV-308
    ///
    /// This method generates a confirmation message for deleting books.
    /// Key behaviors:
    /// - Default button is always No for safety (BHV-T012)
    /// - Shared (S/R enabled) projects show a different warning (BHV-308)
    /// </remarks>
    /// <param name="scrText">Target project</param>
    /// <param name="selectedBooks">Books to delete</param>
    /// <returns>DeleteConfirmation with confirmation details</returns>
    /// <exception cref="ArgumentNullException">If scrText or selectedBooks is null</exception>
    public static DeleteConfirmation GetDeleteConfirmation(ScrText scrText, BookSet selectedBooks)
    {
        ArgumentNullException.ThrowIfNull(scrText);
        ArgumentNullException.ThrowIfNull(selectedBooks);

        // Check if project is S/R enabled (shared)
        // In PT9, this was done via scrText.Settings.RemotePath
        // In PT10, S/R is not yet implemented, so we return false for now
        // TODO: When S/R is implemented, update this to check the actual S/R status
        bool isSharedProject = IsSharedProject(scrText);

        // Generate confirmation message
        string message = GenerateConfirmationMessage(selectedBooks, isSharedProject);

        // Default button is always No for safety (BHV-T012, gm-014)
        return new DeleteConfirmation(message, DefaultToNo: true, isSharedProject);
    }

    /// <summary>
    /// Determine if a project is S/R enabled (shared).
    /// </summary>
    /// <remarks>
    /// In PT9, this checked scrText.Settings.RemotePath to detect S/R enabled projects.
    /// In PT10, S/R is not yet fully implemented, so this returns false for now.
    /// When S/R is implemented, this should check the actual S/R status.
    /// </remarks>
    private static bool IsSharedProject(ScrText scrText)
    {
        // PT10 does not currently expose RemotePath via ParatextData API
        // Return false (local project) until S/R is implemented
        return false;
    }

    /// <summary>
    /// Generate the confirmation message text.
    /// </summary>
    private static string GenerateConfirmationMessage(BookSet selectedBooks, bool isSharedProject)
    {
        int bookCount = selectedBooks.Count;
        string bookText = bookCount == 1 ? "book" : "books";

        string message = $"Are you sure you want to delete {bookCount} {bookText}?";

        if (isSharedProject)
        {
            message +=
                " This project is shared via Send/Receive. Deleted books will be removed for all users after the next synchronization.";
        }

        return message;
    }

    /// <summary>
    /// Delete books from a project with confirmation handling.
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/DeleteBooksForm.cs:72-98
    /// Method: DeleteBooksForm.DeleteBooks
    /// Maps to: CAP-023, EXT-009, BHV-304
    ///
    /// EXPLANATION:
    /// This method orchestrates the book deletion workflow:
    /// 1. Validates the request parameters (project, books)
    /// 2. Handles user cancellation (Confirmed=false)
    /// 3. Enforces INV-001 (admin required for S/R projects)
    /// 4. Validates requested books exist in project
    /// 5. Deletes books via ScrText.DeleteBooks()
    /// 6. For SBA projects, removes SBA additions (BHV-113)
    /// 7. Returns result with affected books
    ///
    /// This overload finds the project by ID. For testing with DummyScrText,
    /// use the overload that accepts ScrText directly.
    /// </remarks>
    /// <param name="request">Delete books request with project ID, book numbers, and confirmation flags</param>
    /// <returns>BookOperationResult indicating success or failure with details</returns>
    public static BookOperationResult DeleteBooksWithConfirmation(DeleteBooksRequest request)
    {
        // Validate request is not null
        if (request == null)
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ValidationFailed,
                "Request cannot be null"
            );
        }

        // Validate project ID
        if (string.IsNullOrEmpty(request.ProjectId))
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ValidationFailed,
                "Project ID cannot be empty"
            );
        }

        // Find the project
        ScrText? scrText = BookServiceHelpers.FindScrText(request.ProjectId);
        if (scrText == null)
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ProjectNotFound,
                $"Project not found: {request.ProjectId}"
            );
        }

        // Delegate to ScrText overload which contains the core deletion logic
        return DeleteBooksWithConfirmation(
            scrText,
            request.BookNumbers,
            request.SkipConfirmation,
            request.Confirmed
        );
    }

    /// <summary>
    /// Delete books from a project with confirmation handling.
    /// This overload accepts a ScrText directly, useful for testing with DummyScrText.
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/DeleteBooksForm.cs:72-98
    /// Method: DeleteBooksForm.DeleteBooks
    /// Maps to: CAP-023, EXT-009, BHV-304
    ///
    /// This overload is primarily for testing where DummyScrText is used.
    /// The PAPI handler should use the request-based overload.
    /// </remarks>
    /// <param name="scrText">The project to delete books from</param>
    /// <param name="bookNumbers">Book numbers to delete</param>
    /// <param name="skipConfirmation">Whether to skip confirmation</param>
    /// <param name="confirmed">Whether user confirmed deletion</param>
    /// <returns>BookOperationResult indicating success or failure with details</returns>
    public static BookOperationResult DeleteBooksWithConfirmation(
        ScrText scrText,
        int[] bookNumbers,
        bool skipConfirmation = false,
        bool confirmed = false
    )
    {
        // Handle null scrText
        if (scrText == null)
        {
            return BookOperationResult.ErrorResult(
                BookErrorCode.ProjectNotFound,
                "ScrText cannot be null"
            );
        }

        // Handle empty book list - success with no deletions
        if (bookNumbers == null || bookNumbers.Length == 0)
        {
            return BookOperationResult.SuccessResult([], 0);
        }

        // Check if user cancelled (Confirmed=false and not skipping confirmation)
        if (!skipConfirmation && !confirmed)
        {
            // User cancelled the operation - return success with no books affected
            return BookOperationResult.SuccessResult([], 0);
        }

        // Check permissions (INV-001: admin required for S/R projects)
        bool isShared = IsSharedProject(scrText);
        if (isShared)
        {
            bool isAdmin = IsAdministrator(scrText);
            if (!isAdmin)
            {
                return BookOperationResult.ErrorResultWithFailedBooks(
                    BookErrorCode.PermissionDenied,
                    "Only administrators can delete books in shared projects",
                    bookNumbers
                );
            }
        }

        // Validate all books exist in project
        var missingBooks = new List<int>();
        foreach (int bookNum in bookNumbers)
        {
            if (!scrText.BookPresent(bookNum))
            {
                missingBooks.Add(bookNum);
            }
        }

        if (missingBooks.Count > 0)
        {
            return BookOperationResult.ErrorResultWithFailedBooks(
                BookErrorCode.BookNotFound,
                $"Books not found in project: {string.Join(", ", missingBooks)}",
                [.. missingBooks]
            );
        }

        // Build BookSet from book numbers
        var booksToDelete = new BookSet();
        foreach (int bookNum in bookNumbers)
        {
            booksToDelete.Add(bookNum);
        }

        // Check if this is an SBA project
        bool isSBA = scrText.Settings.IsStudyBibleAdditions;

        // Delete books
        try
        {
            // For SBA projects, remove additions before deleting books
            if (isSBA)
            {
                foreach (int bookNum in bookNumbers)
                {
                    RemoveSBAAdditionsForBook(scrText, bookNum);
                }
            }

            // Delete the books from the project
            scrText.DeleteBooks(booksToDelete);

            // Return success with affected books
            int lastBookNum = bookNumbers.Length > 0 ? bookNumbers[^1] : 0;

            return BookOperationResult.SuccessResult(bookNumbers, lastBookNum);
        }
        catch (Exception ex)
        {
            // Handle lock failure or other exceptions
            if (ex.Message.Contains("lock", StringComparison.OrdinalIgnoreCase))
            {
                return BookOperationResult.ErrorResult(
                    BookErrorCode.LockNotObtained,
                    $"Could not obtain write lock for project: {ex.Message}"
                );
            }

            return BookOperationResult.ErrorResult(
                BookErrorCode.ValidationFailed,
                $"Failed to delete books: {ex.Message}"
            );
        }
    }

    /// <summary>
    /// Determines if the current user is an administrator for the project.
    /// </summary>
    /// <remarks>
    /// === NEW IN PT10 ===
    /// Reason: Permission check helper for INV-001 enforcement
    /// Maps to: CAP-023, INV-001
    ///
    /// In PT9, administrator status was checked via project permissions.
    /// In PT10, since S/R is not fully implemented, this returns true by default.
    /// When S/R is implemented, this should check actual admin status.
    /// </remarks>
    private static bool IsAdministrator(ScrText scrText)
    {
        // TODO: When S/R is fully implemented, check actual admin status
        // For now, return true to allow deletion (since S/R is not active)
        return true;
    }

    /// <summary>
    /// Remove SBA additions for a book before deletion.
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/DeleteBooksForm.cs (SBA handling)
    /// Maps to: CAP-023, BHV-113
    ///
    /// When deleting from SBA projects, StudyBibleOperations.RemoveAdditionsForBook
    /// should be called to remove the additions before the book is deleted.
    ///
    /// TODO: Implement when StudyBibleOperations API is available in PT10.
    /// Currently a no-op placeholder.
    /// </remarks>
    private static void RemoveSBAAdditionsForBook(ScrText scrText, int bookNum)
    {
        // Suppress unused parameter warnings - parameters required for future implementation
        _ = scrText;
        _ = bookNum;
    }
}
