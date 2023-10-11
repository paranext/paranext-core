import '@renderer/global-this.model';
import { createRoot } from 'react-dom/client';
import * as networkService from '@shared/services/network.service';
import * as commandService from '@shared/services/command.service';
import * as webViewService from '@shared/services/web-view.service';
import logger from '@shared/services/logger.service';
import webViewProviderService from '@shared/services/web-view-provider.service';
import App from './app.component';
import { cleanupOldWebViewState } from './services/web-view-state.service';

logger.info('Starting renderer');

// App-wide service setup
networkService.initialize();
commandService.initialize();
webViewProviderService.initialize();
webViewService.initialize();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);

// This doesn't run if the renderer has an uncaught exception (which is a good thing)
window.addEventListener('beforeunload', () => {
  cleanupOldWebViewState();
});
