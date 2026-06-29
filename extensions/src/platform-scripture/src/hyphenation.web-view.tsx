import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useData, useLocalizedStrings, useProjectSetting } from '@papi/frontend/react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import type { HyphenationEntry, HyphenationEntryUpdate, HyphenationInfo } from 'platform-scripture';
import { useCallback, useMemo } from 'react';
import { Hyphenation } from './components/hyphenation.component';
import { HYPHENATION_STRING_KEYS } from './components/hyphenation.utils';

const ENTRIES_DEFAULT: HyphenationEntry[] = [];
// Matches the PT9 defaults for a project without a hyphenatedWords.txt file
const INFO_DEFAULT: HyphenationInfo = {
  fileExists: false,
  softHyphenOut: '­',
  hyphenatedMarkers: [],
  hadRedundancy: false,
  hadUppercase: false,
};
const TEXT_DIRECTION_DEFAULT = 'ltr';

/**
 * === NEW IN PT10 === Reason: Web view wiring layer (PAPI data subscription + mutation callbacks)
 * for the Hyphenation tool; PT9's equivalent plumbing is WinForms event handlers in WordListForm.
 * Maps to: research/paratext-9-features/05_Spelling_Wordlist.md §5.6
 */
global.webViewComponent = function HyphenationWebView({ projectId }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => Array.from(HYPHENATION_STRING_KEYS), []),
  );

  const selector = useMemo(() => ({ projectId: projectId ?? '' }), [projectId]);

  const [entriesPossiblyError, , areEntriesLoading] = useData(
    'platformScripture.hyphenationDataProvider',
  ).HyphenationEntries(selector, ENTRIES_DEFAULT);

  const entries = useMemo(() => {
    if (isPlatformError(entriesPossiblyError)) {
      logger.warn(`Error getting hyphenation entries: ${getErrorMessage(entriesPossiblyError)}`);
      return ENTRIES_DEFAULT;
    }
    return entriesPossiblyError;
  }, [entriesPossiblyError]);

  const [infoPossiblyError] = useData('platformScripture.hyphenationDataProvider').HyphenationInfo(
    selector,
    INFO_DEFAULT,
  );

  const info = useMemo(() => {
    if (isPlatformError(infoPossiblyError)) {
      logger.warn(`Error getting hyphenation info: ${getErrorMessage(infoPossiblyError)}`);
      return INFO_DEFAULT;
    }
    return infoPossiblyError;
  }, [infoPossiblyError]);

  const [textDirectionPossiblyError] = useProjectSetting(
    projectId,
    'platform.textDirection',
    TEXT_DIRECTION_DEFAULT,
  );

  const projectTextDirection = useMemo(() => {
    if (isPlatformError(textDirectionPossiblyError)) return TEXT_DIRECTION_DEFAULT;
    return textDirectionPossiblyError || TEXT_DIRECTION_DEFAULT;
  }, [textDirectionPossiblyError]);

  /**
   * Shared mutation path for upserts and deletes. Resolves to an error message (already localized
   * by the backend where applicable) on failure, or `undefined` on success.
   */
  const mutateEntry = useCallback(
    async (word: string, update: HyphenationEntryUpdate | undefined) => {
      try {
        if (!projectId) throw new Error('No project');
        const dataProvider = await papi.dataProviders.get(
          'platformScripture.hyphenationDataProvider',
        );
        if (!dataProvider) throw new Error('Hyphenation data provider is not available');
        await dataProvider.setHyphenationEntries({ projectId, word }, update);
        return undefined;
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        logger.warn(`Error updating hyphenation for "${word}": ${errorMessage}`);
        return errorMessage;
      }
    },
    [projectId],
  );

  const saveEntry = useCallback(
    async (word: string, hyphenation: string, isApproved: boolean) =>
      mutateEntry(word, { hyphenation, isApproved }),
    [mutateEntry],
  );

  const deleteEntry = useCallback(
    async (word: string) => mutateEntry(word, undefined),
    [mutateEntry],
  );

  // The open command requires an editor project context, so this only happens if a saved layout
  // restores the tab after its project was deleted/renamed. Render an explicit message rather
  // than an empty-but-interactive table.
  if (!projectId) {
    return (
      <div className="tw:p-4 tw:text-muted-foreground">
        {localizedStrings['%webView_hyphenation_noProject%'] ?? 'No project selected.'}
      </div>
    );
  }

  return (
    <Hyphenation
      entries={entries}
      isLoading={areEntriesLoading}
      hadRedundancy={info.hadRedundancy}
      hadUppercase={info.hadUppercase}
      projectTextDirection={projectTextDirection}
      localizedStrings={localizedStrings}
      onSaveEntry={saveEntry}
      onDeleteEntry={deleteEntry}
    />
  );
};
