/**
 * Namespace to use for features like commands, settings, etc. on the PAPI that are provided by
 * Platform.Bible core
 */
export const PLATFORM_NAMESPACE = 'platform';

/** Query parameter passed to the renderer. Determines which log level to use */
export const LOG_LEVEL_QUERY_PARAMETER = 'logLevel';

/** Query parameter passed to the renderer. Determines if it should enable noisy dev mode */
export const DEV_MODE_QUERY_PARAMETER = 'noisyDevMode';

/** Query parameter passed to the renderer. Determines if it should emit startup timing marks */
export const STARTUP_MARKS_QUERY_PARAMETER = 'startupMarks';

/**
 * Prefix that identifies a startup timing mark in the logs (see
 * `@shared/utils/startup-timing.util`'s `markStartup`). Lives in this import-free data module so
 * the startup-waterfall CLI parser (`.erb/scripts/startup-waterfall.util.ts`) can import it without
 * dragging in logger side effects. Keep identical to the C# emitter (`StartupTiming`).
 */
export const STARTUP_MARK_PREFIX = 'STARTUP_MARK';

/** ID of the default theme family for use in the application */
export const DEFAULT_THEME_FAMILY = '';
/** Type of the default theme for use in the application */
export const DEFAULT_THEME_TYPE = 'light';

/** Constants related to zoom factor of entire application */
export const DEFAULT_ZOOM_FACTOR = 1.0;
export const MIN_ZOOM_FACTOR = 0.5;
export const MAX_ZOOM_FACTOR = 3.0;

/**
 * Upper bound (10 minutes) for how long an automatic Send/Receive is allowed to run before we stop
 * waiting on it. Used as the shutdown-sync timeout in the main process and as the auto-sync
 * edit-block safety leash in the renderer. A scheduled sync of a large repo can run for minutes, so
 * this is deliberately long.
 */
export const SHUTDOWN_SYNC_TIME_OUT_MS = 10 * 60 * 1000;
