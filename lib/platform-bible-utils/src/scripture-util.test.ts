import {
  getLocalizedIdFromBookNumber,
  compareScrRefs,
  formatScrRef,
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

test('getLocalizedIdFromBookNumber with chinese', async () => {
  const result = await getLocalizedIdFromBookNumber(1, 'zh-hans', mockGetLocalizedString);
  expect(result).toEqual('创');
});

test('getLocalizedIdFromBookNumber with french', async () => {
  const result = await getLocalizedIdFromBookNumber(1, 'fr', mockGetLocalizedString);
  expect(result).toEqual('GEN');
});

test('getLocalizedIdFromBookNumber with khmer which defines a localization with localized.id', async () => {
  const result = await getLocalizedIdFromBookNumber(1, 'kh', mockGetLocalizedString);
  expect(result).toEqual('លប');
});

test('get reference as BBBCCCVVV', async () => {
  expect(scrRefToBBBCCCVVV({ bookNum: 10, chapterNum: 4, verseNum: 6 })).toBe(10004006);
});

test('compare references when books are different', async () => {
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

test('compare references when books are the same but chapters are different', async () => {
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

test('compare references when books and chapters are the same but verses are different', async () => {
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

test('compare references when identical', async () => {
  expect(
    compareScrRefs(
      { bookNum: 10, chapterNum: 4, verseNum: 6 },
      { bookNum: 10, chapterNum: 4, verseNum: 6 },
    ),
  ).toBe(0);
});

test('format reference using 3-letter book id', async () => {
  expect(formatScrRef({ bookNum: 5, chapterNum: 5, verseNum: 4 })).toBe('DEU 5:4');
  expect(formatScrRef({ bookNum: 66, chapterNum: 4, verseNum: 6 }, undefined, '.')).toBe('REV 4.6');
  expect(formatScrRef({ bookNum: 2, chapterNum: 10, verseNum: 1 }, 'id', ';', '-')).toBe(
    'EXO-10;1',
  );
});

test('format reference using English book name', async () => {
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

test('format reference using arbitrary book name, abbrev, etc.', async () => {
  expect(formatScrRef({ bookNum: 5, chapterNum: 5, verseNum: 4 }, 'Deuteronomio')).toBe(
    'Deuteronomio 5:4',
  );
  expect(formatScrRef({ bookNum: 66, chapterNum: 4, verseNum: 6 }, 'Rev.', '.')).toBe('Rev. 4.6');
  expect(formatScrRef({ bookNum: 2, chapterNum: 10, verseNum: 1 }, 'Ex', ';', '-')).toBe('Ex-10;1');
});
