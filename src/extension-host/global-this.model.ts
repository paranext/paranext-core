/** Module to set up globalThis and polyfills in the extension host */

import type { LogLevel } from 'electron-log';
import { polyfillLocalStorage } from '@node/polyfills/local-storage.polyfill';
import {
  CommandLineArgs,
  getCommandLineArgument,
  getCommandLineSwitch,
} from '@node/utils/command-line.util';
import { ProcessType } from '@shared/global-this.model';
import { parseWebSocketPort } from '@shared/data/platform.data';
import { isNoisyDevModeEnvVariableSet } from '@node/utils/util';

// #region command-line arguments

const isPackaged = getCommandLineSwitch(CommandLineArgs.Packaged);
const resourcesPath = getCommandLineArgument(CommandLineArgs.ResourcesPath) ?? 'resources://';
const logLevel =
  // Assert the extracted type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  (getCommandLineArgument(CommandLineArgs.LogLevel) as LogLevel) ?? (isPackaged ? 'error' : 'info');
// Main advertises the port its PAPI WebSocket server is actually listening on, which may differ
// from the default port when the default was in use by another app. Leave undefined if absent or
// invalid so consumers fall back to the default port
const webSocketPort = parseWebSocketPort(getCommandLineArgument(CommandLineArgs.WebSocketPort));
globalThis.isNoisyDevModeEnabled = isNoisyDevModeEnvVariableSet();

// #endregion

// #region globalThis setup

globalThis.processType = ProcessType.ExtensionHost;
globalThis.isPackaged = isPackaged;
globalThis.resourcesPath = resourcesPath;
globalThis.logLevel = logLevel;
globalThis.webSocketPort = webSocketPort;

// #endregion

// #region polyfills

polyfillLocalStorage();

// #endregion
