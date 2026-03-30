/**
 * Resources/Tools panel for Simple Mode. Renders a grouped icon tab bar and content area. Content
 * is either a real webview (display:none for inactive to preserve iframe state) or a placeholder.
 */

import { useState, useCallback, useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'platform-bible-react';
import { WebViewDefinition } from '@shared/models/web-view.model';
import { WebView } from '@renderer/components/web-view.component';
import type { TabItem } from './tab-config';
import { getTabDef, computeGroupDividerIndices } from './tab-registry';
import { PlaceholderTab, AlephIcon, TriquetraIcon } from './placeholder-tab.component';

const TOOLTIP_DELAY = 200;

/** Tab-to-webview-type mapping for tabs that have real implementations. */
const TAB_WEBVIEW_TYPES: Record<string, string> = {
  reference: 'platformScriptureEditor.react',
  bible: 'platformScriptureEditor.react',
  source: 'platformScriptureEditor.react',
  comments: 'legacyCommentManager.commentList',
  search: 'platformScripture.find',
  dictionary: 'platformLexicalTools.dictionary',
};

interface ResourcesPanelProps {
  tabs: TabItem[];
  panelRole: 'resources' | 'extra';
  /** All webview definitions from the layout — used to render real webviews. */
  webViewDefs?: Map<string, WebViewDefinition>;
}

export function ResourcesPanel({ tabs, panelRole, webViewDefs }: ResourcesPanelProps) {
  const visibleTabs = useMemo(() => tabs.filter((t) => t.visible), [tabs]);
  const [activeTabId, setActiveTabId] = useState<string>(() => visibleTabs[0]?.id ?? '');

  const effectiveActiveTabId = useMemo(() => {
    if (visibleTabs.some((t) => t.id === activeTabId)) return activeTabId;
    return visibleTabs[0]?.id ?? '';
  }, [activeTabId, visibleTabs]);

  const tabIds = useMemo(() => visibleTabs.map((t) => t.id), [visibleTabs]);
  const dividerIndices = useMemo(() => computeGroupDividerIndices(tabIds), [tabIds]);

  const handleTabClick = useCallback((tabId: string) => {
    setActiveTabId(tabId);
  }, []);

  if (visibleTabs.length === 0) {
    return (
      <div className="tw-h-full tw-flex tw-items-center tw-justify-center tw-text-xs tw-text-muted-foreground">
        No tabs
      </div>
    );
  }

  const showTabBar = visibleTabs.length > 1;

  return (
    <div className="tw-h-full tw-flex tw-flex-col tw-overflow-hidden">
      {showTabBar && (
        <div className="tw-flex tw-items-center tw-h-8 tw-px-1 tw-gap-0.5 tw-border-b tw-border-border tw-bg-muted/50 tw-flex-shrink-0">
          {visibleTabs.map((tab, index) => {
            const isActive = tab.id === effectiveActiveTabId;
            const tabDef = getTabDef(tab.id);
            const showDivider = dividerIndices.has(index);

            return (
              <div key={tab.id} className="tw-flex tw-items-center">
                <TooltipProvider delayDuration={TOOLTIP_DELAY}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => handleTabClick(tab.id)}
                        className={`tw-flex tw-items-center tw-justify-center tw-w-7 tw-h-7 tw-rounded-md tw-transition-colors ${isActive ? 'tw-bg-primary/15 tw-text-primary' : 'tw-text-muted-foreground hover:tw-bg-muted hover:tw-text-foreground tw-cursor-pointer'}`}
                        aria-label={tab.label}
                      >
                        <TabIcon tabDef={tabDef} size={16} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="tw-font-light">{tab.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {showDivider && <div className="tw-w-px tw-h-4 tw-bg-border tw-mx-0.5" />}
              </div>
            );
          })}
        </div>
      )}

      {/* Content area — all tabs rendered, inactive hidden with display:none */}
      <div className="tw-flex-1 tw-overflow-hidden tw-relative">
        {visibleTabs.map((tab) => {
          const isActive = tab.id === effectiveActiveTabId;
          const hasWebViewType = tab.id in TAB_WEBVIEW_TYPES;

          // Find a matching webview definition if one exists
          let matchingDef: WebViewDefinition | undefined;
          if (hasWebViewType && webViewDefs) {
            const targetType = TAB_WEBVIEW_TYPES[tab.id];
            for (const [, def] of webViewDefs) {
              if (def.webViewType === targetType) {
                matchingDef = def;
                break;
              }
            }
          }

          return (
            <div
              key={tab.id}
              style={{ display: isActive ? 'flex' : 'none' }}
              className="tw-h-full tw-w-full tw-flex-col"
            >
              {matchingDef ? (
                <WebView {...matchingDef} shouldShowToolbar={false} />
              ) : hasWebViewType ? (
                <div className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-text-xs tw-text-muted-foreground tw-bg-background">
                  Loading {tab.label}...
                </div>
              ) : (
                <PlaceholderTab tabId={tab.id} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TabIcon({ tabDef, size }: { tabDef: ReturnType<typeof getTabDef>; size: number }) {
  if (!tabDef) return <span>?</span>;

  if (tabDef.customIcon === 'aleph') {
    return <AlephIcon className="tw-text-[14px]" />;
  }
  if (tabDef.customIcon === 'triquetra') {
    return <TriquetraIcon className={`tw-w-[${size}px] tw-h-[${size}px]`} />;
  }
  if (tabDef.icon) {
    const Icon = tabDef.icon;
    return <Icon style={{ width: size, height: size }} />;
  }
  return <span>?</span>;
}
