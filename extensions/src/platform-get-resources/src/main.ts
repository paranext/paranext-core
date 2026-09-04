import papi, { logger } from '@papi/backend';
import {
  ExecutionActivationContext,
  ExecutionToken,
  IWebViewProvider,
  ManageExtensions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import type { DblResourceData } from 'platform-bible-utils';
import {
  getErrorMessage,
  isString,
  Mutex,
  retryUntil,
  waitForDuration,
} from 'platform-bible-utils';
import { buildLocalNonDblResources } from './get-local-non-dbl-resources.utils';
import getResourcesDialogReact from './get-resources.web-view?inline';
import homeDialogReact from './home.web-view?inline';
import { reconcileInstalledFlags } from './installed-flags.util';
import newTabReact from './new-tab.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

const GET_RESOURCES_WEB_VIEW_TYPE = 'platformGetResources.getResources';
const HOME_WEB_VIEW_TYPE = 'platformGetResources.home';
const NEW_TAB_WEB_VIEW_TYPE = 'platformGetResources.newTab';

const GET_RESOURCES_WEB_VIEW_SIZE = { width: 900, height: 650 };
const HOME_WEB_VIEW_SIZE = { width: 1000, height: 650 };

const RESOURCES_CACHE_KEY = 'cachedDblResources';
const RESOURCES_REFRESH_INTERVAL_MS = 12 * 60 * 60 * 1000;

let executionToken: ExecutionToken | undefined;
let cachedResources: DblResourceData[] | undefined;
const fetchMutex = new Mutex();
let hasFetchStarted = false;
let syncInFlight: Promise<void> | undefined;

async function fetchAndCacheResources(): Promise<DblResourceData[] | undefined> {
  const provider = await papi.dataProviders.get('platformGetResources.dblResourcesProvider');
  if (!provider) return undefined;

  if (!(await provider.isGetDblResourcesAvailable())) return undefined;

  const resources = await provider.getDblResources(undefined);
  if (resources) {
    cachedResources = resources;
    if (executionToken)
      await papi.storage.writeUserData(
        executionToken,
        RESOURCES_CACHE_KEY,
        JSON.stringify(cachedResources),
      );
  }
  return resources;
}

async function startBackgroundFetchResources(): Promise<void> {
  if (hasFetchStarted) return;
  hasFetchStarted = true;
  await fetchMutex.runExclusive(async () => {
    const result = await retryUntil(
      async (attemptNumber) => {
        try {
          return await fetchAndCacheResources();
        } catch (e) {
          logger.debug(`Background resource fetch attempt ${attemptNumber} failed: ${e}`);
          return undefined;
        }
      },
      (resources) => resources !== undefined,
      { maxAttempts: 10, delayMs: 1000 },
    );
    if (result === undefined)
      logger.warn('Background DBL resources fetch failed after 10 attempts');
  });
}

/**
 * Whether any C# resource project has been seen this session. The Paratext PDPF registers its
 * projects after activation, and a metadata read that resolves first sees none — indistinguishable
 * from a machine that genuinely has no read-only projects. Remembering the answer lets the retry
 * below run when it can still discover something and stay out of the way afterwards.
 */
let haveLocalResourceProjectsAppeared = false;
/** Whether the full wait below has already been spent without any resource project appearing. */
let hasWaitedForLocalResourceProjects = false;

const RESOURCE_PROJECT_WAIT_ATTEMPTS = 5;
const RESOURCE_PROJECT_WAIT_DELAY_MS = 500;

/**
 * Reads local project metadata, waiting for the C# Paratext PDPF to register its resource projects.
 *
 * The wait is what makes read-only projects visible: a read that resolves before the factory
 * registers returns only the TypeScript PDPFs, and a caller that trusts it concludes the machine
 * has no resources at all. It is spent at most once per session — once a resource project has been
 * seen the factory is up and no wait is needed, and if the full budget passes with none seen the
 * machine has none to find, so later calls return the first read immediately.
 *
 * @returns The project metadata
 */
async function getLocalProjectMetadata(): Promise<
  Awaited<ReturnType<typeof papi.projectLookup.getMetadataForAllProjects>>
> {
  const readMetadata = () =>
    papi.projectLookup.getMetadataForAllProjects({ includeProjectInterfaces: ['platform.base'] });
  const hasResourceProject = (
    metadata: Awaited<ReturnType<typeof papi.projectLookup.getMetadataForAllProjects>>,
  ) => metadata.some((m) => m.isEditable === false);

  const shouldWait = !haveLocalResourceProjectsAppeared && !hasWaitedForLocalResourceProjects;
  const metadata = shouldWait
    ? await retryUntil(readMetadata, hasResourceProject, {
        maxAttempts: RESOURCE_PROJECT_WAIT_ATTEMPTS,
        delayMs: RESOURCE_PROJECT_WAIT_DELAY_MS,
      })
    : await readMetadata();

  const hasResourceProjects = hasResourceProject(metadata);
  if (hasResourceProjects) haveLocalResourceProjectsAppeared = true;
  else if (shouldWait) hasWaitedForLocalResourceProjects = true;

  return metadata;
}

/**
 * Syncs installed flags on `cachedResources` against the install status reported by C#. Runs in the
 * background so it never blocks a dialog open. Updates `cachedResources` and writes to storage when
 * flags change.
 *
 * The status has to come from the backend rather than being inferred from the local project list: a
 * resource project's id is unrelated to the DBL entry it was installed from (the entry uid lives in
 * the project's settings), so there is nothing in the metadata to match a catalog row against.
 */
async function syncInstalledFlags(): Promise<void> {
  if (cachedResources === undefined) return;
  try {
    const provider = await papi.dataProviders.get('platformGetResources.dblResourcesProvider');
    const installStatus = await provider?.recomputeDblResourcesInstallStatus();
    // An empty status means the backend could not answer — its catalog has not loaded yet, or
    // another DBL operation holds its gate. Syncing against it would mark every installed resource
    // not-installed and persist that, so leave the flags alone until it can.
    if (!installStatus || Object.keys(installStatus).length === 0) return;

    // Wrap the read-modify-write in fetchMutex so a concurrent fetchAndCacheResources call cannot
    // overwrite cachedResources between our map() and our assignment.
    await fetchMutex.runExclusive(async () => {
      if (cachedResources === undefined) return;

      const { resources: newCachedResources, isChanged } = reconcileInstalledFlags(
        cachedResources,
        installStatus,
      );

      if (isChanged) {
        cachedResources = newCachedResources;
        if (executionToken)
          await papi.storage.writeUserData(
            executionToken,
            RESOURCES_CACHE_KEY,
            JSON.stringify(cachedResources),
          );
      }
    });
  } catch (error: unknown) {
    logger.warn(`Error syncing installed flags: ${getErrorMessage(error)}`);
  }
}

/**
 * How long {@link refreshInstalledFlags} waits for a sync before giving up on it. The sync queues
 * behind `fetchMutex`, which a catalog fetch holds for an unbounded network download, so the wait
 * has to be capped to stay well inside the JSON-RPC request timeout.
 */
const INSTALLED_FLAGS_SYNC_WAIT_MS = 5000;

/**
 * Brings the cached `installed` flags up to date, for a caller that just installed or uninstalled a
 * resource and needs the next read of the catalog to reflect it.
 *
 * `getCachedResources` answers from the cache and corrects it in the background, which is right for
 * opening a dialog and wrong right after an install: the caller would get the flags from before its
 * own install and, having asked only once, would never see them change.
 *
 * Resolves either when the sync finishes or when the wait above expires, whichever comes first; on
 * expiry the sync still completes in the background, so the flags are correct by the next read.
 */
async function refreshInstalledFlags(): Promise<void> {
  if (cachedResources === undefined) return;

  // Deliberately not `ensureInstalledFlagsSynced`: a sync already in flight started before the
  // caller's install and would answer without it. Overlapping syncs are safe — they derive the same
  // flags from the same backend and serialize on `fetchMutex` to write them.
  await waitForDuration(syncInstalledFlags, INSTALLED_FLAGS_SYNC_WAIT_MS);
}

/**
 * Starts the installed-flag sync if one is not already running, and returns the promise for it.
 * Callers that only need the catalog let it run in the background; callers whose answer depends on
 * the flags being current await it and re-read `cachedResources` afterwards.
 */
function ensureInstalledFlagsSynced(): Promise<void> {
  if (!syncInFlight) {
    syncInFlight = syncInstalledFlags()
      .catch((e) => logger.warn(`Background installed-flag sync failed: ${getErrorMessage(e)}`))
      .finally(() => {
        syncInFlight = undefined;
      });
  }
  return syncInFlight;
}

async function getCachedResources(): Promise<DblResourceData[] | undefined> {
  if (cachedResources !== undefined) {
    // Answer from the cache and correct it in the background so opening a dialog never waits on
    // the provider call or on `fetchMutex` behind a catalog fetch. A caller that needs the flags to
    // include a change it just made calls `refreshInstalledFlags` first.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ensureInstalledFlagsSynced();
    return cachedResources;
  }

  return fetchMutex.runExclusive(async () => {
    if (cachedResources !== undefined) return cachedResources;
    try {
      return await fetchAndCacheResources();
    } catch (e) {
      logger.warn(`getCachedResources on-demand fetch failed: ${e}`);
      return undefined;
    }
  });
}

/**
 * Returns locally-installed, read-only resources that are NOT in the DBL catalog — e.g. VULGP83,
 * TNN, TND, HBK. Useful for populating the Resource Picker's INSTALLED section with resources that
 * were installed outside the DBL download flow.
 *
 * Convention: each synthetic entry uses `dblEntryUid === projectId` to mark it as non-DBL so that
 * callers (e.g. `selectTextConnection`) can create a `ProjectReference` instead of a
 * `DblResourceReference` when the user selects one.
 */
async function getLocalNonDblResources(): Promise<DblResourceData[]> {
  try {
    await getCachedResources();
    // The exclusion below is only as good as the catalog's `installed`/`projectId` flags, and
    // `getCachedResources` returns before its background sync finishes. Wait for that sync and read
    // `cachedResources` afterwards, so a resource already on disk is excluded as a DBL entry rather
    // than emitted a second time as a synthetic non-DBL one.
    await ensureInstalledFlagsSynced();
    // An absent catalog means one has never been fetched on this profile (a fetched catalog is
    // persisted and reloaded on activation), so there is nothing for these projects to duplicate
    // and no reason to withhold them. Suppressing them here would hide side-loaded resources from
    // exactly the offline, never-connected users most likely to have them.
    const dblCatalog = cachedResources ?? [];

    const allMetadata = await getLocalProjectMetadata();
    return buildLocalNonDblResources(allMetadata, dblCatalog);
  } catch (error: unknown) {
    logger.warn(`Error getting local non-DBL resources: ${getErrorMessage(error)}`);
    return [];
  }
}

let manageExtensions: ManageExtensions;

const getResourcesWebViewProvider: IWebViewProvider = {
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== GET_RESOURCES_WEB_VIEW_TYPE)
      throw new Error(
        `${GET_RESOURCES_WEB_VIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    return {
      title: '%resources_dialog_title%',
      ...savedWebView,
      content: getResourcesDialogReact,
      styles: tailwindStyles,
    };
  },
};

const homeWebViewProvider: IWebViewProvider = {
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== HOME_WEB_VIEW_TYPE)
      throw new Error(
        `${HOME_WEB_VIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    return {
      title: '%home_dialog_title%',
      ...savedWebView,
      content: homeDialogReact,
      styles: tailwindStyles,
    };
  },
};

const newTabWebViewProvider: IWebViewProvider = {
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== NEW_TAB_WEB_VIEW_TYPE)
      throw new Error(
        `${NEW_TAB_WEB_VIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    return {
      title: '%new_tab_dialog_title%',
      ...savedWebView,
      content: newTabReact,
      styles: tailwindStyles,
    };
  },
};

export async function activate(context: ExecutionActivationContext) {
  logger.debug('Platform Get Resources Extension is activating!');

  executionToken = context.executionToken;

  try {
    const cached = await papi.storage.readUserData(executionToken, RESOURCES_CACHE_KEY);
    if (typeof cached === 'string' && cached.length > 0) {
      const parsed: DblResourceData[] = JSON.parse(cached);
      cachedResources = parsed;
    }
  } catch {
    // No cached data from previous session
  }

  // #region Validate settings

  const excludePdpFactoryIdsInHomeValidatorPromise = papi.settings.registerValidator(
    'platformGetResources.excludePdpFactoryIdsInHome',
    async (newExcludeIdsList) => {
      if (!Array.isArray(newExcludeIdsList)) throw new Error('Must be an array');
      if (newExcludeIdsList.some((id) => !isString(id)))
        throw new Error('Array must only contain strings');
      return true;
    },
  );

  // #endregion

  const getResourcesWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    GET_RESOURCES_WEB_VIEW_TYPE,
    getResourcesWebViewProvider,
  );

  const homeWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    HOME_WEB_VIEW_TYPE,
    homeWebViewProvider,
  );

  const newTabWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    NEW_TAB_WEB_VIEW_TYPE,
    newTabWebViewProvider,
  );

  const openGetResourcesWebViewCommandPromise = papi.commands.registerCommand(
    'platformGetResources.openGetResources',
    async () => {
      const webViewId = await papi.webViews.openWebView(
        GET_RESOURCES_WEB_VIEW_TYPE,
        {
          type: 'float',
          floatSize: GET_RESOURCES_WEB_VIEW_SIZE,
        },
        // Focus existing one if one exists
        { existingId: '?' },
      );

      return webViewId;
    },
  );

  const openHomeWebViewCommandPromise = papi.commands.registerCommand(
    'platformGetResources.openHome',
    async () => {
      return papi.webViews.openWebView(
        HOME_WEB_VIEW_TYPE,
        {
          type: 'float',
          floatSize: HOME_WEB_VIEW_SIZE,
        },
        // Focus existing one if one exists
        { existingId: '?' },
      );
    },
  );

  /** Function to prompt for a project and open it in the editor */
  async function openNewTab(tabGroupId?: string): Promise<string | undefined> {
    // Handle float case too
    return papi.webViews.openWebView(NEW_TAB_WEB_VIEW_TYPE, {
      type: 'tab',
      parentTabGroupId: tabGroupId,
    });
  }

  const openNewTabWebViewCommandPromise = papi.commands.registerCommand(
    'platformGetResources.openNewTab',
    openNewTab,
    {
      method: {
        summary: 'Open a new tab web view',
        params: [
          {
            name: 'tabGroupId',
            required: false,
            summary: 'The ID of the tab group to attach the web view to',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  const getCachedResourcesCommandPromise = papi.commands.registerCommand(
    'platformGetResources.getCachedResources',
    getCachedResources,
  );

  const refreshInstalledFlagsCommandPromise = papi.commands.registerCommand(
    'platformGetResources.refreshInstalledFlags',
    refreshInstalledFlags,
  );

  const getLocalNonDblResourcesCommandPromise = papi.commands.registerCommand(
    'platformGetResources.getLocalNonDblResources',
    getLocalNonDblResources,
  );

  const isSendReceiveAvailableCommandPromise = papi.commands.registerCommand(
    'platformGetResources.isSendReceiveAvailable',
    async () => {
      if (!context.elevatedPrivileges.manageExtensions) {
        // `undefined`, not `false`: without the privilege there is nothing to check, so answering
        // `false` would report "send/receive isn't in this build" on no evidence — and callers hide
        // send/receive UI for the session on a `false`. `undefined` says "couldn't determine",
        // which callers treat as unknown and fail open on.
        logger.warn(
          'platformGetResources cannot check whether send/receive is available without the manageExtensions privilege; reporting unknown',
        );
        return undefined;
      }

      manageExtensions = context.elevatedPrivileges.manageExtensions;
      const installedExtensions = await manageExtensions.getInstalledExtensions();
      return installedExtensions.packaged.concat(installedExtensions.enabled).some((extension) => {
        return extension.extensionName === 'paratextBibleSendReceive';
      });
    },
  );

  context.registrations.add(
    await excludePdpFactoryIdsInHomeValidatorPromise,
    await getResourcesWebViewProviderPromise,
    await homeWebViewProviderPromise,
    await newTabWebViewProviderPromise,
    await openGetResourcesWebViewCommandPromise,
    await openHomeWebViewCommandPromise,
    await openNewTabWebViewCommandPromise,
    await getCachedResourcesCommandPromise,
    await refreshInstalledFlagsCommandPromise,
    await getLocalNonDblResourcesCommandPromise,
    await isSendReceiveAvailableCommandPromise,
  );

  // Need to start async floating promise that continues after activation
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  startBackgroundFetchResources();

  const refreshIntervalId = setInterval(() => {
    // The mutex returns a floating promise here; we want fire-and-forget interval behavior
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchMutex.runExclusive(async () => {
      try {
        await fetchAndCacheResources();
      } catch (e) {
        logger.warn(`Scheduled resource refresh failed: ${e}`);
      }
    });
  }, RESOURCES_REFRESH_INTERVAL_MS);
  context.registrations.add({
    dispose: async () => {
      clearInterval(refreshIntervalId);
      return true;
    },
  });

  logger.debug('Platform Get Resources Extension finished activating!');
}

export async function deactivate() {
  logger.debug('Platform Get Resources Extension is deactivating!');
  return true;
}
