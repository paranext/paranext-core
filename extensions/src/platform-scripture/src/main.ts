import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext, ProjectSettingValidator } from '@papi/core';
import { CheckResultsInvalidated } from 'platform-scripture';
import {
  ChecksSidePanelWebViewOptions,
  ChecksSidePanelWebViewProvider,
  checksSidePanelWebViewType,
} from './checks-side-panel.web-view-provider';
import { FindWebViewOptions, FindWebViewProvider, findWebViewType } from './find.web-view-provider';
import {
  checkAggregatorService,
  notifyCheckResultsInvalidated,
} from './checks/check-aggregator.service';
import { checkHostingService } from './checks/extension-host-check-runner.service';
import { InventoryWebViewOptions, InventoryWebViewProvider } from './inventory.web-view-provider';
import {
  ProjectPropertiesWebViewOptions,
  ProjectPropertiesWebViewProvider,
  PROJECT_PROPERTIES_WEB_VIEW_TYPE,
} from './project-properties.web-view-provider';
import {
  InterlinearSetupWebViewOptions,
  InterlinearSetupWebViewProvider,
  interlinearSetupWebViewType,
} from './interlinear-setup.web-view-provider';
import {
  RestoreProjectWebViewOptions,
  RestoreProjectWebViewProvider,
  RESTORE_PROJECT_WEB_VIEW_TYPE,
} from './restore-project.web-view-provider';
import { SCRIPTURE_EXTENDER_PROJECT_INTERFACES } from './project-data-provider/platform-scripture-extender-pdpe.model';
import {
  SCRIPTURE_EXTENDER_PDPF_ID,
  ScriptureExtenderProjectDataProviderEngineFactory,
} from './project-data-provider/platform-scripture-extender-pdpef.model';
import {
  SCRIPTURE_FINDER_PDPF_ID,
  ScriptureFinderProjectDataProviderEngineFactory,
} from './project-data-provider/platform-scripture-finder.pdpef.model';
import { SCRIPTURE_FINDER_PROJECT_INTERFACES } from './project-data-provider/platform-scripture-finder-pdpe.model';

const characterInventoryWebViewType = 'platformScripture.characterInventory';
const repeatedWordsInventoryWebViewType = 'platformScripture.repeatedWordsInventory';
const markersInventoryWebViewType = 'platformScripture.markersInventory';
const punctuationInventoryWebViewType = 'platformScripture.punctuationInventory';

// #region Project Setting Validators

// Should be 123 characters long
const booksPresentValidator: ProjectSettingValidator<'platformScripture.booksPresent'> = async (
  newValue,
) => newValue.length === 123 && newValue.replace(/[01]/g, '').length === 0;

// There are 7 options in the enum
const versificationValidator: ProjectSettingValidator<'platformScripture.versification'> = async (
  newValue: unknown,
) => {
  // Settings UI might send over numbers as strings
  if (typeof newValue !== 'number' && typeof newValue !== 'string') return false;
  // Only convert 1 character strings to numbers to avoid saving garbage values like "NaN" and "1."
  if (typeof newValue === 'string' && newValue.length > 1) return false;
  const valueAsNumber = Number(newValue);
  return valueAsNumber >= 0 && valueAsNumber <= 6 && Number.isInteger(valueAsNumber);
};

// A character can be any string value
const charactersValidator: ProjectSettingValidator<
  'platformScripture.validCharacters' | 'platformScripture.invalidCharacters'
> = async (newValue) => typeof newValue === 'string';

// A word can be any string value
const repeatableWordsValidator: ProjectSettingValidator<
  'platformScripture.repeatableWords' | 'platformScripture.nonRepeatableWords'
> = async (newValue) => typeof newValue === 'string';

// A marker can be any string value
const markersValidator: ProjectSettingValidator<
  'platformScripture.validMarkers' | 'platformScripture.invalidMarkers'
> = async (newValue) => typeof newValue === 'string';

// A marker can be any string value
const punctuationValidator: ProjectSettingValidator<
  'platformScripture.validPunctuation' | 'platformScripture.invalidPunctuation'
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

async function openPlatformMarkersInventory(
  webViewId: string | undefined,
): Promise<string | undefined> {
  return openInventory(webViewId, markersInventoryWebViewType);
}

async function openPlatformPunctuationInventory(
  webViewId: string | undefined,
): Promise<string | undefined> {
  return openInventory(webViewId, punctuationInventoryWebViewType);
}

async function openInventory(
  webViewId: string | undefined,
  webViewType: string,
): Promise<string | undefined> {
  let projectId: string | undefined;

  if (webViewId) {
    const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(webViewId);
    projectId = webViewDefinition?.projectId;
  }

  if (!projectId) {
    return undefined;
  }

  const options: InventoryWebViewOptions = { projectId };
  return papi.webViews.openWebView(
    webViewType,
    { type: 'float', floatSize: { width: 700, height: 800 } },
    options,
  );
}

async function openChecksSidePanel(
  editorWebViewId: string | undefined,
): Promise<string | undefined> {
  let projectId: ChecksSidePanelWebViewOptions['projectId'];
  let tabIdFromWebViewId: string | undefined;
  let editorScrollGroupId: ChecksSidePanelWebViewOptions['editorScrollGroupId'];

  logger.debug('Opening checks side panel');

  if (editorWebViewId) {
    const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(editorWebViewId);
    projectId = webViewDefinition?.projectId;
    tabIdFromWebViewId = webViewDefinition?.id;
    editorScrollGroupId = webViewDefinition?.scrollGroupScrRef;
  }

  if (!projectId) {
    logger.debug('No project!');
    return undefined;
  }

  const options: ChecksSidePanelWebViewOptions = {
    projectId,
    editorScrollGroupId,
    editorWebViewId,
  };
  const sidePanelWebViewId = await papi.webViews.openWebView(
    checksSidePanelWebViewType,
    { type: 'panel', direction: 'right', targetTabId: tabIdFromWebViewId },
    options,
  );

  return sidePanelWebViewId;
}

async function openFind(editorWebViewId: string | undefined): Promise<string | undefined> {
  let projectId: FindWebViewOptions['projectId'];
  let tabIdFromWebViewId: string | undefined;
  let editorScrollGroupId: FindWebViewOptions['editorScrollGroupId'];

  logger.debug('Opening find UI');

  if (editorWebViewId) {
    const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(editorWebViewId);
    projectId = webViewDefinition?.projectId;
    tabIdFromWebViewId = webViewDefinition?.id;
    editorScrollGroupId = webViewDefinition?.scrollGroupScrRef;
  }

  if (!projectId) {
    logger.debug('No project!');
    return undefined;
  }

  const options: FindWebViewOptions = {
    projectId,
    editorScrollGroupId,
    bringToFront: true,
    editorWebViewId,
  };

  // First tries to open an existing find web view
  let findWebViewId = await papi.webViews.openWebView(
    findWebViewType,
    { type: 'panel', direction: 'right', targetTabId: tabIdFromWebViewId },
    { ...options, existingId: '?', createNewIfNotFound: false },
  );

  // If found an existing web view, then reloads it only if the project definition is different
  if (findWebViewId) {
    const existingFindWebViewDefinition =
      await papi.webViews.getOpenWebViewDefinition(findWebViewId);
    // If the existing web view has a project id different to the current one, then prompts a reload
    if (existingFindWebViewDefinition?.projectId !== projectId) {
      await papi.webViews.reloadWebView(findWebViewType, findWebViewId, options);
    }
  } else {
    // Otherwise, opens a new web view
    findWebViewId = await papi.webViews.openWebView(
      findWebViewType,
      { type: 'panel', direction: 'right', targetTabId: tabIdFromWebViewId },
      options,
    );
  }

  return findWebViewId;
}

async function openNewProject(): Promise<string | undefined> {
  const options: ProjectPropertiesWebViewOptions = { mode: 'create' };
  return papi.webViews.openWebView(
    PROJECT_PROPERTIES_WEB_VIEW_TYPE,
    { type: 'float', floatSize: { width: 700, height: 800 } },
    options,
  );
}

async function openRestoreProject(): Promise<string | undefined> {
  const options: RestoreProjectWebViewOptions = {};
  return papi.webViews.openWebView(
    RESTORE_PROJECT_WEB_VIEW_TYPE,
    { type: 'float', floatSize: { width: 900, height: 700 } },
    options,
  );
}

async function openInterlinearSetup(projectId?: string): Promise<string | undefined> {
  if (!projectId) {
    logger.debug('No project ID provided for interlinear setup');
    return undefined;
  }

  const options: InterlinearSetupWebViewOptions = { projectId };
  return papi.webViews.openWebView(
    interlinearSetupWebViewType,
    { type: 'float', floatSize: { width: 700, height: 600 } },
    options,
  );
}

export async function activate(context: ExecutionActivationContext) {
  logger.debug('platformScripture is activating!');

  const scriptureExtenderPdpefPromise =
    papi.projectDataProviders.registerProjectDataProviderEngineFactory(
      SCRIPTURE_EXTENDER_PDPF_ID,
      SCRIPTURE_EXTENDER_PROJECT_INTERFACES,
      new ScriptureExtenderProjectDataProviderEngineFactory(SCRIPTURE_EXTENDER_PDPF_ID),
    );

  const scriptureFinderPdpefPromise =
    papi.projectDataProviders.registerProjectDataProviderEngineFactory(
      SCRIPTURE_FINDER_PDPF_ID,
      SCRIPTURE_FINDER_PROJECT_INTERFACES,
      new ScriptureFinderProjectDataProviderEngineFactory(SCRIPTURE_FINDER_PDPF_ID),
    );

  const characterInventoryWebViewProvider = new InventoryWebViewProvider(
    '%webView_characterInventory_title%',
    characterInventoryWebViewType,
  );
  const repeatedWordsInventoryWebViewProvider = new InventoryWebViewProvider(
    '%webView_repeatedWordsInventory_title%',
    repeatedWordsInventoryWebViewType,
  );
  const markersInventoryWebViewProvider = new InventoryWebViewProvider(
    '%webView_markersInventory_title%',
    markersInventoryWebViewType,
  );
  const punctuationInventoryWebViewProvider = new InventoryWebViewProvider(
    '%webView_punctuationInventory_title%',
    punctuationInventoryWebViewType,
  );
  const checksSidePanelWebViewProvider = new ChecksSidePanelWebViewProvider();
  const findWebViewProvider = new FindWebViewProvider();
  const projectPropertiesWebViewProvider = new ProjectPropertiesWebViewProvider();
  const interlinearSetupWebViewProvider = new InterlinearSetupWebViewProvider();
  const restoreProjectWebViewProvider = new RestoreProjectWebViewProvider();

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
    {
      method: {
        summary: 'Open the characters inventory',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary: 'The ID of the web view tied to the project that the inventory is for',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened characters inventory web view',
          schema: { type: 'string' },
        },
      },
    },
  );
  const characterInventoryWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
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
    {
      method: {
        summary: 'Open the repeated words inventory',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary: 'The ID of the web view tied to the project that the inventory is for',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened repeated words inventory web view',
          schema: { type: 'string' },
        },
      },
    },
  );
  const repeatableWordsInventoryWebViewProviderPromise =
    papi.webViewProviders.registerWebViewProvider(
      repeatedWordsInventoryWebViewType,
      repeatedWordsInventoryWebViewProvider,
    );
  const validMarkersPromise = papi.projectSettings.registerValidator(
    'platformScripture.validMarkers',
    markersValidator,
  );
  const invalidMarkersPromise = papi.projectSettings.registerValidator(
    'platformScripture.invalidMarkers',
    markersValidator,
  );
  const openMarkersInventoryPromise = papi.commands.registerCommand(
    'platformScripture.openMarkersInventory',
    openPlatformMarkersInventory,
    {
      method: {
        summary: 'Open the markers inventory',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary: 'The ID of the web view tied to the project that the inventory is for',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the new open markers inventory web view',
          schema: { type: 'string' },
        },
      },
    },
  );
  const markersInventoryWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    markersInventoryWebViewType,
    markersInventoryWebViewProvider,
  );
  const validPunctuationPromise = papi.projectSettings.registerValidator(
    'platformScripture.validPunctuation',
    punctuationValidator,
  );
  const invalidPunctuationPromise = papi.projectSettings.registerValidator(
    'platformScripture.invalidPunctuation',
    punctuationValidator,
  );
  const openPunctuationInventoryPromise = papi.commands.registerCommand(
    'platformScripture.openPunctuationInventory',
    openPlatformPunctuationInventory,
  );
  const punctuationInventoryWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    punctuationInventoryWebViewType,
    punctuationInventoryWebViewProvider,
  );
  const showChecksSidePanelPromise = papi.commands.registerCommand(
    'platformScripture.openChecksSidePanel',
    openChecksSidePanel,
    {
      method: {
        summary: 'Open the checks side panel',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary: 'The ID of the web view tied to the project that the checks are for',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the new checks side panel web view',
          schema: { type: 'string' },
        },
      },
    },
  );
  const showChecksSidePanelWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    checksSidePanelWebViewType,
    checksSidePanelWebViewProvider,
  );

  const openFindPromise = papi.commands.registerCommand('platformScripture.openFind', openFind, {
    method: {
      summary: 'Open the find UI',
      params: [
        {
          name: 'webViewId',
          required: false,
          summary: 'The ID of the web view tied to the project that we are searching in',
          schema: { type: 'string' },
        },
      ],
      result: {
        name: 'return value',
        summary: 'The ID of the new find web view',
        schema: { type: 'string' },
      },
    },
  });
  const openFindWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    findWebViewType,
    findWebViewProvider,
  );

  // Project creation web view providers
  const projectPropertiesWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    PROJECT_PROPERTIES_WEB_VIEW_TYPE,
    projectPropertiesWebViewProvider,
  );
  const interlinearSetupWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    interlinearSetupWebViewType,
    interlinearSetupWebViewProvider,
  );
  const restoreProjectWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    RESTORE_PROJECT_WEB_VIEW_TYPE,
    restoreProjectWebViewProvider,
  );

  const invalidateResultsPromise = papi.commands.registerCommand(
    'platformScripture.invalidateCheckResults',
    async (details: CheckResultsInvalidated) => {
      notifyCheckResultsInvalidated(details);
    },
    {
      method: {
        summary: 'Invalidate check results for a specific check',
        params: [
          {
            name: 'details',
            required: true,
            summary:
              'Details about which check results have been invalidated and should be refreshed',
            schema: { type: 'object' },
            description: 'See CheckResultsInvalidated in the platformScripture API',
          },
        ],
        result: {
          name: 'return value',
          summary: 'Void',
          schema: { type: 'null' },
        },
      },
    },
  );

  // Project creation commands
  const openNewProjectPromise = papi.commands.registerCommand(
    'platformScripture.openNewProject',
    openNewProject,
    {
      method: {
        summary: 'Open the New Project dialog to create a new scripture project',
        params: [],
        result: {
          name: 'return value',
          summary: 'The ID of the opened Project Properties web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  const openRestoreProjectPromise = papi.commands.registerCommand(
    'platformScripture.openRestoreProject',
    openRestoreProject,
    {
      method: {
        summary: 'Open the Restore Project dialog to restore from backup',
        params: [],
        result: {
          name: 'return value',
          summary: 'The ID of the opened Restore Project web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  const openInterlinearSetupPromise = papi.commands.registerCommand(
    'platformScripture.openInterlinearSetup',
    openInterlinearSetup,
    {
      method: {
        summary: 'Open the Interlinear Setup dialog to configure interlinear tasks',
        params: [
          {
            name: 'projectId',
            required: false,
            summary: 'The project ID to configure interlinear tasks for',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened Interlinear Setup web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  await checkHostingService.initialize();
  await checkAggregatorService.initialize();

  context.registrations.add(
    await scriptureExtenderPdpefPromise,
    await scriptureFinderPdpefPromise,
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
    await validMarkersPromise,
    await invalidMarkersPromise,
    await openMarkersInventoryPromise,
    await markersInventoryWebViewProviderPromise,
    await validPunctuationPromise,
    await invalidPunctuationPromise,
    await openPunctuationInventoryPromise,
    await punctuationInventoryWebViewProviderPromise,
    await showChecksSidePanelPromise,
    await showChecksSidePanelWebViewProviderPromise,
    await openFindPromise,
    await openFindWebViewProviderPromise,
    await invalidateResultsPromise,
    await projectPropertiesWebViewProviderPromise,
    await interlinearSetupWebViewProviderPromise,
    await restoreProjectWebViewProviderPromise,
    await openNewProjectPromise,
    await openRestoreProjectPromise,
    await openInterlinearSetupPromise,
    checkHostingService.dispose,
    checkAggregatorService.dispose,
  );

  logger.debug('platformScripture is finished activating!');
}

export async function deactivate() {
  logger.debug('platformScripture is deactivating!');
  return true;
}
