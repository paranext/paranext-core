import '@renderer/global-this.model';
import { createRoot } from 'react-dom/client';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import * as networkService from '@shared/services/network.service';
import { initialize as initializeSharedStoreService } from '@shared/services/shared-store.service';
import { startWebViewService } from '@renderer/services/web-view.service-host';
import { logger } from '@shared/services/logger.service';
import { webViewProviderService } from '@shared/services/web-view-provider.service';
import { startDialogService } from '@renderer/services/dialog.service-host';
import { cleanupOldWebViewState } from '@renderer/services/web-view-state.service';
import { blockWebSocketsToPapiNetwork } from '@renderer/services/renderer-web-socket.service';
import { startScrollGroupService } from '@renderer/services/scroll-group.service-host';
import { startNotificationService } from '@renderer/services/notification.service-host';
import {
  initialize as initializeThemeService,
  localThemeService,
} from '@renderer/services/theme.service-host';
import { App } from '@renderer/app.component';
import { SCROLLBAR_STYLES } from '@renderer/theme';
import { applyThemeStylesheet } from '@shared/services/theme.service-model';

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
    await initializeSharedStoreService(networkService);

    // This needs to run before web views start running and after the network service is running
    blockWebSocketsToPapiNetwork();

    await runPromisesAndThrowIfRejected(
      webViewProviderService.initialize(),
      startWebViewService(),
      startDialogService(),
      startScrollGroupService(),
      startNotificationService(),
      initializeThemeService(),
    );

    // Subscribe to updates to the current theme
    localThemeService.subscribeCurrentTheme(undefined, (newTheme) => {
      if (isPlatformError(newTheme)) {
        logger.warn(`Failed to get new current theme: ${getErrorMessage(newTheme)}`);
        return;
      }
      currentThemeElement = applyThemeStylesheet(newTheme, currentThemeElement);
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
scrollbarStyleSheet.textContent = SCROLLBAR_STYLES;
document.head.appendChild(scrollbarStyleSheet);

// TODO: Test if this is worth doing or if I should just leave it in the subscribe section
const currentTheme = localThemeService.getCurrentThemeSync();
currentThemeElement = applyThemeStylesheet(currentTheme);

// #endregion

// #region teardown

// This doesn't run if the renderer has an uncaught exception (which is a good thing)
window.addEventListener('beforeunload', () => {
  cleanupOldWebViewState();
});

// #endregion
