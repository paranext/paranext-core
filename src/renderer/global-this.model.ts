/**
 * Module to set up globalThis and polyfills in the renderer
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ProcessType } from '@shared/global-this.model';
import papi, { Papi } from '@renderer/services/papi-renderer.service';
import { getModuleSimilarApiMessage } from '@shared/utils/papi-util';

// #region webpack DefinePlugin types setup - these should be from the renderer webpack DefinePlugin

declare const webpackRenderer: {
  isPackaged: boolean;
};

// #endregion

// #region declare items used in `web-view.service.ts`

/**
 * Provide a require implementation so we can provide some needed packages for extensions or
 * for packages that extensions import
 */
function webViewRequire(module: string) {
  if (module === 'papi') return papi;
  if (module === 'react') return React;
  if (module === 'react-dom/client') return { createRoot };
  // Tell the extension dev if there is an api similar to what they want to import
  const message = `Requiring other than papi, react, and react-dom/client > createRoot is not allowed in WebViews! ${getModuleSimilarApiMessage(
    module,
  )}`;
  throw new Error(message);
}

type CreateRoot = typeof createRoot;
type WebViewRequire = typeof webViewRequire;

/* eslint-disable vars-on-top */
/* eslint-disable no-var */
declare global {
  var papi: Papi;
  var React: typeof React;
  var createRoot: CreateRoot;
  var webViewRequire: WebViewRequire;
}
/* eslint-enable */

// #endregion

// #region globalThis setup

globalThis.processType = ProcessType.Renderer;
globalThis.isPackaged = webpackRenderer.isPackaged;
globalThis.resourcesPath = 'resources://';

// Note: these items are used in `src\shared\services\web-view.service.ts`. Putting them here breaks
// the circular dependency since `papi` uses the webview service.
// TODO: Hacking in React, createRoot, and papi onto window for now so webViews can access it. Make this TypeScript-y
globalThis.papi = papi;
globalThis.React = React;
globalThis.createRoot = createRoot;
globalThis.webViewRequire = webViewRequire;

// #endregion
