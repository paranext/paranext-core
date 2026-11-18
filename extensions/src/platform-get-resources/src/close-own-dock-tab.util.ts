/** What {@link closeOwnDockTab} did. */
export type CloseOwnDockTabResult =
  /** The tab's close button was clicked. */
  | 'closed'
  /** No closable tab carries the web view's id, or the host page could not be reached. */
  | 'tabNotFound'
  /**
   * No other tab is docked in the window, so the tab was left open: a dock that loses its last
   * docked tab docks a fresh Home or closes the window.
   */
  | 'onlyTabInDock';

/** The host page's document, or `undefined` if this frame cannot reach it. */
function readTopDocument(): Document | undefined {
  try {
    return window.top?.document;
  } catch {
    // Reading `top.document` throws when the host page is on another origin.
    return undefined;
  }
}

/**
 * Closes the dock tab of the web view this code runs in, by clicking that tab's close button in the
 * host page. The click takes rc-dock's normal close path, so the web view closes exactly as if the
 * user had clicked it, and `onDidCloseWebView` fires.
 *
 * This is the stopgap described under "Web view self-close" in
 * `.claude/rules/architecture/react-patterns.md`, until PAPI can close a web view. It depends on
 * the platform's tab title carrying `data-web-view-id` and on rc-dock's tab markup;
 * `e2e-tests/tests/isolated/home-closes-after-open-simple.spec.ts` guards both.
 *
 * Call it last: the click can tear down the caller's own iframe before this returns.
 *
 * @param webViewId The id of the web view whose tab to close
 * @param getHostDocument Reads the document of the page that holds the dock
 * @returns What happened; see {@link CloseOwnDockTabResult}
 */
export function closeOwnDockTab(
  webViewId: string,
  getHostDocument: () => Document | undefined = readTopDocument,
): CloseOwnDockTabResult {
  const hostDocument = getHostDocument();
  const hostWindow = hostDocument?.defaultView;
  if (!hostDocument || !hostWindow) return 'tabNotFound';

  // Compared by attribute rather than built into a selector, so the id needs no escaping. Only tab
  // titles count: the web view's own iframe carries the same attribute. rc-tabs' overflow menu holds
  // a copy of the whole tab, close button included, outside any `.dock-tab`, so a title only counts
  // when it sits in a real tab with a close button.
  const closeButton = Array.from(
    hostDocument.querySelectorAll('.platform-tab-title[data-web-view-id]'),
  )
    .filter((title) => title.getAttribute('data-web-view-id') === webViewId)
    .map((title) => title.closest('.dock-tab')?.querySelector('.dock-tab-close-btn'))
    .find((button) => !!button);
  const ownTab = closeButton?.closest('.dock-tab');
  if (!closeButton || !ownTab) return 'tabNotFound';

  // The dock refills itself with a fresh Home whenever its last docked tab closes, so only a tab
  // docked in the main dock counts: not one that floats (`dock-fbox`), is maximized (`dock-mbox`)
  // or has its own window (`dock-wbox`).
  const hasOtherDockedTab = Array.from(hostDocument.querySelectorAll('.dock-tab')).some(
    (tab) => tab !== ownTab && !tab.closest('.dock-fbox, .dock-mbox, .dock-wbox'),
  );
  if (!hasOtherDockedTab) return 'onlyTabInDock';

  // Built from the host window's own constructor: the host page's elements belong to its realm,
  // not to this frame's.
  closeButton.dispatchEvent(new hostWindow.MouseEvent('click', { bubbles: true }));
  return 'closed';
}
