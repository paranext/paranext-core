import { ALL_ENGLISH_BOOK_NAMES } from '@/components/shared/book.utils';
import { NumberedItemGrid } from './numbered-item-grid.component';

export interface VerseGridProps {
  /** The book ID the verses belong to */
  bookId: string;
  /** The chapter number the verses belong to */
  chapterNum: number;
  /** The number of verses to render (from 1 to endVerse, inclusive) */
  endVerse: number;
  /** Current scripture reference for highlighting */
  scrRef: { book: string; chapterNum: number; verseNum: number };
  /** Callback when a verse is selected */
  onVerseSelect: (verse: number) => void;
  /** Function to set verse refs for keyboard navigation */
  setVerseRef: (verse: number) => (element: HTMLDivElement | null) => void;
  /** Optional function to determine if a verse should be dimmed */
  isVerseDimmed?: (verse: number) => boolean;
  /** Optional function to determine if a verse should be disabled (not selectable). */
  isVerseDisabled?: (verse: number) => boolean;
  /** Optional additional class name for styling */
  className?: string;
}

/**
 * Renders a grid of verse numbers for a given book and chapter, with highlighting for the current
 * verse and optional dimmed verses based on state logic.
 */
export function VerseGrid({
  bookId,
  chapterNum,
  endVerse,
  scrRef,
  onVerseSelect,
  setVerseRef,
  isVerseDimmed,
  isVerseDisabled,
  className,
}: VerseGridProps) {
  if (!bookId || endVerse <= 0) return undefined;

  return (
    <NumberedItemGrid
      count={endVerse}
      valueBuilder={(verse) =>
        `${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId] || ''} ${chapterNum}:${verse}`
      }
      onSelect={onVerseSelect}
      itemRef={setVerseRef}
      isDisabled={isVerseDisabled}
      isDimmed={isVerseDimmed}
      isSelected={(verse) =>
        bookId === scrRef.book && chapterNum === scrRef.chapterNum && verse === scrRef.verseNum
      }
      className={className}
    />
  );
}

export default VerseGrid;
