import { describe, expect, it } from 'vitest';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { computeCharacterMarkerCoverage } from './character-marker-coverage.utils';

// `kolo \bd Mulu\bd* rest` — a partially marked paragraph. Paths:
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
  it("reports 'partial' and uncovered text for a kolo + \\bd Mulu\\bd* selection", () => {
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

  it('reports no information rather than uncovered text for a caret inside a note', () => {
    // The caret sits in the note's `ft` content, which coverage excludes entirely. Reporting
    // `hasUncovered: true` here would claim unmarked text is selected at a location this function
    // deliberately does not measure; the empty result instead makes the caller fall back to its own
    // context, as it does for any other unresolvable selection.
    const coverage = computeCharacterMarkerCoverage(USJ_WITH_NOTE, {
      start: { jsonPath: '$.content[2].content[2].content[0].content[0]', offset: 2 },
      end: { jsonPath: '$.content[2].content[2].content[0].content[0]', offset: 2 },
    });

    expect(coverage).toEqual({ markerStates: {}, hasUncovered: false });
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

  it('treats a collapsed caret in unmarked text as uncovered', () => {
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: KOLO, offset: 2 },
      end: { jsonPath: KOLO, offset: 2 },
    });

    expect(coverage.markerStates).toEqual({});
    expect(coverage.hasUncovered).toBe(true);
  });

  it('degrades an end it can never reach to the start node alone', () => {
    // `end` precedes `start` in document order, so walking forward never arrives at it. Without the
    // degrade the walk runs to the end of the chapter and drags ' rest' in, reporting `bd` as
    // 'partial' over uncovered text.
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: MULU, offset: 0 },
      end: { jsonPath: KOLO, offset: 5 },
    });

    expect(coverage.markerStates.bd).toBe('all');
    expect(coverage.hasUncovered).toBe(false);
  });

  it('excludes an end that names a marker rather than its text', () => {
    // `end` is the gap in front of the `\bd` MarkerObject, the same position as offset 5 of 'kolo '.
    // Nothing of the marker is selected, so `bd` must not appear.
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: KOLO, offset: 0 },
      end: { jsonPath: '$.content[2].content[2]' },
    });

    expect(coverage.markerStates).toEqual({});
    expect(coverage.hasUncovered).toBe(true);
  });

  it('drops a trailing marker the selection stops short of', () => {
    // Ending at offset 0 of 'Mulu' selects up to the bold run without entering it. Untrimmed, the
    // whole of 'Mulu' would count and report `bd` as covering part of the selection.
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: KOLO, offset: 0 },
      end: { jsonPath: MULU, offset: 0 },
    });

    expect(coverage.markerStates).toEqual({});
    expect(coverage.hasUncovered).toBe(true);
  });

  it('drops trailing uncovered text the selection stops short of', () => {
    // The mirror of the case above: ending at offset 0 of ' rest' keeps the selection wholly inside
    // `\bd`. Untrimmed, ' rest' would count as uncovered and demote `bd` to 'partial'.
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: MULU, offset: 0 },
      end: { jsonPath: REST, offset: 0 },
    });

    expect(coverage.markerStates.bd).toBe('all');
    expect(coverage.hasUncovered).toBe(false);
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

// `\b` (empty) then `\p \v 1 \nd LORD\nd* said`. Paths:
//   $.content[2]                          → the empty `\b` paragraph
//   $.content[3].content[1].content[0]    → 'LORD' (inside \nd)
const USJ_EMPTY_B_THEN_ND: Usj = {
  type: 'USJ',
  version: '3.0',
  content: [
    { type: 'book', marker: 'id', code: 'PSA', content: ['PSA'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'PSA 1' },
    { type: 'para', marker: 'b', content: [] },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'PSA 1:1' },
        { type: 'char', marker: 'nd', content: ['LORD'] },
        ' said',
      ],
    },
  ],
};

// `\q1 \v 1 plain text` then `\q2 \wj spoken\wj*`. Paths:
//   $.content[2].content[1]               → 'plain text'
//   $.content[3]                          → the `\q2` paragraph
//   $.content[3].content[0]               → `\wj`
const USJ_POETRY: Usj = {
  type: 'USJ',
  version: '3.0',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['GEN'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 'q1',
      content: [{ type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' }, 'plain text'],
    },
    {
      type: 'para',
      marker: 'q2',
      content: [{ type: 'char', marker: 'wj', content: ['spoken'] }],
    },
  ],
};

// `\v 1 kolo \v 2 next`. Paths:
//   $.content[2].content[1]   → 'kolo '
//   $.content[2].content[2]   → the `\v 2` verse marker
const USJ_VERSE_AFTER_TEXT: Usj = {
  type: 'USJ',
  version: '3.0',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['GEN'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' },
        'kolo ',
        { type: 'verse', marker: 'v', number: '2', sid: 'GEN 1:2' },
        'next',
      ],
    },
  ],
};

// `\p \v 1 \nd In\nd* \bd the\bd* x` — identical ' ' strings at content[2] and content[4].
const USJ_DUPLICATE_SEPARATORS: Usj = {
  type: 'USJ',
  version: '3.0',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['GEN'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' },
        { type: 'char', marker: 'nd', content: ['In'] },
        ' ',
        { type: 'char', marker: 'bd', content: ['the'] },
        ' ',
        'x',
      ],
    },
  ],
};

describe('computeCharacterMarkerCoverage — non-text locations', () => {
  it("treats a start at an empty paragraph's marker name as the paragraph's start", () => {
    const coverage = computeCharacterMarkerCoverage(USJ_EMPTY_B_THEN_ND, {
      start: { jsonPath: "$.content[2]['marker']", propertyOffset: 1 },
      end: { jsonPath: '$.content[3].content[1].content[0]', offset: 4 },
    });

    expect(coverage).toEqual({ markerStates: { nd: 'all' }, hasUncovered: false });
  });

  it('measures nothing for a caret at an empty paragraph', () => {
    const coverage = computeCharacterMarkerCoverage(USJ_EMPTY_B_THEN_ND, {
      start: { jsonPath: "$.content[2]['marker']", propertyOffset: 1 },
    });

    expect(coverage).toEqual({ markerStates: {}, hasUncovered: false });
  });

  it("treats an end at a verse's number as the gap in front of that verse", () => {
    const coverage = computeCharacterMarkerCoverage(USJ_VERSE_AFTER_TEXT, {
      start: { jsonPath: '$.content[2].content[1]', offset: 0 },
      end: { jsonPath: "$.content[2].content[2]['number']", propertyOffset: 1 },
    });

    expect(coverage).toEqual({ markerStates: {}, hasUncovered: true });
  });

  it("excludes the next paragraph when the end names that paragraph's object", () => {
    const coverage = computeCharacterMarkerCoverage(USJ_POETRY, {
      start: { jsonPath: '$.content[2].content[1]', offset: 0 },
      end: { jsonPath: '$.content[3]' },
    });

    expect(coverage).toEqual({ markerStates: {}, hasUncovered: true });
  });

  it("excludes the next paragraph's first marker when the end names its opener", () => {
    const coverage = computeCharacterMarkerCoverage(USJ_POETRY, {
      start: { jsonPath: '$.content[2].content[1]', offset: 0 },
      end: { jsonPath: '$.content[3].content[0]' },
    });

    expect(coverage).toEqual({ markerStates: {}, hasUncovered: true });
  });

  it("begins after the marker's content for a start at its closing marker", () => {
    // From just after `\bd Mulu\bd*` into ' rest': the bold run is not selected.
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: '$.content[2].content[2]', closingMarkerOffset: 3 },
      end: { jsonPath: REST, offset: 3 },
    });

    expect(coverage).toEqual({ markerStates: {}, hasUncovered: true });
  });

  it("begins after the marker's content for a start at an attribute", () => {
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: '$.content[2].content[2]', keyName: 'lemma', keyOffset: 0 },
      end: { jsonPath: REST, offset: 3 },
    });

    expect(coverage).toEqual({ markerStates: {}, hasUncovered: true });
  });

  it("includes the marker's content for an end at its closing marker", () => {
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: MULU, offset: 2 },
      end: { jsonPath: '$.content[2].content[2]', closingMarkerOffset: 3 },
    });

    expect(coverage).toEqual({ markerStates: { bd: 'all' }, hasUncovered: false });
  });

  it("stops at the marker's content for an end at its closing marker when it starts before it", () => {
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: KOLO, offset: 0 },
      end: { jsonPath: '$.content[2].content[2]', closingMarkerOffset: 3 },
    });

    // 'kolo ' (5) + 'Mulu' (4); ' rest' stays out.
    expect(coverage).toEqual({ markerStates: { bd: 'partial' }, hasUncovered: true });
  });

  it('measures nothing for a caret just after a closing marker with nothing selected', () => {
    const coverage = computeCharacterMarkerCoverage(USJ_PARTIAL_BD, {
      start: { jsonPath: '$.content[2].content[2]', closingMarkerOffset: 3 },
    });

    expect(coverage).toEqual({ markerStates: {}, hasUncovered: false });
  });

  it('keeps the second of two identical separator strings distinct from the first', () => {
    const coverage = computeCharacterMarkerCoverage(USJ_DUPLICATE_SEPARATORS, {
      start: { jsonPath: '$.content[2].content[4]', offset: 1 },
    });

    expect(coverage).toEqual({ markerStates: {}, hasUncovered: true });
  });
});
