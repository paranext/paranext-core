import { useData } from '@renderer/hooks/papi-hooks';
import {
  getSavedWebViewDefinitionSync,
  onDidUpdateWebView,
} from '@renderer/services/web-view.service-host';
import { logger } from '@shared/services/logger.service';
import { UpdateWebViewEvent } from '@shared/services/web-view.service-model';
import { windowService } from '@shared/services/window.service';
import { useEvent } from 'platform-bible-react';
import { getErrorMessage, isPlatformError, ScrollGroupId } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/** Describes the active scripture tab the main toolbar should follow. */
export type ActiveTabScrollGroup = {
  /** Identity of the last active scripture tab. Undefined until one is focused. */
  webViewId?: string;
  /**
   * The tab's scroll group. A project-bound tab that has not persisted an explicit group is
   * reported as the default group `0` (see the mapping in {@link useActiveTabScrollGroup}).
   * `undefined` when the tab is genuinely off any numbered group (detached/independent ref) or is
   * not a project tab.
   */
  scrollGroupId?: ScrollGroupId;
  /** The tab's project id (from its WebViewDefinition). */
  projectId?: string;
};

/**
 * Reads a WebView's saved definition, tolerating the brief early-mount window before the dock
 * layout is registered (`getSavedWebViewDefinitionSync` throws then).
 */
function readDefinitionSafely(webViewId: string | undefined) {
  if (!webViewId) return undefined;
  try {
    return getSavedWebViewDefinitionSync(webViewId);
  } catch (e) {
    logger.warn(
      `useActiveTabScrollGroup: could not read WebView definition ${webViewId}: ${getErrorMessage(e)}`,
    );
    return undefined;
  }
}

/**
 * The active scripture tab the main toolbar should follow: the most recently focused WebView tab.
 * Transient `'other'` focus (e.g. clicking the toolbar's own controls) and non-WebView tabs are
 * ignored so the last scripture tab is retained.
 */
export function useActiveTabScrollGroup(): ActiveTabScrollGroup {
  const [focusPossiblyError] = useData(windowService.dataProviderName).Focus(undefined, undefined);

  // The webview id currently focused, or undefined for 'other'/non-webview focus.
  const focusedWebViewId = useMemo(() => {
    if (!focusPossiblyError || isPlatformError(focusPossiblyError)) return undefined;
    if (focusPossiblyError.focusType === 'webView') return focusPossiblyError.id;
    if (focusPossiblyError.focusType === 'tab' && focusPossiblyError.tabType === 'webView')
      return focusPossiblyError.id;
    return undefined;
  }, [focusPossiblyError]);

  // Track the LAST focused webview; ignore transient 'other'/non-webview focus (keep last).
  const [trackedWebViewId, setTrackedWebViewId] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (focusedWebViewId !== undefined) setTrackedWebViewId(focusedWebViewId);
  }, [focusedWebViewId]);

  // Bumped by an onDidUpdateWebView event for the tracked tab to force a definition re-read.
  const [definitionRefresh, setDefinitionRefresh] = useState(0);

  // Ref so the (deps-stable) update handler always sees the current tracked id.
  const trackedWebViewIdRef = useRef(trackedWebViewId);
  trackedWebViewIdRef.current = trackedWebViewId;

  useEvent(
    onDidUpdateWebView,
    useCallback((event: UpdateWebViewEvent) => {
      if (event.webView.id === trackedWebViewIdRef.current) setDefinitionRefresh((n) => n + 1);
    }, []),
  );

  // The tracked tab's saved definition (scrollGroupScrRef + projectId). Derived synchronously from
  // trackedWebViewId so the returned webViewId and its definition always update in the same render
  // (no transient stale pairing); definitionRefresh re-reads it after an external update event.
  const definition = useMemo(() => {
    // Referenced so this memo re-runs whenever an onDidUpdateWebView event bumps it
    // eslint-disable-next-line no-unused-expressions
    definitionRefresh;
    return readDefinitionSafely(trackedWebViewId);
  }, [trackedWebViewId, definitionRefresh]);

  return useMemo(() => {
    const scrollGroupScrRef = definition?.scrollGroupScrRef;
    const projectId = definition?.projectId;
    let scrollGroupId: ScrollGroupId | undefined;
    if (typeof scrollGroupScrRef === 'number') {
      scrollGroupId = scrollGroupScrRef;
    } else if (scrollGroupScrRef === undefined && projectId !== undefined) {
      // A project-bound scripture tab persists no `scrollGroupScrRef` until the user changes its
      // group, yet is effectively on the default scroll group 0 — the same convention
      // `useScrollGroupScrRef`'s `?? 0` default and `use-open-project-tabs` apply. Reporting 0 (rather
      // than undefined) lets the toolbar recognize the tab as attached and adopt its project for
      // versification framing, instead of falling back to the group's stored source and stamping an
      // undefined frame that leaves followers unconverted. Gate on `projectId`: a non-scripture tab
      // (settings/home, no projectId) or a missing definition must stay unattached so the toolbar
      // keeps its last group. An object (`SerializedVerseRef`) means genuinely detached — also left
      // undefined (keep last).
      scrollGroupId = 0;
    }
    return {
      webViewId: trackedWebViewId,
      scrollGroupId,
      projectId,
    };
  }, [trackedWebViewId, definition]);
}
