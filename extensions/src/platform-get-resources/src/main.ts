import papi, { logger } from '@papi/backend';
import {
  ExecutionActivationContext,
  ExecutionToken,
  IWebViewProvider,
  ManageExtensions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import type { DblResourceData, ResourceType } from 'platform-bible-utils';
import { getErrorMessage, isString, Mutex, wait } from 'platform-bible-utils';
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

async function getCachedResources(): Promise<DblResourceData[] | undefined> {
  if (cachedResources !== undefined) {
    try {
      // Checks to make sure all the `installed` flags are accurate.
      // Filter to `platform.base` rather than `platformScripture.USJ_Chapter` so that
      // locally-installed resources that don't implement USJ (e.g. VULGP83, TNN, TND, HBK)
      // are found and their installed flags are correctly set to true.
      let isChanged = false;
      const localProjectMetadata = await papi.projectLookup.getMetadataForAllProjects({
        includeProjectInterfaces: ['platform.base'],
      });
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

      // If a change was detected updates the cache
      if (isChanged) {
        cachedResources = newCachedResources;
        // Writes the updated cached resources to user data
        if (executionToken)
          await papi.storage.writeUserData(
            executionToken,
            RESOURCES_CACHE_KEY,
            JSON.stringify(cachedResources),
          );
      }
    } catch (error: unknown) {
      logger.warn(`Error getting cached resources: ${getErrorMessage(error)}`);
    }

    return cachedResources;
  }

  return fetchMutex.runExclusive(async () => {
    if (cachedResources !== undefined) return cachedResources;
    try {
      return fetchAndCacheResources();
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
    // Retry until at least one isEditable=false project appears — mirrors the reasoning in
    // fetchDownloadedResources (frontend): a call that resolves before the C# Paratext factory has
    // registered returns only TypeScript-only PDPFs and misses all C# resource projects. Capping
    // at 5 attempts (each with a 500 ms back-off) avoids blocking forever during tests or when the
    // data provider is genuinely absent.
    let allMetadata = await papi.projectLookup.getMetadataForAllProjects({
      includeProjectInterfaces: ['platform.base'],
    });
    const MAX_RETRIES = 5;
    for (
      let attempt = 0;
      attempt < MAX_RETRIES && !allMetadata.some((m) => m.isEditable === false);
      attempt++
    ) {
      // eslint-disable-next-line no-await-in-loop
      await wait(500);
      // eslint-disable-next-line no-await-in-loop
      allMetadata = await papi.projectLookup.getMetadataForAllProjects({
        includeProjectInterfaces: ['platform.base'],
      });
    }

    logger.warn(
      `getLocalNonDblResources: ${allMetadata.length} total projects, ` +
        `${allMetadata.filter((m) => m.isEditable === false).length} with isEditable=false`,
    );

    // Exclude any resource whose project ID matches a DBL catalog entry (by exact projectId or by
    // the startsWith(dblEntryUid) convention Paratext uses when naming project directories).
    const dblEntries = cachedResources ?? [];
    const nonDblMetadata = allMetadata.filter((m) => {
      if (m.isEditable !== false) return false;
      const matchingDblEntry = dblEntries.find(
        (r) =>
          (r.projectId !== '' && r.projectId === m.id) ||
          // Guard against empty dblEntryUid: ''.startsWith('') is true for every string
          (r.dblEntryUid !== '' && m.id.toLowerCase().startsWith(r.dblEntryUid.toLowerCase())),
      );
      if (matchingDblEntry) {
        logger.warn(
          `getLocalNonDblResources: excluding ${m.id} — matched DBL entry uid="${matchingDblEntry.dblEntryUid}" projectId="${matchingDblEntry.projectId}" (${matchingDblEntry.projectId !== '' && matchingDblEntry.projectId === m.id ? 'exact projectId' : 'startsWith uid'})`,
        );
        return false;
      }
      return true;
    });

    logger.warn(
      `getLocalNonDblResources: ${nonDblMetadata.length} non-DBL resources (${dblEntries.length} DBL entries checked): ${nonDblMetadata.map((m) => m.id).join(', ')}`,
    );

    // Use name/fullName/language from the project metadata directly — the C# factory populates
    // these at enumeration time (same values as the platform.name/fullName/language settings),
    // so no per-project PDP call is needed.
    return nonDblMetadata.map(
      (m): DblResourceData => ({
        // Convention: dblEntryUid === projectId marks this as a non-DBL synthetic entry.
        // selectTextConnection detects this and creates a ProjectReference instead of a
        // DblResourceReference so the resource is resolvable without a catalog entry.
        dblEntryUid: m.id,
        displayName: m.name ?? m.id,
        fullName: m.fullName ?? m.name ?? m.id,
        bestLanguageName: m.language ?? '',
        type: 'ScriptureResource' as ResourceType,
        size: 0,
        installed: true,
        updateAvailable: false,
        projectId: m.id,
      }),
    );
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
