/**
 * Sets up a tracker that resolves once every configured tab id has fired an open- or update-webview
 * event — meaning the tab's data has been replaced with the freshly-loaded webview definition (real
 * title, real content, real projectId), not the `%tab_title_unknown%` placeholder that
 * `loadWebViewTab` puts in place while `retrieveWebViewContent` is in flight.
 *
 * Subscribe BEFORE the caller runs `loadLayout`: `loadLayout` synchronously installs the
 * placeholder tab definitions and then kicks off the async webview fetches whose results land via
 * these events. Subscribing afterward would race the fastest webview and miss its event.
 *
 * Parameterised so it can be exercised in isolation: the caller supplies the configured tab ids and
 * the event subscriber functions.
 */

/**
 * Subscribes a handler to a webview event source. Returns an unsubscriber. The handler payload is
 * intentionally narrowed — only `webView.id` is consumed by this module.
 */
export type TabEventSubscriber = (
  handler: (event: { webView: { id: string } }) => void,
) => () => void;

export type TrackSimpleLayoutTabsResolvedOptions = {
  tabIds: readonly string[];
  onDidOpenWebView: TabEventSubscriber;
  onDidUpdateWebView: TabEventSubscriber;
  timeoutMs?: number;
};

/**
 * Max time to wait for the simple-layout tabs to finish loading their titles before hiding the
 * overlay anyway. The overlay should never get stuck if a tab's webview provider misbehaves — the
 * user is better off seeing a tab with an unresolved title than no UI at all.
 */
export const DEFAULT_SIMPLE_LAYOUT_TABS_RESOLVED_TIMEOUT_MS = 5000;

/**
 * Behavior notes:
 *
 * - If `tabIds` is empty, the tracker resolves on the next tick of the event loop (effectively
 *   immediately). There are no events to wait for, so blocking the caller until the timeout would
 *   be wasteful. The resolution still goes through the same `finish()` path so subscriptions are
 *   torn down cleanly.
 * - Duplicate events for the same id (e.g. open followed by update) are idempotent: only the first
 *   firing advances progress, subsequent ones are ignored. This keeps the early-resolve check
 *   honest when an id fires twice while others are still pending.
 * - The timeout is a safety net, not a normal path. `dispose()` should be called by the caller if the
 *   surrounding workflow errors out so the tracker doesn't keep its subscriptions alive.
 */
export function trackSimpleLayoutTabsResolved(options: TrackSimpleLayoutTabsResolvedOptions): {
  promise: Promise<void>;
  dispose: () => void;
} {
  const {
    tabIds,
    onDidOpenWebView,
    onDidUpdateWebView,
    timeoutMs = DEFAULT_SIMPLE_LAYOUT_TABS_RESOLVED_TIMEOUT_MS,
  } = options;

  const remaining = new Set<string>(tabIds);
  let unsubOpen: (() => void) | undefined;
  let unsubUpdate: (() => void) | undefined;
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
  let finished = false;
  let resolveFn: (() => void) | undefined;

  const finish = () => {
    if (finished) return;
    finished = true;
    if (timeoutHandle !== undefined) {
      clearTimeout(timeoutHandle);
      timeoutHandle = undefined;
    }
    unsubOpen?.();
    unsubOpen = undefined;
    unsubUpdate?.();
    unsubUpdate = undefined;
    resolveFn?.();
  };

  const promise = new Promise<void>((resolve) => {
    resolveFn = resolve;
  });

  const handleEvent = ({ webView }: { webView: { id: string } }) => {
    if (!remaining.delete(webView.id)) return;
    if (remaining.size === 0) finish();
  };

  unsubOpen = onDidOpenWebView(handleEvent);
  unsubUpdate = onDidUpdateWebView(handleEvent);

  if (remaining.size === 0) {
    // Empty `tabIds` — nothing to wait for. Resolve immediately, but still go through `finish()` so
    // the freshly-installed subscriptions are torn down.
    finish();
  } else {
    timeoutHandle = setTimeout(() => {
      finish();
    }, timeoutMs);
  }

  return { promise, dispose: finish };
}
