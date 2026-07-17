import { useEffect, useRef } from 'react';
import { Toaster } from 'sonner';
import './notification-display.scss';

// Sonner's default focus hotkey (Alt+T). Declared here so the exact same combo drives both Sonner's
// own <Toaster> and our focus-cycling handler below - the two must not drift apart.
const NOTIFICATION_TOASTER_HOTKEY = ['altKey', 'KeyT'];

/**
 * Whether a keydown matches {@link NOTIFICATION_TOASTER_HOTKEY}, using the same semantics as Sonner
 * 1.7.4 (a modifier name like `altKey` is read as a boolean flag; anything else is matched against
 * `event.code`). Spelled out rather than indexing the event by a dynamic key so it stays type-safe
 * without a type assertion.
 */
function eventMatchesHotkey(event: KeyboardEvent, hotkey: readonly string[]): boolean {
  return hotkey.every((key) => {
    switch (key) {
      case 'altKey':
        return event.altKey;
      case 'ctrlKey':
        return event.ctrlKey;
      case 'metaKey':
        return event.metaKey;
      case 'shiftKey':
        return event.shiftKey;
      default:
        return event.code === key;
    }
  });
}

// PT-4193: class hooks for notification-display.scss's fix for the buttoned-toast layout collapse -
// see that file for the full explanation. Applied here (the `Toaster`'s shared `toastOptions`)
// rather than per-notification in notification.service-host.ts so every toast gets the hooks
// uniformly; the CSS itself only changes layout when at least one button is present.
export function NotificationDisplay() {
  // Index of the toast list Alt+T last focused, so repeated presses cycle across every list.
  const focusedListIndexRef = useRef(-1);

  // PT-4193 (review C61-2): with a per-toast `position`, Sonner 1.7.4 renders one `<ol>` per
  // distinct position but assigns them all a single shared `ref`, so its own Alt+T handler only
  // ever focuses the LAST list - leaving toasts in every other position group unreachable by
  // keyboard (each `<ol>` is also its own focus trap that ejects focus when you try to Tab out to a
  // sibling list). Cycle focus across every non-empty list so repeated Alt+T reaches them all.
  useEffect(() => {
    function cycleToastListFocus() {
      const lists = Array.from(
        document.querySelectorAll<HTMLElement>('[data-sonner-toaster]'),
      ).filter((list) => list.querySelector('[data-sonner-toast]'));
      // One (or zero) lists: Sonner's built-in hotkey already reaches it correctly - don't interfere.
      if (lists.length <= 1) return;
      const nextIndex = (focusedListIndexRef.current + 1) % lists.length;
      focusedListIndexRef.current = nextIndex;
      // Neutralize Sonner's per-`<ol>` focus trap: each list restores focus to the pre-region
      // element when focus leaves it, which would otherwise eject us the moment we move to a sibling
      // list. Blurring first lets that restore run harmlessly; then we focus the target list.
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      lists[nextIndex].focus();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (!eventMatchesHotkey(event, NOTIFICATION_TOASTER_HOTKEY)) return;
      // Run after Sonner's own synchronous hotkey handler (which expands the stack and focuses its
      // single shared ref) has finished for this event, so our focus target wins. A macrotask (not
      // a microtask) makes that ordering independent of listener registration order: a timer
      // callback never runs until the whole keydown dispatch task - every listener, in any order -
      // has completed, whereas a microtask queued by a listener that happened to run BEFORE
      // Sonner's would flush between listeners and let Sonner steal the focus back.
      setTimeout(cycleToastListFocus, 0);
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Toaster
      hotkey={NOTIFICATION_TOASTER_HOTKEY}
      toastOptions={{
        classNames: {
          toast: 'notification-toast',
          content: 'notification-toast-content',
          actionButton: 'notification-toast-action-button',
          cancelButton: 'notification-toast-cancel-button',
        },
      }}
    />
  );
}

export default NotificationDisplay;
