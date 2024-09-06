import { WebViewProps } from '@papi/core';
import { Label, ResultsSet, ScriptureResultsViewer } from 'platform-bible-react';
import { useEffect, useMemo } from 'react';
import { useData } from '@papi/frontend/react';
import { CheckRunnerCheckDetails, CheckRunResult } from 'platform-scripture';
import { Canon } from '@sillsdev/scripture';
import { formatReplacementString } from 'platform-bible-utils';
import papi, { logger } from '@papi/frontend';

const getLabel = (
  projectName: string | undefined,
  datetime: string | undefined,
  sources: ResultsSet[],
): string => {
  let result = '';
  if (projectName) {
    result = projectName;
  }
  if (datetime) result += `; ${datetime}`;
  if (sources.length > 0) {
    result += '; ';
    result += sources
      .map((s) => s.source.displayName)
      .filter(Boolean)
      .join(', ');
  }
  return result;
};

const parseResults = (
  checkResults: CheckRunResult[],
  availableChecks: CheckRunnerCheckDetails[],
): ResultsSet[] => {
  const resultsSets: ResultsSet[] = [];
  checkResults.forEach((checkResult) => {
    let resultsSet = resultsSets.find((newSource) => newSource.source.id === checkResult.checkId);
    if (!resultsSet) {
      const checkId = checkResult.checkId ?? 'Unspecified Source ID';
      const checkDescription =
        availableChecks.find((check) => check.checkId === checkResult.checkId)?.checkDescription ??
        'Unspecified Source Name';
      resultsSet = {
        source: {
          id: checkId,
          displayName: checkDescription,
        },
        data: [],
      };
      resultsSets.push(resultsSet);
    }
    resultsSet.data.push({
      detail: checkResult.messageFormatString,
      start:
        'verseRef' in checkResult.start
          ? {
              bookNum: Canon.bookIdToNumber(checkResult.start.verseRef.book),
              chapterNum: checkResult.start.verseRef.chapterNum,
              verseNum: checkResult.start.verseRef.verseNum,
              jsonPath: '',
              offset: checkResult.start.offset,
            }
          : {
              bookNum: 0,
              chapterNum: 0,
              verseNum: 0,
              jsonPath: checkResult.start.jsonPath,
              offset: checkResult.start.offset,
            },
    });
  });
  return resultsSets;
};

global.webViewComponent = function CheckingResultsListWebView({
  useWebViewState,
  updateWebViewDefinition,
}: WebViewProps) {
  const [projectName] = useWebViewState('projectName', 'Dummy project');

  const [checkResults] = useData('platformScripture.checkAggregator').CheckResults(undefined, []);
  const [availableChecks] = useData('platformScripture.checkAggregator').AvailableChecks(
    undefined,
    [],
  );

  const viewableResults = useMemo(
    () => parseResults(checkResults, availableChecks),
    [availableChecks, checkResults],
  );

  const label = useMemo(
    () => getLabel(projectName, new Date().toLocaleString(), viewableResults),
    [projectName, viewableResults],
  );

  useEffect(() => {
    const updateTitle = async () => {
      const newTitle = formatReplacementString(
        await papi.localization.getLocalizedString({
          localizeKey: '%webView_checkResultsList_title%',
        }),
        {
          resultsCount: checkResults.length,
          projectName,
        },
      );

      updateWebViewDefinition({
        title: newTitle,
      });
    };

    updateTitle().catch((error) =>
      logger.error('Error updating Check Results title! Reason:', error),
    );
  }, [updateWebViewDefinition, checkResults.length, projectName]);

  return (
    <div className="checking-results-list">
      {label && <Label className="checking-results-list-label">{label}</Label>}
      <ScriptureResultsViewer sources={viewableResults} />
    </div>
  );
};
