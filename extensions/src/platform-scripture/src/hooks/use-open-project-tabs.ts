import papi from '@papi/frontend';
import { useEffect, useMemo, useState } from 'react';
import type { ScrollGroupId } from 'platform-bible-utils';

export interface OpenProjectTabWithWebView {
  webViewId: string;
  projectId: string;
  scrollGroupId: ScrollGroupId;
  webViewType: string;
}

export type WebViewFilter = (webView: { webViewType: string }) => boolean;

interface WebViewEventLike {
  id: string;
  webViewType?: string;
  projectId?: string;
  scrollGroupScrRef?: unknown;
}

/**
 * Subscribe to webView open/update/close events and yield project-bound tabs (entries with a
 * `projectId`). Optional `filter` narrows by webViewType — useful for "editor tabs only" queries.
 *
 * Replaces the inline subscription pattern previously duplicated across project-bound web views
 * (e.g. `checks-side-panel.web-view.tsx`).
 *
 * Notes on normalization (handle pre-existing PAPI quirks so consumers see consistent data):
 *
 * - **Default scroll group**: tabs without an explicit `scrollGroupScrRef` are treated as scroll
 *   group `0` (the default group). `platform-scripture-editor` keeps the editor's scroll group in
 *   local React state and only writes it back to the WebView definition on a user change, so
 *   freshly-opened editors return no `scrollGroupScrRef` field. Treating "missing" as group 0
 *   matches what the editor itself shows. Non-numeric, non-undefined values (string, null) are
 *   still rejected defensively.
 * - **Lowercase projectId**: WebView definitions store `projectId` in upper-case while
 *   PDP/Manage-Books APIs return lower-case. The hook lowercases on the way out so consumer-side
 *   string comparisons (e.g. `collectOpenTabsByProject`) succeed regardless of which side wrote the
 *   casing.
 */
export function useOpenProjectTabs(filter?: WebViewFilter): OpenProjectTabWithWebView[] {
  const [tabsMap, setTabsMap] = useState<Map<string, OpenProjectTabWithWebView>>(() => new Map());

  useEffect(() => {
    let cancelled = false;
    const upsert = (webView: WebViewEventLike) => {
      const { id, projectId, scrollGroupScrRef, webViewType } = webView;
      const passesFilter = !filter || (webViewType !== undefined && filter({ webViewType }));
      // See JSDoc above: undefined → default group 0; numeric → as-is; anything else → reject.
      let scrollGroup: ScrollGroupId | undefined;
      if (scrollGroupScrRef === undefined) {
        scrollGroup = 0;
      } else if (typeof scrollGroupScrRef === 'number') {
        scrollGroup = scrollGroupScrRef;
      }
      const passes =
        typeof projectId === 'string' &&
        projectId.length > 0 &&
        scrollGroup !== undefined &&
        passesFilter;
      setTabsMap((prev) => {
        if (!passes || scrollGroup === undefined || typeof projectId !== 'string') {
          if (!prev.has(id)) return prev;
          const next = new Map(prev);
          next.delete(id);
          return next;
        }
        const tab: OpenProjectTabWithWebView = {
          webViewId: id,
          // Normalize to lowercase so consumer-side comparisons against PDP/manage-books
          // projectIds (which are lowercase) succeed regardless of WebView casing.
          projectId: projectId.toLowerCase(),
          scrollGroupId: scrollGroup,
          webViewType: webViewType ?? '',
        };
        const next = new Map(prev);
        next.set(id, tab);
        return next;
      });
    };
    // Seed initial state from currently-open WebViews. PAPI events don't replay for already-open
    // tabs, so without this the hook would be empty on mount when consumers mount after tabs are
    // already open. The map dedupes by id, so any race with the first live event is harmless.
    papi.webViews
      .getAllOpenWebViewDefinitions()
      .then((webViews) => {
        if (!cancelled) webViews.forEach((wv) => upsert(wv));
        return undefined;
      })
      .catch(() => {
        // Non-fatal — live events will still populate state going forward.
      });
    const unsubOpen = papi.webViews.onDidOpenWebView(({ webView }) => upsert(webView));
    const unsubUpdate = papi.webViews.onDidUpdateWebView(({ webView }) => upsert(webView));
    const unsubClose = papi.webViews.onDidCloseWebView(({ webView }) => {
      setTabsMap((prev) => {
        if (!prev.has(webView.id)) return prev;
        const next = new Map(prev);
        next.delete(webView.id);
        return next;
      });
    });
    return () => {
      cancelled = true;
      unsubOpen();
      unsubUpdate();
      unsubClose();
    };
  }, [filter]);

  return useMemo(() => [...tabsMap.values()], [tabsMap]);
}
