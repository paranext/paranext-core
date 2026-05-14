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
import { isString } from 'platform-bible-utils';
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

let executionToken!: ExecutionToken;
let cachedResources: DblResourceData[] | undefined;
let isFetching = false;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function startBackgroundFetchResources(): Promise<void> {
  if (isFetching) return;
  isFetching = true;

  try {
    for (let attempt = 0; attempt < 10; attempt++) {
      if (attempt > 0) await sleep(1000); // eslint-disable-line no-await-in-loop

      try {
        // Need to have these await statements inside the look to retry 10 times
        // eslint-disable-next-line no-await-in-loop
        const provider = await papi.dataProviders.get('platformGetResources.dblResourcesProvider');
        if (!provider) continue;

        if (!(await provider.isGetDblResourcesAvailable())) return; // eslint-disable-line no-await-in-loop

        const resources = await provider.getDblResources(undefined); // eslint-disable-line no-await-in-loop
        cachedResources = resources;
        // eslint-disable-next-line no-await-in-loop
        await papi.storage.writeUserData(
          executionToken,
          RESOURCES_CACHE_KEY,
          JSON.stringify(cachedResources),
        );
        return;
      } catch (e) {
        logger.debug(`Background resource fetch attempt ${attempt + 1} failed: ${e}`);
      }
    }
    logger.warn('Background DBL resources fetch failed after 10 attempts');
  } finally {
    isFetching = false;
  }
}

async function getCachedResources(): Promise<DblResourceData[] | undefined> {
  if (cachedResources !== undefined) return cachedResources;

  if (isFetching) {
    while (isFetching) await sleep(100); // eslint-disable-line no-await-in-loop
    if (cachedResources !== undefined) return cachedResources;
    // Fall through to on-demand fetch if background fetch finished with nothing
  }

  isFetching = true;
  try {
    const provider = await papi.dataProviders.get('platformGetResources.dblResourcesProvider');
    if (!provider) return undefined;

    if (!(await provider.isGetDblResourcesAvailable())) return undefined;

    const resources = await provider.getDblResources(undefined);
    cachedResources = resources;
    await papi.storage.writeUserData(
      executionToken,
      RESOURCES_CACHE_KEY,
      JSON.stringify(cachedResources),
    );
    return cachedResources;
  } catch (e) {
    logger.warn(`getCachedResources on-demand fetch failed: ${e}`);
    return undefined;
  } finally {
    isFetching = false;
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
    if (typeof cached === 'string' && cached.length > 0)
      cachedResources = JSON.parse(cached) as DblResourceData[];
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
      let webViewId;
      const resources = await getCachedResources();
      if (resources === undefined) {
        await papi.notifications.send({
          message: '%resources_fetch_failed%',
          severity: 'warning',
          clickCommandLabel: '%resources_retry%',
          clickCommand: 'platformGetResources.openGetResources',
          duration: 0,
        });
      } else {
        webViewId = await papi.webViews.openWebView(
          GET_RESOURCES_WEB_VIEW_TYPE,
          {
            type: 'float',
            floatSize: GET_RESOURCES_WEB_VIEW_SIZE,
          },
          // Focus existing one if one exists
          { existingId: '?' },
        );
      }

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

  logger.debug('Platform Get Resources Extension finished activating!');
}

export async function deactivate() {
  logger.debug('Platform Get Resources Extension is deactivating!');
  return true;
}
