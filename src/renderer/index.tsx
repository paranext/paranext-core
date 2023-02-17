import { createRoot } from 'react-dom/client';
import * as NetworkService from '@shared/services/NetworkService';
import * as CommandService from '@shared/services/CommandService';
import { ProcessType } from '@shared/globalThis';
import App from './App';

// #region globalThis setup

globalThis.processType = ProcessType.Renderer;
globalThis.isPackaged = window.electronAPI.sync.isPackaged();

console.log(`isPackaged: ${globalThis.isPackaged}`);

// #endregion

// App-wide service setup
NetworkService.initialize();
CommandService.initialize();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);
