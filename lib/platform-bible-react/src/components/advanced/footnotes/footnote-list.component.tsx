import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { cn } from '@/utils/shadcn-ui/utils';
import { Separator } from '@/components/shadcn-ui/separator';
import { getFormatCallerFunction } from 'platform-bible-utils';
import React, { useEffect, useRef, useState } from 'react';
import { FootnoteItem } from './footnote-item.component';
import { FootnoteListProps } from './footnotes.types';

/** `FootnoteList` is a component that provides a read-only display of a list of USFM/JSX footnote. */
export function FootnoteList({
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
}: FootnoteListProps) {
  const handleFormatCaller = formatCaller ?? getFormatCallerFunction(footnotes, undefined);
  const handleFootnoteClick = (footnote: MarkerObject, index: number) => {
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
      case ' ':
        e.preventDefault();
        onFootnoteSelected?.(footnote, index, listId);
        break;

      default:
        break;
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!footnotes.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, footnotes.length - 1));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
        break;

      default:
        break;
    }
  };

  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < rowRefs.current.length) {
      rowRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

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
          return (
            // The key belongs on the outermost node returned from the map — the Fragment — not on
            // the `<li>` nested inside it, which leaves the Fragment itself unkeyed.
            <React.Fragment key={key}>
              <li
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                role="option"
                aria-selected={isSelected}
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
                onClick={() => handleFootnoteClick(footnote, idx)}
                onKeyDown={(e) => handleFootnoteKeyDown(e, footnote, idx)}
              >
                <FootnoteItem
                  footnote={footnote}
                  layout={layout}
                  formatCaller={() => handleFormatCaller(footnote.caller, idx)}
                  showMarkers={showMarkers}
                />
              </li>
              {/* Only render separator if not the last item */}
              {idx < footnotes.length - 1 && layout === 'vertical' && (
                <Separator tabIndex={-1} className="tw:col-span-2" />
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}

export default FootnoteList;
