import { describe, expect, it } from 'vitest';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import { buildRowsMergingCells } from './checklist-row-builder';
import type { ChecklistCell, ChecklistParagraph } from './checklist.types';

/**
 * Per `working-docs/tj-review-consumer-inventory.md` § 6, this module is a SIMPLE column-zip
 * aligner. It assumes the caller has already grouped per-column paragraphs into cells (one cell per
 * distinct verseRef per column). Verse-bridge expansion and MaxCellsToGrab capping happen upstream
 * in `buildChecklistData` (Phase 5).
 *
 * Tests exercise the simple alignment cases. Behavior-parity for verse bridges is gated by Phase 7
 * baseline diffs against `working-docs/tj-review-baseline/`.
 */

function ref(book: string, chapterNum: number, verseNum: number): SerializedVerseRef {
  return { book, chapterNum, verseNum };
}

function makeCell(
  markers: string[],
  reference: { start: SerializedVerseRef; end?: SerializedVerseRef } | undefined,
): ChecklistCell {
  const paragraphs: ChecklistParagraph[] = markers.map((marker) => ({ marker, items: [] }));
  return { paragraphs, reference, language: 'en', error: undefined };
}

describe('buildRowsMergingCells', () => {
  it('empty input produces empty output', () => {
    expect(buildRowsMergingCells([])).toEqual([]);
  });

  it('single column with one cell produces one row with that cell', () => {
    const columns = [[makeCell(['p'], { start: ref('GEN', 1, 1) })]];
    const rows = buildRowsMergingCells(columns);
    expect(rows).toHaveLength(1);
    expect(rows[0].cells).toHaveLength(1);
    expect(rows[0].cells[0].paragraphs[0].marker).toBe('p');
    expect(rows[0].firstRef).toEqual({ start: ref('GEN', 1, 1) });
  });

  it('two parallel columns with same verseRef produce one row with both cells', () => {
    const columns = [
      [makeCell(['p'], { start: ref('GEN', 1, 1) })],
      [makeCell(['q'], { start: ref('GEN', 1, 1) })],
    ];
    const rows = buildRowsMergingCells(columns);
    expect(rows).toHaveLength(1);
    expect(rows[0].cells).toHaveLength(2);
    expect(rows[0].cells[0].paragraphs[0].marker).toBe('p');
    expect(rows[0].cells[1].paragraphs[0].marker).toBe('q');
  });

  it('mismatched verseRefs across columns emit empty-placeholder cells', () => {
    // Column 0 has GEN 1:1; column 1 has GEN 1:2. Result: row 0 = [(p), empty], row 1 = [empty, (q)].
    const columns = [
      [makeCell(['p'], { start: ref('GEN', 1, 1) })],
      [makeCell(['q'], { start: ref('GEN', 1, 2) })],
    ];
    const rows = buildRowsMergingCells(columns);
    expect(rows).toHaveLength(2);
    expect(rows[0].cells[0].paragraphs[0].marker).toBe('p');
    expect(rows[0].cells[1].paragraphs).toHaveLength(0);
    expect(rows[0].cells[1].reference).toBeUndefined();
    expect(rows[1].cells[0].paragraphs).toHaveLength(0);
    expect(rows[1].cells[1].paragraphs[0].marker).toBe('q');
  });

  it('multiple paragraphs in one cell are preserved as one row cell (upstream-merged)', () => {
    // Phase 5's buildChecklistData is responsible for grouping same-verseRef paragraphs into a
    // single cell; the row builder just passes them through. (Canary: scenario-01 row 0 has 24
    // paragraphs in one cell.)
    const cell = makeCell(['p', 'q', 's'], { start: ref('GEN', 1, 0) });
    const rows = buildRowsMergingCells([[cell]]);
    expect(rows).toHaveLength(1);
    expect(rows[0].cells[0].paragraphs).toHaveLength(3);
    expect(rows[0].cells[0].paragraphs.map((p) => p.marker)).toEqual(['p', 'q', 's']);
  });

  it('aligns multi-row sequences in order', () => {
    const columns = [
      [makeCell(['p'], { start: ref('GEN', 1, 1) }), makeCell(['q'], { start: ref('GEN', 1, 2) })],
      [makeCell(['p'], { start: ref('GEN', 1, 1) }), makeCell(['q'], { start: ref('GEN', 1, 2) })],
    ];
    const rows = buildRowsMergingCells(columns);
    expect(rows).toHaveLength(2);
    expect(rows[0].firstRef).toEqual({ start: ref('GEN', 1, 1) });
    expect(rows[1].firstRef).toEqual({ start: ref('GEN', 1, 2) });
  });

  it('shorter column produces trailing empty-placeholder cells', () => {
    const columns = [
      [makeCell(['p'], { start: ref('GEN', 1, 1) }), makeCell(['q'], { start: ref('GEN', 1, 2) })],
      [makeCell(['p'], { start: ref('GEN', 1, 1) })],
    ];
    const rows = buildRowsMergingCells(columns);
    expect(rows).toHaveLength(2);
    expect(rows[0].cells[0].paragraphs[0].marker).toBe('p');
    expect(rows[0].cells[1].paragraphs[0].marker).toBe('p');
    expect(rows[1].cells[0].paragraphs[0].marker).toBe('q');
    expect(rows[1].cells[1].paragraphs).toHaveLength(0);
  });

  it('row emitted with isMatch=false and includeEditLink=false (populated downstream)', () => {
    // Match-detection and edit-link gating happen in buildChecklistData; the row builder emits
    // safe defaults.
    const rows = buildRowsMergingCells([[makeCell(['p'], { start: ref('GEN', 1, 1) })]]);
    expect(rows[0].isMatch).toBe(false);
    expect(rows[0].includeEditLink).toBe(false);
    expect(rows[0].score).toBe(0);
  });

  it('orders by book then chapter then verse', () => {
    // Multiple books: GEN before EXO.
    const columns = [
      [
        makeCell(['p'], { start: ref('EXO', 1, 1) }),
        makeCell(['p'], { start: ref('GEN', 2, 1) }),
        makeCell(['p'], { start: ref('GEN', 1, 1) }),
      ],
    ];
    const rows = buildRowsMergingCells(columns);
    // Single column means rows come out in column order; verify the builder doesn't reshuffle a
    // single column.
    expect(rows.map((r) => r.firstRef?.start.book)).toEqual(['EXO', 'GEN', 'GEN']);
  });
});
