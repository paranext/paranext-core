/**
 * Module to set up globalThis and polyfills in the extension host
 */

import { LogLevel } from 'electron-log';
import polyfillLocalStorage from '@node/polyfills/local-storage.polyfill';
import {
  ARG_LOG_LEVEL,
  ARG_PACKAGED,
  ARG_RESOURCES_PATH,
  getCommandLineArgument,
  getCommandLineSwitch,
} from '@node/utils/command-line.util';
import { ProcessType } from '@shared/global-this.model';

// #region command-line arguments

const isPackaged = getCommandLineSwitch(ARG_PACKAGED);
const resourcesPath = getCommandLineArgument(ARG_RESOURCES_PATH) ?? 'resources://';
const logLevel =
  // Assert the extracted type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  (getCommandLineArgument(ARG_LOG_LEVEL) as LogLevel) ?? (isPackaged ? 'error' : 'info');

// #endregion

// #region globalThis setup

globalThis.processType = ProcessType.ExtensionHost;
globalThis.isPackaged = isPackaged;
globalThis.resourcesPath = resourcesPath;
globalThis.logLevel = logLevel;

// #endregion

// #region polyfills

polyfillLocalStorage();

// #endregion
