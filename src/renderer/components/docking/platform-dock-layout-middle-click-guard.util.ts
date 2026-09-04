/**
 * Installs a capture-phase guard on the dock layout's root element that stops a middle-button press
 * anywhere in a tab bar from arming any of rc-dock's drag gestures.
 *
 * Rc-dock arms both per-tab dragging and whole-tab-group dragging from a React `onMouseDown` prop
 * on its own `DragDropDiv` components (see `dragdrop/DragDropDiv.js` and `DockTabBar.js` in the
 * `rc-dock` package) — an ordinary, non-capture, bubble-phase handler that fires for every mouse
 * button except the right one. Because it's bubble-phase, it only runs once the real DOM event's
 * native capturing walk has reached the target and started bubbling back up. A native listener
 * registered with `{ capture: true }` on an ancestor — here, the dock layout's own root, an
 * ancestor of every tab header and tab bar in the layout — runs earlier, during that capturing
 * walk, strictly before the target is ever reached. Calling `stopPropagation()` there keeps the
 * event from reaching the target at all, so none of rc-dock's `DragDropDiv`s — regardless of which
 * one, or which part of a tab bar was actually pressed — ever see it. Being upstream of the target
 * this way also means it doesn't depend on which specific mechanism (React-synthetic or native) any
 * given rc-dock version uses to arm a drag.
 *
 * `.dock-bar` is rc-dock's own class name for the `DragDropDiv` that wraps an entire tab row —
 * every tab, the "+" button, and the empty strip after it. Scoping to it (rather than the whole
 * dock layout) leaves panel content, where a middle click has its own, unrelated meaning,
 * untouched.
 *
 * @param rootElement The dock layout's root DOM node (rc-dock's `DockLayout.getRootElement()`).
 * @returns A cleanup function that removes the listener.
 */
export function installMiddleClickDragGuard(rootElement: HTMLElement): () => void {
  const blockMiddleButtonDrag = (event: MouseEvent) => {
    if (event.button !== 1) return;
    if (!(event.target instanceof Element) || !event.target.closest('.dock-bar')) return;

    // `stopPropagation()` alone only keeps rc-dock from arming a drag; without `preventDefault()`
    // too, the browser's own middle-click default action (autoscroll, and paste on Linux) would
    // still fire, since nothing else on this event's path calls it once propagation stops here.
    event.preventDefault();
    event.stopPropagation();
  };

  rootElement.addEventListener('mousedown', blockMiddleButtonDrag, { capture: true });
  return () =>
    rootElement.removeEventListener('mousedown', blockMiddleButtonDrag, { capture: true });
}
