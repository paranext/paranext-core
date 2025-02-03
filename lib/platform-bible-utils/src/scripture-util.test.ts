import { Usj } from '@biblionexus-foundation/scripture-utilities';
import {
  getLocalizedIdFromBookNumber,
  compareScrRefs,
  formatScrRef,
  scrRefToBBBCCCVVV,
  getLocalizeKeyForScrollGroupId,
  getLocalizeKeysForScrollGroupIds,
  normalizeScriptureSpaces,
  areUsjContentsEqualExceptWhitespace,
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
  test('with chinese', async () => {
    const result = await getLocalizedIdFromBookNumber(1, 'zh-hans', mockGetLocalizedString);
    expect(result).toEqual('创');
  });

  test('with french', async () => {
    const result = await getLocalizedIdFromBookNumber(1, 'fr', mockGetLocalizedString);
    expect(result).toEqual('GEN');
  });

  test('with khmer which defines a localization with localized.id', async () => {
    const result = await getLocalizedIdFromBookNumber(1, 'kh', mockGetLocalizedString);
    expect(result).toEqual('លប');
  });
});

test('get reference as BBBCCCVVV', async () => {
  expect(scrRefToBBBCCCVVV({ bookNum: 10, chapterNum: 4, verseNum: 6 })).toBe(10004006);
});

describe('compareScrRefs', () => {
  test('when books are different', async () => {
    expect(
      compareScrRefs(
        { bookNum: 1, chapterNum: 3, verseNum: 6 },
        { bookNum: 2, chapterNum: 3, verseNum: 6 },
      ),
    ).toBeLessThan(0);

    expect(
      compareScrRefs(
        { bookNum: 66, chapterNum: 3, verseNum: 6 },
        { bookNum: 65, chapterNum: 3, verseNum: 6 },
      ),
    ).toBeGreaterThan(0);
  });

  test('when books are the same but chapters are different', async () => {
    expect(
      compareScrRefs(
        { bookNum: 10, chapterNum: 3, verseNum: 6 },
        { bookNum: 10, chapterNum: 4, verseNum: 6 },
      ),
    ).toBeLessThan(0);

    expect(
      compareScrRefs(
        { bookNum: 10, chapterNum: 150, verseNum: 6 },
        { bookNum: 10, chapterNum: 149, verseNum: 6 },
      ),
    ).toBeGreaterThan(0);
  });

  test('when books and chapters are the same but verses are different', async () => {
    expect(
      compareScrRefs(
        { bookNum: 10, chapterNum: 4, verseNum: 6 },
        { bookNum: 10, chapterNum: 4, verseNum: 7 },
      ),
    ).toBeLessThan(0);

    expect(
      compareScrRefs(
        { bookNum: 10, chapterNum: 150, verseNum: 2 },
        { bookNum: 10, chapterNum: 150, verseNum: 1 },
      ),
    ).toBeGreaterThan(0);
  });

  test('when identical', async () => {
    expect(
      compareScrRefs(
        { bookNum: 10, chapterNum: 4, verseNum: 6 },
        { bookNum: 10, chapterNum: 4, verseNum: 6 },
      ),
    ).toBe(0);
  });
});

describe('formatScrRef', () => {
  test('using 3-letter book id', async () => {
    expect(formatScrRef({ bookNum: 5, chapterNum: 5, verseNum: 4 })).toBe('DEU 5:4');
    expect(formatScrRef({ bookNum: 66, chapterNum: 4, verseNum: 6 }, undefined, '.')).toBe(
      'REV 4.6',
    );
    expect(formatScrRef({ bookNum: 2, chapterNum: 10, verseNum: 1 }, 'id', ';', '-')).toBe(
      'EXO-10;1',
    );
  });

  test('using English book name', async () => {
    expect(formatScrRef({ bookNum: 5, chapterNum: 5, verseNum: 4 }, 'English')).toBe(
      'Deuteronomy 5:4',
    );
    expect(formatScrRef({ bookNum: 66, chapterNum: 4, verseNum: 6 }, 'English', '.')).toBe(
      'Revelation 4.6',
    );
    expect(formatScrRef({ bookNum: 2, chapterNum: 10, verseNum: 1 }, 'English', ';', '-')).toBe(
      'Exodus-10;1',
    );
  });

  test('using arbitrary book name, abbrev, etc.', async () => {
    expect(formatScrRef({ bookNum: 5, chapterNum: 5, verseNum: 4 }, 'Deuteronomio')).toBe(
      'Deuteronomio 5:4',
    );
    expect(formatScrRef({ bookNum: 66, chapterNum: 4, verseNum: 6 }, 'Rev.', '.')).toBe('Rev. 4.6');
    expect(formatScrRef({ bookNum: 2, chapterNum: 10, verseNum: 1 }, 'Ex', ';', '-')).toBe(
      'Ex-10;1',
    );
  });
});

describe('getLocalizeKeyForScrollGroupId', () => {
  test('to work with undefined', () => {
    expect(getLocalizeKeyForScrollGroupId(undefined)).toBe('%scrollGroup_undefined%');
    expect(getLocalizeKeyForScrollGroupId('undefined')).toBe('%scrollGroup_undefined%');
  });

  test('to work with various numbers', () => {
    expect(getLocalizeKeyForScrollGroupId(0)).toBe('%scrollGroup_0%');
    expect(getLocalizeKeyForScrollGroupId(5)).toBe('%scrollGroup_5%');
    expect(getLocalizeKeyForScrollGroupId(79)).toBe('%scrollGroup_79%');
    expect(getLocalizeKeyForScrollGroupId(50000001)).toBe('%scrollGroup_50000001%');
    expect(getLocalizeKeyForScrollGroupId(12)).toBe('%scrollGroup_12%');
  });
});

describe('getLocalizeKeysForScrollGroupIds', () => {
  test('to provide an array of scroll group keys from various scroll group ids', () => {
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
  test('should replace sets of control characters, carriage returns, and tabs with single spaces', () => {
    expect(normalizeScriptureSpaces('Hello\t\v\fWorld\r\n')).toBe('Hello World ');
  });

  test('should strip duplicate spaces', () => {
    expect(normalizeScriptureSpaces('Hello   World')).toBe('Hello World');
  });

  test('should remove ZWSP followed by a space', () => {
    expect(normalizeScriptureSpaces('Hello\u200B World')).toBe('Hello World');
  });

  test('should de-duplicate consecutive Paratext-selectable invisible characters', () => {
    expect(normalizeScriptureSpaces('Hello\u200d\u200dWorld')).toBe('Hello\u200dWorld');
    expect(normalizeScriptureSpaces('Hello\u200B\u200B\u200BWorld')).toBe('Hello\u200BWorld');
  });

  test('should shrink mixed control characters and spaces into one space', () => {
    expect(normalizeScriptureSpaces('Hello \t \n \r \v World')).toBe('Hello World');
  });

  test('should shrink mixed ZWSPs and spaces into one space', () => {
    expect(normalizeScriptureSpaces('Hello\u200B \u200B \u200B World')).toBe('Hello World');
  });

  test('should consider ideographic spaces not to be spaces while de-duplicating both', () => {
    expect(normalizeScriptureSpaces('Hello  \u2000 \u3000\u200A\u2009World\u3000\u200A ')).toBe(
      'Hello \u3000\u200AWorld\u3000\u200A',
    );
  });

  test('should leave Paratext-selectable invisible characters that are not white spaces and spaces between while de-duplicating both', () => {
    expect(normalizeScriptureSpaces('Hello\u200d\u200d    \u200d \u200d World')).toBe(
      'Hello\u200d \u200d \u200d World',
    );
  });

  test('should handle leading and trailing spaces', () => {
    expect(normalizeScriptureSpaces('  Hello World  ')).toBe(' Hello World ');
  });

  test('should handle leading and trailing control characters', () => {
    expect(normalizeScriptureSpaces('\tHello World\n')).toBe(' Hello World ');
  });

  test('should handle leading and trailing ZWSPs', () => {
    expect(normalizeScriptureSpaces('\u200B\u200BHello World\u200B\u200B\u200B\u200B')).toBe(
      '\u200BHello World\u200B',
    );
  });

  test('should handle leading and trailing Paratext-selectable invisible characters', () => {
    expect(normalizeScriptureSpaces('\u200d\u200d\u200d\u200dHello World\u200d\u200d')).toBe(
      '\u200dHello World\u200d',
    );
  });
});

describe('areUsjContentsEqualExceptWhitespace', () => {
  test('should return true for crazy whitespace around and inside in-line markers', () => {
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

  test('should return true for one not having space at the end of block marker', () => {
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

  test('should return true for space difference at the end of block marker final string', () => {
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

  test('should return false for space difference at the end of last in-line marker in the block', () => {
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

  test('should return false for different in-line markers', () => {
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

  test('should return false for in-line marker different contents', () => {
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
