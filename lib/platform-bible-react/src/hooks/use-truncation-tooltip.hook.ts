import { useCallback, useRef, useState, type PointerEvent, type RefObject } from 'react';

/** State and handlers for driving a controlled tooltip that only opens when its trigger is clipped. */
export type UseTruncationTooltipResult<T extends HTMLElement> = {
  /** Attach to the trigger element whose text may be truncated; used to measure clipping. */
  ref: RefObject<T | null>;
  /** Whether the tooltip should currently be open. Pass to a controlled `<Tooltip open={...}>`. */
  open: boolean;
  /** Pointer-enter handler for the trigger; opens the tooltip only when the trigger text is clipped. */
  onPointerEnter: () => void;
  /** Pointer-leave handler for the trigger; closes the tooltip. */
  onPointerLeave: () => void;
  /**
   * Pointer-move handler for the `TooltipTrigger`. Required whenever the tooltip passes Radix's
   * closes through `onOpenChange`: it stops Radix's own hover handling, whose zero-delay open can
   * still read this controlled tooltip as closed, broadcast Radix's "another tooltip opened" event,
   * and so close the tooltip right after `onPointerEnter` opened it.
   */
  onPointerMove: (event: PointerEvent) => void;
};

/**
 * Drives a controlled tooltip that opens on hover only when the trigger element's text is actually
 * truncated (its content overflows the visible box, i.e. `scrollWidth > clientWidth`). Useful for
 * revealing the full text of a label that uses CSS truncation, without showing a redundant tooltip
 * when the text already fits.
 *
 * Attach the returned `ref` to the truncating trigger element, spread `onPointerEnter` /
 * `onPointerLeave` / `onPointerMove` onto the `TooltipTrigger`, and pass `open` to a controlled
 * Radix `<Tooltip open={...}>`.
 *
 * @typeParam T - The type of the trigger element (e.g. `HTMLSpanElement`, `HTMLDivElement`).
 * @returns An object with `ref`, `open`, `onPointerEnter`, `onPointerLeave`, and `onPointerMove`.
 */
export function useTruncationTooltip<T extends HTMLElement>(): UseTruncationTooltipResult<T> {
  const [open, setOpen] = useState(false);
  // React's ref API requires `null` as the initial value for DOM refs.
  // eslint-disable-next-line no-null/no-null
  const ref = useRef<T>(null);

  const onPointerEnter = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    // Open the tooltip only when the trigger is actually clipped (its text overflows the visible box).
    if (element.scrollWidth > element.clientWidth) setOpen(true);
  }, []);

  const onPointerLeave = useCallback(() => setOpen(false), []);

  // Radix's trigger skips its own handler for an event an earlier handler has default-prevented.
  // Pointer moves have no default action of their own, so nothing else is lost.
  const onPointerMove = useCallback((event: PointerEvent) => event.preventDefault(), []);

  return { ref, open, onPointerEnter, onPointerLeave, onPointerMove };
}

export default useTruncationTooltip;
