using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs:279-363
// Maps to:
//   EXT-007 (CopyBooksForm.LoadBooks)            — BHV-313, BHV-103
//   EXT-008 (CopyBooksForm.SetDefaultEligibility) — BHV-313, BHV-109
// Contract: .context/features/manage-books/data-contracts.md Sections 2.6 / 3.5 / 4.7
// Scenarios: TS-023..027, TS-059, TS-060, TS-061, TS-090
// Invariants: INV-011, INV-012, INV-C06, INV-C07
// Golden Master: gm-006
//
// gm-006 RECONCILIATION: gm-006/expected-output.json captures PT9's FB 29809
// bug (IncludeThisFile=false for every state because CopyBooksForm.cs:311
// pre-sets the flag before the switch runs). PT10 restores the parallel
// ImportSfmText rules per data-contracts.md Section 3.5 "Business Logic" and
// strategic-plan-backend.md success criteria ("default include/exclude
// decisions match INV-011/INV-012"):
//
//     FilesAreSame        -> DefaultIncluded = false (INV-C06, TS-024)
//     DestDoesNotExist    -> DefaultIncluded = true  (INV-C07, TS-023)  <- corrected vs gm-006
//     SourceIsNewer       -> DefaultIncluded = true  (TS-025)           <- corrected vs gm-006
//     SourceIsOlder       -> DefaultIncluded = false (TS-026)
//     Undetermined        -> DefaultIncluded = false (TS-027)
//     SourceDoesNotExist  -> DefaultIncluded = false, Selectable = false (TS-090)
//
// Tooltip strings match Section 3.5 / gm-006 exactly.

/// <summary>
/// Orchestrates book comparison (CAP-006) and copy (CAP-007 — later in BE-3)
/// between two projects. Currently only the comparison methods are implemented
/// here; CopyBooks and GetToProjectFilter land in subsequent capabilities.
///
/// <para>See data-contracts.md Sections 2.6 / 3.5 / 4.7 for the formal
/// contract and implementation/extraction-plan.md EXT-007 / EXT-008 for the
/// extraction spec.</para>
/// </summary>
public static class CopyBooksOrchestrator
{
    // ---- Section 3.5 tooltip strings ---------------------------------------
    // Exposed as public constants so tests can assert against the canonical
    // wording without string duplication.  Values match PT9 Localizer.Str
    // fallbacks at Paratext/ToolsMenu/CopyBooksForm.cs:324,333,341,349,357.

    /// <summary>Tooltip for <see cref="ComparisonState.FilesAreSame"/>.</summary>
    public const string FilesAreSameTooltip = "\"From\" and \"To\" books are identical";

    /// <summary>Tooltip for <see cref="ComparisonState.SourceDoesNotExist"/>.</summary>
    public const string SourceDoesNotExistTooltip = "Book does not exist in the \"From\" project";

    /// <summary>Tooltip for <see cref="ComparisonState.DestDoesNotExist"/>.</summary>
    public const string DestDoesNotExistTooltip = "The book does not exist in the \"To\" project";

    /// <summary>Tooltip for <see cref="ComparisonState.SourceIsNewer"/>.</summary>
    public const string SourceIsNewerTooltip = "The book in the \"From\" project is newer";

    /// <summary>Tooltip for <see cref="ComparisonState.SourceIsOlder"/>.</summary>
    public const string SourceIsOlderTooltip = "The book in the \"From\" project is older!!!";

    /// <summary>Tooltip for <see cref="ComparisonState.Undetermined"/>.</summary>
    public const string UndeterminedTooltip = "";

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs:279-306 (LoadBooks)
    // Maps to: EXT-007 (BHV-313, BHV-103)
    /// <summary>
    /// Iterates <see cref="SIL.Scripture.Canon.AllBooks"/>, filters by
    /// destination-project permission (per BHV-313 / BHV-103), and produces a
    /// <see cref="BookComparisonEntry"/> per eligible book with default
    /// include/exclude and tooltip determined by
    /// <see cref="SetDefaultEligibility"/>.
    /// </summary>
    /// <param name="fromScrText">Source ("from") project.</param>
    /// <param name="toScrText">Destination ("to") project.</param>
    /// <returns>Comparison entries in canonical book order.</returns>
    public static List<BookComparisonEntry> LoadBooks(ScrText fromScrText, ScrText toScrText)
    {
        var entries = new List<BookComparisonEntry>();
        BookSet allBooks = Canon.AllBooks;
        BookSet destBooksPresent = toScrText.Settings.BooksPresentSet;

        foreach (int bookNum in allBooks.SelectedBookNumbers)
        {
            // BHV-313: include books the user can edit, OR (admin-only) books
            // that are missing from the destination project. Mirrors PT9
            // CopyBooksForm.cs:291-294.
            bool canEdit = toScrText.Permissions.CanEdit(bookNum);
            bool adminCanCreate =
                !destBooksPresent.IsSelected(bookNum) && toScrText.Permissions.AmAdministrator;
            if (!canEdit && !adminCanCreate)
                continue;

            string sourceText = SafeGetBookText(fromScrText, bookNum);
            string destText = SafeGetBookText(toScrText, bookNum);
            DateTime sourceModified = SafeGetBookModified(fromScrText, bookNum);
            DateTime destModified = SafeGetBookModified(toScrText, bookNum);
            string bookName = Canon.BookNumberToEnglishName(bookNum);

            entries.Add(
                SetDefaultEligibility(
                    bookNum,
                    bookName,
                    sourceText,
                    destText,
                    sourceModified,
                    destModified
                )
            );
        }

        return entries;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs:308-363 (SetDefaultEligibility)
    // Maps to: EXT-008 (BHV-109)
    //
    // EXPLANATION:
    // Per data-contracts.md Section 3.5 the decision tree is evaluated in a
    // strict order. Two intentional differences from PT9:
    //
    //   1. PT9 (FB 29809) pre-sets IncludeThisFile=false at line 311 so every
    //      branch effectively returns include=false. PT10 returns the
    //      include flag determined per-state (true for DestDoesNotExist /
    //      SourceIsNewer, matching the parallel ImportSfmText rules).
    //   2. PT9 short-circuits to FilesAreSame when source==dest AND
    //      destText is non-empty. We preserve that ordering: same texts
    //      where both are non-empty -> FilesAreSame; both empty falls
    //      through to SourceDoesNotExist (Selectable=false).
    //
    // Strict inequality on timestamps (>, <) is required so a same-timestamp
    // / different-text pair returns Undetermined per TS-027.
    /// <summary>
    /// Computes <see cref="BookComparisonEntry.ComparisonState"/>,
    /// <see cref="BookComparisonEntry.DefaultIncluded"/>,
    /// <see cref="BookComparisonEntry.Selectable"/>, and
    /// <see cref="BookComparisonEntry.TooltipInfo"/> from the raw inputs of a
    /// source/dest text pair and their modification timestamps. Pure function
    /// so tests can exercise all six states without a filesystem.
    ///
    /// <para>Decision tree (from data-contracts.md Section 3.5):
    /// <list type="number">
    /// <item>Texts identical and dest non-empty → <see cref="ComparisonState.FilesAreSame"/>.</item>
    /// <item>Source empty → <see cref="ComparisonState.SourceDoesNotExist"/>
    ///   (Selectable=false; covers both "source missing only" and "both empty").</item>
    /// <item>Dest empty → <see cref="ComparisonState.DestDoesNotExist"/> (include).</item>
    /// <item>Source newer than dest → <see cref="ComparisonState.SourceIsNewer"/> (include).</item>
    /// <item>Source older than dest → <see cref="ComparisonState.SourceIsOlder"/>.</item>
    /// <item>Otherwise → <see cref="ComparisonState.Undetermined"/>.</item>
    /// </list></para>
    /// </summary>
    /// <param name="bookNum">1-based book number.</param>
    /// <param name="bookName">Display name for the entry.</param>
    /// <param name="sourceText">Contents of the source book (empty string means missing).</param>
    /// <param name="destText">Contents of the destination book (empty string means missing).</param>
    /// <param name="sourceModified">Modification date of the source file (ignored when source missing).</param>
    /// <param name="destModified">Modification date of the destination file (ignored when dest missing).</param>
    public static BookComparisonEntry SetDefaultEligibility(
        int bookNum,
        string bookName,
        string sourceText,
        string destText,
        DateTime sourceModified,
        DateTime destModified
    )
    {
        // 1. Identical texts (and dest is non-empty) → FilesAreSame.
        if (!string.IsNullOrEmpty(destText) && sourceText == destText)
        {
            return new BookComparisonEntry(
                bookNum,
                bookName,
                ComparisonState.FilesAreSame,
                DefaultIncluded: false,
                Selectable: true,
                TooltipInfo: FilesAreSameTooltip
            );
        }

        // 2. Source missing → SourceDoesNotExist (Selectable=false). Also
        // covers the both-empty case (LoadBooks_BothProjectsEmpty).
        if (string.IsNullOrEmpty(sourceText))
        {
            return new BookComparisonEntry(
                bookNum,
                bookName,
                ComparisonState.SourceDoesNotExist,
                DefaultIncluded: false,
                Selectable: false,
                TooltipInfo: SourceDoesNotExistTooltip
            );
        }

        // 3. Dest missing → DestDoesNotExist (include=true per INV-C07).
        if (string.IsNullOrEmpty(destText))
        {
            return new BookComparisonEntry(
                bookNum,
                bookName,
                ComparisonState.DestDoesNotExist,
                DefaultIncluded: true,
                Selectable: true,
                TooltipInfo: DestDoesNotExistTooltip
            );
        }

        // 4. Both texts present and different → compare modification times.
        if (sourceModified > destModified)
        {
            return new BookComparisonEntry(
                bookNum,
                bookName,
                ComparisonState.SourceIsNewer,
                DefaultIncluded: true,
                Selectable: true,
                TooltipInfo: SourceIsNewerTooltip
            );
        }

        if (sourceModified < destModified)
        {
            return new BookComparisonEntry(
                bookNum,
                bookName,
                ComparisonState.SourceIsOlder,
                DefaultIncluded: false,
                Selectable: true,
                TooltipInfo: SourceIsOlderTooltip
            );
        }

        // 5. Same timestamp, different text → Undetermined (TS-027).
        return new BookComparisonEntry(
            bookNum,
            bookName,
            ComparisonState.Undetermined,
            DefaultIncluded: false,
            Selectable: true,
            TooltipInfo: UndeterminedTooltip
        );
    }

    // === NEW IN PT10 ===
    // Reason: PT9 read text via PtwFileInfo, which gracefully handles missing
    //   books. PT10's LoadBooks calls ScrText.GetText directly so we need a
    //   local short-circuit: if the book is not in BooksPresentSet, treat as
    //   missing (empty string). This avoids surfacing a FileNotFoundException
    //   from GetTextOfBookAndChapters when a book is absent.
    private static string SafeGetBookText(ScrText scrText, int bookNum)
    {
        if (!scrText.Settings.BooksPresentSet.IsSelected(bookNum))
            return string.Empty;
        try
        {
            return scrText.GetText(bookNum) ?? string.Empty;
        }
        catch (FileNotFoundException)
        {
            return string.Empty;
        }
    }

    // === NEW IN PT10 ===
    // Reason: PT9 used PtwFileInfo.ModificationDateTime; PT10 reads via the
    //   ProjectFileManager.GetLastWriteTime so DummyScrText / InMemoryFileManager
    //   tests work uniformly. Returns DateTime.MinValue when the book file is
    //   absent — the SetDefaultEligibility decision tree never inspects
    //   timestamps when one text is empty, so the value is irrelevant in that
    //   case but explicit.
    private static DateTime SafeGetBookModified(ScrText scrText, int bookNum)
    {
        if (!scrText.Settings.BooksPresentSet.IsSelected(bookNum))
            return DateTime.MinValue;
        try
        {
            string bookFileName = scrText.Settings.BookFileName(bookNum, true);
            return scrText.FileManager.GetLastWriteTime(bookFileName);
        }
        catch (Exception)
        {
            return DateTime.MinValue;
        }
    }
}
