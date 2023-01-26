import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const electronAPIHandler = {
  edge: {
    /**
     * Calls electron to invoke an edge method
     * @param classMethod Class name and method to call in dot notation like ClassName.Method
     * @param args arguments to pass into the method
     * @returns Promise that resolves with the return from the called method
     */
    invoke: (classMethod: string, args: unknown) =>
      ipcRenderer.invoke('electronAPI.edge.invoke', classMethod, args),
  },
  env: {
    /**
     * Get an environment variable's value
     * TODO: remove this as it is only for debugging purposes
     * @param name name of environment variable to get
     * @returns string of environment variable contents
     */
    getVar: (name: string): Promise<string> =>
      ipcRenderer.invoke('electronAPI.env.getVar', name),
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPIHandler);

export type ElectronAPIHandler = typeof electronAPIHandler;

// TODO: REMOVE test code
export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
