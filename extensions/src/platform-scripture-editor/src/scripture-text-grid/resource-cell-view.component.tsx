import {
  Button,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { LocalizedStringValue } from 'platform-bible-utils';
import { GripVertical } from 'lucide-react';
import { ReactNode, useCallback, useRef, useState, type KeyboardEvent } from 'react';
import { ResourceCellState } from './resource-cell.utils';

/**
 * Localization keys for the ResourceCell offline states. Import to resolve them via
 * `useLocalizedStrings` (in the app) or `getLocalizedStrings` (in Storybook).
 */
export const UNAVAILABLE_KEY = '%webView_scriptureTextGrid_cell_unavailable%';
export const DOWNLOADING_KEY = '%webView_scriptureTextGrid_cell_status_downloading%';
export const FAILED_KEY = '%webView_scriptureTextGrid_cell_status_failed%';
export const EMPTY_KEY = '%webView_scriptureTextGrid_cell_verse_empty%';
export const RESOURCE_CELL_STRING_KEYS = Object.freeze([
  UNAVAILABLE_KEY,
  DOWNLOADING_KEY,
  FAILED_KEY,
  EMPTY_KEY,
] as const);

type ResourceCellLocalizedStringKey = (typeof RESOURCE_CELL_STRING_KEYS)[number];
export type ResourceCellLocalizedStrings = {
  [key in ResourceCellLocalizedStringKey]?: LocalizedStringValue;
};

export type ResourceCellViewProps = {
  /** Which visual state to render; only `ready` shows the editor. */
  state: ResourceCellState;
  /** Resource label shown in the header. */
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

/**
 * Presentational ResourceCell: renders the header, per-cell text direction, and either the editor
 * (`ready`) or the offline placeholder (`downloading`/`failed`). Data-free so Storybook can drive
 * every state; `ResourceCell` wraps it with the PAPI fetch/direction/offline wiring.
 *
 * All role, focus, activation, and accessible-name concerns are handled by the parent verse
 * `listitem` in `ScriptureTextGrid` — this component is purely presentational.
 */
export function ResourceCellView({
  state,
  label,
  textDirection,
  localizedStrings,
  editor,
  isVerseEmpty,
  showDragHandle,
  reorderHandleId,
  reorderHandleLabel,
  reorderHint,
  onReorderKeyDown,
}: ResourceCellViewProps) {
  // The tooltip only repeats the visible label, so it should show only when the label is actually
  // truncated. Radix's auto-detection cannot know that, so control `open` manually and measure the
  // label span on pointer enter (same pattern as `ProjectRowView` in platform-bible-react).
  const [isHeaderTooltipOpen, setIsHeaderTooltipOpen] = useState(false);
  // React's ref API requires `null` as the initial value for DOM refs.
  // eslint-disable-next-line no-null/no-null
  const headerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line no-null/no-null
  const labelRef = useRef<HTMLSpanElement>(null);

  const handleHeaderPointerEnter = useCallback(() => {
    // Measure the label span (not the flex-row header div) so the grip icon doesn't false-trigger.
    const labelElement = labelRef.current;
    if (!labelElement) return;
    if (labelElement.scrollWidth > labelElement.clientWidth) setIsHeaderTooltipOpen(true);
  }, []);

  let readyContent: ReactNode = editor;
  if (isVerseEmpty) {
    readyContent = (
      <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:text-center">
        <span className="tw:text-sm tw:text-muted-foreground">{localizedStrings[EMPTY_KEY]}</span>
      </div>
    );
  }

  return (
    <div className="tw:flex tw:min-w-0 tw:flex-col">
      <TooltipProvider>
        <Tooltip open={isHeaderTooltipOpen}>
          <TooltipTrigger asChild>
            {/* Single-line header; long labels truncate. The tooltip reveals the full name and
                shows only when the label is actually clipped. The grip (when shown) is a real
                focusable, labeled control: it is the drag source presentation AND is operable by
                keyboard (arrow keys, handled by the parent). */}
            <div
              ref={headerRef}
              onPointerEnter={handleHeaderPointerEnter}
              onPointerLeave={() => setIsHeaderTooltipOpen(false)}
              className="tw:flex tw:items-center tw:gap-1 tw:border-b tw:px-2 tw:py-1 tw:text-sm tw:font-medium"
            >
              {showDragHandle ? (
                // Nested tooltip on the grip so `reorderHint` shows on hover AND keyboard focus.
                // Its own provider/tooltip keeps it independent of the label-truncation tooltip.
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
              <span ref={labelRef} className="tw:truncate">
                {label}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="tw:flex-1 tw:overflow-auto tw:p-2" dir={textDirection}>
        {state === 'ready' ? (
          readyContent
        ) : (
          <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-2 tw:text-center">
            {state === 'downloading' && <Spinner />}
            <span className="tw:font-medium">{localizedStrings[UNAVAILABLE_KEY]}</span>
            <span className="tw:text-sm tw:text-muted-foreground">
              {state === 'failed'
                ? localizedStrings[FAILED_KEY]
                : localizedStrings[DOWNLOADING_KEY]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResourceCellView;
