import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { EllipsisVertical } from 'lucide-react';
import { formatReplacementString, LocalizedStringValue } from 'platform-bible-utils';
import { CSSProperties, ReactNode, useCallback, useRef, useState, type KeyboardEvent } from 'react';
import { ResourceCellState } from './resource-cell.utils';

/**
 * Localization keys for the ResourceCell offline states. Import to resolve them via
 * `useLocalizedStrings` (in the app) or `getLocalizedStrings` (in Storybook).
 */
export const UNAVAILABLE_KEY = '%webView_scriptureTextGrid_cell_unavailable%';
export const LOADING_KEY = '%webView_scriptureTextGrid_cell_status_loading%';
export const FAILED_KEY = '%webView_scriptureTextGrid_cell_status_failed%';
export const EMPTY_KEY = '%webView_scriptureTextGrid_cell_verse_empty%';
export const ZOOM_IN_KEY = '%webView_scriptureTextGrid_cell_zoomIn%';
export const ZOOM_OUT_KEY = '%webView_scriptureTextGrid_cell_zoomOut%';
export const RESET_ZOOM_KEY = '%webView_scriptureTextGrid_cell_resetZoom%';
export const ZOOM_OPTIONS_KEY = '%webView_scriptureTextGrid_cell_zoomOptions%';
export const RESOURCE_CELL_STRING_KEYS = Object.freeze([
  UNAVAILABLE_KEY,
  LOADING_KEY,
  FAILED_KEY,
  EMPTY_KEY,
  ZOOM_IN_KEY,
  ZOOM_OUT_KEY,
  RESET_ZOOM_KEY,
  ZOOM_OPTIONS_KEY,
] as const);

type ResourceCellLocalizedStringKey = (typeof RESOURCE_CELL_STRING_KEYS)[number];
export type ResourceCellLocalizedStrings = {
  [key in ResourceCellLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Localized copy for the zoom actions (the kebab dropdown here, and the editor's right-click
 * context menu wired in `ResourceCell`).
 */
export type ZoomMenuLabels = { zoomIn: string; zoomOut: string; reset: string; options: string };

export type ResourceCellViewProps = {
  /** Which visual state to render; only `ready` shows the editor. */
  state: ResourceCellState;
  /** Resource label shown in the header and used as the gridcell aria-label. */
  label: string;
  /** This resource's own text direction ('ltr' | 'rtl'), applied to the content area. */
  textDirection: string;
  /** Localized strings; import `RESOURCE_CELL_STRING_KEYS` to resolve them. */
  localizedStrings: ResourceCellLocalizedStrings;
  /** The editor rendered when `state` is `ready` (the connected cell supplies `Editorial`). */
  editor: ReactNode;
  /** When true (verse mode, slice empty), render the empty label instead of the editor. */
  isVerseEmpty?: boolean;
  /** Fired on click anywhere in the cell or Enter while the gridcell is focused. */
  onActivate?: () => void;
  /** Current zoom factor for this resource (1 = default). */
  zoomFactor?: number;
  /** False when the factor is at MAX_ZOOM_FACTOR. */
  canZoomIn?: boolean;
  /** False when the factor is at MIN_ZOOM_FACTOR. */
  canZoomOut?: boolean;
  /** False when the factor is already at the default (1). Defaults to true. */
  canReset?: boolean;
  /** Zoom action callbacks; invoked by the kebab dropdown. */
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetZoom?: () => void;
  /** Localized menu copy; when omitted the zoom surfaces are not rendered. */
  zoomMenuLabels?: ZoomMenuLabels;
};

function ZoomItemsShared({
  labels,
  canZoomIn,
  canZoomOut,
  canReset = true,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}: {
  labels: ZoomMenuLabels;
  canZoomIn: boolean;
  canZoomOut: boolean;
  canReset?: boolean;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetZoom?: () => void;
}) {
  return (
    <>
      <DropdownMenuItem disabled={!canZoomIn} onSelect={onZoomIn}>
        {labels.zoomIn}
      </DropdownMenuItem>
      <DropdownMenuItem disabled={!canZoomOut} onSelect={onZoomOut}>
        {labels.zoomOut}
      </DropdownMenuItem>
      <DropdownMenuItem disabled={!canReset} onSelect={onResetZoom}>
        {labels.reset}
      </DropdownMenuItem>
    </>
  );
}

/**
 * Presentational ResourceCell: renders the header, per-cell text direction, and either the editor
 * (`ready`) or the offline placeholder (`downloading`/`failed`). Data-free so Storybook can drive
 * every state; `ResourceCell` wraps it with the PAPI fetch/direction/offline wiring.
 */
export function ResourceCellView({
  state,
  label,
  textDirection,
  localizedStrings,
  editor,
  isVerseEmpty,
  onActivate,
  zoomFactor,
  canZoomIn = true,
  canZoomOut = true,
  canReset = true,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  zoomMenuLabels,
}: ResourceCellViewProps) {
  // The tooltip only repeats the visible label, so it should show only when the label is actually
  // truncated. Radix's auto-detection cannot know that, so control `open` manually and measure the
  // header on pointer enter (same pattern as `ProjectRowView` in platform-bible-react).
  const [isHeaderTooltipOpen, setIsHeaderTooltipOpen] = useState(false);
  // React's ref API requires `null` as the initial value for DOM refs.
  // eslint-disable-next-line no-null/no-null
  const headerRef = useRef<HTMLDivElement>(null);

  const handleHeaderPointerEnter = useCallback(() => {
    const headerElement = headerRef.current;
    if (!headerElement) return;
    if (headerElement.scrollWidth > headerElement.clientWidth) setIsHeaderTooltipOpen(true);
  }, []);

  let readyContent: ReactNode = editor;
  if (isVerseEmpty) {
    readyContent = (
      <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:text-center">
        <span className="tw:text-sm tw:text-muted-foreground">{localizedStrings[EMPTY_KEY]}</span>
      </div>
    );
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onActivate?.();
      }
    },
    [onActivate],
  );

  // Format the kebab aria-label with the resource name (the template uses {resourceName}).
  const zoomOptionsAriaLabel = zoomMenuLabels
    ? formatReplacementString(zoomMenuLabels.options, { resourceName: label })
    : undefined;

  const contentStyle: CSSProperties | undefined =
    zoomFactor !== undefined && zoomFactor !== 1 ? { zoom: zoomFactor } : undefined;

  const gridcell = (
    <div
      role="gridcell"
      aria-label={label}
      tabIndex={onActivate ? 0 : undefined}
      onKeyDown={onActivate ? handleKeyDown : undefined}
      onClick={onActivate}
      // `group` powers the hover/focus-visible kebab; `cursor-pointer` signals the cell opens the
      // chapter-context split (only when activation is wired).
      className={`tw:group tw:flex tw:min-w-0 tw:flex-col ${onActivate ? 'tw:cursor-pointer' : ''}`}
    >
      <TooltipProvider>
        <Tooltip open={isHeaderTooltipOpen}>
          <div className="tw:flex tw:items-center tw:gap-1 tw:border-b tw:px-2 tw:py-1">
            <TooltipTrigger asChild>
              <div
                ref={headerRef}
                onPointerEnter={handleHeaderPointerEnter}
                onPointerLeave={() => setIsHeaderTooltipOpen(false)}
                className="tw:min-w-0 tw:flex-1 tw:truncate tw:text-sm tw:font-medium"
              >
                {label}
              </div>
            </TooltipTrigger>
            {zoomMenuLabels ? (
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={zoomOptionsAriaLabel}
                        // Stop the click from bubbling to the gridcell's `onActivate` handler.
                        // Radix opens the dropdown on pointerdown, so this does not prevent the
                        // menu from opening — it only prevents the chapter-context panel from
                        // opening simultaneously.
                        onClick={(e) => e.stopPropagation()}
                        // Hidden until hover/focus for pointer users; always visible on touch
                        // (`hover: none`) where there is no hover to reveal it.
                        className="tw:h-6 tw:w-6 tw:shrink-0 tw:opacity-0 tw:group-hover:opacity-100 tw:group-focus-within:opacity-100 tw:[@media(hover:none)]:opacity-100"
                      >
                        <EllipsisVertical className="tw:h-4 tw:w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>{zoomOptionsAriaLabel}</TooltipContent>
                </Tooltip>
                <DropdownMenuContent>
                  <ZoomItemsShared
                    labels={zoomMenuLabels}
                    canZoomIn={canZoomIn}
                    canZoomOut={canZoomOut}
                    canReset={canReset}
                    onZoomIn={onZoomIn}
                    onZoomOut={onZoomOut}
                    onResetZoom={onResetZoom}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : undefined}
          </div>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="tw:flex-1 tw:overflow-auto tw:p-2" style={contentStyle} dir={textDirection}>
        {state === 'ready' ? (
          readyContent
        ) : (
          <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-2 tw:text-center">
            {state === 'downloading' ? (
              <>
                <Spinner />
                <span className="tw:text-sm tw:text-muted-foreground">
                  {localizedStrings[LOADING_KEY]}
                </span>
              </>
            ) : (
              <>
                <span className="tw:font-medium">{localizedStrings[UNAVAILABLE_KEY]}</span>
                <span className="tw:text-sm tw:text-muted-foreground">
                  {localizedStrings[FAILED_KEY]}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return gridcell;
}

export default ResourceCellView;
