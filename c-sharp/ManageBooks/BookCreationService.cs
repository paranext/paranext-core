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
        List<int> unauthorizedBooks = new();

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

        return new PermissionResult(Success: true, ErrorMessage: null, UnauthorizedBooks: new());
    }
}
