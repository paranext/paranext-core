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
 * Replaces the inline subscription pattern duplicated in `checks-side-panel.web-view.tsx` and
 * `checklist.web-view.tsx`.
 *
 * Notes on normalization (handle pre-existing PAPI quirks so consumers see consistent data):
 *
 * - **Default scroll group**: tabs without an explicit `scrollGroupScrRef` are treated as scroll
 *   group `0` (the default group). `platform-scripture-editor` keeps the editor's scroll group in
 *   local React state and only writes it back to the WebView definition on a user change, so
 *   freshly-opened editors return no `scrollGroupScrRef` field. Treating "missing" as group 0
 *   matches what the editor itself shows. Non-numeric, non-undefined values (string, null) are
 *   still rejected defensively.
 * - **Lowercase projectId**: the hook lowercases the outgoing `projectId`. NOTE: an earlier comment
 *   claimed this lines the casing up with "PDP/Manage-Books APIs that return lower-case" — that was
 *   wrong. Canonical project ids are actually UPPERCASE (C# `ProjectSummary` →
 *   `Guid.ToUpperInvariant()`, `ProjectMetadata` → `id.ToUpperInvariant()`), so lowercasing here
 *   does NOT match those APIs. Consumers must therefore compare project ids CASE-INSENSITIVELY; the
 *   project-selector does so via `normalizeProjectId` (see I12). The lowercasing is retained
 *   because the other consumers (checklist, checks-side-panel) key off this shape; removing it is a
 *   separate cleanup tracked outside this change.
 */
export function useOpenProjectTabs(filter?: WebViewFilter): OpenProjectTabWithWebView[] {
  const [tabsMap, setTabsMap] = useState<Map<string, OpenProjectTabWithWebView>>(() => new Map());

  useEffect(() => {
    let cancelled = false;
    const upsert = (webView: WebViewEventLike) => {
      const { id, projectId, scrollGroupScrRef, webViewType } = webView;
      const passesFilter = !filter || (webViewType !== undefined && filter({ webViewType }));
      // See JSDoc above: undefined → default group 0; numeric → as-is.
      //
      // `ScrollGroupScrRef` widened
      // from `ScrollGroupId` to `ScrollGroupId | SerializedVerseRef` upstream
      // — a tab that's "unsynced" from any scroll group now stores a
      // SerializedVerseRef object instead of a number. The previous strict
      // "anything-non-numeric → reject" branch dropped those tabs entirely,
      // making Open Tabs grouping in the manage-books project picker (and
      // any other consumer) empty. Object (SerializedVerseRef) values are
      // now surfaced under group 0 so the tab still appears in the Open
      // Tabs section; string/null and other unexpected primitives are still
      // rejected defensively (PAPI quirk: legacy WebViews can carry null).
      let scrollGroup: ScrollGroupId | undefined;
      if (scrollGroupScrRef === undefined) {
        scrollGroup = 0;
      } else if (typeof scrollGroupScrRef === 'number') {
        scrollGroup = scrollGroupScrRef;
      } else if (
        typeof scrollGroupScrRef === 'object' &&
        // PAPI's WebView definitions can legitimately carry `null` here for legacy WebViews —
        // the no-null lint rule otherwise wants us to use `undefined`, but the value comes from
        // the wire so we have to handle it explicitly. Block null from sneaking into the
        // SerializedVerseRef branch (would crash downstream).
        // eslint-disable-next-line no-null/no-null
        scrollGroupScrRef !== null
      ) {
        scrollGroup = 0;
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
          // Lowercased for backward-compatibility with existing consumers. This casing is NOT
          // authoritative — canonical project ids are UPPERCASE — so consumers must match
          // case-insensitively (see normalizeProjectId / I12).
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
