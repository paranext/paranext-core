import papi, { DataProviderEngine, logger } from '@papi/backend';
import { DataProviderUpdateInstructions, IDisposableDataProvider } from '@papi/core';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { createSyncProxyForAsyncObject, newGuid } from 'platform-bible-utils';
import {
  CheckJobRunner,
  CheckJobScope,
  CheckJobStatus,
  CheckJobStatusReport,
  CheckResultClassifier,
  CheckResultsInvalidated,
  CheckRunnerCheckDetails,
  CheckRunnerDataTypes,
  ICheckAggregatorService,
  ICheckRunner,
  CheckConfigurationProvider,
} from 'platform-scripture';
import {
  CHECK_RESULTS_INVALIDATED_EVENT,
  CHECK_RUNNER_NETWORK_OBJECT_TYPE,
  CHECK_STOP_DEFAULT_TIMEOUT_MS,
} from './check.model';

/**
 * When a job is started, it may need to be split up and sent to multiple check runners depending on
 * which checks are being run. This type represents the portion of a job that is assigned to one
 * specific check runner.
 */
type PartitionedJobScope = {
  checkRunner: ICheckRunner;
  jobId: string;
  jobScope: CheckJobScope;
};

class CheckAggregatorDataProviderEngine
  extends DataProviderEngine<CheckRunnerDataTypes>
  implements CheckJobRunner, CheckResultClassifier, CheckConfigurationProvider
{
  // Maps check runner IDs to their ICheckRunner objects
  private checkRunners = new Map<string, ICheckRunner>();

  // Maps job IDs to the check runner and job ID on that check runner
  private activeJobs = new Map<string, PartitionedJobScope[]>();

  // #region Static Helpers

  private static combineJobStatus(jobReports: CheckJobStatusReport[]): CheckJobStatus {
    if (jobReports.length === 0) throw new Error('No job reports to combine');
    if (jobReports.length === 1) return jobReports[0].status;
    let statusNumber = -1;
    jobReports.forEach((report) => {
      const reportStatusNumber = CheckAggregatorDataProviderEngine.jobStatusToNumber(report.status);
      if (reportStatusNumber > statusNumber) statusNumber = reportStatusNumber;
    });
    return CheckAggregatorDataProviderEngine.numberToJobStatus(statusNumber);
  }

  private static jobStatusToNumber(status: CheckJobStatus): number {
    switch (status) {
      case 'completed':
        return 0;
      case 'queued':
        return 1;
      case 'running':
        return 2;
      case 'stopped':
        return 3;
      case 'errored':
        return 4;
      default:
        throw new Error(`Unknown job status: ${status}`);
    }
  }

  private static numberToJobStatus(statusNumber: number): CheckJobStatus {
    switch (statusNumber) {
      case 0:
        return 'completed';
      case 1:
        return 'queued';
      case 2:
        return 'running';
      case 3:
        return 'stopped';
      case 4:
        return 'errored';
      default:
        throw new Error(`Unknown job status number: ${statusNumber}`);
    }
  }

  // #endregion

  // #region Checks

  async getAvailableChecks(): Promise<CheckRunnerCheckDetails[]> {
    // Gather up all checks that are currently registered
    await this.refreshCheckRunners();
    const retVal: CheckRunnerCheckDetails[] = [];
    await Promise.all(
      [...this.checkRunners.values()].map(async (checkRunner) => {
        const checksAvailable = await checkRunner.getAvailableChecks(undefined);
        if (checksAvailable.length === 0) return;
        retVal.push(...checksAvailable);
      }),
    );
    return retVal;
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setAvailableChecks(): Promise<DataProviderUpdateInstructions<CheckRunnerDataTypes>> {
    throw new Error('Not supported on the check aggregator');
  }

  // #endregion

  // #region Jobs

  async beginCheckJob(jobScope: CheckJobScope): Promise<string> {
    if (jobScope.checkIds.length === 0)
      throw new Error('At least one check ID must be specified to start a job');
    if (jobScope.inputRanges.length === 0)
      throw new Error('At least one input range must be specified to start a job');

    const partitionedJobs: PartitionedJobScope[] = await this.splitJobScopeByCheckRunner(jobScope);
    if (partitionedJobs.length === 0)
      throw new Error('No check runners found for the specified checks');
    await Promise.all(
      partitionedJobs.map(async (job) => {
        job.jobId = await job.checkRunner.beginCheckJob(job.jobScope);
      }),
    );

    // Create a new job ID to represent the collection of jobs on the individual check runners
    const aggregatorJobId = newGuid();
    this.activeJobs.set(aggregatorJobId, partitionedJobs);
    return aggregatorJobId;
  }

  async stopCheckJob(
    jobId: string,
    timeoutMs: number = CHECK_STOP_DEFAULT_TIMEOUT_MS,
  ): Promise<boolean> {
    const job = this.activeJobs.get(jobId);
    if (!job) throw new Error(`Job ID not found: ${jobId}`);
    const stopResults = await Promise.all(
      job.map((assignedJob) => assignedJob.checkRunner.stopCheckJob(assignedJob.jobId, timeoutMs)),
    );
    return stopResults.every((result) => result === true);
  }

  async abandonCheckJob(jobId: string): Promise<void> {
    const job = this.activeJobs.get(jobId);
    if (!job) throw new Error(`Job ID not found: ${jobId}`);
    try {
      await Promise.all(
        job.map((assignedJob) => assignedJob.checkRunner.abandonCheckJob(assignedJob.jobId)),
      );
    } catch (error) {
      logger.error(`Error abandoning check job ${jobId}: ${error}`);
    }
    this.activeJobs.delete(jobId);
  }

  async retrieveCheckJobUpdate(
    jobId: string,
    maxResultsToInclude: number,
  ): Promise<CheckJobStatusReport> {
    const jobScopes = this.activeJobs.get(jobId);
    if (!jobScopes) throw new Error(`Job ID not found: ${jobId}`);

    let remainingResultsToInclude = maxResultsToInclude;
    const jobReports: CheckJobStatusReport[] = [];
    for (let i = 0; i < jobScopes.length; i += 1) {
      const assignedJob = jobScopes[i];
      // We need to wait and see how many results are returned before asking the next check runner
      // eslint-disable-next-line no-await-in-loop
      const jobReport = await assignedJob.checkRunner.retrieveCheckJobUpdate(
        assignedJob.jobId,
        remainingResultsToInclude,
      );
      remainingResultsToInclude -= jobReport.nextResults?.length ?? 0;
      jobReports.push(jobReport);
    }

    // Combine the reports from all the check runners into one report
    const combinedReport: CheckJobStatusReport = {
      jobId,
      status: CheckAggregatorDataProviderEngine.combineJobStatus(jobReports),
      percentComplete:
        jobReports.reduce((acc, report) => acc + report.percentComplete, 0) / jobReports.length,
      totalResultsCount: jobReports.reduce((acc, report) => acc + report.totalResultsCount, 0),
      nextResults: jobReports.flatMap((report) => report.nextResults ?? []),
      error: jobReports
        .map((r) => r.error)
        .filter((m) => m && m.length > 0)
        .join('; '),
      totalExecutionTimeMs: jobReports.reduce(
        (acc, report) => acc + (report.totalExecutionTimeMs ?? 0),
        0,
      ),
    };

    if (combinedReport.nextResults?.length === 0) delete combinedReport.nextResults;
    if (combinedReport.error?.length === 0) delete combinedReport.error;
    return combinedReport;
  }

  // #endregion

  // #region Deny/Allow Individual Results

  async allowCheckResult(
    checkId: string,
    checkResultType: string,
    projectId: string,
    verseRef: SerializedVerseRef,
    itemText: string,
    checkResultUniqueId?: string,
  ): Promise<boolean> {
    const checkRunner = await this.findCheckRunnerForCheckId(checkId);
    const retVal = checkRunner.allowCheckResult(
      checkId,
      checkResultType,
      projectId,
      verseRef,
      itemText,
      checkResultUniqueId,
    );
    return retVal;
  }

  async denyCheckResult(
    checkId: string,
    checkResultType: string,
    projectId: string,
    verseRef: SerializedVerseRef,
    itemText: string,
    checkResultUniqueId?: string,
  ): Promise<boolean> {
    const checkRunner = await this.findCheckRunnerForCheckId(checkId);
    const retVal = checkRunner.denyCheckResult(
      checkId,
      checkResultType,
      projectId,
      verseRef,
      itemText,
      checkResultUniqueId,
    );
    return retVal;
  }

  // #endregion

  // #region Check Configuration Provider
  async isCheckSetupForProject(checkId: string, projectId: string): Promise<boolean> {
    const checkRunner = await this.findCheckRunnerForCheckId(checkId);
    if (!checkRunner) throw new Error(`Check runner not found for check ID: ${checkId}`);
    return checkRunner.isCheckSetupForProject(checkId, projectId);
  }

  // #endregion

  // #region Helper methods

  private async refreshCheckRunners(): Promise<void> {
    // Wait for the .NET check runner to be available
    // Ideally we would wait for all of them, but the .NET runner is the only critical one for now
    const timeoutInMS = 20_000;
    await papi.networkObjectStatus.waitForNetworkObject(
      { id: 'dotNetCheckRunner-data', objectType: CHECK_RUNNER_NETWORK_OBJECT_TYPE },
      timeoutInMS,
    );

    // Get all network objects then filter out everything that isn't of the right type
    const allNetworkObjects = await papi.networkObjectStatus.getAllNetworkObjectDetails();
    Object.getOwnPropertyNames(allNetworkObjects).forEach((propertyName) => {
      if (allNetworkObjects[propertyName].objectType !== CHECK_RUNNER_NETWORK_OBJECT_TYPE)
        delete allNetworkObjects[propertyName];
    });

    // Add new check runners to the map
    let notifyOfNewCheckRunners = false;
    await Promise.all(
      Object.getOwnPropertyNames(allNetworkObjects).map(async (propertyName) => {
        const checkRunnerDetails = allNetworkObjects[propertyName];
        if (this.checkRunners.has(checkRunnerDetails.id)) return;
        // We dynamically filtered down to just check runners above, so we know this is a check runner
        // @ts-expect-error 2344
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const checkRunner = (await papi.dataProviders.get(checkRunnerDetails.id)) as ICheckRunner;
        if (!checkRunner) return;
        // Check the map a second time to avoid race conditions after the previous `await`
        if (this.checkRunners.has(checkRunnerDetails.id)) return;
        this.checkRunners.set(checkRunnerDetails.id, checkRunner);
        notifyOfNewCheckRunners = true;

        // Clean up when a check runner goes away
        checkRunner.onDidDispose(async () => {
          const retVal = this.checkRunners.delete(checkRunnerDetails.id);
          this.notifyUpdate('AvailableChecks');
          return retVal;
        });
      }),
    );
    if (notifyOfNewCheckRunners) this.notifyUpdate('AvailableChecks');
  }

  // Try to find the one check runner that is hosting the desired check ID
  private async findCheckRunnerForCheckId(checkId: string): Promise<ICheckRunner> {
    let ranRefresh = false;
    if (this.checkRunners.size === 0) {
      ranRefresh = true;
      await this.refreshCheckRunners();
      if (!this.checkRunners) throw new Error(`No check runners available`);
    }

    let retVal: ICheckRunner | undefined = await this.findCheckRunnerForCheckIdInternal(checkId);

    // Maybe a new check runner came online
    if (!retVal && !ranRefresh) {
      await this.refreshCheckRunners();
      retVal = await this.findCheckRunnerForCheckIdInternal(checkId);
    }

    if (!retVal) throw new Error(`Could not find check id ${checkId}`);
    return retVal;
  }

  private async findCheckRunnerForCheckIdInternal(
    checkId: string,
  ): Promise<ICheckRunner | undefined> {
    let retVal: ICheckRunner | undefined;

    await Promise.all(
      [...this.checkRunners.values()].map(async (checkRunner) => {
        const availableChecks = await checkRunner.getAvailableChecks(undefined);
        if (
          availableChecks.length === 0 ||
          !availableChecks.find((checkDetails) => checkDetails.checkId === checkId)
        )
          return;
        if (retVal) logger.warn(`Check ${checkId} has been registered by multiple check runners`);
        retVal = checkRunner;
      }),
    );

    return retVal;
  }

  private async splitJobScopeByCheckRunner(
    jobScope: CheckJobScope,
  ): Promise<PartitionedJobScope[]> {
    const assignedJobs: PartitionedJobScope[] = [];
    await Promise.all(
      jobScope.checkIds.map(async (checkId) => {
        const checkRunner = await this.findCheckRunnerForCheckId(checkId);
        if (!checkRunner) throw new Error(`Check runner not found for check ID: ${checkId}`);
        let assignedScope = assignedJobs.find((j) => j.checkRunner === checkRunner);
        // Add the check ID to the existing job scope if we already have one for this check runner
        if (assignedScope) {
          assignedScope.jobScope.checkIds.push(checkId);
        } else {
          assignedScope = {
            checkRunner,
            jobId: '',
            jobScope: { ...jobScope, checkIds: [checkId] },
          };
          assignedJobs.push(assignedScope);
        }
      }),
    );
    return assignedJobs;
  }

  // #endregion
}

/**
 * This name is used to register the check data provider on the papi. You can use this name to find
 * the data provider when accessing it using the useData hook
 */
const checkAggregatorServiceProviderName = 'platformScripture.checkAggregator';

let initializationPromise: Promise<void> | undefined;
let dataProvider: IDisposableDataProvider<ICheckAggregatorService>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          dataProvider = await papi.dataProviders.registerEngine(
            checkAggregatorServiceProviderName,
            new CheckAggregatorDataProviderEngine(),
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

const resultsInvalidatedEventEmitter =
  papi.network.createNetworkEventEmitter<CheckResultsInvalidated>(CHECK_RESULTS_INVALIDATED_EVENT);

/** Notify all listeners that check results have been invalidated and should be refreshed */
export function notifyCheckResultsInvalidated(e: CheckResultsInvalidated): void {
  resultsInvalidatedEventEmitter.emit(e);
}

const checkAggregatorServiceObjectToProxy = Object.freeze({});

const serviceObject = createSyncProxyForAsyncObject<ICheckAggregatorService>(async () => {
  await initialize();
  return dataProvider;
}, checkAggregatorServiceObjectToProxy);

async function dispose(): Promise<boolean> {
  const disposalResults: boolean[] = await Promise.all([
    dataProvider.dispose(),
    resultsInvalidatedEventEmitter.dispose(),
  ]);
  return disposalResults.every((result) => result);
}

/** Service for communicating with all {@link ICheckRunner} instances on the network. */
export const checkAggregatorService = {
  initialize,
  dispose,
  serviceObject,
};

export default checkAggregatorService;
