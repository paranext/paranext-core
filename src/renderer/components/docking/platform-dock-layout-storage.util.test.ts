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

import DockLayout from 'rc-dock';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import {
  FloatLayout,
  Layout,
  SavedTabInfo,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';
import { addTabToDock, addWebViewToDock, loadTab } from './platform-dock-layout-storage.util';
/* eslint-enable */

describe('Dock Layout Component', () => {
  const mockDockLayout = mock(DockLayout);

  describe('loadTab()', () => {
    it('should throw when no id', () => {
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
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        addTabToDock('this is wrong' as unknown as SavedTabInfo, layout, dockLayout),
      ).toThrow();
    });
    // TODO: verify it adds an error tab if no/bad tab type provided
  });

  describe('addWebViewToDock()', () => {
    it('should throw when no id', () => {
      const dockLayout = instance(mockDockLayout);
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const webView = {} as WebViewTabProps;
      const layout: Layout = { type: 'tab' };

      expect(() => addWebViewToDock(webView, layout, dockLayout)).toThrow();
    });

    it('should throw on unknown layout type', () => {
      // Ensure this is an add (rather than an update).
      when(mockDockLayout.find(anything())).thenReturn(undefined);
      const dockLayout = instance(mockDockLayout);
      const webView: WebViewTabProps = { id: 'myId', webViewType: 'test', content: '' };
      // eslint-disable-next-line no-type-assertion/no-type-assertion
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
      const webView: WebViewTabProps = { id: 'myId', webViewType: 'test', content: '' };
      const layout: Layout = { type: 'panel', direction: 'top', targetTabId: 'unknownTabId' };

      expect(() => addWebViewToDock(webView, layout, dockLayout)).toThrow();

      verify(mockDockLayout.find(anything())).called();
      verify(mockDockLayout.updateTab(anything(), anything())).never();
      verify(mockDockLayout.dockMove(anything(), anything(), anything())).never();
    });
  });
});
