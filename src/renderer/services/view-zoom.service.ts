import { DEFAULT_ZOOM_FACTOR, MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR } from '@shared/data/platform.data';
import { settingsService } from '@shared/services/settings.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { getDefaultKeyForInstance, PER_INSTANCE_VIEW_TYPES } from './view-zoom-key.util';

const SETTING_KEY = 'platform.viewZooms' as const;
const STEP = 0.1;
const DEFAULT_DEBOUNCE_MS = 250;

export type ViewZoomService = {
  ready: Promise<void>;
  getZoom: (key: string) => number;
  setZoom: (key: string, factor: number) => void;
  adjustZoom: (key: string, deltaSteps: number) => void;
  resetZoom: (key: string) => void;
  subscribe: (key: string, cb: (factor: number) => void) => () => void;
  prune: (liveTabIds: ReadonlySet<string>) => void;
  /** Cancel any debounced persist and write the current state synchronously. */
  flush: () => Promise<void>;
};

type SettingsLike = {
  get: (key: 'platform.viewZooms') => Promise<Record<string, number>>;
  set: (key: 'platform.viewZooms', value: Record<string, number>) => Promise<void>;
  subscribe: (
    key: 'platform.viewZooms',
    cb: (value: Record<string, number>) => void,
  ) => Promise<() => Promise<void>>;
};

type Options = {
  persistDebounceMs?: number;
  perInstanceTypes?: Set<string>;
};

function clamp(v: number): number {
  if (v < MIN_ZOOM_FACTOR) return MIN_ZOOM_FACTOR;
  if (v > MAX_ZOOM_FACTOR) return MAX_ZOOM_FACTOR;
  return v;
}

function round1(v: number): number {
  return Math.round(v * 10) / 10;
}

// The production `settingsService` has a broader API than `SettingsLike`, but structurally
// satisfies it for the zoom setting key. The default-parameter fallback relies on a loose
// signature so we use `Partial<SettingsLike>` as the input type and narrow internally — callers
// (including tests) can pass a minimal stub that matches `SettingsLike`.
const defaultSettings: SettingsLike = {
  get: async (key) => settingsService.get(key),
  set: async (key, value) => {
    await settingsService.set(key, value);
  },
  subscribe: async (key, cb) => {
    // settingsService.subscribe's callback may receive a PlatformError; we filter out errors
    // and only forward successful values to our typed callback.
    const unsub = await settingsService.subscribe(key, (newSetting) => {
      if (isPlatformError(newSetting)) return;
      cb(newSetting);
    });
    return async () => {
      await unsub();
    };
  },
};

/**
 * Create a view-zoom service. The production instance is exported as `viewZoomService`; the factory
 * exists for testability.
 */
export function createViewZoomService(
  settings: SettingsLike = defaultSettings,
  opts: Options = {},
): ViewZoomService {
  const debounceMs = opts.persistDebounceMs ?? DEFAULT_DEBOUNCE_MS;
  const perInstanceTypes = opts.perInstanceTypes ?? PER_INSTANCE_VIEW_TYPES;

  const state = new Map<string, number>();
  const subscribers = new Map<string, Set<(v: number) => void>>();
  let persistTimer: ReturnType<typeof setTimeout> | undefined;

  const ready = (async () => {
    try {
      const initial = await settings.get(SETTING_KEY);
      if (initial && typeof initial === 'object') {
        Object.entries(initial).forEach(([k, v]) => {
          if (typeof v === 'number') state.set(k, clamp(v));
        });
      }
    } catch (e) {
      logger.warn(`view-zoom.service: failed to load initial settings: ${getErrorMessage(e)}`);
    }
  })();

  function isPerInstanceKeyLocal(key: string): boolean {
    const idx = key.lastIndexOf(':');
    if (idx <= 0) return false;
    return perInstanceTypes.has(key.slice(0, idx));
  }

  function notify(key: string, value: number) {
    subscribers.get(key)?.forEach((cb) => {
      try {
        cb(value);
      } catch (e) {
        logger.warn(`view-zoom.service subscriber threw: ${getErrorMessage(e)}`);
      }
    });
  }

  async function persistNow() {
    try {
      const obj: Record<string, number> = {};
      state.forEach((v, k) => {
        obj[k] = v;
      });
      await settings.set(SETTING_KEY, obj);
    } catch (e) {
      logger.warn(`view-zoom.service: persist failed: ${getErrorMessage(e)}`);
    }
  }

  function schedulePersist() {
    if (persistTimer) clearTimeout(persistTimer);
    persistTimer = setTimeout(() => {
      persistTimer = undefined;
      // Fire and forget; failures are logged inside persistNow.
      persistNow();
    }, debounceMs);
  }

  async function flush(): Promise<void> {
    if (!persistTimer) return;
    clearTimeout(persistTimer);
    persistTimer = undefined;
    await persistNow();
  }

  function resolveKeyForRead(key: string): string {
    if (state.has(key)) return key;
    if (!isPerInstanceKeyLocal(key)) return key;
    const colon = key.lastIndexOf(':');
    const type = key.slice(0, colon);
    return getDefaultKeyForInstance(type);
  }

  function getZoom(key: string): number {
    const effective = resolveKeyForRead(key);
    return state.get(effective) ?? DEFAULT_ZOOM_FACTOR;
  }

  function setZoomInternal(key: string, factor: number) {
    const clamped = round1(clamp(factor));
    const prev = state.get(key);
    if (prev === clamped) return;
    state.set(key, clamped);
    notify(key, clamped);

    // Mirror into per-type default for new instances
    if (isPerInstanceKeyLocal(key)) {
      const colon = key.lastIndexOf(':');
      const type = key.slice(0, colon);
      const id = key.slice(colon + 1);
      if (id !== '__default') {
        const defaultKey = getDefaultKeyForInstance(type);
        state.set(defaultKey, clamped);
        notify(defaultKey, clamped);
      }
    }

    schedulePersist();
  }

  function setZoom(key: string, factor: number) {
    setZoomInternal(key, factor);
  }

  function adjustZoom(key: string, deltaSteps: number) {
    setZoomInternal(key, getZoom(key) + deltaSteps * STEP);
  }

  function resetZoom(key: string) {
    if (isPerInstanceKeyLocal(key)) {
      // Store DEFAULT_ZOOM_FACTOR explicitly rather than deleting. If we deleted, resolveKeyForRead
      // would fall back to the __default entry (e.g. 1.4), making getZoom() inconsistent with the
      // 1.0 value just sent to subscribers. A remounting component's useState initializer would
      // then snap back to the stale __default instead of staying at the reset value.
      if (getZoom(key) === DEFAULT_ZOOM_FACTOR) return;
      state.set(key, DEFAULT_ZOOM_FACTOR);
    } else {
      if (!state.has(key)) return;
      state.delete(key);
    }
    notify(key, DEFAULT_ZOOM_FACTOR);
    schedulePersist();
  }

  function subscribe(key: string, cb: (v: number) => void): () => void {
    let set = subscribers.get(key);
    if (!set) {
      set = new Set();
      subscribers.set(key, set);
    }
    set.add(cb);
    // Capture the Set instance at subscribe time so we can verify identity at unsubscribe time;
    // otherwise an unsubscribe arriving after the entry has been deleted-and-recreated could
    // incorrectly drop the freshly-created Set holding new subscribers.
    const ownedSet = set;
    return () => {
      ownedSet.delete(cb);
      if (subscribers.get(key) === ownedSet && ownedSet.size === 0) subscribers.delete(key);
    };
  }

  function prune(liveTabIds: ReadonlySet<string>) {
    let changed = false;
    Array.from(state.keys()).forEach((key) => {
      if (!isPerInstanceKeyLocal(key)) return;
      const colon = key.lastIndexOf(':');
      const id = key.slice(colon + 1);
      if (id === '__default') return;
      if (liveTabIds.has(id)) return;
      state.delete(key);
      notify(key, DEFAULT_ZOOM_FACTOR);
      changed = true;
    });
    if (changed) schedulePersist();
  }

  return { ready, getZoom, setZoom, adjustZoom, resetZoom, subscribe, prune, flush };
}

export const viewZoomService: ViewZoomService = createViewZoomService();
