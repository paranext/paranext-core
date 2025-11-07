import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { cn } from '@/utils/shadcn-ui.util';
import { Card } from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import { getFormatCallerFunction, LocalizedStringValue, LocalizeKey } from 'platform-bible-utils';
import React, { useEffect, useRef, useState } from 'react';
import { FootnoteItem } from './footnote-item.component';
import { FootnoteListProps } from './footnotes.types';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component
 */
export const FOOTNOTE_LIST_STRING_KEYS: LocalizeKey[] = ['%webView_footnoteList_header%'];

export type FootnoteListLocalizedStrings = {
  [localizedFootnoteListKey in (typeof FOOTNOTE_LIST_STRING_KEYS)[number]]?: LocalizedStringValue;
};

/**
 * Gets the localized value for the provided key
 *
 * @param strings Object containing localized string
 * @param key Key for a localized string
 * @returns The localized value for the provided key, if available. Returns the key if no localized
 *   value is available
 */
const localizeString = (
  strings: FootnoteListLocalizedStrings,
  key: keyof FootnoteListLocalizedStrings,
) => {
  return strings[key] ?? key;
};

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
  localizedStrings,
}: FootnoteListProps & { localizedStrings?: FootnoteListLocalizedStrings }) {
  const headerText = localizedStrings
    ? localizeString(localizedStrings, '%webView_footnoteList_header%')
    : 'Footnotes';
  const handleFormatCaller = formatCaller ?? getFormatCallerFunction(footnotes, undefined);
  const handleFootnoteClick = (footnote: MarkerObject, index: number) => {
    onFootnoteSelected?.(footnote, index, listId);
  };
  const initialFocusedIndex = selectedFootnote
    ? footnotes.findIndex((f) => f === selectedFootnote)
    : 0;

  const [focusedIndex, setFocusedIndex] = useState<number>(initialFocusedIndex);

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

      case 'Enter':
      case ' ':
        e.preventDefault();
        onFootnoteSelected?.(footnotes[focusedIndex], focusedIndex, listId);
        break;

      default:
        break;
    }
  };

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < rowRefs.current.length) {
      rowRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  return (
    <>
      {layout === 'vertical' && <h2 className="tw-mb-1 tw-font-semibold">{headerText}</h2>}
      <div
        role="listbox"
        aria-label="Footnotes"
        tabIndex={0}
        className={cn('tw-h-full tw-overflow-y-auto', className)}
        onKeyDown={handleListKeyDown}
      >
        <div
          className={cn(
            'tw-p-0.5 tw-pt-1' /* Added top padding to prevent focus ring clipping in P.B app */,
            layout === 'horizontal' ? 'tw-table tw-min-w-full' : 'tw-flex tw-flex-col tw-gap-0.5',
            !suppressFormatting && 'formatted-font',
          )}
        >
          {footnotes.map((footnote, idx) => {
            const isSelected = footnote === selectedFootnote;
            const key = `${listId}-${idx}`;
            return (
              <>
                <Card
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  role="option"
                  aria-selected={isSelected}
                  key={key}
                  data-marker={footnote.marker}
                  data-state={isSelected ? 'selected' : undefined}
                  tabIndex={-1}
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
                    layout === 'horizontal'
                      ? 'horizontal tw-table-row'
                      : 'vertical tw-block tw-text-sm',
                    classNameForItems,
                  )}
                  onClick={() => handleFootnoteClick(footnote, idx)}
                >
                  <FootnoteItem
                    footnote={footnote}
                    layout={layout}
                    formatCaller={() => handleFormatCaller(footnote.caller, idx)}
                    showMarkers={showMarkers}
                  />
                </Card>

                {/* Only render separator if not the last item */}
                {idx < footnotes.length - 1 && layout === 'vertical' && <Separator />}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FootnoteList;
