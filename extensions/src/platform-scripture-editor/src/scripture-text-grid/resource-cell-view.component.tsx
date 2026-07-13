import {
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useTruncationTooltip,
} from 'platform-bible-react';
import { LocalizedStringValue } from 'platform-bible-utils';
import { ReactNode } from 'react';
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

/** How the cell shows its resource name: a hanging inline label, or a header band. */
export type ResourceNameDisplay = 'inline' | 'header';

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
};

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
 * `listitem` in `ScriptureTextGrid` — this component is purely presentational.
 */
export function ResourceCellView({
  state,
  label,
  textDirection,
  localizedStrings,
  editor,
  isVerseEmpty,
  nameDisplay = 'header',
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
        {state === 'downloading' && <Spinner />}
        <span className="tw:font-medium">{localizedStrings[UNAVAILABLE_KEY]}</span>
        <span className="tw:text-sm tw:text-muted-foreground">
          {state === 'failed' ? localizedStrings[FAILED_KEY] : localizedStrings[DOWNLOADING_KEY]}
        </span>
      </div>
    );

  return (
    <div className="tw:flex tw:min-w-0 tw:flex-col">
      {nameDisplay === 'inline' ? (
        // Verse-row cell: hang the name at the inline-start beside the verse text. `dir` on the row
        // makes flex place the name on the resource's own inline-start (right in RTL). The name is a
        // width-capped column (max-w-24); the verse text flows and scrolls in the remaining min-w-0
        // column, so the hanging name stays pinned even when the verse overflows.
        <div className="tw:flex tw:flex-1 tw:flex-row tw:gap-2 tw:p-2" dir={textDirection}>
          {/* `min-w-0` (not `shrink-0`): the name caps at max-w-24 when there is room, but must be
              able to shrink below that in a very narrow verse pane. With `shrink-0` the label kept
              its full width and overflowed the pane, pushing the truncation ellipsis off-screen — so
              a clipped name showed a hard cut with no "…". Allowing it to shrink keeps the ellipsis
              at the visible edge (and lets the clip-detecting tooltip fire). */}
          <ResourceNameLabel label={label} className="tw:max-w-24 tw:min-w-0 tw:text-sm" />
          <div className="tw:min-w-0 tw:flex-1 tw:overflow-auto">{stateContent}</div>
        </div>
      ) : (
        // Chapter context: a compact header line (colored text with a bottom border) above the
        // content. Long labels truncate; the tooltip reveals the full name only when actually clipped.
        <>
          <ResourceNameLabel
            label={label}
            className="tw:block tw:border-b tw:px-2 tw:py-0.5 tw:text-xs"
          />
          <div className="tw:flex-1 tw:overflow-auto tw:p-2" dir={textDirection}>
            {stateContent}
          </div>
        </>
      )}
    </div>
  );
}

export default ResourceCellView;
