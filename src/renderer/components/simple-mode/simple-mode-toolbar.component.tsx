/**
 * Simple Mode toolbar — contains logo, project selector, BCV control, panel toggles, and view
 * options.
 */

import logo from '@assets/icon.png';
import { useScrollGroupScrRef, useRecentScriptureRefs } from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { ChevronDown } from 'lucide-react';
import {
  BookChapterControl,
  Button,
  getToolbarOSReservedSpaceClassName,
  Popover,
  PopoverContent,
  PopoverTrigger,
  usePromise,
} from 'platform-bible-react';
import { useCallback, useState } from 'react';
import type { PanelVisibility } from './simple-mode-layout.component';
import type { TabItem } from './tab-config';
import { PanelToggleButtons } from './panel-toggle-buttons.component';
import {
  ViewOptionsDropdown,
  type ViewOptions,
  DEFAULT_VIEW_OPTIONS,
} from './view-options-dropdown.component';

interface SimpleModeToolbarProps {
  panelVisibility: PanelVisibility;
  onPanelVisibilityChange: (v: PanelVisibility) => void;
  tabArrangement: TabItem[];
  onTabArrangementChange: (tabs: TabItem[]) => void;
  viewOptions: ViewOptions;
  onViewOptionsChange: (options: ViewOptions) => void;
}

export function SimpleModeToolbar({
  panelVisibility,
  onPanelVisibilityChange,
  tabArrangement,
  onTabArrangementChange,
  viewOptions,
  onViewOptionsChange,
}: SimpleModeToolbarProps) {
  // BCV control setup — same pattern as platform-bible-toolbar.tsx
  const [scrollGroupIdInternal, setScrollGroupIdInternal] = useState<ScrollGroupScrRef>(0);
  const updateScrollGroupIdInternal = useCallback((newScrollGroupId: ScrollGroupScrRef) => {
    setScrollGroupIdInternal(newScrollGroupId);
    return true;
  }, []);

  const [scrRef, setScrRef] = useScrollGroupScrRef(
    scrollGroupIdInternal,
    updateScrollGroupIdInternal,
  );

  const { recentScriptureRefs, addRecentScriptureRef } = useRecentScriptureRefs();

  // OS platform for reserved space (macOS traffic lights)
  const [osPlatformToReserveSpaceFor] = usePromise(
    useCallback(async () => {
      const osPlatform: string | undefined = await sendCommand('platform.getOSPlatform');
      const isFullScreen: boolean = await sendCommand('platform.isFullScreen');
      if (osPlatform === 'darwin' && isFullScreen) return undefined;
      if (osPlatform === 'linux') return undefined;
      return osPlatform;
    }, []),
    undefined,
  );

  // Project selector state (placeholder for now)
  const [projectName, setProjectName] = useState('Select Project');
  const [projectSelectorOpen, setProjectSelectorOpen] = useState(false);

  const reservedSpaceClass = getToolbarOSReservedSpaceClassName(osPlatformToReserveSpaceFor);

  return (
    <div
      className={`simple-mode-toolbar ${reservedSpaceClass ?? ''}`}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="toolbar"
    >
      {/* Logo + title */}
      <div className="simple-mode-toolbar-brand">
        <img width={20} height={20} src={`${logo}`} alt="Platform.Bible" />
        <span className="simple-mode-toolbar-title">Platform.Bible</span>
      </div>

      {/* Project selector */}
      <Popover open={projectSelectorOpen} onOpenChange={setProjectSelectorOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="tw-h-7 tw-gap-1 tw-text-xs tw-font-medium tw-max-w-[180px] tw-truncate"
          >
            <span className="tw-truncate">{projectName}</span>
            <ChevronDown className="tw-w-3 tw-h-3 tw-flex-shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="tw-w-56 tw-p-2" align="start">
          <div className="tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-muted-foreground tw-px-2 tw-mb-2">
            Projects
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="tw-w-full tw-justify-start tw-text-xs"
            onClick={() => {
              setProjectSelectorOpen(false);
              // TODO: Open project selector modal
            }}
          >
            More projects...
          </Button>
          <div className="tw-mx-2 tw-my-1 tw-border-t tw-border-border" />
          <Button
            variant="ghost"
            size="sm"
            className="tw-w-full tw-justify-start tw-text-xs"
            onClick={() => {
              setProjectSelectorOpen(false);
              // TODO: Open resource download dialog
            }}
          >
            Download resource
          </Button>
        </PopoverContent>
      </Popover>

      {/* BCV control */}
      <BookChapterControl
        scrRef={scrRef}
        handleSubmit={setScrRef}
        className="tw-w-80"
        recentSearches={recentScriptureRefs}
        onAddRecentSearch={addRecentScriptureRef}
      />

      {/* Spacer */}
      <div className="tw-flex-1" />

      {/* Panel toggle buttons */}
      <PanelToggleButtons
        visibility={panelVisibility}
        onChange={onPanelVisibilityChange}
        tabArrangement={tabArrangement}
        onTabArrangementChange={onTabArrangementChange}
      />

      {/* View options */}
      <ViewOptionsDropdown options={viewOptions} onChange={onViewOptionsChange} />
    </div>
  );
}

export { DEFAULT_VIEW_OPTIONS };
export type { ViewOptions };
