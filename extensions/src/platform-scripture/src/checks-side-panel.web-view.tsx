import { WebViewProps } from '@papi/core';
import papi from '@papi/frontend';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CheckInputRange,
  CheckRunnerCheckDetails,
  CheckRunResult,
  CheckSubscriptionId,
  SettableCheckDetails,
} from 'platform-scripture';
import {
  useData,
  useDataProvider,
  useLocalizedStrings,
  useWebViewController,
} from '@papi/frontend/react';
import { VerseRef } from '@sillsdev/scripture';
import { getChaptersForBook, LocalizeKey } from 'platform-bible-utils';
import { Spinner } from 'platform-bible-react';
import { ScriptureLocation } from 'platform-scripture-editor';
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
  const [scrRef, , ,] = useWebViewScrollGroupScrRef();
  const [selectedCheckId, setSelectedCheckId] = useState<string>('');
  const [editorWebViewId] = useWebViewState<string | undefined>('editorWebViewId', undefined);
  const [subscriptionId] = useWebViewState<CheckSubscriptionId>('subscriptionId', '');
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRINGS);

  const editorWebViewController = useWebViewController(
    'platformScriptureEditor.react',
    editorWebViewId,
  );

  const checkAggregator = useDataProvider('platformScripture.checkAggregator');

  const [, setAvailableChecks, isLoadingAvailableChecks] = useData(
    'platformScripture.checkAggregator',
  ).AvailableChecks(subscriptionId, [defaultCheckRunnerCheckDetails]);

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

  const checkInputRange: CheckInputRange = useMemo(() => {
    return {
      projectId: projectId ?? '',
      start: new VerseRef(scrRef.bookNum, scrRef.chapterNum, scrRef.verseNum),
      end: new VerseRef(scrRef.bookNum, scrRef.chapterNum, getChaptersForBook(scrRef.bookNum)),
    };
  }, [projectId, scrRef.bookNum, scrRef.chapterNum, scrRef.verseNum]);

  const settableCheckDetails: SettableCheckDetails = useMemo(() => {
    return {
      checkId: 'RepeatedWord',
      enabledProjectIds: [projectId ?? ''],
    };
  }, [projectId]);

  // Force the web view to show Repeated Words check results for the current scripture range since filters are not currently applied
  useEffect(() => {
    if (setAvailableChecks) setAvailableChecks([settableCheckDetails]);
    if (setActiveRanges) setActiveRanges([checkInputRange]);
  }, [checkInputRange, projectId, setActiveRanges, setAvailableChecks, settableCheckDetails]);

  const [checkResults, , isLoadingCheckResults] = useData(
    'platformScripture.checkAggregator',
  ).CheckResults(subscriptionId, [], {
    retrieveDataImmediately: true,
    whichUpdates: '*',
  });

  const openConfigureChecks = useCallback(() => {
    papi.commands.sendCommand('platformScripture.openConfigureChecks', projectId);
  }, [projectId]);

  // TODO: Used messageFormatString because result.selectedText is not defined.
  const writeCheckTitle = useCallback((result: CheckRunResult) => {
    if (!result || !result.messageFormatString) return '';
    const [, extractedWord] = result.messageFormatString.match(/\|\|(.*?)\|\|/) || [];

    return `${result.verseRef.book} ${result.verseRef.chapter}:${result.verseRef.verse} ${extractedWord} ${extractedWord}`;
  }, []);

  const writeCheckId = (result: CheckRunResult, index: number) =>
    `${index}${result.checkResultType}`;

  // const scrollToCheckReferenceInEditor = useCallback(
  //   (id: string) => {
  //     const selectedResult = checkResults?.find(
  //       (result, index) => writeCheckId(result, index) === id,
  //     );

  //     if (!selectedResult) return;

  //     const selectedCheckScrRef: ScriptureReference = {
  //       bookNum: selectedResult.verseRef.bookNum,
  //       chapterNum: selectedResult.verseRef.chapterNum,
  //       verseNum: selectedResult.verseRef.verseNum,
  //     };

  //     setScrRef(selectedCheckScrRef);
  //   },
  //   [checkResults, setScrRef],
  // );

  // TODO: Function for getting selectedResult
  // TODO: Is this highlighting text in the editor? Do we still need to update the scrRef?
  /**
   * Selects a range in the editor based on the provided check result ID. This function is used to
   * highlight the text in the editor that corresponds to a specific check result. Adapted from
   * onRowSelected in CheckingResultsListWebView.
   *
   * @param id - The ID of the check result to select.
   * @returns Promise<void> - A promise that resolves when the range has been selected.
   */
  const selectRange = useCallback(
    async (id: string) => {
      const selectedResult = checkResults?.find(
        (result, index) => writeCheckId(result, index) === id,
      );

      if (!selectedResult || !editorWebViewController || !editorWebViewId) return;

      // eslint-disable-next-line no-console
      // console.log('selectedResult', {
      //   start: selectedResult.start,
      //   end: selectedResult.end,
      // });

      const startOffset = selectedResult.start.offset ?? 0;
      const start: ScriptureLocation =
        'jsonPath' in selectedResult.start
          ? {
              bookNum: selectedResult.verseRef.bookNum,
              chapterNum: selectedResult.verseRef.chapterNum,
              jsonPath: selectedResult.start.jsonPath,
              offset: startOffset,
            }
          : {
              scrRef: {
                bookNum: selectedResult.verseRef.bookNum,
                chapterNum: selectedResult.verseRef.chapterNum,
                verseNum: selectedResult.verseRef.verseNum,
              },
              offset: startOffset,
            };

      let end: ScriptureLocation = { ...start, offset: start.offset ?? 0 };
      if (selectedResult.end) {
        const endOffset = selectedResult.start.offset ?? end.offset;
        end =
          'jsonPath' in selectedResult.end
            ? {
                bookNum: selectedResult.verseRef.bookNum,
                chapterNum: selectedResult.verseRef.chapterNum,
                jsonPath: selectedResult.end.jsonPath,
                offset: endOffset,
              }
            : {
                scrRef: {
                  bookNum: selectedResult.verseRef.bookNum,
                  chapterNum: selectedResult.verseRef.chapterNum,
                  verseNum: selectedResult.verseRef.verseNum,
                },
                offset: endOffset,
              };
      }

      await editorWebViewController.selectRange({
        start,
        end,
      });
    },
    [checkResults, editorWebViewController, editorWebViewId],
  );

  // TODO: Should scroll to and highlight the characters or marker identified by the check result, or the verse(s) if not any
  const handleSelectCheck = useCallback(
    async (id: string) => {
      const newId = id === selectedCheckId ? '' : id;
      setSelectedCheckId(newId);
      await selectRange(newId);
    },
    [selectRange, selectedCheckId],
  );

  // TODO: This is not working, but you can see the checks are reloaded through console messages
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

      return denyResultSuccess || false;
    },
    [checkAggregator, projectId],
  );

  // TODO: This is not working, check is never "denied" so I can't test this
  const handleAllowCheck = useCallback(
    async (result: CheckRunResult) => {
      if (!result || !result.checkId || !projectId) return false;

      const allowResultStatus = await checkAggregator?.allowCheckResult(
        result.checkId,
        result.checkResultType,
        projectId,
        result.verseRef,
        result.selectedText,
        result.checkResultUniqueId,
      );

      return allowResultStatus || false;
    },
    [checkAggregator, projectId],
  );

  if (
    isLoadingCheckResults ||
    isLoadingAvailableChecks ||
    isLoadingActiveRanges ||
    !checkAggregator
  )
    return (
      <div className="pr-twp checks-side-panel-web-view tw-h-full tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2">
        <Spinner />
        <span className="tw-text-sm">
          {localizedStrings['%webView_checksSidePanel_loadingCheckResults%']}
        </span>
      </div>
    );

  return (
    <div className="pr-twp checks-side-panel-web-view">
      <div className="check-card-container">
        {checkResults?.length === 0 ? (
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-w-full">
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
              checkTitle={writeCheckTitle(result)}
              checkState={result.isDenied ? CheckStates.Denied : CheckStates.DefaultFailed}
              handleDenyCheck={() => handleDenyCheck(result)}
              handleAllowCheck={() => handleAllowCheck(result)}
              handleOpenSettingsAndInventories={() => openConfigureChecks}
              showBadge
            />
          ))
        )}
      </div>
    </div>
  );
};
