import { EmptyState } from 'platform-bible-react';
import type { ReactNode } from 'react';
import { useFocusReplacedContent } from './use-focus-replaced-content.hook';

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
};

export type ResourceMessageFrameProps = {
  /** `data-testid` for the focusable wrapper, so a test can address the element that takes focus. */
  testId: string;
  /** See {@link ResourceMessageViewProps.announcementKey}. */
  announcementKey?: string;
  /**
   * Accessible name for the wrapper — normally the message being shown, since the wrapper names the
   * region rather than any control inside it.
   */
  label: string;
  /** What fills the region: a bare message, or a richer zero state with its own recovery action. */
  children: ReactNode;
};

/**
 * The focus-and-announcement wrapper every "the panel has no text to show" state sits in,
 * independent of what fills it.
 *
 * Extracted because these states do not all render the same body — a failure the reader can
 * re-drive goes through the library's `RetryableErrorView`, so that one retry button looks and
 * behaves the same wherever the app reports the same condition — while every one of them needs the
 * identical focus repair and re-announcement on navigation.
 *
 * Accessibility: this REPLACES the editor subtree, so its arrival is a content swap a screen-reader
 * user gets no other notice of, and the focused element inside the editor is destroyed along with
 * it. A live region mounted with its text already present is not reliably announced, so the focus
 * move is what actually carries the message. The wrapper takes focus on mount via
 * {@link useFocusReplacedContent}, which repairs focus only when it actually fell to the body, so
 * arriving here by picking a text from a panel's own selector does not yank focus off that
 * selector.
 *
 * The wrapper carries `aria-label` rather than only wrapping the message: a role-less `div` maps to
 * `generic`, which does not support name-from-content, so a focused wrapper without one has an
 * empty accessible name and is announced as "group" or as nothing at all. It deliberately does NOT
 * carry a `role` of its own — the body it wraps supplies the live region, and nesting two is worse
 * than one.
 */
export function ResourceMessageFrame({
  testId,
  announcementKey,
  label,
  children,
}: ResourceMessageFrameProps) {
  const regionRef = useFocusReplacedContent<HTMLDivElement>(announcementKey);

  return (
    // Keyed on the FOCUS TARGET, not on the message inside it. A new subject has to remount this
    // element for the announcement to carry: a surviving wrapper keeps focus, so the focus repair
    // sees a non-body `activeElement` and declines, leaving only a remounted live region that
    // several screen readers do not report. Remounting here drops focus to `body`, which is the
    // condition the repair is waiting for.
    <div
      key={announcementKey}
      ref={regionRef}
      data-testid={testId}
      tabIndex={-1}
      aria-label={label}
      className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:px-4 tw:outline-none"
    >
      {children}
    </div>
  );
}

/**
 * The shared body of a resource panel's "there is no text to show, and here is why" state: a
 * centred `EmptyState` sentence that takes focus when it replaces the editor.
 *
 * `EmptyState` is the message-only zero-state primitive `adr-empty-is-zero-state-primitive`
 * reserves for a bare sentence with no title, media, or action; going through it keeps these
 * reading like every other empty state in the app and supplies the `role="status"` live region.
 *
 * For the states whose whole content is that sentence. A state that also offers a way out renders
 * {@link ResourceMessageFrame} directly around a richer body, so its recovery control matches the
 * one every other surface shows for the same condition.
 *
 * `EmptyState` supplies the `role="status"` live region; the focus repair and re-announcement are
 * {@link ResourceMessageFrame}'s, which also explains why the message is not reliably announced by
 * the live region alone (closing that gap belongs to the shared primitive — PT-4416).
 */
export function ResourceMessageView({
  message,
  testId,
  announcementKey,
}: ResourceMessageViewProps) {
  return (
    <ResourceMessageFrame testId={testId} announcementKey={announcementKey} label={message}>
      <EmptyState message={message} className="tw:text-center" />
    </ResourceMessageFrame>
  );
}
