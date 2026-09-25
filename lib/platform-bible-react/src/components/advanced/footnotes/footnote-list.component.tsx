import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { cn } from '@/utils/shadcn-ui/utils';
import { Separator } from '@/components/shadcn-ui/separator';
import { getFormatCallerFunction } from 'platform-bible-utils';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FootnoteItem } from './footnote-item.component';
import { FootnoteListProps } from './footnotes.types';
import { getCaretPositionFromClick } from './footnote-caret.utils';

/**
 * React key for the row rendered as an editor. Deliberately independent of `listId` and of the
 * row's index - see where it is used.
 */
const EDITING_ROW_KEY = 'editing-row';

/**
 * Returns the nearest row index adjacent to `from` in `direction`, hopping over `editingIndex` -
 * that row isn't a selectable option while it's being edited, and it renders no `ref`/`tabIndex`
 * for keyboard focus to land on. Falls back to `from` if there's no other row to move to (e.g. a
 * single-row list whose only row is being edited).
 */
function getAdjacentFocusableIndex(
  from: number,
  direction: 1 | -1,
  lastIndex: number,
  editingIndex: number | undefined,
): number {
  let next = Math.min(Math.max(from + direction, 0), lastIndex);
  if (next === editingIndex) {
    const hopped = Math.min(Math.max(next + direction, 0), lastIndex);
    next = hopped === next ? from : hopped;
  }
  return next === editingIndex ? from : next;
}

/**
 * `FootnoteList` is a component that displays a list of USFM/JSX footnotes. Rows are read-only by
 * default; a consumer can make one row editable in place at a time via `editingFootnoteIndex` +
 * `renderEditingFootnote` (see those props), which swaps that row's display for a rendered editor
 * (e.g. an inline `FootnoteEditor`) while every other row stays read-only.
 */
export function FootnoteList({
  ariaLabel = 'Footnotes',
  className,
  classNameForItems,
  footnotes,
  layout = 'horizontal',
  listId,
  selectedFootnote,
  selectionRequest,
  showMarkers = true,
  suppressFormatting = false,
  formatCaller,
  onFootnoteSelected,
  onFootnoteEditRequested,
  onFocusedFootnoteChange,
  editingFootnoteIndex,
  renderEditingFootnote,
}: FootnoteListProps) {
  const handleFormatCaller = formatCaller ?? getFormatCallerFunction(footnotes, undefined);

  // `editingFootnoteIndex` only takes effect when `renderEditingFootnote` is also provided (see
  // `isEditing` in the row map below) - mirror that gating here so keyboard navigation only treats
  // a row as non-focusable when it will actually render as the editing row.
  const editingRowIndex = renderEditingFootnote ? editingFootnoteIndex : undefined;

  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleFootnoteClick = (
    footnote: MarkerObject,
    index: number,
    event: React.MouseEvent<HTMLLIElement>,
  ) => {
    if (onFootnoteEditRequested) {
      // Read the row element and click coordinates synchronously, before
      // onFootnoteEditRequested can trigger a state update that removes this display row.
      const row = rowRefs.current[index];
      const caretPosition = row
        ? getCaretPositionFromClick(event.clientX, event.clientY, row)
        : 'end';
      onFootnoteEditRequested(footnote, index, listId, caretPosition);
      return;
    }
    onFootnoteSelected?.(footnote, index, listId);
  };

  const initialFocusedIndex = selectedFootnote
    ? footnotes.findIndex((f) => f === selectedFootnote)
    : -1;

  const [focusedIndex, setFocusedIndex] = useState<number>(initialFocusedIndex);

  /**
   * Moves keyboard focus to a row, which is the arrow keys' whole job - so they move it directly
   * rather than through `focusedIndex`. Every OTHER writer of `focusedIndex` is following focus
   * that is already somewhere this list must not disturb: the mount-time seed from
   * `selectedFootnote` (a gesture that happens in the EDITOR - see the reveal-on-select effect
   * below), the rows' own `onFocus`, and the editing-row hop (focus belongs to the editor that just
   * opened in that row's place). Focusing off the state would steal focus from all three.
   */
  const focusRow = (index: number) => {
    setFocusedIndex(index);
    if (index >= 0 && index < rowRefs.current.length) rowRefs.current[index]?.focus();
  };

  const handleFootnoteKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    footnote: MarkerObject,
    index: number,
  ) => {
    if (!footnotes.length) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (onFootnoteEditRequested) {
          onFootnoteEditRequested(footnote, index, listId, 'end');
        } else {
          onFootnoteSelected?.(footnote, index, listId);
        }
        break;

      case ' ':
        e.preventDefault();
        onFootnoteSelected?.(footnote, index, listId);
        break;

      default:
        break;
    }
  };

  const lastIndex = footnotes.length - 1;

  const handleListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!footnotes.length) return;

    // Arrow keys drive list navigation only when they ORIGINATE on the list itself or on one of
    // its read-only rows. Anything else in the subtree owns its own arrow keys: the row being
    // edited hosts a real editor (e.g. FootnoteEditor) that needs them for cursor movement, and
    // that editor's own overlays - a marker palette in a Radix popover, say - are portalled out to
    // `document.body` yet still bubble their React events through here, so an allow-list of what
    // the list navigates from is the only test those overlays cannot fall through.
    if (
      e.target !== e.currentTarget &&
      !(e.target instanceof HTMLElement && e.target.closest('li[role="option"]'))
    ) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        focusRow(getAdjacentFocusableIndex(focusedIndex, 1, lastIndex, editingRowIndex));
        break;

      case 'ArrowUp':
        e.preventDefault();
        focusRow(getAdjacentFocusableIndex(focusedIndex, -1, lastIndex, editingRowIndex));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    // The focused row just became (or already was) the editing row - it's no longer a selectable
    // option, so hop the arrow keys' starting point to the nearest non-editing row instead of
    // stranding it on a row that renders no `ref`. It deliberately moves no DOM focus (see
    // `focusRow`): the gesture that opened the row - Enter on it, or a click in it - leaves focus
    // in the editor that mounted in its place, and the next arrow press has to resume from the
    // note the user was on, not from wherever the list was last told to look.
    if (editingRowIndex === undefined || focusedIndex !== editingRowIndex) return;
    setFocusedIndex((prev) => {
      const forward = getAdjacentFocusableIndex(prev, 1, lastIndex, editingRowIndex);
      if (forward !== prev) return forward;
      const backward = getAdjacentFocusableIndex(prev, -1, lastIndex, editingRowIndex);
      return backward !== prev ? backward : -1;
    });
  }, [editingRowIndex, focusedIndex, lastIndex]);

  /** The row last reported through `onFocusedFootnoteChange`, so each change is reported once. */
  const reportedFocusedRowRef = useRef<number | undefined>(undefined);
  const reportFocusedRow = (index: number | undefined) => {
    if (reportedFocusedRowRef.current === index) return;
    reportedFocusedRowRef.current = index;
    onFocusedFootnoteChange?.(index);
  };

  // A focused row that unmounts - swapped for the editing row, or dropped when the list is rebuilt
  // for another chapter - takes focus with it without firing `blur`, so the consumer would go on
  // following a row that no longer holds focus. Checked after every render, which is when rows go.
  useEffect(() => {
    const reported = reportedFocusedRowRef.current;
    if (reported === undefined) return;
    const row = rowRefs.current[reported];
    if (!row || row.ownerDocument.activeElement !== row) {
      reportedFocusedRowRef.current = undefined;
      onFocusedFootnoteChange?.(undefined);
    }
  });

  const selectedIndex = selectedFootnote
    ? footnotes.findIndex((footnote) => footnote === selectedFootnote)
    : -1;

  // Bring the selected row into view when the selection changes. The host drives selection from
  // OUTSIDE this list — clicking a note caller in the editor (PT9 navigate-to-note) — so the
  // selected row is frequently outside the scrollport, where it would highlight invisibly.
  // `block: 'nearest'` scrolls only far enough to reveal it, leaving an already-visible row put.
  //
  // Deliberately does NOT call `focus()` (unlike the arrow-key path above): the gesture that drives
  // this happens in the EDITOR, and pulling keyboard focus into the pane would interrupt editing.
  //
  // `selectionRequest` is a dependency-only identity key: a REPEAT selection of the same footnote
  // derives the same index, so keying on the index alone would never re-reveal a row the user has
  // since scrolled away from (see `FootnoteListProps.selectionRequest`).
  useEffect(() => {
    if (selectedIndex < 0 || selectedIndex >= rowRefs.current.length) return;
    rowRefs.current[selectedIndex]?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex, selectionRequest]);

  /*
   * TODO(PT-3743): After upgrading to Tailwind v4, move to using @container and @sm/@lg css
   * styling to replace the use of the `layout` variable to distinguish between
   * wide/skinny layouts.
   */
  return (
    // Every row is its own tab stop (see the row `tabIndex` below), so the list is not one as
    // well - a stop here would put an extra, contentless press between whatever precedes the list
    // and its first note. It stays programmatically focusable (`-1`) because arrow-key navigation
    // starts by focusing it. With NO rows there is no row to be that stop, so the list takes the
    // turn itself rather than leaving the region unreachable by keyboard.
    <div
      role="listbox"
      aria-label={ariaLabel}
      tabIndex={footnotes.length === 0 ? 0 : -1}
      className={cn('tw:h-full tw:overflow-y-auto', className)}
      onKeyDown={handleListKeyDown}
    >
      <ul
        className={cn(
          'tw:p-0.5 tw:pt-1' /* Added top padding to prevent focus ring clipping in P.B app */,
          'tw:grid',
          // Two columns in both layouts: the note's marker+caller, then its text. PT9 keeps the
          // `\fr`/`\xo` target reference inside the note text rather than aligning it in a column
          // of its own, so there is no third column to size.
          'tw:grid-cols-[min-content_1fr]',
          !suppressFormatting && 'formatted-font',
        )}
      >
        {footnotes.map((footnote, idx) => {
          const isSelected = footnote === selectedFootnote;
          const isEditing = idx === editingFootnoteIndex && !!renderEditingFootnote;
          // A new `listId` re-mints every row, which is exactly what a consumer asks for by
          // changing it: the notes it parsed are new objects at new positions. The row being
          // EDITED is the exception. It hosts a live editor holding state no prop carries - a
          // caret, an undo history, edits not yet applied - and it is bound to one note that
          // `editingFootnoteIndex` follows as notes come and go ahead of it. Re-minting that row
          // because an unrelated note was added or removed remounts the editor, which reloads its
          // document from whatever the consumer hands it and discards everything typed since. So
          // the editing row keeps a key no list change touches.
          const key = isEditing ? EDITING_ROW_KEY : `${listId}-${idx}`;
          // Only render separator if not the last item. Shared by both branches below so vertical
          // layout keeps its separator after the editing row too, and so the two branches return
          // the same Fragment shape (avoids an unnecessary remount when toggling edit mode).
          const separator = idx < footnotes.length - 1 && layout === 'vertical' && (
            <Separator tabIndex={-1} className="tw:col-span-2" />
          );

          if (isEditing) {
            return (
              <Fragment key={key}>
                <li
                  data-state="editing"
                  className={cn(
                    'tw:gap-x-3 tw:gap-y-1 tw:p-2',
                    'tw:w-full tw:rounded-sm tw:border-0 tw:shadow-none',
                    // PT9 highlights the entry being edited (light yellow); warning is the theme's
                    // amber-family token so this stays theme-aware in dark mode.
                    'tw:bg-warning/15',
                    'tw:col-span-2',
                    layout === 'vertical' && 'tw:row-span-2',
                    classNameForItems,
                  )}
                >
                  {renderEditingFootnote(footnote, idx)}
                </li>
                {separator}
              </Fragment>
            );
          }
          return (
            // The key belongs on the outermost node returned from the map — the Fragment — not on
            // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
            <Fragment key={key}>
              <li
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                role="option"
                aria-selected={isSelected}
                data-marker={footnote.marker}
                data-state={isSelected ? 'selected' : undefined}
                /* Tab walks the notes one by one rather than treating the list as a single stop.
                   That is a deliberate departure from the ARIA listbox pattern's roving tabindex,
                   which reaches a listbox once and navigates inside it with the arrow keys (still
                   supported here): reading down the notes is the pane's primary keyboard gesture,
                   and the row being edited hands its turn to the editor rendered in its place, so
                   Tab has to arrive at each row for that handoff to happen where the note is. */
                tabIndex={0}
                className={cn(
                  'tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted',
                  // Both handlers make the row a click target, so both earn the hover affordance -
                  // a consumer that only opens rows for editing would otherwise render rows that
                  // respond to a click but look inert.
                  (onFootnoteSelected || onFootnoteEditRequested) && 'tw:hover:bg-muted/50',
                  'tw:w-full tw:rounded-sm tw:border-0 tw:bg-transparent tw:shadow-none',
                  'tw:focus:outline-hidden tw:focus-visible:outline-hidden',
                  // The focus ring is drawn INSIDE the row. The list is its own scroll container,
                  // and a scroll container clips whatever a child paints past its edges: a ring
                  // drawn outside the row loses its sides to the list's left and right edges, and
                  // its top or bottom whenever the row is scrolled flush with one. `ring-inset`
                  // also holds under a host's own `:focus-visible` ring rule, which sets the
                  // ring's width and color but leaves `--tw-ring-inset` to this class.
                  'tw:focus-visible:ring-2 tw:focus-visible:ring-inset tw:focus-visible:ring-ring',
                  'tw:grid tw:grid-flow-col tw:grid-cols-subgrid',
                  'tw:col-span-2',
                  layout === 'vertical' && 'tw:row-span-2',
                  classNameForItems,
                )}
                onClick={(event) => handleFootnoteClick(footnote, idx, event)}
                /* Every row is its own tab stop, so focus reaches a row by Tab or by click as
                   often as by the arrow keys. Following it keeps the next arrow press relative to
                   the note the user is actually on - without this, arrowing after a Tab restarts
                   from whichever row the list last moved to itself. */
                onFocus={() => {
                  setFocusedIndex(idx);
                  reportFocusedRow(idx);
                }}
                onBlur={() => reportFocusedRow(undefined)}
                onKeyDown={(e) => handleFootnoteKeyDown(e, footnote, idx)}
              >
                <FootnoteItem
                  footnote={footnote}
                  layout={layout}
                  formatCaller={() => handleFormatCaller(footnote.caller, idx)}
                  showMarkers={showMarkers}
                />
              </li>
              {separator}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}

export default FootnoteList;
