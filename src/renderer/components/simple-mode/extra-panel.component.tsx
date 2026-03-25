/**
 * Extra panel for Simple Mode — the optional 4th panel (leftmost when present). Has an ellipsis
 * menu for choosing which tabs appear in this panel.
 */

import { useState, useCallback, useMemo } from 'react';
import { WebViewDefinition } from '@shared/models/web-view.model';
import type { TabItem } from './tab-config';
import { ResourcesPanel } from './resources-panel.component';
import { TabChooserDropdown } from './tab-chooser-dropdown.component';

interface ExtraPanelProps {
  tabArrangement: TabItem[];
  onTabArrangementChange: (tabs: TabItem[]) => void;
  webViewDefs?: Map<string, WebViewDefinition>;
}

export function ExtraPanel({
  tabArrangement,
  onTabArrangementChange,
  webViewDefs,
}: ExtraPanelProps) {
  const [chooserOpen, setChooserOpen] = useState(false);

  const extraTabs = useMemo(
    () => tabArrangement.filter((t) => t.panel === 'extra'),
    [tabArrangement],
  );

  const handleToggleExtraTab = useCallback(
    (tabId: string) => {
      const newArrangement = tabArrangement.map((tab) => {
        if (tab.id !== tabId) return tab;
        // Toggle between extra and its default panel (resources or tools)
        return {
          ...tab,
          panel:
            tab.panel === 'extra'
              ? ((tab.group === 'scripture' ? 'resources' : 'tools') as TabItem['panel'])
              : 'extra',
        };
      });
      onTabArrangementChange(newArrangement);
    },
    [tabArrangement, onTabArrangementChange],
  );

  return (
    <div className="tw-h-full tw-flex tw-flex-col tw-relative">
      {/* Ellipsis button for tab chooser */}
      <div className="tw-absolute tw-top-1 tw-right-1 tw-z-10">
        <TabChooserDropdown
          open={chooserOpen}
          onOpenChange={setChooserOpen}
          tabArrangement={tabArrangement}
          onToggleExtraTab={handleToggleExtraTab}
        />
      </div>

      {/* Tab bar and content */}
      <ResourcesPanel tabs={extraTabs} panelRole="extra" webViewDefs={webViewDefs} />
    </div>
  );
}
