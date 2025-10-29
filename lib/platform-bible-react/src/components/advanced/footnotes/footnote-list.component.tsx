import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { cn } from '@/utils/shadcn-ui.util';
import { Card } from '@/components/shadcn-ui/card';
import { getFormatCallerFunction, LocalizedStringValue } from 'platform-bible-utils';
import React, { useEffect, useRef, useState } from 'react';
import { FootnoteItem } from './footnote-item.component';
import { FootnoteListProps } from './footnotes.types';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component
 */
export const FOOTNOTE_LIST_STRING_KEYS = Object.freeze(['%webView_footnoteList_header%'] as const);

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
            'tw-p-0.5',
            layout === 'horizontal' ? 'tw-table' : 'tw-flex tw-flex-col tw-gap-1',
            !suppressFormatting && 'formatted-font',
          )}
        >
          {footnotes.map((footnote, idx) => {
            const isSelected = footnote === selectedFootnote;
            const key = `${listId}-${idx}`;
            return (
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
                  onFootnoteSelected && 'tw-cursor-pointer hover:tw-bg-muted/50',
                  'tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-py-0 tw-shadow-none',
                  layout === 'horizontal'
                    ? 'horizontal tw-table-row'
                    : 'vertical tw-block tw-text-sm',
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
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FootnoteList;
