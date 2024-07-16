import papi, { logger, projectLookup } from '@papi/backend';
import { VerseRef } from '@sillsdev/scripture';
import {
  ExecutionActivationContext,
  GetWebViewOptions,
  IWebViewProvider,
  ProjectSettingValidator,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import ScriptureExtenderProjectDataProviderEngineFactory, {
  SCRIPTURE_EXTENDER_PDPF_ID,
} from './project-data-provider/platform-scripture-extender-pdpef.model';
import { SCRIPTURE_EXTENDER_PROJECT_INTERFACES } from './project-data-provider/platform-scripture-extender-pdpe.model';
import checkHostingService from './checks/extension-host-check-runner.service';
import checkAggregatorService from './checks/check-aggregator.service';
import characterInventoryWebView from './character-inventory.web-view?inline';
import repeatedWordsInventoryWebView from './repeated-words-inventory.web-view?inline';

const characterInventoryWebViewType = 'platformScripture.characterInventory';
const repeatedWordsInventoryWebViewType = 'platformScripture.repeatedWordsInventory';

interface InventoryOptions extends GetWebViewOptions {
  title: string;
  projectId: string | undefined;
  webView: string;
  webViewType: string | undefined;
}

// #region Project Setting Validators

// Should be 123 characters long
const booksPresentValidator: ProjectSettingValidator<'platformScripture.booksPresent'> = async (
  newValue: string,
): Promise<boolean> => {
  return newValue.length === 123 && newValue.replace(/[01]/g, '').length === 0;
};

// There are 7 options in the enum
const versificationValidator: ProjectSettingValidator<'platformScripture.versification'> = async (
  newValue: number,
): Promise<boolean> => {
  return (
    typeof newValue === 'number' && newValue >= 0 && newValue <= 6 && Number.isInteger(newValue)
  );
};

const charactersValidator: ProjectSettingValidator<
  'platformScripture.validCharacters' | 'platformScripture.invalidCharacters'
> = async (newValue) => {
  return typeof newValue === 'string';
};

const repeatableWordsValidator: ProjectSettingValidator<
  'platformScripture.repeatableWords' | 'platformScripture.nonRepeatableWords'
> = async (newValue) => {
  return typeof newValue === 'string';
};

// #endregion

async function openPlatformCharactersInventory(
  webViewId: string | undefined,
): Promise<string | undefined> {
  const title: string = 'Character Inventory';
  return openInventory(title, webViewId, characterInventoryWebView, characterInventoryWebViewType);
}

async function openPlatformRepeatedWordsInventory(
  webViewId: string | undefined,
): Promise<string | undefined> {
  const title: string = 'Repeated Words Inventory';
  return openInventory(
    title,
    webViewId,
    repeatedWordsInventoryWebView,
    repeatedWordsInventoryWebViewType,
  );
}

async function openInventory(
  title: string,
  webViewId: string | undefined,
  webView: string,
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

  const options: InventoryOptions = { title, projectId, webView, webViewType };
  return papi.webViews.getWebView(webViewType, { type: 'float' }, options);
}

const inventoryWebViewProvider: IWebViewProvider = {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: InventoryOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== getWebViewOptions.webViewType)
      throw new Error(
        `${getWebViewOptions.webViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    // We know that the projectId (if present in the state) will be a string.
    const projectId =
      getWebViewOptions.projectId ||
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      (savedWebView.state?.projectId as string) ||
      undefined;

    const title = getWebViewOptions.title || undefined;

    return {
      title,
      ...savedWebView,
      content: getWebViewOptions.webView,
      state: {
        ...savedWebView.state,
        projectId,
      },
    };
  },
};

export async function activate(context: ExecutionActivationContext) {
  logger.info('platformScripture is activating!');

  const scriptureExtenderPdpefPromise =
    papi.projectDataProviders.registerProjectDataProviderEngineFactory(
      SCRIPTURE_EXTENDER_PDPF_ID,
      SCRIPTURE_EXTENDER_PROJECT_INTERFACES,
      new ScriptureExtenderProjectDataProviderEngineFactory(SCRIPTURE_EXTENDER_PDPF_ID),
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
    inventoryWebViewProvider,
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
    inventoryWebViewProvider,
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
