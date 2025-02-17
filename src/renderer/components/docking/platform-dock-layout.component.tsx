import { useRef, useEffect } from 'react';
import DockLayout, { PanelBase } from 'rc-dock';

import {
  WebViewDefinition,
  WebViewDefinitionUpdatableProperties,
} from '@shared/models/web-view.model';
import {
  SavedTabInfo,
  Layout,
  OnLayoutChangeRCDock,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';
import { DialogData } from '@shared/models/dialog-options.model';

import testLayout from '@renderer/testing/test-layout.data';
import { openWebView, registerDockLayout } from '@renderer/services/web-view.service-host';
import { hasDialogRequest, resolveDialogRequest } from '@renderer/services/dialog.service-host';
import logger from '@shared/services/logger.service';
import { TAB_TYPE_WEBVIEW } from '@renderer/components/web-view.component';

import DockLayoutWrapper from '@renderer/components/docking/dock-layout-wrapper.component';
import {
  addTabToDock,
  addWebViewToDock,
  getWebViewDefinition,
  loadTab,
  saveTab,
  updateWebViewDefinition,
} from '@renderer/components/docking/platform-dock-layout-storage.util';
import {
  isTab,
  RCDockTabInfo,
} from '@renderer/components/docking/docking-framework-internal.model';

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
        const [layout, currentTabId, direction] = args;

        let webViewDefinition: WebViewDefinition | undefined;

        if (currentTabId) {
          const currentDockItem = dockLayoutRef.current.find(currentTabId);
          if (isTab(currentDockItem)) {
            // Assert the more specific type.
            /* eslint-disable no-type-assertion/no-type-assertion */
            const currentTab = currentDockItem as RCDockTabInfo;

            // If a dialog was closed, tell the dialog service
            if (direction === 'remove') {
              if ((currentTab.data as DialogData)?.isDialog && hasDialogRequest(currentTabId))
                resolveDialogRequest(currentTabId, undefined, false);

              if (layout.dockbox.children.length === 1) {
                const panel: PanelBase = layout.dockbox.children[0] as PanelBase;
                /* eslint-enable */
                const hasNoTabs = panel.tabs.length === 0;
                if (hasNoTabs) {
                  (async () => {
                    try {
                      await openWebView('platformGetResources.home', {
                        type: 'tab',
                      });
                    } catch (e) {
                      throw new Error(
                        `platform-dock-layout.component error: Opening Home web view failed!`,
                      );
                    }
                  })();
                }
              }
            }

            if (currentTab.tabType === TAB_TYPE_WEBVIEW)
              try {
                webViewDefinition = currentTabId
                  ? getWebViewDefinition(currentTabId, dockLayoutRef.current)
                  : undefined;
              } catch (e) {
                logger.error(
                  `dockLayout.onLayoutChange tried to get web view definition for ${currentTabId} but threw! ${e}`,
                );
              }
          }
        }

        (async () => {
          if (onLayoutChangeRef.current) {
            try {
              await onLayoutChangeRef.current(...args, webViewDefinition);
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
