/**
 * Namespace to use for features like commands, settings, etc. on the PAPI that are provided by
 * Platform.Bible core
 */
export const PLATFORM_NAMESPACE = 'platform';

/** Query parameter passed to the renderer. Determines which log level to use */
export const LOG_LEVEL_QUERY_PARAMETER = 'logLevel';

/** Query parameter passed to the renderer. Determines if it should enable noisy dev mode */
export const DEV_MODE_QUERY_PARAMETER = 'noisyDevMode';

/**
 * Query parameter key used to pass a window's platform id to its renderer process. Durable: on a
 * restored window this is the id its persisted layout entry already carries (see
 * `WindowLayoutEntry.windowId`), so the renderer's per-window storage keyed by it survives a
 * restart under the same id.
 *
 * @experimental
 */
export const WINDOW_ID = 'windowId';

/** Query parameter passed to the renderer. Determines if it should emit startup timing marks */
export const STARTUP_MARKS_QUERY_PARAMETER = 'startupMarks';

/**
 * Query parameter key used to pass the serialized scroll group state main holds at the moment a
 * window is created, so that window's synchronous readers are right on its first render instead of
 * showing the default reference until a round trip returns.
 *
 * Absent when main has nothing to pass — a profile that has never navigated, or one whose state is
 * still only in a renderer's own store awaiting its one-time handover. A renderer that does not
 * find it falls back to what it can read for itself, and then to the default.
 *
 * @experimental
 */
export const SCROLL_GROUP_STATE_QUERY_PARAMETER = 'scrollGroupState';

/**
 * Query parameter key used to pass the serialized current theme main holds at the moment a window
 * is created, so that window paints its first frame — and bakes its web views' stylesheets — with
 * the theme the app is actually on instead of the default followed by a flash.
 *
 * Absent when main has nothing to pass — a profile that has never chosen a theme, or one whose
 * theme is still only in a renderer's own store awaiting its one-time handover. A renderer that
 * does not find it falls back to what it can read for itself, and then to the default.
 *
 * @experimental
 */
export const THEME_STATE_QUERY_PARAMETER = 'themeState';

/** How a query parameter's text maps to the value the app uses. */
type UrlParameterKind = 'flag' | 'integer' | 'enum' | 'string' | 'serialized';

/** What a reader needs to turn one query parameter's text into a value it can trust. */
type UrlParameterSpec = {
  kind: UrlParameterKind;
  default?: string;
  allowed?: readonly string[];
};

/**
 * Every query parameter passed to a renderer, keyed by its parameter name, and what its text means:
 * a `flag` is present-or-absent (any value, including none, means true), an `integer` or `enum` is
 * a single value read at face value, a `string` is a single opaque value used as-is, and
 * `serialized` is the output of platform-bible-utils' `serialize`, opaque to this table.
 *
 * Declarative on purpose, not a table of encode/decode functions: this module is import-free so the
 * `ts-node` startup-waterfall CLI can read it without pulling in the logger, and codec functions
 * would need `serialize`/`deserialize` from platform-bible-utils, a runtime import. `deserialize`
 * returns `any`, so a `serialized` entry is exactly as much of an unchecked cast at its read site
 * as an `enum` one — the table exists so both kinds of drift are visible in the same place instead
 * of only the ones a linter happens to flag.
 *
 * @experimental
 */
export const URL_PARAMETERS: Readonly<Record<string, UrlParameterSpec>> = {
  [LOG_LEVEL_QUERY_PARAMETER]: {
    kind: 'enum',
    default: 'info',
    allowed: ['error', 'warn', 'info', 'verbose', 'debug', 'silly'],
  },
  [DEV_MODE_QUERY_PARAMETER]: { kind: 'flag' },
  [WINDOW_ID]: { kind: 'string' },
  [STARTUP_MARKS_QUERY_PARAMETER]: { kind: 'flag' },
  [SCROLL_GROUP_STATE_QUERY_PARAMETER]: { kind: 'serialized' },
  [THEME_STATE_QUERY_PARAMETER]: { kind: 'serialized' },
};

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
