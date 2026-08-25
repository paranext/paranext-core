import { ResourceMessageView } from './resource-message-view.component';

/**
 * Identifies the focusable wrapper. The message inside carries `role="status"`, so tests and e2e
 * need a separate handle for the element that actually takes focus.
 */
export const RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID = 'resource-book-not-available';

export type ResourceBookNotAvailableProps = {
  /** The already-localized message to show. See {@link ResourceMessageView}'s `message`. */
  message: string;
  /**
   * Identifies WHICH missing book in WHICH text this message is about — typically the project id
   * and book number. See {@link ResourceMessageView}'s `announcementKey`.
   */
  announcementKey?: string;
};

/**
 * Replaces a resource panel's editor when the current book is not present in the resource being
 * displayed (Model text, Bible texts, Commentaries).
 *
 * Deliberately message-only, with no action and no interface-mode branch. The sibling
 * `BookNotAvailableView` splits Simple from Power because a _project_ missing a book is actionable
 * (Manage Books) for a Power user. A published resource cannot gain a book in either mode, so the
 * two arms would say the same thing — and branching on `platform.interfaceMode` would drag in the
 * loading-gate hazard that view documents, where a setting's default is indistinguishable from an
 * answer. Callers swap only their content area and keep their header mounted alongside this: in the
 * Bible texts and Commentaries panel that header is the resource selector, so the user's actual
 * remedy — switch to a text that has the book — stays one click away; in the Model text panel it is
 * a label, which at least attributes the message to a named text.
 *
 * Layout, focus repair, and announcement are {@link ResourceMessageView}'s, shared with the
 * blank-chapter message so the two states behave identically.
 */
export function ResourceBookNotAvailable({
  message,
  announcementKey,
}: ResourceBookNotAvailableProps) {
  return (
    <ResourceMessageView
      message={message}
      testId={RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID}
      announcementKey={announcementKey}
    />
  );
}
