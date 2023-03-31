import '@renderer/globalThis';
import { createRoot } from 'react-dom/client';
import * as NetworkService from '@shared/services/NetworkService';
import * as CommandService from '@shared/services/CommandService';
import * as WebViewService from '@shared/services/WebViewService';
import logger from '@shared/services/logger.service';
import App from './App';

logger.info('Starting renderer');

// App-wide service setup
NetworkService.initialize();
CommandService.initialize();
WebViewService.initialize();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);
