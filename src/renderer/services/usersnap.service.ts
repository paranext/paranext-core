import {
  USERSNAP_PROJECT_REPORT_ISSUE_API_KEY,
  USERSNAP_PROJECT_SUBMIT_IDEA_API_KEY,
  USERSNAP_SPACE_API_KEY,
} from '@shared/data/platform.data';
import { appService } from '@shared/services/app.service';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { notificationService } from '@shared/services/notification.service';
import { loadSpace, type InitOptions, type SpaceApi } from '@usersnap/browser';
import { AsyncVariable, getErrorMessage, type LocalizeKey } from 'platform-bible-utils';

/**
 * Milliseconds to wait for Usersnap's `loadSpace` + `init` to finish before giving up.
 *
 * Exported so the test can advance fake timers by exactly this amount.
 */
export const USERSNAP_INIT_TIMEOUT_MS = 5 * 1000;

/** Shown when a configured feedback form cannot be reached, e.g. because Usersnap failed to load */
const FEEDBACK_UNAVAILABLE_MESSAGE_KEY = '%mainMenu_feedback_unavailable%' satisfies LocalizeKey;
/** Shown when this build has no Usersnap keys, so there are no feedback forms to open */
const FEEDBACK_NOT_CONFIGURED_MESSAGE_KEY =
  '%mainMenu_feedback_notConfigured%' satisfies LocalizeKey;
/** Shown when the Usersnap widget throws while opening a configured form */
const FEEDBACK_FAILED_TO_OPEN_MESSAGE_KEY =
  '%mainMenu_feedback_failed_to_open%' satisfies LocalizeKey;

/** Global UserSnap API instance service */

let globalUsersnapApi: SpaceApi | undefined;
let isUsersnapFormOpen = false;
let apiKeyOfOpenForm: string | undefined;
let shadowRootWaitInterval: ReturnType<typeof setInterval> | undefined;
let shadowRootObserver: MutationObserver | undefined;

/**
 * Applies custom styles to the open form's buttons in the Usersnap widget's shadow root. Runs on
 * every change to the shadow root, so it must be idempotent: the changes it makes itself trigger it
 * again and must then find nothing left to do.
 *
 * The selectors match the widget's English button labels. The Usersnap space is configured with
 * English as its only locale; if another locale is ever enabled there, these selectors must
 * follow.
 */
function findAndStyleUsersnapShadowRoots(): void {
  try {
    const shadowRoot = document.querySelector('us-widget')?.shadowRoot;
    if (!shadowRoot) return;

    const closeButton = shadowRoot.querySelector<HTMLButtonElement>(
      'button[title="Close annotation"]',
    );

    if (apiKeyOfOpenForm === USERSNAP_PROJECT_SUBMIT_IDEA_API_KEY) {
      // The idea form renders this button only once the user starts taking a screenshot.
      if (!closeButton) return;
      closeButton.style.top = 'unset';
      closeButton.style.right = '22ch';
      closeButton.style.height = '54px';
      closeButton.style.bottom = '0';
    } else if (apiKeyOfOpenForm === USERSNAP_PROJECT_REPORT_ISSUE_API_KEY) {
      closeButton?.remove();

      if (shadowRoot.querySelector('button[aria-label="Close feedback form"]')) return;

      const collapseButton = shadowRoot.querySelector<HTMLButtonElement>(
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
      // The glyph must read against whichever header colour the widget uses, so take the colour
      // from the collapse button's own icon rather than hard-coding one.
      const collapseIcon = collapseButton.querySelector('svg *');
      newCloseButton.style.color = collapseIcon
        ? getComputedStyle(collapseIcon).stroke
        : getComputedStyle(collapseButton).color;
      newCloseButton.style.fontSize = '.8rem';
      newCloseButton.addEventListener('click', async () => {
        await closeOpenUsersnapForm();
      });

      collapseButton.parentNode?.insertBefore(newCloseButton, collapseButton.nextSibling);
    }
  } catch (error) {
    logger.warn('Failed to style Usersnap close buttons in the shadow root:', error);
  }
}

/** How often to look for the Usersnap widget's shadow root */
const SHADOW_ROOT_WAIT_INTERVAL_MS = 100;
/** How long to keep looking for the Usersnap widget's shadow root before giving up */
const SHADOW_ROOT_WAIT_TIMEOUT_MS = 10 * 1000;

/** Stops restyling the Usersnap widget's shadow root, and stops waiting for it to appear */
function stopShadowRootStyling(): void {
  if (shadowRootWaitInterval) {
    clearInterval(shadowRootWaitInterval);
    shadowRootWaitInterval = undefined;
  }
  shadowRootObserver?.disconnect();
  shadowRootObserver = undefined;
}

/** Styles the open form's buttons now, and again whenever the widget's shadow root changes */
function observeShadowRoot(shadowRoot: ShadowRoot): void {
  findAndStyleUsersnapShadowRoots();
  shadowRootObserver = new MutationObserver(findAndStyleUsersnapShadowRoots);
  shadowRootObserver.observe(shadowRoot, { childList: true, subtree: true });
}

/**
 * Keeps the open form's buttons styled for as long as the form is open. The form renders some of
 * them only later, in response to the user (the idea form's annotation close button appears when
 * the user starts a screenshot), so the shadow root is observed rather than checked once. The
 * `<us-widget>` element and its shadow root normally exist from load time; if they do not exist
 * yet, poll briefly for them.
 */
function startShadowRootStyling(): void {
  stopShadowRootStyling();

  const getShadowRoot = () => document.querySelector('us-widget')?.shadowRoot ?? undefined;

  const shadowRoot = getShadowRoot();
  if (shadowRoot) {
    observeShadowRoot(shadowRoot);
    return;
  }

  const startTime = Date.now();
  shadowRootWaitInterval = setInterval(() => {
    const foundShadowRoot = getShadowRoot();
    if (!foundShadowRoot && Date.now() - startTime < SHADOW_ROOT_WAIT_TIMEOUT_MS) return;

    clearInterval(shadowRootWaitInterval);
    shadowRootWaitInterval = undefined;
    if (foundShadowRoot) observeShadowRoot(foundShadowRoot);
    else logger.warn('Timeout reached while waiting for the Usersnap widget to appear');
  }, SHADOW_ROOT_WAIT_INTERVAL_MS);
}

/** Initializes the global UserSnap API instance */
export async function initializeUsersnapApi() {
  if (!USERSNAP_SPACE_API_KEY) {
    logger.info('Usersnap is not configured (no space API key); feedback forms are unavailable');
    return;
  }

  try {
    const defaultInitParams: InitOptions = {
      enableScreenshot: true,
      // The DOM-capture screenshot serializes every web view iframe together with its bundle and
      // exceeds Usersnap's 20 MB payload limit, so the widget takes a real screenshot instead,
      // served by the display-media request handler in the main process.
      nativeScreenshot: true,
      collectGeoLocation: 'none',
      useSystemFonts: true,
      useLocalStorage: true,
    };

    const startTime = performance.now();
    // Bound the whole load + init: both reach an external server that can hang indefinitely, and
    // both run on the awaited renderer startup path.
    const initVar = new AsyncVariable<SpaceApi>('usersnapInit', USERSNAP_INIT_TIMEOUT_MS);
    // Fire-and-forget: startup awaits `initVar.promise`, so the timeout can win even if this hangs.
    (async () => {
      try {
        const spaceApi = await loadSpace(USERSNAP_SPACE_API_KEY);
        await spaceApi.init(defaultInitParams);
        // If load + init finish after the timeout fired, destroy the space to avoid an orphan.
        if (initVar.hasTimedOut) await spaceApi.destroy();
        else initVar.resolveToValue(spaceApi);
      } catch (error) {
        if (initVar.hasTimedOut)
          logger.debug('Usersnap load/init failed (or cleanup failed) after timeout:', error);
        else {
          // `rejectWithReason` only takes a string, so log the real error here to keep its stack.
          logger.warn('Usersnap load/init failed:', error);
          initVar.rejectWithReason(getErrorMessage(error));
        }
      }
    })();
    const api = await initVar.promise;
    const endTime = performance.now();
    logger.info(`UserSnap initialized successfully in ${endTime - startTime}ms`);

    let customData = {};

    const setCustomData = async (shouldIncludeLog: boolean) => {
      try {
        const appName = (await appService.getAppInfo()).name;
        let logContent: string = '';
        if (shouldIncludeLog) {
          try {
            logContent = await sendCommand('platform.getLogFileContent');
          } catch (logError) {
            logger.warn('Failed to retrieve log content for Usersnap form:', logError);
          }
        }
        customData = {
          App: appName,
          Environment: globalThis.isPackaged ? 'Production' : 'Development',
        };
        if (logContent) customData = { Log: logContent, ...customData };
      } catch (error) {
        logger.warn('Failed to set custom data for Usersnap form:', error);
        // Provide fallback data
        customData = {
          App: 'Unknown',
          Environment: globalThis.isPackaged ? 'Production' : 'Development',
        };
      }
    };

    api.on('open', (event) => {
      const shouldIncludeLog = event.apiKey === USERSNAP_PROJECT_REPORT_ISSUE_API_KEY;
      setCustomData(shouldIncludeLog);

      isUsersnapFormOpen = true;
      apiKeyOfOpenForm = event.apiKey;

      startShadowRootStyling();
    });
    api.on('beforeSubmit', async (event) => {
      event.api.setValue('custom', customData);
    });
    api.on('close', () => {
      isUsersnapFormOpen = false;
      apiKeyOfOpenForm = undefined;

      stopShadowRootStyling();
    });

    globalUsersnapApi = api;
  } catch (error) {
    logger.warn('Failed to initialize UserSnap API; feedback forms will be unavailable:', error);
    globalUsersnapApi = undefined;
  }
}

export async function openUsersnapForm(apiKey: string) {
  if (!USERSNAP_SPACE_API_KEY || !apiKey) {
    logger.info(
      `Cannot open Usersnap form: this build has no Usersnap ${USERSNAP_SPACE_API_KEY ? 'project' : 'space'} key`,
    );
    await notificationService.send({
      message: FEEDBACK_NOT_CONFIGURED_MESSAGE_KEY,
      severity: 'warning',
    });
    return;
  }

  if (!globalUsersnapApi) {
    logger.warn('Cannot open Usersnap form: UserSnap API is not initialized.');
    await notificationService.send({
      message: FEEDBACK_UNAVAILABLE_MESSAGE_KEY,
      severity: 'warning',
    });

    return;
  }

  try {
    const widgetApi = await globalUsersnapApi.show(apiKey);
    await widgetApi.open();
  } catch (error) {
    logger.warn(`Failed to open Usersnap widget: ${error}`);
    await notificationService.send({
      message: FEEDBACK_FAILED_TO_OPEN_MESSAGE_KEY,
      severity: 'warning',
    });
  }
}

/** Closes open UserSnap form */
export async function closeOpenUsersnapForm() {
  if (!globalUsersnapApi) {
    logger.debug('Cannot close Usersnap form: UserSnap API is not initialized');
    return;
  }

  if (!apiKeyOfOpenForm) {
    logger.debug('No Usersnap form is currently open');
    return;
  }

  try {
    // We need to call the 'show' function to get the widgetApi
    const widgetApi = await globalUsersnapApi.show(apiKeyOfOpenForm);
    widgetApi.close();
  } catch (error) {
    logger.warn(`Failed to close Usersnap forms: ${error}`);
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
