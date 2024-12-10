/* eslint-disable no-console */
import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckInputRange,
  CheckRunResult,
  CheckSubscriptionId,
  SettableCheckDetails,
} from 'platform-scripture';
import { useData, useDataProvider } from '@papi/frontend/react';
import { VerseRef } from '@sillsdev/scripture';
import CheckCard, { CheckStates } from './checks/checks-side-panel/check-card.component';

global.webViewComponent = function ChecksSidePanelWebView({ projectId }: WebViewProps) {
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

  const checkInputRange: CheckInputRange = useMemo(() => {
    return {
      projectId: projectId ?? '',
      start: new VerseRef(3, 16, 1),
      end: new VerseRef(3, 16, 34),
    };
  }, [projectId]);

  const settableCheckDetails: SettableCheckDetails = useMemo(() => {
    return {
      checkId: 'RepeatedWord',
      enabledProjectIds: [projectId ?? ''],
    };
  }, [projectId]);

  useEffect(() => {
    checkAggregator?.setActiveRanges(subscriptionId, [checkInputRange]);
    checkAggregator?.setAvailableChecks(subscriptionId, [settableCheckDetails]);
  }, [checkAggregator, checkInputRange, settableCheckDetails, subscriptionId]);

  const [checkResults] = useData('platformScripture.checkAggregator').CheckResults(
    subscriptionId,
    [],
  );

  const openConfigureChecks = useCallback(() => {
    papi.commands.sendCommand('platformScripture.openConfigureChecks', projectId);
  }, [projectId]);

  const writeCheckTitle = useCallback((result: CheckRunResult) => {
    // TODO why is result.selectedText undefined
    const [, extractedWord] = result.messageFormatString.match(/\|\|(.*?)\|\|/) || [];

    return `${result.verseRef.book} ${result.verseRef.chapter}:${result.verseRef.verse} ${extractedWord} ${extractedWord}`;
  }, []);

  const writeCheckId = useCallback(
    (result: CheckRunResult) => {
      return `${writeCheckTitle(result)}${result.checkResultUniqueId ? result.checkResultUniqueId : ''}`;
    },
    [writeCheckTitle],
  );

  setSelectedCheckId(writeCheckId(checkResults[0]));

  return (
    <div className="checks-side-panel-web-view">
      {/* <p>{projectId}</p> */}
      {/* <p>{relevantCheck?.map((check) => check)}</p> */}
      <div className="check-card-container">
        {/* {checkResults.map((result) => (
          <div>
            <p>{result.checkResultType}</p>
            <p>{result.verseRef.toString()}</p>
          </div>
        ))} */}
        {checkResults?.map((result) => (
          <CheckCard
            checkId={writeCheckId(result)}
            isSelected={selectedCheckId === writeCheckId(result)}
            handleSelectCheck={() => setSelectedCheckId(writeCheckId(result))}
            checkTitle={writeCheckTitle(result)}
            checkState={result.isDenied ? CheckStates.Denied : CheckStates.DefaultFailed}
            // checkDescription={result.}
            handleDenyCheck={() => undefined}
            handleOpenSettingsAndInventories={() => openConfigureChecks}
            checkType={result.checkResultType}
          />
        ))}
      </div>
    </div>
  );
};
