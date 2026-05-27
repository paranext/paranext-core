import { describe, it, expect, vi } from 'vitest';
import { Canon } from '@sillsdev/scripture';
import { buildChecklistData, isProjectNotFoundError } from './build-checklist-data';
import type { PapiLike } from './fetch-column-book-data';
import { SIMPLE_GENESIS_ONE_PARA, GENESIS_WITH_HEADING } from './test-fixtures/usj-fixtures';
import type { ChecklistRequest } from './build-checklist-data';

/**
 * Build a per-(projectId, key) lookup-driven papi mock. Each entry under `projects` describes one
 * project; the orchestrator's PDP fetches are dispatched off the projectId argument so multi-column
 * tests can vary per-project shapes (USJ, isEditable, name, etc.) independently. Verbose by design
 * — keeps test setup local-and-explicit per behavior under test.
 */
function makePapiMock(opts: {
  projects: Record<
    string,
    {
      usjPerBook?: Record<number, unknown>;
      headingMarkers?: string[];
      joinedTextLanguage?: string;
      isEditable?: boolean;
      textDirection?: 'ltr' | 'rtl';
      booksPresent?: string;
      name?: string;
      fullName?: string;
      missing?: true;
    }
  >;
}): PapiLike {
  const factory = async (type: string, projectId: string) => {
    const proj = opts.projects[projectId];
    if (!proj || proj.missing) throw new Error(`Project not found: ${projectId}`);

    if (type === 'platformScripture.USJ_Book')
      return {
        getBookUSJ: vi.fn().mockImplementation(
          // USJ_Book PDP takes SerializedVerseRef per platform-scripture.d.ts:262.
          async (verseRef: { book: string }) => {
            const n = Canon.bookIdToNumber(verseRef.book);
            return proj.usjPerBook?.[n] ?? { type: 'USJ', version: '3.1', content: [] };
          },
        ),
      };
    if (type === 'platformScripture.MarkerNames')
      return {
        getHeadingMarkers: vi.fn().mockResolvedValue(proj.headingMarkers ?? []),
        getJoinedTextLanguage: vi.fn().mockResolvedValue(proj.joinedTextLanguage ?? 'en'),
      };
    if (type === 'platform.base')
      return {
        getSetting: vi.fn().mockImplementation(async (key: string) => {
          if (key === 'platform.isEditable') return proj.isEditable ?? false;
          if (key === 'platform.textDirection') return proj.textDirection ?? 'ltr';
          if (key === 'platformScripture.booksPresent')
            return proj.booksPresent ?? `1${'0'.repeat(122)}`;
          if (key === 'platform.name') return proj.name ?? projectId;
          if (key === 'platform.fullName') return proj.fullName ?? proj.name ?? projectId;
          return undefined;
        }),
      };
    throw new Error(`Unknown PDP type: ${type}`);
  };
  return {
    projectDataProviders: {
      // Test-only mock: dispatch the overloaded `get` at runtime by string type, cast through
      // `unknown` so TS accepts the factory implementation against the overload union.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      get: vi
        .fn()
        .mockImplementation(factory) as unknown as PapiLike['projectDataProviders']['get'],
    },
  };
}

/** Default request scaffold for single-column tests; spread + override per test. */
function makeRequest(overrides: Partial<ChecklistRequest> = {}): ChecklistRequest {
  return {
    projectId: 'PROJ-1',
    comparativeTextIds: [],
    markerSettings: { equivalentMarkers: '', markerFilter: '' },
    verseRange: undefined,
    hideMatches: false,
    showVerseText: true,
    ...overrides,
  };
}

describe('buildChecklistData', () => {
  describe('basic single-column shape', () => {
    it('produces a ChecklistResult with one row for a single-book single-paragraph request', async () => {
      const papi = makePapiMock({
        projects: {
          'PROJ-1': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA }, name: 'TestProject' },
        },
      });

      const result = await buildChecklistData(makeRequest(), papi);

      expect(result.rows.length).toBeGreaterThan(0);
      expect(result.columnHeaders).toEqual(['TestProject']);
      expect(result.columnProjectIds).toEqual(['PROJ-1']);
      expect(result.excludedCount).toBe(0);
      expect(result.truncated).toBe(false);
    });

    it('groups all paragraphs at the same verseRef into ONE cell (per § 6)', async () => {
      // GENESIS_WITH_HEADING has: chapter 1, then a heading `\s`, then `\p` with verse 1.
      // The `\s` heading forward-scans (INV-009) to verse 1, so heading + p share verseRef GEN 1:1
      // and should land in ONE cell with 2 paragraphs.
      const papi = makePapiMock({
        projects: {
          'PROJ-1': {
            usjPerBook: { 1: GENESIS_WITH_HEADING },
            headingMarkers: ['s'],
            name: 'P1',
          },
        },
      });

      const result = await buildChecklistData(makeRequest(), papi);

      // Expect: exactly 1 row with 1 cell containing 2 paragraphs (s, p) at GEN 1:1.
      expect(result.rows.length).toBe(1);
      expect(result.rows[0].cells.length).toBe(1);
      expect(result.rows[0].cells[0].paragraphs.length).toBe(2);
      expect(result.rows[0].cells[0].paragraphs[0].marker).toBe('s');
      expect(result.rows[0].cells[0].paragraphs[1].marker).toBe('p');
    });

    it('single-column row.isMatch is always true (INV-002)', async () => {
      const papi = makePapiMock({
        projects: { 'PROJ-1': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA } } },
      });
      const result = await buildChecklistData(makeRequest(), papi);
      result.rows.forEach((row) => expect(row.isMatch).toBe(true));
    });

    it('cell.language is populated from joinedTextLanguage', async () => {
      const papi = makePapiMock({
        projects: {
          'PROJ-1': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA }, joinedTextLanguage: 'es' },
        },
      });
      const result = await buildChecklistData(makeRequest(), papi);
      expect(result.rows[0].cells[0].language).toBe('es');
    });

    it('row.firstRef carries the cell start verseRef', async () => {
      const papi = makePapiMock({
        projects: { 'PROJ-1': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA } } },
      });
      const result = await buildChecklistData(makeRequest(), papi);
      expect(result.rows[0].firstRef?.start).toEqual({
        book: 'GEN',
        chapterNum: 1,
        verseNum: 1,
      });
    });

    it('row.includeEditLink is true when first cell has a non-undefined reference', async () => {
      const papi = makePapiMock({
        projects: { 'PROJ-1': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA } } },
      });
      const result = await buildChecklistData(makeRequest(), papi);
      expect(result.rows[0].includeEditLink).toBe(true);
    });
  });

  describe('EditLinkItem placement', () => {
    it('appends EditLinkItem to last paragraph of each editable cell with a reference', async () => {
      const papi = makePapiMock({
        projects: {
          'PROJ-1': {
            usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA },
            isEditable: true,
            name: 'P1',
          },
        },
      });
      const result = await buildChecklistData(makeRequest(), papi);

      const cellParagraphs = result.rows[0].cells[0].paragraphs;
      const lastPara = cellParagraphs[cellParagraphs.length - 1];
      const editLinkItem = lastPara.items.find((item) => item.type === 'editLink');
      expect(editLinkItem).toBeDefined();
      expect(editLinkItem).toMatchObject({
        type: 'editLink',
        bookNum: 1,
        chapterNum: 1,
        verseNum: 1,
      });
    });

    it('does NOT append EditLinkItem when isEditable=false', async () => {
      const papi = makePapiMock({
        projects: {
          'PROJ-1': {
            usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA },
            isEditable: false,
          },
        },
      });
      const result = await buildChecklistData(makeRequest(), papi);
      const allItems = result.rows.flatMap((r) =>
        r.cells.flatMap((c) => c.paragraphs.flatMap((p) => p.items)),
      );
      expect(allItems.find((item) => item.type === 'editLink')).toBeUndefined();
    });

    it('does NOT append EditLinkItem to non-editable comparative columns', async () => {
      const papi = makePapiMock({
        projects: {
          'PROJ-1': {
            usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA },
            isEditable: true,
            name: 'Primary',
          },
          'PROJ-2': {
            usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA },
            isEditable: false,
            name: 'Comparative',
          },
        },
      });
      const result = await buildChecklistData(
        makeRequest({ comparativeTextIds: ['PROJ-2'] }),
        papi,
      );

      const primaryCell = result.rows[0].cells[0];
      const compCell = result.rows[0].cells[1];
      const primaryHasLink = primaryCell.paragraphs
        .flatMap((p) => p.items)
        .some((item) => item.type === 'editLink');
      const compHasLink = compCell.paragraphs
        .flatMap((p) => p.items)
        .some((item) => item.type === 'editLink');

      expect(primaryHasLink).toBe(true);
      expect(compHasLink).toBe(false);
    });
  });

  describe('multi-column match detection', () => {
    it('two-column identical content → all rows isMatch=true', async () => {
      const papi = makePapiMock({
        projects: {
          'PROJ-1': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA }, name: 'A' },
          'PROJ-2': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA }, name: 'B' },
        },
      });
      const result = await buildChecklistData(
        makeRequest({ comparativeTextIds: ['PROJ-2'] }),
        papi,
      );
      expect(result.columnHeaders).toEqual(['A', 'B']);
      result.rows.forEach((row) => expect(row.isMatch).toBe(true));
    });

    it('two-column differing markers → rows isMatch=false', async () => {
      const projAUsj = SIMPLE_GENESIS_ONE_PARA;
      const projBUsj = {
        type: 'USJ' as const,
        version: '3.1',
        content: [
          { type: 'book', marker: 'id', code: 'GEN', content: ['Genesis'] },
          { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
          {
            type: 'para',
            marker: 'q1', // <-- different marker from PROJ-1's 'p'
            content: [{ type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' }, 'text'],
          },
        ],
      };
      const papi = makePapiMock({
        projects: {
          'PROJ-1': { usjPerBook: { 1: projAUsj } },
          'PROJ-2': { usjPerBook: { 1: projBUsj } },
        },
      });
      const result = await buildChecklistData(
        makeRequest({ comparativeTextIds: ['PROJ-2'] }),
        papi,
      );
      expect(result.rows.length).toBeGreaterThan(0);
      result.rows.forEach((row) => expect(row.isMatch).toBe(false));
    });

    it('hideMatches=true drops matching rows and increments excludedCount', async () => {
      const papi = makePapiMock({
        projects: {
          'PROJ-1': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA } },
          'PROJ-2': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA } },
        },
      });
      const result = await buildChecklistData(
        makeRequest({ comparativeTextIds: ['PROJ-2'], hideMatches: true }),
        papi,
      );
      expect(result.rows.length).toBe(0);
      expect(result.excludedCount).toBeGreaterThan(0);
      // Empty result + empty filter → 'identical' variant (per § 7.2).
      expect(result.emptyResultMessage?.variant).toBe('identical');
    });
  });

  describe('empty-result message', () => {
    it('emptyResultMessage variant=identical when markerFilter is empty AND comparatives are present (UX-2 #3 backend)', async () => {
      // Use empty USJ on both columns so no rows are produced; empty filter + has comparatives →
      // 'identical' variant per UX-2 #3 (port of WP1).
      const papi = makePapiMock({
        projects: {
          'PROJ-1': { usjPerBook: { 1: { type: 'USJ', version: '3.1', content: [] } } },
          'PROJ-2': { usjPerBook: { 1: { type: 'USJ', version: '3.1', content: [] } } },
        },
      });
      const result = await buildChecklistData(
        makeRequest({ comparativeTextIds: ['PROJ-2'] }),
        papi,
      );
      expect(result.rows).toEqual([]);
      expect(result.emptyResultMessage).toBeDefined();
      expect(result.emptyResultMessage?.variant).toBe('identical');
      expect(result.emptyResultMessage?.searchedMarkers).toBeUndefined();
      expect(result.emptyResultMessage?.searchedBooks).toBeUndefined();
    });

    it('emptyResultMessage variant=noResults when markerFilter is empty AND there are NO comparatives (UX-2 #3 backend)', async () => {
      // Single-column + empty filter + empty result → 'noResults' (not 'identical'). Pre-WP1 the
      // identical-markers variant fired here, which surfaced "Comparative texts have identical
      // markers." even though there were no comparatives to compare against — UX-2 #3 fixes this.
      const papi = makePapiMock({
        projects: {
          'PROJ-1': { usjPerBook: { 1: { type: 'USJ', version: '3.1', content: [] } } },
        },
      });
      const result = await buildChecklistData(makeRequest(), papi);
      expect(result.rows).toEqual([]);
      expect(result.emptyResultMessage?.variant).toBe('noResults');
      expect(result.emptyResultMessage?.message).toBe('');
      // markerFilter is empty → searchedMarkers is an empty array (no markers were searched).
      expect(result.emptyResultMessage?.searchedMarkers).toEqual([]);
      expect(result.emptyResultMessage?.searchedBooks).toEqual(['GEN']);
    });

    it('emptyResultMessage variant=noResults when markerFilter is non-empty', async () => {
      const papi = makePapiMock({
        projects: {
          'PROJ-1': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA } },
        },
      });
      const result = await buildChecklistData(
        makeRequest({ markerSettings: { equivalentMarkers: '', markerFilter: 'nonexistent' } }),
        papi,
      );
      expect(result.rows).toEqual([]);
      expect(result.emptyResultMessage?.variant).toBe('noResults');
      expect(result.emptyResultMessage?.message).toBe('');
      expect(result.emptyResultMessage?.searchedMarkers).toEqual(['nonexistent']);
      expect(result.emptyResultMessage?.searchedBooks).toEqual(['GEN']);
    });

    it('no emptyResultMessage when rows are present', async () => {
      const papi = makePapiMock({
        projects: { 'PROJ-1': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA } } },
      });
      const result = await buildChecklistData(makeRequest(), papi);
      expect(result.emptyResultMessage).toBeUndefined();
    });
  });

  describe('markerFilter parsing (§ 7.1 — VAL-001 backslash strip)', () => {
    it('strips backslashes from markerFilter input before tokenizing', async () => {
      const papi = makePapiMock({
        projects: { 'PROJ-1': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA } } },
      });
      // User types `\p` — backslash must be stripped so the filter matches the `p` paragraph.
      const result = await buildChecklistData(
        makeRequest({ markerSettings: { equivalentMarkers: '', markerFilter: '\\p' } }),
        papi,
      );
      expect(result.rows.length).toBeGreaterThan(0);
    });

    it('tokenizes whitespace-separated markers into a filter set', async () => {
      const papi = makePapiMock({
        projects: { 'PROJ-1': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA } } },
      });
      const result = await buildChecklistData(
        makeRequest({ markerSettings: { equivalentMarkers: '', markerFilter: 'q1 nonexistent' } }),
        papi,
      );
      // SIMPLE_GENESIS_ONE_PARA has only `p`, neither q1 nor nonexistent — empty result, noResults
      // variant, both searched markers preserved.
      expect(result.rows).toEqual([]);
      expect(result.emptyResultMessage?.variant).toBe('noResults');
      expect(result.emptyResultMessage?.searchedMarkers?.sort()).toEqual(
        ['nonexistent', 'q1'].sort(),
      );
    });
  });

  describe('error handling', () => {
    it('throws ProjectNotFoundError when a column projectId fails to resolve', async () => {
      const papi = makePapiMock({
        projects: {
          'PROJ-1': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA } },
          MISSING: { missing: true },
        },
      });
      const promise = buildChecklistData(makeRequest({ comparativeTextIds: ['MISSING'] }), papi);
      await expect(promise).rejects.toSatisfy(isProjectNotFoundError);
    });
  });

  describe('column headers (§ 7.3)', () => {
    it('reads platform.name (short name) as the column header', async () => {
      const papi = makePapiMock({
        projects: {
          'PROJ-1': {
            usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA },
            name: 'TPTS',
            fullName: 'TPTS Full',
          },
        },
      });
      const result = await buildChecklistData(makeRequest(), papi);
      expect(result.columnHeaders).toEqual(['TPTS']);
    });
  });

  describe('verseRange resolution (ScriptureRange contract)', () => {
    it('verseRange.end === undefined → single-verse range at verseRange.start (does NOT expand to project end)', async () => {
      // Pre-fix: when `verseRange.end` was undefined we fell back to REV 22:21, expanding a
      // single-verse request into a whole-project scan. ScriptureRange contract (per PT9's
      // ChecklistService.ResolveVerseRange) says omitted end collapses to start.
      //
      // Fixture: GEN 1:1 (\p) + GEN 1:2 (\q1) — request {start: GEN 1:1, end: undefined} must yield
      // only the GEN 1:1 row (not GEN 1:2). Pre-fix behavior expanded to REV 22:21 and would have
      // pulled in the GEN 1:2 row as well.
      const twoVerseUsj = {
        type: 'USJ' as const,
        version: '3.1',
        content: [
          { type: 'book', marker: 'id', code: 'GEN', content: ['Genesis'] },
          { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
          {
            type: 'para',
            marker: 'p',
            content: [{ type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' }, 'verse 1'],
          },
          {
            type: 'para',
            marker: 'q1',
            content: [{ type: 'verse', marker: 'v', number: '2', sid: 'GEN 1:2' }, 'verse 2'],
          },
        ],
      };
      const papi = makePapiMock({
        projects: { 'PROJ-1': { usjPerBook: { 1: twoVerseUsj } } },
      });
      const result = await buildChecklistData(
        makeRequest({
          verseRange: { start: { book: 'GEN', chapterNum: 1, verseNum: 1 } },
        }),
        papi,
      );
      // Only GEN 1:1 — single-verse range.
      expect(result.rows.length).toBe(1);
      expect(result.rows[0].firstRef?.start).toEqual({
        book: 'GEN',
        chapterNum: 1,
        verseNum: 1,
      });
    });

    it('verseRange.end defined → uses both ends as-supplied', async () => {
      const twoVerseUsj = {
        type: 'USJ' as const,
        version: '3.1',
        content: [
          { type: 'book', marker: 'id', code: 'GEN', content: ['Genesis'] },
          { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
          {
            type: 'para',
            marker: 'p',
            content: [{ type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' }, 'verse 1'],
          },
          {
            type: 'para',
            marker: 'q1',
            content: [{ type: 'verse', marker: 'v', number: '2', sid: 'GEN 1:2' }, 'verse 2'],
          },
        ],
      };
      const papi = makePapiMock({
        projects: { 'PROJ-1': { usjPerBook: { 1: twoVerseUsj } } },
      });
      const result = await buildChecklistData(
        makeRequest({
          verseRange: {
            start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
            end: { book: 'GEN', chapterNum: 1, verseNum: 2 },
          },
        }),
        papi,
      );
      // Both verses included.
      expect(result.rows.length).toBe(2);
    });
  });

  describe('booksPresent intersection', () => {
    it('skips books absent from booksPresent setting', async () => {
      // booksPresent = '00...' (no books) → no rows iterated. Single-column + empty filter →
      // 'noResults' variant per UX-2 #3 (no comparatives, so 'identical markers' doesn't apply).
      const papi = makePapiMock({
        projects: {
          'PROJ-1': { usjPerBook: { 1: SIMPLE_GENESIS_ONE_PARA }, booksPresent: '0'.repeat(123) },
        },
      });
      const result = await buildChecklistData(makeRequest(), papi);
      expect(result.rows).toEqual([]);
      expect(result.emptyResultMessage?.variant).toBe('noResults');
    });
  });
});
