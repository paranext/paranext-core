/**
 * Module to set up globalThis and polyfills in the renderer
 */

import { ProcessType } from '@shared/global-this.model';

// #region webpack DefinePlugin types setup - these should be from the renderer webpack DefinePlugin

declare const webpackRenderer: {
  isPackaged: boolean;
};

// #endregion

// #region globalThis setup

globalThis.processType = ProcessType.Renderer;
globalThis.isPackaged = webpackRenderer.isPackaged;
globalThis.resourcesPath = 'resources://';

// #endregion
