import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CheckInputRange,
  CheckRunnerCheckDetails,
  CheckRunResult,
  CheckSubscriptionId,
  SettableCheckDetails,
} from 'platform-scripture';
import { useData, useDataProvider, useLocalizedStrings } from '@papi/frontend/react';
import { VerseRef } from '@sillsdev/scripture';
import { LocalizeKey, ScriptureReference } from 'platform-bible-utils';
import { Spinner } from 'platform-bible-react';
import CheckCard, { CheckStates } from './checks/checks-side-panel/check-card.component';

const defaultCheckRunnerCheckDetails: CheckRunnerCheckDetails = {
  checkDescription: '',
  checkId: '',
  checkName: '',
  enabledProjectIds: [''],
};

const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_checksSidePanel_fixedBadge_title%',
  '%webView_checksSidePanel_deniedBadge_title%',
  '%webView_checksSidePanel_checkingBadge_title%',
  '%webView_checksSidePanel_focusedCheckDropdown_denyItem%',
  '%webView_checksSidePanel_focusedCheckDropdown_settingsItem%',
  '%webView_checksSidePanel_loadingCheckResults%',
  '%webView_checksSidePanel_noCheckResults%',
];

global.webViewComponent = function ChecksSidePanelWebView({
  projectId,
  useWebViewScrollGroupScrRef,
  useWebViewState,
}: WebViewProps) {
  const [scrRef, setScrRef, ,] = useWebViewScrollGroupScrRef();
  const [selectedCheckId, setSelectedCheckId] = useState<string>('');
  const [subscriptionId] = useWebViewState<CheckSubscriptionId>('subscriptionId', '');
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRINGS);

  const checkAggregator = useDataProvider('platformScripture.checkAggregator');

  const [availableChecks, setAvailableChecks, isLoadingAvailableChecks] = useData(
    'platformScripture.checkAggregator',
  ).AvailableChecks(
    subscriptionId,
    useMemo(() => [defaultCheckRunnerCheckDetails], []),
  );

  const defaultScriptureRange: CheckInputRange = useMemo(() => {
    return {
      projectId: projectId ?? '',
      start: new VerseRef(1, 1, 1),
    };
  }, [projectId]);

  const [, setActiveRanges, isLoadingActiveRanges] = useData(
    'platformScripture.checkAggregator',
  ).ActiveRanges(
    subscriptionId,
    useMemo(() => [defaultScriptureRange], [defaultScriptureRange]),
  );

  const [, setIncludeDeniedResults, isLoadingIncludeDeniedResults] = useData(
    'platformScripture.checkAggregator',
  ).IncludeDeniedResults(subscriptionId, true);

  const checkInputRange: CheckInputRange = useMemo(() => {
    return {
      projectId: projectId ?? '',
      start: new VerseRef(scrRef.bookNum, scrRef.chapterNum, 1),
      end: new VerseRef(scrRef.bookNum, scrRef.chapterNum, 1),
    };
  }, [projectId, scrRef.bookNum, scrRef.chapterNum]);

  const settableCheckDetails: SettableCheckDetails = useMemo(() => {
    return {
      checkId: 'RepeatedWord',
      enabledProjectIds: [projectId ?? ''],
    };
  }, [projectId]);

  // Force the web view to show Repeated Words check results for the current scripture range since filters are not currently applied
  useEffect(() => {
    async function updateChecksAndRanges() {
      if (setAvailableChecks) await setAvailableChecks([settableCheckDetails]);
      if (setActiveRanges) await setActiveRanges([checkInputRange]);
      if (setIncludeDeniedResults) await setIncludeDeniedResults(true);
    }
    updateChecksAndRanges();
  }, [
    checkInputRange,
    projectId,
    setActiveRanges,
    setAvailableChecks,
    setIncludeDeniedResults,
    settableCheckDetails,
  ]);

  const [checkResults, , isLoadingCheckResults] = useData(
    'platformScripture.checkAggregator',
  ).CheckResults(
    subscriptionId,
    useMemo(() => [], []),
  );

  const openSettingsAndInventories = useCallback(() => {
    logger.info('Open check settings and inventories');
  }, []);

  // Used messageFormatString because result.selectedText is the entire verse.
  const writeCheckTitle = useCallback((result: CheckRunResult) => {
    if (!result || !result.messageFormatString) return '';
    const [, extractedWord] = result.messageFormatString.match(/\|\|(.*?)\|\|/) || [];

    return `${result.verseRef.book} ${result.verseRef.chapter}:${result.verseRef.verse} ${extractedWord} ${extractedWord}`;
  }, []);

  /**
   * Creates a unique identifier for a CheckRunResult, used to provide a unique key to the UI and to
   * track which check result is selected.
   */
  const writeCheckId = useMemo(
    () => (result: CheckRunResult, index: number) =>
      `${result.checkResultUniqueId || ''}__${result.verseRef.book}_${result.verseRef.chapter}_${result.verseRef.verse}__${result.checkResultType}__${index}`,
    [],
  );

  const getLocalizedCheckDescription = useCallback(
    (checkId: string) => {
      return availableChecks.find((check) => check.checkId === checkId)?.checkDescription ?? '';
    },
    [availableChecks],
  );

  // TODO: Should scroll to and highlight the characters or marker identified by the check result, or the verse(s) if not any. Waiting on https://github.com/paranext/paranext-core/issues/1215
  /**
   * Scrolls the editor to the reference of the selected check result by setting the scripture
   * reference of the scroll group shared by the side panel and the editor.
   *
   * @param id - The unique identifier of the selected check result.
   */
  const scrollToCheckReferenceInEditor = useCallback(
    (id: string) => {
      const selectedResult = checkResults?.find(
        (result, index) => writeCheckId(result, index) === id,
      );

      if (!selectedResult) return;

      const selectedCheckScrRef: ScriptureReference = {
        bookNum: selectedResult.verseRef.bookNum,
        chapterNum: selectedResult.verseRef.chapterNum,
        verseNum: selectedResult.verseRef.verseNum,
      };

      setScrRef(selectedCheckScrRef);
    },
    [checkResults, setScrRef, writeCheckId],
  );

  const handleSelectCheck = useCallback(
    async (id: string) => {
      const newId = id === selectedCheckId ? '' : id;
      setSelectedCheckId(newId);
      scrollToCheckReferenceInEditor(newId);
    },
    [scrollToCheckReferenceInEditor, selectedCheckId],
  );

  const handleDenyCheck = useCallback(
    async (result: CheckRunResult) => {
      if (!result || !result.checkId || !projectId || !checkAggregator) return false;

      const denyResultSuccess = await checkAggregator.denyCheckResult(
        result.checkId,
        result.checkResultType,
        projectId,
        result.verseRef,
        result.selectedText,
        result.checkResultUniqueId,
      );

      return denyResultSuccess;
    },
    [checkAggregator, projectId],
  );

  const handleAllowCheck = useCallback(
    async (result: CheckRunResult) => {
      if (!result || !result.checkId || !projectId || !checkAggregator) return false;

      const allowResultStatus = await checkAggregator.allowCheckResult(
        result.checkId,
        result.checkResultType,
        projectId,
        result.verseRef,
        result.selectedText,
        result.checkResultUniqueId,
      );

      return allowResultStatus;
    },
    [checkAggregator, projectId],
  );

  if (
    isLoadingCheckResults ||
    isLoadingAvailableChecks ||
    isLoadingActiveRanges ||
    isLoadingIncludeDeniedResults ||
    !checkAggregator
  )
    return (
      <div className="pr-twp tw-h-screen tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2">
        <Spinner />
        <span className="tw-text-sm">
          {localizedStrings['%webView_checksSidePanel_loadingCheckResults%']}
        </span>
      </div>
    );

  return (
    <div className="pr-twp">
      <p>{subscriptionId}</p>
      <div className="check-card-container">
        {checkResults?.length === 0 ? (
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-screen tw-w-full">
            <span className="tw-text-sm">
              {localizedStrings['%webView_checksSidePanel_noCheckResults%']}
            </span>
          </div>
        ) : (
          checkResults?.map((result, index) => (
            <CheckCard
              key={writeCheckId(result, index)}
              checkResult={result}
              checkId={writeCheckId(result, index)}
              isSelected={selectedCheckId === writeCheckId(result, index)}
              handleSelectCheck={handleSelectCheck}
              checkCardTitle={writeCheckTitle(result)}
              checkState={result.isDenied ? CheckStates.Denied : CheckStates.DefaultFailed}
              handleDenyCheck={handleDenyCheck}
              handleAllowCheck={handleAllowCheck}
              handleOpenSettingsAndInventories={openSettingsAndInventories}
              showBadge
              checkName={getLocalizedCheckDescription(result.checkId ?? result.checkResultType)}
            />
          ))
        )}
      </div>
    </div>
  );
};
