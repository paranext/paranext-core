import papi, { DataProviderEngine, dataProviders, logger } from '@papi/backend';
import { Mutex, MutexMap, UnsubscriberAsyncList } from 'platform-bible-utils';
import type { UnsubscriberAsync } from 'platform-bible-utils';
import {
  DataProviderUpdateInstructions,
  ExtensionDataScope,
  IDataProviderEngine,
  IDisposableDataProvider,
} from '@papi/core';
import {
  Check,
  CheckCreatorFunction,
  CheckDetails,
  CheckDetailsWithCheckId,
  CheckEnablerDisabler,
  CheckInputRange,
  CheckResultClassifier,
  CheckRunResult,
  CheckRunnerCheckDetails,
  CheckRunnerDataTypes,
  ICheckHostingService,
  ICheckRunner,
} from 'platform-scripture';
import { VerseRef } from '@sillsdev/scripture';
import type { ProjectDataProviderInterfaces } from 'papi-shared-types';
import { CHECK_RUNNER_NETWORK_OBJECT_TYPE } from './check.model';
import { PersistedCheckRunResults } from './persisted-check-run-result.model';

/** Details about a check that include a way to create the check */
type CheckDetailsWithCreator = CheckDetailsWithCheckId & {
  /** Function used to create an instance of a check */
  createFunction: CheckCreatorFunction;
};

// This lives outside the engine because the register and unregister functions also need to do so
const registeredChecksById = new Map<string, CheckDetailsWithCreator>();

type DetailsAboutCheckInProject = {
  checkId: string;
  check: Check;
  latestResults: CheckRunResult[];
};

type CheckRunnerPdps = {
  usfmBookPdp: ProjectDataProviderInterfaces['platformScripture.USFM_Book'];
  basePdp: ProjectDataProviderInterfaces['platform.base'];
};

const deniedDataScope: ExtensionDataScope = {
  extensionName: 'platform-scripture',
  dataQualifier: 'deniedResultsList',
};

class CheckRunnerEngine
  extends DataProviderEngine<CheckRunnerDataTypes>
  implements IDataProviderEngine<CheckRunnerDataTypes>, CheckEnablerDisabler, CheckResultClassifier
{
  private activeRanges: CheckInputRange[] = [];
  private mutexesPerCheck = new MutexMap();
  private enabledChecksByProjectId = new Map<string, DetailsAboutCheckInProject[]>();
  private subscribedProjects = new Map<string, CheckRunnerPdps>();
  private deniedCheckResultsByProjectId = new Map<string, PersistedCheckRunResults>();

  // #region Checks

  async getAvailableChecks(): Promise<CheckRunnerCheckDetails[]> {
    // Copy over check details to return
    const checks = new Map<string, CheckRunnerCheckDetails>();
    registeredChecksById.forEach((checkDetails, registeredCheckId) => {
      if (!checkDetails) return;
      checks.set(registeredCheckId, {
        checkId: checkDetails.checkId,
        checkName: checkDetails.checkName,
        checkDescription: checkDetails.checkDescription,
        enabledProjectIds: [],
      });
    });

    // Add details about which ones are enabled for which projects
    Object.getOwnPropertyNames(this.enabledChecksByProjectId).forEach((projectId) => {
      this.enabledChecksByProjectId.get(projectId)?.forEach(({ checkId }) => {
        const check = checks.get(checkId);
        if (!check) throw new Error(`Check ${checkId} is enabled but not registered!`);
        check.enabledProjectIds.push(projectId);
      });
    });
    return [...checks.values()];
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setAvailableChecks(): Promise<DataProviderUpdateInstructions<CheckRunnerDataTypes>> {
    throw new Error('setAvailableChecks disabled - use enableCheck and disableCheck');
  }

  async enableCheck(checkId: string, projectId: string): Promise<void> {
    await this.mutexesPerCheck.get(checkId).runExclusive(async () => {
      let checksForProject = this.enabledChecksByProjectId.get(projectId);
      // If the check is already enabled for this project, there is nothing to do
      if (
        !!checksForProject &&
        checksForProject.find((checkData) => {
          return checkData.checkId === checkId;
        })
      ) {
        logger.debug(
          `Re-enabling check ${checkId} for project ${projectId} that was already enabled`,
        );
        return;
      }

      // Make sure we know about the check
      const checkDetails = registeredChecksById.get(checkId);
      if (!checkDetails) throw new Error(`Cannot enable unknown check: ${checkId}`);

      // Make sure there is an entry to store the check details for the given project
      if (!checksForProject) {
        checksForProject = [];
        this.enabledChecksByProjectId.set(projectId, checksForProject);
      }

      // Create a check and initialize it with the given project
      logger.debug(`Creating check with object of type ${typeof checkDetails.createFunction}`);
      let warnings: string[] = [];
      try {
        const checkObj = await checkDetails.createFunction();
        warnings = await checkObj.initialize(projectId);
        const checkData: DetailsAboutCheckInProject = {
          checkId,
          check: checkObj,
          latestResults: [],
        };
        checksForProject.push(checkData);
      } catch (error) {
        logger.error(`Error initializing check "${checkId}": ${JSON.stringify(error)}`);
      }
      this.notifyUpdate('AvailableChecks');

      // Automatically rebuild results when project data changes
      if (!this.subscribedProjects.has(projectId)) {
        // This is assuming that whenever project data changes, this PDP will see an update.
        const usfmBookPdp = await papi.projectDataProviders.get(
          'platformScripture.USFM_Book',
          projectId,
        );
        const basePdp = await papi.projectDataProviders.get('platform.base', projectId);
        const pdps: CheckRunnerPdps = { usfmBookPdp, basePdp };
        // We should check a second time since we `await`ed a few lines back
        if (!this.subscribedProjects.has(projectId)) {
          this.subscribedProjects.set(projectId, pdps);
          // We just need something to tell us when project data changes
          await usfmBookPdp.subscribeBookUSFM(
            new VerseRef(1, 1, 1),
            async () => {
              // Ideally we'd want to check if the text that changed is inside of an active range
              // This isn't available to subscriptions right now, so just rebuild everything
              try {
                await this.rebuildResults(projectId);
              } catch (error) {
                logger.error(
                  `Error when building check results for project ${projectId}: ${JSON.stringify(error)}`,
                );
              }
            },
            { retrieveDataImmediately: false, whichUpdates: '*' },
          );

          usfmBookPdp.onDidDispose(() => {
            this.enabledChecksByProjectId.get(projectId)?.forEach((enabledCheckDetails) => {
              this.disableCheck(enabledCheckDetails.checkId, projectId);
            });
            this.enabledChecksByProjectId.delete(projectId);
            this.subscribedProjects.delete(projectId);
          });
        }
      }

      if (warnings.length > 0)
        logger.warn(`Warnings when enabling check ${checkId}: ${JSON.stringify(warnings)}`);
    });
    await this.rebuildResults(projectId);
  }

  async disableCheck(checkId: string, projectId?: string): Promise<void> {
    const lock = this.mutexesPerCheck.get(checkId);
    await lock.runExclusive(async () => {
      const checksToDispose: Check[] = [];

      this.enabledChecksByProjectId.forEach((enabledChecks, enabledProjectId) => {
        const relevantCheckIndex = enabledChecks.findIndex(
          (enabledCheck) =>
            enabledCheck.checkId === checkId && (!projectId || enabledProjectId === projectId),
        );
        if (relevantCheckIndex < 0) return;

        // Remove the check from the list of enabled checks and prepare to dispose of it
        const relevantCheck = enabledChecks.splice(relevantCheckIndex, 1)[0];
        checksToDispose.push(relevantCheck.check);
      });

      await Promise.all(
        checksToDispose.map(async (check) => {
          // The check object might be gone already if an extension was unloaded that contained it
          if (check) await check.dispose();
        }),
      );

      this.notifyUpdate(['AvailableChecks', 'CheckResults']);
    });
  }

  // #endregion

  // #region Ranges

  async getActiveRanges(): Promise<CheckInputRange[]> {
    return this.activeRanges;
  }

  async setActiveRanges(
    _: undefined,
    ranges: CheckInputRange[],
  ): Promise<DataProviderUpdateInstructions<CheckRunnerDataTypes>> {
    this.activeRanges = ranges;
    await this.rebuildResults();
    return 'ActiveRanges';
  }

  // #endregion

  // #region Results

  async denyCheckResult(
    _checkId: string,
    checkResultType: string,
    projectId: string,
    verseRef: VerseRef,
    selectedText: string,
    checkResultUniqueId?: string,
  ): Promise<boolean> {
    const deniedResults = await this.loadDeniedResults(projectId);
    const retVal = deniedResults.addResult({
      checkResultType,
      verseRef,
      selectedText,
      checkResultUniqueId,
    });
    if (retVal) await this.saveDeniedResults(projectId);
    return retVal;
  }

  async allowCheckResult(
    _checkId: string,
    checkResultType: string,
    projectId: string,
    verseRef: VerseRef,
    selectedText: string,
    checkResultUniqueId?: string,
  ): Promise<boolean> {
    const deniedResults = await this.loadDeniedResults(projectId);
    const retVal = deniedResults.removeResult({
      checkResultType,
      verseRef,
      selectedText,
      checkResultUniqueId,
    });
    if (retVal) await this.saveDeniedResults(projectId);
    return retVal;
  }

  async getCheckResults(): Promise<CheckRunResult[]> {
    const retVal: CheckRunResult[] = [];
    this.enabledChecksByProjectId.forEach((checkDetails) => {
      checkDetails.forEach((oneCheckDetails) => {
        retVal.push(...oneCheckDetails.latestResults);
      });
    });
    return Promise.all(
      retVal.map(async (checkRunResult) => {
        const deniedResults = await this.loadDeniedResults(checkRunResult.projectId);
        checkRunResult.isDenied = deniedResults.containsResult(checkRunResult);
        return checkRunResult;
      }),
    );
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setCheckResults(): Promise<DataProviderUpdateInstructions<CheckRunnerDataTypes>> {
    throw new Error('setCheckResults disabled');
  }

  async loadDeniedResults(projectId: string): Promise<PersistedCheckRunResults> {
    let deniedResults = this.deniedCheckResultsByProjectId.get(projectId);
    if (!deniedResults) {
      deniedResults = new PersistedCheckRunResults(
        await this.subscribedProjects.get(projectId)?.basePdp.getExtensionData(deniedDataScope),
      );
      this.deniedCheckResultsByProjectId.set(projectId, deniedResults);
    }
    return deniedResults;
  }

  async saveDeniedResults(projectId: string): Promise<void> {
    const deniedResults = this.deniedCheckResultsByProjectId.get(projectId);
    if (!deniedResults) return;
    const data = deniedResults.serialize();
    await this.subscribedProjects.get(projectId)?.basePdp.setExtensionData(deniedDataScope, data);
  }

  async rebuildResults(projectId?: string): Promise<void> {
    // First dimension of array is by project ID. Second dimension is by check for the project.
    const twoDimArray = this.activeRanges.map((checkRange) => {
      if (!!projectId && projectId !== checkRange.projectId) return [];
      const enabledChecksForProject = this.enabledChecksByProjectId.get(checkRange.projectId);
      if (!enabledChecksForProject) return [];
      return Array.from(enabledChecksForProject).map(async (enabledCheck) => {
        try {
          const results = await enabledCheck.check.getCheckResults(checkRange);
          enabledCheck.latestResults = results;
        } catch (error) {
          logger.error(`Check error for "${enabledCheck.checkId}": ${JSON.stringify(error)}`);
          enabledCheck.latestResults = [];
        }
      });
    });
    // Flatten the 2D array to a 1D array of promises to get check results
    const oneDimArray = twoDimArray.reduce((accumulator, value) => accumulator.concat(value), []);
    // After all the promises are settled, every check's `latestResults` will be filled in
    await Promise.all(oneDimArray);
    this.notifyUpdate('CheckResults');
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
    await dataProvider.disableCheck(checkId);
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
  const checkId = `${checkDetails.checkName}-${Date.now()}`;

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

const checkHostingService: ICheckHostingService = {
  initialize,
  dispose: async () => unsubscribers.runAllUnsubscribers(),
  getCheckRunner: async () => {
    await initialize();
    return dataProvider;
  },
};

export default checkHostingService;
