import { contextBridge, ipcRenderer } from 'electron';

const electronAPIHandler = {
  env: {
    /** Test electron ipc */
    test: (message: string) => ipcRenderer.invoke('electronAPI.env.test', message),
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPIHandler);

export type ElectronAPIHandler = typeof electronAPIHandler;
