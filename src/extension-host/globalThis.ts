/**
 * Module to set up globalThis and polyfills in the extension host
 */

import polyfillLocalStorage from '@node/polyfill/LocalStorage';
import { ProcessType } from '@shared/globalThis';

// #region command-line arguments

const isPackaged = process.argv.includes('--packaged');

// #endregion

// #region globalThis setup

globalThis.processType = ProcessType.ExtensionHost;
polyfillLocalStorage(isPackaged);

// #endregion
