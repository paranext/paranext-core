import '@renderer/globalThis';
import { createRoot } from 'react-dom/client';
import * as NetworkService from '@shared/services/NetworkService';
import * as CommandService from '@shared/services/CommandService';
import App from './App';

// App-wide service setup
NetworkService.initialize();
CommandService.initialize();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);
