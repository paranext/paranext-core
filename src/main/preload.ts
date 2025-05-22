import { contextBridge, ipcRenderer } from 'electron';

const electronAPIHandler = {
  env: {
    /** Test electron ipc */
    test: (message: string) => ipcRenderer.invoke('electronAPI:env.test', message),

    zoomIn: () => ipcRenderer.invoke('electronAPI:env.zoomIn'),
    zoomOut: () => ipcRenderer.invoke('electronAPI:env.zoomOut'),
    zoomReset: () => ipcRenderer.invoke('electronAPI:env.zoomReset'),
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPIHandler);

export type ElectronAPIHandler = typeof electronAPIHandler;
