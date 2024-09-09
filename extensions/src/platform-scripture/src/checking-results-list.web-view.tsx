import { WebViewProps } from '@papi/core';
import { Label, ResultsSet, ScriptureResultsViewer, usePromise } from 'platform-bible-react';
import { useCallback, useEffect, useMemo } from 'react';
import { useData, useLocalizedStrings } from '@papi/frontend/react';
import { CheckRunnerCheckDetails, CheckRunResult } from 'platform-scripture';
import { Canon } from '@sillsdev/scripture';
import { formatReplacementString, LanguageStrings } from 'platform-bible-utils';
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
  projectId: string | undefined,
  localizedStrings: LanguageStrings,
): ResultsSet[] => {
  const unspecifiedCheckId = localizedStrings['%webView_checkResultsList_unspecifiedCheckId%'];
  const unspecifiedCheckDescription =
    localizedStrings['%webView_checkResultsList_unspecifiedCheckDescription%'];

  const resultsSets: ResultsSet[] = [];

  const checkResultsForProject = checkResults.filter(
    (checkResult) => checkResult.projectId === projectId,
  );
  checkResultsForProject.forEach((checkResult) => {
    let resultsSet = resultsSets.find((newSource) => newSource.source.id === checkResult.checkId);
    if (!resultsSet) {
      const checkId = checkResult.checkId ?? unspecifiedCheckId;
      const checkDescription =
        availableChecks.find((check) => check.checkId === checkResult.checkId)?.checkDescription ??
        unspecifiedCheckDescription;
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
  projectId,
  updateWebViewDefinition,
}: WebViewProps) {
  const [checkResults] = useData('platformScripture.checkAggregator').CheckResults(undefined, []);
  const [availableChecks] = useData('platformScripture.checkAggregator').AvailableChecks(
    undefined,
    [],
  );

  const [localizedStrings] = useLocalizedStrings(
    useMemo(
      () => [
        '%webView_checkResultsList_unspecifiedCheckId%',
        '%webView_checkResultsList_unspecifiedCheckDescription%',
      ],
      [],
    ),
  );

  const viewableResults = useMemo(
    () => parseResults(checkResults, availableChecks, projectId, localizedStrings),
    [availableChecks, checkResults, localizedStrings, projectId],
  );

  const [projectName] = usePromise(
    useCallback(async () => {
      if (!projectId) return '';
      const pdp = await papi.projectDataProviders.get('platform.base', projectId);
      const name = await pdp.getSetting('platform.name');
      return name;
    }, [projectId]),
    useMemo(() => '', []),
  );

  const label = useMemo(
    () => getLabel(projectName, new Date().toLocaleString(), viewableResults),
    [projectName, viewableResults],
  );

  useEffect(() => {
    let promiseIsCurrent = true;
    const updateTitle = async () => {
      try {
        const newTitle = formatReplacementString(
          await papi.localization.getLocalizedString({
            localizeKey: '%webView_checkResultsList_title%',
          }),
          {
            resultsCount: checkResults.filter((checkResult) => checkResult.projectId === projectId)
              .length,
            projectName,
          },
        );

        if (promiseIsCurrent)
          updateWebViewDefinition({
            title: newTitle,
          });
      } catch (error) {
        logger.error('Error updating Check Results title! Reason:', error);
      }
    };

    updateTitle();

    return () => {
      promiseIsCurrent = false;
    };
  }, [updateWebViewDefinition, checkResults.length, projectName, checkResults, projectId]);

  return (
    <div className="checking-results-list">
      {label && <Label className="checking-results-list-label">{label}</Label>}
      <ScriptureResultsViewer sources={viewableResults} />
    </div>
  );
};
