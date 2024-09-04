import { WebViewProps } from '@papi/core';
import { useData, useDataProvider } from '@papi/frontend/react';
import { CheckInputRange, CheckRunnerCheckDetails, ICheckRunner } from 'platform-scripture';
import { VerseRef } from '@sillsdev/scripture';
import { useCallback, useMemo, useState } from 'react';
import { logger } from '@papi/frontend';
import ConfigureChecks from './checks/configure-checks/configure-checks.component';

const defaultCheckRunnerCheckDetails: CheckRunnerCheckDetails = {
  checkDescription: '',
  checkId: '',
  checkName: '',
  enabledProjectIds: [''],
};

global.webViewComponent = function InventoryWebView({ useWebViewState }: WebViewProps) {
  const [projectId] = useWebViewState('projectId', '');
  const [projectName] = useWebViewState('projectName', '');
  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);

  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const checkRunner = useDataProvider('platformScripture.checkAggregator') as ICheckRunner;

  const [availableChecks] = useData('platformScripture.checkAggregator').AvailableChecks(
    undefined,
    [defaultCheckRunnerCheckDetails],
  );

  const defaultScriptureRange: CheckInputRange = useMemo(() => {
    return {
      projectId,
      start: new VerseRef(1, 1, 1),
    };
  }, [projectId]);

  const [activeRanges, setActiveRanges] = useData('platformScripture.checkAggregator').ActiveRanges(
    undefined,
    [defaultScriptureRange],
  );

  const findCheckId = (checkLabel: string): string | undefined => {
    const checksWithMatchingLabel: CheckRunnerCheckDetails[] = availableChecks.filter(
      (check) => check.checkDescription === checkLabel,
    );
    if (checksWithMatchingLabel.length === 1) {
      const [check] = checksWithMatchingLabel;
      return check.checkId;
    }
    return undefined;
  };

  const updateSelectedChecks = (checkLabel: string, selected: boolean) => {
    const checkId = findCheckId(checkLabel);
    if (!checkId) throw new Error(`No available check found with checkLabel ${checkLabel}`);
    if (selected) {
      checkRunner.enableCheck(checkId, projectId);
      const newSelectedChecks = [...selectedChecks, checkLabel];
      setSelectedChecks(newSelectedChecks);
    } else {
      checkRunner.disableCheck(checkId, projectId);
      setSelectedChecks(selectedChecks.filter((check) => check !== checkLabel));
    }
  };

  const updateActiveRanges = useCallback(
    (newActiveRanges: CheckInputRange[]) => {
      if (setActiveRanges) setActiveRanges(newActiveRanges);
    },
    [setActiveRanges],
  );

  // Temporary function to show results
  const printResults = async () => {
    logger.log('Checks results:', await checkRunner.getCheckResults(undefined));
  };

  return (
    <ConfigureChecks
      projectId={projectId}
      projectName={projectName}
      availableChecks={availableChecks}
      handleSelectCheck={updateSelectedChecks}
      selectedChecks={selectedChecks}
      activeRanges={activeRanges}
      handleActiveRangesChange={updateActiveRanges}
      handlePrintResults={printResults}
    />
  );
};
