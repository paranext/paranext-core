import '@renderer/global-this.model';
import { createRoot } from 'react-dom/client';
import * as networkService from '@shared/services/network.service';
import * as commandService from '@shared/services/command.service';
import * as webViewService from '@shared/services/web-view.service';
import logger from '@shared/services/logger.service';
import webViewProviderService from '@shared/services/web-view-provider.service';
import { startDialogService } from '@renderer/services/dialog.service.host';
import App from './app.component';

logger.info('Starting renderer');

// App-wide service setup
networkService.initialize();
commandService.initialize();
webViewProviderService.initialize();
webViewService.initialize();
startDialogService();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);
