import { useRef, useEffect } from 'react';
import DockLayout from 'rc-dock';

import { WebViewDefinitionUpdatableProperties } from '@shared/models/web-view.model';
import {
  SavedTabInfo,
  Layout,
  OnLayoutChangeRCDock,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';
import { DialogData } from '@shared/models/dialog-options.model';

import testLayout from '@renderer/testing/test-layout.data';
import { registerDockLayout } from '@renderer/services/web-view.service-host';
import { hasDialogRequest, resolveDialogRequest } from '@renderer/services/dialog.service-host';

import DockLayoutWrapper from './dock-layout-wrapper.component';
import {
  addTabToDock,
  addWebViewToDock,
  getWebViewDefinition,
  loadTab,
  saveTab,
  updateWebViewDefinition,
} from './platform-dock-layout-storage.util';
import { isTab, RCDockTabInfo } from './docking-framework-internal.model';

export default function PlatformDockLayout() {
  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const dockLayoutRef = useRef<DockLayout>(undefined!);

  /**
   * OnLayoutChange function from `web-view.service.ts` once this docklayout is registered.
   *
   * TODO: Strange pattern that we are setting a ref to a service function. Investigate changing
   * this pattern in some way. Maybe just export `onLayoutChange`?
   */
  const onLayoutChangeRef = useRef<OnLayoutChangeRCDock | undefined>();

  useEffect(() => {
    // Register with `web-view.service.ts` so it can perform operations on us
    const unsub = registerDockLayout({
      dockLayout: dockLayoutRef.current,
      onLayoutChangeRef,
      addTabToDock: (savedTabInfo: SavedTabInfo, layout: Layout) =>
        addTabToDock(savedTabInfo, layout, dockLayoutRef.current),
      addWebViewToDock: (webView: WebViewTabProps, layout: Layout) =>
        addWebViewToDock(webView, layout, dockLayoutRef.current),
      removeTabFromDock: (tabId: string) => {
        const tabToRemove = dockLayoutRef.current.find(tabId);
        // Null required by the external API
        // eslint-disable-next-line no-null/no-null
        if (isTab(tabToRemove)) dockLayoutRef.current.dockMove(tabToRemove, null, 'remove');
        // Return whether or not we found the tab to remove
        return !!tabToRemove;
      },
      getWebViewDefinition: (webViewId: string) =>
        getWebViewDefinition(webViewId, dockLayoutRef.current),
      updateWebViewDefinition: (
        webViewId: string,
        updateInfo: Partial<WebViewDefinitionUpdatableProperties>,
      ) => updateWebViewDefinition(webViewId, updateInfo, dockLayoutRef.current),
      testLayout,
    });
    return () => {
      unsub();
    };
    // Is there any situation where dockLayoutRef will change? We need to add to dependencies if so
  }, []);

  return (
    <DockLayoutWrapper
      ref={dockLayoutRef}
      loadTab={loadTab}
      saveTab={saveTab}
      onLayoutChange={(...args) => {
        const [, currentTabId, direction] = args;
        // If a dialog was closed, tell the dialog service
        if (currentTabId && direction === 'remove') {
          // Assert the more specific type.
          /* eslint-disable no-type-assertion/no-type-assertion */
          const removedTab = dockLayoutRef.current.find(currentTabId) as RCDockTabInfo;
          if ((removedTab.data as DialogData)?.isDialog && hasDialogRequest(currentTabId))
            /* eslint-enable */
            resolveDialogRequest(currentTabId, undefined, false);
        }

        (async () => {
          if (onLayoutChangeRef.current) {
            try {
              await onLayoutChangeRef.current(...args);
            } catch (e) {
              throw new Error(
                `platform-dock-layout.component error: Failed to run onLayoutChangeRef.current! currentTabId: ${currentTabId}, direction: ${direction}`,
              );
            }
          }
        })();
      }}
    />
  );
}
