import { useSimpleModeContext } from '@renderer/components/simple-mode/simple-mode-context';
import SimpleModePanel from '@renderer/components/simple-mode/simple-mode-panel.component';
import SimpleModeSidebar from '@renderer/components/simple-mode/simple-mode-sidebar.component';
import SimpleModeToolsPanel from '@renderer/components/simple-mode/simple-mode-tools-panel.component';
import { useMemo } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  SidebarInset,
  SidebarProvider,
} from 'platform-bible-react';

function SimpleModeContent() {
  const { selectedProjectId } = useSimpleModeContext();

  const referencePanelOptions = useMemo(() => ({ projectId: 'NIV11R', isReadOnly: true }), []);

  const editorPanelOptions = useMemo(
    () => (selectedProjectId ? { projectId: selectedProjectId, isReadOnly: false } : undefined),
    [selectedProjectId],
  );

  return (
    <ResizablePanelGroup direction="horizontal" className="tw-h-full">
      {/* Reference panel - read-only scripture editor */}
      <ResizablePanel defaultSize={30} minSize={15}>
        <SimpleModePanel
          webViewType="platformScriptureEditor.react"
          options={referencePanelOptions}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      {/* Editor panel - editable scripture editor */}
      <ResizablePanel defaultSize={35} minSize={15}>
        {editorPanelOptions ? (
          <SimpleModePanel
            webViewType="platformScriptureEditor.react"
            options={editorPanelOptions}
          />
        ) : (
          <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-text-muted-foreground tw-text-sm">
            Select a project to start editing
          </div>
        )}
      </ResizablePanel>
      <ResizableHandle withHandle />
      {/* Tools panel - tabbed webview container */}
      <ResizablePanel defaultSize={35} minSize={15}>
        <SimpleModeToolsPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default function SimpleModeLayout() {
  return (
    <SidebarProvider defaultOpen={false} className="tw-flex-1 tw-overflow-hidden">
      <SimpleModeSidebar />
      <SidebarInset className="tw-flex tw-flex-1 tw-overflow-hidden">
        <SimpleModeContent />
      </SidebarInset>
    </SidebarProvider>
  );
}
