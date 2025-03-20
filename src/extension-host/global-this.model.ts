/** Module to set up globalThis and polyfills in the extension host */

import { LogLevel } from 'electron-log';
import { polyfillLocalStorage } from '@node/polyfills/local-storage.polyfill';
import {
  COMMAND_LINE_ARGS,
  getCommandLineArgument,
  getCommandLineSwitch,
} from '@node/utils/command-line.util';
import { ProcessType } from '@shared/global-this.model';
import { isNoisyDevModeEnvVariableSet } from '@node/utils/util';

// #region command-line arguments

const isPackaged = getCommandLineSwitch(COMMAND_LINE_ARGS.Packaged);
const resourcesPath = getCommandLineArgument(COMMAND_LINE_ARGS.ResourcesPath) ?? 'resources://';
const logLevel =
  // Assert the extracted type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  (getCommandLineArgument(COMMAND_LINE_ARGS.LogLevel) as LogLevel) ??
  (isPackaged ? 'error' : 'info');
globalThis.isNoisyDevModeEnabled = isNoisyDevModeEnvVariableSet();

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
