using System;
using System.Collections.Generic;
using System.Linq;
using SIL.Scripture;

namespace Paranext.DataProvider.Checklists;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists/CLRowsBuilder.cs:1-371
// Method: CLRowsBuilder.BuildRowsMergingCells (and internal helpers
//   BuildReferenceMappings, ExpandGrabCountToAlignCells, AddRowOfGrabbedCells,
//   GrabMatchingCellsFromColumns, MergeGrabbedCells, FindInsertionIndex,
//   AddIfUnhandled, GetLargestGrabbedVerseRef, GetRefsFromGrabbedCells)
// Maps to: EXT-009 / BHV-109
// Invariants: INV-001 (N cells per row), INV-006 (MAX_CELLS_TO_GRAB=3),
//   INV-007 (common versification — orchestrator pre-normalizes), INV-011
//   (Markers uses merging mode — only public entry is BuildRowsMergingCells).
//
// EXPLANATION (algorithm overview):
// The builder takes per-column lists of ChecklistCell (one list per ScrText in
// the caller's order) and aligns them into rows such that cells sharing a
// normalized verse reference land in the same row. When one column has a verse
// bridge (e.g. "EXO 20:2-5") and another has individual verse cells
// (e.g. "EXO 20:4", "EXO 20:5", "EXO 20:6", ...), adjacent cells are grabbed
// and merged until either the bridges align or MAX_CELLS_TO_GRAB (3) is
// reached per column per row.
//
// Algorithmic phases (per invocation, in order):
//   1. Initialize: build mutable shadow cells + cellRefMap + referenceMap +
//      handledCells sets. Parse DisplayedReference (has bridge notation) via
//      SIL.Scripture.VerseRef so AllVerses() can expand bridges.
//   2. Outer loop: for each column, walk cells in order.
//      - GrabMatchingCellsFromColumns collects one cell per later column
//        whose normalized verse refs overlap the current cell's.
//      - ExpandGrabCountToAlignCells extends the grab set until bridge
//        boundaries align (bounded by MAX_CELLS_TO_GRAB).
//      - MergeGrabbedCells concatenates paragraphs within each column's
//        grabbed set into a single MutableCell (the lead cell).
//      - AddRowOfGrabbedCells emits a ChecklistRow: one ChecklistCell per
//        column, empty placeholder when no cell was grabbed (INV-001). Rows
//        from col 0 are appended; rows from later columns are binary-search
//        inserted by FirstRef.
//
// PT10 adaptations from PT9:
//   - PT9's mutable CLCell is not available — ChecklistCell is an immutable
//     record (INV from CAP-001). We maintain a private MutableCell shadow per
//     source cell that accumulates merged state, and project back to
//     ChecklistCell records only at row-emission time.
//   - PT9 reads versification from the first cell's live VerseRef. PT10's
//     ChecklistCell has no VerseRef field. We default to ScrVers.English and
//     trust the orchestrator (CAP-006) to pre-normalize per INV-007. This is
//     sufficient for all 20 CAP-005 tests and for the target gm-011/012/013
//     same-versification shapes.

/// <summary>
/// Aligns cells from multiple columns into rows by verse reference. Markers
/// checklist always uses the merging mode (INV-011) — verse bridges in one
/// column are merged with individual verse cells in another column up to
/// <see cref="MAX_CELLS_TO_GRAB"/> cells per column per row (INV-006).
///
/// <para>See class-level <c>EXPLANATION</c> comment for full algorithm and
/// data-contracts.md §4.1 (BHV-109 within BuildChecklistData), §3.2
/// (ChecklistRow shape), §3.3 (ChecklistCell shape).</para>
/// </summary>
internal static class ChecklistRowBuilder
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLRowsBuilder.cs:16
    // Invariant: INV-006
    /// <summary>
    /// Maximum number of cells that can be merged per column per row during
    /// verse-bridge alignment (INV-006). PT9's <c>CLRowsBuilder</c> caps the
    /// grab at this value to prevent runaway row expansion when a giant
    /// bridge in one column would otherwise pull in an unbounded number of
    /// adjacent cells from another column.
    /// </summary>
    public const int MAX_CELLS_TO_GRAB = 3;

    /// <summary>
    /// Aligns per-column cell lists into rows. Always uses merging mode
    /// (Markers invariant INV-011). See class-level summary for the full
    /// algorithm and data-contracts.md §4.1 for the formal contract.
    /// </summary>
    /// <param name="columnsList">
    /// One <see cref="ChecklistCell"/> list per column (active project first,
    /// then each comparative text in the caller's order). Cells must already
    /// have been produced by <c>ChecklistService.GetCellsForBook</c> (CAP-004).
    /// </param>
    /// <returns>
    /// Rows aligned by normalized verse reference, each with exactly
    /// <c>columnsList.Count</c> cells (INV-001; missing verses → empty
    /// placeholder cells).
    /// </returns>
    public static List<ChecklistRow> BuildRowsMergingCells(List<List<ChecklistCell>> columnsList)
    {
        if (columnsList == null || columnsList.Count == 0)
            return new List<ChecklistRow>();

        var builder = new Builder(columnsList);
        return builder.Build();
    }

    // === NEW IN PT10 ===
    // Reason: ChecklistCell is an immutable record (CAP-001). PT9's CLRowsBuilder
    // mutates CLCell instances in place during MergeGrabbedCells. To preserve
    // PT9's behavior without mutating ChecklistCell, we shadow every source cell
    // with a MutableCell that accumulates merged state; ChecklistCell records
    // are constructed only at row emission.
    // Maps to: Infrastructure for BHV-109
    /// <summary>
    /// Mutable shadow of a <see cref="ChecklistCell"/> used during alignment to
    /// accumulate merged paragraphs and extended verse-reference ranges without
    /// mutating the immutable source record.
    /// </summary>
    private sealed class MutableCell
    {
        public List<ChecklistParagraph> Paragraphs { get; }
        public string Reference { get; set; }
        public string DisplayedReference { get; set; }
        public VerseRef StartVerseRef { get; set; }
        public VerseRef EndVerseRef { get; set; }
        public string Language { get; }
        public string? Error { get; }

        public MutableCell(
            List<ChecklistParagraph> paragraphs,
            string reference,
            string displayedReference,
            VerseRef startVerseRef,
            VerseRef endVerseRef,
            string language,
            string? error
        )
        {
            Paragraphs = paragraphs;
            Reference = reference;
            DisplayedReference = displayedReference;
            StartVerseRef = startVerseRef;
            EndVerseRef = endVerseRef;
            Language = language;
            Error = error;
        }

        public ChecklistCell ToChecklistCell() =>
            new ChecklistCell(
                Paragraphs: Paragraphs,
                Reference: Reference,
                DisplayedReference: DisplayedReference,
                Language: Language,
                Error: Error
            );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checklists/CLRowsBuilder.cs:12-371 (instance fields +
    //   all private methods)
    // Maps to: EXT-009 / BHV-109
    //
    // EXPLANATION:
    // PT9 uses instance fields on CLRowsBuilder to carry state across private
    // helpers. Here we encapsulate the same state in a per-call Builder
    // instance so the public entry point stays a pure static method and
    // concurrent calls are isolated.
    /// <summary>
    /// Per-call state container for the row-alignment algorithm. Mirrors PT9's
    /// instance fields scoped to one invocation.
    /// </summary>
    private sealed class Builder
    {
        private readonly List<List<ChecklistCell>> columns;
        private readonly List<List<MutableCell>> mutableCells;
        private readonly List<ChecklistRow> rows = new List<ChecklistRow>();
        private ScrVers versification = ScrVers.English;
        private Dictionary<VerseRef, int>[] referenceMap = null!;
        private Dictionary<int, List<VerseRef>>[] cellRefMap = null!;
        private HashSet<int>[] handledCells = null!;

        public Builder(List<List<ChecklistCell>> columnsList)
        {
            columns = columnsList;
            mutableCells = new List<List<MutableCell>>(columns.Count);
        }

        // === PORTED FROM PT9 ===
        // Source: PT9/Paratext/Checklists/CLRowsBuilder.cs:64-91
        //   (CLRowsBuilder.BuildRows)
        // Maps to: EXT-009 / BHV-109
        //
        // EXPLANATION:
        // Outer loop walks every (column, cell) pair. For each pair,
        // GrabMatchingCellsFromColumns collects one aligned cell per later
        // column; if anything was grabbed, we expand the grab to align bridge
        // boundaries (bounded by MAX_CELLS_TO_GRAB), merge paragraphs within
        // each column's grabbed set, and emit the row. Always merging mode
        // (Markers invariant INV-011).
        public List<ChecklistRow> Build()
        {
            Initialize();

            for (int currentCol = 0; currentCol < columns.Count; currentCol++)
            {
                int columnCellIndex = 0;
                while (columnCellIndex < columns[currentCol].Count)
                {
                    List<int>[] cellsToGrab = GrabMatchingCellsFromColumns(
                        currentCol,
                        columnCellIndex
                    );

                    if (cellsToGrab.Where(col => col != null).SelectMany(c => c).Any())
                    {
                        ExpandGrabCountToAlignCells(currentCol, cellsToGrab, ref columnCellIndex);
                        MergeGrabbedCells(currentCol, cellsToGrab);
                        AddRowOfGrabbedCells(currentCol, cellsToGrab);
                    }
                    columnCellIndex++;
                }
            }

            return rows;
        }

        // === PORTED FROM PT9 ===
        // Source: PT9/Paratext/Checklists/CLRowsBuilder.cs:97-109
        //   (CLRowsBuilder.Initialize)
        // Maps to: EXT-009 / BHV-109
        //
        // EXPLANATION:
        // PT9 reads default versification from the first cell's live VerseRef.
        // PT10's ChecklistCell has no VerseRef field, so we default to
        // ScrVers.English and rely on the orchestrator (CAP-006) to
        // pre-normalize per INV-007. We also pre-build the MutableCell shadow
        // so Merge operations don't need to touch the immutable records.
        private void Initialize()
        {
            // Default versification: English (CAP-006 pre-normalizes cells
            // to a common versification before calling this builder).
            versification = ScrVers.English;

            // Build the MutableCell shadow per source cell.
            foreach (var column in columns)
            {
                var mcol = new List<MutableCell>(column.Count);
                foreach (var cell in column)
                {
                    var parsed = ParseVerseRefs(cell);
                    mcol.Add(
                        new MutableCell(
                            paragraphs: new List<ChecklistParagraph>(cell.Paragraphs),
                            reference: cell.Reference,
                            displayedReference: cell.DisplayedReference,
                            startVerseRef: parsed.start,
                            endVerseRef: parsed.end,
                            language: cell.Language,
                            error: cell.Error
                        )
                    );
                }
                mutableCells.Add(mcol);
            }

            BuildReferenceMappings();

            handledCells = new HashSet<int>[columns.Count];
            for (int col = 0; col < columns.Count; col++)
                handledCells[col] = new HashSet<int>();
        }

        // === NEW IN PT10 ===
        // Reason: ChecklistCell has no VerseRef field — PT9 read it directly
        // off the cell. Parse from DisplayedReference (which carries the
        // bridge notation like "EXO 20:2-5"); fall back to Reference if
        // DisplayedReference is empty.
        // Maps to: Infrastructure for BHV-109
        //
        // EXPLANATION:
        // ChecklistCell.Reference holds the single START reference of the
        // cell (e.g. "EXO 20:2"). ChecklistCell.DisplayedReference holds the
        // full range including any bridge ("EXO 20:2-5"). We parse the
        // displayed reference so AllVerses() can expand bridges correctly
        // during alignment. Empty-placeholder cells (Reference == "") return
        // a default VerseRef pair — they contribute nothing to the ref maps.
        /// <summary>
        /// Parses start and end <see cref="VerseRef"/> from a
        /// <see cref="ChecklistCell"/>. Empty-reference cells return default
        /// <see cref="VerseRef"/> values.
        /// </summary>
        private (VerseRef start, VerseRef end) ParseVerseRefs(ChecklistCell cell)
        {
            if (
                string.IsNullOrEmpty(cell.DisplayedReference)
                && string.IsNullOrEmpty(cell.Reference)
            )
                return (new VerseRef(), new VerseRef());

            string refToParse = !string.IsNullOrEmpty(cell.DisplayedReference)
                ? cell.DisplayedReference
                : cell.Reference;

            VerseRef start;
            try
            {
                start = new VerseRef(refToParse, versification);
            }
            catch
            {
                return (new VerseRef(), new VerseRef());
            }

            // AllVerses expands bridges; .Last() gives the final verse of a bridge.
            VerseRef end;
            try
            {
                end = start.AllVerses(true).Last();
            }
            catch
            {
                end = start;
            }

            return (start, end);
        }

        // === PORTED FROM PT9 ===
        // Source: PT9/Paratext/Checklists/CLRowsBuilder.cs:114-137
        //   (CLRowsBuilder.BuildReferenceMappings)
        // Maps to: EXT-009 / BHV-109
        //
        // EXPLANATION:
        // For each column, build two lookup tables:
        //   - referenceMap: normalized VerseRef -> index of the first cell
        //     containing that verse. Used by GrabMatchingCellsFromColumns.
        //   - cellRefMap:  cell index -> list of every normalized VerseRef
        //     that cell covers (bridges expanded via AllVerses).
        // ChangeVersification is applied to each normalized ref; in practice
        // the orchestrator already pre-normalized, so this is a no-op for the
        // 20 CAP-005 tests but preserves PT9's semantic for future callers.
        private void BuildReferenceMappings()
        {
            cellRefMap = new Dictionary<int, List<VerseRef>>[columns.Count];
            referenceMap = new Dictionary<VerseRef, int>[columns.Count];

            for (int col = 0; col < columns.Count; col++)
            {
                cellRefMap[col] = new Dictionary<int, List<VerseRef>>();
                referenceMap[col] = new Dictionary<VerseRef, int>();

                for (int cell = 0; cell < columns[col].Count; cell++)
                {
                    var cellRefs = new List<VerseRef>();
                    VerseRef cellVerseRef = mutableCells[col][cell].StartVerseRef;
                    if (cellVerseRef.IsDefault)
                    {
                        cellRefMap[col][cell] = cellRefs;
                        continue;
                    }
                    foreach (VerseRef vRef in cellVerseRef.AllVerses())
                    {
                        var vrefCopy = vRef;
                        vrefCopy.ChangeVersification(versification);
                        if (!referenceMap[col].ContainsKey(vrefCopy))
                            referenceMap[col].Add(vrefCopy, cell);
                        cellRefs.Add(vrefCopy);
                    }
                    cellRefMap[col][cell] = cellRefs;
                }
            }
        }

        // === PORTED FROM PT9 ===
        // Source: PT9/Paratext/Checklists/CLRowsBuilder.cs:142-186
        //   (CLRowsBuilder.ExpandGrabCountToAlignCells)
        // Maps to: EXT-009 / BHV-109 / INV-006
        //
        // EXPLANATION:
        // Iteratively extends the grabbed-cells set until bridge boundaries
        // align across columns. Each iteration:
        //   1. Find the largest (latest) verse ref among grabbed cells, and
        //      which column it belongs to.
        //   2. For the current column: if its next unhandled cell starts at
        //      or before the largest ref, grab it (and advance the outer
        //      loop counter).
        //   3. For every later column: scan the grabbed verse refs; if a
        //      ref maps to an unhandled cell in this column, grab it.
        // The MAX_CELLS_TO_GRAB check on each column prevents runaway merges
        // (INV-006).
        private void ExpandGrabCountToAlignCells(
            int currentCol,
            List<int>[] cellsToGrab,
            ref int columnCellIndex
        )
        {
            bool foundOne;
            do
            {
                foundOne = false;

                int colWithLargest;
                VerseRef largestRef = GetLargestGrabbedVerseRef(
                    currentCol,
                    cellsToGrab,
                    out colWithLargest
                );

                for (int col = currentCol; col < columns.Count; col++)
                {
                    if (cellsToGrab[col].Count >= MAX_CELLS_TO_GRAB)
                        continue; // INV-006 guard

                    if (col == currentCol)
                    {
                        int nextIndex = columnCellIndex + 1;
                        if (
                            col != colWithLargest
                            && nextIndex < columns[currentCol].Count
                            && cellRefMap[currentCol][nextIndex].Any(v => v <= largestRef)
                            && AddIfUnhandled(col, nextIndex, cellsToGrab)
                        )
                        {
                            columnCellIndex = nextIndex;
                            foundOne = true;
                        }
                        continue;
                    }

                    foreach (VerseRef vRef in GetRefsFromGrabbedCells(currentCol, cellsToGrab))
                    {
                        int cellIndex;
                        if (
                            referenceMap[col].TryGetValue(vRef, out cellIndex)
                            && AddIfUnhandled(col, cellIndex, cellsToGrab)
                        )
                        {
                            foundOne = true;
                            break;
                        }
                    }
                }
            } while (foundOne);
        }

        // === PORTED FROM PT9 ===
        // Source: PT9/Paratext/Checklists/CLRowsBuilder.cs:191-204
        //   (CLRowsBuilder.GetRefsFromGrabbedCells)
        // Maps to: EXT-009 / BHV-109
        private IEnumerable<VerseRef> GetRefsFromGrabbedCells(
            int currentCol,
            List<int>[] cellsToGrab
        )
        {
            for (int col = currentCol; col < columns.Count; col++)
            {
                if (cellsToGrab[col] == null)
                    continue;

                foreach (int index in cellsToGrab[col])
                {
                    foreach (VerseRef verseRef in cellRefMap[col][index])
                        yield return verseRef;
                }
            }
        }

        // === PORTED FROM PT9 ===
        // Source: PT9/Paratext/Checklists/CLRowsBuilder.cs:209-228
        //   (CLRowsBuilder.GetLargestGrabbedVerseRef)
        // Maps to: EXT-009 / BHV-109
        //
        // EXPLANATION:
        // Scans every grabbed cell's last verse (AllVerses(true).Last()) and
        // returns the maximum (latest) ref found, along with which column it
        // came from. PT9 uses this to decide which column "leads" the
        // alignment and thus which direction to expand. ChangeVersification
        // normalizes the ref before comparison (no-op here because cells are
        // pre-normalized by the orchestrator).
        private VerseRef GetLargestGrabbedVerseRef(
            int currentCol,
            List<int>[] grabbedCells,
            out int colWithLargest
        )
        {
            VerseRef? largestRef = null;
            colWithLargest = -1;
            for (int col = currentCol; col < grabbedCells.Length; col++)
            {
                if (grabbedCells[col] == null)
                    continue;
                for (int cell = 0; cell < grabbedCells[col].Count; cell++)
                {
                    VerseRef cellEnd = mutableCells[col][grabbedCells[col][cell]].EndVerseRef;
                    if (cellEnd.IsDefault)
                        continue;
                    cellEnd.ChangeVersification(versification);
                    if (largestRef == null || largestRef.Value < cellEnd)
                    {
                        largestRef = cellEnd;
                        colWithLargest = col;
                    }
                }
            }

            return largestRef ?? new VerseRef();
        }

        // === PORTED FROM PT9 ===
        // Source: PT9/Paratext/Checklists/CLRowsBuilder.cs:233-253
        //   (CLRowsBuilder.MergeGrabbedCells)
        // Maps to: EXT-009 / BHV-109
        //
        // EXPLANATION (PT10 adaptation):
        // PT9 mutates the source CLCell via MergeWithCell and writes a new
        // Reference/DisplayedReference on it. Here we update the lead
        // MutableCell's Paragraphs list and extend its DisplayedReference
        // range. Reference stays at the lead cell's start ref (for binary
        // search ordering). DisplayedReference is rebuilt as "{book chap}:
        // {firstVerse}-{lastVerse}" from the lead cell's start and the
        // merged range's end.
        private void MergeGrabbedCells(int currentCol, List<int>[] cellsToMerge)
        {
            for (int col = currentCol; col < cellsToMerge.Length; col++)
            {
                if (cellsToMerge[col] == null || cellsToMerge[col].Count <= 1)
                    continue;

                int firstCellIndex = cellsToMerge[col][0];
                var lead = mutableCells[col][firstCellIndex];
                VerseRef mergedEnd = lead.EndVerseRef;

                for (int cellIdx = 1; cellIdx < cellsToMerge[col].Count; cellIdx++)
                {
                    int otherIndex = cellsToMerge[col][cellIdx];
                    var other = mutableCells[col][otherIndex];
                    lead.Paragraphs.AddRange(other.Paragraphs);
                    if (!other.EndVerseRef.IsDefault)
                    {
                        if (mergedEnd.IsDefault || mergedEnd < other.EndVerseRef)
                            mergedEnd = other.EndVerseRef;
                    }
                }

                lead.EndVerseRef = mergedEnd;
                lead.DisplayedReference = BuildRangeDisplayedReference(
                    lead.StartVerseRef,
                    mergedEnd
                );
            }
        }

        // === NEW IN PT10 ===
        // Reason: PT9 uses ParatextData.ReferenceRange.LocalizedString for
        // this; we avoid a ParatextData dependency and build a simple
        // "{book} {chap}:{start}-{end}" form. Tests do not pin the exact
        // format; CAP-006 may swap this for a localized form later.
        // Maps to: Infrastructure for BHV-109
        /// <summary>
        /// Builds a displayed-reference string spanning a start and end verse
        /// reference. When both refs share book+chapter, produces
        /// <c>"XXX C:S-E"</c>; otherwise falls back to the concatenated form
        /// <c>"{start}-{end}"</c>.
        /// </summary>
        private static string BuildRangeDisplayedReference(VerseRef start, VerseRef end)
        {
            if (start.IsDefault && end.IsDefault)
                return string.Empty;
            if (end.IsDefault || start.Equals(end))
                return start.ToString();
            if (start.BookNum == end.BookNum && start.ChapterNum == end.ChapterNum)
                return $"{start.Book} {start.ChapterNum}:{start.VerseNum}-{end.VerseNum}";
            return $"{start}-{end}";
        }

        // === PORTED FROM PT9 ===
        // Source: PT9/Paratext/Checklists/CLRowsBuilder.cs:258-279
        //   (CLRowsBuilder.GrabMatchingCellsFromColumns)
        // Maps to: EXT-009 / BHV-109
        //
        // EXPLANATION:
        // For the current (col, cellIndex), gather one cell per later column
        // whose verse refs overlap. The current column always gets the
        // current cell; later columns look up each of the current cell's
        // normalized refs in their referenceMap and grab the FIRST
        // unhandled match.
        private List<int>[] GrabMatchingCellsFromColumns(int currentCol, int masterListCellIndex)
        {
            List<int>[] cellsToGrab = new List<int>[columns.Count];

            for (int col = currentCol; col < columns.Count; col++)
            {
                cellsToGrab[col] = new List<int>();
                if (col == currentCol)
                {
                    AddIfUnhandled(col, masterListCellIndex, cellsToGrab);
                }
                else
                {
                    foreach (VerseRef vRef in cellRefMap[currentCol][masterListCellIndex])
                    {
                        int cellIndex;
                        if (
                            referenceMap[col].TryGetValue(vRef, out cellIndex)
                            && AddIfUnhandled(col, cellIndex, cellsToGrab)
                        )
                            break;
                    }
                }
            }

            return cellsToGrab;
        }

        // === PORTED FROM PT9 ===
        // Source: PT9/Paratext/Checklists/CLRowsBuilder.cs:285-310
        //   (CLRowsBuilder.AddIfUnhandled)
        // Maps to: EXT-009 / BHV-109
        //
        // EXPLANATION:
        // Adds cellIndex to cellsToGrab[col] at the right position so the
        // grabbed list stays in verse-reference order. Marks the cell in
        // handledCells so the same cell is never grabbed twice (this is
        // what gives TS-068 duplicate verse refs their own separate rows).
        // The insertion index is the first position i where some verse ref
        // in the cell-being-inserted is smaller than any verse ref of
        // cellsToGrab[col][i]; otherwise append to end.
        private bool AddIfUnhandled(int col, int cellIndex, List<int>[] cellsToGrab)
        {
            if (handledCells[col].Contains(cellIndex))
                return false;

            int insertIndex = cellsToGrab[col].Count; // default: append at end
            for (int i = 0; i < cellsToGrab[col].Count; i++)
            {
                int grabbedCell = cellsToGrab[col][i];
                foreach (VerseRef verseRef in cellRefMap[col][grabbedCell])
                {
                    if (cellRefMap[col][cellIndex].Any(vref => vref < verseRef))
                    {
                        insertIndex = i;
                        break;
                    }
                }
            }

            cellsToGrab[col].Insert(insertIndex, cellIndex);
            handledCells[col].Add(cellIndex);
            return true;
        }

        // === PORTED FROM PT9 ===
        // Source: PT9/Paratext/Checklists/CLRowsBuilder.cs:315-341
        //   (CLRowsBuilder.AddRowOfGrabbedCells)
        // Maps to: EXT-009 / BHV-109 / INV-001
        //
        // EXPLANATION:
        // Emits a single row:
        //   - For every column: if nothing was grabbed, add an empty
        //     ChecklistCell placeholder (INV-001: row always has N cells);
        //     otherwise project the lead MutableCell (index 0) into a
        //     ChecklistCell.
        //   - FirstRef: earliest verse reference across all populated
        //     cells (BHV-111 carry-through).
        //   - Rows coming from col 0 append to the end; rows from later
        //     columns are binary-search inserted into their correct
        //     position by FirstRef.
        private void AddRowOfGrabbedCells(int currentCol, List<int>[] grabbedCells)
        {
            var cells = new List<ChecklistCell>(columns.Count);
            VerseRef? earliestRef = null;

            for (int col = 0; col < grabbedCells.Length; col++)
            {
                if (grabbedCells[col] == null || grabbedCells[col].Count == 0)
                {
                    // Empty placeholder for missing column (INV-001)
                    cells.Add(EmptyCell());
                    continue;
                }

                int firstCellIndex = grabbedCells[col][0];
                var mc = mutableCells[col][firstCellIndex];
                cells.Add(mc.ToChecklistCell());

                if (!mc.StartVerseRef.IsDefault)
                {
                    // Use the first individual verse of the cell's range (strip
                    // any bridge notation so FirstRef is always a single verse).
                    VerseRef firstSingleVerse = mc.StartVerseRef.AllVerses().FirstOrDefault();
                    VerseRef candidate = firstSingleVerse.IsDefault
                        ? mc.StartVerseRef
                        : firstSingleVerse;
                    if (earliestRef == null || candidate < earliestRef.Value)
                        earliestRef = candidate;
                }
            }

            string firstRef = earliestRef.HasValue ? earliestRef.Value.ToString() : string.Empty;

            var newRow = new ChecklistRow(
                Cells: cells,
                IsMatch: false,
                IncludeEditLink: false,
                Score: 0.0,
                FirstRef: firstRef
            );

            if (currentCol == 0 || rows.Count == 0)
                rows.Insert(rows.Count, newRow);
            else
            {
                int insertIndex = FindInsertionIndex(newRow);
                rows.Insert(insertIndex, newRow);
            }
        }

        // === NEW IN PT10 ===
        // Reason: PT9 uses `new CLCell()` which defaults to an empty cell.
        // ChecklistCell is a record that requires explicit values. This
        // helper centralizes the placeholder shape.
        // Maps to: Infrastructure for INV-001
        /// <summary>
        /// Constructs an empty placeholder cell for a column that has no
        /// matching verse at the current row (INV-001).
        /// </summary>
        private static ChecklistCell EmptyCell() =>
            new ChecklistCell(
                Paragraphs: new List<ChecklistParagraph>(),
                Reference: string.Empty,
                DisplayedReference: string.Empty,
                Language: string.Empty,
                Error: null
            );

        // === PORTED FROM PT9 ===
        // Source: PT9/Paratext/Checklists/CLRowsBuilder.cs:349-369
        //   (CLRowsBuilder.FindInsertionIndex)
        // Maps to: EXT-009 / BHV-109
        //
        // EXPLANATION:
        // Binary search over the in-progress rows list to find the right
        // insertion index for a new row by its FirstRef. When an existing
        // row has the same FirstRef, the new row is inserted immediately
        // AFTER it (PT9 semantic).
        //
        // PT9 compares VerseRefs via VerseRef.CompareTo. PT10's ChecklistRow
        // stores FirstRef as a string; we parse both sides to VerseRef and
        // use the semantic comparator so cross-book/chapter ordering stays
        // correct.
        private int FindInsertionIndex(ChecklistRow newRow)
        {
            int start = 0;
            int end = rows.Count;
            VerseRef newRef = ParseFirstRef(newRow.FirstRef);
            while (true)
            {
                int indexToCheck = start + ((end - start) >> 1);
                VerseRef checkRef = ParseFirstRef(rows[indexToCheck].FirstRef);
                int compareValue = CompareVerseRefs(checkRef, newRef);

                if (compareValue > 0)
                    end = indexToCheck;
                else if (compareValue < 0)
                    start = indexToCheck + 1;

                if (start >= end)
                    return start;

                if (compareValue == 0)
                    return indexToCheck + 1;
            }
        }

        // === NEW IN PT10 ===
        // Reason: PT10 ChecklistRow stores FirstRef as a string (per
        // data-contracts.md §3.2). We parse back to VerseRef for semantic
        // comparison within FindInsertionIndex.
        // Maps to: Infrastructure for BHV-109
        private VerseRef ParseFirstRef(string? firstRef)
        {
            if (string.IsNullOrEmpty(firstRef))
                return new VerseRef();
            try
            {
                return new VerseRef(firstRef, versification);
            }
            catch
            {
                return new VerseRef();
            }
        }

        // === NEW IN PT10 ===
        // Reason: VerseRef comparison operators throw when either side is
        // default; we need a null-safe comparator for FindInsertionIndex.
        // Maps to: Infrastructure for BHV-109
        private static int CompareVerseRefs(VerseRef a, VerseRef b)
        {
            if (a.IsDefault && b.IsDefault)
                return 0;
            if (a.IsDefault)
                return -1;
            if (b.IsDefault)
                return 1;
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        }
    }
}
