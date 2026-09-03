import papi from '@papi/frontend';
import { useEffect, useMemo, useState } from 'react';
import { wait } from 'platform-bible-utils';
import type { ScrollGroupId } from 'platform-bible-utils';
import {
  isNavigableProjectIds,
  NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
} from 'platform-bible-utils/experimental';

export interface OpenProjectTabWithWebView {
  webViewId: string;
  projectId: string;
  scrollGroupId: ScrollGroupId;
  webViewType: string;
}

export type WebViewFilter = (webView: { webViewType: string }) => boolean;

export interface UseOpenProjectTabsOptions {
  /**
   * Report the projects a web view declares under `NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY`
   * instead of its container `projectId`, yielding one tab per declared project.
   *
   * Off by default: the existing consumers (checklist, checks-side-panel) ask "which project does
   * this tab belong to", and a reference panel's answer to that is still its container project.
   */
  includeNavigableProjectIds?: boolean;
}

interface WebViewEventLike {
  id: string;
  webViewType?: string;
  projectId?: string;
  scrollGroupScrRef?: unknown;
  state?: Record<string, unknown>;
}

/**
 * Projects a web view declares as displayed, or `undefined` when it declares nothing at all.
 *
 * The empty array and a missing key mean different things and must not be collapsed. A view that
 * declares `[]` is saying "I display nothing" — it should offer no project, not fall back to its
 * container. A view with no key at all (an editor) never participates, so its container project is
 * the right answer.
 *
 * Guarded rather than trusted: web view state is written by whoever owns the web view, so a
 * malformed value is treated as no declaration rather than reaching consumers as a project id.
 */
function getNavigableProjectIds(state: Record<string, unknown> | undefined): string[] | undefined {
  if (!state || !(NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY in state)) return undefined;
  const navigableProjectIds = state[NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY];
  return isNavigableProjectIds(navigableProjectIds) ? navigableProjectIds : undefined;
}

/**
 * Map key for one (web view, project) pair. A web view that declares several navigable projects
 * yields several tabs, so the web view id alone is no longer unique. NUL-separated because it
 * cannot occur in either half.
 */
function tabKey(webViewId: string, projectId: string): string {
  return `${webViewId}\u0000${projectId}`;
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
export function useOpenProjectTabs(
  filter?: WebViewFilter,
  options?: UseOpenProjectTabsOptions,
): OpenProjectTabWithWebView[] {
  const [tabsMap, setTabsMap] = useState<Map<string, OpenProjectTabWithWebView>>(() => new Map());
  const includeNavigableProjectIds = options?.includeNavigableProjectIds ?? false;

  useEffect(() => {
    let cancelled = false;
    const upsert = (webView: WebViewEventLike) => {
      const { id, projectId, scrollGroupScrRef, webViewType, state } = webView;
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
      // A view that declares navigable projects reports those instead of its container project —
      // a reference panel's container is the editable project whose reference list it shows, not
      // the resource on screen. Falls back to the container project, which is what an editor tab
      // (and every opted-out caller) reports.
      const declaredProjectIds = includeNavigableProjectIds
        ? getNavigableProjectIds(state)
        : undefined;
      const tabProjectIds = (
        declaredProjectIds ?? (typeof projectId === 'string' ? [projectId] : [])
      ).filter((tabProjectId) => tabProjectId.length > 0);
      const passes = tabProjectIds.length > 0 && scrollGroup !== undefined && passesFilter;
      setTabsMap((prev) => {
        const keyPrefix = `${id}\u0000`;
        const previousKeys = [...prev.keys()].filter((key) => key.startsWith(keyPrefix));
        if (!passes || scrollGroup === undefined) {
          if (previousKeys.length === 0) return prev;
          const next = new Map(prev);
          previousKeys.forEach((key) => next.delete(key));
          return next;
        }
        const next = new Map(prev);
        // Drop what this web view contributed before re-adding: its declared set can shrink, and a
        // stale entry would keep offering a project the view no longer displays.
        previousKeys.forEach((key) => next.delete(key));
        tabProjectIds.forEach((tabProjectId) => {
          // Lowercased for backward-compatibility with existing consumers. This casing is NOT
          // authoritative — canonical project ids are UPPERCASE — so consumers must match
          // case-insensitively (see normalizeProjectId / I12).
          const normalizedProjectId = tabProjectId.toLowerCase();
          next.set(tabKey(id, normalizedProjectId), {
            webViewId: id,
            projectId: normalizedProjectId,
            scrollGroupId: scrollGroup,
            webViewType: webViewType ?? '',
          });
        });
        return next;
      });
    };
    // Seed initial state from currently-open WebViews. PAPI events don't replay for already-open
    // tabs, so without this the hook would be empty on mount when consumers mount after tabs are
    // already open. The map dedupes by id, so any race with the first live event is harmless.
    // Seeding can fail while another window is starting or reloading (the enumeration refuses to
    // under-report when a window cannot be asked), so a failed attempt is retried — silently
    // giving up would leave every already-open tab invisible here for the life of the component.
    // The retries back off exponentially and stretch across a startup-scale budget (the delays
    // below total ~110 s): the usual failure is a sibling window's whole renderer boot, which
    // takes tens of seconds on a slow machine, not a momentary blip. `retryUntil` from
    // platform-bible-utils deliberately does not cover variable backoff, hence the bespoke loop.
    const seedInitialDelayMs = 2000;
    const seedMaxDelayMs = 16000;
    const seedMaxAttempts = 10;
    const seed = async () => {
      let delayMs = seedInitialDelayMs;
      for (let attempt = 1; attempt <= seedMaxAttempts; attempt++) {
        try {
          // Retry logic requires awaiting inside the loop to implement delay between attempts
          // eslint-disable-next-line no-await-in-loop
          const webViews = await papi.webViews.getAllOpenWebViewDefinitions();
          if (!cancelled) webViews.forEach((wv) => upsert(wv));
          return;
        } catch (e) {
          papi.logger.warn(
            `useOpenProjectTabs: seed attempt ${attempt}/${seedMaxAttempts} failed${
              attempt < seedMaxAttempts
                ? `; retrying in ${delayMs} ms`
                : '; giving up — live events only'
            }: ${e}`,
          );
          if (cancelled || attempt === seedMaxAttempts) return;
          // Retry logic requires awaiting inside the loop to implement delay between attempts
          // eslint-disable-next-line no-await-in-loop
          await wait(delayMs);
          delayMs = Math.min(delayMs * 2, seedMaxDelayMs);
          if (cancelled) return;
        }
      }
    };
    seed();
    const unsubOpen = papi.webViews.onDidOpenWebView(({ webView }) => upsert(webView));
    const unsubUpdate = papi.webViews.onDidUpdateWebView(({ webView }) => upsert(webView));
    const unsubClose = papi.webViews.onDidCloseWebView(({ webView }) => {
      setTabsMap((prev) => {
        const keyPrefix = `${webView.id}\u0000`;
        const closedKeys = [...prev.keys()].filter((key) => key.startsWith(keyPrefix));
        if (closedKeys.length === 0) return prev;
        const next = new Map(prev);
        closedKeys.forEach((key) => next.delete(key));
        return next;
      });
    });
    return () => {
      cancelled = true;
      unsubOpen();
      unsubUpdate();
      unsubClose();
    };
  }, [filter, includeNavigableProjectIds]);

  return useMemo(() => [...tabsMap.values()], [tabsMap]);
}
