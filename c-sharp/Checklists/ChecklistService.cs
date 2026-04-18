using Paratext.Data;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.Checklists;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists/CLParagraphCellsDataSource.cs:50-135
// Extractions: EXT-008 (GetTokensForBook)
// Behaviors: BHV-108 (token walking + filter)
// Invariants: INV-009 (heading verse reference assignment)
// Contract: data-contracts.md §4.1 (BuildChecklistData internal pipeline)
// Companion type: ChecklistParagraphTokens (EXT-012) in
//   ChecklistParagraphTokens.cs (same directory).

/// <summary>
/// Stateless checklist orchestration service. Hosts USFM token walking
/// (<see cref="GetTokensForBook"/> — EXT-008), cell construction (EXT-011,
/// added under CAP-004), and the top-level BuildChecklistData /
/// ResolveComparativeTexts methods (added under CAP-006 / CAP-009). This
/// file is the shared landing pad for those extractions; CAP-003 lands the
/// token-extraction surface.
/// </summary>
internal static class ChecklistService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLParagraphCellsDataSource.cs:50-91
    //   (CLParagraphCellsDataSource.GetTokensForBook)
    // Maps to: EXT-008 / BHV-108 / INV-009
    //
    // EXPLANATION:
    // The loop walks every UsfmToken for the book, maintaining a
    // ScrParserState that tracks the current NoteTag, CharTag, ParaTag,
    // VerseRef, and ParaStart flags. Four ordered gates decide whether a
    // token participates:
    //
    //   1. NoteTag != null          -> skip (inside \f / \fe / \x)
    //   2. CharTag.Marker == "fig"  -> skip (figure description / metadata)
    //   3. ParaStart                -> "close" the current paragraph by
    //                                  clearing the accumulator, so tokens
    //                                  for an undesired paragraph that
    //                                  follows will not leak into the
    //                                  previous desired paragraph.
    //   4. !filter.Contains(Marker) -> drop entirely (skip to next token).
    //
    // After the gates, if ParaStart is true (and we got past gate 4), a new
    // ChecklistParagraphTokens is constructed whose VerseRefStart comes from
    // FindVerseRefForParagraph (handles heading forward-scan for INV-009).
    // Every surviving token is appended to the currently-open paragraph's
    // Tokens list.
    //
    // PT10 deviations vs PT9:
    //   - The PT9 `desiredMarkers != null` null-guard is dropped; the PT10
    //     parameter is non-nullable.
    //   - `IsHeading` is computed at record-construction time
    //     (headingMarkers.Contains(Marker)); PT9 re-checked on demand.
    //   - The Tokens list is built mutably during the loop and exposed
    //     through the record's IReadOnlyList<UsfmToken> contract (List<T>
    //     covariantly implements IReadOnlyList<T>) — no post-copy needed.
    /// <summary>
    /// Walks all <see cref="UsfmToken"/>s for a book via
    /// <c>scrText.Parser.GetUsfmTokens(bookNum)</c> and emits one
    /// <see cref="ChecklistParagraphTokens"/> per qualifying paragraph start.
    /// Skip conditions: <c>state.NoteTag != null</c> and
    /// <c>state.CharTag?.Marker == "fig"</c>. Filter: only paragraphs whose
    /// marker is in <paramref name="paragraphMarkersFilter"/> are emitted;
    /// an empty filter accepts NOTHING (caller supplies the fallback full
    /// set when no user filter is active). Heading markers
    /// (<paramref name="headingMarkers"/>) receive the verse reference of
    /// the next non-heading paragraph (INV-009).
    /// </summary>
    public static List<ChecklistParagraphTokens> GetTokensForBook(
        ScrText scrText,
        int bookNum,
        HashSet<string> paragraphMarkersFilter,
        HashSet<string> headingMarkers,
        HashSet<string> nonHeadingParagraphMarkers
    )
    {
        List<UsfmToken> tokens = scrText.Parser.GetUsfmTokens(bookNum);

        var results = new List<ChecklistParagraphTokens>();
        List<UsfmToken>? currentTokens = null;
        var state = new ScrParserState(
            scrText,
            new VerseRef(bookNum, 1, 0, scrText.Settings.Versification)
        );

        for (int i = 0; i < tokens.Count; ++i)
        {
            state.UpdateState(tokens, i);

            // Gate 1: inside a note -> skip.
            if (state.NoteTag != null)
                continue;

            // Gate 2: figure token -> skip.
            if (state.CharTag != null && state.CharTag.Marker == "fig")
                continue;

            // Gate 3: entering a new paragraph -> close the accumulator so
            // any tokens that survive gate 4 below land in a FRESH paragraph
            // (not the previous one). PT9 used `paragraphTokens = null`; we
            // do the same.
            if (state.ParaStart)
                currentTokens = null;

            // Gate 4: paragraph marker filter. PT9: `desiredMarkers != null
            // && !desiredMarkers.Contains(...)` -> continue. PT10's parameter
            // is non-nullable, so the null-guard is dropped.
            if (state.ParaTag != null && !paragraphMarkersFilter.Contains(state.ParaTag.Marker))
                continue;

            if (state.ParaStart)
            {
                // State.ParaTag is non-null here because gate 4 consumed the
                // null check; ParaStart implies a paragraph tag has been
                // parsed. Build the new paragraph entry.
                string marker = state.ParaTag!.Marker;
                currentTokens = new List<UsfmToken>();
                results.Add(
                    new ChecklistParagraphTokens(
                        VerseRefStart: FindVerseRefForParagraph(
                            headingMarkers,
                            nonHeadingParagraphMarkers,
                            state.VerseRef,
                            tokens,
                            i
                        ),
                        Marker: marker,
                        IsHeading: headingMarkers.Contains(marker),
                        Tokens: currentTokens
                    )
                );
            }

            currentTokens?.Add(tokens[i]);
        }

        return results;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLParagraphCellsDataSource.cs:105-135
    //   (CLParagraphCellsDataSource.FindVerseRefForParagraph)
    // Maps to: EXT-008 / INV-009 / FB-35863
    //
    // EXPLANATION:
    // Rules (order preserved from PT9):
    //
    //   (a) If the paragraph marker is a HEADING marker, forward-scan from
    //       position i upward looking for the NEXT non-heading paragraph
    //       marker. Two caveats ported verbatim from PT9:
    //         - skip "b" (blank-line paragraph — not a real content header)
    //         - skip any marker starting with "i" (introductory: \ib, \ip,
    //           \im, ...) — these aren't considered "the next content
    //           paragraph" either.
    //       If the scan hits a "c" chapter marker first, STOP and return the
    //       input vref unchanged. This is FB-35863: a section heading that
    //       appears BEFORE a chapter boundary (user error) must not pull
    //       forward into the next chapter.
    //
    //   (b) After the heading scan (or if the paragraph wasn't a heading),
    //       look one token past the paragraph-start: if it's a \v verse
    //       token, copy its verse number into the returned VerseRef's
    //       Verse component (handles verse bridges naturally — UsfmToken.Data
    //       carries "3-5" as-is, which VerseRef.Verse accepts).
    //
    // The PT9 code shadows the parameter `vrefIn` by making a local copy
    // `vref = new VerseRef(vrefIn)`; preserved to avoid mutating a shared
    // state object.
    /// <summary>
    /// Computes the <see cref="VerseRef"/> assigned to a paragraph start at
    /// token index <paramref name="i"/>. Heading markers (per
    /// <paramref name="headingMarkers"/>) forward-scan to the next non-heading
    /// paragraph to inherit its verse reference (INV-009); the scan is
    /// bounded by chapter (<c>\c</c>) markers (FB-35863). Non-heading
    /// paragraphs fall through to the post-scan step which, if the very next
    /// token is <c>\v</c>, copies that token's <see cref="UsfmToken.Data"/>
    /// into the returned <see cref="VerseRef.Verse"/> component (handles
    /// verse bridges like <c>"3-5"</c> verbatim).
    /// </summary>
    private static VerseRef FindVerseRefForParagraph(
        HashSet<string> headingMarkers,
        HashSet<string> nonHeadingParagraphMarkers,
        VerseRef vrefIn,
        List<UsfmToken> tokens,
        int i
    )
    {
        var vref = new VerseRef(vrefIn);

        // (a) Heading markers: forward-scan for the next non-heading paragraph.
        if (headingMarkers.Contains(tokens[i].Marker))
        {
            for (; i < tokens.Count; ++i)
            {
                if (
                    nonHeadingParagraphMarkers.Contains(tokens[i].Marker)
                    && tokens[i].Marker != "b"
                    && !tokens[i].Marker.StartsWith('i')
                )
                {
                    break;
                }

                if (tokens[i].Marker == "c")
                    // FB-35863: heading before chapter boundary — keep the
                    // heading's current vref; don't leak into chapter N+1.
                    return vref;
            }
        }

        if (i + 1 >= tokens.Count)
            return vref;

        // (b) If the very next token is a verse number, it IS this
        // paragraph's reference.
        if (tokens[i + 1].Marker == "v")
            vref.Verse = tokens[i + 1].Data;

        return vref;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLDataSource.cs:191-216
    //   (CLDataSource.GetCellsForBook)
    // Maps to: EXT-011 / BHV-114
    //
    // EXPLANATION:
    // Two-step reduction from paragraph-token bundles to cells:
    //
    //   1. Range filter — paragraphs whose VerseRefStart falls OUTSIDE the
    //      [startRef, endRef] inclusive range are dropped via
    //      ChecklistParagraphTokens.ReferenceInRange (BHV-119, CAP-003-owned).
    //      PT9 also had an up-front `GetDesiredMarkers` filter; CAP-003's
    //      GetTokensForBook already pre-filters on the paragraph marker
    //      (paragraphMarkersFilter argument), so there's no second marker
    //      gate here.
    //
    //   2. Per-paragraph cell build via BuildCLCell, with same-reference
    //      merge: when two adjacent paragraphs share a VerseRef (CompareTo
    //      == 0), the new cell's paragraphs are appended to the previous
    //      cell instead of producing a second cell (PT9
    //      AddContentToCurrentCell + MergeWithCell).
    //
    // PT10 deviations vs PT9:
    //   - Stateless: no ChecklistType dispatch, no virtual overrides,
    //     no instance fields.
    //   - showVerseText is threaded through the signature but NOT consumed
    //     here — it's a PostProcessParagraph argument and PostProcessParagraph
    //     placement is a CAP-006 orchestration concern (see plan Decisions
    //     Made: "PostProcessParagraph placement"). The parameter is kept on
    //     the signature because the contract in strategic-plan-backend.md
    //     §CAP-004 lists it, and CAP-006 will consume it when invoking
    //     MarkersDataSource.PostProcessParagraph per paragraph.
    //   - EditLinkItem is NOT emitted at this layer (VAL-007). CAP-012 owns
    //     inline emission; CAP-004 only ensures the cell STRUCTURE is ready
    //     for an EditLinkItem to be appended (Paragraphs[*].Items is a
    //     concrete mutable List<ChecklistContentItem>).
    //   - Merge bookkeeping: PT9's CLCell carried its VerseRef internally
    //     so AddContentToCurrentCell could `cells[^1].VerseRef.CompareTo(...)`.
    //     PT10's ChecklistCell record only exposes the `Reference` string
    //     (no live VerseRef), so we maintain a parallel list of VerseRefs
    //     during construction to drive the merge comparison.
    /// <summary>
    /// Iterates <paramref name="paragraphs"/> (emitted by
    /// <see cref="GetTokensForBook"/>), filters by
    /// <c>ChecklistParagraphTokens.ReferenceInRange(startRef, endRef)</c>, and
    /// constructs a <see cref="ChecklistCell"/> list whose content items are
    /// produced by walking each paragraph's USFM tokens:
    /// <list type="bullet">
    /// <item><see cref="UsfmTokenType.Text"/> → <see cref="TextItem"/> (RTL
    /// prefix applied when <c>scrText.RightToLeft</c>);</item>
    /// <item><see cref="UsfmTokenType.Verse"/> → <see cref="VerseItem"/>;</item>
    /// <item>Paragraphs sharing a <c>VerseRef</c> merge into one cell
    /// (PT9 <c>AddContentToCurrentCell</c>).</item>
    /// </list>
    /// CAP-004 does NOT emit <see cref="EditLinkItem"/>; CAP-012 owns inline
    /// emission under VAL-007. See data-contracts.md §4.1 (BHV-114 within
    /// BuildChecklistData), §3.3–§3.5.
    /// </summary>
    public static List<ChecklistCell> GetCellsForBook(
        ScrText scrText,
        int bookNum,
        VerseRef startRef,
        VerseRef endRef,
        List<ChecklistParagraphTokens> paragraphs,
        bool showVerseText
    )
    {
        _ = showVerseText; // kept on signature for CAP-006 orchestration (see EXPLANATION above).

        var cells = new List<ChecklistCell>();
        var cellVrefs = new List<VerseRef>();

        foreach (ChecklistParagraphTokens paragraph in paragraphs)
        {
            if (!paragraph.ReferenceInRange(startRef, endRef))
                continue;

            (ChecklistCell cell, VerseRef cellVref) = BuildCLCell(scrText, bookNum, paragraph);

            // PT9 AddContentToCurrentCell (CLDataSource.cs:226-231): when the
            // new cell's VerseRef equals the previous cell's VerseRef
            // (CompareTo == 0), merge paragraphs into the previous cell
            // instead of appending a new one. PT9 also merged `Error` /
            // `HasError` here; PT10 cells don't carry a running Error flag
            // at this stage (error population is a later-stage concern), so
            // only the Paragraphs merge is needed.
            if (cells.Count > 0 && cellVrefs[^1].CompareTo(cellVref) == 0)
            {
                var previous = cells[^1];
                var mergedParagraphs = new List<ChecklistParagraph>(previous.Paragraphs);
                mergedParagraphs.AddRange(cell.Paragraphs);
                cells[^1] = previous with { Paragraphs = mergedParagraphs };
            }
            else
            {
                cells.Add(cell);
                cellVrefs.Add(cellVref);
            }
        }

        return cells;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLDataSource.cs:316-320 (CreateCell) +
    //   :365-433 (BuildCLCell)
    // Maps to: EXT-011 / BHV-114
    //
    // EXPLANATION:
    // Builds a single ChecklistCell from one paragraph-token bundle. The
    // walk mirrors PT9 CLDataSource.BuildCLCell verbatim, minus the
    // ChecklistType-specific branches (Verses-checklist "section-only
    // marker", RelativelyLongVerses / RelativelyShortVerses / LongSentences
    // "skip marker", CrossReferences "fig_ref" attribute branch) — none of
    // those apply to the Markers checklist and none are covered by CAP-004
    // RED tests.
    //
    // Five steps (line numbers reference PT9 CLDataSource.cs):
    //
    //   1. :367-368 — copy paragraph.VerseRefStart into a local `vref` and
    //      force it into scrText's versification (FB-11372 / INV-007 prep).
    //      Using `new VerseRef(...)` avoids mutating the caller's reference.
    //
    //   2. :371 — language lookup via
    //      `scrText.GetJoinedText(bookNum).Settings.LanguageID.Id`
    //      (FB-11372 — engine name, not the scrText.Language raw property).
    //      Wrap in try/catch with a fallback to
    //      `scrText.Settings.LanguageID?.Id ?? string.Empty`: DummyScrText's
    //      GetJoinedText may not return a fully-populated wrapper in tests,
    //      and cells don't assert on an exact Language value at CAP-004.
    //
    //   3. :373-377 — create the cell and its (single) owning ChecklistParagraph.
    //      PT10 records are immutable, so we build Items up mutably and then
    //      construct the paragraph + cell records at the end.
    //
    //   4. :379-428 — token walk with a fresh ScrParserState. Three token
    //      types are emitted:
    //        - UsfmTokenType.Paragraph → sets paragraph marker (NOT a content item).
    //          PT9 has multiple branches here keyed on ChecklistType; Markers
    //          falls into the "else-if" branch that unconditionally writes
    //          the marker (ChecklistType is not RelativelyLongVerses,
    //          RelativelyShortVerses, LongSentences, or Verses).
    //        - UsfmTokenType.Text → TextItem. PT9 line 408 applies the RTL
    //          prefix: `scrText.RightToLeft ? StringUtils.rtlMarker + Text : Text`.
    //          PT9 line 409 attaches the active CharTag.Marker as
    //          CharacterStyle (empty string when no char tag is active —
    //          PT10 uses null for "no character style" but the empty-string
    //          precedent is preserved to match PT9 behaviour; tests accept
    //          either because they pin only the non-empty "em" case).
    //        - UsfmTokenType.Verse → VerseItem with token.Data (handles verse
    //          bridges verbatim — "4-6" passes through unchanged).
    //
    //   5. PT9 line 430 calls `PostProcessParagraph(cell, state.VerseRef,
    //      paragraph)`; CAP-004 does NOT — that's a CAP-006 orchestration
    //      concern (see plan Decisions Made). The `showVerseText` argument
    //      threads through to CAP-006's call to
    //      MarkersDataSource.PostProcessParagraph.
    //
    // Return tuple: the cell AND its live VerseRef (so GetCellsForBook can
    // drive the same-reference merge via VerseRef.CompareTo).
    /// <summary>
    /// Constructs a <see cref="ChecklistCell"/> (with a single
    /// <see cref="ChecklistParagraph"/>) from a
    /// <see cref="ChecklistParagraphTokens"/> bundle. Returns the cell
    /// alongside the live <see cref="VerseRef"/> so
    /// <see cref="GetCellsForBook"/> can drive the same-reference merge.
    /// </summary>
    private static (ChecklistCell Cell, VerseRef CellVref) BuildCLCell(
        ScrText scrText,
        int bookNum,
        ChecklistParagraphTokens paragraphTokens
    )
    {
        // Step 1: PT9 :367-368 — copy + force versification.
        var vref = new VerseRef(paragraphTokens.VerseRefStart);
        vref.Versification = scrText.Settings.Versification;

        // Step 2: PT9 :371 — FB-11372 language lookup with DummyScrText-safe fallback.
        string language;
        try
        {
            language = scrText.GetJoinedText(bookNum).Settings.LanguageID.Id;
        }
        catch (Exception)
        {
            language = scrText.Settings.LanguageID?.Id ?? string.Empty;
        }

        // Step 3: prep cell fields (PT9 :367, :239-264 from CLCell.VerseRef setter).
        string reference = vref.IsDefault ? string.Empty : vref.ToString();
        string displayedReference = vref.IsDefault ? string.Empty : vref.ToLocalizedString();

        string paragraphMarker = string.Empty;
        var items = new List<ChecklistContentItem>();

        // Step 4: PT9 :379-428 — walk tokens.
        var state = new ScrParserState(scrText, vref);
        bool textDisplayed = false;
        _ = textDisplayed; // PT9 passes to CLVerse ctor; CAP-004's VerseItem doesn't carry it.

        for (int i = 0; i < paragraphTokens.Tokens.Count; ++i)
        {
            UsfmToken token = paragraphTokens.Tokens[i];
            state.UpdateState((List<UsfmToken>)paragraphTokens.Tokens, i);

            if (token.Type == UsfmTokenType.Paragraph)
            {
                // PT9 :398-403 — Markers-pipeline branch: record the marker
                // whenever we see a paragraph token. The first occurrence
                // wins because CAP-003's GetTokensForBook bundles tokens
                // per paragraph-start, so there's exactly one paragraph
                // token per bundle (at index 0).
                paragraphMarker = token.Marker;
            }
            else if (token.Type == UsfmTokenType.Text)
            {
                // PT9 :406-411 — RTL prefix + CharTag.Marker as character style.
                string text = scrText.RightToLeft ? StringUtils.rtlMarker + token.Text : token.Text;
                string? characterStyle = state.CharTag != null ? state.CharTag.Marker : null;
                items.Add(new TextItem(text, characterStyle));
                textDisplayed = true;
            }
            else if (token.Type == UsfmTokenType.Verse)
            {
                // PT9 :413-417 — verse-number item (bridges via token.Data preserved).
                items.Add(new VerseItem(token.Data));
            }
            // PT9 :419-427 (attribute / "fig_ref") — CrossReferences-checklist
            // branch; NOT ported at CAP-004 (out of scope; no RED test).
        }

        // Step 5: PT9 :430 PostProcessParagraph — NOT called at CAP-004.
        // CAP-006 orchestration invokes MarkersDataSource.PostProcessParagraph
        // per paragraph using the caller's showVerseText argument.

        var paragraph = new ChecklistParagraph(paragraphMarker, items);
        var cell = new ChecklistCell(
            Paragraphs: new List<ChecklistParagraph> { paragraph },
            Reference: reference,
            DisplayedReference: displayedReference,
            Language: language,
            Error: null
        );
        return (cell, vref);
    }
}
