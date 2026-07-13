import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useTruncationTooltip,
} from 'platform-bible-react';
import { EllipsisVertical } from 'lucide-react';
import { formatReplacementString, LocalizedStringValue } from 'platform-bible-utils';
import { CSSProperties, ReactNode, useCallback, useState, type MouseEvent } from 'react';
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
export const COPY_KEY = '%webView_scriptureTextGrid_cell_copy%';
export const RESOURCE_CELL_STRING_KEYS = Object.freeze([
  UNAVAILABLE_KEY,
  LOADING_KEY,
  FAILED_KEY,
  EMPTY_KEY,
  ZOOM_IN_KEY,
  ZOOM_OUT_KEY,
  RESET_ZOOM_KEY,
  ZOOM_OPTIONS_KEY,
  COPY_KEY,
] as const);

type ResourceCellLocalizedStringKey = (typeof RESOURCE_CELL_STRING_KEYS)[number];
export type ResourceCellLocalizedStrings = {
  [key in ResourceCellLocalizedStringKey]?: LocalizedStringValue;
};

/** How the cell shows its resource name: a hanging inline label, or a header band. */
export type ResourceNameDisplay = 'inline' | 'header';

/** Localized copy for the zoom actions (the kebab dropdown and the right-click context menu). */
export type ZoomMenuLabels = { zoomIn: string; zoomOut: string; reset: string; options: string };


export type ResourceCellViewProps = {
  /** Which visual state to render; only `ready` shows the editor. */
  state: ResourceCellState;
  /** Resource label shown in the header band or inline label. */
  label: string;
  /** This resource's own text direction ('ltr' | 'rtl'), applied to the content area. */
  textDirection: string;
  /** Localized strings; import `RESOURCE_CELL_STRING_KEYS` to resolve them. */
  localizedStrings: ResourceCellLocalizedStrings;
  /** The editor rendered when `state` is `ready` (the connected cell supplies `Editorial`). */
  editor: ReactNode;
  /** When true (verse mode, slice empty), render the empty label instead of the editor. */
  isVerseEmpty?: boolean;
  /**
   * How to show the resource name. `'header'` (default) is a compact header line above the content,
   * used by chapter contexts (single-resource full-width + chapter-context split). `'inline'` hangs
   * the name at the resource's inline-start beside the verse text, used by verse-row cells. Both
   * render outside `Editorial` (paranext-core only).
   */
  nameDisplay?: ResourceNameDisplay;
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
 * The resource short-name/abbreviation, in the standout resource color (`tw:text-primary`). Single
 * line; a tooltip reveals the full name only when the text is actually clipped (same manual-`open`
 * pattern as the `ProjectRowView` row in `project-selector.component.tsx`). `aria-hidden` because
 * the enclosing gridcell already exposes the name via `aria-label`, so the visible copy is not
 * announced twice.
 */
function ResourceNameLabel({ label, className }: { label: string; className?: string }) {
  // Show the tooltip only when the label text is actually clipped (same manual-`open` pattern
  // shared with `ProjectRowView` in `project-selector.component.tsx`).
  const { ref, open, onPointerEnter, onPointerLeave } = useTruncationTooltip<HTMLSpanElement>();

  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <span
            ref={ref}
            aria-hidden
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            className={`tw:truncate tw:font-medium tw:text-primary ${className ?? ''}`}
          >
            {label}
          </span>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * Presentational ResourceCell: renders the resource name (inline label or header band), per-cell
 * text direction, and either the editor (`ready`) or the offline placeholder
 * (`downloading`/`failed`). Data-free so Storybook can drive every state; `ResourceCell` wraps it
 * with the PAPI fetch/direction/offline wiring.
 *
 * All role, focus, activation, and accessible-name concerns are handled by the parent verse
 * `listitem` in `ScriptureTextGrid` — this component is purely presentational. It adds only the
 * per-resource zoom surfaces (the header kebab dropdown and the right-click zoom/copy menu).
 */
export function ResourceCellView({
  state,
  label,
  textDirection,
  localizedStrings,
  editor,
  isVerseEmpty,
  nameDisplay = 'header',
  zoomFactor,
  canZoomIn = true,
  canZoomOut = true,
  canReset = true,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  zoomMenuLabels,
}: ResourceCellViewProps) {
  let readyContent: ReactNode = editor;
  if (isVerseEmpty) {
    readyContent = (
      <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:text-center">
        <span className="tw:text-sm tw:text-muted-foreground">{localizedStrings[EMPTY_KEY]}</span>
      </div>
    );
  }

  const stateContent =
    state === 'ready' ? (
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
    );

  const [rightClickMenuPos, setRightClickMenuPos] = useState<{ x: number; y: number } | undefined>(
    undefined,
  );
  const [selectedText, setSelectedText] = useState('');

  const handleCellContextMenu = useCallback(
    (event: MouseEvent) => {
      if (!zoomMenuLabels) return; // no zoom controller → allow default behavior
      // The editor owns `contextmenu` over its content, and its built-in menu clips and cannot flip
      // near the viewport edge. Intercept in the capture phase (before the editor's handler) and open
      // our own portaled, collision-aware menu at the cursor instead.
      event.preventDefault();
      event.stopPropagation();
      // Capture selection now — focus moves to the menu when it opens, which clears the DOM
      // selection, so we must grab it before setRightClickMenuPos triggers the re-render.
      const selection = window.getSelection()?.toString().trim() ?? '';
      setSelectedText(selection);
      setRightClickMenuPos({ x: event.clientX, y: event.clientY });
    },
    [zoomMenuLabels],
  );

  // Format the kebab aria-label with the resource name (the template uses {resourceName}).
  const zoomOptionsAriaLabel = zoomMenuLabels
    ? formatReplacementString(zoomMenuLabels.options, { resourceName: label })
    : undefined;

  const contentStyle: CSSProperties | undefined =
    zoomFactor !== undefined && zoomFactor !== 1 ? { zoom: zoomFactor } : undefined;

  return (
    <div
      onContextMenuCapture={zoomMenuLabels ? handleCellContextMenu : undefined}
      // `group` powers the hover/focus-visible kebab reveal. Activation (opening the chapter split)
      // is owned by the parent verse `listitem` in ScriptureTextGrid — this cell is presentational.
      className="tw:group tw:flex tw:min-w-0 tw:flex-col"
    >
      {nameDisplay === 'inline' ? (
        // Verse-row cell: hang the name at the inline-start beside the verse text. `dir` on the row
        // makes flex place the name on the resource's own inline-start (right in RTL). The name is a
        // shrink-0, width-capped column; the verse text flows and scrolls in the remaining min-w-0
        // column, so the hanging name stays pinned even when the verse overflows. Only the verse
        // text scales with zoom; the hanging name keeps a fixed size (as in header mode).
        <div className="tw:flex tw:flex-1 tw:flex-row tw:gap-2 tw:p-2" dir={textDirection}>
          <ResourceNameLabel label={label} className="tw:max-w-24 tw:shrink-0 tw:text-sm" />
          <div className="tw:min-w-0 tw:flex-1 tw:overflow-auto" style={contentStyle}>
            {stateContent}
          </div>
        </div>
      ) : (
        // Chapter context: a compact header line (colored name with a bottom border) with the zoom
        // kebab at its inline-end, above the content. Long labels truncate; the tooltip reveals the
        // full name only when actually clipped. Only the content scales with zoom, not the header.
        <>
          <div className="tw:flex tw:items-center tw:gap-1 tw:border-b tw:px-2 tw:py-0.5">
            <ResourceNameLabel label={label} className="tw:min-w-0 tw:flex-1 tw:text-xs" />
            {zoomMenuLabels ? (
              <TooltipProvider>
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={zoomOptionsAriaLabel}
                          // Stop the click from bubbling to the parent verse `listitem`, whose click
                          // handler opens the chapter-context split. Radix opens the dropdown on
                          // pointerdown, so this does not prevent the menu from opening — it only
                          // prevents the chapter-context panel from opening simultaneously.
                          onClick={(e) => e.stopPropagation()}
                          // Hidden until hover/focus for pointer users; always visible on touch
                          // (`hover: none`) where there is no hover to reveal it.
                          className="tw:h-6 tw:w-6 tw:shrink-0 tw:opacity-0 tw:group-hover:opacity-100 tw:group-focus-within:opacity-100 tw:focus-visible:opacity-100 tw:[@media(hover:none)]:opacity-100"
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
              </TooltipProvider>
            ) : undefined}
          </div>
          <div
            className="tw:flex-1 tw:overflow-auto tw:p-2"
            style={contentStyle}
            dir={textDirection}
          >
            {stateContent}
          </div>
        </>
      )}
      {zoomMenuLabels ? (
        <DropdownMenu
          open={rightClickMenuPos !== undefined}
          onOpenChange={(open) => {
            if (!open) setRightClickMenuPos(undefined);
          }}
        >
          {/* Zero-size fixed anchor at the cursor; Radix positions + collision-flips the menu from here. */}
          <DropdownMenuTrigger asChild>
            <span
              aria-hidden="true"
              className="tw:pointer-events-none tw:fixed tw:h-0 tw:w-0"
              style={{ left: rightClickMenuPos?.x ?? 0, top: rightClickMenuPos?.y ?? 0 }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              disabled={!selectedText}
              onSelect={() => {
                if (selectedText) navigator.clipboard?.writeText(selectedText).catch(() => {});
              }}
            >
              {localizedStrings[COPY_KEY]}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
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
  );
}

export default ResourceCellView;
