import { describe, expect, it } from 'vitest';
import { hasSameValue, initializeMarkerMappings } from './match-detection';
import type { ChecklistCell, ChecklistRow } from './checklist.types';

/**
 * Tests ported from `c-sharp-tests/Checklists/Markers/MarkersDataSourceTests.cs` — the
 * `HasSameValue` and `InitializeMarkerMappings` sections. The TS port surfaces the bidirectional
 * map as `ReadonlyMap<string, ReadonlySet<string>>` (instead of C#'s `IReadOnlyDictionary<string,
 * List<string>>`) — same lookup semantics, different concrete type.
 */

/** Builds a row containing the given cells. Convenience for hasSameValue tests. */
function makeRow(cells: ChecklistCell[]): ChecklistRow {
  return { cells, isMatch: false, includeEditLink: false, score: 0, firstRef: undefined };
}

/** Builds a cell with the given paragraph markers (no content items). */
function makeCell(markers: string[]): ChecklistCell {
  return {
    paragraphs: markers.map((marker) => ({ marker, items: [] })),
    reference: undefined,
    language: 'en',
    error: undefined,
  };
}

describe('initializeMarkerMappings', () => {
  it('empty input produces empty map', () => {
    expect(initializeMarkerMappings('').size).toBe(0);
  });

  it('whitespace-only input produces empty map', () => {
    expect(initializeMarkerMappings('   ').size).toBe(0);
  });

  it('null-ish input produces empty map (defensive — mirrors C# `?? ""` coercion)', () => {
    // The TS signature is `string`, but C# coerces null to empty via `?? ""`. Build the null at
    // runtime so the file stays free of literal `null`s.
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- defensive nullish check
    const nullishInput = JSON.parse('null') as unknown as string;
    expect(initializeMarkerMappings(nullishInput).size).toBe(0);
  });

  it('TS-016: "p/q q1/q2" stores both directions for both pairs (INV-005 bidirectional)', () => {
    const map = initializeMarkerMappings('p/q q1/q2');
    expect(map.get('p')).toEqual(new Set(['q']));
    expect(map.get('q')).toEqual(new Set(['p']));
    expect(map.get('q1')).toEqual(new Set(['q2']));
    expect(map.get('q2')).toEqual(new Set(['q1']));
  });

  it('TS-017: "q/q1 q/q2" accumulates [q1, q2] under "q"', () => {
    const map = initializeMarkerMappings('q/q1 q/q2');
    expect(map.get('q')).toEqual(new Set(['q1', 'q2']));
    expect(map.get('q1')).toEqual(new Set(['q']));
    expect(map.get('q2')).toEqual(new Set(['q']));
  });

  it('TS-018 / VAL-005: invalid tokens are silently skipped (lenient runtime parser)', () => {
    // C# `ParseEquivalentMarkerMappings` skips tokens whose split('/') length is not exactly 2.
    // 'invalid' (zero slashes) and 'p/q1/q2' (two slashes) are skipped; 'p/q' and 'good/bad'
    // remain. The 'q1'/'q2' from the skipped 3-part token must NOT have leaked through.
    const map = initializeMarkerMappings('p/q invalid p/q1/q2 good/bad');
    expect(map.get('p')).toEqual(new Set(['q']));
    expect(map.get('q')).toEqual(new Set(['p']));
    expect(map.get('good')).toEqual(new Set(['bad']));
    expect(map.get('bad')).toEqual(new Set(['good']));
    expect(map.has('invalid')).toBe(false);
    // q1 must not link to q2 via the skipped 3-part token.
    expect(map.get('q1')?.has('q2') ?? false).toBe(false);
  });
});

describe('hasSameValue', () => {
  it('TS-011: identical-marker pair across two cells matches (no mappings needed)', () => {
    const row = makeRow([makeCell(['p']), makeCell(['p'])]);
    expect(hasSameValue(row, new Map())).toBe(true);
  });

  it('TS-012: different markers without mapping do not match', () => {
    const row = makeRow([makeCell(['p']), makeCell(['q'])]);
    expect(hasSameValue(row, new Map())).toBe(false);
  });

  it('TS-013: bidirectional mapping (forward direction) makes mapped markers equivalent', () => {
    const row = makeRow([makeCell(['p']), makeCell(['q'])]);
    const mappings = initializeMarkerMappings('p/q');
    expect(hasSameValue(row, mappings)).toBe(true);
  });

  it('TS-013 (INV-005 reverse): reverse direction also matches via the bidirectional map', () => {
    // INV-005 CRITICAL: the help docs imply directional mapping (first-text/second-text), but the
    // code stores BOTH directions. Cells (q, p) with mapping "p/q" must match.
    const row = makeRow([makeCell(['q']), makeCell(['p'])]);
    const mappings = initializeMarkerMappings('p/q');
    expect(hasSameValue(row, mappings)).toBe(true);
  });

  it('TS-014: partial mapping fails when unmapped markers differ', () => {
    // cell1=[p, q1], cell2=[q, q2], mapping only has p<->q. q1/q2 are not mapped.
    const row = makeRow([makeCell(['p', 'q1']), makeCell(['q', 'q2'])]);
    const mappings = initializeMarkerMappings('p/q');
    expect(hasSameValue(row, mappings)).toBe(false);
  });

  it('TS-015: paragraph-count mismatch across cells returns false', () => {
    const row = makeRow([makeCell(['p', 'q1']), makeCell(['p'])]);
    expect(hasSameValue(row, new Map())).toBe(false);
  });

  it('TS-065: three-cell pairwise comparison — (0,1) match, (1,2) differ → row not a match', () => {
    const row = makeRow([makeCell(['p']), makeCell(['p']), makeCell(['q'])]);
    expect(hasSameValue(row, new Map())).toBe(false);
  });

  it('three-cell row with all identical markers matches', () => {
    const row = makeRow([makeCell(['p']), makeCell(['p']), makeCell(['p'])]);
    expect(hasSameValue(row, new Map())).toBe(true);
  });

  it('TS-066: empty cell vs populated cell → paragraph count mismatch → false', () => {
    const row = makeRow([makeCell(['p']), makeCell([])]);
    expect(hasSameValue(row, new Map())).toBe(false);
  });

  it('PT9 :230 — single-cell row is never a "match" (nothing to compare against)', () => {
    const row = makeRow([makeCell(['p'])]);
    expect(hasSameValue(row, new Map())).toBe(false);
  });

  it('zero-cell row is never a "match"', () => {
    expect(hasSameValue(makeRow([]), new Map())).toBe(false);
  });
});
