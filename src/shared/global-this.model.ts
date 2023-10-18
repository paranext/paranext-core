/* eslint-disable vars-on-top */
/* eslint-disable no-var */

import { LogLevel } from 'electron-log';
import { FunctionComponent, Dispatch, SetStateAction } from 'react';

/**
 * Variables that are defined in global scope. These must be defined in main.ts (main), index.ts (renderer), and extension-host.ts (extension host)
 */

declare global {
  /** Type of process this is. Helps with running specific code based on which process you're in */
  var processType: ProcessType;
  /** Whether this process is packaged or running from sources */
  var isPackaged: boolean;
  /** Path to the app's resources directory. This is a string representation of the resources uri on frontend */
  var resourcesPath: string;
  /**
   * How much logging should be recorded. Defaults to 'info' if not packaged, 'error' if packaged
   */
  var logLevel: LogLevel;
  /**
   * A function that each React WebView extension must provide for Paranext to display it.
   * Only used in WebView iframes.
   */
  var webViewComponent: FunctionComponent;
  /**
   * A React hook for working with a state object tied to a webview.
   * Only used in WebView iframes.
   * @param stateKey Key of the state value to use. The webview state holds a unique value per key.
   * NOTE: `stateKey` needs to be a constant string, not something that could change during execution.
   * @param defaultStateValue Value to use if the web view state didn't contain a value for the given 'stateKey'
   * @returns string holding the state value and a function to use to update the state value
   * @example const [lastPersonSeen, setLastPersonSeen] = useWebViewState('lastSeen');
   */
  var useWebViewState: <T>(
    stateKey: string,
    defaultStateValue: NonNullable<T>,
  ) => [webViewState: NonNullable<T>, setWebViewState: Dispatch<SetStateAction<NonNullable<T>>>];
  /**
   * Retrieve the value from web view state with the given 'stateKey', if it exists.
   */
  var getWebViewState: <T>(stateKey: string) => T | undefined;
  /**
   * Set the value for a given key in the web view state.
   */
  var setWebViewState: <T>(stateKey: string, stateValue: NonNullable<T>) => void;
}

/** Type of Paranext process */
// eslint-disable-next-line import/prefer-default-export
export enum ProcessType {
  Main = 'main',
  Renderer = 'renderer',
  ExtensionHost = 'extension-host',
}
