import { WebViewProps } from '@papi/core';
import {
  Label,
  ResultsSet,
  ScriptureResultsViewer,
  sonner,
  usePromise,
} from 'platform-bible-react';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useData, useDataProvider, useLocalizedStrings, useWebViewController } from '@papi/frontend/react';
import {
  CheckRunnerCheckDetails,
  CheckRunResult,
  CheckSubscriptionId,
  SettableCheckDetails,
} from 'platform-scripture';
import { Canon } from '@sillsdev/scripture';
import { formatReplacementString, LanguageStrings } from 'platform-bible-utils';
import papi, { logger } from '@papi/frontend';
import { ScriptureLocation } from 'platform-scripture-editor';
import ChecksSetUp from './checks/checks-set-up/checks-set-up.component';

// TODO: Remove all code for the checks-set-up component once it can be moved to the checks side
// panel. Just put here temporarily to make it visible during development
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
  const checkAggregator = useDataProvider('platformScripture.checkAggregator');

  // const [subscriptionId, setSubscriptionId] = useState('');
  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);
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

  const editorWebViewController = useWebViewController(
    'platformScriptureEditor.react',
    editorWebViewId,
  );
    fetchSubscriptionId();

    return () => {
      if (subscriptionIdRef.current) {
        checkAggregator?.deleteSubscription(subscriptionIdRef.current);
        logger.debug(`Deleted check subscription: ${subscriptionIdRef.current}`);
      }
    };
  }, [checkAggregator]);

  const handleSubscriptionIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSubscriptionId(event.target.value);
  };

  const [checkResults] = useData('platformScripture.checkAggregator').CheckResults(
    subscriptionId,
    [],
  );

  const [availableChecks, setAvailableChecks, availableChecksIsLoading] = useData(
    'platformScripture.checkAggregator',
  ).AvailableChecks(subscriptionId, [defaultCheckRunnerCheckDetails]);

  const [localizedStrings] = useLocalizedStrings(
    useMemo(
      () => [
        '%webView_checkResultsList_unspecifiedCheckId%',
        '%webView_checkResultsList_unspecifiedCheckDescription%',
      ],
      [],
    ),
  );

  // TODO: Think through following code copied from the current run checks dialog to see what is
  // reusable and what needs to be modified
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

  const currentlySelectedCheckNames = useMemo(() => {
    if (!projectId) return []; // Need a project to know which checks are selected for the project
    return availableChecks
      .filter((check) => check.enabledProjectIds.includes(projectId))
      .map((check) => check.checkDescription);
  }, [availableChecks, projectId]);

  useEffect(() => {
    setSelectedChecks(currentlySelectedCheckNames);
  }, [currentlySelectedCheckNames]);

  // const handleDropdownSelection = (checkLabel: string, selected: boolean): void => {
  //   setSelectedChecks((prev) => {
  //     const updatedChecks = new Set(prev);
  //     if (selected) updatedChecks.add(checkLabel);
  //     else updatedChecks.delete(checkLabel);
  //     return Array.from(updatedChecks);
  //   });
  // };

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
      <ScriptureResultsViewer sources={viewableResults} />
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
      <ScriptureResultsViewer sources={viewableResults} />
      {/* <div>{availableChecksIsLoading ? <p> Checks loading...</p> : <p>Checks are loaded</p>}</div>
      <div>
        {availableChecksIsLoading ? <p>Check not loaded</p> : availableChecks[0].checkDescription}
      </div> */}
      <ChecksSetUp
        availableChecks={availableChecks}
        handleSelectCheck={updateSelectedChecks}
        selectedChecks={selectedChecks}
      />
    </div>
  );
};
