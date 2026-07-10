import { afterEach, describe, expect, test, vi, beforeEach } from 'vitest';
import {
  getLastFocusedTabId,
  getLastSelectedScriptureNavigableWebViewId,
  getNavigationTargetWebView,
  onDidChangeLastFocusedTabId,
  onDidChangeLastSelectedScriptureNavigableWebViewId,
  onDidChangeNavigationTargetWebView,
  testingWindowService,
} from '@renderer/services/window.service-host';
import { ResolvedWebView } from '@renderer/services/navigation-target.util';

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
  getSavedWebViewDefinitionSyncMock,
  getAllOpenWebViewDefinitionsSyncMock,
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
  return {
    closeWebViewCallbacks: callbacks,
    openWebViewCallbacks: openCallbacks,
    updateWebViewCallbacks: updateCallbacks,
    getTabInfoByIdMock: tabInfoMock,
    getSavedWebViewDefinitionSyncMock: definitionMock,
    getAllOpenWebViewDefinitionsSyncMock: allOpenDefinitionsMock,
  };
});

vi.mock('@renderer/services/web-view.service-host', () => ({
  getDockLayout: vi.fn(async () => ({
    focusTab: vi.fn(),
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

vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { registerEngine: vi.fn(async (_name, engine) => engine) },
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
