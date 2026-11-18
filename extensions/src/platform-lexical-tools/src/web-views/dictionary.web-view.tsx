import { useCallback, useEffect, useMemo } from 'react';
import { useLocalizedStrings, useSetting } from '@papi/frontend/react';
import papi, { logger } from '@papi/frontend';
import { WebViewProps } from '@papi/core';
import { Entry, LexicalEntriesById, LexicalReferenceSelector } from 'platform-lexical-tools';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { Dictionary } from './dictionary.component';
import { DICTIONARY_LOCALIZED_STRING_KEYS } from '../utils/dictionary-ui.utils';
import { DICTIONARY_TITLE_KEY, DictionaryScope } from '../utils/dictionary.utils';

/**
 * Reads entries through the lexical reference service.
 *
 * @param selector - Which entries to read.
 * @param description - What is being read, for the log if it fails.
 * @returns The entries, or `undefined` if they could not be read (the reason is logged).
 */
async function getEntriesBySelector(
  selector: LexicalReferenceSelector,
  description: string,
): Promise<LexicalEntriesById | undefined> {
  try {
    const dp = await papi.dataProviders.get('platformLexicalTools.lexicalReferenceService');
    if (!dp) throw new Error('Could not get lexical reference service data provider');
    const entriesById = await dp.getEntriesById(selector);
    if (!entriesById || isPlatformError(entriesById)) return undefined;
    return entriesById;
  } catch (e) {
    logger.error(`Error getting ${description}: ${getErrorMessage(e)}`);
    return undefined;
  }
}

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
  // Like Paratext 9's MarbleHideIrrelevantMeanings, hiding less-relevant senses is the reader's
  // preference for every entry and every Dictionary tab, so it is a setting
  const [areLessRelevantSensesHiddenPossiblyError, setAreLessRelevantSensesHiddenSetting] =
    useSetting('platformLexicalTools.hideLessRelevantSenses', false);
  const areLessRelevantSensesHidden = useMemo(() => {
    if (isPlatformError(areLessRelevantSensesHiddenPossiblyError)) {
      logger.warn(
        'Failed to load setting platformLexicalTools.hideLessRelevantSenses; treating as false',
        areLessRelevantSensesHiddenPossiblyError,
      );
      return false;
    }
    return areLessRelevantSensesHiddenPossiblyError;
  }, [areLessRelevantSensesHiddenPossiblyError]);
  const setAreLessRelevantSensesHidden = useCallback(
    (areHidden: boolean) => {
      // The write's result is not needed; the setting's new value comes back through `useSetting`
      Promise.resolve(setAreLessRelevantSensesHiddenSetting?.(areHidden)).catch((e) => {
        logger.warn(
          `Failed to save setting platformLexicalTools.hideLessRelevantSenses: ${getErrorMessage(e)}`,
        );
      });
    },
    [setAreLessRelevantSensesHiddenSetting],
  );

  // `main.ts` resolves the tooltip once, when the tab opens/reloads; this effect keeps it current
  // afterward too, since a locale change doesn't reload the tab. Set unconditionally (no Power/Simple
  // gate), matching main.ts's own tooltip field: `PlatformTabTitle` already suppresses a tooltip
  // that merely repeats the visible title unless the tab is icon-only.
  //
  // `useLocalizedStrings` seeds every key to itself both while loading and on a provider error
  // (use-localized-strings-hook.ts) — so the guard compares against the key itself, not a truthy
  // check, to tell "really resolved" apart from either sentinel case.
  useEffect(() => {
    const resolvedTooltip = localizedStrings[DICTIONARY_TITLE_KEY];
    if (resolvedTooltip === DICTIONARY_TITLE_KEY) return;
    updateWebViewDefinition({ tooltip: resolvedTooltip });
  }, [localizedStrings, updateWebViewDefinition]);

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
    const fullEntriesById = await getEntriesBySelector(
      { itemId: entry.id, lexicalReferenceTextId: entry.lexicalReferenceTextId },
      'full entry by ID',
    );
    return fullEntriesById?.[entry.id]?.[0];
  }, []);

  // Fetch the entry an in-definition link points to. Lemmas are unique within a lexical reference
  // text, so there is at most one match.
  const getEntryByLemma = useCallback(async (dictionaryId: string, lemma: string) => {
    const entriesById = await getEntriesBySelector(
      { lemma, lexicalReferenceTextId: dictionaryId },
      'entry by lemma',
    );
    return entriesById && Object.values(entriesById).flat()[0];
  }, []);

  return (
    <Dictionary
      localizedStrings={localizedStrings}
      scrRef={scrRef}
      onSelectOccurrence={onSelectOccurrence}
      getEntries={getEntries}
      getFullEntry={getFullEntry}
      getEntryByLemma={getEntryByLemma}
      areLessRelevantSensesHidden={areLessRelevantSensesHidden}
      onAreLessRelevantSensesHiddenChange={setAreLessRelevantSensesHidden}
    />
  );
};
