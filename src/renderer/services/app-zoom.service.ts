import { DEFAULT_ZOOM_FACTOR, MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR } from '@shared/data/platform.data';
import { settingsService } from '@shared/services/settings.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import { viewZoomService } from './view-zoom.service';

const SETTING_KEY = 'platform.appZoom' as const;
const DEFAULT_DEBOUNCE_MS = 250;

export type AppZoomService = {
  ready: Promise<void>;
  get: () => number;
  set: (factor: number) => void;
  adjust: (delta: number) => void;
  reset: () => void;
  subscribe: (cb: (factor: number) => void) => () => void;
  flush: () => Promise<void>;
};

type SettingsLike = {
  get: (key: 'platform.appZoom') => Promise<number>;
  set: (key: 'platform.appZoom', value: number) => Promise<void>;
  subscribe: (key: 'platform.appZoom', cb: (value: number) => void) => Promise<() => Promise<void>>;
};

type Options = {
  persistDebounceMs?: number;
};

const defaultSettings: SettingsLike = {
  get: async (key) => settingsService.get(key),
  set: async (key, value) => {
    await settingsService.set(key, value);
  },
  subscribe: async (key, cb) => {
    const unsub = await settingsService.subscribe(key, (newSetting) => {
      if (typeof newSetting === 'number') cb(newSetting);
    });
    return async () => {
      await unsub();
    };
  },
};

function clamp(v: number): number {
  if (v < MIN_ZOOM_FACTOR) return MIN_ZOOM_FACTOR;
  if (v > MAX_ZOOM_FACTOR) return MAX_ZOOM_FACTOR;
  return v;
}

function round1(v: number): number {
  return Math.round(v * 10) / 10;
}

export function createAppZoomService(
  settings: SettingsLike,
  viewZoomResetAll: () => Promise<void>,
  opts: Options = {},
): AppZoomService {
  const debounceMs = opts.persistDebounceMs ?? DEFAULT_DEBOUNCE_MS;
  let factor = DEFAULT_ZOOM_FACTOR;
  const subscribers = new Set<(v: number) => void>();
  let persistTimer: ReturnType<typeof setTimeout> | undefined;

  const ready = (async () => {
    try {
      const initial = await settings.get(SETTING_KEY);
      if (typeof initial === 'number') {
        factor = clamp(initial);
        document.body.style.zoom = String(factor);
      }
    } catch (e) {
      logger.warn(`app-zoom.service: failed to load initial settings: ${getErrorMessage(e)}`);
    }
  })();

  function notify(value: number) {
    subscribers.forEach((cb) => {
      try {
        cb(value);
      } catch (e) {
        logger.warn(`app-zoom.service subscriber threw: ${getErrorMessage(e)}`);
      }
    });
  }

  async function persistNow() {
    try {
      await settings.set(SETTING_KEY, factor);
    } catch (e) {
      logger.warn(`app-zoom.service: persist failed: ${getErrorMessage(e)}`);
    }
  }

  function schedulePersist() {
    if (persistTimer) clearTimeout(persistTimer);
    persistTimer = setTimeout(() => {
      persistTimer = undefined;
      persistNow();
    }, debounceMs);
  }

  async function flush(): Promise<void> {
    if (!persistTimer) return;
    clearTimeout(persistTimer);
    persistTimer = undefined;
    await persistNow();
  }

  function set(newFactor: number) {
    const clamped = round1(clamp(newFactor));
    if (clamped === factor) return;
    factor = clamped;
    document.body.style.zoom = String(factor);
    notify(factor);
    viewZoomResetAll().catch((e) => {
      logger.warn(`app-zoom.service: resetAll failed: ${getErrorMessage(e)}`);
    });
    schedulePersist();
  }

  function get(): number {
    return factor;
  }

  function adjust(delta: number) {
    set(factor + delta);
  }

  function reset() {
    set(DEFAULT_ZOOM_FACTOR);
  }

  function subscribe(cb: (v: number) => void): () => void {
    subscribers.add(cb);
    return () => {
      subscribers.delete(cb);
    };
  }

  return { ready, get, set, adjust, reset, subscribe, flush };
}

export const appZoomService: AppZoomService = createAppZoomService(defaultSettings, async () =>
  viewZoomService.resetAll(),
);
