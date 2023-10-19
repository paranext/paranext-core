import '@renderer/global-this.model';
import { createRoot } from 'react-dom/client';
import * as networkService from '@shared/services/network.service';
import * as commandService from '@shared/services/command.service';
import * as webViewService from '@shared/services/web-view.service';
import logger from '@shared/services/logger.service';
import webViewProviderService from '@shared/services/web-view-provider.service';
import { startDialogService } from '@renderer/services/dialog.service-host';
import App from './app.component';
import { cleanupOldWebViewState } from './services/web-view-state.service';

logger.info('Starting renderer');

// App-wide service setup
// We are not awaiting these service startups for a few reasons:
// - They internally await other services when they need others in order to start
// - Nothing in this React tree requires the services to have started in order to get to first paint
// - If any of these fail, it is a very serious problem that we have not attempted to address up to
//   this point. TODO: https://github.com/paranext/paranext-core/issues/559
(async () => {
  try {
    await networkService.initialize();
  } catch (e) {
    logger.error(`Network service failed to initialize! Error: ${e}`);
  }
})();
(async () => {
  try {
    await commandService.initialize();
  } catch (e) {
    logger.error(`Command service failed to initialize! Error: ${e}`);
  }
})();
(async () => {
  try {
    await webViewProviderService.initialize();
  } catch (e) {
    logger.error(`WebView Provider service failed to initialize! Error: ${e}`);
  }
})();
(async () => {
  try {
    await webViewService.initialize();
  } catch (e) {
    logger.error(`WebView service failed to initialize! Error: ${e}`);
  }
})();
(async () => {
  try {
    await startDialogService();
  } catch (e) {
    logger.error(`Dialog service failed to start! Error: ${e}`);
  }
})();

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);

  // This doesn't run if the renderer has an uncaught exception (which is a good thing)
  window.addEventListener('beforeunload', () => {
    cleanupOldWebViewState();
  });
}
