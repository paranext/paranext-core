/** Module to set up globalThis and polyfills in the renderer */

import { ProcessType } from '@shared/global-this.model';
import { DEV_MODE_QUERY_PARAMETER, LOG_LEVEL_QUERY_PARAMETER } from '@shared/data/platform.data';
import type { LogLevel } from 'electron-log';

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

// #region globalThis setup from search parameters

const searchParams = new URLSearchParams(global.location.search);

// We're setting this logLevel straight from main's logLevel
// eslint-disable-next-line no-type-assertion/no-type-assertion
globalThis.logLevel = (searchParams.get(LOG_LEVEL_QUERY_PARAMETER) as LogLevel) ?? 'info';

// Check if the main process indicated noisy dev mode is enabled
// null is used in this API meaning the param is not present
// eslint-disable-next-line no-null/no-null
globalThis.isNoisyDevModeEnabled = searchParams.get(DEV_MODE_QUERY_PARAMETER) !== null;

// #endregion
