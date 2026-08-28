import type { LogLevel } from 'electron-log';
import { FunctionComponent } from 'react';
import {
  GetSavedWebViewDefinition,
  SavedWebViewDefinition,
  UpdateWebViewDefinition,
  UseWebViewScrollGroupScrRefHook,
  UseWebViewStateHook,
  WebViewDefinitionUpdateInfo,
  WebViewId,
  WebViewProps,
} from '@shared/models/web-view.model';

/**
 * Variables that are defined in global scope. These must be defined in main.ts (main), index.ts
 * (renderer), and extension-host.ts (extension host)
 */

// `declare global` augmentation requires `var` declarations; TypeScript does not support `const`/`let` for global augmentation.
/* eslint-disable vars-on-top, no-var */
declare global {
  /** Type of process this is. Helps with running specific code based on which process you're in */
  var processType: ProcessType;
  /** Whether this process is packaged or running from sources */
  var isPackaged: boolean;
  /**
   * Path to the app's resources directory. This is a string representation of the resources uri on
   * frontend
   */
  var resourcesPath: string;
  /** How much logging should be recorded. Defaults to 'debug' if not packaged, 'info' if packaged */
  var logLevel: LogLevel;
  /**
   * A function that each React WebView extension must provide for Platform.Bible to display it.
   * Only used in WebView iframes.
   */
  var webViewComponent: FunctionComponent<WebViewProps>;
  /** The id of the current web view. Only used in WebView iframes. */
  var webViewId: WebViewId;
  /** JSDOC DESTINATION UseWebViewStateHook */
  var useWebViewState: UseWebViewStateHook;
  /** JSDOC DESTINATION UseWebViewScrollGroupScrRefHook */
  var useWebViewScrollGroupScrRef: UseWebViewScrollGroupScrRefHook;
  /**
   * Retrieve the value from web view state with the given 'stateKey', if it exists. Otherwise
   * return default value
   */
  var getWebViewState: <T>(stateKey: string, defaultValue: T) => T;
  /** Set the value for a given key in the web view state. */
  var setWebViewState: <T>(stateKey: string, stateValue: T) => void;
  /** Remove the value for a given key in the web view state */
  var resetWebViewState: (stateKey: string) => void;
  // Web view "by id" functions are used in the default imports for each webview in web-view.service.ts
  // but probably wouldn't be used in a webview
  // TODO: Find a way to move this to `@renderer/global-this.model.ts` without causing an error on
  // building papi.d.ts
  var getSavedWebViewDefinitionById: (webViewId: string) => SavedWebViewDefinition | undefined;
  var updateWebViewDefinitionById: (
    webViewId: string,
    webViewDefinitionUpdateInfo: WebViewDefinitionUpdateInfo,
    shouldBringToFront?: boolean,
  ) => boolean;
  var getWebViewStateById: <T>(id: string, stateKey: string, defaultValue: T) => T;
  var setWebViewStateById: <T>(id: string, stateKey: string, stateValue: T) => void;
  var resetWebViewStateById: (id: string, stateKey: string) => void;
  /** JSDOC DESTINATION GetSavedWebViewDefinition */
  var getSavedWebViewDefinition: GetSavedWebViewDefinition;
  /** JSDOC DESTINATION UpdateWebViewDefinition */
  var updateWebViewDefinition: UpdateWebViewDefinition;
  /** Indicates whether test code meant just for developers to see should be run */
  var isNoisyDevModeEnabled: boolean;
  /**
   * Whether to emit startup timing marks (see `markStartup`). Off by default; enabled per launch
   * via the `PT_STARTUP_MARKS=true` environment variable. Propagated to all processes the same way
   * as `isNoisyDevModeEnabled`.
   */
  var startupMarks: boolean;
  /**
   * Window id of the Electron browser window as a string (e.g. "1", "2"). This is the stringified
   * form of the Electron `BrowserWindow.id` (a `number`), set from the URL search params in the
   * renderer process. The main process uses the numeric `BrowserWindow.id` directly (e.g. via
   * `platform.getFocusedWindowId`). `undefined` until the renderer reads the URL parameter.
   *
   * @experimental
   */
  var windowId: string | undefined;
  /**
   * Whether this renderer is the main window — the one that draws the top-level menu. On Windows
   * and Linux, secondary windows get identical chrome minus that menu; on macOS the top-level menu
   * lives in the OS-level menu bar rather than in-window, so this flag does not remove it there —
   * every window can still reach it through the system menu bar, which is process-global and cannot
   * differ per window.
   *
   * Set from the URL search params in the renderer process, and `undefined` everywhere else: the
   * main process and the extension host never assign it, and neither does the web view prelude, so
   * code outside a renderer must not read this as a reliable `false`.
   *
   * Fixed at window creation and never updated, so it cannot describe a window becoming the main
   * one later (for instance after the main window closes). PT-4278's window-manager service is the
   * durable answer; replace this when it lands.
   *
   * @experimental
   */
  var isMainWindow: boolean | undefined;
}
/* eslint-enable */

/** Type of Platform.Bible process */
export enum ProcessType {
  Main = 'main',
  Renderer = 'renderer',
  ExtensionHost = 'extension-host',
}
