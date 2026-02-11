using Paratext.Data;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service providing book deletion confirmation information.
/// </summary>
/// <remarks>
/// This service implements CAP-004 (GetDeleteConfirmation).
/// Ported from PT9/Paratext/ToolsMenu/DeleteBooksForm.cs
///
/// TDD STUB: This is a minimal stub to allow tests to compile.
/// The implementer agent will complete the implementation to make tests pass.
/// </remarks>
internal static class BookDeletionService
{
    /// <summary>
    /// Get delete confirmation information for the specified books.
    /// </summary>
    /// <remarks>
    /// === TO BE PORTED FROM PT9 ===
    /// Source: PT9/Paratext/ToolsMenu/DeleteBooksForm.cs:72-98
    /// Method: DeleteBooksForm.DeleteBooks (confirmation section)
    /// Maps to: EXT-009, BHV-T012, BHV-308
    ///
    /// TDD STUB: Returns default values that will FAIL tests.
    /// Implementer will complete this to make tests pass.
    /// </remarks>
    /// <param name="scrText">Target project</param>
    /// <param name="selectedBooks">Books to delete</param>
    /// <returns>DeleteConfirmation with confirmation details</returns>
    public static DeleteConfirmation GetDeleteConfirmation(ScrText scrText, BookSet selectedBooks)
    {
        // TDD STUB: Return values that will cause tests to FAIL
        // This enables the RED phase of TDD
        throw new NotImplementedException("TDD stub - implement to make tests pass");
    }
}

/// <summary>
/// Information needed to confirm book deletion.
/// </summary>
/// <param name="Message">Confirmation message to display</param>
/// <param name="DefaultToNo">Whether the default button should be No (for safety)</param>
/// <param name="IsSharedProject">Whether the project is S/R enabled</param>
public record DeleteConfirmation(string Message, bool DefaultToNo, bool IsSharedProject);
