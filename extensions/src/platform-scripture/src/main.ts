import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext, ProjectSettingValidator } from '@papi/core';
import { PlatformEventEmitter } from 'platform-bible-utils';
import { CheckResultsInvalidated } from 'platform-scripture';
import {
  ChecksSidePanelWebViewOptions,
  ChecksSidePanelWebViewProvider,
  checksSidePanelWebViewType,
} from './checks-side-panel.web-view-provider';
import {
  ChecklistWebViewOptions,
  ChecklistWebViewProvider,
  markersChecklistWebViewType,
} from './checklist.web-view-provider';
import { CHECKLIST_OPEN_SETTINGS_EVENT } from './checklist.model';
import { FindWebViewOptions, FindWebViewProvider, findWebViewType } from './find.web-view-provider';
import {
  checkAggregatorService,
  notifyCheckResultsInvalidated,
} from './checks/check-aggregator.service';
import { checkHostingService } from './checks/extension-host-check-runner.service';
import { InventoryWebViewOptions, InventoryWebViewProvider } from './inventory.web-view-provider';
import {
  MANAGE_BOOKS_WEB_VIEW_TYPE,
  ManageBooksWebViewOptions,
  ManageBooksWebViewProvider,
} from './manage-books.web-view-provider';
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
import { resourceReferenceListValidator } from './resource-reference-list.utils';

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

async function openMarkersChecklist(webViewId: string | undefined): Promise<string | undefined> {
  let projectId: string | undefined;

  if (webViewId) {
    const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(webViewId);
    projectId = webViewDefinition?.projectId;
  }

  const options: ChecklistWebViewOptions = { projectId };
  return papi.webViews.openWebView(
    markersChecklistWebViewType,
    { type: 'float', floatSize: { width: 1000, height: 700 } },
    options,
  );
}

/**
 * Network event emitter used by the tab-menu `Settings…` command to ask any mounted Markers
 * Checklist web view to open its Marker Settings dialog (UI-PKG-003 wiring). The web view
 * subscribes to this event via `papi.network.getNetworkEvent(CHECKLIST_OPEN_SETTINGS_EVENT)` and
 * flips its local `isSettingsOpen` state to `true` when it fires. See
 * `extensions/src/platform-scripture/src/checklist.model.ts` for the event contract.
 *
 * We keep this as a module-level lazy-initialized variable (rather than an eager top-level
 * constant) so the emitter registers during `activate` and is disposed deterministically via
 * `context.registrations`. The fallback `?? undefined` guard in the handler below makes the command
 * still succeed (no-op) if the emitter hasn't been initialized yet (e.g. in tests that stub out
 * activation).
 */
let openSettingsEventEmitter: PlatformEventEmitter<undefined> | undefined;

async function openMarkersChecklistSettings(): Promise<void> {
  if (!openSettingsEventEmitter) {
    logger.warn(
      'platformScripture.openMarkersChecklistSettings invoked before the event emitter was initialized — ignoring.',
    );
    return;
  }
  openSettingsEventEmitter.emit(undefined);
}

/**
 * FN-008 (2026-05-01): Open the unified Manage Books dialog as a tab web view. The optional
 * argument is either an editor's `webViewId` (from a scripture-editor menu) or a literal project id
 * — we probe with `papi.webViews.getOpenWebViewDefinition` and fall back to treating the value as a
 * project id when the probe returns `undefined`. When the caller provides no id (e.g. main-menu
 * invocation) the dialog opens with the project picker visible.
 */
async function openManageBooks(
  webViewIdOrProjectId: string | undefined,
): Promise<string | undefined> {
  let projectId: string | undefined;

  if (webViewIdOrProjectId) {
    // Try to resolve as a web view id first; if that fails treat the value
    // as a literal project id. The .d.ts parameter name is
    // `webViewIdOrProjectId?: string` to reflect both forms.
    try {
      const def = await papi.webViews.getOpenWebViewDefinition(webViewIdOrProjectId);
      projectId = def?.projectId ?? webViewIdOrProjectId;
    } catch {
      projectId = webViewIdOrProjectId;
    }
  }

  const options: ManageBooksWebViewOptions = { projectId };

  // Reuse the existing Manage Books tab if one is already open (per FN-003 — only one
  // Manage Books dialog at a time). `existingId: '?'` matches any open instance of this
  // web-view-type; if none is found we fall through and create a new one.
  //
  // Open as a floating panel rather than a docked tab so the user gets a
  // properly-sized window from the start. Mirrors the Settings pattern at
  // src/renderer/services/web-view.service-host.ts:1805. We keep the
  // existing-tab reuse path so an already-floating Manage Books window is
  // brought to the front instead of opening a new one.
  const floatingLayout = {
    type: 'float',
    position: 'center',
    floatSize: { width: 1100, height: 720 },
  } as const;
  const existingId = await papi.webViews.openWebView(MANAGE_BOOKS_WEB_VIEW_TYPE, floatingLayout, {
    ...options,
    existingId: '?',
    createNewIfNotFound: false,
  });
  if (existingId) {
    // Bring the existing tab to the front and update it with the new project context.
    await papi.webViews.reloadWebView(MANAGE_BOOKS_WEB_VIEW_TYPE, existingId, options);
    return existingId;
  }
  return papi.webViews.openWebView(MANAGE_BOOKS_WEB_VIEW_TYPE, floatingLayout, options);
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

export async function activate(context: ExecutionActivationContext) {
  logger.debug('platformScripture is activating!');

  // Register the Markers Checklist "open settings" network event emitter BEFORE the backing
  // command handler is exposed. The web-view subscribes to this event (via `useEvent`) and flips
  // its local `isSettingsOpen` state when it fires. The emitter is disposed through
  // `context.registrations` below so re-activation gets a fresh channel.
  openSettingsEventEmitter = await papi.network.createNetworkEventEmitterAsync(
    CHECKLIST_OPEN_SETTINGS_EVENT,
    {
      notification: {
        summary: 'Asks any mounted Markers Checklist web view to open its Marker Settings dialog.',
        params: [],
      },
    },
  );

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
  const markersChecklistWebViewProvider = new ChecklistWebViewProvider();
  const manageBooksWebViewProvider = new ManageBooksWebViewProvider();

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
  const modelTextsPromise = papi.projectSettings.registerValidator(
    'platformScripture.modelTexts',
    resourceReferenceListValidator,
  );
  const referencedProjectsAndResourcesPromise = papi.projectSettings.registerValidator(
    'platformScripture.referencedProjectsAndResources',
    resourceReferenceListValidator,
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

  const openMarkersChecklistPromise = papi.commands.registerCommand(
    'platformScripture.openMarkersChecklist',
    openMarkersChecklist,
    {
      method: {
        summary: 'Open the Markers Checklist tool',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary: 'The ID of the web view tied to the project that the checklist is for',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened markers checklist web view',
          schema: { type: 'string' },
        },
      },
    },
  );
  const openMarkersChecklistSettingsPromise = papi.commands.registerCommand(
    'platformScripture.openMarkersChecklistSettings',
    openMarkersChecklistSettings,
    {
      method: {
        summary: 'Open the Marker Settings dialog for the Markers Checklist',
        params: [],
        result: {
          name: 'return value',
          summary: 'Void',
          schema: { type: 'null' },
        },
      },
    },
  );
  const markersChecklistWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    markersChecklistWebViewType,
    markersChecklistWebViewProvider,
  );
  const openManageBooksPromise = papi.commands.registerCommand(
    'platformScripture.openManageBooks',
    openManageBooks,
    {
      method: {
        summary: 'Open the unified Manage Books dialog (FN-008)',
        params: [
          {
            name: 'projectIdOrWebViewId',
            required: false,
            summary:
              'Either the active editor web view id (resolves its project) or a literal project id; omit to open with the project picker visible.',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The id of the opened Manage Books web view',
          schema: { type: 'string' },
        },
      },
    },
  );
  const manageBooksWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    MANAGE_BOOKS_WEB_VIEW_TYPE,
    manageBooksWebViewProvider,
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
    await modelTextsPromise,
    await referencedProjectsAndResourcesPromise,
    await openPunctuationInventoryPromise,
    await punctuationInventoryWebViewProviderPromise,
    await showChecksSidePanelPromise,
    await showChecksSidePanelWebViewProviderPromise,
    await openMarkersChecklistPromise,
    await openMarkersChecklistSettingsPromise,
    await markersChecklistWebViewProviderPromise,
    openSettingsEventEmitter,
    await openFindPromise,
    await openFindWebViewProviderPromise,
    await openManageBooksPromise,
    await manageBooksWebViewProviderPromise,
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
