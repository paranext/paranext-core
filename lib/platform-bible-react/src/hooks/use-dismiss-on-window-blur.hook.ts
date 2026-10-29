import { RefObject, useEffect } from 'react';

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
 * from its own wrapper, which is outside it. A modal menu opened from inside a dialog is protected
 * by Radix anyway: a layer below the top-most layer that disables outside pointer events does not
 * dismiss.
 *
 * Hidden-view case: an inactive-tab pane cannot hold an open menu, so a stray blur there is a
 * harmless no-op and there is deliberately no catch-up logic. See
 * `.claude/rules/cross-view-sync-hidden-views.md`.
 *
 * @param contentRef Ref to the surface's content element. It holds `null` while the surface is
 *   closed, which makes the blur a no-op.
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function useDismissOnWindowBlur(contentRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const handleWindowBlur = () => {
      // A closed surface has no content node: ignore the blur rather than press on something else
      const parent = contentRef.current?.parentElement;
      if (!parent) return;
      const eventInit = { bubbles: true, pointerType: 'mouse' };
      // jsdom and older engines have no PointerEvent
      const syntheticPress =
        typeof PointerEvent === 'undefined'
          ? new MouseEvent('pointerdown', eventInit)
          : new PointerEvent('pointerdown', eventInit);
      parent.dispatchEvent(syntheticPress);
    };

    window.addEventListener('blur', handleWindowBlur);
    return () => window.removeEventListener('blur', handleWindowBlur);
  }, [contentRef]);
}
