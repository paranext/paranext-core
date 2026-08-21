import { EmptyState } from 'platform-bible-react';
import { useFocusReplacedContent } from './use-focus-replaced-content.hook';

/**
 * Identifies the focusable wrapper. The message inside carries `role="status"`, so tests and e2e
 * need a separate handle for the element that actually takes focus.
 */
export const RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID = 'resource-book-not-available';

export type ResourceBookNotAvailableProps = {
  /**
   * The already-localized message to show. Resolved by the caller because each panel names the
   * thing the user is looking at — "this model text", "this Bible text", "this commentary" —
   * following the per-resource-type string convention the resource panel already uses for its other
   * zero-states.
   */
  message: string;
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
 * The message itself is `EmptyState`, the shared message-only zero-state primitive that ADR-0016
 * reserves for exactly this case (a bare sentence, no title, media, or action). Going through it
 * rather than a local `<p>` is what keeps this reading like every other empty state in the app —
 * `EmptyState` supplies the `tw:text-sm tw:text-muted-foreground` treatment and the `role="status"`
 * live region. This component contributes only the layout that centres it in a panel-sized area and
 * the focus target.
 *
 * Accessibility: this REPLACES the editor subtree, so its arrival is a content swap a screen-reader
 * user gets no other notice of, and the focused element inside the editor is destroyed along with
 * it. `EmptyState` marks the message `role="status"`; the wrapper deliberately does NOT repeat that
 * role, since nesting two status regions is worse than one. The wrapper is the focus target
 * instead, taking focus on mount via {@link useFocusReplacedContent} — which repairs focus only when
 * it actually fell to the body, so arriving here by picking a text from the panel's own selector
 * does not yank focus off that selector.
 */
export function ResourceBookNotAvailable({ message }: ResourceBookNotAvailableProps) {
  const regionRef = useFocusReplacedContent<HTMLDivElement>();

  return (
    <div
      ref={regionRef}
      data-testid={RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID}
      tabIndex={-1}
      className="tw:flex tw:h-full tw:items-center tw:justify-center tw:px-4 tw:outline-none"
    >
      <EmptyState message={message} className="tw:text-center" />
    </div>
  );
}
