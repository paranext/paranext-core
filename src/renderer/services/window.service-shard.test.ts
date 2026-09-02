import { afterEach, describe, expect, test, vi, beforeEach } from 'vitest';
import {
  getLastFocusedTabId,
  getLastSelectedScriptureNavigableWebViewId,
  getNavigationTargetWebView,
  onDidChangeLastFocusedTabId,
  onDidChangeLastSelectedScriptureNavigableWebViewId,
  onDidChangeNavigationTargetWebView,
  testingWindowService,
} from '@renderer/services/window.service-shard';
import { ResolvedWebView } from '@renderer/services/navigation-target.util';
import { noteTabAwaitingDocumentFocus } from '@renderer/services/window-activation.util';

type CloseWebViewCallback = (event: { webView: { id: string } }) => void;
/** The open event's payload is ignored, so this callback takes no arguments */
type WebViewLifecycleCallback = () => void;
/** The update handler reads the updated web view to decide whether to recompute the target */
type UpdateWebViewCallback = (event: { webView: { id: string; webViewType?: string } }) => void;

// vi.mock and vi.hoisted calls are hoisted by vitest above the imports above at transform time, so
// the static imports can be written first here to satisfy import/first.
const {
  closeWebViewCallbacks,
  openWebViewCallbacks,
  updateWebViewCallbacks,
  getTabInfoByIdMock,
  focusTabMock,
  getSavedWebViewDefinitionSyncMock,
  getAllOpenWebViewDefinitionsSyncMock,
  readDirectionMock,
} = vi.hoisted(() => {
  const callbacks: CloseWebViewCallback[] = [];
  const openCallbacks: WebViewLifecycleCallback[] = [];
  const updateCallbacks: UpdateWebViewCallback[] = [];
  // Shared (not per-`getDockLayout()`-call) mock so individual tests can control what tab info
  // comes back for a given tab id, e.g. to simulate a web view tab vs. a non-web-view tab.
  const tabInfoMock = vi.fn((): { id: string; tabType: string } | undefined => undefined);
  // Defaults every web view to an eligible (project-bearing) definition so existing tests that
  // don't care about the eligibility gate keep passing; tests for the gate itself override this.
  // Typed loosely (both fields optional, possibly `undefined` altogether) so individual tests
  // can return definition-less / ineligible / missing definitions.
  const definitionMock = vi.fn(
    (id: string): { id: string; projectId?: string; shouldShowToolbar?: boolean } | undefined => ({
      id,
      projectId: 'project-1',
    }),
  );
  // No open web views by default, so the main-editor fallback of navigation target resolution
  // resolves to nothing; navigation-target tests override this to open an editor.
  const allOpenDefinitionsMock = vi.fn(
    (): { id: string; webViewType: string; projectId?: string }[] => [],
  );
  // Layout direction is read from the document, which only a renderer has; LTR unless a test says
  // otherwise
  const directionMock = vi.fn((): 'ltr' | 'rtl' => 'ltr');
  return {
    closeWebViewCallbacks: callbacks,
    openWebViewCallbacks: openCallbacks,
    updateWebViewCallbacks: updateCallbacks,
    getTabInfoByIdMock: tabInfoMock,
    // Shared across `getDockLayout()` calls so a test can assert what the shard asked the dock for
    focusTabMock: vi.fn(),
    getSavedWebViewDefinitionSyncMock: definitionMock,
    getAllOpenWebViewDefinitionsSyncMock: allOpenDefinitionsMock,
    readDirectionMock: directionMock,
  };
});

vi.mock('@renderer/services/web-view.service-shard', () => ({
  getDockLayout: vi.fn(async () => ({
    focusTab: focusTabMock,
    getTabInfoByElement: vi.fn(() => undefined),
    getTabInfoById: getTabInfoByIdMock,
    getTabInfoByDirectionFromTab: vi.fn(() => undefined),
  })),
  onDidCloseWebView: (callback: CloseWebViewCallback) => {
    closeWebViewCallbacks.push(callback);
    return () => true;
  },
  onDidOpenWebView: (callback: WebViewLifecycleCallback) => {
    openWebViewCallbacks.push(callback);
    return () => true;
  },
  onDidUpdateWebView: (callback: UpdateWebViewCallback) => {
    updateWebViewCallbacks.push(callback);
    return () => true;
  },
  getSavedWebViewDefinitionSync: getSavedWebViewDefinitionSyncMock,
  getAllOpenWebViewDefinitionsSync: getAllOpenWebViewDefinitionsSyncMock,
}));

vi.mock('@shared/services/data-provider.service', async (importOriginal) => {
  const { dataProviderService: realDataProviderService } =
    await importOriginal<typeof import('@shared/services/data-provider.service')>();
  return {
    dataProviderService: {
      registerEngine: vi.fn(async (_name, engine) => engine),
      // The REAL decorator, not a stub. `getNavigationContext` carries it, and it is the only
      // thing standing between this engine and a registration that fails for want of a
      // `setNavigationContext`. Stubbing it out would hide a decorator dropped from the shard —
      // the whole unit suite would stay green while every window failed to start.
      decorators: { ignore: realDataProviderService.decorators.ignore },
    },
  };
});

// Only a renderer can read the layout direction, and there is no document here — so the one thing
// this window reports about itself that the tests vary is stubbed
vi.mock('platform-bible-react/experimental', () => ({
  readDirection: readDirectionMock,
}));

// The module-load `platform.interfaceMode` subscription drives Simple-mode nav-target pinning. This
// mock never invokes the callback, so `currentInterfaceMode` stays `undefined` (treated as not
// Simple) and these tests exercise the default tracked-first resolution. `subscribe` resolves to a
// no-op unsubscriber so the module-load IIFE completes cleanly.
vi.mock('@shared/services/settings.service', () => ({
  settingsService: {
    subscribe: vi.fn(async () => async () => true),
    get: vi.fn(async () => 'simple'),
  },
}));

function emitCloseWebView(id: string) {
  closeWebViewCallbacks.forEach((callback) => callback({ webView: { id } }));
}

function emitOpenWebView() {
  openWebViewCallbacks.forEach((callback) => callback());
}

function emitUpdateWebView(webView: { id: string; webViewType?: string }) {
  updateWebViewCallbacks.forEach((callback) => callback({ webView }));
}

/**
 * Engines created during the current test — disposed in the `afterEach` below. The engine
 * constructor attaches window `focusin`/`focusout` listeners and kicks off an initial focus
 * detection; without disposal, every test's engine would keep listening in the file's shared jsdom
 * window, and a future test that moves DOM focus would wake all of them at once.
 */
const enginesToDispose: ReturnType<
  typeof testingWindowService.implementWindowDataProviderEngine
>[] = [];

function createTestEngine() {
  const engine = testingWindowService.implementWindowDataProviderEngine();
  enginesToDispose.push(engine);
  return engine;
}

afterEach(async () => {
  await Promise.all(enginesToDispose.splice(0).map((engine) => engine.dispose()));
});

describe('last selected scripture-navigable web view tracking', () => {
  beforeEach(() => {
    getTabInfoByIdMock.mockReset();
    getTabInfoByIdMock.mockReturnValue(undefined);
    readDirectionMock.mockReturnValue('ltr');
    getSavedWebViewDefinitionSyncMock.mockReset();
    getSavedWebViewDefinitionSyncMock.mockImplementation((id: string) => ({
      id,
      projectId: 'project-1',
    }));
    // No open web views, so clearing the tracker below recomputes the navigation target to
    // undefined instead of latching onto a leftover editor from a previous test
    getAllOpenWebViewDefinitionsSyncMock.mockReset();
    getAllOpenWebViewDefinitionsSyncMock.mockReturnValue([]);
    // Reset tracker state between tests by "closing" whatever is tracked
    const tracked = getLastSelectedScriptureNavigableWebViewId();
    if (tracked) emitCloseWebView(tracked);
  });

  test('remembers the most recently focused web view', async () => {
    const engine = createTestEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');

    await engine.setFocus({ focusType: 'webView', id: 'web-view-2' });
    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-2');
  });

  test('retains the web view when focus moves to a tab or nothing', async () => {
    const engine = createTestEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
    await engine.setFocus(undefined);
    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
  });

  test('clears only when the tracked web view closes', async () => {
    const engine = createTestEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });

    emitCloseWebView('some-other-web-view');
    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');

    emitCloseWebView('web-view-1');
    expect(getLastSelectedScriptureNavigableWebViewId()).toBeUndefined();
  });

  test('emits onDidChangeLastSelectedScriptureNavigableWebViewId on change', async () => {
    const received: (string | undefined)[] = [];
    const unsubscribe = onDidChangeLastSelectedScriptureNavigableWebViewId((id) => {
      received.push(id);
    });
    const engine = createTestEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-9' });
    await engine.setFocus({ focusType: 'webView', id: 'web-view-9' });
    expect(received).toEqual(['web-view-9']);
    unsubscribe();
  });

  test('updates the tracker immediately when a web view tab is focused via setFocus tab path', async () => {
    // Simulates clicking a web view's tab: `platform-tab-title.component.tsx` calls
    // `setFocus({ focusType: 'tab', id })`, which resolves tab info and stamps `tabType` onto the
    // focus subject before it reaches `#setFocusInternal`.
    getTabInfoByIdMock.mockReturnValueOnce({ id: 'web-view-tab-1', tabType: 'webView' });

    const engine = createTestEngine();
    await engine.setFocus({ focusType: 'tab', id: 'web-view-tab-1' });

    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-tab-1');
  });

  test('retains the tracked web view when a non-web-view tab is focused via setFocus tab path', async () => {
    // Note: `setFocus` with `focusType: 'webView'` never calls `getTabInfoById`, so no mock return
    // value is queued for it here.
    const engine = createTestEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');

    getTabInfoByIdMock.mockReturnValueOnce({ id: 'settings-tab-1', tabType: 'settings-tab' });
    await engine.setFocus({ focusType: 'tab', id: 'settings-tab-1' });

    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
  });

  describe('scripture-navigable eligibility gate', () => {
    test('tracks a web view whose definition has only projectId', async () => {
      getSavedWebViewDefinitionSyncMock.mockReturnValue({ id: 'web-view-1', projectId: 'proj-1' });

      const engine = createTestEngine();
      await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });

      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
    });

    test('tracks a web view whose definition has only shouldShowToolbar', async () => {
      getSavedWebViewDefinitionSyncMock.mockReturnValue({
        id: 'web-view-1',
        shouldShowToolbar: true,
      });

      const engine = createTestEngine();
      await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });

      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
    });

    test('retains the previous tracked web view when focusing a web view with no projectId or shouldShowToolbar', async () => {
      const engine = createTestEngine();
      // First track an eligible web view (default mock: has projectId)
      await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');

      // Now focus an ineligible web view (definition has neither projectId nor shouldShowToolbar)
      getSavedWebViewDefinitionSyncMock.mockReturnValue({ id: 'web-view-2' });
      await engine.setFocus({ focusType: 'webView', id: 'web-view-2' });

      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
    });

    test('retains the previous tracked web view when the definition cannot be found (undefined)', async () => {
      const engine = createTestEngine();
      await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');

      getSavedWebViewDefinitionSyncMock.mockReturnValue(undefined);
      await engine.setFocus({ focusType: 'webView', id: 'web-view-2' });

      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
    });

    test('retains the previous tracked web view when reading the definition throws', async () => {
      const engine = createTestEngine();
      await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');

      getSavedWebViewDefinitionSyncMock.mockImplementation(() => {
        throw new Error('dock layout not registered');
      });
      await engine.setFocus({ focusType: 'webView', id: 'web-view-2' });

      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
    });

    test('retains the previous tracked web view when an ineligible web view tab is focused via setFocus tab path', async () => {
      const engine = createTestEngine();
      await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');

      getTabInfoByIdMock.mockReturnValueOnce({ id: 'web-view-tab-2', tabType: 'webView' });
      getSavedWebViewDefinitionSyncMock.mockReturnValue({ id: 'web-view-tab-2' });
      await engine.setFocus({ focusType: 'tab', id: 'web-view-tab-2' });

      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
    });
  });
});

describe('last focused tab tracking', () => {
  beforeEach(() => {
    getTabInfoByIdMock.mockReset();
    getTabInfoByIdMock.mockReturnValue(undefined);
    readDirectionMock.mockReturnValue('ltr');
    getSavedWebViewDefinitionSyncMock.mockReset();
    getSavedWebViewDefinitionSyncMock.mockImplementation((id: string) => ({
      id,
      projectId: 'project-1',
    }));
    getAllOpenWebViewDefinitionsSyncMock.mockReset();
    getAllOpenWebViewDefinitionsSyncMock.mockReturnValue([]);
  });

  test('remembers the most recently focused web view even when it is not scripture-navigable', async () => {
    const engine = createTestEngine();
    // Track an eligible web view (default mock: has projectId)
    await engine.setFocus({ focusType: 'webView', id: 'web-view-focus-1' });
    expect(getLastFocusedTabId()).toBe('web-view-focus-1');
    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-focus-1');

    // Focus an ineligible web view: the last-selected tracker retains the previous web view, but
    // the last-FOCUSED tracker follows the user's focus
    getSavedWebViewDefinitionSyncMock.mockReturnValue({ id: 'web-view-focus-2' });
    await engine.setFocus({ focusType: 'webView', id: 'web-view-focus-2' });

    expect(getLastFocusedTabId()).toBe('web-view-focus-2');
    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-focus-1');
  });

  test('remembers a focused non-web-view tab', async () => {
    const engine = createTestEngine();
    getTabInfoByIdMock.mockReturnValueOnce({ id: 'settings-tab-focus', tabType: 'settings-tab' });
    await engine.setFocus({ focusType: 'tab', id: 'settings-tab-focus' });

    expect(getLastFocusedTabId()).toBe('settings-tab-focus');
  });

  test('retains the last focused tab when focus moves outside all tabs', async () => {
    const engine = createTestEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-focus-3' });
    await engine.setFocus(undefined);

    expect(getLastFocusedTabId()).toBe('web-view-focus-3');
  });

  test('emits onDidChangeLastFocusedTabId on change', async () => {
    const received: (string | undefined)[] = [];
    const unsubscribe = onDidChangeLastFocusedTabId((id) => {
      received.push(id);
    });
    const engine = createTestEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-focus-4' });
    await engine.setFocus({ focusType: 'webView', id: 'web-view-focus-4' });
    expect(received).toEqual(['web-view-focus-4']);
    unsubscribe();
  });
});

describe('navigation target web view', () => {
  const EDITOR_DEFINITION = {
    id: 'editor-1',
    webViewType: 'platformScriptureEditor.react',
    projectId: 'project-1',
  };

  beforeEach(() => {
    getTabInfoByIdMock.mockReset();
    getTabInfoByIdMock.mockReturnValue(undefined);
    readDirectionMock.mockReturnValue('ltr');
    getSavedWebViewDefinitionSyncMock.mockReset();
    getSavedWebViewDefinitionSyncMock.mockImplementation((id: string) => ({
      id,
      projectId: 'project-1',
    }));
    // No open web views, so both resolution steps below land on undefined
    getAllOpenWebViewDefinitionsSyncMock.mockReset();
    getAllOpenWebViewDefinitionsSyncMock.mockReturnValue([]);
    // Reset tracker state between tests by "closing" whatever is tracked (the setter recomputes
    // the cached target)...
    const tracked = getLastSelectedScriptureNavigableWebViewId();
    if (tracked) emitCloseWebView(tracked);
    // ...and force a recompute regardless (an open event always recomputes), since the cached
    // target can be a fallback editor from a previous test even when nothing is tracked
    emitOpenWebView();
  });

  test('resolves the tracked web view with its saved definition once one is focused', async () => {
    expect(getNavigationTargetWebView()).toBeUndefined();

    const engine = createTestEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-nav-1' });

    expect(getNavigationTargetWebView()).toEqual({
      id: 'web-view-nav-1',
      definition: { id: 'web-view-nav-1', projectId: 'project-1' },
    });
  });

  test('falls back to the first open scripture editor with a project when nothing is tracked', () => {
    getAllOpenWebViewDefinitionsSyncMock.mockReturnValue([EDITOR_DEFINITION]);
    // A web view opening is what makes the editor discoverable — the open event drives the
    // recompute
    emitOpenWebView();

    expect(getLastSelectedScriptureNavigableWebViewId()).toBeUndefined();
    expect(getNavigationTargetWebView()).toEqual({
      id: 'editor-1',
      definition: EDITOR_DEFINITION,
    });
  });

  test('re-validates the tracked definition on update and falls back when it is no longer navigable', async () => {
    const engine = createTestEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-nav-2' });
    expect(getNavigationTargetWebView()?.id).toBe('web-view-nav-2');

    // The tracked web view's definition loses its project (and shows no toolbar) — it was eligible
    // when focused, but it now has nothing to navigate
    getSavedWebViewDefinitionSyncMock.mockReturnValue({ id: 'web-view-nav-2' });
    getAllOpenWebViewDefinitionsSyncMock.mockReturnValue([EDITOR_DEFINITION]);
    // The updated web view is the tracked one, so the guarded update handler recomputes
    emitUpdateWebView({ id: 'web-view-nav-2' });

    // The tracked id is retained, but resolution falls through to the main editor
    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-nav-2');
    expect(getNavigationTargetWebView()).toEqual({
      id: 'editor-1',
      definition: EDITOR_DEFINITION,
    });
  });

  test('emits onDidChangeNavigationTargetWebView only when the resolved target actually changes', () => {
    const received: (ResolvedWebView | undefined)[] = [];
    const unsubscribe = onDidChangeNavigationTargetWebView((target) => {
      received.push(target);
    });

    getAllOpenWebViewDefinitionsSyncMock.mockReturnValue([EDITOR_DEFINITION]);
    // An editor update passes the recompute gate both times; the deepEqual gate dedupes the emit
    emitUpdateWebView(EDITOR_DEFINITION);
    // Same open web views, same resolved target — must not re-emit
    emitUpdateWebView(EDITOR_DEFINITION);

    expect(received).toEqual([{ id: 'editor-1', definition: EDITOR_DEFINITION }]);
    unsubscribe();
  });

  test('recomputes to undefined when a non-tracked fallback editor closes', () => {
    getAllOpenWebViewDefinitionsSyncMock.mockReturnValue([EDITOR_DEFINITION]);
    emitOpenWebView();
    expect(getNavigationTargetWebView()?.id).toBe('editor-1');

    // The editor was never tracked, so its close skips the tracker but must still recompute
    getAllOpenWebViewDefinitionsSyncMock.mockReturnValue([]);
    emitCloseWebView('editor-1');

    expect(getNavigationTargetWebView()).toBeUndefined();
  });
});

describe('getNavigationContext', () => {
  test('reports no target when this window has nothing to navigate', async () => {
    // The history commands still act (on scroll group 0) with no target, so the context itself has
    // to come back rather than being absent
    const engine = createTestEngine();
    // Nothing has been focused and no editor is open, so resolution has nothing to land on
    expect(getNavigationTargetWebView()).toBeUndefined();

    await expect(engine.getNavigationContext()).resolves.toEqual({
      readDirection: 'ltr',
      target: undefined,
    });
  });

  test('reports the resolved target and this window’s layout direction in one answer', async () => {
    const engine = createTestEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-nav-1' });

    await expect(engine.getNavigationContext()).resolves.toEqual({
      readDirection: 'ltr',
      target: {
        webViewId: 'web-view-nav-1',
        scrollGroupScrRef: 0,
        projectId: 'project-1',
      },
    });
  });

  test('reports an RTL window as RTL, which is what decides the history direction', async () => {
    // Only a renderer can read the layout direction, so the main process gets it from here
    readDirectionMock.mockReturnValue('rtl');
    const engine = createTestEngine();

    await expect(engine.getNavigationContext()).resolves.toEqual(
      expect.objectContaining({ readDirection: 'rtl' }),
    );
  });

  test('is marked so registration does not read it as the getter for a data type', async () => {
    // A `get___` method on an engine is otherwise classified as the getter for a
    // `NavigationContext` data type, and registration fails for want of a `setNavigationContext` —
    // taking this window's startup with it. The mark is what keeps it a plain method the network
    // object exposes, and it is the single most easily-deleted line on the whole navigation path.
    const engine = createTestEngine();

    // Read off the method rather than declared on it: the mark is what the decorator leaves behind
    const isIgnored: unknown = Reflect.get(engine.getNavigationContext, 'isIgnored');

    expect(isIgnored).toBe(true);
  });
});

/**
 * A window created without activation is undone by its own content unless the content knows: every
 * mounted panel and every loaded web view asks this window's service to focus it, and focusing a
 * tab focuses its web view's iframe, which asks the browser to activate the window. Those calls
 * resolve this window's own shard by name and never reach the main process, so the shard has to
 * answer for itself.
 */
describe('a window still waiting for its first activation', () => {
  beforeEach(() => {
    focusTabMock.mockClear();
    getTabInfoByIdMock.mockReturnValue({ id: 'tab-1', tabType: 'webView' });
    // The latch only ever goes one way in a real window, so each test has to start it over —
    // otherwise the first test to activate the window answers for every test after it.
    testingWindowService.resetActivationLatchForTesting();
  });

  afterEach(() => {
    globalThis.wasWindowCreatedWithoutActivation = false;
    testingWindowService.resetActivationLatchForTesting();
  });

  test('tells the dock to activate the tab without taking document focus', async () => {
    globalThis.wasWindowCreatedWithoutActivation = true;
    const engine = testingWindowService.implementWindowDataProviderEngine();

    await engine.setFocus({ focusType: 'tab', id: 'tab-1' });

    expect(focusTabMock).toHaveBeenCalledWith('tab-1', true);
  });

  test('stops withholding the moment the user does something in the window', async () => {
    // The transition itself, in one test: withheld before the gesture and ordinary after. Split
    // across two tests this passed for the wrong reason, because the latch is module state and the
    // first test had already tripped it.
    globalThis.wasWindowCreatedWithoutActivation = true;
    const engine = testingWindowService.implementWindowDataProviderEngine();

    await engine.setFocus({ focusType: 'tab', id: 'tab-1' });
    expect(focusTabMock).toHaveBeenLastCalledWith('tab-1', true);

    window.dispatchEvent(new Event('pointerdown'));

    await engine.setFocus({ focusType: 'tab', id: 'tab-1' });
    expect(focusTabMock).toHaveBeenLastCalledWith('tab-1', false);
  });

  test('lets the main process overrule the local latch for content it routes here', async () => {
    // This window's latch only sees gestures in the shell document — a pointer or key event inside
    // a docked web view's iframe never reaches it. So the latch can stay set long after the user
    // has been working in the window, and the main process, which watches the window's own focus
    // events, is the better-informed of the two. When it states an answer, that answer wins.
    globalThis.wasWindowCreatedWithoutActivation = true;
    const engine = testingWindowService.implementWindowDataProviderEngine();

    await engine.setFocus({ focusType: 'tab', id: 'tab-1' }, undefined, false);

    expect(focusTabMock).toHaveBeenLastCalledWith('tab-1', false);
  });

  test('keeps withholding when the window merely takes focus by itself', async () => {
    // The reason the latch is not driven by focus: a window held back from the foreground takes
    // focus on its own the moment its page first paints. Ending the withholding there would undo it
    // before the user had done anything at all, which is the defect this whole change exists for.
    globalThis.wasWindowCreatedWithoutActivation = true;
    const engine = testingWindowService.implementWindowDataProviderEngine();

    window.dispatchEvent(new Event('focus'));

    await engine.setFocus({ focusType: 'tab', id: 'tab-1' });
    expect(focusTabMock).toHaveBeenLastCalledWith('tab-1', true);
  });

  test('gives the waiting tab its focus when the user finally arrives', async () => {
    // The catch-up half of the withholding. Content docked while nobody was looking was made active
    // WITHOUT document focus; if nothing restores it, the user activates the window, sees the tab
    // rendered active, types, and nothing reaches the web view until they click inside it — which a
    // keyboard or screen-reader user does not do.
    //
    // The real dock records the waiting tab as it withholds focus, and this file mocks the dock, so
    // the record is made directly here. That the dock actually makes it is covered where the dock
    // is real, in `platform-dock-layout-storage.document-focus.test.ts`.
    globalThis.wasWindowCreatedWithoutActivation = true;
    const engine = testingWindowService.implementWindowDataProviderEngine();

    await engine.setFocus({ focusType: 'tab', id: 'tab-1' });
    expect(focusTabMock).toHaveBeenLastCalledWith('tab-1', true);
    focusTabMock.mockClear();
    noteTabAwaitingDocumentFocus('tab-1');

    window.dispatchEvent(new Event('pointerdown'));
    await vi.waitFor(() => expect(focusTabMock).toHaveBeenCalledWith('tab-1'));
  });

  test('has nothing to catch up when no tab was left waiting', async () => {
    // The positive control: the catch-up must fire because a tab was deferred, not on every gesture.
    globalThis.wasWindowCreatedWithoutActivation = false;
    testingWindowService.implementWindowDataProviderEngine();

    window.dispatchEvent(new Event('pointerdown'));
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    expect(focusTabMock).not.toHaveBeenCalled();
  });

  test('focuses normally in a window the user asked for', async () => {
    // Nothing in the URL bag means an ordinary window, which must be unaffected.
    globalThis.wasWindowCreatedWithoutActivation = false;
    const engine = testingWindowService.implementWindowDataProviderEngine();

    await engine.setFocus({ focusType: 'tab', id: 'tab-1' });

    expect(focusTabMock).toHaveBeenCalledWith('tab-1', false);
  });
});
