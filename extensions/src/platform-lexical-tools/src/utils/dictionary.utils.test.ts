import { SerializedVerseRef } from '@sillsdev/scripture';
import { Entry, Occurrence, Sense } from 'platform-lexical-tools';
import {
  getCombinedOccurrencesCountFromDictionaryEntrySenses,
  getDeduplicatedOccurrencesFromSenses,
  getFormatGlossesStringFromDictionaryEntrySenses,
} from './dictionary.utils';

const mockVerseRef = (book: string, chapterNum: number, verseNum = 1): SerializedVerseRef => ({
  book,
  chapterNum,
  verseNum,
});

const createOccurrence = (book: string, chapterNum: number): Occurrence => ({
  verseRef: mockVerseRef(book, chapterNum),
  wordNum: 1,
});

describe('dictionary.util.ts', () => {
  describe('getFormatGlossesStringFromDictionaryEntrySenses', () => {
    it('returns formatted glosses without parenthetical statements', () => {
      // These are not fully constructed Entry objects, but they are sufficient for testing so I asserted them.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const entry: Entry = {
        senses: {
          s1: {
            glosses: ['love (noun), affection', 'care'],
            occurrences: {},
          },
          s2: {
            glosses: ['kindness (gentle)', 'affection'],
            occurrences: {},
          },
        },
      } as unknown as Entry;

      const result = getFormatGlossesStringFromDictionaryEntrySenses(entry);
      expect(result).toBe('love, affection, care, kindness');
    });

    it('filters glosses by scrRef when provided', () => {
      const scrRef = mockVerseRef('GEN', 1);
      // These are not fully constructed Entry objects, but they are sufficient for testing so I asserted them.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const entry: Entry = {
        senses: {
          s1: {
            glosses: ['joy'],
            occurrences: {
              project: [createOccurrence('GEN', 1)],
            },
          },
          s2: {
            glosses: ['peace'],
            occurrences: {
              project: [createOccurrence('EXO', 2)],
            },
          },
        },
      } as unknown as Entry;

      const result = getFormatGlossesStringFromDictionaryEntrySenses(entry, scrRef);
      expect(result).toBe('joy');
    });
  });

  describe('getCombinedOccurrencesCountFromDictionaryEntrySenses', () => {
    it('counts all deduplicated occurrences', () => {
      const scrRef = mockVerseRef('GEN', 1);
      // These are not fully constructed Entry objects, but they are sufficient for testing so I asserted them.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const entry: Entry = {
        senses: {
          s1: {
            glosses: [],
            occurrences: {
              project: [createOccurrence('GEN', 1), createOccurrence('GEN', 1)],
            },
          },
          s2: {
            glosses: [],
            occurrences: {
              project: [createOccurrence('GEN', 1)],
            },
          },
        },
      } as unknown as Entry;

      const count = getCombinedOccurrencesCountFromDictionaryEntrySenses(entry, scrRef);
      expect(count).toBe(1); // Deduplicated by verseRef
    });
  });

  describe('getDeduplicatedOccurrencesFromSenses', () => {
    it('returns deduplicated occurrences from senses', () => {
      const scrRef = mockVerseRef('GEN', 1);
      // These are not fully constructed Sense objects, but they are sufficient for testing so I asserted them.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const senses: Sense[] = [
        {
          occurrences: {
            project: [createOccurrence('GEN', 1)],
          },
        },
        {
          occurrences: {
            project: [createOccurrence('GEN', 1), createOccurrence('EXO', 2)],
          },
        },
      ] as unknown as Sense[];

      const result = getDeduplicatedOccurrencesFromSenses(senses, scrRef);
      expect(result).toHaveLength(1);
      expect(result[0].verseRef.book).toBe('GEN');
    });
  });
});
