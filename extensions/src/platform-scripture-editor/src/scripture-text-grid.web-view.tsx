import type { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import { useEffect } from 'react';
import { selectScriptureTextGridTitle } from './scripture-text-grid.utils';

// Tab-title localized keys. The label is count-driven: "Scripture text" when 0-1 cells are
// displayed, "Text Collection" when 2 or more (see `selectScriptureTextGridTitle`).
const TITLE_SINGLE_KEY = '%webView_scriptureTextGrid_title_single%';
const TITLE_MULTIPLE_KEY = '%webView_scriptureTextGrid_title_multiple%';
const ALL_STRING_KEYS: LocalizeKey[] = [TITLE_SINGLE_KEY, TITLE_MULTIPLE_KEY];

/**
 * Scripture Text Grid web view (PT-4049 / A1 scaffold).
 *
 * For A1 this is an empty shell: no toolbar, a placeholder body, and a dynamic tab title driven by
 * the number of displayed cells. The `VerseCell` row renderer lands in A4 (PT-4052).
 */
globalThis.webViewComponent = function ScriptureTextGridWebView({
  updateWebViewDefinition,
  useWebViewState,
}: WebViewProps) {
  // `ALL_STRING_KEYS` is a module-level constant, so its reference is already stable across renders
  // (satisfying `useLocalizedStrings`'s stable-reference requirement) — no `useMemo` needed.
  const [localizedStrings, isLoadingLocalizedStrings] = useLocalizedStrings(ALL_STRING_KEYS);

  // A1 SCAFFOLD SEAM: the real grid contents (checked resources) come from A3's
  // `getScriptureTextGridContents` effective-list selector. Until A3 lands, this persisted stub
  // both drives the dynamic-title threshold and exercises restart-persistence (`useWebViewState`
  // round-trips across app restart). Replace this state with the A3 selector when it lands.
  const [gridContentsIds] = useWebViewState<string[]>('gridContentsIds', []);
  const displayedCellCount = gridContentsIds.length;

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

  // Placeholder body. The empty-state directional copy (A6) and the VerseCell row (A4) replace this.
  return <div data-testid="scripture-text-grid" />;
};
