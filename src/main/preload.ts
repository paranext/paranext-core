import { contextBridge, ipcRenderer } from 'electron';

const electronAPIHandler = {
  env: {
    /**
     * Get an environment variable's value
     * TODO: remove this as it is only for debugging purposes
     * @param name name of environment variable to get
     * @returns string of environment variable contents
     */
    getVar: (name: string): Promise<string> =>
      ipcRenderer.invoke('electronAPI.env.getVar', name),
    test: () => ipcRenderer.invoke('electronAPI.env.test'),
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPIHandler);

export type ElectronAPIHandler = typeof electronAPIHandler;
