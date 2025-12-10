import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '../shadcn-ui/button';

export type ScrRef = {
  book: string;
  chapterAndVerse: string;
};

export type ScrRefBtnProps = {
  startRef: ScrRef;
  endRef?: ScrRef;
  text?: string;
  className?: string;
  onClick?: (e: unknown) => void;
  remainderTextLength?: number;
};

function trimMiddleWordsWithRemovedCount(sentence: string, x: number): string {
  const words = sentence.split(/\s+/);

  // If the sentence is too short to trim, return as-is
  if (words.length <= x * 2) {
    return sentence;
  }

  const startWords = words.slice(0, x);
  const endWords = words.slice(-x);

  return [...startWords, `[...]`, ...endWords].join(' ');
}

function ScrRefButton({
  startRef,
  endRef,
  text,
  className,
  onClick,
  remainderTextLength = 7,
}: ScrRefBtnProps) {
  const endRefString =
    startRef.book === endRef?.book
      ? endRef?.chapterAndVerse
      : `${endRef?.book} ${endRef?.chapterAndVerse}`;
  return (
    <div className={cn('tw-overflow-hidden tw-truncate tw-p-1 tw-text-start tw-leading-none')}>
      <Button
        variant="link"
        aria-label="Submit reference change"
        onClick={(e) => {
          e.stopPropagation(); // Stops bubbling to outer div
          onClick?.(e);
        }}
        className={cn('tw-me-2 tw-h-4 tw-p-0', className)}
      >
        {startRef.book} {startRef.chapterAndVerse}
        {endRef ? ` - ${endRefString}` : ''}
      </Button>

      <span
        className={cn(
          'tw-h-fit tw-truncate tw-whitespace-normal tw-text-start tw-text-xs tw-font-medium',
          className,
        )}
      >
        {trimMiddleWordsWithRemovedCount(text ?? '', remainderTextLength)}
      </span>
    </div>
  );
}

export default ScrRefButton;
