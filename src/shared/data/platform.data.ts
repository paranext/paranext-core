import { MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR, ZOOM_STEP } from 'platform-bible-utils';

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
 * Query parameter passed to the renderer. Present only on the main window, absent on every
 * secondary window, so the renderer can tell which chrome to draw — on Windows and Linux the main
 * window keeps the top-level menu and secondary windows do not. On macOS the top-level menu lives
 * in the OS-level menu bar, which is process-global and reachable from every window regardless of
 * this flag.
 *
 * Fixed at window creation, which is a deliberate limitation: it cannot describe a window becoming
 * the main one later. PT-4278's window-manager service is the durable answer; replace this when it
 * lands.
 *
 * @experimental
 */
export const IS_MAIN_WINDOW_QUERY_PARAMETER = 'isMainWindow';

/**
 * Query parameter passed to the renderer. Present when the window was created without being
 * activated. Written once, at creation, and never removed — whether the user has been in the window
 * since is the renderer's own to track.
 *
 * A window told to stay in the background still has its own content calling `focus()` as it lands:
 * every mounted panel and every loaded web view asks this window's service to focus it, and
 * focusing a tab focuses its web view's iframe. A `focus()` inside a window that does not hold OS
 * focus sets that document's active element without activating the window, latently, until the
 * window is next activated — so left unchecked, whichever call lands last would decide who owns the
 * caret once the window is finally raised. Those calls resolve this window's own service shard by
 * name and never reach the main process, so this is how the fact gets to them. The renderer stops
 * honouring it the first time the window is activated.
 *
 * @experimental
 */
export const WINDOW_AWAITING_FIRST_ACTIVATION_QUERY_PARAMETER = 'awaitingFirstActivation';

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
  [WINDOW_AWAITING_FIRST_ACTIVATION_QUERY_PARAMETER]: { kind: 'flag' },
  [SCROLL_GROUP_STATE_QUERY_PARAMETER]: { kind: 'serialized' },
  [THEME_STATE_QUERY_PARAMETER]: { kind: 'serialized' },
  [IS_MAIN_WINDOW_QUERY_PARAMETER]: { kind: 'flag' },
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

/**
 * Usersnap client key of the space that holds the in-app feedback forms (Usersnap projects). Like
 * the project keys below, it is write-only: it can only SUBMIT reports to a Usersnap project, not
 * RETRIEVE any information from it.
 *
 * The Usersnap keys are intentionally empty in Platform.Bible. A product built on top of core
 * (Paratext 10 Studio) sets them at build time through its repository patch, together with the Help
 * menu items that open the forms. While this key is empty, Usersnap is never initialized and makes
 * no network request.
 *
 * Typed as `string` rather than the literal `''` so a build that sets it still type-checks.
 *
 * @experimental
 */
export const USERSNAP_SPACE_API_KEY: string = '';
/**
 * Usersnap client key of the "report a bug / send feedback" form. Write-only, and empty in
 * Platform.Bible; see {@link USERSNAP_SPACE_API_KEY}.
 *
 * @experimental
 */
export const USERSNAP_PROJECT_REPORT_ISSUE_API_KEY: string = '';
/**
 * Usersnap client key of the "submit an idea" form. Write-only, and empty in Platform.Bible; see
 * {@link USERSNAP_SPACE_API_KEY}.
 *
 * @experimental
 */
export const USERSNAP_PROJECT_SUBMIT_IDEA_API_KEY: string = '';

/** Zoom factor where 1 = the application's default, unscaled size. */
export const DEFAULT_ZOOM_FACTOR = 1.0;
/**
 * Range and step for the application's zoom factor, defined once in `platform-bible-utils`;
 * re-exported here alongside {@link DEFAULT_ZOOM_FACTOR} so app code has one place to reach all four
 * zoom constants.
 */
export { MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR, ZOOM_STEP };

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
