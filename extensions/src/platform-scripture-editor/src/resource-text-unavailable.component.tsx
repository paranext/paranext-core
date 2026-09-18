import { RetryableErrorView } from 'platform-bible-react';
import { ResourceMessageFrame } from './resource-message-view.component';

/** Identifies the focusable wrapper. See {@link RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID}. */
export const RESOURCE_TEXT_UNAVAILABLE_TEST_ID = 'resource-text-unavailable';

export type ResourceTextUnavailableProps = {
  /** The already-localized message to show. */
  message: string;
  /**
   * Identifies WHICH text this message is about — typically the project id and the reference. See
   * {@link ResourceMessageFrame}'s `announcementKey`.
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
 * Renders through the library's `RetryableErrorView` rather than the plain message body its
 * siblings use, for two reasons its own doc gives: one retry button for every surface reporting the
 * same condition — this panel already shows two more of them, for a failed install and a failed
 * catalog fetch — and the warning glyph as the state's visual signature. Without the glyph this
 * would be the same centred sentence as {@link ResourceBookNotAvailable} and
 * {@link ResourceBlankChapter}, which are ordinary navigation rather than faults, distinguishable
 * only by a button.
 *
 * `role="status"` rather than the view's assertive default: {@link ResourceMessageFrame} moves focus
 * here, which is what actually announces the message, so an `alert` on top of that interrupts to
 * repeat what the reader is already being told. The install and catalog failures keep the default —
 * nothing moves focus to those.
 *
 * The focus repair and the re-announcement on navigation are {@link ResourceMessageFrame}'s, shared
 * with {@link ResourceBookNotAvailable} and {@link ResourceBlankChapter}.
 */
export function ResourceTextUnavailable({
  message,
  announcementKey,
  retryLabel,
  onRetry,
}: ResourceTextUnavailableProps) {
  return (
    <ResourceMessageFrame
      testId={RESOURCE_TEXT_UNAVAILABLE_TEST_ID}
      announcementKey={announcementKey}
      label={message}
    >
      <RetryableErrorView
        message={message}
        role="status"
        retryLabel={retryLabel}
        // Both or neither. `RetryableErrorView` gates the button on `onRetry` alone, so a handler
        // arriving without a label would render a button with no accessible name at all — worse
        // than the inert control the optional props exist to avoid.
        onRetry={retryLabel ? onRetry : undefined}
      />
    </ResourceMessageFrame>
  );
}
