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
  // Register Simple Mode's PapiDockLayout implementation with the webview service
  useSimpleModeDockLayout();

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
    // Move all extra-panel tabs back to tools
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
    // Auto-show extra panel if not visible
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
      // Auto-close extra panel if it becomes empty
      if (newExtra.length === 0) {
        setPanelVisibility((p) => ({ ...p, extra: false }));
      }
      return newAssignments;
    });
  }, []);

  const toolsTabs = resolveTabDefs(tabAssignments.tools);
  const extraTabs = resolveTabDefs(tabAssignments.extra);

  const visiblePanelCount = Object.values(panelVisibility).filter(Boolean).length;

  /** Toolbar end content for the extra panel — ellipsis dropdown for moving tabs */
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
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <WorkflowSidebar />
      </Sidebar>
      <SidebarInset className="simple-mode-inset">
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
                    />
                  </ResizablePanel>
                  {(panelVisibility.editor || panelVisibility.tools || panelVisibility.extra) && (
                    <ResizableHandle withHandle />
                  )}
                </>
              )}
              {panelVisibility.editor && (
                <>
                  <ResizablePanel defaultSize={35} minSize={10}>
                    <SimpleModePanel
                      panelId="editor"
                      tabs={resolveTabDefs(tabAssignments.editor)}
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
                    <SimpleModePanel panelId="tools" tabs={toolsTabs} />
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
                  />
                </ResizablePanel>
              )}
            </ResizablePanelGroup>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default SimpleModeLayout;
