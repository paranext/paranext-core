/** Module to set up globalThis and polyfills in the extension host */

import { LogLevel } from 'electron-log';
import polyfillLocalStorage from '@node/polyfills/local-storage.polyfill';
import {
  COMMAND_LINE_ARGS,
  extensions,
  getCommandLineArgument,
  getCommandLineSwitch,
} from '@node/utils/command-line.util';
import { ProcessType } from '@shared/global-this.model';

// #region command-line arguments

const isPackaged = getCommandLineSwitch(extensions[COMMAND_LINE_ARGS.Packaged][0]);
const resourcesPath = getCommandLineArgument(COMMAND_LINE_ARGS.ResourcesPath) ?? 'resources://';
const logLevel =
  // Assert the extracted type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  (getCommandLineArgument(COMMAND_LINE_ARGS.LogLevel) as LogLevel) ??
  (isPackaged ? 'error' : 'info');

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
