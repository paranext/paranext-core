import { WebViewProps } from '@papi/core';
import { useData, useDataProvider } from '@papi/frontend/react';
import { CheckInputRange, CheckRunnerCheckDetails } from 'platform-scripture';
import { VerseRef } from '@sillsdev/scripture';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { logger } from '@papi/frontend';
import ConfigureChecks from './checks/configure-checks/configure-checks.component';

const defaultCheckRunnerCheckDetails: CheckRunnerCheckDetails = {
  checkDescription: '',
  checkId: '',
  checkName: '',
  enabledProjectIds: [''],
};

const findCheckId = (
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

global.webViewComponent = function InventoryWebView({ useWebViewState }: WebViewProps) {
  const [projectId] = useWebViewState('projectId', '');
  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);
  const [checkFeedback, setCheckFeedback] = useState<string[]>([]);

  const checkRunner = useDataProvider('platformScripture.checkAggregator');

  const [availableChecks] = useData('platformScripture.checkAggregator').AvailableChecks(
    undefined,
    [defaultCheckRunnerCheckDetails],
  );

  const [checkResults] = useData('platformScripture.checkAggregator').CheckResults(undefined, []);

  const defaultScriptureRange: CheckInputRange = useMemo(() => {
    return {
      projectId,
      start: new VerseRef(1, 1, 1),
    };
  }, [projectId]);

  const [activeRanges, setActiveRanges] = useData('platformScripture.checkAggregator').ActiveRanges(
    undefined,
    useMemo(() => [defaultScriptureRange], [defaultScriptureRange]),
  );

  const updateSelectedChecks = useCallback(
    async (checkLabel: string, selected: boolean) => {
      const checkId = findCheckId(availableChecks, checkLabel);
      if (!checkId) throw new Error(`No available check found with checkLabel ${checkLabel}`);
      if (!checkRunner) return;

      if (selected) {
        setCheckFeedback(await checkRunner.enableCheck(checkId, projectId));
        const newSelectedChecks = [...selectedChecks, checkLabel];
        setSelectedChecks(newSelectedChecks);
      } else {
        checkRunner.disableCheck(checkId, projectId);
        setSelectedChecks(selectedChecks.filter((check) => check !== checkLabel));
      }
    },
    [availableChecks, checkRunner, projectId, selectedChecks],
  );

  const updateActiveRanges = useCallback(
    (newActiveRanges: CheckInputRange[]) => {
      if (setActiveRanges) setActiveRanges(newActiveRanges);
    },
    [setActiveRanges],
  );

  // Temporary function to show results
  useEffect(() => {
    logger.log('Checks results:', checkResults);
  }, [checkResults]);

  return (
    <ConfigureChecks
      projectId={projectId}
      availableChecks={availableChecks}
      handleSelectCheck={updateSelectedChecks}
      selectedChecks={selectedChecks}
      checkFeedback={checkFeedback}
      activeRanges={activeRanges}
      handleActiveRangesChange={updateActiveRanges}
    />
  );
};
