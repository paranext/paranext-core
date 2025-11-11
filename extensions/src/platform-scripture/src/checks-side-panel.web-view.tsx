import { WebViewProps } from '@papi/core';
import papi, { logger, network } from '@papi/frontend';
import { useData, useDataProvider, useLocalizedStrings } from '@papi/frontend/react';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { ChevronDown } from 'lucide-react';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  MultiSelectComboBox,
  MultiSelectComboBoxEntry,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  useEvent,
  usePromise,
} from 'platform-bible-react';
import {
  deepEqual,
  formatReplacementString,
  formatReplacementStringToArray,
  getChaptersForBook,
  getErrorMessage,
  isPlatformError,
  LAST_SCR_BOOK_NUM,
  Mutex,
} from 'platform-bible-utils';
import {
  CheckInputRange,
  CheckJobScope,
  CheckJobStatusReport,
  CheckResultsInvalidated,
  CheckRunnerCheckDetails,
  CheckRunResult,
} from 'platform-scripture';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CHECK_SCOPE_FILTER_STRINGS,
  CheckInfo,
  CheckScopes,
  getProjectNames,
  isValidCheckScope,
  LOCALIZED_STRINGS,
  ProjectOption,
} from './checks-side-panel.utils';
import { CHECK_RESULTS_INVALIDATED_EVENT } from './checks/check.model';
import { CheckCard, CheckStates } from './checks/checks-side-panel/check-card.component';

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
  const [isSelectProjectsOpen, setIsSelectProjectsOpen] = useState(false);
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

  // Project data loading
  const [projectIdsAndNames]: [{ [projectId: string]: ProjectOption }, boolean] = usePromise(
    useCallback(async () => {
      const projectDict: { [projectId: string]: ProjectOption } = {};

      // Fetch only scripture projects metadata - those with Scripture or Paratext interfaces
      const allMetadata = await papi.projectLookup.getMetadataForAllProjects({
        includeProjectInterfaces: ['Scripture', 'Paratext'],
      });

      // Map through all metadata to get ids and names
      await Promise.all(
        allMetadata.map(async (metadata) => {
          const names = await getProjectNames(metadata.id);
          if (!names) return;
          projectDict[metadata.id] = names;
        }),
      );

      return projectDict;
    }, []),
    useMemo(() => ({}), []),
  );

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

  const previousProjectId = useRef<string | undefined>(undefined);
  const previousScope = useRef<CheckScopes>(undefined);
  const previousScrRef = useRef<SerializedVerseRef>(scrRef);

  // Effect to determine if the range used by the check job has changed
  useEffect(() => {
    // If the scope hasn't changed, determine if the scrRef change actually affects the ranges
    if (
      previousProjectId.current === checkInputRange.projectId &&
      previousScope.current === scope
    ) {
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

    previousProjectId.current = checkInputRange.projectId;
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

  const [checksInfo, setChecksInfo] = useState<CheckInfo[]>([]);

  useEffect(() => {
    if (!checkAggregator || !projectId || isPlatformError(availableChecks)) {
      setChecksInfo([]);
      return;
    }

    const fetchChecksInfo = async () => {
      const promises = availableChecks.map(async (check) => {
        const isSetup = await checkAggregator.isCheckSetupForProject(check.checkId, projectId);
        return {
          checkId: check.checkId,
          checkName: getLocalizedCheckDescription(check.checkId),
          isSetup,
          setUpLink: undefined, // TODO: Add setUpLink when available from backend
        };
      });
      const results = await Promise.all(promises);
      setChecksInfo(results);
    };

    fetchChecksInfo();
  }, [checkAggregator, projectId, availableChecks, getLocalizedCheckDescription]);

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
    (newScope: string) => {
      if (isValidCheckScope(newScope)) {
        setScope(newScope);
      }
    },
    [setScope],
  );

  const handleSelectCheckType = (updatedCheckIds: string[]) => {
    setSelectedCheckTypeIds(updatedCheckIds);
  };

  // Helper functions for project and scope filters
  const writeProjectName = useCallback(
    (fullName: string, shortName: string) => {
      return formatReplacementStringToArray(
        localizedStrings['%webView_checksSidePanel_projectFilter_projectName_format%'],
        { fullName, shortName },
      );
    },
    [localizedStrings],
  );

  const getProjectShortNameLabel = useCallback(() => {
    return (
      projectIdsAndNames[projectId ?? '']?.shortName ??
      localizedStrings['%webView_checksSidePanel_projectFilter_noProjectSelected%']
    );
  }, [localizedStrings, projectIdsAndNames, projectId]);

  const sortedProjectEntries = useMemo(() => {
    return Object.entries(projectIdsAndNames).sort(([, a], [, b]) =>
      a.fullName.localeCompare(b.fullName, undefined, { sensitivity: 'base' }),
    );
  }, [projectIdsAndNames]);

  const getScopeLabel = useCallback(
    (scopeValue: string) => {
      if (isValidCheckScope(scopeValue)) {
        return localizedStrings[CHECK_SCOPE_FILTER_STRINGS[scopeValue]];
      }
      return scopeValue; // Fallback for invalid scope values
    },
    [localizedStrings],
  );

  // Helper functions for check type filter
  const checkTypeEntries: MultiSelectComboBoxEntry[] = useMemo(
    () =>
      checksInfo.map((check) => ({
        value: check.checkId,
        label: check.checkName,
        secondaryLabel: check.isSetup
          ? undefined
          : localizedStrings['%webView_checksSidePanel_checkRequiresSetup%'],
        starred: false,
      })),
    [checksInfo, localizedStrings],
  );

  const selectedChecksCountLabel = useMemo(
    () =>
      formatReplacementString(
        localizedStrings['%webView_checksSidePanel_checkTypeFilter_countLabel%'],
        {
          resultsCount: selectedCheckTypeIds.length,
        },
      ),
    [localizedStrings, selectedCheckTypeIds],
  );

  const handleCancelOperation = useCallback(async () => {
    await stopActiveJob();
    if (!isMountedRef.current) return;
    setIsResultLoadingCancelled(true);
  }, [stopActiveJob]);

  // #endregion

  if (isLoadingAvailableChecks || !checkAggregator) {
    return (
      <div className="pr-twp tw-h-screen tw-box-border tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2">
        <Spinner />
        <span className="tw-text-sm">
          {localizedStrings['%webView_checksSidePanel_loadingCheckResults%']}
        </span>
      </div>
    );
  }

  return (
    <div className="pr-twp tw-container  tw-mx-auto  tw-flex tw-flex-col tw-max-h-screen tw-gap-6 tw-p-4 tw-min-w-[10rem]">
      {/* Check configuration */}
      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-1 tw-items-center tw-pb-2 tw-w-full">
        {/* Project Filter */}
        <Popover open={isSelectProjectsOpen} onOpenChange={setIsSelectProjectsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="tw-flex-1 tw-min-w-32 tw-font-normal"
              aria-label={
                localizedStrings['%webView_checksSidePanel_projectFilter_projectsAndResources%']
              }
            >
              <div className="tw-flex tw-w-full tw-items-center tw-justify-between">
                {getProjectShortNameLabel()}
                <ChevronDown className="tw-opacity-50" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="tw-max-w-sm tw-p-0" align="start">
            <Command>
              <CommandInput />
              <CommandList>
                <CommandEmpty>
                  {localizedStrings['%webView_checksSidePanel_projectFilter_noProjectsFound%']}
                </CommandEmpty>
                <CommandGroup
                  heading={
                    localizedStrings['%webView_checksSidePanel_projectFilter_projectsAndResources%']
                  }
                >
                  {sortedProjectEntries.map(([projectIdOption, project]) => (
                    <CommandItem
                      key={projectIdOption}
                      onSelect={() => {
                        handleSelectProject(projectIdOption);
                        setIsSelectProjectsOpen(false);
                      }}
                      className="tw-flex tw-items-center"
                    >
                      <span className="tw-text-ellipsis tw-overflow-hidden tw-w-full">
                        {writeProjectName(project.fullName, project.shortName)}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Scope Filter */}
        <Select value={scope} onValueChange={handleSelectScope}>
          <SelectTrigger className="tw-flex-1 tw-min-w-32">
            <SelectValue
              placeholder={localizedStrings['%webView_checksSidePanel_scopeFilter_label%']}
            >
              <div className="tw-text-start tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal">
                {getScopeLabel(scope)}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="tw-max-w-sm" align="start">
            {Object.values(CheckScopes).map((scopeOption) => (
              <SelectItem key={scopeOption} value={scopeOption}>
                {getScopeLabel(scopeOption)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Check Type Filter */}
        <MultiSelectComboBox
          entries={checkTypeEntries}
          selected={selectedCheckTypeIds}
          onChange={handleSelectCheckType}
          placeholder={localizedStrings['%webView_checksSidePanel_checkTypeFilter_label%']}
          hasToggleAllFeature
          selectAllText="Select All"
          clearAllText="Clear All"
          customSelectedText={selectedChecksCountLabel}
          commandEmptyMessage="No checks found"
          isOpen={isCheckTypesOpen}
          onOpenChange={setIsCheckTypesOpen}
          sortSelected={false}
          className="tw-flex-[2] tw-min-w-32"
          variant="outline"
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
            <Button onClick={() => setIsCheckTypesOpen(true)}>
              {localizedStrings['%webView_checksSidePanel_selectChecks%']}
            </Button>
          </div>
        ) : (
          <div className="tw-min-h-48 tw-flex-1 tw-space-y-2 tw-overflow-y-auto tw-pe-2">
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
                isCheckSetup={
                  checksInfo.find((check) => check.checkId === result.checkId)?.isSetup ?? true
                }
                checkCardDescription={result.messageFormatString}
              />
            ))}
          </div>
        )
      }
      {/* Status bar */}
      {activeJobStatusReport &&
        activeJobStatusReport !== defaultJobStatusReport &&
        checkResults && (
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
