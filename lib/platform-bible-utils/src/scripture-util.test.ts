import {
  getLocalizedIdFromBookNumber,
  compareScrRefs,
  formatScrRef,
  scrRefToBBBCCCVVV,
  getLocalizeKeyForScrollGroupId,
  getLocalizeKeysForScrollGroupIds,
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
