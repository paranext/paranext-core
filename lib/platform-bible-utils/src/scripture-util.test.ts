import { Usj } from '@biblionexus-foundation/scripture-utilities';
import { Canon } from '@sillsdev/scripture';
import {
  areUsjContentsEqualExceptWhitespace,
  compareScrRefs,
  formatScrRef,
  getLocalizedIdFromBookNumber,
  getLocalizeKeyForScrollGroupId,
  getLocalizeKeysForScrollGroupIds,
  normalizeScriptureSpaces,
  scrRefToBBBCCCVVV,
} from './scripture-util';

async function mockGetLocalizedString(item: {
  localizeKey: string;
  languagesToSearch?: string[] | undefined;
}): Promise<string> {
  if (!item.languagesToSearch) item.languagesToSearch = ['en'];

  const { localizeKey, languagesToSearch } = item;
  const language = languagesToSearch[0];
  if (localizeKey === 'LocalizedId.GEN') {
    if (language === 'kh') return 'លប';
    return 'GEN';
  }
  if (localizeKey === 'Book.GEN') {
    if (language === 'zh-hans') return '创';
  }
  return localizeKey;
}

describe('getLocalizedIdFromBookNumber', () => {
  it('with chinese', async () => {
    const result = await getLocalizedIdFromBookNumber(1, 'zh-hans', mockGetLocalizedString);
    expect(result).toEqual('创');
  });

  it('with french', async () => {
    const result = await getLocalizedIdFromBookNumber(1, 'fr', mockGetLocalizedString);
    expect(result).toEqual('GEN');
  });

  it('with khmer which defines a localization with localized.id', async () => {
    const result = await getLocalizedIdFromBookNumber(1, 'kh', mockGetLocalizedString);
    expect(result).toEqual('លប');
  });
});

test('get reference as BBBCCCVVV', async () => {
  expect(scrRefToBBBCCCVVV({ book: '2SA', chapterNum: 4, verseNum: 6 })).toBe(10004006);
});

describe('scrRefBookValidity', () => {
  it('Valid book id - upper case', async () => {
    const validScrRef = { book: 'GEN', chapterNum: 3, verseNum: 6 };
    expect(Canon.bookIdToNumber(validScrRef.book)).toBe(1);
  });

  it('Valid book id - lower case', async () => {
    const validScrRef = { book: 'exo', chapterNum: 3, verseNum: 6 };
    expect(Canon.bookIdToNumber(validScrRef.book)).toBe(2);
  });

  it('Valid book id - mixed case', async () => {
    const validScrRef = { book: 'dEu', chapterNum: 3, verseNum: 6 };
    expect(Canon.bookIdToNumber(validScrRef.book)).toBe(5);
  });

  it('Invalid book id', async () => {
    const validScrRef = { book: 'asdf', chapterNum: 3, verseNum: 6 };
    expect(Canon.bookIdToNumber(validScrRef.book)).toBe(0);
  });

  it('Invalid - full book name', async () => {
    const validScrRef = { book: 'Jude', chapterNum: 3, verseNum: 6 };
    expect(Canon.bookIdToNumber(validScrRef.book)).toBe(0);
  });
});

describe('compareScrRefs', () => {
  it('when books are different', async () => {
    expect(
      compareScrRefs(
        { book: 'GEN', chapterNum: 3, verseNum: 6 },
        { book: 'EXO', chapterNum: 3, verseNum: 6 },
      ),
    ).toBeLessThan(0);

    expect(
      compareScrRefs(
        { book: 'REV', chapterNum: 3, verseNum: 6 },
        { book: 'JUD', chapterNum: 3, verseNum: 6 },
      ),
    ).toBeGreaterThan(0);
  });

  it('when books are the same but chapters are different', async () => {
    expect(
      compareScrRefs(
        { book: '2SA', chapterNum: 3, verseNum: 6 },
        { book: '2SA', chapterNum: 4, verseNum: 6 },
      ),
    ).toBeLessThan(0);

    expect(
      compareScrRefs(
        { book: '2SA', chapterNum: 150, verseNum: 6 },
        { book: '2SA', chapterNum: 149, verseNum: 6 },
      ),
    ).toBeGreaterThan(0);
  });

  it('when books and chapters are the same but verses are different', async () => {
    expect(
      compareScrRefs(
        { book: '2SA', chapterNum: 4, verseNum: 6 },
        { book: '2SA', chapterNum: 4, verseNum: 7 },
      ),
    ).toBeLessThan(0);

    expect(
      compareScrRefs(
        { book: '2SA', chapterNum: 150, verseNum: 2 },
        { book: '2SA', chapterNum: 150, verseNum: 1 },
      ),
    ).toBeGreaterThan(0);
  });

  it('when identical', async () => {
    expect(
      compareScrRefs(
        { book: '2SA', chapterNum: 4, verseNum: 6 },
        { book: '2SA', chapterNum: 4, verseNum: 6 },
      ),
    ).toBe(0);
  });
});

describe('formatScrRef', () => {
  it('using 3-letter book id', async () => {
    expect(formatScrRef({ book: 'DEU', chapterNum: 5, verseNum: 4 })).toBe('DEU 5:4');
    expect(formatScrRef({ book: 'REV', chapterNum: 4, verseNum: 6 }, undefined, '.')).toBe(
      'REV 4.6',
    );
    expect(formatScrRef({ book: 'EXO', chapterNum: 10, verseNum: 1 }, 'id', ';', '-')).toBe(
      'EXO-10;1',
    );
  });

  it('using English book name', async () => {
    expect(formatScrRef({ book: 'DEU', chapterNum: 5, verseNum: 4 }, 'English')).toBe(
      'Deuteronomy 5:4',
    );
    expect(formatScrRef({ book: 'REV', chapterNum: 4, verseNum: 6 }, 'English', '.')).toBe(
      'Revelation 4.6',
    );
    expect(formatScrRef({ book: 'EXO', chapterNum: 10, verseNum: 1 }, 'English', ';', '-')).toBe(
      'Exodus-10;1',
    );
  });

  it('using arbitrary book name, abbrev, etc.', async () => {
    expect(formatScrRef({ book: 'DEU', chapterNum: 5, verseNum: 4 }, 'Deuteronomio')).toBe(
      'Deuteronomio 5:4',
    );
    expect(formatScrRef({ book: 'REV', chapterNum: 4, verseNum: 6 }, 'Rev.', '.')).toBe('Rev. 4.6');
    expect(formatScrRef({ book: 'EXO', chapterNum: 10, verseNum: 1 }, 'Ex', ';', '-')).toBe(
      'Ex-10;1',
    );
  });
});

describe('getLocalizeKeyForScrollGroupId', () => {
  it('to work with undefined', () => {
    expect(getLocalizeKeyForScrollGroupId(undefined)).toBe('%scrollGroup_undefined%');
    expect(getLocalizeKeyForScrollGroupId('undefined')).toBe('%scrollGroup_undefined%');
  });

  it('to work with various numbers', () => {
    expect(getLocalizeKeyForScrollGroupId(0)).toBe('%scrollGroup_0%');
    expect(getLocalizeKeyForScrollGroupId(5)).toBe('%scrollGroup_5%');
    expect(getLocalizeKeyForScrollGroupId(79)).toBe('%scrollGroup_79%');
    expect(getLocalizeKeyForScrollGroupId(50000001)).toBe('%scrollGroup_50000001%');
    expect(getLocalizeKeyForScrollGroupId(12)).toBe('%scrollGroup_12%');
  });
});

describe('getLocalizeKeysForScrollGroupIds', () => {
  it('to provide an array of scroll group keys from various scroll group ids', () => {
    expect(getLocalizeKeysForScrollGroupIds([undefined, 0, 1, 2, 3, 4])).toEqual([
      '%scrollGroup_undefined%',
      '%scrollGroup_0%',
      '%scrollGroup_1%',
      '%scrollGroup_2%',
      '%scrollGroup_3%',
      '%scrollGroup_4%',
    ]);
    expect(getLocalizeKeysForScrollGroupIds([0, 2, 3, undefined, 1])).toEqual([
      '%scrollGroup_0%',
      '%scrollGroup_2%',
      '%scrollGroup_3%',
      '%scrollGroup_undefined%',
      '%scrollGroup_1%',
    ]);
  });
});

describe('normalizeScriptureSpaces', () => {
  it('should replace sets of control characters, carriage returns, and tabs with single spaces', () => {
    expect(normalizeScriptureSpaces('Hello\t\v\fWorld\r\n')).toBe('Hello World ');
  });

  it('should strip duplicate spaces', () => {
    expect(normalizeScriptureSpaces('Hello   World')).toBe('Hello World');
  });

  it('should remove ZWSP followed by a space', () => {
    expect(normalizeScriptureSpaces('Hello\u200B World')).toBe('Hello World');
  });

  it('should de-duplicate consecutive Paratext-selectable invisible characters', () => {
    expect(normalizeScriptureSpaces('Hello\u200d\u200dWorld')).toBe('Hello\u200dWorld');
    expect(normalizeScriptureSpaces('Hello\u200B\u200B\u200BWorld')).toBe('Hello\u200BWorld');
  });

  it('should shrink mixed control characters and spaces into one space', () => {
    expect(normalizeScriptureSpaces('Hello \t \n \r \v World')).toBe('Hello World');
  });

  it('should shrink mixed ZWSPs and spaces into one space', () => {
    expect(normalizeScriptureSpaces('Hello\u200B \u200B \u200B World')).toBe('Hello World');
  });

  it('should consider ideographic spaces not to be spaces while de-duplicating both', () => {
    expect(normalizeScriptureSpaces('Hello  \u2000 \u3000\u200A\u2009World\u3000\u200A ')).toBe(
      'Hello \u3000\u200AWorld\u3000\u200A',
    );
  });

  it('should leave Paratext-selectable invisible characters that are not white spaces and spaces between while de-duplicating both', () => {
    expect(normalizeScriptureSpaces('Hello\u200d\u200d    \u200d \u200d World')).toBe(
      'Hello\u200d \u200d \u200d World',
    );
  });

  it('should handle leading and trailing spaces', () => {
    expect(normalizeScriptureSpaces('  Hello World  ')).toBe(' Hello World ');
  });

  it('should handle leading and trailing control characters', () => {
    expect(normalizeScriptureSpaces('\tHello World\n')).toBe(' Hello World ');
  });

  it('should handle leading and trailing ZWSPs', () => {
    expect(normalizeScriptureSpaces('\u200B\u200BHello World\u200B\u200B\u200B\u200B')).toBe(
      '\u200BHello World\u200B',
    );
  });

  it('should handle leading and trailing Paratext-selectable invisible characters', () => {
    expect(normalizeScriptureSpaces('\u200d\u200d\u200d\u200dHello World\u200d\u200d')).toBe(
      '\u200dHello World\u200d',
    );
  });
});

describe('areUsjContentsEqualExceptWhitespace', () => {
  it('should return true for crazy whitespace around and inside in-line markers', () => {
    const usj1: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            '   blah \u3000      ',
            { type: 'char', marker: 'wj', content: ['            Hello   '] },
            { type: 'char', marker: 'nd', content: [' World!'] },
            'asdf            \n\n\n ',
          ],
        },
      ],
    };
    const usj2: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            ' \u200a\u200a\u200a\u200a\u200ablah \u200a\u3000 \u200a\u200a',
            { type: 'char', marker: 'wj', content: [' \u200a\u200aHello \u200a'] },
            {
              type: 'char',
              marker: 'nd',
              content: [' \u200a\u200a\u200a\u200a\u200a\u200a\u200aWorld!'],
            },
            'asdf \u200a\u200a\u200a\u200a\u200a\u200a',
          ],
        },
      ],
    };
    expect(areUsjContentsEqualExceptWhitespace(usj1, usj2)).toBe(true);
    expect(areUsjContentsEqualExceptWhitespace(usj2, usj1)).toBe(true);
  });

  it('should return true for one not having space at the end of block marker', () => {
    const usj1: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            'blah ',
            { type: 'char', marker: 'wj', content: ['Hello'] },
            ' ',
            { type: 'char', marker: 'nd', content: ['World!'] },
            '    \t \n   ',
          ],
        },
      ],
    };
    const usj2: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            'blah ',
            { type: 'char', marker: 'wj', content: ['Hello'] },
            ' ',
            { type: 'char', marker: 'nd', content: ['World!'] },
            // Doesn't have the space string at the end
          ],
        },
      ],
    };
    expect(areUsjContentsEqualExceptWhitespace(usj1, usj2)).toBe(true);
    expect(areUsjContentsEqualExceptWhitespace(usj2, usj1)).toBe(true);
  });

  it('should return true for space difference at the end of block marker final string', () => {
    const usj1: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            'blah ',
            { type: 'char', marker: 'wj', content: ['Hello'] },
            ' ',
            { type: 'char', marker: 'nd', content: ['World!'] },
            'stuff         ',
          ],
        },
      ],
    };
    const usj2: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            'blah ',
            { type: 'char', marker: 'wj', content: ['Hello'] },
            ' ',
            { type: 'char', marker: 'nd', content: ['World!'] },
            // Doesn't have space at the end of the string
            'stuff',
          ],
        },
      ],
    };
    expect(areUsjContentsEqualExceptWhitespace(usj1, usj2)).toBe(true);
    expect(areUsjContentsEqualExceptWhitespace(usj2, usj1)).toBe(true);
  });

  it('should return false for space difference at the end of last in-line marker in the block', () => {
    const usj1: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            'blah ',
            { type: 'char', marker: 'wj', content: ['Hello'] },
            ' ',
            { type: 'char', marker: 'nd', content: ['World!'] },
          ],
        },
      ],
    };
    const usj2: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            'blah ',
            { type: 'char', marker: 'wj', content: ['Hello'] },
            ' ',
            // Space after World! here
            { type: 'char', marker: 'nd', content: ['World! '] },
          ],
        },
      ],
    };
    expect(areUsjContentsEqualExceptWhitespace(usj1, usj2)).toBe(false);
    expect(areUsjContentsEqualExceptWhitespace(usj2, usj1)).toBe(false);
  });

  it('should return false for different in-line markers', () => {
    const usj1: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'char', marker: 'wj', content: ['Hello'] },
            { type: 'char', marker: 'b', content: ['World!'] },
          ],
        },
      ],
    };
    const usj2: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'char', marker: 'wj', content: ['Hello'] },
            // This is a nd, not a b
            { type: 'char', marker: 'nd', content: ['World!'] },
          ],
        },
      ],
    };
    expect(areUsjContentsEqualExceptWhitespace(usj1, usj2)).toBe(false);
    expect(areUsjContentsEqualExceptWhitespace(usj2, usj1)).toBe(false);
  });

  it('should return false for in-line marker different contents', () => {
    const usj1: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'char', marker: 'wj', content: ['Hello'] },
            { type: 'char', marker: 'nd', content: [' World!'] },
          ],
        },
      ],
    };
    const usj2: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'char', marker: 'wj', content: ['Hello'] },
            // Doesn't have a space before World!
            { type: 'char', marker: 'nd', content: ['World!'] },
          ],
        },
      ],
    };
    expect(areUsjContentsEqualExceptWhitespace(usj1, usj2)).toBe(false);
    expect(areUsjContentsEqualExceptWhitespace(usj2, usj1)).toBe(false);
  });
});
