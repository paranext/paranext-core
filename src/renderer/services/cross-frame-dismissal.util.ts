import { Unsubscriber } from 'platform-bible-utils';

/**
 * Matches the content of every open Radix surface that positions itself against a trigger: menus
 * (Menubar, DropdownMenu, ContextMenu), popovers, selects and tooltips. Modal dialogs are not
 * popper-positioned, so a click in another frame deliberately leaves them open.
 */
const OPEN_POPPER_SURFACE_SELECTOR = '[data-radix-popper-content-wrapper]';

/**
 * The scripture editor's own right-click menu. It is not a Radix surface: the editor package
 * portals it to `body` under these classes and closes it on any `pointerdown` reaching its
 * document.
 */
const EDITOR_CONTEXT_MENU_SELECTOR = '.typeahead-popover';

/** Every open surface a press in another frame should close */
const OPEN_SURFACE_SELECTOR = `${OPEN_POPPER_SURFACE_SELECTOR}, ${EDITOR_CONTEXT_MENU_SELECTOR}`;

/**
 * The open surfaces that switch the main window's title-bar drag regions off: menus, popovers and
 * select lists, but not tooltips, which open on hover. Mirrors the main-document selector in
 * `app.component.scss`.
 */
const CLICK_TO_CLOSE_SURFACE_SELECTOR = `${OPEN_POPPER_SURFACE_SELECTOR} :is([role='menu'], [role='dialog'], [role='listbox']), ${EDITOR_CONTEXT_MENU_SELECTOR}`;

/**
 * Set on the main document's root element while any web view has a menu, popover or select list
 * open. `app.component.scss` switches the title-bar drag regions off while it is present, so a
 * click there reaches the page and closes the web view's menu instead of starting a window drag.
 */
export const WEB_VIEW_MENU_OPEN_ATTRIBUTE = 'data-web-view-menu-open';

/**
 * Parent-document overlays the overlay service renders ON BEHALF OF a web view (command palettes,
 * anchored popovers). Clicking one is interacting with that web view's UI, so it must not close the
 * web view's own menus.
 */
const WEB_VIEW_OVERLAY_SELECTOR =
  '[data-overlay-host], [data-overlay-popover], [data-overlay-command-palette]';

/** Every frame whose open surfaces close when the user presses somewhere in another frame */
const registeredWindows = new Set<Window>();

/** The registered web view frames that currently have a {@link CLICK_TO_CLOSE_SURFACE_SELECTOR} open */
const framesWithOpenMenu = new Set<Window>();

function updateWebViewMenuOpenAttribute(): void {
  document.documentElement.toggleAttribute(
    WEB_VIEW_MENU_OPEN_ATTRIBUTE,
    framesWithOpenMenu.size > 0,
  );
}

/**
 * Keeps {@link framesWithOpenMenu} current for one web view frame. Watches the whole body because a
 * surface can portal into a container nested inside it (a popover inside a dialog). Attributes and
 * text are not watched: a surface opening or closing always adds or removes its element.
 *
 * @returns Function that stops watching and forgets the frame
 */
function trackOpenMenus(frameWindow: Window): () => void {
  const update = () => {
    let hasOpenMenu = false;
    try {
      hasOpenMenu = !!frameWindow.document.querySelector(CLICK_TO_CLOSE_SURFACE_SELECTOR);
    } catch {
      // The frame navigated away and can no longer be read; whatever it had open is gone
    }
    if (hasOpenMenu) framesWithOpenMenu.add(frameWindow);
    else framesWithOpenMenu.delete(frameWindow);
    updateWebViewMenuOpenAttribute();
  };
  const observer = new MutationObserver(update);
  observer.observe(frameWindow.document.documentElement, { childList: true, subtree: true });
  update();
  return () => {
    observer.disconnect();
    framesWithOpenMenu.delete(frameWindow);
    updateWebViewMenuOpenAttribute();
  };
}

/**
 * The synthetic presses {@link dismissOpenSurfaces} dispatched, so the frame they land in does not
 * treat them as the user pressing there and close every other frame's surfaces in turn
 */
const dismissalPresses = new WeakSet<Event>();

/**
 * Closes the open popper surfaces in `targetWindow` the way a press outside them in that frame
 * would. Radix detects an outside press with a `pointerdown` listener on the surface's owner
 * document, so a synthetic `pointerdown` targeted at that document runs Radix's own dismissal path
 * (including `onPointerDownOutside`, so a surface that opts out of outside dismissal stays open).
 *
 * The synthetic press is a secondary-button press. Radix's modal DropdownMenu and modal Popover
 * restore focus to their trigger after a primary-button outside press but not after a right-click,
 * and here the user's focus has just moved to ANOTHER frame — a trigger focus in this frame would
 * pull it straight back. Radix Select restores focus regardless; only a Select in the main document
 * escapes that, because its modal layer makes web view iframes ignore the pointer.
 *
 * Dispatched at the document without bubbling, so listeners on the document itself and capture
 * listeners on the window see it, but bubble listeners on the window (such as the window service's
 * gesture detection) do not. A listener that must only react to the user can tell this press apart:
 * it targets the document rather than an element, and `isTrusted` is false.
 */
function dismissOpenSurfaces(targetWindow: Window): void {
  const targetDocument = targetWindow.document;
  if (!targetDocument.querySelector(OPEN_SURFACE_SELECTOR)) return;
  // Built in this realm: Radix reads only the press's target and button, which survive dispatch into
  // a same-origin frame's document
  const press = new PointerEvent('pointerdown', {
    button: 2,
    buttons: 2,
    pointerType: 'mouse',
    isPrimary: true,
    bubbles: false,
    cancelable: true,
  });
  dismissalPresses.add(press);
  targetDocument.dispatchEvent(press);
}

function isInsideWebViewOverlay(target: EventTarget | null): boolean {
  // Checked structurally rather than with `instanceof Element`: a target inside a web view iframe
  // belongs to that frame's realm, so it is never an instance of this realm's `Element`.
  if (!target || !('closest' in target) || typeof target.closest !== 'function') return false;
  return !!target.closest(WEB_VIEW_OVERLAY_SELECTOR);
}

function dismissOpenSurfacesInOtherFrames(sourceWindow: unknown): void {
  registeredWindows.forEach((otherWindow) => {
    if (otherWindow === sourceWindow) return;
    try {
      dismissOpenSurfaces(otherWindow);
    } catch {
      // A frame whose iframe was torn down between its last load and this press can no longer be
      // reached. Its web view component unregisters it on cleanup, so nothing is left to close.
    }
  });
}

/**
 * Make a frame take part in cross-frame dismissal: a press anywhere in it closes the menus,
 * popovers, selects and tooltips open in every OTHER registered frame, and a press in any other
 * registered frame closes those open in it.
 *
 * Radix detects an outside press per document. A press inside a web view iframe never reaches the
 * main document (nor the reverse, nor a sibling web view's document), so without this a Menubar
 * menu, the toolbar's book/chapter popover or a web view's own tab menu stays open while the user
 * works in a different frame. Call this for the main window at startup and for every same-origin
 * web view iframe each time its content loads. Cross-origin (URL) web views cannot be registered;
 * presses inside them do not close anything here, and surfaces inside them do not close on presses
 * elsewhere.
 *
 * Focus moving into a child iframe of this frame without a registered press — a click into a
 * cross-origin web view, or keyboard focus entering any web view — closes them too, unless the
 * iframe sits inside one of this frame's own open surfaces. A plain window switch (alt-tab,
 * DevTools) closes nothing.
 *
 * The synthetic press that closes one frame's surfaces is not itself counted as a press in that
 * frame, so it never cascades into closing another frame's.
 *
 * @param frameWindow The frame's `window`. Must be same-origin with the main window
 * @returns Unsubscriber that removes the frame again
 */
export function registerFrameForCrossFrameDismissal(frameWindow: Window): Unsubscriber {
  const handlePointerDown = (event: PointerEvent) => {
    if (dismissalPresses.has(event)) return;
    if (isInsideWebViewOverlay(event.target)) return;
    dismissOpenSurfacesInOtherFrames(frameWindow);
  };
  const handleBlur = () => {
    const frameDocument = frameWindow.document;
    // `hasFocus` stays true while focus is in a child iframe and turns false only when the whole
    // OS window loses focus
    if (!frameDocument.hasFocus()) return;
    const focusedElement = frameDocument.activeElement;
    if (focusedElement?.tagName !== 'IFRAME' || !('contentWindow' in focusedElement)) return;
    // A surface that embeds a web view keeps itself open while the user works inside it
    if (focusedElement.closest(OPEN_POPPER_SURFACE_SELECTOR)) return;
    // `contentWindow` is a cross-origin proxy for a URL web view; it is only compared, never read
    dismissOpenSurfacesInOtherFrames(focusedElement.contentWindow);
  };
  // Capture phase so content that stops propagation cannot hide the press
  frameWindow.addEventListener('pointerdown', handlePointerDown, { capture: true });
  frameWindow.addEventListener('blur', handleBlur);
  registeredWindows.add(frameWindow);
  // The main document's own open menus are matched directly by `app.component.scss`
  const stopTrackingOpenMenus = frameWindow === window ? undefined : trackOpenMenus(frameWindow);
  return () => {
    registeredWindows.delete(frameWindow);
    stopTrackingOpenMenus?.();
    try {
      frameWindow.removeEventListener('pointerdown', handlePointerDown, { capture: true });
      frameWindow.removeEventListener('blur', handleBlur);
    } catch {
      // A reloaded iframe's old window may already count as cross-origin; its listeners went with it
    }
    return true;
  };
}
