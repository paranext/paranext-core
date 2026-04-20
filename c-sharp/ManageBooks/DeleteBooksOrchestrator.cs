using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/ToolsMenu/DeleteBooksForm.cs:72-163
// Method: DeleteBooksForm.DeleteBooks
// Maps to: EXT-005 (BHV-100, BHV-310, BHV-312, BHV-404)
//
// STUB — Test Writer RED skeleton for CAP-005.
// The orchestration entry point throws NotImplementedException — the Layer-2
// RED signal. The Implementer for CAP-005 replaces the body with the full
// orchestration (admin check, AlwaysCommit, ScrText.DeleteBooks) in GREEN.

/// <summary>
/// Orchestrates book deletion: admin check, version control commit,
/// delegation to <see cref="ScrText.DeleteBooks"/>, progress plan update.
///
/// <para>Full flow (to be ported in GREEN):</para>
/// <list type="number">
///   <item>Optional shared-project warning (handled in UI layer per contract
///   precondition "UI must have obtained confirmation before calling").</item>
///   <item><see cref="Permissions.WarnIfNotAdministrator"/> check.</item>
///   <item><c>VersioningManager.AlwaysCommit</c>.</item>
///   <item><see cref="ScrText.DeleteBooks"/> (obtains WriteLock internally).</item>
///   <item><c>ChangeBooksInProjectPlan</c> progress plan update.</item>
/// </list>
///
/// See data-contracts.md Section 4.6 for the formal contract.
/// See implementation/extraction-plan.md EXT-005 for the extraction spec.
/// </summary>
public static class DeleteBooksOrchestrator
{
    /// <summary>
    /// Deletes the specified books from the project. Returns when the
    /// underlying ParatextData operation completes or throws.
    /// </summary>
    /// <param name="scrText">Project to delete from.</param>
    /// <param name="selectedBooks">Set of book numbers to delete
    /// (canonical ordering via <see cref="BookSet"/>, Theme 5).</param>
    public static void DeleteBooks(ScrText scrText, BookSet selectedBooks)
    {
        throw new NotImplementedException(
            "CAP-005 DeleteBooksOrchestrator.DeleteBooks: not yet implemented. "
                + "See PT9 Paratext/ToolsMenu/DeleteBooksForm.cs:72-163 and "
                + ".context/features/manage-books/implementation/extraction-plan.md EXT-005."
        );
    }
}
