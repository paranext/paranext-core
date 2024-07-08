import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  DataProviderUpdateInstructions,
  IDataProviderEngine,
  IDisposableDataProvider,
  NetworkObjectDetails,
} from '@papi/core';
import papi, { DataProviderEngine, logger } from '@papi/backend';
import {
  CheckInputRange,
  CheckRunResult,
  CheckRunnerCheckDetails,
  CheckRunnerDataTypes,
  ICheckAggregatingService,
  ICheckRunner,
} from 'platform-scripture';
import { CHECK_RUNNER_NETWORK_OBJECT_TYPE } from './check.model';

// This is an object with names of check runners as keys and details about each as values
let checkRunners: Record<string, NetworkObjectDetails> | undefined;
async function refreshCheckRunners() {
  // Wait for a check runner to be registered
  const timeoutInMS = 20 * 1000;
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

  checkRunners = allNetworkObjects;
}

// Core logic for getCheckRunnerForCheckId that doesn't do any refreshing of network objects
async function getCheckRunnerForCheckIdInternal(
  checkId: string,
): Promise<ICheckRunner | undefined> {
  // Copy the reference in case it changes underneath us
  const myCheckRunners = checkRunners;
  if (!myCheckRunners) return undefined;

  let retVal: ICheckRunner | undefined;

  await Promise.all(
    Object.getOwnPropertyNames(myCheckRunners).map(async (checkRunner) => {
      const checkRunnerNetObj = await papi.networkObjects.get<ICheckRunner>(
        myCheckRunners[checkRunner].id,
      );
      if (!checkRunnerNetObj) return;
      const checksAvailable = await checkRunnerNetObj.getAvailableChecks(undefined);
      if (
        checksAvailable.length === 0 ||
        !checksAvailable.find((checkDetails) => checkDetails.checkId === checkId)
      )
        return;
      if (retVal) logger.warn(`Check id ${checkId} has been registered by multiple check runners`);
      retVal = checkRunnerNetObj;
    }),
  );

  return retVal;
}

// Try to find the one check runner that is hosting the desired check ID
async function getCheckRunnerForCheckId(checkId: string): Promise<ICheckRunner> {
  let ranRefresh = false;
  if (!checkRunners) {
    ranRefresh = true;
    await refreshCheckRunners();
    if (!checkRunners) throw new Error(`No check runners available`);
  }

  let retVal: ICheckRunner | undefined = await getCheckRunnerForCheckIdInternal(checkId);

  // Maybe a new check runner came online
  if (!retVal && !ranRefresh) {
    await refreshCheckRunners();
    retVal = await getCheckRunnerForCheckIdInternal(checkId);
  }

  if (!retVal) throw new Error(`Could not find check id ${checkId}`);
  return retVal;
}

// Every class method has this problem, but we need to implement this as a class to be a DP engine
/* eslint-disable class-methods-use-this */
class CheckDataProviderEngine
  extends DataProviderEngine<CheckRunnerDataTypes>
  implements IDataProviderEngine<CheckRunnerDataTypes>
{
  async setAvailableChecks(): Promise<DataProviderUpdateInstructions<CheckRunnerDataTypes>> {
    throw new Error('setAvailableChecks disabled');
  }

  async setActiveRanges(
    _ignore: undefined,
    ranges: CheckInputRange[],
  ): Promise<DataProviderUpdateInstructions<CheckRunnerDataTypes>> {
    await refreshCheckRunners();
    // Copy the reference in case it changes underneath us
    const myCheckRunners = checkRunners;
    if (!myCheckRunners) return false;

    // Gather all of the ranges from all of the check runners
    await Promise.all(
      Object.getOwnPropertyNames(myCheckRunners).map(async (checkRunner) => {
        const checkRunnerNetObj = await papi.networkObjects.get<ICheckRunner>(
          myCheckRunners[checkRunner].id,
        );
        if (!checkRunnerNetObj) return;
        await checkRunnerNetObj.setActiveRanges(undefined, ranges);
      }),
    );
    return 'ActiveRanges';
  }

  async setCheckResults(): Promise<DataProviderUpdateInstructions<CheckRunnerDataTypes>> {
    throw new Error('setCheckResults disabled');
  }

  async getAvailableChecks(): Promise<CheckRunnerCheckDetails[]> {
    await refreshCheckRunners();
    const retVal: CheckRunnerCheckDetails[] = [];
    // Copy the reference in case it changes underneath us
    const myCheckRunners = checkRunners;
    if (!myCheckRunners) return retVal;

    // Gather all of the check details from all of the check runners
    await Promise.all(
      Object.getOwnPropertyNames(myCheckRunners).map(async (checkRunner) => {
        const checkRunnerNetObj = await papi.networkObjects.get<ICheckRunner>(
          myCheckRunners[checkRunner].id,
        );
        if (!checkRunnerNetObj) return;
        const checksAvailable = await checkRunnerNetObj.getAvailableChecks(undefined);
        if (checksAvailable.length === 0) return;
        retVal.push(...checksAvailable);
      }),
    );
    return retVal;
  }

  async getActiveRanges(): Promise<CheckInputRange[]> {
    const retVal: CheckInputRange[] = [];
    // Copy the reference in case it changes underneath us
    const myCheckRunners = checkRunners;
    if (!myCheckRunners) return retVal;

    // Gather all of the ranges from all of the check runners
    await Promise.all(
      Object.getOwnPropertyNames(myCheckRunners).map(async (checkRunner) => {
        const checkRunnerNetObj = await papi.networkObjects.get<ICheckRunner>(
          myCheckRunners[checkRunner].id,
        );
        if (!checkRunnerNetObj) return;
        const ranges = await checkRunnerNetObj.getActiveRanges(undefined);
        if (ranges.length === 0) return;
        retVal.push(...ranges);
      }),
    );
    return retVal;
  }

  async getCheckResults(): Promise<CheckRunResult[]> {
    const retVal: CheckRunResult[] = [];

    // Copy the reference in case it changes underneath us
    const myCheckRunners = checkRunners;
    if (!myCheckRunners) return retVal;

    // Gather all of the check results from all of the check runners
    await Promise.all(
      Object.getOwnPropertyNames(myCheckRunners).map(async (checkRunner) => {
        const checkRunnerNetObj = await papi.networkObjects.get<ICheckRunner>(
          myCheckRunners[checkRunner].id,
        );
        if (!checkRunnerNetObj) return;
        const results = await checkRunnerNetObj.getCheckResults(undefined);
        if (results.length === 0) return;
        retVal.push(...results);
      }),
    );
    return retVal;
  }

  async enableCheck(checkId: string, projectId: string): Promise<string[]> {
    const checkRunner = await getCheckRunnerForCheckId(checkId);
    return checkRunner.enableCheck(checkId, projectId);
  }

  async disableCheck(checkId: string, projectId?: string): Promise<void> {
    const checkRunner = await getCheckRunnerForCheckId(checkId);
    checkRunner.disableCheck(checkId, projectId);
  }
}

/**
 * This name is used to register the check data provider on the papi. You can use this name to find
 * the data provider when accessing it using the useData hook
 */
const checkAggregatingServiceProviderName = 'platformScripture.checkAggregatingDataProvider';

let initializationPromise: Promise<void>;
let dataProvider: IDisposableDataProvider<ICheckAggregatingService>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          dataProvider = await papi.dataProviders.registerEngine(
            checkAggregatingServiceProviderName,
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

const checkAggregatingServiceObjectToProxy = Object.freeze({
  dataProviderName: checkAggregatingServiceProviderName,
});

const serviceObject = createSyncProxyForAsyncObject<ICheckAggregatingService>(async () => {
  await initialize();
  return dataProvider;
}, checkAggregatingServiceObjectToProxy);

function dispose() {
  return dataProvider.dispose();
}

/** Service for communicating with all {@link ICheckRunner} instances on the network. */
const checkAggregatingService = {
  initialize,
  dispose,
  serviceObject,
};

export default checkAggregatingService;
