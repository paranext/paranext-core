import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext, ProjectSettingValidator, ScrollGroupScrRef } from '@papi/core';
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
import { FindHistoryDataProviderEngine } from './find/find-history.data-provider';
import {
  resolveFindInvocation,
  shouldReloadExistingFind,
  type FindTriggerWebViewDefinition,
} from './find/open-find.utils';
import {
  checkAggregatorService,
  notifyCheckResultsInvalidated,
} from './checks/check-aggregator.service';
import { checkHostingService } from './checks/extension-host-check-runner.service';
import { InventoryWebViewOptions, InventoryWebViewProvider } from './inventory.web-view-provider';
import {
  MANAGE_BOOKS_CREATE_INTENT_FLOAT_SIZE,
  resolveMissingBookId,
} from './manage-books-launch.utils';
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
import {
  recentlyOpenedProjectsService,
  RECENTLY_OPENED_PROJECTS_STORAGE_KEY,
} from './recently-opened-projects.service';
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

// C# converts Paratext's "T"/"F" to boolean before it reaches this validator
const structureProtectedValidator: ProjectSettingValidator<
  'platformScripture.structureProtected'
> = async (newValue: unknown) => typeof newValue === 'boolean';

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

// A tab identifier can be any string value (empty string means unset)
const sharedLayoutDefaultTabValidator: ProjectSettingValidator<
  'platformScripture.sharedLayoutDefaultTab'
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

  if (!projectId) {
    logger.debug('No project!');
    return undefined;
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
 * Serializes `openManageBooks` so two rapid invocations cannot both miss the existing-instance
 * probe and open two dialogs. FN-003 allows only one Manage Books dialog at a time, and the probe
 * below is an `await` with nothing holding the gap — a double-click, or a click on two editors'
 * buttons in quick succession, is enough. Each call chains onto the previous one's completion, so
 * the second call's probe runs after the first call's web view exists and finds it.
 */
let openManageBooksInFlight: Promise<string | undefined> = Promise.resolve(undefined);

/**
 * FN-008 (2026-05-01): Open the unified Manage Books dialog as a centered floating window. The
 * optional argument is either an editor's `webViewId` (from a scripture-editor menu) or a literal
 * project id — we probe with `papi.webViews.getOpenWebViewDefinition`, and if it doesn't resolve to
 * a web view with a project (it throws, finds nothing, or finds a web view with no project), we
 * fall back to treating the value as a literal project id. When the caller provides no id (e.g.
 * main-menu invocation) the dialog opens with the project picker visible.
 */
async function openManageBooks(
  webViewIdOrProjectId: string | undefined,
  intent?: 'createMissingBook',
): Promise<string | undefined> {
  // Chain onto whatever open is already running, ignoring its outcome (a failed open must not stop
  // the next one). `openManageBooksInFlight` is reassigned before the await so concurrent callers all
  // queue behind this call rather than behind the one it queued behind.
  const runAfter = openManageBooksInFlight.catch(() => undefined);
  const thisRun = runAfter.then(() => openManageBooksUnserialized(webViewIdOrProjectId, intent));
  openManageBooksInFlight = thisRun;
  return thisRun;
}

/** {@link openManageBooks}'s body. Do not call directly — it has no single-instance protection. */
async function openManageBooksUnserialized(
  webViewIdOrProjectId: string | undefined,
  intent?: 'createMissingBook',
): Promise<string | undefined> {
  let projectId: string | undefined;
  let scrollGroupScrRef: ScrollGroupScrRef | undefined;

  if (webViewIdOrProjectId) {
    // Try to resolve as a web view id first; if that fails treat the value
    // as a literal project id. The .d.ts parameter name is
    // `webViewIdOrProjectId?: string` to reflect both forms.
    try {
      const def = await papi.webViews.getOpenWebViewDefinition(webViewIdOrProjectId);
      projectId = def?.projectId ?? webViewIdOrProjectId;
      scrollGroupScrRef = def?.scrollGroupScrRef;
    } catch {
      projectId = webViewIdOrProjectId;
    }
  }

  const isCreateMissingBookLaunch = intent === 'createMissingBook' && !!projectId;

  const options: ManageBooksWebViewOptions = { projectId };

  // Only the intent is passed by the caller; the target book is derived from the calling editor's
  // scroll-group reference rather than plumbed through the command signature. The lookup is bounded
  // inside `resolveMissingBookId` (`papi.scrollGroups` can take up to 30s to resolve during a re-arm
  // window) so a click can never sit here long enough to read as "the button did nothing".
  if (isCreateMissingBookLaunch && projectId) {
    options.initialSection = 'create';
    const bookId = await resolveMissingBookId(
      scrollGroupScrRef,
      projectId,
      papi.scrollGroups.getScrRefForProject,
    );
    if (bookId) options.initialSelectedBooks = [bookId];
    else
      logger.debug(
        'openManageBooks: could not resolve a book to preselect for the createMissingBook intent; opening without one',
      );
  }

  // Keyed on the same condition as the launch parameters above, NOT on `intent` alone: without a
  // project there is no preselection and the dialog opens on its project picker, which needs the full
  // width. `openManageBooks(undefined, 'createMissingBook')` would otherwise get the narrow
  // create-focused window around a picker it cannot fit.
  const floatLayoutSize = isCreateMissingBookLaunch
    ? MANAGE_BOOKS_CREATE_INTENT_FLOAT_SIZE
    : { width: 1100, height: 720 };

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
    floatSize: floatLayoutSize,
  } as const;
  const existingId = await papi.webViews.openWebView(MANAGE_BOOKS_WEB_VIEW_TYPE, floatingLayout, {
    ...options,
    existingId: '?',
    createNewIfNotFound: false,
  });
  if (existingId) {
    // Bring the existing tab to the front and hand it the new launch parameters.
    //
    // Reloading DOES remount the dialog, which is what makes the launch parameters take effect
    // without any re-apply machinery: `reloadWebView` re-runs the provider's `getWebView`, and the
    // per-call `srcNonce = newNonce()` that gets interpolated into the generated `content`
    // (`web-view.service-host.ts`) makes `content` differ every time, so the `srcDoc` bound in
    // `web-view.component.tsx` changes and the iframe reloads. The dialog therefore reads the new
    // values in its ordinary mount-time initializers. There is a standing TODO on that nonce asking
    // whether it should be stable per web view; if it ever becomes stable, this path stops working
    // and the dialog will need an explicit re-apply signal.
    //
    // The cost of that remount is real and accepted: a relaunch discards the open dialog's transient
    // state — attached import files, filter text, presence filter, group-by, copy source, scroll
    // position. It is bounded by the fact that a relaunch is an explicit user action on a dialog they
    // are choosing to re-target.
    //
    // Unlike `openFind`, which reloads only when it has a `selectedText` to deliver, this reloads
    // unconditionally, because fronting the existing tab is itself part of what the caller asked for.
    //
    // The panel is deliberately NOT resized to the intent float size here — resizing a window the
    // user already placed is more surprising than leaving it.
    const reloadedId = await papi.webViews.reloadWebView(
      MANAGE_BOOKS_WEB_VIEW_TYPE,
      existingId,
      options,
    );
    // `reloadWebView` resolves undefined when the web view it was asked to reload is no longer there
    // (closed between the probe and here). Treating that as success would hand the caller an id for a
    // tab that does not exist, so fall through and open a fresh one.
    if (reloadedId) return reloadedId;
    logger.debug(
      `openManageBooks: web view ${existingId} was gone by the time it could be reloaded; opening a new one`,
    );
  }
  return papi.webViews.openWebView(MANAGE_BOOKS_WEB_VIEW_TYPE, floatingLayout, options);
}

async function openFind(
  editorWebViewId: string | undefined,
  selectedText?: string,
  sourceProjectId?: string,
): Promise<string | undefined> {
  logger.debug('Opening find UI');

  let webViewDefinition: FindTriggerWebViewDefinition | undefined;
  if (editorWebViewId) {
    webViewDefinition = await papi.webViews.getOpenWebViewDefinition(editorWebViewId);
  }

  const { projectId, editorScrollGroupId, tabIdFromWebViewId, editorWebViewIdForFind } =
    resolveFindInvocation(webViewDefinition, editorWebViewId, sourceProjectId);

  if (!projectId) {
    logger.debug('No project! Bringing any existing Find web view to the front as-is.');
    // Simple mode keeps Find as a permanent tab, so invoking Find must always land on that tab —
    // doing nothing would look like a dead shortcut with the tab sitting in plain view. Bring an
    // existing Find web view to the front without touching its project, and don't create one if
    // none exists: a Find with no project has nothing to search, so there is nothing to open.
    return papi.webViews.openWebView(findWebViewType, undefined, {
      existingId: '?',
      createNewIfNotFound: false,
      bringToFront: true,
    });
  }

  const options: FindWebViewOptions = {
    projectId,
    editorScrollGroupId,
    bringToFront: true,
    editorWebViewId: editorWebViewIdForFind,
    // A non-editor trigger has no controller to couple to, so tell the provider to drop whatever
    // editor id the panel is holding rather than leaving a stale one in place.
    clearEditorWebViewId: !editorWebViewIdForFind,
    initialSearchText: selectedText,
  };

  // First tries to open an existing find web view
  let findWebViewId = await papi.webViews.openWebView(
    findWebViewType,
    { type: 'panel', direction: 'right', targetTabId: tabIdFromWebViewId },
    { ...options, existingId: '?', createNewIfNotFound: false },
  );

  // If found an existing web view, reload it when the project differs, when the caller supplied a
  // new term to pre-fill (e.g. Ctrl+F with a selection the panel isn't already showing), or when the
  // editor coupling changed — reloading is the only way fresh options (initialSearchText, a cleared
  // editorWebViewId) reach an already-open panel. See shouldReloadExistingFind for why the
  // editor-coupling clause matters (stale-id hang) and why an unchanged term must not reload.
  if (findWebViewId) {
    const existingFindWebViewDefinition =
      await papi.webViews.getOpenWebViewDefinition(findWebViewId);
    if (
      shouldReloadExistingFind(
        existingFindWebViewDefinition,
        projectId,
        editorWebViewIdForFind,
        selectedText,
      )
    ) {
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
        // Experimental: this event is not yet a stable contract.
        'x-experimental': true,
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
  const structureProtectedPromise = papi.projectSettings.registerValidator(
    'platformScripture.structureProtected',
    structureProtectedValidator,
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
            summary:
              'The ID of the triggering web view; the project the inventory is for is resolved from it',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened characters inventory web view, or undefined if not opened',
          schema: { type: ['string', 'null'] },
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
            summary:
              'The ID of the triggering web view; the project the inventory is for is resolved from it',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary:
            'The ID of the opened repeated words inventory web view, or undefined if not opened',
          schema: { type: ['string', 'null'] },
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
            summary:
              'The ID of the triggering web view; the project the inventory is for is resolved from it',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened markers inventory web view, or undefined if not opened',
          schema: { type: ['string', 'null'] },
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
  const sharedLayoutDefaultTabPromise = papi.projectSettings.registerValidator(
    'platformScripture.sharedLayoutDefaultTab',
    sharedLayoutDefaultTabValidator,
  );
  const openPunctuationInventoryPromise = papi.commands.registerCommand(
    'platformScripture.openPunctuationInventory',
    openPlatformPunctuationInventory,
    {
      method: {
        summary: 'Open the punctuation inventory',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary:
              'The ID of the triggering web view; the project the inventory is for is resolved from it',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary:
            'The ID of the opened punctuation inventory web view, or undefined if not opened',
          schema: { type: ['string', 'null'] },
        },
      },
    },
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
            name: 'editorWebViewId',
            required: false,
            summary:
              'The ID of the editor web view the checks side panel is opened for; the project and scroll group are resolved from it',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened checks side panel web view, or undefined if not opened',
          schema: { type: ['string', 'null'] },
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
        // Experimental: this command's contract is not yet stable.
        'x-experimental': true,
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
          summary: 'The ID of the opened markers checklist web view, or undefined if not opened',
          schema: { type: ['string', 'null'] },
        },
      },
    },
  );
  const openMarkersChecklistSettingsPromise = papi.commands.registerCommand(
    'platformScripture.openMarkersChecklistSettings',
    openMarkersChecklistSettings,
    {
      method: {
        // Experimental: this command's contract is not yet stable.
        'x-experimental': true,
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
    undefined,
    // Experimental: the Markers Checklist web view and its options are not yet a stable contract.
    { 'x-experimental': true },
  );
  const openManageBooksPromise = papi.commands.registerCommand(
    'platformScripture.openManageBooks',
    openManageBooks,
    {
      method: {
        // Experimental: this command's contract is not yet stable.
        'x-experimental': true,
        summary: 'Open the unified Manage Books dialog (FN-008)',
        params: [
          {
            name: 'webViewIdOrProjectId',
            required: false,
            summary:
              'Either the active editor web view id (resolves its project) or a literal project id; omit to open with the project picker visible.',
            schema: { type: 'string' },
          },
          {
            name: 'intent',
            required: false,
            summary:
              "Pass 'createMissingBook' to open on the Create-books section with the calling editor's current book pre-selected; omit for the default view.",
            schema: { type: 'string', enum: ['createMissingBook'] },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened Manage Books web view, or undefined if not opened',
          schema: { type: ['string', 'null'] },
        },
      },
    },
  );
  const manageBooksWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    MANAGE_BOOKS_WEB_VIEW_TYPE,
    manageBooksWebViewProvider,
    undefined,
    // Experimental: the Manage Books web view and its options are not yet a stable contract.
    { 'x-experimental': true },
  );

  const openFindPromise = papi.commands.registerCommand('platformScripture.openFind', openFind, {
    method: {
      summary: 'Open the find UI',
      params: [
        {
          name: 'editorWebViewId',
          required: false,
          summary:
            'The ID of the triggering editor web view; the project to search in is resolved from it',
          schema: { type: 'string' },
        },
        {
          name: 'selectedText',
          required: false,
          summary: 'Text to pre-fill in the search field and immediately search for',
          schema: { type: 'string' },
        },
        {
          name: 'sourceProjectId',
          required: false,
          summary:
            "Explicit project/resource id to search, overriding the project resolved from the triggering web view. Used when the triggering tab displays a resource whose id differs from the tab's own project (model text, Bible texts, commentaries panels).",
          schema: { type: 'string' },
        },
      ],
      result: {
        name: 'return value',
        summary: 'The ID of the find web view, or undefined if not opened',
        schema: { type: ['string', 'null'] },
      },
    },
  });
  const openFindWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    findWebViewType,
    findWebViewProvider,
  );

  const findHistoryDataProviderPromise = papi.dataProviders.registerEngine(
    'platformScripture.findHistory',
    new FindHistoryDataProviderEngine({
      readUserData: (key) => papi.storage.readUserData(context.executionToken, key),
      writeUserData: (key, value) => papi.storage.writeUserData(context.executionToken, key, value),
    }),
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

  async function readRawRecentlyOpenedProjects(): Promise<string> {
    try {
      return await papi.storage.readUserData(
        context.executionToken,
        RECENTLY_OPENED_PROJECTS_STORAGE_KEY,
      );
    } catch {
      // No data yet — treat as empty list.
      return '[]';
    }
  }
  function writeRawRecentlyOpenedProjects(data: string): Promise<void> {
    return papi.storage.writeUserData(
      context.executionToken,
      RECENTLY_OPENED_PROJECTS_STORAGE_KEY,
      data,
    );
  }
  await recentlyOpenedProjectsService.initialize(
    readRawRecentlyOpenedProjects,
    writeRawRecentlyOpenedProjects,
  );

  context.registrations.add(
    await scriptureExtenderPdpefPromise,
    await scriptureFinderPdpefPromise,
    await booksPresentPromise,
    await versificationPromise,
    await structureProtectedPromise,
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
    await sharedLayoutDefaultTabPromise,
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
    await findHistoryDataProviderPromise,
    await openManageBooksPromise,
    await manageBooksWebViewProviderPromise,
    await invalidateResultsPromise,
    checkHostingService.dispose,
    checkAggregatorService.dispose,
    recentlyOpenedProjectsService.dispose,
  );

  logger.debug('platformScripture is finished activating!');
}

export async function deactivate() {
  logger.debug('platformScripture is deactivating!');
  return true;
}
