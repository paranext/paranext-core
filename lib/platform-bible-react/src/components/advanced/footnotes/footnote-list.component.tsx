import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { cn } from '@/utils/shadcn-ui/utils';
import { Separator } from '@/components/shadcn-ui/separator';
import { getFormatCallerFunction } from 'platform-bible-utils';
import React, { useEffect, useRef, useState } from 'react';
import { FootnoteItem } from './footnote-item.component';
import { FootnoteListProps } from './footnotes.types';
import { getCaretPositionFromClick } from './footnote-caret.utils';

/**
 * Returns the nearest row index adjacent to `from` in `direction`, hopping over `editingIndex` -
 * that row isn't a selectable option while it's being edited, and it renders no `ref`/`tabIndex`
 * for the roving-focus effect to land on. Falls back to `from` if there's no other row to move to
 * (e.g. a single-row list whose only row is being edited).
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

/** `FootnoteList` is a component that provides a read-only display of a list of USFM/JSX footnote. */
export function FootnoteList({
  className,
  classNameForItems,
  footnotes,
  layout = 'horizontal',
  listId,
  selectedFootnote,
  showMarkers = true,
  suppressFormatting = false,
  formatCaller,
  onFootnoteSelected,
  onFootnoteEditRequested,
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

    // While a row is being edited, its content may host a real editor (e.g. FootnoteEditor) that
    // needs ArrowUp/ArrowDown for its own cursor movement. Let those keystrokes through instead of
    // hijacking them for list navigation.
    if (
      editingRowIndex !== undefined &&
      e.target instanceof HTMLElement &&
      e.target.closest('li[data-state="editing"]')
    ) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => getAdjacentFocusableIndex(prev, 1, lastIndex, editingRowIndex));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => getAdjacentFocusableIndex(prev, -1, lastIndex, editingRowIndex));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    // The focused row just became (or already was) the editing row - it's no longer a selectable
    // option, so hop the roving tabIndex/focus to the nearest non-editing row instead of stranding
    // it on a row that renders no `ref`/`tabIndex`.
    if (editingRowIndex === undefined || focusedIndex !== editingRowIndex) return;
    setFocusedIndex((prev) => {
      const forward = getAdjacentFocusableIndex(prev, 1, lastIndex, editingRowIndex);
      if (forward !== prev) return forward;
      const backward = getAdjacentFocusableIndex(prev, -1, lastIndex, editingRowIndex);
      return backward !== prev ? backward : -1;
    });
  }, [editingRowIndex, focusedIndex, lastIndex]);

  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < rowRefs.current.length) {
      rowRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  /*
   * TODO(PT-3743): After upgrading to Tailwind v4, move to using @container and @sm/@lg css
   * styling to replace the use of the `layout` variable to distinguish between
   * wide/skinny layouts.
   */
  return (
    <div
      role="listbox"
      aria-label="Footnotes"
      tabIndex={focusedIndex < 0 ? 0 : -1}
      className={cn('tw:h-full tw:overflow-y-auto', className)}
      onKeyDown={handleListKeyDown}
    >
      <ul
        className={cn(
          'tw:p-0.5 tw:pt-1' /* Added top padding to prevent focus ring clipping in P.B app */,
          'tw:grid',
          layout === 'horizontal'
            ? 'tw:grid-cols-[min-content_min-content_1fr]'
            : 'tw:grid-cols-[min-content_1fr]',
          !suppressFormatting && 'formatted-font',
        )}
      >
        {footnotes.map((footnote, idx) => {
          const isSelected = footnote === selectedFootnote;
          const key = `${listId}-${idx}`;
          const isEditing = idx === editingFootnoteIndex && !!renderEditingFootnote;
          // Only render separator if not the last item. Shared by both branches below so vertical
          // layout keeps its separator after the editing row too, and so the two branches return
          // the same Fragment shape (avoids an unnecessary remount when toggling edit mode).
          const separator = idx < footnotes.length - 1 && layout === 'vertical' && (
            <Separator tabIndex={-1} className="tw:col-span-2" />
          );

          if (isEditing) {
            return (
              <>
                <li
                  key={key}
                  data-state="editing"
                  className={cn(
                    'tw:gap-x-3 tw:gap-y-1 tw:p-2',
                    'tw:w-full tw:rounded-sm tw:border-0 tw:shadow-none',
                    // PT9 highlights the entry being edited (light yellow); warning is the theme's
                    // amber-family token so this stays theme-aware in dark mode.
                    'tw:bg-warning/15',
                    layout === 'horizontal' ? 'tw:col-span-3' : 'tw:col-span-2 tw:row-span-2',
                    classNameForItems,
                  )}
                >
                  {renderEditingFootnote(footnote, idx)}
                </li>
                {separator}
              </>
            );
          }
          return (
            <>
              <li
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                role="option"
                aria-selected={isSelected}
                key={key}
                data-marker={footnote.marker}
                data-state={isSelected ? 'selected' : undefined}
                tabIndex={idx === focusedIndex ? 0 : -1}
                className={cn(
                  'tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted',
                  onFootnoteSelected && 'tw:hover:bg-muted/50',
                  'tw:w-full tw:rounded-sm tw:border-0 tw:bg-transparent tw:shadow-none',
                  'tw:focus:outline-hidden tw:focus-visible:outline-hidden',
                  /* ENHANCE: After considerable fiddling, this set of styles makes a focus ring
                     that looks great in Storybook. However, the left edge of the ring is clipped in
                     P.B app. These are similar, but not identical to, the customizations made in
                     our shadcn table component.
                  */
                  'tw:focus-visible:ring-offset-0.5 tw:focus-visible:relative tw:focus-visible:z-10 tw:focus-visible:ring-2 tw:focus-visible:ring-ring',
                  'tw:grid tw:grid-flow-col tw:grid-cols-subgrid',
                  layout === 'horizontal' ? 'tw:col-span-3' : 'tw:col-span-2 tw:row-span-2',
                  classNameForItems,
                )}
                onClick={(event) => handleFootnoteClick(footnote, idx, event)}
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
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default FootnoteList;
