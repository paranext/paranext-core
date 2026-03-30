import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { LayoutBase } from 'rc-dock';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from 'platform-bible-react';
import { WebViewDefinition, WebViewDefinitionUpdateInfo } from '@shared/models/web-view.model';
import {
  SavedTabInfo,
  Layout,
  OnLayoutChangeRCDock,
  WebViewTabProps,
  TabInfo,
  DirectionFromTab,
} from '@shared/models/docking-framework.model';
import { PapiDockLayout } from '@shared/models/docking-framework.model';
import { registerDockLayout, openWebView } from '@renderer/services/web-view.service-host';
import { WebView, loadWebViewTab, TAB_TYPE_WEBVIEW } from '@renderer/components/web-view.component';
import { logger } from '@shared/services/logger.service';
import { Sidebar } from './sidebar.component';
import { SimpleModeToolbar } from './simple-mode-toolbar.component';
import { DEFAULT_VIEW_OPTIONS, type ViewOptions } from './view-options-dropdown.component';
import { getDefaultTabs, type TabItem } from './tab-config';
import { ResourcesPanel } from './resources-panel.component';
import { ExtraPanel } from './extra-panel.component';
import { NoPanelsPlaceholder } from './no-panels-placeholder.component';
import './simple-mode-layout.component.scss';

/** Panel visibility state for Simple Mode */
export interface PanelVisibility {
  reference: boolean;
  editor: boolean;
  resources: boolean;
  extra?: boolean;
}

const DEFAULT_PANEL_VISIBILITY: PanelVisibility = {
  reference: true,
  editor: true,
  resources: true,
  extra: false,
};

/** Minimal empty layout for the testLayout property */
const EMPTY_LAYOUT: LayoutBase = {
  dockbox: { mode: 'horizontal', children: [] },
};

export function SimpleModeLayout() {
  const [panelVisibility, setPanelVisibility] = useState<PanelVisibility>(DEFAULT_PANEL_VISIBILITY);
  const [tabArrangement, setTabArrangement] = useState<TabItem[]>(() => getDefaultTabs());
  const [viewOptions, setViewOptions] = useState<ViewOptions>(DEFAULT_VIEW_OPTIONS);

  // WebView definitions stored by ID — populated when openWebView calls addWebViewToDock
  const [webViewDefs, setWebViewDefs] = useState<Map<string, WebViewDefinition>>(new Map());

  // Track which webview IDs are assigned to which fixed panel slots
  const [referencePanelWebViewId, setReferencePanelWebViewId] = useState<string | undefined>();
  const [editorPanelWebViewId, setEditorPanelWebViewId] = useState<string | undefined>();

  // Ref for onLayoutChange callback from web-view.service-host
  const onLayoutChangeRef = useRef<OnLayoutChangeRCDock | undefined>();

  // Track whether we've opened the initial webviews
  const hasOpenedInitialWebViews = useRef(false);

  // ─── PapiDockLayout implementation ──────────────────────────────────────────

  const addWebViewToDock = useCallback(
    (webView: WebViewTabProps, layout: Layout, _shouldBringToFront?: boolean) => {
      // Store the WebViewDefinition
      setWebViewDefs((prev) => {
        const next = new Map(prev);
        next.set(webView.id, webView);
        return next;
      });

      // Return the layout to indicate a new tab was added (not an update)
      return layout;
    },
    [],
  );

  const addTabToDock = useCallback(
    (savedTabInfo: SavedTabInfo, layout: Layout, _shouldBringToFront?: boolean) => {
      if (savedTabInfo.tabType === TAB_TYPE_WEBVIEW && savedTabInfo.data) {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const webViewDef = savedTabInfo.data as WebViewDefinition;
        setWebViewDefs((prev) => {
          const next = new Map(prev);
          next.set(webViewDef.id, webViewDef);
          return next;
        });
      }
      return layout;
    },
    [],
  );

  const removeTabFromDock = useCallback(
    (tabId: string) => {
      const had = webViewDefs.has(tabId);
      if (had) {
        setWebViewDefs((prev) => {
          const next = new Map(prev);
          next.delete(tabId);
          return next;
        });
      }
      return had;
    },
    [webViewDefs],
  );

  const getWebViewDefinition = useCallback(
    (webViewId: string) => webViewDefs.get(webViewId),
    [webViewDefs],
  );

  const getTabInfoById = useCallback(
    (tabId: string): TabInfo | undefined => {
      const def = webViewDefs.get(tabId);
      if (!def) return undefined;
      return loadWebViewTab({ id: tabId, tabType: TAB_TYPE_WEBVIEW, data: def });
    },
    [webViewDefs],
  );

  const focusTab = useCallback((tabId: string) => {
    // Try to focus the iframe for this webview
    const iframe = document.querySelector(
      `[data-web-view-id="${tabId}"]`,
    ) as HTMLIFrameElement | null;
    if (iframe) {
      iframe.focus();
      return true;
    }
    return false;
  }, []);

  const updateWebViewDefinition = useCallback(
    (webViewId: string, updateInfo: WebViewDefinitionUpdateInfo, _shouldBringToFront?: boolean) => {
      const existing = webViewDefs.get(webViewId);
      if (!existing) return false;
      setWebViewDefs((prev) => {
        const next = new Map(prev);
        next.set(webViewId, { ...existing, ...updateInfo });
        return next;
      });
      return true;
    },
    [webViewDefs],
  );

  const updateTabPartial = useCallback(
    (tabId: string, partialTabInfo: Partial<TabInfo>, _shouldBringToFront?: boolean) => {
      const info = getTabInfoById(tabId);
      if (!info) return undefined;
      return { ...info, ...partialTabInfo };
    },
    [getTabInfoById],
  );

  const find = useCallback(
    (idOrPredicate: string | ((item: unknown) => boolean)) => {
      if (typeof idOrPredicate === 'string') {
        return getTabInfoById(idOrPredicate);
      }
      // Predicate search across all webview defs
      for (const [id, def] of webViewDefs) {
        const tabInfo = loadWebViewTab({ id, tabType: TAB_TYPE_WEBVIEW, data: def });
        if (idOrPredicate(tabInfo)) return tabInfo;
      }
      return undefined;
    },
    [webViewDefs, getTabInfoById],
  );

  // ─── Register dock layout ──────────────────────────────────────────────────

  useEffect(() => {
    const papiDockLayout: PapiDockLayout = {
      dockLayout: undefined,
      onLayoutChangeRef,
      addTabToDock,
      addWebViewToDock,
      removeTabFromDock,
      floatTabById: () => {
        // No-op: floating not supported in Simple Mode
      },
      getWebViewDefinition,
      updateTabPartial,
      updateWebViewDefinition,
      getTabInfoByDirectionFromTab: (_sourceTabId: string, _direction: DirectionFromTab) => {
        // Simple direction navigation — could be enhanced later
        return undefined;
      },
      getTabInfoByElement: (_tabElement: Element) => {
        // DOM-based tab lookup — could be enhanced later
        return undefined;
      },
      getTabInfoById,
      focusTab,
      testLayout: EMPTY_LAYOUT,
      find,
      loadLayout: () => {
        // No-op: Simple Mode layout is fixed
      },
    };

    const unsub = registerDockLayout(papiDockLayout);

    return () => {
      unsub();
    };
    // We intentionally pass stable callbacks only. The functions close over the latest state via
    // refs or setState updater functions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Open initial webviews ─────────────────────────────────────────────────

  useEffect(() => {
    if (hasOpenedInitialWebViews.current) return;
    hasOpenedInitialWebViews.current = true;

    (async () => {
      try {
        // Open reference panel webview (read-only scripture editor)
        const refId = await openWebView('platformScriptureEditor.react', { type: 'tab' });
        if (refId) setReferencePanelWebViewId(refId);

        // Open editor panel webview (editable scripture editor)
        const editorId = await openWebView('platformScriptureEditor.react', { type: 'tab' });
        if (editorId) setEditorPanelWebViewId(editorId);
      } catch (e) {
        logger.error(`SimpleModeLayout: Failed to open initial webviews: ${e}`);
      }
    })();
  }, []);

  // ─── Derived state ─────────────────────────────────────────────────────────

  const hasExtraPanel = panelVisibility.extra ?? false;
  const visiblePanelCount =
    (hasExtraPanel ? 1 : 0) +
    (panelVisibility.reference ? 1 : 0) +
    (panelVisibility.editor ? 1 : 0) +
    (panelVisibility.resources ? 1 : 0);

  const resourcesToolsTabs = useMemo(
    () => tabArrangement.filter((t) => t.panel === 'resources' || t.panel === 'tools'),
    [tabArrangement],
  );

  const referenceWebViewDef = referencePanelWebViewId
    ? webViewDefs.get(referencePanelWebViewId)
    : undefined;
  const editorWebViewDef = editorPanelWebViewId ? webViewDefs.get(editorPanelWebViewId) : undefined;

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="simple-mode-layout">
      <Sidebar
        onUserProfileClick={() => {
          // TODO: Open UserProfileDropdown from sidebar
        }}
      />

      <div className="simple-mode-main">
        <SimpleModeToolbar
          panelVisibility={panelVisibility}
          onPanelVisibilityChange={setPanelVisibility}
          tabArrangement={tabArrangement}
          onTabArrangementChange={setTabArrangement}
          viewOptions={viewOptions}
          onViewOptionsChange={setViewOptions}
        />

        {visiblePanelCount === 0 ? (
          <NoPanelsPlaceholder visibility={panelVisibility} onChange={setPanelVisibility} />
        ) : (
          <ResizablePanelGroup direction="horizontal" className="simple-mode-panels">
            {hasExtraPanel && (
              <>
                <ResizablePanel defaultSize={20} minSize={10}>
                  <ExtraPanel
                    tabArrangement={tabArrangement}
                    onTabArrangementChange={setTabArrangement}
                    webViewDefs={webViewDefs}
                  />
                </ResizablePanel>
                <ResizableHandle withHandle />
              </>
            )}

            {panelVisibility.reference && (
              <>
                <ResizablePanel defaultSize={25} minSize={15}>
                  <div className="simple-mode-panel simple-mode-panel-reference">
                    {referenceWebViewDef ? (
                      <WebView {...referenceWebViewDef} shouldShowToolbar={false} />
                    ) : (
                      <div className="simple-mode-panel-placeholder">Loading reference...</div>
                    )}
                  </div>
                </ResizablePanel>
                {(panelVisibility.editor || panelVisibility.resources) && (
                  <ResizableHandle withHandle />
                )}
              </>
            )}

            {panelVisibility.editor && (
              <>
                <ResizablePanel defaultSize={35} minSize={15}>
                  <div className="simple-mode-panel simple-mode-panel-editor">
                    {editorWebViewDef ? (
                      <WebView {...editorWebViewDef} shouldShowToolbar={false} />
                    ) : (
                      <div className="simple-mode-panel-placeholder">Loading editor...</div>
                    )}
                  </div>
                </ResizablePanel>
                {panelVisibility.resources && <ResizableHandle withHandle />}
              </>
            )}

            {panelVisibility.resources && (
              <ResizablePanel defaultSize={25} minSize={15}>
                <ResourcesPanel
                  tabs={resourcesToolsTabs}
                  panelRole="resources"
                  webViewDefs={webViewDefs}
                />
              </ResizablePanel>
            )}
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
}

export default SimpleModeLayout;
