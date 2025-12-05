import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { cn } from '@/utils/shadcn-ui.util';
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
    : 0;

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

  /*
   * TODO(PT-3743): After upgrading to Tailwind v4, move to using @container and @sm/@lg css
   * styling to replace the use of the `layout` variable to distinguish between
   * wide/skinny layouts.
   */
  return (
    <div
      role="listbox"
      aria-label="Footnotes"
      tabIndex={0}
      className={cn('tw-h-full tw-overflow-y-auto', className)}
      onKeyDown={handleListKeyDown}
    >
      <ul
        className={cn(
          'tw-p-0.5 tw-pt-1' /* Added top padding to prevent focus ring clipping in P.B app */,
          'tw-grid',
          layout === 'horizontal'
            ? 'tw-grid-cols-[min-content_min-content_1fr]'
            : 'tw-grid-cols-[min-content_1fr]',
          !suppressFormatting && 'formatted-font',
        )}
      >
        {footnotes.map((footnote, idx) => {
          const isSelected = footnote === selectedFootnote;
          const key = `${listId}-${idx}`;
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
                  'data-[state=selected]:tw-bg-muted',
                  onFootnoteSelected && 'hover:tw-bg-muted/50',
                  'tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none',
                  'focus:tw-outline-none focus-visible:tw-outline-none',
                  /* ENHANCE: After considerable fiddling, this set of styles makes a focus ring
                     that looks great in Storybook. However, the left edge of the ring is clipped in
                     P.B app. These are similar, but not identical to, the customizations made in
                     our shadcn table component.
                  */
                  'focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring',
                  'tw-grid tw-grid-flow-col tw-grid-cols-subgrid',
                  layout === 'horizontal' ? 'tw-col-span-3' : 'tw-col-span-2 tw-row-span-2',
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
                <Separator tabIndex={-1} className="tw-col-span-2" />
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default FootnoteList;
