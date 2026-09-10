import { Button } from 'platform-bible-react';
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
  /** Already-localized label for the retry control. Required to render one. */
  retryLabel?: string;
  /**
   * Re-drives the chapter read. Omit where nothing can act on a retry, so the control is not
   * offered inertly.
   */
  onRetry?: () => void;
};

/**
 * Replaces a resource panel's editor when reading the chapter failed for a reason other than the
 * text simply not containing the book — an unreadable project, a permissions failure, a data
 * provider that cannot open the resource.
 *
 * The value in hand is an error rather than USJ, and nothing re-emits on its own: a spinner would
 * claim progress that never arrives, and mounting the editor with nothing set shows Lexical's
 * "Enter some Scripture…" prompt — an edit invitation in a text the reader cannot edit. So the
 * failure is named rather than hidden.
 *
 * Naming it is not the whole answer, though, because the read can succeed on a second attempt — a
 * resource still installing, a transient provider failure. A caller that can re-drive the read
 * passes {@link ResourceTextUnavailableProps.onRetry} and the reader gets a way out; one that cannot
 * omits it rather than offering an inert control.
 *
 * Shares {@link ResourceMessageView} with {@link ResourceBookNotAvailable} and
 * {@link ResourceBlankChapter} so all three reasons a panel shows no text get the same focus repair
 * and the same re-announcement on navigation.
 */
export function ResourceTextUnavailable({
  message,
  announcementKey,
  retryLabel,
  onRetry,
}: ResourceTextUnavailableProps) {
  return (
    <ResourceMessageView
      message={message}
      testId={RESOURCE_TEXT_UNAVAILABLE_TEST_ID}
      announcementKey={announcementKey}
      action={
        onRetry && retryLabel ? (
          <Button variant="outline" size="sm" onClick={onRetry}>
            {retryLabel}
          </Button>
        ) : undefined
      }
    />
  );
}
