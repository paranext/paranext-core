import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useLocalizedStrings, useProjectSetting } from '@papi/frontend/react';
import { Canon } from '@sillsdev/scripture';
import { Scope, SCOPE_SELECTOR_STRING_KEYS, ScopeSelector } from 'platform-bible-react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useMemo } from 'react';

const BOOKS_PRESENT_DEFAULT: string = '';

global.webViewComponent = function FindWebView({ projectId, useWebViewState }: WebViewProps) {
  const [scope, setScope] = useWebViewState<Scope>('findScope', 'book');
  const [selectedBookIds, setSelectedBookIds] = useWebViewState<string[]>('selectedBooks', []);

  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return Array.from(SCOPE_SELECTOR_STRING_KEYS);
    }, []),
  );

  const [booksPresentPossiblyError] = useProjectSetting(
    projectId,
    'platformScripture.booksPresent',
    BOOKS_PRESENT_DEFAULT,
  );

  const booksPresent: string = useMemo(() => {
    if (isPlatformError(booksPresentPossiblyError)) {
      logger.warn(`Error getting books present: ${getErrorMessage(booksPresentPossiblyError)}`);
      return BOOKS_PRESENT_DEFAULT;
    }
    return booksPresentPossiblyError;
  }, [booksPresentPossiblyError]);

  const availableBooksIds = useMemo(() => {
    return Canon.allBookIds.filter(
      (bookId, index) =>
        booksPresent[index] === '1' && !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
    );
  }, [booksPresent]);

  const availableBooksLocalizationKeys = useMemo(() => {
    const keys: `%${string}%`[] = [];
    availableBooksIds.forEach((book) => {
      keys.push(`%LocalizedId.${book}%` as const);
      keys.push(`%Book.${book}%` as const);
    });
    return keys;
  }, [availableBooksIds]);

  // Get all localized values
  const [localizedBookIdsAndShortNames] = useLocalizedStrings(availableBooksLocalizationKeys);

  // Create a map of book data, exported for use elsewhere if needed
  const localizedBookData = useMemo(() => {
    const data = new Map<string, { localizedId: string; localizedName: string }>();
    availableBooksIds.forEach((book) => {
      data.set(book, {
        localizedId: localizedBookIdsAndShortNames[`%LocalizedId.${book}%` as const],
        localizedName: localizedBookIdsAndShortNames[`%Book.${book}%` as const],
      });
    });
    return data;
  }, [localizedBookIdsAndShortNames]);

  return (
    <ScopeSelector
      scope={scope}
      availableScopes={['book', 'chapter', 'selectedBooks']}
      onScopeChange={setScope}
      availableBookInfo={booksPresent}
      selectedBookIds={selectedBookIds}
      onSelectedBookIdsChange={setSelectedBookIds}
      localizedStrings={localizedStrings}
      localizedBookNames={localizedBookData}
    />
  );
};
