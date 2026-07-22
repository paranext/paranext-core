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
 * Upper bound (10 minutes) on how long a single app-driven ("automatic") Send/Receive is allowed to
 * run — one the app starts itself rather than the user driving it from the Send/Receive dialog
 * (which has its own progress and Cancel). A sync of a large repo can run for minutes, so this is
 * deliberately long.
 *
 * Consumed by the main process (`shutdown-tasks.ts`), which uses it to bound how long app shutdown
 * waits on its final sync. It also conceptually matches the C# write gate's stall watchdog, which
 * bounds the same "one automatic Send/Receive" window. The renderer does not time blocking locally
 * — it reads the backend write gate's snapshot (`auto-sync-blocking-store.ts`), so blocking clears
 * when the backend says so rather than on a renderer-side timer.
 *
 * @experimental
 */
export const AUTO_SYNC_MAX_DURATION_MS = 10 * 60 * 1000;
