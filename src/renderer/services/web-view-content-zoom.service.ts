import { getWebViewIframe } from '@renderer/services/overlays/overlay-coordinates';
import {
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_LEVELS_STATE_KEY,
  getContentZoomCssVariable,
  getContentZoomKind,
} from '@shared/models/content-zoom.model';
import {
  SavedWebViewDefinition,
  WEB_VIEW_CONTENT_TYPE,
  WebViewId,
} from '@shared/models/web-view.model';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { settingsService } from '@shared/services/settings.service';
import {
  adjustZoomFactor,
  buildContentZoomMemoryKey,
  ContentZoomKind,
  DEFAULT_ZOOM_FACTOR,
  formatZoomPercent,
  isValidContentZoomAreaId,
  isValidZoomFactor,
  parseContentZoomMemoryKey,
} from '@shared/utils/content-zoom.util';
import {
  getErrorMessage,
  isPlatformError,
  PlatformError,
  Unsubscriber,
} from 'platform-bible-utils';

/** What the injected bootstrap exposes on a web view's `window` (see the bootstrap script). */
type ContentZoomWindowApi = { showIndicator: (areaId: string, text: string) => void };

/** Area id → level. The shape stored under `CONTENT_ZOOM_LEVELS_STATE_KEY`. */
type Levels = { [areaId: string]: number };

type MemoryRecord = { [key: string]: number };

type SettingKey = 'platform.webViewContentZoom' | 'platform.webViewContentZoomMemory';

type ContentZoomDeps = {
  getIframe: (webViewId: string) => HTMLIFrameElement | null;
  getDefinition: (webViewId: string) => SavedWebViewDefinition | undefined;
  updateDefinition: (webViewId: string, update: { state: Record<string, unknown> }) => boolean;
  getAllOpenDefinitions: () => SavedWebViewDefinition[];
  onDidUpdateWebView: (
    callback: (event: { webView: SavedWebViewDefinition }) => void,
  ) => Unsubscriber;
  getLastFocusedTabId: () => string | undefined;
  settings: {
    get: (key: SettingKey) => Promise<unknown>;
    set: (key: SettingKey, value: unknown) => Promise<unknown>;
    subscribe: (
      key: SettingKey,
      callback: (value: unknown | PlatformError) => void,
    ) => Promise<() => Promise<unknown> | unknown>;
  };
  localize: (localizeKey: `%${string}%`) => Promise<string>;
  listProjects: () => Promise<{ id: string }[]>;
};

/**
 * Whether {@link warnShardDepsNotConfigured} has already logged. These five functions come from the
 * renderer's two window-scoped shards and only exist once the composition root
 * (`src/renderer/index.tsx`) calls {@link initializeContentZoomService} with them; a call routed
 * through one of the stubs below before that happens is worth one warning, not one per call.
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
  // The five functions below come from the renderer's web-view and window shards. Importing them
  // here directly would create an import cycle (both shards import from this module), so the
  // renderer's composition root injects its own functions through `initializeContentZoomService`
  // instead; these stubs cover the window between module load and that call.
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
  settings: {
    get: (key) => settingsService.get(key),
    set: (key, value) =>
      key === 'platform.webViewContentZoom'
        ? settingsService.set(key, asNumber(value))
        : settingsService.set(key, asMemory(value)),
    subscribe: (key, callback) => settingsService.subscribe(key, callback),
  },
  localize: (localizeKey) => localizationService.getLocalizedString({ localizeKey }),
  listProjects: () => projectLookupService.getMetadataForAllProjects(),
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
 * The memory record the sibling sync last reconciled against, so it can tell an entry that was
 * deleted from an entry that was never there. Only the memory subscription advances it — a local
 * write must not, or this window would have no record of the entry the write removed and would
 * leave its own sibling panes at the level the write just gave up.
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

/** How long a per-key memory edit waits for more edits to the same or another key before it flushes. */
const MEMORY_WRITE_DEBOUNCE_MS = 250;

/** Memory edits not yet flushed to the setting, keyed by memory key; `undefined` means delete. */
const pendingMemoryWrites = new Map<string, number | undefined>();

let memoryWriteTimer: ReturnType<typeof setTimeout> | undefined;

/** The registered `beforeunload` flush listener, if any; guards against registering a second one. */
let beforeUnloadListener: (() => void) | undefined;

/** Test seam only. Production code never calls this. */
// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
export function __setContentZoomDepsForTesting(partial: Partial<ContentZoomDeps>): void {
  deps = { ...deps, ...partial };
  cachedDefault = undefined;
  cachedMemory = {};
  memoryLoaded = false;
  lastSyncedMemory = {};
  cachedDefaultLabel = undefined;
  initialized = undefined;
  clearAllFallbackGraces();
  pendingMemoryWrites.clear();
  if (memoryWriteTimer !== undefined) {
    clearTimeout(memoryWriteTimer);
    memoryWriteTimer = undefined;
  }
  memoryChain = Promise.resolve();
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
    if (parseContentZoomMemoryKey(key) && isValidZoomFactor(level)) out[key] = level;
  });
  return out;
}

async function getDefaultZoom(): Promise<number> {
  if (cachedDefault !== undefined) return cachedDefault;
  try {
    cachedDefault = asNumber(await deps.settings.get('platform.webViewContentZoom'));
  } catch (e) {
    logger.warn(`Content zoom: could not read the default; using 100 %. ${getErrorMessage(e)}`);
    cachedDefault = DEFAULT_ZOOM_FACTOR;
  }
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

/** Explicit id → the window's last focused tab → nothing. Pure; exported for tests. */
export function resolveContentZoomTarget(
  explicitWebViewId: string | undefined,
): WebViewId | undefined {
  if (explicitWebViewId) return explicitWebViewId;
  return deps.getLastFocusedTabId();
}

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

/**
 * Explicit area (must be one the pane reported) → the pane's active area → its first area →
 * `undefined` for a pane without areas. Exported for tests.
 */
export function resolveContentZoomArea(
  webViewId: WebViewId,
  explicitAreaId: string | undefined,
): string | undefined {
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
 * How long a pane whose bootstrap reported no zoom areas yet may stay unscaled while its content
 * mounts. Scaling the whole iframe is the fallback for a view that marks no area at all; applying
 * it during the moments before an adapted view's React tree has mounted would scale its chrome too,
 * then undo it — a visible jump on every open.
 */
const FALLBACK_GRACE_MS = 1000;

/**
 * Panes whose grace period has passed with no zoom area reported, so the whole-iframe fallback may
 * be applied to them. A later NON-EMPTY report, or a fresh iframe load — including an in-place
 * reload that replaces a pane's content without unmounting it — revokes the grant
 * ({@link clearFallbackGrace}), so a pane whose content is replaced has to earn it again through a
 * fresh grace rather than being scaled instantly. A URL web view is not listed here and does not
 * need to be: it never runs the bootstrap, so it can never report, and {@link mayScaleWholeIframe}
 * lets it through at once.
 */
const fallbackAllowedWebViewIds = new Set<WebViewId>();

/** Running grace timers, one per pane, so a report, a reload, or an unmount can cancel one. */
const fallbackGraceTimers = new Map<WebViewId, ReturnType<typeof setTimeout>>();

/**
 * Cancels a pending grace timer, and revokes an already-granted whole-iframe fallback for the pane.
 * Called on every NON-EMPTY area report and on every iframe load
 * ({@link applyContentZoomForWebView}): either way, whatever grant or pending grace existed belongs
 * to content that is now gone, and a fresh grace has to be earned again before the fallback can
 * apply.
 */
function clearFallbackGrace(webViewId: WebViewId): void {
  const timer = fallbackGraceTimers.get(webViewId);
  if (timer !== undefined) {
    clearTimeout(timer);
    fallbackGraceTimers.delete(webViewId);
  }
  fallbackAllowedWebViewIds.delete(webViewId);
}

/** Test seam only: drops every pending grace timer and everything they have decided. */
function clearAllFallbackGraces(): void {
  fallbackGraceTimers.forEach((timer) => clearTimeout(timer));
  fallbackGraceTimers.clear();
  fallbackAllowedWebViewIds.clear();
}

/**
 * Starts the wait during which a pane with no known areas may still be mounting content that will
 * report some. If the pane still has no area when it elapses, its content is taken to have no zoom
 * area at all and the whole-iframe fallback is applied from then on. Started by a pane's first
 * empty area report ({@link setContentZoomAreas}) and by every non-URL iframe load
 * ({@link applyContentZoomForWebView}, which clears any grant left over from the previous content
 * first, so this always waits out a fresh grace rather than reusing one inherited from that
 * content); idempotent either way, since a grace already pending is left alone.
 */
function startFallbackGrace(webViewId: WebViewId): void {
  if (fallbackAllowedWebViewIds.has(webViewId) || fallbackGraceTimers.has(webViewId)) return;
  fallbackGraceTimers.set(
    webViewId,
    setTimeout(() => {
      fallbackGraceTimers.delete(webViewId);
      if ((areasByWebViewId.get(webViewId) ?? []).length > 0) return;
      fallbackAllowedWebViewIds.add(webViewId);
      pushContentZoom(webViewId);
    }, FALLBACK_GRACE_MS),
  );
}

/** Whether a pane with no zoom areas may be scaled as a whole through its iframe element. */
function mayScaleWholeIframe(webViewId: WebViewId): boolean {
  return (
    fallbackAllowedWebViewIds.has(webViewId) ||
    deps.getDefinition(webViewId)?.contentType === WEB_VIEW_CONTENT_TYPE.URL
  );
}

/**
 * Seeds a newly opened pane's own levels from every area {@link cachedMemory} remembers for its kind
 * and identity, so the areas its bootstrap is about to report start at the level the user chose
 * last time instead of the Settings default. A pane whose state already holds
 * {@link CONTENT_ZOOM_LEVELS_STATE_KEY} — even for a single area — is left alone: the key is never
 * written empty, so holding it at all means the pane already has a level to keep.
 */
function seedFromMemoryOnFirstReport(webViewId: WebViewId): void {
  const definition = deps.getDefinition(webViewId);
  if (!definition) return;
  if (definition.state && CONTENT_ZOOM_LEVELS_STATE_KEY in definition.state) return;
  const id = memoryIdentityFor(definition);
  if (!id) return;
  const levels = collectMemoryLevelsFor(cachedMemory, id);
  if (Object.keys(levels).length === 0) return;
  deps.updateDefinition(definition.id, {
    state: { ...(definition.state ?? {}), [CONTENT_ZOOM_LEVELS_STATE_KEY]: levels },
  });
}

/**
 * Called by the bootstrap (through the parent-bound helper) whenever the set of areas changes. A
 * pane's bootstrap commonly reports no areas at all on its first scan — nothing zoom-marked has
 * rendered yet — and reports again once its content mounts; seeding runs on that first NON-EMPTY
 * report, not merely the first call, so the empty scan itself never counts as "the pane has
 * reported" for seeding purposes.
 */
export function setContentZoomAreas(webViewId: WebViewId, areaIds: string[]): void {
  const valid = areaIds.filter((areaId) => isValidContentZoomAreaId(areaId));
  const previous = areasByWebViewId.get(webViewId);
  if (previous && previous.length === valid.length && previous.every((a, i) => a === valid[i]))
    return;
  if (valid.length > 0) clearFallbackGrace(webViewId);
  else startFallbackGrace(webViewId);
  if ((previous === undefined || previous.length === 0) && valid.length > 0)
    seedFromMemoryOnFirstReport(webViewId);
  areasByWebViewId.set(webViewId, valid);
  pushContentZoom(webViewId);
}

/** Called by the bootstrap whenever the user clicks or focuses inside another area. */
export function setContentZoomActiveArea(webViewId: WebViewId, areaId: string): void {
  if (isValidContentZoomAreaId(areaId)) activeAreaByWebViewId.set(webViewId, areaId);
}

/** Drop everything remembered in this window about a pane (its iframe is gone). */
export function forgetContentZoom(webViewId: WebViewId): void {
  areasByWebViewId.delete(webViewId);
  activeAreaByWebViewId.delete(webViewId);
  unknownAreasLoggedByWebViewId.delete(webViewId);
  clearFallbackGrace(webViewId); // also revokes a whole-iframe fallback grant, if any
}

/**
 * Writes the pane's effective levels into it. With areas: one CSS variable per area (own level,
 * else the default) plus the default variable, and the iframe's own zoom cleared. Without areas (a
 * URL view, or a view that marks none): CSS `zoom` on the iframe element, so the whole view shows
 * at the Settings default — but only once {@link mayScaleWholeIframe} says the pane really has no
 * areas rather than not having mounted its content yet. Areas that hold a level but are not
 * currently rendered still get their variable, so the level is in place when the area appears (the
 * footnotes pane being shown).
 *
 * Hidden panes are handled: rc-dock keeps an inactive tab mounted under `display: none`, and both
 * the variables and the rules that read them are data-driven, so they apply with no layout and are
 * already correct when the tab is shown. Only the indicator needs geometry, and it is passed only
 * for a direct user action, which needs a visible pane; the bootstrap's `cornerOf` still falls back
 * to a fixed corner when every rect it measures is zero.
 */
export function pushContentZoom(
  webViewId: WebViewId,
  indicator?: { areaId: string; text: string },
): void {
  const iframe = deps.getIframe(webViewId);
  if (!iframe) return;
  const defaultZoom = cachedDefault ?? DEFAULT_ZOOM_FACTOR;
  const root = iframe.contentDocument?.documentElement;
  root?.style.setProperty(CONTENT_ZOOM_DEFAULT_CSS_VARIABLE, String(defaultZoom));
  const areas = areasByWebViewId.get(webViewId) ?? [];
  if (areas.length === 0 || !root) {
    // `zoom` predates `setProperty` support for this non-standard property; the named accessor
    // is the form every engine implements for it, including the empty-string clear below.
    if (mayScaleWholeIframe(webViewId)) iframe.style.zoom = String(defaultZoom);
    return; // a view without areas has no per-area action to announce
  }
  iframe.style.zoom = '';
  const own = getOwnLevels(deps.getDefinition(webViewId));
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
 * fallback grace or grant left over from whatever the pane showed before — otherwise a grant the
 * old content earned would still authorize scaling the new content before its own bootstrap gets a
 * chance to report — and drops the pane's last-reported areas, since they described that old
 * content too. For a non-URL pane this then also clears the whole-iframe `zoom` a reload does not
 * reset on its own (it lives on the host `<iframe>` element, not the content a reload replaces), so
 * the new content never renders whole-scaled on the strength of the old grant, before arming a
 * fresh grace exactly as if the pane had just been opened: a pane whose bootstrap never runs at all
 * (an HTML view opened with `allowScripts: false`, say) still eventually gets the whole-iframe
 * fallback, and one that does go on to report an area within the grace still cancels it as usual. A
 * URL pane keeps its immediate fallback and is left out of this reset: {@link pushContentZoom}
 * reapplies it below regardless, since {@link mayScaleWholeIframe} always allows a URL pane.
 */
export function applyContentZoomForWebView(webViewId: WebViewId): void {
  clearFallbackGrace(webViewId);
  areasByWebViewId.delete(webViewId);
  const definition = deps.getDefinition(webViewId);
  if (definition && definition.contentType !== WEB_VIEW_CONTENT_TYPE.URL) {
    startFallbackGrace(webViewId);
    const iframe = deps.getIframe(webViewId);
    if (iframe) iframe.style.zoom = '';
  }
  pushContentZoom(webViewId);
}

/** `undefined` marks a failed read, distinct from a genuinely empty record. */
async function readMemory(): Promise<MemoryRecord | undefined> {
  try {
    const memory = asMemory(await deps.settings.get('platform.webViewContentZoomMemory'));
    cachedMemory = memory;
    memoryLoaded = true;
    return memory;
  } catch (e) {
    logger.warn(`Content zoom: could not read memory. ${getErrorMessage(e)}`);
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
  const identity = definition.projectId ?? resourceIdFromState(definition);
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

function memoryKeyFor(
  definition: Pick<SavedWebViewDefinition, 'webViewType' | 'projectId' | 'state'>,
  areaId: string,
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
 */
function enqueueMemoryTransaction(
  mutate: (memory: MemoryRecord) => MemoryRecord | undefined,
): Promise<void> {
  const previous = memoryChain;
  memoryChain = (async () => {
    await previous;
    try {
      const memory = await readMemory();
      if (!memory) return;
      const next = mutate({ ...memory });
      if (!next) return;
      await deps.settings.set('platform.webViewContentZoomMemory', next);
      cachedMemory = next;
    } catch (e) {
      logger.warn(`Content zoom: could not write memory. ${getErrorMessage(e)}`);
    }
  })();
  return memoryChain;
}

/**
 * Applies every pending edit as one transaction against the latest stored memory, so a debounced
 * burst becomes a single write. Safe to call with nothing pending.
 */
function flushMemoryWrites(): Promise<void> {
  if (memoryWriteTimer !== undefined) {
    clearTimeout(memoryWriteTimer);
    memoryWriteTimer = undefined;
  }
  if (pendingMemoryWrites.size === 0) return Promise.resolve();
  const pending = new Map(pendingMemoryWrites);
  pendingMemoryWrites.clear();
  return enqueueMemoryTransaction((memory) => {
    let changed = false;
    pending.forEach((level, key) => {
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
}

/**
 * Records one area's level as a pending memory edit and (re)starts the flush timer, so a burst of
 * adjustments — a wheel gesture, keyboard auto-repeat — coalesces into one write per key instead of
 * one round trip per step.
 */
function writeMemory(
  definition: Pick<SavedWebViewDefinition, 'webViewType' | 'projectId' | 'state'>,
  areaId: string,
  level: number | undefined,
): void {
  const key = memoryKeyFor(definition, areaId);
  if (!key) return;
  pendingMemoryWrites.set(key, level);
  if (memoryWriteTimer !== undefined) clearTimeout(memoryWriteTimer);
  memoryWriteTimer = setTimeout(() => {
    memoryWriteTimer = undefined;
    flushMemoryWrites();
  }, MEMORY_WRITE_DEBOUNCE_MS);
}

/** Test seam only. Flushes any pending edit now and waits for the transaction chain to settle. */
// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
export async function __flushContentZoomMemoryForTesting(): Promise<void> {
  await flushMemoryWrites();
  await memoryChain;
}

/** Sets or deletes one area's level in the definition state; an empty map is removed entirely. */
function writeOwnLevel(
  definition: SavedWebViewDefinition,
  areaId: string,
  level: number | undefined,
): boolean {
  const state: Record<string, unknown> = { ...(definition.state ?? {}) };
  const levels: Levels = { ...getOwnLevels(definition) };
  if (level === undefined) delete levels[areaId];
  else levels[areaId] = level;
  if (Object.keys(levels).length === 0) delete state[CONTENT_ZOOM_LEVELS_STATE_KEY];
  else state[CONTENT_ZOOM_LEVELS_STATE_KEY] = levels;
  return deps.updateDefinition(definition.id, { state });
}

/**
 * Ctrl+`+` / Ctrl+`-` (and wheel): give one area of the target pane its own level, one step from
 * what it shows. The bootstrap already targets an area for keyboard and wheel; without an area id
 * (tab menu, macOS menu, extensions) the pane's active area is used. A pane that reported no areas
 * ignores the request, which is the gate the macOS and tab-menu paths need.
 */
export async function adjustContentZoom(
  webViewId: WebViewId | undefined,
  deltaSteps: number,
  areaId?: string,
): Promise<void> {
  const target = resolveContentZoomTarget(webViewId);
  if (!target) return;
  const area = resolveContentZoomArea(target, areaId);
  if (!area) return;
  const defaultZoom = await getDefaultZoom();
  // Read the definition after the await: the pane may have been closed, moved or updated while the
  // default was being fetched, and the write below must start from what it holds now.
  const definition = deps.getDefinition(target);
  if (!definition) return;
  const current = getOwnLevels(definition)[area] ?? defaultZoom;
  const next = adjustZoomFactor(current, deltaSteps);
  if (next === current) return;
  if (!writeOwnLevel(definition, area, next)) return;
  writeMemory(definition, area, next);
  pushContentZoom(target, { areaId: area, text: formatZoomPercent(next) });
}

/** Ctrl+`0`: one area of the target pane forgets its own level and follows the default again. */
export async function resetContentZoom(
  webViewId: WebViewId | undefined,
  areaId?: string,
): Promise<void> {
  const target = resolveContentZoomTarget(webViewId);
  if (!target) return;
  const area = resolveContentZoomArea(target, areaId);
  if (!area) return;
  const defaultZoom = await getDefaultZoom();
  // Read the definition after the await, for the reason given in `adjustContentZoom`.
  const definition = deps.getDefinition(target);
  if (!definition) return;
  if (getOwnLevels(definition)[area] !== undefined) {
    if (!writeOwnLevel(definition, area, undefined)) return;
  }
  writeMemory(definition, area, undefined);
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
 * does not already hold.
 */
export async function getInitialContentZoomForWebView(
  webView: Pick<SavedWebViewDefinition, 'id' | 'webViewType' | 'projectId' | 'state'>,
): Promise<{ defaultZoom: number; levels: Levels }> {
  const levels: Levels = { ...getOwnLevels(webView) };
  const id = memoryIdentityFor(webView);
  if (id) {
    // The memory subscription keeps the cache current once the first read has landed, so opening a
    // pane does not wait on a settings round trip; only the very first pane of a session does.
    const memory = memoryLoaded ? cachedMemory : ((await readMemory()) ?? {});
    Object.entries(collectMemoryLevelsFor(memory, id)).forEach(([areaId, level]) => {
      if (levels[areaId] === undefined) levels[areaId] = level;
    });
  }
  return { defaultZoom: await getDefaultZoom(), levels };
}

function repushAllPanes(): void {
  deps.getAllOpenDefinitions().forEach((definition) => pushContentZoom(definition.id));
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
 */
function syncSiblingsFromMemory(memory: MemoryRecord, previousMemory: MemoryRecord): void {
  deps.getAllOpenDefinitions().forEach((definition) => {
    const id = memoryIdentityFor(definition);
    if (!id) return;
    const areas = new Set([
      ...Object.keys(collectMemoryLevelsFor(memory, id)),
      ...Object.keys(collectMemoryLevelsFor(previousMemory, id)),
    ]);
    let changed = false;
    areas.forEach((areaId) => {
      const current = deps.getDefinition(definition.id) ?? definition;
      const key = buildContentZoomMemoryKey(id.kind, id.identity, areaId);
      // A newer local edit for this key hasn't reached the setting yet; this echo predates it, so
      // applying it would revert the area until the newer write's own echo arrives.
      if (pendingMemoryWrites.has(key)) return;
      const remembered = isValidZoomFactor(memory[key]) ? memory[key] : undefined;
      if (getOwnLevels(current)[areaId] === remembered) return;
      if (writeOwnLevel(current, areaId, remembered)) changed = true;
    });
    if (changed) pushContentZoom(definition.id);
  });
}

/**
 * Drops `editor:`/`notes:` memory whose identity no longer names an open project — those two kinds
 * key on a project id, so a project that no longer exists leaves memory nothing can ever read back.
 * `resource:` memory keys on a different, non-project identity and is left alone here.
 */
async function pruneMemoryOfRemovedProjects(): Promise<void> {
  const projects = await deps.listProjects();
  // An empty list is never evidence that every project is gone: the project lookup answers with one
  // while no provider has registered yet, and again once its startup grace period has passed.
  if (projects.length === 0) return;
  const projectIds = new Set(projects.map((project) => project.id));
  await enqueueMemoryTransaction((memory) => {
    let changed = false;
    Object.keys(memory).forEach((key) => {
      const parsed = parseContentZoomMemoryKey(key);
      if (!parsed || parsed.kind === 'resource' || projectIds.has(parsed.identity)) return;
      delete memory[key];
      changed = true;
    });
    return changed ? memory : undefined;
  });
}

/**
 * Idempotent. Subscribes to the default, the memory and web-view updates; prunes stale memory.
 *
 * @param shardDeps The renderer's composition root supplies the web-view and window shards'
 *   `getDefinition`, `updateDefinition`, `getAllOpenDefinitions`, `onDidUpdateWebView` and
 *   `getLastFocusedTabId` here rather than this module importing them directly — both shards import
 *   from this module, so a direct import back would create a cycle. Merged into the deps in use
 *   whenever provided, even on a later call after the first initialization already ran.
 */
export function initializeContentZoomService(
  shardDeps?: Pick<
    ContentZoomDeps,
    | 'getDefinition'
    | 'updateDefinition'
    | 'getAllOpenDefinitions'
    | 'onDidUpdateWebView'
    | 'getLastFocusedTabId'
  >,
): Promise<void> {
  if (shardDeps) deps = { ...deps, ...shardDeps };
  if (initialized) return initialized;
  initialized = (async () => {
    await getDefaultZoom();
    try {
      cachedDefaultLabel = await deps.localize('%webView_contentZoom_indicator_default%');
    } catch (e) {
      cachedDefaultLabel = DEFAULT_LABEL_FALLBACK;
      logger.warn(
        `Content zoom: could not read the reset indicator's label; using "${DEFAULT_LABEL_FALLBACK}". ${getErrorMessage(e)}`,
      );
    }
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
        lastSyncedMemory = memory;
        syncSiblingsFromMemory(memory, previousMemory);
      });
    } catch (e) {
      logger.warn(`Content zoom: could not subscribe to memory. ${getErrorMessage(e)}`);
    }
    // A pane adopted from another window arrives with its state; push its levels once it exists.
    deps.onDidUpdateWebView(({ webView }) => {
      if (deps.getDefinition(webView.id)) pushContentZoom(webView.id);
    });
    // Gives a debounced edit still in flight when the window closes one last chance to reach the
    // setting rather than being silently dropped. Best effort only: the flush reads the stored
    // record before writing it back, and neither round trip can finish while the window is
    // unloading, so the last edits of a session can still be lost. One listener per window; a test
    // reset removes it so a later re-initialization can register its own.
    if (typeof window !== 'undefined' && !beforeUnloadListener) {
      beforeUnloadListener = () => {
        flushMemoryWrites();
      };
      window.addEventListener('beforeunload', beforeUnloadListener);
    }
    await pruneMemoryOfRemovedProjects().catch((e) =>
      logger.warn(`Content zoom: memory prune failed. ${getErrorMessage(e)}`),
    );
  })();
  return initialized;
}
