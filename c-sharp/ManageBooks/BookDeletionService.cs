using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service providing book deletion confirmation information.
/// </summary>
/// <remarks>
/// This service implements CAP-004 (GetDeleteConfirmation).
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
}

/// <summary>
/// Information needed to confirm book deletion.
/// </summary>
/// <param name="Message">Confirmation message to display</param>
/// <param name="DefaultToNo">Whether the default button should be No (for safety)</param>
/// <param name="IsSharedProject">Whether the project is S/R enabled</param>
public record DeleteConfirmation(string Message, bool DefaultToNo, bool IsSharedProject);
