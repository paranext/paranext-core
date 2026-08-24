/** Module to set up globalThis and polyfills in the renderer */

import { ProcessType } from '@shared/global-this.model';
import {
  DEV_MODE_QUERY_PARAMETER,
  LOG_LEVEL_QUERY_PARAMETER,
  STARTUP_MARKS_QUERY_PARAMETER,
  URL_PARAMETERS,
  WINDOW_ID,
} from '@shared/data/platform.data';
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

// We're setting this logLevel straight from main's logLevel. The permitted values and the default
// are declared once, in URL_PARAMETERS, and read from there rather than restated here — restating
// them is how the two drift apart. Consulting `allowed` also turns what was a blind cast into a
// checked one: a value outside the declared set now falls back to the default instead of reaching
// electron-log as a level it never defined.
const { allowed: allowedLogLevels, default: defaultLogLevel } =
  URL_PARAMETERS[LOG_LEVEL_QUERY_PARAMETER];
const requestedLogLevel = searchParams.get(LOG_LEVEL_QUERY_PARAMETER) ?? '';
const resolvedLogLevel = allowedLogLevels?.includes(requestedLogLevel)
  ? requestedLogLevel
  : defaultLogLevel;
// The value is one of the table's own `allowed` entries or its `default`, and that table is where
// electron-log's LogLevel members are mirrored, so this narrows a checked string rather than
// asserting over an unchecked one. platform.data.test.ts pins that every enum entry declares both.
// eslint-disable-next-line no-type-assertion/no-type-assertion
globalThis.logLevel = resolvedLogLevel as LogLevel;

// Check if the main process indicated noisy dev mode is enabled
// null is used in this API meaning the param is not present
// eslint-disable-next-line no-null/no-null
globalThis.isNoisyDevModeEnabled = searchParams.get(DEV_MODE_QUERY_PARAMETER) !== null;

// Check if the main process indicated startup marks are enabled
// null is used in this API meaning the param is not present
// eslint-disable-next-line no-null/no-null
globalThis.startupMarks = searchParams.get(STARTUP_MARKS_QUERY_PARAMETER) !== null;

// Window id of the Electron browser window
globalThis.windowId = searchParams.get(WINDOW_ID) ?? undefined;

// #endregion
