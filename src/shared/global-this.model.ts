import { LogLevel } from 'electron-log';
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
   * A function that each React WebView extension must provide for Paranext to display it. Only used
   * in WebView iframes.
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
  ) => boolean;
  /** JSDOC DESTINATION GetSavedWebViewDefinition */
  var getSavedWebViewDefinition: GetSavedWebViewDefinition;
  /** JSDOC DESTINATION UpdateWebViewDefinition */
  var updateWebViewDefinition: UpdateWebViewDefinition;
  /** Indicates whether test code meant just for developers to see should be run */
  var isNoisyDevModeEnabled: boolean;
}
/* eslint-enable */

/** Type of Paranext process */
// eslint-disable-next-line import/prefer-default-export
export enum ProcessType {
  Main = 'main',
  Renderer = 'renderer',
  ExtensionHost = 'extension-host',
}
