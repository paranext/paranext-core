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
import { getErrorMessage, isString, Mutex, wait } from 'platform-bible-utils';
import { buildLocalNonDblResources } from './get-local-non-dbl-resources.utils';
import getResourcesDialogReact from './get-resources.web-view?inline';
import homeDialogReact from './home.web-view?inline';
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
    for (let attempt = 0; attempt < 10; attempt++) {
      // Sequential retry delay requires awaiting inside the loop
      // eslint-disable-next-line no-await-in-loop
      if (attempt > 0) await wait(1000);

      try {
        // Need to have these await statements inside the loop to retry 10 times
        // eslint-disable-next-line no-await-in-loop
        const result = await fetchAndCacheResources();
        if (result !== undefined) return;
      } catch (e) {
        logger.debug(`Background resource fetch attempt ${attempt + 1} failed: ${e}`);
      }
    }
    logger.warn('Background DBL resources fetch failed after 10 attempts');
  });
}

/**
 * Syncs installed flags on `cachedResources` against live project metadata from C#. Runs in the
 * background so it never blocks a dialog open. Updates `cachedResources` and writes to storage when
 * flags change.
 *
 * Waits for the C# Paratext PDPF to register resource projects before syncing — without this retry,
 * a call that resolves before the factory finishes would see no isEditable=false projects and
 * incorrectly mark installed resources as not-installed.
 */
async function syncInstalledFlags(): Promise<void> {
  if (cachedResources === undefined) return;
  try {
    let localProjectMetadata = await papi.projectLookup.getMetadataForAllProjects({
      includeProjectInterfaces: ['platform.base'],
    });
    const MAX_RETRIES = 5;
    for (
      let attempt = 0;
      attempt < MAX_RETRIES && !localProjectMetadata.some((m) => m.isEditable === false);
      attempt++
    ) {
      // Sequential retry: each attempt must wait for the previous result before retrying.
      // eslint-disable-next-line no-await-in-loop
      await wait(500);
      // Sequential retry: each attempt must use the result of the previous fetch.
      // eslint-disable-next-line no-await-in-loop
      localProjectMetadata = await papi.projectLookup.getMetadataForAllProjects({
        includeProjectInterfaces: ['platform.base'],
      });
    }
    // If the retry loop exhausted without finding any isEditable=false project, C# hasn't
    // registered yet. Skip the sync entirely — syncing against an empty project list would
    // incorrectly mark all installed resources as not-installed and corrupt the cache.
    if (!localProjectMetadata.some((m) => m.isEditable === false)) return;

    // Re-check cachedResources after the await — fetchAndCacheResources may have updated it
    if (cachedResources === undefined) return;

    let isChanged = false;
    const newCachedResources = cachedResources.map((resource) => {
      const matchingLocalProject = localProjectMetadata.find((localProject) =>
        // If the `projectId` is defined then tries to use that
        resource.projectId
          ? resource.projectId === localProject.id
          : // Otherwise uses the `dblEntryUid` which contains the first part of the project id.
            // Guard against empty dblEntryUid: ''.startsWith('') is true for every string.
            resource.dblEntryUid !== '' &&
            localProject.id.toLowerCase().startsWith(resource.dblEntryUid.toLowerCase()),
      );

      const isInstalled = matchingLocalProject !== undefined;
      if (isInstalled !== resource.installed) {
        isChanged = true;
        return {
          ...resource,
          installed: isInstalled,
          updateAvailable: false,
          projectId: matchingLocalProject?.id ?? '',
        };
      }

      return resource;
    });

    if (isChanged) {
      cachedResources = newCachedResources;
      if (executionToken)
        await papi.storage.writeUserData(
          executionToken,
          RESOURCES_CACHE_KEY,
          JSON.stringify(cachedResources),
        );
    }
  } catch (error: unknown) {
    logger.warn(`Error syncing installed flags: ${getErrorMessage(error)}`);
  }
}

async function getCachedResources(): Promise<DblResourceData[] | undefined> {
  if (cachedResources !== undefined) {
    // Run the installed-flag sync in the background so the dialog open is never blocked by
    // getMetadataForAllProjects retries (which can exceed the 30-second JSON-RPC timeout when
    // the C# PDPF is still initializing). The next dialog open picks up the updated flags.
    // The in-flight guard prevents concurrent calls from spawning duplicate syncs.
    if (!syncInFlight) {
      syncInFlight = syncInstalledFlags()
        .catch((e) => logger.warn(`Background installed-flag sync failed: ${getErrorMessage(e)}`))
        .finally(() => {
          syncInFlight = undefined;
        });
    }
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
    // Ensure the DBL catalog is loaded before filtering. Reading `cachedResources` directly risks
    // an empty list during startup, which would let DBL-catalog resources slip through the exclusion
    // filter and appear as duplicates in the picker alongside their catalog entry.
    const dblCatalog = await getCachedResources();
    // Return early rather than passing an empty exclusion list — if the catalog is unavailable
    // (offline / C# not yet ready), every read-only project would appear as a non-DBL resource,
    // creating duplicates alongside their real catalog entries once the catalog loads.
    if (!dblCatalog) return [];

    // Retry until at least one isEditable=false project appears — mirrors the reasoning in
    // fetchDownloadedResources (frontend): a call that resolves before the C# Paratext factory has
    // registered returns only TypeScript-only PDPFs and misses all C# resource projects. Capped at
    // 2 attempts (1 s total) to stay well under the 30-second JSON-RPC timeout; if C# still hasn't
    // registered after 1 s, return an empty list rather than risk a timeout.
    let allMetadata = await papi.projectLookup.getMetadataForAllProjects({
      includeProjectInterfaces: ['platform.base'],
    });
    const MAX_RETRIES = 2;
    for (
      let attempt = 0;
      attempt < MAX_RETRIES && !allMetadata.some((m) => m.isEditable === false);
      attempt++
    ) {
      // Sequential retry: each attempt must wait for the previous result before retrying.
      // eslint-disable-next-line no-await-in-loop
      await wait(500);
      // Sequential retry: each attempt must use the result of the previous fetch.
      // eslint-disable-next-line no-await-in-loop
      allMetadata = await papi.projectLookup.getMetadataForAllProjects({
        includeProjectInterfaces: ['platform.base'],
      });
    }

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
