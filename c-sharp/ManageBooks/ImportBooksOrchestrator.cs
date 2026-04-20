using Paratext.Data;

namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 ===
// Source: PT9/ParatextData/ImportSfmText.cs:76-151 (ReadAndParseFilesIntoBooks, ExtractBooks)
//         PT9/Paratext/FileMenu/ImportBooksForm.cs:244-269 (OverlappingFilesFound)
//         PT9/ParatextData/UsxImporter.cs:33-80 (ImportFile / ImportText — USX-to-USFM)
// Maps to:
//   EXT-010 (Import orchestration — execution portion in CAP-010)
//   EXT-011 (OverlappingFilesFound — full port in CAP-009)
// Contract: .context/features/manage-books/data-contracts.md
//   Section 2.5 (ImportBooksInput / ImportFileEntry)
//   Section 3.5 (BookComparisonResult — REUSED from CAP-006)
//   Section 4.10 (ParseImportFiles)
//   Section 4.12 (CheckOverlappingFiles)
// Scenarios (CAP-009): TS-016, TS-017, TS-018, TS-019, TS-020, TS-021, TS-022,
//   TS-023..TS-027 (related — SetDefaultEligibility reuse from CAP-006),
//   TS-031 (USX-to-USFM conversion), TS-085 (overlapping files), TS-095 / TS-096
//   (USX error paths).
// Behaviors: BHV-106, BHV-107, BHV-108, BHV-109 (reused), BHV-112, BHV-125, BHV-318.
// Extractions: EXT-011.
// Invariants / Validations: INV-009, INV-010, VAL-006, VAL-007, VAL-008, VAL-012.
// Golden Master: gm-012 (Import overlap detection).
//
// SCOPE BOUNDARY (CAP-009 vs CAP-010 vs CAP-012):
//   CAP-009 is READ-ONLY — parse + compare + overlap check. No ImportSfmText
//   DoImport invocation, no WriteLock, no AlertCapture, no
//   SendFullProjectUpdateEvent, no per-book permission check. Those all live
//   in CAP-010 (later in BE-4). CAP-012 wires the wire methods to the TS
//   extension.

/// <summary>
/// Orchestrator for Import Books parsing (CAP-009) and, in a later BE-4
/// slice, import execution (CAP-010). Currently this class exposes two
/// read-only entry points:
/// <list type="bullet">
/// <item><see cref="ParseImportFiles"/> — take
///   <see cref="ImportFileEntry"/> strings, split them into individual books
///   (BHV-106 / BHV-107), and compute the per-book comparison state relative
///   to the destination project (reusing
///   <c>CopyBooksOrchestrator.SetDefaultEligibility</c>, BHV-109).</item>
/// <item><see cref="CheckOverlappingFiles"/> — detect duplicate book numbers
///   across the currently-selected files and return a
///   <see cref="ValidationResult"/> matching gm-012 (BHV-318, VAL-012).</item>
/// </list>
///
/// <para>See data-contracts.md Sections 2.5 / 3.5 / 4.10 / 4.12 for the
/// formal contract and implementation/extraction-plan.md EXT-011 for the
/// overlap-check extraction spec. BE-4 CAP-010 appends the import-execution
/// method here once the AlertCapture infrastructure (Theme 8) lands.</para>
/// </summary>
public static class ImportBooksOrchestrator
{
    // ---- gm-012 alert message ----------------------------------------------
    // Exposed as a public constant so tests can assert against the canonical
    // PT9 Localizer fallback without duplicating the string. Value matches
    // gm-012/expected-output.json exactly: PT9 Localizer key
    // "ImportBooksForm_7" with fallback "Two files contain information for the
    // same book. They can not both be selected." (note the PT9-era phrasing
    // "can not" rather than the modernized "cannot" in the TypeScript
    // contract — gm-012 is the canonical wire message for this capability).

    /// <summary>
    /// Alert message returned by <see cref="CheckOverlappingFiles"/> when two
    /// or more included import files share the same book number. Matches
    /// gm-012/expected-output.json verbatim (PT9 Localizer fallback wording
    /// "can not" — not the modernized "cannot" seen in some contract
    /// renderings).
    /// </summary>
    public const string OverlappingFilesAlertMessage =
        "Two files contain information for the same book. They can not both be selected.";

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/ImportSfmText.cs:76-151 (read + extract),
    //         PT9/ParatextData/UsxImporter.cs:33-80 (USX→USFM routing)
    // Maps to: EXT-010 parse-side (BHV-106, BHV-107, BHV-112, BHV-125)
    /// <summary>
    /// Parses import file content strings into individual books, compares them
    /// against the destination project, and returns a
    /// <see cref="BookComparisonResult"/> suitable for the Import Books
    /// dialog's file list. Pure read-only operation — no WriteLock, no disk
    /// mutations.
    ///
    /// <para>Per-file behavior:
    /// <list type="bullet">
    /// <item>USX content (detected by file extension or leading XML header)
    ///   is converted to USFM via <c>UsxImporter</c>-style fragmentation,
    ///   then extraction proceeds against the normalized USFM
    ///   (TS-031 / BHV-112). Malformed XML surfaces as a per-file error; the
    ///   file is skipped and other files continue.</item>
    /// <item>USFM content is split at <c>\id</c> markers (BHV-107). Files
    ///   with no <c>\id</c>, with text before the first <c>\id</c>, or with
    ///   an invalid Canon book code are handled per Section 4.10's error
    ///   table (file may be skipped or warn-and-continue).</item>
    /// <item>Per-file failures (encoding corruption, etc.) skip the file and
    ///   continue processing the remaining files (BHV-106 — partial-success
    ///   semantic).</item>
    /// </list></para>
    ///
    /// <para>For each successfully-extracted book, the comparison state and
    /// default-eligibility fields are computed by reusing
    /// <c>CopyBooksOrchestrator.SetDefaultEligibility</c> — the same
    /// five-state decision tree as CAP-006 (FilesAreSame, DestDoesNotExist,
    /// SourceIsNewer, SourceIsOlder, Undetermined).
    /// <see cref="ComparisonState.SourceDoesNotExist"/> is not reachable on
    /// the import side: we only produce an entry when the source file
    /// extracted successfully.</para>
    /// </summary>
    /// <param name="scrText">Destination project (BooksPresentSet + FileManager
    ///   consulted for comparison; never mutated).</param>
    /// <param name="files">File entries from the UI (already decoded).</param>
    /// <returns>Comparison entries — one per successfully-extracted book.</returns>
    public static BookComparisonResult ParseImportFiles(ScrText scrText, ImportFileEntry[] files)
    {
        throw new NotImplementedException(
            "CAP-009 RED — ParseImportFiles will parse USFM/USX content, "
                + "extract books, and populate BookComparisonResult via "
                + "CopyBooksOrchestrator.SetDefaultEligibility."
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/FileMenu/ImportBooksForm.cs:244-269 (OverlappingFilesFound)
    // Maps to: EXT-011 (BHV-318, VAL-012)
    /// <summary>
    /// Detects duplicate book numbers among
    /// <paramref name="entries"/> where <see cref="OverlapCheckEntry.Included"/>
    /// is <c>true</c>. Returns <see cref="ValidationSeverity.Error"/> with the
    /// canonical PT9 message (see <see cref="OverlappingFilesAlertMessage"/>)
    /// when an overlap is found, <see cref="ValidationSeverity.Ok"/>
    /// otherwise. Ignores entries with <c>Included=false</c> — the user has
    /// already deselected them.
    /// </summary>
    /// <param name="entries">Parsed file entries with book numbers and
    ///   inclusion flags. May be empty (returns <see cref="ValidationSeverity.Ok"/>).</param>
    public static ValidationResult CheckOverlappingFiles(OverlapCheckEntry[] entries)
    {
        throw new NotImplementedException(
            "CAP-009 RED — CheckOverlappingFiles will detect duplicate bookNums "
                + "among Included entries and return a ValidationResult matching gm-012."
        );
    }
}
