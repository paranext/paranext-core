import logo from '@assets/icon.png';
import { useScrollGroupScrRef, useRecentScriptureRefs } from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import {
  BookChapterControl,
  Button,
  cn,
  getToolbarOSReservedSpaceClassName,
  Toolbar,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  usePromise,
} from 'platform-bible-react';
import { ScrollGroupId } from 'platform-bible-utils';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { BookOpen, PenLine, Wrench, Minus, Settings2, ChevronDown } from 'lucide-react';
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
  toolsTabs: SimpleTabDefinition[];
  extraTabs: SimpleTabDefinition[];
  onMoveTabToExtra: (tabId: string) => void;
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
      <Toolbar
        className={cn(
          'tw-h-12 tw-bg-transparent',
          getToolbarOSReservedSpaceClassName(osPlatformToReserveSpaceFor),
        )}
        shouldUseAsAppDragArea
        onSelectMenuItem={() => {}}
        appMenuAreaChildren={
          <>
            <img width={24} height={24} src={`${logo}`} alt="Platform.Bible logo" />
            <span
              className="tw-font-semibold tw-text-sm tw-whitespace-nowrap"
              style={{ userSelect: 'none' }}
            >
              Platform.Bible
            </span>
          </>
        }
        configAreaChildren={
          <div className="tw-flex tw-items-center tw-gap-1">
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

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="tw-h-8 tw-w-8">
                  <Settings2 className="tw-h-4 tw-w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="tw-font-light">View options</p>
              </TooltipContent>
            </Tooltip>
          </div>
        }
      >
        {/* Center: project selector + BCV control */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="tw-h-8 tw-gap-1 tw-text-sm tw-font-normal tw-max-w-[180px]"
              onClick={async () => {
                try {
                  await sendCommand('platformScriptureEditor.openScriptureEditor', undefined);
                } catch (e) {
                  logger.warn(`Error opening project selector: ${e}`);
                }
              }}
            >
              <span className="tw-truncate">Select Project</span>
              <ChevronDown className="tw-h-3.5 tw-w-3.5 tw-shrink-0 tw-opacity-50" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="tw-font-light">Open project</p>
          </TooltipContent>
        </Tooltip>
        <BookChapterControl
          scrRef={scrRef}
          handleSubmit={setScrRef}
          className="tw-w-80"
          recentSearches={recentScriptureRefs}
          onAddRecentSearch={addRecentScriptureRef}
        />
      </Toolbar>
    </TooltipProvider>
  );
}

export default SimpleModeToolbar;
