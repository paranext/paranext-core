import { getLocalizedIdFromBookNumber } from './scripture-util';

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
