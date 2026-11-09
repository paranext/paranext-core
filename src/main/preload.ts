import { contextBridge, ipcRenderer, webFrame } from 'electron';
import {
  PAPI_PORT_CHANNEL,
  PAPI_PORT_ERROR_CHANNEL,
  PAPI_PORT_REQUEST_CHANNEL,
  PapiPortMainWorldMessage,
} from '@shared/data/papi-port.model';
import type { PapiPortBridge } from '@shared/data/papi-port.model';
import { INTERFACE_SCALING_CHANNEL } from '@shared/data/interface-scaling.model';

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

// Interface scaling, set from the page so this document is on Chromium's temporary zoom, keyed by
// frame rather than by the URL the renderer keeps rewriting; otherwise the packaged `file://` window
// drops to 100 % on its next resize. Main sends it to a hidden window only once it has painted: set
// earlier, it can stop the window from ever showing. See `adr-interface-scaling-is-per-window-zoom`.
ipcRenderer.on(INTERFACE_SCALING_CHANNEL, (_event, zoomFactor: unknown) => {
  if (typeof zoomFactor === 'number' && Number.isFinite(zoomFactor) && zoomFactor > 0)
    webFrame.setZoomFactor(zoomFactor);
});

export type ElectronAPIHandler = typeof electronAPIHandler;
