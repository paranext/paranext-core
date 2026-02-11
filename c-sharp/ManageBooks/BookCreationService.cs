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

    /// <summary>
    /// Calculate available books for creation (excludes existing books).
    /// </summary>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:225-238
    /// Method: CreateBooksForm.CreateAvailableBookSet
    /// Maps to: EXT-005, CAP-019, BHV-T015, BHV-T018
    ///
    /// For SBA projects: returns only non-canonical books (67-124)
    /// For standard projects: returns all books (1-124)
    /// Both subtract existing books from project.
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

        // RED PHASE STUB: Implementation to be provided by TDD Implementer
        // This stub exists solely to allow tests to compile and fail properly
        throw new NotImplementedException(
            "CAP-019: CreateAvailableBookSet not yet implemented. "
                + "See extraction-plan.md EXT-005 for implementation details."
        );
    }
}
