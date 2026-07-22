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

/**
 * Name of the mark each process emits first, right after start. The main process's copy is the
 * run-boundary the startup-waterfall parser uses to slice a multi-launch log down to the latest run
 * (see `.erb/scripts/startup-waterfall.util.ts`'s `selectLatestRun`). Emitters: `src/main/main.ts`
 * and `src/extension-host/extension-host.ts`.
 */
export const STARTUP_MARK_PROCESS_START = 'process-start';

/**
 * Process tag (the `<proc>` field of a mark) of the main process - the value of `ProcessType.Main`.
 * Lives here as a bare literal (not `ProcessType.Main`) so the import-free startup-waterfall CLI
 * can identify the run boundary without importing `global-this.model` (which pulls in React and
 * aliases the CLI can't resolve). Keep in sync with `ProcessType.Main` in
 * `src/shared/global-this.model.ts`.
 */
export const STARTUP_MARK_MAIN_PROCESS_TAG = 'main';

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
