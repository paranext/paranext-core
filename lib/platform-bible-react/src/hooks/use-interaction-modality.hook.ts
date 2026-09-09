import { useEffect, useRef, type RefObject } from 'react';

/** Which kind of input the user most recently used, or `'none'` before any input at all. */
export type InteractionModality = 'keyboard' | 'pointer' | 'none';

/**
 * Tracks document-wide which kind of input the user most recently used, so a `focus` handler can
 * tell a focus the user drove from one the app drove.
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
 * keydown in a document this listener cannot see, so the first element focused that way is read as
 * a non-keyboard arrival until the next key press.
 *
 * @returns A ref whose `current` is the live modality. Read it inside an event handler rather than
 *   during render — it is deliberately not state, so changing modality re-renders nothing.
 */
export function useInteractionModalityRef(): RefObject<InteractionModality> {
  const modality = useRef<InteractionModality>('none');
  useEffect(() => {
    const onKeyDown = () => {
      modality.current = 'keyboard';
    };
    const onPointerDown = () => {
      modality.current = 'pointer';
    };
    // Capture phase, so the modality is already correct by the time any focus handler runs.
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('pointerdown', onPointerDown, true);
    };
  }, []);
  return modality;
}

export default useInteractionModalityRef;
