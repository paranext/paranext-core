/* eslint-disable vars-on-top */
/* eslint-disable no-var */

/**
 * Variables that are defined in global scope. These must be defined in main.ts (main), index.ts (renderer), and extension-host.ts (extension host)
 */

declare global {
  var processType: ProcessType;
  var isPackaged: boolean;
}

// eslint-disable-next-line import/prefer-default-export
export enum ProcessType {
  Main = 'main',
  Renderer = 'renderer',
  ExtensionHost = 'extension-host',
}
