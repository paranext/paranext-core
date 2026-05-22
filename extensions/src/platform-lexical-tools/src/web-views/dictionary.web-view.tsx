import { useCallback, useMemo } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import papi, { logger } from '@papi/frontend';
import { WebViewProps } from '@papi/core';
import { Entry, LexicalReferenceSelector } from 'platform-lexical-tools';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { Dictionary } from './dictionary.component';
import { DICTIONARY_LOCALIZED_STRING_KEYS } from '../utils/dictionary-ui.utils';
import { DictionaryScope } from '../utils/dictionary.utils';

/**
 * Thin data-loader for the dictionary. It wires PAPI to the props of `Dictionary`, which owns the
 * orchestration (scope/search/selection state and the search-text filtering). Scope/reference- and
 * entry-dependent reads are passed as imperative callbacks.
 */
globalThis.webViewComponent = function DictionaryWebView({
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => DICTIONARY_LOCALIZED_STRING_KEYS, []),
  );
  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();

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
