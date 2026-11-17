import { describe, it, expect } from 'vitest';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Entry, Occurrence, Sense } from 'platform-lexical-tools';
import {
  getCombinedOccurrencesCountFromDictionaryEntrySenses,
  getDeduplicatedOccurrencesFromSenses,
  getFormatGlossesStringFromDictionaryEntrySenses,
  isSenseInScope,
} from './dictionary.utils';

const mockVerseRef = (book: string, chapterNum: number, verseNum = 1): SerializedVerseRef => ({
  book,
  chapterNum,
  verseNum,
});

const createOccurrence = (
  book: string,
  chapterNum: number,
  verseNum = 1,
  wordNum = 1,
): Occurrence => ({
  verseRef: mockVerseRef(book, chapterNum, verseNum),
  wordNum,
});

const senseOccurringAt = (...occurrences: Occurrence[]) =>
  // These are not fully constructed Sense objects, but they are sufficient for testing so I asserted them.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  ({ occurrences: { project: occurrences } }) as unknown as Sense;

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
    it('shows glosses without their markup', () => {
      // These are not fully constructed Entry objects, but they are sufficient for testing so I asserted them.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const entry: Entry = {
        senses: {
          s1: { glosses: ['hearing{N:001}', 'majesty || honor'], occurrences: {} },
          s2: { glosses: ['{L:storehouses<SDBH:אוֹצָר>}'], occurrences: {} },
        },
      } as unknown as Entry;

      const result = getFormatGlossesStringFromDictionaryEntrySenses(entry);
      expect(result).toBe('hearing, majesty / honor, storehouses');
    });

    it('filters glosses by the verse in verse scope', () => {
      // These are not fully constructed Entry objects, but they are sufficient for testing so I asserted them.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const entry: Entry = {
        senses: {
          s1: { glosses: ['joy'], occurrences: { project: [createOccurrence('GEN', 1, 2)] } },
          s2: { glosses: ['peace'], occurrences: { project: [createOccurrence('GEN', 1, 3)] } },
        },
      } as unknown as Entry;

      const result = getFormatGlossesStringFromDictionaryEntrySenses(
        entry,
        mockVerseRef('GEN', 1, 3),
        'verse',
      );
      expect(result).toBe('peace');
    });
  });

  describe('isSenseInScope', () => {
    const sense = senseOccurringAt(createOccurrence('GEN', 1, 2));

    it('is true for a sense in the chapter in chapter scope', () => {
      expect(isSenseInScope(sense, mockVerseRef('GEN', 1, 9), 'chapter')).toBe(true);
    });

    it('is false for a sense in another chapter in chapter scope', () => {
      expect(isSenseInScope(sense, mockVerseRef('GEN', 2, 2), 'chapter')).toBe(false);
    });

    it('is true for a sense in the verse in verse scope', () => {
      expect(isSenseInScope(sense, mockVerseRef('GEN', 1, 2), 'verse')).toBe(true);
    });

    it('is false for a sense elsewhere in the chapter in verse scope', () => {
      expect(isSenseInScope(sense, mockVerseRef('GEN', 1, 9), 'verse')).toBe(false);
    });

    it('is true for every sense when there is no reference', () => {
      expect(isSenseInScope(sense, undefined, 'verse')).toBe(true);
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

    it('lists the occurrences of several senses in Bible order', () => {
      const senses = [
        senseOccurringAt(createOccurrence('GEN', 1, 14), createOccurrence('EXO', 1, 1)),
        senseOccurringAt(createOccurrence('GEN', 1, 5, 4), createOccurrence('GEN', 1, 5, 2)),
      ];

      const result = getDeduplicatedOccurrencesFromSenses(senses);
      expect(
        result.map(({ verseRef, wordNum }) => [verseRef.book, verseRef.verseNum, wordNum]),
      ).toEqual([
        ['GEN', 5, 2],
        ['GEN', 14, 1],
        ['EXO', 1, 1],
      ]);
    });
  });
});
