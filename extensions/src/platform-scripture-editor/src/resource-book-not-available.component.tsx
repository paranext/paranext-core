import { useEffect, useRef } from 'react';

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
 * Accessibility: this REPLACES the editor subtree, so its arrival is a content swap a screen-reader
 * user gets no other notice of, and the focused element inside the editor is destroyed along with
 * it. The message region is therefore `role="status"`, and takes focus on mount — but only when
 * this document already had focus, so navigating here from the toolbar's book/chapter control does
 * not yank focus out of the control the user is still using.
 */
export function ResourceBookNotAvailable({ message }: ResourceBookNotAvailableProps) {
  // Using null for React ref compatibility
  // eslint-disable-next-line no-null/no-null
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // `document.hasFocus()` distinguishes "the editor inside this iframe had focus and we just
    // unmounted it, so focus has fallen to `body`" from "focus is in the toolbar outside this
    // iframe". Only the first case is ours to repair.
    if (!document.hasFocus()) return;
    regionRef.current?.focus();
  }, []);

  return (
    <div
      ref={regionRef}
      role="status"
      tabIndex={-1}
      className="tw:flex tw:h-full tw:items-center tw:justify-center tw:p-8 tw:text-center tw:outline-none"
    >
      <p>{message}</p>
    </div>
  );
}
