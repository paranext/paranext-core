import '@renderer/global-this.model';
import { createRoot } from 'react-dom/client';
import * as networkService from '@shared/services/network.service';
import * as commandService from '@shared/services/command.service';
import * as webViewService from '@shared/services/web-view.service';
import logger from '@shared/util/logger';
import App from './App';

logger.log('Starting renderer');

// App-wide service setup
networkService.initialize();
commandService.initialize();
webViewService.initialize();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);
