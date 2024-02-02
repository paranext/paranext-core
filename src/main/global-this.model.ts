/**
 * Module to set up globalThis and polyfills in main
 *
 * TODO: consider making this a normal exporting module so it's not using globalThis and using
 * NormalModuleReplacementPlugin to make sure the right one gets imported per process. Idea from
 * Bergi at https://stackoverflow.com/a/69982121 See
 * https://webpack.js.org/plugins/normal-module-replacement-plugin/
 */

import path from 'path';
import polyfillLocalStorage from '@node/polyfills/local-storage.polyfill';
import { ProcessType } from '@shared/global-this.model';
import { app } from 'electron';
import { getCommandLineArgument, COMMAND_LINE_ARGS } from '@node/utils/command-line.util';
import { LogLevel } from 'electron-log';

// #region globalThis setup

globalThis.processType = ProcessType.Main;
globalThis.isPackaged = app.isPackaged;
globalThis.resourcesPath = app.isPackaged ? process.resourcesPath : path.join(__dirname, '../../');
globalThis.logLevel =
  // Assert the extracted type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  (getCommandLineArgument(COMMAND_LINE_ARGS.LogLevel) as LogLevel) ??
  (globalThis.isPackaged ? 'info' : 'debug');

// #endregion

// #region polyfills

polyfillLocalStorage();

// #endregion
