import { createRoot } from 'react-dom/client';
import * as NetworkService from '@services/NetworkService';
import * as CommandService from '@services/CommandService';
import App from './App';

// App-wide service setup
NetworkService.initialize();
CommandService.initialize();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
