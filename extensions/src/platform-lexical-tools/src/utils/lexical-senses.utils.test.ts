import { describe, it, expect } from 'vitest';
import { Entry, Occurrence, Sense } from 'platform-lexical-tools';
import { collapseToLexicalSenses } from './lexical-senses.utils';

const LEXICAL_ID = '001555002001000';
const CONTEXTUAL_ID_1 = '001555002001001';
const CONTEXTUAL_ID_2 = '001555002001002';
const SOURCE_TEXT = 'BHS';

const occurrence = (book: string, chapterNum: number, wordNum = 1): Occurrence => ({
  verseRef: { book, chapterNum, verseNum: 1 },
  wordNum,
});

const sense = (id: string, occurrences: Sense['occurrences'] = {}): Sense => ({
  id,
  entryId: 'entry',
  lexicalReferenceTextId: 'SDBH',
  lexicalReferenceTextVersion: '1',
  bcp47Code: 'en',
  glosses: [id],
  strongsCodes: [],
  occurrences,
  domains: [],
});

const entryWith = (...senses: Sense[]): Entry => {
  // These are not fully constructed Entry objects, but they are sufficient for testing so I asserted them.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { senses: Object.fromEntries(senses.map((s) => [s.id, s])) } as unknown as Entry;
};

describe('collapseToLexicalSenses', () => {
  it('returns only the lexical sense when contextual children exist', () => {
    const result = collapseToLexicalSenses(
      entryWith(sense(LEXICAL_ID), sense(CONTEXTUAL_ID_1), sense(CONTEXTUAL_ID_2)),
    );
    expect(Object.keys(result.senses)).toEqual([LEXICAL_ID]);
  });

  it('adds contextual occurrences to the parent', () => {
    const result = collapseToLexicalSenses(
      entryWith(
        sense(LEXICAL_ID, { [SOURCE_TEXT]: [occurrence('GEN', 1)] }),
        sense(CONTEXTUAL_ID_1, { [SOURCE_TEXT]: [occurrence('EXO', 2)] }),
      ),
    );
    expect(result.senses[LEXICAL_ID]?.occurrences[SOURCE_TEXT]).toEqual([
      occurrence('GEN', 1),
      occurrence('EXO', 2),
    ]);
  });

  it('does not duplicate an occurrence held by parent and child', () => {
    const result = collapseToLexicalSenses(
      entryWith(
        sense(LEXICAL_ID, { [SOURCE_TEXT]: [occurrence('GEN', 1)] }),
        sense(CONTEXTUAL_ID_1, { [SOURCE_TEXT]: [occurrence('GEN', 1)] }),
      ),
    );
    expect(result.senses[LEXICAL_ID]?.occurrences[SOURCE_TEXT]).toHaveLength(1);
  });

  it('keeps distinct words in one verse', () => {
    const result = collapseToLexicalSenses(
      entryWith(
        sense(LEXICAL_ID, { [SOURCE_TEXT]: [occurrence('GEN', 1, 1)] }),
        sense(CONTEXTUAL_ID_1, { [SOURCE_TEXT]: [occurrence('GEN', 1, 2)] }),
      ),
    );
    expect(result.senses[LEXICAL_ID]?.occurrences[SOURCE_TEXT]).toHaveLength(2);
  });

  it('merges occurrences across source text IDs', () => {
    const result = collapseToLexicalSenses(
      entryWith(
        sense(LEXICAL_ID, { [SOURCE_TEXT]: [occurrence('GEN', 1)] }),
        sense(CONTEXTUAL_ID_1, { OTHER: [occurrence('EXO', 2)] }),
      ),
    );
    expect(result.senses[LEXICAL_ID]?.occurrences.OTHER).toEqual([occurrence('EXO', 2)]);
  });

  it('keeps a contextual sense whose parent is missing', () => {
    const result = collapseToLexicalSenses(entryWith(sense(CONTEXTUAL_ID_1)));
    expect(result.senses[CONTEXTUAL_ID_1]).toBeDefined();
  });

  it('leaves non-15-digit IDs unchanged', () => {
    const result = collapseToLexicalSenses(entryWith(sense('abc'), sense('123000')));
    expect(Object.keys(result.senses).sort()).toEqual(['123000', 'abc']);
  });

  it('does not mutate its input', () => {
    const lexical = sense(LEXICAL_ID, { [SOURCE_TEXT]: [occurrence('GEN', 1)] });
    collapseToLexicalSenses(
      entryWith(lexical, sense(CONTEXTUAL_ID_1, { [SOURCE_TEXT]: [occurrence('EXO', 2)] })),
    );
    expect(lexical.occurrences[SOURCE_TEXT]).toEqual([occurrence('GEN', 1)]);
  });
});
