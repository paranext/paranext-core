import { createRoot } from 'react-dom/client';
import * as NetworkService from '@shared/services/NetworkService';
import * as CommandService from '@shared/services/CommandService';
import { ProcessType } from '@shared/globalThis';
import App from './App';

// #region webpack DefinePlugin types setup - these should be from the renderer webpack DefinePlugin

declare const webpackRenderer: {
  isPackaged: boolean;
};

// #endregion

// #region globalThis setup

globalThis.processType = ProcessType.Renderer;
globalThis.isPackaged = webpackRenderer.isPackaged;

// #endregion

// App-wide service setup
NetworkService.initialize();
CommandService.initialize();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);
