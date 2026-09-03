import { ResourceMessageView } from './resource-message-view.component';

/** Identifies the focusable wrapper. See {@link RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID}. */
export const RESOURCE_BLANK_CHAPTER_TEST_ID = 'resource-blank-chapter';

export type ResourceBlankChapterProps = {
  /** The already-localized message to show. See {@link ResourceMessageView}'s `message`. */
  message: string;
  /**
   * Identifies WHICH blank chapter in WHICH text this message is about — typically the project id,
   * book, and chapter number. See {@link ResourceMessageView}'s `announcementKey`.
   */
  announcementKey?: string;
};

/**
 * Replaces a resource panel's editor when the resource HAS the current chapter but that chapter is
 * empty. A blank chapter arrives as a successful, empty USJ rather than as an error, so it is
 * invisible to the missing-book branch and needs its own state.
 *
 * Shares {@link ResourceMessageView} with {@link ResourceBookNotAvailable} so that both reasons a
 * panel shows no text get the same focus repair and the same re-announcement on navigation, rather
 * than the blank-chapter case rendering a bare message nobody is told about.
 */
export function ResourceBlankChapter({ message, announcementKey }: ResourceBlankChapterProps) {
  return (
    <ResourceMessageView
      message={message}
      testId={RESOURCE_BLANK_CHAPTER_TEST_ID}
      announcementKey={announcementKey}
    />
  );
}
