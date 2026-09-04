/** `MouseEvent.button` value for the middle (auxiliary) mouse button, shared by every check below. */
export const MIDDLE_MOUSE_BUTTON = 1;

export type MiddleClickTabBarHandlersOptions = {
  /**
   * Called when a middle-button click lands on a closable tab's header, wherever it currently
   * renders. Receives the tab id read from the pressed tab's own `data-tab-id` attribute (see
   * {@link PlatformTabTitle}).
   */
  onTabMiddleClick: (tabId: string) => void;
};

/**
 * Reads back the id and closable state {@link PlatformTabTitle} stamps onto its own root element
 * (`data-tab-id` / `data-tab-closable`) from a middle-click's target, if that target landed on a
 * closable tab's header. Returns `undefined` for every other target, including a non-closable tab's
 * header.
 *
 * Walks up to the nearest `[role="tab"]` ancestor rather than matching `data-tab-id` directly on
 * (or as an ancestor of) the target, because a press can land on the close (X) button or the hit
 * area — DOM siblings of the title div `data-tab-id` is stamped on, not its ancestors or
 * descendants (`DockTabs.js`'s `TabCache.render()` renders a tab's `DragDropDiv` — the element
 * carrying `role="tab"` — as the parent of three siblings: the title, the close button, and the hit
 * area). That same `DragDropDiv` is what rc-tabs' own "more" overflow dropdown re-renders unchanged
 * inside a `.dock-dropdown-menu-item` once a tab no longer fits the visible bar (`OperationNode.js`
 * wraps the identical `tab.tab` element in a `MenuItem`), so this lookup resolves a tab the same
 * way regardless of which of the two places it currently renders in.
 */
function readClosableTabId(target: EventTarget | null): string | undefined {
  if (!(target instanceof Element)) return undefined;
  const tabHeader = target.closest('[role="tab"]');
  const tabIdHolder = tabHeader?.querySelector<HTMLElement>('[data-tab-id]');
  if (tabIdHolder?.dataset.tabClosable !== 'true') return undefined;
  return tabIdHolder.dataset.tabId;
}

/**
 * Installs the native listeners that make a tab's middle-button gesture behave correctly wherever
 * rc-dock can render a tab header: blocking the middle button from arming any of rc-dock's own drag
 * gestures, and closing a closable tab on a clean middle click.
 *
 * Both listeners are installed on `rootElement.ownerDocument` rather than `rootElement` itself
 * (rc-dock's `DockLayout.getRootElement()`, an ancestor of every tab bar in the layout) because one
 * of the two places a tab header can render is NOT a descendant of `rootElement` at all: rc-tabs'
 * own "more" overflow dropdown (`OperationNode.js`) passes no `getPopupContainer` to the `Dropdown`
 * it renders, so `rc-trigger` falls back to its own default and mounts the dropdown's whole popup
 * as a child of `document.body` — a portal that preserves React's synthetic event bubbling but not
 * native DOM bubbling, so a listener on `rootElement` (an ancestor only in the React tree) never
 * sees a native event dispatched inside it. `document` is an ancestor of both the main tab bar and
 * that portaled popup, so installing there is what makes a single pair of listeners cover both.
 *
 * Drag-blocking stays scoped to `.dock-bar` (the main tab bar's own row, including the "+" button
 * and the empty strip past it — none of which is a `[role="tab"]`) and `.dock-dropdown` (rc-tabs'
 * overflow popup) so it never reaches into unrelated `role="tab"` UI elsewhere in the app (e.g. a
 * `Tabs` component in a dialog). Closing does not need that scoping: `readClosableTabId` above is
 * already specific to a tab this component renders, wherever it is.
 *
 * Middle-click has no keyboard equivalent to give a tab header — it targets a physical mouse button
 * a keyboard cannot press — and today closing a tab has no keyboard-accessible path at all:
 * rc-dock's own close (X) button (`dock-tab-close-btn` in `DockTabs.js`) is a plain, non-focusable
 * `<div onClick>`, not a `<button>`, so it is reachable by neither Tab nor a screen reader.
 *
 * @param rootElement The dock layout's root DOM node (rc-dock's `DockLayout.getRootElement()`).
 * @param options See {@link MiddleClickTabBarHandlersOptions}.
 * @returns A cleanup function that removes both listeners.
 */
export function installMiddleClickTabBarHandlers(
  rootElement: HTMLElement,
  { onTabMiddleClick }: MiddleClickTabBarHandlersOptions,
): () => void {
  const targetDocument = rootElement.ownerDocument;

  const blockMiddleButtonDrag = (event: MouseEvent) => {
    if (event.button !== MIDDLE_MOUSE_BUTTON) return;
    if (!(event.target instanceof Element) || !event.target.closest('.dock-bar, .dock-dropdown'))
      return;

    // `stopPropagation()` alone only keeps rc-dock from arming a drag; without `preventDefault()`
    // too, the browser's own middle-click default action (autoscroll, and paste on Linux) would
    // still fire, since nothing else on this event's path calls it once propagation stops here.
    event.preventDefault();
    event.stopPropagation();
  };

  const closeTabOnMiddleClick = (event: MouseEvent) => {
    if (event.button !== MIDDLE_MOUSE_BUTTON) return;
    const tabId = readClosableTabId(event.target);
    if (tabId) onTabMiddleClick(tabId);
  };

  targetDocument.addEventListener('mousedown', blockMiddleButtonDrag, { capture: true });
  // Bubble phase: nothing on a tab header's path stops `auxclick` (rc-dock and rc-tabs only ever
  // register `onClick`, which the primary button alone triggers), and `auxclick` — unlike
  // `mousedown` — targets the nearest common ancestor of the mousedown/mouseup targets, so a press
  // that starts on a tab and is released elsewhere already closes nothing: the common ancestor
  // moves above the tab header once the release lands outside it, and this handler never runs.
  targetDocument.addEventListener('auxclick', closeTabOnMiddleClick);

  return () => {
    targetDocument.removeEventListener('mousedown', blockMiddleButtonDrag, { capture: true });
    targetDocument.removeEventListener('auxclick', closeTabOnMiddleClick);
  };
}
