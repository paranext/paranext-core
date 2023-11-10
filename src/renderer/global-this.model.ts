/** Module to set up globalThis and polyfills in the renderer */

import React from 'react';
import * as ReactJsxRuntime from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import * as SillsdevScripture from '@sillsdev/scripture';
import { ProcessType } from '@shared/global-this.model';
import papi, { Papi } from '@renderer/services/papi-frontend.service';
import { getModuleSimilarApiMessage } from '@shared/utils/papi-util';
import {
  getWebViewStateById,
  setWebViewStateById,
} from '@renderer/services/web-view-state.service';
import useWebViewState from '@renderer/hooks/use-webview-state.hook';
import * as papiReact from '@renderer/services/papi-frontend-react.service';

// #region webpack DefinePlugin types setup - these should be from the renderer webpack DefinePlugin

declare const webpackRenderer: {
  isPackaged: boolean;
};

// #endregion

// #region declare items used in `web-view.service.ts`

// Module types aren't compatible with each other
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moduleMap = new Map<string, any>();
moduleMap.set('papi-frontend', papi);
moduleMap.set('papi-frontend/react', papiReact);
moduleMap.set('react', React);
moduleMap.set('react/jsx-runtime', ReactJsxRuntime);
moduleMap.set('react-dom', ReactDOM);
moduleMap.set('react-dom/client', ReactDOMClient);
moduleMap.set('@sillsdev/scripture', SillsdevScripture);

const registeredModuleList = [...moduleMap]
  .map(([key]) => `${key}`)
  .sort()
  .join(', ');

/**
 * Provide a require implementation so we can provide some needed packages for extensions or for
 * packages that extensions import
 */
function webViewRequire(moduleName: string) {
  const module = moduleMap.get(moduleName);
  if (module) return module;
  throw new Error(
    `Only these modules can be required in WebViews: ${registeredModuleList}. ${getModuleSimilarApiMessage(
      module,
    )}`,
  );
}

type ReactJsxRuntimeType = typeof ReactJsxRuntime;
type ReactDOMClientType = typeof ReactDOMClient;
type SillsdevScriptureType = typeof SillsdevScripture;
type WebViewRequire = typeof webViewRequire;

/* eslint-disable vars-on-top, no-var */
declare global {
  var papi: Papi;
  var React: typeof React;
  var ReactJsxRuntime: ReactJsxRuntimeType;
  // For some reason, TypeScript throws an index signature error on assignment to
  // globalThis.ReactDOM, so this is ReactDom, not ReactDOM
  var ReactDom: typeof ReactDOM;
  var ReactDOMClient: ReactDOMClientType;
  var createRoot: typeof ReactDOMClient.createRoot;
  var SillsdevScripture: SillsdevScriptureType;
  var webViewRequire: WebViewRequire;
  // Web view state functions are used in the default imports for each webview in web-view.service.ts
  var getWebViewStateById: <T>(id: string, stateKey: string) => T | undefined;
  var setWebViewStateById: <T>(id: string, stateKey: string, stateValue: NonNullable<T>) => void;
}
/* eslint-enable */

// #endregion

// #region globalThis setup

globalThis.processType = ProcessType.Renderer;
globalThis.isPackaged = webpackRenderer.isPackaged;
globalThis.resourcesPath = 'resources://';
// renderer currently does not support setting logLevel via command-line
// TODO: support command-line logLevel in renderer
globalThis.logLevel = globalThis.isPackaged ? 'error' : 'info';

// Note: these items are used in `@shared\services\web-view.service.ts`. Putting them here breaks
// the circular dependency since `papi` uses the webview service.
globalThis.papi = papi;
globalThis.React = React;
globalThis.ReactJsxRuntime = ReactJsxRuntime;
globalThis.ReactDom = ReactDOM;
globalThis.ReactDOMClient = ReactDOMClient;
globalThis.createRoot = ReactDOMClient.createRoot;
globalThis.SillsdevScripture = SillsdevScripture;
globalThis.webViewRequire = webViewRequire;
// We don't expose get/setWebViewStateById in PAPI because web views don't have access to IDs
globalThis.getWebViewStateById = getWebViewStateById;
globalThis.setWebViewStateById = setWebViewStateById;
// We store the hook reference because we need it to bind it to the webview's iframe 'window' context
globalThis.useWebViewState = useWebViewState;

// #endregion
