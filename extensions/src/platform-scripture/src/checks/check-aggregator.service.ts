import { createSyncProxyForAsyncObject, newGuid } from 'platform-bible-utils';
import {
  DataProviderUpdateInstructions,
  IDataProviderEngine,
  IDisposableDataProvider,
} from '@papi/core';
import papi, { DataProviderEngine, logger } from '@papi/backend';
import {
  CheckAggregatorDataTypes,
  CheckInputRange,
  CheckResultClassifier,
  CheckRunResult,
  CheckRunnerCheckDetails,
  CheckSubscriptionId,
  CheckSubscriptionManager,
  ICheckAggregatorService,
  ICheckRunner,
  SettableCheckDetails,
} from 'platform-scripture';
import { VerseRef } from '@sillsdev/scripture';
import { CHECK_RUNNER_NETWORK_OBJECT_TYPE } from './check.model';
import {
  aggregateProjectIdsByCheckId,
  aggregateRanges,
  isWithinRange,
  SubscriptionData,
} from './check-aggregator.utils';

class CheckAggregatorDataProviderEngine
  extends DataProviderEngine<CheckAggregatorDataTypes>
  implements
    IDataProviderEngine<CheckAggregatorDataTypes>,
    CheckResultClassifier,
    CheckSubscriptionManager
{
  // Maps check runner IDs to their ICheckRunner objects
  checkRunners = new Map<string, ICheckRunner>();

  // Maps subscription IDs that we created to data about the subscription
  subscriptionsBySubscriptionId = new Map<CheckSubscriptionId, SubscriptionData>();

  // #region Checks

  async getAvailableChecks(
    subscriptionId: CheckSubscriptionId,
  ): Promise<CheckRunnerCheckDetails[]> {
    if (!subscriptionId) return [];
    const subscriptionData = this.findSubscription(subscriptionId);

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

    // Mark which projects this subscription is using for each check
    const { enabledProjectsByCheckId } = subscriptionData;
    retVal.forEach((checkDetails) => {
      checkDetails.enabledProjectIds = [
        ...(enabledProjectsByCheckId.get(checkDetails.checkId) ?? []),
      ];
    });

    return retVal;
  }

  async setAvailableChecks(
    subscriptionId: CheckSubscriptionId,
    newAvailableChecks: SettableCheckDetails[],
  ): Promise<DataProviderUpdateInstructions<CheckAggregatorDataTypes>> {
    if (!subscriptionId) return false;
    const subscriptionData = this.findSubscription(subscriptionId);

    // Take a snapshot
    const beforeUpdate = aggregateProjectIdsByCheckId(this.subscriptionsBySubscriptionId);

    // Update the subscription
    subscriptionData.enabledProjectsByCheckId.clear();
    newAvailableChecks.forEach((singleCheckDetails) => {
      subscriptionData.enabledProjectsByCheckId.set(
        singleCheckDetails.checkId,
        new Set(singleCheckDetails.enabledProjectIds),
      );
    });

    // Take another snapshot
    const afterUpdate = aggregateProjectIdsByCheckId(this.subscriptionsBySubscriptionId);

    // Enable checks that weren't previously enabled
    const toEnable: { checkId: string; projectId: string }[] = [];
    afterUpdate.forEach((projectIds, checkId) => {
      projectIds.forEach((projectId) => {
        const beforeProjectIds = beforeUpdate.get(checkId);
        if (!beforeProjectIds || !beforeProjectIds.has(projectId))
          toEnable.push({ checkId, projectId });
      });
    });
    await Promise.all(toEnable.map((x) => this.enableCheck(x.checkId, x.projectId)));

    // Disable checks that are no longer enabled
    const toDisable: { checkId: string; projectId: string }[] = [];
    beforeUpdate.forEach((projectIds, checkId) => {
      projectIds.forEach((projectId) => {
        const afterProjectIds = afterUpdate.get(checkId);
        if (!afterProjectIds || !afterProjectIds.has(projectId))
          toDisable.push({ checkId, projectId });
      });
    });
    await Promise.all(toDisable.map((x) => this.disableCheck(x.checkId, x.projectId)));

    return ['AvailableChecks', 'CheckResults'];
  }

  // #endregion

  // #region Active Ranges

  async getActiveRanges(subscriptionId: CheckSubscriptionId): Promise<CheckInputRange[]> {
    if (!subscriptionId) return [];
    return this.findSubscription(subscriptionId).ranges;
  }

  async setActiveRanges(
    subscriptionId: CheckSubscriptionId,
    ranges: CheckInputRange[],
  ): Promise<DataProviderUpdateInstructions<CheckAggregatorDataTypes>> {
    if (!subscriptionId) return false;

    // Update the subscription
    this.findSubscription(subscriptionId).ranges = ranges;

    // Aggregate all ranges from all subscriptions
    const aggregatedRanges = aggregateRanges(this.subscriptionsBySubscriptionId);

    // Push the single, aggregated view of ranges into all of the active check runners
    await this.refreshCheckRunners();
    await Promise.all(
      [...this.checkRunners.values()].map(async (checkRunner) => {
        await checkRunner.setActiveRanges(undefined, aggregatedRanges);
      }),
    );
    return ['ActiveRanges', 'CheckResults'];
  }

  // #endregion

  // #region Include Denied Results

  async getIncludeDeniedResults(subscriptionId: CheckSubscriptionId): Promise<boolean> {
    if (!subscriptionId) return false;
    return this.findSubscription(subscriptionId).includeDeniedResults;
  }

  async setIncludeDeniedResults(
    subscriptionId: CheckSubscriptionId,
    newIncludeDeniedResults: boolean,
  ): Promise<DataProviderUpdateInstructions<CheckAggregatorDataTypes>> {
    if (!subscriptionId) return false;
    this.findSubscription(subscriptionId).includeDeniedResults = newIncludeDeniedResults;
    return ['IncludeDeniedResults', 'CheckResults'];
  }

  // #endregion

  // #region Check Results

  async getCheckResults(subscriptionId: CheckSubscriptionId): Promise<CheckRunResult[]> {
    if (!subscriptionId) return [];

    // Find all applicable check runners for our subscription
    const subscription = this.findSubscription(subscriptionId);
    const checkIdsForSubscription = Array.from(subscription.enabledProjectsByCheckId.keys());
    const checkRunners = new Set<ICheckRunner>();
    await Promise.all(
      checkIdsForSubscription.map(async (checkId: string) => {
        const checkRunner = await this.findCheckRunnerForCheckId(checkId);
        checkRunners.add(checkRunner);
      }),
    );

    // Get results from all applicable check runners and filter based on the subscription
    const retVal: CheckRunResult[] = [];
    await Promise.all(
      [...checkRunners].map(async (checkRunner) => {
        const results = await checkRunner.getCheckResults(undefined);
        results.forEach((result) => {
          // Filter by "denied"
          if (result.isDenied && !subscription.includeDeniedResults) return;

          // Filter by range
          const { verseRef } = result;
          if (!subscription.ranges.some((range) => isWithinRange(range, verseRef))) return;

          // Filter by check + project
          if (!result.checkId) return;
          const projects = subscription.enabledProjectsByCheckId.get(result.checkId);
          if (projects?.has(result.projectId)) retVal.push(result);
        });
      }),
    );
    return retVal;
  }

  // Required method since this is a data provider engine
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/class-methods-use-this
  async setCheckResults(): Promise<DataProviderUpdateInstructions<CheckAggregatorDataTypes>> {
    throw new Error('setCheckResults disabled');
  }

  // #endregion

  // #region Deny/Allow Individual Results

  async allowCheckResult(
    checkId: string,
    checkResultType: string,
    projectId: string,
    verseRef: VerseRef,
    selectedText: string,
    checkResultUniqueId?: string,
  ): Promise<boolean> {
    const checkRunner = await this.findCheckRunnerForCheckId(checkId);
    const retVal = checkRunner.allowCheckResult(
      checkId,
      checkResultType,
      projectId,
      verseRef,
      selectedText,
      checkResultUniqueId,
    );
    this.notifyUpdate('CheckResults');
    return retVal;
  }

  async denyCheckResult(
    checkId: string,
    checkResultType: string,
    projectId: string,
    verseRef: VerseRef,
    selectedText: string,
    checkResultUniqueId?: string,
  ): Promise<boolean> {
    const checkRunner = await this.findCheckRunnerForCheckId(checkId);
    const retVal = checkRunner.denyCheckResult(
      checkId,
      checkResultType,
      projectId,
      verseRef,
      selectedText,
      checkResultUniqueId,
    );
    this.notifyUpdate('CheckResults');
    return retVal;
  }

  // #endregion

  // #region Subscriptions

  async createSubscription(): Promise<CheckSubscriptionId> {
    const retVal = newGuid();
    this.subscriptionsBySubscriptionId.set(retVal, {
      enabledProjectsByCheckId: new Map<string, Set<string>>(),
      ranges: [],
      includeDeniedResults: true,
    });
    logger.debug(`Created check subscription: ${retVal}`);
    return retVal;
  }

  async deleteSubscription(subscriptionId: CheckSubscriptionId): Promise<boolean> {
    logger.debug(`Deleted check subscription: ${subscriptionId}`);
    return this.subscriptionsBySubscriptionId.delete(subscriptionId);
  }

  // #endregion

  // #region Helper methods

  private async enableCheck(checkId: string, projectId: string): Promise<void> {
    const checkRunner = await this.findCheckRunnerForCheckId(checkId);
    return checkRunner.enableCheck(checkId, projectId);
  }

  private async disableCheck(checkId: string, projectId?: string): Promise<void> {
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
        // We dynamically filtered down to just check runners above, so we know this is a check runner
        // @ts-expect-error 2344
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const checkRunner = (await papi.dataProviders.get(checkRunnerDetails.id)) as ICheckRunner;
        if (!checkRunner) return;
        // Check the map a second time to avoid race conditions after the previous `await`
        if (this.checkRunners.has(checkRunnerDetails.id)) return;
        this.checkRunners.set(checkRunnerDetails.id, checkRunner);

        // Make sure the new check runner has the correct ranges set
        await checkRunner.setActiveRanges(
          undefined,
          aggregateRanges(this.subscriptionsBySubscriptionId),
        );

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

  private findSubscription(subscriptionId: CheckSubscriptionId) {
    // Find this subscription
    const retVal = this.subscriptionsBySubscriptionId.get(subscriptionId);
    if (!retVal) throw new Error(`Subscription ID not found: ${subscriptionId}`);
    return retVal;
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
