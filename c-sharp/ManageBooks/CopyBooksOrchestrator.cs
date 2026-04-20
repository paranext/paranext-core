using Paratext.Data;
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
            return FilesAreSameEntry(bookNum, bookName);

        // 2. Source missing → SourceDoesNotExist (Selectable=false). Also
        // covers the both-empty case (LoadBooks_BothProjectsEmpty).
        if (string.IsNullOrEmpty(sourceText))
            return SourceDoesNotExistEntry(bookNum, bookName);

        // 3. Dest missing → DestDoesNotExist (include=true per INV-C07).
        if (string.IsNullOrEmpty(destText))
            return DestDoesNotExistEntry(bookNum, bookName);

        // 4. Both texts present and different → compare modification times.
        if (sourceModified > destModified)
            return SourceIsNewerEntry(bookNum, bookName);

        if (sourceModified < destModified)
            return SourceIsOlderEntry(bookNum, bookName);

        // 5. Same timestamp, different text → Undetermined (TS-027).
        return UndeterminedEntry(bookNum, bookName);
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
    private static BookComparisonEntry FilesAreSameEntry(int bookNum, string bookName) =>
        BuildEntry(
            bookNum,
            bookName,
            ComparisonState.FilesAreSame,
            defaultIncluded: false,
            selectable: true,
            tooltip: FilesAreSameTooltip
        );

    /// <summary>SourceDoesNotExist is the only state with Selectable=false (TS-090).</summary>
    private static BookComparisonEntry SourceDoesNotExistEntry(int bookNum, string bookName) =>
        BuildEntry(
            bookNum,
            bookName,
            ComparisonState.SourceDoesNotExist,
            defaultIncluded: false,
            selectable: false,
            tooltip: SourceDoesNotExistTooltip
        );

    /// <summary>INV-C07: DestDoesNotExist → pre-select=true (corrects PT9 FB 29809).</summary>
    private static BookComparisonEntry DestDoesNotExistEntry(int bookNum, string bookName) =>
        BuildEntry(
            bookNum,
            bookName,
            ComparisonState.DestDoesNotExist,
            defaultIncluded: true,
            selectable: true,
            tooltip: DestDoesNotExistTooltip
        );

    /// <summary>SourceIsNewer → pre-select=true (corrects PT9 FB 29809; TS-025).</summary>
    private static BookComparisonEntry SourceIsNewerEntry(int bookNum, string bookName) =>
        BuildEntry(
            bookNum,
            bookName,
            ComparisonState.SourceIsNewer,
            defaultIncluded: true,
            selectable: true,
            tooltip: SourceIsNewerTooltip
        );

    /// <summary>SourceIsOlder → pre-select=false (TS-026).</summary>
    private static BookComparisonEntry SourceIsOlderEntry(int bookNum, string bookName) =>
        BuildEntry(
            bookNum,
            bookName,
            ComparisonState.SourceIsOlder,
            defaultIncluded: false,
            selectable: true,
            tooltip: SourceIsOlderTooltip
        );

    /// <summary>Undetermined (same timestamp, different text) → pre-select=false, empty tooltip (TS-027).</summary>
    private static BookComparisonEntry UndeterminedEntry(int bookNum, string bookName) =>
        BuildEntry(
            bookNum,
            bookName,
            ComparisonState.Undetermined,
            defaultIncluded: false,
            selectable: true,
            tooltip: UndeterminedTooltip
        );

    /// <summary>Positional-to-record adapter so each per-state factory above is a one-liner.</summary>
    private static BookComparisonEntry BuildEntry(
        int bookNum,
        string bookName,
        ComparisonState state,
        bool defaultIncluded,
        bool selectable,
        string tooltip
    ) => new(bookNum, bookName, state, defaultIncluded, selectable, tooltip);

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
            IsEditable: scrText.Settings.IsEditableText
        );

    // =====================================================================
    // CAP-007: CopyBooks (BE-3 — Test Writer RED stubs)
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
    //
    // These stubs throw NotImplementedException so CopyBooksOrchestratorTests
    // and CopyBooksServiceTests are RED until the Implementer agent fills in
    // the GetText → PutText loop, WriteLock handling (INV-C01), encoding
    // conversion failure handling (TS-092 partial-success), admin permission
    // auto-grant (INV-C12), and auxiliary-file copying (BHV-168).
    // =====================================================================

    /// <summary>
    /// Copies the specified books from <paramref name="fromScrText"/> to
    /// <paramref name="toScrText"/>.
    /// See data-contracts.md Section 4.8 for the full contract (preconditions,
    /// postconditions, error conditions). RED stub — throws
    /// <see cref="NotImplementedException"/>.
    /// </summary>
    public static CopyBooksResult CopyBooks(
        ScrText fromScrText,
        ScrText toScrText,
        BookSet selectedBooks
    )
    {
        throw new NotImplementedException("CAP-007: CopyBooks orchestrator (RED state)");
    }

    /// <summary>
    /// Copies <c>custom.vrs</c> from <paramref name="fromScrText"/> to
    /// <paramref name="toScrText"/> and reloads versification tables
    /// globally. Maps to BHV-168 / TS-048. RED stub — throws
    /// <see cref="NotImplementedException"/>.
    /// </summary>
    public static void CopyCustomVersification(ScrText fromScrText, ScrText toScrText)
    {
        throw new NotImplementedException(
            "CAP-007 / M-014: CopyCustomVersification orchestrator (RED state)"
        );
    }
}
