/** Module for setting up globalThis related to WebViews */

import ReactModule from 'react';
import * as ReactJsxRuntime from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import * as SillsdevScripture from '@sillsdev/scripture';
import * as papiCore from '@shared/services/papi-core.service';
import papiFrontend, { Papi } from '@renderer/services/papi-frontend.service';
import { getModuleSimilarApiMessage } from '@shared/utils/util';
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
// Deprecated 27 April 2026 - __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED is an internal
// React 18 API that is not available in React 19. Providing it here gives old extensions an extra
// chance to run successfully.
const reactCompat = {
  ...ReactModule,
  // Allow accessing old internals that are just stubbed to undefined with a proxy that logs a warning
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: new Proxy(
    {
      ReactCurrentOwner: { current: undefined },
      ReactCurrentBatchConfig: { transition: undefined },
    },
    {
      get(target, prop) {
        // Can't use logger here because it will create a circular dependency. This console warning
        // runs after the logger is set up, though, so it will work just fine
        // eslint-disable-next-line no-console
        console.warn(
          // Use String(prop) to explicitly convert symbols to strings, which does not work implicitly
          `Extension WebView accessed React 18 internal property __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.${String(
            prop,
          )}! We are no longer running React 18; please upgrade. You may see errors.`,
        );
        return Reflect.get(target, prop);
      },
    },
  ),
};
moduleMap.set('react', reactCompat);
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

// `declare global` augmentation requires `var` declarations; they cannot be `const`/`let`.
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
// We store the hook reference because we need it to bind it to the webview's iframe 'window' context
globalThis.useWebViewState = useWebViewState;
globalThis.useWebViewScrollGroupScrRef = useWebViewScrollGroupScrRef;
