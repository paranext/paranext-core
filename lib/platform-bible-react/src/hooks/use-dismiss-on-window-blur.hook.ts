import { Ref, RefCallback, useCallback, useEffect, useRef } from 'react';

/** The Radix Content props {@link useDismissOnWindowBlur} composes with the caller's. */
export type DismissOnWindowBlurProps<T extends HTMLElement> = {
  /** The caller's own ref for the content element (function or object), if any */
  ref?: Ref<T>;
  /** The caller's own close-auto-focus handler, if any */
  onCloseAutoFocus?: (event: Event) => void;
};

/**
 * Treats the window losing focus as a press outside the calling surface, so an open menu or popover
 * dismisses itself.
 *
 * Web views are iframes, so a click in another web view, or in another application, never produces
 * a `pointerdown` in this document and Radix's outside-press detection never runs. Native menus
 * close when their application is deactivated; this hook gives Radix surfaces the same behavior.
 * From mount until unmount, a `blur` on `window` dispatches a synthetic `pointerdown` on the
 * content's parent element. A closed surface has no content node and the blur is ignored, so a
 * mounted-but-closed surface never presses on an unrelated open layer. Radix's `DismissableLayer`
 * listens for `pointerdown` on the owner document and does not check `isTrusted`, so the event
 * takes its normal outside-press path: `onPointerDownOutside` runs and can call `preventDefault()`
 * to keep the surface open, and a surface whose `open` is controlled without an `onOpenChange`
 * stays open.
 *
 * The press lands "outside this surface, but inside whatever hosts it". A popover portaled into a
 * dialog (via `PopoverPortalContainerProvider`) closes while the dialog's own `DismissableLayer`
 * sees an inside press and stays open. A popover or menu portaled to `document.body` is pressed on
 * from its own Radix popper wrapper (`data-radix-popper-content-wrapper`, what `parentElement`
 * resolves to there), which is outside it. A modal menu opened from inside a dialog is protected by
 * Radix anyway: a layer below the top-most layer that disables outside pointer events does not
 * dismiss.
 *
 * Focus rule: a dismissal caused by window blur does not return focus to the trigger. The user has
 * already put focus somewhere else (another frame, another application), and Radix's default
 * close-auto-focus would pull it back. That matters most across frames: a menu closing in one frame
 * by returning focus to its trigger blurs the main window, which would close the menu the user just
 * opened in another frame. The returned `onCloseAutoFocus` calls `preventDefault()` on the
 * close-auto-focus event of a blur dismissal (Radix runs it from a zero-delay timer queued while
 * unmounting, so the hook's flag outlives the press by one timer) and leaves every other close,
 * such as Escape or a click outside, restoring focus as usual.
 *
 * Hidden-view case: an inactive-tab pane cannot hold an open menu, so a stray blur there is a
 * harmless no-op and there is deliberately no catch-up logic. See
 * `.claude/rules/cross-view-sync-hidden-views.md`.
 *
 * @param props The caller's `ref` and `onCloseAutoFocus` for the Radix Content. Both still work:
 *   the ref receives the element too, and the caller's handler runs first and can itself prevent
 *   the default.
 * @returns `ref`: ref callback to attach to the surface's content element. The element is `null`
 *   while the surface is closed, which makes the blur a no-op. Its identity is stable unless
 *   `props.ref` changes. `onCloseAutoFocus`: handler to pass to the content. Spread both onto the
 *   Radix Content.
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function useDismissOnWindowBlur<T extends HTMLElement>({
  ref: forwardedRef,
  onCloseAutoFocus: forwardedOnCloseAutoFocus,
}: DismissOnWindowBlurProps<T>): {
  ref: RefCallback<T>;
  onCloseAutoFocus: (event: Event) => void;
} {
  const elementRef = useRef<T | undefined>(undefined);
  const isBlurDismissalInFlightRef = useRef(false);
  const onCloseAutoFocusRef = useRef(forwardedOnCloseAutoFocus);
  onCloseAutoFocusRef.current = forwardedOnCloseAutoFocus;

  useEffect(() => {
    const handleWindowBlur = () => {
      // A closed surface has no content node: ignore the blur rather than press on something else
      const parent = elementRef.current?.parentElement;
      if (!parent) return;
      const eventInit = { bubbles: true, pointerType: 'mouse' };
      // jsdom and older engines have no PointerEvent
      const syntheticPress =
        typeof PointerEvent === 'undefined'
          ? new MouseEvent('pointerdown', eventInit)
          : new PointerEvent('pointerdown', eventInit);
      // Radix handles the discrete press synchronously and unmounts the content, but its focus scope
      // runs close-auto-focus from a `setTimeout(0)` queued during that unmount. The flag is cleared
      // by a timer queued after the dispatch, so it runs after the focus scope's timer.
      isBlurDismissalInFlightRef.current = true;
      parent.dispatchEvent(syntheticPress);
      setTimeout(() => {
        isBlurDismissalInFlightRef.current = false;
      }, 0);
    };

    window.addEventListener('blur', handleWindowBlur);
    return () => window.removeEventListener('blur', handleWindowBlur);
  }, []);

  const ref = useCallback(
    (element: T | null) => {
      elementRef.current = element ?? undefined;
      if (typeof forwardedRef === 'function') forwardedRef(element);
      else if (forwardedRef) forwardedRef.current = element;
    },
    [forwardedRef],
  );

  const onCloseAutoFocus = useCallback((event: Event) => {
    onCloseAutoFocusRef.current?.(event);
    if (isBlurDismissalInFlightRef.current && !event.defaultPrevented) event.preventDefault();
  }, []);

  return { ref, onCloseAutoFocus };
}
