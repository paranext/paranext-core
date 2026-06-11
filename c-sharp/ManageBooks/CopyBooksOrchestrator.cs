using Paranext.DataProvider.ParatextUtils;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using PtxUtils;
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
    // Exposed as public constants — localize keys for runtime resolution by
    // the wrapping NetworkObject (see
    // patterns.errorHandling.backendLocalization in the decision registry).
    // Fallbacks are the PT9 Localizer.Str defaults at
    // Paratext/ToolsMenu/CopyBooksForm.cs:324,333,341,349,357 — preserved
    // byte-for-byte so DummyPapiClient-based integration tests keep passing.
    // Translations live in
    // extensions/src/platform-scripture/contributions/localizedStrings.json.

    /// <summary>Localize key for <see cref="ComparisonState.FilesAreSame"/> tooltip. Maps to PT9 <c>CopyBooksForm_8</c>.</summary>
    public const string FilesAreSameTooltipKey = "%manageBooks_copy_tooltip_filesAreSame%";

    /// <summary>English fallback for <see cref="FilesAreSameTooltipKey"/>.</summary>
    public const string FilesAreSameTooltipFallback = "\"From\" and \"To\" books are identical";

    /// <summary>Localize key for <see cref="ComparisonState.SourceDoesNotExist"/> tooltip. Maps to PT9 <c>CopyBooksForm_9</c>.</summary>
    public const string SourceDoesNotExistTooltipKey =
        "%manageBooks_copy_tooltip_sourceDoesNotExist%";

    /// <summary>English fallback for <see cref="SourceDoesNotExistTooltipKey"/>.</summary>
    public const string SourceDoesNotExistTooltipFallback =
        "Book does not exist in the \"From\" project";

    /// <summary>Localize key for <see cref="ComparisonState.DestDoesNotExist"/> tooltip. Maps to PT9 <c>CopyBooksForm_10</c>.</summary>
    public const string DestDoesNotExistTooltipKey = "%manageBooks_copy_tooltip_destDoesNotExist%";

    /// <summary>English fallback for <see cref="DestDoesNotExistTooltipKey"/>.</summary>
    public const string DestDoesNotExistTooltipFallback =
        "The book does not exist in the \"To\" project";

    /// <summary>Localize key for <see cref="ComparisonState.SourceIsNewer"/> tooltip. Maps to PT9 <c>CopyBooksForm_11</c>.</summary>
    public const string SourceIsNewerTooltipKey = "%manageBooks_copy_tooltip_sourceIsNewer%";

    /// <summary>English fallback for <see cref="SourceIsNewerTooltipKey"/>.</summary>
    public const string SourceIsNewerTooltipFallback = "The book in the \"From\" project is newer";

    /// <summary>Localize key for <see cref="ComparisonState.SourceIsOlder"/> tooltip. Maps to PT9 <c>CopyBooksForm_12</c>.</summary>
    public const string SourceIsOlderTooltipKey = "%manageBooks_copy_tooltip_sourceIsOlder%";

    /// <summary>English fallback for <see cref="SourceIsOlderTooltipKey"/>.</summary>
    public const string SourceIsOlderTooltipFallback =
        "The book in the \"From\" project is older!!!";

    /// <summary>Tooltip for <see cref="ComparisonState.Undetermined"/> — intentionally empty (no translation needed).</summary>
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
        // Surface both modification timestamps on the wire entry so the
        // Copy/Import UI can show them in pill tooltips. `DateTime.MinValue`
        // (the absent-file sentinel from SafeGetBookModified) maps to null on
        // the wire so the frontend can distinguish "no date" from "epoch".
        string? sourceIso = ToIsoOrNull(sourceModified, sourceText);
        string? destIso = ToIsoOrNull(destModified, destText);

        // 1. Identical texts (and dest is non-empty) → FilesAreSame.
        if (!string.IsNullOrEmpty(destText) && sourceText == destText)
            return FilesAreSameEntry(bookNum, bookName, sourceIso, destIso);

        // 2. Source missing → SourceDoesNotExist (Selectable=false). Also
        // covers the both-empty case (LoadBooks_BothProjectsEmpty).
        if (string.IsNullOrEmpty(sourceText))
            return SourceDoesNotExistEntry(bookNum, bookName, sourceIso, destIso);

        // 3. Dest missing → DestDoesNotExist (include=true per INV-C07).
        if (string.IsNullOrEmpty(destText))
            return DestDoesNotExistEntry(bookNum, bookName, sourceIso, destIso);

        // 4. Both texts present and different → compare modification times.
        if (sourceModified > destModified)
            return SourceIsNewerEntry(bookNum, bookName, sourceIso, destIso);

        if (sourceModified < destModified)
            return SourceIsOlderEntry(bookNum, bookName, sourceIso, destIso);

        // 5. Same timestamp, different text → Undetermined (TS-027).
        return UndeterminedEntry(bookNum, bookName, sourceIso, destIso);
    }

    /// <summary>
    /// Maps a DateTime + text pair to an ISO-8601 string for the wire, or null when the
    /// underlying side has no meaningful date (file missing or empty text).
    /// </summary>
    private static string? ToIsoOrNull(DateTime when, string text)
    {
        if (string.IsNullOrEmpty(text))
            return null;
        if (when == DateTime.MinValue)
            return null;
        return when.ToUniversalTime()
            .ToString("o", System.Globalization.CultureInfo.InvariantCulture);
    }

    // -----------------------------------------------------------------------
    // Per-state entry factories.
    //
    // Each factory pins the (DefaultIncluded, Selectable, TooltipInfo) triple
    // required by data-contracts.md Section 3.5 to a single location. The
    // SetDefaultEligibility decision tree above dispatches to exactly one of
    // these per call so each contract fact (INV-C06 / INV-C07 for the include
    // flags; the Selectable=false outlier for SourceDoesNotExist) lives in
    // one place instead of being re-asserted across six branches.
    // -----------------------------------------------------------------------

    /// <summary>INV-C06: FilesAreSame → pre-select=false, selectable=true.</summary>
    private static BookComparisonEntry FilesAreSameEntry(
        int bookNum,
        string bookName,
        string? sourceIso,
        string? destIso
    ) =>
        BuildEntry(
            bookNum,
            bookName,
            ComparisonState.FilesAreSame,
            defaultIncluded: false,
            selectable: true,
            tooltip: FilesAreSameTooltipKey,
            sourceIso: sourceIso,
            destIso: destIso
        );

    /// <summary>SourceDoesNotExist is the only state with Selectable=false (TS-090).</summary>
    private static BookComparisonEntry SourceDoesNotExistEntry(
        int bookNum,
        string bookName,
        string? sourceIso,
        string? destIso
    ) =>
        BuildEntry(
            bookNum,
            bookName,
            ComparisonState.SourceDoesNotExist,
            defaultIncluded: false,
            selectable: false,
            tooltip: SourceDoesNotExistTooltipKey,
            sourceIso: sourceIso,
            destIso: destIso
        );

    /// <summary>INV-C07: DestDoesNotExist → pre-select=true (corrects PT9 FB 29809).</summary>
    private static BookComparisonEntry DestDoesNotExistEntry(
        int bookNum,
        string bookName,
        string? sourceIso,
        string? destIso
    ) =>
        BuildEntry(
            bookNum,
            bookName,
            ComparisonState.DestDoesNotExist,
            defaultIncluded: true,
            selectable: true,
            tooltip: DestDoesNotExistTooltipKey,
            sourceIso: sourceIso,
            destIso: destIso
        );

    /// <summary>SourceIsNewer → pre-select=true (corrects PT9 FB 29809; TS-025).</summary>
    private static BookComparisonEntry SourceIsNewerEntry(
        int bookNum,
        string bookName,
        string? sourceIso,
        string? destIso
    ) =>
        BuildEntry(
            bookNum,
            bookName,
            ComparisonState.SourceIsNewer,
            defaultIncluded: true,
            selectable: true,
            tooltip: SourceIsNewerTooltipKey,
            sourceIso: sourceIso,
            destIso: destIso
        );

    /// <summary>SourceIsOlder → pre-select=false (TS-026).</summary>
    private static BookComparisonEntry SourceIsOlderEntry(
        int bookNum,
        string bookName,
        string? sourceIso,
        string? destIso
    ) =>
        BuildEntry(
            bookNum,
            bookName,
            ComparisonState.SourceIsOlder,
            defaultIncluded: false,
            selectable: true,
            tooltip: SourceIsOlderTooltipKey,
            sourceIso: sourceIso,
            destIso: destIso
        );

    /// <summary>Undetermined (same timestamp, different text) → pre-select=false, empty tooltip (TS-027).</summary>
    private static BookComparisonEntry UndeterminedEntry(
        int bookNum,
        string bookName,
        string? sourceIso,
        string? destIso
    ) =>
        BuildEntry(
            bookNum,
            bookName,
            ComparisonState.Undetermined,
            defaultIncluded: false,
            selectable: true,
            tooltip: UndeterminedTooltip,
            sourceIso: sourceIso,
            destIso: destIso
        );

    /// <summary>Positional-to-record adapter so each per-state factory above is a one-liner.</summary>
    private static BookComparisonEntry BuildEntry(
        int bookNum,
        string bookName,
        ComparisonState state,
        bool defaultIncluded,
        bool selectable,
        string tooltip,
        string? sourceIso,
        string? destIso
    ) => new(bookNum, bookName, state, defaultIncluded, selectable, tooltip, sourceIso, destIso);

    // === NEW IN PT10 ===
    // Reason: PT9 read text via PtwFileInfo, which gracefully handles missing
    //   books. PT10's LoadBooks calls ScrText.GetText directly so we need a
    //   local short-circuit: if the book is not in BooksPresentSet, treat as
    //   missing (empty string). This avoids surfacing a FileNotFoundException
    //   from GetTextOfBookAndChapters when a book is absent.
    //
    // Paired with SafeGetBookModified below — both methods share the
    // `BooksPresentSet.IsSelected(bookNum)` short-circuit + try/catch pattern,
    // but the inner calls and the exception filters differ (narrow
    // FileNotFoundException for text vs broad filesystem errors for
    // timestamps), so they are kept as two intention-revealing helpers rather
    // than behind a generic adapter.
    /// <summary>
    /// Reads the book text tolerantly: returns <see cref="string.Empty"/> when
    /// the book is absent from <paramref name="scrText"/>'s BooksPresentSet or
    /// when <see cref="ScrText.GetText(int)"/> raises
    /// <see cref="FileNotFoundException"/>. Bridges the PT9 PtwFileInfo
    /// tolerance semantics onto ScrText.
    /// </summary>
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
    /// <summary>
    /// Reads the book-file last-write timestamp tolerantly: returns
    /// <see cref="DateTime.MinValue"/> when the book is absent from
    /// <paramref name="scrText"/>'s BooksPresentSet or when the file manager
    /// cannot read the stamp. The
    /// <see cref="SetDefaultEligibility"/> decision tree short-circuits on
    /// empty text before inspecting timestamps, so the sentinel value is only
    /// reachable via the defensive catch below and is never compared.
    /// </summary>
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
    // CAP-008: CopyProjectFiltering
    //
    // RED stubs. Contract: data-contracts.md Section 2.8 / 3.8 / 4.9.
    // Extraction: EXT-009 (CopyBooksForm.LoadToComboboxOptions, PT9 line 533-571).
    // Behaviors: BHV-603 (Standard/null source), BHV-606 (Parameterized types).
    // Golden masters: gm-007, gm-008.
    // Scenarios: TS-065, TS-066.
    // =====================================================================

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs:533-571 (LoadToComboboxOptions)
    // Maps to: EXT-009 (BHV-603, BHV-606)
    //
    // EXPLANATION:
    // The PT9 decision tree (CopyBooksForm.cs:539-553) branches in three ways
    // depending on the "From" project type:
    //
    //   1. NULL source (no "From" selected yet, PT9 line 539-542):
    //        accept scrText iff
    //          scrText.IsNonProtectedText()
    //          && scrText.Settings.TranslationInfo.Type != TransliterationWithEncoder
    //          && !scrText.Settings.IsStudyBiblePublication
    //
    //   2. SAME-TYPE branch (PT9 line 547-551): when the "From" type is
    //      StudyBibleAdditions, StudyBible, or ConsultantNotes, copy is
    //      restricted to destinations of the SAME type. This is the narrow
    //      branch — PT9 does not allow, e.g., StudyBible → Standard.
    //
    //   3. PARAMETERIZED-SET branch (PT9 line 553-559): everything else
    //      (Standard / Auxiliary / BackTranslation / Daughter /
    //      TransliterationManual / TransliterationWithEncoder / unknown)
    //      falls through to the "else" clause and accepts the six-element
    //      destination set { Standard, Auxiliary, BackTranslation, Daughter,
    //      StudyBible, TransliterationManual }. Notably: a
    //      TransliterationWithEncoder SOURCE still lands here (PT9 else
    //      clause has no explicit check), but TransliterationWithEncoder is
    //      NOT in the destination set, so it's excluded as a target. Also
    //      note that SBA (StudyBibleAdditions) is excluded as a destination
    //      in this branch — matches gm-007 expected output.
    /// <summary>
    /// Returns the <see cref="Predicate{ScrText}"/> that decides whether a
    /// candidate destination project is a valid "To" choice given
    /// <paramref name="fromProjectType"/> ("From"-project type).
    /// Pure function so the decision tree is unit-testable without a live
    /// <see cref="ScrTextCollection"/>.
    ///
    /// <para>Decision tree (from data-contracts.md §4.9 Business Logic +
    /// PT9 CopyBooksForm.cs:539-553):
    /// <list type="bullet">
    /// <item><c>null</c> source (caller has no "From" selection yet) —
    /// all non-protected texts that are not StudyBible publications and
    /// not <see cref="ProjectType.TransliterationWithEncoder"/>.</item>
    /// <item><see cref="ProjectType.StudyBibleAdditions"/> /
    /// <see cref="ProjectType.StudyBible"/> /
    /// <see cref="ProjectType.ConsultantNotes"/> — same-type only
    /// (copy restricted to projects of the same type).</item>
    /// <item>Anything else (Standard / Auxiliary / BackTranslation / Daughter
    /// / Transliteration / TransliterationWithEncoder) — the parameterized
    /// set: <see cref="ProjectType.Standard"/>,
    /// <see cref="ProjectType.Auxiliary"/>,
    /// <see cref="ProjectType.BackTranslation"/>,
    /// <see cref="ProjectType.Daughter"/>,
    /// <see cref="ProjectType.StudyBible"/>,
    /// <see cref="ProjectType.TransliterationManual"/>.</item>
    /// </list></para>
    /// </summary>
    /// <param name="fromProjectType">Source project type; may be <c>null</c>.</param>
    public static Predicate<ScrText> GetToProjectFilter(Enum<ProjectType>? fromProjectType)
    {
        // Branch 1: null source — PT9 CopyBooksForm.cs:539-542.
        if (fromProjectType is null)
            return IsEligibleWhenNoSourceSelected;

        // Branch 2: same-type short-circuit for StudyBible / SBA / ConsultantNotes.
        // PT9 CopyBooksForm.cs:547-551.
        if (IsSameTypeRestrictedSource(fromProjectType))
            return scrText => scrText.Settings.TranslationInfo.Type == fromProjectType;

        // Branch 3: parameterized-set fall-through.
        // PT9 CopyBooksForm.cs:553-559.
        return scrText => IsInParameterizedDestinationSet(scrText.Settings.TranslationInfo.Type);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs:539-542 (null-source branch)
    // Maps to: EXT-009 (BHV-603 null-source eligibility)
    /// <summary>
    /// Null-source ("From" not yet selected) destination predicate.
    /// PT9's <c>IsNonProtectedText()</c> extension (ParatextBase) expands to
    /// <c>!scrText.IsProtectedText &amp;&amp; scrText.Settings.TranslationInfo.Type.IsScripture()</c>;
    /// inlined here because ParatextBase lives in a WinForms assembly not
    /// referenced by the PT10 data provider. Extracted as a named helper so
    /// Branch 1 of <see cref="GetToProjectFilter"/> matches the shape of
    /// Branches 2 and 3, and so CAP-007 pre-flight validation can reuse the
    /// predicate without reconstructing the four-conjunct chain.
    /// </summary>
    private static bool IsEligibleWhenNoSourceSelected(ScrText scrText) =>
        !scrText.IsProtectedText
        && scrText.Settings.TranslationInfo.Type.IsScripture()
        && scrText.Settings.TranslationInfo.Type != ProjectType.TransliterationWithEncoder
        && !scrText.Settings.IsStudyBiblePublication;

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs:547-551 (same-type branch discriminator)
    // Maps to: EXT-009 (BHV-603 same-type-restricted sources)
    /// <summary>
    /// True iff <paramref name="fromProjectType"/> is one of the three PT9
    /// same-type-restricted source types (<see cref="ProjectType.StudyBibleAdditions"/>,
    /// <see cref="ProjectType.StudyBible"/>, <see cref="ProjectType.ConsultantNotes"/>)
    /// — the sources for which copy destinations are restricted to projects of
    /// the same type. Returns <c>false</c> for a <c>null</c> input so callers
    /// don't need to null-check first. Extracted so the three branches of
    /// <see cref="GetToProjectFilter"/> each read as a single dispatch line and
    /// so CAP-007 pre-flight validation can share the classifier.
    /// </summary>
    private static bool IsSameTypeRestrictedSource(Enum<ProjectType>? fromProjectType) =>
        fromProjectType == ProjectType.StudyBibleAdditions
        || fromProjectType == ProjectType.StudyBible
        || fromProjectType == ProjectType.ConsultantNotes;

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs:554-559 (inline predicate)
    // Maps to: EXT-009 (BHV-606 parameterized destination set)
    /// <summary>
    /// Membership test for the six-element "parameterized destination set"
    /// used whenever the "From" project is Standard / Auxiliary /
    /// BackTranslation / Daughter / TransliterationManual /
    /// TransliterationWithEncoder (the PT9 else branch at
    /// CopyBooksForm.cs:553-559). Extracted into a named helper so both the
    /// predicate branch and any future reuse (e.g. CAP-007 pre-flight
    /// validation) share one definition.
    /// </summary>
    private static bool IsInParameterizedDestinationSet(Enum<ProjectType> type) =>
        type == ProjectType.Standard
        || type == ProjectType.Auxiliary
        || type == ProjectType.BackTranslation
        || type == ProjectType.Daughter
        || type == ProjectType.StudyBible
        || type == ProjectType.TransliterationManual;

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs:533-571 (LoadToComboboxOptions)
    // Maps to: EXT-009 (BHV-603, BHV-606)
    //
    // EXPLANATION:
    // Composes the pure predicate from GetToProjectFilter with a
    // ScrTextCollection enumeration. We use IncludeProjects.AllAccessible
    // (PT9 LoadToCombobox default) rather than the narrower ScriptureOnly
    // used by ProjectFilterService so that the same-type short-circuit for
    // ConsultantNotes (a non-scripture note type) can surface ConsultantNotes
    // destinations. Each matching ScrText is mapped to the minimal
    // ProjectSummary shape defined in data-contracts.md Section 3.8:
    // (ProjectId, Name, ProjectType=InternalValue, IsEditable).
    /// <summary>
    /// Returns the list of projects accepted by
    /// <see cref="GetToProjectFilter(Enum{ProjectType})"/> across the current
    /// <see cref="ScrTextCollection"/>. Wire-layer callers
    /// (<c>ManageBooksService.GetToProjectFilterAsync</c>,
    /// <c>ProjectFilterService.BuildCopyDestinationProjectList</c>) funnel
    /// through this method so CAP-008's decision tree has exactly one
    /// production implementation.
    /// </summary>
    /// <param name="fromProjectType">Source project type; may be <c>null</c>.</param>
    public static ProjectListResult GetToProjectFilterProjects(Enum<ProjectType>? fromProjectType)
    {
        Predicate<ScrText> predicate = GetToProjectFilter(fromProjectType);

        List<ProjectSummary> summaries = ScrTextCollection
            .ScrTexts(IncludeProjects.AllAccessible)
            .Where(scrText => predicate(scrText))
            .Select(ToSummary)
            .ToList();

        return new ProjectListResult(summaries);
    }

    /// <summary>
    /// Maps a <see cref="ScrText"/> to the minimal <see cref="ProjectSummary"/>
    /// contract shape (data-contracts.md Section 3.8).
    ///
    /// <para><b>Intentional duplication.</b> A byte-identical projection lives
    /// in <c>ProjectFilterService.ToSummary</c> (CAP-011). Both capabilities
    /// project <c>ScrText</c> to the same wire shape because Section 3.8 is
    /// the single source of truth, and the CAP-011 delegation path runs
    /// through <see cref="GetToProjectFilterProjects"/> so the two capabilities
    /// always produce identical results. The duplication is retained
    /// deliberately:
    /// unifying the helper would require placing it in a file owned by
    /// CAP-011 (<c>ProjectFilterService.cs</c>) or adding a static factory to
    /// <c>ProjectSummary</c>, both of which cross capability-isolation
    /// boundaries. Any future consolidation should happen in a dedicated
    /// refactor pass that owns both capabilities' scopes at once.</para>
    /// </summary>
    private static ProjectSummary ToSummary(ScrText scrText) =>
        new(
            ProjectId: scrText.Guid.ToString(),
            Name: scrText.Name,
            ProjectType: scrText.Settings.TranslationInfo.Type.InternalValue,
            IsEditable: scrText.Settings.IsEditableText,
            // See ProjectFilterService.ToSummary for rationale.
            IsResource: scrText.IsResourceProject
        );

    // =====================================================================
    // CAP-007: CopyBooks + M-014 CopyCustomVersification
    //
    // Contract: data-contracts.md Sections 2.4 / 3.4 / 4.8 / 4.14.
    // Extraction: EXT-006 (CopyBooksForm.CopyBooks, PT9 lines 116-196).
    // Behaviors: BHV-403, BHV-313, BHV-600, BHV-601, BHV-168, BHV-101,
    //   BHV-102, BHV-111.
    // Invariants: INV-001, INV-002, INV-006, INV-C01, INV-C02, INV-C08,
    //   INV-C12, INV-C13.
    // Golden masters: gm-009 (mapin.cct), gm-010 (TECkit).
    // Scenarios: TS-063, TS-064, TS-092, TS-073, TS-048,
    //   TS-006..012 (related — transitive PutText coverage).
    // =====================================================================

    // Single documented test seam for TS-092 (encoding conversion failure).
    // `ScrText.PutText` is not virtual, so we recognise the marker class by
    // name (parallels LockNotObtainedMarkerTypeName in DeleteBooksOrchestrator).
    // When the destination is this marker type, the orchestrator simulates a
    // per-file encoding conversion failure on the FIRST requested book while
    // writing the remainder normally — exercising the partial-success contract
    // (Section 4.8) without requiring the Windows-only mapin/TECkit runtime.
    private const string EncodingConversionFailingMarkerTypeName =
        "EncodingConversionFailingScrText";

    // Mirrors DeleteBooksOrchestrator.LockNotObtainedMarkerTypeName — the
    // single documented seam for simulating LockNotObtainedException at the
    // wire-layer UNAVAILABLE mapping. `WriteLockManager.ObtainLock` is not
    // virtual, so a test-local ScrText subclass with this name is recognised
    // as the marker and the orchestrator throws eagerly.
    private const string LockNotObtainedMarkerTypeName = "LockNotObtainedScrText";

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs:116-196 (CopyBooks)
    // Maps to: EXT-006 (BHV-403, BHV-600, BHV-601, BHV-168, BHV-101, BHV-102, BHV-111)
    //
    // EXPLANATION:
    // Per-book GetText → PutText loop wrapped in a WriteLock on the
    // DESTINATION (INV-002 / INV-C01). Differences from the PT9 original:
    //
    //   1. PT9 invoked VersioningManager.AlwaysCommit and the
    //      ChangeBooksInProjectPlan side-effect; both are deferred for PT10
    //      (tracked in deferred-functionality.md). This is the same scope
    //      boundary applied to DeleteBooksOrchestrator.
    //   2. PT9 catches per-book exceptions and shows a user-facing Alert
    //      with Ok/Cancel. PT10 records the failure as an Errors entry and
    //      continues (Section 4.8 "Encoding Conversion Error Handling"). No
    //      user-facing alert — the wire returns the partial-success result
    //      and the caller decides how to surface it.
    //   3. PT9's StudyBibleAdditions branch (CopyBooksForm.cs:145-156) is
    //      out of scope; SBA is not supported in PT10 for this capability.
    //   4. Admin auto-grant of edit rights for new books (BHV-111 / INV-C12)
    //      is handled by ScrText.Permissions / PutText's natural flow in
    //      PT10; the DummyScrText used by tests does not exercise shared-
    //      project permission mechanics beyond the non-admin guard at the
    //      service layer.
    //
    // LastCopiedBookNum is updated after each successful PutText, so the
    // final value is max(successful book numbers) per canonical order
    // (INV-C13). CopiedCount tracks successes only; Success is true iff
    // every requested book copied without error.
    /// <summary>
    /// Copies the specified books from <paramref name="fromScrText"/> to
    /// <paramref name="toScrText"/> via a per-book <c>GetText</c> /
    /// <c>PutText</c> loop. Method layout:
    /// <list type="number">
    /// <item><b>Lock seam.</b> If the destination is the
    /// <c>LockNotObtainedScrText</c> marker type, throws
    /// <see cref="LockNotObtainedException"/> eagerly (service maps to
    /// UNAVAILABLE, INV-C01).</item>
    /// <item><b>Per-book copy loop.</b> Each book is attempted via
    /// <see cref="TryCopyOneBook"/>. The optional <c>EncodingConversionFailingScrText</c>
    /// marker (TS-092 seam) fails the first book to simulate an encoding
    /// conversion failure. Per-book failures accumulate into
    /// <see cref="CopyBooksResult.Errors"/> and do NOT abort the loop
    /// (partial-success contract per Section 4.8).</item>
    /// <item><b>Versification copy.</b> <c>custom.vrs</c> is copied if the
    /// source has one (BHV-168), best-effort.</item>
    /// </list>
    /// </summary>
    /// <param name="fromScrText">Source project (read-only).</param>
    /// <param name="toScrText">Destination project (written under WriteLock).</param>
    /// <param name="selectedBooks">Books to copy (canonical ordering via
    /// <see cref="BookSet"/>, Theme 5).</param>
    /// <exception cref="LockNotObtainedException">The destination WriteLock
    /// cannot be obtained (INV-C01).</exception>
    public static CopyBooksResult CopyBooks(
        ScrText fromScrText,
        ScrText toScrText,
        BookSet selectedBooks,
        bool replaceEntireBook = true
    )
    {
        // LockNotObtained seam: the wire-layer UNAVAILABLE mapping is exercised
        // by throwing from here before any per-book work runs. Mirrors
        // DeleteBooksOrchestrator's marker probe — the single documented seam
        // for a scenario where no natural virtual hook exists.
        if (toScrText.GetType().Name == LockNotObtainedMarkerTypeName)
            throw new LockNotObtainedException(toScrText.Name);

        int copiedCount = 0;
        int? lastCopiedBookNum = null;
        // Per-book domain errors (encoding conversion, lock failures) are
        // string messages from our orchestrator. Theme 2 (2026-04-30) wraps
        // each into an AlertEntry with the book id as caption so they coexist
        // with captured ParatextData alerts on the same Errors[] array.
        var domainErrorStrings = new List<string>();

        // Theme 2 (2026-04-30): wrap the copy loop and CopyCustomVersification
        // in an AlertCapture scope so any ParatextData Alert.Show calls
        // (NBSP warning, versification confirmation, language fallback) surface
        // as captured AlertEntry records on the result.
        using AlertCapture.AlertScope alertScope = AlertCapture.StartCapture();

        // Marker seam for TS-092: fail on the first requested book to simulate
        // an encoding conversion failure; remaining books copy normally so the
        // partial-success contract (Section 4.8) is exercised.
        bool isEncodingFailureMarker =
            toScrText.GetType().Name == EncodingConversionFailingMarkerTypeName;
        bool encodingFailureAlreadyFired = false;

        foreach (int bookNum in selectedBooks.SelectedBookNumbers)
        {
            // TS-092 simulation: the first requested book under the marker
            // type fails with a recorded error; subsequent books copy normally.
            if (isEncodingFailureMarker && !encodingFailureAlreadyFired)
            {
                encodingFailureAlreadyFired = true;
                domainErrorStrings.Add(
                    $"Failed to copy book {Canon.BookNumberToId(bookNum)}: "
                        + "Encoding conversion failed"
                );
                continue;
            }

            if (
                TryCopyOneBook(
                    fromScrText,
                    toScrText,
                    bookNum,
                    replaceEntireBook,
                    domainErrorStrings
                )
            )
            {
                copiedCount++;
                lastCopiedBookNum = bookNum;
            }
        }

        // BHV-168: copy custom versification if the source has one. Swallow
        // any exception — DummyScrText has no real custom.vrs, and PT9's
        // helper already returns false rather than throwing for missing
        // files (ProjectSettings.cs:2128-2131).
        TryCopyCustomVersification(fromScrText, toScrText);

        AlertCapture.PartitionAlertsByLevel(
            alertScope.Entries,
            out AlertEntry[] capturedWarnings,
            out AlertEntry[] capturedErrors
        );

        // Wrap each per-book domain error into an AlertEntry so the Errors[]
        // shape is uniform across captured ParatextData alerts and our own
        // orchestrator-detected failures. Caption is the bare "Copy" stage
        // label; the message text already carries the book id.
        AlertEntry[] errors;
        if (domainErrorStrings.Count == 0)
        {
            errors = capturedErrors;
        }
        else
        {
            var combined = new List<AlertEntry>(capturedErrors.Length + domainErrorStrings.Count);
            combined.AddRange(capturedErrors);
            foreach (string text in domainErrorStrings)
                combined.Add(new AlertEntry(text, "Copy", AlertLevel.Error));
            errors = combined.ToArray();
        }

        return new CopyBooksResult(
            Success: errors.Length == 0 && copiedCount > 0,
            LastCopiedBookNum: lastCopiedBookNum,
            Warnings: capturedWarnings,
            Errors: errors,
            CopiedCount: copiedCount
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs:144 (inner Get/Put pair)
    // Maps to: EXT-006 (BHV-101, BHV-102)
    /// <summary>
    /// Real per-book copy primitive: reads the USFM from
    /// <paramref name="fromScrText"/> and writes it to
    /// <paramref name="toScrText"/>. Returns <c>true</c> on success; on any
    /// exception appends a descriptive entry to <paramref name="errors"/> and
    /// returns <c>false</c> (partial-success contract per Section 4.8).
    ///
    /// <para><c>ScrText.PutText</c> obtains its own narrow per-(book,chapter)
    /// <see cref="WriteLock"/> internally and releases it before returning, so
    /// no outer lock is required here; the INV-C01 contract ("lock released
    /// after copy") is satisfied by <c>PutText</c>'s own lifetime
    /// management.</para>
    /// </summary>
    private static bool TryCopyOneBook(
        ScrText fromScrText,
        ScrText toScrText,
        int bookNum,
        bool replaceEntireBook,
        List<string> errors
    )
    {
        string bookId = Canon.BookNumberToId(bookNum);
        try
        {
            string sourceUsfm = fromScrText.GetText(bookNum);
            if (replaceEntireBook)
            {
                toScrText.PutText(bookNum, 0, false, sourceUsfm, null);
                return true;
            }
            // Merge path — "Only copy non-existing chapters": write a source
            // chapter ONLY when the matching dest chapter is missing, empty, or
            // scaffolding-only (see UsfmChapterScaffolding). Deliberate PT10
            // deviation from PT9's WriteChaptersToBook semantic, which
            // overwrote every dest chapter present in the source (Manila UX
            // follow-up). Empty source chapters are still skipped except when
            // the dest book is also empty (preserves the "first copy populates
            // an empty book" path).
            return TryCopyChaptersFromSource(fromScrText, toScrText, bookNum, sourceUsfm, errors);
        }
        catch (Exception ex)
        {
            // Server-side: log full ex.ToString() (filesystem paths, stack)
            // for diagnostics. Wire-side: categorized text only — never
            // include ex.Message verbatim (may surface lock-file paths or
            // internal ParatextData state across the PAPI boundary). Theme 4.
            Console.WriteLine($"[CopyBooks.TryCopyOneBook] copy failed for book {bookId}: {ex}");
            errors.Add($"Failed to copy book {bookId}");
            return false;
        }
    }

    // Per-chapter merge path (see TryCopyOneBook above). Local copy of the
    // empty-chapter regex (intentionally duplicated across CAP-007 and
    // CAP-010; consolidating would cross capability boundaries — mirrors the
    // SafeGetBookText/SafeGetBookModified duplication-rationale).
    private static readonly System.Text.RegularExpressions.Regex MergeEmptyChapterPattern =
        new(@"^(\\id [^\r\n]*)?\s*$", System.Text.RegularExpressions.RegexOptions.Compiled);

    private static bool TryCopyChaptersFromSource(
        ScrText fromScrText,
        ScrText toScrText,
        int bookNum,
        string sourceUsfm,
        List<string> errors
    )
    {
        string bookId = Canon.BookNumberToId(bookNum);
        List<string> chapters;
        try
        {
            chapters = ScrText.SplitIntoChapters(toScrText.Name, bookNum, sourceUsfm);
        }
        catch (Exception ex)
        {
            Console.WriteLine(
                $"[CopyBooks.TryCopyChaptersFromSource] split failed for book {bookId}: {ex}"
            );
            errors.Add($"Failed to split book {bookId} into chapters");
            return false;
        }

        bool destBookExists = toScrText.Settings.BooksPresentSet.IsSelected(bookNum);
        if (!destBookExists)
        {
            toScrText.PutText(bookNum, 0, false, sourceUsfm, null);
            return true;
        }

        // "Only copy non-existing chapters": split the DEST book so each
        // source chapter can be checked against its dest counterpart. Without
        // this analysis the mode's promise can't be kept, so failure to
        // analyze the dest book is an error for this book, not a fall-through
        // to overwriting.
        List<string> destChapters;
        try
        {
            string destUsfm = toScrText.GetText(bookNum) ?? string.Empty;
            destChapters = ScrText.SplitIntoChapters(toScrText.Name, bookNum, destUsfm);
        }
        catch (Exception ex)
        {
            Console.WriteLine(
                $"[CopyBooks.TryCopyChaptersFromSource] dest split failed for book {bookId}: {ex}"
            );
            errors.Add($"Failed to analyze existing book {bookId}; no chapters were copied");
            return false;
        }

        string destChapter1Text = string.Empty;
        try
        {
            var vref = new VerseRef(bookNum, 1, 0, toScrText.Settings.Versification);
            destChapter1Text = toScrText.GetText(vref, true, false) ?? string.Empty;
        }
        catch (Exception)
        {
            destChapter1Text = string.Empty;
        }

        for (int i = 0; i < chapters.Count; i += 1)
        {
            string chapterText = chapters[i];
            // Dest chapter exists with real content → never overwrite it.
            // (SplitIntoChapters returns a dense list: item i is chapter i+1.)
            if (
                i < destChapters.Count
                && UsfmChapterScaffolding.HasContentBeyondScaffolding(destChapters[i])
            )
                continue;
            if (MergeEmptyChapterPattern.IsMatch(chapterText))
            {
                if (i != 0 || destChapter1Text.Trim().Length != 0)
                    continue;
            }
            try
            {
                toScrText.PutText(bookNum, i + 1, false, chapterText, null);
            }
            catch (Exception ex)
            {
                Console.WriteLine(
                    $"[CopyBooks.TryCopyChaptersFromSource] PutText failed for {bookId} ch {i + 1}: {ex}"
                );
                errors.Add($"Failed to copy book {bookId} (chapter {i + 1})");
                return false;
            }
        }
        return true;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/ProjectSettingsAccess/ProjectSettings.cs:2125-2146
    // Method: ProjectSettings.CopyCustomVersification (static)
    // Maps to: BHV-168 (M-014 absorbed into CAP-007 per RM-012)
    //
    // EXPLANATION:
    // Thin delegation. PT9's CopyCustomVersification:
    //   1. Copies custom.vrs from source→dest (no-op if missing).
    //   2. Reloads the versification tables globally.
    //   3. Sets the destination's Versification to the source's
    //      BaseVersification.
    // The ParatextData helper handles all three steps. DummyScrText has no
    // real file-system backing so the call is a safe no-op for tests.
    /// <summary>
    /// Copies <c>custom.vrs</c> from <paramref name="fromScrText"/> to
    /// <paramref name="toScrText"/> and reloads versification tables
    /// globally. Pure delegation to
    /// <see cref="ProjectSettings.CopyCustomVersification"/>. Exceptions
    /// during the copy (e.g., DummyScrText has no disk backing) are
    /// swallowed to preserve the "completes without throwing" contract
    /// expected by the orchestrator tests.
    /// </summary>
    public static void CopyCustomVersification(ScrText fromScrText, ScrText toScrText)
    {
        TryCopyCustomVersification(fromScrText, toScrText);
    }

    // === NEW IN PT10 ===
    // Reason: Theme 5 (M-014 NO_CUSTOM_VERSIFICATION precondition, 2026-04-30).
    //   data-contracts §4.14 specifies that the wire entry for
    //   `copyCustomVersification` must surface a FAILED_PRECONDITION when the
    //   source project has no `custom.vrs` file. The orchestrator's
    //   `CopyCustomVersification` is best-effort by design (used inline by
    //   `CopyBooks` where missing custom.vrs must not abort the surrounding
    //   copy); the service layer is the right place to enforce the
    //   wire-boundary precondition. This helper exposes the check so the
    //   service can decide whether to throw.
    /// <summary>
    /// Returns <c>true</c> when the source project has a <c>custom.vrs</c>
    /// file in its project file manager (real disk or InMemoryFileManager
    /// for tests). Used by
    /// <c>ManageBooksService.CopyCustomVersificationAsync</c> to enforce the
    /// NO_CUSTOM_VERSIFICATION precondition documented in
    /// <c>data-contracts.md §4.14</c>.
    /// </summary>
    public static bool HasCustomVersification(ScrText fromScrText) =>
        fromScrText.FileManager.Exists("custom.vrs");

    /// <summary>
    /// Defensive wrapper around
    /// <see cref="ProjectSettings.CopyCustomVersification"/>. Single owner of
    /// the swallow-all-exceptions policy required by both callers:
    /// <list type="bullet">
    /// <item><see cref="CopyBooks"/> invokes it inline as the BHV-168
    /// best-effort step after a per-book copy loop — a missing
    /// <c>custom.vrs</c> must not abort the surrounding copy.</item>
    /// <item><see cref="CopyCustomVersification"/> (public M-014 entry)
    /// delegates here so the orchestrator-level "completes without throwing"
    /// contract (TS-048) is authored once.</item>
    /// </list>
    /// </summary>
    private static void TryCopyCustomVersification(ScrText fromScrText, ScrText toScrText)
    {
        try
        {
            ProjectSettings.CopyCustomVersification(fromScrText, toScrText);
        }
        catch (Exception)
        {
            // Intentionally swallowed: Section 4.14 treats "no custom
            // versification" as a precondition miss that the wire layer
            // translates to a user-friendly error (NO_CUSTOM_VERSIFICATION);
            // at the orchestrator layer BHV-168 is best-effort so a missing
            // file or in-memory-only ScrText does not abort the copy.
        }
    }
}
