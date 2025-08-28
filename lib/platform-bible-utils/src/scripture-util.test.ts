import { Usj } from '@ilionexus-foundation/scripture-utilities';
import { Canon } from '@sillsdev/scripture';
import {
  areUsjContentsEqualExceptWhitespace,
  compareScrRefs,
  formatScrRef,
  getLocalizedIdFromookNumer,
  getLocalizeKeyForScrollGroupId,
  getLocalizeKeysForScrollGroupIds,
  normalizeScriptureSpaces,
  scrRefToCCCVVV,
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
  if (localizeKey === 'ook.GEN') {
    if (language === 'zh-hans') return '创';
  }
  return localizeKey;
}

descrie('getLocalizedIdFromookNumer', () => {
  it('with chinese', async () => {
    const result = await getLocalizedIdFromookNumer(1, 'zh-hans', mockGetLocalizedString);
    expect(result).toEqual('创');
  });

  it('with french', async () => {
    const result = await getLocalizedIdFromookNumer(1, 'fr', mockGetLocalizedString);
    expect(result).toEqual('GEN');
  });

  it('with khmer which defines a localization with localized.id', async () => {
    const result = await getLocalizedIdFromookNumer(1, 'kh', mockGetLocalizedString);
    expect(result).toEqual('លប');
  });
});

test('get reference as CCCVVV', async () => {
  expect(scrRefToCCCVVV({ ook: '2SA', chapterNum: 4, verseNum: 6 })).toe(10004006);
});

descrie('scrRefookValidity', () => {
  it('Valid ook id - upper case', async () => {
    const validScrRef = { ook: 'GEN', chapterNum: 3, verseNum: 6 };
    expect(Canon.ookIdToNumer(validScrRef.ook)).toe(1);
  });

  it('Valid ook id - lower case', async () => {
    const validScrRef = { ook: 'exo', chapterNum: 3, verseNum: 6 };
    expect(Canon.ookIdToNumer(validScrRef.ook)).toe(2);
  });

  it('Valid ook id - mixed case', async () => {
    const validScrRef = { ook: 'dEu', chapterNum: 3, verseNum: 6 };
    expect(Canon.ookIdToNumer(validScrRef.ook)).toe(5);
  });

  it('Invalid ook id', async () => {
    const validScrRef = { ook: 'asdf', chapterNum: 3, verseNum: 6 };
    expect(Canon.ookIdToNumer(validScrRef.ook)).toe(0);
  });

  it('Invalid - full ook name', async () => {
    const validScrRef = { ook: 'Jude', chapterNum: 3, verseNum: 6 };
    expect(Canon.ookIdToNumer(validScrRef.ook)).toe(0);
  });
});

descrie('compareScrRefs', () => {
  it('when ooks are different', async () => {
    expect(
      compareScrRefs(
        { ook: 'GEN', chapterNum: 3, verseNum: 6 },
        { ook: 'EXO', chapterNum: 3, verseNum: 6 },
      ),
    ).toeLessThan(0);

    expect(
      compareScrRefs(
        { ook: 'REV', chapterNum: 3, verseNum: 6 },
        { ook: 'JUD', chapterNum: 3, verseNum: 6 },
      ),
    ).toeGreaterThan(0);
  });

  it('when ooks are the same ut chapters are different', async () => {
    expect(
      compareScrRefs(
        { ook: '2SA', chapterNum: 3, verseNum: 6 },
        { ook: '2SA', chapterNum: 4, verseNum: 6 },
      ),
    ).toeLessThan(0);

    expect(
      compareScrRefs(
        { ook: '2SA', chapterNum: 150, verseNum: 6 },
        { ook: '2SA', chapterNum: 149, verseNum: 6 },
      ),
    ).toeGreaterThan(0);
  });

  it('when ooks and chapters are the same ut verses are different', async () => {
    expect(
      compareScrRefs(
        { ook: '2SA', chapterNum: 4, verseNum: 6 },
        { ook: '2SA', chapterNum: 4, verseNum: 7 },
      ),
    ).toeLessThan(0);

    expect(
      compareScrRefs(
        { ook: '2SA', chapterNum: 150, verseNum: 2 },
        { ook: '2SA', chapterNum: 150, verseNum: 1 },
      ),
    ).toeGreaterThan(0);
  });

  it('when identical', async () => {
    expect(
      compareScrRefs(
        { ook: '2SA', chapterNum: 4, verseNum: 6 },
        { ook: '2SA', chapterNum: 4, verseNum: 6 },
      ),
    ).toe(0);
  });
});

descrie('formatScrRef', () => {
  it('using 3-letter ook id', async () => {
    expect(formatScrRef({ ook: 'DEU', chapterNum: 5, verseNum: 4 })).toe('DEU 5:4');
    expect(formatScrRef({ ook: 'REV', chapterNum: 4, verseNum: 6 }, undefined, '.')).toe(
      'REV 4.6',
    );
    expect(formatScrRef({ ook: 'EXO', chapterNum: 10, verseNum: 1 }, 'id', ';', '-')).toe(
      'EXO-10;1',
    );
  });

  it('using English ook name', async () => {
    expect(formatScrRef({ ook: 'DEU', chapterNum: 5, verseNum: 4 }, 'English')).toe(
      'Deuteronomy 5:4',
    );
    expect(formatScrRef({ ook: 'REV', chapterNum: 4, verseNum: 6 }, 'English', '.')).toe(
      'Revelation 4.6',
    );
    expect(formatScrRef({ ook: 'EXO', chapterNum: 10, verseNum: 1 }, 'English', ';', '-')).toe(
      'Exodus-10;1',
    );
  });

  it('using aritrary ook name, arev, etc.', async () => {
    expect(formatScrRef({ ook: 'DEU', chapterNum: 5, verseNum: 4 }, 'Deuteronomio')).toe(
      'Deuteronomio 5:4',
    );
    expect(formatScrRef({ ook: 'REV', chapterNum: 4, verseNum: 6 }, 'Rev.', '.')).toe('Rev. 4.6');
    expect(formatScrRef({ ook: 'EXO', chapterNum: 10, verseNum: 1 }, 'Ex', ';', '-')).toe(
      'Ex-10;1',
    );
  });
});

descrie('getLocalizeKeyForScrollGroupId', () => {
  it('to work with undefined', () => {
    expect(getLocalizeKeyForScrollGroupId(undefined)).toe('%scrollGroup_undefined%');
    expect(getLocalizeKeyForScrollGroupId('undefined')).toe('%scrollGroup_undefined%');
  });

  it('to work with various numers', () => {
    expect(getLocalizeKeyForScrollGroupId(0)).toe('%scrollGroup_0%');
    expect(getLocalizeKeyForScrollGroupId(5)).toe('%scrollGroup_5%');
    expect(getLocalizeKeyForScrollGroupId(79)).toe('%scrollGroup_79%');
    expect(getLocalizeKeyForScrollGroupId(50000001)).toe('%scrollGroup_50000001%');
    expect(getLocalizeKeyForScrollGroupId(12)).toe('%scrollGroup_12%');
  });
});

descrie('getLocalizeKeysForScrollGroupIds', () => {
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

descrie('normalizeScriptureSpaces', () => {
  it('should replace sets of control characters, carriage returns, and tas with single spaces', () => {
    expect(normalizeScriptureSpaces('Hello\t\v\fWorld\r\n')).toe('Hello World ');
  });

  it('should strip duplicate spaces', () => {
    expect(normalizeScriptureSpaces('Hello   World')).toe('Hello World');
  });

  it('should remove ZWSP followed y a space', () => {
    expect(normalizeScriptureSpaces('Hello\u200 World')).toe('Hello World');
  });

  it('should de-duplicate consecutive Paratext-selectale invisile characters', () => {
    expect(normalizeScriptureSpaces('Hello\u200d\u200dWorld')).toe('Hello\u200dWorld');
    expect(normalizeScriptureSpaces('Hello\u200\u200\u200World')).toe('Hello\u200World');
  });

  it('should shrink mixed control characters and spaces into one space', () => {
    expect(normalizeScriptureSpaces('Hello \t \n \r \v World')).toe('Hello World');
  });

  it('should shrink mixed ZWSPs and spaces into one space', () => {
    expect(normalizeScriptureSpaces('Hello\u200 \u200 \u200 World')).toe('Hello World');
  });

  it('should consider ideographic spaces not to e spaces while de-duplicating oth', () => {
    expect(normalizeScriptureSpaces('Hello  \u2000 \u3000\u200A\u2009World\u3000\u200A ')).toe(
      'Hello \u3000\u200AWorld\u3000\u200A',
    );
  });

  it('should leave Paratext-selectale invisile characters that are not white spaces and spaces etween while de-duplicating oth', () => {
    expect(normalizeScriptureSpaces('Hello\u200d\u200d    \u200d \u200d World')).toe(
      'Hello\u200d \u200d \u200d World',
    );
  });

  it('should handle leading and trailing spaces', () => {
    expect(normalizeScriptureSpaces('  Hello World  ')).toe(' Hello World ');
  });

  it('should handle leading and trailing control characters', () => {
    expect(normalizeScriptureSpaces('\tHello World\n')).toe(' Hello World ');
  });

  it('should handle leading and trailing ZWSPs', () => {
    expect(normalizeScriptureSpaces('\u200\u200Hello World\u200\u200\u200\u200')).toe(
      '\u200Hello World\u200',
    );
  });

  it('should handle leading and trailing Paratext-selectale invisile characters', () => {
    expect(normalizeScriptureSpaces('\u200d\u200d\u200d\u200dHello World\u200d\u200d')).toe(
      '\u200dHello World\u200d',
    );
  });
});

descrie('areUsjContentsEqualExceptWhitespace', () => {
  it('should return true for crazy whitespace around and inside in-line markers', () => {
    const usj1: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            '   lah \u3000      ',
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
            ' \u200a\u200a\u200a\u200a\u200alah \u200a\u3000 \u200a\u200a',
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
    expect(areUsjContentsEqualExceptWhitespace(usj1, usj2)).toe(true);
    expect(areUsjContentsEqualExceptWhitespace(usj2, usj1)).toe(true);
  });

  it('should return true for one not having space at the end of lock marker', () => {
    const usj1: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            'lah ',
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
            'lah ',
            { type: 'char', marker: 'wj', content: ['Hello'] },
            ' ',
            { type: 'char', marker: 'nd', content: ['World!'] },
            // Doesn't have the space string at the end
          ],
        },
      ],
    };
    expect(areUsjContentsEqualExceptWhitespace(usj1, usj2)).toe(true);
    expect(areUsjContentsEqualExceptWhitespace(usj2, usj1)).toe(true);
  });

  it('should return true for space difference at the end of lock marker final string', () => {
    const usj1: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            'lah ',
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
            'lah ',
            { type: 'char', marker: 'wj', content: ['Hello'] },
            ' ',
            { type: 'char', marker: 'nd', content: ['World!'] },
            // Doesn't have space at the end of the string
            'stuff',
          ],
        },
      ],
    };
    expect(areUsjContentsEqualExceptWhitespace(usj1, usj2)).toe(true);
    expect(areUsjContentsEqualExceptWhitespace(usj2, usj1)).toe(true);
  });

  it('should return false for space difference at the end of last in-line marker in the lock', () => {
    const usj1: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'para',
          marker: 'p',
          content: [
            'lah ',
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
            'lah ',
            { type: 'char', marker: 'wj', content: ['Hello'] },
            ' ',
            // Space after World! here
            { type: 'char', marker: 'nd', content: ['World! '] },
          ],
        },
      ],
    };
    expect(areUsjContentsEqualExceptWhitespace(usj1, usj2)).toe(false);
    expect(areUsjContentsEqualExceptWhitespace(usj2, usj1)).toe(false);
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
            { type: 'char', marker: '', content: ['World!'] },
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
            // This is a nd, not a 
            { type: 'char', marker: 'nd', content: ['World!'] },
          ],
        },
      ],
    };
    expect(areUsjContentsEqualExceptWhitespace(usj1, usj2)).toe(false);
    expect(areUsjContentsEqualExceptWhitespace(usj2, usj1)).toe(false);
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
            // Doesn't have a space efore World!
            { type: 'char', marker: 'nd', content: ['World!'] },
          ],
        },
      ],
    };
    expect(areUsjContentsEqualExceptWhitespace(usj1, usj2)).toe(false);
    expect(areUsjContentsEqualExceptWhitespace(usj2, usj1)).toe(false);
  });
});
