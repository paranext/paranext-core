import { contextBridge, ipcRenderer } from 'electron';
import {
  InternalRequest,
  InternalResponse,
  NetworkConnectorInfo,
} from '@shared/data/InternalConnectionTypes';
import { Unsubscriber } from '@shared/util/PapiUtil';

const electronAPIHandler = {
  /** Info and commands regarding the edge connection to C# */
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
    test: () => ipcRenderer.invoke('electronAPI.env.test'),
  },
  /** Info and commands related to this current window */
  client: {
    /** Get the current window's electron id and other connector info */
    getConnectorInfo: (): Promise<NetworkConnectorInfo> =>
      ipcRenderer.invoke('electronAPI.client.getConnectorInfo'),
    /** Notify the main process that this client is finished connecting */
    notifyClientConnected: (
      connectorInfo: NetworkConnectorInfo,
    ): Promise<void> =>
      ipcRenderer.invoke(
        'electronAPI.client.notifyClientConnected',
        connectorInfo,
      ),
    /**
     * Register a handler on this client to run when the server sends a request
     * @param callback handler to run with request from server, async returns a response to the server
     * @returns unsubscriber to remove this handler from running on server requests
     */
    handleRequest: (
      callback: (
        requestType: string,
        request: InternalRequest,
      ) => Promise<InternalResponse>,
    ): Unsubscriber => {
      ipcRenderer.on(
        'electronAPI.client.request',
        async (_event, requestType: string, request: InternalRequest) => {
          try {
            const response = await callback(requestType, request);
            ipcRenderer.send('electronAPI.client.response', response);
          } catch (e) {
            // TODO: send error to the main process
            ipcRenderer.send('electronAPI.client.response', {
              success: false,
              errorMessage: e,
            });
            throw e;
          }
        },
      );
      return () => {
        ipcRenderer.off('electronAPI.client.request', callback);
        return true;
      };
    },
    request: <TParam, TReturn>(
      requestType: string,
      request: InternalRequest<TParam>,
    ): Promise<InternalResponse<TReturn>> =>
      ipcRenderer.invoke('electronAPI.client.request', requestType, request),
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPIHandler);

export type ElectronAPIHandler = typeof electronAPIHandler;
