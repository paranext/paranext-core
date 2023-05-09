/* eslint-disable vars-on-top */
/* eslint-disable no-var */

import { FunctionComponent } from 'react';

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
   * A function that each React WebView extension must provide for Paranext to display it.
   * Only used in WebView iframes
   */
  var webViewComponent: FunctionComponent;
}

/** Type of Paranext process */
// eslint-disable-next-line import/prefer-default-export
export enum ProcessType {
  Main = 'main',
  Renderer = 'renderer',
  ExtensionHost = 'extension-host',
}
