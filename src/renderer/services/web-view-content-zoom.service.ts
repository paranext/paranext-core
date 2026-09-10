import { getWebViewIframe } from '@renderer/services/overlays/overlay-coordinates';
import {
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_LEVELS_STATE_KEY,
  getContentZoomCssVariable,
  getContentZoomKind,
} from '@shared/models/content-zoom.model';
import { SavedWebViewDefinition, WebViewId } from '@shared/models/web-view.model';
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
 * Best-effort mirror of the memory setting, used only to seed a newly opened pane's own levels on
 * its first area report ({@link setContentZoomAreas}). Filled by a successful `readMemory` read
 * (which runs before a pane's iframe exists, via `getInitialContentZoomForWebView` or a memory
 * transaction), and kept current by the memory subscription and by this window's own successful
 * writes. A momentarily stale or empty value only means a pane seeds later, or not at all — every
 * other read of memory stays authoritative through `readMemory`/`enqueueMemoryTransaction`.
 */
let cachedMemory: MemoryRecord = {};

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
  initialized = undefined;
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

/** The factor an area currently shows: its own level if it has one, else the default. */
export function getEffectiveContentZoom(webViewId: WebViewId, areaId: string): number {
  return (
    getOwnLevels(deps.getDefinition(webViewId))[areaId] ?? cachedDefault ?? DEFAULT_ZOOM_FACTOR
  );
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
 * that never reported — a URL web view, or one whose React tree has not mounted yet — has no entry,
 * counts as having no areas, and is scaled whole at the default.
 */
const areasByWebViewId = new Map<WebViewId, string[]>();

/** The area the user last clicked or focused in each pane (`setContentZoomActiveArea`). */
const activeAreaByWebViewId = new Map<WebViewId, string>();

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
    logger.debug(
      `Content zoom: web view ${webViewId} has no zoom area "${explicitAreaId}"; ignoring`,
    );
    return undefined;
  }
  const active = activeAreaByWebViewId.get(webViewId);
  return active && areas.includes(active) ? active : areas[0];
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
  const levels: Levels = {};
  Object.entries(cachedMemory).forEach(([key, level]) => {
    const parsed = parseContentZoomMemoryKey(key);
    if (parsed && parsed.kind === id.kind && parsed.identity === id.identity)
      levels[parsed.areaId] = level;
  });
  if (Object.keys(levels).length === 0) return;
  deps.updateDefinition(definition.id, {
    state: { ...(definition.state ?? {}), [CONTENT_ZOOM_LEVELS_STATE_KEY]: levels },
  });
}

/** Called by the bootstrap (through the parent-bound helper) whenever the set of areas changes. */
export function setContentZoomAreas(webViewId: WebViewId, areaIds: string[]): void {
  const valid = areaIds.filter((areaId) => isValidContentZoomAreaId(areaId));
  const previous = areasByWebViewId.get(webViewId);
  if (previous && previous.length === valid.length && previous.every((a, i) => a === valid[i]))
    return;
  if (!previous) seedFromMemoryOnFirstReport(webViewId);
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
}

/**
 * Writes the pane's effective levels into it. With areas: one CSS variable per area (own level,
 * else the default) plus the default variable, and the iframe's own zoom cleared. Without areas
 * (not reported yet, or a URL view): CSS `zoom` on the iframe element, so the whole view shows at
 * the Settings default. Areas that hold a level but are not currently rendered still get their
 * variable, so the level is in place when the area appears (the footnotes pane being shown).
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
    iframe.style.zoom = String(defaultZoom);
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

/** For the iframe load hook: push whatever this pane should show right now. */
export function applyContentZoomForWebView(webViewId: WebViewId): void {
  pushContentZoom(webViewId);
}

/** `undefined` marks a failed read, distinct from a genuinely empty record. */
async function readMemory(): Promise<MemoryRecord | undefined> {
  try {
    const memory = asMemory(await deps.settings.get('platform.webViewContentZoomMemory'));
    cachedMemory = memory;
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
  const definition = deps.getDefinition(target);
  if (!definition) return;
  const defaultZoom = await getDefaultZoom();
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
  const definition = deps.getDefinition(target);
  if (!definition) return;
  const defaultZoom = await getDefaultZoom();
  if (getOwnLevels(definition)[area] !== undefined) {
    if (!writeOwnLevel(definition, area, undefined)) return;
  }
  writeMemory(definition, area, undefined);
  const defaultLabel = await deps.localize('%webView_contentZoom_indicator_default%');
  pushContentZoom(target, {
    areaId: area,
    text: `${defaultLabel} · ${formatZoomPercent(defaultZoom)}`,
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
    const memory = (await readMemory()) ?? {};
    Object.entries(memory).forEach(([key, level]) => {
      const parsed = parseContentZoomMemoryKey(key);
      if (!parsed || parsed.kind !== id.kind || parsed.identity !== id.identity) return;
      if (levels[parsed.areaId] === undefined) levels[parsed.areaId] = level;
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
 */
function syncSiblingsFromMemory(memory: MemoryRecord): void {
  deps.getAllOpenDefinitions().forEach((definition) => {
    const id = memoryIdentityFor(definition);
    if (!id) return;
    const rememberedAreas = Object.keys(memory)
      .map((key) => parseContentZoomMemoryKey(key))
      .filter((parsed) => parsed && parsed.kind === id.kind && parsed.identity === id.identity)
      .map((parsed) => (parsed ? parsed.areaId : ''));
    const areas = new Set([...Object.keys(getOwnLevels(definition)), ...rememberedAreas]);
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
  const projectIds = new Set((await deps.listProjects()).map((project) => project.id));
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
        cachedMemory = memory;
        syncSiblingsFromMemory(memory);
      });
    } catch (e) {
      logger.warn(`Content zoom: could not subscribe to memory. ${getErrorMessage(e)}`);
    }
    // A pane adopted from another window arrives with its state; push its levels once it exists.
    deps.onDidUpdateWebView(({ webView }) => {
      if (deps.getDefinition(webView.id)) pushContentZoom(webView.id);
    });
    // Best effort: a debounced edit still in flight when the window closes gets one last chance
    // to reach the setting rather than being silently dropped. One listener per window; a test
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
