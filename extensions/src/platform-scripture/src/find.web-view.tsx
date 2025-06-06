import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useLocalizedStrings, useProjectSetting } from '@papi/frontend/react';
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
  return (
    <ScopeSelector
      scope={scope}
      availableScopes={['book', 'chapter', 'selectedBooks']}
      onScopeChange={setScope}
      availableBookInfo={booksPresent}
      selectedBookIds={selectedBookIds}
      onSelectedBookIdsChange={setSelectedBookIds}
      localizedStrings={localizedStrings}
    />
  );
};
