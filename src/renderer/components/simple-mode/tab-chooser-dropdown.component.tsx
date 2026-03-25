/**
 * Tab chooser dropdown — used by the extra panel's ellipsis menu to select which tabs appear in the
 * extra panel vs the resources/tools panel.
 */

import { useMemo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from 'platform-bible-react';
import { MoreVertical } from 'lucide-react';
import type { TabItem } from './tab-config';
import { TAB_GROUPS } from './tab-registry';

interface TabChooserDropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tabArrangement: TabItem[];
  onToggleExtraTab: (tabId: string) => void;
}

export function TabChooserDropdown({
  open,
  onOpenChange,
  tabArrangement,
  onToggleExtraTab,
}: TabChooserDropdownProps) {
  const selectableTabs = useMemo(
    () => tabArrangement.filter((t) => t.id !== 'reference' && !t.id.startsWith('__')),
    [tabArrangement],
  );

  const scriptureGroupIds = useMemo(() => new Set(TAB_GROUPS.scripture.tabIds), []);

  const groups = useMemo(() => {
    const resourceTabs = selectableTabs.filter(
      (t) => scriptureGroupIds.has(t.id) && t.id !== 'reference',
    );
    const toolTabs = selectableTabs.filter((t) => !scriptureGroupIds.has(t.id));

    return [
      { key: 'resources', label: 'Resources', tabs: resourceTabs },
      { key: 'tools', label: 'Tools', tabs: toolTabs },
    ].filter((g) => g.tabs.length > 0);
  }, [selectableTabs, scriptureGroupIds]);

  // Count non-extra tabs to prevent moving all tabs to extra
  const nonExtraCount = selectableTabs.filter((t) => t.panel !== 'extra').length;

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="tw-p-1.5 tw-rounded-md tw-text-muted-foreground hover:tw-text-foreground hover:tw-bg-muted tw-transition-colors"
          title="Choose extra panel tabs"
        >
          <MoreVertical className="tw-w-4 tw-h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="tw-w-64 tw-p-0" align="end">
        <div className="tw-p-3 tw-border-b tw-border-border tw-bg-muted">
          <h3 className="tw-text-xs tw-font-bold">Choose extra panel tabs</h3>
          <p className="tw-text-[10px] tw-text-muted-foreground tw-mt-0.5">
            Select which tabs appear in this panel
          </p>
        </div>
        <div className="tw-max-h-64 tw-overflow-y-auto tw-p-2">
          {groups.map((group) => (
            <div key={group.key} className="tw-mb-3 last:tw-mb-0">
              <div className="tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-muted-foreground tw-px-2 tw-mb-1">
                {group.label}
              </div>
              {group.tabs.map((tab) => {
                const isInExtra = tab.panel === 'extra';
                const isLastNonExtra = !isInExtra && nonExtraCount <= 1;

                return (
                  <label
                    key={tab.id}
                    className={`tw-flex tw-items-center tw-gap-2 tw-px-2 tw-py-1.5 tw-rounded ${isLastNonExtra ? 'tw-opacity-50 tw-cursor-not-allowed' : 'hover:tw-bg-muted tw-cursor-pointer'}`}
                  >
                    <input
                      type="checkbox"
                      checked={isInExtra}
                      disabled={isLastNonExtra}
                      onChange={() => !isLastNonExtra && onToggleExtraTab(tab.id)}
                      className="tw-rounded tw-border-border"
                    />
                    <span
                      className={`tw-text-xs ${isLastNonExtra ? 'tw-text-muted-foreground' : ''}`}
                    >
                      {tab.label}
                    </span>
                  </label>
                );
              })}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
