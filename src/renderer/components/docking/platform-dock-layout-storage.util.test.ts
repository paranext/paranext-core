import { vi } from 'vitest';
import DockLayout, { LayoutBase } from 'rc-dock';
import { anything, capture, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import {
  FloatLayout,
  Layout,
  LayoutInfo,
  SavedTabInfo,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';
import { WebViewDefinition } from '@shared/models/web-view.model';
import {
  addTabToDock,
  addWebViewToDock,
  findFirstWebViewDefinitionByType,
  getAllWebViewDefinitions,
  loadLayout,
  loadTab,
} from './platform-dock-layout-storage.util';

vi.mock('../../../shared/services/logger.service');
vi.mock('@renderer/services/theme.service-host', () => ({
  __esModule: true,
  localThemeService: {},
}));

describe('Dock Layout Component', () => {
  const mockDockLayout = mock(DockLayout);

  describe('loadTab()', () => {
    it('should throw when no id', () => {
      // Intentionally constructing an invalid object to test the guard against missing `id`.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const savedTabInfoNoId = {} as SavedTabInfo;

      expect(() => loadTab(savedTabInfoNoId)).toThrow();
    });
  });

  describe('addTabToDock()', () => {
    it('should throw when tab is not an object', () => {
      const dockLayout = instance(mockDockLayout);
      const layout: Layout = { type: 'tab' };

      expect(() =>
        // Passing a non-object value to force the type guard to throw; `unknown` cast is required to simulate invalid input.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        addTabToDock('this is wrong' as unknown as SavedTabInfo, layout, false, dockLayout),
      ).toThrow();
    });
    // TODO: verify it adds an error tab if no/bad tab type provided
  });

  describe('getAllWebViewDefinitions()', () => {
    let localMockDockLayout: DockLayout;

    beforeEach(() => {
      localMockDockLayout = mock(DockLayout);
    });

    it('returns empty array when no tabs have WebView data', () => {
      when(localMockDockLayout.find(anything(), anything())).thenCall(
        (callback: (item: unknown) => boolean) => {
          callback({ id: 'panel1', title: 'Panel 1', tabType: 'settings' }); // non-WebView tab
          callback({
            id: 'settings',
            title: 'Settings',
            tabType: 'settings',
            data: { settingsType: 'general' },
          }); // non-WebView tab
          return undefined;
        },
      );
      expect(getAllWebViewDefinitions(instance(localMockDockLayout))).toEqual([]);
    });

    it('returns only WebView definitions, filtering out non-WebView tabs', () => {
      // Intentionally minimal object — only webViewType is checked by the filter
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const webViewDef = { id: 'wv1', webViewType: 'TestWebView' } as unknown as WebViewDefinition;
      when(localMockDockLayout.find(anything(), anything())).thenCall(
        (callback: (item: unknown) => boolean) => {
          callback({
            id: 'settings',
            title: 'Settings',
            tabType: 'settings',
            data: { settingsType: 'general' },
          });
          callback({ id: 'wv1', title: 'WebView 1', tabType: 'webView', data: webViewDef });
          return undefined;
        },
      );
      expect(getAllWebViewDefinitions(instance(localMockDockLayout))).toEqual([webViewDef]);
    });

    it('returns definitions for all WebView tabs including floated ones', () => {
      // Intentionally constructing partial test fixtures that only include fields relevant to this test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const docked = { id: 'docked', webViewType: 'Type1' } as unknown as WebViewDefinition;
      // Intentionally constructing partial test fixture that only includes fields relevant to this test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const floated = { id: 'floated', webViewType: 'Type2' } as unknown as WebViewDefinition;
      when(localMockDockLayout.find(anything(), anything())).thenCall(
        (callback: (item: unknown) => boolean) => {
          callback({ id: 'docked', title: 'Docked', tabType: 'webView', data: docked });
          callback({ id: 'floated', title: 'Floated', tabType: 'webView', data: floated });
          return undefined;
        },
      );
      expect(getAllWebViewDefinitions(instance(localMockDockLayout))).toEqual([docked, floated]);
    });
  });

  describe('findFirstWebViewDefinitionByType()', () => {
    let localMockDockLayout: DockLayout;

    beforeEach(() => {
      localMockDockLayout = mock(DockLayout);
    });

    /**
     * Simulates rc-dock's `find(callback, Filter.AnyTab)` behavior: iterate items, return the first
     * one for which `callback` returns true, otherwise undefined.
     */
    function whenFindReturnsFirstMatch(items: unknown[]) {
      when(localMockDockLayout.find(anything(), anything())).thenCall(
        (callback: (item: unknown) => boolean) => items.find((item) => callback(item)),
      );
    }

    it('returns undefined when no tabs match the requested webViewType', () => {
      // Intentionally minimal fixtures — only fields exercised by the filter.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const wvDef = { id: 'wv1', webViewType: 'OtherType' } as unknown as WebViewDefinition;
      whenFindReturnsFirstMatch([
        { id: 'wv1', title: 'WebView 1', tabType: 'webView', data: wvDef },
        { id: 'settings', title: 'Settings', tabType: 'settings', data: { kind: 'general' } },
      ]);

      expect(
        findFirstWebViewDefinitionByType(instance(localMockDockLayout), 'TargetType'),
      ).toBeUndefined();
    });

    it('returns the WebViewDefinition of the first matching tab', () => {
      // Intentionally constructing partial test fixture that only includes fields relevant to this test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const matching = {
        id: 'wv-match',
        webViewType: 'TargetType',
      } as unknown as WebViewDefinition;
      // Intentionally constructing partial test fixture that only includes fields relevant to this test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const otherTypeWebView = {
        id: 'wv-other',
        webViewType: 'OtherType',
      } as unknown as WebViewDefinition;
      whenFindReturnsFirstMatch([
        { id: 'wv-other', title: 'Other', tabType: 'webView', data: otherTypeWebView },
        { id: 'wv-match', title: 'Match', tabType: 'webView', data: matching },
      ]);

      expect(findFirstWebViewDefinitionByType(instance(localMockDockLayout), 'TargetType')).toBe(
        matching,
      );
    });

    it('skips non-webview tabs while searching', () => {
      // Intentionally constructing partial test fixture that only includes fields relevant to this test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const matching = {
        id: 'wv-match',
        webViewType: 'TargetType',
      } as unknown as WebViewDefinition;
      whenFindReturnsFirstMatch([
        // Settings tab — wrong tabType, must be skipped even though it has data
        { id: 'settings', title: 'Settings', tabType: 'settings', data: { kind: 'general' } },
        { id: 'wv-match', title: 'Match', tabType: 'webView', data: matching },
      ]);

      expect(findFirstWebViewDefinitionByType(instance(localMockDockLayout), 'TargetType')).toBe(
        matching,
      );
    });

    it('returns undefined when find returns undefined', () => {
      when(localMockDockLayout.find(anything(), anything())).thenReturn(undefined);

      expect(
        findFirstWebViewDefinitionByType(instance(localMockDockLayout), 'TargetType'),
      ).toBeUndefined();
    });
  });

  describe('loadLayout()', () => {
    it('forwards the saved layout to the underlying rc-dock loadLayout', () => {
      const localMock = mock(DockLayout);
      // LayoutInfo is opaque to consumers; from rc-dock's perspective it is a LayoutBase, which
      // is what gets persisted in the store. The exact shape is not part of this util's contract.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const layout = {
        dockbox: { mode: 'horizontal', children: [] },
      } as unknown as LayoutInfo;

      loadLayout(instance(localMock), layout);

      // The util internally casts `LayoutInfo` -> `LayoutBase` before forwarding to rc-dock.
      // Cast here as well so the matcher's parameter type matches `DockLayout.loadLayout`.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      verify(localMock.loadLayout(deepEqual(layout as unknown as LayoutBase))).once();
      const [forwarded] = capture(localMock.loadLayout).last();
      expect(forwarded).toEqual(layout);
    });

    it('passes the layout through unchanged (does not mutate the opaque layout)', () => {
      const localMock = mock(DockLayout);
      // LayoutInfo is opaque to consumers; constructing a minimal stand-in shape here is sufficient
      // because this test only verifies referential identity, not the content of the layout.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const layout = {
        floatbox: { mode: 'float', children: [] },
        maxbox: { mode: 'maximize', children: [] },
      } as unknown as LayoutInfo;

      loadLayout(instance(localMock), layout);

      const [forwarded] = capture(localMock.loadLayout).last();
      expect(forwarded).toBe(layout);
    });
  });

  describe('addWebViewToDock()', () => {
    it('should throw when no id', () => {
      const dockLayout = instance(mockDockLayout);
      // Intentionally constructing an invalid object to test the guard against missing `id`.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const webView = {} as WebViewTabProps;
      const layout: Layout = { type: 'tab' };

      expect(() => addWebViewToDock(webView, layout, false, dockLayout)).toThrow();
    });

    it('should throw on unknown layout type', () => {
      // Ensure this is an add (rather than an update).
      when(mockDockLayout.find(anything())).thenReturn(undefined);
      const dockLayout = instance(mockDockLayout);
      const webView: WebViewTabProps = { id: 'myId', webViewType: 'test', content: '' };
      // Passing an unrecognized layout type to verify the function throws on unknown layouts.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const layout = { type: 'wacked' } as unknown as FloatLayout;

      expect(() => addWebViewToDock(webView, layout, false, dockLayout)).toThrow();

      verify(mockDockLayout.find(anything())).once();
      verify(mockDockLayout.updateTab(anything(), anything())).never();
      verify(mockDockLayout.dockMove(anything(), anything(), anything())).never();
    });

    it('should throw on unknown target tab when adding panel', () => {
      // Ensure this is an add (rather than an update).
      when(mockDockLayout.find(anything())).thenReturn(undefined);
      const dockLayout = instance(mockDockLayout);
      const webView: WebViewTabProps = { id: 'myId', webViewType: 'test', content: '' };
      const layout: Layout = { type: 'panel', direction: 'top', targetTabId: 'unknownTabId' };

      expect(() => addWebViewToDock(webView, layout, false, dockLayout)).toThrow();

      verify(mockDockLayout.find(anything())).called();
      verify(mockDockLayout.updateTab(anything(), anything())).never();
      verify(mockDockLayout.dockMove(anything(), anything(), anything())).never();
    });
  });
});
