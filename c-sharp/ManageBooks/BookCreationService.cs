using Paratext.Data;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service providing book creation operations.
/// </summary>
/// <remarks>
/// This service implements CAP-015 (PermissionCheckForBookCreation) and related capabilities.
/// Ported from PT9/Paratext/ToolsMenu/CreateBooksForm.cs
/// </remarks>
internal static class BookCreationService
{
    /// <summary>
    /// Check permissions for book creation and grant if needed.
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:126-150
    /// Method: CreateBooksForm.cmdOK_Click (permission section)
    /// Maps to: EXT-001, BHV-300
    /// </remarks>
    /// <param name="selectedBooks">Books to create</param>
    /// <param name="scrText">Target project</param>
    /// <returns>Permission result with success/failure status</returns>
    /// <exception cref="ArgumentNullException">
    /// Thrown when <paramref name="selectedBooks"/> or <paramref name="scrText"/> is null.
    /// </exception>
    public static PermissionResult CheckAndGrantBookPermissions(
        BookSet selectedBooks,
        ScrText scrText
    )
    {
        ArgumentNullException.ThrowIfNull(selectedBooks);
        ArgumentNullException.ThrowIfNull(scrText);

        // Collect books where user does not have permission
        List<int> unauthorizedBooks = [];

        foreach (int bookNum in selectedBooks.SelectedBookNumbers)
        {
            if (!scrText.Creatable(bookNum))
            {
                unauthorizedBooks.Add(bookNum);
            }
        }

        if (unauthorizedBooks.Count > 0)
        {
            return new PermissionResult(
                Success: false,
                ErrorMessage: "You do not have permission to create some books",
                UnauthorizedBooks: unauthorizedBooks
            );
        }

        return new PermissionResult(Success: true, ErrorMessage: null, UnauthorizedBooks: []);
    }

    // Use shared constants from BookServiceHelpers
    private const int FirstBookNum = BookServiceHelpers.FirstBookNum;
    private const int LastBookNum = BookServiceHelpers.LastBookNum;
    private const int LastCanonicalBookNum = BookServiceHelpers.LastCanonicalBookNum;
    private const int FirstNonCanonicalBookNum = BookServiceHelpers.FirstNonCanonicalBookNum;

    /// <summary>
    /// Calculate available books for creation (excludes existing books).
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:225-238
    /// Method: CreateBooksForm.CreateAvailableBookSet
    /// Maps to: EXT-005, CAP-019, BHV-T015, BHV-T018
    ///
    /// EXPLANATION:
    /// This algorithm calculates which books are available for creation in a project:
    /// 1. For SBA (Study Bible Additions) projects: start with non-canonical books only (67-123)
    /// 2. For standard projects: start with all books (1-123)
    /// 3. Subtract books already present in the project (LocalBooksPresentSet)
    /// 4. Return the remaining books as available for creation
    ///
    /// Related: INV-004 (SBA projects cannot create canonical books)
    /// </remarks>
    /// <param name="scrText">Target project</param>
    /// <param name="isStudyBible">True if this is an SBA project</param>
    /// <returns>BookSet containing books available for creation</returns>
    /// <exception cref="ArgumentNullException">
    /// Thrown when <paramref name="scrText"/> is null.
    /// </exception>
    public static BookSet CreateAvailableBookSet(ScrText scrText, bool isStudyBible)
    {
        ArgumentNullException.ThrowIfNull(scrText);

        // Create a new BookSet to hold available books
        BookSet availableBooks = new();

        // Determine the starting book number based on project type
        // SBA projects can only create non-canonical books (INV-004)
        int startBookNum = isStudyBible ? FirstNonCanonicalBookNum : FirstBookNum;

        // Get books already present in the project
        BookSet existingBooks = scrText.Settings.LocalBooksPresentSet;

        // Add all books in the appropriate range that don't already exist
        for (int bookNum = startBookNum; bookNum <= LastBookNum; bookNum++)
        {
            // Only add if book doesn't already exist in project
            if (!existingBooks.IsSelected(bookNum) && !scrText.BookPresent(bookNum))
            {
                availableBooks.Add(bookNum);
            }
        }

        return availableBooks;
    }

    /// <summary>
    /// Gets books available for creation in a project.
    /// </summary>
    /// <remarks>
    /// === NEW IN PT10 ===
    /// Reason: PAPI command pattern - wraps CreateAvailableBookSet for JSON-RPC access
    /// Maps to: CAP-008 (GetAvailableBooks)
    ///
    /// This method:
    /// 1. Looks up the ScrText by project ID
    /// 2. Determines if the project is an SBA (Study Bible Additions) project
    /// 3. Calls CreateAvailableBookSet (CAP-019) to calculate available books
    /// 4. Returns AvailableBooksResult with available and existing books
    ///
    /// For SBA projects, only non-canonical books (67-123) are available (INV-004).
    /// For standard projects, all books (1-123) minus existing are available.
    /// </remarks>
    /// <param name="projectId">Project ID (GUID string).</param>
    /// <returns>Available books result with book info.</returns>
    public static AvailableBooksResult GetAvailableBooks(string projectId)
    {
        // Find the ScrText for this project
        ScrText? scrText = FindScrText(projectId);

        if (scrText == null)
        {
            return new AvailableBooksResult([], [], false);
        }

        // Determine if this is a Study Bible Additions project
        bool isStudyBible = scrText.Settings.IsStudyBibleAdditions;

        // Get the available books using CAP-019 implementation
        BookSet availableBookSet = CreateAvailableBookSet(scrText, isStudyBible);

        // Convert available books to BookInfo array
        List<BookInfo> availableBooks = [];
        foreach (int bookNum in availableBookSet.SelectedBookNumbers)
        {
            availableBooks.Add(CreateBookInfo(bookNum));
        }

        // Get existing books from the project
        List<BookInfo> existingBooks = [];
        for (int bookNum = FirstBookNum; bookNum <= LastBookNum; bookNum++)
        {
            if (scrText.BookPresent(bookNum))
            {
                existingBooks.Add(CreateBookInfo(bookNum));
            }
        }

        return new AvailableBooksResult([.. availableBooks], [.. existingBooks], isStudyBible);
    }

    /// <summary>
    /// Creates BookInfo for a book number.
    /// </summary>
    /// <remarks>
    /// Delegates to BookServiceHelpers.CreateBookInfo for shared implementation.
    /// </remarks>
    private static BookInfo CreateBookInfo(int bookNum) =>
        BookServiceHelpers.CreateBookInfo(bookNum);

    /// <summary>
    /// Finds a ScrText by project ID.
    /// </summary>
    /// <remarks>
    /// Delegates to BookServiceHelpers.FindScrText for shared implementation.
    /// </remarks>
    private static ScrText? FindScrText(string projectId) =>
        BookServiceHelpers.FindScrText(projectId);
}
