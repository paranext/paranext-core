import { useRef, useEffect, useCallback } from 'react';
import { LayoutBase } from 'rc-dock';
import {
  SavedTabInfo,
  Layout,
  OnLayoutChangeRCDock,
  WebViewTabProps,
  TabInfo,
  DirectionFromTab,
  PapiDockLayout,
} from '@shared/models/docking-framework.model';
import { WebViewDefinition, WebViewDefinitionUpdateInfo } from '@shared/models/web-view.model';
import { registerDockLayout } from '@renderer/services/web-view.service-host';
import { testLayout } from '@renderer/testing/test-layout.data';
import { logger } from '@shared/services/logger.service';

/**
 * Internal store for tabs managed by Simple Mode.
 *
 * Simple Mode does not use rc-dock, so we maintain our own map of tab info and webview definitions.
 * This satisfies the PapiDockLayout interface so the webview service continues to work.
 */
class SimpleModeTabStore {
  private tabs = new Map<string, TabInfo>();

  addOrUpdateTab(tabInfo: TabInfo): void {
    this.tabs.set(tabInfo.id, tabInfo);
  }

  removeTab(tabId: string): boolean {
    return this.tabs.delete(tabId);
  }

  getTab(tabId: string): TabInfo | undefined {
    return this.tabs.get(tabId);
  }

  findTab(idOrFilter: string | ((item: SavedTabInfo) => boolean)): TabInfo | undefined {
    if (typeof idOrFilter === 'string') {
      return this.tabs.get(idOrFilter);
    }
    for (const tab of this.tabs.values()) {
      if (idOrFilter(tab)) return tab;
    }
    return undefined;
  }

  getAllTabs(): TabInfo[] {
    return [...this.tabs.values()];
  }

  getWebViewDefinition(webViewId: string): WebViewDefinition | undefined {
    const tab = this.tabs.get(webViewId);
    if (!tab) return undefined;
    // The webview definition is stored as tab.data
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return tab.data as WebViewDefinition | undefined;
  }

  updateWebViewDefinition(webViewId: string, updateInfo: WebViewDefinitionUpdateInfo): boolean {
    const tab = this.tabs.get(webViewId);
    if (!tab) return false;
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const currentDef = tab.data as WebViewDefinition | undefined;
    if (!currentDef) return false;
    // Merge update info into the definition
    tab.data = { ...currentDef, ...updateInfo };
    this.tabs.set(webViewId, tab);
    return true;
  }
}

/**
 * An empty layout for Simple Mode. Simple Mode does not use rc-dock's LayoutBase, but the interface
 * requires one.
 */
const SIMPLE_MODE_EMPTY_LAYOUT: LayoutBase = {
  dockbox: { mode: 'horizontal', children: [] },
};

/**
 * Hook that creates a PapiDockLayout implementation for Simple Mode and registers it with the
 * web-view service on mount.
 *
 * Returns the tab store so the layout component can inspect registered webviews.
 */
export function useSimpleModeDockLayout(): SimpleModeTabStore {
  const storeRef = useRef(new SimpleModeTabStore());
  const onLayoutChangeRef = useRef<OnLayoutChangeRCDock | undefined>();

  useEffect(() => {
    const store = storeRef.current;

    const dockLayout: PapiDockLayout = {
      // No rc-dock in Simple Mode
      dockLayout: undefined,
      onLayoutChangeRef,

      addTabToDock: (
        savedTabInfo: SavedTabInfo,
        layout: Layout,
        _shouldBringToFront = true,
      ): Layout | undefined => {
        const existingTab = store.getTab(savedTabInfo.id);
        if (existingTab) {
          // Update existing tab
          store.addOrUpdateTab({ ...existingTab, ...savedTabInfo });
          return undefined;
        }
        // Create new tab info (minimal — real content comes from webview system)
        const newTab: TabInfo = {
          ...savedTabInfo,
          tabTitle: savedTabInfo.id,
          content: undefined,
        };
        store.addOrUpdateTab(newTab);
        return layout;
      },

      addWebViewToDock: (
        webView: WebViewTabProps,
        layout: Layout,
        _shouldBringToFront = true,
      ): Layout | undefined => {
        const existingTab = store.getTab(webView.id);
        if (existingTab) {
          // Update existing webview
          store.addOrUpdateTab({
            ...existingTab,
            data: webView,
            tabTitle: webView.title ?? webView.webViewType,
          });
          return undefined;
        }
        const newTab: TabInfo = {
          id: webView.id,
          tabType: 'webView',
          data: webView,
          tabTitle: webView.title ?? webView.webViewType,
          content: undefined,
        };
        store.addOrUpdateTab(newTab);
        return layout;
      },

      removeTabFromDock: (tabId: string): boolean => {
        return store.removeTab(tabId);
      },

      floatTabById: (_tabId: string): void => {
        // Simple Mode does not support floating tabs
        logger.debug('SimpleModeLayout: floatTabById is not supported in Simple Mode');
      },

      getWebViewDefinition: (webViewId: string): WebViewDefinition | undefined => {
        return store.getWebViewDefinition(webViewId);
      },

      updateTabPartial: (
        tabId: string,
        partialTabInfo: Partial<TabInfo>,
        _shouldBringToFront = false,
      ): TabInfo | undefined => {
        const tab = store.getTab(tabId);
        if (!tab) return undefined;
        const updated = { ...tab, ...partialTabInfo, id: tabId };
        store.addOrUpdateTab(updated);
        return updated;
      },

      updateWebViewDefinition: (
        webViewId: string,
        updateInfo: WebViewDefinitionUpdateInfo,
        _shouldBringToFront = false,
      ): boolean => {
        return store.updateWebViewDefinition(webViewId, updateInfo);
      },

      getTabInfoByDirectionFromTab: (
        sourceTabId: string,
        _direction: DirectionFromTab,
      ): TabInfo | undefined => {
        // Simple Mode has a flat list of tabs per panel — direction navigation is simplified
        const allTabs = store.getAllTabs();
        const sourceIndex = allTabs.findIndex((t) => t.id === sourceTabId);
        if (sourceIndex < 0) return undefined;
        // Just return the next tab, wrapping around
        const nextIndex = (sourceIndex + 1) % allTabs.length;
        return allTabs[nextIndex];
      },

      getTabInfoByElement: (tabElement: Element): TabInfo | undefined => {
        // Walk up the DOM to find the data-web-view-id attribute
        let el: Element | null = tabElement;
        while (el) {
          const webViewId = el.getAttribute('data-web-view-id');
          if (webViewId) return store.getTab(webViewId);
          el = el.parentElement;
        }
        return undefined;
      },

      getTabInfoById: (tabId: string): TabInfo | undefined => {
        return store.getTab(tabId);
      },

      focusTab: (tabId: string): boolean => {
        const tab = store.getTab(tabId);
        if (!tab) return false;
        // In Simple Mode, focusing means the UI should activate this tab in its panel.
        // The actual focus logic is handled by the React component state.
        // For now, just return true to indicate the tab exists.
        return true;
      },

      loadLayout: (_layout: LayoutBase): void => {
        // Simple Mode does not use rc-dock layouts
        logger.debug('SimpleModeLayout: loadLayout is a no-op in Simple Mode');
      },

      findTab: (idOrFilter: string | ((item: SavedTabInfo) => boolean)): TabInfo | undefined => {
        return store.findTab(idOrFilter);
      },

      testLayout,
    };

    const unsub = registerDockLayout(dockLayout);
    return () => {
      unsub();
    };
  }, []);

  return storeRef.current;
}
