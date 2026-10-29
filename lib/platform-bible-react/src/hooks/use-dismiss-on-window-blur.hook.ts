import { Ref, RefCallback, useCallback, useEffect, useRef, useState } from 'react';

/**
 * Whether this window is a web view, meaning it is not the top window. In Paratext web views
 * `window.top` is deleted (`undefined`), which also counts as a web view; the main document is its
 * own top window.
 *
 * @returns `true` inside a web view (or when `window.top` cannot be read), `false` in the main
 *   document
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function isRunningInWebView(): boolean {
  try {
    return window.top !== window;
  } catch {
    return true;
  }
}

/**
 * Decides whether closing a menu or popover must not return focus to its trigger.
 *
 * Returning focus across frames closes the menu the user just opened elsewhere, so focus stays
 * where the user put it when that is a web view (`activeElement` is an `<iframe>`) or, inside a web
 * view, when the window no longer has focus. In the main document `!hasFocus()` can only mean the
 * OS window was deactivated (a click into a web view leaves the document focused with the iframe as
 * active element), so restoring the trigger there is safe and helps keyboard users returning from
 * another application. Inside a web view it is ambiguous (switching applications versus clicking
 * into another frame) and stays suppressed.
 *
 * @param doc The document the surface renders in
 * @param isInWebView Whether that document's window is a web view; see {@link isRunningInWebView}
 * @returns `true` when focus must not be returned to the trigger
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function shouldSuppressFocusReturn(doc: Document, isInWebView: boolean): boolean {
  return doc.activeElement instanceof HTMLIFrameElement || (!doc.hasFocus() && isInWebView);
}

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
 * content's parent element. A closed surface has no content node (unmounted) or a content node
 * marked `data-state="closed"` (animating out), and the blur is ignored in both cases, so a
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
 * already put focus somewhere else, and Radix's default close-auto-focus would pull it back. That
 * matters most across frames: a menu closing in one frame by returning focus to its trigger blurs
 * the main window, which would close the menu the user just opened in another frame. The returned
 * `onCloseAutoFocus` calls `preventDefault()` per {@link shouldSuppressFocusReturn}: when the active
 * element is an `<iframe>` (the user clicked into a web view from this document), or when this
 * window is a web view whose document no longer has focus (the user clicked into another frame, or
 * switched applications). In the main document a lost `document.hasFocus()` can only mean the OS
 * window was deactivated, so focus returns to the trigger there. Any other close, such as Escape or
 * a click elsewhere in this document, restores focus as usual. The rule reads state at close time
 * rather than remembering that a blur dismissal happened: Radix runs close-auto-focus from its own
 * timer after an asynchronous unmount, so a flag cleared by a timeout loses that race under load.
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
  /** Ref callback for the Radix Content; also forwards the caller's ref */
  ref: RefCallback<T>;
  /** Close-auto-focus handler for the Radix Content; also calls the caller's handler */
  onCloseAutoFocus: (event: Event) => void;
} {
  const [isInWebView] = useState(isRunningInWebView);
  const elementRef = useRef<T | undefined>(undefined);
  const onCloseAutoFocusRef = useRef(forwardedOnCloseAutoFocus);
  onCloseAutoFocusRef.current = forwardedOnCloseAutoFocus;

  useEffect(() => {
    const handleWindowBlur = () => {
      // A closed surface has no content node: ignore the blur rather than press on something else
      const element = elementRef.current;
      // Radix marks content `data-state="closed"` while it animates out, still mounted
      if (!element || element.dataset.state === 'closed') return;
      const parent = element.parentElement;
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
  }, []);

  const ref = useCallback(
    (element: T | null) => {
      elementRef.current = element ?? undefined;
      if (typeof forwardedRef === 'function') forwardedRef(element);
      else if (forwardedRef) forwardedRef.current = element;
    },
    [forwardedRef],
  );

  const onCloseAutoFocus = useCallback(
    (event: Event) => {
      onCloseAutoFocusRef.current?.(event);
      if (event.defaultPrevented) return;
      // Decided from state at close time rather than remembered from the blur
      if (shouldSuppressFocusReturn(document, isInWebView)) event.preventDefault();
    },
    [isInWebView],
  );

  return { ref, onCloseAutoFocus };
}
