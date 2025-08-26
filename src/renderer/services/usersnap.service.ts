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

/**
 * MutationObserver to detect when Usersnap elements are added to the DOM This will attempt to find
 * and style Usersnap shadow DOMs
 */
let usersnapDomObserver: MutationObserver | undefined;

/** Searches for Usersnap shadow DOM elements and applies custom styles */
function findAndStyleUsersnapShadowRoots(): void {
  try {
    const allElements = document.querySelectorAll('*');
    allElements.forEach((element) => {
      if (element.shadowRoot) {
        const closeButton = element.shadowRoot.querySelector<HTMLButtonElement>(
          'button[title="Close annotation"]',
        );

        if (!closeButton) return;

        if (apiKeyOfOpenForm === USERSNAP_PROJECT_SUBMIT_IDEA_API_KEY) {
          closeButton.style.top = 'unset';
          closeButton.style.right = '22ch';
          closeButton.style.height = '54px';
          closeButton.style.bottom = '0';
        } else if (apiKeyOfOpenForm === USERSNAP_PROJECT_REPORT_ISSUE_API_KEY) {
          closeButton.remove();

          const collapseButton = element.shadowRoot.querySelector<HTMLButtonElement>(
            'button[aria-label="Collapse form"]',
          );

          if (!(collapseButton instanceof HTMLButtonElement)) return;

          const newCloseButton = collapseButton.cloneNode(true);

          if (!(newCloseButton instanceof HTMLButtonElement)) return;

          collapseButton.style.right = '36px';

          newCloseButton.setAttribute('aria-label', 'Close feedback form');
          newCloseButton.innerHTML = '✕';
          newCloseButton.style.display = 'flex';
          newCloseButton.style.alignItems = 'center';
          newCloseButton.style.justifyContent = 'center';
          newCloseButton.style.color = '#FFFFFF99';
          newCloseButton.style.fontSize = '.8rem';
          newCloseButton.addEventListener('click', async () => {
            await closeOpenUsersnapForm();
          });

          collapseButton.parentNode?.insertBefore(newCloseButton, collapseButton.nextSibling);
        }
      }
    });
  } catch (error) {
    logger.debug('Failed to search for Usersnap close button in shadow roots:', error);
  }
}

/** Sets up the Usersnap DOM observer, but doesn't start it yet */
function initializeUsersnapDomObserver(): void {
  if (usersnapDomObserver) return;

  usersnapDomObserver = new MutationObserver((mutations) => {
    if (!isUsersnapFormOpen) return;

    const shouldSearchForShadowRoots = mutations.some((mutation) => {
      if (mutation.type !== 'childList') return false;
      return Array.from(mutation.addedNodes).some((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node instanceof Element) {
          return node.shadowRoot != null;
        }
        return false;
      });
    });

    if (shouldSearchForShadowRoots) {
      setTimeout(() => {
        findAndStyleUsersnapShadowRoots();
      }, 500);
    }
  });

  logger.info('Usersnap DOM observer initialized');
}

/** Starts the Usersnap DOM observer */
function startUsersnapObserver(): void {
  if (usersnapDomObserver) {
    usersnapDomObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}

/** Disconnects the Usersnap DOM observer */
function stopUsersnapObserver(): void {
  if (usersnapDomObserver) {
    usersnapDomObserver.disconnect();
  }
}

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

    startUsersnapObserver();
  });
  api.on('beforeSubmit', async (event) => {
    event.api.setValue('custom', customData);
  });
  api.on('close', () => {
    isUsersnapFormOpen = false;
    apiKeyOfOpenForm = undefined;

    stopUsersnapObserver();
  });

  globalUsersnapApi = api;

  initializeUsersnapDomObserver();
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
