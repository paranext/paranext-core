import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { cn } from '@/utils/shadcn-ui.util';
import { Card } from '@/components/shadcn-ui/card';
import { getFormatCallerFunction, LocalizedStringValue } from 'platform-bible-utils';
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
  const handleFootnoteClick = (footnote: MarkerObject) => {
    if (onFootnoteSelected) {
      onFootnoteSelected(footnote);
    }
  };

  return (
    <>
      {layout === 'vertical' && <div className="tw-mb-2 tw-font-semibold">{headerText}</div>}
      <div
        role="listbox"
        aria-label="Footnotes"
        className={cn(
          layout === 'horizontal' ? 'tw-table tw-border-collapse' : 'tw-flex tw-flex-col tw-gap-1',
          !suppressFormatting && 'formatted-font',
          className,
        )}
      >
        {footnotes.map((footnote, idx) => {
          const isSelected = footnote === selectedFootnote;
          const key = `${listId}-${idx}`;
          return (
            <Card
              role="option"
              aria-selected={isSelected}
              key={key}
              data-marker={footnote.marker}
              className={cn(
                onFootnoteSelected && 'tw-cursor-pointer',
                'tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none',
                isSelected && 'tw-bg-muted/70',
                layout === 'horizontal'
                  ? 'horizontal tw-table-row'
                  : 'vertical tw-block tw-px-1 tw-py-0 tw-text-sm',
              )}
              onClick={() => handleFootnoteClick(footnote)}
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
    </>
  );
}

export default FootnoteList;
