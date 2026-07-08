import type { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useLocalizedStrings, useProjectDataProvider } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { selectScriptureTextGridTitle } from './scripture-text-grid.utils';
import { ScriptureTextGrid } from './scripture-text-grid/scripture-text-grid.component';
import { GridResource } from './scripture-text-grid/resource-cell.component';
import { getScriptureTextGridContents } from './scripture-text-grid-contents.utils';
import { useTextCollectionSources } from './use-text-collection-sources.hook';

// Tab-title localized keys. The label is count-driven: "Scripture text" when 0-1 cells are
// displayed, "Text Collection" when 2 or more (see `selectScriptureTextGridTitle`).
const TITLE_SINGLE_KEY = '%webView_scriptureTextGrid_title_single%';
const TITLE_MULTIPLE_KEY = '%webView_scriptureTextGrid_title_multiple%';
const ALL_STRING_KEYS: LocalizeKey[] = [TITLE_SINGLE_KEY, TITLE_MULTIPLE_KEY];

/**
 * Scripture Text Grid web view (PT-4049 / A1 shell; PT-4050 / A2 first-open trigger; PT-4051 / A3
 * effective filter; PT-4052 / A4 row).
 *
 * Renders one ResourceCell per shown resource in a horizontal row, all synced to the active scrRef.
 * Which resources show is decided by A3's `getScriptureTextGridContents` selector against the four
 * Text Collection sources (both admin lists, the user list, and the per-user shown-by-default
 * overlay) assembled by `useTextCollectionSources`. Keeps A2's idempotent first-open overlay-init
 * trigger. The selector returns Bible-text references; the row consumes `{ projectId, label }`.
 */
globalThis.webViewComponent = function ScriptureTextGridWebView({
  projectId,
  updateWebViewDefinition,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  // `ALL_STRING_KEYS` is a module-level constant, so its reference is already stable across renders
  // (satisfying `useLocalizedStrings`'s stable-reference requirement) — no `useMemo` needed.
  const [localizedStrings, isLoadingLocalizedStrings] = useLocalizedStrings(ALL_STRING_KEYS);

  // The shared scroll-group scrRef is owned here (WebViewProps) and passed down to the grid; child
  // components cannot call this hook (it is a WebViewProps member, not a @papi/frontend/react export).
  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();

  const textConnectionPdp = useProjectDataProvider(
    'platformScripture.textConnectionSettings',
    projectId,
  );

  // Fire first-open overlay init once per resolved projectId. The server-side marker makes repeated
  // calls safe; this guard just avoids redundant round-trips within a single web-view lifetime.
  const initializedProjectIds = useRef(new Set<string>());
  useEffect(() => {
    if (!projectId || !textConnectionPdp) return;
    if (initializedProjectIds.current.has(projectId)) return;
    initializedProjectIds.current.add(projectId);
    textConnectionPdp.initializeShownByDefaultOverlay().catch((error) => {
      // Non-fatal: drop the id from the local guard so a later open can retry; the server-side marker was never written.
      initializedProjectIds.current.delete(projectId);
      logger.error(`Failed to initialize shown-by-default overlay for ${projectId}: ${error}`);
    });
  }, [projectId, textConnectionPdp]);

  // #region Grid contents — A3 selector over the four Text Collection sources, mapped to the row's
  // `{ projectId, label }` shape. The selector returns already-filtered, ordered Bible-text refs.
  const [sources] = useTextCollectionSources(projectId);
  const resources = useMemo<GridResource[]>(
    () =>
      getScriptureTextGridContents(sources).map((reference) => ({
        projectId: reference.id,
        label: reference.name,
      })),
    [sources],
  );
  // #endregion

  const [displayedCellCount, setDisplayedCellCount] = useState(0);

  // Dynamic tab title: flips to "Text Collection" at 2+ displayed cells, "Scripture text" otherwise.
  useEffect(() => {
    // Wait for localization so we never flash a raw key into the tab. `useLocalizedStrings` returns
    // the key itself while loading, so gate on `isLoading` (a truthiness check couldn't detect that).
    if (isLoadingLocalizedStrings) return;
    updateWebViewDefinition({
      title: selectScriptureTextGridTitle(displayedCellCount, {
        single: localizedStrings[TITLE_SINGLE_KEY],
        multiple: localizedStrings[TITLE_MULTIPLE_KEY],
      }),
    });
  }, [displayedCellCount, isLoadingLocalizedStrings, localizedStrings, updateWebViewDefinition]);

  return (
    <div className="tw:flex tw:h-screen tw:flex-col">
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onDisplayedCountChange={setDisplayedCellCount}
      />
    </div>
  );
};
