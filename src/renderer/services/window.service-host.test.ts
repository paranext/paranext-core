import { describe, expect, test, vi, beforeEach } from 'vitest';
import {
  getLastSelectedWebViewId,
  onDidChangeLastSelectedWebViewId,
  testingWindowService,
} from '@renderer/services/window.service-host';

type CloseWebViewCallback = (event: { webView: { id: string } }) => void;

// vi.mock and vi.hoisted calls are hoisted by vitest above the imports above at transform time, so
// the static imports can be written first here to satisfy import/first.
const { closeWebViewCallbacks } = vi.hoisted(() => {
  const callbacks: CloseWebViewCallback[] = [];
  return { closeWebViewCallbacks: callbacks };
});

vi.mock('@renderer/services/web-view.service-host', () => ({
  getDockLayout: vi.fn(async () => ({
    focusTab: vi.fn(),
    getTabInfoByElement: vi.fn(() => undefined),
    getTabInfoById: vi.fn(() => undefined),
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
});
