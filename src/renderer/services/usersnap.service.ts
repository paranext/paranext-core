import { appService } from '@shared/services/app.service';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { loadSpace, type InitOptions, type SpaceApi } from '@usersnap/browser';

/**
 * These API keys are unique IDs that can be used to interact with our feedback forms on Usersnap. A
 * Project key relates to a specific form can be shown, and the user can submit their feedback
 * through it. Note that these keys can be used only to SUBMIT reports to our Usersnap Projects, and
 * not to RETRIEVE any information related to them.
 *
 * The Space is the container that holds these Projects.
 */
export const USERSNAP_PROJECT_REPORT_ISSUE_API_KEY: string = '68df6b26-c519-4829-8d07-2201d31fac9d';
export const USERSNAP_PROJECT_SUBMIT_IDEA_API_KEY: string = 'bd3bc542-1f0c-40e4-85f7-315f5138ea88';
export const USERSNAP_SPACE_API_KEY: string = '1cf2709b-3ff0-4cff-8952-a2d2bca7590d';

/** Global UserSnap API instance service */

let globalUsersnapApi: SpaceApi | undefined;
let isUsersnapFormOpen = false;
let apiKeyOfOpenForm: string | undefined;

/** Initializes the global UserSnap API instance */
export async function initializeUsersnapApi() {
  const defaultInitParams: InitOptions = {
    enableScreenshot: true,
    collectGeoLocation: 'none',
    useSystemFonts: true,
    useLocalStorage: true,
  };

  const startTime = performance.now();
  const api = await loadSpace(USERSNAP_SPACE_API_KEY);
  await api.init(defaultInitParams);
  const endTime = performance.now();
  logger.info(`UserSnap initialized successfully in ${endTime - startTime}ms`);

  let customData = {};

  const setCustomData = async (shouldIncludeLog: boolean) => {
    const appName = (await appService.getAppInfo()).name;
    let logContent: string = '';
    if (shouldIncludeLog) logContent = await sendCommand('platform.getLogFileContent');
    customData = {
      App: appName,
      Environment: globalThis.isPackaged ? 'Production' : 'Development',
    };
    if (logContent) customData = { Log: logContent, ...customData };
  };

  api.on('open', (event) => {
    const shouldIncludeLog = event.apiKey === USERSNAP_PROJECT_REPORT_ISSUE_API_KEY;
    setCustomData(shouldIncludeLog);

    isUsersnapFormOpen = true;
    apiKeyOfOpenForm = event.apiKey;
  });
  api.on('beforeSubmit', async (event) => {
    event.api.setValue('custom', customData);
  });
  api.on('close', () => {
    isUsersnapFormOpen = false;
    apiKeyOfOpenForm = undefined;
  });

  globalUsersnapApi = api;
}

/**
 * Gets the current UserSnap API instance
 *
 * @returns The UserSnap API instance or undefined if not initialized
 */
export function getUsersnapApi(): SpaceApi | undefined {
  return globalUsersnapApi;
}

export async function openUsersnapForm(apiKey: string) {
  if (globalUsersnapApi) {
    try {
      const widgetApi = await globalUsersnapApi.show(apiKey);
      await widgetApi.open();
    } catch (error) {
      logger.warn(`Failed to open Usersnap widget: ${error}`);
    }
  }
}

/** Closes open UserSnap form */
export async function closeOpenUsersnapForm() {
  if (globalUsersnapApi && apiKeyOfOpenForm) {
    try {
      // We need to call the 'show' function to get the widgetApi
      const widgetApi = await globalUsersnapApi.show(apiKeyOfOpenForm);
      widgetApi.close();
    } catch (error) {
      logger.warn(`Failed to close Usersnap forms: ${error}`);
    }
  }
}

/**
 * Checks if a UserSnap form is currently open
 *
 * @returns True if a UserSnap form is currently open, false otherwise
 */
export function isUsersnapFormCurrentlyOpen(): boolean {
  return isUsersnapFormOpen;
}
