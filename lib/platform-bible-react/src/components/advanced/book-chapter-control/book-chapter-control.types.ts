import { SerializedVerseRef } from '@sillsdev/scripture';

export type BookType = 'OT' | 'NT' | 'DC' | 'Extra';

export type BookWithOptionalChapterAndVerse = Omit<SerializedVerseRef, 'chapterNum' | 'verseNum'> &
  Partial<Pick<SerializedVerseRef, 'chapterNum' | 'verseNum'>>;

export type ViewMode = 'books' | 'chapters';

export type BookChapterControlProps = {
  /** The current scripture reference */
  scrRef: SerializedVerseRef;
  /** Callback to handle the submission of a selected reference */
  handleSubmit: (scrRef: SerializedVerseRef) => void;
  /** Optional additional class name for styling */
  className?: string;
  /** Callback to retrieve book IDs that are available in the current context */
  getActiveBookIds?: () => string[];
};
