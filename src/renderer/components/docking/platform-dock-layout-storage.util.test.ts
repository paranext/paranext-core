import { vi } from 'vitest';
import DockLayout, { BoxData, LayoutData, PanelData, TabData } from 'rc-dock';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import {
  FloatLayout,
  Layout,
  SavedTabInfo,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';
import { WebViewDefinition } from '@shared/models/web-view.model';
import { TAB_TYPE_WEBVIEW } from '@renderer/components/web-view.component';
import {
  addTabToDock,
  addWebViewToDock,
  getAllWebViewDefinitions,
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

  describe('getAllWebViewDefinitions()', () => {
    /**
     * Build a WebView TabData. rc-dock's TabData type doesn't declare `tabType`/`data` (those are
     * Platform additions on RCDockTabInfo), but Platform always stores them on the underlying tab.
     * Cast through unknown to keep the test data shaped exactly like real layouts.
     */
    function makeWebViewTab(id: string): TabData {
      const platformShape = {
        id,
        title: id,
        content: '',
        tabType: TAB_TYPE_WEBVIEW,
        // The data field carries the WebViewDefinition. We only assert by id in tests.
        data: { id, webViewType: 'test', content: '' } satisfies WebViewDefinition,
      };
      // Cast through unknown — TabData lacks Platform's tabType/data fields, but real layouts always carry them.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return platformShape as unknown as TabData;
    }

    function makeNonWebViewTab(id: string): TabData {
      const platformShape = {
        id,
        title: id,
        content: '',
        tabType: 'someOtherTabType',
        data: { foo: 'bar' },
      };
      // Cast through unknown — TabData lacks Platform's tabType/data fields, but real layouts always carry them.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return platformShape as unknown as TabData;
    }

    function makePanel(id: string, tabs: TabData[]): PanelData {
      // PanelData has many optional fields we don't need for these tests.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return { id, tabs } as PanelData;
    }

    function makeBox(children: (BoxData | PanelData)[]): BoxData {
      // BoxData has many optional fields we don't need for these tests.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return { mode: 'horizontal', children } as BoxData;
    }

    function makeLayout(overrides: Partial<LayoutData>): LayoutData {
      return {
        dockbox: overrides.dockbox ?? makeBox([makePanel('empty', [])]),
        floatbox: overrides.floatbox,
        maxbox: overrides.maxbox,
        windowbox: overrides.windowbox,
      };
    }

    it('returns [] when the layout has no tabs', () => {
      const localMock = mock(DockLayout);
      when(localMock.getLayout()).thenReturn(
        makeLayout({ dockbox: makeBox([makePanel('p', [])]) }),
      );
      const result = getAllWebViewDefinitions(instance(localMock));
      expect(result).toEqual([]);
    });

    it('returns one definition when there is a single panel with a single webview tab', () => {
      const localMock = mock(DockLayout);
      when(localMock.getLayout()).thenReturn(
        makeLayout({ dockbox: makeBox([makePanel('p', [makeWebViewTab('wv-1')])]) }),
      );
      const result = getAllWebViewDefinitions(instance(localMock));
      expect(result.map((wv) => wv.id)).toEqual(['wv-1']);
    });

    it('returns multiple definitions across one panel', () => {
      const localMock = mock(DockLayout);
      when(localMock.getLayout()).thenReturn(
        makeLayout({
          dockbox: makeBox([
            makePanel('p', [
              makeWebViewTab('wv-1'),
              makeWebViewTab('wv-2'),
              makeWebViewTab('wv-3'),
            ]),
          ]),
        }),
      );
      const result = getAllWebViewDefinitions(instance(localMock));
      expect(result.map((wv) => wv.id)).toEqual(['wv-1', 'wv-2', 'wv-3']);
    });

    it('walks nested boxes', () => {
      const localMock = mock(DockLayout);
      const innerBox = makeBox([
        makePanel('p1', [makeWebViewTab('wv-deep-1')]),
        makePanel('p2', [makeWebViewTab('wv-deep-2')]),
      ]);
      const outerBox = makeBox([makePanel('top', [makeWebViewTab('wv-top')]), innerBox]);
      when(localMock.getLayout()).thenReturn(makeLayout({ dockbox: outerBox }));
      const result = getAllWebViewDefinitions(instance(localMock));
      expect(result.map((wv) => wv.id).sort()).toEqual(['wv-deep-1', 'wv-deep-2', 'wv-top']);
    });

    it('skips non-webview tabs', () => {
      const localMock = mock(DockLayout);
      when(localMock.getLayout()).thenReturn(
        makeLayout({
          dockbox: makeBox([
            makePanel('p', [
              makeWebViewTab('wv-1'),
              makeNonWebViewTab('settings-1'),
              makeWebViewTab('wv-2'),
              makeNonWebViewTab('error-1'),
            ]),
          ]),
        }),
      );
      const result = getAllWebViewDefinitions(instance(localMock));
      expect(result.map((wv) => wv.id)).toEqual(['wv-1', 'wv-2']);
    });

    it('walks floatbox, maxbox, and windowbox in addition to dockbox', () => {
      const localMock = mock(DockLayout);
      when(localMock.getLayout()).thenReturn(
        makeLayout({
          dockbox: makeBox([makePanel('dock', [makeWebViewTab('wv-dock')])]),
          floatbox: makeBox([makePanel('float', [makeWebViewTab('wv-float')])]),
          maxbox: makeBox([makePanel('max', [makeWebViewTab('wv-max')])]),
          windowbox: makeBox([makePanel('window', [makeWebViewTab('wv-window')])]),
        }),
      );
      const result = getAllWebViewDefinitions(instance(localMock));
      expect(result.map((wv) => wv.id).sort()).toEqual([
        'wv-dock',
        'wv-float',
        'wv-max',
        'wv-window',
      ]);
    });
  });
});
