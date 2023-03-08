/**
 * Module to set up globalThis and polyfills in the extension host
 */

import polyfillLocalStorage from '@node/polyfill/LocalStorage';
import { ProcessType } from '@shared/globalThis';

// #region command-line arguments

const isPackaged = process.argv.includes('--packaged');
const resourcesPathIndex = process.argv.indexOf('--resourcesPath');
const resourcesPath =
  resourcesPathIndex >= 0 && process.argv.length > resourcesPathIndex + 1
    ? process.argv[resourcesPathIndex + 1]
    : 'resources://';

// #endregion

// #region globalThis setup

globalThis.processType = ProcessType.ExtensionHost;
globalThis.isPackaged = isPackaged;
globalThis.resourcesPath = resourcesPath;

// #endregion

// #region polyfills

polyfillLocalStorage();

// #endregion
