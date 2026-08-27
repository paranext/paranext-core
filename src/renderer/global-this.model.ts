/** Module to set up globalThis and polyfills in the renderer */

import { ProcessType } from '@shared/global-this.model';
import {
  DEV_MODE_QUERY_PARAMETER,
  LOG_LEVEL_QUERY_PARAMETER,
  STARTUP_MARKS_QUERY_PARAMETER,
  URL_PARAMETERS,
  WINDOW_ID,
  WINDOW_SLOT_ID_QUERY_PARAMETER,
} from '@shared/data/platform.data';
import { setWindowSlotId } from '@renderer/services/local-storage.service';
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
// them is how the two drift apart. A value outside the declared set falls back to the default
// rather than reaching electron-log as a level it never defined.
const { allowed: allowedLogLevels, default: defaultLogLevel } =
  URL_PARAMETERS[LOG_LEVEL_QUERY_PARAMETER];
const requestedLogLevel = searchParams.get(LOG_LEVEL_QUERY_PARAMETER) ?? '';
const resolvedLogLevel = allowedLogLevels?.includes(requestedLogLevel)
  ? requestedLogLevel
  : defaultLogLevel;
// Narrows a string already checked against the table's `allowed` list, rather than asserting over
// an unchecked one. platform.data.test.ts pins that list against electron-log's own LogLevel union
// and pins that every enum entry declares both fields.
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

// Id of the window this renderer is running in. Parsed here, once, so that everything downstream
// holds the same numeric id main routes by rather than a string that has to agree with it — and
// left `undefined` when the parameter is absent or not an integer, since a window that cannot say
// which one it is must not claim to be some other one. `URL_PARAMETERS` declares this parameter as
// an integer; parsing to match is what makes that declaration mean something.
// Positive rather than merely an integer: `Number(null)` is 0, so an absent parameter would
// otherwise parse as a window claiming to be window 0. Ids are minted from 1 upward, so no window
// can legitimately be 0 either.
const requestedWindowId = Number(searchParams.get(WINDOW_ID));
globalThis.windowId =
  Number.isInteger(requestedWindowId) && requestedWindowId > 0 ? requestedWindowId : undefined;

// Slot this window occupies in the persisted window-layouts structure, which its per-window storage
// is keyed by. Main puts it on the URL because it knows the slot before the window loads, and this
// is the one place that runs before anything could read that storage — in every interface mode,
// and before any request to main has been answered. Left unset when absent: storage then throws
// rather than filing this window's state under a key no restored window would ever ask for.
const requestedWindowSlotId = searchParams.get(WINDOW_SLOT_ID_QUERY_PARAMETER);
if (requestedWindowSlotId) setWindowSlotId(requestedWindowSlotId);

// #endregion
