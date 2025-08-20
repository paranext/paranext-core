/** Module for setting up globalThis related to WebViews */

import ReactModule from 'react';
import * as ReactJsxRuntime from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import * as SillsdevScripture from '@sillsdev/scripture';
import * as papiCore from '@shared/services/papi-core.service';
import papiFrontend, { Papi } from '@renderer/services/papi-frontend.service';
import { getModuleSimilarApiMessage } from '@shared/utils/util';
import {
  getWebViewStateById,
  setWebViewStateById,
  resetWebViewStateById,
} from '@renderer/services/web-view-state.service';
import { useWebViewState } from '@renderer/hooks/use-web-view-state.hook';
import { useWebViewScrollGroupScrRef } from '@renderer/hooks/use-web-view-scroll-group-scr-ref.hook';
import * as papiReact from '@renderer/services/papi-frontend-react.service';
import * as platformBibleReact from 'platform-bible-react';
import * as platformBibleUtils from 'platform-bible-utils';

// WARNING: This code should not be edited without serious review. For more information,
// see https://github.com/paranext/paranext/wiki/Module-import-restrictions
// Module types aren't compatible with each other
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moduleMap = new Map<string, any>();
moduleMap.set('@papi/core', papiCore);
moduleMap.set('@papi/frontend', papiFrontend);
moduleMap.set('@papi/frontend/react', papiReact);
moduleMap.set('react', ReactModule);
moduleMap.set('react/jsx-runtime', ReactJsxRuntime);
moduleMap.set('react-dom', ReactDOM);
moduleMap.set('react-dom/client', ReactDOMClient);
moduleMap.set('@sillsdev/scripture', SillsdevScripture);
moduleMap.set('platform-bible-react', platformBibleReact);
moduleMap.set('platform-bible-utils', platformBibleUtils);

const registeredModuleList = [...moduleMap]
  .map(([key]) => `${key}`)
  .sort()
  .join(', ');

/**
 * Provide a require implementation so we can provide some needed packages for extensions or for
 * packages that extensions import
 *
 * WARNING: This code should not be edited without serious review. For more information, see
 * https://github.com/paranext/paranext/wiki/Module-import-restrictions
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
type WebViewCleanup = {
  unmountRoot: () => void;
};

/* eslint-disable vars-on-top, no-var */
declare global {
  var papi: Papi;
  var webViewRequire: WebViewRequire;
  var ReactJsxRuntime: ReactJsxRuntimeType;
  // For some reason, TypeScript throws an index signature error on assignment to
  // globalThis.ReactDOM, so this is ReactDom, not ReactDOM
  var ReactDom: typeof ReactDOM;
  var ReactDOMClient: ReactDOMClientType;
  var createRoot: typeof ReactDOMClient.createRoot;
  var SillsdevScripture: SillsdevScriptureType;
  // Web view state functions are used in the default imports for each webview in web-view.service.ts
  var getWebViewStateById: <T>(id: string, stateKey: string, defaultValue: T) => T;
  var setWebViewStateById: <T>(id: string, stateKey: string, stateValue: T) => void;
  var resetWebViewStateById: (id: string, stateKey: string) => void;
  // Web view cleanup functions for iframe content
  var webViewCleanup: WebViewCleanup;
}
/* eslint-enable */

// Note: these items are used in `@renderer\services\web-view.service-host.ts`. Putting them here breaks
// the circular dependency since `papi` uses the webview service.
globalThis.papi = papiFrontend;
globalThis.React = ReactModule;
globalThis.ReactJsxRuntime = ReactJsxRuntime;
globalThis.ReactDom = ReactDOM;
globalThis.ReactDOMClient = ReactDOMClient;
globalThis.createRoot = ReactDOMClient.createRoot;
globalThis.SillsdevScripture = SillsdevScripture;
globalThis.webViewRequire = webViewRequire;
// We don't expose get/setWebViewStateById/resetWebViewStateById in PAPI because web views don't have access to IDs
globalThis.getWebViewStateById = getWebViewStateById;
globalThis.setWebViewStateById = setWebViewStateById;
globalThis.resetWebViewStateById = resetWebViewStateById;
// We store the hook reference because we need it to bind it to the webview's iframe 'window' context
globalThis.useWebViewState = useWebViewState;
globalThis.useWebViewScrollGroupScrRef = useWebViewScrollGroupScrRef;
