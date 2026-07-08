import { describe, expect, test, vi, beforeEach } from 'vitest';
import {
  getLastFocusedTabId,
  getLastSelectedScriptureNavigableWebViewId,
  onDidChangeLastFocusedTabId,
  onDidChangeLastSelectedScriptureNavigableWebViewId,
  testingWindowService,
} from '@renderer/services/window.service-host';

type CloseWebViewCallback = (event: { webView: { id: string } }) => void;

// vi.mock and vi.hoisted calls are hoisted by vitest above the imports above at transform time, so
// the static imports can be written first here to satisfy import/first.
const { closeWebViewCallbacks, getTabInfoByIdMock, getSavedWebViewDefinitionSyncMock } = vi.hoisted(
  () => {
    const callbacks: CloseWebViewCallback[] = [];
    // Shared (not per-`getDockLayout()`-call) mock so individual tests can control what tab info
    // comes back for a given tab id, e.g. to simulate a web view tab vs. a non-web-view tab.
    const tabInfoMock = vi.fn((): { id: string; tabType: string } | undefined => undefined);
    // Defaults every web view to an eligible (project-bearing) definition so existing tests that
    // don't care about the eligibility gate keep passing; tests for the gate itself override this.
    // Typed loosely (both fields optional, possibly `undefined` altogether) so individual tests
    // can return definition-less / ineligible / missing definitions.
    const definitionMock = vi.fn(
      (
        id: string,
      ): { id: string; projectId?: string; shouldShowToolbar?: boolean } | undefined => ({
        id,
        projectId: 'project-1',
      }),
    );
    return {
      closeWebViewCallbacks: callbacks,
      getTabInfoByIdMock: tabInfoMock,
      getSavedWebViewDefinitionSyncMock: definitionMock,
    };
  },
);

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
  getSavedWebViewDefinitionSync: getSavedWebViewDefinitionSyncMock,
}));

vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { registerEngine: vi.fn(async (_name, engine) => engine) },
}));

function emitCloseWebView(id: string) {
  closeWebViewCallbacks.forEach((callback) => callback({ webView: { id } }));
}

describe('last selected scripture-navigable web view tracking', () => {
  beforeEach(() => {
    // Reset tracker state between tests by "closing" whatever is tracked
    const tracked = getLastSelectedScriptureNavigableWebViewId();
    if (tracked) emitCloseWebView(tracked);
    getTabInfoByIdMock.mockReset();
    getTabInfoByIdMock.mockReturnValue(undefined);
    getSavedWebViewDefinitionSyncMock.mockReset();
    getSavedWebViewDefinitionSyncMock.mockImplementation((id: string) => ({
      id,
      projectId: 'project-1',
    }));
  });

  test('remembers the most recently focused web view', async () => {
    const engine = testingWindowService.implementWindowDataProviderEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');

    await engine.setFocus({ focusType: 'webView', id: 'web-view-2' });
    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-2');
  });

  test('retains the web view when focus moves to a tab or nothing', async () => {
    const engine = testingWindowService.implementWindowDataProviderEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
    await engine.setFocus(undefined);
    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
  });

  test('clears only when the tracked web view closes', async () => {
    const engine = testingWindowService.implementWindowDataProviderEngine();
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
    const engine = testingWindowService.implementWindowDataProviderEngine();
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

    const engine = testingWindowService.implementWindowDataProviderEngine();
    await engine.setFocus({ focusType: 'tab', id: 'web-view-tab-1' });

    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-tab-1');
  });

  test('retains the tracked web view when a non-web-view tab is focused via setFocus tab path', async () => {
    // Note: `setFocus` with `focusType: 'webView'` never calls `getTabInfoById`, so no mock return
    // value is queued for it here.
    const engine = testingWindowService.implementWindowDataProviderEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');

    getTabInfoByIdMock.mockReturnValueOnce({ id: 'settings-tab-1', tabType: 'settings-tab' });
    await engine.setFocus({ focusType: 'tab', id: 'settings-tab-1' });

    expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
  });

  describe('scripture-navigable eligibility gate', () => {
    test('tracks a web view whose definition has only projectId', async () => {
      getSavedWebViewDefinitionSyncMock.mockReturnValue({ id: 'web-view-1', projectId: 'proj-1' });

      const engine = testingWindowService.implementWindowDataProviderEngine();
      await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });

      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
    });

    test('tracks a web view whose definition has only shouldShowToolbar', async () => {
      getSavedWebViewDefinitionSyncMock.mockReturnValue({
        id: 'web-view-1',
        shouldShowToolbar: true,
      });

      const engine = testingWindowService.implementWindowDataProviderEngine();
      await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });

      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
    });

    test('retains the previous tracked web view when focusing a web view with no projectId or shouldShowToolbar', async () => {
      const engine = testingWindowService.implementWindowDataProviderEngine();
      // First track an eligible web view (default mock: has projectId)
      await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');

      // Now focus an ineligible web view (definition has neither projectId nor shouldShowToolbar)
      getSavedWebViewDefinitionSyncMock.mockReturnValue({ id: 'web-view-2' });
      await engine.setFocus({ focusType: 'webView', id: 'web-view-2' });

      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
    });

    test('retains the previous tracked web view when the definition cannot be found (undefined)', async () => {
      const engine = testingWindowService.implementWindowDataProviderEngine();
      await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');

      getSavedWebViewDefinitionSyncMock.mockReturnValue(undefined);
      await engine.setFocus({ focusType: 'webView', id: 'web-view-2' });

      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
    });

    test('retains the previous tracked web view when reading the definition throws', async () => {
      const engine = testingWindowService.implementWindowDataProviderEngine();
      await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');

      getSavedWebViewDefinitionSyncMock.mockImplementation(() => {
        throw new Error('dock layout not registered');
      });
      await engine.setFocus({ focusType: 'webView', id: 'web-view-2' });

      expect(getLastSelectedScriptureNavigableWebViewId()).toBe('web-view-1');
    });

    test('retains the previous tracked web view when an ineligible web view tab is focused via setFocus tab path', async () => {
      const engine = testingWindowService.implementWindowDataProviderEngine();
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
  });

  test('remembers the most recently focused web view even when it is not scripture-navigable', async () => {
    const engine = testingWindowService.implementWindowDataProviderEngine();
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
    const engine = testingWindowService.implementWindowDataProviderEngine();
    getTabInfoByIdMock.mockReturnValueOnce({ id: 'settings-tab-focus', tabType: 'settings-tab' });
    await engine.setFocus({ focusType: 'tab', id: 'settings-tab-focus' });

    expect(getLastFocusedTabId()).toBe('settings-tab-focus');
  });

  test('retains the last focused tab when focus moves outside all tabs', async () => {
    const engine = testingWindowService.implementWindowDataProviderEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-focus-3' });
    await engine.setFocus(undefined);

    expect(getLastFocusedTabId()).toBe('web-view-focus-3');
  });

  test('emits onDidChangeLastFocusedTabId on change', async () => {
    const received: (string | undefined)[] = [];
    const unsubscribe = onDidChangeLastFocusedTabId((id) => {
      received.push(id);
    });
    const engine = testingWindowService.implementWindowDataProviderEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-focus-4' });
    await engine.setFocus({ focusType: 'webView', id: 'web-view-focus-4' });
    expect(received).toEqual(['web-view-focus-4']);
    unsubscribe();
  });
});
