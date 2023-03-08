/**
 * Module to set up globalThis and polyfills in main
 *
 * TODO: consider making this a normal exporting module so it's not using globalThis
 * and using NormalModuleReplacementPlugin to make sure the right one gets imported per process.
 * Idea from Bergi at https://stackoverflow.com/a/69982121
 * See https://webpack.js.org/plugins/normal-module-replacement-plugin/
 */

import polyfillLocalStorage from '@node/polyfill/LocalStorage';
import { ProcessType } from '@shared/globalThis';
import { app } from 'electron';

globalThis.processType = ProcessType.Main;
polyfillLocalStorage(app.isPackaged);
