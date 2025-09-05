import papi, { DataProviderEngine, dataProviders, logger } from '@papi/backend';
import {
  DataProviderUpdateInstructions,
  ExtensionDataScope,
  IDisposableDataProvider,
} from '@papi/core';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { ProjectDataProviderInterfaces } from 'papi-shared-types';
import { InventoryItem } from 'platform-bible-react';
import {
  AsyncVariable,
  getErrorMessage,
  Mutex,
  MutexMap,
  newGuid,
  UnsubscriberAsync,
  UnsubscriberAsyncList,
} from 'platform-bible-utils';
import {
  Check,
  CheckCreatorFunction,
  CheckDetails,
  CheckDetailsWithCheckId,
  CheckInputRange,
  CheckJobRunner,
  CheckJobScope,
  CheckJobStatusReport,
  CheckResultClassifier,
  CheckRunResult,
  CheckRunnerCheckDetails,
  CheckRunnerDataTypes,
  ICheckHostingService,
  ICheckRunner,
  InventoryDataRetriever,
} from 'platform-scripture';
import { CHECK_RUNNER_NETWORK_OBJECT_TYPE } from './check.model';
import { PersistedCheckRunResults } from './persisted-check-run-result.model';

/** Details about a check that include a way to create the check */
type CheckDetailsWithCreator = CheckDetailsWithCheckId & {
  /** Function used to create an instance of a check */
  createFunction: CheckCreatorFunction;
};

// This lives outside the engine because the register and unregister functions also need to do so
const registeredChecksById = new Map<string, CheckDetailsWithCreator>();

type CheckRunnerPdps = {
  usfmBookPdp: ProjectDataProviderInterfaces['platformScripture.USFM_Book'];
  basePdp: ProjectDataProviderInterfaces['platform.base'];
};

const deniedDataScope: ExtensionDataScope = {
  extensionName: 'platform-scripture',
  dataQualifier: 'deniedResultsList',
};

type CheckJob = Omit<CheckJobStatusReport, 'nextResults' | 'totalExecutionTimeMs'> & {
  jobScope: CheckJobScope;
  promise: Promise<void>;
  results: CheckRunResult[];
  startTime: number;
  endTime?: number;
  stopRequested: boolean;
};

class CheckRunnerEngine
  extends DataProviderEngine<CheckRunnerDataTypes>
  implements CheckJobRunner, CheckResultClassifier, InventoryDataRetriever
{
  #deniedCheckResultsByProjectId = new Map<string, PersistedCheckRunResults>();
  #jobs = new Map<string, CheckJob>();
  #mutexesPerCheck = new MutexMap();
  #subscribedProjects = new Map<string, CheckRunnerPdps>();

  // #region Checks

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getAvailableChecks(): Promise<CheckRunnerCheckDetails[]> {
    // Copy over check details to return
    const checks = new Map<string, CheckRunnerCheckDetails>();
    registeredChecksById.forEach((checkDetails, registeredCheckId) => {
      if (!checkDetails) return;
      checks.set(registeredCheckId, {
        checkId: checkDetails.checkId,
        checkName: checkDetails.checkName,
        checkDescription: checkDetails.checkDescription,
      });
    });

    return [...checks.values()];
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setAvailableChecks(): Promise<DataProviderUpdateInstructions<CheckRunnerDataTypes>> {
    throw new Error('setAvailableChecks disabled - use enableCheck and disableCheck');
  }

  // #endregion

  // #region Results

  async denyCheckResult(
    _checkId: string,
    checkResultType: string,
    projectId: string,
    verseRef: SerializedVerseRef,
    itemText: string,
    checkResultUniqueId?: string,
  ): Promise<boolean> {
    const deniedResults = await this.loadDeniedResults(projectId);
    const retVal = deniedResults.addResult({
      checkResultType,
      verseRef,
      itemText,
      checkResultUniqueId,
    });
    if (retVal) await this.saveDeniedResults(projectId);
    return retVal;
  }

  async allowCheckResult(
    _checkId: string,
    checkResultType: string,
    projectId: string,
    verseRef: SerializedVerseRef,
    itemText: string,
    checkResultUniqueId?: string,
  ): Promise<boolean> {
    const deniedResults = await this.loadDeniedResults(projectId);
    const retVal = deniedResults.removeResult({
      checkResultType,
      verseRef,
      itemText,
      checkResultUniqueId,
    });
    if (retVal) await this.saveDeniedResults(projectId);
    return retVal;
  }

  async loadDeniedResults(projectId: string): Promise<PersistedCheckRunResults> {
    let deniedResults = this.#deniedCheckResultsByProjectId.get(projectId);
    if (!deniedResults) {
      deniedResults = new PersistedCheckRunResults(
        await this.#subscribedProjects.get(projectId)?.basePdp.getExtensionData(deniedDataScope),
      );
      this.#deniedCheckResultsByProjectId.set(projectId, deniedResults);
    }
    return deniedResults;
  }

  async saveDeniedResults(projectId: string): Promise<void> {
    const deniedResults = this.#deniedCheckResultsByProjectId.get(projectId);
    if (!deniedResults) return;
    const data = deniedResults.serialize();
    await this.#subscribedProjects.get(projectId)?.basePdp.setExtensionData(deniedDataScope, data);
  }

  // #endregion

  // #region Inventory data

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async retrieveInventoryData(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _projectId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _checkId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _checkInputRange: CheckInputRange,
  ): Promise<InventoryItem[]> {
    throw new Error(`retrieveInventoryData is not implemented for the extensionHostCheckRunner.
        Did you mean to call the checkAggregator?`);
  }

  // #endregion

  // #region Jobs

  async beginCheckJob(jobScope: CheckJobScope): Promise<string> {
    if (jobScope.inputRanges.length === 0 || jobScope.checkIds.length === 0)
      throw new Error('At least 1 input range and 1 check ID are required to begin a check job');

    const jobId = newGuid();
    const job: CheckJob = {
      jobId,
      jobScope,
      status: 'queued',
      percentComplete: 0,
      results: [],
      totalResultsCount: 0,
      stopRequested: false,
      startTime: performance.now(),
      promise: Promise.resolve(),
    };
    this.#jobs.set(jobId, job);
    job.promise = this.#processCheckJob(job);
    return jobId;
  }

  async stopCheckJob(jobId: string, timeoutMs?: number): Promise<boolean> {
    const job = this.#jobs.get(jobId);
    if (!job) throw new Error(`Job with ID ${jobId} not found`);
    job.stopRequested = true;
    const stopCheckAsyncVariable = new AsyncVariable<void>('Stop check', timeoutMs);
    // Wait for the check job to stop in an IIFE, resolving the async variable when done
    (async () => {
      await job.promise;
      stopCheckAsyncVariable.resolveToValue(undefined);
    })();

    try {
      // Wait for the check job to stop or the timeout to be hit, whichever comes first
      await stopCheckAsyncVariable.promise;
      return true;
    } catch (error) {
      logger.warn(
        `Check job ${jobId} did not stop gracefully within ${timeoutMs}ms: ${getErrorMessage(error)}`,
      );
      return false;
    }
  }

  async cleanUpCheckJob(jobId: string): Promise<void> {
    const job = this.#jobs.get(jobId);
    if (!job) throw new Error(`Job with ID ${jobId} not found`);
    if (job.status === 'running')
      throw new Error(`Job with ID ${jobId} is running. It must be stopped before completing.`);
    this.#jobs.delete(jobId);
  }

  async abandonCheckJob(jobId: string): Promise<void> {
    const job = this.#jobs.get(jobId);
    if (!job) throw new Error(`Job with ID ${jobId} not found`);
    job.stopRequested = true;
    this.#jobs.delete(jobId);
  }

  async retrieveCheckJobUpdate(
    jobId: string,
    maxResultsToInclude: number,
  ): Promise<CheckJobStatusReport> {
    const job = this.#jobs.get(jobId);
    if (!job) throw new Error(`Job with ID ${jobId} not found`);
    return {
      jobId: job.jobId,
      status: job.status,
      percentComplete: job.percentComplete,
      totalResultsCount: job.totalResultsCount,
      nextResults: job.results.splice(0, maxResultsToInclude),
      error: job.error,
      totalExecutionTimeMs: (job.endTime ?? performance.now()) - job.startTime,
    };
  }

  async #processCheckJob(job: CheckJob): Promise<void> {
    job.status = 'running';
    let stepsCompleted = 0;
    let totalSteps = 1;

    // Function to safely increment steps completed counter
    const incrementStepsCompleted = () => {
      stepsCompleted += 1;
    };

    try {
      totalSteps = job.jobScope.checkIds.length * job.jobScope.inputRanges.length;

      // We need to run each check asynchronously for each range
      /* eslint-disable no-await-in-loop */
      for (let onCheck = 0; onCheck < job.jobScope.checkIds.length; onCheck++) {
        const checkId = job.jobScope.checkIds[onCheck];
        if (job.stopRequested) return;

        const checkDetails = registeredChecksById.get(checkId);
        if (!checkDetails) {
          job.error = `Check with ID ${checkId} is not registered and cannot be run`;
          job.status = 'errored';
          job.endTime = performance.now();
          return;
        }

        // Get mutex for this check so that only one job can run it at a time
        const mutex = this.#mutexesPerCheck.get(checkId);

        // Run the check within the mutex
        await mutex.runExclusive(async () => {
          if (job.stopRequested) return;

          for (let onRange = 0; onRange < job.jobScope.inputRanges.length; onRange++) {
            const range = job.jobScope.inputRanges[onRange];

            // Ensure we have the pdps we need for the project
            if (!this.#subscribedProjects.has(range.projectId)) {
              const usfmBookPdp = await papi.projectDataProviders.get(
                'platformScripture.USFM_Book',
                range.projectId,
              );
              if (!usfmBookPdp) throw new Error(`Could not get USFM for ${range.projectId}`);
              const basePdp = await papi.projectDataProviders.get('platform.base', range.projectId);
              if (!basePdp)
                throw new Error(
                  `Project ${range.projectId} does not have a platform.base PDP, which is required to run checks`,
                );
              this.#subscribedProjects.set(range.projectId, {
                usfmBookPdp,
                basePdp,
              });
            }

            if (job.stopRequested) return;

            let check: Check | undefined;
            try {
              check = await checkDetails.createFunction();
              if (!check)
                throw new Error(`Check with ID ${checkId} could not be created and cannot be run`);
              const initializationErrors = await check.initialize(range.projectId);
              if (initializationErrors.length > 0) throw new Error(initializationErrors.join('; '));

              const results = await check.getCheckResults(range);
              const deniedResults = await this.loadDeniedResults(range.projectId);
              results.forEach((result) => {
                result.checkId = checkId;
                if (deniedResults.containsResult(result)) result.isDenied = true;
              });
              job.results.push(...results);
              job.totalResultsCount += results.length;
              incrementStepsCompleted();
            } finally {
              if (check) await check.dispose();
            }
          }
        });
      }
      /* eslint-disable no-await-in-loop */

      // At this point we finished all checks in all ranges
      job.status = 'completed';
    } catch (error) {
      job.status = 'errored';
      job.error = getErrorMessage(error);
    } finally {
      if (job.stopRequested && job.status === 'running') job.status = 'stopped';
      job.endTime = job.endTime ?? performance.now();
      job.percentComplete =
        stepsCompleted === totalSteps ? 100 : (stepsCompleted / totalSteps) * 100;
    }
  }

  // #endregion
}

// #region Allow extensions to register checks with this check runner

let dataProvider: IDisposableDataProvider<ICheckRunner>;
const checkRunnerEngine = new CheckRunnerEngine();
const registrationLock = new Mutex();

/** Unregister a type of check that had been previously registered using {@link registerCheck} */
const unregisterCheck = async (checkId: string): Promise<boolean> => {
  let succeeded: boolean = false;

  // Make sure we aren't registering and unregistering checks at the same time
  await registrationLock.runExclusive(async () => {
    if (!registeredChecksById.has(checkId)) {
      logger.debug(`Trying to unregister checkId '${checkId}' that wasn't registered`);
      return;
    }

    await initialize();
    registeredChecksById.delete(checkId);
    succeeded = true;
  });
  return succeeded;
};

/** Register a new type of check to run on the platform */
const registerCheck = async (
  checkDetails: CheckDetails,
  createCheck: CheckCreatorFunction,
): Promise<UnsubscriberAsync> => {
  const checkId = `registered-${checkDetails.checkName}-${checkDetails.checkDescription}`;

  // Make sure we aren't registering and unregistering checks at the same time
  await registrationLock.runExclusive(async () => {
    if (registeredChecksById.has(checkId))
      throw new Error(`Check already registered with ID ${checkId}`);

    registeredChecksById.set(checkId, {
      ...checkDetails,
      checkId,
      createFunction: createCheck,
    });

    logger.info(
      `Check registered: ${checkId} (${JSON.stringify(checkDetails)}, ${typeof createCheck}})`,
    );
  });

  await initialize();
  checkRunnerEngine.notifyUpdate('AvailableChecks');
  return () => {
    return unregisterCheck(checkId);
  };
};

// #endregion

// #region Initialize the check runner

let initializationPromise: Promise<void> | undefined;
const unsubscribers = new UnsubscriberAsyncList();
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          dataProvider = await dataProviders.registerEngine(
            'platformScripture.extensionHostCheckRunner',
            checkRunnerEngine,
            CHECK_RUNNER_NETWORK_OBJECT_TYPE,
          );
          unsubscribers.add(dataProvider.dispose);
          unsubscribers.add(
            await papi.commands.registerCommand('platformScripture.registerCheck', registerCheck, {
              method: {
                summary: 'Register a new check to run on the platform',
                description:
                  'This will only run properly within the extension host. Do not call this from the websocket. Instead implement a check runner.',
                params: [],
                result: {
                  name: 'return value',
                  schema: {},
                },
              },
            }),
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

// #endregion

export const checkHostingService: ICheckHostingService = {
  initialize,
  dispose: async () => unsubscribers.runAllUnsubscribers(),
  getCheckRunner: async () => {
    await initialize();
    return dataProvider;
  },
};

export default checkHostingService;
