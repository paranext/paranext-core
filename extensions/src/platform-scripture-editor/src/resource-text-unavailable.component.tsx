import { ResourceMessageView } from './resource-message-view.component';

/** Identifies the focusable wrapper. See {@link RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID}. */
export const RESOURCE_TEXT_UNAVAILABLE_TEST_ID = 'resource-text-unavailable';

export type ResourceTextUnavailableProps = {
  /** The already-localized message to show. See {@link ResourceMessageView}'s `message`. */
  message: string;
  /**
   * Identifies WHICH text this message is about — typically the project id and the reference. See
   * {@link ResourceMessageView}'s `announcementKey`.
   */
  announcementKey?: string;
};

/**
 * Replaces a resource panel's editor when reading the chapter failed for a reason other than the
 * text simply not containing the book — an unreadable project, a permissions failure, a data
 * provider that cannot open the resource.
 *
 * This state is terminal by nature: the value in hand is an error rather than USJ, and nothing
 * re-emits until the data provider does. A spinner would therefore claim progress that never
 * arrives, and mounting the editor with nothing set shows Lexical's "Enter some Scripture…" prompt
 * — an edit invitation in a text the reader cannot edit. Naming the failure is the only honest
 * option of the three.
 *
 * Shares {@link ResourceMessageView} with {@link ResourceBookNotAvailable} and
 * {@link ResourceBlankChapter} so all three reasons a panel shows no text get the same focus repair
 * and the same re-announcement on navigation.
 */
export function ResourceTextUnavailable({
  message,
  announcementKey,
}: ResourceTextUnavailableProps) {
  return (
    <ResourceMessageView
      message={message}
      testId={RESOURCE_TEXT_UNAVAILABLE_TEST_ID}
      announcementKey={announcementKey}
    />
  );
}
