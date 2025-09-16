import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { cn } from '@/utils/shadcn-ui.util';
import { Card } from '@/components/shadcn-ui/card';
import { FootnoteItem } from './footnote-item.component';
import { FootnoteListProps } from './footnotes.types';

function indexToLetters(index: number): string {
  // 0 -> a, 1 -> b ... 25 -> z, 26 -> aa, 27 -> ab, etc.
  let result = '';
  let i = index;
  while (i >= 0) {
    result = String.fromCharCode(97 + (i % 26)) + result;
    i = Math.floor(i / 26) - 1;
  }
  return result;
}

export function FootnoteList({
  footnotes,
  showMarkers = true,
  formatCaller,
  selectedFootnote,
  onFootnoteSelected,
  className,
}: FootnoteListProps) {
  const handleFormatCaller =
    formatCaller ??
    ((caller: string | undefined, index: number) => {
      if (caller === '+') return indexToLetters(index);
      if (caller === '-') return undefined;
      return caller;
    });

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
        const key = footnote.sid ?? footnote.marker ?? `footnote-${idx}`;
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
