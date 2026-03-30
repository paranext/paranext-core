import { useRef, useEffect, useState, useCallback } from 'react';
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
import { registerDockLayout, openWebView } from '@renderer/services/web-view.service-host';
import { testLayout } from '@renderer/testing/test-layout.data';
import { logger } from '@shared/services/logger.service';
import { SIMPLE_MODE_TABS } from './simple-mode-tab-config';

/** Internal store for tabs managed by Simple Mode. */
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
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return tab.data as WebViewDefinition | undefined;
  }

  updateWebViewDefinition(webViewId: string, updateInfo: WebViewDefinitionUpdateInfo): boolean {
    const tab = this.tabs.get(webViewId);
    if (!tab) return false;
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const currentDef = tab.data as WebViewDefinition | undefined;
    if (!currentDef) return false;
    tab.data = { ...currentDef, ...updateInfo };
    this.tabs.set(webViewId, tab);
    return true;
  }
}

/** Reactive map of webViewId (UUID) -> WebViewTabProps */
export type WebViewMap = Record<string, WebViewTabProps>;

/** Map of simpleTabId -> webViewId so panels know which webview to render for each tab */
export type TabWebViewIds = Record<string, string>;

/** Webviews that should be rendered as floating dialogs */
export type DialogWebView = WebViewTabProps & { dialogId: string };

export type UseSimpleModeDockLayoutResult = {
  /** All webview definitions keyed by their UUID */
  webViewMap: WebViewMap;
  /** Maps each simple-mode tab id to its opened webview UUID */
  tabWebViewIds: TabWebViewIds;
  /** Webviews that should be shown as centered blocking dialogs */
  dialogWebViews: DialogWebView[];
  /** Close/dismiss a dialog webview */
  closeDialog: (dialogId: string) => void;
};

/**
 * Hook that creates a PapiDockLayout implementation for Simple Mode, registers it with the web-view
 * service, and opens webviews for all non-placeholder tabs on mount.
 */
export function useSimpleModeDockLayout(): UseSimpleModeDockLayoutResult {
  const storeRef = useRef(new SimpleModeTabStore());
  const onLayoutChangeRef = useRef<OnLayoutChangeRCDock | undefined>();
  const [webViewMap, setWebViewMap] = useState<WebViewMap>({});
  const [tabWebViewIds, setTabWebViewIds] = useState<TabWebViewIds>({});
  const [dialogWebViews, setDialogWebViews] = useState<DialogWebView[]>([]);
  /** Track which simple tab IDs we're currently opening webviews for, to avoid duplicates */
  const openingTabsRef = useRef(new Set<string>());

  const notifyWebViewChange = useCallback((webView: WebViewTabProps) => {
    setWebViewMap((prev) => ({
      ...prev,
      [webView.id]: webView,
    }));
  }, []);

  const notifyWebViewRemove = useCallback((tabId: string) => {
    setWebViewMap((prev) => {
      const next = { ...prev };
      delete next[tabId];
      return next;
    });
  }, []);

  const addDialogWebView = useCallback((webView: WebViewTabProps) => {
    setDialogWebViews((prev) => [...prev, { ...webView, dialogId: webView.id }]);
  }, []);

  const closeDialog = useCallback((dialogId: string) => {
    setDialogWebViews((prev) => prev.filter((d) => d.dialogId !== dialogId));
    storeRef.current.removeTab(dialogId);
  }, []);

  // Register the PapiDockLayout implementation
  useEffect(() => {
    const store = storeRef.current;

    const dockLayout: PapiDockLayout = {
      dockLayout: undefined,
      onLayoutChangeRef,

      addTabToDock: (
        savedTabInfo: SavedTabInfo,
        layout: Layout,
        _shouldBringToFront = true,
      ): Layout | undefined => {
        const existingTab = store.getTab(savedTabInfo.id);
        if (existingTab) {
          store.addOrUpdateTab({ ...existingTab, ...savedTabInfo });
          return undefined;
        }
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
          store.addOrUpdateTab({
            ...existingTab,
            data: webView,
            tabTitle: webView.title ?? webView.webViewType,
          });
          notifyWebViewChange(webView);
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

        if (layout.type === 'float') {
          addDialogWebView(webView);
        } else {
          notifyWebViewChange(webView);
        }
        return layout;
      },

      removeTabFromDock: (tabId: string): boolean => {
        const removed = store.removeTab(tabId);
        if (removed) notifyWebViewRemove(tabId);
        return removed;
      },

      floatTabById: (_tabId: string): void => {
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
        const result = store.updateWebViewDefinition(webViewId, updateInfo);
        if (result) {
          const def = store.getWebViewDefinition(webViewId);
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          if (def) notifyWebViewChange(def as WebViewTabProps);
        }
        return result;
      },

      getTabInfoByDirectionFromTab: (
        sourceTabId: string,
        _direction: DirectionFromTab,
      ): TabInfo | undefined => {
        const allTabs = store.getAllTabs();
        const sourceIndex = allTabs.findIndex((t) => t.id === sourceTabId);
        if (sourceIndex < 0) return undefined;
        const nextIndex = (sourceIndex + 1) % allTabs.length;
        return allTabs[nextIndex];
      },

      getTabInfoByElement: (tabElement: Element): TabInfo | undefined => {
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
        return !!tab;
      },

      loadLayout: (_layout: LayoutBase): void => {
        logger.debug('SimpleModeLayout: loadLayout is a no-op in Simple Mode');
      },

      findTab: (idOrFilter: string | ((item: SavedTabInfo) => boolean)): TabInfo | undefined => {
        return store.findTab(idOrFilter);
      },

      testLayout,
    };

    const unsub = registerDockLayout(dockLayout);

    // After registering, open webviews for all non-placeholder tabs
    openWebViewsForTabs();

    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Opens a webview for each non-placeholder simple-mode tab that has a webViewType. Each tab gets
   * its own webview instance. The mapping simpleTabId -> webViewId is stored in tabWebViewIds so
   * panels can look up which WebView to render.
   */
  async function openWebViewsForTabs(): Promise<void> {
    const tabsToOpen = SIMPLE_MODE_TABS.filter((t) => !t.isPlaceholder && t.webViewType);

    for (const tab of tabsToOpen) {
      if (openingTabsRef.current.has(tab.id)) continue;
      openingTabsRef.current.add(tab.id);

      try {
        // Open the webview — this will trigger addWebViewToDock which populates webViewMap
        const webViewId = await openWebView(
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          tab.webViewType!,
          { type: 'tab' },
        );

        if (webViewId) {
          // Record the mapping: this simple tab ID uses this webview UUID
          setTabWebViewIds((prev) => ({ ...prev, [tab.id]: webViewId }));
        } else {
          logger.warn(
            `SimpleModeLayout: Failed to open webview for tab "${tab.id}" (type: ${tab.webViewType})`,
          );
        }
      } catch (e) {
        logger.warn(`SimpleModeLayout: Error opening webview for tab "${tab.id}": ${e}`);
      }
    }
  }

  return { webViewMap, tabWebViewIds, dialogWebViews, closeDialog };
}
