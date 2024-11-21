import { WebViewProps } from '@papi/core';
import { useData, useDataProvider } from '@papi/frontend/react';
import {
  CheckInputRange,
  CheckRunnerCheckDetails,
  CheckSubscriptionId,
  SettableCheckDetails,
} from 'platform-scripture';
import { Canon, VerseRef } from '@sillsdev/scripture';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Sonner, sonner } from 'platform-bible-react';
import { logger } from '@papi/frontend';
import ConfigureChecks from './checks/configure-checks/configure-checks.component';

const defaultCheckRunnerCheckDetails: CheckRunnerCheckDetails = {
  checkDescription: '',
  checkId: '',
  checkName: '',
  enabledProjectIds: [''],
};

const findCheckIdFromDescription = (
  availableChecks: CheckRunnerCheckDetails[],
  checkLabel: string,
): string | undefined => {
  const checksWithMatchingLabel: CheckRunnerCheckDetails[] = availableChecks.filter(
    (check) => check.checkDescription === checkLabel,
  );
  if (checksWithMatchingLabel.length === 1) {
    const [check] = checksWithMatchingLabel;
    return check.checkId;
  }
  return undefined;
};

const prettyPrintVerseRef = (verseRef: VerseRef): string => {
  return `${verseRef.book ? Canon.bookIdToEnglishName(verseRef.book) : Canon.bookNumberToEnglishName(verseRef.bookNum)} ${verseRef.chapterNum}:${verseRef.verseNum}`;
};

global.webViewComponent = function ConfigureChecksWebView({ projectId }: WebViewProps) {
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

  const [availableChecks, setAvailableChecks, availableChecksIsLoading] = useData(
    'platformScripture.checkAggregator',
  ).AvailableChecks(subscriptionId, [defaultCheckRunnerCheckDetails]);

  const defaultScriptureRange: CheckInputRange = useMemo(() => {
    return {
      projectId: projectId ?? '',
      start: new VerseRef(1, 1, 1),
    };
  }, [projectId]);

  const [activeRanges, setActiveRanges] = useData('platformScripture.checkAggregator').ActiveRanges(
    subscriptionId,
    useMemo(() => [defaultScriptureRange], [defaultScriptureRange]),
  );

  const updateSelectedChecks = useCallback(
    async (checkDescription: string, selected: boolean) => {
      if (!setAvailableChecks || !projectId) return;
      if (availableChecksIsLoading) {
        sonner.warning(`${selected ? 'Enabling' : 'Disabling'} check failed.`, {
          description: 'Please try again later.',
        });
      }
      const checkId = findCheckIdFromDescription(availableChecks, checkDescription);
      if (!checkId) throw new Error(`No available check found with checkLabel ${checkDescription}`);

      const checksToSet = availableChecks.map(
        (checkDetails: CheckRunnerCheckDetails): SettableCheckDetails => {
          const retVal = {
            checkId: checkDetails.checkId,
            enabledProjectIds: [...checkDetails.enabledProjectIds],
          };
          if (checkId !== retVal.checkId) return retVal;
          if (selected) retVal.enabledProjectIds.push(projectId);
          else retVal.enabledProjectIds = retVal.enabledProjectIds.filter((id) => id !== projectId);
          return retVal;
        },
      );
      await setAvailableChecks(checksToSet);

      sonner.success(`Successfully ${selected ? 'enabled' : 'disabled'} ${checkDescription} check`);
    },
    [availableChecks, availableChecksIsLoading, projectId, setAvailableChecks],
  );

  const updateActiveRanges = useCallback(
    (newActiveRanges: CheckInputRange[]) => {
      if (setActiveRanges) setActiveRanges(newActiveRanges);
    },
    [setActiveRanges],
  );

  useEffect(() => {
    sonner(`Active range${activeRanges.length > 1 ? 's' : ''} updated.`, {
      description: `${activeRanges
        .filter((activeRange) => activeRange.projectId === projectId)
        .map(
          (range) =>
            `${range.end ? `${prettyPrintVerseRef(range.start)} - ${prettyPrintVerseRef(range.end)}` : ` ${Canon.bookIdToEnglishName(range.start.book)}`}`,
        )}`,
    });
  }, [activeRanges, projectId]);

  return (
    <>
      <ConfigureChecks
        projectId={projectId}
        availableChecks={availableChecks}
        handleSelectCheck={updateSelectedChecks}
        activeRanges={activeRanges}
        handleActiveRangesChange={updateActiveRanges}
      />
      <Sonner />
    </>
  );
};
