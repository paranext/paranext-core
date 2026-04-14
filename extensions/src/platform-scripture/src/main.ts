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

const FIND_HISTORY_STORAGE_KEY = 'findRecentSearches';
const FIND_LAST_SEARCH_TERM_STORAGE_KEY = 'findLastSearchTerm';

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

async function openFind(
  editorWebViewId: string | undefined,
  selectedText?: string,
): Promise<string | undefined> {
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
    initialSearchText: selectedText || undefined,
  };

  // First tries to open an existing find web view
  let findWebViewId = await papi.webViews.openWebView(
    findWebViewType,
    { type: 'panel', direction: 'right', targetTabId: tabIdFromWebViewId },
    { ...options, existingId: '?', createNewIfNotFound: false },
  );

  // If found an existing web view, then reloads it if the project is different or if there is
  // selected text to pre-fill that differs from the current search term (so the find panel picks
  // up the new search term without unnecessary reloads)
  if (findWebViewId) {
    const existingFindWebViewDefinition =
      await papi.webViews.getOpenWebViewDefinition(findWebViewId);
    const existingSearchTerm = existingFindWebViewDefinition?.state?.findSearchTerm;
    const searchTermChanged =
      options.initialSearchText && options.initialSearchText !== existingSearchTerm;
    if (existingFindWebViewDefinition?.projectId !== projectId || searchTermChanged) {
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
  const getFindHistoryPromise = papi.commands.registerCommand(
    'platformScripture.getFindHistory',
    async (projectId?: string): Promise<string[]> => {
      const key = FIND_HISTORY_STORAGE_KEY + (projectId ? `_${projectId}` : '');
      try {
        const stored = await papi.storage.readUserData(context.executionToken, key);
        if (!stored) return [];
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string'))
          return parsed;
      } catch {
        // Return empty array on any error
      }
      return [];
    },
  );
  const setFindHistoryPromise = papi.commands.registerCommand(
    'platformScripture.setFindHistory',
    async (history: string[], projectId?: string): Promise<void> => {
      const key = FIND_HISTORY_STORAGE_KEY + (projectId ? `_${projectId}` : '');
      try {
        await papi.storage.writeUserData(context.executionToken, key, JSON.stringify(history));
      } catch {
        // Ignore storage write errors (e.g. concurrent access when panel closes and reopens)
      }
    },
  );
  const getFindLastSearchTermPromise = papi.commands.registerCommand(
    'platformScripture.getFindLastSearchTerm',
    async (projectId?: string): Promise<string> => {
      const key = FIND_LAST_SEARCH_TERM_STORAGE_KEY + (projectId ? `_${projectId}` : '');
      try {
        const stored = await papi.storage.readUserData(context.executionToken, key);
        return stored ?? '';
      } catch {
        return '';
      }
    },
  );
  const setFindLastSearchTermPromise = papi.commands.registerCommand(
    'platformScripture.setFindLastSearchTerm',
    async (term: string, projectId?: string): Promise<void> => {
      const key = FIND_LAST_SEARCH_TERM_STORAGE_KEY + (projectId ? `_${projectId}` : '');
      await papi.storage.writeUserData(context.executionToken, key, term);
    },
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
        {
          name: 'selectedText',
          required: false,
          summary: 'Text to pre-fill in the search field and immediately search for',
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
    await getFindHistoryPromise,
    await setFindHistoryPromise,
    await getFindLastSearchTermPromise,
    await setFindLastSearchTermPromise,
    await openPunctuationInventoryPromise,
    await punctuationInventoryWebViewProviderPromise,
    await showChecksSidePanelPromise,
    await showChecksSidePanelWebViewProviderPromise,
    await openFindPromise,
    await openFindWebViewProviderPromise,
    await invalidateResultsPromise,
    checkHostingService.dispose,
    checkAggregatorService.dispose,
  );

  logger.debug('platformScripture is finished activating!');
}

export async function deactivate() {
  logger.debug('platformScripture is deactivating!');
  return true;
}
