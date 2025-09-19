import { WebViewProps } from '@papi/core';
import { logger, network } from '@papi/frontend';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckInputRange,
  CheckJobScope,
  CheckJobStatusReport,
  CheckResultsInvalidated,
  CheckRunnerCheckDetails,
  CheckRunResult,
} from 'platform-scripture';
import { useData, useDataProvider, useLocalizedStrings } from '@papi/frontend/react';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import {
  deepEqual,
  getChaptersForBook,
  getErrorMessage,
  isPlatformError,
  LAST_SCR_BOOK_NUM,
  LocalizeKey,
  Mutex,
} from 'platform-bible-utils';
import { Button, Progress, Spinner, useEvent } from 'platform-bible-react';
import { CheckCard, CheckStates } from './checks/checks-side-panel/check-card.component';
import {
  ChecksScopeFilter,
  CheckScopes,
} from './checks/configure-checks/checks-scope-filter.component';
import { ChecksProjectFilter } from './checks/configure-checks/checks-project-filter.component';
import ChecksCheckTypeFilter from './checks/configure-checks/checks-check-type-filter.component';
import { CHECK_RESULTS_INVALIDATED_EVENT } from './checks/check.model';

const defaultCheckRunnerCheckDetails: CheckRunnerCheckDetails = {
  checkDescription: '',
  checkId: '',
  checkName: '',
};

const defaultJobStatusReport: CheckJobStatusReport = {
  jobId: '',
  // Initializing to "completed" so that nothing tries to process this report any further (e.g., poll)
  // "completed" is the only terminal status that doesn't imply something unusual happened
  status: 'completed',
  percentComplete: 0,
  totalResultsCount: 0,
  nextResults: [],
  totalExecutionTimeMs: 0,
};

const defaultCheckResults: CheckRunResult[] = [];

const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%general_cancel%',
  '%webView_checksSidePanel_fixedBadge_title%',
  '%webView_checksSidePanel_deniedBadge_title%',
  '%webView_checksSidePanel_checkingBadge_title%',
  '%webView_checksSidePanel_focusedCheckDropdown_denyItem%',
  '%webView_checksSidePanel_focusedCheckDropdown_settingsItem%',
  '%webView_checksSidePanel_loadingCheckResults%',
  '%webView_checksSidePanel_noCheckResults%',
  '%webView_checksSidePanel_noChecksSelected%',
  '%webView_checksSidePanel_selectChecks%',
];

const RESULTS_PAGE_SIZE = 500;

const aggregatorMutex = new Mutex();

global.webViewComponent = function ChecksSidePanelWebView({
  projectId,
  updateWebViewDefinition,
  useWebViewScrollGroupScrRef,
  useWebViewState,
}: WebViewProps) {
  const [scrRef, setScrRef, ,] = useWebViewScrollGroupScrRef();
  const [selectedCheckId, setSelectedCheckId] = useState<string>('');
  const [selectedCheckTypeIds, setSelectedCheckTypeIds] = useWebViewState<string[]>(
    'selectedCheckTypes',
    [],
  );
  const [isCheckTypesOpen, setIsCheckTypesOpen] = useState(false);
  const [scope, setScope] = useWebViewState<CheckScopes>('checkScope', CheckScopes.Chapter);
  const [activeRanges, setActiveRanges] = useState<CheckInputRange[]>(() => []);
  const [activeJobStatusReport, setActiveJobStatusReport] =
    useState<CheckJobStatusReport>(defaultJobStatusReport);
  const activeJobIdRef = useRef<string | undefined>(undefined);
  const [forceNewCheckRun, setForceNewCheckRun] = useState(1);
  const [checkResults, setCheckResults] = useState<CheckRunResult[]>(() => defaultCheckResults);
  const checkResultsRef = useRef<CheckRunResult[]>(checkResults);
  const [isResultLoadingCancelled, setIsResultLoadingCancelled] = useState(false);
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));
  const [availableChecks, , isLoadingAvailableChecks] = useData(
    'platformScripture.checkAggregator',
  ).AvailableChecks(
    undefined,
    useMemo(() => [defaultCheckRunnerCheckDetails], []),
  );
  const checkAggregator = useDataProvider('platformScripture.checkAggregator');

  const invalidateTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pollingTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // #region Calculating the active ranges

  const checkInputRange: CheckInputRange = useMemo(() => {
    // Default is chapter
    const defaultScrRef: SerializedVerseRef = {
      book: scrRef.book,
      chapterNum: scrRef.chapterNum,
      verseNum: 1,
    };
    const start = { ...defaultScrRef };
    const end = { ...defaultScrRef };

    if (scope === CheckScopes.Book) {
      start.chapterNum = 1;
      end.chapterNum = getChaptersForBook(Canon.bookIdToNumber(scrRef.book));
    }

    return {
      projectId: projectId ?? '',
      start,
      end,
    };
  }, [projectId, scope, scrRef]);

  const getInputRangesForScopeAll = useCallback((): CheckInputRange[] => {
    return Array.from({ length: LAST_SCR_BOOK_NUM }, (_, bookIndex) => {
      const start = { book: Canon.bookNumberToId(bookIndex + 1), chapterNum: 1, verseNum: 1 };
      const end = {
        book: Canon.bookNumberToId(bookIndex + 1),
        chapterNum: getChaptersForBook(bookIndex + 1),
        verseNum: 1,
      };
      return {
        projectId: projectId ?? '',
        start,
        end,
      };
    });
  }, [projectId]);

  const previousScope = useRef<CheckScopes>(undefined);
  const previousScrRef = useRef<SerializedVerseRef>(scrRef);

  // Effect to determine if the range used by the check job has changed
  useEffect(() => {
    // If the scope hasn't changed, determine if the scrRef change actually affects the ranges
    if (previousScope.current === scope) {
      // For "All" scope, scrRef changes do not impact the ranges; avoid resetting them
      if (scope === CheckScopes.All) return;
      // For "Book" scope, only changes to the book matter
      if (scope === CheckScopes.Book && previousScrRef.current.book === scrRef.book) return;
      // For "Chapter" scope, changes to the book and chapter matter
      if (
        scope === CheckScopes.Chapter &&
        previousScrRef.current.book === scrRef.book &&
        previousScrRef.current.chapterNum === scrRef.chapterNum
      )
        return;
    }

    previousScope.current = scope;
    previousScrRef.current = scrRef;
    setActiveRanges(scope === CheckScopes.All ? getInputRangesForScopeAll() : [checkInputRange]);
  }, [checkInputRange, getInputRangesForScopeAll, scope, scrRef]);

  // #endregion

  // #region Safe wrappers for checkAggregator to prevent race conditions with stale jobs

  const beginNewCheckJob = useCallback(
    async (jobScope: CheckJobScope) => {
      try {
        return await aggregatorMutex.runExclusive(async () => {
          if (!checkAggregator || !isMountedRef.current) return;

          try {
            const newJobId = await checkAggregator.beginCheckJob(jobScope);
            logger.debug(`Started new check job with ID ${newJobId}`);
            activeJobIdRef.current = newJobId;
            if (!isMountedRef.current) return;
            setActiveJobStatusReport({
              ...defaultJobStatusReport,
              jobId: newJobId,
              status: 'queued',
            });
          } catch (error) {
            logger.error(`Error starting check job: ${getErrorMessage(error)}`);
            if (!isMountedRef.current) return;
            setActiveJobStatusReport(defaultJobStatusReport);
          }
        });
      } catch (error) {
        logger.error(`Error acquiring mutex to begin check job: ${getErrorMessage(error)}`);
      }
    },
    [checkAggregator],
  );

  // This doesn't check if isMountedRef.current is true because it doesn't update React state
  const stopActiveJob = useCallback(async () => {
    try {
      return await aggregatorMutex.runExclusive(async () => {
        if (!checkAggregator || !activeJobIdRef.current) return false;

        const jobId = activeJobIdRef.current;
        try {
          const retVal = await checkAggregator.stopCheckJob(jobId);
          logger.debug(`Stopped check job ID ${jobId}`);
          return retVal;
        } catch (error) {
          logger.error(`Error stopping check job ${jobId}: ${getErrorMessage(error)}`);
          return false;
        }
      });
    } catch (error) {
      logger.error(`Error acquiring mutex to stop check job: ${getErrorMessage(error)}`);
      return false;
    }
  }, [checkAggregator]);

  // This doesn't check if isMountedRef.current is true because it doesn't update React state
  const abandonActiveJob = useCallback(async () => {
    try {
      return await aggregatorMutex.runExclusive(async () => {
        if (!checkAggregator) return;

        const jobId = activeJobIdRef.current;
        if (!jobId) return;

        try {
          // Invalidate the active job and cancel scheduled polls before abandoning to minimize race windows
          activeJobIdRef.current = undefined;
          if (pollingTimeoutRef.current) {
            clearTimeout(pollingTimeoutRef.current);
            pollingTimeoutRef.current = undefined;
          }

          await checkAggregator.abandonCheckJob(jobId);
          logger.debug(`Abandoned check job ID ${jobId}`);
        } catch (error) {
          logger.error(`Error abandoning check job: ${getErrorMessage(error)}`);
        }
      });
    } catch (error) {
      logger.error(`Error acquiring mutex to abandon check job: ${getErrorMessage(error)}`);
    }
  }, [checkAggregator]);

  const retrieveActiveJobUpdate = useCallback(async (): Promise<
    CheckJobStatusReport | undefined
  > => {
    try {
      return await aggregatorMutex.runExclusive(async () => {
        if (!checkAggregator || !activeJobIdRef.current || !isMountedRef.current) return undefined;

        try {
          const update = await checkAggregator.retrieveCheckJobUpdate(
            activeJobIdRef.current,
            RESULTS_PAGE_SIZE,
          );
          if (!isMountedRef.current) return undefined;
          if (update) setActiveJobStatusReport(update);
          return update;
        } catch (error) {
          logger.error(`Error retrieving check job update: ${getErrorMessage(error)}`);
          return undefined;
        }
      });
    } catch (error) {
      logger.error(`Error acquiring mutex to retrieve check job update: ${getErrorMessage(error)}`);
      return undefined;
    }
  }, [checkAggregator]);

  // #endregion

  // #region Starting a new check job

  // Effect to start a new check job when configuration or project data changes
  useEffect(() => {
    const startNewJob = async () => {
      // Abandon the existing job before starting a new one
      await abandonActiveJob();
      if (!isMountedRef.current) return;
      setActiveJobStatusReport(defaultJobStatusReport);
      setCheckResults(defaultCheckResults);
      setIsResultLoadingCancelled(false);

      // If nothing is configured to check, don't start a new job
      const jobScope: CheckJobScope = {
        checkIds: [...selectedCheckTypeIds],
        inputRanges: activeRanges,
      };
      if (jobScope.checkIds.length === 0 || jobScope.inputRanges.length === 0) return;

      // Start a new job
      await beginNewCheckJob(jobScope);
    };

    startNewJob();
  }, [abandonActiveJob, activeRanges, beginNewCheckJob, forceNewCheckRun, selectedCheckTypeIds]);

  // #endregion

  // #region Managing a check job after it has started

  // Keep the ref up to date with the current checkResults
  useEffect(() => {
    checkResultsRef.current = checkResults;
  }, [checkResults]);

  // Effect to poll for updates on the active job
  useEffect(() => {
    if (!checkAggregator || !activeJobIdRef.current || isResultLoadingCancelled) return;

    const { status, totalResultsCount } = activeJobStatusReport;

    // Start polling if job is active or complete but we haven't loaded all results yet
    const needsPolling =
      status === 'queued' ||
      status === 'running' ||
      ((status === 'completed' || status === 'stopped') &&
        checkResultsRef.current.length < totalResultsCount);
    if (!needsPolling) return;

    let isEffectCleanedUp = false;
    let currentResultsCount = checkResultsRef.current.length;

    const pollForUpdates = async () => {
      try {
        if (isEffectCleanedUp || isResultLoadingCancelled) return;

        const update = await retrieveActiveJobUpdate();
        if (!update || isEffectCleanedUp) return;

        // Add any new results to the results list
        if (update.nextResults && update.nextResults.length > 0) {
          setCheckResults((existingResults) => {
            const newResults = [...(existingResults || []), ...(update.nextResults || [])];
            currentResultsCount = newResults.length;
            return newResults;
          });
        }

        // Determine if we should continue polling (default is not to poll again)
        let pollDelay = -1;
        if (update.status === 'running' || update.status === 'queued') {
          // Checks are still running, so give them some time before polling again
          pollDelay = 250;
        } else if (currentResultsCount < update.totalResultsCount) {
          // Checks are finished but we have more results to load, so only wait a short time
          pollDelay = 25;
        }

        if (pollDelay >= 0 && !isEffectCleanedUp)
          pollingTimeoutRef.current = setTimeout(pollForUpdates, pollDelay);
      } catch (error) {
        logger.debug(`Failed to retrieve check job update: ${getErrorMessage(error)}`);
      }
    };

    // Start polling immediately
    pollForUpdates();

    return () => {
      isEffectCleanedUp = true;
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
        pollingTimeoutRef.current = undefined;
      }
    };
    // Only trigger on activeJobStatusReport's jobId changing, not other properties of it
    // Don't trigger on checkResults changing as the polling function updates it as needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeJobStatusReport.jobId, checkAggregator, isResultLoadingCancelled]);

  // #endregion

  // #region Listening for invalidation events to trigger a new check run

  const invalidateResultsIfNecessary = useCallback(
    (details: CheckResultsInvalidated) => {
      if (!checkAggregator || !isMountedRef.current) return;

      // Clear any existing timeout
      if (invalidateTimeoutRef.current) {
        clearTimeout(invalidateTimeoutRef.current);
        invalidateTimeoutRef.current = undefined;
      }

      // Set up a new debounced call
      invalidateTimeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;

        // Check if the invalidation applies to our current project and scope
        let applies =
          activeRanges.some((range) => range.projectId === details.projectId) &&
          (details.scope === 'all' ||
            (details.scope === 'book' &&
              details.bookId &&
              activeRanges.some((range) => range.start.book === details.bookId)));

        // If it applies to our scope, check if any of the invalidated checks are currently selected
        if (applies) {
          const changedCheckIds = new Set(details.checkIds);
          applies = selectedCheckTypeIds.some((checkId) => changedCheckIds.has(checkId));
        }

        // Trigger a new check run if the invalidation applies to us
        if (applies) setForceNewCheckRun((x) => x + 1);
      }, 1000); // Debounce for 1 second
    },
    [activeRanges, checkAggregator, selectedCheckTypeIds],
  );

  useEvent(network.getNetworkEvent(CHECK_RESULTS_INVALIDATED_EVENT), invalidateResultsIfNecessary);

  // #endregion

  // #region Cleaning up any active jobs and timeouts on unmount

  useEffect(() => {
    return () => {
      if (invalidateTimeoutRef.current) {
        clearTimeout(invalidateTimeoutRef.current);
        invalidateTimeoutRef.current = undefined;
      }

      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
        pollingTimeoutRef.current = undefined;
      }

      abandonActiveJob();
    };
  }, [abandonActiveJob]);

  // #endregion

  // #region Helpers for rendering and interaction

  const openSettingsAndInventories = useCallback(() => {
    logger.info('Open check settings and inventories');
  }, []);

  /**
   * Creates a unique identifier for a CheckRunResult, used to provide a unique key to the UI and to
   * track which check result is selected.
   */
  const writeCheckId = useMemo(
    () => (result: CheckRunResult, index: number) =>
      `${result.checkResultUniqueId || ''}__${result.verseRef.book}_${result.verseRef.chapterNum}_${result.verseRef.verseNum}__${result.checkResultType}__${index}`,
    [],
  );

  const getLocalizedCheckDescription = useCallback(
    (checkId: string) => {
      if (isPlatformError(availableChecks)) return '';
      return availableChecks.find((check) => check.checkId === checkId)?.checkDescription ?? '';
    },
    [availableChecks],
  );

  const checkNamesAndIds = useMemo(() => {
    if (!Array.isArray(availableChecks)) {
      // This means availableChecks has type PlatformError
      return [];
    }
    return availableChecks.map(
      (check) => `${getLocalizedCheckDescription(check.checkId)},${check.checkId}`,
    );
  }, [availableChecks, getLocalizedCheckDescription]);

  // TODO: Should scroll to and highlight the characters or marker identified by the check result, or the verse(s) if not any. Waiting on https://github.com/paranext/paranext-core/issues/1215
  /**
   * Scrolls the editor to the reference of the selected check result by setting the scripture
   * reference of the scroll group shared by the side panel and the editor.
   *
   * @param id - The unique identifier of the selected check result.
   */
  const scrollToCheckReferenceInEditor = useCallback(
    (id: string) => {
      const selectedResult = checkResultsRef.current.find(
        (result, index) => writeCheckId(result, index) === id,
      );
      if (!selectedResult) return;

      setScrRef(selectedResult.verseRef);
    },
    [setScrRef, writeCheckId],
  );

  const handleSelectCheck = useCallback(
    async (id: string) => {
      setSelectedCheckId(id);
      scrollToCheckReferenceInEditor(id);
    },
    [scrollToCheckReferenceInEditor],
  );

  const setDeniedStatusForResult = useCallback(
    (result: CheckRunResult, isDenied: boolean) => {
      if (!result || !projectId || !checkAggregator) return false;

      const currentCheckResults = checkResultsRef.current;
      if (currentCheckResults) {
        const resultIndex = currentCheckResults.findIndex((r) => deepEqual(r, result));
        if (resultIndex !== -1) {
          const newCheckResults = [...currentCheckResults];
          newCheckResults[resultIndex].isDenied = isDenied;
          setCheckResults(newCheckResults);
        } else {
          logger.info('Could not find check result in current results list, reloading');
          setForceNewCheckRun((x) => x + 1);
        }
      }
      return true;
    },
    [checkAggregator, projectId],
  );

  const handleDenyCheck = useCallback(
    async (result: CheckRunResult) => {
      if (!result || !result.checkId || !projectId || !checkAggregator) return false;

      const denyResultSuccess = await checkAggregator.denyCheckResult(
        result.checkId,
        result.checkResultType,
        projectId,
        result.verseRef,
        result.itemText,
        result.checkResultUniqueId,
      );
      if (!isMountedRef.current) return false;
      if (denyResultSuccess) setDeniedStatusForResult(result, true);
      else logger.debug(`Could not deny check result: ${JSON.stringify(result)}`);
      return denyResultSuccess;
    },
    [checkAggregator, projectId, setDeniedStatusForResult],
  );

  const handleAllowCheck = useCallback(
    async (result: CheckRunResult) => {
      if (!result || !result.checkId || !projectId || !checkAggregator) return false;

      const allowResultStatus = await checkAggregator.allowCheckResult(
        result.checkId,
        result.checkResultType,
        projectId,
        result.verseRef,
        result.itemText,
        result.checkResultUniqueId,
      );
      if (!isMountedRef.current) return false;
      if (allowResultStatus) setDeniedStatusForResult(result, false);
      else logger.debug(`Could not allow check result: ${JSON.stringify(result)}`);
      return allowResultStatus;
    },
    [checkAggregator, projectId, setDeniedStatusForResult],
  );

  const handleSelectProject = useCallback(
    (newProjectId: string) => {
      updateWebViewDefinition({ projectId: newProjectId });
    },
    [updateWebViewDefinition],
  );

  const handleSelectScope = useCallback(
    (newScope: CheckScopes) => {
      setScope(newScope);
    },
    [setScope],
  );

  const handleSelectCheckType = (updatedCheckIds: string[]) => {
    setSelectedCheckTypeIds(updatedCheckIds);
  };

  const handleCancelOperation = useCallback(async () => {
    await stopActiveJob();
    if (!isMountedRef.current) return;
    setIsResultLoadingCancelled(true);
  }, [stopActiveJob]);

  // #endregion

  if (isLoadingAvailableChecks || !checkAggregator) {
    return (
      <div className="pr-twp tw-h-screen tw-box-border tw-bg-sidebar tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2">
        <Spinner />
        <span className="tw-text-sm">
          {localizedStrings['%webView_checksSidePanel_loadingCheckResults%']}
        </span>
      </div>
    );
  }

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-box-border tw-bg-sidebar tw-p-3 tw-h-screen tw-min-w-[10rem]">
      {/* Check configuration */}
      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-1 tw-items-center tw-pb-2 tw-w-full">
        <ChecksProjectFilter
          handleSelectProject={handleSelectProject}
          selectedProjectId={projectId ?? ''}
        />
        <ChecksScopeFilter selectedScope={scope} handleSelectScope={handleSelectScope} />
        <ChecksCheckTypeFilter
          filterItems={checkNamesAndIds}
          selectedCheckTypeIds={selectedCheckTypeIds}
          handleSelectCheckTypeToggle={handleSelectCheckType}
          open={isCheckTypesOpen}
          onOpenChange={(open) => setIsCheckTypesOpen(open)}
        />
      </div>
      {/* Check results */}
      {
        // TODO: Display something else if there is an error getting check results
        !checkResults || isPlatformError(checkResults) || checkResults.length === 0 ? (
          <div className="tw-min-h-48 tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full">
            <div className="tw-mb-2">
              {selectedCheckTypeIds.length === 0
                ? localizedStrings['%webView_checksSidePanel_noChecksSelected%']
                : localizedStrings['%webView_checksSidePanel_noCheckResults%']}
            </div>
            <Button onClick={() => setIsCheckTypesOpen(!isCheckTypesOpen)}>
              {localizedStrings['%webView_checksSidePanel_selectChecks%']}
            </Button>
          </div>
        ) : (
          <div className="tw-min-h-48 tw-flex-1 tw-flex tw-flex-col tw-justify-start tw-items-start tw-p-0 tw-gap-3 tw-pb-3 tw-overflow-y-auto">
            {checkResults.map((result, index) => (
              <CheckCard
                key={writeCheckId(result, index)}
                checkResult={result}
                checkId={writeCheckId(result, index)}
                isSelected={selectedCheckId === writeCheckId(result, index)}
                handleSelectCheck={handleSelectCheck}
                checkCardTitle={`${result.verseRef.book} ${result.verseRef.chapterNum}:${result.verseRef.verseNum} ${result.itemText}`}
                checkState={result.isDenied ? CheckStates.Denied : CheckStates.DefaultFailed}
                handleDenyCheck={handleDenyCheck}
                handleAllowCheck={handleAllowCheck}
                handleOpenSettingsAndInventories={openSettingsAndInventories}
                showBadge
                checkName={getLocalizedCheckDescription(result.checkId ?? result.checkResultType)}
              />
            ))}
          </div>
        )
      }
      {/* Status bar */}
      {activeJobStatusReport && checkResults && (
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-border-t tw-pt-4">
          {/* The job is active */}
          {activeJobStatusReport.status === 'queued' ||
            (activeJobStatusReport.status === 'running' &&
              // While starting up, % complete stays stuck at 0 and looks strange with the Cancel button
              activeJobStatusReport.percentComplete > 0 && (
                <div className="tw-flex tw-items-center tw-gap-4">
                  <Progress value={activeJobStatusReport.percentComplete} className="tw-w-64" />
                  <Button onClick={handleCancelOperation} disabled={isResultLoadingCancelled}>
                    {localizedStrings['%general_cancel%']}
                  </Button>
                </div>
              ))}
          {/* The job has finished but not all results are loaded into the UI yet */}
          {(activeJobStatusReport.status === 'completed' ||
            activeJobStatusReport.status === 'stopped') &&
            checkResults &&
            checkResults.length < activeJobStatusReport.totalResultsCount && (
              <div className="tw-flex tw-items-center tw-gap-4">
                <Progress
                  value={(checkResults.length / activeJobStatusReport.totalResultsCount) * 100}
                  className="tw-w-64"
                />
                {checkResults.length.toString()} /{' '}
                {activeJobStatusReport.totalResultsCount.toString()}
                <Button onClick={handleCancelOperation} disabled={isResultLoadingCancelled}>
                  {localizedStrings['%general_cancel%']}
                </Button>
              </div>
            )}
          {/* The job has finished and all results are loaded into the UI */}
          {(activeJobStatusReport.status === 'completed' ||
            activeJobStatusReport.status === 'stopped') &&
            checkResults &&
            checkResults.length === activeJobStatusReport.totalResultsCount && (
              <p className="tw-font-light">
                {checkResults.length > 0
                  ? checkResults.length.toString()
                  : localizedStrings['%webView_find_noResultsFound%']}
              </p>
            )}
          {/* The job encountered an error while running */}
          {activeJobStatusReport.status === 'errored' && activeJobStatusReport.error && (
            <p className="tw-font-light"> {activeJobStatusReport.error}</p>
          )}
        </div>
      )}
    </div>
  );
};
