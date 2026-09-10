/** Module for setting up globalThis related to WebViews */

import ReactModule from 'react';
import * as ReactJsxRuntime from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import * as SillsdevScripture from '@sillsdev/scripture';
import * as papiCore from '@shared/services/papi-core.service';
import papiFrontend, { Papi } from '@renderer/services/papi-frontend.service';
import { getModuleSimilarApiMessage } from '@shared/utils/util';
import { WebViewErrorBoundary as WebViewErrorBoundaryComponent } from '@renderer/components/web-view-error-boundary.component';
import { useWebViewState } from '@renderer/hooks/use-web-view-state.hook';
import { useWebViewScrollGroupScrRef } from '@renderer/hooks/use-web-view-scroll-group-scr-ref.hook';
import * as papiReact from '@renderer/services/papi-frontend-react.service';
import * as platformBibleReact from 'platform-bible-react';
import * as platformBibleUtils from 'platform-bible-utils';
import {
  WEB_VIEW_MODULE_SPECIFIERS,
  type WebViewModuleSpecifier,
} from '@renderer/data/web-view-modules.data';

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

// WARNING: This code should not be edited without serious review. For more information,
// see https://github.com/paranext/paranext/wiki/Module-import-restrictions
//
// A DATA table keyed by `WebViewModuleSpecifier` rather than a sequence of `.set()` calls, so the
// set a web view may link against is something a guard can compare by VALUE - the same treatment
// `EXTENSION_INTERFACE_MODULES` in `extension.service.ts` gets. The key type has no index
// signature, so a module supplied here without a specifier in
// `@renderer/data/web-view-modules.data` - or a specifier there with nothing supplied for it - is a
// compile error. That file carries the licensing consequences of changing the list.
// Module types aren't compatible with each other
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const webViewModules: Readonly<Record<WebViewModuleSpecifier, any>> = {
  '@papi/core': papiCore,
  '@papi/frontend': papiFrontend,
  '@papi/frontend/react': papiReact,
  '@sillsdev/scripture': SillsdevScripture,
  'platform-bible-react': platformBibleReact,
  'platform-bible-utils': platformBibleUtils,
  react: reactCompat,
  'react-dom': ReactDOM,
  'react-dom/client': ReactDOMClient,
  'react/jsx-runtime': ReactJsxRuntime,
};

// A `Map` rather than the record itself, because `webViewRequire` is handed an arbitrary string by
// extension code: indexing a plain object with one answers every `Object.prototype` member -
// `constructor`, `toString`, `valueOf` - as though it were a module this renderer supplies.
const moduleMap = new Map(Object.entries(webViewModules));

const registeredModuleList = [...WEB_VIEW_MODULE_SPECIFIERS].sort().join(', ');

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
  // Wraps each web view's root element so a render throw shows a message instead of blanking the
  // pane. Exposed here for the same reason as `createRoot`: the web view service renders it from
  // inside the iframe's generated script, where only globals are in scope.
  var WebViewErrorBoundary: typeof WebViewErrorBoundaryComponent;
  var SillsdevScripture: SillsdevScriptureType;
  // Web view cleanup functions for iframe content
  var webViewCleanup: WebViewCleanup;
}
/* eslint-enable */

// Note: these items are used in `@renderer\services\web-view.service-shard.ts`. Putting them here breaks
// the circular dependency since `papi` uses the webview service.
globalThis.papi = papiFrontend;
globalThis.React = ReactModule;
globalThis.ReactJsxRuntime = ReactJsxRuntime;
globalThis.ReactDom = ReactDOM;
globalThis.ReactDOMClient = ReactDOMClient;
globalThis.createRoot = ReactDOMClient.createRoot;
globalThis.WebViewErrorBoundary = WebViewErrorBoundaryComponent;
globalThis.SillsdevScripture = SillsdevScripture;
globalThis.webViewRequire = webViewRequire;
// We store the hook reference because we need it to bind it to the webview's iframe 'window' context
globalThis.useWebViewState = useWebViewState;
globalThis.useWebViewScrollGroupScrRef = useWebViewScrollGroupScrRef;
