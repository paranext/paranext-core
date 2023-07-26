/**
 * Module to set up globalThis and polyfills in main
 *
 * TODO: consider making this a normal exporting module so it's not using globalThis
 * and using NormalModuleReplacementPlugin to make sure the right one gets imported per process.
 * Idea from Bergi at https://stackoverflow.com/a/69982121
 * See https://webpack.js.org/plugins/normal-module-replacement-plugin/
 */

import path from 'path';
import polyfillLocalStorage from '@node/polyfills/local-storage.polyfill';
import { ProcessType } from '@shared/global-this.model';
import { app } from 'electron';
import { ARG_LOG_LEVEL, getCommandLineArgument } from '@node/utils/command-line.util';
import { LogLevel } from 'electron-log';

// #region globalThis setup

globalThis.processType = ProcessType.Main;
globalThis.isPackaged = app.isPackaged;
globalThis.resourcesPath = app.isPackaged ? process.resourcesPath : path.join(__dirname, '../../');
globalThis.logLevel =
  (getCommandLineArgument(ARG_LOG_LEVEL) as LogLevel) ?? (globalThis.isPackaged ? 'error' : 'info');

// #endregion

// #region polyfills

polyfillLocalStorage();

// #endregion
