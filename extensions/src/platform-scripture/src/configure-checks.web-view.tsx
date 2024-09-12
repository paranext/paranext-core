import { WebViewProps } from '@papi/core';
import { useData, useDataProvider } from '@papi/frontend/react';
import { CheckInputRange, CheckRunnerCheckDetails } from 'platform-scripture';
import { Canon, VerseRef } from '@sillsdev/scripture';
import { useCallback, useEffect, useMemo } from 'react';
import { Sonner, sonner } from 'platform-bible-react';
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
  const checkRunner = useDataProvider('platformScripture.checkAggregator');

  const [availableChecks, , availableChecksIsLoading] = useData(
    'platformScripture.checkAggregator',
  ).AvailableChecks(undefined, [defaultCheckRunnerCheckDetails]);

  const selectedChecks = useMemo((): string[] => {
    if (!projectId) return [];
    const enabledChecks = availableChecks.filter((check) =>
      check.enabledProjectIds.includes(projectId),
    );
    return enabledChecks.map((check) => check.checkDescription);
  }, [availableChecks, projectId]);

  const defaultScriptureRange: CheckInputRange = useMemo(() => {
    return {
      projectId: projectId ?? '',
      start: new VerseRef(1, 1, 1),
    };
  }, [projectId]);

  const [activeRanges, setActiveRanges] = useData('platformScripture.checkAggregator').ActiveRanges(
    undefined,
    useMemo(() => [defaultScriptureRange], [defaultScriptureRange]),
  );

  const updateSelectedChecks = useCallback(
    async (checkDescription: string, selected: boolean) => {
      if (!checkRunner || !projectId) return;
      if (availableChecksIsLoading) {
        sonner.warning(`${selected ? 'Enabling' : 'Disabling'} check failed.`, {
          description: 'Please try again later.',
        });
      }
      const checkId = findCheckIdFromDescription(availableChecks, checkDescription);
      if (!checkId) throw new Error(`No available check found with checkLabel ${checkDescription}`);

      if (selected) {
        const newCheckFeedback = await checkRunner.enableCheck(checkId, projectId);
        if (newCheckFeedback) {
          sonner.warning(
            `Warnings/errors occurred when trying to enable the ${checkDescription} check.
            Enabling may or may not have been successful.
            The following warning/errors have been encountered:`,
            {
              description: `${newCheckFeedback.map((feedback) => ` ${feedback}`)}`,
            },
          );
        } else {
          sonner.success(`Successfully enabled ${checkDescription} check`);
        }
      } else {
        checkRunner.disableCheck(checkId, projectId);
        sonner.success(`Successfully disabled ${checkDescription} check`);
      }
    },
    [availableChecks, availableChecksIsLoading, checkRunner, projectId],
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
        selectedChecks={selectedChecks}
        activeRanges={activeRanges}
        handleActiveRangesChange={updateActiveRanges}
      />
      <Sonner />
    </>
  );
};
