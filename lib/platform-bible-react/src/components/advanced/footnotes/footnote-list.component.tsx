import { cn } from '@/utils/shadcn-ui.util';
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
        onKeyDown={handleListKeyDown}
        className={cn(
          'tw-h-full tw-overflow-y-auto tw-p-0.5 tw-pt-1',
          !suppressFormatting && 'formatted-font',
          className,
        )}
      >
        <style>{`
          /* Parent grid controls the column tracks; children will either use subgrid or fall back to display:contents */
          .footnote-list-grid { container-type: inline-size; display: grid; grid-template-columns: [col-caller-start col-ref-start col-body-start] 1fr [col-caller-end col-ref-end col-body-end]; grid-auto-rows: auto; gap: 0.25rem 0.5rem; }

          /* Fallback for environments without Container Queries: also provide a viewport-based media query */
          @media (min-width: 640px) {
            .footnote-list-grid { grid-template-columns: [col-caller-start] auto [col-caller-end col-ref-start] auto [col-ref-end col-body-start] 1fr [col-body-end]; }
          }

          /* Preferred: when container queries are supported, switch at container size */
          @container (min-width: 640px) {
            .footnote-list-grid { grid-template-columns: [col-caller-start] auto [col-caller-end col-ref-start] auto [col-ref-end col-body-start] 1fr [col-body-end]; }
          }

          /* If subgrid is supported, let each item inherit the parent's column tracks */
          @supports (grid-template-columns: subgrid) {
            .footnote-list-grid .footnote-item-root { display: grid; grid-template-columns: subgrid; align-items: start; gap: 0; }
          }
          /* Otherwise fall back to display:contents so the internal cells participate in the parent grid */
          @supports not (grid-template-columns: subgrid) {
            .footnote-list-grid .footnote-item-root { display: contents; }
            /* ensure the inner cells still get the proper flow */
            .footnote-item-root .textual-note-header, .footnote-item-root .textual-note-body { display: block; }
          }

          /* Body spans all columns when layout is explicitly vertical */
          .footnote-item-root[data-layout="vertical"] .textual-note-body { grid-column: 1 / -1; }
        `}</style>

        <div className="footnote-list-grid">
          {footnotes.map((footnote, idx) => {
            const isSelected = footnote === selectedFootnote;
            const key = `${listId}-${idx}`;
            return (
              <React.Fragment key={key}>
                <FootnoteItem
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  role="option"
                  isSelected={isSelected}
                  tabIndex={-1}
                  marker={footnote.marker}
                  state={isSelected ? 'selected' : undefined}
                  className={cn(onFootnoteSelected && 'hover:tw-bg-muted/50', classNameForItems)}
                  footnote={footnote}
                  layout={layout}
                  formatCaller={(caller) => handleFormatCaller(caller, idx)}
                  showMarkers={showMarkers}
                  onClick={() => onFootnoteSelected?.(footnote, idx, listId)}
                />
                {layout === 'vertical' && idx < footnotes.length - 1 && <Separator />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FootnoteList;
