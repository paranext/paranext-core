/** Panel toggle buttons for Simple Mode toolbar. Includes +/- buttons for extra panel management. */

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import type { PanelVisibility } from './simple-mode-layout.component';
import type { TabItem } from './tab-config';
import { getDefaultTabs } from './tab-config';
import { TAB_GROUPS, type TabGroupId } from './tab-registry';

const TOOLTIP_DELAY = 300;

interface PanelToggleButtonsProps {
  visibility: PanelVisibility;
  onChange: (v: PanelVisibility) => void;
  tabArrangement: TabItem[];
  onTabArrangementChange: (tabs: TabItem[]) => void;
}

export function PanelToggleButtons({
  visibility,
  onChange,
  tabArrangement,
  onTabArrangementChange,
}: PanelToggleButtonsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTabs, setSelectedTabs] = useState<Set<string>>(new Set());

  const extraPanelExists = tabArrangement.some((t) => t.panel === 'extra');

  const togglePanel = useCallback(
    (panel: keyof PanelVisibility) => {
      onChange({ ...visibility, [panel]: !visibility[panel] });
    },
    [visibility, onChange],
  );

  const handleCreateExtraPanel = useCallback(() => {
    if (selectedTabs.size === 0) return;

    const newArrangement = tabArrangement.map((tab) =>
      selectedTabs.has(tab.id) ? { ...tab, panel: 'extra' as const } : tab,
    );
    onTabArrangementChange(newArrangement);
    onChange({ ...visibility, extra: true });
    setDialogOpen(false);
    setSelectedTabs(new Set());
  }, [selectedTabs, tabArrangement, onTabArrangementChange, onChange, visibility]);

  const handleRemoveExtraPanel = useCallback(() => {
    const defaults = getDefaultTabs();
    const defaultMap = new Map(defaults.map((t) => [t.id, { panel: t.panel, visible: t.visible }]));

    const newArrangement = tabArrangement.map((tab) => {
      if (tab.panel !== 'extra') return tab;
      const defaultInfo = defaultMap.get(tab.id);
      if (defaultInfo) return { ...tab, panel: defaultInfo.panel };
      return { ...tab, panel: 'tools' as const, visible: false };
    });

    onTabArrangementChange(newArrangement);
    onChange({ ...visibility, extra: false });
  }, [tabArrangement, onTabArrangementChange, onChange, visibility]);

  const toggleTabSelection = useCallback((tabId: string) => {
    setSelectedTabs((prev) => {
      const next = new Set(prev);
      if (next.has(tabId)) next.delete(tabId);
      else next.add(tabId);
      return next;
    });
  }, []);

  // Build selectable tabs for the dialog, grouped by category
  const selectableTabs = tabArrangement.filter(
    (t) => t.visible && t.id !== 'reference', // reference stays in resources panel in Variant A
  );
  const scriptureGroupIds = new Set(TAB_GROUPS.scripture.tabIds);

  const resourceTabs = selectableTabs.filter(
    (t) => scriptureGroupIds.has(t.id) && t.id !== 'reference',
  );
  const toolTabs = selectableTabs.filter((t) => !scriptureGroupIds.has(t.id));

  const baseButtons: { key: keyof PanelVisibility; tooltip: string }[] = [
    { key: 'reference', tooltip: 'Reference' },
    { key: 'editor', tooltip: 'Editor' },
    { key: 'resources', tooltip: 'Resources & Tools' },
  ];

  const buttons =
    extraPanelExists || visibility.extra
      ? [{ key: 'extra' as keyof PanelVisibility, tooltip: 'Extra Panel' }, ...baseButtons]
      : baseButtons;

  return (
    <div className="tw-flex tw-items-center tw-gap-0.5 tw-h-7">
      {/* Plus button — add extra panel */}
      {!extraPanelExists && !visibility.extra && (
        <Popover open={dialogOpen} onOpenChange={setDialogOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="tw-h-full tw-w-4 tw-rounded-sm tw-transition-colors tw-cursor-pointer tw-bg-transparent tw-border tw-border-dashed tw-border-border hover:tw-border-foreground/50 tw-flex tw-items-center tw-justify-center tw-text-muted-foreground hover:tw-text-foreground tw-mr-1"
              title="Add extra panel"
            >
              <span className="tw-text-[10px] tw-font-bold tw-leading-none">+</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="tw-w-64 tw-p-0" align="start">
            <div className="tw-p-3 tw-border-b tw-border-border tw-bg-muted">
              <h3 className="tw-text-xs tw-font-bold">Add extra panel</h3>
              <p className="tw-text-[10px] tw-text-muted-foreground tw-mt-0.5">
                Select tabs to move to new panel
              </p>
            </div>

            <div className="tw-max-h-64 tw-overflow-y-auto tw-p-2">
              {resourceTabs.length > 0 && (
                <TabGroup
                  label="Resources"
                  tabs={resourceTabs}
                  selectedTabs={selectedTabs}
                  onToggle={toggleTabSelection}
                />
              )}
              {toolTabs.length > 0 && (
                <TabGroup
                  label="Tools"
                  tabs={toolTabs}
                  selectedTabs={selectedTabs}
                  onToggle={toggleTabSelection}
                />
              )}
            </div>

            <div className="tw-p-2 tw-border-t tw-border-border tw-bg-muted">
              <Button
                onClick={handleCreateExtraPanel}
                disabled={selectedTabs.size === 0}
                size="sm"
                className="tw-w-full tw-text-xs"
              >
                Move selected tabs to extra panel
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Minus button — remove extra panel */}
      {(extraPanelExists || visibility.extra) && (
        <button
          type="button"
          onClick={handleRemoveExtraPanel}
          className="tw-h-full tw-w-4 tw-rounded-sm tw-transition-colors tw-cursor-pointer tw-bg-transparent tw-border tw-border-dashed tw-border-border hover:tw-border-foreground/50 tw-flex tw-items-center tw-justify-center tw-text-muted-foreground hover:tw-text-foreground tw-mr-1"
          title="Restore 3 panel layout"
        >
          <span className="tw-text-[10px] tw-font-bold tw-leading-none">-</span>
        </button>
      )}

      {/* Panel toggle buttons */}
      {buttons.map((btn) => {
        const isActive = visibility[btn.key];
        return (
          <TooltipProvider key={btn.key} delayDuration={TOOLTIP_DELAY}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => togglePanel(btn.key)}
                  className={`tw-h-full tw-w-4 tw-rounded-sm tw-transition-colors tw-cursor-pointer ${isActive ? 'tw-bg-primary/20 tw-border tw-border-primary/50' : 'tw-bg-transparent tw-border tw-border-border hover:tw-border-foreground/50'}`}
                  aria-label={`${isActive ? 'Hide' : 'Show'} ${btn.tooltip}`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="tw-font-light">
                  {isActive ? 'Hide' : 'Show'} {btn.tooltip}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}

/** A group of checkboxes for tabs in the extra panel dialog. */
function TabGroup({
  label,
  tabs,
  selectedTabs,
  onToggle,
}: {
  label: string;
  tabs: TabItem[];
  selectedTabs: Set<string>;
  onToggle: (tabId: string) => void;
}) {
  return (
    <div className="tw-mb-3">
      <div className="tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-muted-foreground tw-px-2 tw-mb-1">
        {label}
      </div>
      {tabs.map((tab) => (
        <label
          key={tab.id}
          className="tw-flex tw-items-center tw-gap-2 tw-px-2 tw-py-1.5 tw-rounded hover:tw-bg-muted tw-cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedTabs.has(tab.id)}
            onChange={() => onToggle(tab.id)}
            className="tw-rounded tw-border-border"
          />
          <span className="tw-text-xs">{tab.label}</span>
        </label>
      ))}
    </div>
  );
}
