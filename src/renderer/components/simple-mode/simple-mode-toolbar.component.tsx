import logo from '@assets/icon.png';
import { useScrollGroupScrRef, useRecentScriptureRefs } from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import {
  BookChapterControl,
  Button,
  cn,
  getToolbarOSReservedSpaceClassName,
  SidebarTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  usePromise,
} from 'platform-bible-react';
import { ScrollGroupId } from 'platform-bible-utils';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { BookOpen, PenLine, Wrench, Minus, EllipsisVertical } from 'lucide-react';
import { useCallback, useState } from 'react';
import { PanelVisibility, SimplePanelId } from './simple-mode-layout.component';
import { SimpleTabDefinition } from './simple-mode-tab-config';
import { TabMoveDropdown } from './tab-move-dropdown.component';

const TOOLTIP_DELAY = 300;
const scrollGroupIdLocalStorageKey = 'simple-mode-toolbar.scrollGroupId';

export type SimpleModeToolbarProps = {
  panelVisibility: PanelVisibility;
  onTogglePanel: (panelId: SimplePanelId) => void;
  onShowExtraPanel: () => void;
  onHideExtraPanel: () => void;
  /** Tabs currently in the tools panel */
  toolsTabs: SimpleTabDefinition[];
  /** Tabs currently in the extra panel */
  extraTabs: SimpleTabDefinition[];
  /** Move a tab to the extra panel */
  onMoveTabToExtra: (tabId: string) => void;
  /** Move a tab back to tools */
  onMoveTabToTools: (tabId: string) => void;
};

/** Layout toggle button config */
const PANEL_TOGGLES: { id: SimplePanelId; icon: typeof BookOpen; label: string }[] = [
  { id: 'reference', icon: BookOpen, label: 'Reference' },
  { id: 'editor', icon: PenLine, label: 'Editor' },
  { id: 'tools', icon: Wrench, label: 'Tools / Resources' },
];

export function SimpleModeToolbar({
  panelVisibility,
  onTogglePanel,
  onShowExtraPanel,
  onHideExtraPanel,
  toolsTabs,
  extraTabs,
  onMoveTabToExtra,
  onMoveTabToTools,
}: SimpleModeToolbarProps) {
  // Scroll group / BCV control — same pattern as Power Mode toolbar
  const [scrollGroupIdInternal, setScrollGroupIdInternal] = useState<ScrollGroupId>(() =>
    JSON.parse(localStorage.getItem(scrollGroupIdLocalStorageKey) ?? '0'),
  );
  const updateScrollGroupIdInternal = useCallback((newScrollGroupId: ScrollGroupScrRef) => {
    if (typeof newScrollGroupId !== 'number')
      throw new Error(
        `Top Scroll Group ID cannot be anything but a number! Trying to set to ${newScrollGroupId}`,
      );
    setScrollGroupIdInternal(newScrollGroupId);
    localStorage.setItem(scrollGroupIdLocalStorageKey, JSON.stringify(newScrollGroupId));
    return true;
  }, []);

  const [scrRef, setScrRef] = useScrollGroupScrRef(
    scrollGroupIdInternal,
    updateScrollGroupIdInternal,
  );

  const { recentScriptureRefs, addRecentScriptureRef } = useRecentScriptureRefs();

  // OS reserved space for window controls
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

  return (
    <TooltipProvider delayDuration={TOOLTIP_DELAY}>
      <div
        className={cn(
          'simple-mode-toolbar',
          getToolbarOSReservedSpaceClassName(osPlatformToReserveSpaceFor),
        )}
        style={{
          height: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '0 8px',
          borderBottom: '1px solid var(--border, #e5e7eb)',
          // eslint-disable-next-line no-restricted-syntax
          WebkitAppRegion: 'drag',
        }}
      >
        {/* Sidebar trigger */}
        <SidebarTrigger
          className="tw-h-8 tw-w-8 tw-flex-shrink-0"
          style={{
            // eslint-disable-next-line no-restricted-syntax
            WebkitAppRegion: 'no-drag',
          }}
        />

        {/* Logo */}
        <img width={24} height={24} src={`${logo}`} alt="Platform.Bible logo" />
        <span
          className="tw-font-semibold tw-text-sm tw-whitespace-nowrap tw-mr-2"
          style={{ userSelect: 'none' }}
        >
          Platform.Bible
        </span>

        {/* BCV Control */}
        <div
          style={{
            // eslint-disable-next-line no-restricted-syntax
            WebkitAppRegion: 'no-drag',
          }}
        >
          <BookChapterControl
            scrRef={scrRef}
            handleSubmit={setScrRef}
            className="tw-w-80"
            recentSearches={recentScriptureRefs}
            onAddRecentSearch={addRecentScriptureRef}
          />
        </div>

        {/* Spacer */}
        <div className="tw-flex-1" />

        {/* Layout toggle buttons */}
        <div
          className="tw-flex tw-items-center tw-gap-1"
          style={{
            // eslint-disable-next-line no-restricted-syntax
            WebkitAppRegion: 'no-drag',
          }}
        >
          {PANEL_TOGGLES.map(({ id, icon: Icon, label }) => (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <Button
                  variant={panelVisibility[id] ? 'default' : 'ghost'}
                  size="icon"
                  className="tw-h-8 tw-w-8"
                  onClick={() => onTogglePanel(id)}
                >
                  <Icon className="tw-h-4 tw-w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="tw-font-light">
                  {panelVisibility[id] ? `Hide ${label}` : `Show ${label}`}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}

          {/* Plus / Minus button for extra panel */}
          {panelVisibility.extra ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="tw-h-8 tw-w-8"
                  onClick={onHideExtraPanel}
                >
                  <Minus className="tw-h-4 tw-w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="tw-font-light">Close extra panel</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <TabMoveDropdown
              toolsTabs={toolsTabs}
              extraTabs={extraTabs}
              isExtraPanelOpen={panelVisibility.extra}
              onMoveToExtra={onMoveTabToExtra}
              onMoveToTools={onMoveTabToTools}
              variant="plus"
            />
          )}

          {/* View options dropdown — placeholder */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="tw-h-8 tw-w-8">
                <EllipsisVertical className="tw-h-4 tw-w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="tw-font-light">View options</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default SimpleModeToolbar;
