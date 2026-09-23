import { adjustZoomFactor } from 'platform-bible-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));
vi.mock('@shared/services/settings.service', () => ({ settingsService: {} }));
vi.mock('@shared/services/localization.service', () => ({ localizationService: {} }));
vi.mock('@renderer/services/overlays/overlay-coordinates', () => ({ getWebViewIframe: vi.fn() }));

// Import types and the service under test after the mocks above are established.
// eslint-disable-next-line import/first
import type { SavedWebViewDefinition } from '@shared/models/web-view.model';
// The mocked logger, so a test can assert on a warning it produced.
// eslint-disable-next-line import/first
import { logger } from '@shared/services/logger.service';
// The percent formatter, so an assertion spells the number exactly as the code does rather than
// hard-coding a rounding of its own.
// eslint-disable-next-line import/first
import { formatZoomPercent } from '@shared/utils/content-zoom.util';
// The service itself, for the same reason as the type import above.
// eslint-disable-next-line import/first
import {
  __flushContentZoomWritesForTesting,
  __setContentZoomDepsForTesting,
  adjustContentZoom,
  applyContentZoomForWebView,
  canContentZoomActOnActiveTarget,
  forgetContentZoom,
  getInitialContentZoomForWebView,
  initializeContentZoomService,
  isContentZoomable,
  onDidChangeContentZoomable,
  pushContentZoom,
  resetContentZoom,
  resolveContentZoomArea,
  resolveContentZoomTarget,
  setContentZoomActiveArea,
  setContentZoomAreas,
} from './web-view-content-zoom.service';

const LEVELS = 'platform.contentZoomLevels';
const IDENTITY = 'platform.contentZoomIdentity';
const MEMORY = 'platform.webViewContentZoomMemory';

/**
 * The state a pane holds when its own levels are `levels`: the levels themselves plus the stamp
 * naming the kind and identity they belong to, which the platform writes and removes with them.
 */
function zoomState(
  levels: Record<string, number>,
  identity = 'editor:PROJ-A',
): Record<string, unknown> {
  return { [LEVELS]: levels, [IDENTITY]: identity };
}

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

/**
 * The CSS `zoom` on the iframe element itself, `''` when none is set. jsdom does not implement
 * `zoom`, so the property reads `undefined` until something assigns it, where a browser reads
 * `''`.
 */
function frameZoom(iframe: HTMLIFrameElement): string {
  return Reflect.get(iframe.style, 'zoom') ?? '';
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
  /** The harness's own definition write, so a test can swap it out and put it back. */
  function applyDefinitionUpdate(id: string, update: { state?: Record<string, unknown> }): boolean {
    const def = definitions.get(id);
    if (!def) return false;
    def.state = update.state;
    return true;
  }
  const updateDefinition = vi.fn(applyDefinitionUpdate);
  let iframe: HTMLIFrameElement;
  const showIndicator = vi.fn();
  let lastFocused: string | undefined;
  let windowInputBlocked = false;
  /** One iframe per pane, since the production `getIframe` is keyed by web view id. */
  const iframes = new Map<string, HTMLIFrameElement>();
  function iframeFor(webViewId: string): HTMLIFrameElement {
    const existing = iframes.get(webViewId);
    if (existing) return existing;
    const created = makeIframe();
    Object.assign(created.contentWindow ?? {}, { __platformContentZoom: { showIndicator } });
    iframes.set(webViewId, created);
    return created;
  }

  /**
   * Opens a pane of a web view type core's declaration map does not list, so it is zoomable only
   * while it reports an area, and returns its iframe.
   */
  function openUndeclaredPane(id: string): HTMLIFrameElement {
    definitions.set(id, { id, webViewType: 'thirdParty.view', projectId: 'proj-A', state: {} });
    return iframeFor(id);
  }

  beforeEach(async () => {
    definitions.clear();
    settings['platform.webViewContentZoom'] = 1;
    settings[MEMORY] = {};
    memoryCallbacks.length = 0;
    defaultCallbacks.length = 0;
    onDidUpdateWebViewCallback = undefined;
    settingsSet.mockClear();
    updateDefinition.mockClear();
    updateDefinition.mockImplementation(applyDefinitionUpdate);
    showIndicator.mockClear();
    vi.mocked(logger.warn).mockClear();
    lastFocused = undefined;
    windowInputBlocked = false;
    document.body.innerHTML = '';
    iframes.clear();
    iframe = iframeFor('editor-1');
    definitions.set('editor-1', {
      id: 'editor-1',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: {},
    });
    __setContentZoomDepsForTesting({
      getIframe: (id: string) => iframeFor(id),
      getDefinition: (id: string) => definitions.get(id),
      updateDefinition,
      getAllOpenDefinitions: () => [...definitions.values()],
      onDidUpdateWebView: (callback) => {
        onDidUpdateWebViewCallback = callback;
        return () => false;
      },
      getLastFocusedTabId: () => lastFocused,
      isWindowInputBlocked: () => windowInputBlocked,
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

  it('lets a blocked window stop only the no-id path; an explicitly targeted pane still resolves', () => {
    lastFocused = 'editor-1';
    windowInputBlocked = true;
    expect(resolveContentZoomTarget('editor-1')).toBe('editor-1');
    expect(resolveContentZoomTarget(undefined)).toBeUndefined();
  });

  it('resolves the area: explicit and known → itself; unknown → nothing; none given → active, else first; a declared pane with none reported → its declared area', () => {
    expect(resolveContentZoomArea('editor-1', 'footnotes')).toBe('footnotes');
    expect(resolveContentZoomArea('editor-1', 'sidebar')).toBeUndefined();
    expect(resolveContentZoomArea('editor-1', undefined)).toBe('main');
    setContentZoomActiveArea('editor-1', 'footnotes');
    expect(resolveContentZoomArea('editor-1', undefined)).toBe('footnotes');
    setContentZoomAreas('editor-1', []);
    expect(resolveContentZoomArea('editor-1', undefined)).toBe('main');
    openUndeclaredPane('ext-1');
    expect(resolveContentZoomArea('ext-1', undefined)).toBeUndefined();
  });

  it('answers whether a request carrying no ids has a zoomable pane to act on', () => {
    expect(canContentZoomActOnActiveTarget()).toBe(false);
    lastFocused = 'editor-1';
    expect(canContentZoomActOnActiveTarget()).toBe(true);
    setContentZoomAreas('editor-1', []);
    // Declared: the window-chrome chord still acts, on the declared area.
    expect(canContentZoomActOnActiveTarget()).toBe(true);
    openUndeclaredPane('ext-1');
    lastFocused = 'ext-1';
    expect(canContentZoomActOnActiveTarget()).toBe(false);
    setContentZoomAreas('ext-1', ['main']);
    expect(canContentZoomActOnActiveTarget()).toBe(true);
    windowInputBlocked = true;
    expect(canContentZoomActOnActiveTarget()).toBe(false);
  });

  it('zooms one area in from the default, writes state and memory for that area, pushes its variable and shows the indicator there', async () => {
    await adjustContentZoom('editor-1', 1, 'main');
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.1 }));
    expect(settings[MEMORY]).toEqual({ 'editor:PROJ-A:main': 1.1 });
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.1');
    expect(cssVar(iframe, '--platform-content-zoom-footnotes')).toBe('1');
    expect(cssVar(iframe, '--platform-content-zoom-default')).toBe('1');
    expect(showIndicator).toHaveBeenCalledWith('main', '110 %');
  });

  it('keeps the areas independent: zooming the footnotes leaves the text alone and never inherits its level', async () => {
    await adjustContentZoom('editor-1', 1, 'main');
    await adjustContentZoom('editor-1', 1, 'main');
    await adjustContentZoom('editor-1', 1, 'footnotes');
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.2, footnotes: 1.1 }));
    expect(settings[MEMORY]).toEqual({ 'editor:PROJ-A:main': 1.2, 'editor:PROJ-A:footnotes': 1.1 });
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.2');
    expect(cssVar(iframe, '--platform-content-zoom-footnotes')).toBe('1.1');
    expect(showIndicator).toHaveBeenLastCalledWith('footnotes', '110 %');
  });

  it('without an area id acts on the active area', async () => {
    setContentZoomActiveArea('editor-1', 'footnotes');
    await adjustContentZoom('editor-1', 1);
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ footnotes: 1.1 }));
  });

  it("reset deletes that area's level and memory entry and returns it to the default; an empty map is removed from state", async () => {
    settings['platform.webViewContentZoom'] = 1.5;
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    await adjustContentZoom('editor-1', 1, 'main'); // 1.6
    await __flushContentZoomWritesForTesting(); // persist 1.6 so the reset below deletes a real entry
    await resetContentZoom('editor-1', 'main');
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('editor-1')?.state).toEqual({});
    expect(settings[MEMORY]).toEqual({});
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.5');
    expect(showIndicator).toHaveBeenLastCalledWith('main', 'Default · 150 %');
  });

  it('leaves the shared memory key alone when the acting pane holds no level of its own', async () => {
    settings[MEMORY] = { 'editor:PROJ-A:main': 1.2 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    definitions.set('editor-2', {
      id: 'editor-2',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: { [LEVELS]: { main: 1.2 } },
    });
    requireDefinition('editor-1').state = {}; // the drift state: memory remembers, the pane does not
    settingsSet.mockClear();
    await resetContentZoom('editor-1', 'main');
    await __flushContentZoomWritesForTesting();
    expect(settingsSet).not.toHaveBeenCalled();
    memoryCallbacks.forEach((cb) => cb(settings[MEMORY]));
    // Untouched: this pane never reported an area and was never written to, so it holds exactly the
    // level it was set up with and no identity stamp.
    expect(definitions.get('editor-2')?.state).toEqual({ [LEVELS]: { main: 1.2 } });
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

  it('shows a zoom step whose definition write failed, and still shares it', async () => {
    updateDefinition.mockImplementation(() => false);
    await adjustContentZoom('editor-1', 1, 'main');
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.1');
    expect(showIndicator).toHaveBeenCalledWith('main', '110 %');
    await __flushContentZoomWritesForTesting();
    expect(settings[MEMORY]).toEqual({ 'editor:PROJ-A:main': 1.1 });
    // The retry guard still applies: the level stayed pending because the write above failed, so
    // the next opportunity to write it — here, the unload flush — carries it.
    updateDefinition.mockImplementation(applyDefinitionUpdate);
    window.dispatchEvent(new Event('beforeunload'));
    expect(updateDefinition).toHaveBeenCalledWith('editor-1', {
      state: zoomState({ main: 1.1 }),
    });
  });

  it('shows a reset whose definition write failed, and still drops the shared level', async () => {
    requireDefinition('editor-1').state = { [LEVELS]: { main: 1.4 } };
    settings[MEMORY] = { 'editor:PROJ-A:main': 1.4 };
    updateDefinition.mockImplementation(() => false);
    await resetContentZoom('editor-1', 'main');
    expect(showIndicator).toHaveBeenCalledWith('main', 'Default · 100 %');
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1');
    await __flushContentZoomWritesForTesting();
    expect(settings[MEMORY]).toEqual({});
  });

  it('coalesces an un-awaited burst of adjustments into one memory write per key', async () => {
    const first = adjustContentZoom('editor-1', 1, 'main');
    const second = adjustContentZoom('editor-1', 1, 'main');
    const third = adjustContentZoom('editor-1', 1, 'footnotes');
    await Promise.all([first, second, third]);
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.2, footnotes: 1.1 }));
    expect(settings[MEMORY]).toEqual({
      'editor:PROJ-A:main': 1.2,
      'editor:PROJ-A:footnotes': 1.1,
    });
    expect(settingsSet).toHaveBeenCalledTimes(1);
  });

  it('writes the first step of a zoom burst at once and the rest as one trailing write', async () => {
    vi.useFakeTimers();
    try {
      updateDefinition.mockClear();
      for (let step = 0; step < 10; step += 1) {
        // The burst is sequential the way a wheel gesture is, all inside one debounce window.
        // eslint-disable-next-line no-await-in-loop
        await adjustContentZoom('editor-1', 1, 'main');
      }
      expect(updateDefinition).toHaveBeenCalledTimes(1);
      // Reads during the burst see the level the user is looking at, not the one last written.
      expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('2');
      vi.advanceTimersByTime(250);
      expect(updateDefinition).toHaveBeenCalledTimes(2);
      expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 2 }));
    } finally {
      vi.useRealTimers();
    }
  });

  it('flushes a deferred definition write on beforeunload', async () => {
    vi.useFakeTimers();
    try {
      await adjustContentZoom('editor-1', 1, 'main');
      await adjustContentZoom('editor-1', 1, 'main');
      expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.1 }));
      window.dispatchEvent(new Event('beforeunload'));
      expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.2 }));
    } finally {
      vi.useRealTimers();
    }
  });

  it('logs instead of throwing when the trailing definition write of a burst fails', async () => {
    vi.useFakeTimers();
    try {
      await adjustContentZoom('editor-1', 1, 'main'); // written immediately
      await adjustContentZoom('editor-1', 1, 'main'); // deferred into the open window
      updateDefinition.mockImplementation(() => {
        throw new Error('local storage quota exceeded');
      });
      expect(() => vi.advanceTimersByTime(250)).not.toThrow();
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('could not store'));
    } finally {
      vi.useRealTimers();
    }
  });

  it("keeps a burst's levels pending when its trailing write fails, and writes them with the next edit", async () => {
    vi.useFakeTimers();
    try {
      await adjustContentZoom('editor-1', 1, 'main'); // 1.1, written immediately
      await adjustContentZoom('editor-1', 1, 'main'); // 1.2, deferred into the open window
      updateDefinition.mockImplementation(() => {
        throw new Error('local storage quota exceeded');
      });
      vi.advanceTimersByTime(250); // the trailing write of the burst fails
      updateDefinition.mockImplementation(applyDefinitionUpdate);
      updateDefinition.mockClear();
      // The next step of the same gesture starts from the level the failed write was carrying, and
      // its own write carries that level with it rather than leaving it behind.
      await adjustContentZoom('editor-1', 1, 'main'); // 1.3
      expect(updateDefinition).toHaveBeenCalledWith('editor-1', {
        state: zoomState({ main: 1.3 }),
      });
      expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.3 }));
      expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.3');
    } finally {
      vi.useRealTimers();
    }
  });

  it("writes a burst's pending levels when a pane is forgotten mid-burst", async () => {
    vi.useFakeTimers();
    try {
      await adjustContentZoom('editor-1', 1, 'main'); // 1.1, written immediately
      await adjustContentZoom('editor-1', 1, 'main'); // 1.2, deferred into the open window
      expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.1 }));
      // A re-render or a move between windows unmounts the pane while its definition lives on, so
      // the tail of the gesture has somewhere to land.
      forgetContentZoom('editor-1');
      expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.2 }));
    } finally {
      vi.useRealTimers();
    }
  });

  it("keeps a forgotten pane's pending levels when the flush-on-forget write fails", async () => {
    vi.useFakeTimers();
    try {
      await adjustContentZoom('editor-1', 1, 'main'); // 1.1, written immediately
      await adjustContentZoom('editor-1', 1, 'main'); // 1.2, deferred into the open window
      updateDefinition.mockImplementation(() => {
        throw new Error('local storage quota exceeded');
      });
      // The definition still exists, so forgetting the pane attempts the write, but it fails; the
      // level must stay pending rather than being discarded along with the rest of the pane's state.
      forgetContentZoom('editor-1');
      updateDefinition.mockImplementation(applyDefinitionUpdate);
      updateDefinition.mockClear();
      window.dispatchEvent(new Event('beforeunload'));
      expect(updateDefinition).toHaveBeenCalledWith('editor-1', {
        state: zoomState({ main: 1.2 }),
      });
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not let a failing definition read escape a pane being forgotten', async () => {
    vi.useFakeTimers();
    try {
      let getDefinitionThrows = false;
      __setContentZoomDepsForTesting({
        getDefinition: (id: string) => {
          if (getDefinitionThrows) throw new Error('dock layout is not registered');
          return definitions.get(id);
        },
      });
      await initializeContentZoomService();
      setContentZoomAreas('editor-1', ['main', 'footnotes']);
      await adjustContentZoom('editor-1', 1, 'main'); // 1.1, written immediately
      await adjustContentZoom('editor-1', 1, 'main'); // 1.2, deferred into the open window
      getDefinitionThrows = true;
      expect(() => forgetContentZoom('editor-1')).not.toThrow();
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('could not store'));
    } finally {
      vi.useRealTimers();
    }
  });

  it('still flushes the memory write on beforeunload when a definition write fails', async () => {
    vi.useFakeTimers();
    try {
      await adjustContentZoom('editor-1', 1, 'main'); // written immediately
      await adjustContentZoom('editor-1', 1, 'main'); // deferred into the open window
      updateDefinition.mockImplementation(() => {
        throw new Error('local storage quota exceeded');
      });
      settingsSet.mockClear();
      window.dispatchEvent(new Event('beforeunload'));
      await vi.advanceTimersByTimeAsync(0);
      expect(settingsSet).toHaveBeenCalledWith(MEMORY, { 'editor:PROJ-A:main': 1.2 });
    } finally {
      vi.useRealTimers();
    }
  });

  it('still flushes the memory write on beforeunload when the definition read throws', async () => {
    vi.useFakeTimers();
    try {
      let getDefinitionThrows = false;
      __setContentZoomDepsForTesting({
        getDefinition: (id: string) => {
          if (getDefinitionThrows) throw new Error('dock layout is not registered');
          return definitions.get(id);
        },
      });
      await initializeContentZoomService();
      setContentZoomAreas('editor-1', ['main', 'footnotes']);
      await adjustContentZoom('editor-1', 1, 'main'); // written immediately
      await adjustContentZoom('editor-1', 1, 'main'); // deferred into the open window
      getDefinitionThrows = true;
      settingsSet.mockClear();
      window.dispatchEvent(new Event('beforeunload'));
      await vi.advanceTimersByTimeAsync(0);
      expect(settingsSet).toHaveBeenCalledWith(MEMORY, { 'editor:PROJ-A:main': 1.2 });
      // The pane's own levels are still pending, since the read that would have stored them threw;
      // once the pane is reachable again the next flush is what finally lands them.
      getDefinitionThrows = false;
      window.dispatchEvent(new Event('beforeunload'));
      await vi.advanceTimersByTimeAsync(0);
      expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.2 }));
    } finally {
      vi.useRealTimers();
    }
  });

  it("keeps syncing the siblings after one pane's write fails, instead of leaving the rest of the walk on the old value", () => {
    definitions.set('editor-2', {
      id: 'editor-2',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: { [LEVELS]: { main: 1.5 } },
    });
    definitions.set('editor-3', {
      id: 'editor-3',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: { [LEVELS]: { main: 1.5 } },
    });
    requireDefinition('editor-1').state = { [LEVELS]: { main: 1.5 } };
    memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-A:main': 1.5 }));
    // A definition write can throw partway through the walk: it reaches an unguarded local-storage
    // write that fails when the quota is exhausted.
    updateDefinition.mockImplementation(
      (id: string, update: { state?: Record<string, unknown> }) => {
        if (id === 'editor-2') throw new Error('local storage quota exceeded');
        return applyDefinitionUpdate(id, update);
      },
    );
    memoryCallbacks.forEach((cb) => cb({}));
    expect(definitions.get('editor-1')?.state).toEqual({}); // before the failing pane: still lands
    expect(definitions.get('editor-2')?.state).toEqual({ [LEVELS]: { main: 1.5 } }); // its own write failed
    expect(definitions.get('editor-3')?.state).toEqual({}); // after the failing pane: still reached
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('editor-2'));
  });

  it('retries a pane whose write did not land on the next memory change, without holding the other panes back', () => {
    definitions.set('editor-2', {
      id: 'editor-2',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: { [LEVELS]: { main: 1.5 } },
    });
    requireDefinition('editor-1').state = { [LEVELS]: { main: 1.5 } };
    memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-A:main': 1.5 }));
    updateDefinition.mockImplementation(
      (id: string, update: { state?: Record<string, unknown> }) => {
        if (id === 'editor-2') throw new Error('local storage quota exceeded');
        return applyDefinitionUpdate(id, update);
      },
    );
    memoryCallbacks.forEach((cb) => cb({}));
    expect(definitions.get('editor-1')?.state).toEqual({}); // the healthy pane takes the deletion
    expect(definitions.get('editor-2')?.state).toEqual({ [LEVELS]: { main: 1.5 } });
    updateDefinition.mockImplementation(applyDefinitionUpdate);
    // The same delta reaches the pane that missed it, on the next change memory delivers.
    memoryCallbacks.forEach((cb) => cb({}));
    expect(definitions.get('editor-2')?.state).toEqual({});
    expect(definitions.get('editor-1')?.state).toEqual({});
  });

  it('does not let a stamp-mismatch redirect that turns out to be a no-op advance the record a later delta is computed against', async () => {
    settings[MEMORY] = { 'notes:AAA:main': 1.5 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-s4', {
      id: 'notes-s4',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    // Registers the pane's areas (this first report also seeds it, which the next line overrides).
    setContentZoomAreas('notes-s4', ['main', 'footnotes']);
    // Its stamp names a project it no longer shows, so its own re-seed for "notes:AAA" is owed.
    definitions.set('notes-s4', {
      ...requireDefinition('notes-s4'),
      state: zoomState({ main: 1.5 }, 'notes:ZZZ'),
    });

    // An edit to "main" is chosen for the pane's CURRENT identity and stays pending (its commit
    // fails) while its memory write lands, so the redirect below finds a pending write it must not
    // overwrite.
    updateDefinition.mockImplementation(() => false);
    await adjustContentZoom('notes-s4', 1, 'main');
    const mainLevel = adjustZoomFactor(1, 1); // the default (1), stepped once
    await __flushContentZoomWritesForTesting();
    expect(settings[MEMORY]).toEqual({ 'notes:AAA:main': mainLevel });
    expect(definitions.get('notes-s4')?.state).toEqual(zoomState({ main: 1.5 }, 'notes:ZZZ'));

    // A sibling's reset removes "main" from memory. The stamp mismatch redirects this pane to its
    // own re-seed, which is a no-op: the pending edit, already chosen for the pane's current
    // identity, outranks memory rather than being overwritten by it -- so the deletion never
    // reaches this pane through this delta.
    memoryCallbacks.forEach((cb) => cb({}));
    expect(definitions.get('notes-s4')?.state).toEqual(zoomState({ main: 1.5 }, 'notes:ZZZ'));

    // The pending edit commits, stamping the pane under its real identity -- with the "main" the
    // deletion above was never able to reach.
    updateDefinition.mockImplementation(applyDefinitionUpdate);
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-s4')?.state).toEqual(zoomState({ main: mainLevel }, 'notes:AAA'));

    // The same (still empty) memory record reaches this window again. With the pane now correctly
    // stamped, this is its first real chance to learn "main" was removed -- unless the earlier
    // no-op was wrongly counted as having taken that deletion already.
    memoryCallbacks.forEach((cb) => cb({}));
    expect(definitions.get('notes-s4')?.state).toEqual({});
  });

  it("keeps walking the siblings when reading one pane's definition throws", async () => {
    definitions.set('editor-2', {
      id: 'editor-2',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: { [LEVELS]: { main: 1.5 } },
    });
    definitions.set('editor-3', {
      id: 'editor-3',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: { [LEVELS]: { main: 1.5 } },
    });
    requireDefinition('editor-1').state = { [LEVELS]: { main: 1.5 } };
    // A definition read can throw partway through the walk: the dock layout it reconciles is shared
    // state that another window's update can leave a pane detached from.
    let throwingPane: string | undefined;
    __setContentZoomDepsForTesting({
      getDefinition: (id: string) => {
        if (id === throwingPane) throw new Error('detached from the dock layout');
        return definitions.get(id);
      },
    });
    memoryCallbacks.length = 0;
    await initializeContentZoomService();
    memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-A:main': 1.5 }));
    throwingPane = 'editor-2';
    vi.mocked(logger.warn).mockClear();
    memoryCallbacks.forEach((cb) => cb({}));
    expect(definitions.get('editor-1')?.state).toEqual({}); // before the throwing pane: still lands
    expect(definitions.get('editor-3')?.state).toEqual({}); // after it: still reached
    expect(definitions.get('editor-2')?.state).toEqual({ [LEVELS]: { main: 1.5 } });
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('editor-2'));
    // The record did not advance, so the same delta reaches the pane that missed it.
    throwingPane = undefined;
    memoryCallbacks.forEach((cb) => cb({}));
    expect(definitions.get('editor-2')?.state).toEqual({});
  });

  it('retries a sibling update that was queued into a zoom burst whose write then failed', async () => {
    vi.useFakeTimers();
    try {
      await adjustContentZoom('editor-1', 1, 'main'); // 1.1 at once; the burst window is open
      // Another window's level for a second area of the same identity, which this pane can only
      // queue into the window its own gesture has open.
      memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-A:footnotes': 1.4 }));
      updateDefinition.mockImplementation(() => {
        throw new Error('local storage quota exceeded');
      });
      vi.advanceTimersByTime(250); // the trailing write that was to carry it fails
      updateDefinition.mockImplementation(applyDefinitionUpdate);
      updateDefinition.mockClear();
      memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-A:footnotes': 1.4 }));
      expect(updateDefinition).toHaveBeenCalledWith('editor-1', {
        state: zoomState({ main: 1.1, footnotes: 1.4 }),
      });
      expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.1, footnotes: 1.4 }));
    } finally {
      vi.useRealTimers();
    }
  });

  it("gives up a level that memory dropped while the pane's burst window was open", async () => {
    vi.useFakeTimers();
    try {
      await adjustContentZoom('editor-1', 1, 'main'); // 1.1 at once; the burst window is open
      memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-A:footnotes': 1.4 }));
      vi.advanceTimersByTime(250); // the burst's trailing write lands, carrying both levels
      expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.1, footnotes: 1.4 }));
      // The deletion half of a delta exists only in the record the walk reconciled against, so the
      // pane must be counted as in line with a change it took through an open burst window: a
      // record left behind here names no area, and the level the reset gave up would stay applied.
      memoryCallbacks.forEach((cb) => cb({})); // the footnotes level is reset in another window
      expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.1 }));
    } finally {
      vi.useRealTimers();
    }
  });

  it('brings both changed areas of a pane in line with one definition write', () => {
    requireDefinition('editor-1').state = { [LEVELS]: { main: 1.4, footnotes: 1.4 } };
    updateDefinition.mockClear();
    memoryCallbacks.forEach((cb) =>
      cb({ 'editor:PROJ-A:main': 1.2, 'editor:PROJ-A:footnotes': 1.3 }),
    );
    expect(updateDefinition).toHaveBeenCalledTimes(1);
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.2, footnotes: 1.3 }));
  });

  it('shows the shared level in a sibling whose definition write failed', async () => {
    settings[MEMORY] = {};
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main']);
    definitions.set('editor-2', {
      id: 'editor-2',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: {},
    });
    setContentZoomAreas('editor-2', ['main']);
    updateDefinition.mockImplementation(
      (id: string, update: { state?: Record<string, unknown> }) =>
        id === 'editor-2' ? false : applyDefinitionUpdate(id, update),
    );

    memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-A:main': 1.4 }));
    expect(cssVar(iframeFor('editor-2'), '--platform-content-zoom-main')).toBe('1.4');
    // Controls: the write really did fail, so the level above is the push happening anyway; and the
    // pane that could be written took the same level, so the walk was not skipped.
    expect(definitions.get('editor-2')?.state).toEqual({});
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.4 }));
  });

  it('holds the memory write behind the debounce delay, then flushes it in one call', async () => {
    await adjustContentZoom('editor-1', 1, 'main');
    expect(settingsSet).not.toHaveBeenCalledWith(MEMORY, expect.anything());
    await __flushContentZoomWritesForTesting();
    expect(settingsSet).toHaveBeenCalledTimes(1);
    expect(settingsSet).toHaveBeenCalledWith(MEMORY, { 'editor:PROJ-A:main': 1.1 });
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
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    await adjustContentZoom('editor-1', 1, 'main');
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.1 }));
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.1');
    expect(showIndicator).toHaveBeenCalledWith('main', '110 %');
    expect(settingsSet).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalled();
  });

  it('keeps a memory entry whose key this build cannot parse when it writes the record back', async () => {
    settings[MEMORY] = { 'palette:PROJ-A:main': 1.4 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    await adjustContentZoom('editor-1', 1, 'main');
    await __flushContentZoomWritesForTesting();
    expect(settingsSet).toHaveBeenCalledWith(MEMORY, {
      'palette:PROJ-A:main': 1.4,
      'editor:PROJ-A:main': 1.1,
    });
  });

  it('reads memory once at initialization, so panes opening together never read it again', async () => {
    const memoryGets = vi.fn();
    __setContentZoomDepsForTesting({
      settings: {
        get: async (key: string) => {
          if (key === MEMORY) memoryGets();
          return settings[key];
        },
        set: settingsSet,
        // Without a subscription nothing else can prime the cache, which is the state a failed
        // subscription leaves the service in.
        subscribe: async (key: string) => {
          if (key === MEMORY) throw new Error('subscription unavailable');
          return async () => {};
        },
      },
    });
    await initializeContentZoomService();
    // The dock opens a restored layout's panes in one synchronous pass, so the reads overlap; no
    // in-flight read is shared, and only a cache already filled keeps them off the setting.
    await Promise.all([
      getInitialContentZoomForWebView({
        id: 'a',
        webViewType: 'platformScriptureEditor.react',
        projectId: 'proj-A',
      }),
      getInitialContentZoomForWebView({
        id: 'b',
        webViewType: 'platformScriptureEditor.react',
        projectId: 'proj-B',
      }),
    ]);
    expect(memoryGets).toHaveBeenCalledTimes(1);
  });

  it('seeds a new pane per area from state, else memory, else the default', async () => {
    settings[MEMORY] = {
      'editor:PROJ-A:main': 1.3,
      'editor:PROJ-A:footnotes': 0.9,
      'editor:PROJ-B:main': 2,
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

  it('bakes the new project’s levels, not a re-pointed pane’s stale own levels', async () => {
    settings[MEMORY] = {
      'editor:PROJ-A:main': 1.3,
      'editor:PROJ-B:main': 2,
    };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    // The pane's state still carries PROJ-A's levels and stamp — a reused web view id spreads its
    // previous saved state onto the new definition before the dock update lands — but the
    // definition passed to the bake already names PROJ-B. The stamp mismatch means PROJ-A's level
    // must not be baked; PROJ-B's own remembered level takes its place.
    await expect(
      getInitialContentZoomForWebView({
        id: 'w',
        webViewType: 'platformScriptureEditor.react',
        projectId: 'proj-B',
        state: zoomState({ main: 1.3 }, 'editor:PROJ-A'),
      }),
    ).resolves.toEqual({ defaultZoom: 1, levels: { main: 2 } });
  });

  it('bakes the own levels of a stamped pane whose project is gone', async () => {
    settings[MEMORY] = { 'notes:AAA:main': 1.4 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    // No projectId and no state.resourceId: the pane resolves no identity, so nothing says its
    // levels belong to anything other than what it shows.
    await expect(
      getInitialContentZoomForWebView({
        id: 'w',
        webViewType: 'legacyCommentManager.commentListPanel',
        state: zoomState({ main: 1.2 }, 'notes:AAA'),
      }),
    ).resolves.toEqual({ defaultZoom: 1, levels: { main: 1.2 } });
  });

  it("seeds a newly opened pane's state from memory on its first area report", async () => {
    settings[MEMORY] = {
      'editor:PROJ-A:main': 1.3,
      'editor:PROJ-A:footnotes': 0.9,
      'editor:PROJ-B:main': 2,
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
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('editor-3')?.state).toEqual(zoomState({ main: 1.3, footnotes: 0.9 }));
    const pane = iframeFor('editor-3');
    expect(cssVar(pane, '--platform-content-zoom-main')).toBe('1.3');
    expect(cssVar(pane, '--platform-content-zoom-footnotes')).toBe('0.9');
    expect(showIndicator).not.toHaveBeenCalled();
    expect(settingsSet).not.toHaveBeenCalled();
  });

  it("keeps a pane's own level and seeds the remembered areas its state lacks", async () => {
    settings[MEMORY] = {
      'editor:PROJ-A:main': 1.3,
      'editor:PROJ-A:footnotes': 0.9,
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
    expect(definitions.get('editor-4')?.state).toEqual(zoomState({ main: 2, footnotes: 0.9 }));
    // Control: what the pane's own state holds still outranks what memory remembers for it.
    expect(cssVar(iframeFor('editor-4'), '--platform-content-zoom-main')).toBe('2');
    expect(cssVar(iframeFor('editor-4'), '--platform-content-zoom-footnotes')).toBe('0.9');
  });

  it('fills the remembered areas a pane stamped for its current identity lacks, on its first area report', async () => {
    settings[MEMORY] = {
      'editor:PROJ-A:main': 1.5,
      'editor:PROJ-A:footnotes': 0.7,
    };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    // Restored with a level of its own for the footnotes only, stamped for the project it shows.
    definitions.set('editor-4s', {
      id: 'editor-4s',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: zoomState({ footnotes: 0.9 }),
    });
    setContentZoomAreas('editor-4s', ['main', 'footnotes']);
    expect(cssVar(iframeFor('editor-4s'), '--platform-content-zoom-main')).toBe('1.5');
    // Control: the pane's own level still outranks what memory remembers for that area.
    expect(cssVar(iframeFor('editor-4s'), '--platform-content-zoom-footnotes')).toBe('0.9');
    expect(definitions.get('editor-4s')?.state).toEqual(zoomState({ main: 1.5, footnotes: 0.9 }));
  });

  it('seeds a declared pane on an empty first report, and its first non-empty report keeps that seed without rewriting it', async () => {
    settings[MEMORY] = { 'editor:PROJ-A:main': 1.3, 'editor:PROJ-A:footnotes': 0.9 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('editor-6', {
      id: 'editor-6',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: {},
    });
    // The bootstrap's first scan reports no areas yet (e.g. a spinner while the pane loads). The
    // pane already acts on its declared area, so it is seeded now.
    setContentZoomAreas('editor-6', []);
    expect(definitions.get('editor-6')?.state).toEqual(zoomState({ main: 1.3, footnotes: 0.9 }));
    showIndicator.mockClear();
    settingsSet.mockClear();
    updateDefinition.mockClear();
    setContentZoomAreas('editor-6', ['main', 'footnotes']);
    await __flushContentZoomWritesForTesting();
    expect(updateDefinition).not.toHaveBeenCalled();
    expect(definitions.get('editor-6')?.state).toEqual(zoomState({ main: 1.3, footnotes: 0.9 }));
    const pane = iframeFor('editor-6');
    expect(cssVar(pane, '--platform-content-zoom-main')).toBe('1.3');
    expect(cssVar(pane, '--platform-content-zoom-footnotes')).toBe('0.9');
    expect(showIndicator).not.toHaveBeenCalled();
    expect(settingsSet).not.toHaveBeenCalled();
  });

  it('does not seed on a later report', async () => {
    settings[MEMORY] = { 'editor:PROJ-A:main': 1.3 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('editor-5', {
      id: 'editor-5',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: {},
    });
    setContentZoomAreas('editor-5', ['main']);
    expect(definitions.get('editor-5')?.state).toEqual(zoomState({ main: 1.3 }));
    // A memory push (live sharing) adds `footnotes` through the existing sibling-sync path, which
    // is independent of first-report seeding.
    memoryCallbacks.forEach((cb) =>
      cb({ 'editor:PROJ-A:main': 1.3, 'editor:PROJ-A:footnotes': 1.6 }),
    );
    const stateAfterLiveSharing = definitions.get('editor-5')?.state;
    setContentZoomAreas('editor-5', ['main', 'footnotes']);
    expect(definitions.get('editor-5')?.state).toEqual(stateAfterLiveSharing);
  });

  it('re-seeds a pane whose identity changed since its levels were seeded', async () => {
    settings[MEMORY] = { 'notes:AAA:main': 1.2, 'notes:BBB:main': 1.4 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-1', {
      id: 'notes-1',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    setContentZoomAreas('notes-1', ['main']);
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-1')?.state).toEqual(zoomState({ main: 1.2 }, 'notes:AAA'));
    expect(cssVar(iframeFor('notes-1'), '--platform-content-zoom-main')).toBe('1.2');

    // The panel is re-pointed at another project: the same web view id, and a definition the view
    // built by spreading its own saved state — the levels above included — onto the new project.
    definitions.set('notes-1', { ...requireDefinition('notes-1'), projectId: 'bbb' });
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-1') });
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-1')?.state).toEqual(zoomState({ main: 1.4 }, 'notes:BBB'));
    expect(cssVar(iframeFor('notes-1'), '--platform-content-zoom-main')).toBe('1.4');
  });

  it('a re-pointed pane with no remembered level for the new identity drops the old levels', async () => {
    settings[MEMORY] = { 'notes:AAA:main': 1.2 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-2', {
      id: 'notes-2',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    setContentZoomAreas('notes-2', ['main']);
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-2')?.state).toEqual(zoomState({ main: 1.2 }, 'notes:AAA'));

    definitions.set('notes-2', { ...requireDefinition('notes-2'), projectId: 'bbb' });
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-2') });
    await __flushContentZoomWritesForTesting();
    // Nothing is remembered for project B, so the pane follows the Settings default...
    expect(definitions.get('notes-2')?.state).toEqual({});
    expect(cssVar(iframeFor('notes-2'), '--platform-content-zoom-main')).toBe('1');
    // ...and project A's level is not written back into project B's memory entry.
    expect(settings[MEMORY]).toEqual({ 'notes:AAA:main': 1.2 });
  });

  it('does not re-seed a pane that holds its own level while its identity is unchanged', async () => {
    settings[MEMORY] = { 'notes:AAA:main': 1.5 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-3', {
      id: 'notes-3',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      // The level the user gave this pane, restored with the layout.
      state: { [LEVELS]: { main: 1.1 } },
    });
    setContentZoomAreas('notes-3', ['main']);
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-3') });
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-3')?.state).toEqual(zoomState({ main: 1.1 }, 'notes:AAA'));
    expect(cssVar(iframeFor('notes-3'), '--platform-content-zoom-main')).toBe('1.1');
  });

  it('does not hand a reset level back on the definition update the reset itself causes', async () => {
    settings[MEMORY] = { 'notes:AAA:main': 1.2 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-4', {
      id: 'notes-4',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    setContentZoomAreas('notes-4', ['main']);
    await __flushContentZoomWritesForTesting();
    await resetContentZoom('notes-4', 'main');
    // The reset's own definition write comes back as an update while its memory edit is still in
    // the debounce window, so memory still remembers the level the pane just gave up.
    updateDefinition.mockClear();
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-4') });
    // The guard's coverage must not rest on `cachedMemory` still holding the level alone: a
    // real re-seed would call updateDefinition, so this proves the update was skipped outright.
    expect(updateDefinition).not.toHaveBeenCalled();
    expect(definitions.get('notes-4')?.state).toEqual({});
    expect(cssVar(iframeFor('notes-4'), '--platform-content-zoom-main')).toBe('1');
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-4')?.state).toEqual({});
    expect(settings[MEMORY]).toEqual({});
  });

  it('does not let a reload replay inside the memory debounce window bring a reset level back', async () => {
    settings[MEMORY] = { 'notes:AAA:main': 1.2 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-y', {
      id: 'notes-y',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    setContentZoomAreas('notes-y', ['main']);
    expect(definitions.get('notes-y')?.state).toEqual(zoomState({ main: 1.2 }, 'notes:AAA'));

    await resetContentZoom('notes-y', 'main');
    // The memory delete this reset enqueued is still in its debounce window, so `cachedMemory`
    // still remembers the level the pane just gave up.
    expect(definitions.get('notes-y')?.state?.[LEVELS]).toBeUndefined();

    // A reload replays inside that window: the reset's own definition-update echo, then the
    // bootstrap's first (empty) area scan, then its second (non-empty) scan — an empty first scan
    // is the norm, since the marker is rendered by React and absent from the static shell the
    // reload's DOMContentLoaded fires against.
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-y') });
    setContentZoomAreas('notes-y', []);
    setContentZoomAreas('notes-y', ['main']);
    expect(definitions.get('notes-y')?.state?.[LEVELS]).toBeUndefined();

    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-y')?.state?.[LEVELS]).toBeUndefined();
  });

  it('carries no stale stamp out of a reset, so a later re-point to a project memory remembers nothing for leaves the pane clean', async () => {
    settings[MEMORY] = { 'notes:AAA:main': 1.2 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-r1', {
      id: 'notes-r1',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    setContentZoomAreas('notes-r1', ['main']);
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-r1')?.state).toEqual(zoomState({ main: 1.2 }, 'notes:AAA'));

    // The pane keeps its identity (still project A) but gives up its level entirely.
    await resetContentZoom('notes-r1', 'main');
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-r1')?.state).toEqual({});

    // Re-pointed, through a real reload's re-report, at a project memory remembers nothing for.
    definitions.set('notes-r1', { ...requireDefinition('notes-r1'), projectId: 'bbb' });
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-r1') });
    setContentZoomAreas('notes-r1', []);
    setContentZoomAreas('notes-r1', ['main']);
    expect(definitions.get('notes-r1')?.state).toEqual({});
    expect(cssVar(iframeFor('notes-r1'), '--platform-content-zoom-main')).toBe('1');
  });

  it('picks up a level a sibling set while the pane was closed, instead of a reset stamp making it look already in sync', async () => {
    settings[MEMORY] = { 'notes:AAA:main': 1.2 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-r2', {
      id: 'notes-r2',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    setContentZoomAreas('notes-r2', ['main']);
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-r2')?.state).toEqual(zoomState({ main: 1.2 }, 'notes:AAA'));

    await resetContentZoom('notes-r2', 'main');
    await __flushContentZoomWritesForTesting();

    // The pane closes, carrying exactly the state the reset left it with.
    const closedState = definitions.get('notes-r2')?.state;
    forgetContentZoom('notes-r2');
    definitions.delete('notes-r2');

    // A sibling sets a new level for the same project and area while this pane is gone.
    memoryCallbacks.forEach((cb) => cb({ 'notes:AAA:main': 1.6 }));

    // Reopened from the persisted layout, with exactly the state the reset left behind.
    definitions.set('notes-r2', {
      id: 'notes-r2',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: closedState,
    });
    setContentZoomAreas('notes-r2', ['main']);
    expect(definitions.get('notes-r2')?.state).toEqual(zoomState({ main: 1.6 }, 'notes:AAA'));
    expect(cssVar(iframeFor('notes-r2'), '--platform-content-zoom-main')).toBe('1.6');
  });

  it('drops a burst edit still in flight for the old identity when a re-point interrupts it, rather than writing it to the new one', async () => {
    settings[MEMORY] = { 'notes:AAA:main': 1.2, 'notes:BBB:main': 0.8 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-5', {
      id: 'notes-5',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    setContentZoomAreas('notes-5', ['main']);
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-5')?.state).toEqual(zoomState({ main: 1.2 }, 'notes:AAA'));

    vi.useFakeTimers();
    try {
      // A burst on the OLD identity: the first edit commits at once (1.3) and opens the debounce
      // window; the second is deferred inside it (1.4) — pending only, never written to the
      // definition before the re-point below interrupts it.
      await adjustContentZoom('notes-5', 1, 'main');
      await adjustContentZoom('notes-5', 1, 'main');
      expect(definitions.get('notes-5')?.state).toEqual(zoomState({ main: 1.3 }, 'notes:AAA'));

      // The panel is re-pointed at another project mid-burst, before the trailing write lands.
      definitions.set('notes-5', { ...requireDefinition('notes-5'), projectId: 'bbb' });
      onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-5') });
      expect(definitions.get('notes-5')?.state).toEqual(zoomState({ main: 0.8 }, 'notes:BBB'));

      // The burst's trailing write is still scheduled — for the level it chose against the OLD
      // identity — and must not land on top of the re-seeded state once its window closes.
      vi.advanceTimersByTime(250);
      expect(definitions.get('notes-5')?.state).toEqual(zoomState({ main: 0.8 }, 'notes:BBB'));
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not stamp a pane from an unread memory cache when its first area report beats the memory load', async () => {
    // Both the read and the subscription for memory fail, so `memoryLoaded` never becomes true.
    __setContentZoomDepsForTesting({
      settings: {
        get: async (key: string) => {
          if (key === MEMORY) throw new Error('network blip');
          return settings[key];
        },
        set: settingsSet,
        subscribe: async (key: string) => {
          if (key === MEMORY) throw new Error('subscription unavailable');
          return async () => {};
        },
      },
    });
    await initializeContentZoomService();
    // Restored from a layout saved before stamps existed: own levels, but no stamp.
    definitions.set('notes-w', {
      id: 'notes-w',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: { [LEVELS]: { main: 1.1 } },
    });
    updateDefinition.mockClear();
    setContentZoomAreas('notes-w', ['main']);
    // Memory never loaded: nothing to merge in, and no stamp should be written from an empty cache
    // that would stop this pane from ever being reconsidered once memory actually loads.
    expect(updateDefinition).not.toHaveBeenCalled();
    expect(definitions.get('notes-w')?.state).toEqual({ [LEVELS]: { main: 1.1 } });
  });

  it("leaves a re-pointed pane's levels and stamp untouched while memory has never loaded", async () => {
    // Both the read and the subscription for memory fail, so `memoryLoaded` never becomes true.
    __setContentZoomDepsForTesting({
      settings: {
        get: async (key: string) => {
          if (key === MEMORY) throw new Error('network blip');
          return settings[key];
        },
        set: settingsSet,
        subscribe: async (key: string) => {
          if (key === MEMORY) throw new Error('subscription unavailable');
          return async () => {};
        },
      },
    });
    await initializeContentZoomService();
    // Restored directly, as a layout would restore it, rather than seeded through the normal flow —
    // that flow itself depends on the very memory read this test keeps failing.
    definitions.set('notes-x', {
      id: 'notes-x',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: zoomState({ main: 1.2 }, 'notes:AAA'),
    });
    updateDefinition.mockClear();
    definitions.set('notes-x', { ...requireDefinition('notes-x'), projectId: 'bbb' });
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-x') });
    expect(definitions.get('notes-x')?.state).toEqual(zoomState({ main: 1.2 }, 'notes:AAA'));
    expect(updateDefinition).not.toHaveBeenCalled();
  });

  it("neither shows nor saves a re-pointed pane's previous project's levels while memory cannot be read", async () => {
    // Both the read and the subscription for memory fail, so `memoryLoaded` never becomes true.
    __setContentZoomDepsForTesting({
      settings: {
        get: async (key: string) => {
          if (key === MEMORY) throw new Error('network blip');
          return settings[key];
        },
        set: settingsSet,
        subscribe: async (key: string) => {
          if (key === MEMORY) throw new Error('subscription unavailable');
          return async () => {};
        },
      },
    });
    await initializeContentZoomService();
    definitions.set('notes-m', {
      id: 'notes-m',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: zoomState({ main: 1.5, footnotes: 0.8 }, 'notes:AAA'),
    });
    setContentZoomAreas('notes-m', ['main', 'footnotes']);
    expect(cssVar(iframeFor('notes-m'), '--platform-content-zoom-main')).toBe('1.5');

    definitions.set('notes-m', { ...requireDefinition('notes-m'), projectId: 'bbb' });
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-m') });
    // Project A's levels are not shown for project B.
    expect(cssVar(iframeFor('notes-m'), '--platform-content-zoom-main')).toBe('1');
    expect(cssVar(iframeFor('notes-m'), '--platform-content-zoom-footnotes')).toBe('1');

    // A zoom step starts from project B's level, and saves none of project A's other areas under B.
    await adjustContentZoom('notes-m', 1, 'main');
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-m')?.state).toEqual(zoomState({ main: 1.1 }, 'notes:BBB'));
    expect(cssVar(iframeFor('notes-m'), '--platform-content-zoom-main')).toBe('1.1');
    expect(cssVar(iframeFor('notes-m'), '--platform-content-zoom-footnotes')).toBe('1');
  });

  it("re-seeds, rather than merges, a re-pointed pane's missed update once a memory change for its NEW identity reaches it first", async () => {
    // The memory read fails, so `memoryLoaded` stays false through the re-point below — but the
    // subscription itself is registered (unlike the test above), so its callback is in hand for the
    // delta this test delivers directly, bypassing onDidUpdateWebView the way a missed registration
    // window would.
    __setContentZoomDepsForTesting({
      settings: {
        get: async (key: string) => {
          if (key === MEMORY) throw new Error('network blip');
          return settings[key];
        },
        set: settingsSet,
        subscribe: async (key: string, callback: (value: unknown) => void) => {
          if (key === MEMORY) memoryCallbacks.push(callback);
          else if (key === 'platform.webViewContentZoom') defaultCallbacks.push(callback);
          return async () => {};
        },
      },
    });
    await initializeContentZoomService();
    definitions.set('notes-z', {
      id: 'notes-z',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: zoomState({ main: 1.2 }, 'notes:AAA'),
    });
    updateDefinition.mockClear();
    definitions.set('notes-z', { ...requireDefinition('notes-z'), projectId: 'bbb' });
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-z') });
    // The re-seed was skipped while memory had never loaded, so the pane still carries project A's
    // level and stamp — the precondition the test above pins.
    expect(definitions.get('notes-z')?.state).toEqual(zoomState({ main: 1.2 }, 'notes:AAA'));

    // A memory change for the NEW identity now reaches the pane through the sibling sync — the
    // stamp mismatch this delta finds must trigger the missed re-seed instead of merging project A's
    // stale level onto project B's real delta and labeling the result project B's own.
    memoryCallbacks.forEach((cb) => cb({ 'notes:BBB:footnotes': 0.6 }));
    expect(definitions.get('notes-z')?.state).toEqual(zoomState({ footnotes: 0.6 }, 'notes:BBB'));
  });

  it('warns and still pushes the pane variables when a re-point write throws', async () => {
    settings[MEMORY] = { 'notes:AAA:main': 1.2, 'notes:BBB:main': 1.4 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-10', {
      id: 'notes-10',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    setContentZoomAreas('notes-10', ['main']);
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-10')?.state).toEqual(zoomState({ main: 1.2 }, 'notes:AAA'));

    definitions.set('notes-10', { ...requireDefinition('notes-10'), projectId: 'bbb' });
    updateDefinition.mockImplementation(() => {
      throw new Error('local storage quota exceeded');
    });
    vi.mocked(logger.warn).mockClear();
    // Dirtied so the assertion below can tell whether pushContentZoom actually ran, rather than
    // merely trusting that a throwing re-seed left it untouched.
    iframeFor('notes-10').contentDocument?.documentElement.style.setProperty(
      '--platform-content-zoom-default',
      'dirty',
    );
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-10') });
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('notes-10'));
    // The push after the re-seed attempt still ran despite the throw: the default variable it
    // always sets was overwritten from the dirtied sentinel above.
    expect(cssVar(iframeFor('notes-10'), '--platform-content-zoom-default')).toBe('1');
  });

  it("clears the pane's own-level write timer when a re-point drops its pending levels, so the next edit under the new identity commits at once", async () => {
    settings[MEMORY] = { 'notes:AAA:main': 1.2, 'notes:BBB:main': 0.8 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-7', {
      id: 'notes-7',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    setContentZoomAreas('notes-7', ['main']);
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-7')?.state).toEqual(zoomState({ main: 1.2 }, 'notes:AAA'));

    vi.useFakeTimers();
    try {
      await adjustContentZoom('notes-7', 1, 'main'); // 1.3, committed at once; opens the burst window
      await adjustContentZoom('notes-7', 1, 'main'); // 1.4, deferred inside it -- never committed

      // Re-point mid-burst, before the deferred write's own timer fires.
      definitions.set('notes-7', { ...requireDefinition('notes-7'), projectId: 'bbb' });
      onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-7') });
      expect(definitions.get('notes-7')?.state).toEqual(zoomState({ main: 0.8 }, 'notes:BBB'));

      updateDefinition.mockClear();
      // One edit under the new identity, still well inside what would have been the old burst window.
      await adjustContentZoom('notes-7', 1, 'main');
      expect(updateDefinition).toHaveBeenCalledTimes(1); // written at once, not deferred into a stale window
      expect(definitions.get('notes-7')?.state).toEqual(zoomState({ main: 0.9 }, 'notes:BBB'));
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not stamp a pane whose only "own levels" are a still-pending, uncommitted write, and preserves that write for a later retry', async () => {
    // Every commit attempt fails to land, so the level chosen below never actually reaches state.
    updateDefinition.mockImplementation(() => false);
    await adjustContentZoom('editor-1', 1, 'main');
    expect(definitions.get('editor-1')?.state).toEqual({});
    // Unmounts the pane; the retry this makes also fails, so the level stays pending rather than
    // being discarded along with the rest of the pane's state.
    forgetContentZoom('editor-1');
    updateDefinition.mockImplementation(applyDefinitionUpdate);
    updateDefinition.mockClear();
    // The reload's bootstrap reports fresh, as if for a pane that had never reported before — the
    // same identity as ever, not a re-point, so this must not be mistaken for one and must not
    // discard the still-pending level.
    setContentZoomAreas('editor-1', ['main']);
    // No levels are actually committed, so nothing may be stamped either — a stamp with no levels
    // behind it would violate the invariant that the two are always written together.
    expect(definitions.get('editor-1')?.state).toEqual({});
    expect(updateDefinition).not.toHaveBeenCalled();
    // The pending level survived the report above and lands on the next retry, rather than having
    // been silently discarded by it.
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.1 }));
  });

  it('drops a stale pending write whose identity predates a re-point that occurred before its first commit ever landed', async () => {
    settings[MEMORY] = { 'notes:BBB:main': 0.8 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-8', {
      id: 'notes-8',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    setContentZoomAreas('notes-8', ['main']); // nothing remembered for project A, so this seeds nothing

    // Every commit attempt fails, so the level chosen below is tagged pending under project A's
    // identity but never reaches state, and so never gets a stamp either.
    updateDefinition.mockImplementation(() => false);
    await adjustContentZoom('notes-8', 1, 'main');
    expect(definitions.get('notes-8')?.state).toEqual({});

    // Re-pointed to project B before that pending write's first commit ever landed: with no stamp
    // to compare against, the platform's own re-point check (`reseedIfIdentityChanged`) cannot yet
    // tell this happened, so it is deliberately a no-op here.
    definitions.set('notes-8', { ...requireDefinition('notes-8'), projectId: 'bbb' });
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-8') });
    expect(definitions.get('notes-8')?.state).toEqual({});

    // The pane's content is replaced and its bootstrap reports fresh — the platform's first real
    // chance to notice the identity moved out from under the still-pending write.
    forgetContentZoom('notes-8'); // the retry this makes also fails; the stale entry survives
    updateDefinition.mockImplementation(applyDefinitionUpdate);
    updateDefinition.mockClear();
    setContentZoomAreas('notes-8', ['main']);

    // Project B's own remembered level lands — not project A's stale, never-committed level, which
    // would otherwise have been silently attributed to project B once a later retry finally landed.
    expect(definitions.get('notes-8')?.state).toEqual(zoomState({ main: 0.8 }, 'notes:BBB'));
  });

  it('does not commit a stale pending write under the new identity when its retry succeeds before a re-seed catches the change', async () => {
    settings[MEMORY] = { 'notes:BBB:main': 0.8 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-9', {
      id: 'notes-9',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    setContentZoomAreas('notes-9', ['main']); // nothing remembered for project A, so this seeds nothing

    // The first commit attempt fails, so the level is tagged pending under project A's identity but
    // never reaches state, and so never gets a stamp either.
    updateDefinition.mockImplementation(() => false);
    await adjustContentZoom('notes-9', 1, 'main');
    expect(definitions.get('notes-9')?.state).toEqual({});

    // Re-pointed to project B before that pending write's first commit ever landed: with no stamp to
    // compare against, `reseedIfIdentityChanged` cannot yet tell this happened, so it is a no-op.
    definitions.set('notes-9', { ...requireDefinition('notes-9'), projectId: 'bbb' });
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-9') });
    expect(definitions.get('notes-9')?.state).toEqual({});

    // The stale write's retry can now succeed — unlike a retry that keeps failing, this is the case
    // that would silently mislabel project A's level as project B's own if commitOwnLevels did not
    // check the identity itself.
    updateDefinition.mockImplementation(applyDefinitionUpdate);
    forgetContentZoom('notes-9');
    expect(definitions.get('notes-9')?.state).toEqual({}); // dropped, not written under the wrong identity

    // The pane's content is replaced and reports fresh, which re-seeds it from project B's own memory.
    setContentZoomAreas('notes-9', ['main']);
    expect(definitions.get('notes-9')?.state).toEqual(zoomState({ main: 0.8 }, 'notes:BBB'));
  });

  it('does not commit a write chosen with no resolvable identity under the identity the pane later resolves to', async () => {
    settings[MEMORY] = { 'editor:PROJ-X:main': 0.8 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('editor-10', {
      id: 'editor-10',
      webViewType: 'platformScriptureEditor.react',
      // No projectId and no state.resourceId: unresolvable, so the level chosen below is tagged
      // pending with no identity at all — not "chosen for project X", just "chosen for nothing".
      state: {},
    });
    setContentZoomAreas('editor-10', ['main']);

    // The first commit attempt fails, so the level stays pending with no recorded identity.
    updateDefinition.mockImplementation(() => false);
    await adjustContentZoom('editor-10', 1, 'main');
    expect(definitions.get('editor-10')?.state).toEqual({});

    // The pane resolves to a project before that pending write's first commit ever lands: with no
    // stamp to compare against, `reseedIfIdentityChanged` cannot tell this happened, so it is a
    // no-op — the same gap a resolvable-to-resolvable re-point closes via the stamp.
    definitions.set('editor-10', { ...requireDefinition('editor-10'), projectId: 'proj-x' });
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('editor-10') });
    expect(definitions.get('editor-10')?.state).toEqual({});

    // The stale write's retry can now succeed. Committing it here would attribute a level chosen
    // before any project was known to project X's own memory.
    updateDefinition.mockImplementation(applyDefinitionUpdate);
    forgetContentZoom('editor-10');
    expect(definitions.get('editor-10')?.state).toEqual({}); // dropped, not written under project X

    // A fresh area report seeds the pane from project X's own remembered level instead.
    setContentZoomAreas('editor-10', ['main']);
    expect(definitions.get('editor-10')?.state).toEqual(zoomState({ main: 0.8 }, 'editor:PROJ-X'));
  });

  it('does not carry a level committed before the pane had an identity onto the first project it is pointed at', async () => {
    settings[MEMORY] = { 'notes:XXX:main': 0.8 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    // An empty panel, before any project is opened: no projectId and no state.resourceId.
    definitions.set('notes-empty', {
      id: 'notes-empty',
      webViewType: 'legacyCommentManager.commentListPanel',
      state: {},
    });
    setContentZoomAreas('notes-empty', ['main']);
    await adjustContentZoom('notes-empty', 1, 'main');
    await __flushContentZoomWritesForTesting();
    // The step lands while the pane has no identity, and the pane keeps showing it meanwhile.
    expect(definitions.get('notes-empty')?.state?.[LEVELS]).toEqual({ main: 1.1 });
    expect(cssVar(iframeFor('notes-empty'), '--platform-content-zoom-main')).toBe('1.1');

    // Pointed at project XXX, spreading its saved state onto the new definition, then re-reported
    // the way a reload's bootstrap reports.
    definitions.set('notes-empty', { ...requireDefinition('notes-empty'), projectId: 'xxx' });
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-empty') });
    setContentZoomAreas('notes-empty', []);
    setContentZoomAreas('notes-empty', ['main']);
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-empty')?.state).toEqual(zoomState({ main: 0.8 }, 'notes:XXX'));
    expect(cssVar(iframeFor('notes-empty'), '--platform-content-zoom-main')).toBe('0.8');
  });

  it('does not commit a write chosen under a resolvable identity once the pane becomes unresolvable', async () => {
    settings[MEMORY] = { 'editor:PROJ-A:main': 1.2 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('editor-11', {
      id: 'editor-11',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-a',
      state: {},
    });
    setContentZoomAreas('editor-11', ['main']);
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('editor-11')?.state).toEqual(zoomState({ main: 1.2 }, 'editor:PROJ-A'));

    // A further edit's commit fails, so the level stays pending — recorded under project A's
    // identity, the one the pane showed when the edit was made.
    updateDefinition.mockImplementation(() => false);
    await adjustContentZoom('editor-11', 1, 'main');
    expect(definitions.get('editor-11')?.state).toEqual(zoomState({ main: 1.2 }, 'editor:PROJ-A'));

    // The pane loses its project before that pending write's first retry lands (no projectId and
    // no state.resourceId — the same unresolvable shape "editor-9" exercises), while its state (and
    // the stamp already in it) carries over unchanged, as a real re-point's state-spread would.
    // `reseedIfIdentityChanged` runs (there is a stamp to compare against) but has no identity of
    // its own to seed from, so it is a no-op — this is not the re-point path, just the pane going
    // project-less.
    definitions.set('editor-11', {
      id: 'editor-11',
      webViewType: 'platformScriptureEditor.react',
      state: requireDefinition('editor-11').state,
    });
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('editor-11') });

    // The stale write's retry can now succeed. Committing it unstamped here would let a LATER
    // re-point stamp project A's level as belonging to whatever project the pane resolves to next
    // (`seedFromMemory`'s own "no stamp, but levels already held" case treats an unstamped level as
    // this window's own to re-attribute) — the same misattribution this whole guard exists to stop.
    updateDefinition.mockImplementation(applyDefinitionUpdate);
    forgetContentZoom('editor-11');
    expect(definitions.get('editor-11')?.state).toEqual(zoomState({ main: 1.2 }, 'editor:PROJ-A'));
  });

  it("does not let an in-burst pending write for the OLD identity be read as the NEW identity's own level when an unrelated memory push walks the panes before this one is re-seeded", async () => {
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-12', {
      id: 'notes-12',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    setContentZoomAreas('notes-12', ['main']); // nothing remembered for A, so this seeds nothing

    vi.useFakeTimers();
    try {
      await adjustContentZoom('notes-12', 1, 'main'); // 1.1, committed at once under project A
      await adjustContentZoom('notes-12', 1, 'main'); // 1.2, only pending -- the burst window is open

      // The shared definition is re-pointed to project B by a write this window has not been
      // notified of yet (`onDidUpdateWebView` has not fired), coming back with fresh, unstamped
      // state -- exactly what `getWebViewDefinition` hands back for content that was never seeded.
      definitions.set('notes-12', {
        id: 'notes-12',
        webViewType: 'legacyCommentManager.commentListPanel',
        projectId: 'bbb',
        state: {},
      });

      // An unrelated memory key changes, which walks every open pane through `syncSiblingsFromMemory`.
      memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-Z:main': 1.9 }));
      expect(definitions.get('notes-12')?.state).toEqual({});

      // The burst's own trailing write -- still carrying the level chosen under project A -- must be
      // dropped rather than committed once its window closes: the pane no longer matches the
      // identity that write was chosen for.
      vi.advanceTimersByTime(250);
      expect(definitions.get('notes-12')?.state).toEqual({});
    } finally {
      vi.useRealTimers();
    }
  });

  it("starts a user zoom step from the pane's NEW identity effective level, not from a same-window pending write left over from the old one", async () => {
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-13', {
      id: 'notes-13',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    setContentZoomAreas('notes-13', ['main']);

    vi.useFakeTimers();
    try {
      await adjustContentZoom('notes-13', 1, 'main'); // 1.1, committed at once under project A
      await adjustContentZoom('notes-13', 1, 'main'); // 1.2, only pending -- burst window still open

      definitions.set('notes-13', {
        id: 'notes-13',
        webViewType: 'legacyCommentManager.commentListPanel',
        projectId: 'bbb',
        state: {},
      });

      // A user zoom step on the same pane, now showing project B, before this window's own re-seed
      // logic has had a chance to run.
      await adjustContentZoom('notes-13', 1, 'main');
      vi.advanceTimersByTime(250); // the burst's trailing write closes

      // One step from B's effective level (nothing of its own yet, so the Settings default, 1) is
      // 1.1 -- not one step from project A's still-pending 1.2, which would land on 1.3.
      expect(definitions.get('notes-13')?.state).toEqual(zoomState({ main: 1.1 }, 'notes:BBB'));
    } finally {
      vi.useRealTimers();
    }
  });

  it('keeps a pending write already chosen for the identity a re-seed is about to stamp, instead of overwriting it with what memory remembers for that identity', async () => {
    settings[MEMORY] = { 'notes:AAA:main': 1.2, 'notes:BBB:main': 0.8 };
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    definitions.set('notes-14', {
      id: 'notes-14',
      webViewType: 'legacyCommentManager.commentListPanel',
      projectId: 'aaa',
      state: {},
    });
    setContentZoomAreas('notes-14', ['main']);
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-14')?.state).toEqual(zoomState({ main: 1.2 }, 'notes:AAA'));

    // Re-pointed to project B directly, as a real re-point's state-spread would leave it -- this
    // window has not been notified yet, so the stamp in state still names project A.
    definitions.set('notes-14', { ...requireDefinition('notes-14'), projectId: 'bbb' });

    // The user zooms before any re-seed for the re-point has run, and that write's own commit fails.
    updateDefinition.mockImplementation(() => false);
    // Chosen under project B's identity, stepping from B's level rather than project A's stale 1.2:
    // 1.1, pending.
    await adjustContentZoom('notes-14', 1, 'main');
    expect(definitions.get('notes-14')?.state).toEqual(zoomState({ main: 1.2 }, 'notes:AAA'));

    // The re-point's own definition update arrives -- the platform's first chance to notice it.
    updateDefinition.mockImplementation(applyDefinitionUpdate);
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-14') });
    // The user's still-pending 1.1 must survive: it was already chosen for the identity this
    // re-seed is stamping, so it must not be replaced by project B's remembered 0.8.
    expect(definitions.get('notes-14')?.state).toEqual(zoomState({ main: 1.2 }, 'notes:AAA'));

    // A later retry lands the user's own edit, not memory's remembered level.
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-14')?.state).toEqual(zoomState({ main: 1.1 }, 'notes:BBB'));
  });

  it('does not stamp a pane whose saved levels are all invalid, so a later reopen still picks up what memory remembers', async () => {
    definitions.set('editor-bad', {
      id: 'editor-bad',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-P',
      // Out of range: nothing here is a level the pane can keep.
      state: { [LEVELS]: { main: 3.5 } },
    });
    setContentZoomAreas('editor-bad', ['main']);
    expect(definitions.get('editor-bad')?.state).toEqual({});

    // The pane closes; a sibling records a level for the same project and area meanwhile.
    const closedState = definitions.get('editor-bad')?.state;
    forgetContentZoom('editor-bad');
    definitions.delete('editor-bad');
    memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-P:main': 1.3 }));

    // Reopened with exactly the state it closed with.
    definitions.set('editor-bad', {
      id: 'editor-bad',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-P',
      state: closedState,
    });
    setContentZoomAreas('editor-bad', ['main']);
    expect(definitions.get('editor-bad')?.state).toEqual(zoomState({ main: 1.3 }, 'editor:PROJ-P'));
    expect(cssVar(iframeFor('editor-bad'), '--platform-content-zoom-main')).toBe('1.3');
  });

  it('treats a non-string identity stamp as no stamp at all', async () => {
    definitions.set('editor-8', {
      id: 'editor-8',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      // A corrupted or foreign-written stamp: not a string, so it names nothing this build
      // recognizes as an identity.
      state: { [LEVELS]: { main: 1.5 }, [IDENTITY]: 42 },
    });
    setContentZoomAreas('editor-8', ['main']);
    expect(definitions.get('editor-8')?.state).toEqual(zoomState({ main: 1.5 }));
  });

  it('leaves a pane with no resolvable identity untouched, even though it already holds its own levels', async () => {
    definitions.set('editor-9', {
      id: 'editor-9',
      webViewType: 'platformScriptureEditor.react',
      // No projectId and no state.resourceId: this build cannot resolve an identity for the pane at
      // all, so there is nothing to compare a stamp against or to seed it with.
      state: { [LEVELS]: { main: 1.4 } },
    });
    updateDefinition.mockClear();
    setContentZoomAreas('editor-9', ['main']);
    expect(definitions.get('editor-9')?.state).toEqual({ [LEVELS]: { main: 1.4 } });
    expect(updateDefinition).not.toHaveBeenCalled();
  });

  it("replaces a stale identity stamp with the kind alone when a level-holding pane's own-level write finds no resolvable identity", async () => {
    definitions.set('editor-1', {
      id: 'editor-1',
      webViewType: 'platformScriptureEditor.react',
      // No projectId and no state.resourceId: this build cannot resolve an identity for the pane,
      // yet its state still carries a stamp from before that became true (e.g. the project was
      // unlinked from the pane some other way).
      state: zoomState({ main: 1.5 }),
    });
    await adjustContentZoom('editor-1', 1, 'main');
    // The new level commits, but with no resolvable identity to stamp it with, the stale stamp is
    // replaced by the kind alone rather than left to name a project the new level was never chosen
    // for — and that stamp still marks the level as belonging to no project, so a later project
    // does not adopt it.
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.6 }, 'editor:'));
  });

  it('does nothing for an unknown web view', async () => {
    await adjustContentZoom('nope', 1);
    expect(updateDefinition).not.toHaveBeenCalled();
    expect(showIndicator).not.toHaveBeenCalled();
  });

  it('does not let a failing definition read escape the iframe load hook', async () => {
    __setContentZoomDepsForTesting({
      getDefinition: () => {
        throw new Error('dock layout is not registered');
      },
    });
    await initializeContentZoomService();
    expect(() => applyContentZoomForWebView('editor-1')).not.toThrow();
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('editor-1'));
  });

  it('does not let a failing definition read stop the other subscribers of a web-view update', async () => {
    let getDefinitionThrows = false;
    __setContentZoomDepsForTesting({
      getDefinition: (id: string) => {
        if (getDefinitionThrows) throw new Error('dock layout is not registered');
        return definitions.get(id);
      },
    });
    await initializeContentZoomService();
    if (!onDidUpdateWebViewCallback) throw new Error('test setup: no web-view update subscriber');
    // Positive control: the subscriber runs normally while the definition is readable.
    onDidUpdateWebViewCallback({ webView: requireDefinition('editor-1') });
    expect(logger.warn).not.toHaveBeenCalledWith(expect.stringContaining('editor-1'));
    getDefinitionThrows = true;
    expect(() =>
      onDidUpdateWebViewCallback?.({ webView: requireDefinition('editor-1') }),
    ).not.toThrow();
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('editor-1'));
  });

  it("still acts on an explicitly targeted pane while the window's input is blocked, and on none without an id", async () => {
    windowInputBlocked = true;
    await adjustContentZoom('editor-1', 1);
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.1');
    expect(showIndicator).toHaveBeenCalledTimes(1);
    updateDefinition.mockClear();
    showIndicator.mockClear();
    lastFocused = 'editor-1';
    await adjustContentZoom(undefined, 1);
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

  it('folds project-id casing into one memory key, so panes naming the same project share a level', async () => {
    definitions.set('editor-upper', {
      id: 'editor-upper',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'PROJ-A',
      state: {},
    });
    definitions.set('editor-lower', {
      id: 'editor-lower',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-a',
      state: {},
    });
    setContentZoomAreas('editor-upper', ['main']);
    setContentZoomAreas('editor-lower', ['main']);
    await adjustContentZoom('editor-lower', 1, 'main');
    await __flushContentZoomWritesForTesting();
    expect(settings[MEMORY]).toEqual({ 'editor:PROJ-A:main': 1.1 });
    memoryCallbacks.forEach((cb) => cb(settings[MEMORY]));
    expect(definitions.get('editor-upper')?.state).toEqual(zoomState({ main: 1.1 }));
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
    memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-A:footnotes': 1.4 }));
    expect(definitions.get('editor-2')?.state).toEqual(zoomState({ footnotes: 1.4 }));
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ footnotes: 1.4 }));
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
    memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-A:main': 1.4 }));
    expect(definitions.get('editor-1')?.state).toEqual({ [LEVELS]: { main: 1.4 } });
    memoryCallbacks.forEach((cb) => cb({}));
    expect(definitions.get('editor-1')?.state).toEqual({});
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1');
  });

  it('ignores a stale memory echo for an area that already has a newer pending write', async () => {
    await adjustContentZoom('editor-1', 1, 'main'); // 1.1, flushed below
    await __flushContentZoomWritesForTesting();
    await adjustContentZoom('editor-1', 1, 'main'); // 1.2, still only pending
    // The echo of the 1.1 write arriving after the 1.2 edit was already made locally.
    memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-A:main': 1.1 }));
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.2 }));
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.2');
    await __flushContentZoomWritesForTesting();
    expect(settings[MEMORY]).toEqual({ 'editor:PROJ-A:main': 1.2 });
  });

  /**
   * Replaces the settings dep with one whose memory reads can be made to fail or to park, so a test
   * can drive what the flush's round trip does. Everything else behaves as the default harness.
   */
  function useControllableMemoryReads(): {
    failNextReads: (count: number) => void;
    parkNextRead: () => Promise<() => void>;
  } {
    let readsToFail = 0;
    let parkRead: ((release: () => void) => void) | undefined;
    __setContentZoomDepsForTesting({
      settings: {
        get: async (key: string) => {
          if (key === MEMORY && readsToFail > 0) {
            readsToFail -= 1;
            throw new Error('network blip');
          }
          if (key === MEMORY && parkRead) {
            const announce = parkRead;
            parkRead = undefined;
            await new Promise<void>((resolve) => {
              announce(resolve);
            });
          }
          return settings[key];
        },
        set: settingsSet,
        subscribe: async (key: string, callback: (value: unknown) => void) => {
          if (key === MEMORY) memoryCallbacks.push(callback);
          else if (key === 'platform.webViewContentZoom') defaultCallbacks.push(callback);
          callback(settings[key]);
          return async () => {};
        },
      },
    });
    return {
      failNextReads: (count: number) => {
        readsToFail = count;
      },
      parkNextRead: () =>
        new Promise<() => void>((resolve) => {
          parkRead = resolve;
        }),
    };
  }

  it('keeps the echo guard on a pending level until the write carrying it has landed', async () => {
    const reads = useControllableMemoryReads();
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    await adjustContentZoom('editor-1', 1, 'main');
    const parked = reads.parkNextRead();
    const flushing = __flushContentZoomWritesForTesting();
    const release = await parked;
    // A foreign window's value for the same key arrives while this window's write is in flight.
    memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-A:main': 0.8 }));
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.1 }));
    release();
    await flushing;
    expect(settings[MEMORY]).toEqual({ 'editor:PROJ-A:main': 1.1 });
  });

  /**
   * Replaces the settings dep with one whose memory write can be made to park, so a test can hold
   * an edit pending while the echo that write produces is delivered. Everything else behaves as the
   * default harness, and a released write goes through the harness's own setter.
   */
  function useParkableMemoryWrites(): { parkNextWrite: () => Promise<() => void> } {
    let parkWrite: ((release: () => void) => void) | undefined;
    __setContentZoomDepsForTesting({
      settings: {
        get: async (key: string) => settings[key],
        set: async (key: string, value: unknown) => {
          if (key === MEMORY && parkWrite) {
            const announce = parkWrite;
            parkWrite = undefined;
            await new Promise<void>((resolve) => {
              announce(resolve);
            });
          }
          return settingsSet(key, value);
        },
        subscribe: async (key: string, callback: (value: unknown) => void) => {
          if (key === MEMORY) memoryCallbacks.push(callback);
          else if (key === 'platform.webViewContentZoom') defaultCallbacks.push(callback);
          callback(settings[key]);
          return async () => {};
        },
      },
    });
    return {
      parkNextWrite: () =>
        new Promise<() => void>((resolve) => {
          parkWrite = resolve;
        }),
    };
  }

  it("brings a sibling in line with this window's own memory write when its echo arrives before the write resolves", async () => {
    const writes = useParkableMemoryWrites();
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    definitions.set('editor-2', {
      id: 'editor-2',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: {},
    });
    setContentZoomAreas('editor-2', ['main', 'footnotes']);
    await adjustContentZoom('editor-1', 1, 'main');
    const parked = writes.parkNextWrite();
    const flushing = __flushContentZoomWritesForTesting();
    const release = await parked;
    // This window's own write coming back to it while the edit it carries is still pending.
    memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-A:main': 1.1 }));
    expect(definitions.get('editor-2')?.state).toEqual(zoomState({ main: 1.1 }));
    release();
    await flushing;
    expect(settings[MEMORY]).toEqual({ 'editor:PROJ-A:main': 1.1 });
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.1 }));
  });

  it('writes the newest pending level when a further edit lands while the flush is reading', async () => {
    const reads = useControllableMemoryReads();
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    await adjustContentZoom('editor-1', 1, 'main'); // 1.1
    const parked = reads.parkNextRead();
    const flushing = __flushContentZoomWritesForTesting();
    const release = await parked;
    // The next step of the same gesture, made while the flush's read is still in flight.
    await adjustContentZoom('editor-1', 1, 'main'); // 1.2
    release();
    await flushing;
    expect(settingsSet).toHaveBeenCalledTimes(1);
    expect(settingsSet).toHaveBeenCalledWith(MEMORY, { 'editor:PROJ-A:main': 1.2 });
    expect(settings[MEMORY]).toEqual({ 'editor:PROJ-A:main': 1.2 });
    settingsSet.mockClear();
    await __flushContentZoomWritesForTesting();
    expect(settingsSet).not.toHaveBeenCalled();
  });

  it('retries a memory write whose read failed, storing the level on the retry', async () => {
    const reads = useControllableMemoryReads();
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    await adjustContentZoom('editor-1', 1, 'main');
    reads.failNextReads(1);
    await __flushContentZoomWritesForTesting();
    expect(settingsSet).not.toHaveBeenCalledWith(MEMORY, expect.anything());
    await __flushContentZoomWritesForTesting();
    expect(settings[MEMORY]).toEqual({ 'editor:PROJ-A:main': 1.1 });
  });

  it('gives a memory edit up after three failed attempts, warning once and keeping nothing pending', async () => {
    const reads = useControllableMemoryReads();
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    await adjustContentZoom('editor-1', 1, 'main');
    reads.failNextReads(3);
    await __flushContentZoomWritesForTesting();
    await __flushContentZoomWritesForTesting();
    await __flushContentZoomWritesForTesting();
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('giving up'));
    settingsSet.mockClear();
    await __flushContentZoomWritesForTesting();
    expect(settingsSet).not.toHaveBeenCalled();
  });

  /**
   * Drives a pane's memory edit all the way to give-up: three consecutive failed reads, with the
   * warning asserted as the positive control that the give-up branch really ran.
   */
  async function giveUpTheMemoryWrite(reads: {
    failNextReads: (count: number) => void;
  }): Promise<void> {
    reads.failNextReads(3);
    await __flushContentZoomWritesForTesting();
    await __flushContentZoomWritesForTesting();
    await __flushContentZoomWritesForTesting();
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('giving up'));
  }

  it("keeps a pane's level after the memory write was given up, when an unrelated key changes", async () => {
    settings[MEMORY] = { 'editor:PROJ-A:main': 1.3 };
    const reads = useControllableMemoryReads();
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    await adjustContentZoom('editor-1', 1, 'main'); // 1.4, which never reaches the setting
    await giveUpTheMemoryWrite(reads);

    // Another window stores an unrelated area's level. The emission carries this identity's whole
    // record, including the `main` entry this window failed to overwrite.
    memoryCallbacks.forEach((cb) =>
      cb({ 'editor:PROJ-A:main': 1.3, 'editor:PROJ-A:footnotes': 0.9 }),
    );
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.4');
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.4, footnotes: 0.9 }));
    // Control: the unrelated area did take its update, so the level above is the given-up key being
    // honored rather than the whole walk having been skipped.
    expect(cssVar(iframe, '--platform-content-zoom-footnotes')).toBe('0.9');
  });

  it("follows another window's later level for a key it gave up on", async () => {
    settings[MEMORY] = { 'editor:PROJ-A:main': 1.3 };
    const reads = useControllableMemoryReads();
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    await adjustContentZoom('editor-1', 1, 'main'); // 1.4, which never reaches the setting
    await giveUpTheMemoryWrite(reads);

    // Anything other than the level this window failed to replace is real news from elsewhere.
    memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-A:main': 1.6 }));
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.6');
    // The entry is spent, so the value it used to suppress now reaches the pane like any other.
    memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-A:main': 1.3 }));
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.3');
  });

  /**
   * Initialization starts both subscriptions before the two reads and a subscription delivers its
   * current value immediately, so a callback commonly lands while a read is still in flight. These
   * park the reads and deliver in that window.
   */
  function useSubscriptionsThatDeliverWhileTheReadsAreOut(readOutcome: 'stale' | 'failure'): {
    releaseReads: () => void;
  } {
    let release = () => {};
    const parked = new Promise<void>((resolve) => {
      release = resolve;
    });
    __setContentZoomDepsForTesting({
      settings: {
        get: async (key: string) => {
          await parked;
          if (readOutcome === 'failure') throw new Error(`the settings read for ${key} failed`);
          return settings[key];
        },
        set: settingsSet,
        // Registered here and delivered by the test, rather than delivered on subscribe, so the
        // delivery lands after the reads have started and before they resolve.
        subscribe: async (key: string, callback: (value: unknown) => void) => {
          if (key === MEMORY) memoryCallbacks.push(callback);
          else if (key === 'platform.webViewContentZoom') defaultCallbacks.push(callback);
          return async () => {};
        },
      },
    });
    memoryCallbacks.length = 0;
    defaultCallbacks.length = 0;
    return { releaseReads: release };
  }

  it('keeps a default a subscription delivered while the startup read was out, rather than the fallback that failed read leaves', async () => {
    const { releaseReads } = useSubscriptionsThatDeliverWhileTheReadsAreOut('failure');
    const initializing = initializeContentZoomService();
    // Let the subscriptions register and both reads park.
    await Promise.resolve();
    await Promise.resolve();
    defaultCallbacks.forEach((cb) => cb(1.3));
    releaseReads();
    await initializing;

    setContentZoomAreas('editor-1', ['main']);
    expect(cssVar(iframe, '--platform-content-zoom-default')).toBe('1.3');
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.3');
    // Control: the read really did fail, so the level above is the subscription's value surviving it.
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('could not read the default'));
  });

  it('keeps what the subscriptions delivered while the startup reads were out, rather than the values those reads carry', async () => {
    const { releaseReads } = useSubscriptionsThatDeliverWhileTheReadsAreOut('stale');
    const initializing = initializeContentZoomService();
    await Promise.resolve();
    await Promise.resolve();
    // The stored values the parked reads will carry are the suite's defaults (1 and no memory); a
    // change made in Settings meanwhile reaches this window through the subscriptions first. The
    // remembered level names a project no pane is open for, so nothing but the cache can carry it
    // to the pane opened below.
    defaultCallbacks.forEach((cb) => cb(1.3));
    memoryCallbacks.forEach((cb) => cb({ 'editor:PROJ-B:main': 1.6 }));
    releaseReads();
    await initializing;

    setContentZoomAreas('editor-1', ['main']);
    expect(cssVar(iframe, '--platform-content-zoom-default')).toBe('1.3');
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.3');

    definitions.set('editor-2', {
      id: 'editor-2',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-B',
      state: {},
    });
    setContentZoomAreas('editor-2', ['main']);
    expect(definitions.get('editor-2')?.state).toEqual(zoomState({ main: 1.6 }, 'editor:PROJ-B'));
    expect(cssVar(iframeFor('editor-2'), '--platform-content-zoom-main')).toBe('1.6');
  });

  it('subscribes and registers the unload flush before the startup reads come back', async () => {
    let releaseReads = () => {};
    const parked = new Promise<void>((resolve) => {
      releaseReads = resolve;
    });
    /** What initialization did, in the order it happened, so the control can pin the order. */
    const order: string[] = [];
    __setContentZoomDepsForTesting({
      settings: {
        get: async (key: string) => {
          await parked;
          order.push(`read ${key}`);
          return settings[key];
        },
        set: settingsSet,
        // The immediate delivery a real subscription makes is withheld here, so the only thing that
        // can fill the caches is the parked read below — which is what makes the control able to
        // fail if the reads stop being awaited.
        subscribe: async (key: string, callback: (value: unknown) => void) => {
          if (key === MEMORY) memoryCallbacks.push(callback);
          else if (key === 'platform.webViewContentZoom') defaultCallbacks.push(callback);
          return async () => {};
        },
      },
    });
    settings['platform.webViewContentZoom'] = 1.3;
    // The suite's own setup already initialized once; these are what this initialization registers.
    memoryCallbacks.length = 0;
    defaultCallbacks.length = 0;
    onDidUpdateWebViewCallback = undefined;

    const addListener = vi.spyOn(window, 'addEventListener');
    try {
      const initializing = initializeContentZoomService().then(() => order.push('initialized'));
      // Let the synchronous registrations and the not-yet-awaited subscriptions run.
      await Promise.resolve();
      await Promise.resolve();
      // Everything that makes this window hear about zoom is in place while the reads are still out.
      expect(defaultCallbacks).toHaveLength(1);
      expect(memoryCallbacks).toHaveLength(1);
      expect(onDidUpdateWebViewCallback).toBeDefined();
      expect(addListener.mock.calls.some(([type]) => type === 'beforeunload')).toBe(true);

      // Control: every pending microtask and a full turn of the event loop later, initialization is
      // still out, because both reads are awaited and neither has come back.
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
      expect(order).toEqual([]);

      releaseReads();
      await initializing;
      // ...and once they do come back, the default one of them carries is in hand.
      expect(order).toHaveLength(3);
      expect(order[2]).toBe('initialized');
      setContentZoomAreas('editor-1', ['main']);
      expect(cssVar(iframe, '--platform-content-zoom-default')).toBe('1.3');
    } finally {
      addListener.mockRestore();
    }
  });

  it('never scales an area-less pane of an undeclared type, at its load or after the grace', async () => {
    settings['platform.webViewContentZoom'] = 1.3;
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    const pane = openUndeclaredPane('ext-1');
    vi.useFakeTimers();
    try {
      applyContentZoomForWebView('ext-1');
      expect(frameZoom(pane)).toBe('');
      vi.advanceTimersByTime(1000);
      expect(frameZoom(pane)).toBe('');
      // Positive control: the push did reach this pane, because it carries the Settings default.
      expect(cssVar(pane, '--platform-content-zoom-default')).toBe('1.3');
    } finally {
      vi.useRealTimers();
    }
  });

  it('reads a pane definition for its declaration once, until the pane is updated or forgotten', async () => {
    const getDefinition = vi.fn((id: string) => definitions.get(id));
    __setContentZoomDepsForTesting({ getDefinition });
    await initializeContentZoomService();
    const editor: SavedWebViewDefinition = {
      id: 'editor-9',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: {},
    };
    definitions.set('editor-9', editor);
    getDefinition.mockClear();
    expect(isContentZoomable('editor-9')).toBe(true);
    expect(isContentZoomable('editor-9')).toBe(true);
    expect(getDefinition).toHaveBeenCalledTimes(1);

    // An update may change the pane's type, so the answer follows the updated definition.
    definitions.set('editor-9', { ...editor, webViewType: 'thirdParty.view' });
    if (!onDidUpdateWebViewCallback) throw new Error('test setup: no web-view update subscriber');
    onDidUpdateWebViewCallback({ webView: requireDefinition('editor-9') });
    expect(isContentZoomable('editor-9')).toBe(false);

    // A forgotten pane's id may come back as another view, so its declaration is read afresh.
    forgetContentZoom('editor-9');
    definitions.set('editor-9', editor);
    expect(isContentZoomable('editor-9')).toBe(true);
  });

  it('does nothing for an undeclared pane that reported no areas (menu and macOS paths)', async () => {
    openUndeclaredPane('ext-1');
    setContentZoomAreas('ext-1', []);
    await adjustContentZoom('ext-1', 1);
    await resetContentZoom('ext-1');
    expect(updateDefinition).not.toHaveBeenCalled();
    expect(settingsSet).not.toHaveBeenCalled();
  });

  it('tells a zoomable pane from one that is not: declared, or reporting an area', () => {
    openUndeclaredPane('ext-1');
    setContentZoomAreas('editor-1', []);
    expect(isContentZoomable('editor-1')).toBe(true); // declared, nothing reported
    expect(isContentZoomable('ext-1')).toBe(false); // undeclared, nothing reported
    setContentZoomAreas('ext-1', ['main']);
    expect(isContentZoomable('ext-1')).toBe(true); // undeclared, reporting
    expect(isContentZoomable('no-such-pane')).toBe(false);
  });

  it('zooms and resets a declared pane with no area rendered on its declared area, showing the indicator', async () => {
    setContentZoomAreas('editor-1', []);
    showIndicator.mockClear();
    await adjustContentZoom('editor-1', 1);
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('editor-1')?.state).toEqual(zoomState({ main: 1.1 }));
    expect(settings[MEMORY]).toEqual({ 'editor:PROJ-A:main': 1.1 });
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.1');
    expect(showIndicator).toHaveBeenLastCalledWith('main', formatZoomPercent(1.1));
    await resetContentZoom('editor-1');
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('editor-1')?.state).toEqual({});
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1');
    expect(showIndicator).toHaveBeenLastCalledWith('main', `Default · ${formatZoomPercent(1)}`);
  });

  describe('a declared pane with no area rendered, while memory remembers a level for its identity', () => {
    let pane: HTMLIFrameElement;

    beforeEach(async () => {
      settings[MEMORY] = { 'editor:PROJ-A:main': 1.5 };
      __setContentZoomDepsForTesting({});
      await initializeContentZoomService();
      pane = iframeFor('editor-2');
      definitions.set('editor-2', {
        id: 'editor-2',
        webViewType: 'platformScriptureEditor.react',
        projectId: 'proj-A',
        state: {},
      });
      showIndicator.mockClear();
    });

    it('steps from the remembered level, not the default, and does not lower the memory', async () => {
      await adjustContentZoom('editor-2', 1);
      await __flushContentZoomWritesForTesting();
      expect(definitions.get('editor-2')?.state?.[LEVELS]).toEqual({ main: 1.6 });
      expect(settings[MEMORY]).toEqual({ 'editor:PROJ-A:main': 1.6 });
      expect(cssVar(pane, '--platform-content-zoom-main')).toBe('1.6');
      expect(showIndicator).toHaveBeenLastCalledWith('main', formatZoomPercent(1.6));
    });

    it('resets from the remembered level: the shared level goes too, as for a pane holding it', async () => {
      await resetContentZoom('editor-2');
      await __flushContentZoomWritesForTesting();
      expect(settings[MEMORY]).toEqual({});
      expect(definitions.get('editor-2')?.state).toEqual({});
      expect(cssVar(pane, '--platform-content-zoom-main')).toBe('1');
    });

    it('writes the remembered level on load and on an empty report, not the default', () => {
      applyContentZoomForWebView('editor-2');
      expect(cssVar(pane, '--platform-content-zoom-main')).toBe('1.5');
      setContentZoomAreas('editor-2', []);
      expect(cssVar(pane, '--platform-content-zoom-main')).toBe('1.5');
    });
  });

  it('an explicit area on a declared empty pane is accepted only when it is the declared area', async () => {
    setContentZoomAreas('editor-1', []);
    vi.mocked(logger.debug).mockClear();
    expect(resolveContentZoomArea('editor-1', 'main')).toBe('main');
    expect(resolveContentZoomArea('editor-1', 'footnotes')).toBeUndefined();
    expect(resolveContentZoomArea('editor-1', 'footnotes')).toBeUndefined();
    expect(vi.mocked(logger.debug)).toHaveBeenCalledTimes(1);
    await adjustContentZoom('editor-1', 1, 'footnotes');
    expect(updateDefinition).not.toHaveBeenCalled();
  });

  it('announces zoomability only when it flips: 0→n and n→0 for an undeclared pane, never for a declared one', () => {
    openUndeclaredPane('ext-1');
    const events: Array<{ webViewId: string; isContentZoomable: boolean }> = [];
    const unsubscribe = onDidChangeContentZoomable((event) => events.push(event));
    try {
      setContentZoomAreas('ext-1', ['main']);
      setContentZoomAreas('ext-1', ['main', 'footnotes']); // still zoomable: no event
      setContentZoomAreas('ext-1', []);
      setContentZoomAreas('ext-1', ['main']);
      forgetContentZoom('ext-1');
      setContentZoomAreas('editor-1', []); // declared: stays zoomable
      setContentZoomAreas('editor-1', ['main']);
      forgetContentZoom('editor-1');
      expect(events).toEqual([
        { webViewId: 'ext-1', isContentZoomable: true },
        { webViewId: 'ext-1', isContentZoomable: false },
        { webViewId: 'ext-1', isContentZoomable: true },
        { webViewId: 'ext-1', isContentZoomable: false },
      ]);
    } finally {
      unsubscribe();
    }
  });

  it('isolates a throwing zoomability subscriber from the CSS push and from later subscribers', () => {
    const pane = openUndeclaredPane('ext-1');
    const laterEvents: Array<{ webViewId: string; isContentZoomable: boolean }> = [];
    const unsubscribeThrowing = onDidChangeContentZoomable(() => {
      throw new Error('a subscriber that misbehaves');
    });
    const unsubscribeLater = onDidChangeContentZoomable((event) => laterEvents.push(event));
    try {
      setContentZoomAreas('ext-1', ['main']);
      // The later subscriber still hears the change...
      expect(laterEvents).toEqual([{ webViewId: 'ext-1', isContentZoomable: true }]);
      // ...and the CSS push that follows the emit in setContentZoomAreas still ran.
      expect(cssVar(pane, '--platform-content-zoom-main')).not.toBe('');
      expect(logger.warn).toHaveBeenCalledTimes(1);
    } finally {
      unsubscribeThrowing();
      unsubscribeLater();
    }
  });

  it('answers from the reported areas alone when the definition read throws, rather than throwing', async () => {
    let definitionReadThrows = false;
    __setContentZoomDepsForTesting({
      getDefinition: (id: string) => {
        if (definitionReadThrows) throw new Error('the dock layout is gone');
        return definitions.get(id);
      },
    });
    await initializeContentZoomService();
    openUndeclaredPane('ext-1');
    setContentZoomAreas('ext-1', ['main']);
    // A declared pane whose type has not been read yet: the throwing read is its first.
    definitions.set('editor-2', {
      id: 'editor-2',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: {},
    });
    definitionReadThrows = true;
    expect(isContentZoomable('ext-1')).toBe(true);
    expect(isContentZoomable('editor-2')).toBe(false); // declared, but its type cannot be read now
  });

  it('drops the areas of content whose bootstrap never runs again, once the wait after its load runs out', async () => {
    const pane = openUndeclaredPane('ext-1');
    setContentZoomAreas('ext-1', ['main']);
    vi.useFakeTimers();
    try {
      // Simulates a document whose bootstrap never ran (or tore itself down): the string-keyed form
      // avoids both a type assertion and the member-access underscore the bootstrap contract owns.
      Reflect.deleteProperty(pane.contentWindow ?? {}, '__platformContentZoom');
      applyContentZoomForWebView('ext-1');
      // Positive control: until the wait runs out, the areas stand.
      expect(resolveContentZoomArea('ext-1', undefined)).toBe('main');
      vi.advanceTimersByTime(1000);
      expect(resolveContentZoomArea('ext-1', undefined)).toBeUndefined();
      expect(frameZoom(pane)).toBe('');
    } finally {
      vi.useRealTimers();
    }
    updateDefinition.mockClear();
    settingsSet.mockClear();
    await adjustContentZoom('ext-1', 1); // an undeclared pane with no area has nothing to act on
    expect(updateDefinition).not.toHaveBeenCalled();
    expect(settingsSet).not.toHaveBeenCalled();
  });

  it("a reload whose bootstrap runs keeps the pane's areas", async () => {
    settings['platform.webViewContentZoom'] = 1.3;
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    vi.useFakeTimers();
    try {
      applyContentZoomForWebView('editor-1'); // __platformContentZoom stays in place, as for a real reload
      vi.advanceTimersByTime(1000);
      expect(resolveContentZoomArea('editor-1', undefined)).toBe('main');
      expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.3');
    } finally {
      vi.useRealTimers();
    }
  });

  it('a report inside the grace still cancels it', async () => {
    // Undeclared: a declared pane's resolution falls back to its declared default area even after
    // its areas are dropped, which would make this assertion pass whether or not the cancel ran.
    const pane = openUndeclaredPane('ext-1');
    setContentZoomAreas('ext-1', ['main', 'footnotes']);
    vi.useFakeTimers();
    try {
      applyContentZoomForWebView('ext-1');
      vi.advanceTimersByTime(500);
      setContentZoomAreas('ext-1', ['main']); // the reloaded content's own report, mid-grace
      // Simulates that content going dead right after its report: without the cancel, the wait due
      // at 1000ms would find no bootstrap and drop the areas.
      Reflect.deleteProperty(pane.contentWindow ?? {}, '__platformContentZoom');
      vi.advanceTimersByTime(600);
      expect(resolveContentZoomArea('ext-1', undefined)).toBe('main');
    } finally {
      vi.useRealTimers();
    }
  });

  it('leaves a URL web view unscaled; it carries only the default variable', () => {
    definitions.set('url-1', {
      id: 'url-1',
      webViewType: 'someExtension.urlView',
      contentType: 'url',
    });
    applyContentZoomForWebView('url-1');
    const pane = iframeFor('url-1');
    expect(frameZoom(pane)).toBe('');
    expect(cssVar(pane, '--platform-content-zoom-default')).toBe('1');
  });

  it('keeps a pane zoomable after the iframe load hook when it reported its areas before it', async () => {
    vi.useFakeTimers();
    try {
      setContentZoomAreas('editor-1', ['main']);
      applyContentZoomForWebView('editor-1');
      expect(resolveContentZoomArea('editor-1', undefined)).toBe('main');
      vi.advanceTimersByTime(2000);
    } finally {
      vi.useRealTimers();
    }
    await adjustContentZoom('editor-1', 1, 'main');
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.1');
  });

  it('gives a late-reported area its remembered level', async () => {
    requireDefinition('editor-1').state = { [LEVELS]: { footnotes: 1.7 } };
    setContentZoomAreas('editor-1', ['main']);
    expect(cssVar(iframe, '--platform-content-zoom-footnotes')).toBe('1.7'); // own levels are always written
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    expect(cssVar(iframe, '--platform-content-zoom-footnotes')).toBe('1.7');
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1');
  });

  it('leaves a remembered level whose project is not open alone', async () => {
    settings[MEMORY] = { 'editor:PROJ-Z:main': 1.2, 'notes:PROJ-A:footnotes': 1.1 };
    __setContentZoomDepsForTesting({});
    settingsSet.mockClear();
    await initializeContentZoomService();
    expect(settingsSet).not.toHaveBeenCalled();
    expect(settings[MEMORY]).toEqual({
      'editor:PROJ-Z:main': 1.2,
      'notes:PROJ-A:footnotes': 1.1,
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
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    requireDefinition('editor-1').state = { [LEVELS]: { main: 1.4 } };
    await resetContentZoom('editor-1', 'main');
    expect(definitions.get('editor-1')?.state).toEqual({});
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1');
    expect(showIndicator).toHaveBeenLastCalledWith('main', `Default · ${formatZoomPercent(1)}`);
  });

  it('re-pushes every open pane when the default changes, scaling none of them whole', () => {
    definitions.set('url-1', {
      id: 'url-1',
      webViewType: 'someExtension.urlView',
      contentType: 'url',
    });
    const urlPane = iframeFor('url-1');
    expect(defaultCallbacks).toHaveLength(1);
    defaultCallbacks[0](1.5); // no re-init: this is the live subscription callback, fired directly
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.5');
    expect(frameZoom(iframe)).toBe('');
    expect(cssVar(urlPane, '--platform-content-zoom-default')).toBe('1.5');
    expect(frameZoom(urlPane)).toBe('');
    expect(cssVar(urlPane, '--platform-content-zoom-main')).toBe('');
  });

  it("keeps re-pushing the other panes when one pane's push fails after the default changes", async () => {
    definitions.set('editor-2', {
      id: 'editor-2',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-B',
      state: {},
    });
    let editor1Detached = false;
    __setContentZoomDepsForTesting({
      getDefinition: (id: string) => {
        if (id === 'editor-1' && editor1Detached) throw new Error('detached from the dock layout');
        return definitions.get(id);
      },
    });
    defaultCallbacks.length = 0;
    await initializeContentZoomService();
    // editor-1 reports its areas while its definition still reads, so its re-push below reaches the
    // definition read (an area-less pane reads one too, to resolve its declared default) and throws
    // there.
    setContentZoomAreas('editor-1', ['main']);
    setContentZoomAreas('editor-2', ['main']);
    editor1Detached = true;
    const editor2Iframe = iframeFor('editor-2');
    vi.mocked(logger.warn).mockClear();
    expect(defaultCallbacks).toHaveLength(1);
    defaultCallbacks[0](1.5);
    expect(cssVar(editor2Iframe, '--platform-content-zoom-main')).toBe('1.5');
    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('editor-1'));
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
      expect(settingsSet).toHaveBeenCalledWith(MEMORY, { 'editor:PROJ-A:main': 1.1 });
    } finally {
      vi.useRealTimers();
    }
  });

  it('ignores a non-finite deltaSteps, writing no state, memory or indicator', async () => {
    await adjustContentZoom('editor-1', Number.NaN, 'main');
    await adjustContentZoom('editor-1', Number.POSITIVE_INFINITY, 'main');
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('editor-1')?.state).toEqual({});
    expect(updateDefinition).not.toHaveBeenCalled();
    expect(settingsSet).not.toHaveBeenCalledWith(MEMORY, expect.anything());
    expect(showIndicator).not.toHaveBeenCalled();
  });
});
