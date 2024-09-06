import { WebViewProps } from '@papi/core';
import { Label, ResultsSet, ScriptureResultsViewer } from 'platform-bible-react';
import { useMemo } from 'react';
import { useData } from '@papi/frontend/react';
import { CheckRunResult } from 'platform-scripture';
import { Canon } from '@sillsdev/scripture';

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

const parseResults = (checkResults: CheckRunResult[]): ResultsSet[] => {
  const resultsSets: ResultsSet[] = [];
  checkResults.forEach((checkResult) => {
    let resultsSet = resultsSets.find((newSource) => newSource.source.id === checkResult.checkId);
    if (!resultsSet) {
      resultsSet = {
        source: {
          id: checkResult.checkId ?? 'Unspecified Source ID',
          displayName: checkResult.checkId ?? 'Unspecified Source Name',
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
              offset: checkResult.start.offset,
              jsonPath: '',
            }
          : {
              bookNum: 1,
              chapterNum: 1,
              verseNum: 1,
              jsonPath: checkResult.start.jsonPath,
              offset: checkResult.start.offset,
            },
    });
  });
  return resultsSets;
};

global.webViewComponent = function CheckingResultsListWebView({ useWebViewState }: WebViewProps) {
  const [projectName] = useWebViewState('projectName', 'Dummy project');

  const [checkResults] = useData('platformScripture.checkAggregator').CheckResults(undefined, []);

  const viewableResults = useMemo(() => parseResults(checkResults), [checkResults]);

  const label = useMemo(
    () => getLabel(projectName, new Date().toLocaleString(), viewableResults),
    [projectName, viewableResults],
  );

  return (
    <div className="checking-results-list">
      {label && <Label className="checking-results-list-label">{label}</Label>}
      <ScriptureResultsViewer sources={viewableResults} />
    </div>
  );
};
