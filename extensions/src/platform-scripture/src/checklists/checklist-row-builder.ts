import type { SerializedVerseRef } from '@sillsdev/scripture';
import type { ScriptureRange } from 'platform-scripture';
import type { ChecklistCell, ChecklistRow } from './checklist.types';

/**
 * Aligns per-column already-merged cells into rows. Each input cell is assumed to carry all
 * paragraphs at one distinct `verseRef` in its column (Phase 5's `buildChecklistData` performs the
 * per-verseRef grouping upstream). This module is a simple column-zip aligner:
 *
 * 1. For each step, find the minimum starting verseRef across non-empty column heads.
 * 2. For each column whose head matches that minimum, consume it into the row; otherwise emit an
 *    empty-placeholder cell for that column.
 * 3. Repeat until every column is exhausted.
 *
 * Per `working-docs/tj-review-consumer-inventory.md` § 6, verse-bridge expansion and
 * `MaxCellsToGrab` capping are NOT implemented here. If Phase 7 baseline parity reveals scenarios
 * that need them, escalate.
 *
 * Match detection (`isMatch`), edit-link gating (`includeEditLink`), and scoring are populated by
 * the orchestrator after row alignment.
 *
 * Port of (a simplified subset of) `c-sharp/Checklists/ChecklistRowBuilder.cs`.
 */
export function buildRowsMergingCells(columnsCells: ChecklistCell[][]): ChecklistRow[] {
  if (columnsCells.length === 0) return [];

  const columnQueues: ChecklistCell[][] = columnsCells.map((cells) => [...cells]);
  const rows: ChecklistRow[] = [];

  while (columnQueues.some((queue) => queue.length > 0)) {
    const headsWithIndex = columnQueues
      .map((queue, columnIndex) => ({ head: queue[0], columnIndex }))
      .filter((entry): entry is { head: ChecklistCell; columnIndex: number } =>
        Boolean(entry.head),
      );
    if (headsWithIndex.length === 0) break;

    // Find the column whose head has the smallest reference. In a multi-column layout this is the
    // "current" verseRef to align this row to; in a single-column layout this simply consumes the
    // first head.
    const minEntry = headsWithIndex.reduce((min, entry) =>
      compareReference(entry.head.reference, min.head.reference) < 0 ? entry : min,
    );
    const targetRef = minEntry.head.reference;

    // For each column: if the head matches the target ref, consume it; otherwise emit an empty
    // placeholder. When there are no references on any heads (all undefined), only the first
    // matching column consumes; this collapses degenerate "no-ref" rows in column order.
    const rowCells: ChecklistCell[] = columnQueues.map((queue) => {
      const head = queue[0];
      if (head && referencesEqual(head.reference, targetRef)) {
        queue.shift();
        return head;
      }
      return makeEmptyCell();
    });

    rows.push({
      cells: rowCells,
      isMatch: false,
      includeEditLink: false,
      score: 0,
      firstRef: targetRef,
    });
  }

  return rows;
}

function makeEmptyCell(): ChecklistCell {
  return { paragraphs: [], reference: undefined, language: '', error: undefined };
}

/**
 * Three-way comparison on the `start` of two scripture ranges. `undefined` sorts last so columns
 * with no reference don't displace columns with references during alignment.
 */
function compareReference(a: ScriptureRange | undefined, b: ScriptureRange | undefined): number {
  if (a === undefined && b === undefined) return 0;
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  return compareVerseRef(a.start, b.start);
}

function compareVerseRef(a: SerializedVerseRef, b: SerializedVerseRef): number {
  if (a.book !== b.book) return a.book < b.book ? -1 : 1;
  if (a.chapterNum !== b.chapterNum) return a.chapterNum - b.chapterNum;
  return a.verseNum - b.verseNum;
}

function referencesEqual(a: ScriptureRange | undefined, b: ScriptureRange | undefined): boolean {
  return compareReference(a, b) === 0;
}
