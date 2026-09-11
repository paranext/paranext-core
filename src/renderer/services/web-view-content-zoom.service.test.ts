import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));
vi.mock('@shared/services/settings.service', () => ({ settingsService: {} }));
vi.mock('@shared/services/localization.service', () => ({ localizationService: {} }));
vi.mock('@shared/services/project-lookup.service', () => ({ projectLookupService: {} }));
vi.mock('@renderer/services/overlays/overlay-coordinates', () => ({ getWebViewIframe: vi.fn() }));

// Import types and the service under test after the mocks above are established.
// eslint-disable-next-line import/first
import type { SavedWebViewDefinition } from '@shared/models/web-view.model';
// The mocked logger, so a test can assert on a warning it produced.
// eslint-disable-next-line import/first
import { logger } from '@shared/services/logger.service';
// The percent formatter, so an indicator assertion spells the number exactly as the code does.
// eslint-disable-next-line import/first
import { formatZoomPercent } from '@shared/utils/content-zoom.util';
// The service itself, for the same reason as the type import above.
// eslint-disable-next-line import/first
import {
  __flushContentZoomMemoryForTesting,
  __setContentZoomDepsForTesting,
  adjustContentZoom,
  applyContentZoomForWebView,
  forgetContentZoom,
  getInitialContentZoomForWebView,
  initializeContentZoomService,
  pushContentZoom,
  resetContentZoom,
  resolveContentZoomArea,
  resolveContentZoomTarget,
  setContentZoomActiveArea,
  setContentZoomAreas,
} from './web-view-content-zoom.service';

const LEVELS = 'platform.contentZoomLevels';
const MEMORY = 'platform.webViewContentZoomMemory';

function makeIframe() {
  const iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument;
  if (!doc) throw new Error('jsdom iframe has no document');
  doc.open();
  doc.write(
    '<html><head></head><body><div data-platform-content-zoom-root>t</div><div data-platform-content-zoom-root="footnotes">f</div></body></html>',
  );
  doc.close();
  return iframe;
}

function cssVar(iframe: HTMLIFrameElement, name: string): string {
  return iframe.contentDocument?.documentElement.style.getPropertyValue(name) ?? '';
}

describe('web-view-content-zoom.service', () => {
  const definitions = new Map<string, SavedWebViewDefinition>();
  /** Reads a definition set up earlier in the same test, failing loudly if the setup is missing. */
  function requireDefinition(id: string): SavedWebViewDefinition {
    const definition = definitions.get(id);
    if (!definition) throw new Error(`test setup: no definition for "${id}"`);
    return definition;
  }
  const settings: Record<string, unknown> = { 'platform.webViewContentZoom': 1, [MEMORY]: {} };
  const memoryCallbacks: Array<(value: unknown) => void> = [];
  const defaultCallbacks: Array<(value: unknown) => void> = [];
  let onDidUpdateWebViewCallback:
    | ((event: { webView: SavedWebViewDefinition }) => void)
    | undefined;
  const settingsSet = vi.fn(async (key: string, value: unknown) => {
    settings[key] = value;
    return true;
  });
  const updateDefinition = vi.fn((id: string, update: { state?: Record<string, unknown> }) => {
    const def = definitions.get(id);
    if (!def) return false;
    def.state = update.state;
    return true;
  });
  let iframe: HTMLIFrameElement;
  const showIndicator = vi.fn();
  let lastFocused: string | undefined;

  beforeEach(async () => {
    definitions.clear();
    settings['platform.webViewContentZoom'] = 1;
    settings[MEMORY] = {};
    memoryCallbacks.length = 0;
    defaultCallbacks.length = 0;
    onDidUpdateWebViewCallback = undefined;
    settingsSet.mockClear();
    updateDefinition.mockClear();
    showIndicator.mockClear();
    vi.mocked(logger.warn).mockClear();
    lastFocused = undefined;
    document.body.innerHTML = '';
    iframe = makeIframe();
    Object.assign(iframe.contentWindow ?? {}, { __platformContentZoom: { showIndicator } });
    definitions.set('editor-1', {
      id: 'editor-1',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: {},
    });
    forgetContentZoom('editor-1');
    forgetContentZoom('editor-2');
    __setContentZoomDepsForTesting({
      getIframe: () => iframe,
      getDefinition: (id: string) => definitions.get(id),
      updateDefinition,
      getAllOpenDefinitions: () => [...definitions.values()],
      onDidUpdateWebView: (callback) => {
        onDidUpdateWebViewCallback = callback;
        return () => false;
      },
      getLastFocusedTabId: () => lastFocused,
      settings: {
        get: async (key: string) => settings[key],
        set: settingsSet,
        subscribe: async (key: string, callback: (value: unknown) => void) => {
          if (key === MEMORY) memoryCallbacks.push(callback);
          else if (key === 'platform.webViewContentZoom') defaultCallbacks.push(callback);
          // Mirrors the production subscription's immediate delivery of the current value
          // (`retrieveDataImmediately` defaults to true), which is what primes the module's caches
          // on initialization rather than leaving them to wait for the first live change.
          callback(settings[key]);
          return async () => {};
        },
      },
      localize: async () => 'Default',
      listProjects: async () => [{ id: 'proj-A' }],
    });
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    showIndicator.mockClear();
  });

  it('resolves an explicit id, else the last focused tab, else nothing', () => {
    expect(resolveContentZoomTarget('editor-1')).toBe('editor-1');
    lastFocused = 'editor-1';
    expect(resolveContentZoomTarget(undefined)).toBe('editor-1');
    lastFocused = undefined;
    expect(resolveContentZoomTarget(undefined)).toBeUndefined();
  });

  it('resolves the area: explicit and known → itself; unknown → nothing; none given → active, else first', () => {
    expect(resolveContentZoomArea('editor-1', 'footnotes')).toBe('footnotes');
    expect(resolveContentZoomArea('editor-1', 'sidebar')).toBeUndefined();
    expect(resolveContentZoomArea('editor-1', undefined)).toBe('main');
    setContentZoomActiveArea('editor-1', 'footnotes');
    expect(resolveContentZoomArea('editor-1', undefined)).toBe('footnotes');
    setContentZoomAreas('editor-1', []);
    expect(resolveContentZoomArea('editor-1', undefined)).toBeUndefined();
  });

  it('zooms one area in from the default, writes state and memory for that area, pushes its variable and shows the indicator there', async () => {
    await adjustContentZoom('editor-1', 1, 'main');
    await __flushContentZoomMemoryForTesting();
    expect(definitions.get('editor-1')?.state).toEqual({ [LEVELS]: { main: 1.1 } });
    expect(settings[MEMORY]).toEqual({ 'editor:proj-A:main': 1.1 });
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.1');
    expect(cssVar(iframe, '--platform-content-zoom-footnotes')).toBe('1');
    expect(cssVar(iframe, '--platform-content-zoom-default')).toBe('1');
    expect(showIndicator).toHaveBeenCalledWith('main', '110 %');
  });

  it('keeps the areas independent: zooming the footnotes leaves the text alone and never inherits its level', async () => {
    await adjustContentZoom('editor-1', 1, 'main');
    await adjustContentZoom('editor-1', 1, 'main');
    await adjustContentZoom('editor-1', 1, 'footnotes');
    await __flushContentZoomMemoryForTesting();
    expect(definitions.get('editor-1')?.state).toEqual({ [LEVELS]: { main: 1.2, footnotes: 1.1 } });
    expect(settings[MEMORY]).toEqual({ 'editor:proj-A:main': 1.2, 'editor:proj-A:footnotes': 1.1 });
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.2');
    expect(cssVar(iframe, '--platform-content-zoom-footnotes')).toBe('1.1');
    expect(showIndicator).toHaveBeenLastCalledWith('footnotes', '110 %');
  });

  it('without an area id acts on the active area', async () => {
    setContentZoomActiveArea('editor-1', 'footnotes');
    await adjustContentZoom('editor-1', 1);
    expect(definitions.get('editor-1')?.state).toEqual({ [LEVELS]: { footnotes: 1.1 } });
  });

  it("reset deletes that area's level and memory entry and returns it to the default; an empty map is removed from state", async () => {
    settings['platform.webViewContentZoom'] = 1.5;
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    await adjustContentZoom('editor-1', 1, 'main'); // 1.6
    await __flushContentZoomMemoryForTesting(); // persist 1.6 so the reset below deletes a real entry
    await resetContentZoom('editor-1', 'main');
    await __flushContentZoomMemoryForTesting();
    expect(definitions.get('editor-1')?.state).toEqual({});
    expect(settings[MEMORY]).toEqual({});
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.5');
    expect(showIndicator).toHaveBeenLastCalledWith('main', 'Default · 150 %');
  });

  it('clamps at the range edges and does not write when nothing changes', async () => {
    requireDefinition('editor-1').state = { [LEVELS]: { main: 3 } };
    await adjustContentZoom('editor-1', 1, 'main');
    expect(updateDefinition).not.toHaveBeenCalled();
    expect(settingsSet).not.toHaveBeenCalled();
  });

  it('clamps at the minimum and does not write, or show the indicator, when nothing changes', async () => {
    requireDefinition('editor-1').state = { [LEVELS]: { main: 0.5 } };
    await adjustContentZoom('editor-1', -1, 'main');
    expect(updateDefinition).not.toHaveBeenCalled();
    expect(settingsSet).not.toHaveBeenCalled();
    expect(showIndicator).not.toHaveBeenCalled();
  });

  it('coalesces an un-awaited burst of adjustments into one memory write per key', async () => {
    const first = adjustContentZoom('editor-1', 1, 'main');
    const second = adjustContentZoom('editor-1', 1, 'main');
    const third = adjustContentZoom('editor-1', 1, 'footnotes');
    await Promise.all([first, second, third]);
    await __flushContentZoomMemoryForTesting();
    expect(definitions.get('editor-1')?.state).toEqual({ [LEVELS]: { main: 1.2, footnotes: 1.1 } });
    expect(settings[MEMORY]).toEqual({
      'editor:proj-A:main': 1.2,
      'editor:proj-A:footnotes': 1.1,
    });
    expect(settingsSet).toHaveBeenCalledTimes(1);
  });

  it('holds the memory write behind the debounce delay, then flushes it in one call', async () => {
    await adjustContentZoom('editor-1', 1, 'main');
    expect(settingsSet).not.toHaveBeenCalledWith(MEMORY, expect.anything());
    await __flushContentZoomMemoryForTesting();
    expect(settingsSet).toHaveBeenCalledTimes(1);
    expect(settingsSet).toHaveBeenCalledWith(MEMORY, { 'editor:proj-A:main': 1.1 });
  });

  it('skips the memory write and warns, without losing the pane update, when the memory read fails', async () => {
    __setContentZoomDepsForTesting({
      settings: {
        get: async (key: string) => {
          if (key === MEMORY) throw new Error('network blip');
          return settings[key];
        },
        set: settingsSet,
        subscribe: async (key: string, callback: (value: unknown) => void) => {
          if (key === MEMORY) memoryCallbacks.push(callback);
          return async () => {};
        },
      },
    });
    await adjustContentZoom('editor-1', 1, 'main');
    await __flushContentZoomMemoryForTesting();
    expect(definitions.get('editor-1')?.state).toEqual({ [LEVELS]: { main: 1.1 } });
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.1');
    expect(showIndicator).toHaveBeenCalledWith('main', '110 %');
    expect(settingsSet).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalled();
  });

  it('seeds a new pane per area from state, else memory, else the default', async () => {
    settings[MEMORY] = {
      'editor:proj-A:main': 1.3,
      'editor:proj-A:footnotes': 0.9,
      'editor:proj-B:main': 2,
    };
    // Re-initializes so the memory cache the seeding reads holds the record set up just above.
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    await expect(
      getInitialContentZoomForWebView({
        id: 'x',
        webViewType: 'platformScriptureEditor.react',
        projectId: 'proj-A',
      }),
    ).resolves.toEqual({ defaultZoom: 1, levels: { main: 1.3, footnotes: 0.9 } });
    await expect(
      getInitialContentZoomForWebView({
        id: 'y',
        webViewType: 'platformScriptureEditor.react',
        projectId: 'proj-C',
      }),
    ).resolves.toEqual({ defaultZoom: 1, levels: {} });
    await expect(
      getInitialContentZoomForWebView({
        id: 'z',
        webViewType: 'platformScriptureEditor.react',
        projectId: 'proj-A',
        state: { [LEVELS]: { main: 2 } },
      }),
    ).resolves.toEqual({ defaultZoom: 1, levels: { main: 2, footnotes: 0.9 } });
  });

  it("seeds a newly opened pane's state from memory on its first area report", async () => {
    settings[MEMORY] = {
      'editor:proj-A:main': 1.3,
      'editor:proj-A:footnotes': 0.9,
      'editor:proj-B:main': 2,
    };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    settingsSet.mockClear();
    definitions.set('editor-3', {
      id: 'editor-3',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: {},
    });
    setContentZoomAreas('editor-3', ['main', 'footnotes']);
    await __flushContentZoomMemoryForTesting();
    expect(definitions.get('editor-3')?.state).toEqual({
      [LEVELS]: { main: 1.3, footnotes: 0.9 },
    });
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.3');
    expect(cssVar(iframe, '--platform-content-zoom-footnotes')).toBe('0.9');
    expect(showIndicator).not.toHaveBeenCalled();
    expect(settingsSet).not.toHaveBeenCalled();
  });

  it('does not overwrite a pane that already holds levels', async () => {
    settings[MEMORY] = {
      'editor:proj-A:main': 1.3,
      'editor:proj-A:footnotes': 0.9,
    };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('editor-4', {
      id: 'editor-4',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: { [LEVELS]: { main: 2 } },
    });
    setContentZoomAreas('editor-4', ['main', 'footnotes']);
    expect(definitions.get('editor-4')?.state).toEqual({ [LEVELS]: { main: 2 } });
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('2');
  });

  it('seeds on the first non-empty report even when an earlier report for the same pane was empty', async () => {
    settings[MEMORY] = { 'editor:proj-A:main': 1.3, 'editor:proj-A:footnotes': 0.9 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('editor-6', {
      id: 'editor-6',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: {},
    });
    // The bootstrap's first scan reports no areas yet (e.g. a spinner while the pane loads).
    setContentZoomAreas('editor-6', []);
    expect(definitions.get('editor-6')?.state).toEqual({});
    showIndicator.mockClear();
    settingsSet.mockClear();
    setContentZoomAreas('editor-6', ['main', 'footnotes']);
    await __flushContentZoomMemoryForTesting();
    expect(definitions.get('editor-6')?.state).toEqual({
      [LEVELS]: { main: 1.3, footnotes: 0.9 },
    });
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.3');
    expect(cssVar(iframe, '--platform-content-zoom-footnotes')).toBe('0.9');
    expect(showIndicator).not.toHaveBeenCalled();
    expect(settingsSet).not.toHaveBeenCalled();
  });

  it('does not seed on a later report', async () => {
    settings[MEMORY] = { 'editor:proj-A:main': 1.3 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('editor-5', {
      id: 'editor-5',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: {},
    });
    setContentZoomAreas('editor-5', ['main']);
    expect(definitions.get('editor-5')?.state).toEqual({ [LEVELS]: { main: 1.3 } });
    // A memory push (live sharing) adds `footnotes` through the existing sibling-sync path, which
    // is independent of first-report seeding.
    memoryCallbacks.forEach((cb) =>
      cb({ 'editor:proj-A:main': 1.3, 'editor:proj-A:footnotes': 1.6 }),
    );
    const stateAfterLiveSharing = definitions.get('editor-5')?.state;
    setContentZoomAreas('editor-5', ['main', 'footnotes']);
    expect(definitions.get('editor-5')?.state).toEqual(stateAfterLiveSharing);
  });

  it('does nothing for an unknown web view', async () => {
    await adjustContentZoom('nope', 1);
    expect(updateDefinition).not.toHaveBeenCalled();
    expect(showIndicator).not.toHaveBeenCalled();
  });

  it('does nothing and does not throw when the definition has vanished for a pane with reported areas', async () => {
    setContentZoomAreas('ghost', ['main']);
    await expect(adjustContentZoom('ghost', 1, 'main')).resolves.toBeUndefined();
    await expect(resetContentZoom('ghost', 'main')).resolves.toBeUndefined();
    expect(updateDefinition).not.toHaveBeenCalled();
    expect(settingsSet).not.toHaveBeenCalled();
    expect(showIndicator).not.toHaveBeenCalled();
  });

  it('brings a sibling pane of the same project in line per area when the memory changes (live sharing)', async () => {
    definitions.set('editor-2', {
      id: 'editor-2',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: {},
    });
    setContentZoomAreas('editor-2', ['main', 'footnotes']);
    showIndicator.mockClear();
    memoryCallbacks.forEach((cb) => cb({ 'editor:proj-A:footnotes': 1.4 }));
    expect(definitions.get('editor-2')?.state).toEqual({ [LEVELS]: { footnotes: 1.4 } });
    expect(definitions.get('editor-1')?.state).toEqual({ [LEVELS]: { footnotes: 1.4 } });
    expect(showIndicator).not.toHaveBeenCalled();
  });

  it("keeps a pane's own level when memory has never held its key (a first subscription push, or a lost flush)", () => {
    requireDefinition('editor-1').state = { [LEVELS]: { main: 1.4 } };
    memoryCallbacks.forEach((cb) => cb({}));
    expect(definitions.get('editor-1')?.state).toEqual({ [LEVELS]: { main: 1.4 } });
    pushContentZoom('editor-1');
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.4');
  });

  it("drops a pane's own level when memory held its key and no longer does (a reset returns siblings together)", () => {
    requireDefinition('editor-1').state = { [LEVELS]: { main: 1.4 } };
    memoryCallbacks.forEach((cb) => cb({ 'editor:proj-A:main': 1.4 }));
    expect(definitions.get('editor-1')?.state).toEqual({ [LEVELS]: { main: 1.4 } });
    memoryCallbacks.forEach((cb) => cb({}));
    expect(definitions.get('editor-1')?.state).toEqual({});
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1');
  });

  it('ignores a stale memory echo for an area that already has a newer pending write', async () => {
    await adjustContentZoom('editor-1', 1, 'main'); // 1.1, flushed below
    await __flushContentZoomMemoryForTesting();
    await adjustContentZoom('editor-1', 1, 'main'); // 1.2, still only pending
    // The echo of the 1.1 write arriving after the 1.2 edit was already made locally.
    memoryCallbacks.forEach((cb) => cb({ 'editor:proj-A:main': 1.1 }));
    expect(definitions.get('editor-1')?.state).toEqual({ [LEVELS]: { main: 1.2 } });
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.2');
    await __flushContentZoomMemoryForTesting();
    expect(settings[MEMORY]).toEqual({ 'editor:proj-A:main': 1.2 });
  });

  it('does nothing for a pane that reported no areas (menu and macOS paths)', async () => {
    setContentZoomAreas('editor-1', []);
    await adjustContentZoom('editor-1', 1);
    await resetContentZoom('editor-1');
    expect(updateDefinition).not.toHaveBeenCalled();
    expect(settingsSet).not.toHaveBeenCalled();
  });

  it('scales a pane without areas whole at the default once its grace period passes, and switches to per-area variables once areas are reported', async () => {
    settings['platform.webViewContentZoom'] = 1.3;
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    vi.useFakeTimers();
    try {
      setContentZoomAreas('editor-1', []);
      pushContentZoom('editor-1');
      expect(iframe.style.zoom).toBe('');
      expect(cssVar(iframe, '--platform-content-zoom-default')).toBe('1.3');
      vi.advanceTimersByTime(1000);
      expect(iframe.style.zoom).toBe('1.3');
      setContentZoomAreas('editor-1', ['main']);
      expect(iframe.style.zoom).toBe('');
      expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.3');
    } finally {
      vi.useRealTimers();
    }
  });

  it('re-arms the fallback grace after a later report clears an earlier fallback grant, instead of reapplying it instantly', async () => {
    settings['platform.webViewContentZoom'] = 1.3;
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    vi.useFakeTimers();
    try {
      setContentZoomAreas('editor-1', []);
      vi.advanceTimersByTime(1000);
      expect(iframe.style.zoom).toBe('1.3'); // the fallback grant from the first grace
      setContentZoomAreas('editor-1', ['main']);
      expect(iframe.style.zoom).toBe(''); // an area exists now, so the grant is revoked
      setContentZoomAreas('editor-1', []);
      expect(iframe.style.zoom).toBe(''); // the revoked grant must not apply instantly
      vi.advanceTimersByTime(999);
      expect(iframe.style.zoom).toBe('');
      vi.advanceTimersByTime(1);
      expect(iframe.style.zoom).toBe('1.3'); // only a fresh, fully-elapsed grace re-grants it
    } finally {
      vi.useRealTimers();
    }
  });

  it('never scales a pane whole when its content reports an area within the grace period', async () => {
    settings['platform.webViewContentZoom'] = 1.3;
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    vi.useFakeTimers();
    try {
      // The bootstrap's first scan runs before the pane's React tree has mounted anything marked.
      setContentZoomAreas('editor-1', []);
      applyContentZoomForWebView('editor-1');
      vi.advanceTimersByTime(500);
      expect(iframe.style.zoom).toBe('');
      setContentZoomAreas('editor-1', ['main']);
      vi.advanceTimersByTime(2000);
      expect(iframe.style.zoom).toBe('');
      expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.3');
    } finally {
      vi.useRealTimers();
    }
  });

  it('arms the fallback grace from the iframe load hook too, so a pane whose bootstrap never reports still gets the whole-view fallback', async () => {
    settings['platform.webViewContentZoom'] = 1.3;
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    forgetContentZoom('editor-1'); // no area report at all, as for a bootstrap that never runs
    vi.useFakeTimers();
    try {
      applyContentZoomForWebView('editor-1');
      expect(iframe.style.zoom).toBe('');
      vi.advanceTimersByTime(1000);
      expect(iframe.style.zoom).toBe('1.3');
    } finally {
      vi.useRealTimers();
    }
  });

  it('cancels the grace armed by the iframe load hook once the pane reports an area within it', async () => {
    settings['platform.webViewContentZoom'] = 1.3;
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    forgetContentZoom('editor-1');
    vi.useFakeTimers();
    try {
      applyContentZoomForWebView('editor-1');
      vi.advanceTimersByTime(500);
      setContentZoomAreas('editor-1', ['main']);
      vi.advanceTimersByTime(2000);
      expect(iframe.style.zoom).toBe('');
      expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.3');
    } finally {
      vi.useRealTimers();
    }
  });

  it('clears a stale whole-iframe zoom left by the old content at reload, then gives the pane a fresh grace instead of instantly reapplying it', async () => {
    settings['platform.webViewContentZoom'] = 1.3;
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    vi.useFakeTimers();
    try {
      setContentZoomAreas('editor-1', []);
      vi.advanceTimersByTime(1000);
      expect(iframe.style.zoom).toBe('1.3'); // the fallback grant earned by the old content

      // The reload's new content hasn't rendered anything yet, and an in-place reload does not
      // itself touch the iframe element's own style — the stale zoom stays on it until the load
      // hook explicitly clears it.
      applyContentZoomForWebView('editor-1');
      expect(iframe.style.zoom).toBe(''); // the stale zoom is cleared at once, not left applied

      vi.advanceTimersByTime(999);
      expect(iframe.style.zoom).toBe('');
      vi.advanceTimersByTime(1);
      expect(iframe.style.zoom).toBe('1.3'); // only a fresh, fully-elapsed grace re-grants it
    } finally {
      vi.useRealTimers();
    }
  });

  it('scales a URL web view whole straight away, since it never runs the bootstrap and never reports areas', () => {
    definitions.set('url-1', {
      id: 'url-1',
      webViewType: 'someExtension.urlView',
      contentType: 'url',
    });
    applyContentZoomForWebView('url-1');
    expect(iframe.style.zoom).toBe('1');
    expect(cssVar(iframe, '--platform-content-zoom-default')).toBe('1');
  });

  it('applyContentZoomForWebView leaves a pane that has not reported yet unscaled, and pushes a per-area variable once it has', () => {
    // Every call for a known non-URL pane now arms a fallback grace timer, so fake timers keep
    // that timer from leaking into later tests as a real pending setTimeout.
    vi.useFakeTimers();
    try {
      applyContentZoomForWebView('editor-7');
      expect(iframe.style.zoom).toBe('');
      expect(cssVar(iframe, '--platform-content-zoom-default')).toBe('1');
      setContentZoomAreas('editor-1', ['main']);
      applyContentZoomForWebView('editor-1');
      expect(iframe.style.zoom).toBe('');
      expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1');
    } finally {
      vi.useRealTimers();
    }
  });

  it('gives a late-reported area its remembered level', async () => {
    requireDefinition('editor-1').state = { [LEVELS]: { footnotes: 1.7 } };
    setContentZoomAreas('editor-1', ['main']);
    expect(cssVar(iframe, '--platform-content-zoom-footnotes')).toBe('1.7'); // own levels are always written
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    expect(cssVar(iframe, '--platform-content-zoom-footnotes')).toBe('1.7');
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1');
  });

  it('prunes editor/notes memory whose project no longer exists, leaving resource memory alone', async () => {
    settings[MEMORY] = {
      'editor:proj-Z:main': 1.2,
      'notes:proj-A:footnotes': 1.1,
      'resource:res-X:main': 1.4,
    };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    expect(settings[MEMORY]).toEqual({ 'notes:proj-A:footnotes': 1.1, 'resource:res-X:main': 1.4 });
  });

  it('does not write the memory setting when nothing needs pruning', async () => {
    settings[MEMORY] = { 'notes:proj-A:footnotes': 1.1, 'resource:res-X:main': 1.4 };
    __setContentZoomDepsForTesting({});
    settingsSet.mockClear();
    await initializeContentZoomService();
    expect(settingsSet).not.toHaveBeenCalled();
  });

  it('prunes nothing when the project lookup answers with no projects at all', async () => {
    settings[MEMORY] = { 'editor:proj-Z:main': 1.2, 'notes:proj-A:footnotes': 1.1 };
    __setContentZoomDepsForTesting({ listProjects: async () => [] });
    settingsSet.mockClear();
    await initializeContentZoomService();
    expect(settingsSet).not.toHaveBeenCalledWith(MEMORY, expect.anything());
    expect(settings[MEMORY]).toEqual({
      'editor:proj-Z:main': 1.2,
      'notes:proj-A:footnotes': 1.1,
    });
  });

  it('reports an unknown area once per pane and area, however often it is asked for', () => {
    vi.mocked(logger.debug).mockClear();
    expect(resolveContentZoomArea('editor-1', 'sidebar')).toBeUndefined();
    expect(resolveContentZoomArea('editor-1', 'sidebar')).toBeUndefined();
    expect(vi.mocked(logger.debug)).toHaveBeenCalledTimes(1);
    expect(resolveContentZoomArea('editor-1', 'margin')).toBeUndefined();
    expect(vi.mocked(logger.debug)).toHaveBeenCalledTimes(2);
    forgetContentZoom('editor-1');
    setContentZoomAreas('editor-1', ['main']);
    expect(resolveContentZoomArea('editor-1', 'sidebar')).toBeUndefined();
    expect(vi.mocked(logger.debug)).toHaveBeenCalledTimes(3);
  });

  it('still pushes the factor and names the default when the label could not be localized', async () => {
    settings['platform.webViewContentZoom'] = 1;
    __setContentZoomDepsForTesting({
      localize: async () => {
        throw new Error('localization is down');
      },
    });
    await initializeContentZoomService();
    requireDefinition('editor-1').state = { [LEVELS]: { main: 1.4 } };
    await resetContentZoom('editor-1', 'main');
    expect(definitions.get('editor-1')?.state).toEqual({});
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1');
    expect(showIndicator).toHaveBeenLastCalledWith('main', `Default · ${formatZoomPercent(1)}`);
  });

  it('repushes every open pane, including one granted the whole-iframe fallback, when the default setting changes', () => {
    definitions.set('url-1', {
      id: 'url-1',
      webViewType: 'someExtension.urlView',
      contentType: 'url',
    });
    expect(defaultCallbacks).toHaveLength(1);
    defaultCallbacks[0](1.5); // no re-init: this is the live subscription callback, fired directly
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.5');
    expect(iframe.style.zoom).toBe('1.5');
  });

  it("pushes a pane's variables when it is adopted into this window (onDidUpdateWebView)", () => {
    requireDefinition('editor-1').state = { [LEVELS]: { main: 1.6 } };
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1'); // not pushed yet
    if (!onDidUpdateWebViewCallback) throw new Error('onDidUpdateWebView callback not captured');
    onDidUpdateWebViewCallback({ webView: requireDefinition('editor-1') });
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.6');
  });

  it('flushes a pending memory write immediately on beforeunload, without waiting for the debounce delay', async () => {
    vi.useFakeTimers();
    try {
      await adjustContentZoom('editor-1', 1, 'main');
      expect(settingsSet).not.toHaveBeenCalledWith(MEMORY, expect.anything());
      window.dispatchEvent(new Event('beforeunload'));
      // Real time never advances past the debounce delay here (fake timers, 0 ms advanced): the
      // pending write's own promise chain still settles, since that only needs its microtasks
      // drained, but the debounce's own timer never gets the chance to fire on its own. So this can
      // only pass because `beforeunload` itself flushed the write, not because the delay elapsed.
      await vi.advanceTimersByTimeAsync(0);
      expect(settingsSet).toHaveBeenCalledTimes(1);
      expect(settingsSet).toHaveBeenCalledWith(MEMORY, { 'editor:proj-A:main': 1.1 });
    } finally {
      vi.useRealTimers();
    }
  });

  it('ignores a non-finite deltaSteps, writing no state, memory or indicator', async () => {
    await adjustContentZoom('editor-1', Number.NaN, 'main');
    await adjustContentZoom('editor-1', Number.POSITIVE_INFINITY, 'main');
    await __flushContentZoomMemoryForTesting();
    expect(definitions.get('editor-1')?.state).toEqual({});
    expect(updateDefinition).not.toHaveBeenCalled();
    expect(settingsSet).not.toHaveBeenCalledWith(MEMORY, expect.anything());
    expect(showIndicator).not.toHaveBeenCalled();
  });
});
