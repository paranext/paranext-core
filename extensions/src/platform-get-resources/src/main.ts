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
      // Checks to make sure all the `installed` flags are accurate
      let isChanged = false;
      const localProjectMetadata = await papi.projectLookup.getMetadataForAllProjects({
        includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
      });
      const newCachedResources = cachedResources.map((resource) => {
        const matchingLocalProject = localProjectMetadata.find((localProject) =>
          // If the `projectId` is defined then tries to use that
          resource.projectId
            ? resource.projectId === localProject.id
            : // Otherwise uses the `dblEntryUid` which contains the first part of the project id
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

  const isSendReceiveAvailableCommandPromise = papi.commands.registerCommand(
    'platformGetResources.isSendReceiveAvailable',
    async () => {
      let isSendReceiveAvailable: boolean = false;
      if (context.elevatedPrivileges.manageExtensions) {
        manageExtensions = context.elevatedPrivileges.manageExtensions;
        const installedExtensions = await manageExtensions.getInstalledExtensions();
        isSendReceiveAvailable = installedExtensions.packaged
          .concat(installedExtensions.enabled)
          .some((extension) => {
            return extension.extensionName === 'paratextBibleSendReceive';
          });
      }
      return isSendReceiveAvailable;
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
