import { describe, it, expect } from 'vitest';
import {
  presentDictionaryEntry,
  type DictionaryEntryDataInput,
  type DictionaryPresenterOptions,
  type DictionaryEntryPresentation,
} from './dictionary-presenter';

/**
 * RED-phase tests for `dictionary-presenter` — the pure-TypeScript presentation module that sits
 * between the C# `DictionaryEntryData` DTO (returned by PAPI command
 * `object:platform.enhancedResources.readDictionaryEntry`, see
 * `.context/features/enhanced-resources/data-contracts.md` §4.8) and the React UI types
 * (`DictionaryDisplayItemData`, `DictionaryEntryRef`, `DictionarySenseDisplay`) consumed by
 * `DictionaryTab` / `DictionaryEntryDetail` / `DictionarySenseItem`.
 *
 * The presenter is intentionally pure: no React, no PAPI, no async, no I/O. All settings,
 * translation lookups, and per-token relevance/occurrence data are passed in by the caller.
 *
 * Forward-note coverage:
 *
 * - **FN-019** — Backend C# loader gaps for `Sense.Comments`, `Lexicon_Note`, `LEXSubDomains`. Inputs
 *   may arrive with these fields undefined; the presenter still emits the entry with empty strings
 *   (`comment: ''`, `notes: ''`, `commentsAndNotes: ''`) and `domains: []`. The UI ships
 *   visually-empty rows; backend fills the data later.
 * - **FN-021** — Dictionary `Domain:` rows must be clickable, opening SDV filtered-by-domain. The
 *   presenter emits each domain as a structured `DomainLink` carrying both the display label and
 *   the click payload (`id`, `domainPath`, `dictionaryId`).
 * - **FN-022** — Sense-level occurrences link is number-only with a descriptive tooltip. The
 *   presenter emits `senseOccurrences: { count, tooltip }` for each sense; the tooltip is built
 *   from the lexeme, sense number, total count and (where available) verse-range summary.
 *
 * Decisions baked into this test contract (so the implementer knows what the test author chose):
 *
 * 1. Single export: `presentDictionaryEntry(input, options) => DictionaryEntryPresentation |
 *    undefined`. Undefined input -> undefined output (the caller renders an empty/loading state).
 * 2. The input shape is an extended `DictionaryEntryData` that admits the FN-019 forward fields as
 *    optional (`senses[i].comments`, `senses[i].subDomains`, `lexiconNote` per sense). This lets
 *    the presenter accept both today's DTO and tomorrow's enriched DTO without a type change.
 * 3. Gloss filtering: pick the gloss whose `language` matches `options.glossLanguage`. If no match,
 *    fall back to the first gloss. If the sense has no glosses, emit `glosses: ''`.
 * 4. POS translation: `options.translatePartOfSpeech(rawPos)` is called once with `entry.morphology`.
 *    The result populates entry-level `partOfSpeech`. If `morphology` is empty, `partOfSpeech` is
 *    `''` (the function is NOT called).
 * 5. Hebrew/Greek display mode: `options.resourceLanguage` selects which mode applies. `'script'` ->
 *    `displaySource = lemma`. `'translit'` -> `displaySource = translit`. `'both'` ->
 *    `displaySource = '<lemma> (<translit>)'`. The presenter does NOT compute the transliteration
 *    itself — caller supplies `options.transliterate(lemma)` so the presenter stays pure.
 * 6. Relevance: `options.relevantSenseIds: Set<string>`. A sense is relevant when its id is in the
 *    set. When `options.hideLessRelevantSenses === true`, non-relevant senses are filtered out
 *    entirely. When `false`, they are emitted with `isRelevant: false` so the UI greys them.
 * 7. Sense numbering: 1-based by output position (after the optional hide-less-relevant filter).
 * 8. Tooltip text uses a template `options.formatSenseOccurrencesTooltip({ senseNumber, lexeme, count,
 *    verseRangeLabel })`. Caller owns localization; presenter is pure.
 * 9. `verseOccurrencesBySenseId` is a sparse map keyed by `senseId`. Senses missing from the map
 *    receive `count: 0` and the tooltip omits the verse-range substring (caller's template handles
 *    the empty case via `verseRangeLabel: ''`).
 * 10. The output uses full `toEqual` comparisons against fixture objects so the contract is
 *     unambiguous. Field defaults (`''` vs `undefined`) are part of the contract.
 */

// ---------------------------------------------------------------------------
// Fixture builders
// ---------------------------------------------------------------------------

/** Build a minimally valid `DictionaryEntryData` payload with explicit overrides. */
function buildEntry(overrides: Partial<DictionaryEntryDataInput> = {}): DictionaryEntryDataInput {
  return {
    entryId: 'entry-001',
    lemma: 'ἀγάπη',
    morphology: 'noun-fem',
    semanticDomains: [],
    senses: [],
    ...overrides,
  };
}

/** Default presenter options used in tests; tests override only what they need to. */
function buildOptions(
  overrides: Partial<DictionaryPresenterOptions> = {},
): DictionaryPresenterOptions {
  return {
    glossLanguage: 'en',
    resourceLanguage: 'grc',
    hebrewDisplayMode: 'script',
    greekDisplayMode: 'script',
    hideLessRelevantSenses: false,
    relevantSenseIds: new Set<string>(),
    lexeme: 'ἀγάπη',
    transliterate: (lemma) => `xlit(${lemma})`,
    translatePartOfSpeech: (raw) => `pos(${raw})`,
    verseOccurrencesBySenseId: {},
    formatSenseOccurrencesTooltip: ({ senseNumber, lexeme, count, verseRangeLabel }) =>
      verseRangeLabel
        ? `tooltip:${senseNumber}|${lexeme}|${count}|${verseRangeLabel}`
        : `tooltip:${senseNumber}|${lexeme}|${count}`,
    formatVerseRange: (refs) => (refs.length === 0 ? '' : `range:${refs.length}`),
    totalOccurrencesCount: 0,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('dictionary-presenter', () => {
  describe('happy path — fully populated entry', () => {
    it('produces a complete DictionaryEntryPresentation with all expected fields', () => {
      const input = buildEntry({
        entryId: 'entry-042',
        lemma: 'ἀγάπη',
        morphology: 'noun-fem',
        semanticDomains: ['25.43'],
        senses: [
          {
            senseId: 'sense-1',
            definition: 'love, affectionate regard',
            glosses: [
              { language: 'en', text: 'love' },
              { language: 'de', text: 'Liebe' },
            ],
            // FN-019 forward fields, populated:
            comments: 'A common NT term.',
            lexiconNote: 'See related: φιλέω.',
            subDomains: [
              { id: '25.43.1', label: 'Affection > Love', domainPath: '25/25.43/25.43.1' },
            ],
          },
        ],
      });
      const options = buildOptions({
        lexeme: 'ἀγάπη',
        relevantSenseIds: new Set(['sense-1']),
        verseOccurrencesBySenseId: {
          'sense-1': [
            { book: 1, chapter: 1, verse: 1 },
            { book: 1, chapter: 1, verse: 2 },
            { book: 1, chapter: 2, verse: 5 },
          ],
        },
        totalOccurrencesCount: 17,
        translatePartOfSpeech: (raw) => (raw === 'noun-fem' ? 'noun (feminine)' : raw),
      });

      const result = presentDictionaryEntry(input, options);

      const expected: DictionaryEntryPresentation = {
        tokenId: 'entry-042',
        sourceText: 'ἀγάπη',
        translit: 'xlit(ἀγάπη)',
        displaySource: 'ἀγάπη',
        partOfSpeech: 'noun (feminine)',
        totalOccurrencesInAllBooks: 17,
        dictionaryId: 'SDBG',
        senses: [
          {
            id: 'sense-1',
            senseNumber: 1,
            definition: 'love, affectionate regard',
            glosses: 'love',
            domains: [
              {
                id: '25.43.1',
                label: 'Affection > Love',
                domainPath: '25/25.43/25.43.1',
                dictionaryId: 'SDBG',
              },
            ],
            notes: 'See related: φιλέω.',
            comment: 'A common NT term.',
            commentsAndNotes: '',
            isRelevant: true,
            senseOccurrences: {
              count: 3,
              tooltip: 'tooltip:1|ἀγάπη|3|range:3',
            },
          },
        ],
      };

      expect(result).toEqual(expected);
    });
  });

  describe('FN-019 — missing optional sense-level fields produce blank rows, not omissions', () => {
    it('emits comment="", notes="", commentsAndNotes="", domains=[] when the input omits them', () => {
      const input = buildEntry({
        entryId: 'entry-fn019',
        lemma: 'יְשׁוּעָה',
        morphology: 'noun',
        senses: [
          {
            senseId: 'sense-fn019',
            definition: 'salvation, deliverance',
            glosses: [{ language: 'en', text: 'salvation' }],
            // FN-019 fields all undefined — backend C# loader does not populate them yet.
          },
        ],
      });
      const options = buildOptions({
        lexeme: 'יְשׁוּעָה',
        resourceLanguage: 'heb',
        relevantSenseIds: new Set(['sense-fn019']),
        translatePartOfSpeech: (raw) => raw,
      });

      const result = presentDictionaryEntry(input, options);

      // The whole sense fixture is asserted to lock in the exact blank-row contract.
      expect(result?.senses[0]).toEqual({
        id: 'sense-fn019',
        senseNumber: 1,
        definition: 'salvation, deliverance',
        glosses: 'salvation',
        domains: [], // FN-019: undefined input -> empty array (not undefined).
        notes: '', // FN-019: undefined Lexicon_Note -> empty string.
        comment: '', // FN-019: undefined Sense.Comments -> empty string.
        commentsAndNotes: '', // FN-019: combined-block default is empty string.
        isRelevant: true,
        senseOccurrences: {
          count: 0,
          tooltip: 'tooltip:1|יְשׁוּעָה|0',
        },
      });
    });

    it('does not throw and does not filter the row out when FN-019 fields are absent', () => {
      const input = buildEntry({
        senses: [
          {
            senseId: 's1',
            definition: 'def',
            glosses: [{ language: 'en', text: 'g' }],
          },
        ],
      });
      const options = buildOptions({ relevantSenseIds: new Set(['s1']) });

      const result = presentDictionaryEntry(input, options);

      expect(result).toBeDefined();
      expect(result?.senses).toHaveLength(1);
      expect(result?.senses[0]?.id).toBe('s1');
    });
  });

  describe('FN-021 — domain link surfacing', () => {
    it('emits each subDomain as a structured DomainLink with click-payload fields', () => {
      const input = buildEntry({
        entryId: 'entry-fn021',
        lemma: 'ἀγάπη',
        senses: [
          {
            senseId: 'sense-fn021',
            definition: 'love',
            glosses: [{ language: 'en', text: 'love' }],
            subDomains: [
              { id: '25.43', label: 'Affection', domainPath: '25/25.43' },
              { id: '25.43.1', label: 'Love', domainPath: '25/25.43/25.43.1' },
            ],
          },
        ],
      });
      const options = buildOptions({
        relevantSenseIds: new Set(['sense-fn021']),
        resourceLanguage: 'grc',
      });

      const result = presentDictionaryEntry(input, options);

      // Each domain must carry: id (stable key), label (visible text), domainPath (SDV click
      // payload), dictionaryId (routes to SDBH/SDBG SDV instance per FN-021).
      expect(result?.senses[0]?.domains).toEqual([
        {
          id: '25.43',
          label: 'Affection',
          domainPath: '25/25.43',
          dictionaryId: 'SDBG',
        },
        {
          id: '25.43.1',
          label: 'Love',
          domainPath: '25/25.43/25.43.1',
          dictionaryId: 'SDBG',
        },
      ]);
    });

    it('routes domain dictionaryId to SDBH for Hebrew resources', () => {
      const input = buildEntry({
        lemma: 'יְשׁוּעָה',
        senses: [
          {
            senseId: 's1',
            definition: 'd',
            glosses: [{ language: 'en', text: 'g' }],
            subDomains: [{ id: '21.1', label: 'Rescue', domainPath: '21/21.1' }],
          },
        ],
      });
      const options = buildOptions({
        relevantSenseIds: new Set(['s1']),
        resourceLanguage: 'heb',
      });

      const result = presentDictionaryEntry(input, options);

      expect(result?.senses[0]?.domains[0]?.dictionaryId).toBe('SDBH');
    });
  });

  describe('FN-022 — occurrences as count + descriptive tooltip', () => {
    it('emits both the numeric count and the tooltip string for each sense', () => {
      const input = buildEntry({
        lemma: 'בָּרָא',
        senses: [
          {
            senseId: 's1',
            definition: 'create',
            glosses: [{ language: 'en', text: 'create' }],
          },
          {
            senseId: 's2',
            definition: 'shape',
            glosses: [{ language: 'en', text: 'shape' }],
          },
        ],
      });
      const options = buildOptions({
        lexeme: 'בָּרָא',
        relevantSenseIds: new Set(['s1', 's2']),
        verseOccurrencesBySenseId: {
          s1: [
            { book: 1, chapter: 1, verse: 1 },
            { book: 1, chapter: 1, verse: 21 },
            { book: 1, chapter: 1, verse: 27 },
          ],
          s2: [{ book: 23, chapter: 43, verse: 1 }],
        },
        formatVerseRange: (refs) => `Genesis 1-${refs.length}`, // deterministic stub
        formatSenseOccurrencesTooltip: ({ senseNumber, lexeme, count, verseRangeLabel }) =>
          `Find sense ${senseNumber} of ${lexeme} in all books (${count} occurrences in ${verseRangeLabel})`,
      });

      const result = presentDictionaryEntry(input, options);

      expect(result?.senses[0]?.senseOccurrences).toEqual({
        count: 3,
        tooltip: 'Find sense 1 of בָּרָא in all books (3 occurrences in Genesis 1-3)',
      });
      expect(result?.senses[1]?.senseOccurrences).toEqual({
        count: 1,
        tooltip: 'Find sense 2 of בָּרָא in all books (1 occurrences in Genesis 1-1)',
      });
    });

    it('emits count=0 and a tooltip without verseRangeLabel when no occurrences are supplied for a sense', () => {
      const input = buildEntry({
        lemma: 'foo',
        senses: [{ senseId: 's-empty', definition: 'd', glosses: [{ language: 'en', text: 'g' }] }],
      });
      const options = buildOptions({
        lexeme: 'foo',
        relevantSenseIds: new Set(['s-empty']),
        verseOccurrencesBySenseId: {}, // no entry for s-empty
      });

      const result = presentDictionaryEntry(input, options);

      expect(result?.senses[0]?.senseOccurrences).toEqual({
        count: 0,
        tooltip: 'tooltip:1|foo|0', // default builder omits verseRangeLabel branch
      });
    });
  });

  describe('POS translation', () => {
    it('passes raw entry.morphology through translatePartOfSpeech', () => {
      const calls: string[] = [];
      const input = buildEntry({ morphology: 'verb-perfect' });
      const options = buildOptions({
        translatePartOfSpeech: (raw) => {
          calls.push(raw);
          return `translated(${raw})`;
        },
      });

      const result = presentDictionaryEntry(input, options);

      expect(result?.partOfSpeech).toBe('translated(verb-perfect)');
      expect(calls).toEqual(['verb-perfect']);
    });

    it('emits empty partOfSpeech and does NOT invoke the translator when morphology is empty', () => {
      let invoked = false;
      const input = buildEntry({ morphology: '' });
      const options = buildOptions({
        translatePartOfSpeech: () => {
          invoked = true;
          return 'should-not-run';
        },
      });

      const result = presentDictionaryEntry(input, options);

      expect(result?.partOfSpeech).toBe('');
      expect(invoked).toBe(false);
    });
  });

  describe('gloss filtering by glossLanguage preference', () => {
    it('selects the gloss whose language matches options.glossLanguage', () => {
      const input = buildEntry({
        senses: [
          {
            senseId: 's1',
            definition: 'd',
            glosses: [
              { language: 'en', text: 'love' },
              { language: 'de', text: 'Liebe' },
              { language: 'fr', text: 'amour' },
            ],
          },
        ],
      });
      const options = buildOptions({
        glossLanguage: 'de',
        relevantSenseIds: new Set(['s1']),
      });

      const result = presentDictionaryEntry(input, options);

      expect(result?.senses[0]?.glosses).toBe('Liebe');
    });

    it('falls back to the first gloss when the requested language is not available', () => {
      const input = buildEntry({
        senses: [
          {
            senseId: 's1',
            definition: 'd',
            glosses: [
              { language: 'en', text: 'love' },
              { language: 'de', text: 'Liebe' },
            ],
          },
        ],
      });
      const options = buildOptions({
        glossLanguage: 'fr', // not present
        relevantSenseIds: new Set(['s1']),
      });

      const result = presentDictionaryEntry(input, options);

      expect(result?.senses[0]?.glosses).toBe('love');
    });

    it('emits empty glosses when the sense has no glosses', () => {
      const input = buildEntry({
        senses: [
          {
            senseId: 's1',
            definition: 'd',
            glosses: [],
          },
        ],
      });
      const options = buildOptions({ relevantSenseIds: new Set(['s1']) });

      const result = presentDictionaryEntry(input, options);

      expect(result?.senses[0]?.glosses).toBe('');
    });
  });

  describe('Hebrew/Greek display modes (FN-017 effects on dictionary)', () => {
    it('script mode -> displaySource is the lemma', () => {
      const input = buildEntry({ lemma: 'ἀγάπη' });
      const options = buildOptions({
        resourceLanguage: 'grc',
        greekDisplayMode: 'script',
        transliterate: () => 'agape',
      });

      const result = presentDictionaryEntry(input, options);

      expect(result?.displaySource).toBe('ἀγάπη');
    });

    it('translit mode -> displaySource is the transliteration', () => {
      const input = buildEntry({ lemma: 'ἀγάπη' });
      const options = buildOptions({
        resourceLanguage: 'grc',
        greekDisplayMode: 'translit',
        transliterate: () => 'agape',
      });

      const result = presentDictionaryEntry(input, options);

      expect(result?.displaySource).toBe('agape');
    });

    it('both mode -> displaySource is "<lemma> (<translit>)"', () => {
      const input = buildEntry({ lemma: 'ἀγάπη' });
      const options = buildOptions({
        resourceLanguage: 'grc',
        greekDisplayMode: 'both',
        transliterate: () => 'agape',
      });

      const result = presentDictionaryEntry(input, options);

      expect(result?.displaySource).toBe('ἀγάπη (agape)');
    });

    it('routes by resourceLanguage — Hebrew uses hebrewDisplayMode, Greek uses greekDisplayMode', () => {
      const input = buildEntry({ lemma: 'יְשׁוּעָה' });
      const optionsHeb = buildOptions({
        resourceLanguage: 'heb',
        hebrewDisplayMode: 'translit',
        greekDisplayMode: 'script', // should be ignored for Hebrew resource
        transliterate: () => 'yeshuah',
      });

      const result = presentDictionaryEntry(input, optionsHeb);

      expect(result?.displaySource).toBe('yeshuah');
    });
  });

  describe('"hide non-relevant senses" toggle', () => {
    function entryWithMixedRelevance() {
      return buildEntry({
        senses: [
          {
            senseId: 'sense-A',
            definition: 'relevant def',
            glosses: [{ language: 'en', text: 'A' }],
          },
          {
            senseId: 'sense-B',
            definition: 'less-relevant def',
            glosses: [{ language: 'en', text: 'B' }],
          },
          {
            senseId: 'sense-C',
            definition: 'also relevant',
            glosses: [{ language: 'en', text: 'C' }],
          },
        ],
      });
    }

    it('hideLessRelevantSenses=false marks non-relevant senses with isRelevant=false (kept in list)', () => {
      const result = presentDictionaryEntry(
        entryWithMixedRelevance(),
        buildOptions({
          hideLessRelevantSenses: false,
          relevantSenseIds: new Set(['sense-A', 'sense-C']),
        }),
      );

      expect(result?.senses).toHaveLength(3);
      expect(result?.senses.map((s) => ({ id: s.id, isRelevant: s.isRelevant }))).toEqual([
        { id: 'sense-A', isRelevant: true },
        { id: 'sense-B', isRelevant: false },
        { id: 'sense-C', isRelevant: true },
      ]);
    });

    it('hideLessRelevantSenses=true filters non-relevant senses out and renumbers the rest', () => {
      const result = presentDictionaryEntry(
        entryWithMixedRelevance(),
        buildOptions({
          hideLessRelevantSenses: true,
          relevantSenseIds: new Set(['sense-A', 'sense-C']),
        }),
      );

      expect(result?.senses).toHaveLength(2);
      expect(result?.senses.map((s) => ({ id: s.id, senseNumber: s.senseNumber }))).toEqual([
        { id: 'sense-A', senseNumber: 1 },
        { id: 'sense-C', senseNumber: 2 }, // renumbered after B is removed
      ]);
    });
  });

  describe('empty-input edge cases', () => {
    it('returns undefined when entry input is undefined', () => {
      const result = presentDictionaryEntry(undefined, buildOptions());
      expect(result).toBeUndefined();
    });

    it('returns an entry with senses=[] when the entry has zero senses (does not throw)', () => {
      const input = buildEntry({ entryId: 'empty-entry', lemma: 'foo', senses: [] });
      const options = buildOptions({ lexeme: 'foo' });

      const result = presentDictionaryEntry(input, options);

      expect(result).toBeDefined();
      expect(result?.senses).toEqual([]);
      expect(result?.tokenId).toBe('empty-entry');
    });
  });
});
