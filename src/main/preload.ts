import { isValidValue } from '@shared/util/Util';
import { contextBridge, ipcRenderer } from 'electron';

const syncResults: { [method: string]: unknown } = {};

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
  /** Synchronous calls to the electron backend. TODO: do these things a better way and remove this */
  sync: {
    /** Whether or not the application is packaged */
    isPackaged: (): boolean => {
      if (!isValidValue(syncResults.isPackaged))
        syncResults.isPackaged = ipcRenderer.sendSync(
          'electronAPI.sync.isPackaged',
        );
      return syncResults.isPackaged as boolean;
    },
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPIHandler);

export type ElectronAPIHandler = typeof electronAPIHandler;
