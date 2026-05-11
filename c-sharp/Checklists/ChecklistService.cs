using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Paranext.DataProvider.Checklists.Markers;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Scripture;
using Paratext.Data;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.Checklists;

/// <summary>
/// Stateless checklist orchestration service. Hosts the top-level
/// <see cref="BuildChecklistData"/> pipeline (CAP-006) together with the
/// USFM token walker <see cref="GetTokensForBook"/> (CAP-003, EXT-008) and
/// cell constructor <see cref="GetCellsForBook"/> (CAP-004, EXT-011) it
/// drives. Companion type <c>ChecklistParagraphTokens</c> (EXT-012) lives
/// alongside in <c>ChecklistParagraphTokens.cs</c>. Per-method provenance
/// headers (<c>// === PORTED FROM PT9 ===</c>) carry the authoritative
/// source references; contract: data-contracts.md §4.1.
/// </summary>
internal static class ChecklistService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLDataSource.cs:16 (reportCount=300
    //   constant for a different capping concern) plus the PT10 strategic
    //   addition from EXT-015 (GetChecklistData max-rows cap).
    // Maps to: INV-012 / EXT-015
    /// <summary>
    /// Maximum row count emitted by <see cref="BuildChecklistData"/>
    /// (INV-012). Rows produced beyond this cap are truncated and
    /// <see cref="ChecklistResult.Truncated"/> is set to <c>true</c>.
    /// </summary>
    private const int MaxRows = 5000;

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLDataSource.cs:97-185 (CLDataSource.BuildRows)
    //   plus :334-351 (GetCells start-ref adjustment / book loop) and
    //   :356-363 (SelectedBooks).
    // Maps to: EXT-001 (factory — inlined), EXT-002 (BuildRows), EXT-015
    //   (maxRows cap) / BHV-100 / BHV-101 / BHV-118 / BHV-121
    // Invariants: INV-002 (single column IsMatch=true), INV-010 (hideMatches
    //   + ExcludedCount), INV-012 (max 5000 rows), INV-C15 (ColumnProjectIds
    //   parallel to ColumnHeaders), VAL-003 (GEN 1:1 -> 1:0 adjustment).
    //
    // EXPLANATION (pipeline composition):
    //
    //   0. Resolve main ScrText + comparative ScrTexts via projects.
    //   1. Compute [startRef, endRef] (BHV-118): defaults are
    //      mainScrText.FirstVerseRef() / LastVerseRef() when the request's
    //      VerseRange is null or its bounds are default VerseRefs. VAL-003
    //      adjustment: if start is (GEN 1:1), rewrite to (GEN 1:0) so
    //      intro material (\ip at verse 0) is included (PT9 CLDataSource
    //      GetCells lines 344-345).
    //   2. Parse marker settings via
    //      MarkersDataSource.InitializeMarkerMappings(equivalentMarkers,
    //      markerFilter) — yields (mappings, markerFilter).
    //   3. Compute the iteration book list:
    //      mainScrText.Settings.BooksPresentSet.SelectedBookNumbers
    //      intersected with [startRef.BookNum..endRef.BookNum] (PT9
    //      SelectedBooks lines 356-363).
    //   4. For each column (active first, then comparatives) and each
    //      book, extract paragraphs (CAP-003 GetTokensForBook), build
    //      cells (CAP-004 GetCellsForBook), and transform each paragraph
    //      via MarkersDataSource.PostProcessParagraph (BHV-103: prepend
    //      backslash-marker TextItem; when showVerseText=false, drop the
    //      rest of the items). CancellationToken is checked at method
    //      entry AND per book iteration (TS-062; replaces PT9's
    //      Progress.Mgr.EndProgressIfCancelled).
    //   5. Row alignment via CAP-005 BuildRowsMergingCells — always
    //      merging mode (INV-011 Markers).
    //   6. Match detection: single-column rows get IsMatch=true forced
    //      (INV-002); multi-column rows use MarkersDataSource.HasSameValue
    //      with the parsed mappings (BHV-104 + INV-005 bidirectional).
    //   7. hideMatches filter (INV-010): when hideMatches=true AND
    //      columns > 1, drop matching rows (backwards iteration for
    //      index stability — PT9 CLDataSource.cs:134) and track
    //      ExcludedCount.
    //   8. Truncate to 5000 rows (INV-012 / EXT-015). PT10 addition —
    //      PT9 had no such cap.
    //   9. PostProcessRows (BHV-106 / INV-008): produces the
    //      EmptyResultMessage when the final row list is empty.
    //  10. Assemble ChecklistResult with parallel ColumnHeaders /
    //      ColumnProjectIds (INV-C15).
    //
    // Inline EditLinkItem emission (CAP-012 / VAL-007 project-level subset)
    // lives in ApplyEditLinkGating and is wired into ExtractColumnCells
    // per cell. Chapter-level permission (VAL-007 cond 5) is DEFERRED per
    // DEF-BE-001 — see deferred-functionality.md.
    /// <summary>
    /// End-to-end orchestrator for the Markers checklist pipeline. Resolves
    /// the active project and any comparative texts, extracts per-book marker
    /// paragraphs, aligns them into rows, detects matches, optionally hides
    /// matching rows, caps at <see cref="MaxRows"/> rows, and assembles a
    /// <see cref="ChecklistResult"/>. See data-contracts.md §4.1 and
    /// strategic-plan-backend.md §CAP-006 for the full contract.
    /// </summary>
    /// <param name="request">Checklist request (project, comparatives, verse range, marker settings).</param>
    /// <param name="ct">Cancellation token; checked at entry and per book iteration (TS-062).</param>
    public static ChecklistResult BuildChecklistData(ChecklistRequest request, CancellationToken ct)
    {
        // Step 0a: honour pre-cancellation immediately (TS-062).
        ct.ThrowIfCancellationRequested();

        // Step 0b: resolve active ScrText + comparative ScrTexts. A missing
        // projectId surfaces as ProjectNotFoundException from
        // LocalParatextProjects.GetParatextProject; the wire-level
        // PROJECT_NOT_FOUND structured error is produced by the wrapping
        // ChecklistNetworkObject.BuildChecklistData delegate, which catches
        // ProjectNotFoundException and returns a ChecklistResultError per
        // data-contracts.md §3.1 (ChecklistResultResponse union) and §3.6
        // (ChecklistErrorCodes.ProjectNotFound). See TS-070.
        ScrText mainScrText = LocalParatextProjects.GetParatextProject(request.ProjectId);
        List<ScrText> comparativeScrTexts = request
            .ComparativeTextIds.Select(LocalParatextProjects.GetParatextProject)
            .ToList();
        List<ScrText> allScrTexts = [mainScrText, .. comparativeScrTexts];

        // Step 1: compute effective [startRef, endRef] (BHV-118) + VAL-003 adjustment.
        (VerseRef startRef, VerseRef endRef) = ResolveVerseRange(mainScrText, request.VerseRange);
        startRef = ApplyStartRefIntroAdjustment(startRef);

        // Step 2: parse marker settings (BHV-105 / INV-005 / VAL-001/005/006).
        (Dictionary<string, List<string>> markerMappings, HashSet<string> markerFilter) =
            MarkersDataSource.InitializeMarkerMappings(
                request.MarkerSettings.EquivalentMarkers,
                request.MarkerSettings.MarkerFilter
            );

        // Step 3: compute the iteration book list.
        IReadOnlyList<int> bookNumbers = ResolveBookNumbers(mainScrText, startRef, endRef);

        // Step 4: per-column, per-book cell extraction with
        // MarkersDataSource.PostProcessParagraph applied per paragraph.
        List<List<ChecklistCell>> columnsList = allScrTexts
            .Select(scrText =>
                ExtractColumnCells(
                    scrText,
                    bookNumbers,
                    markerFilter,
                    startRef,
                    endRef,
                    request.ShowVerseText,
                    ct
                )
            )
            .ToList();

        // Step 5: row alignment via CAP-005 (always merging mode — INV-011).
        List<ChecklistRow> rows = ChecklistRowBuilder.BuildRowsMergingCells(columnsList);

        // Step 6-7: match detection + hideMatches filter (INV-002, INV-010).
        int excludedCount = ApplyMatchDetectionAndFilter(
            rows,
            markerMappings,
            columnCount: allScrTexts.Count,
            hideMatches: request.HideMatches
        );

        // Step 8: max-rows cap (INV-012 / EXT-015). PT10 addition.
        bool truncated = rows.Count > MaxRows;
        if (truncated)
            rows = rows.Take(MaxRows).ToList();

        // Step 9: empty-result message (BHV-106 / INV-008).
        IReadOnlyList<string> searchedBookNames = bookNumbers.Select(Canon.BookNumberToId).ToList();
        EmptyResultMessage? emptyResultMessage = MarkersDataSource.PostProcessRows(
            rows,
            markerFilter,
            searchedBookNames
        );

        // Step 10: parallel ColumnHeaders / ColumnProjectIds (INV-C15).
        List<string> columnHeaders = allScrTexts.Select(s => s.Name).ToList();

        var columnProjectIds = new List<string>(1 + request.ComparativeTextIds.Count)
        {
            request.ProjectId,
        };
        columnProjectIds.AddRange(request.ComparativeTextIds);

        return new ChecklistResult(
            Rows: rows,
            ColumnHeaders: columnHeaders,
            ColumnProjectIds: columnProjectIds,
            ExcludedCount: excludedCount,
            HelpText: null,
            Truncated: truncated,
            EmptyResultMessage: emptyResultMessage
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/ChecklistsTool.cs:132-148
    //   (Initialize — comparative-text resolution slice).
    // Maps to: CAP-009 / BHV-605 / BHV-310 (backend slice) / INV-014 /
    //   TS-047 / TS-048 (PTX-23529)
    // Contract: data-contracts.md §4.5 (ResolveComparativeTexts) +
    //   §3.10 (ResolvedComparativeText) + §3.11 (ResolvedComparativeTexts)
    //
    // EXPLANATION:
    // PT9's Initialize slice (lines 139-147) resolved comparative texts via
    // GUID-first lookup with a name fallback for legacy mementos that pre-dated
    // GUID assignment.
    //
    // PT10 deviations vs PT9:
    //   - PT10 is greenfield: every project carries a canonical GUID, so the
    //     name-fallback PT9 path is unnecessary. ComparativeTextRef now carries
    //     only `Id` (markers-checklist PR #2254 review). Resolution is
    //     GUID-only via ScrTextCollection.FindById.
    //   - PT9 silently dropped unresolvable entries. PT10's §3.11 validation
    //     rule instead keeps them in the result list with `Available=false`
    //     so the UI can render a missing-project marker.
    //   - `HexId.FromStrSafe` replaces direct `HexId.FromStr` so malformed
    //     GUID strings flow through as "unresolved" rather than throwing.
    //   - Active-project resolution uses the same
    //     `LocalParatextProjects.GetParatextProject` helper as
    //     `BuildChecklistData` (above) — throws `ProjectNotFoundException`
    //     when the active projectId is not registered, satisfying the
    //     §4.5 Error Conditions "PROJECT_NOT_FOUND" contract without
    //     bespoke error construction.
    /// <summary>
    /// Resolves comparative text references to actual project information.
    /// Resolution is GUID-only (INV-014). Returns resolved texts with their
    /// display names and availability status. See data-contracts.md §4.5.
    /// </summary>
    /// <param name="activeProjectId">
    /// Active project ID; used for self-reference exclusion (INV-014).
    /// </param>
    /// <param name="requestedTexts">
    /// Per-entry GUIDs to resolve; order is preserved in the output
    /// (minus any self-reference entries).
    /// </param>
    /// <param name="ct">
    /// Cancellation token; the resolution is an in-memory lookup with no
    /// I/O, but we honor pre-cancellation for plumbing symmetry with
    /// <see cref="BuildChecklistData"/>.
    /// </param>
    /// <returns>
    /// A <see cref="ResolvedComparativeTexts"/> whose <c>Texts</c> list
    /// mirrors the order of <paramref name="requestedTexts"/> with any
    /// self-reference entries (matching <paramref name="activeProjectId"/>)
    /// omitted. Entries whose GUID does not resolve are retained
    /// with <c>Available=false</c> (data-contracts.md §3.10/§3.11).
    /// </returns>
    /// <exception cref="Paratext.Data.ProjectNotFoundException">
    /// Thrown when <paramref name="activeProjectId"/> is not registered in
    /// <see cref="ScrTextCollection"/> (§4.5 PROJECT_NOT_FOUND).
    /// </exception>
    /// <exception cref="System.OperationCanceledException">
    /// Thrown when <paramref name="ct"/> is already cancelled at method entry.
    /// </exception>
    public static ResolvedComparativeTexts ResolveComparativeTexts(
        string activeProjectId,
        IReadOnlyList<ComparativeTextRef> requestedTexts,
        CancellationToken ct
    )
    {
        ct.ThrowIfCancellationRequested();

        // Step 1: resolve active ScrText. On miss, GetParatextProject throws
        // ProjectNotFoundException — surfacing the §4.5 PROJECT_NOT_FOUND
        // error as a loud failure (not a silent empty result).
        ScrText active = LocalParatextProjects.GetParatextProject(activeProjectId);

        // Step 2: per-entry GUID lookup + self-exclusion cascade.
        // ResolveSingleComparativeRef returns null to signal "self-reference —
        // skip this entry" (INV-014).
        var resolved = new List<ResolvedComparativeText>(requestedTexts.Count);
        foreach (ComparativeTextRef requested in requestedTexts)
        {
            ResolvedComparativeText? entry = ResolveSingleComparativeRef(requested, active);
            if (entry != null)
                resolved.Add(entry);
        }

        return new ResolvedComparativeTexts(Texts: resolved);
    }

    // Helper for ResolveComparativeTexts — see that method's provenance
    // header for the PT9 source and PT10 deviations. Encapsulates the
    // per-entry cascade:
    //   (a) GUID lookup via FindById,
    //   (b) self-exclusion (INV-014) — returns null to signal "skip",
    //   (c) emit the ResolvedComparativeText record.
    // Returning ResolvedComparativeText? keeps the caller's loop a simple
    // "append non-null" shape; a throwing sentinel would be wrong for a
    // normal flow-control path.
    private static ResolvedComparativeText? ResolveSingleComparativeRef(
        ComparativeTextRef requested,
        ScrText active
    )
    {
        // Step 2(a): GUID lookup via ScrTextCollection.FindById.
        // HexId.FromStrSafe returns null on malformed input so the unresolved
        // path (Available=false) handles malformed GUIDs without throwing.
        // When the GUID is well-formed but not registered, FindById itself
        // returns null — same outcome.
        ScrText? found = HexId.FromStrSafe(requested.Id) is { } guid
            ? ScrTextCollection.FindById(guid)
            : null;

        // Step 2(b): self-exclusion (INV-014). PT9 pattern: `p != scrText`
        // reference equality. Instances registered via
        // DummyLocalParatextProjects.FakeAddProject (and the real
        // ScrTextCollection) are shared references.
        if (found != null && ReferenceEquals(found, active))
            return null;

        // Step 2(c): emit resolved record. Id is always preserved verbatim
        // from the input. When resolved, Name/FullName mirror the ScrText;
        // when unresolved, Name and FullName are empty strings.
        return new ResolvedComparativeText(
            Id: requested.Id,
            Name: found?.Name ?? string.Empty,
            FullName: found?.FullName ?? string.Empty,
            Available: found != null
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/ChecklistsExtensions.cs:8-21
    //   (FirstVerseRef / LastVerseRef on ScrText)
    // Maps to: BHV-118 / VAL-003
    //
    // EXPLANATION:
    // Mirrors PT9's pre-flight that converts the optional ScriptureRange
    // carried on the request into a concrete [startRef, endRef] pair,
    // falling back to mainScrText.FirstVerseRef() / LastVerseRef() when
    // the request's bounds are null or default. `FirstVerseRef` returns
    // "GEN 1:0" (intro verse) and `LastVerseRef` returns the final verse
    // of the final book of the versification.
    private static (VerseRef start, VerseRef end) ResolveVerseRange(
        ScrText mainScrText,
        ScriptureRange? range
    )
    {
        ScrVers versification = mainScrText.Settings.Versification;

        // FirstVerseRef: first book, chapter 1, verse 0 (intro position).
        var firstDefault = new VerseRef(Canon.FirstBook, 1, 0, versification);

        // LastVerseRef: last book's last chapter's last verse. LastChapter /
        // LastVerse are versification-aware computed properties that depend
        // on the book/chapter already being set, so we seed chapter=1 and
        // step upward.
        var lastDefault = new VerseRef(Canon.LastBook, 1, 1, versification);
        lastDefault.ChapterNum = lastDefault.LastChapter;
        lastDefault.VerseNum = lastDefault.LastVerse;

        if (range == null)
            return (firstDefault, lastDefault);

        VerseRef start = range.Start.IsDefault ? firstDefault : range.Start;
        VerseRef end =
            range.End == null || range.End.Value.IsDefault ? lastDefault : range.End.Value;
        return (start, end);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLDataSource.cs:344-345
    //   (GetCells): `if (startRefNonNull.ChapterNum == 1 &&
    //   startRefNonNull.VerseNum == 1) startRefNonNull.VerseNum = 0;`
    // Maps to: VAL-003
    //
    // EXPLANATION:
    // When the user-supplied start is (GEN 1:1), silently shift the verse
    // to 0 so any intro paragraphs (\ip at verse 0) fall inside
    // [startRef, endRef] inclusive. PT9 made this adjustment on the
    // working copy of the ref at the cell-extraction gate; we apply it at
    // the orchestrator level before cell extraction so every column sees
    // the same expanded range. The ChapterNum check means the adjustment
    // is ONLY applied at the GEN 1:1 boundary — any other (1:1) such as
    // MAT 1:1 does NOT shift (PT9 semantic: the UI only ever passes
    // GEN 1:1 as the "book start" sentinel).
    //
    // NOTE: PT9's condition is strictly `ChapterNum == 1 && VerseNum == 1`
    // (no BookNum check) — meaning ANY book's 1:1 shifts to 1:0. This is
    // safe because non-Genesis 1:1 starts are legitimate user choices
    // where intro material is irrelevant; the test Group C pins the GEN
    // case explicitly with `\ip` content. We preserve PT9's semantic.
    private static VerseRef ApplyStartRefIntroAdjustment(VerseRef start)
    {
        if (start.ChapterNum == 1 && start.VerseNum == 1)
        {
            var adjusted = new VerseRef(start);
            adjusted.VerseNum = 0;
            return adjusted;
        }
        return start;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLDataSource.cs:356-363
    //   (CLDataSource.SelectedBooks)
    // Maps to: BHV-118
    //
    // EXPLANATION:
    // Enumerates `baseScrText.Settings.BooksPresentSet.SelectedBookNumbers`
    // intersected with `[startRef.BookNum..endRef.BookNum]`. PT9's range filter
    // is inclusive on both sides.
    //
    // Note: data-contracts.md §2.1 intentionally omits a request-level
    // BookNumbers override (removed as speculative/unused — see revise round 1
    // T-R-1 action 4). The iteration book list is derived entirely from the
    // active project's BooksPresentSet filtered by the verse range.
    private static IReadOnlyList<int> ResolveBookNumbers(
        ScrText mainScrText,
        VerseRef startRef,
        VerseRef endRef
    )
    {
        return mainScrText
            .Settings.BooksPresentSet.SelectedBookNumbers.Where(bookNum =>
                bookNum >= startRef.BookNum && bookNum <= endRef.BookNum
            )
            .ToList();
    }

    // === NEW IN PT10 ===
    // Reason: PT9 mutated CLParagraph.Items in place via
    // PostProcessParagraph (CLParagraphCellsDataSource.cs:221-226). PT10
    // ChecklistCell / ChecklistParagraph are immutable records, so we
    // project the cell by rebuilding its Paragraphs with the MarkersDataSource
    // post-processor applied to each.
    // Maps to: Infrastructure for BHV-103
    /// <summary>
    /// Rebuilds <paramref name="cell"/> with each paragraph passed through
    /// <see cref="MarkersDataSource.PostProcessParagraph"/> (which prepends
    /// the backslash-marker TextItem at position 0 per INV-004). When
    /// <paramref name="showVerseText"/> is false, the remainder of each
    /// paragraph's items is dropped; when true, they are preserved after
    /// the marker item.
    /// </summary>
    private static ChecklistCell ApplyPostProcessParagraph(ChecklistCell cell, bool showVerseText)
    {
        var newParagraphs = new List<ChecklistParagraph>(cell.Paragraphs.Count);
        foreach (ChecklistParagraph paragraph in cell.Paragraphs)
            newParagraphs.Add(MarkersDataSource.PostProcessParagraph(paragraph, showVerseText));
        return cell with { Paragraphs = newParagraphs };
    }

    // === NEW IN PT10 ===
    // Maps to: BHV-100 / BHV-101 / BHV-118 — CAP-006 orchestration Step 4.
    //
    // EXPLANATION:
    // Per-column slice of the BuildChecklistData pipeline: derive the
    // stylesheet-scoped marker sets once per column, then iterate the
    // selected books, extract paragraphs (CAP-003), construct cells
    // (CAP-004), and apply MarkersDataSource.PostProcessParagraph per
    // paragraph (BHV-103). Cancellation is checked per book so long-running
    // multi-book iterations (INV-012 scenario) remain interruptible.
    /// <summary>
    /// Extracts the list of <see cref="ChecklistCell"/>s for a single
    /// project/column across every book in <paramref name="bookNumbers"/>.
    /// Paragraphs are post-processed through
    /// <see cref="MarkersDataSource.PostProcessParagraph"/> to enforce the
    /// backslash-marker TextItem prefix (INV-004) and the
    /// <paramref name="showVerseText"/> gate on trailing items (BHV-103).
    /// </summary>
    private static List<ChecklistCell> ExtractColumnCells(
        ScrText scrText,
        IReadOnlyList<int> bookNumbers,
        HashSet<string> markerFilter,
        VerseRef startRef,
        VerseRef endRef,
        bool showVerseText,
        CancellationToken ct
    )
    {
        ScrStylesheet stylesheet = scrText.DefaultStylesheet;
        HashSet<string> paragraphMarkers = MarkersDataSource.ParagraphMarkers(
            stylesheet,
            markerFilter
        );
        HashSet<string> headingMarkers = MarkersDataSource.HeadingMarkers(stylesheet);
        HashSet<string> nonHeadingMarkers = MarkersDataSource.NonHeadingParagraphMarkers(
            stylesheet
        );

        var columnCells = new List<ChecklistCell>();
        foreach (int bookNum in bookNumbers)
        {
            ct.ThrowIfCancellationRequested();

            List<ChecklistParagraphTokens> paragraphs = GetTokensForBook(
                scrText,
                bookNum,
                paragraphMarkers,
                headingMarkers,
                nonHeadingMarkers
            );

            List<ChecklistCell> cells = GetCellsForBook(
                scrText,
                bookNum,
                startRef,
                endRef,
                paragraphs
            );

            foreach (ChecklistCell cell in cells)
            {
                ChecklistCell postProcessed = ApplyPostProcessParagraph(cell, showVerseText);
                columnCells.Add(ApplyEditLinkGating(postProcessed, scrText));
            }
        }
        return columnCells;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/ChecklistsTool.cs SetCellEditability
    //   (project-level portion only; chapter-level DEFERRED per DEF-BE-001).
    // Maps to: EXT-016 (project-level portion) / BHV-114 (emission sub-behavior)
    //   / VAL-007 (conds 1-4; cond 5 DEFERRED).
    //
    // EXPLANATION:
    // PT9's SetCellEditability gated CLEditLink emission on five AND-conditions
    // (business-rules.md §VAL-007):
    //   (1) row has cells,
    //   (2) first cell has non-default VerseRef,
    //   (3) row.IncludeEditLink is true,
    //   (4) scrText.Settings.Editable is true,
    //   (5) scrText.Permissions.CanEdit(bookNum, chapterNum) returns true.
    //
    // PT10 mapping:
    //   - (1)/(3) are structurally satisfied here: we iterate per cell post
    //     row-building, so every cell we see already belongs to a row that
    //     exists. PT10 folds the "IncludeEditLink" flag into the per-cell
    //     iteration (every qualifying cell emits exactly one link).
    //   - (2) maps to `cell.Reference is not null` — BuildCLCell leaves
    //     Reference null when `vref.IsDefault`, so a null Reference IS the
    //     PT10 signal that the cell has a default VerseRef.
    //   - (4) maps directly to `scrText.Settings.Editable`.
    //   - (5) is DEFERRED: paranext-core does not yet expose a chapter-level
    //     CanEdit(bookNum, chapterNum) API. See DEF-BE-001. Revisit when the
    //     trigger API becomes available.
    //
    // Paragraph placement: appends the EditLinkItem to the LAST paragraph's
    // Items list. PT9's CLEditLink appeared at the end of a cell's rendered
    // content; keeping the link inside an existing paragraph preserves the
    // cell-shape (paragraph count) invariants that CAP-006 tests exercise.
    /// <summary>
    /// Emits an <see cref="EditLinkItem"/> for <paramref name="cell"/> when
    /// VAL-007 project-level conditions hold: the cell has a non-default
    /// reference (non-null <see cref="ChecklistCell.Reference"/>) AND
    /// <c>scrText.Settings.Editable == true</c>. The link carries the
    /// cell's BookNum/ChapterNum/VerseNum read from the start of
    /// <see cref="ChecklistCell.Reference"/>. Chapter-level permission
    /// (<c>CanEdit(bookNum, chapterNum)</c>) is intentionally NOT checked —
    /// deferred per DEF-BE-001.
    /// </summary>
    private static ChecklistCell ApplyEditLinkGating(ChecklistCell cell, ScrText scrText)
    {
        // Gate (4): project-level editability.
        if (!scrText.Settings.Editable)
            return cell;

        // Gate (2): non-default VerseRef. BuildCLCell leaves Reference null
        // for default refs.
        if (cell.Reference is null)
            return cell;

        // Defensive: if a cell somehow has zero paragraphs, there's no place
        // to append the link. (Not expected in practice.)
        if (cell.Paragraphs.Count == 0)
            return cell;

        // TODO: create tracking issue — chapter-level permission
        // (see deferred-functionality.md; tracked at
        // https://github.com/paranext/paranext-core/issues/TBD).
        // PT9 also gated on scrText.Permissions.CanEdit(bookNum, chapterNum).
        // paranext-core lacks that API today; revisit when it lands.

        // The structured Reference already carries the start VerseRef — no string
        // parsing (and so no parse-failure path) needed any more.
        VerseRef vref = cell.Reference.Start;
        var editLink = new EditLinkItem(vref.BookNum, vref.ChapterNum, vref.VerseNum);

        ChecklistParagraph lastParagraph = cell.Paragraphs[^1];
        var updatedItems = new List<ChecklistContentItem>(lastParagraph.Items.Count + 1);
        updatedItems.AddRange(lastParagraph.Items);
        updatedItems.Add(editLink);

        var updatedParagraphs = new List<ChecklistParagraph>(cell.Paragraphs);
        updatedParagraphs[^1] = lastParagraph with { Items = updatedItems };

        return cell with
        {
            Paragraphs = updatedParagraphs,
        };
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLDataSource.cs:134-153 (BuildRows
    //   backwards-iteration hideMatches drop) + :156-162 (single-column
    //   IsMatch=true force).
    // Maps to: INV-002 / INV-010 / BHV-104
    //
    // EXPLANATION:
    // Mutates <paramref name="rows"/> in place with two branches:
    //
    //   - Single-column (columnCount <= 1): nothing to compare against, so
    //     force IsMatch=true on every row (INV-002). hideMatches is a
    //     no-op in this branch — PT9 CLDataSource.cs:156-162.
    //
    //   - Multi-column: backwards-iterate (index stability under
    //     RemoveAt) and compute HasSameValue for each row. When
    //     hideMatches is true, drop matching rows and accumulate
    //     excludedCount; otherwise annotate each row with its IsMatch
    //     verdict. PT9 CLDataSource.cs:134-153.
    //
    // Returns the number of rows that were dropped (always 0 in the
    // single-column branch).
    private static int ApplyMatchDetectionAndFilter(
        List<ChecklistRow> rows,
        Dictionary<string, List<string>> markerMappings,
        int columnCount,
        bool hideMatches
    )
    {
        if (columnCount <= 1)
        {
            for (int i = 0; i < rows.Count; i++)
                rows[i] = rows[i] with { IsMatch = true };
            return 0;
        }

        int excludedCount = 0;
        for (int i = rows.Count - 1; i >= 0; i--)
        {
            bool isMatch = MarkersDataSource.HasSameValue(rows[i], markerMappings);
            if (isMatch && hideMatches)
            {
                rows.RemoveAt(i);
                excludedCount++;
            }
            else
            {
                rows[i] = rows[i] with { IsMatch = isMatch };
            }
        }
        return excludedCount;
    }

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
    //   - showVerseText is NOT a parameter here: CAP-006's ExtractColumnCells
    //     passes the flag directly into ApplyPostProcessParagraph per cell, so
    //     GetCellsForBook has no use for it. PT9's CLDataSource interleaved
    //     the two concerns; PT10 separates them cleanly.
    //   - EditLinkItem is NOT emitted at this layer (VAL-007). CAP-012 owns
    //     inline emission; CAP-004 only ensures the cell STRUCTURE is ready
    //     for an EditLinkItem to be appended (Paragraphs[*].Items is a
    //     concrete mutable List<ChecklistContentItem>).
    //   - Merge bookkeeping: PT9's CLCell carried its VerseRef internally
    //     so AddContentToCurrentCell could `cells[^1].VerseRef.CompareTo(...)`.
    //     PT10's ChecklistCell record exposes `Reference` as a structured
    //     `ScriptureRange`, so we maintain a parallel list of VerseRefs during
    //     construction to drive the merge comparison without unpacking it.
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
        List<ChecklistParagraphTokens> paragraphs
    )
    {
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
    //      concern (see plan Decisions Made). CAP-006's ExtractColumnCells
    //      applies MarkersDataSource.PostProcessParagraph directly with the
    //      orchestrator's showVerseText flag, so BuildCLCell does not carry
    //      that argument.
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
        // The chained access `GetJoinedText(bookNum).Settings.LanguageID.Id` can
        // surface a NullReferenceException when the joined-text wrapper is not
        // fully populated (DummyScrText returns `this`, so its Settings/LanguageID
        // may be uninitialized in some test scenarios). Narrow the catch to that
        // concrete case so other exceptions (e.g. I/O failures from a real
        // JoinedScrText) propagate normally.
        string language;
        try
        {
            language = scrText.GetJoinedText(bookNum).Settings.LanguageID.Id;
        }
        catch (NullReferenceException)
        {
            language = scrText.Settings.LanguageID?.Id ?? string.Empty;
        }

        // Step 3: prep cell fields (PT9 :367, :239-264 from CLCell.VerseRef setter).
        // PT9 stored Reference = verseRef.ToString() plus a separate locale-baked
        // DisplayedReference = verseRef.ToLocalizedString(). PT10 carries one structured,
        // bridge-capable ScriptureRange (null for a default verse); the displayed string is
        // derived client-side from it, so no server-side localized presentation string.
        ScriptureRange? reference = ScriptureRange.FromVerseRef(vref);

        string paragraphMarker = string.Empty;
        var items = new List<ChecklistContentItem>();

        // Step 4: PT9 :379-428 — walk tokens.
        var state = new ScrParserState(scrText, vref);

        // ScrParserState.UpdateState requires a concrete List<UsfmToken> (PT9
        // ScrParserState.cs:46). CAP-003's GetTokensForBook always constructs
        // a List<UsfmToken>, so the `as` cast succeeds on the hot path with
        // zero allocations; the `?? ToList()` fallback keeps us honest
        // against the record's IReadOnlyList<UsfmToken> contract if any future
        // caller supplies a different implementation.
        List<UsfmToken> tokensList =
            paragraphTokens.Tokens as List<UsfmToken> ?? paragraphTokens.Tokens.ToList();

        for (int i = 0; i < tokensList.Count; ++i)
        {
            UsfmToken token = tokensList[i];
            state.UpdateState(tokensList, i);

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
                // PT9 also set a `textDisplayed` flag here that was passed to
                // CLVerse's ctor; PT10's VerseItem doesn't carry that flag, so
                // the write was dead and is omitted.
                string text = scrText.RightToLeft ? StringUtils.rtlMarker + token.Text : token.Text;
                string? characterStyle = state.CharTag != null ? state.CharTag.Marker : null;
                items.Add(new TextItem(text, characterStyle));
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
            Language: language,
            Error: null
        );
        return (cell, vref);
    }
}
