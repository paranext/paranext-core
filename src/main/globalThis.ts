/**
 * Module to set up globalThis and polyfills in main
 *
 * TODO: consider making this a normal exporting module so it's not using globalThis
 * and using NormalModuleReplacementPlugin to make sure the right one gets imported per process.
 * Idea from Bergi at https://stackoverflow.com/a/69982121
 * See https://webpack.js.org/plugins/normal-module-replacement-plugin/
 */

import path from 'path';
import polyfillLocalStorage from '@node/polyfill/LocalStorage';
import { ProcessType } from '@shared/globalThis';
import { app } from 'electron';

// #region globalThis setup

globalThis.processType = ProcessType.Main;
globalThis.isPackaged = app.isPackaged;
globalThis.resourcesPath = app.isPackaged
  ? process.resourcesPath
  : path.join(__dirname, '../../');

// #endregion

// #region polyfills

polyfillLocalStorage();

// #endregion
