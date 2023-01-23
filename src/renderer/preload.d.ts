import { ElectronAPIHandler, ElectronHandler } from 'main/preload';

declare global {
  interface Window {
    electronAPI: ElectronAPIHandler;
    electron: ElectronHandler;
  }
}

export {};
