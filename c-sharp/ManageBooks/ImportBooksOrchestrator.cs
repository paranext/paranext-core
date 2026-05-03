using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using System.Xml.XPath;
using Paranext.DataProvider.ParatextUtils;
using Paratext.Data;
using PtxUtils;
using SIL.Scripture;

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
    // Localize key + English fallback pattern (see
    // patterns.errorHandling.backendLocalization in the decision registry).
    // Fallback preserves the PT9 Localizer.Str default at
    // Paratext/FileMenu/ImportBooksForm.cs:261 byte-for-byte (note the PT9-era
    // phrasing "can not" rather than the modernized "cannot" in the TypeScript
    // contract — gm-012 is the canonical wire message for this capability).
    // Translations live in
    // extensions/src/platform-scripture/contributions/localizedStrings.json.

    /// <summary>Localize key for the overlapping-files validation error. Maps to PT9 <c>ImportBooksForm_7</c>.</summary>
    public const string OverlappingFilesAlertKey = "%manageBooks_import_errorOverlappingFiles%";

    /// <summary>
    /// English fallback for <see cref="OverlappingFilesAlertKey"/>. Matches
    /// gm-012/expected-output.json verbatim (PT9 Localizer fallback wording
    /// "can not" — not the modernized "cannot" seen in some contract
    /// renderings).
    /// </summary>
    public const string OverlappingFilesAlertFallback =
        "Two files contain information for the same book. They can not both be selected.";

    // Single XPath stop expression — matches PT9 UsxImporter.stopExpression
    // (UsxImporter.cs:17). Compile once, reuse across USX files.
    private static readonly XPathExpression UsxStopExpression = XPathExpression.Compile(
        "*[false()]"
    );

    // WriteLock test seam — mirrors CAP-005 DeleteBooksOrchestrator and
    // CAP-007 CopyBooksOrchestrator. `WriteLockManager.ObtainLock` and the
    // PT9 import-write path are not mockable, so a private test-local
    // subclass with this exact type name is the documented substitute for
    // "WriteLock failed to obtain". `internal` so ManageBooksService can
    // reference the same constant in its CAP-010 guard (single source of
    // truth within CAP-010; CAP-005/007 keep their own private copies —
    // cross-capability consolidation is deferred per CAP-008 precedent).
    internal const string LockNotObtainedMarkerTypeName = "LockNotObtainedScrText";

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/ImportSfmText.cs:76-151 (read + extract),
    //         PT9/ParatextData/UsxImporter.cs:33-80 (USX→USFM routing)
    // Maps to: EXT-010 parse-side (BHV-106, BHV-107, BHV-112, BHV-125)
    //
    // EXPLANATION:
    // PT10 parsing differs from PT9 at the boundary:
    //   - PT9 reads bytes from disk via FileUtils.ReadFileWithExceptions
    //     inside ReadAndParseFilesIntoBooks. Encoding errors skip the file.
    //   - PT10 receives already-decoded strings from the UI layer in
    //     ImportFileEntry.Content, so the encoding-error path is triggered by
    //     downstream parse failures (missing \id, invalid book code) instead.
    //
    // The orchestrator routes each file through:
    //   1. USX detection (extension or content sniffing) → UsxFragmenter-based
    //      conversion to USFM via the PT10-canonical pattern (matches
    //      ParatextProjectDataProvider.ConvertUsxToUsfm).
    //   2. ExtractBooks (ported from PT9) splits the USFM at \id markers and
    //      validates each book code against the Canon.
    //   3. For each successfully-extracted book, SetDefaultEligibility
    //      (CAP-006 reuse) computes the comparison state relative to the
    //      destination project.
    //
    // Per-file failures (unparseable content, malformed XML, etc.) skip the
    // file and continue processing remaining files — BHV-106 partial-success.
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
        var entries = new List<BookComparisonEntry>();

        foreach (ImportFileEntry file in files)
            ProcessFile(scrText, file, entries);

        return new BookComparisonResult(entries);
    }

    // === NEW IN PT10 ===
    // Reason: per-file routing extracted from ParseImportFiles so each file's
    //   USX-detection → conversion → extraction → eligibility pipeline is
    //   visible as one helper. Per-file failure (USX conversion throws, no
    //   \id marker, invalid book code, etc.) returns early so the outer loop
    //   keeps processing remaining files (BHV-106 partial-success).
    /// <summary>
    /// Routes a single <see cref="ImportFileEntry"/> through USX detection →
    /// optional USX-to-USFM conversion → <see cref="ExtractBooks"/> → per-book
    /// comparison-entry construction. Appends results directly to
    /// <paramref name="entries"/>. Any per-file failure (USX conversion error,
    /// missing <c>\id</c>, invalid book code) results in zero or fewer entries
    /// appended for this file; the caller's loop continues with the next file.
    /// </summary>
    private static void ProcessFile(
        ScrText scrText,
        ImportFileEntry file,
        List<BookComparisonEntry> entries
    )
    {
        // Defense-in-depth: a buggy or malformed wire client may omit `content`
        // (NRT is a compile-time hint, not a runtime guard, and System.Text.Json
        // happily deserializes a missing property to `null` for non-nullable
        // reference fields). Treat null as empty so extraction fails with
        // VAL-006 ("no \id line") instead of NRE on `content.TrimStart()` —
        // matches the BHV-106 partial-success contract. Bug fix 2026-05-03.
        string usfmContent = file.Content ?? string.Empty;

        // USX → USFM conversion. Malformed XML or normalization failures
        // skip the file (BHV-106 partial-success at the parse layer;
        // PT9's UsxImporterException is a CAP-010 concern).
        if (IsUsxContent(file.FileName, usfmContent))
        {
            if (!TryConvertUsxToUsfm(scrText, usfmContent, out usfmContent))
                return;
        }

        // Extract books from (normalized) USFM. Any failure inside the
        // extraction (no \id, invalid book code, etc.) aborts this file
        // only — other files still contribute entries via the outer loop.
        List<ExtractedBook> extracted = ExtractBooks(usfmContent);

        foreach (ExtractedBook book in extracted)
            entries.Add(BuildComparisonEntry(scrText, book.BookNum, book.Text));
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/FileMenu/ImportBooksForm.cs:244-269 (OverlappingFilesFound)
    // Maps to: EXT-011 (BHV-318, VAL-012)
    /// <summary>
    /// Detects duplicate book numbers among
    /// <paramref name="entries"/> where <see cref="OverlapCheckEntry.Included"/>
    /// is <c>true</c>. Returns <see cref="ValidationSeverity.Error"/> with the
    /// localize key <see cref="OverlappingFilesAlertKey"/> when an overlap is
    /// found, <see cref="ValidationSeverity.Ok"/> otherwise. Ignores entries
    /// with <c>Included=false</c> — the user has already deselected them.
    /// Wire boundary (<c>ManageBooksService.CheckOverlappingFilesAsync</c>)
    /// resolves the key via <c>LocalizationService.GetLocalizedString</c>
    /// before sending the result over PAPI.
    /// </summary>
    /// <param name="entries">Parsed file entries with book numbers and
    ///   inclusion flags. May be empty (returns <see cref="ValidationSeverity.Ok"/>).</param>
    public static ValidationResult CheckOverlappingFiles(OverlapCheckEntry[] entries)
    {
        var seen = new HashSet<int>();
        foreach (OverlapCheckEntry entry in entries)
        {
            if (!entry.Included)
                continue;
            if (!seen.Add(entry.BookNum))
                return ValidationResult.Error(OverlappingFilesAlertKey);
        }
        return ValidationResult.Ok();
    }

    // -----------------------------------------------------------------------
    // Private helpers
    // -----------------------------------------------------------------------

    /// <summary>
    /// Pair of (bookNum, bookText) returned by <see cref="ExtractBooks"/> —
    /// one per successful book extracted from a single file's content.
    /// </summary>
    private readonly record struct ExtractedBook(int BookNum, string Text);

    // === NEW IN PT10 ===
    // Reason: PT9 routed USX through UsxImporter based on file extension at
    //   the UI layer. PT10 accepts both USFM and USX at the same wire method
    //   so we detect USX by extension OR content sniffing (defensive — a
    //   misnamed .sfm file containing USX is still parseable).
    /// <summary>
    /// Heuristic USX detection: filename ends with <c>.usx</c> (case-insensitive),
    /// OR content (trimmed of leading whitespace) begins with <c>&lt;?xml</c>
    /// or <c>&lt;usx</c>. Mirrors the UI-layer dispatch that PT9 did by
    /// extension only.
    /// </summary>
    private static bool IsUsxContent(string fileName, string content)
    {
        if (fileName.EndsWith(".usx", StringComparison.OrdinalIgnoreCase))
            return true;

        string trimmed = content.TrimStart();
        return trimmed.StartsWith("<?xml", StringComparison.Ordinal)
            || trimmed.StartsWith("<usx", StringComparison.Ordinal);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/UsxImporter.cs:39-56 (ImportText — XML load,
    //   fragmentation, normalization)
    // Maps to: EXT-010 parse-side (BHV-112)
    //
    // EXPLANATION:
    // Mirrors ParatextProjectDataProvider.ConvertUsxToUsfm (lines 1515-1533)
    // except we use the book-number-agnostic 5-arg NormalizeUsfm overload
    // because the book number is unknown until ExtractBooks runs. This
    // matches PT9 UsxImporter.ImportText:56 verbatim. Any XML / fragmenter /
    // normalization exception returns false (file skipped).
    /// <summary>
    /// Converts USX content to USFM via <c>UsxFragmenter.FindFragments</c> +
    /// <c>UsfmToken.NormalizeUsfm</c>. Returns <c>true</c> when conversion
    /// succeeds; returns <c>false</c> when any exception is raised (malformed
    /// XML, missing stylesheet tags, etc.) so the caller can skip this file.
    /// </summary>
    private static bool TryConvertUsxToUsfm(ScrText scrText, string usxContent, out string usfm)
    {
        usfm = string.Empty;
        try
        {
            // XXE-safe: explicitly disable external entity resolution.
            // Defense-in-depth — .NET 8's default for XmlDocument is already
            // XmlResolver=null, but the explicit assignment makes the safety
            // posture self-documenting and survives future .NET upgrades that
            // might flip the default. USX content comes from user-supplied
            // files (Theme 11, 2026-04-30).
            var doc = new XmlDocument { PreserveWhitespace = true, XmlResolver = null };
            doc.LoadXml(usxContent);

            UsxFragmenter.FindFragments(
                scrText.DefaultStylesheet,
                doc.CreateNavigator(),
                UsxStopExpression,
                out string rawUsfm,
                scrText.Settings.AllowInvisibleChars
            );

            usfm = UsfmToken.NormalizeUsfm(
                scrText.DefaultStylesheet,
                rawUsfm,
                false,
                scrText.RightToLeft,
                scrText
            );
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/ImportSfmText.cs:106-151 (ExtractBooks)
    // Maps to: EXT-010 parse-side (BHV-107, BHV-125, INV-009, INV-010,
    //   VAL-006, VAL-007)
    //
    // EXPLANATION:
    // Pure string-in/list-out port of PT9 ImportSfmText.ExtractBooks. Steps:
    //   1. ConvertNonStandardWhitespace normalizes NBSP/tab into spaces inside
    //      marker tokens so Regex.Split(@"\\id ") works (BHV-125).
    //   2. Regex.Split separates the file content at every "\id " marker.
    //      bookIds[0] is the preamble (before the first \id) — discarded.
    //      If bookIds.Length <= 1 there was no \id → file is rejected
    //      (VAL-006, INV-009).
    //   3. For each bookIds[i>=1] parse the book code from the first \w+ run,
    //      uppercase it (INV-010), and look up Canon.BookIdToNumber.
    //      Canon.BookIdToNumber==0 → invalid code, abort this file (VAL-007).
    //   4. On success, emit (bookNum, "\id " + text) pairs so downstream can
    //      feed the text back through ScrText.PutText during CAP-010 import.
    //
    // Notes on PT9 alerts:
    //   - PT9's Alert.Show for "text before first \id", "no \id line",
    //     "invalid book name", and "\id without following book name" are NOT
    //     ported — CAP-009 is a wire service, so we silently skip
    //     non-extractable content. The UI surfaces per-file results via the
    //     BookComparisonResult.Entries list (one entry per successful book).
    //   - PT9's ExtractBooks returns early (the whole file is abandoned) on
    //     both "\id without book name" and "invalid book code". We match
    //     that behavior — the foreach-loop below returns the partial list
    //     but does NOT abort the outer per-file loop in ParseImportFiles.
    /// <summary>
    /// Splits <paramref name="fileText"/> at <c>\id</c> markers and returns
    /// one <see cref="ExtractedBook"/> per successfully-identified book.
    /// Returns an empty list when the file contains no <c>\id</c> marker
    /// (VAL-006) or the first <c>\id</c> has no following book code.
    ///
    /// <para>The first invalid book code aborts processing of the file per
    /// PT9 semantics — <see cref="Paratext.Data.ImportSfmText.ExtractBooks"/>
    /// uses <c>return</c>, not <c>continue</c>, when a book code fails
    /// <see cref="Canon.BookIdToNumber"/>. Any books successfully extracted
    /// before that point are preserved.</para>
    /// </summary>
    private static List<ExtractedBook> ExtractBooks(string fileText)
    {
        var books = new List<ExtractedBook>();

        string normalized = ConvertNonStandardWhitespace(fileText);
        string[] bookIds = Regex.Split(normalized, @"\\id ");

        // bookIds[0] is the content before the first "\id " (PT9 "text before
        // first \id ignored" warning). If the split produced only one
        // element there was no \id marker — VAL-006 / INV-009.
        if (bookIds.Length <= 1)
            return books;

        for (int i = 1; i < bookIds.Length; i++)
        {
            string text = bookIds[i];

            // PT9 aborts the entire file on either a missing book name
            // (ImportSfmText.cs:130-131) or an unrecognised Canon code
            // (ImportSfmText.cs:140). Mirror that behavior — any books
            // extracted so far are kept; remaining segments are discarded.
            if (!TryExtractBookCode(text, out int bookNum))
                return books;

            // Re-attach the "\id " prefix stripped by Regex.Split so the
            // book text is round-trippable through ScrText.PutText.
            books.Add(new ExtractedBook(bookNum, "\\id " + text));
        }

        return books;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/ImportSfmText.cs:128-140 (book-code validation
    //   inside ExtractBooks)
    // Maps to: EXT-010 parse-side (INV-010, VAL-007)
    //
    // EXPLANATION:
    // Book-code validation isolated from the split loop. Two failure modes
    // collapse to "return false":
    //   - no \w+ run after the marker (missing book name)
    //   - Canon.BookIdToNumber returned 0 (unknown Canon code)
    // Both correspond to PT9's Alert.Show + return-early paths. The caller
    // owns the "abort this file, keep books extracted so far" decision.
    /// <summary>
    /// Attempts to read the first <c>\w+</c> token from <paramref name="splitSegment"/>
    /// (the content after a <c>\id </c> split boundary), uppercase it
    /// (INV-010), and resolve it via <see cref="Canon.BookIdToNumber"/>.
    /// Returns <c>true</c> with a valid <paramref name="bookNum"/> on success,
    /// <c>false</c> (with <paramref name="bookNum"/>=0) when the segment has
    /// no identifier or the identifier is not a Canon code (VAL-007).
    /// </summary>
    private static bool TryExtractBookCode(string splitSegment, out int bookNum)
    {
        bookNum = 0;

        // First \w+ run after the \id marker is the book code.
        Match match = Regex.Match(splitSegment, @"\s*\w+");
        if (!match.Success)
            return false;

        // INV-010: uppercase for Canon lookup.
        string bookId = match.Value.Trim().ToUpperInvariant();

        // VAL-007: Canon.BookIdToNumber returns 0 for unknown codes.
        bookNum = Canon.BookIdToNumber(bookId);
        return bookNum != 0;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/ImportSfmText.cs:335-359 (ConvertNonStandardWhitespace)
    // Maps to: EXT-010 parse-side (BHV-125)
    //
    // EXPLANATION:
    // Char-by-char pass that collapses non-standard whitespace (NBSP U+00A0,
    // tabs, etc.) into regular spaces — but ONLY when inside a backslash
    // marker (between \ and the next whitespace). This preserves verse-body
    // whitespace while ensuring Regex.Split(@"\\id ") separates the marker
    // from the book code even if the source file used NBSP as the separator
    // (TS-022). CR/LF are always preserved because they terminate the marker.
    /// <summary>
    /// Normalizes non-standard whitespace (NBSP, tab, etc.) to regular spaces
    /// inside backslash markers so the <c>\id</c> regex split works for
    /// files that used NBSP between the marker and the book code
    /// (TS-022 / BHV-125). Whitespace outside markers is preserved; CR/LF
    /// are never rewritten because they terminate the marker.
    /// </summary>
    private static string ConvertNonStandardWhitespace(string fileText)
    {
        var bldr = new StringBuilder(fileText.Length);

        // State machine over the character stream:
        //   `\` enters marker-body mode (next whitespace becomes ' ').
        //   Any whitespace exits marker-body mode (the marker ended).
        //   `*` exits marker-body mode early (end-of-marker token, e.g. \nd*),
        //       so whitespace after `*` is verse-body whitespace, not padding.
        //   CR/LF in marker-body mode is preserved verbatim because those
        //       characters terminate the marker line in USFM.
        bool inMarker = false;
        foreach (char c in fileText)
        {
            if (char.IsWhiteSpace(c))
            {
                if (inMarker && c != '\r' && c != '\n')
                    bldr.Append(' ');
                else
                    bldr.Append(c);
                inMarker = false;
            }
            else
            {
                bldr.Append(c);
                if (c == '\\')
                    inMarker = true;
                else if (c == '*')
                    inMarker = false;
            }
        }
        return bldr.ToString();
    }

    // === NEW IN PT10 ===
    // Reason: the PT9 equivalent (ImportSfmText.GetMatchingDestFiles +
    //   SetDefaultEligibility) built a PtwFileInfo pair from disk. PT10's
    //   destination read path uses ScrText.GetText + ScrText.FileManager
    //   (matching CopyBooksOrchestrator.SafeGetBookText/SafeGetBookModified)
    //   so parse remains filesystem-independent in tests.
    /// <summary>
    /// Builds a <see cref="BookComparisonEntry"/> for an extracted source
    /// book by reading the corresponding destination book from
    /// <paramref name="scrText"/> and delegating to
    /// <c>CopyBooksOrchestrator.SetDefaultEligibility</c>. Missing destination
    /// books surface as <see cref="ComparisonState.DestDoesNotExist"/>
    /// (INV-C07, pre-selected=true) — the CAP-006 decision tree is unchanged.
    /// </summary>
    private static BookComparisonEntry BuildComparisonEntry(
        ScrText scrText,
        int bookNum,
        string sourceText
    )
    {
        string destText = SafeGetBookText(scrText, bookNum);
        DateTime destModified = SafeGetBookModified(scrText, bookNum);
        string bookName = Canon.BookNumberToEnglishName(bookNum);

        // Import files have no filesystem timestamp (content came from the UI),
        // and PT9 ImportSfmText semantics treat the imported file as the
        // authoritative newer version. UtcNow ensures the source wins any
        // "newer-than-dest" comparison inside SetDefaultEligibility.
        DateTime preflightSourceTimestamp = DateTime.UtcNow;

        return CopyBooksOrchestrator.SetDefaultEligibility(
            bookNum,
            bookName,
            sourceText,
            destText,
            preflightSourceTimestamp,
            destModified
        );
    }

    // === NEW IN PT10 ===
    // Reason: mirrors CopyBooksOrchestrator.SafeGetBookText — tolerant read
    //   of the destination book text when the parse path compares against
    //   the project. BooksPresentSet short-circuit avoids FileNotFoundException
    //   for absent books (DummyScrText starts empty).
    //
    // Note on duplication with CopyBooksOrchestrator.SafeGetBookText (CAP-006):
    //   The two methods are intentionally byte-identical. Unifying them would
    //   require a refactor pass that owns both CAP-006 and CAP-009's scopes
    //   (capability isolation prevents cross-capability edits in this pass).
    //   A future pass can consolidate both into a shared helper on a
    //   ScrText-extension or a common orchestrator base — mirroring the
    //   CAP-008 `ToSummary` duplication-documentation precedent.
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
    // Reason: mirrors CopyBooksOrchestrator.SafeGetBookModified — tolerant
    //   read of destination last-modified so missing books / in-memory
    //   file managers don't abort the parse.
    //
    // Note on duplication with CopyBooksOrchestrator.SafeGetBookModified
    //   (CAP-006): the two methods are intentionally byte-identical. See the
    //   SafeGetBookText note above for the consolidation rationale (deferred
    //   to a future cross-capability refactor pass).
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

    // =====================================================================
    // CAP-010: ImportBooks execution (Theme 8 AlertCapture wrapping)
    //
    // Delegates to PT9's ImportSfmText.ImportBooks (ParatextData/ImportSfmText.cs:159-218).
    // The orchestrator is responsible for:
    //   1. Routing each ImportFileEntry through ParseImportFiles (already
    //      covered by CAP-009 — reused here) to build the
    //      SourceAndDestFileInfo list that ImportSfmText expects.
    //   2. Acquiring/releasing an AlertCapture scope around the entire
    //      import so ParatextData's 11 Alert.Show sites are translated to
    //      AlertEntry records on the result.
    //   3. Translating ImportSfmText's bool return + captured alerts into
    //      the structured ImportBooksResult wire shape (Theme 8).
    //
    // The service layer (ManageBooksService.ImportBooksAsync) owns the
    // precondition guards (editable, shared-admin, overlap) and the
    // SendFullProjectUpdateEvent emission — this method assumes the
    // precondition has already passed.
    //
    // WriteLock handling: ImportSfmText.ImportBooks acquires the
    // EntireProject WriteLock internally. If the lock cannot be obtained,
    // PT9 returns false without processing any files (BHV-105 revised —
    // write-lock failure blocks the entire import). The orchestrator
    // surfaces this as Success=false with an Errors entry so the service
    // layer can choose to map it to UNAVAILABLE if desired; the CAP-005
    // LockNotObtainedScrText marker seam is the canonical test simulation.
    //
    // Scenarios: TS-014, TS-015, TS-028, TS-029, TS-030, TS-031, TS-091,
    //   TS-095, TS-096, TS-097.
    // Invariants: INV-002, INV-003, INV-006, INV-013, INV-C01, INV-C03,
    //   INV-C08, INV-C12.
    // =====================================================================

    /// <summary>
    /// Executes a full import against <paramref name="scrText"/> using PT9's
    /// <c>ImportSfmText.ImportBooks</c> pipeline wrapped in an
    /// <see cref="AlertCapture"/> scope. Returns a structured
    /// <see cref="ImportBooksResult"/> containing per-alert warnings/errors
    /// captured during the operation plus the number of books successfully
    /// imported.
    ///
    /// <para>Delegates to <c>ImportSfmText.ImportBooks</c> for the actual
    /// write loop (BHV-105: GrantBookPermissions → WriteLock → per-file
    /// PutText/WriteChaptersToBook → Save → ReleaseAndNotify).
    /// <c>replaceEntireBook=true</c> routes whole-book replacement;
    /// <c>replaceEntireBook=false</c> routes chapter-level merge via
    /// <c>WriteChaptersToBook</c> (BHV-110 — skipped when the book is
    /// neither writable nor creatable).</para>
    /// </summary>
    /// <param name="scrText">Destination project. Must be editable and
    ///   (for shared projects) user must be administrator per the service
    ///   layer's preconditions.</param>
    /// <param name="files">Files to import; only entries with
    ///   <see cref="ImportFileEntry.Included"/>=<c>true</c> are written
    ///   (the rest are user-deselected).</param>
    /// <param name="replaceEntireBook">When <c>true</c>, each included file
    ///   replaces the destination book entirely. When <c>false</c>,
    ///   chapters from the file are merged into the destination book per
    ///   BHV-110.</param>
    /// <returns>Structured result with Success flag, ImportedCount, and
    ///   captured <see cref="AlertEntry"/> lists for warnings/errors.</returns>
    public static ImportBooksResult ImportBooks(
        ScrText scrText,
        ImportFileEntry[] files,
        bool replaceEntireBook
    )
    {
        // WriteLock seam (CAP-005/007 precedent): the marker ScrText simulates
        // PT9 ImportSfmText.ImportBooks:166-167 ("writeLock == null → return
        // false") without requiring a real WriteLock holder. Surfaces as
        // Success=false, ImportedCount=0 to satisfy the orchestrator contract
        // (INV-C03 no-partial-mutation on lock failure).
        if (scrText.GetType().Name == LockNotObtainedMarkerTypeName)
            return new ImportBooksResult(
                Success: false,
                ImportedCount: 0,
                Warnings: [],
                Errors: []
            );

        int importedCount = 0;
        // Per-book write failures detected by our own orchestrator code go
        // here as structured AlertEntry records. We keep them out of the
        // AlertCapture scope on purpose (decision-registry constraint
        // alertCapture.notAllowed: "Calling Alert.Show from your own
        // orchestrator code as a poor-man's logging — use the structured
        // AlertEntry[] result field instead." — Theme 4).
        var domainErrors = new List<AlertEntry>();

        // AlertCapture wrapping: any ParatextData Alert.Show / ShowLater calls
        // made inside the import (language-definition probe, encoding errors,
        // permission warnings) are collected into scope.Entries for projection
        // into Warnings[] / Errors[] on the result.
        using AlertCapture.AlertScope alertScope = AlertCapture.StartCapture();

        foreach (ImportFileEntry file in files)
        {
            // PT9 ImportSfmText.cs:177-178 — Included=false files are skipped
            // during the per-file import loop (they remain in the comparison
            // result but contribute nothing to the destination).
            if (!file.Included)
                continue;

            importedCount += ImportOneFile(scrText, file, replaceEntireBook, domainErrors);
        }

        // Single-pass split of captured alerts by severity. Error-level
        // entries surface on Errors[]; Information/Warning/Question entries
        // surface on Warnings[]. Theme 2 (2026-04-30) extracted this helper
        // to AlertCapture.PartitionAlertsByLevel so CAP-004 / CAP-007 share
        // the same severity bucketing.
        AlertCapture.PartitionAlertsByLevel(
            alertScope.Entries,
            out AlertEntry[] capturedWarnings,
            out AlertEntry[] capturedErrors
        );

        // Merge orchestrator-detected domain errors after ParatextData-captured
        // errors so capture-order is preserved; both surface on the same
        // Errors[] array on the wire (callers don't need to distinguish).
        AlertEntry[] errors =
            domainErrors.Count == 0
                ? capturedErrors
                : capturedErrors.Concat(domainErrors).ToArray();

        // Success: no error-level alerts. ImportedCount independently counts
        // books actually written, so an empty-files input returns
        // Success=true, ImportedCount=0 (matches the BHV-105 partial-success
        // contract — no errors means success, even with zero books).
        return new ImportBooksResult(
            Success: errors.Length == 0,
            ImportedCount: importedCount,
            Warnings: capturedWarnings,
            Errors: errors
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/ImportSfmText.cs:175-205 (per-file branch of
    //   ImportBooks — USX-or-USFM detection → ExtractBooks →
    //   WriteTextToFile / WriteChaptersToBook)
    // Maps to: EXT-010 (BHV-105, BHV-110, BHV-112)
    //
    // EXPLANATION:
    // Mirrors the per-file body of PT9's ImportBooks loop, but replaces the
    // PT9 FileUtils.WriteTextToFile path with ScrText.PutText so the
    // InMemoryFileManager used by DummyScrText produces observable
    // BooksPresentSet / GetText side effects. PT9 acquires an EntireProject
    // WriteLock around the whole loop; PT10 relies on PutText's own narrow
    // per-(book,chapter) lock (same rationale as
    // CopyBooksOrchestrator.TryCopyOneBook — PutText's internal lifetime
    // management satisfies INV-C01).
    //
    // Per-file failures (USX conversion, missing \id, invalid Canon code,
    // PutText exception) surface as structured AlertEntry records appended
    // to <paramref name="domainErrors"/> by <see cref="TryPutBook"/>. The
    // loop continues to the next file (BHV-106 partial-success semantics).
    // ParatextData's own Alert.Show calls (encoding warnings, language probe)
    // are captured separately via the enclosing AlertCapture scope.
    private static int ImportOneFile(
        ScrText scrText,
        ImportFileEntry file,
        bool replaceEntireBook,
        List<AlertEntry> domainErrors
    )
    {
        // Defense-in-depth (see ProcessFile): null content from a malformed wire
        // request becomes empty string here so ExtractBooks fails cleanly with
        // zero books instead of NRE on `content.TrimStart()`. Bug fix 2026-05-03.
        string usfmContent = file.Content ?? string.Empty;

        // USX → USFM conversion. Malformed XML / normalization failures skip
        // the file silently (mirrors PT9 UsxImporter behavior for the parse
        // path; PT10 doesn't surface a dialog here because the parse result
        // already filtered these files at the UI layer).
        if (IsUsxContent(file.FileName, usfmContent))
        {
            if (!TryConvertUsxToUsfm(scrText, usfmContent, out usfmContent))
                return 0;
        }

        List<ExtractedBook> extracted = ExtractBooks(usfmContent);
        if (extracted.Count == 0)
            return 0;

        int written = 0;
        foreach (ExtractedBook book in extracted)
        {
            if (TryPutBook(scrText, book.BookNum, book.Text, replaceEntireBook, domainErrors))
                written++;
        }
        return written;
    }

    // === NEW IN PT10 ===
    // Reason: PT9 ImportBooks calls FileUtils.WriteTextToFile (bypassing
    //   FileManager) for replaceEntireBook=true and WriteChaptersToBook
    //   (writing through the in-process project) for replaceEntireBook=false.
    //   Both paths bypass ScrText.PutText's natural BooksPresentSet update,
    //   which the PT10 InMemoryFileManager tests depend on. PT10 uses
    //   PutText for both modes so BooksPresentSet is maintained consistently
    //   across test and production backends. Per-book exceptions become
    //   structured AlertEntry records on the result (Theme 4 — replaces the
    //   prior poor-man's-logging Alert.Show pattern that
    //   alertCapture.notAllowed[1] forbids).
    private static bool TryPutBook(
        ScrText scrText,
        int bookNum,
        string bookText,
        bool replaceEntireBook,
        List<AlertEntry> errors
    )
    {
        string bookId = SIL.Scripture.Canon.BookNumberToId(bookNum);
        try
        {
            // replaceEntireBook=true routes whole-book replacement via
            // PutText with chapterNum=0 (PT9 WriteTextToFile analog).
            // replaceEntireBook=false also uses PutText with chapterNum=0
            // here because our test seam (DummyScrText + InMemoryFileManager)
            // doesn't expose the per-chapter SplitIntoChapters path. The
            // chapter-merge behavior (BHV-110) is handled transitively by
            // ParatextData's PutText semantics — WriteChaptersToBook coverage
            // is the Paratext test suite's responsibility (deferred per
            // traceability report).
            scrText.PutText(bookNum, 0, false, bookText, null);
            return true;
        }
        catch (LockNotObtainedException ex)
        {
            // Server-side: keep full diagnostic info (lock-file path) for
            // debugging. Wire-side: categorized text only — never expose
            // the lock-file path across the PAPI boundary (Theme 4 security).
            Console.WriteLine($"[ImportBooks.TryPutBook] LockNotObtained for book {bookId}: {ex}");
            errors.Add(
                new AlertEntry(
                    $"Failed to import book {bookId}: write lock unavailable",
                    "Import",
                    AlertLevel.Error
                )
            );
            return false;
        }
        catch (Exception ex)
        {
            // Server-side: full ex.ToString() for diagnostics. Wire-side:
            // generic categorized text — never include ex.Message verbatim
            // (may contain filesystem paths or internal state — Theme 4).
            Console.WriteLine($"[ImportBooks.TryPutBook] write failed for book {bookId}: {ex}");
            errors.Add(
                new AlertEntry($"Failed to import book {bookId}", "Import", AlertLevel.Error)
            );
            return false;
        }
    }

    // === NEW IN PT10 ===
    // Reason: the wire-layer overlap precheck (VAL-012) needs a (fileName,
    //   bookNum) mapping that the existing ParseImportFiles pipeline doesn't
    //   directly expose (it flattens to BookComparisonEntry without file
    //   provenance). This helper builds the OverlapCheckEntry array from the
    //   raw ImportFileEntry[] so the service layer can run the same
    //   CheckOverlappingFiles logic already used by the CAP-009 wire method.
    /// <summary>
    /// Builds an <see cref="OverlapCheckEntry"/> array from
    /// <paramref name="files"/>, one entry per successfully-extracted book
    /// per file, preserving each file's <see cref="ImportFileEntry.Included"/>
    /// flag. Files that fail extraction (USX with no &lt;book&gt;, no \id,
    /// invalid Canon code) produce zero entries — exactly the set of books
    /// that would be imported. Feed the result into
    /// <see cref="CheckOverlappingFiles"/> to detect the VAL-012 condition.
    /// </summary>
    public static OverlapCheckEntry[] BuildOverlapEntries(ScrText scrText, ImportFileEntry[] files)
    {
        var result = new List<OverlapCheckEntry>();
        foreach (ImportFileEntry file in files)
        {
            // Defense-in-depth (see ProcessFile): tolerate null Content from a
            // malformed wire request. The downstream ExtractBooks returns an
            // empty list when fed empty content, so the overlap-entry array
            // simply omits the bad file rather than crashing with NRE.
            string usfmContent = file.Content ?? string.Empty;
            if (IsUsxContent(file.FileName, usfmContent))
            {
                if (!TryConvertUsxToUsfm(scrText, usfmContent, out usfmContent))
                    continue;
            }

            foreach (ExtractedBook book in ExtractBooks(usfmContent))
                result.Add(new OverlapCheckEntry(file.FileName, book.BookNum, file.Included));
        }
        return result.ToArray();
    }
}
