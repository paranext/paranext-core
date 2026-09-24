import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  ContentZoomRoot,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useTruncationTooltip,
} from 'platform-bible-react';
import { EllipsisVertical, GripVertical } from 'lucide-react';
import { formatReplacementString } from 'platform-bible-utils';
import { ReactNode, useCallback, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { ResourceCellState } from './resource-cell.utils';
import {
  BOOK_NOT_AVAILABLE_KEY,
  COPY_KEY,
  EMPTY_KEY,
  FAILED_KEY,
  LOADING_KEY,
  NOT_INSTALLED_KEY,
  UNAVAILABLE_KEY,
  type ResourceCellLocalizedStrings,
} from './resource-cell.const';

// Re-exported from `resource-cell.const.ts` so importers keep reading these from the component while
// a node-environment test can import the key list without a DOM.
export {
  UNAVAILABLE_KEY,
  NOT_INSTALLED_KEY,
  LOADING_KEY,
  FAILED_KEY,
  BOOK_NOT_AVAILABLE_KEY,
  EMPTY_KEY,
  ZOOM_IN_KEY,
  ZOOM_OUT_KEY,
  RESET_ZOOM_KEY,
  ZOOM_OPTIONS_KEY,
  COPY_KEY,
  RESOURCE_CELL_STRING_KEYS,
  type ResourceCellLocalizedStrings,
} from './resource-cell.const';

/** How the cell shows its resource name: a hanging inline label, or a header band. */
export type ResourceNameDisplay = 'inline' | 'header';

/** Localized copy for the zoom actions (the "⋮" dropdown and the right-click context menu). */
export type ZoomMenuLabels = { zoomIn: string; zoomOut: string; reset: string; options: string };

export type ResourceCellViewProps = {
  /** Which visual state to render; only `ready` shows the editor. */
  state: ResourceCellState;
  /** Resource label shown in the header band or inline label. */
  label: string;
  /**
   * Content zoom area this resource's text belongs to — `resource-<id>`, or the pane-wide
   * `text-collection` for an id that yields none. Both layouts mark their text with it, labelled
   * with `label` for the zoom indicator; a resource's verse row and chapter view share it.
   */
  zoomArea: string;
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
  /** False when the resource's level is at MAX_ZOOM_FACTOR. */
  canZoomIn?: boolean;
  /** False when the resource's level is at MIN_ZOOM_FACTOR. */
  canZoomOut?: boolean;
  /**
   * False while the resource has no zoom level of its own, so Reset would change nothing. Defaults
   * to true.
   */
  canReset?: boolean;
  /** Zoom action callbacks; invoked by the "⋮" dropdown and the right-click menu. */
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetZoom?: () => void;
  /** Localized menu copy; when omitted the zoom items and the "⋮" button are not rendered. */
  zoomMenuLabels?: ZoomMenuLabels;
  /**
   * When true, show a focusable reorder-handle grip in the header (reorder logic lives in the
   * parent). The grip is drag-and-drop source presentation AND a keyboard-operable control.
   */
  showDragHandle?: boolean;
  /** Stable id of this resource, exposed on the grip so the parent can restore focus after a move. */
  reorderHandleId?: string;
  /** Accessible name for the reorder grip (e.g. "Reorder Genesis"); used as its `aria-label`. */
  reorderHandleLabel?: string;
  /** Tooltip text shown on grip hover/focus (e.g. "Drag or press arrow keys to reorder"). */
  reorderHint?: string;
  /** Keydown handler for the grip; the parent owns the arrow-key reorder logic. */
  onReorderKeyDown?: (event: KeyboardEvent) => void;
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
 * Compile-time exhaustiveness check for the cell-state chain below: every state that does NOT
 * render a placeholder must be `'ready'`. Adding a `ResourceCellState` member without giving it a
 * branch fails to compile here instead of silently rendering "Download failed".
 *
 * @param state The only state left unhandled by the chain.
 * @returns The same state, so the check is an ordinary expression rather than an unused binding.
 */
function assertStateIsReady(state: 'ready'): 'ready' {
  return state;
}

/**
 * The resource short-name/abbreviation, in the standout resource color (`tw:text-primary`). Single
 * line; a tooltip reveals the full name only when the text is actually clipped (same manual-`open`
 * pattern as the `ProjectRowView` row in `project-selector.component.tsx`). `aria-hidden` because
 * the enclosing `role="listitem"` (`scripture-text-grid.component.tsx`) already exposes the name
 * via `aria-label`, so the visible copy is not announced twice.
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
 * text direction, and either the editor (`ready`) or the unavailable placeholder
 * (`downloading`/`failed`/`unavailable`). Data-free so Storybook can drive every state;
 * `ResourceCell` wraps it with the PAPI fetch/direction/availability wiring.
 *
 * All role, focus, activation, and accessible-name concerns are handled by the parent verse
 * `listitem` in `ScriptureTextGrid` — this component is purely presentational. It adds only the
 * resource's zoom surfaces (the header's "⋮" dropdown and the right-click Copy and zoom menu) and
 * the drag/keyboard reorder handle grip. The cell text is marked as the resource's own content-zoom
 * area (`zoomArea`), named with the resource label for the zoom indicator; the scroll box around it
 * stays unmarked, so its scrollbar and padding keep interface size.
 */
export function ResourceCellView({
  state,
  label,
  zoomArea,
  textDirection,
  localizedStrings,
  editor,
  isVerseEmpty,
  nameDisplay = 'header',
  canZoomIn = true,
  canZoomOut = true,
  canReset = true,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  zoomMenuLabels,
  showDragHandle,
  reorderHandleId,
  reorderHandleLabel,
  reorderHint,
  onReorderKeyDown,
}: ResourceCellViewProps) {
  let readyContent: ReactNode = editor;
  if (isVerseEmpty) {
    readyContent = (
      <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:text-center">
        <span className="tw:text-sm tw:text-muted-foreground">{localizedStrings[EMPTY_KEY]}</span>
      </div>
    );
  }

  let unavailableContent: ReactNode;
  if (state === 'downloading') {
    unavailableContent = (
      <>
        <Spinner />
        <span className="tw:text-sm tw:text-muted-foreground">{localizedStrings[LOADING_KEY]}</span>
      </>
    );
  } else if (state === 'unavailable') {
    unavailableContent = (
      <span className="tw:font-medium">{localizedStrings[NOT_INSTALLED_KEY]}</span>
    );
  } else if (state === 'bookNotAvailable') {
    // No "Resource unavailable" heading and no retry wording: the resource is present and working,
    // it simply has no such book.
    unavailableContent = (
      <span className="tw:text-sm tw:text-muted-foreground">
        {localizedStrings[BOOK_NOT_AVAILABLE_KEY]}
      </span>
    );
  } else if (state === 'failed') {
    unavailableContent = (
      <>
        <span className="tw:font-medium">{localizedStrings[UNAVAILABLE_KEY]}</span>
        <span className="tw:text-sm tw:text-muted-foreground">{localizedStrings[FAILED_KEY]}</span>
      </>
    );
  } else {
    // Only `'ready'` is left, and it renders `readyContent` below rather than this. Testing
    // `'failed'` explicitly instead of letting it be the fallthrough is what makes a future
    // `ResourceCellState` member a type error here rather than a cell silently telling the user to
    // retry a download that may have succeeded.
    assertStateIsReady(state);
  }

  const stateContent =
    state === 'ready' ? (
      readyContent
    ) : (
      <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-2 tw:text-center">
        {unavailableContent}
      </div>
    );

  const [rightClickMenuPos, setRightClickMenuPos] = useState<{ x: number; y: number } | undefined>(
    undefined,
  );
  const [selectedText, setSelectedText] = useState('');

  // A resource that is not installed shows only a placeholder, so there is nothing to copy and the
  // browser's own menu is left alone there.
  const hasRightClickMenu = state !== 'unavailable';

  const handleCellContextMenu = useCallback((event: MouseEvent) => {
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
  }, []);

  // Format the "⋮" aria-label with the resource name (the template uses {resourceName}).
  const zoomOptionsAriaLabel = zoomMenuLabels
    ? formatReplacementString(zoomMenuLabels.options, { resourceName: label })
    : undefined;

  return (
    <div
      onContextMenuCapture={hasRightClickMenu ? handleCellContextMenu : undefined}
      // `group` powers the hover/focus-within reveal of the "⋮" button. Activation (opening the
      // chapter split) is owned by the parent verse `listitem` in ScriptureTextGrid — this cell is
      // presentational.
      className="tw:group tw:flex tw:min-w-0 tw:flex-col"
    >
      {nameDisplay === 'inline' ? (
        // Verse-row cell: hang the name at the inline-start beside the verse text. `dir` on the row
        // makes flex place the name on the resource's own inline-start (right in RTL). The name is a
        // width-capped column (max-w-24) that can shrink (min-w-0, not shrink-0) so its truncation
        // "…" stays at the visible edge in a narrow pane; the verse text flows and scrolls in the
        // remaining min-w-0 column. Only the verse text scales with zoom; the hanging name is fixed.
        <div className="tw:flex tw:flex-1 tw:flex-row tw:gap-2 tw:p-2" dir={textDirection}>
          <ResourceNameLabel label={label} className="tw:max-w-24 tw:min-w-0 tw:text-sm" />
          <div className="tw:min-w-0 tw:flex-1 tw:overflow-auto">
            <ContentZoomRoot area={zoomArea} label={label}>
              {stateContent}
            </ContentZoomRoot>
          </div>
        </div>
      ) : (
        // Chapter context: a compact header line (colored name with a bottom border) with the
        // optional reorder grip at its inline-start and the "⋮" zoom options button at its
        // inline-end, above the content. Long labels truncate; the tooltip reveals the full name
        // only when actually clipped. Only the content scales with zoom, not the header.
        <>
          <div className="tw:flex tw:items-center tw:gap-1 tw:border-b tw:px-2 tw:py-0.5">
            {showDragHandle ? (
              // Nested tooltip on the grip so `reorderHint` shows on hover AND keyboard focus.
              // Its own provider/tooltip keeps it independent of the name-truncation tooltip.
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      data-reorder-handle-id={reorderHandleId}
                      aria-label={reorderHandleLabel}
                      // A grip click must not bubble to the enclosing cell wrapper (whose click
                      // may activate the chapter-context split); the grip only starts a reorder.
                      onClick={(event) => event.stopPropagation()}
                      onKeyDown={onReorderKeyDown}
                      className="tw:h-6 tw:w-6 tw:shrink-0 tw:cursor-grab tw:text-muted-foreground"
                    >
                      <GripVertical className="tw:h-4 tw:w-4" />
                    </Button>
                  </TooltipTrigger>
                  {reorderHint ? <TooltipContent>{reorderHint}</TooltipContent> : undefined}
                </Tooltip>
              </TooltipProvider>
            ) : undefined}
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
                          // Keep the click from reaching an enclosing click handler. Radix opens the
                          // dropdown on pointerdown, so the menu still opens.
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
          <div className="tw:flex-1 tw:overflow-auto" dir={textDirection}>
            <div className="tw:p-2">
              <ContentZoomRoot area={zoomArea} label={label}>
                {stateContent}
              </ContentZoomRoot>
            </div>
          </div>
        </>
      )}
      {hasRightClickMenu ? (
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
          <DropdownMenuContent
            // The menu is portaled out of the cell's DOM, but React still bubbles its synthetic
            // events through the component tree, so a click on an item, or Enter/Space choosing one,
            // would reach the verse `listitem` around this cell and open that row's chapter panel
            // (the same reason `book-chapter-control.component.tsx` stops keys on its portaled
            // popover). Only Enter and Space are stopped, so the zoom chords still reach the pane's
            // own key handling while the menu is open; Radix handles Escape on the document.
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') event.stopPropagation();
            }}
          >
            <DropdownMenuItem
              disabled={!selectedText}
              onSelect={() => {
                if (selectedText) navigator.clipboard?.writeText(selectedText).catch(() => {});
              }}
            >
              {localizedStrings[COPY_KEY]}
            </DropdownMenuItem>
            {zoomMenuLabels ? (
              <>
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
              </>
            ) : undefined}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : undefined}
    </div>
  );
}

export default ResourceCellView;
