import { LogLevel } from 'electron-log';
import { FunctionComponent } from 'react';
import {
  GetWebViewDefinitionUpdatableProperties,
  UpdateWebViewDefinition,
  UseWebViewStateHook,
  WebViewDefinitionUpdatableProperties,
  WebViewDefinitionUpdateInfo,
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
  /** JSDOC DESTINATION UseWebViewStateHook */
  var useWebViewState: UseWebViewStateHook;
  /** Retrieve the value from web view state with the given 'stateKey', if it exists. */
  var getWebViewState: <T>(stateKey: string) => T | undefined;
  /** Set the value for a given key in the web view state. */
  var setWebViewState: <T>(stateKey: string, stateValue: T) => void;
  /** Remove the value for a given key in the web view state */
  var resetWebViewState: (stateKey: string) => void;
  // Web view "by id" functions are used in the default imports for each webview in web-view.service.ts
  // but probably wouldn't be used in a webview
  // TODO: Find a way to move this to `@renderer/global-this.model.ts` without causing an error on
  // building papi.d.ts
  var getWebViewDefinitionUpdatablePropertiesById: (
    webViewId: string,
  ) => WebViewDefinitionUpdatableProperties | undefined;
  var updateWebViewDefinitionById: (
    webViewId: string,
    webViewDefinitionUpdateInfo: WebViewDefinitionUpdateInfo,
  ) => boolean;
  /** JSDOC DESTINATION GetWebViewDefinitionUpdatableProperties */
  var getWebViewDefinitionUpdatableProperties: GetWebViewDefinitionUpdatableProperties;
  /** JSDOC DESTINATION UpdateWebViewDefinition */
  var updateWebViewDefinition: UpdateWebViewDefinition;
}
/* eslint-enable */

/** Type of Paranext process */
// eslint-disable-next-line import/prefer-default-export
export enum ProcessType {
  Main = 'main',
  Renderer = 'renderer',
  ExtensionHost = 'extension-host',
}
