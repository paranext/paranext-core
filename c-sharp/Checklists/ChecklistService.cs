using System.Collections.Generic;
using Paratext.Data;
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
}
