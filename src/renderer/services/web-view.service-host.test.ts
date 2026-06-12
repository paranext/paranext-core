// CAP-017 (keyboard-switching) RED-phase tests — host behavior for the cross-cutting platform
// additions (a) `closeWebView` and (c) `keyboardPreference` round-trip.
//
// Traceability: strategic-plan-backend.md ### CAP-017; data-contracts.md §9 "Code Placement →
// Existing PT10 code to extend"; capability-list.md CAP-017 row. Edge cases (CAP-017):
// `closeWebView` returns `false` when the webview is not found (vs throw); `keyboardPreference`
// round-trips on save (NOT in `SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS`).
//
// `WebViewServiceType` is hosted here (`papiWebViewService` network object registered in
// `startWebViewService`), NOT in a main-process service — the existing `closeTab` →
// `removeTabFromDock` logic is the close path to extend. The shared `web-view.service.ts`
// network proxy forwards new async members without changes.
//
// Behavior is exercised against a fully-typed fake PapiDockLayout registered through the
// exported `registerDockLayout` (the dock layout is the renderer-UI boundary), per the
// app.component.test.tsx network-mock precedent.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import type { PapiDockLayout } from '@shared/models/docking-framework.model';
import type { WebViewDefinition } from '@shared/models/web-view.model';
import type { Unsubscriber } from 'platform-bible-utils';
// vi.mock factories below are hoisted above this import, so the mock applies to its import graph
import {
  closeWebView,
  convertWebViewDefinitionToSaved,
  mergeUpdatablePropertiesIntoWebViewDefinitionIfChangesArePresent,
  registerDockLayout,
} from '@renderer/services/web-view.service-host';

// Runs before the static imports execute: the web-view.service-host import graph pulls in
// theme.service-host, which calls `window.matchMedia` at module scope, and jsdom does not
// implement matchMedia
vi.hoisted(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: undefined,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

globalThis.processType = ProcessType.Renderer;
globalThis.isPackaged = false;
globalThis.resourcesPath = 'resources://';

// web-view.service-host creates network event emitters at module scope. Mock the network layer
// locally, per the established app.component.test.tsx precedent. vi.mock factories are hoisted,
// so use dynamic import.
vi.mock('@shared/services/network.service', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@shared/services/network.service')>();
  const { PlatformEventEmitter } = await import('platform-bible-utils');
  return {
    ...actual,
    createRequestFunction:
      (requestType: string) =>
      async (...args: unknown[]) =>
        `Mocked ${requestType} request with args ${args.join(', ')}`,
    createNetworkEventEmitter: () => new PlatformEventEmitter(),
    getNetworkEvent: () => new PlatformEventEmitter().event,
    papiNetworkService: {
      createNetworkEventEmitter: () => new PlatformEventEmitter(),
      onDidClientConnect: new PlatformEventEmitter().event,
    },
  };
});

function createWebViewDefinition(id: string): WebViewDefinition {
  return {
    webViewType: `test.${id}`,
    id,
    content: '<div>test web view</div>',
    keyboardPreference: 'vernacular',
  };
}

/**
 * Fully-typed in-memory fake of the dock layout boundary. Holds open WebViews in a Map so any
 * reasonable `closeWebView` implementation (definition lookup, tab-info lookup, removal) sees a
 * coherent picture: known ids exist and are removable exactly once; unknown ids are not found.
 */
function createFakeDockLayout(initialWebViews: WebViewDefinition[]): PapiDockLayout {
  const webViewsById = new Map(initialWebViews.map((webView) => [webView.id, webView]));
  return {
    onLayoutChangeRef: { current: undefined },
    loadLayout: () => {},
    findFirstWebViewDefinitionByType: (webViewType) =>
      [...webViewsById.values()].find((webView) => webView.webViewType === webViewType),
    addTabToDock: () => undefined,
    addWebViewToDock: () => undefined,
    removeTabFromDock: (tabId) => webViewsById.delete(tabId),
    floatTabById: () => {},
    getAllWebViewDefinitions: () => [...webViewsById.values()],
    getWebViewDefinition: (webViewId) => webViewsById.get(webViewId),
    updateTabPartial: () => undefined,
    updateWebViewDefinition: () => false,
    getTabInfoByDirectionFromTab: () => undefined,
    getTabInfoByElement: () => undefined,
    getTabInfoById: (tabId) =>
      webViewsById.has(tabId)
        ? { id: tabId, tabType: 'webView', tabTitle: tabId, content: undefined }
        : undefined,
    focusTab: (tabId) => webViewsById.has(tabId),
    testLayout: {},
    simpleLayout: {},
  };
}

describe('web-view.service-host closeWebView (CAP-017a)', () => {
  const OPEN_WEB_VIEW_ID = 'open-web-view-id';
  let unregisterDockLayout: Unsubscriber;

  beforeEach(() => {
    unregisterDockLayout = registerDockLayout(
      createFakeDockLayout([createWebViewDefinition(OPEN_WEB_VIEW_ID)]),
    );
  });

  afterEach(() => {
    unregisterDockLayout();
  });

  it('resolves true when the webview is open and gets closed', async () => {
    await expect(closeWebView(OPEN_WEB_VIEW_ID)).resolves.toBe(true);
  });

  it('actually removes the webview — closing the same id a second time resolves false', async () => {
    await closeWebView(OPEN_WEB_VIEW_ID);

    await expect(closeWebView(OPEN_WEB_VIEW_ID)).resolves.toBe(false);
  });

  it('resolves false when no webview with the id exists (CAP-017 edge case: false, NOT a throw)', async () => {
    await expect(closeWebView('nonexistent-web-view-id')).resolves.toBe(false);
  });

  it('does not disturb other open webviews when closing one', async () => {
    await closeWebView('nonexistent-web-view-id');

    await expect(closeWebView(OPEN_WEB_VIEW_ID)).resolves.toBe(true);
  });
});

describe('web-view.service-host keyboardPreference saved-definition round-trip (CAP-017c)', () => {
  it('convertWebViewDefinitionToSaved RETAINS keyboardPreference (NOT in SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS — survives layout save/load)', () => {
    const webViewDefinition = createWebViewDefinition('round-trip-id');

    const savedWebViewDefinition = convertWebViewDefinitionToSaved(webViewDefinition);

    expect(savedWebViewDefinition.keyboardPreference).toBe('vernacular');
  });

  it('convertWebViewDefinitionToSaved still strips the omitted keys while keeping keyboardPreference (guard against over-saving)', () => {
    const webViewDefinition = createWebViewDefinition('round-trip-id');

    const savedWebViewDefinition = convertWebViewDefinitionToSaved(webViewDefinition);

    expect(savedWebViewDefinition).not.toHaveProperty('content');
    expect(savedWebViewDefinition.keyboardPreference).toBe('vernacular');
  });
});

describe('web-view.service-host keyboardPreference updatable-property merge (CAP-017c)', () => {
  it('merges a keyboardPreference change into an open webview definition (keyboardPreference IS updatable)', () => {
    const webViewDefinition = createWebViewDefinition('updatable-id');

    const updatedWebViewDefinition =
      mergeUpdatablePropertiesIntoWebViewDefinitionIfChangesArePresent(webViewDefinition, {
        keyboardPreference: 'comments',
      });

    expect(updatedWebViewDefinition?.keyboardPreference).toBe('comments');
  });

  it('returns undefined when keyboardPreference is unchanged (existing no-op merge semantics apply to the new key)', () => {
    const webViewDefinition = createWebViewDefinition('updatable-id');

    const updatedWebViewDefinition =
      mergeUpdatablePropertiesIntoWebViewDefinitionIfChangesArePresent(webViewDefinition, {
        keyboardPreference: 'vernacular',
      });

    expect(updatedWebViewDefinition).toBeUndefined();
  });

  it('supports explicitly clearing keyboardPreference with undefined (webview opts back out of focus-driven switching)', () => {
    const webViewDefinition = createWebViewDefinition('updatable-id');

    const updatedWebViewDefinition =
      mergeUpdatablePropertiesIntoWebViewDefinitionIfChangesArePresent(webViewDefinition, {
        keyboardPreference: undefined,
      });

    expect(updatedWebViewDefinition).toBeDefined();
    expect(updatedWebViewDefinition?.keyboardPreference).toBeUndefined();
  });
});
