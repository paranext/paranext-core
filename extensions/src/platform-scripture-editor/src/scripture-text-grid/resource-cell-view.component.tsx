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
import { EllipsisVertical, GripVertical } from 'lucide-react';
import { formatReplacementString } from 'platform-bible-utils';
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
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
  /**
   * Verse mode only. When provided, the name becomes the row's disclosure control for its
   * chapter-context panel: it takes the accessible name, the tab stop, and `aria-expanded`. Omit it
   * and the name stays a presentational `aria-hidden` label.
   */
  onDisclosureActivate?: () => void;
  /** Accessible name for the disclosure control (e.g. "WEB, MAT 5:3"). */
  disclosureAccessibleName?: string;
  /** Whether this row's chapter-context panel is currently open. */
  isDisclosureExpanded?: boolean;
  /** Id of the chapter-context panel, for the control's `aria-controls` while it is open. */
  disclosureControlsId?: string;
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
 * The verse row's name, rendered as the disclosure control for that row's chapter-context panel.
 *
 * It is a sibling of the verse content rather than a wrapper around it: the row already contains
 * interactive descendants (the reorder grip, and the editor's contenteditable surface), and a
 * control that enclosed them would nest interactive content inside a button. So the name is the
 * accessible control and the row's own click handler is a pointer-only convenience on top of it.
 */
function ResourceNameDisclosure({
  label,
  accessibleName,
  isExpanded,
  controlsId,
  onActivate,
  className,
}: {
  label: string;
  accessibleName: string;
  isExpanded: boolean;
  controlsId?: string;
  onActivate: () => void;
  className?: string;
}) {
  const { ref, open, onPointerEnter, onPointerLeave } = useTruncationTooltip<HTMLButtonElement>();

  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <button
            ref={ref}
            type="button"
            // Marks this as the row's focus target for the grid's focus-restore effects, which must
            // not land on the reorder grip or the zoom kebab.
            data-disclosure-control=""
            aria-label={accessibleName}
            aria-expanded={isExpanded}
            // Only while the panel exists: a dangling idref is an ARIA error.
            aria-controls={isExpanded ? controlsId : undefined}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            // The enclosing row also toggles on click; without this the pair would double-toggle.
            onClick={(event) => {
              event.stopPropagation();
              onActivate();
            }}
            className={`tw:truncate tw:text-start tw:font-medium tw:text-primary tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring ${className ?? ''}`}
          >
            {label}
          </button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

type ReorderGripProps = {
  /** Stable id of this resource; the parent restores focus by querying for this attribute. */
  reorderHandleId?: string;
  /** Accessible name for the grip (e.g. "Reorder Genesis"). */
  reorderHandleLabel?: string;
  /** Tooltip text shown on hover and keyboard focus. */
  reorderHint?: string;
  /** Keydown handler; the parent owns the arrow-key reorder logic. */
  onReorderKeyDown?: (event: KeyboardEvent) => void;
  /** Placement and reveal classes, which differ between the header band and the verse row. */
  className?: string;
};

/**
 * The drag/keyboard reorder grip. Shared by both name displays so the two cannot drift: verse rows
 * and chapter headers get the same control, differing only in where it sits and when it is
 * revealed.
 */
function ReorderGrip({
  reorderHandleId,
  reorderHandleLabel,
  reorderHint,
  onReorderKeyDown,
  className,
}: ReorderGripProps) {
  return (
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
            className={className}
          >
            <GripVertical className="tw:h-4 tw:w-4" />
          </Button>
        </TooltipTrigger>
        {reorderHint ? <TooltipContent>{reorderHint}</TooltipContent> : undefined}
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
 * per-resource zoom surfaces (the header kebab dropdown and the right-click zoom/copy menu) and the
 * drag/keyboard reorder handle grip.
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
  showDragHandle,
  reorderHandleId,
  reorderHandleLabel,
  reorderHint,
  onReorderKeyDown,
  onDisclosureActivate,
  disclosureAccessibleName,
  isDisclosureExpanded = false,
  disclosureControlsId,
}: ResourceCellViewProps) {
  // Centered placeholders have no line boxes for the verse row's float exclusion to shorten, so the
  // out-of-flow name would paint over them. Reserve the same width with padding instead.
  const placeholderReserve = nameDisplay === 'inline' ? ' stg-verse-name-reserve' : '';

  let readyContent: ReactNode = editor;
  if (isVerseEmpty) {
    readyContent = (
      <div
        className={`tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:text-center${placeholderReserve}`}
      >
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
      <div
        className={`tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-2 tw:text-center${placeholderReserve}`}
      >
        {unavailableContent}
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

  // The verse row publishes its zoom factor to CSS so the float exclusion inside the zoomed subtree
  // can divide by it and still reserve the same device pixels as the unzoomed name beside it.
  // React.CSSProperties has no index signature for custom properties; widening the declared type
  // here (rather than asserting at the use site) keeps this free of type assertions.
  const rowStyle: CSSProperties & Record<`--${string}`, string | number> = {
    '--stg-zoom': zoomFactor ?? 1,
  };

  return (
    <div
      onContextMenuCapture={zoomMenuLabels ? handleCellContextMenu : undefined}
      // `group` powers the hover/focus-visible kebab reveal. Activation (opening the chapter split)
      // is owned by the parent verse `listitem` in ScriptureTextGrid — this cell is presentational.
      className="tw:group tw:flex tw:min-w-0 tw:flex-col"
    >
      {nameDisplay === 'inline' ? (
        // Verse-row cell: the name is a fixed-width label taken out of flow at the row's
        // inline-start, and `.editor-input::before` (see _scripture-text-grid-verse.scss) is a float
        // of the same width inside the editor's own block flow. Line 1 starts after the name; line
        // 2+ tuck under it at the flush edge — the PT9 shape, which a two-column split cannot
        // produce. The width is fixed rather than capped so rows align with each other whatever the
        // name's length, and the label sits outside the zoomed subtree so a zoomed row still aligns
        // with its neighbours; the exclusion inside divides by --stg-zoom to compensate. `dir` on
        // the row resolves every inline-start against the resource's own direction.
        <div
          className="stg-verse-row tw:relative tw:flex tw:flex-1 tw:flex-col"
          dir={textDirection}
          style={rowStyle}
        >
          {onDisclosureActivate ? (
            <ResourceNameDisclosure
              label={label}
              accessibleName={disclosureAccessibleName ?? label}
              isExpanded={isDisclosureExpanded}
              controlsId={disclosureControlsId}
              onActivate={onDisclosureActivate}
              className="stg-verse-name tw:absolute tw:text-sm"
            />
          ) : (
            <ResourceNameLabel label={label} className="stg-verse-name tw:absolute tw:text-sm" />
          )}
          {showDragHandle ? (
            // Pinned at the inline-end of the already-reserved name area, so it costs no row width
            // and never overlays verse text. Hidden until hover/focus for pointer users; always
            // visible on touch (`hover: none`) where there is no hover to reveal it.
            <ReorderGrip
              reorderHandleId={reorderHandleId}
              reorderHandleLabel={reorderHandleLabel}
              reorderHint={reorderHint}
              onReorderKeyDown={onReorderKeyDown}
              className="stg-verse-grip tw:absolute tw:h-6 tw:w-6 tw:shrink-0 tw:cursor-grab tw:text-muted-foreground tw:opacity-0 tw:group-hover:opacity-100 tw:group-focus-within:opacity-100 tw:focus-visible:opacity-100 tw:[@media(hover:none)]:opacity-100"
            />
          ) : undefined}
          <div
            className="stg-verse-content tw:min-w-0 tw:flex-1 tw:overflow-auto"
            style={contentStyle}
          >
            {stateContent}
          </div>
        </div>
      ) : (
        // Chapter context: a compact header line (colored name with a bottom border) with the zoom
        // kebab and optional reorder grip at its inline-end, above the content. Long labels
        // truncate; the tooltip reveals the full name only when actually clipped. Only the content
        // scales with zoom, not the header.
        <>
          <div className="tw:flex tw:items-center tw:gap-1 tw:border-b tw:px-2 tw:py-0.5">
            {showDragHandle ? (
              <ReorderGrip
                reorderHandleId={reorderHandleId}
                reorderHandleLabel={reorderHandleLabel}
                reorderHint={reorderHint}
                onReorderKeyDown={onReorderKeyDown}
                className="tw:h-6 tw:w-6 tw:shrink-0 tw:cursor-grab tw:text-muted-foreground"
              />
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
          <div className="tw:flex-1 tw:overflow-auto" style={contentStyle} dir={textDirection}>
            <div className="tw:p-2">{stateContent}</div>
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
