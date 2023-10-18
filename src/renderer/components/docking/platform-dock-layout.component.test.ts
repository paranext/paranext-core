/* eslint-disable import/first */
jest.mock('../../../shared/services/logger.service');
// Mock all of the papi-components because they should test themselves
jest.mock(
  'papi-components',
  () =>
    new Proxy(
      {},
      {
        get() {
          return function MockComponent() {};
        },
      },
    ),
);

import DockLayout, { FloatPosition } from 'rc-dock';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { FloatLayout, Layout, SavedTabInfo, WebViewProps } from '@shared/data/web-view.model';
import {
  addTabToDock,
  addWebViewToDock,
  getFloatPosition,
  loadTab,
} from './platform-dock-layout.component';

describe('Dock Layout Component', () => {
  const mockDockLayout = mock(DockLayout);

  describe('getFloatPosition()', () => {
    it('should cascade from top-left of layout', () => {
      const layout: FloatLayout = { type: 'float', floatSize: { width: 20, height: 10 } };
      const floatPosition: FloatPosition = { left: 0, top: 0, width: 0, height: 0 };

      let nextPosition = getFloatPosition(layout, floatPosition, { width: 100, height: 100 });

      expect(nextPosition).toEqual({
        left: 28,
        top: 28,
        width: 20,
        height: 10,
      });

      nextPosition = getFloatPosition(layout, nextPosition, { width: 100, height: 100 });

      expect(nextPosition).toEqual({
        left: 2 * 28,
        top: 2 * 28,
        width: 20,
        height: 10,
      });
    });

    it('should overflow right of layout', () => {
      const layout: FloatLayout = { type: 'float', floatSize: { width: 20, height: 10 } };
      const floatPosition: FloatPosition = { left: 2 * 28, top: 2 * 28, width: 0, height: 0 };
      // right = 2*28 + 20 + 28 = 104
      // bottom = 2*28 + 10 + 28 = 94

      expect(getFloatPosition(layout, floatPosition, { width: 100, height: 100 })).toEqual({
        left: 28,
        top: 3 * 28,
        width: 20,
        height: 10,
      });
    });

    it('should overflow bottom of layout', () => {
      const layout: FloatLayout = { type: 'float', floatSize: { width: 20, height: 10 } };
      const floatPosition: FloatPosition = { left: 2 * 28, top: 2 * 28, width: 0, height: 0 };
      // right = 2*28 + 20 + 28 = 104
      // bottom = 2*28 + 10 + 28 = 94

      expect(getFloatPosition(layout, floatPosition, { width: 120, height: 90 })).toEqual({
        left: 3 * 28,
        top: 28,
        width: 20,
        height: 10,
      });
    });
  });

  describe('loadTab()', () => {
    it('should throw when no id', () => {
      const savedTabInfoNoId = {} as SavedTabInfo;

      expect(() => loadTab(savedTabInfoNoId)).toThrow();
    });
  });

  describe('addTabToDock()', () => {
    it('should throw when tab is not an object', () => {
      const dockLayout = instance(mockDockLayout);
      const layout: Layout = { type: 'tab' };

      expect(() =>
        addTabToDock('this is wrong' as unknown as SavedTabInfo, layout, dockLayout),
      ).toThrow();
    });
    // TODO: verify it adds an error tab if no/bad tab type provided
  });

  describe('addWebViewToDock()', () => {
    it('should throw when no id', () => {
      const dockLayout = instance(mockDockLayout);
      const webView = {} as WebViewProps;
      const layout: Layout = { type: 'tab' };

      expect(() => addWebViewToDock(webView, layout, dockLayout)).toThrow();
    });

    it('should throw on unknown layout type', () => {
      // Ensure this is an add (rather than an update).
      when(mockDockLayout.find(anything())).thenReturn(undefined);
      const dockLayout = instance(mockDockLayout);
      const webView: WebViewProps = { id: 'myId', webViewType: 'test', content: '' };
      const layout = { type: 'wacked' } as unknown as FloatLayout;

      expect(() => addWebViewToDock(webView, layout, dockLayout)).toThrow();

      verify(mockDockLayout.find(anything())).once();
      verify(mockDockLayout.updateTab(anything(), anything())).never();
      verify(mockDockLayout.dockMove(anything(), anything(), anything())).never();
    });

    it('should throw on unknown target tab when adding panel', () => {
      // Ensure this is an add (rather than an update).
      when(mockDockLayout.find(anything())).thenReturn(undefined);
      const dockLayout = instance(mockDockLayout);
      const webView: WebViewProps = { id: 'myId', webViewType: 'test', content: '' };
      const layout: Layout = { type: 'panel', direction: 'top', targetTabId: 'unknownTabId' };

      expect(() => addWebViewToDock(webView, layout, dockLayout)).toThrow();

      verify(mockDockLayout.find(anything())).called();
      verify(mockDockLayout.updateTab(anything(), anything())).never();
      verify(mockDockLayout.dockMove(anything(), anything(), anything())).never();
    });
  });
});
