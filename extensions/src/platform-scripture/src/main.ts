import papi, { logger, projectLookup } from '@papi/backend';
import { VerseRef } from '@sillsdev/scripture';
import { ExecutionActivationContext, ProjectSettingValidator } from '@papi/core';
import ScriptureExtenderProjectDataProviderEngineFactory, {
  SCRIPTURE_EXTENDER_PDPF_ID,
} from './project-data-provider/platform-scripture-extender-pdpef.model';
import { SCRIPTURE_EXTENDER_PROJECT_INTERFACES } from './project-data-provider/platform-scripture-extender-pdpe.model';
import checkHostingService from './checks/extension-host-check-runner.service';
import checkAggregatorService from './checks/check-aggregator.service';
import InventoryWebViewProvider, { InventoryWebViewOptions } from './inventory.web-view-provider';
import ConfigureChecksWebViewProvider, {
  configureChecksWebViewType,
  ConfigureChecksWebViewOptions,
} from './configure-checks.web-view-provider';
import CheckResultsWebViewProvider, {
  checkResultsListWebViewType,
  CheckResultsWebViewOptions,
} from './checking-results-list.web-view-provider';

const characterInventoryWebViewType = 'platformScripture.characterInventory';
const repeatedWordsInventoryWebViewType = 'platformScripture.repeatedWordsInventory';

// #region Project Setting Validators

// Should be 123 characters long
const booksPresentValidator: ProjectSettingValidator<'platformScripture.booksPresent'> = async (
  newValue,
) => newValue.length === 123 && newValue.replace(/[01]/g, '').length === 0;

// There are 7 options in the enum
const versificationValidator: ProjectSettingValidator<'platformScripture.versification'> = async (
  newValue,
) => typeof newValue === 'number' && newValue >= 0 && newValue <= 6 && Number.isInteger(newValue);

// A character can be any string value
const charactersValidator: ProjectSettingValidator<
  'platformScripture.validCharacters' | 'platformScripture.invalidCharacters'
> = async (newValue) => typeof newValue === 'string';

// A word can be any string value
const repeatableWordsValidator: ProjectSettingValidator<
  'platformScripture.repeatableWords' | 'platformScripture.nonRepeatableWords'
> = async (newValue) => typeof newValue === 'string';

// #endregion

async function openPlatformCharactersInventory(
  webViewId: string | undefined,
): Promise<string | undefined> {
  return openInventory(webViewId, characterInventoryWebViewType);
}

async function openPlatformRepeatedWordsInventory(
  webViewId: string | undefined,
): Promise<string | undefined> {
  return openInventory(webViewId, repeatedWordsInventoryWebViewType);
}

async function openInventory(
  webViewId: string | undefined,
  webViewType: string,
): Promise<string | undefined> {
  let projectId: string | undefined;

  if (webViewId) {
    const webViewDefinition = await papi.webViews.getSavedWebViewDefinition(webViewId);
    projectId = webViewDefinition?.projectId;
  }

  if (!projectId) {
    return undefined;
  }

  const options: InventoryWebViewOptions = { projectId };
  return papi.webViews.getWebView(
    webViewType,
    { type: 'float', floatSize: { width: 700, height: 800 } },
    options,
  );
}

async function configureChecks(webViewId: string | undefined): Promise<string | undefined> {
  const checkSvc = checkAggregatorService.serviceObject;
  const availableChecks = await checkSvc.getAvailableChecks(undefined);

  let projectId: string | undefined;

  logger.debug('Configuring checks');

  if (webViewId) {
    const webViewDefinition = await papi.webViews.getSavedWebViewDefinition(webViewId);
    projectId = webViewDefinition?.projectId;
  }

  if (!projectId) {
    logger.debug('No project!');
    return undefined;
  }

  const options: ConfigureChecksWebViewOptions = { projectId, availableChecks };
  return papi.webViews.getWebView(configureChecksWebViewType, { type: 'tab' }, options);
}

async function showCheckResults(webViewId: string | undefined): Promise<string | undefined> {
  let projectId: string | undefined;

  logger.debug('Running checks');

  if (webViewId) {
    const webViewDefinition = await papi.webViews.getSavedWebViewDefinition(webViewId);
    projectId = webViewDefinition?.projectId;
  }

  if (!projectId) {
    logger.debug('No project!');
    return undefined;
  }

  const options: CheckResultsWebViewOptions = { projectId };
  return papi.webViews.getWebView(checkResultsListWebViewType, { type: 'tab' }, options);
}

export async function activate(context: ExecutionActivationContext) {
  logger.info('platformScripture is activating!');

  const scriptureExtenderPdpefPromise =
    papi.projectDataProviders.registerProjectDataProviderEngineFactory(
      SCRIPTURE_EXTENDER_PDPF_ID,
      SCRIPTURE_EXTENDER_PROJECT_INTERFACES,
      new ScriptureExtenderProjectDataProviderEngineFactory(SCRIPTURE_EXTENDER_PDPF_ID),
    );

  const characterInventoryWebViewProvider = new InventoryWebViewProvider(
    '%webView_characterInventory_title%',
    characterInventoryWebViewType,
  );
  const repeatedWordsInventoryWebViewProvider = new InventoryWebViewProvider(
    '%webView_repeatedWordsInventory_title%',
    repeatedWordsInventoryWebViewType,
  );
  const checkResultsWebViewProvider = new CheckResultsWebViewProvider();
  const configureChecksWebViewProvider = new ConfigureChecksWebViewProvider(
    '%webView_configureChecks_title%',
  );

  const includeProjectsCommandPromise = papi.commands.registerCommand(
    'platformScripture.toggleIncludeMyParatext9Projects',
    async (shouldInclude) => {
      const currentSettingValue =
        shouldInclude !== undefined
          ? !shouldInclude
          : await papi.settings.get('platformScripture.includeMyParatext9Projects');
      const newSettingValue = !currentSettingValue;
      await papi.settings.set('platformScripture.includeMyParatext9Projects', newSettingValue);
      return newSettingValue;
    },
  );
  const includeProjectsValidatorPromise = papi.settings.registerValidator(
    'platformScripture.includeMyParatext9Projects',
    async (newValue) => typeof newValue === 'boolean',
  );
  const booksPresentPromise = papi.projectSettings.registerValidator(
    'platformScripture.booksPresent',
    booksPresentValidator,
  );
  const versificationPromise = papi.projectSettings.registerValidator(
    'platformScripture.versification',
    versificationValidator,
  );
  const validCharactersPromise = papi.projectSettings.registerValidator(
    'platformScripture.validCharacters',
    charactersValidator,
  );
  const invalidCharactersPromise = papi.projectSettings.registerValidator(
    'platformScripture.invalidCharacters',
    charactersValidator,
  );
  const openCharactersInventoryPromise = papi.commands.registerCommand(
    'platformScripture.openCharactersInventory',
    openPlatformCharactersInventory,
  );
  const characterInventoryWebViewProviderPromise = papi.webViewProviders.register(
    characterInventoryWebViewType,
    characterInventoryWebViewProvider,
  );
  const repeatableWordsPromise = papi.projectSettings.registerValidator(
    'platformScripture.repeatableWords',
    repeatableWordsValidator,
  );
  const nonRepeatableWordsPromise = papi.projectSettings.registerValidator(
    'platformScripture.nonRepeatableWords',
    repeatableWordsValidator,
  );
  const openRepeatedWordsInventoryPromise = papi.commands.registerCommand(
    'platformScripture.openRepeatedWordsInventory',
    openPlatformRepeatedWordsInventory,
  );
  const repeatableWordsInventoryWebViewProviderPromise = papi.webViewProviders.register(
    repeatedWordsInventoryWebViewType,
    repeatedWordsInventoryWebViewProvider,
  );
  const configureChecksPromise = papi.commands.registerCommand(
    'platformScripture.openConfigureChecks',
    configureChecks,
  );
  const configureChecksWebViewProviderPromise = papi.webViewProviders.register(
    configureChecksWebViewType,
    configureChecksWebViewProvider,
  );
  const showCheckResultsPromise = papi.commands.registerCommand(
    'platformScripture.showCheckResults',
    showCheckResults,
  );
  const showCheckResultsWebViewProviderPromise = papi.webViewProviders.register(
    checkResultsListWebViewType,
    checkResultsWebViewProvider,
  );

  await checkHostingService.initialize();
  await checkAggregatorService.initialize();

  context.registrations.add(
    await scriptureExtenderPdpefPromise,
    await includeProjectsCommandPromise,
    await includeProjectsValidatorPromise,
    await booksPresentPromise,
    await versificationPromise,
    await validCharactersPromise,
    await invalidCharactersPromise,
    await openCharactersInventoryPromise,
    await characterInventoryWebViewProviderPromise,
    await repeatableWordsPromise,
    await nonRepeatableWordsPromise,
    await openRepeatedWordsInventoryPromise,
    await repeatableWordsInventoryWebViewProviderPromise,
    await configureChecksPromise,
    await configureChecksWebViewProviderPromise,
    await showCheckResultsPromise,
    await showCheckResultsWebViewProviderPromise,
    checkHostingService.dispose,
    checkAggregatorService.dispose,
  );

  if (globalThis.isNoisyDevModeEnabled) {
    setTimeout(async () => {
      const checkSvc = checkAggregatorService.serviceObject;
      const checks = await checkSvc.getAvailableChecks(undefined);
      if (checks.length === 0) {
        logger.debug('Testing out checks: No checks registered');
        return;
      }
      const projectMetadata = await projectLookup.getMetadataForAllProjects();
      if (projectMetadata.length === 0) {
        logger.debug('Testing out checks: No projects available');
        return;
      }
      const projectId = projectMetadata[0].id;
      await Promise.all(
        checks.map(async (checkDetails) => {
          try {
            const problems = await checkSvc.enableCheck(checkDetails.checkId, projectId);
            logger.debug(
              `Testing out checks: enabled ${checkDetails.checkId} - ${JSON.stringify(problems)}`,
            );
          } catch (error) {
            logger.debug(`Testing out checks: threw enabling check: ${error}`);
          }
        }),
      );

      try {
        await checkSvc.setActiveRanges(undefined, [{ projectId, start: new VerseRef('JHN 1:1') }]);
        const results = await checkSvc.getCheckResults(undefined);
        logger.debug(`Testing out checks: results = ${JSON.stringify(results)}`);
      } catch (error) {
        logger.debug(`Error running checks: ${error}`);
      }
    }, 20000);
  }

  logger.info('platformScripture is finished activating!');
}

export async function deactivate() {
  logger.info('platformScripture is deactivating!');
  return true;
}
