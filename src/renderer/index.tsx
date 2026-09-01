// Keep these imports at the top of the file, because they have side effects that are important to
// be run first because they set up global variables that could be used anywhere
import '@renderer/global-this-web-view.model';
import '@renderer/global-this.model';

import { App } from '@renderer/app.component';
import { initAutoSyncBlockingService } from '@renderer/services/auto-sync-blocking-service';
import { initAutoSyncEditBlockDriver } from '@renderer/services/auto-sync-edit-block-driver';
import { startBookChapterControlServiceShard } from '@renderer/services/book-chapter-control.service-shard';
import { startDialogServiceShard } from '@renderer/services/dialog.service-shard';
import { startNotificationServiceShard } from '@renderer/services/notification.service-shard';
import { startOverlayService } from '@renderer/services/overlays/overlay.service-host';
import { blockWebSocketsToPapiNetwork } from '@renderer/services/renderer-web-socket.service';
import { startScrollGroupService } from '@renderer/services/scroll-group.service';
import {
  getCurrentThemeSync,
  onDidChangeCurrentTheme,
  startThemeService,
} from '@renderer/services/theme.service';
import { initializeUsersnapApi } from '@renderer/services/usersnap.service';
import { startUsersnapServiceShard } from '@renderer/services/usersnap.service-shard';
import { startOnboardingTourServiceShard } from '@renderer/services/onboarding-tour.service-shard';
import { cleanupOldWebViewState } from '@renderer/services/web-view-state.service';
import { startWebViewServiceShard } from '@renderer/services/web-view.service-shard';
import { initialize as initializeWindowService } from '@renderer/services/window.service-shard';
import FONT_STYLES_RAW from '@renderer/styles/fonts.css?raw';
import SCROLLBAR_STYLES_RAW from '@renderer/styles/scrollbar.css?raw';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { initialize as initializeSharedStoreService } from '@shared/services/shared-store.service';
import { webViewProviderService } from '@shared/services/web-view-provider.service';
import { markStartup } from '@shared/utils/startup-timing.util';
import {
  applyThemeStylesheet,
  getErrorMessage,
  ThemeDefinitionExpanded,
} from 'platform-bible-utils';
import { createRoot } from 'react-dom/client';

// This runs only after the ENTIRE static import graph above has been downloaded, parsed, and
// evaluated, so it marks the end of bundle evaluation - the window-created -> bundle-eval-end gap
// contains download+parse+eval. It cannot simply move up: globalThis.startupMarks is set by
// '@renderer/global-this.model', itself the second import (the first pulls in React).
markStartup('bundle-eval-end');

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
    markStartup('papi-connected');
    await initializeSharedStoreService(networkService);

    // This needs to run before web views start running and after the network service is running
    blockWebSocketsToPapiNetwork();

    // This needs to run before the web view service shard starts running and blocks us from creating
    // an iframe for the Usersnap feedback forms
    await initializeUsersnapApi();

    await runPromisesAndThrowIfRejected(
      webViewProviderService.initialize(),
      startWebViewServiceShard(),
      startDialogServiceShard(),
      startScrollGroupService(),
      startNotificationServiceShard(),
      startUsersnapServiceShard(),
      startBookChapterControlServiceShard(),
      startOnboardingTourServiceShard(),
      startOverlayService(),
      startThemeService(),
      initializeWindowService(),
    );

    // Drives the auto-sync edit-block banner on Scripture editors during a Send/Receive. Needs the
    // network service (already up above) for the blocking event and the web view service (already
    // up, from the block above) to read/update editor definitions. Both return unsubscribers we
    // intentionally never call — they run for the renderer's lifetime. The blocking service also
    // launches a fire-and-forget consult of the backend's current blocking snapshot, so a renderer
    // reload during an in-flight sync seeds the store instead of assuming unblocked.
    initAutoSyncBlockingService();
    initAutoSyncEditBlockDriver();
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
markStartup('root-render');

// #endregion

// #region set up the current theme

const fontStyleSheet = document.createElement('style');
fontStyleSheet.textContent = FONT_STYLES_RAW;
document.head.appendChild(fontStyleSheet);

const scrollbarStyleSheet = document.createElement('style');
scrollbarStyleSheet.textContent = SCROLLBAR_STYLES_RAW;
document.head.appendChild(scrollbarStyleSheet);

// Subscribed here, at module evaluation, rather than alongside the services above: the theme
// service's cache is what `getCurrentThemeSync` below and every web view's baked-in stylesheet read,
// and this local event fires after that cache has been updated. Registering it before the awaits in
// the service startup above resolve means no change can slip through the gap.
onDidChangeCurrentTheme((newTheme) => applyThemeSafe(newTheme, 'theme change'));

// Apply theme on first load since it applies the theme a lot faster than the subscribe application does
applyThemeSafe(getCurrentThemeSync(), 'first load');

// #endregion

// #region teardown

// This doesn't run if the renderer has an uncaught exception (which is a good thing)
window.addEventListener('beforeunload', () => {
  cleanupOldWebViewState();
});

// #endregion
