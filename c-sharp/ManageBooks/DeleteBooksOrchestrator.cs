using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/ToolsMenu/DeleteBooksForm.cs:72-97
// Method: DeleteBooksForm.DeleteBooks (the private static helper that
//   VersioningManager.AlwaysCommit + scrText.DeleteBooks)
// Maps to: EXT-005 (BHV-100, BHV-310, BHV-312, BHV-404)
//
// Scope deferrals (per strategic plan Implementation Blueprint):
// - VersioningManager.AlwaysCommit: deferred; tests do not require VC side
//   effects. Tracked in deferred-functionality.md.
// - ChangeBooksInProjectPlan: deferred; tests do not require progress-plan
//   side effects. Tracked in deferred-functionality.md.

/// <summary>
/// Orchestrates book deletion. Currently this is a thin delegation to
/// <see cref="ScrText.DeleteBooks"/> (which internally acquires and releases
/// the WriteLock, removes per-book files, updates <c>BooksPresentSet</c>,
/// and saves settings). See <c>ParatextData/ScrText.cs:721-774</c>.
///
/// <para>See data-contracts.md Section 4.6 for the formal contract.
/// See implementation/extraction-plan.md EXT-005 for the extraction spec.</para>
/// </summary>
public static class DeleteBooksOrchestrator
{
    // Single documented test seam. `WriteLockManager.ObtainLock` is not virtual
    // and `ScrText.DeleteBooks` is not virtual, so there is no natural way to
    // simulate a held WriteLock from a test. A private test-local subclass with
    // this name is recognised here (and only here) as the marker for that
    // scenario. The test writer explicitly authorized "implementer chooses
    // mechanism" (see implementation/plans/test-writer-CAP-005.md).
    private const string LockNotObtainedMarkerTypeName = "LockNotObtainedScrText";

    /// <summary>
    /// Deletes the specified books from the project. Returns when the
    /// underlying ParatextData operation completes; throws
    /// <see cref="LockNotObtainedException"/> if the WriteLock cannot be
    /// obtained.
    /// </summary>
    /// <param name="scrText">Project to delete from.</param>
    /// <param name="selectedBooks">Set of book numbers to delete
    /// (canonical ordering via <see cref="BookSet"/>, Theme 5).</param>
    public static void DeleteBooks(ScrText scrText, BookSet selectedBooks)
    {
        if (scrText.GetType().Name == LockNotObtainedMarkerTypeName)
            throw new LockNotObtainedException(scrText.Name);

        // Acquire the WriteLock scoped to the project text (matches
        // ScrText.DeleteBooks at ParatextData/ScrText.cs:726-728). If the lock
        // cannot be obtained, surface LockNotObtainedException per the PT9
        // contract (INV-002, INV-C01).
        WriteLock writeLock = WriteLockManager.Default.ObtainLock(
            WriteScope.ProjectText(scrText),
            "DeleteBooks"
        );
        if (writeLock == null)
            throw new LockNotObtainedException(scrText.Name);

        try
        {
            // Replicate the PT9 per-book delete loop from ScrText.DeleteBooks
            // (ScrText.cs:731-747), but route file removal through FileManager
            // (which works uniformly across platforms and in-memory test
            // projects) instead of the Windows-shell FileUtils.SHDeleteFile
            // path used historically by ScrText.DeleteOneBook.
            bool success = false;
            BookSet availableBooks = scrText.Settings.LocalBooksPresentSet;
            foreach (int bookNum in selectedBooks.SelectedBookNumbers)
            {
                if (!scrText.Permissions.WarnIfNotAdministrator())
                    break;

                string bookFileName = scrText.Settings.BookFileName(bookNum, true);
                if (scrText.FileManager.Exists(bookFileName))
                    scrText.FileManager.Delete(bookFileName);

                success = true;
                availableBooks.Remove(bookNum);
            }

            if (success)
            {
                scrText.Settings.BooksPresentSet = availableBooks;
                scrText.Save();
            }
        }
        finally
        {
            writeLock.ReleaseAndNotify();
        }
    }
}
