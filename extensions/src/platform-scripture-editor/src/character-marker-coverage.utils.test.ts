import { describe, expect, it } from 'vitest';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { computeCharacterMarkerCoverage } from './character-marker-coverage.utils';

// `kolo \bd Mulu\bd* rest` — U3's worked example. Paths:
//   $.content[2].content[1]             → 'kolo '
//   $.content[2].content[2].content[0]  → 'Mulu' (inside \bd)
//   $.content[2].content[3]             → ' rest'
const USJ_PARTIAL_BD: Usj = {
  type: 'USJ',
  version: '3.0',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['GEN - Genesis'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' },
        'kolo ',
        { type: 'char', marker: 'bd', content: ['Mulu'] },
        ' rest',
      ],
    },
  ],
};

// `\wj \nd Lord\nd* said\wj*` — nesting. Paths:
//   $.content[2].content[1].content[0].content[0] → 'Lord' (inside \nd inside \wj)
//   $.content[2].content[1].content[1]            → ' said' (inside \wj only)
const USJ_NESTED: Usj = {
  type: 'USJ',
  version: '3.0',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['GEN - Genesis'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' },
        {
          type: 'char',
          marker: 'wj',
          content: [{ type: 'char', marker: 'nd', content: ['Lord'] }, ' said'],
        },
      ],
    },
  ],
};

// `text\f + \ft note\ft*\f* more` — a footnote whose content marker `ft` IS a character marker.
// Paths:
//   $.content[2].content[1]                        → 'text'
//   $.content[2].content[2].content[0].content[0]  → 'note' (inside \ft inside the note)
//   $.content[2].content[3]                        → ' more'
const USJ_WITH_NOTE: Usj = {
  type: 'USJ',
  version: '3.0',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['GEN - Genesis'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' },
        'text',
        {
          type: 'note',
          marker: 'f',
          caller: '+',
          content: [{ type: 'char', marker: 'ft', content: ['note'] }],
        },
        ' more',
      ],
    },
  ],
};

// `\bd Mu\bd*\bd lu\bd*` — two adjacent sibling char nodes carrying the SAME marker. This is the
// case that motivates "coverage wins over the O(1) check": the two nodes have different json paths,
// so the cheap homogeneity test calls this mixed while coverage correctly says 'all'. Paths:
//   $.content[2].content[1].content[0] → 'Mu'
//   $.content[2].content[2].content[0] → 'lu'
const USJ_SIBLING_SAME_MARKER: Usj = {
  type: 'USJ',
  version: '3.0',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['GEN - Genesis'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' },
        { type: 'char', marker: 'bd', content: ['Mu'] },
        { type: 'char', marker: 'bd', content: ['lu'] },
      ],
    },
  ],
};

// `\v 1 first \bd bold\bd*\v 2 second` — a selection crossing a verse boundary. Paths:
//   $.content[2].content[1]            → 'first '
//   $.content[2].content[2].content[0] → 'bold'
//   $.content[2].content[4]            → 'second'
const USJ_TWO_VERSES: Usj = {
  type: 'USJ',
  version: '3.0',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['GEN - Genesis'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' },
        'first ',
        { type: 'char', marker: 'bd', content: ['bold'] },
        { type: 'verse', marker: 'v', number: '2', sid: 'GEN 1:2' },
        'second',
      ],
    },
  ],
};

const KOLO = '$.content[2].content[1]';
const MULU = '$.content[2].content[2].content[0]';
const REST = '$.content[2].content[3]';

describe('computeCharacterMarkerCoverage', () => {
  it("reports 'partial' and uncovered text for U3's kolo + \\bd Mulu\\bd* selection", () => {
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: KOLO, offset: 0 },
      end: { jsonPath: MULU, offset: 4 },
    });

    expect(coverage.markerStates.bd).toBe('partial');
    expect(coverage.hasUncovered).toBe(true);
  });

  it("reports 'all' with no uncovered text when the selection sits entirely inside one marker", () => {
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: MULU, offset: 0 },
      end: { jsonPath: MULU, offset: 4 },
    });

    expect(coverage.markerStates.bd).toBe('all');
    expect(coverage.hasUncovered).toBe(false);
  });

  it('reports no markers and uncovered text for a selection of plain text only', () => {
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: KOLO, offset: 0 },
      end: { jsonPath: KOLO, offset: 5 },
    });

    expect(coverage.markerStates).toEqual({});
    expect(coverage.hasUncovered).toBe(true);
  });

  it("treats a collapsed caret inside a marker as 'all'", () => {
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: MULU, offset: 2 },
      end: { jsonPath: MULU, offset: 2 },
    });

    expect(coverage.markerStates.bd).toBe('all');
    expect(coverage.hasUncovered).toBe(false);
  });

  it('reports nested markers independently', () => {
    const coverage = computeCharacterMarkerCoverage(USJ_NESTED, {
      start: { jsonPath: '$.content[2].content[1].content[0].content[0]', offset: 0 },
      end: { jsonPath: '$.content[2].content[1].content[1]', offset: 5 },
    });

    // Both cover the selection start; only `wj` covers all of it.
    expect(coverage.markerStates.wj).toBe('all');
    expect(coverage.markerStates.nd).toBe('partial');
    expect(coverage.hasUncovered).toBe(false);
  });

  it('excludes note content from coverage even though `ft` is a character marker', () => {
    const coverage = computeCharacterMarkerCoverage(USJ_WITH_NOTE, {
      start: { jsonPath: '$.content[2].content[1]', offset: 0 },
      end: { jsonPath: REST, offset: 5 },
    });

    expect(coverage.markerStates.ft).toBeUndefined();
    expect(coverage.hasUncovered).toBe(true);
  });

  it('ignores the non-character markers a selection spans', () => {
    // The selection crosses the `\bd` char node and lands in plain text; `p` and `v` are block and
    // numbering markers and must never appear in the result.
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: MULU, offset: 0 },
      end: { jsonPath: REST, offset: 5 },
    });

    expect(coverage.markerStates.p).toBeUndefined();
    expect(coverage.markerStates.v).toBeUndefined();
    expect(coverage.markerStates.bd).toBe('partial');
  });

  it("reports 'all' for a selection spanning two sibling nodes with the same marker", () => {
    // The O(1) `start.jsonPath !== end.jsonPath` check calls this mixed; the analysis must not.
    // This is why the hook prefers coverage over the cheap check once it has it.
    const coverage = computeCharacterMarkerCoverage(USJ_SIBLING_SAME_MARKER, {
      start: { jsonPath: '$.content[2].content[1].content[0]', offset: 0 },
      end: { jsonPath: '$.content[2].content[2].content[0]', offset: 2 },
    });

    expect(coverage.markerStates.bd).toBe('all');
    expect(coverage.hasUncovered).toBe(false);
  });

  it('resolves a selection that crosses a verse boundary', () => {
    const coverage = computeCharacterMarkerCoverage(USJ_TWO_VERSES, {
      start: { jsonPath: '$.content[2].content[1]', offset: 0 },
      end: { jsonPath: '$.content[2].content[4]', offset: 6 },
    });

    // 'first ' (6) + 'bold' (4) + 'second' (6): `bd` covers 4 of 16, and the verse marker node
    // itself contributes no text.
    expect(coverage.markerStates.bd).toBe('partial');
    expect(coverage.markerStates.v).toBeUndefined();
    expect(coverage.hasUncovered).toBe(true);
  });

  it('returns an empty coverage rather than throwing for degenerate input', () => {
    expect(computeCharacterMarkerCoverage(USJ_PARTIAL_BD, undefined)).toEqual({
      markerStates: {},
      hasUncovered: false,
    });
    expect(
      computeCharacterMarkerCoverage(USJ_PARTIAL_BD, { start: { jsonPath: '$.nope[9]' } }),
    ).toEqual({ markerStates: {}, hasUncovered: false });
    expect(
      computeCharacterMarkerCoverage(
        { type: 'USJ', version: '3.0', content: [] },
        {
          start: { jsonPath: KOLO },
        },
      ),
    ).toEqual({ markerStates: {}, hasUncovered: false });
  });
});
