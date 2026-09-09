import { useEffect } from 'react';

/**
 * Which kind of input the user most recently used.
 *
 * `'none'` means no key or pointer has been seen yet in this document — a fresh page, or a web view
 * whose iframe has not been interacted with. It is deliberately its own value rather than folded
 * into either side, because the two answers a caller might want differ:
 *
 * - "Did the user drive this focus?" — `'none'` is **no**. Nothing the user did put focus here.
 * - "Should a hint reveal itself?" — `'none'` is usually **yes**. A control focused before any input
 *   at all is being reached programmatically or by the browser's initial focus, and explaining
 *   itself costs nothing because no pointer is hovering to explain it instead.
 *
 * So compare against the value you mean (`=== 'keyboard'`, `=== 'pointer'`), never against its
 * negation, and say in a comment at the call site which way `'none'` falls.
 */
export type InteractionModality = 'keyboard' | 'pointer' | 'none';

/**
 * Document-wide, and deliberately so: the modality is a property of the user, not of a component,
 * and it has to survive across mounts. A component that mounts after the user's last click — a
 * label whose error state cleared, a toolbar rebuilt on a layout change — must still read
 * `'pointer'`, or it treats the focus Radix hands back on menu close as a keyboard arrival and pops
 * a tooltip nobody asked for.
 */
const modality: { current: InteractionModality } = { current: 'none' };

/** Live `useInteractionModalityRef` callers, so the listeners attach once and detach at zero. */
let subscriberCount = 0;

const onKeyDown = () => {
  modality.current = 'keyboard';
};
const onPointerDown = () => {
  modality.current = 'pointer';
};

/**
 * Tracks which kind of input the user most recently used, so a `focus` handler can tell a focus the
 * user drove from one the app drove.
 *
 * A `focus` event alone cannot make that distinction. Radix hands focus back to a trigger when the
 * popover or select it opened closes (`onCloseAutoFocus`), and components routinely focus a control
 * once their data resolves — both fire a real `focus` with the pointer nowhere near it, and
 * treating either as "the user tabbed here" reveals UI nobody asked for.
 *
 * `:focus-visible` encodes the same idea but cannot be relied on here, in either direction:
 *
 * - Chromium reports it **true** for a programmatic `.focus()` in a document that has seen no pointer
 *   input — the situation of any web view opened by a click in the host document, since that click
 *   lands outside the view's own iframe.
 * - Jsdom reports it **false** for the programmatic `focus()` that tests use to simulate a keyboard
 *   arrival, so a guard built on it cannot be asserted in either direction.
 *
 * Listens on the document in the capture phase, because a Tab press that moves focus _into_ a
 * component fires its keydown on whatever held focus before — usually something outside it. One gap
 * follows from that: tabbing straight from a host document into a web view's iframe fires the
 * keydown in a document this listener cannot see, so the first element focused that way reads as
 * `'none'` until the next key press.
 *
 * @returns A ref-shaped object whose `current` is the live modality — shared by every caller in the
 *   document, so it carries the user's history across mounts. Read it inside an event handler
 *   rather than during render: it is deliberately not state, so a change re-renders nothing.
 */
export function useInteractionModalityRef(): { readonly current: InteractionModality } {
  useEffect(() => {
    subscriberCount += 1;
    if (subscriberCount === 1) {
      // Capture phase, so the modality is already correct by the time any focus handler runs.
      document.addEventListener('keydown', onKeyDown, true);
      document.addEventListener('pointerdown', onPointerDown, true);
    }
    return () => {
      subscriberCount -= 1;
      if (subscriberCount === 0) {
        document.removeEventListener('keydown', onKeyDown, true);
        document.removeEventListener('pointerdown', onPointerDown, true);
      }
    };
  }, []);
  return modality;
}

export default useInteractionModalityRef;
