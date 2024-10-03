import { ElectronAPIHandler } from '@main/preload';

declare global {
  interface Window {
    electronAPI: ElectronAPIHandler;
  }
}

export {};
