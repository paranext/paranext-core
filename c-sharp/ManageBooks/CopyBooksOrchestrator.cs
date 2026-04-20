using Paratext.Data;

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
// STUB — Test Writer RED skeleton for CAP-006.
// The two public static methods below are placeholders that throw
// NotImplementedException so the CAP-006 tests start RED. The TDD implementer
// will fill in the bodies during GREEN. Signatures are fixed only at the public
// boundary declared in data-contracts.md; internal helper signatures are at
// the implementer's discretion.
//
// gm-006 RECONCILIATION (documented here so the implementer does not follow
// the PT9 bug):
//
//   gm-006/expected-output.json captures PT9 CopyBooksForm's behavior with the
//   FB 29809 bug active — every state is recorded as IncludeThisFile=false
//   because CopyBooksForm.cs:311 sets that flag BEFORE the comparison switch
//   runs. PT10 restores the parallel ImportSfmText rules per the strategic
//   plan success criteria: "default include/exclude decisions match INV-011
//   /INV-012". The canonical decision table is data-contracts.md Section 3.5
//   "Business Logic" and TS-090 expectedOutput:
//
//     FilesAreSame        -> DefaultIncluded = false (INV-C06, TS-024)
//     DestDoesNotExist    -> DefaultIncluded = true  (INV-C07, TS-023)
//     SourceIsNewer       -> DefaultIncluded = true  (TS-025)
//     SourceIsOlder       -> DefaultIncluded = false (TS-026)
//     Undetermined        -> DefaultIncluded = false (TS-027)
//     SourceDoesNotExist  -> DefaultIncluded = false, Selectable = false (TS-090)
//
// Tooltip strings MUST match Section 3.5 / gm-006 exactly (they are the same
// strings in both — only the include/selectable columns are corrected).

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
        throw new NotImplementedException("CAP-006: LoadBooks — implementer to fill in (RED stub)");
    }

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
    /// <item>Both texts empty → <see cref="ComparisonState.SourceDoesNotExist"/>
    ///   (matches PT9 CopyBooksForm.cs:328-335; Selectable=false).</item>
    /// <item>Texts identical and dest non-empty → <see cref="ComparisonState.FilesAreSame"/>.</item>
    /// <item>Source empty → <see cref="ComparisonState.SourceDoesNotExist"/>.</item>
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
        throw new NotImplementedException(
            "CAP-006: SetDefaultEligibility — implementer to fill in (RED stub)"
        );
    }
}
