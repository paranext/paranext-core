import { Button, cn } from 'platform-bible-react';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { SimplePanelId } from './simple-mode-layout.component';
import { SimpleTabDefinition, getTabsForPanel } from './simple-mode-tab-config';
import { PlaceholderTab } from './placeholder-tab.component';

export type SimpleModePanelProps = {
  panelId: SimplePanelId;
  /** Tabs assigned to this panel. If not provided, uses default tabs from config. */
  tabs?: SimpleTabDefinition[];
  /** Extra toolbar content to render on the right side of the tab bar */
  toolbarEndContent?: React.ReactNode;
};

/**
 * Generic panel component for Simple Mode.
 *
 * - Shows a tab bar only when the panel has 2+ tabs.
 * - When a single tab is assigned, it fills the panel with no tab bar.
 * - Uses `display: none` for inactive tabs to preserve iframe state.
 */
export function SimpleModePanel({
  panelId,
  tabs: tabsProp,
  toolbarEndContent,
}: SimpleModePanelProps) {
  const tabs = tabsProp ?? getTabsForPanel(panelId);
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id ?? '');

  const showTabBar = tabs.length > 1;

  return (
    <div className="simple-mode-panel">
      {/* Tab bar — only shown when 2+ tabs */}
      {showTabBar && (
        <div className="simple-mode-panel-tabbar">
          <div className="simple-mode-panel-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={cn(
                    'simple-mode-tab-button',
                    isActive && 'simple-mode-tab-button-active',
                  )}
                  onClick={() => setActiveTabId(tab.id)}
                  title={tab.label}
                >
                  <Icon className="tw-h-4 tw-w-4" />
                  <span className="simple-mode-tab-label">{tab.label}</span>
                </button>
              );
            })}
          </div>
          {toolbarEndContent && (
            <div className="simple-mode-panel-toolbar-end">{toolbarEndContent}</div>
          )}
        </div>
      )}

      {/* Content area — all tabs rendered, inactive hidden via display:none */}
      <div className="simple-mode-panel-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{ display: tab.id === activeTabId ? 'flex' : 'none' }}
            className="simple-mode-panel-tab-content"
          >
            {tab.isPlaceholder ? (
              <PlaceholderTab tabName={tab.label} />
            ) : (
              // Real webview content will be wired in Phase 7
              <div className="simple-mode-panel-webview-placeholder">
                <span>{tab.label}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimpleModePanel;
