import { useSimpleModeContext } from '@renderer/components/simple-mode/simple-mode-context';
import SimpleModePanel from '@renderer/components/simple-mode/simple-mode-panel.component';
import toolPanelTabs, {
  ToolTabConfig,
} from '@renderer/components/simple-mode/tools-panel-tabs.config';
import { useScrollGroupScrRef } from '@renderer/hooks/papi-hooks';
import {
  Button,
  cn,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { useMemo, useState } from 'react';

/**
 * Renders a single tool tab's webview content. Computes the webview options from the tab config and
 * current context (selected project, current BCV).
 */
function ToolTabContent({ tab }: { tab: ToolTabConfig }) {
  const { selectedProjectId } = useSimpleModeContext();
  const [scrRef] = useScrollGroupScrRef(0);

  const options = useMemo(() => {
    if (!tab.webViewType) return undefined;
    if (!tab.getWebViewOptions) return {};
    return tab.getWebViewOptions({
      projectId: selectedProjectId,
      bookNum: scrRef.bookNum,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, selectedProjectId, scrRef.bookNum]);

  if (!tab.webViewType || options === undefined) return undefined;

  return <SimpleModePanel webViewType={tab.webViewType} options={options} />;
}

export default function SimpleModeToolsPanel() {
  const { activeToolTabId, setActiveToolTabId } = useSimpleModeContext();

  // Track which tabs have been activated at least once (for lazy loading)
  const [activatedTabIds, setActivatedTabIds] = useState<Set<string>>(
    () => new Set([activeToolTabId]),
  );

  const handleTabClick = (tabId: string) => {
    setActiveToolTabId(tabId);
    setActivatedTabIds((prev) => {
      if (prev.has(tabId)) return prev;
      const next = new Set(prev);
      next.add(tabId);
      return next;
    });
  };

  return (
    <div className="tw-flex tw-flex-col tw-h-full tw-overflow-hidden">
      {/* Tab toolbar */}
      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-0.5 tw-p-1 tw-border-b tw-bg-muted/30">
        {toolPanelTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeToolTabId;
          return (
            <TooltipProvider key={tab.id} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="icon"
                    className={cn('tw-h-7 tw-w-7', isActive && 'tw-pointer-events-none')}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    <Icon className="tw-h-4 tw-w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="tw-font-light">{tab.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      {/* Tab content area - render all activated tabs, hide inactive ones */}
      <div className="tw-flex-1 tw-relative tw-overflow-hidden">
        {toolPanelTabs.map((tab) => {
          const isActive = tab.id === activeToolTabId;
          const hasBeenActivated = activatedTabIds.has(tab.id);

          // Don't render tabs that have never been activated (lazy loading)
          if (!hasBeenActivated) return undefined;

          // Placeholder tabs
          if (tab.placeholder) {
            return (
              <div
                key={tab.id}
                className={cn(
                  'tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-text-muted-foreground tw-text-sm',
                  !isActive && 'tw-hidden',
                )}
              >
                {tab.label} (coming soon)
              </div>
            );
          }

          // Webview tabs - keep mounted but hide inactive
          return (
            <div key={tab.id} className={cn('tw-absolute tw-inset-0', !isActive && 'tw-hidden')}>
              <ToolTabContent tab={tab} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
