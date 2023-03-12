import { ElectronAPIHandler } from 'main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electronAPI: ElectronAPIHandler;
  }
}

export {};
