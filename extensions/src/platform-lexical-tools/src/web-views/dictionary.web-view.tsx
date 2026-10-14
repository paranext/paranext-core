import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalizedStrings, useSetting } from '@papi/frontend/react';
import papi, { logger } from '@papi/frontend';
import { WebViewProps } from '@papi/core';
import { useTabIconSelection, type TabIconUrls } from 'platform-bible-react';
import { Entry, LexicalReferenceSelector } from 'platform-lexical-tools';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { Dictionary } from './dictionary.component';
import { DICTIONARY_LOCALIZED_STRING_KEYS } from '../utils/dictionary-ui.utils';
import { DICTIONARY_TITLE_KEY, DictionaryScope } from '../utils/dictionary.utils';

const DICTIONARY_ICON_URLS: TabIconUrls = {
  lightDefault: 'papi-extension://platformLexicalTools/assets/book-a.svg',
  dark: 'papi-extension://platformLexicalTools/assets/book-a-dark.svg',
  lightSelected: 'papi-extension://platformLexicalTools/assets/book-a-selected.svg',
  lightUnselected: 'papi-extension://platformLexicalTools/assets/book-a-unselected.svg',
};

/**
 * Thin data-loader for the dictionary. It wires PAPI to the props of `Dictionary`, which owns the
 * orchestration (scope/search/selection state and the search-text filtering). Scope/reference- and
 * entry-dependent reads are passed as imperative callbacks.
 */
globalThis.webViewComponent = function DictionaryWebView({
  updateWebViewDefinition,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => DICTIONARY_LOCALIZED_STRING_KEYS, []),
  );
  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();

  // #region Tab icon (Power and Simple mode — product decision; see main.ts)

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
    let disposed = false;
    let unsubscribe: (() => void) | undefined;
    papi.themes
      .subscribeCurrentTheme(undefined, (theme) => {
        if (!isPlatformError(theme)) setIsDarkTheme(theme.type === 'dark');
      })
      .then((unsub) => {
        if (disposed) unsub();
        else unsubscribe = unsub;
        return undefined;
      })
      .catch((e) => logger.warn(`Failed to subscribe to the current theme: ${getErrorMessage(e)}`));
    return () => {
      disposed = true;
      unsubscribe?.();
    };
  }, []);

  const tabIconUrl = useTabIconSelection(isDarkTheme, DICTIONARY_ICON_URLS);
  useEffect(() => {
    updateWebViewDefinition({ iconUrl: tabIconUrl });
  }, [tabIconUrl, updateWebViewDefinition]);

  // #endregion

  // #region Tab tooltip (Simple mode only; see main.ts for why Power mode must not gain one)

  const [interfaceModePossiblyError] = useSetting('platform.interfaceMode', 'simple');
  const isPowerMode = useMemo(() => {
    if (isPlatformError(interfaceModePossiblyError)) {
      logger.warn(`Error getting interface mode: ${getErrorMessage(interfaceModePossiblyError)}`);
      return false;
    }
    return interfaceModePossiblyError === 'power';
  }, [interfaceModePossiblyError]);

  // `main.ts` resolves the tooltip once, when the tab opens/reloads; this keeps it current when the
  // interface language changes afterward, which doesn't reload the tab.
  useEffect(() => {
    const resolvedTitle = localizedStrings[DICTIONARY_TITLE_KEY];
    if (!resolvedTitle) return;
    updateWebViewDefinition({ tooltip: isPowerMode ? undefined : resolvedTitle });
  }, [localizedStrings, isPowerMode, updateWebViewDefinition]);

  // #endregion

  const onSelectOccurrence = useCallback(
    (scrRefOfOccurrence: SerializedVerseRef) => {
      setScrRef(scrRefOfOccurrence);
    },
    [setScrRef],
  );

  // Read the scope-filtered entries for the current reference. Verse reference filtering is done by
  // the data source; the component handles search-text filtering.
  const getEntries = useCallback(async (scope: DictionaryScope, ref: SerializedVerseRef) => {
    const selector: LexicalReferenceSelector = {
      book: ref.book,
      chapterNum: ref.chapterNum,
      ...(scope === 'verse' && { verseNum: ref.verseNum }),
    };
    try {
      const dp = await papi.dataProviders.get('platformLexicalTools.lexicalReferenceService');
      if (!dp) throw new Error('Could not get lexical reference service data provider');
      const entriesById = await dp.getEntriesById(selector);
      return { entriesById: entriesById ?? {} };
    } catch (e) {
      const error = getErrorMessage(e);
      logger.error(`Error getting entries by ID: ${error}`);
      return { entriesById: {}, error };
    }
  }, []);

  // Fetch the full (unfiltered) data for the displayed entry. The selector filters by
  // lexicalReferenceTextId so there will only be one matching entry array.
  const getFullEntry = useCallback(async (entry: Entry) => {
    const selector: LexicalReferenceSelector = {
      itemId: entry.id,
      lexicalReferenceTextId: entry.lexicalReferenceTextId,
    };
    try {
      const dp = await papi.dataProviders.get('platformLexicalTools.lexicalReferenceService');
      if (!dp) throw new Error('Could not get lexical reference service data provider');
      const fullEntriesById = await dp.getEntriesById(selector);
      if (!fullEntriesById || isPlatformError(fullEntriesById)) return undefined;
      return fullEntriesById[entry.id]?.[0];
    } catch (e) {
      logger.error(`Error getting full entry by ID: ${getErrorMessage(e)}`);
      return undefined;
    }
  }, []);

  return (
    <Dictionary
      localizedStrings={localizedStrings}
      scrRef={scrRef}
      onSelectOccurrence={onSelectOccurrence}
      getEntries={getEntries}
      getFullEntry={getFullEntry}
    />
  );
};
