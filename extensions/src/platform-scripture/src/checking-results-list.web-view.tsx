import { WebViewProps } from '@papi/core';
import { Label, ResultsSet, ScriptureResultsViewer, usePromise } from 'platform-bible-react';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useData, useLocalizedStrings, useWebViewController } from '@papi/frontend/react';
import { CheckRunnerCheckDetails, CheckRunResult } from 'platform-scripture';
import { Canon } from '@sillsdev/scripture';
import { formatReplacementString, LanguageStrings } from 'platform-bible-utils';
import papi, { logger } from '@papi/frontend';
import { ScriptureLocation } from 'platform-scripture-editor';

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
    const newData = {
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
              // Use `checkResult.verseRef` for the location. This may not necessarily be 100%
              // accurate. Need to reconsider if we do a larger check location rework
              bookNum: Canon.bookIdToNumber(checkResult.verseRef.book),
              chapterNum: checkResult.verseRef.chapterNum,
              verseNum: checkResult.verseRef.verseNum,
              jsonPath: checkResult.start.jsonPath,
              offset: checkResult.start.offset,
            },
      end:
        'verseRef' in checkResult.end
          ? {
              bookNum: Canon.bookIdToNumber(checkResult.end.verseRef.book),
              chapterNum: checkResult.end.verseRef.chapterNum,
              verseNum: checkResult.end.verseRef.verseNum,
              jsonPath: '',
              offset: checkResult.end.offset,
            }
          : {
              // Use `checkResult.verseRef` for the location. This may not necessarily be 100%
              // accurate. Need to reconsider if we do a larger check location rework
              bookNum: Canon.bookIdToNumber(checkResult.verseRef.book),
              chapterNum: checkResult.verseRef.chapterNum,
              verseNum: checkResult.verseRef.verseNum,
              jsonPath: checkResult.end.jsonPath,
              offset: checkResult.end.offset,
            },
    };
    // The checking service seems to produce duplicated check results so this is a temporary fix to
    // get rid of them
    const isDuplicate = resultsSet.data.some(
      (item) => JSON.stringify(item) === JSON.stringify(newData),
    );
    if (!isDuplicate) resultsSet.data.push(newData);
    else logger.debug(`duplicate result found ${JSON.stringify(newData)}`);
  });
  return resultsSets;
};

global.webViewComponent = function CheckingResultsListWebView({
  projectId,
  updateWebViewDefinition,
  useWebViewState,
}: WebViewProps) {
  const [editorWebViewId] = useWebViewState<string | undefined>('editorWebViewId', undefined);

  const editorWebViewController = useWebViewController(
    'platformScriptureEditor.react',
    editorWebViewId,
  );

  const [subscriptionId, setSubscriptionId] = useState('');

  const handleSubscriptionIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSubscriptionId(event.target.value);
  };

  const [checkResults] = useData('platformScripture.checkAggregator').CheckResults(
    subscriptionId,
    [],
  );
  const [availableChecks] = useData('platformScripture.checkAggregator').AvailableChecks(
    subscriptionId,
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
    () => parseResults(checkResults ?? [], availableChecks ?? [], projectId, localizedStrings),
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
            resultsCount:
              checkResults?.filter((checkResult) => checkResult.projectId === projectId).length ??
              0,
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
  }, [updateWebViewDefinition, projectName, checkResults, projectId]);

  return (
    <div className="checking-results-list">
      {label && <Label className="checking-results-list-label">{label}</Label>}
      {/* Really we don't want a separate place for subscription input. The check results UI should
          be tied to the subscription configuration so they share the same subscription ID. */}
      <div className="subscription-input">
        <input
          type="text"
          value={subscriptionId}
          onChange={handleSubscriptionIdChange}
          placeholder="Enter subscription ID"
        />
      </div>
      <ScriptureResultsViewer
        sources={viewableResults}
        onRowSelected={async (selectedRow) => {
          if (!selectedRow || !editorWebViewController) return;

          try {
            const startOffset = 'offset' in selectedRow.start ? selectedRow.start.offset : 0;
            const start: ScriptureLocation = selectedRow.start.jsonPath
              ? {
                  bookNum: selectedRow.start.bookNum,
                  chapterNum: selectedRow.start.chapterNum,
                  jsonPath: selectedRow.start.jsonPath,
                  offset: startOffset,
                }
              : {
                  scrRef: {
                    bookNum: selectedRow.start.bookNum,
                    chapterNum: selectedRow.start.chapterNum,
                    verseNum: selectedRow.start.verseNum,
                  },
                  offset: startOffset,
                };
            let end: ScriptureLocation = { ...start, offset: start.offset ?? 0 };
            if (selectedRow.end) {
              const endOffset = 'offset' in selectedRow.end ? selectedRow.end.offset : end.offset;
              end = selectedRow.end.jsonPath
                ? {
                    bookNum: selectedRow.end.bookNum,
                    chapterNum: selectedRow.end.chapterNum,
                    jsonPath: selectedRow.end.jsonPath,
                    offset: endOffset,
                  }
                : {
                    scrRef: {
                      bookNum: selectedRow.end.bookNum,
                      chapterNum: selectedRow.end.chapterNum,
                      verseNum: selectedRow.end.verseNum,
                    },
                    offset: endOffset,
                  };
            }
            editorWebViewController.selectRange({
              start,
              end,
            });
          } catch (e) {
            logger.warn(
              `Check results list failed to select range in editor for row ${JSON.stringify(selectedRow)}: ${e}`,
            );
          }
        }}
      />
    </div>
  );
};
