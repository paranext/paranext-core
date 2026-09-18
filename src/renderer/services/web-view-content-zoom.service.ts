import { getWebViewIframe, parseIframeZoom } from '@renderer/services/overlays/overlay-coordinates';
import {
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_IDENTITY_STATE_KEY,
  CONTENT_ZOOM_LEVELS_STATE_KEY,
  ContentZoomKind,
  DEFAULT_ZOOM_FACTOR,
  getContentZoomCssVariable,
  getContentZoomKind,
} from '@shared/models/content-zoom.model';
import {
  ContentZoomAreaId,
  SavedWebViewDefinition,
  WEB_VIEW_CONTENT_TYPE,
  WebViewId,
} from '@shared/models/web-view.model';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';
import { settingsService } from '@shared/services/settings.service';
import {
  adjustZoomFactor,
  buildContentZoomMemoryKey,
  formatZoomPercent,
  isValidContentZoomAreaId,
  isValidZoomFactor,
  parseContentZoomMemoryKey,
} from '@shared/utils/content-zoom.util';
import {
  debounce,
  getErrorMessage,
  isPlatformError,
  normalizeProjectId,
  PlatformError,
  Unsubscriber,
} from 'platform-bible-utils';

/** What the injected bootstrap exposes on a web view's `window` (see the bootstrap script). */
type ContentZoomWindowApi = { showIndicator: (areaId: string, text: string) => void };

/** Area id → level. The shape stored under `CONTENT_ZOOM_LEVELS_STATE_KEY`. */
type Levels = { [areaId: string]: number };

type MemoryRecord = { [key: string]: number };

/** Web view type → whether it is known to mark a zoom area. */
type TypesWithAreasRecord = { [webViewType: string]: boolean };

type SettingKey =
  | 'platform.webViewContentZoom'
  | 'platform.webViewContentZoomMemory'
  | 'platform.webViewContentZoomTypesWithAreas';

type ContentZoomDeps = {
  getIframe: (webViewId: string) => HTMLIFrameElement | null;
  getDefinition: (webViewId: string) => SavedWebViewDefinition | undefined;
  updateDefinition: (webViewId: string, update: { state: Record<string, unknown> }) => boolean;
  getAllOpenDefinitions: () => SavedWebViewDefinition[];
  onDidUpdateWebView: (
    callback: (event: { webView: SavedWebViewDefinition }) => void,
  ) => Unsubscriber;
  getLastFocusedTabId: () => string | undefined;
  isWindowInputBlocked: () => boolean;
  settings: {
    get: (key: SettingKey) => Promise<unknown>;
    set: (key: SettingKey, value: unknown) => Promise<unknown>;
    subscribe: (
      key: SettingKey,
      callback: (value: unknown | PlatformError) => void,
    ) => Promise<() => Promise<unknown> | unknown>;
  };
  localize: (localizeKey: `%${string}%`) => Promise<string>;
};

/**
 * Whether {@link warnShardDepsNotConfigured} has already logged. These six functions — five from the
 * renderer's two window-scoped shards, plus `isWindowInputBlocked` from the window-input-blocked
 * util — only exist once the composition root (`src/renderer/index.tsx`) calls
 * {@link initializeContentZoomService} with them; a call routed through one of the stubs below
 * before that happens is worth one warning, not one per call.
 */
let hasWarnedShardDepsNotConfigured = false;

function warnShardDepsNotConfigured(): void {
  if (hasWarnedShardDepsNotConfigured) return;
  hasWarnedShardDepsNotConfigured = true;
  logger.warn(
    'Content zoom: called before the composition root injected the shard functions (initializeContentZoomService has not run with them yet).',
  );
}

const productionDeps: ContentZoomDeps = {
  getIframe: getWebViewIframe,
  // The six functions below come from the renderer's web-view and window shards, plus the
  // window-input-blocked util. Importing a shard here directly would create an import cycle, since both
  // shards import this module, and `isWindowInputBlocked` travels the same seam so this module's
  // whole window-scoped surface is composed in one place. The renderer's composition root injects
  // its own functions through `initializeContentZoomService`; these stubs cover the window between
  // module load and that call.
  getDefinition: () => {
    warnShardDepsNotConfigured();
    return undefined;
  },
  updateDefinition: () => {
    warnShardDepsNotConfigured();
    return false;
  },
  getAllOpenDefinitions: () => {
    warnShardDepsNotConfigured();
    return [];
  },
  onDidUpdateWebView: () => {
    warnShardDepsNotConfigured();
    return () => false;
  },
  getLastFocusedTabId: () => {
    warnShardDepsNotConfigured();
    return undefined;
  },
  isWindowInputBlocked: () => {
    warnShardDepsNotConfigured();
    return false;
  },
  settings: {
    get: (key) => settingsService.get(key),
    set: (key, value) => {
      if (key === 'platform.webViewContentZoom') return settingsService.set(key, asNumber(value));
      if (key === 'platform.webViewContentZoomTypesWithAreas')
        return settingsService.set(key, asTypesWithAreas(value));
      return settingsService.set(key, asMemory(value));
    },
    subscribe: (key, callback) => settingsService.subscribe(key, callback),
  },
  localize: (localizeKey) => localizationService.getLocalizedString({ localizeKey }),
};

let deps: ContentZoomDeps = productionDeps;

/**
 * The Settings default, cached after the first read; cleared by a subscription push or a test
 * reset.
 */
let cachedDefault: number | undefined;

/**
 * Mirror of the memory setting, used to seed a newly opened pane's own levels — from its head
 * variables ({@link getInitialContentZoomForWebView}) and on its first area report
 * ({@link setContentZoomAreas}). Filled by a successful `readMemory` read, and kept current by the
 * memory subscription and by this window's own successful writes. A momentarily stale value only
 * means a pane seeds from a level one edit old; every write of memory stays authoritative through
 * `enqueueMemoryTransaction`, which re-reads the setting inside the transaction.
 */
let cachedMemory: MemoryRecord = {};

/** Whether {@link cachedMemory} has been filled by at least one successful read of the setting. */
let memoryLoaded = false;

/**
 * Which web view types are known to mark a zoom area. A type absent from the record is not known to
 * mark none — it simply has no evidence yet.
 */
let cachedTypesWithAreas: TypesWithAreasRecord = {};
let typesWithAreasLoaded = false;

/**
 * Whether each open pane is expected to report a zoom area, resolved from the type record before
 * the pane's content loads. A pane with no entry was never resolved — a URL pane, a pane whose view
 * runs no scripts, or one opened before the record could be read — and is treated as marking none,
 * which is what lets an ordinary view be scaled correctly the very first time it is opened.
 */
const expectAreasByWebViewId = new Map<WebViewId, boolean>();

/**
 * The memory record the sibling sync last reconciled against, so it can tell an entry that was
 * deleted from an entry that was never there. Only the memory subscription advances it, and only
 * after a walk in which every pane took its update: the deletion half of a delta exists nowhere
 * else, so a walk that threw partway, or one a pane's failed write left owed, must leave the record
 * where it was for the next emission to find. A local write must not advance it either, or this
 * window would have no record of the entry the write removed and would leave its own sibling panes
 * at the level the write just gave up.
 */
let lastSyncedMemory: MemoryRecord = {};

/**
 * The localized word the reset indicator prefixes the default percentage with, read once at
 * initialization so a reset never waits on a cross-process request before pushing the factor.
 */
let cachedDefaultLabel: string | undefined;

/** Shown in the reset indicator when the localized label could not be read. */
const DEFAULT_LABEL_FALLBACK = 'Default';

/** The one-time initialization promise; cleared by a test reset so each test starts fresh. */
let initialized: Promise<void> | undefined;

/** The tail of the memory-setting transaction chain; a transaction is appended onto it next. */
let memoryChain: Promise<void> = Promise.resolve();

/**
 * The tail of the type-record transaction chain, kept separate from {@link memoryChain} so a type
 * write never waits behind a level write, or the reverse.
 */
let typesChain: Promise<void> = Promise.resolve();

/** How long a per-key memory edit waits for more edits to the same or another key before it flushes. */
const MEMORY_WRITE_DEBOUNCE_MS = 250;

/** Memory edits not yet stored in the setting, keyed by memory key; `undefined` means delete. */
const pendingMemoryWrites = new Map<string, number | undefined>();

/**
 * Memory edits this window gave up on, by key, each carrying the stored level the failed write was
 * meant to replace. The pane already shows and stores the level the user chose, through its own
 * definition state, which a memory fault does not touch — so an emission carrying the superseded
 * level is not news and must not push it back into the pane. Any OTHER value is a real change from
 * elsewhere: it is applied and the entry spent, so a key is never ignored beyond the one value this
 * window failed to overwrite.
 */
const givenUpMemoryWrites = new Map<string, { superseded: number | undefined }>();

/** What a memory transaction did, so its caller can tell a write that failed from one that ran. */
type MemoryTransactionOutcome = 'written' | 'unchanged' | 'failed';

/** How many times in a row a flush may fail before it gives its edits up. */
const MAX_MEMORY_FLUSH_ATTEMPTS = 3;

/** Consecutive failed flush attempts; reset by any attempt that reached the setting. */
let memoryFlushFailures = 0;

/**
 * Debounced entry point for {@link flushMemoryWrites}: a burst of edits within
 * {@link MEMORY_WRITE_DEBOUNCE_MS} of each other collapses into the one trailing call. `.flush()`
 * runs the pending call immediately (used on `beforeunload` and by the test seam below);
 * `.cancel()` abandons it without writing (used on a test reset).
 */
const flushMemoryWritesDebounced = debounce(flushMemoryWrites, MEMORY_WRITE_DEBOUNCE_MS);

/**
 * How long a pane's further level edits wait after the one written immediately. Every definition
 * write reconciles the whole dock layout, serializes every open view's state and re-renders the
 * pane, so a gesture's remaining steps are worth one write rather than one each.
 */
const OWN_LEVEL_WRITE_DEBOUNCE_MS = 250;

/**
 * A pane's levels given in this window but not yet written into its definition, paired with the
 * identity stamp ({@link identityStampFor}) the pane showed when the write was chosen — `undefined`
 * when the pane had no resolvable identity at that moment, which is a fact about the write, not the
 * absence of one: a pending write with no resolvable identity still has an entry here, and only a
 * pane with NO entry at all has nothing pending. Kept as one record (set whole in
 * {@link setOwnLevels}, cleared whole everywhere it is cleared) so {@link seedFromMemory} and
 * {@link commitOwnLevels} can each tell a pending write chosen for the pane's CURRENT identity from
 * one that predates a re-point the pane's own definition stamp never caught up to, because no
 * commit for it had landed yet either.
 */
const pendingOwnLevelWrites = new Map<
  WebViewId,
  { levels: Levels; identity: string | undefined }
>();

/** The open burst window per pane: while one is running, a further edit is deferred into it. */
const ownLevelWriteTimers = new Map<WebViewId, ReturnType<typeof setTimeout>>();

/** The registered `beforeunload` flush listener, if any; guards against registering a second one. */
let beforeUnloadListener: (() => void) | undefined;

/**
 * Zoom areas each pane's bootstrap has reported (`setContentZoomAreas`), in document order. A pane
 * that never reported — a URL web view, or one whose React tree has not mounted yet — has no entry
 * and counts as having no areas; whether that earns it the whole-iframe fallback is
 * {@link mayScaleWholeIframe}'s question, not this map's.
 */
const areasByWebViewId = new Map<WebViewId, string[]>();

/** The area the user last clicked or focused in each pane (`setContentZoomActiveArea`). */
const activeAreaByWebViewId = new Map<WebViewId, string>();

/**
 * Area ids already reported as unknown for a pane. A menu entry or a held key can ask for the same
 * missing area many times a second, and one line per pane and area says everything the log can.
 */
const unknownAreasLoggedByWebViewId = new Map<WebViewId, Set<string>>();

/** Test seam only. Production code never calls this. */
// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
export function __setContentZoomDepsForTesting(partial: Partial<ContentZoomDeps>): void {
  deps = { ...deps, ...partial };
  cachedDefault = undefined;
  cachedMemory = {};
  memoryLoaded = false;
  cachedTypesWithAreas = {};
  typesWithAreasLoaded = false;
  lastSyncedMemory = {};
  cachedDefaultLabel = undefined;
  initialized = undefined;
  clearAllFallbackGraces();
  areasByWebViewId.clear();
  activeAreaByWebViewId.clear();
  unknownAreasLoggedByWebViewId.clear();
  expectAreasByWebViewId.clear();
  ownLevelWriteTimers.forEach((timer) => clearTimeout(timer));
  ownLevelWriteTimers.clear();
  pendingOwnLevelWrites.clear();
  pendingMemoryWrites.clear();
  givenUpMemoryWrites.clear();
  memoryFlushFailures = 0;
  flushMemoryWritesDebounced.cancel();
  memoryChain = Promise.resolve();
  typesChain = Promise.resolve();
  if (beforeUnloadListener !== undefined && typeof window !== 'undefined') {
    window.removeEventListener('beforeunload', beforeUnloadListener);
  }
  beforeUnloadListener = undefined;
}

function asNumber(value: unknown): number {
  return isValidZoomFactor(value) ? value : DEFAULT_ZOOM_FACTOR;
}

function asMemory(value: unknown): MemoryRecord {
  if (typeof value !== 'object' || !value) return {};
  const out: MemoryRecord = {};
  Object.entries(value).forEach(([key, level]) => {
    // Only the VALUE is checked: an entry whose key this build cannot parse still belongs to
    // somebody — a zoom kind or an identity shape a newer build writes — and every write stores
    // the whole record back. Nothing downstream needs them filtered: `collectMemoryLevelsFor`
    // ignores a key it cannot parse.
    if (isValidZoomFactor(level)) out[key] = level;
  });
  return out;
}

/** Keeps only the boolean entries of a raw type-record value; drops anything else the same way. */
function asTypesWithAreas(value: unknown): TypesWithAreasRecord {
  if (typeof value !== 'object' || !value) return {};
  const out: TypesWithAreasRecord = {};
  Object.entries(value).forEach(([key, marksAreas]) => {
    if (typeof marksAreas === 'boolean') out[key] = marksAreas;
  });
  return out;
}

async function getDefaultZoom(): Promise<number> {
  if (cachedDefault !== undefined) return cachedDefault;
  let read: number;
  try {
    read = asNumber(await deps.settings.get('platform.webViewContentZoom'));
  } catch (e) {
    logger.warn(`Content zoom: could not read the default; using 100 %. ${getErrorMessage(e)}`);
    read = DEFAULT_ZOOM_FACTOR;
  }
  // The subscription this window starts before its first read delivers the current value at once,
  // so it can fill the cache while this read is still out. That value is the setting's, and at
  // least as fresh as this one, so it stands — and the 100 % fallback above, which is not the
  // setting's value at all, never replaces it.
  cachedDefault ??= read;
  return cachedDefault;
}

/** The pane's own levels from its definition state, dropping invalid areas or values. */
function getOwnLevels(definition: Pick<SavedWebViewDefinition, 'state'> | undefined): Levels {
  const raw = definition?.state?.[CONTENT_ZOOM_LEVELS_STATE_KEY];
  if (typeof raw !== 'object' || !raw) return {};
  const out: Levels = {};
  Object.entries(raw).forEach(([areaId, level]) => {
    if (isValidContentZoomAreaId(areaId) && isValidZoomFactor(level)) out[areaId] = level;
  });
  return out;
}

/**
 * The pane's own levels, with a write this window has not committed yet taking precedence — but
 * only when that write was chosen for the identity the pane resolves to right now
 * ({@link memoryIdentityFor}). A pending write chosen for another identity, or for none when the
 * pane now resolves one (or the reverse), belongs to a project the pane no longer shows: returning
 * it here would leak that stale level into whatever reads this function, including
 * {@link syncSiblingsFromMemory}, which would then re-record it as the CURRENT identity's own. The
 * committed levels are returned instead, until {@link commitOwnLevels} or a fresh area report
 * resolves the mismatch.
 */
function effectiveOwnLevels(
  definition:
    | Pick<SavedWebViewDefinition, 'id' | 'state' | 'webViewType' | 'projectId'>
    | undefined,
): Levels {
  if (!definition) return {};
  const pending = pendingOwnLevelWrites.get(definition.id);
  if (pending) {
    const currentId = memoryIdentityFor(definition);
    const currentStamp = currentId ? identityStampFor(currentId) : undefined;
    if (pending.identity === currentStamp) return pending.levels;
  }
  return getOwnLevels(definition);
}

/**
 * Explicit id → the window's last focused tab → nothing. Exported for tests.
 *
 * Anything holding this window's input — a modal dialog, the command palette, or one of the
 * full-screen overlays (connection lost, workspace updating, first run) — stops only the path that
 * has to guess which pane is meant: the caller named no pane, so the last focused tab is all there
 * is to go on, and that tab is behind whatever the user is actually looking at. A caller that names
 * a pane — the tab menu, a wheel or chord inside a view, an extension's command — has said which
 * pane it means and is answered whatever is on top.
 */
export function resolveContentZoomTarget(
  explicitWebViewId: string | undefined,
): WebViewId | undefined {
  if (explicitWebViewId) return explicitWebViewId;
  if (deps.isWindowInputBlocked()) return undefined;
  return deps.getLastFocusedTabId();
}

/**
 * Explicit area (must be one the pane reported) → the pane's active area → its first area →
 * `undefined` for a pane without areas. Exported for tests.
 */
export function resolveContentZoomArea(
  webViewId: WebViewId,
  explicitAreaId: ContentZoomAreaId | undefined,
): ContentZoomAreaId | undefined {
  const areas = areasByWebViewId.get(webViewId) ?? [];
  if (areas.length === 0) return undefined;
  if (explicitAreaId !== undefined) {
    if (areas.includes(explicitAreaId)) return explicitAreaId;
    let logged = unknownAreasLoggedByWebViewId.get(webViewId);
    if (!logged) {
      logged = new Set();
      unknownAreasLoggedByWebViewId.set(webViewId, logged);
    }
    if (!logged.has(explicitAreaId)) {
      logged.add(explicitAreaId);
      logger.debug(
        `Content zoom: web view ${webViewId} has no zoom area "${explicitAreaId}"; ignoring`,
      );
    }
    return undefined;
  }
  const active = activeAreaByWebViewId.get(webViewId);
  return active && areas.includes(active) ? active : areas[0];
}

/**
 * The scale a pane's content is drawn at, for a platform surface that has to match it but renders
 * outside the pane - an overlay in the renderer's own document, which cannot read the pane's zoom
 * variables. A pane with areas answers with the level of the area a request with no area of its own
 * resolves to - the Settings default when that area holds no level of its own; a pane with none
 * answers with the CSS `zoom` on its iframe, the whole-frame fallback. `1` is the answer for
 * anything it cannot resolve.
 *
 * Read at render time, with no subscription. For a command palette the level cannot change
 * underneath it while it is open: the palette blocks the window's input
 * ({@link resolveContentZoomTarget}'s `isWindowInputBlocked` check), so a zoom chord cannot resolve
 * a target, and the wheel listener lives inside the pane, where the pointer is not. A popover or a
 * context menu do not block input, so a chord pressed while one is open can still re-scale the pane
 * behind it - the overlay then keeps the level it was drawn at until it closes. That gap is
 * accepted rather than subscribed away: it needs a chord pressed while a pop-up is on screen, it
 * corrects itself the next time the pop-up opens, and a change-event-and-re-render path through
 * three components is disproportionate to a cosmetic mismatch.
 *
 * @experimental This function is unstable and may change or disappear without notice
 */
export function getContentZoomScaleForWebView(webViewId: WebViewId): number {
  const area = resolveContentZoomArea(webViewId, undefined);
  if (area === undefined) return parseIframeZoom(deps.getIframe(webViewId));
  const own = effectiveOwnLevels(deps.getDefinition(webViewId));
  return own[area] ?? cachedDefault ?? DEFAULT_ZOOM_FACTOR;
}

/**
 * Whether a zoom request carrying neither a web view id nor an area id would find something to act
 * on: the window's active pane, and an area in it. Answers the question the window-chrome chord
 * listener has to ask before it consumes a keystroke, and it is synchronous because both halves
 * read state this module already holds.
 */
export function canContentZoomActOnActiveTarget(): boolean {
  const target = resolveContentZoomTarget(undefined);
  if (!target) return false;
  return resolveContentZoomArea(target, undefined) !== undefined;
}

/**
 * How long a pane's last-reported zoom areas survive content that may have replaced them: a reload
 * whose new content never runs the content-zoom bootstrap again keeps those areas until this wait
 * elapses, at which point the liveness probe ({@link isContentZoomBootstrapAlive}) tells content
 * that is truly gone from content that is merely slower to mount than this wait.
 */
const FALLBACK_GRACE_MS = 1000;

/** Running grace timers, one per pane, so a report, a reload, or an unmount can cancel one. */
const fallbackGraceTimers = new Map<WebViewId, ReturnType<typeof setTimeout>>();

/**
 * Cancels a pane's pending grace timer, if one is running. Called on every NON-EMPTY area report
 * and on every iframe load ({@link applyContentZoomForWebView}): either way, whatever the timer was
 * waiting out belongs to content that is now gone, and a fresh grace has to run its course again
 * before its two jobs — dropping stale areas and recording the pane's type — apply.
 */
function clearFallbackGrace(webViewId: WebViewId): void {
  const timer = fallbackGraceTimers.get(webViewId);
  if (timer !== undefined) {
    clearTimeout(timer);
    fallbackGraceTimers.delete(webViewId);
  }
}

/** Test seam only: drops every pending grace timer. */
function clearAllFallbackGraces(): void {
  fallbackGraceTimers.forEach((timer) => clearTimeout(timer));
  fallbackGraceTimers.clear();
}

/**
 * Drops the three maps' entries for one pane: its reported areas, its active area, and the "already
 * warned about" set an unknown area id was logged into. Shared by every path that treats a pane's
 * areas as belonging to content that is gone — an expired grace that found the bootstrap dead, and
 * a genuine unmount.
 */
function forgetAreaState(webViewId: WebViewId): void {
  areasByWebViewId.delete(webViewId);
  activeAreaByWebViewId.delete(webViewId);
  unknownAreasLoggedByWebViewId.delete(webViewId);
}

/**
 * Records that a pane's outcome marked at least one zoom area, so the next pane of that web view
 * TYPE is given the right treatment before its content loads. Only a pane the platform resolved an
 * expectation for is evidence: a pane that could never have reported (no scripts, no record read
 * yet) says nothing about its type.
 */
function recordTypeMarksAreas(webViewId: WebViewId): void {
  if (!expectAreasByWebViewId.has(webViewId)) return;
  const webViewType = deps.getDefinition(webViewId)?.webViewType;
  if (!webViewType) return;
  // Compared against the record the transaction itself reads, not the outer `cachedTypesWithAreas`
  // — that cache is only refreshed once a transaction resolves, so two panes of the same unrecorded
  // type reporting within the same tick would otherwise both enqueue an identical write instead of
  // the second one seeing the first's already-landed value and correctly doing nothing.
  enqueueTypesWithAreasTransaction((record) =>
    record[webViewType] === true ? undefined : { ...record, [webViewType]: true },
  );
}

/**
 * Starts the wait that tells content merely slow to mount from content that is truly gone. Started
 * by a pane's first empty area report ({@link setContentZoomAreas}) and by every iframe load
 * ({@link applyContentZoomForWebView}, which clears any grace left over from the previous content
 * first, so this always waits out a fresh grace rather than reusing one inherited from that
 * content, and then cancels the grace again for a pane that must not wait one out — a URL pane,
 * which is scaled whole from the start, and a pane whose definition has gone, which has nothing to
 * scale); idempotent either way, since a grace already pending is left alone.
 *
 * At expiry: a pane whose areas belong to content that no longer runs a content-zoom bootstrap
 * ({@link isContentZoomBootstrapAlive}) has them dropped, since nothing will ever report over them.
 * A pane the platform still expects to mark an area, whose bootstrap is alive, is left alone
 * entirely — it is simply slower to mount than this wait, not a pane whose type marks nothing.
 * Every other pane has its own expectation settled to "marks none", which only changes anything for
 * a pane whose bootstrap turned out to be dead, since an unresolved or already-settled pane already
 * reads that way. This never touches the type record ({@link recordTypeMarksAreas}): a grace expiry
 * is evidence about this one pane, not about its type, since a sibling pane of the same type may
 * already have reported an area.
 */
function startFallbackGrace(webViewId: WebViewId): void {
  if (fallbackGraceTimers.has(webViewId)) return;
  fallbackGraceTimers.set(
    webViewId,
    setTimeout(() => {
      fallbackGraceTimers.delete(webViewId);
      const hasAreas = (areasByWebViewId.get(webViewId) ?? []).length > 0;
      const alive = isContentZoomBootstrapAlive(webViewId);
      if (hasAreas && alive) return;
      if (alive && expectAreasByWebViewId.get(webViewId) === true) {
        // The view is simply slower to mount than this wait. Reading that as "this type marks
        // nothing" would both scale this pane wrongly a moment from now and mislead its next open.
        return;
      }
      if (hasAreas) {
        // The areas belong to content this pane no longer shows; nothing will ever report over
        // them, so they are dropped rather than left to shadow the whole-iframe fallback below.
        forgetAreaState(webViewId);
      }
      expectAreasByWebViewId.set(webViewId, false);
      // A timer callback has no caller to catch it, and a pane can be torn down inside this second.
      // The expectation was just settled to `false` above, so mayScaleWholeIframe short-circuits on
      // that disjunct and never reads the pane's definition here; what can still throw is
      // iframe.contentDocument, on a frame that has been detached from the document. A cross-origin
      // frame does not throw here: contentDocument is simply null for one.
      try {
        pushContentZoom(webViewId);
      } catch (e) {
        logger.warn(
          `Content zoom: could not apply the fallback to web view ${webViewId}. ${getErrorMessage(e)}`,
        );
      }
    }, FALLBACK_GRACE_MS),
  );
}

/**
 * Whether a pane with no reported areas may be scaled as a whole through its iframe element. A pane
 * the platform expects to mark an area is left alone until it does: scaling it in the meantime
 * would scale the view's own toolbar with its content and undo it a moment later, which is the jump
 * on open this decision exists to avoid. A URL pane never marks one and is always allowed.
 */
function mayScaleWholeIframe(webViewId: WebViewId): boolean {
  const expectsAreas = expectAreasByWebViewId.get(webViewId);
  // A pane whose expectation has been SETTLED to "marks none" is answered from that alone: the
  // definition could only agree, and reading one that cannot be read — during teardown, or before
  // the dock layout is registered — would deny the pane a fallback its grace has already decided
  // it needs. An unsettled pane is still judged against its definition, which is where a read that
  // fails must surface rather than be taken for an answer.
  if (expectsAreas === false) return true;
  if (deps.getDefinition(webViewId)?.contentType === WEB_VIEW_CONTENT_TYPE.URL) return true;
  return expectsAreas !== true;
}

/**
 * Whether the pane's CURRENT document still has a content-zoom bootstrap running. The bootstrap
 * publishes `window.__platformContentZoom` synchronously as it installs and removes it on teardown,
 * so its absence means the document that reported this pane's areas is gone. Anything that cannot
 * be determined — no iframe, no content window, a realm that refuses the read — answers `true`, so
 * an unreadable pane keeps its areas rather than losing them on a guess.
 */
function isContentZoomBootstrapAlive(webViewId: WebViewId): boolean {
  try {
    const iframe = deps.getIframe(webViewId);
    if (!iframe) return true;
    const contentWindow: (Window & { __platformContentZoom?: ContentZoomWindowApi }) | undefined =
      iframe.contentWindow ?? undefined;
    if (!contentWindow) return true;
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    return contentWindow.__platformContentZoom !== undefined;
  } catch {
    return true;
  }
}

/** The value stored under {@link CONTENT_ZOOM_IDENTITY_STATE_KEY} for one pane's identity. */
function identityStampFor(id: MemoryIdentity): string {
  return `${id.kind}:${id.identity}`;
}

/** The identity a pane's state is stamped with, or `undefined` for a pane with no stamp. */
function storedIdentityStamp(
  definition: Pick<SavedWebViewDefinition, 'state'>,
): string | undefined {
  const value = definition.state?.[CONTENT_ZOOM_IDENTITY_STATE_KEY];
  return typeof value === 'string' ? value : undefined;
}

/** The identity bits {@link seedFromMemory} and {@link reseedIfIdentityChanged} both need. */
type IdentityState = {
  definition: SavedWebViewDefinition;
  id: MemoryIdentity | undefined;
  /** `identityStampFor(id)`, or `undefined` when `id` is. */
  stamp: string | undefined;
  storedStamp: string | undefined;
};

/**
 * Resolves a pane's definition, its current memory identity and stamp, and the stamp already stored
 * in its state — the four values {@link reseedIfIdentityChanged} reads to decide whether to re-seed,
 * and {@link seedFromMemory} reads again to actually do it. Computed once here and passed through
 * ({@link reseedIfIdentityChanged} → `seedFromMemory`) rather than twice, since neither the
 * definition read nor the identity lookup has any reason to disagree with itself a moment later.
 */
function resolveIdentityState(webViewId: WebViewId): IdentityState | undefined {
  const definition = deps.getDefinition(webViewId);
  if (!definition) return undefined;
  const id = memoryIdentityFor(definition);
  return {
    definition,
    id,
    stamp: id ? identityStampFor(id) : undefined,
    storedStamp: storedIdentityStamp(definition),
  };
}

/**
 * Gives a pane the levels {@link cachedMemory} remembers for the kind and identity it shows NOW, and
 * stamps that identity into its state ({@link CONTENT_ZOOM_IDENTITY_STATE_KEY}) so a later change of
 * identity can be told from a pane that still shows what its levels belong to. The stamp
 * accompanies the levels: a pane that ends up with none carries neither, here and in
 * {@link commitOwnLevels} — which is also why `hasOwnLevels` below is read from committed state
 * alone, never from a write still sitting in {@link pendingOwnLevelWrites}: that write's own commit
 * adds the stamp together with the levels it carries, so counting a merely pending one here too
 * would risk stamping a pane ahead of a level it does not actually have yet.
 *
 * Decided by the identity, the stamp, and any pending write:
 *
 * - **No identity at all** (`id` is `undefined` — a project id this pane's kind cannot resolve, for
 *   instance) — nothing this window could seed the pane with either way, so whatever levels it
 *   already holds are left exactly as they are.
 * - **The stamp matches the pane's identity** — nothing to do. Whatever the pane holds, seeded here
 *   or chosen by the user since, belongs to what the pane shows.
 * - **No stamp, and the pane already has something of its own for the identity it shows RIGHT NOW** —
 *   a committed level (the levels key is never written empty, so holding it at all means the pane
 *   has a level to keep — a newly opened pane, one restored from a layout written before its levels
 *   were stamped, or one whose only own-level commit so far has failed) is merged with whatever
 *   memory remembers for the areas its own state lacks — the same state → memory → default
 *   precedence the "Otherwise" branch below applies to a pane with nothing of its own — and
 *   stamped. A level held only as a still-pending, uncommitted write chosen for this same identity
 *   ({@link pendingOwnLevelWrites}) is left untouched instead (the pending write keeps its open
 *   burst timer too) and gets its stamp together with its levels once a later commit finally lands:
 *   there is no committed stamp yet to say it changed FROM anything, and merging into it here would
 *   race the very commit that is about to land.
 * - **Otherwise — a genuinely fresh pane with nothing of its own at all, OR the stamp names another
 *   identity, OR a pending write was chosen for one** — either the pane has never had anything
 *   seeded or committed, or it was re-pointed at another project through the same web view id
 *   (`reloadWebView`, with the view's own `getWebViewDefinition` spreading its previous saved state
 *   onto the new definition) after its levels were stamped, or it was re-pointed before its first
 *   commit ever landed, so no stamp exists to show the change but the level still pending belongs
 *   to a project the pane no longer shows. Whatever the pane holds is replaced by what memory
 *   remembers for the identity it shows now, and removed entirely when it remembers nothing, so the
 *   pane follows the Settings default rather than the previous project's level — and any pending
 *   write still standing is dropped along with it, together with the open burst-write timer it was
 *   sitting in, so the identity's own next edit still gets the "first edit of a burst is written at
 *   once" guarantee instead of waiting out a window that belonged to another identity. The one
 *   exception is a pending write already chosen for the identity being seeded NOW — the pane's own
 *   not-yet- committed edit for what it already shows — which is kept rather than overwritten by
 *   what memory remembers, the same way the previous case keeps one. A drop here is a courtesy, not
 *   the only guard: a pending write that reaches {@link commitOwnLevels} before this function gets
 *   the chance — the debounce timer firing on its own, `forgetContentZoom`, or the unload flush —
 *   is checked and dropped there too, rather than being stamped with whatever identity the pane
 *   shows at commit time. This whole case is skipped while {@link memoryLoaded} is still `false`: an
 *   unread {@link cachedMemory} is `{}` by construction, not evidence that nothing is remembered,
 *   and trusting it here would drop a restored pane's levels for nothing to replace them with. Left
 *   alone, the pane keeps its stale stamp (or stale pending write) until its next fresh first-area
 *   report re-seeds it from scratch ({@link setContentZoomAreas}) — a definition update alone does
 *   not re-run this check, since {@link reseedIfIdentityChanged} returns early for a pane with no
 *   stored stamp.
 */
function seedFromMemory(webViewId: WebViewId, precomputed?: IdentityState): void {
  const resolved = precomputed ?? resolveIdentityState(webViewId);
  if (!resolved) return;
  const { definition, id, stamp, storedStamp } = resolved;
  // No identity to seed from or check the stamp against: whatever levels the pane already holds are
  // left exactly as they are, re-point or not, since nothing here could replace them anyway. See
  // "No identity at all" above.
  if (!id) return;
  if (storedStamp === stamp) return; // "The stamp matches the pane's identity" above.
  const hasOwnLevels = Boolean(
    definition.state && CONTENT_ZOOM_LEVELS_STATE_KEY in definition.state,
  );
  // Read once and reused by both checks below: neither the `hasOwnLevels` return nor the
  // `memoryLoaded` return touches this map, so a pane whose pending write already names `stamp` is
  // the same fact whichever of the two paths asks it.
  const pendingWrite = pendingOwnLevelWrites.get(webViewId);
  const pendingWriteMatchesStamp = pendingWrite !== undefined && pendingWrite.identity === stamp;
  if (storedStamp === undefined) {
    if (hasOwnLevels) {
      // An unread `cachedMemory` is `{}` by construction, not evidence that nothing is remembered
      // (same reasoning as the `!memoryLoaded` guard below): merging it in here would stamp the
      // pane as reconciled with this identity before memory ever had a chance to contribute
      // anything, and no later report would revisit it once "The stamp matches the pane's
      // identity" starts short-circuiting this function on every future call.
      if (!memoryLoaded) return;
      // Committed-levels half of "no stamp, and the pane already has something of its own" above:
      // fill only the areas its own state lacks, exactly as state → memory → default precedence
      // works everywhere else (getInitialContentZoomForWebView).
      const merged: Levels = { ...getOwnLevels(definition) };
      Object.entries(settledMemoryLevelsFor(id)).forEach(([areaId, level]) => {
        if (merged[areaId] === undefined) merged[areaId] = level;
      });
      deps.updateDefinition(webViewId, {
        state: {
          ...definition.state,
          [CONTENT_ZOOM_LEVELS_STATE_KEY]: merged,
          [CONTENT_ZOOM_IDENTITY_STATE_KEY]: stamp,
        },
      });
      return;
    }
    if (pendingWriteMatchesStamp) return; // same case, pending-write half.
    // Either a genuinely brand-new pane with nothing of its own, committed or pending, or a pending
    // write that predates a re-point. Both fall through below exactly like a stamped re-point does.
  }
  // "Otherwise" above -- including its one exception, a pending write already chosen for the
  // identity being seeded NOW, which is kept rather than overwritten by what memory remembers. When
  // `storedStamp` was undefined, this was already ruled out just above; it is only still live here
  // for a pane whose stamp names a different identity.
  if (!memoryLoaded) return;
  if (pendingWriteMatchesStamp) return;
  pendingOwnLevelWrites.delete(webViewId);
  const ownLevelTimer = ownLevelWriteTimers.get(webViewId);
  if (ownLevelTimer !== undefined) {
    clearTimeout(ownLevelTimer);
    ownLevelWriteTimers.delete(webViewId);
  }
  const state: Record<string, unknown> = { ...(definition.state ?? {}) };
  const levels = settledMemoryLevelsFor(id);
  if (Object.keys(levels).length === 0) {
    // Nothing to give this pane and nothing it may keep: a re-pointed pane's old levels and stamp
    // go, and a pane that had neither is left exactly as it was rather than written to.
    if (!hasOwnLevels) return;
    delete state[CONTENT_ZOOM_LEVELS_STATE_KEY];
    delete state[CONTENT_ZOOM_IDENTITY_STATE_KEY];
  } else {
    state[CONTENT_ZOOM_LEVELS_STATE_KEY] = levels;
    state[CONTENT_ZOOM_IDENTITY_STATE_KEY] = stamp;
  }
  deps.updateDefinition(webViewId, { state });
}

/**
 * The definition-update half of {@link seedFromMemory}: a pane whose stamp no longer names what it
 * shows is re-seeded, and nothing else is touched.
 *
 * A pane with no stamp is deliberately left to its next area report. An update arrives for every
 * write to a definition, including the platform's own: a reset removes a pane's levels and its
 * stamp together, and the memory edit that goes with it is still in its debounce window when that
 * update comes back, so seeding an unstamped pane here would hand the level the user just gave up
 * straight back from {@link cachedMemory} — and take it away again when the memory write's own echo
 * arrives.
 */
function reseedIfIdentityChanged(webViewId: WebViewId): void {
  const resolved = resolveIdentityState(webViewId);
  if (!resolved) return;
  // The only check that is load-bearing here: `seedFromMemory` re-checks `!id` and
  // `stamp === storedStamp` itself, so re-checking them before delegating would only repeat them.
  if (resolved.storedStamp === undefined) return;
  seedFromMemory(webViewId, resolved);
}

/**
 * Called by the bootstrap (through the parent-bound helper) whenever the set of areas changes. A
 * pane's bootstrap commonly reports no areas at all on its first scan — nothing zoom-marked has
 * rendered yet — and reports again once its content mounts; seeding runs on that first NON-EMPTY
 * report, not merely the first call, so the empty scan itself never counts as "the pane has
 * reported" for seeding purposes. A NON-EMPTY report also settles the pane's own expectation of
 * marking an area to `true` and, the first time this pane's type does that, records it
 * ({@link recordTypeMarksAreas}); an EMPTY report starts the grace instead, which settles the
 * expectation to `false` only for a pane that was not already expecting to mark one — a pane
 * already expecting `true` is left alone by that grace's expiry ({@link startFallbackGrace}).
 */
export function setContentZoomAreas(webViewId: WebViewId, areaIds: ContentZoomAreaId[]): void {
  const valid = areaIds.filter((areaId) => isValidContentZoomAreaId(areaId));
  const previous = areasByWebViewId.get(webViewId);
  if (previous && previous.length === valid.length && previous.every((a, i) => a === valid[i]))
    return;
  if (valid.length > 0) {
    clearFallbackGrace(webViewId);
    // Checked before this pane's own expectation is settled below, so a pane whose expectation was
    // never resolved cannot satisfy its own evidence requirement by settling it right here.
    recordTypeMarksAreas(webViewId);
    expectAreasByWebViewId.set(webViewId, true);
  } else startFallbackGrace(webViewId);
  if ((previous === undefined || previous.length === 0) && valid.length > 0)
    seedFromMemory(webViewId);
  areasByWebViewId.set(webViewId, valid);
  pushContentZoom(webViewId);
}

/** Called by the bootstrap whenever the user clicks or focuses inside another area. */
export function setContentZoomActiveArea(webViewId: WebViewId, areaId: ContentZoomAreaId): void {
  if (isValidContentZoomAreaId(areaId)) activeAreaByWebViewId.set(webViewId, areaId);
}

/**
 * Drop everything remembered in this window about a pane (its iframe is gone).
 *
 * The tail of a zoom gesture the pane was in the middle of is written first, rather than going down
 * with the pane: an unmount is not only a close — a pane is also unmounted when it is re-rendered
 * or moved — and the definition the levels belong to commonly outlives it. On a genuine close there
 * is no definition left to write them into, and {@link commitOwnLevels} drops the pending levels
 * itself. If the definition is still there but that write fails, the levels stay pending — this
 * function does not clear them — for the next edit of the pane or the unload flush to retry. A
 * third outcome belongs to {@link commitOwnLevels} alone: a pending write whose recorded identity no
 * longer matches what the pane resolves to now is dropped outright rather than committed, since the
 * pane has moved on to another project (or to none) since the write was chosen, and writing the old
 * level now would misattribute it.
 */
export function forgetContentZoom(webViewId: WebViewId): void {
  const timer = ownLevelWriteTimers.get(webViewId);
  if (timer !== undefined) {
    clearTimeout(timer);
    ownLevelWriteTimers.delete(webViewId);
  }
  commitOwnLevels(webViewId);
  forgetAreaState(webViewId);
  expectAreasByWebViewId.delete(webViewId);
  clearFallbackGrace(webViewId);
}

/**
 * Writes the pane's effective levels into it. With areas: one CSS variable per area (own level,
 * else the default) plus the default variable, and the iframe's own zoom cleared. Without areas (a
 * URL view, or a view that marks none): CSS `zoom` on the iframe element, so the whole view shows
 * at the Settings default — but only once {@link mayScaleWholeIframe} says the pane really has no
 * areas rather than not having mounted its content yet. Areas that hold a level but are not
 * currently rendered still get their variable, so the level is in place when the area appears (a
 * panel the view renders only on demand).
 *
 * Hidden panes are handled: rc-dock keeps an inactive tab mounted under `display: none`, and both
 * the variables and the rules that read them are data-driven, so they apply with no layout and are
 * already correct when the tab is shown. Only the indicator needs geometry, and it is passed only
 * for a direct user action, which needs a visible pane; the bootstrap's `cornerOf` still falls back
 * to a fixed corner when every rect it measures is zero.
 */
export function pushContentZoom(
  webViewId: WebViewId,
  indicator?: { areaId: ContentZoomAreaId; text: string },
): void {
  const iframe = deps.getIframe(webViewId);
  if (!iframe) return;
  // Only a non-URL pane with scripting allowed bakes the real default into its head — a pane opened
  // with `allowScripts: false` bakes nothing, same as it never runs the bootstrap — and that bake
  // awaits the same read that fills `cachedDefault`, so this fallback can never outrank a value
  // that pane actually baked.
  const defaultZoom = cachedDefault ?? DEFAULT_ZOOM_FACTOR;
  const root = iframe.contentDocument?.documentElement;
  root?.style.setProperty(CONTENT_ZOOM_DEFAULT_CSS_VARIABLE, String(defaultZoom));
  const areas = areasByWebViewId.get(webViewId) ?? [];
  if (areas.length === 0 || !root) {
    // `zoom` predates `setProperty` support for this non-standard property; the named accessor
    // is the form every engine implements for it, including the empty-string clear.
    // Assigning in both directions is what gives the host zoom a path back: a pane that may no
    // longer be whole-scaled — one the platform now expects to mark an area, or whose definition
    // cannot be found — is cleared here rather than keeping whatever the previous content left on
    // the element.
    iframe.style.zoom = mayScaleWholeIframe(webViewId) ? String(defaultZoom) : '';
    return; // a view without areas has no per-area action to announce
  }
  iframe.style.zoom = '';
  const own = effectiveOwnLevels(deps.getDefinition(webViewId));
  new Set([...areas, ...Object.keys(own)]).forEach((areaId) => {
    root.style.setProperty(getContentZoomCssVariable(areaId), String(own[areaId] ?? defaultZoom));
  });
  if (!indicator) return;
  const contentWindow: (Window & { __platformContentZoom?: ContentZoomWindowApi }) | undefined =
    iframe.contentWindow ?? undefined;
  // The bootstrap script defines this global; the double underscore marks it as an internal
  // platform/pane contract, not a name this file invents.
  // eslint-disable-next-line no-underscore-dangle
  contentWindow?.__platformContentZoom?.showIndicator(indicator.areaId, indicator.text);
}

/**
 * For the iframe load hook: treats every load as a fresh content session, including an in-place
 * reload that replaces a pane's content without the component unmounting (`forgetContentZoom` only
 * runs on unmount, so the pane's id, and anything keyed by it, survives a reload). Clears any
 * fallback grace left over from whatever the pane showed before, then arms a fresh one exactly as if
 * the pane had just been opened and cancels it again for a pane that must not wait one out — a URL
 * pane, which is scaled whole from the start, and a pane whose definition has gone, which has
 * nothing to scale; a pane that goes on to report an area within the grace cancels it as usual. The
 * pane's own expectation of marking an area ({@link expectAreasByWebViewId}) is untouched by a load:
 * the entry is keyed by the pane's web view TYPE, which a reload does not change, and its value may
 * already have been settled by the pane's own earlier reports — exactly what should stick across a
 * reload of the same type of content — so {@link mayScaleWholeIframe} answers correctly for the new
 * content from the {@link pushContentZoom} below, at once — no wait for a fresh grace to elapse. The
 * whole-iframe `zoom` a reload does not reset on its own (it lives on the host `<iframe>` element,
 * not the content a reload replaces) is cleared and, if still warranted, reapplied by that same
 * push, which assigns the host zoom in both directions, so the new content never renders showing the
 * old content's answer for even a moment.
 *
 * The pane's last-reported areas are deliberately kept across the load itself rather than dropped
 * here. A real load replaces the iframe's realm, so the fresh content's bootstrap reports its own
 * areas from scratch; dropping them at load time instead races that report — the child document's
 * `DOMContentLoaded`, which the bootstrap reports from, fires before the iframe element's `load` —
 * and a pane that reported first would be left with no areas that nothing ever re-reports, since
 * the bootstrap only calls the parent when its area LIST changes and keeps that list inside the
 * iframe. What decides whether those areas survive the replacement is the liveness probe the grace
 * timer runs at expiry ({@link isContentZoomBootstrapAlive}): the ordinary case is a fresh report
 * already having cancelled the grace, but content that never reports again — `allowScripts: false`
 * content, an in-place navigation the platform never injected into, `about:blank`, or a host that
 * tore its own bootstrap down — has its predecessor's areas dropped in favor of the whole-iframe
 * fallback instead of keeping them forever.
 */
export function applyContentZoomForWebView(webViewId: WebViewId): void {
  // Armed before the definition is read, and outside the guard below, because a read that fails
  // must still leave the pane a grace: for a view that never runs the bootstrap this hook is the
  // only thing that ever arms one, so a pane whose read threw here would stay unscaled for as long
  // as it lives. Neither of these two reads the pane or its definition, so neither can fail.
  clearFallbackGrace(webViewId);
  startFallbackGrace(webViewId);
  // The React `onLoad` handler this runs from is a synthetic event handler, which no error boundary
  // catches, and a late load during teardown reads a definition that is no longer there.
  try {
    const definition = deps.getDefinition(webViewId);
    // Neither of these waits a grace out: a URL pane is scaled whole from the start
    // ({@link mayScaleWholeIframe} always allows one), and a pane with no definition left has
    // nothing to scale.
    if (!definition || definition.contentType === WEB_VIEW_CONTENT_TYPE.URL)
      clearFallbackGrace(webViewId);
    pushContentZoom(webViewId);
  } catch (e) {
    logger.warn(
      `Content zoom: could not apply content zoom to web view ${webViewId}. ${getErrorMessage(e)}`,
    );
  }
}

/**
 * `undefined` marks a failed read, distinct from a genuinely empty record.
 *
 * Entries naming a project that no longer exists are kept. They are inert — a pane is matched to
 * its levels by an exact kind and identity — and bounded at one entry per project, kind and area.
 * Removing them needs a project list known to be COMPLETE, and nothing available to the renderer
 * says that a list is: the lookup answers with the first non-empty snapshot it gets while the data
 * providers are still registering, so a short list would take live projects' levels with it. Open
 * work on PT-4585.
 */
async function readMemory(): Promise<MemoryRecord | undefined> {
  const loadedBeforeTheRead = memoryLoaded;
  try {
    const memory = asMemory(await deps.settings.get('platform.webViewContentZoomMemory'));
    // The subscription this window starts before its first read delivers the current record at
    // once, so it can load the cache while that read is still out — with a record at least as
    // fresh as the one this read carries, which is therefore the one both the cache and the caller
    // keep. Every later read is the current record by definition and simply replaces the cache.
    if (!loadedBeforeTheRead && memoryLoaded) return cachedMemory;
    cachedMemory = memory;
    memoryLoaded = true;
    return memory;
  } catch (e) {
    logger.warn(`Content zoom: could not read memory. ${getErrorMessage(e)}`);
    return undefined;
  }
}

/** `undefined` marks a failed read, distinct from a genuinely empty record. */
async function readTypesWithAreas(): Promise<TypesWithAreasRecord | undefined> {
  try {
    const record = asTypesWithAreas(
      await deps.settings.get('platform.webViewContentZoomTypesWithAreas'),
    );
    cachedTypesWithAreas = record;
    typesWithAreasLoaded = true;
    return record;
  } catch (e) {
    logger.warn(`Content zoom: could not read the type record. ${getErrorMessage(e)}`);
    return undefined;
  }
}

/** Enhanced Resources' definition carries no `projectId`; its stable identity is `state.resourceId`. */
function resourceIdFromState(
  definition: Pick<SavedWebViewDefinition, 'state'>,
): string | undefined {
  const value = definition.state?.resourceId;
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

type MemoryIdentity = { kind: ContentZoomKind; identity: string };

function memoryIdentityFor(
  definition: Pick<SavedWebViewDefinition, 'webViewType' | 'projectId' | 'state'>,
): MemoryIdentity | undefined {
  const kind = getContentZoomKind(definition.webViewType);
  if (!kind) return undefined;
  // Project ids are case-insensitive and reach a definition from sources that disagree about
  // casing, so every key this window writes folds them the same way the rest of the platform does.
  // A `state.resourceId` is not a project id and is left exactly as the view wrote it.
  const identity = definition.projectId
    ? normalizeProjectId(definition.projectId)
    : resourceIdFromState(definition);
  if (!identity) return undefined;
  return { kind, identity };
}

/** Every level `memory` remembers for one pane's kind and identity, keyed by area id. */
function collectMemoryLevelsFor(memory: MemoryRecord, id: MemoryIdentity): Levels {
  const levels: Levels = {};
  Object.entries(memory).forEach(([key, level]) => {
    const parsed = parseContentZoomMemoryKey(key);
    if (parsed && parsed.kind === id.kind && parsed.identity === id.identity)
      levels[parsed.areaId] = level;
  });
  return levels;
}

/**
 * {@link collectMemoryLevelsFor}, minus any area this window has an unresolved memory write of its
 * own for: one still pending in {@link pendingMemoryWrites} whose value disagrees with what
 * {@link cachedMemory} holds — a debounced local edit {@link cachedMemory} has not caught up with yet
 * — or one this window gave up on ({@link givenUpMemoryWrites}) whose superseded value is still what
 * {@link cachedMemory} holds. {@link syncSiblingsFromMemory} applies the identical per-key check
 * while patching a sibling; {@link seedFromMemory} needs the same guard on the areas it reads before
 * writing a pane's state wholesale, so a re-seed reached while this window's own delete is still in
 * flight cannot read `cachedMemory`'s stale, not-yet-overwritten value back as "still remembered".
 */
function settledMemoryLevelsFor(id: MemoryIdentity): Levels {
  const levels: Levels = {};
  Object.entries(cachedMemory).forEach(([key, remembered]) => {
    const parsed = parseContentZoomMemoryKey(key);
    if (!parsed || parsed.kind !== id.kind || parsed.identity !== id.identity) return;
    if (pendingMemoryWrites.has(key) && pendingMemoryWrites.get(key) !== remembered) return;
    const givenUp = givenUpMemoryWrites.get(key);
    if (givenUp && remembered === givenUp.superseded) return;
    levels[parsed.areaId] = remembered;
  });
  return levels;
}

function memoryKeyFor(
  definition: Pick<SavedWebViewDefinition, 'webViewType' | 'projectId' | 'state'>,
  areaId: ContentZoomAreaId,
): string | undefined {
  const id = memoryIdentityFor(definition);
  return id ? buildContentZoomMemoryKey(id.kind, id.identity, areaId) : undefined;
}

/**
 * Serializes every change to the memory setting behind one promise chain: a transaction reads the
 * current record, lets `mutate` compute the next one from a private copy, and writes only when
 * `mutate` reports a change by returning it (an unchanged record returns `undefined`, and so does a
 * failed read — nothing is ever written from a read that didn't actually succeed). Queuing onto
 * `memoryChain` rather than reading independently means two overlapping transactions apply in order
 * against the latest write instead of both starting from the same stale snapshot. Errors are caught
 * and logged here so one failed transaction never stops the next from running.
 *
 * `mutate` runs once, after that read and immediately before the write, so a caller may read
 * whatever state it draws on at that moment rather than having to capture it before the transaction
 * was queued.
 */
function enqueueMemoryTransaction(
  mutate: (memory: MemoryRecord) => MemoryRecord | undefined,
): Promise<MemoryTransactionOutcome> {
  const previous = memoryChain;
  const transaction = (async (): Promise<MemoryTransactionOutcome> => {
    await previous;
    try {
      const memory = await readMemory();
      if (!memory) return 'failed';
      const next = mutate({ ...memory });
      if (!next) return 'unchanged';
      await deps.settings.set('platform.webViewContentZoomMemory', next);
      cachedMemory = next;
      return 'written';
    } catch (e) {
      logger.warn(`Content zoom: could not write memory. ${getErrorMessage(e)}`);
      return 'failed';
    }
  })();
  memoryChain = (async () => {
    await transaction;
  })();
  return transaction;
}

/**
 * Serializes every change to the type record the same way {@link enqueueMemoryTransaction} does for
 * memory, and behind its own chain ({@link typesChain}) so the two kinds of write never wait on each
 * other.
 */
function enqueueTypesWithAreasTransaction(
  mutate: (record: TypesWithAreasRecord) => TypesWithAreasRecord | undefined,
): Promise<MemoryTransactionOutcome> {
  const previous = typesChain;
  const transaction = (async (): Promise<MemoryTransactionOutcome> => {
    await previous;
    try {
      const record = await readTypesWithAreas();
      if (!record) return 'failed';
      const next = mutate({ ...record });
      if (!next) return 'unchanged';
      await deps.settings.set('platform.webViewContentZoomTypesWithAreas', next);
      cachedTypesWithAreas = next;
      return 'written';
    } catch (e) {
      logger.warn(`Content zoom: could not write the type record. ${getErrorMessage(e)}`);
      return 'failed';
    }
  })();
  typesChain = (async () => {
    await transaction;
  })();
  return transaction;
}

/**
 * Forgets the edits a finished flush carried, leaving behind any key a newer edit has changed since
 * the transaction applied it — that one is a pending edit of its own and still needs a write.
 */
function clearStoredMemoryWrites(stored: Map<string, number | undefined>): void {
  stored.forEach((level, key) => {
    if (pendingMemoryWrites.has(key) && pendingMemoryWrites.get(key) === level)
      pendingMemoryWrites.delete(key);
  });
}

/**
 * Applies every pending edit as one transaction against the latest stored memory, so a debounced
 * burst becomes a single write. Safe to call with nothing pending.
 *
 * The edits stay pending for the whole round trip and are forgotten only once the transaction says
 * they are stored. That is what {@link syncSiblingsFromMemory} reads to tell an echo that predates a
 * local edit from a real change, and it is what lets a failed attempt be tried again instead of
 * being dropped with the pane's state already changed. A run of {@link MAX_MEMORY_FLUSH_ATTEMPTS}
 * failures gives the edits up rather than retrying forever, which would hold the echo guard open
 * for the rest of the session.
 *
 * What a flush writes is what is pending when it applies. The edits are read inside the
 * transaction's `mutate`, which runs after the stored record has been read, rather than when the
 * flush was scheduled: an edit made to the same key while that read was in flight is carried by
 * this write instead of the next one. Reading them earlier would send the older level to the
 * setting first and into {@link cachedMemory} with it, so sibling panes in other windows — and a
 * pane opened before the following flush, which seeds from that cache — would show a level one edit
 * out of date until then.
 */
async function flushMemoryWrites(): Promise<void> {
  if (pendingMemoryWrites.size === 0) return;
  // The edits this flush is answerable for, below and in the give-up warning. It starts as what is
  // pending now because a transaction whose read fails never reaches `mutate`; one that gets that
  // far replaces it with what is pending at that moment, which is what it actually stores.
  let flushing = new Map(pendingMemoryWrites);
  const outcome = await enqueueMemoryTransaction((memory) => {
    flushing = new Map(pendingMemoryWrites);
    let changed = false;
    flushing.forEach((level, key) => {
      if (level === undefined) {
        if (key in memory) {
          delete memory[key];
          changed = true;
        }
      } else if (memory[key] !== level) {
        memory[key] = level;
        changed = true;
      }
    });
    return changed ? memory : undefined;
  });
  if (outcome !== 'failed') {
    memoryFlushFailures = 0;
    clearStoredMemoryWrites(flushing);
    // The setting carries these keys now, so nothing about them is owed special treatment.
    flushing.forEach((_level, key) => givenUpMemoryWrites.delete(key));
    return;
  }
  memoryFlushFailures += 1;
  if (memoryFlushFailures < MAX_MEMORY_FLUSH_ATTEMPTS) {
    // The edits are still pending, so the re-scheduled flush carries them.
    flushMemoryWritesDebounced().catch(() => {});
    return;
  }
  memoryFlushFailures = 0;
  clearStoredMemoryWrites(flushing);
  // `pendingMemoryWrites` is the echo guard as well as the retry queue, so dropping these keys
  // would leave the next emission of the level this window failed to replace looking like news
  // and undo the user's zoom. Each key that no newer edit has re-pended is recorded instead.
  flushing.forEach((_level, key) => {
    if (pendingMemoryWrites.has(key)) return;
    givenUpMemoryWrites.set(key, { superseded: cachedMemory[key] });
  });
  logger.warn(
    `Content zoom: giving up on ${flushing.size} memory edit(s) after ${MAX_MEMORY_FLUSH_ATTEMPTS} failed attempts.`,
  );
}

/**
 * Records one area's level as a pending memory edit and (re)starts the debounce window, so a burst
 * of adjustments — a wheel gesture, keyboard auto-repeat — coalesces into one write per key instead
 * of one round trip per step.
 */
function writeMemory(
  definition: Pick<SavedWebViewDefinition, 'webViewType' | 'projectId' | 'state'>,
  areaId: ContentZoomAreaId,
  level: number | undefined,
): void {
  const key = memoryKeyFor(definition, areaId);
  if (!key) return;
  // A new edit supersedes a given-up one whichever way it goes, so the record of that older
  // attempt has nothing left to protect.
  givenUpMemoryWrites.delete(key);
  pendingMemoryWrites.set(key, level);
  // A rejection here only ever means a test reset canceled this write; nothing else awaits it.
  flushMemoryWritesDebounced().catch(() => {});
}

/**
 * Test seam only. Writes every deferred pane level and memory edit now and waits for the memory
 * transaction chain to settle.
 */
// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
export async function __flushContentZoomWritesForTesting(): Promise<void> {
  flushOwnLevelWrites();
  await flushMemoryWritesDebounced.flush();
  await memoryChain;
  await typesChain;
}

/**
 * Writes a pane's pending levels into its definition state; an empty map is removed entirely.
 *
 * The levels stay pending until a write lands, so a write that did not land is tried again — by the
 * next edit of the pane, by the sibling sync, or by the unload flush — rather than being dropped
 * with the level the user chose. {@link effectiveOwnLevels} reads them meanwhile, so the pane goes
 * on showing that level while its definition lags behind it.
 *
 * Commits only under the identity the write was chosen for. The pane's CURRENT identity is compared
 * against the identity the pending write was recorded with (see {@link pendingOwnLevelWrites}), and
 * any mismatch drops the write instead of committing it — a transition between two resolvable
 * identities, a write chosen with no identity whose pane has since resolved one, or a write chosen
 * under a resolvable identity whose pane has since become unable to resolve one: in every case the
 * pane has moved on since the write was chosen (a re-point {@link reseedIfIdentityChanged} has not
 * yet caught, because no stamp existed for it to compare against), and writing the old level now
 * would misattribute it to whatever identity — or lack of one — is current. The pane is left to
 * re-seed itself from its next fresh area report, which reads what the identity it shows now
 * actually remembers. The one case that is not a mismatch is a write chosen with no identity whose
 * pane still has none: nothing about the pane has changed, so it commits exactly as it always did.
 *
 * A failure anywhere in here — the definition read included, which throws once the dock layout is
 * gone — is logged and reported as `false` rather than left to propagate: this runs from a burst's
 * debounce timer and from the `beforeunload` flush, where a throw would either have no handler at
 * all or would stop the memory flush that runs right after it.
 */
function commitOwnLevels(webViewId: WebViewId): boolean {
  const pending = pendingOwnLevelWrites.get(webViewId);
  if (!pending) return true;
  try {
    const definition = deps.getDefinition(webViewId);
    if (!definition) {
      // The pane is gone, so there is no definition left to write the levels into and no later
      // attempt that could find one; keeping them pending would only hold a closed pane's entry.
      pendingOwnLevelWrites.delete(webViewId);
      return false;
    }
    const currentId = memoryIdentityFor(definition);
    const currentStamp = currentId ? identityStampFor(currentId) : undefined;
    if (pending.identity !== currentStamp) {
      pendingOwnLevelWrites.delete(webViewId);
      return true;
    }
    const { levels } = pending;
    const state: Record<string, unknown> = { ...(definition.state ?? {}) };
    // The identity stamp lives exactly as long as the levels it belongs to: a pane that has levels
    // always says which project they were chosen for, and a pane that gives them up keeps no stamp
    // that a later re-point would judge the next project's levels against — a stamp with no levels
    // behind it would tell `seedFromMemory` this pane is already reconciled with its identity and
    // stop it from ever restoring a level a sibling remembers for that same, still-current identity.
    if (Object.keys(levels).length === 0) {
      delete state[CONTENT_ZOOM_LEVELS_STATE_KEY];
      delete state[CONTENT_ZOOM_IDENTITY_STATE_KEY];
    } else {
      state[CONTENT_ZOOM_LEVELS_STATE_KEY] = levels;
      if (currentStamp !== undefined) state[CONTENT_ZOOM_IDENTITY_STATE_KEY] = currentStamp;
      else delete state[CONTENT_ZOOM_IDENTITY_STATE_KEY];
    }
    if (!deps.updateDefinition(webViewId, { state })) return false;
  } catch (e) {
    logger.warn(
      `Content zoom: could not store the levels of web view ${webViewId}. ${getErrorMessage(e)}`,
    );
    return false;
  }
  pendingOwnLevelWrites.delete(webViewId);
  return true;
}

/**
 * Gives a pane its next levels. The FIRST edit of a burst is written at once — that write is what
 * makes the level survive a crash, since the layout save it triggers writes synchronously to local
 * storage — and every further edit inside {@link OWN_LEVEL_WRITE_DEBOUNCE_MS} of it is deferred into
 * the open window and written once when it closes. Reads go through {@link effectiveOwnLevels}
 * meanwhile, so what the pane shows is always the newest level.
 *
 * Also records the pane's identity right now alongside the levels (see
 * {@link pendingOwnLevelWrites}), so a later {@link seedFromMemory} or {@link commitOwnLevels} call
 * can tell this write apart from one that predates a re-point.
 */
function setOwnLevels(webViewId: WebViewId, levels: Levels): boolean {
  const currentDefinition = deps.getDefinition(webViewId);
  const currentId = currentDefinition ? memoryIdentityFor(currentDefinition) : undefined;
  pendingOwnLevelWrites.set(webViewId, {
    levels,
    identity: currentId ? identityStampFor(currentId) : undefined,
  });
  if (ownLevelWriteTimers.has(webViewId)) return true;
  if (!commitOwnLevels(webViewId)) return false;
  ownLevelWriteTimers.set(
    webViewId,
    setTimeout(() => {
      ownLevelWriteTimers.delete(webViewId);
      commitOwnLevels(webViewId);
    }, OWN_LEVEL_WRITE_DEBOUNCE_MS),
  );
  return true;
}

/** Closes every open burst window and writes what it still holds. */
function flushOwnLevelWrites(): void {
  ownLevelWriteTimers.forEach((timer) => clearTimeout(timer));
  ownLevelWriteTimers.clear();
  [...pendingOwnLevelWrites.keys()].forEach((webViewId) => commitOwnLevels(webViewId));
}

/** Sets or deletes one area's level among the pane's levels. */
function writeOwnLevel(
  definition: SavedWebViewDefinition,
  areaId: ContentZoomAreaId,
  level: number | undefined,
): void {
  const levels: Levels = { ...effectiveOwnLevels(definition) };
  if (level === undefined) delete levels[areaId];
  else levels[areaId] = level;
  setOwnLevels(definition.id, levels);
}

/**
 * Ctrl+`+` / Ctrl+`-` (and wheel): give one area of the target pane its own level, one step from
 * what it shows. The bootstrap already targets an area for keyboard and wheel; without an area id
 * (tab menu, macOS menu, extensions) the pane's active area is used. A pane that reported no areas
 * ignores the request, which is the gate the macOS and tab-menu paths need. A non-finite
 * `deltaSteps` is ignored outright: `adjustZoomFactor` would otherwise clamp it into a spurious
 * in-range level (`NaN` and `Infinity` both survive `clampZoom`'s comparisons unchanged or clamped
 * to an edge) and write that level as if the user had actually asked for it.
 */
export async function adjustContentZoom(
  webViewId: WebViewId | undefined,
  deltaSteps: number,
  areaId?: ContentZoomAreaId,
): Promise<void> {
  if (!Number.isFinite(deltaSteps)) return;
  const target = resolveContentZoomTarget(webViewId);
  if (!target) return;
  const area = resolveContentZoomArea(target, areaId);
  if (!area) return;
  const defaultZoom = await getDefaultZoom();
  // Read the definition after the await: the pane may have been closed, moved or updated while the
  // default was being fetched, and the write below must start from what it holds now.
  const definition = deps.getDefinition(target);
  if (!definition) return;
  const current = effectiveOwnLevels(definition)[area] ?? defaultZoom;
  const next = adjustZoomFactor(current, deltaSteps);
  if (next === current) return;
  // The pane shows the level regardless of whether this write reaches the definition:
  // pushContentZoom reads effectiveOwnLevels, and a level that did not get stored stays pending for
  // the next write.
  writeOwnLevel(definition, area, next);
  writeMemory(definition, area, next);
  pushContentZoom(target, { areaId: area, text: formatZoomPercent(next) });
}

/** Ctrl+`0`: one area of the target pane forgets its own level and follows the default again. */
export async function resetContentZoom(
  webViewId: WebViewId | undefined,
  areaId?: ContentZoomAreaId,
): Promise<void> {
  const target = resolveContentZoomTarget(webViewId);
  if (!target) return;
  const area = resolveContentZoomArea(target, areaId);
  if (!area) return;
  const defaultZoom = await getDefaultZoom();
  // Read the definition after the await, for the reason given in `adjustContentZoom`.
  const definition = deps.getDefinition(target);
  if (!definition) return;
  // Only a pane that actually holds its own level for the area has anything to give up — and only
  // then may the shared key go, which every sibling pane of this identity follows.
  if (effectiveOwnLevels(definition)[area] !== undefined) {
    writeOwnLevel(definition, area, undefined);
    writeMemory(definition, area, undefined);
  }
  // The label is read once at initialization, so the factor reaches the pane without waiting on a
  // cross-process request that could also fail after the state was already written.
  pushContentZoom(target, {
    areaId: area,
    text: `${cachedDefaultLabel ?? DEFAULT_LABEL_FALLBACK} · ${formatZoomPercent(defaultZoom)}`,
  });
}

/**
 * State → memory → default, per area. Used by the shard to bake a pane's initial variables into its
 * head. Memory contributes every area remembered for this pane's kind and identity that the state
 * does not already hold. Also resolves whether the pane is expected to mark a zoom area at all,
 * from the type record ({@link expectAreasByWebViewId}), before anything the pane renders can be
 * scaled.
 *
 * Honors the identity stamp the same way {@link seedFromMemory} does: a stored stamp naming another
 * identity means the pane's own levels belong to a project it no longer shows (a reused web view id
 * re-pointed before this bake runs, ahead of the dock update that would re-seed it) — they are
 * skipped entirely rather than baked, and memory for the identity shown now fills every area
 * instead. No stamp at all is the ordinary not-yet-stamped case and leaves the own levels standing,
 * merged with memory exactly as usual.
 */
export async function getInitialContentZoomForWebView(
  webView: Pick<SavedWebViewDefinition, 'id' | 'webViewType' | 'projectId' | 'state'>,
): Promise<{ defaultZoom: number; levels: Levels }> {
  const id = memoryIdentityFor(webView);
  const storedStamp = storedIdentityStamp(webView);
  const ownLevelsStale =
    storedStamp !== undefined && storedStamp !== (id ? identityStampFor(id) : undefined);
  const levels: Levels = ownLevelsStale ? {} : { ...effectiveOwnLevels(webView) };
  if (id) {
    // Initialization pre-warms the cache and the memory subscription keeps it current, so opening
    // a pane does not wait on a settings round trip — except a pane opened before that first read
    // lands, or after one failed, which reads for itself rather than seeding from an empty record.
    const memory = memoryLoaded ? cachedMemory : ((await readMemory()) ?? {});
    Object.entries(collectMemoryLevelsFor(memory, id)).forEach(([areaId, level]) => {
      if (levels[areaId] === undefined) levels[areaId] = level;
    });
  }
  // Resolved here rather than at iframe load because this is already awaited before the pane's HTML
  // is built, so the answer is in place before anything can paint. A pane whose view runs no scripts
  // never reaches this function, and is treated as marking none, which is correct: it can never run
  // the bootstrap and so can never report.
  const record = typesWithAreasLoaded ? cachedTypesWithAreas : ((await readTypesWithAreas()) ?? {});
  expectAreasByWebViewId.set(webView.id, record[webView.webViewType] === true);
  return { defaultZoom: await getDefaultZoom(), levels };
}

/**
 * One pane's push failing — a thrown definition read, or a detached iframe — must not stop the
 * panes after it in the loop from picking up the changed default.
 */
function repushAllPanes(): void {
  deps.getAllOpenDefinitions().forEach((definition) => {
    try {
      pushContentZoom(definition.id);
    } catch (e) {
      logger.warn(
        `Content zoom: could not re-push web view ${definition.id}. ${getErrorMessage(e)}`,
      );
    }
  });
}

/**
 * Panes of the same kind and identity share one level per area. The memory setting is the shared
 * truth: whenever it changes — from this window or another — every open pane whose entries changed
 * is brought in line, silently (no indicator; the pane the user acted on already showed one).
 *
 * Only the areas one of the two records names are touched. An area whose key is in `memory` takes
 * that level; an area whose key `previousMemory` had and `memory` no longer does gives up its own
 * level, which is how a reset in one pane returns its siblings with it. An area named by neither is
 * left exactly as it is: a key that was never there is no evidence that a pane holding its own
 * level should give it up, and treating it as such would wipe the level of every restored pane the
 * moment the subscription delivers its first value.
 *
 * Hidden panes need no special handling here: writing a level and pushing its variable is
 * data-driven and applies with no layout, so an inactive tab is already in line when it is shown.
 *
 * @returns `true` when every pane that needed a change took it, so this delta is fully applied;
 *   `false` when at least one pane's write did not land or its turn threw, which leaves the delta
 *   still owed to that pane. Either way every remaining pane is visited, and a pane that throws is
 *   logged and stepped over: one pane's failure is not the others'.
 */
function syncSiblingsFromMemory(memory: MemoryRecord, previousMemory: MemoryRecord): boolean {
  let everyPaneTookItsUpdate = true;
  deps.getAllOpenDefinitions().forEach((definition) => {
    try {
      const id = memoryIdentityFor(definition);
      if (!id) return;
      const areas = new Set([
        ...Object.keys(collectMemoryLevelsFor(memory, id)),
        ...Object.keys(collectMemoryLevelsFor(previousMemory, id)),
      ]);
      // One read and one write per pane: every write reconciles the whole dock layout, so a pane
      // whose two areas both moved must not cost two of them.
      const current = deps.getDefinition(definition.id) ?? definition;
      const currentStamp = storedIdentityStamp(current);
      if (currentStamp !== undefined && currentStamp !== identityStampFor(id)) {
        // This pane's stamp names a different project than the one this delta is for — its own
        // re-seed is owed first (missed because memory hadn't loaded, or because this ran before
        // onDidUpdateWebView registered), not a patch of another project's level onto it.
        reseedIfIdentityChanged(definition.id);
        // The re-seed's outcome is not visible from here — it may be a deliberate no-op, e.g. a
        // pending own-level write already chosen for this identity outranking memory — so this
        // pane's catch-up is unconfirmed. Leave the delta owed rather than letting the walk's
        // record advance past whatever it still owes this pane.
        everyPaneTookItsUpdate = false;
        return;
      }
      const levels: Levels = { ...effectiveOwnLevels(current) };
      let changed = false;
      areas.forEach((areaId) => {
        const key = buildContentZoomMemoryKey(id.kind, id.identity, areaId);
        const remembered = isValidZoomFactor(memory[key]) ? memory[key] : undefined;
        // An echo carrying something other than what this window has pending for the key predates
        // that edit, so applying it would revert the area until the newer write's own echo arrives.
        // An echo carrying exactly the pending value IS that write coming back, and the siblings
        // need it: the setting's echo and the write's own resolution are not ordered against each
        // other, so it can arrive while the edit is still pending.
        if (pendingMemoryWrites.has(key) && pendingMemoryWrites.get(key) !== remembered) return;
        const givenUp = givenUpMemoryWrites.get(key);
        if (givenUp) {
          // The level this window failed to replace is still what the setting holds; it is not
          // news, and applying it would undo the zoom the user chose.
          if (remembered === givenUp.superseded) return;
          givenUpMemoryWrites.delete(key);
        }
        if (levels[areaId] === remembered) return;
        if (remembered === undefined) delete levels[areaId];
        else levels[areaId] = remembered;
        changed = true;
      });
      // A pane with an own-level write still pending for the identity it shows RIGHT NOW is written
      // even when this delta asks for nothing new: those are the levels it actually shows and they
      // still owe a write, so the change that memory delivers next is also this pane's next chance
      // to store them. A pending write recorded for another identity does not count — it predates a
      // re-point this pane's stamp has not caught up to yet, and forcing it through here would
      // misattribute a stale project's level to the identity memory just delivered a change for.
      const pendingForCurrentIdentity = pendingOwnLevelWrites.get(definition.id);
      const owesAWrite =
        pendingForCurrentIdentity !== undefined &&
        pendingForCurrentIdentity.identity === identityStampFor(id);
      if (!changed && !owesAWrite) return;
      // The sibling shows the level whether or not the write reached its definition, for the same
      // reason the acting pane does: the push reads `effectiveOwnLevels`, and a level that did not
      // get stored stays pending there for the next write to carry.
      const stored = setOwnLevels(definition.id, levels);
      pushContentZoom(definition.id);
      if (!stored) everyPaneTookItsUpdate = false;
    } catch (e) {
      logger.warn(
        `Content zoom: could not bring web view ${definition.id} in line with memory. ${getErrorMessage(e)}`,
      );
      everyPaneTookItsUpdate = false;
    }
  });
  return everyPaneTookItsUpdate;
}

/**
 * Idempotent. Wires this window for zoom — both settings subscriptions, web-view updates and the
 * unload flush — and reads the default and the remembered levels.
 *
 * @param shardDeps The renderer's composition root supplies the web-view and window shards'
 *   `getDefinition`, `updateDefinition`, `getAllOpenDefinitions`, `onDidUpdateWebView` and
 *   `getLastFocusedTabId` here, plus `isWindowInputBlocked` from the window-input-blocked util,
 *   rather than this module importing any of them directly — each would create an import cycle back
 *   through the shards. Merged into the deps in use whenever provided, even on a later call after
 *   the first initialization already ran.
 */
export function initializeContentZoomService(
  shardDeps?: Pick<
    ContentZoomDeps,
    | 'getDefinition'
    | 'updateDefinition'
    | 'getAllOpenDefinitions'
    | 'onDidUpdateWebView'
    | 'getLastFocusedTabId'
    | 'isWindowInputBlocked'
  >,
): Promise<void> {
  if (shardDeps) deps = { ...deps, ...shardDeps };
  if (initialized) return initialized;
  initialized = (async () => {
    // Registration first: a slow settings or localization round trip must not leave this window
    // unable to hear a Settings change, bring a sibling pane in line, or flush a pending edit when
    // it closes. All three reads are still awaited below, so initialization still resolves only
    // once the default, the remembered levels and the type record are in hand.
    //
    // This event carries every update to a web-view definition in this window: a pane adopted from
    // another window arriving with its state, every `useWebViewState` write an extension makes,
    // every per-pane scroll-group reference write. Most of them leave zoom alone, and the push is
    // deliberately run for them anyway rather than kept behind a dirty check: it writes the same
    // CSS variables the pane already has, reads no geometry and makes no request, and a check that
    // compared the levels would have to be right about every other way a pane's variables can go
    // stale to avoid suppressing a push the pane needed.
    deps.onDidUpdateWebView(({ webView }) => {
      // The emitter behind this event is not isolated, so a throw here aborts its whole subscriber
      // loop and every later subscriber misses the update — the cost of this one reaches well past
      // zoom, which is why it is guarded even though the read only fails during teardown.
      try {
        if (!deps.getDefinition(webView.id)) return;
        // This is where a pane's identity changes: a view re-pointed at another project keeps its
        // web view id and updates its definition, so the levels it carries over are checked against
        // that new identity before they are pushed. The write a re-seed makes comes back through
        // this same event, where the stamp it just wrote ends the round. The re-seed carries its own
        // guard, like `commitOwnLevels` and `repushAllPanes`: a throwing re-seed write must not skip
        // the push below, which keeps the pane's variables current even when its own identity check
        // could not be stored.
        try {
          reseedIfIdentityChanged(webView.id);
        } catch (e) {
          logger.warn(
            `Content zoom: could not re-seed web view ${webView.id}. ${getErrorMessage(e)}`,
          );
        }
        pushContentZoom(webView.id);
      } catch (e) {
        logger.warn(
          `Content zoom: could not push the update for web view ${webView.id}. ${getErrorMessage(e)}`,
        );
      }
    });
    // Gives a debounced edit still in flight when the window closes one last chance to reach the
    // setting rather than being silently dropped. Best effort only: the flush reads the stored
    // record before writing it back, and neither round trip can finish while the window is
    // unloading, so the last edits of a session can still be lost. One listener per window; a test
    // reset removes it so a later re-initialization can register its own.
    if (typeof window !== 'undefined' && !beforeUnloadListener) {
      beforeUnloadListener = () => {
        flushOwnLevelWrites();
        flushMemoryWritesDebounced.flush();
      };
      window.addEventListener('beforeunload', beforeUnloadListener);
    }
    // Started, not awaited — a subscription delivers its current value immediately, so a callback
    // may run before the reads below resolve; that only ever fills a cache from a value at least as
    // fresh as what the read would carry.
    const subscriptions = Promise.all([
      (async () => {
        try {
          await deps.settings.subscribe('platform.webViewContentZoom', (value) => {
            if (isPlatformError(value)) {
              logger.warn(`Content zoom: error reading the default: ${getErrorMessage(value)}`);
              return;
            }
            cachedDefault = asNumber(value);
            repushAllPanes();
          });
        } catch (e) {
          logger.warn(`Content zoom: could not subscribe to the default. ${getErrorMessage(e)}`);
        }
      })(),
      (async () => {
        try {
          await deps.settings.subscribe('platform.webViewContentZoomMemory', (value) => {
            if (isPlatformError(value)) {
              logger.warn(`Content zoom: error reading memory: ${getErrorMessage(value)}`);
              return;
            }
            const memory = asMemory(value);
            const previousMemory = lastSyncedMemory;
            cachedMemory = memory;
            memoryLoaded = true;
            try {
              // Only a walk in which every pane took its update may advance the record the next
              // delta is computed against: a pane whose write did not land is retried against the
              // same delta on the next memory change, because the deletion half of the delta exists
              // nowhere else. A throw leaves the record where it was for the same reason.
              if (syncSiblingsFromMemory(memory, previousMemory)) lastSyncedMemory = memory;
            } catch (e) {
              logger.warn(
                `Content zoom: could not bring sibling panes in line. ${getErrorMessage(e)}`,
              );
            }
          });
        } catch (e) {
          logger.warn(`Content zoom: could not subscribe to memory. ${getErrorMessage(e)}`);
        }
      })(),
      (async () => {
        try {
          await deps.settings.subscribe('platform.webViewContentZoomTypesWithAreas', (value) => {
            if (isPlatformError(value)) {
              logger.warn(`Content zoom: error reading the type record: ${getErrorMessage(value)}`);
              return;
            }
            cachedTypesWithAreas = asTypesWithAreas(value);
            typesWithAreasLoaded = true;
          });
        } catch (e) {
          logger.warn(`Content zoom: could not subscribe to the type record. ${getErrorMessage(e)}`);
        }
      })(),
    ]);
    // The first pane's head variables need all three, and none of the reads depends on another.
    // Pre-warming memory and the type record here is also what keeps
    // `getInitialContentZoomForWebView` off a settings round trip when a read fails: without it,
    // every eligible pane retries it.
    await Promise.all([getDefaultZoom(), readMemory(), readTypesWithAreas()]);
    try {
      cachedDefaultLabel = await deps.localize('%webView_contentZoom_indicator_default%');
    } catch (e) {
      cachedDefaultLabel = DEFAULT_LABEL_FALLBACK;
      logger.warn(
        `Content zoom: could not read the reset indicator's label; using "${DEFAULT_LABEL_FALLBACK}". ${getErrorMessage(e)}`,
      );
    }
    // So the promise this function returns still means "fully wired".
    await subscriptions;
  })();
  return initialized;
}
