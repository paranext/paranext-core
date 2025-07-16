import { App } from '@renderer/app.component';
import '@renderer/global-this-web-view.model';
import '@renderer/global-this.model';
import { startDialogService } from '@renderer/services/dialog.service-host';
import { startNotificationService } from '@renderer/services/notification.service-host';
import { blockWebSocketsToPapiNetwork } from '@renderer/services/renderer-web-socket.service';
import { startScrollGroupService } from '@renderer/services/scroll-group.service-host';
import {
  initialize as initializeThemeService,
  localThemeService,
} from '@renderer/services/theme.service-host';
import { cleanupOldWebViewState } from '@renderer/services/web-view-state.service';
import { startWebViewService } from '@renderer/services/web-view.service-host';
import { initialize as initializeWindowService } from '@renderer/services/window.service-host';
import SCROLLBAR_STYLES_RAW from '@renderer/styles/scrollbar.css?raw';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { initialize as initializeSharedStoreService } from '@shared/services/shared-store.service';
import { webViewProviderService } from '@shared/services/web-view-provider.service';
import { InitOptions, loadSpace } from '@usersnap/browser';
import {
  applyThemeStylesheet,
  getErrorMessage,
  isPlatformError,
  ThemeDefinitionExpanded,
} from 'platform-bible-utils';
import { createRoot } from 'react-dom/client';
import { setUsersnapApi, USERSNAP_SPACE_API_KEY } from './services/usersnap.service';

window.addEventListener('error', (errorEvent: ErrorEvent) => {
  const { filename, lineno, colno, error } = errorEvent;
  logger.error(`Unhandled error in renderer from ${filename}:${lineno}:${colno}, '${error}'`);
});

window.addEventListener('unhandledrejection', (event) => {
  logger.error(`Unhandled rejection in renderer, '${getErrorMessage(event.reason)}'`);
});

logger.info(`Starting renderer${globalThis.isNoisyDevModeEnabled ? ' in noisy dev mode' : ''}`);

/** The style element applied to the DOM for the current theme */
let currentThemeElement: HTMLStyleElement | undefined;
const applyThemeStylesheetRenderer = applyThemeStylesheet.bind(window);

/**
 * Does everything needed to apply the theme. Does not throw
 *
 * @param themeDefinition Theme to apply
 * @param when Description of when this is being run e.g. 'subscribe'. Used for logging
 */
const applyThemeSafe = (themeDefinition: ThemeDefinitionExpanded, when: string) => {
  try {
    currentThemeElement = applyThemeStylesheetRenderer(themeDefinition, currentThemeElement);
  } catch (e) {
    logger.warn(`Failed to apply current theme on ${when}: ${getErrorMessage(e)}`);
  }
};

// #region set up services

// This is a little different than Promise.all in that the error message will have all the reasons
// that all promises were rejected (if they didn't resolve).
async function runPromisesAndThrowIfRejected(...promises: Promise<unknown>[]) {
  const resolutions = await Promise.allSettled(promises);
  const rejections = resolutions.filter((resolution) => resolution.status === 'rejected');
  if (rejections.length === 0) return;

  const reasons = rejections.map((rejection, index) => {
    if (rejection.status !== 'rejected') return "Why doesn't TS know we already checked this?";
    return `[${index}]: ${rejection.reason}`;
  });
  throw new Error(`${reasons}`);
}

async function initializeUsersnapApi() {
  const defaultInitParams: InitOptions = {
    enableScreenshot: true,
    collectGeoLocation: 'none',
    useSystemFonts: true,
    useLocalStorage: true,
    custom: {
      platform: 'Electron',
      app: 'Platform.Bible',
      environment: globalThis.isNoisyDevModeEnabled ? 'development' : 'production',
    },
  };

  const startTime = performance.now();
  const api = await loadSpace(USERSNAP_SPACE_API_KEY);
  await api.init(defaultInitParams);

  const endTime = performance.now();
  logger.info(`UserSnap initialized successfully in ${endTime - startTime}ms`);

  setUsersnapApi(api);
}

// App-wide service setup
// We are not awaiting these service startups for a few reasons:
// - They internally await other services when they need others in order to start
// - Nothing in this React tree requires the services to have started in order to get to first paint
// - If any of these fail, it is a very serious problem that we have not attempted to address up to
//   this point. TODO: https://github.com/paranext/paranext-core/issues/559
(async () => {
  try {
    // The network service has to start first, and it uses the shared store after initialization
    await networkService.initialize();
    await initializeSharedStoreService(networkService);

    // This needs to run before web views start running and after the network service is running
    blockWebSocketsToPapiNetwork();

    // This needs to run before the web view service host starts running and blocks us from creating
    // an iframe for the Usersnap feedback forms
    await initializeUsersnapApi();

    await runPromisesAndThrowIfRejected(
      webViewProviderService.initialize(),
      startWebViewService(),
      startDialogService(),
      startScrollGroupService(),
      startNotificationService(),
      initializeThemeService(),
      initializeWindowService(),
    );

    // Subscribe to updates to the current theme
    await localThemeService.subscribeCurrentTheme(undefined, (newTheme) => {
      if (isPlatformError(newTheme)) {
        logger.warn(`Failed to get new current theme: ${getErrorMessage(newTheme)}`);
        return;
      }
      applyThemeSafe(newTheme, 'subscribe');
    });
  } catch (e) {
    logger.error(`Service(s) failed to initialize! Error: ${e}`);
  }
})();

// #endregion

// #region set up the React UI

const container = document.getElementById('root');
if (!container) {
  throw new Error('Document root element not found!');
}

const root = createRoot(container);
root.render(<App />);

// #endregion

// #region set up the current theme

const scrollbarStyleSheet = document.createElement('style');
scrollbarStyleSheet.textContent = SCROLLBAR_STYLES_RAW;
document.head.appendChild(scrollbarStyleSheet);

// Apply theme on first load since it applies the theme a lot faster than the subscribe application does
const currentTheme = localThemeService.getCurrentThemeSync();
applyThemeSafe(currentTheme, 'first load');

// #endregion

// #region teardown

// This doesn't run if the renderer has an uncaught exception (which is a good thing)
window.addEventListener('beforeunload', () => {
  cleanupOldWebViewState();
});

// #endregion
