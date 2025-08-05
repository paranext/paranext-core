import { useRef, useEffect } from 'react';
import DockLayout from 'rc-dock';
import { Filter } from 'rc-dock/lib/Algorithm';

import {
  WebViewDefinition,
  WebViewDefinitionUpdatableProperties,
} from '@shared/models/web-view.model';
import {
  SavedTabInfo,
  Layout,
  OnLayoutChangeRCDock,
  WebViewTabProps,
  TabInfo,
  DirectionFromTab,
} from '@shared/models/docking-framework.model';
import { DialogData } from '@shared/models/dialog-options.model';

import { testLayout } from '@renderer/testing/test-layout.data';
import { openWebView, registerDockLayout } from '@renderer/services/web-view.service-host';
import { hasDialogRequest, resolveDialogRequest } from '@renderer/services/dialog.service-host';
import { logger } from '@shared/services/logger.service';
import { TAB_TYPE_WEBVIEW } from '@renderer/components/web-view.component';

import { DockLayoutWrapper } from '@renderer/components/docking/dock-layout-wrapper.component';
import {
  addTabToDock,
  addWebViewToDock,
  floatTabById,
  getTabInfoByElement,
  getTabInfoById,
  getWebViewDefinition,
  loadTab,
  saveTab,
  focusTab,
  updateWebViewDefinition,
  updateTabPartial,
  getTabInfoByDirectionFromTab,
} from '@renderer/components/docking/platform-dock-layout-storage.util';
import {
  isTab,
  RCDockTabInfo,
} from '@renderer/components/docking/docking-framework-internal.model';

export function PlatformDockLayout() {
  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const dockLayoutRef = useRef<DockLayout>(undefined!);
  /**
   * Timeout for focusing another tab after closing the current one. Should be canceled if this
   * component is unmounted
   */
  const focusTabAfterCloseTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

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
      addTabToDock: (savedTabInfo: SavedTabInfo, layout: Layout, shouldBringToFront = true) =>
        addTabToDock(savedTabInfo, layout, shouldBringToFront, dockLayoutRef.current),
      addWebViewToDock: (webView: WebViewTabProps, layout: Layout, shouldBringToFront = true) =>
        addWebViewToDock(webView, layout, shouldBringToFront, dockLayoutRef.current),
      removeTabFromDock: (tabId: string) => {
        const tabToRemove = dockLayoutRef.current.find(tabId);
        // Null required by the external API
        // eslint-disable-next-line no-null/no-null
        if (isTab(tabToRemove)) dockLayoutRef.current.dockMove(tabToRemove, null, 'remove');
        // Return whether or not we found the tab to remove
        return !!tabToRemove;
      },
      floatTabById: (tabId: string) => floatTabById(tabId, dockLayoutRef.current),
      getWebViewDefinition: (webViewId: string) =>
        getWebViewDefinition(webViewId, dockLayoutRef.current),
      updateTabPartial: (
        tabId: string,
        partialTabInfo: Partial<TabInfo>,
        shouldBringToFront = false,
      ) => updateTabPartial(dockLayoutRef.current, tabId, partialTabInfo, shouldBringToFront),
      updateWebViewDefinition: (
        webViewId: string,
        updateInfo: Partial<WebViewDefinitionUpdatableProperties>,
        shouldBringToFront = false,
      ) =>
        updateWebViewDefinition(webViewId, updateInfo, shouldBringToFront, dockLayoutRef.current),
      getTabInfoByDirectionFromTab: (sourceTabId: string, direction: DirectionFromTab) =>
        getTabInfoByDirectionFromTab(dockLayoutRef.current, sourceTabId, direction),
      getTabInfoByElement: (tabElement: Element) =>
        getTabInfoByElement(dockLayoutRef.current, tabElement),
      getTabInfoById: (tabId: string) =>
        getTabInfoById(dockLayoutRef.current, tabId, 'external getTabInfoById'),
      focusTab: (tabId: string) => focusTab(dockLayoutRef.current, tabId),
      testLayout,
    });
    return () => {
      unsub();
      // This is not a component ref but just a timeout. We don't want to save the value from when
      // this hook first ran
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clearTimeout(focusTabAfterCloseTimeoutRef.current);
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
            // We know the tab in the dock layout is RCDockTabInfo because we set it to be that
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            const currentTab = currentDockItem as RCDockTabInfo;

            // Do things if the tab was closed
            if (direction === 'remove') {
              // If a dialog was closed, tell the dialog service
              // We're just checking to see if it is a dialog using a boolean. It will be `undefined`
              // if it is not a dialog, so this is fine
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              if ((currentTab.data as DialogData)?.isDialog && hasDialogRequest(currentTabId))
                resolveDialogRequest(currentTabId, undefined, false);

              // Focus the next tab over or just some other tab
              let tabToFocus = getTabInfoByDirectionFromTab(
                dockLayoutRef.current,
                currentTabId,
                // TODO: Replace this with 'nextTabOrGroup' and remove the next code block
                'nextTab',
              );

              if (!tabToFocus || tabToFocus.id === currentTabId) {
                // If no next tab, focus whatever tab we can find first
                // We know the tab in the dock layout is RCDockTabInfo because we set it to be that
                // eslint-disable-next-line no-type-assertion/no-type-assertion
                tabToFocus = dockLayoutRef.current.find(
                  (item) => isTab(item) && item.id !== currentTabId,
                ) as RCDockTabInfo | undefined;
              }

              if (tabToFocus?.id) {
                // set an immediate timeout to focus the tab because changing the dock layout doesn't
                // seem to work within this `onLayoutChange` callback
                focusTabAfterCloseTimeoutRef.current = setTimeout(() => {
                  // If we found a tab, focus it. Otherwise, a new tab will be automatically opened and focused below
                  focusTab(dockLayoutRef.current, tabToFocus.id);
                });
              }
            }

            // If there are no more docked tabs, add one
            if (direction === 'float' || direction === 'remove') {
              if (layout.dockbox.children.length === 1) {
                const hasNoTabs = !dockLayoutRef.current.find(
                  // Still have to check isTab because of a bug https://github.com/ticlo/rc-dock/pull/253
                  (item) => isTab(item) && item.id !== currentTabId,
                  // Search through the docked tabs. This is the API for rc-dock, so we must use it
                  // eslint-disable-next-line no-bitwise
                  Filter.Docked | Filter.Tab,
                );
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

export default PlatformDockLayout;
