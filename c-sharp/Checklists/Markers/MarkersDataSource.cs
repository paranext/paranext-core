using System.Text.RegularExpressions;
using Paratext.Data;

namespace Paranext.DataProvider.Checklists.Markers;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists/CLParagraphCellsDataSource.cs
// Extractions: EXT-003 (ParagraphMarkers), EXT-004 (PostProcessParagraph),
//   EXT-005 (HasSameValue), EXT-006 (InitializeMarkerMappings),
//   EXT-007 (PostProcessRows), EXT-013 (HeadingMarkers / NonHeadingParagraphMarkers)
// Behaviors: BHV-102, BHV-103, BHV-104, BHV-105, BHV-106, BHV-120
// Invariants: INV-003, INV-004, INV-005 (bidirectional), INV-008
// Validations: VAL-001, VAL-005, VAL-006
// Contract: data-contracts.md §4.1 (leaf operations inside BuildChecklistData)
//
// Stateless per-method port. PT9 held `markerMappings` and `markerFilter` as
// instance fields populated by `InitializeMarkerMappings()`; PT10 returns the
// parsed tuple and the caller (CAP-006 orchestrator) threads them into
// `HasSameValue` / `PostProcessRows` explicitly (backend-alignment.md
// "Thread safety via statelessness").
/// <summary>
/// Stateless leaf-logic utilities for the Markers checklist. See the test
/// suite in <c>c-sharp-tests/Checklists/Markers/MarkersDataSourceTests.cs</c>
/// for the behavioural specification that each method must satisfy.
/// </summary>
internal static class MarkersDataSource
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLParagraphCellsDataSource.cs:208-214
    // Method: CLMarkersDataSource.ParagraphMarkers(int bookNum)
    // Maps to: EXT-003 / BHV-102 / INV-003 / VAL-006
    /// <summary>
    /// Returns paragraph-style markers from the stylesheet, optionally
    /// intersected with a non-empty <paramref name="markerFilter"/>.
    /// Enforces INV-003 (paragraph-style only) and VAL-006 (empty filter = all).
    /// </summary>
    public static HashSet<string> ParagraphMarkers(
        ScrStylesheet stylesheet,
        HashSet<string> markerFilter
    ) =>
        MarkersWhere(
            stylesheet,
            tag =>
                tag.StyleType == ScrStyleType.scParagraphStyle
                && (markerFilter.Count == 0 || markerFilter.Contains(tag.Marker))
        );

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLParagraphCellsDataSource.cs:221-226
    // Method: CLMarkersDataSource.PostProcessParagraph(CLCell, VerseRef, CLParagraph)
    // Maps to: EXT-004 / BHV-103 / INV-004
    //
    // EXPLANATION:
    // PT9 mutated `paragraph.Items` in place: if ShowReferencedVerseText was
    // false it cleared the list first, then inserted `new CLText("\\"+Marker)`
    // at position 0. PT10 records are immutable (CAP-001 decision), so we
    // return a NEW ChecklistParagraph via the record's `with` expression with
    // a freshly built Items list. The backslash-prefix TextItem at index 0
    // is INV-004; showVerseText controls whether the original items follow.
    /// <summary>
    /// Returns a new paragraph with a backslash-prefixed marker
    /// <see cref="TextItem"/> at position 0 (INV-004). When
    /// <paramref name="showVerseText"/> is false, the remainder of the
    /// original items is dropped; when true, they are preserved after the
    /// marker item (BHV-103).
    /// </summary>
    public static ChecklistParagraph PostProcessParagraph(
        ChecklistParagraph paragraph,
        bool showVerseText
    )
    {
        var newItems = new List<ChecklistContentItem>
        {
            new TextItem("\\" + paragraph.Marker, null),
        };
        if (showVerseText)
            newItems.AddRange(paragraph.Items);
        return paragraph with { Items = newItems };
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLParagraphCellsDataSource.cs:228-260
    // Methods: CLMarkersDataSource.HasSameValue(...) and IsEquivalentMarker(...)
    // Maps to: EXT-005 / BHV-104 / INV-005
    /// <summary>
    /// Returns true when every adjacent pair of cells in
    /// <paramref name="row"/> has equal paragraph counts AND every paragraph
    /// is equivalent (identical marker OR mapped via
    /// <paramref name="markerMappings"/>). Lookup honours INV-005
    /// bidirectional storage: only the forward edge is consulted per
    /// ordered pair, but the dictionary always contains both directions.
    /// </summary>
    public static bool HasSameValue(
        ChecklistRow row,
        IReadOnlyDictionary<string, List<string>> markerMappings
    )
    {
        // PT9:230-231 — single-cell rows are never a "match" (there's nothing
        // to compare against).
        if (row.Cells.Count <= 1)
            return false;

        // PT9:236-247 — pairwise (c, c+1) column comparison.
        for (int c = 0; c < row.Cells.Count - 1; c++)
        {
            ChecklistCell cell = row.Cells[c];
            ChecklistCell nextCell = row.Cells[c + 1];
            if (cell.Paragraphs.Count != nextCell.Paragraphs.Count)
                return false;

            for (int para = 0; para < cell.Paragraphs.Count; para++)
            {
                if (
                    !IsEquivalentMarker(
                        cell.Paragraphs[para].Marker,
                        nextCell.Paragraphs[para].Marker,
                        markerMappings
                    )
                )
                    return false;
            }
        }
        return true;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLParagraphCellsDataSource.cs:251-260
    // Method: CLMarkersDataSource.IsEquivalentMarker(string, string)
    // PT10 signature takes the mapping dictionary as a parameter (stateless);
    // PT9 read it from the instance field `markerMappings`.
    /// <summary>
    /// Returns true when <paramref name="marker1"/> and
    /// <paramref name="marker2"/> are equal, or when the forward mapping
    /// edge (marker1 -> marker2) is present in
    /// <paramref name="markerMappings"/>. Bidirectionality (INV-005) is
    /// guaranteed by the caller storing both edges at mapping-parse time.
    /// </summary>
    private static bool IsEquivalentMarker(
        string marker1,
        string marker2,
        IReadOnlyDictionary<string, List<string>> markerMappings
    )
    {
        if (marker1 == marker2)
            return true;
        return markerMappings.TryGetValue(marker1, out var mappings)
            && mappings != null
            && mappings.Contains(marker2);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLParagraphCellsDataSource.cs:262-292
    //   plus the `MarkerFilter` getter at :185-195 for the backslash-strip step.
    // Method: CLMarkersDataSource.InitializeMarkerMappings()
    // Maps to: EXT-006 / BHV-105 / INV-005 (CRITICAL) / VAL-001 / VAL-005 / VAL-006
    //
    // EXPLANATION:
    // INV-005 (bidirectional storage) is the critical invariant: for every
    // "a/b" pair in the mappings string we MUST record BOTH a->b AND b->a so
    // that downstream `HasSameValue` calls get a symmetric equivalence even
    // though the help docs describe mappings as a one-way list. Using
    // TryGetValue + list-accumulation (rather than direct assignment) lets
    // multiple pairs share a key ("q/q1 q/q2" -> q -> [q1, q2]) without
    // clobbering (TS-017). Invalid tokens (0 slashes like "invalid" or 2+
    // slashes like "p/q1/q2") are silently dropped per VAL-005.
    /// <summary>
    /// Parses the two PT9 settings strings into the bidirectional mapping
    /// dictionary (INV-005) and the filter set. Invalid pairs (0 or 2+
    /// slashes) are silently skipped per VAL-005; backslashes in the filter
    /// are stripped per VAL-001; empty/whitespace filters become the empty
    /// set per VAL-006. See BHV-105.
    /// </summary>
    public static (
        Dictionary<string, List<string>> Mappings,
        HashSet<string> Filter
    ) InitializeMarkerMappings(string equivalentMarkersInput, string markerFilterInput) =>
        (
            ParseEquivalentMarkerMappings(equivalentMarkersInput),
            ParseMarkerFilter(markerFilterInput)
        );

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLParagraphCellsDataSource.cs:185-195 (MarkerFilter
    //   getter — strips backslashes) + :267-269 (splits on whitespace into the filter set).
    /// <summary>
    /// Parses the raw marker-filter setting. Strips backslashes (VAL-001),
    /// splits on whitespace, and returns an empty set for empty /
    /// whitespace-only input (VAL-006).
    /// </summary>
    private static HashSet<string> ParseMarkerFilter(string markerFilterInput)
    {
        var markerFilter = new HashSet<string>();
        if (string.IsNullOrEmpty(markerFilterInput))
            return markerFilter;

        // VAL-001: strip backslashes before tokenising.
        string filter = markerFilterInput.Replace(@"\", "");

        // VAL-006: whitespace-only input yields no tokens (and therefore the empty set).
        if (string.IsNullOrEmpty(filter.Trim()))
            return markerFilter;

        foreach (string token in filter.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries))
            markerFilter.Add(token);

        return markerFilter;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLParagraphCellsDataSource.cs:271-291.
    /// <summary>
    /// Parses the raw equivalent-markers setting into a bidirectional
    /// mapping dictionary. For every well-formed <c>a/b</c> pair, stores
    /// <b>both</b> <c>a -&gt; b</c> and <c>b -&gt; a</c> so downstream
    /// equivalence lookups are symmetric (INV-005). Tokens without exactly
    /// one slash are silently skipped (VAL-005).
    /// </summary>
    private static Dictionary<string, List<string>> ParseEquivalentMarkerMappings(
        string equivalentMarkersInput
    )
    {
        var markerMappings = new Dictionary<string, List<string>>();
        if (string.IsNullOrEmpty(equivalentMarkersInput))
            return markerMappings;

        foreach (string mapping in equivalentMarkersInput.Split(' '))
        {
            string[] marks = mapping.Split('/');
            if (marks.Length != 2)
                continue; // VAL-005: silently skip invalid pairs.

            // INV-005: record BOTH directions. TryGetValue + Add (rather than
            // direct assignment) lets repeated left-hand or right-hand markers
            // accumulate targets (e.g. "q/q1 q/q2" -> q -> [q1, q2]).
            AddMapping(markerMappings, marks[0], marks[1]);
            AddMapping(markerMappings, marks[1], marks[0]);
        }

        return markerMappings;
    }

    private static void AddMapping(
        Dictionary<string, List<string>> mappings,
        string from,
        string to
    )
    {
        if (!mappings.TryGetValue(from, out var targets))
            mappings[from] = targets = new List<string>();
        targets.Add(to);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLParagraphCellsDataSource.cs:294-320
    // Method: CLMarkersDataSource.PostProcessRows(CLData checklist)
    // Maps to: EXT-007 / BHV-106 / INV-008
    //
    // EXPLANATION:
    // PT9 appended a synthetic "message row" into `checklist.Rows` so the UI
    // could render it alongside real rows. PT10 separates the message out as
    // an `EmptyResultMessage?` on `ChecklistResult` (data-contracts.md §3.1 /
    // §3.8); returning null when rows are non-empty preserves INV-008's
    // inverse direction. The "identical" variant uses a fixed English
    // literal (asserted by gm-002 capture); the "noResults" variant carries
    // SearchedMarkers/SearchedBooks so the UI can render a localized message
    // — the PT9 formatted string is not stored here because the wording will
    // change in PT10's localization layer (see plan Decisions Made).
    /// <summary>
    /// Returns an <see cref="EmptyResultMessage"/> (variant "identical" when
    /// no filter is active, "noResults" when one is) when
    /// <paramref name="rows"/> is empty, carrying the searched markers and
    /// books so the UI can render the localized message. Returns
    /// <see langword="null"/> when rows are non-empty. Enforces INV-008.
    /// </summary>
    public static EmptyResultMessage? PostProcessRows(
        IReadOnlyList<ChecklistRow> rows,
        HashSet<string> markerFilter,
        IReadOnlyList<string> searchedBookNames
    )
    {
        if (rows.Count > 0)
            return null; // INV-008 inverse — non-empty results carry no message.

        if (markerFilter.Count == 0)
        {
            // gm-002 localized message. We return the paranext-core localize key —
            // the wrapping NetworkObject resolves it via LocalizationService.GetLocalizedString
            // before sending over the wire (see patterns.errorHandling.backendLocalization).
            // Maps to PT9 CLParagraphCellsDataSource_1. PT9 displayed this wrapped in "*** ... ***"
            // as a UI decoration added outside the localized string (CLParagraphCellsDataSource.cs:313);
            // we deliberately drop that wrapping so the UI can decorate as it sees fit.
            return new EmptyResultMessage(
                Variant: EmptyResultMessageVariant.Identical,
                Message: IdenticalMarkersMessageKey,
                SearchedMarkers: null,
                SearchedBooks: null
            );
        }

        // "noResults" variant — structured fields drive the UI's localized
        // rendering (see data-contracts.md §3.8). Tests assert only on
        // Variant + SearchedMarkers + SearchedBooks.
        return new EmptyResultMessage(
            Variant: EmptyResultMessageVariant.NoResults,
            Message: string.Empty,
            SearchedMarkers: markerFilter.ToList(),
            SearchedBooks: searchedBookNames
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLParagraphCellsDataSource.cs:27-32
    // Method: CLParagraphCellsDataSource.HeadingMarkers(int bookNum)
    // Maps to: EXT-013 / BHV-120 (heading)
    /// <summary>
    /// Returns heading paragraph markers from the stylesheet
    /// (TextType == scSection AND StyleType == scParagraphStyle). See BHV-120.
    /// </summary>
    public static HashSet<string> HeadingMarkers(ScrStylesheet stylesheet) =>
        MarkersWhere(
            stylesheet,
            tag =>
                tag.TextType == ScrTextType.scSection
                && tag.StyleType == ScrStyleType.scParagraphStyle
        );

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLParagraphCellsDataSource.cs:38-43
    // Method: CLParagraphCellsDataSource.NonHeadingParagraphMarkers(int bookNum)
    // Maps to: EXT-013 / BHV-120 (non-heading)
    /// <summary>
    /// Returns non-heading paragraph markers from the stylesheet
    /// (TextType == scVerseText AND StyleType == scParagraphStyle). See BHV-120.
    /// </summary>
    public static HashSet<string> NonHeadingParagraphMarkers(ScrStylesheet stylesheet) =>
        MarkersWhere(
            stylesheet,
            tag =>
                tag.TextType == ScrTextType.scVerseText
                && tag.StyleType == ScrStyleType.scParagraphStyle
        );

    /// <summary>
    /// Projects the markers of every <see cref="ScrTag"/> in
    /// <paramref name="stylesheet"/> matching <paramref name="predicate"/>
    /// into a <see cref="HashSet{T}"/>. Shared helper for
    /// <see cref="ParagraphMarkers"/>, <see cref="HeadingMarkers"/>, and
    /// <see cref="NonHeadingParagraphMarkers"/>.
    /// </summary>
    private static HashSet<string> MarkersWhere(
        ScrStylesheet stylesheet,
        Func<ScrTag, bool> predicate
    ) => new(stylesheet.Tags.Where(predicate).Select(tag => tag.Marker));

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/MarkerSettingsForm.cs:28-49
    // Method: MarkerSettingsForm.btnOk_Click(object, EventArgs)
    // Maps to: EXT-019 / BHV-105 / BHV-312 (backend branch) / VAL-002
    //
    // EXPLANATION:
    // Ports PT9's Settings-dialog pre-commit validator as a pure function. The
    // UI-layer concerns (Alert.Show, DialogResult.OK, control-read/write) are
    // stripped; the pass/fail outcome is returned as a structured
    // MarkerSettingsValidationResult so the UI-layer (CAP-UI-002) can either
    // apply the setting or keep the dialog open and display the error.
    //
    // Five-step algorithm (line numbers reference PT9 source):
    //   1. PT9:30 — null coerces to empty via `?? ""`.
    //   2. PT9:31 — `Regex.Replace(equivalents.Trim(), " +", " ")` trims outer
    //      whitespace then collapses any run of spaces into a single space. The
    //      regex pattern " +" is one-or-more literal ASCII spaces (no culture
    //      sensitivity). This normalization matters both for `p/q   q1/q2` →
    //      2-token Split (TS-VAL-002-06) and for `"   "` → `""` → empty-branch.
    //   3. PT9:32 — an empty normalized string is VALID with zero pairs
    //      (TS-VAL-002-07). §3.13 requires ParsedPairs be non-null when
    //      Valid=true, so we return Array.Empty<MarkerPair>().
    //   4. PT9:34-43 — for each space-split token: require exactly one slash
    //      AND both sides non-empty after trim. On the FIRST failure, return
    //      fail-fast with the PT9 error literal and ParsedPairs=null. This
    //      matches PT9's bare `return;` statement at line 41.
    //   5. PT9:44 — on a fully-validated input, return Valid=true with one
    //      MarkerPair per token in source order.
    //
    // Contract divergence from CAP-002.InitializeMarkerMappings (VAL-005):
    // That method silently SKIPS invalid tokens to preserve runtime robustness
    // (e.g., a corrupted settings file should not crash the data provider).
    // ValidateMarkerSettings is the user-facing pre-commit path (VAL-002) and
    // REJECTS invalid input so the dialog stays open. The two entry points
    // share neither helper nor state by design; a REFACTOR pass may choose to
    // hoist a shared "split-one-pair" helper, but that is a Refactorer
    // decision, not a GREEN decision (see plan Decision 5 in the Test Writer
    // plan; REFACTOR stays minimal for CAP-007).
    //
    // Structural invariant (data-contracts.md §3.13) — strictly enforced:
    //   Valid=true  => ParsedPairs is non-null; ErrorMessage is null.
    //   Valid=false => ErrorMessage is non-null; ParsedPairs is null
    //                  (NO partial-parse leakage — even pairs that parsed
    //                  successfully before the failing token are discarded).
    //
    // PT9 error literal "Equivalent markers need to be entered in the form:
    // p/q" (MarkerSettingsForm.cs:39) is returned verbatim. Localization
    // (lookup key `MarkerSettingsForm_1`) is a UI-layer concern; the backend
    // returns the canonical English string so the UI can either display it
    // directly or swap in a localized variant. This matches CAP-002's
    // `gm-002` `"*** Comparative texts have identical markers. ***"` pattern.
    //
    // Test spec: c-sharp-tests/Checklists/Markers/MarkerSettingsValidationTests.cs (22 tests).

    /// <summary>
    /// Localize key returned in the <c>ErrorMessage</c> field of a failed
    /// <see cref="ValidateMarkerSettings(string)"/> result. Resolution happens
    /// at the PAPI wire boundary (see
    /// <see cref="Paranext.DataProvider.Checklists.ChecklistNetworkObject"/>)
    /// — per the <c>patterns.errorHandling.backendLocalization</c> registry
    /// entry, stateless services return the key and the wrapping
    /// NetworkObject resolves it via <c>LocalizationService.GetLocalizedString</c>.
    /// Maps to PT9 <c>MarkerSettingsForm_1</c>. Translations live in
    /// <c>extensions/src/platform-scripture/contributions/localizedStrings.json</c>.
    /// </summary>
    public const string InvalidMarkerPairErrorKey = "%markersChecklist_errorInvalidMarkerPair%";

    /// <summary>
    /// English fallback text for <see cref="InvalidMarkerPairErrorKey"/>,
    /// used by the NetworkObject layer when the localization service is
    /// unavailable (e.g. in unit tests). Byte-for-byte matches the PT9
    /// <c>Localizer.Str</c> default at <c>MarkerSettingsForm.cs:39</c>.
    /// </summary>
    public const string InvalidMarkerPairErrorFallback =
        "Equivalent markers need to be entered in the form: p/q";

    /// <summary>
    /// Localize key placed in <see cref="EmptyResultMessage.Message"/> when
    /// the "identical" empty-result variant is returned by
    /// <see cref="PostProcessRows"/>. Resolution happens at the PAPI wire
    /// boundary (see
    /// <see cref="Paranext.DataProvider.Checklists.ChecklistNetworkObject"/>).
    /// Maps to PT9 <c>CLParagraphCellsDataSource_1</c>. Translations live in
    /// <c>extensions/src/platform-scripture/contributions/localizedStrings.json</c>.
    /// </summary>
    public const string IdenticalMarkersMessageKey =
        "%markersChecklist_emptyResult_identicalMarkers%";

    /// <summary>
    /// English fallback text for <see cref="IdenticalMarkersMessageKey"/>,
    /// used by the NetworkObject layer when the localization service is
    /// unavailable. Matches the PT9 <c>Localizer.Str</c> default at
    /// <c>CLParagraphCellsDataSource.cs:304</c> (bare — PT9's "*** ... ***"
    /// decoration is a UI concern, not part of the localized string).
    /// </summary>
    public const string IdenticalMarkersMessageFallback =
        "Comparative texts have identical markers.";

    /// <summary>
    /// Validates a user-entered equivalent-markers string ("marker1/marker2"
    /// pairs separated by spaces). Returns a <see cref="MarkerSettingsValidationResult"/>
    /// carrying either the parsed pairs (<c>Valid=true</c>) or the canonical
    /// PT9 error message (<c>Valid=false</c>). Empty, null, and whitespace-only
    /// inputs are treated as valid with an empty pair list. On the first
    /// malformed token, validation fails fast without leaking partial results
    /// (§3.13 mutex). See data-contracts.md §4.2 and EXT-019.
    /// </summary>
    public static MarkerSettingsValidationResult ValidateMarkerSettings(string equivalentMarkers)
    {
        // Step 1+2: PT9 lines 30-31 — null coerces to empty, then trim + collapse spaces.
        string equivalents = Regex.Replace((equivalentMarkers ?? string.Empty).Trim(), " +", " ");

        // Step 3: PT9 line 32 — empty (including whitespace-only after normalization)
        // is VALID with no pairs. Return Array.Empty so ParsedPairs is non-null per §3.13.
        if (equivalents.Length == 0)
            return new MarkerSettingsValidationResult(true, Array.Empty<MarkerPair>(), null);

        // Step 4: PT9 lines 34-43 — tokenize and validate each pair, fail-fast on invalid.
        var pairs = new List<MarkerPair>();
        foreach (string pair in equivalents.Split(' '))
        {
            string[] items = pair.Split('/');
            if (items.Length != 2 || items[0].Trim().Length == 0 || items[1].Trim().Length == 0)
            {
                // VAL-002 fail-fast: §3.13 requires ParsedPairs=null on failure
                // (no partial-parse leak). Contrast with CAP-002's silent-skip
                // VAL-005 path inside ParseEquivalentMarkerMappings.
                return new MarkerSettingsValidationResult(false, null, InvalidMarkerPairErrorKey);
            }
            pairs.Add(new MarkerPair(items[0], items[1]));
        }

        // Step 5: PT9 line 44 — all tokens valid; return pairs in source order.
        return new MarkerSettingsValidationResult(true, pairs, null);
    }
}
