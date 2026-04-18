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
            // gm-002 canonical literal — PT9 Localizer.Str("CLParagraphCellsDataSource_1",
            // "Comparative texts have identical markers.") wrapped in "*** ... ***".
            return new EmptyResultMessage(
                Variant: "identical",
                Message: "*** Comparative texts have identical markers. ***",
                SearchedMarkers: null,
                SearchedBooks: null
            );
        }

        // "noResults" variant — structured fields drive the UI's localized
        // rendering (see data-contracts.md §3.8). Tests assert only on
        // Variant + SearchedMarkers + SearchedBooks.
        return new EmptyResultMessage(
            Variant: "noResults",
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
}
