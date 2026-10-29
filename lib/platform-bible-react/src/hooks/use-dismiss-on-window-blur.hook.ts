import { useEffect } from 'react';

/**
 * Treats the window losing focus as a press outside the calling surface, so an open menu or popover
 * dismisses itself.
 *
 * Web views are iframes, so a click in another web view, or in another application, never produces
 * a `pointerdown` in this document and Radix's outside-press detection never runs. Native menus
 * close when their application is deactivated; this hook gives Radix surfaces the same behavior.
 * While enabled, a `blur` on `window` dispatches a synthetic `pointerdown` on `document.body`.
 * Radix's `DismissableLayer` listens for `pointerdown` on the owner document and does not check
 * `isTrusted`, so the event takes its normal outside-press path: `onPointerDownOutside` runs and
 * can call `preventDefault()` to keep the surface open, and a surface whose `open` is controlled
 * without an `onOpenChange` stays open.
 *
 * Hidden-view case: an inactive-tab pane cannot hold an open menu, so a stray blur there is a
 * harmless no-op and there is deliberately no catch-up logic. See
 * `.claude/rules/cross-view-sync-hidden-views.md`.
 *
 * @param isEnabled Whether the surface is open. The listener exists only while this is `true`.
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function useDismissOnWindowBlur(isEnabled: boolean): void {
  useEffect(() => {
    if (!isEnabled) return undefined;

    const handleWindowBlur = () => {
      const eventInit = { bubbles: true, pointerType: 'mouse' };
      // jsdom and older engines have no PointerEvent
      const syntheticPress =
        typeof PointerEvent === 'undefined'
          ? new MouseEvent('pointerdown', eventInit)
          : new PointerEvent('pointerdown', eventInit);
      document.body.dispatchEvent(syntheticPress);
    };

    window.addEventListener('blur', handleWindowBlur);
    return () => window.removeEventListener('blur', handleWindowBlur);
  }, [isEnabled]);
}
