import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { cn } from '@/utils/shadcn-ui.util';
import { Card } from '@/components/shadcn-ui/card';
import { getFormatCallerFunction } from 'platform-bible-utils';
import { FootnoteItem } from './footnote-item.component';
import { FootnoteListProps } from './footnotes.types';

/** `FootnoteList` is a component that provides a read-only display of a list of USFM/JSX footnote. */
export function FootnoteList({
  footnotes,
  showMarkers = true,
  formatCaller,
  listId,
  selectedFootnote,
  onFootnoteSelected,
  className,
}: FootnoteListProps) {
  const handleFormatCaller = formatCaller ?? getFormatCallerFunction(footnotes, undefined);
  const handleFootnoteClick = (footnote: MarkerObject) => {
    if (onFootnoteSelected) {
      onFootnoteSelected(footnote);
    }
  };

  return (
    <div
      role="listbox"
      aria-label="Footnotes"
      className={cn('tw-flex tw-flex-col tw-gap-1', className)}
    >
      {footnotes.map((footnote, idx) => {
        const isSelected = footnote === selectedFootnote;
        const key = `${listId}-${idx}`;
        return (
          <Card
            role="option"
            aria-selected={isSelected}
            key={key}
            className={cn(
              onFootnoteSelected && 'tw-cursor-pointer',
              'tw-rounded-sm tw-border-0 tw-bg-transparent tw-px-1 tw-py-0 tw-shadow-none',
              isSelected && 'tw-bg-muted/70', // subtle background for selection
            )}
            onClick={() => handleFootnoteClick(footnote)}
          >
            <FootnoteItem
              footnote={footnote}
              formatCaller={() => handleFormatCaller(footnote.caller, idx)}
              showMarkers={showMarkers}
              className="tw-m-0" // remove any internal margin
            />
          </Card>
        );
      })}
    </div>
  );
}

export default FootnoteList;
