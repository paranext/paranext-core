import { vi } from 'vitest';
import DockLayout from 'rc-dock';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import {
  FloatLayout,
  Layout,
  SavedTabInfo,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';
import { addTabToDock, addWebViewToDock, loadTab } from './platform-dock-layout-storage.util';

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
});
