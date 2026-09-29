import { contextBridge, ipcRenderer } from 'electron';
import {
  PAPI_PORT_CHANNEL,
  PAPI_PORT_ERROR_CHANNEL,
  PAPI_PORT_REQUEST_CHANNEL,
  PapiPortMainWorldMessage,
} from '@shared/data/papi-port.model';
import type { PapiPortBridge } from '@shared/data/papi-port.model';

const electronAPIHandler = {
  env: {
    /** Test electron ipc */
    test: (message: string) => ipcRenderer.invoke('electronAPI:env.test', message),
  },
  papi: {
    /**
     * Ask main for this window's PAPI MessagePort. Main answers on a separate channel, and the port
     * itself can only travel over `postMessage`, so the reply arrives in the main world as a
     * `window` `message` event whose `ports[0]` is the port (see the forwarders below), not as a
     * return value.
     */
    requestPort: () => ipcRenderer.send(PAPI_PORT_REQUEST_CHANNEL),
  } satisfies PapiPortBridge,
};

contextBridge.exposeInMainWorld('electronAPI', electronAPIHandler);

// A transferred port cannot cross the context bridge, so the reply is forwarded into the main world
// with window.postMessage, which can carry it. The page filters on `event.source === window`.
ipcRenderer.on(PAPI_PORT_CHANNEL, (event, grant: { windowId: string }) => {
  const message: PapiPortMainWorldMessage = { type: PAPI_PORT_CHANNEL, windowId: grant.windowId };
  window.postMessage(message, '*', event.ports);
});
ipcRenderer.on(PAPI_PORT_ERROR_CHANNEL, (_event, error: { reason: string }) => {
  const message: PapiPortMainWorldMessage = { type: PAPI_PORT_ERROR_CHANNEL, reason: error.reason };
  window.postMessage(message, '*');
});

export type ElectronAPIHandler = typeof electronAPIHandler;
