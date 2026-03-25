import { useCallback, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Sidebar,
  SidebarProvider,
  SidebarInset,
} from 'platform-bible-react';
import { WorkflowSidebar } from '@renderer/components/simple-mode/workflow-sidebar.component';
import { useSimpleModeDockLayout } from '@renderer/components/simple-mode/use-simple-mode-dock-layout.hook';
import { SimpleModeToolbar } from '@renderer/components/simple-mode/simple-mode-toolbar.component';
import { SimpleModePanel } from '@renderer/components/simple-mode/simple-mode-panel.component';
import { TabMoveDropdown } from '@renderer/components/simple-mode/tab-move-dropdown.component';
import {
  SimpleTabDefinition,
  SIMPLE_MODE_TABS,
  getTabsForPanel,
} from '@renderer/components/simple-mode/simple-mode-tab-config';
import WebView from '@renderer/components/web-view.component';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import './simple-mode-layout.component.scss';

/** IDs for the panels in simple mode */
export type SimplePanelId = 'reference' | 'editor' | 'tools' | 'extra';

/** Visibility state for each panel */
export type PanelVisibility = Record<SimplePanelId, boolean>;

/** Map of panel ID to list of tab IDs assigned to it */
type PanelTabAssignments = Record<SimplePanelId, string[]>;

/** Build default tab assignments from config */
function getDefaultTabAssignments(): PanelTabAssignments {
  return {
    reference: getTabsForPanel('reference').map((t) => t.id),
    editor: getTabsForPanel('editor').map((t) => t.id),
    tools: getTabsForPanel('tools').map((t) => t.id),
    extra: [],
  };
}

/** Resolve tab IDs to tab definitions */
function resolveTabDefs(tabIds: string[]): SimpleTabDefinition[] {
  return tabIds
    .map((id) => SIMPLE_MODE_TABS.find((t) => t.id === id))
    .filter((t): t is SimpleTabDefinition => t !== undefined);
}

export function SimpleModeLayout() {
  // Register Simple Mode's PapiDockLayout implementation with the webview service.
  // Returns a reactive webViewMap and dialogWebViews for rendering.
  const { webViewMap, tabWebViewIds, dialogWebViews, closeDialog } = useSimpleModeDockLayout();

  const [panelVisibility, setPanelVisibility] = useState<PanelVisibility>({
    reference: true,
    editor: true,
    tools: true,
    extra: false,
  });

  const [tabAssignments, setTabAssignments] =
    useState<PanelTabAssignments>(getDefaultTabAssignments);

  const togglePanel = (panelId: SimplePanelId) => {
    setPanelVisibility((prev) => ({ ...prev, [panelId]: !prev[panelId] }));
  };

  const showExtraPanel = () => {
    setPanelVisibility((prev) => ({ ...prev, extra: true }));
  };

  const hideExtraPanel = useCallback(() => {
    setTabAssignments((prev) => ({
      ...prev,
      tools: [...prev.tools, ...prev.extra],
      extra: [],
    }));
    setPanelVisibility((prev) => ({ ...prev, extra: false }));
  }, []);

  const moveTabToExtra = useCallback((tabId: string) => {
    setTabAssignments((prev) => ({
      ...prev,
      tools: prev.tools.filter((id) => id !== tabId),
      extra: [...prev.extra, tabId],
    }));
    setPanelVisibility((prev) => ({ ...prev, extra: true }));
  }, []);

  const moveTabToTools = useCallback((tabId: string) => {
    setTabAssignments((prev) => {
      const newExtra = prev.extra.filter((id) => id !== tabId);
      const newAssignments = {
        ...prev,
        tools: [...prev.tools, tabId],
        extra: newExtra,
      };
      if (newExtra.length === 0) {
        setPanelVisibility((p) => ({ ...p, extra: false }));
      }
      return newAssignments;
    });
  }, []);

  const toolsTabs = resolveTabDefs(tabAssignments.tools);
  const extraTabs = resolveTabDefs(tabAssignments.extra);

  const visiblePanelCount = Object.values(panelVisibility).filter(Boolean).length;

  const extraPanelToolbarEnd = (
    <TabMoveDropdown
      toolsTabs={toolsTabs}
      extraTabs={extraTabs}
      isExtraPanelOpen={panelVisibility.extra}
      onMoveToExtra={moveTabToExtra}
      onMoveToTools={moveTabToTools}
      variant="ellipsis"
    />
  );

  return (
    <div className="simple-mode-root">
      {/* Toolbar spans full width above sidebar */}
      <SimpleModeToolbar
        panelVisibility={panelVisibility}
        onTogglePanel={togglePanel}
        onShowExtraPanel={showExtraPanel}
        onHideExtraPanel={hideExtraPanel}
        toolsTabs={toolsTabs}
        extraTabs={extraTabs}
        onMoveTabToExtra={moveTabToExtra}
        onMoveTabToTools={moveTabToTools}
      />

      {/* Sidebar + panels area below toolbar */}
      <div className="simple-mode-body">
        <SidebarProvider open={false} onOpenChange={() => {}}>
          <Sidebar
            collapsible="icon"
            style={
              {
                '--sidebar-width-icon': '4rem',
              } as React.CSSProperties
            }
          >
            <WorkflowSidebar />
          </Sidebar>
          <SidebarInset className="simple-mode-inset">
            <div className="simple-mode-panels">
              {visiblePanelCount === 0 ? (
                <div className="simple-mode-empty">No panels visible</div>
              ) : (
                <ResizablePanelGroup direction="horizontal">
                  {panelVisibility.reference && (
                    <>
                      <ResizablePanel defaultSize={25} minSize={10}>
                        <SimpleModePanel
                          panelId="reference"
                          tabs={resolveTabDefs(tabAssignments.reference)}
                          webViewMap={webViewMap}
                          tabWebViewIds={tabWebViewIds}
                        />
                      </ResizablePanel>
                      {(panelVisibility.editor ||
                        panelVisibility.tools ||
                        panelVisibility.extra) && <ResizableHandle withHandle />}
                    </>
                  )}
                  {panelVisibility.editor && (
                    <>
                      <ResizablePanel defaultSize={35} minSize={10}>
                        <SimpleModePanel
                          panelId="editor"
                          tabs={resolveTabDefs(tabAssignments.editor)}
                          webViewMap={webViewMap}
                          tabWebViewIds={tabWebViewIds}
                        />
                      </ResizablePanel>
                      {(panelVisibility.tools || panelVisibility.extra) && (
                        <ResizableHandle withHandle />
                      )}
                    </>
                  )}
                  {panelVisibility.tools && (
                    <>
                      <ResizablePanel defaultSize={panelVisibility.extra ? 25 : 40} minSize={10}>
                        <SimpleModePanel
                          panelId="tools"
                          tabs={toolsTabs}
                          webViewMap={webViewMap}
                          tabWebViewIds={tabWebViewIds}
                        />
                      </ResizablePanel>
                      {panelVisibility.extra && <ResizableHandle withHandle />}
                    </>
                  )}
                  {panelVisibility.extra && (
                    <ResizablePanel defaultSize={15} minSize={10}>
                      <SimpleModePanel
                        panelId="extra"
                        tabs={extraTabs}
                        toolbarEndContent={extraPanelToolbarEnd}
                        webViewMap={webViewMap}
                        tabWebViewIds={tabWebViewIds}
                      />
                    </ResizablePanel>
                  )}
                </ResizablePanelGroup>
              )}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>

      {/* Float-type webviews rendered as centered blocking dialogs */}
      {dialogWebViews.map((dialogWv) => (
        <DialogPrimitive.Root
          key={dialogWv.dialogId}
          open
          onOpenChange={() => closeDialog(dialogWv.dialogId)}
        >
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="tw-fixed tw-inset-0 tw-z-[200] tw-bg-black/50" />
            <DialogPrimitive.Content className="tw-fixed tw-left-1/2 tw-top-1/2 tw-z-[201] tw--translate-x-1/2 tw--translate-y-1/2 tw-w-[600px] tw-h-[540px] tw-rounded-lg tw-border tw-bg-background tw-shadow-lg tw-overflow-hidden">
              <WebView {...dialogWv} />
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      ))}
    </div>
  );
}

export default SimpleModeLayout;
