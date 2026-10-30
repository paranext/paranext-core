import { Ref, RefCallback, useCallback, useEffect, useRef, useState } from 'react';

/**
 * Whether this window is a web view, meaning it is not the top window. In a web view `window.top`
 * is the host window: the web view's setup script deletes it, but `top` cannot be deleted, so the
 * deletion does nothing (`web-view.service-shard.ts`, the `imports` string). The main document is
 * its own top window. A missing or unreadable `top` also counts as a web view.
 *
 * @returns `true` inside a web view (or when `window.top` is missing or unreadable), `false` in the
 *   main document
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
 * It decides only whether to suppress; {@link useDismissOnWindowBlur} restores the trigger itself in
 * the main-document case.
 *
 * @param doc The document the surface renders in
 * @param isInWebView Whether that document's window is a web view; see {@link isRunningInWebView}
 * @returns `true` when focus must not be returned to the trigger
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function shouldSuppressFocusReturn(doc: Document, isInWebView: boolean): boolean {
  return doc.activeElement instanceof HTMLIFrameElement || (!doc.hasFocus() && isInWebView);
}

/**
 * Runs a close handler's own focus move unless {@link shouldSuppressFocusReturn} says focus must
 * stay where the user put it. A close-auto-focus handler that prevents Radix's default and focuses
 * something itself bypasses the shared focus-return rule; routing that focus call through here
 * applies the rule again. The caller keeps its own `preventDefault()`.
 *
 * Internal to this library; not exported from the package. Extensions combine
 * `shouldSuppressFocusReturn` and `isRunningInWebView` themselves.
 *
 * @param focus Moves focus where the handler wants it, for example `() => button.focus()`
 */
export function focusUnlessSuppressed(focus: () => void): void {
  if (!shouldSuppressFocusReturn(document, isRunningInWebView())) focus();
}

/**
 * The Radix Content props {@link useDismissOnWindowBlur} composes with the caller's.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type DismissOnWindowBlurProps<T extends HTMLElement> = {
  /** The caller's own ref for the content element (function or object), if any */
  ref?: Ref<T>;
  /** The caller's own close-auto-focus handler, if any */
  onCloseAutoFocus?: (event: Event) => void;
};

/**
 * Finds the element that controls a Radix Content: the trigger, which Radix links by
 * `aria-controls`.
 *
 * - Popover: the trigger always carries `aria-controls` naming the content's id.
 * - Menubar and DropdownMenu: the trigger carries `aria-controls` only while the menu is open, so the
 *   lookup also runs when the content mounts.
 * - ContextMenu: there is no trigger element to find, so nothing is restored, just as Radix restores
 *   nothing there after an outside interaction.
 *
 * @param content The Radix Content element
 * @returns The first element outside `content` whose `aria-controls` is exactly the content's id,
 *   else `undefined`
 */
function findControllerOf(content: HTMLElement): HTMLElement | undefined {
  if (!content.id) return undefined;
  return Array.from(content.ownerDocument.querySelectorAll<HTMLElement>('[aria-controls]')).find(
    (element) => element.getAttribute('aria-controls') === content.id && !content.contains(element),
  );
}

/**
 * Finds the element a Radix Content's `aria-labelledby` names; for Menubar and DropdownMenu that is
 * the trigger.
 *
 * @param content The Radix Content element
 * @returns The element outside `content` that the content's `aria-labelledby` names, else
 *   `undefined`
 */
function findLabellerOf(content: HTMLElement): HTMLElement | undefined {
  const labelledBy = content.getAttribute('aria-labelledby');
  const labeller = labelledBy ? content.ownerDocument.getElementById(labelledBy) : undefined;
  return labeller && !content.contains(labeller) ? labeller : undefined;
}

/**
 * Builds the close-auto-focus handler for a Radix Content: runs the caller's handler first, then
 * keeps focus where the user put it when {@link shouldSuppressFocusReturn} says returning it to the
 * trigger would pull focus across frames.
 *
 * In the main document, a close while the document has no focus (the OS window was deactivated)
 * focuses the trigger itself and prevents Radix's default: the blur's synthetic press counts as an
 * outside interaction, after which the non-modal Popover and the Menubar would skip their own
 * restore while a modal DropdownMenu would restore anyway, so the outcome is the same for all
 * three. It does so only while nothing else holds focus, so it never takes focus from an element
 * the user focused.
 *
 * The handler reads state at close time and its identity is stable; the caller's handler and the
 * trigger getter are held in refs, so neither need be stable.
 *
 * Internal to this library; not exported from the package.
 *
 * @param callerOnCloseAutoFocus The caller's own close-auto-focus handler, if any; it can itself
 *   prevent the default
 * @param getTriggerToRestore Returns the trigger to focus after a close in an unfocused main
 *   document, if there is one and it is still in the document; without it, nothing is restored
 * @returns A stable handler to pass to the Radix Content
 */
export function useGatedCloseAutoFocus(
  callerOnCloseAutoFocus?: (event: Event) => void,
  getTriggerToRestore?: () => HTMLElement | undefined,
): (event: Event) => void {
  const [isInWebView] = useState(isRunningInWebView);
  const callerOnCloseAutoFocusRef = useRef(callerOnCloseAutoFocus);
  callerOnCloseAutoFocusRef.current = callerOnCloseAutoFocus;
  const getTriggerToRestoreRef = useRef(getTriggerToRestore);
  getTriggerToRestoreRef.current = getTriggerToRestore;

  return useCallback(
    (event: Event) => {
      callerOnCloseAutoFocusRef.current?.(event);
      if (event.defaultPrevented) return;
      // Decided from state at close time rather than remembered from the blur
      if (shouldSuppressFocusReturn(document, isInWebView)) {
        event.preventDefault();
        return;
      }
      if (isInWebView || document.hasFocus()) return;
      const { activeElement } = document;
      if (activeElement && activeElement !== document.body) return;
      const trigger = getTriggerToRestoreRef.current?.();
      if (!trigger) return;
      trigger.focus({ preventScroll: true });
      // A trigger that did not take focus (a disabled one, say) leaves Radix's default in place
      if (document.activeElement === trigger) event.preventDefault();
    },
    [isInWebView],
  );
}

const WINDOW_BLUR_PRESS_MARKER = Symbol.for('platform-bible-react.window-blur-press');

/**
 * Whether this event is the outside press {@link useDismissOnWindowBlur} dispatches for a window
 * blur. Internal to this library; not exported from the package. The renderer reads the same
 * `Symbol.for` key through its own copy
 * (`src/renderer/services/overlays/window-blur-press.util.ts`), pinned by a contract test there —
 * change the key in both places.
 *
 * @param event The event to check
 * @returns `true` when the hook dispatched the event
 */
export function isWindowBlurPress(event: Event): boolean {
  return Reflect.get(event, WINDOW_BLUR_PRESS_MARKER) === true;
}

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
 * Focus rule: a dismissal caused by a click into another frame does not return focus to the
 * trigger. The user has already put focus somewhere else, and Radix's default close-auto-focus
 * would pull it back: a menu closing in one frame by returning focus to its trigger blurs the main
 * window, which would close the menu the user just opened in another frame. The returned
 * `onCloseAutoFocus` calls `preventDefault()` per {@link shouldSuppressFocusReturn}: when the active
 * element is an `<iframe>` (the user clicked into a web view from this document), or when this
 * window is a web view whose document has lost focus (the user clicked into another frame, or
 * switched applications). In the main document a lost `document.hasFocus()` can only mean the OS
 * window was deactivated, so the hook focuses the trigger itself and prevents Radix's default.
 * After an outside interaction, which the synthetic press is, the non-modal Popover and the Menubar
 * would skip their own restore, while a modal DropdownMenu would restore anyway; the outcome is the
 * same for all three. The trigger is the element whose `aria-controls` names the content's `id`,
 * looked up at close and, failing that, as found when the content mounted; else the element the
 * content's `aria-labelledby` names. A surface without either (a context menu) restores nothing.
 * Focus is never taken from an element the user focused elsewhere. Any other close, such as Escape
 * or a click elsewhere in this document, restores focus as usual. The rule reads state at close
 * time rather than remembering that a blur dismissal happened: Radix runs close-auto-focus from its
 * own timer after an asynchronous unmount, so a flag cleared by a timeout loses that race under
 * load.
 *
 * The synthetic press is untrusted and carries a window-blur marker (checked by the internal
 * `isWindowBlurPress`). The focus modality tracker and the overlay service's press recorder skip
 * it, and the overlay service's own surfaces ignore it. Window service gesture tracking, the
 * content-zoom bootstrap and the editor's selection snapshot see it and were judged benign. Another
 * document-level `pointerdown` listener that must ignore it can check the marker the same way.
 *
 * Hidden-view case (the repo's rule on hidden views): a keyboard tab switch can hide a pane that
 * holds an open menu. The blur listener then dismisses it on the next window blur, which is
 * harmless, so there is deliberately no catch-up logic.
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
  const elementRef = useRef<T | undefined>(undefined);
  // Kept after the content detaches until its close-auto-focus has run: Radix runs that from a
  // timer after the unmount
  const lastContentRef = useRef<T | undefined>(undefined);
  const capturedTriggerRef = useRef<HTMLElement | undefined>(undefined);

  useEffect(() => {
    const handleWindowBlur = () => {
      // A closed surface has no content node: ignore the blur rather than press on something else
      const element = elementRef.current;
      // Radix marks content `data-state="closed"` while it animates out, still mounted
      if (!element || element.dataset.state === 'closed') return;
      const parent = element.parentElement;
      if (!parent) return;
      const eventInit: PointerEventInit = { bubbles: true, pointerType: 'mouse' };
      // jsdom and older engines have no PointerEvent
      const syntheticPress =
        typeof PointerEvent === 'undefined'
          ? new MouseEvent('pointerdown', eventInit)
          : new PointerEvent('pointerdown', eventInit);
      Object.defineProperty(syntheticPress, WINDOW_BLUR_PRESS_MARKER, { value: true });
      parent.dispatchEvent(syntheticPress);
    };

    window.addEventListener('blur', handleWindowBlur);
    return () => window.removeEventListener('blur', handleWindowBlur);
  }, []);

  const ref = useCallback(
    (element: T | null) => {
      elementRef.current = element ?? undefined;
      // A ref callback that changes identity re-attaches the same element on every render; the
      // document-wide trigger scan runs only for a new element
      if (element && element !== lastContentRef.current) {
        lastContentRef.current = element;
        capturedTriggerRef.current = findControllerOf(element) ?? findLabellerOf(element);
      }
      if (typeof forwardedRef === 'function') {
        const forwardedCleanup = forwardedRef(element);
        // React 19 calls a cleanup returned from a callback ref instead of calling the ref with
        // `null`, so the caller's cleanup must run from ours
        if (typeof forwardedCleanup === 'function') {
          return () => {
            elementRef.current = undefined;
            forwardedCleanup();
          };
        }
      } else if (forwardedRef) forwardedRef.current = element;
      return undefined;
    },
    [forwardedRef],
  );

  const getTriggerToRestore = useCallback(() => {
    const content = lastContentRef.current;
    // Looked up again at close, as the trigger may have been replaced; the trigger found on attach
    // covers menus, whose trigger drops `aria-controls` once the menu closes, and is preferred to
    // `aria-labelledby`, which a caller can point at any label
    const trigger =
      (content && findControllerOf(content)) ??
      capturedTriggerRef.current ??
      (content && findLabellerOf(content));
    return trigger?.isConnected ? trigger : undefined;
  }, []);
  const gatedOnCloseAutoFocus = useGatedCloseAutoFocus(
    forwardedOnCloseAutoFocus,
    getTriggerToRestore,
  );
  const onCloseAutoFocus = useCallback(
    (event: Event) => {
      gatedOnCloseAutoFocus(event);
      // This close is settled. Once the content has detached, drop the nodes kept for it so they
      // can be collected; content still attached keeps them for its next close
      if (!elementRef.current) {
        lastContentRef.current = undefined;
        capturedTriggerRef.current = undefined;
      }
    },
    [gatedOnCloseAutoFocus],
  );

  return { ref, onCloseAutoFocus };
}
