/**
 * Namespace to use for features like commands, settings, etc. on the PAPI that are provided by
 * Platform.Bible core
 */
export const PLATFORM_NAMESPACE = 'platform';

/** Query parameter passed to the renderer. Determines which log level to use */
export const LOG_LEVEL_QUERY_PARAMETER = 'logLevel';

/** Query parameter passed to the renderer. Determines if it should enable noisy dev mode */
export const DEV_MODE_QUERY_PARAMETER = 'noisyDevMode';

/** ID of the default theme family for use in the application */
export const DEFAULT_THEME_FAMILY = '';
/** Type of the default theme for use in the application */
export const DEFAULT_THEME_TYPE = 'light';

/** Constants related to zoom factor of entire application */
export const DEFAULT_ZOOM_FACTOR = 1.0;
export const MIN_ZOOM_FACTOR = 0.5;
export const MAX_ZOOM_FACTOR = 3.0;

/**
 * Upper bound (10 minutes) on how long a single automatic Send/Receive is allowed to run. A
 * scheduled sync of a large repo can run for minutes, so this is deliberately long.
 *
 * As of PT-4214 Stage U the renderer auto-sync-blocking store no longer consumes this: the backend
 * write gate is the single authority for blocking, so the store's own `SAFETY_TIMEOUT_MS` leash was
 * deleted (renderer-side resilience is re-query of the authority, not a local timer). The constant
 * now survives in two rightful homes — the shutdown-sync bound in main (`shutdown-tasks.ts`) and,
 * conceptually, the C# stall watchdog — both of which bound "one automatic Send/Receive".
 */
export const AUTO_SYNC_MAX_DURATION_MS = 10 * 60 * 1000;
