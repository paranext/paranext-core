import type { BoxData, PanelData, TabData } from 'rc-dock';
import { isTab } from './docking-framework-internal.model';

const MIDDLE_MOUSE_BUTTON = 1;
const REPEAT_CLOSE_GUARD_MS = 500;
const REPEAT_CLOSE_MAX_DISTANCE_PX = 4;

export type MiddleClickTabBarHandlersOptions = {
  /** Looks a tab up in the dock layout at click time; its `closable` gates the close */
  findTab: (tabId: string) => PanelData | TabData | BoxData | undefined;
  /** Called with the id of a closable tab whose header received a middle click */
  onCloseTab: (tabId: string) => void;
};

/**
 * Reads the tab id {@link PlatformTabTitle} stamps as `data-tab-header-id` from a click target
 * anywhere on a tab header, or `undefined` if the target is not on one. It goes through the
 * `[role="tab"]` element rc-dock wraps around the title, close button and hit area, because the
 * latter two are siblings of the title, not its descendants.
 *
 * `getTabInfoByElement` is not used here because (1) it falls back to the panel's `activeId`, so a
 * middle click on the empty strip past "+" would close the active tab, and (2) tab headers in the
 * overflow dropdown render under `rc-tabs-N-more-popup-<key>` ids that its `TAB_HEADER_ID_REGEX`
 * can't match, and the portal has no `.dock-layout` ancestor.
 */
function readTabHeaderId(target: EventTarget | null): string | undefined {
  if (!(target instanceof Element)) return undefined;
  return target.closest('[role="tab"]')?.querySelector<HTMLElement>('[data-tab-header-id]')?.dataset
    .tabHeaderId;
}

/**
 * Installs the listeners that stop a middle press on a tab header from arming rc-dock's drags and
 * close a closable tab on a middle click.
 *
 * They listen on the document because rc-tabs' overflow dropdown renders tab headers outside the
 * dock layout: rc-dock's `DockTabs` passes no `getPopupContainer` to rc-tabs, so rc-trigger portals
 * the dropdown into `document.body`. Drag-blocking is scoped to `.dock-bar` and `.dock-dropdown` so
 * it leaves other `role="tab"` UI in the app alone.
 *
 * @param targetDocument The document the dock layout renders in.
 * @param options See {@link MiddleClickTabBarHandlersOptions}.
 * @returns A cleanup function that removes both listeners.
 */
export function installMiddleClickTabBarHandlers(
  targetDocument: Document,
  { findTab, onCloseTab }: MiddleClickTabBarHandlersOptions,
): () => void {
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

  let lastClose: { at: number; x: number; y: number } | undefined;

  const closeTabOnMiddleClick = (event: MouseEvent) => {
    if (event.button !== MIDDLE_MOUSE_BUTTON) return;
    const tabId = readTabHeaderId(event.target);
    if (!tabId) return;

    // Closing a tab slides its neighbour under a stationary pointer, so a quick second click would
    // close a tab the user never aimed at. Ignore one repeat within the common double-click time
    // and REPEAT_CLOSE_MAX_DISTANCE_PX on each axis.
    const previousClose = lastClose;
    lastClose = undefined;
    if (
      previousClose &&
      performance.now() - previousClose.at < REPEAT_CLOSE_GUARD_MS &&
      Math.abs(event.screenX - previousClose.x) <= REPEAT_CLOSE_MAX_DISTANCE_PX &&
      Math.abs(event.screenY - previousClose.y) <= REPEAT_CLOSE_MAX_DISTANCE_PX
    )
      return;

    // An unset `closable` counts as not closable, as it does for rc-dock's close button
    const tab = findTab(tabId);
    if (!isTab(tab) || !tab.closable) return;
    onCloseTab(tabId);
    lastClose = { at: performance.now(), x: event.screenX, y: event.screenY };
  };

  // rc-dock arms drags from React `onMouseDown`/`onMouseDownCapture` for every button but the right
  // one, and React listens at its root container; a capture listener on `document` runs first.
  targetDocument.addEventListener('mousedown', blockMiddleButtonDrag, { capture: true });
  // Closes on the click, not the press. `auxclick` targets the common ancestor of press and
  // release, so a press dragged off the tab resolves to no tab.
  targetDocument.addEventListener('auxclick', closeTabOnMiddleClick);

  return () => {
    targetDocument.removeEventListener('mousedown', blockMiddleButtonDrag, { capture: true });
    targetDocument.removeEventListener('auxclick', closeTabOnMiddleClick);
  };
}
