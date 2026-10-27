import { Button, EmptyState } from 'platform-bible-react';
import { useFocusReplacedContent } from './use-focus-replaced-content.hook';

/** A button shown under the message, for a caller that can offer the user a way out. */
export type ResourceMessageAction = {
  /** The already-localized button text. */
  label: string;
  onClick: () => void;
};

export type ResourceMessageViewProps = {
  /**
   * The already-localized sentence to show. Resolved by the caller because each panel names the
   * thing the user is looking at — "this model text", "this Bible text", "this commentary" —
   * following the per-resource-type string convention the resource panels already use for their
   * other zero-states.
   */
  message: string;
  /** `data-testid` for the focusable wrapper, so a test can address the element that takes focus. */
  testId: string;
  /**
   * Identifies WHICH subject this message is about — typically the project id plus the book or
   * chapter. When it changes while a message stays on screen, the wrapper remounts, which drops
   * focus to `body` and lets the focus repair below run again.
   *
   * Without it, moving from one silent case to another is silent: the component stays mounted at
   * the same tree position with byte-identical text, so `aria-live` has nothing to report and a
   * screen-reader user gets no confirmation that their navigation applied at all.
   */
  announcementKey?: string;
  /**
   * An optional button under the sentence. It sits outside the `role="status"` region, so only the
   * sentence is announced. Leave it out when the message has no remedy.
   */
  action?: ResourceMessageAction;
};

/**
 * The shared body of a resource panel's "there is no text to show, and here is why" state: a
 * centred `EmptyState` sentence that takes focus when it replaces the editor.
 *
 * `EmptyState` is the message-only zero-state primitive `adr-empty-is-zero-state-primitive`
 * reserves for a bare sentence with no title, media, or action; going through it keeps these
 * reading like every other empty state in the app and supplies the `role="status"` live region. The
 * optional `action` button is a deliberate exception to that rule's "action means `Empty`": it sits
 * beside `EmptyState` so the sentence looks the same with or without it, as the panels that pass no
 * action (Bible texts, the main editor) need. See `adr-resource-missing-book-message`.
 *
 * Accessibility: this REPLACES the editor subtree, so its arrival is a content swap a screen-reader
 * user gets no other notice of, and the focused element inside the editor is destroyed along with
 * it. `EmptyState` mounts its `role="status"` region with the text already present, which several
 * screen readers do not announce — the focus move is what actually carries the message, and closing
 * that gap belongs to the shared primitive (PT-4416). The wrapper is the focus target, taking focus
 * on mount via {@link useFocusReplacedContent}, which repairs focus only when it actually fell to
 * the body, so arriving here by picking a text from a panel's own selector does not yank focus off
 * that selector.
 *
 * The wrapper carries `aria-label` rather than only wrapping the message: a role-less `div` maps to
 * `generic`, which does not support name-from-content, so a focused wrapper without one has an
 * empty accessible name and is announced as "group" or as nothing at all. `aria-label` is used in
 * preference to `aria-labelledby` because `EmptyState`'s `id` prop is a `data-testid`, not a DOM
 * id. The wrapper deliberately does NOT repeat `role="status"` — nesting two live regions is worse
 * than one.
 */
export function ResourceMessageView({
  message,
  testId,
  announcementKey,
  action,
}: ResourceMessageViewProps) {
  const regionRef = useFocusReplacedContent<HTMLDivElement>(announcementKey);

  return (
    // Keyed on the FOCUS TARGET, not on the message inside it. A new subject has to remount this
    // element for the announcement to carry: a surviving wrapper keeps focus, so the focus repair
    // sees a non-body `activeElement` and declines, leaving only a remounted `role="status"` that
    // several screen readers do not report. Remounting here drops focus to `body`, which is the
    // condition the repair is waiting for.
    <div
      key={announcementKey}
      ref={regionRef}
      data-testid={testId}
      tabIndex={-1}
      aria-label={message}
      className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center-safe tw:gap-4 tw:overflow-y-auto tw:px-4 tw:outline-none"
    >
      <EmptyState message={message} className="tw:text-center" />
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}
