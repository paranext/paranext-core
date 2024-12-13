import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckInputRange,
  CheckRunnerCheckDetails,
  CheckRunResult,
  CheckSubscriptionId,
  SettableCheckDetails,
} from 'platform-scripture';
// import { ScriptureLocation, ScriptureRange } from 'platform-scripture-editor';
import { useData, useDataProvider } from '@papi/frontend/react';
import { VerseRef } from '@sillsdev/scripture';
import { getChaptersForBook, ScriptureReference } from 'platform-bible-utils';
import CheckCard, { CheckStates } from './checks/checks-side-panel/check-card.component';

const defaultCheckRunnerCheckDetails: CheckRunnerCheckDetails = {
  checkDescription: '',
  checkId: '',
  checkName: '',
  enabledProjectIds: [''],
};

// TODO - Localized strings
// TODO - handle deny check
// TODO - key warning, unique check id

global.webViewComponent = function ChecksSidePanelWebView({
  projectId,
  useWebViewScrollGroupScrRef,
  // useWebViewState,
}: WebViewProps) {
  const [scrRef, setScrRef, ,] = useWebViewScrollGroupScrRef();
  // const [editorWebViewId] = useWebViewState('editorWebViewId', '');

  // const editorWebViewController = useWebViewController(
  //   'platformScriptureEditor.react',
  //   editorWebViewId,
  // );

  const [selectedCheckId, setSelectedCheckId] = useState<string>('');
  const checkAggregator = useDataProvider('platformScripture.checkAggregator');

  // Obtain a subscription ID and cleanup old subscriptions
  const [subscriptionId, setSubscriptionId] = useState<CheckSubscriptionId>('');
  const subscriptionIdRef = useRef<CheckSubscriptionId>('');
  useEffect(() => {
    const fetchSubscriptionId = async () => {
      const subId = await checkAggregator?.createSubscription();
      if (subId) {
        logger.debug(`Created check subscription: ${subId}`);
        setSubscriptionId(subId);
        subscriptionIdRef.current = subId;
      }
    };

    fetchSubscriptionId();

    return () => {
      if (subscriptionIdRef.current) {
        checkAggregator?.deleteSubscription(subscriptionIdRef.current);
        logger.debug(`Deleted check subscription: ${subscriptionIdRef.current}`);
      }
    };
  }, [checkAggregator]);

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

  // Need to force the web view to show Repeated Words check results for the current scripture range
  useEffect(() => {
    if (setAvailableChecks) setAvailableChecks([settableCheckDetails]);
    if (setActiveRanges) setActiveRanges([checkInputRange]);
  }, [checkInputRange, projectId, setActiveRanges, setAvailableChecks, settableCheckDetails]);

  const [checkResults, , isLoadingCheckResults] = useData(
    'platformScripture.checkAggregator',
  ).CheckResults(subscriptionId, []);

  const openConfigureChecks = useCallback(() => {
    papi.commands.sendCommand('platformScripture.openConfigureChecks', projectId);
  }, [projectId]);

  const writeCheckTitle = useCallback((result: CheckRunResult) => {
    if (!result || !result.messageFormatString) return '';
    const [, extractedWord] = result.messageFormatString.match(/\|\|(.*?)\|\|/) || [];

    return `${result.verseRef.book} ${result.verseRef.chapter}:${result.verseRef.verse} ${extractedWord} ${extractedWord}`;
  }, []);

  const writeCheckId = (result: CheckRunResult, index: number) =>
    `${index}${result.checkResultType}`;

  const scrollToCheckReferenceInEditor = useCallback(
    (id: string) => {
      const selectedResult = checkResults?.find(
        (result, index) => writeCheckId(result, index) === id,
      );

      if (!selectedResult) return undefined;

      // TODO - Investigate selectedResult.selectedText and selectRange()
      // const startScriptureLocation: ScriptureLocation = {
      //   scrRef: {
      //     bookNum: selectedResult.verseRef.bookNum,
      //     chapterNum: selectedResult.verseRef.chapterNum,
      //     verseNum: selectedResult.verseRef.verseNum,
      //   },
      //   offset: selectedResult.start.offset ?? 0,
      // };

      // console.log(
      //   `START SCRIPTURE LOCATION ${JSON.stringify(startScriptureLocation.scrRef)} ${JSON.stringify(startScriptureLocation.offset)}`,
      // );

      // const endScriptureLocation: ScriptureLocation = {
      //   scrRef: {
      //     bookNum: selectedResult.verseRef.bookNum,
      //     chapterNum: selectedResult.verseRef.chapterNum,
      //     verseNum: selectedResult.verseRef.verseNum,
      //   },
      //   offset: selectedResult.end.offset ?? 0,
      // };

      // console.log(
      //   `END SCRIPTURE LOCATION ${JSON.stringify(endScriptureLocation.scrRef)} ${JSON.stringify(endScriptureLocation.offset)}`,
      // );

      // const scriptureRange: ScriptureRange = {
      //   start: startScriptureLocation,
      //   end: endScriptureLocation,
      // };
      // editorWebViewController?.selectRange(scriptureRange);

      const selectedCheckScrRef: ScriptureReference = {
        bookNum: selectedResult.verseRef.bookNum,
        chapterNum: selectedResult.verseRef.chapterNum,
        verseNum: selectedResult.verseRef.verseNum,
      };

      setScrRef(selectedCheckScrRef);
    },
    [checkResults, setScrRef],
  );

  const handleSelectCheck = useCallback(
    (id: string) => {
      const newId = id === selectedCheckId ? '' : id;
      setSelectedCheckId(newId);

      scrollToCheckReferenceInEditor(newId);
    },
    [scrollToCheckReferenceInEditor, selectedCheckId],
  );

  if (
    isLoadingCheckResults ||
    isLoadingAvailableChecks ||
    isLoadingActiveRanges ||
    !checkAggregator
  )
    return 'Loading Checks';

  return (
    <div className="checks-side-panel-web-view">
      <div className="check-card-container">
        {checkResults?.map((result, index) => (
          <CheckCard
            checkId={writeCheckId(result, index)}
            isSelected={selectedCheckId === writeCheckId(result, index)}
            handleSelectCheck={handleSelectCheck}
            checkTitle={writeCheckTitle(result)}
            checkState={result.isDenied ? CheckStates.Denied : CheckStates.DefaultFailed}
            // handleDenyCheck={() => setSelectedCheckId(writeCheckId(result))}
            handleOpenSettingsAndInventories={() => openConfigureChecks}
            checkType={result.checkResultType}
            showBadge
          />
        ))}
      </div>
    </div>
  );
};
