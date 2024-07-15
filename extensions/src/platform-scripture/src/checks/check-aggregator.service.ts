import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  DataProviderUpdateInstructions,
  IDataProviderEngine,
  IDisposableDataProvider,
} from '@papi/core';
import papi, { DataProviderEngine, logger } from '@papi/backend';
import {
  CheckInputRange,
  CheckRunResult,
  CheckRunnerCheckDetails,
  CheckRunnerDataTypes,
  ICheckAggregatorService,
  ICheckRunner,
} from 'platform-scripture';
import { CHECK_RUNNER_NETWORK_OBJECT_TYPE } from './check.model';

class CheckDataProviderEngine
  extends DataProviderEngine<CheckRunnerDataTypes>
  implements IDataProviderEngine<CheckRunnerDataTypes>
{
  // Maps check runner IDs to their ICheckRunner objects
  checkRunners = new Map<string, ICheckRunner>();

  // The most recent values that were set via `setActiveRanges`
  lastRangesSet: CheckInputRange[] = [];

  // Required method since this is a data provider engine
  // eslint-disable-next-line class-methods-use-this
  async setAvailableChecks(): Promise<DataProviderUpdateInstructions<CheckRunnerDataTypes>> {
    throw new Error('setAvailableChecks disabled');
  }

  async setActiveRanges(
    _ignore: undefined,
    ranges: CheckInputRange[],
  ): Promise<DataProviderUpdateInstructions<CheckRunnerDataTypes>> {
    this.lastRangesSet = ranges;
    await this.refreshCheckRunners();
    await Promise.all(
      [...this.checkRunners.values()].map(async (checkRunner) => {
        await checkRunner.setActiveRanges(undefined, ranges);
      }),
    );
    return 'ActiveRanges';
  }

  // Required method since this is a data provider engine
  // eslint-disable-next-line class-methods-use-this
  async setCheckResults(): Promise<DataProviderUpdateInstructions<CheckRunnerDataTypes>> {
    throw new Error('setCheckResults disabled');
  }

  async getAvailableChecks(): Promise<CheckRunnerCheckDetails[]> {
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

  async getActiveRanges(): Promise<CheckInputRange[]> {
    return this.lastRangesSet;
  }

  async getCheckResults(): Promise<CheckRunResult[]> {
    const retVal: CheckRunResult[] = [];
    await Promise.all(
      [...this.checkRunners.values()].map(async (checkRunner) => {
        const results = await checkRunner.getCheckResults(undefined);
        if (results.length === 0) return;
        retVal.push(...results);
      }),
    );
    return retVal;
  }

  async enableCheck(checkId: string, projectId: string): Promise<string[]> {
    const checkRunner = await this.findCheckRunnerForCheckId(checkId);
    return checkRunner.enableCheck(checkId, projectId);
  }

  async disableCheck(checkId: string, projectId?: string): Promise<void> {
    const checkRunner = await this.findCheckRunnerForCheckId(checkId);
    return checkRunner.disableCheck(checkId, projectId);
  }

  private async refreshCheckRunners(): Promise<void> {
    // Wait for any check runner to be registered
    const timeoutInMS = 20_000;
    await papi.networkObjectStatus.waitForNetworkObject(
      { objectType: CHECK_RUNNER_NETWORK_OBJECT_TYPE },
      timeoutInMS,
    );

    // Get all network objects then filter out everything that isn't of the right type
    const allNetworkObjects = await papi.networkObjectStatus.getAllNetworkObjectDetails();
    Object.getOwnPropertyNames(allNetworkObjects).forEach((propertyName) => {
      if (allNetworkObjects[propertyName].objectType !== CHECK_RUNNER_NETWORK_OBJECT_TYPE)
        delete allNetworkObjects[propertyName];
    });

    // Add new check runners to the map
    await Promise.all(
      Object.getOwnPropertyNames(allNetworkObjects).map(async (propertyName) => {
        const checkRunnerDetails = allNetworkObjects[propertyName];
        if (this.checkRunners.has(checkRunnerDetails.id)) return;
        const checkRunner = await papi.networkObjects.get<ICheckRunner>(checkRunnerDetails.id);
        if (!checkRunner) return;
        // Check the map a second time to avoid race conditions after the previous `await`
        if (this.checkRunners.has(checkRunnerDetails.id)) return;
        this.checkRunners.set(checkRunnerDetails.id, checkRunner);

        // Make sure the new check runner has the correct ranges set
        await checkRunner.setActiveRanges(undefined, this.lastRangesSet);

        // Pass along updated results from check runners
        const resultsUnsubscriber = await checkRunner.subscribeCheckResults(
          undefined,
          () => this.notifyUpdate('CheckResults'),
          { retrieveDataImmediately: false },
        );
        // Pass along updated available checks from check runners
        const checksUnsubscriber = await checkRunner.subscribeAvailableChecks(
          undefined,
          () => this.notifyUpdate('AvailableChecks'),
          { retrieveDataImmediately: false },
        );
        // Don't pass along updated active ranges because we set those on the check runners

        // Clean up when a check runner goes away
        checkRunner.onDidDispose(async () => {
          return (
            (await resultsUnsubscriber()) &&
            (await checksUnsubscriber()) &&
            this.checkRunners.delete(checkRunnerDetails.id)
          );
        });
      }),
    );
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
            new CheckDataProviderEngine(),
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

const checkAggregatorServiceObjectToProxy = Object.freeze({
  dataProviderName: checkAggregatorServiceProviderName,
});

const serviceObject = createSyncProxyForAsyncObject<ICheckAggregatorService>(async () => {
  await initialize();
  return dataProvider;
}, checkAggregatorServiceObjectToProxy);

function dispose() {
  return dataProvider.dispose();
}

/** Service for communicating with all {@link ICheckRunner} instances on the network. */
const checkAggregatorService = {
  initialize,
  dispose,
  serviceObject,
};

export default checkAggregatorService;
