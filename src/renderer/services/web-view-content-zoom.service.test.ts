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
// The percent formatter, so an indicator assertion spells the number exactly as the code does.
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
  let modalOverlayOpen = false;
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
    modalOverlayOpen = false;
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
      isModalOverlayOpen: () => modalOverlayOpen,
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

  it('lets a modal overlay stop only the no-id path; an explicitly targeted pane still resolves', () => {
    lastFocused = 'editor-1';
    modalOverlayOpen = true;
    expect(resolveContentZoomTarget('editor-1')).toBe('editor-1');
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

  it('answers whether a request carrying no ids has both a pane and an area to act on', () => {
    expect(canContentZoomActOnActiveTarget()).toBe(false);
    lastFocused = 'editor-1';
    expect(canContentZoomActOnActiveTarget()).toBe(true);
    setContentZoomAreas('editor-1', []);
    expect(canContentZoomActOnActiveTarget()).toBe(false);
    setContentZoomAreas('editor-1', ['main']);
    modalOverlayOpen = true;
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
      state: { [LEVELS]: { main: 1.1 } },
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
      expect(definitions.get('editor-1')?.state).toEqual({ [LEVELS]: { main: 1.2 } });
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

  it('does not overwrite a pane that already holds levels', async () => {
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
    // Its own level is kept; the platform only adds the stamp naming the identity it belongs to.
    expect(definitions.get('editor-4')?.state).toEqual(zoomState({ main: 2 }));
    expect(cssVar(iframeFor('editor-4'), '--platform-content-zoom-main')).toBe('2');
  });

  it('seeds on the first non-empty report even when an earlier report for the same pane was empty', async () => {
    settings[MEMORY] = { 'editor:PROJ-A:main': 1.3, 'editor:PROJ-A:footnotes': 0.9 };
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
    await __flushContentZoomWritesForTesting();
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
    onDidUpdateWebViewCallback?.({ webView: requireDefinition('notes-4') });
    expect(definitions.get('notes-4')?.state).toEqual({});
    expect(cssVar(iframeFor('notes-4'), '--platform-content-zoom-main')).toBe('1');
    await __flushContentZoomWritesForTesting();
    expect(definitions.get('notes-4')?.state).toEqual({});
    expect(settings[MEMORY]).toEqual({});
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

  it('does not stamp a pane whose only "own levels" are a still-pending, uncommitted write', async () => {
    // Every commit attempt fails to land, so the level chosen below never actually reaches state.
    updateDefinition.mockImplementation(() => false);
    await adjustContentZoom('editor-1', 1, 'main');
    expect(definitions.get('editor-1')?.state).toEqual({});
    // Unmounts the pane; the retry this makes also fails, so the level stays pending rather than
    // being discarded along with the rest of the pane's state.
    forgetContentZoom('editor-1');
    updateDefinition.mockImplementation(applyDefinitionUpdate);
    updateDefinition.mockClear();
    // The reload's bootstrap reports fresh, as if for a pane that had never reported before.
    setContentZoomAreas('editor-1', ['main']);
    // No levels are actually committed, so nothing may be stamped either — a stamp with no levels
    // behind it would violate the invariant that the two are always written together.
    expect(definitions.get('editor-1')?.state).toEqual({});
    expect(updateDefinition).not.toHaveBeenCalled();
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

  it('does nothing for an unknown web view', async () => {
    await adjustContentZoom('nope', 1);
    expect(updateDefinition).not.toHaveBeenCalled();
    expect(showIndicator).not.toHaveBeenCalled();
  });

  it('still acts on an explicitly targeted pane while a modal overlay is open, and on none without an id', async () => {
    modalOverlayOpen = true;
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
    expect(definitions.get('editor-2')?.state).toEqual({ [LEVELS]: { main: 1.1 } });
    release();
    await flushing;
    expect(settings[MEMORY]).toEqual({ 'editor:PROJ-A:main': 1.1 });
    expect(definitions.get('editor-1')?.state).toEqual({ [LEVELS]: { main: 1.1 } });
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

  it('clears a whole-iframe zoom the pane may no longer have, even when its definition cannot be found', async () => {
    settings['platform.webViewContentZoom'] = 1.3;
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    vi.useFakeTimers();
    try {
      setContentZoomAreas('editor-1', []);
      vi.advanceTimersByTime(1000);
      expect(iframe.style.zoom).toBe('1.3'); // the grant the pane earned
      definitions.delete('editor-1');
      applyContentZoomForWebView('editor-1');
      expect(iframe.style.zoom).toBe('');
    } finally {
      vi.useRealTimers();
    }
  });

  it("a content replacement whose bootstrap never runs loses the previous content's areas", async () => {
    settings['platform.webViewContentZoom'] = 1.3;
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.3');
    expect(cssVar(iframe, '--platform-content-zoom-footnotes')).toBe('1.3');
    vi.useFakeTimers();
    try {
      // Simulates a document whose bootstrap never ran (or tore itself down): the string-keyed form
      // avoids both a type assertion and the member-access underscore the bootstrap contract owns.
      Reflect.deleteProperty(iframe.contentWindow ?? {}, '__platformContentZoom');
      applyContentZoomForWebView('editor-1');
      vi.advanceTimersByTime(1000);
      expect(resolveContentZoomArea('editor-1', undefined)).toBeUndefined();
      expect(iframe.style.zoom).toBe('1.3');
      updateDefinition.mockClear();
      settingsSet.mockClear();
      await adjustContentZoom('editor-1', 1); // content-root gate: no area, so this is a no-op
      expect(updateDefinition).not.toHaveBeenCalled();
      expect(settingsSet).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
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
      expect(iframe.style.zoom).toBe('');
      expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.3');
    } finally {
      vi.useRealTimers();
    }
  });

  it('a report inside the grace still cancels it', async () => {
    settings['platform.webViewContentZoom'] = 1.3;
    __setContentZoomDepsForTesting({});
    await initializeContentZoomService();
    setContentZoomAreas('editor-1', ['main', 'footnotes']);
    vi.useFakeTimers();
    try {
      applyContentZoomForWebView('editor-1');
      vi.advanceTimersByTime(500);
      setContentZoomAreas('editor-1', ['main']); // the reloaded content's own report, mid-grace
      vi.advanceTimersByTime(600);
      expect(iframe.style.zoom).toBe('');
      expect(resolveContentZoomArea('editor-1', undefined)).toBe('main');
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
    const pane = iframeFor('url-1');
    expect(pane.style.zoom).toBe('1');
    expect(cssVar(pane, '--platform-content-zoom-default')).toBe('1');
  });

  it('leaves a pane that has not reported yet unscaled at the iframe load hook, clearing any zoom the old content left', () => {
    definitions.set('editor-7', {
      id: 'editor-7',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-A',
      state: {},
    });
    const pane = iframeFor('editor-7');
    // A call for a known non-URL pane arms a fallback grace timer, so fake timers keep that timer
    // from leaking into later tests as a real pending setTimeout.
    vi.useFakeTimers();
    try {
      pane.style.zoom = '2'; // dirtied, so the clear is observable rather than assumed
      applyContentZoomForWebView('editor-7');
      expect(pane.style.zoom).toBe('');
      expect(cssVar(pane, '--platform-content-zoom-default')).toBe('1');
      expect(cssVar(pane, '--platform-content-zoom-main')).toBe(''); // nothing reported, no area
    } finally {
      vi.useRealTimers();
    }
  });

  it('keeps a pane zoomable after the iframe load hook when it reported its areas before it', async () => {
    vi.useFakeTimers();
    try {
      setContentZoomAreas('editor-1', ['main']);
      applyContentZoomForWebView('editor-1');
      expect(resolveContentZoomArea('editor-1', undefined)).toBe('main');
      vi.advanceTimersByTime(2000);
      expect(iframe.style.zoom).toBe(''); // not whole-scaled by the grace either
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

  it('repushes every open pane, including one granted the whole-iframe fallback, when the default setting changes', () => {
    definitions.set('url-1', {
      id: 'url-1',
      webViewType: 'someExtension.urlView',
      contentType: 'url',
    });
    const urlPane = iframeFor('url-1');
    expect(defaultCallbacks).toHaveLength(1);
    defaultCallbacks[0](1.5); // no re-init: this is the live subscription callback, fired directly
    expect(cssVar(iframe, '--platform-content-zoom-main')).toBe('1.5');
    expect(iframe.style.zoom).toBe('');
    expect(urlPane.style.zoom).toBe('1.5');
    expect(cssVar(urlPane, '--platform-content-zoom-main')).toBe('');
  });

  it("keeps re-pushing the other panes when one pane's push fails after the default changes", async () => {
    definitions.set('editor-2', {
      id: 'editor-2',
      webViewType: 'platformScriptureEditor.react',
      projectId: 'proj-B',
      state: {},
    });
    __setContentZoomDepsForTesting({
      getDefinition: (id: string) => {
        if (id === 'editor-1') throw new Error('detached from the dock layout');
        return definitions.get(id);
      },
    });
    defaultCallbacks.length = 0;
    await initializeContentZoomService();
    setContentZoomAreas('editor-2', ['main']);
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
