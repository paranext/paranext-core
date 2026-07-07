import { describe, expect, test, vi, beforeEach } from 'vitest';
import {
  getLastSelectedWebViewId,
  onDidChangeLastSelectedWebViewId,
  testingWindowService,
} from '@renderer/services/window.service-host';

type CloseWebViewCallback = (event: { webView: { id: string } }) => void;

// vi.mock and vi.hoisted calls are hoisted by vitest above the imports above at transform time, so
// the static imports can be written first here to satisfy import/first.
const { closeWebViewCallbacks, getTabInfoByIdMock } = vi.hoisted(() => {
  const callbacks: CloseWebViewCallback[] = [];
  // Shared (not per-`getDockLayout()`-call) mock so individual tests can control what tab info
  // comes back for a given tab id, e.g. to simulate a web view tab vs. a non-web-view tab.
  const tabInfoMock = vi.fn((): { id: string; tabType: string } | undefined => undefined);
  return { closeWebViewCallbacks: callbacks, getTabInfoByIdMock: tabInfoMock };
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
}));

vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { registerEngine: vi.fn(async (_name, engine) => engine) },
}));

function emitCloseWebView(id: string) {
  closeWebViewCallbacks.forEach((callback) => callback({ webView: { id } }));
}

describe('last selected web view tracking', () => {
  beforeEach(() => {
    // Reset tracker state between tests by "closing" whatever is tracked
    const tracked = getLastSelectedWebViewId();
    if (tracked) emitCloseWebView(tracked);
    getTabInfoByIdMock.mockReset();
    getTabInfoByIdMock.mockReturnValue(undefined);
  });

  test('remembers the most recently focused web view', async () => {
    const engine = testingWindowService.implementWindowDataProviderEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
    expect(getLastSelectedWebViewId()).toBe('web-view-1');

    await engine.setFocus({ focusType: 'webView', id: 'web-view-2' });
    expect(getLastSelectedWebViewId()).toBe('web-view-2');
  });

  test('retains the web view when focus moves to a tab or nothing', async () => {
    const engine = testingWindowService.implementWindowDataProviderEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
    await engine.setFocus(undefined);
    expect(getLastSelectedWebViewId()).toBe('web-view-1');
  });

  test('clears only when the tracked web view closes', async () => {
    const engine = testingWindowService.implementWindowDataProviderEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });

    emitCloseWebView('some-other-web-view');
    expect(getLastSelectedWebViewId()).toBe('web-view-1');

    emitCloseWebView('web-view-1');
    expect(getLastSelectedWebViewId()).toBeUndefined();
  });

  test('emits onDidChangeLastSelectedWebViewId on change', async () => {
    const received: (string | undefined)[] = [];
    const unsubscribe = onDidChangeLastSelectedWebViewId((id) => {
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

    expect(getLastSelectedWebViewId()).toBe('web-view-tab-1');
  });

  test('retains the tracked web view when a non-web-view tab is focused via setFocus tab path', async () => {
    // Note: `setFocus` with `focusType: 'webView'` never calls `getTabInfoById`, so no mock return
    // value is queued for it here.
    const engine = testingWindowService.implementWindowDataProviderEngine();
    await engine.setFocus({ focusType: 'webView', id: 'web-view-1' });
    expect(getLastSelectedWebViewId()).toBe('web-view-1');

    getTabInfoByIdMock.mockReturnValueOnce({ id: 'settings-tab-1', tabType: 'settings-tab' });
    await engine.setFocus({ focusType: 'tab', id: 'settings-tab-1' });

    expect(getLastSelectedWebViewId()).toBe('web-view-1');
  });
});
