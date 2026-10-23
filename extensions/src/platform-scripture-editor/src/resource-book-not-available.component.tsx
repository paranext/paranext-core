import { ResourceMessageAction, ResourceMessageView } from './resource-message-view.component';

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
  /** An optional button under the message. See {@link ResourceMessageView}'s `action`. */
  action?: ResourceMessageAction;
};

/**
 * Replaces a resource panel's editor when the current book is not present in the resource being
 * displayed (Model text, Bible texts, Commentaries).
 *
 * No action by default, and no interface-mode branch. The sibling `BookNotAvailableView` splits
 * Simple from Power because a _project_ missing a book is actionable (Manage Books) for a Power
 * user. A published resource cannot gain a book in either mode, so the two arms would say the same
 * thing — and branching on `platform.interfaceMode` would drag in the loading-gate hazard that view
 * documents, where a setting's default is indistinguishable from an answer. A caller passes
 * `action` only when it owns a remedy: the Model text panel does, for a text the user chose
 * themselves, by offering to pick a different one. Callers swap only their content area and keep
 * their header mounted alongside this: in the Bible texts and Commentaries panel that header is the
 * resource selector, so the user's actual remedy — switch to a text that has the book — stays one
 * click away.
 *
 * Layout, focus repair, and announcement are {@link ResourceMessageView}'s, shared with the
 * blank-chapter message so the two states behave identically.
 */
export function ResourceBookNotAvailable({
  message,
  announcementKey,
  action,
}: ResourceBookNotAvailableProps) {
  return (
    <ResourceMessageView
      message={message}
      testId={RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID}
      announcementKey={announcementKey}
      action={action}
    />
  );
}
