import { WebViewProps } from '@papi/core';
import papi, { logger, network } from '@papi/frontend';
import { useData, useLocalizedStrings } from '@papi/frontend/react';
import {
  useEvent,
  ProjectSelector,
  type OpenProjectTab,
  type ProjectPair,
  type ProjectSelectorProject,
  type Scope,
  usePromise,
} from 'platform-bible-react';
import {
  defaultScrRef,
  formatReplacementString,
  getErrorMessage,
  isPlatformError,
} from 'platform-bible-utils';
import type { ScrollGroupId } from 'platform-bible-utils';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import type {
  ChecklistComparativeTextRef,
  ChecklistRequest,
  ChecklistResultResponse,
  ChecklistScriptureRange,
} from 'platform-scripture';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChecklistTool, CHECKLIST_STRING_KEYS } from './components/checklist.component';
import type {
  ChecklistCell,
  ChecklistData,
  ChecklistEmptyResultMessage,
  ChecklistRow,
} from './components/checklist.component';
import {
  MarkerSettingsDialog,
  MARKER_SETTINGS_STRING_KEYS,
} from './components/marker-settings-dialog.component';
import { useChecklistService } from './hooks/use-checklist';
import { CHECKLIST_OPEN_SETTINGS_EVENT } from './checklist.model';

// ─── Constants ─────────────────────────────────────────────────────────────

/**
 * Fallback menu used while the menu-data subscription is pending or errored. Matches the pattern
 * used by `platform-scripture-editor.web-view.tsx:141-145`. When the real menu arrives, the
 * memoized `webViewMenu` below narrows to the concrete value.
 */
const DEFAULT_WEBVIEW_MENU = {
  topMenu: undefined,
  includeDefaults: true,
  contextMenu: undefined,
};

const MARKERS_CHECKLIST_WEB_VIEW_TYPE = 'platformScripture.markersChecklist';

// ─── Helpers ───────────────────────────────────────────────────────────────

/**
 * Narrow the discriminated-union `ChecklistResultResponse` success body to the `ChecklistData`
 * shape the presentational component consumes. The wire format uses `unknown[]` + `unknown` for the
 * rows + empty-result message (see `platform-scripture.d.ts` §Markers Checklist Types); both are
 * validated upstream by the backend, so we cast through `unknown` to the stricter component types
 * here. If the response shape ever drifts, TypeScript will flag the direct access sites below
 * (row/cell/emptyResultMessage destructuring) before this hidden cast blows up.
 */
function toChecklistData(body: Extract<ChecklistResultResponse, { success: true }>): ChecklistData {
  return {
    // The backend already emits the structural shape the component expects; we trust the contract
    // and narrow via `unknown` so we don't have to re-validate every field at runtime. Any future
    // drift will surface at the row/cell destructuring sites below.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    rows: body.rows as unknown as ChecklistRow[],
    columnHeaders: body.columnHeaders,
    columnProjectIds: body.columnProjectIds,
    excludedCount: body.excludedCount,
    truncated: body.truncated,
    // Same rationale as the rows cast — trust the data-contract.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    emptyResultMessage: body.emptyResultMessage as ChecklistEmptyResultMessage | undefined,
  };
}

/**
 * Build a tab-separated, human-readable snapshot of the currently visible checklist rows for the
 * clipboard (BHV-313). We favour a simple `\t` + `\n` format so that pasting into a spreadsheet
 * produces a grid; pasting into a text editor stays legible. `includedRows` is the post-filter row
 * list (after `hideMatches` has been applied by the caller) so the clipboard matches what the user
 * sees.
 */
function buildClipboardText(columnHeaders: string[], includedRows: ChecklistRow[]): string {
  const headerLine = ['', ...columnHeaders].join('\t');
  const bodyLines = includedRows.map((row) => {
    const cellStrings = row.cells.map((cell) => cellToText(cell));
    return [row.firstRef ?? '', ...cellStrings].join('\t');
  });
  return [headerLine, ...bodyLines].join('\n');
}

/** Flatten a cell's paragraph/item structure to a single clipboard-friendly string. */
function cellToText(cell: ChecklistCell): string {
  if (cell.error) return cell.error;
  if (cell.paragraphs.length === 0) return '';
  return cell.paragraphs
    .map((paragraph) => {
      const markerToken = `\\${paragraph.marker}`;
      const itemTokens = paragraph.items
        .map((item) => {
          if (item.type === 'text') return item.text;
          if (item.type === 'verse') return item.verseNumber;
          if (item.type === 'link') return item.displayText;
          if (item.type === 'error') return item.message;
          if (item.type === 'message') return item.message;
          // editLink — no textual representation
          return '';
        })
        .filter((token) => token.length > 0);
      return [markerToken, ...itemTokens].join(' ');
    })
    .join(' | ');
}

/**
 * Format `ScriptureRange` as a short toolbar trigger label (e.g. `GEN 1:1–GEN 3:24`). The actual
 * verse-range selector popover is a draft-PR dependency (#2212); today we only need to render a
 * stable label string when a range is set. `undefined` → "All" (localize key below).
 */
function formatScriptureRangeLabel(
  range: ChecklistScriptureRange | undefined,
  allLabel: string,
): string {
  if (!range) return allLabel;
  const { start, end } = range;
  const startStr = `${start.book} ${start.chapterNum}:${start.verseNum}`;
  if (!end) return startStr;
  const endStr = `${end.book} ${end.chapterNum}:${end.verseNum}`;
  return `${startStr}–${endStr}`;
}

// ─── Component ─────────────────────────────────────────────────────────────

/**
 * Fully-wired Markers Checklist web view (UI-PKG-002 + UI-PKG-003 + UI-PKG-004).
 *
 * - **UI-PKG-002** — wires the `ChecklistTool` presentational component to the
 *   `platformScripture.checklistService` NetworkObject (via `useChecklistService`), the tab-menu
 *   data provider, the platform base PDP (for column full-name tooltips), and the browser
 *   clipboard. A `try/catch` around `buildChecklistData` feeds the ChecklistTool's destructive
 *   Alert + Retry affordance (T-R-2 contract).
 * - **UI-PKG-003** — composes `MarkerSettingsDialog` adjacent to `ChecklistTool` and opens it in
 *   response to the `CHECKLIST_OPEN_SETTINGS_EVENT` network event emitted by the tab-menu
 *   `Settings…` command handler in `main.ts`. Submitted values are normalized inside the dialog
 *   (see `marker-settings-dialog.component.tsx`) before being written back to the parent state.
 * - **UI-PKG-004** — six adjacent `useWebViewState<T>(key, default)` slots declared at the top of the
 *   component, backing per-web-view persistence for the checklist settings.
 */
global.webViewComponent = function ChecklistWebView({
  projectId,
  useWebViewState,
  useWebViewScrollGroupScrRef,
  updateWebViewDefinition,
}: WebViewProps) {
  // ─── UI-PKG-004: persisted state slots ────────────────────────────────────

  // ─── Scroll group binding (drives currentScrRef + goto setter) ────────
  const [liveScrRef, setLiveScrRef, scrollGroupId, setScrollGroupId] =
    useWebViewScrollGroupScrRef();
  // Suppress unused-variable warnings for slots we wire in later steps.
  void scrollGroupId;
  void setScrollGroupId;
  void setLiveScrRef;
  void liveScrRef;
  void updateWebViewDefinition;

  const [equivalentMarkers, setEquivalentMarkers] = useWebViewState<string>(
    'checklistEquivalentMarkers',
    '',
  );
  const [markerFilter, setMarkerFilter] = useWebViewState<string>('checklistMarkerFilter', '');
  const [hideMatches, setHideMatches] = useWebViewState<boolean>('checklistHideMatches', false);
  const [showVerseText, setShowVerseText] = useWebViewState<boolean>(
    'checklistShowVerseText',
    false,
  );
  // Comparative-texts selection is driven by the real `ProjectSelector` (`mode: 'project-multi'`,
  // vendored from draft PR #2223).
  const [comparativeTexts, setComparativeTexts] = useWebViewState<ChecklistComparativeTextRef[]>(
    'checklistComparativeTexts',
    [],
  );
  // R1 — mode-aware snapshot persistence (matches PT9's frozen-range model).
  // - `scope` + `snapshotScrRef` drive the ScopeSelector display label.
  // - `verseRange` is the *frozen* request payload sent to the backend (PT9-equivalent;
  //   `undefined` = "All Books", matching PT9 memento with empty FirstVerseRef/LastVerseRef).
  // - `rangeStart` / `rangeEnd` back the BCV pickers shown in `range` mode.
  // - `selectedBookIds` is wired to ScopeSelector but inert (its mode is not in availableScopes).
  const [scope, setScope] = useWebViewState<Scope>('checklistScope', 'chapter');
  const [snapshotScrRef, setSnapshotScrRef] = useWebViewState<SerializedVerseRef | undefined>(
    'checklistSnapshotScrRef',
    undefined,
  );
  const [rangeStart, setRangeStart] = useWebViewState<SerializedVerseRef>(
    'checklistRangeStart',
    defaultScrRef,
  );
  const [rangeEnd, setRangeEnd] = useWebViewState<SerializedVerseRef>(
    'checklistRangeEnd',
    defaultScrRef,
  );
  const [verseRange, setVerseRange] = useWebViewState<ChecklistScriptureRange | undefined>(
    'checklistVerseRange',
    undefined,
  );
  const [selectedBookIds, setSelectedBookIds] = useWebViewState<string[]>(
    'checklistSelectedBookIds',
    [],
  );

  // Suppress unused warnings until tasks 6-10 wire each slot in.
  void scope;
  void setScope;
  void snapshotScrRef;
  void setSnapshotScrRef;
  void rangeStart;
  void setRangeStart;
  void rangeEnd;
  void setRangeEnd;
  void setVerseRange;
  void selectedBookIds;
  void setSelectedBookIds;

  // ─── Localization ─────────────────────────────────────────────────────────

  const checklistStringKeys = useMemo(() => Array.from(CHECKLIST_STRING_KEYS), []);
  const localizedStringsWithLoadingState = useLocalizedStrings(checklistStringKeys);
  const [localizedStrings] = localizedStringsWithLoadingState;

  const markerSettingsStringKeys = useMemo(() => Array.from(MARKER_SETTINGS_STRING_KEYS), []);
  const markerSettingsLocalizedStrings = useLocalizedStrings(markerSettingsStringKeys);

  // ─── Service + editability ────────────────────────────────────────────────

  const { service } = useChecklistService(projectId);

  // ─── Local UI state (ephemeral) ──────────────────────────────────────────

  const [data, setData] = useState<ChecklistData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [columnProjectFullNames, setColumnProjectFullNames] = useState<Record<string, string>>({});
  const [columnDirections, setColumnDirections] = useState<
    Record<string, 'ltr' | 'rtl' | undefined>
  >({});

  // ─── Primary project short name (for the toolbar trigger label) ──────────

  const [primaryProjectName, setPrimaryProjectName] = useState<string>('');
  useEffect(() => {
    if (!projectId) {
      setPrimaryProjectName('');
      return () => {};
    }
    let cancelled = false;
    (async () => {
      try {
        const pdp = await papi.projectDataProviders.get('platform.base', projectId);
        const name = (await pdp.getSetting('platform.name')) ?? projectId;
        if (!cancelled) setPrimaryProjectName(name);
      } catch (err) {
        if (!cancelled) {
          logger.warn(
            `ChecklistWebView: failed to read platform.name for ${projectId}: ${getErrorMessage(err)}`,
          );
          setPrimaryProjectName(projectId);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  // ─── Fetch checklist data when any request-shaping input changes ──────────

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // A monotonically-increasing counter used to force a refetch on Retry without re-shaping the
  // request. Incrementing it triggers the effect below to re-run even though no other input
  // changed.
  const [refreshCounter, setRefreshCounter] = useState<number>(0);

  useEffect(() => {
    if (!service || !projectId) {
      setData(undefined);
      setIsLoading(false);
      return () => {};
    }

    const request: ChecklistRequest = {
      projectId,
      comparativeTextIds: comparativeTexts.map((ref) => ref.id),
      markerSettings: { equivalentMarkers, markerFilter },
      verseRange,
      // hideMatches/showVerseText are post-fetch filters; we pass them to the backend anyway so
      // the `excludedCount` reflects what would be hidden if the filter were applied server-side,
      // but we also filter client-side below for the visible-rows path.
      hideMatches,
      showVerseText,
    };

    setIsLoading(true);
    let cancelled = false;
    (async () => {
      try {
        const response = await service.buildChecklistData(request);
        if (cancelled || !isMountedRef.current) return;
        // `ChecklistResultResponse` is a TS-only discriminated union; the C# side never sends
        // a `success` field — narrowing is on the presence of `rows` (success shape) vs `code`
        // (ChecklistResultError shape). See data-contracts.md §3.1.
        if ('rows' in response) {
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          setData(toChecklistData(response as Extract<ChecklistResultResponse, { success: true }>));
          setError(undefined);
        } else {
          setData(undefined);
          setError(response.message);
        }
      } catch (err) {
        if (cancelled || !isMountedRef.current) return;
        logger.warn(`ChecklistWebView: buildChecklistData failed: ${getErrorMessage(err)}`);
        setData(undefined);
        setError(getErrorMessage(err));
      } finally {
        if (!cancelled && isMountedRef.current) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [
    service,
    projectId,
    comparativeTexts,
    equivalentMarkers,
    markerFilter,
    verseRange,
    hideMatches,
    showVerseText,
    refreshCounter,
  ]);

  // ─── Resolve column full names for tooltip ────────────────────────────────

  useEffect(() => {
    const ids = data?.columnProjectIds ?? [];
    if (ids.length === 0) {
      setColumnProjectFullNames({});
      return () => {};
    }
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        ids.map(async (id): Promise<[string, string]> => {
          try {
            const pdp = await papi.projectDataProviders.get('platform.base', id);
            const fullName = await pdp.getSetting('platform.fullName');
            if (typeof fullName === 'string' && fullName.length > 0) return [id, fullName];
            const name = await pdp.getSetting('platform.name');
            return [id, typeof name === 'string' && name.length > 0 ? name : id];
          } catch (err) {
            logger.warn(
              `ChecklistWebView: failed to resolve full name for ${id}: ${getErrorMessage(err)}`,
            );
            return [id, id];
          }
        }),
      );
      if (cancelled) return;
      setColumnProjectFullNames(Object.fromEntries(entries));
    })();
    return () => {
      cancelled = true;
    };
  }, [data?.columnProjectIds]);

  // ─── Resolve per-column text direction (RTL/LTR) ──────────────────────────
  //
  // Per Localization-Guide.md → Text Direction (RTL/LTR), per-content text direction comes from
  // the `platform.textDirection` project setting (admins can override; the platform derives it
  // from the project's language definition by default). We resolve it once per column projectId
  // so RTL projects (Hebrew, Arabic, Persian, Urdu, etc.) render right-to-left.

  useEffect(() => {
    const ids = data?.columnProjectIds ?? [];
    if (ids.length === 0) {
      setColumnDirections({});
      return () => {};
    }
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        ids.map(async (id): Promise<[string, 'ltr' | 'rtl' | undefined]> => {
          try {
            const pdp = await papi.projectDataProviders.get('platform.base', id);
            const direction = await pdp.getSetting('platform.textDirection');
            // Setting type is `'ltr' | 'rtl' | '' | undefined`; map empty/undefined to undefined
            // so the component falls back to document direction.
            if (direction === 'rtl') return [id, 'rtl'];
            if (direction === 'ltr') return [id, 'ltr'];
            return [id, undefined];
          } catch (err) {
            logger.warn(
              `ChecklistWebView: failed to resolve textDirection for ${id}: ${getErrorMessage(err)}`,
            );
            return [id, undefined];
          }
        }),
      );
      if (cancelled) return;
      setColumnDirections(Object.fromEntries(entries));
    })();
    return () => {
      cancelled = true;
    };
  }, [data?.columnProjectIds]);

  // ─── Client-side filtering for hideMatches ────────────────────────────────

  const visibleData = useMemo<ChecklistData | undefined>(() => {
    if (!data) return undefined;
    if (!hideMatches) return data;
    return {
      ...data,
      rows: data.rows.filter((row) => !row.isMatch),
    };
  }, [data, hideMatches]);

  // ─── Match count label (BHV-303) ──────────────────────────────────────────

  const matchCountLabel = useMemo<string | undefined>(() => {
    if (!hideMatches) return undefined;
    const excluded = data?.excludedCount ?? 0;
    if (excluded <= 0) return undefined;
    const template =
      localizedStrings['%markersChecklist_matches_omitted%'] ?? '{count} Matches Omitted';
    return formatReplacementString(template, { count: String(excluded) });
  }, [hideMatches, data?.excludedCount, localizedStrings]);

  // ─── Tab menu data via menuData provider ──────────────────────────────────

  const [webViewMenuPossiblyError] = useData(papi.menuData.dataProviderName).WebViewMenu(
    MARKERS_CHECKLIST_WEB_VIEW_TYPE,
    DEFAULT_WEBVIEW_MENU,
  );

  const webViewMenu = useMemo(() => {
    if (isPlatformError(webViewMenuPossiblyError)) {
      logger.warn(
        `ChecklistWebView: failed to load web view menu for ${MARKERS_CHECKLIST_WEB_VIEW_TYPE}`,
        webViewMenuPossiblyError,
      );
      return DEFAULT_WEBVIEW_MENU;
    }
    return webViewMenuPossiblyError;
  }, [webViewMenuPossiblyError]);

  // ─── Subscribe to the "open settings" network event (UI-PKG-003) ─────────

  const handleOpenSettingsEvent = useCallback(() => {
    setIsSettingsOpen(true);
  }, []);
  useEvent(
    network.getNetworkEvent<undefined>(CHECKLIST_OPEN_SETTINGS_EVENT),
    handleOpenSettingsEvent,
  );

  // ─── Project-menu item selection handler ──────────────────────────────────
  //
  // Items defined in `extensions/src/platform-scripture/contributions/menus.json` for
  // `platformScripture.markersChecklist`'s top menu fire here. Most items dispatch via
  // `papi.commands.sendCommand` (so future contributions from other extensions wire
  // automatically), but we intercept `platformScripture.copyMarkersChecklist` locally because
  // the copy action operates on the live web-view's visible data — there's no point in routing
  // it through PAPI just to send the result back.

  const handleSelectProjectMenuItem = useCallback(
    (selectedMenuItem: { [key: string]: unknown; command: string }) => {
      const { command } = selectedMenuItem;
      if (!command) return;
      // Local intercept: copy operates on the live web-view's visible rows; routing through PAPI
      // would just round-trip and come back. Build the clipboard text inline here using the
      // current `visibleData` snapshot.
      if (command === 'platformScripture.copyMarkersChecklist') {
        if (!visibleData) return;
        const clipboardText = buildClipboardText(visibleData.columnHeaders, visibleData.rows);
        navigator.clipboard.writeText(clipboardText).catch((err) => {
          logger.warn(`ChecklistWebView: clipboard write failed: ${getErrorMessage(err)}`);
        });
        return;
      }
      // Other commands (e.g. `platformScripture.openMarkersChecklistSettings`) route via PAPI.
      // The registered handler in main.ts emits CHECKLIST_OPEN_SETTINGS_EVENT, which this web
      // view picks up via `useEvent` above to open the dialog.
      papi.commands
        // The PAPI sendCommand type requires a registered command-name literal union. Menu items
        // contain arbitrary registered command names at runtime, so we intentionally widen via a
        // cast to `Parameters<...>[0]` mirroring the editor's pattern. A runtime-validated dispatch
        // wrapper would be overkill here.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        .sendCommand(command as Parameters<typeof papi.commands.sendCommand>[0])
        .catch((err) =>
          logger.warn(
            `ChecklistWebView: project-menu command "${command}" failed: ${getErrorMessage(err)}`,
          ),
        );
    },
    [visibleData],
  );

  // ─── Toolbar trigger click handlers (stubs for primary-project + verse-range) ────────────
  //
  // Primary-project and verse-range still use the stand-in triggers: primary is derived from the
  // web-view's options (users don't retarget a running checklist to a different project); verse
  // range integration with the `ScopeSelector` dropdown variant (draft PR #2212) is deferred.
  // Comparative-texts is wired to the real `ProjectSelector` below.

  const handlePrimaryProjectTriggerClick = useCallback(() => {
    logger.debug('ChecklistWebView: primary-project trigger clicked (stand-in).');
  }, []);

  const handleVerseRangeTriggerClick = useCallback(() => {
    logger.debug('ChecklistWebView: verse-range trigger clicked (stand-in).');
  }, []);

  // ─── Comparative-texts picker via real ProjectSelector (draft PR #2223) ────
  //
  // Fetch all scripture projects on mount; filter the primary out (no self-comparison); track open
  // tabs for the "Open tabs" section in the popover. On selection change, map the returned
  // `ProjectPair[]` back to our `ChecklistComparativeTextRef[]` persistence shape.

  const [allProjects] = usePromise(
    useCallback(async () => {
      const allMetadata = await papi.projectLookup.getMetadataForAllProjects({
        // Scripture + Paratext project interfaces — mirrors checks-side-panel's filter so we pick
        // up the same project set that the scripture editor shows.
        includeProjectInterfaces: ['platformScripture.USJ_Chapter', 'platformScripture.USFM_Book'],
      });
      const results: ProjectSelectorProject[] = [];
      await Promise.all(
        allMetadata.map(async (metadata) => {
          try {
            const pdp = await papi.projectDataProviders.get('platform.base', metadata.id);
            const [shortName, fullName, language] = await Promise.all([
              pdp.getSetting('platform.name'),
              pdp.getSetting('platform.fullName'),
              Promise.resolve(undefined), // language not strictly required
            ]);
            // eslint-disable-next-line no-null/no-null
            if (shortName !== null && shortName !== undefined) {
              results.push({
                id: metadata.id,
                shortName,
                fullName: fullName ?? shortName,
                language,
              });
            }
          } catch (err) {
            logger.warn(
              `ChecklistWebView: failed to load project names for ${metadata.id}: ${getErrorMessage(err)}`,
            );
          }
        }),
      );
      return results;
    }, []),
    useMemo<ProjectSelectorProject[]>(() => [], []),
  );

  const comparativeProjects = useMemo<ProjectSelectorProject[]>(
    () => allProjects.filter((p) => p.id !== projectId),
    [allProjects, projectId],
  );

  const [comparativeOpenTabsMap, setComparativeOpenTabsMap] = useState<Map<string, OpenProjectTab>>(
    () => new Map(),
  );

  useEffect(() => {
    const upsert = (webView: { id: string; projectId?: string; scrollGroupScrRef?: unknown }) => {
      if (!webView.projectId || typeof webView.scrollGroupScrRef !== 'number') return;
      setComparativeOpenTabsMap((prev) => {
        const next = new Map(prev);
        next.set(webView.id, {
          projectId: webView.projectId!,
          scrollGroupId: webView.scrollGroupScrRef as ScrollGroupId,
        });
        return next;
      });
    };
    const unsubOpen = papi.webViews.onDidOpenWebView(({ webView }) => upsert(webView));
    const unsubUpdate = papi.webViews.onDidUpdateWebView(({ webView }) => upsert(webView));
    const unsubClose = papi.webViews.onDidCloseWebView(({ webView }) => {
      setComparativeOpenTabsMap((prev) => {
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
  }, []);

  const comparativeOpenTabs = useMemo<OpenProjectTab[]>(
    () => [...comparativeOpenTabsMap.values()],
    [comparativeOpenTabsMap],
  );

  const comparativeSelection = useMemo(
    () => ({ pairs: comparativeTexts.map((ref) => ({ projectId: ref.id })) }),
    [comparativeTexts],
  );

  const handleComparativeTextsChange = useCallback(
    (selection: { pairs: ProjectPair[] }) => {
      const projectIdToName = new Map(allProjects.map((p) => [p.id, p.shortName]));
      const nextRefs: ChecklistComparativeTextRef[] = selection.pairs.map((pair) => ({
        id: pair.projectId,
        name: projectIdToName.get(pair.projectId) ?? pair.projectId,
      }));
      setComparativeTexts(nextRefs);
    },
    [allProjects, setComparativeTexts],
  );

  const comparativeTextsSelectorNode = useMemo(
    () => (
      <div data-testid="checklist-comparative-texts-trigger">
        <ProjectSelector
          mode="project-multi"
          projects={comparativeProjects}
          openTabs={comparativeOpenTabs}
          selection={comparativeSelection}
          onChangeSelection={handleComparativeTextsChange}
        />
      </div>
    ),
    [comparativeProjects, comparativeOpenTabs, comparativeSelection, handleComparativeTextsChange],
  );

  // ─── Retry handler ────────────────────────────────────────────────────────

  const handleRetry = useCallback(() => {
    setRefreshCounter((n) => n + 1);
  }, []);

  // ─── View-toggle change handlers (write through to persisted slots) ─────

  const handleHideMatchesChange = useCallback(
    (next: boolean) => {
      setHideMatches(next);
    },
    [setHideMatches],
  );

  const handleShowVerseTextChange = useCallback(
    (next: boolean) => {
      setShowVerseText(next);
    },
    [setShowVerseText],
  );

  // ─── Dialog submit/cancel ────────────────────────────────────────────────

  const handleSettingsSubmit = useCallback(
    ({
      equivalentMarkers: nextEquivalent,
      markerFilter: nextFilter,
    }: {
      equivalentMarkers: string;
      markerFilter: string;
    }) => {
      // Collapse internal whitespace runs in the equivalent-markers string before persisting (the
      // dialog just trims now per Sebastian PR #2219 #3138226285 — validation/normalization
      // concerns moved out of the presentational component). The backend stores the value
      // verbatim; we keep the canonical wire format here so it matches what the backend's
      // validateMarkerSettings parsing expects.
      setEquivalentMarkers(nextEquivalent.replace(/\s+/g, ' '));
      setMarkerFilter(nextFilter);
      setIsSettingsOpen(false);
    },
    [setEquivalentMarkers, setMarkerFilter],
  );

  // Backend validation callback for the MarkerSettingsDialog. Calls the backend's
  // `validateMarkerSettings` PAPI command via the network-object proxy. The dialog calls this
  // (debounced) on every input change so the inline validation feedback reflects backend truth.
  // If the service proxy isn't available yet (e.g. during initial mount), return a permissive
  // valid result — the dialog will retry on the next input change once the proxy resolves.
  const handleSettingsValidate = useCallback(
    async (input: string) => {
      if (!service) {
        return { valid: true, parsedPairs: undefined, errorMessage: undefined };
      }
      return service.validateMarkerSettings(input);
    },
    [service],
  );

  const handleSettingsCancel = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  // ─── Derived labels for the toolbar triggers ─────────────────────────────

  const verseRangeAllLabel = localizedStrings['%markersChecklist_toolbar_verseRange%'] ?? 'All';
  const primaryProjectLabel = primaryProjectName;
  const comparativeTextsLabel =
    comparativeTexts.length > 0
      ? comparativeTexts.map((ref) => ref.name).join(', ')
      : (localizedStrings['%markersChecklist_toolbar_comparativeTexts%'] ?? '');
  const verseRangeLabel = formatScriptureRangeLabel(verseRange, verseRangeAllLabel);

  return (
    <>
      <ChecklistTool
        localizedStringsWithLoadingState={localizedStringsWithLoadingState}
        data={visibleData}
        columnProjectFullNames={columnProjectFullNames}
        columnDirections={columnDirections}
        isLoading={isLoading}
        error={error}
        helpText={undefined}
        primaryProjectLabel={primaryProjectLabel}
        onPrimaryProjectTriggerClick={handlePrimaryProjectTriggerClick}
        comparativeTextsLabel={comparativeTextsLabel}
        comparativeTextsSelector={comparativeTextsSelectorNode}
        verseRangeLabel={verseRangeLabel}
        onVerseRangeTriggerClick={handleVerseRangeTriggerClick}
        hideMatches={hideMatches}
        onHideMatchesChange={handleHideMatchesChange}
        showVerseText={showVerseText}
        onShowVerseTextChange={handleShowVerseTextChange}
        matchCountLabel={matchCountLabel}
        onRetry={handleRetry}
        projectMenuData={webViewMenu.topMenu}
        onSelectProjectMenuItem={handleSelectProjectMenuItem}
        // onEditLinkClick / onGotoLinkClick are intentionally not provided yet:
        //   - onEditLinkClick: scripture-editor edit-link integration is deferred (DEF-UI-003 in
        //     `deferred-functionality.md`). Per the no-stubs rule + Sebastian's "providing a
        //     callback should enable them" directive, omitting the prop hides the affordance
        //     entirely; when the integration lands, the wiring layer supplies the callback and
        //     the in-row edit button appears automatically.
        //   - onGotoLinkClick: TODO wire to the platform's scripture-navigation primitive (the
        //     active `useWebViewScrollGroupScrRef` hook would let us setScrRef on the active
        //     scroll group). Tracked separately — for now the reference cell renders plain text.
      />
      <MarkerSettingsDialog
        open={isSettingsOpen}
        initialEquivalentMarkers={equivalentMarkers}
        initialMarkerFilter={markerFilter}
        validate={handleSettingsValidate}
        onSubmit={handleSettingsSubmit}
        onCancel={handleSettingsCancel}
        localizedStringsWithLoadingState={markerSettingsLocalizedStrings}
      />
    </>
  );
};
