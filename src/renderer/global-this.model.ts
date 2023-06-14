/**
 * Module to set up globalThis and polyfills in the renderer
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ProcessType } from '@shared/global-this.model';
import { getModuleSimilarApiMessage } from '@shared/utils/papi-util';

// #region webpack DefinePlugin types setup - these should be from the renderer webpack DefinePlugin

declare const webpackRenderer: {
  isPackaged: boolean;
};

// #endregion

// #region globalThis setup

globalThis.processType = ProcessType.Renderer;
globalThis.isPackaged = webpackRenderer.isPackaged;
globalThis.resourcesPath = 'resources://';

// Note: these items are used in `src\shared\services\web-view.service.ts`. Putting them here breaks
// the circular dependency since `papi` uses the webview service.
(async () => {
  const papi = (await import('@shared/services/papi.service')).default;

  /**
   * Provide a require implementation so we can provide some needed packages for extensions or
   * for packages that extensions import
   */
  const webViewRequire = (module: string) => {
    if (module === 'papi') return papi;
    if (module === 'react') return React;
    if (module === 'react-dom/client') return { createRoot };
    // Tell the extension dev if there is an api similar to what they want to import
    const message = `Requiring other than papi, react, and react-dom/client > createRoot is not allowed in WebViews! ${getModuleSimilarApiMessage(
      module,
    )}`;
    throw new Error(message);
  };

  type GlobalThis = typeof globalThis & {
    papi: typeof papi;
    React: typeof React;
    createRoot: typeof createRoot;
    webViewRequire: typeof webViewRequire;
  };

  // TODO: Hacking in React, createRoot, and papi onto window for now so webViews can access it. Make this TypeScript-y
  (globalThis as GlobalThis).papi = papi;
  (globalThis as GlobalThis).React = React;
  (globalThis as GlobalThis).createRoot = createRoot;
  (globalThis as GlobalThis).webViewRequire = webViewRequire;
})();

// #endregion
