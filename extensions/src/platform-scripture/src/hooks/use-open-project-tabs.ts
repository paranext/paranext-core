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
 * Subscribe to webView open/update/close events and yield project-bound tabs (entries with both a
 * `projectId` and a numeric `scrollGroupScrRef`). Optional `filter` narrows by webViewType — useful
 * for "editor tabs only" queries.
 *
 * Replaces the inline subscription pattern duplicated in `checks-side-panel.web-view.tsx` and
 * `checklist.web-view.tsx`.
 */
export function useOpenProjectTabs(filter?: WebViewFilter): OpenProjectTabWithWebView[] {
  const [tabsMap, setTabsMap] = useState<Map<string, OpenProjectTabWithWebView>>(() => new Map());

  useEffect(() => {
    const upsert = (webView: WebViewEventLike) => {
      const { id, projectId, scrollGroupScrRef, webViewType } = webView;
      const passesFilter = !filter || (webViewType !== undefined && filter({ webViewType }));
      const passes =
        typeof projectId === 'string' &&
        projectId.length > 0 &&
        typeof scrollGroupScrRef === 'number' &&
        passesFilter;
      setTabsMap((prev) => {
        if (!passes) {
          if (!prev.has(id)) return prev;
          const next = new Map(prev);
          next.delete(id);
          return next;
        }
        const tab: OpenProjectTabWithWebView = {
          webViewId: id,
          projectId,
          scrollGroupId: scrollGroupScrRef,
          webViewType: webViewType ?? '',
        };
        const next = new Map(prev);
        next.set(id, tab);
        return next;
      });
    };
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
      unsubOpen();
      unsubUpdate();
      unsubClose();
    };
  }, [filter]);

  return useMemo(() => [...tabsMap.values()], [tabsMap]);
}
