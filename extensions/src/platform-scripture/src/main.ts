import papi, { logger } from '@papi/backend';
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
import characterInventoryWebView from './character-inventory.web-view?inline';

const characterInventoryWebViewType = 'platformScripture.characterInventory';

interface InventoryOptions extends GetWebViewOptions {
  projectId: string | undefined;
  // Add inventory/check type
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

// #endregion

async function openPlatformCharactersInventory(
  webViewId: string | undefined,
): Promise<string | undefined> {
  let projectId: string | undefined;
  if (webViewId) {
    const webViewDefinition = await papi.webViews.getSavedWebViewDefinition(webViewId);
    projectId = webViewDefinition?.projectId;
  }
  const projectIdForWebView =
    projectId ??
    (await papi.dialogs.selectProject({
      includeProjectInterfaces: 'ParatextStandard',
      title: 'Open Hello World Project Viewer',
      prompt: 'Please choose a project for which to open the viewer:',
    }));

  if (!projectIdForWebView) return undefined;

  if (projectId) {
    const options: InventoryOptions = { projectId };
    return papi.webViews.getWebView(
      characterInventoryWebViewType,
      { type: 'float', floatSize: { width: 775, height: 815 } },
      options,
    );
  }
  return undefined;
}

const inventoryWebViewProvider: IWebViewProvider = {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: InventoryOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== characterInventoryWebViewType)
      throw new Error(
        `${characterInventoryWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    // We know that the projectId (if present in the state) will be a string.
    const projectId =
      getWebViewOptions.projectId ||
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      (savedWebView.state?.projectId as string) ||
      undefined;
    const title = 'Character Inventory';

    return {
      title,
      ...savedWebView,
      content: characterInventoryWebView,
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

  const inventoryWebViewProviderPromise = papi.webViewProviders.register(
    characterInventoryWebViewType,
    inventoryWebViewProvider,
  );

  context.registrations.add(
    await scriptureExtenderPdpefPromise,
    await includeProjectsCommandPromise,
    await includeProjectsValidatorPromise,
    await booksPresentPromise,
    await versificationPromise,
    await validCharactersPromise,
    await invalidCharactersPromise,
    await openCharactersInventoryPromise,
    await inventoryWebViewProviderPromise,
  );

  logger.info('platformScripture is finished activating!');
}

export async function deactivate() {
  logger.info('platformScripture is deactivating!');
  return true;
}
