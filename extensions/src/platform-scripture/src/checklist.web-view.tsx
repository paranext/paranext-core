import { WebViewProps } from '@papi/core';
import papi, { logger, network } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  useEvent,
  ProjectSelector,
  ScopeSelector,
  SCOPE_SELECTOR_STRING_KEYS,
  type ProjectSelectorOpenTab,
  type ProjectSelectorProjectPair,
  type ProjectSelectorProject,
  type ScopeWithRange,
  usePromise,
} from 'platform-bible-react';
import { defaultScrRef, formatReplacementString, getErrorMessage } from 'platform-bible-utils';
import { Canon, type SerializedVerseRef } from '@sillsdev/scripture';
import type {
  ChecklistComparativeTextRef,
  ChecklistRequest,
  ChecklistResultResponse,
  IVersificationService,
  ScriptureRange,
} from 'platform-scripture';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChecklistTool, CHECKLIST_STRING_KEYS } from './components/checklist.component';
import type {
  ChecklistData,
  ChecklistEmptyResultMessage,
  ChecklistRow,
} from './components/checklist.component';
import {
  MarkerSettingsDialog,
  MARKER_SETTINGS_STRING_KEYS,
} from './components/marker-settings-dialog.component';
import { useChecklistService } from './hooks/use-checklist';
import { useOpenProjectTabs } from './hooks/use-open-project-tabs';
import { parseScrRef } from './components/parse-scr-ref.utils';
import { computeRangeFromScope } from './components/compute-range-from-scope.utils';
import {
  filterComparativeProjects,
  filterPrimaryProjects,
} from './components/checklist-project-filter.utils';
import { CHECKLIST_OPEN_SETTINGS_EVENT } from './checklist.model';

// ─── Constants ─────────────────────────────────────────────────────────────

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

// UX-2 finding #1 (WP3): the `buildClipboardText` / `cellToText` helpers previously
// lived here because the inner TabToolbar's project-menu handler ran the clipboard
// copy locally. With the inner toolbar gone, the copy action will be reimplemented
// against the outer Platform tab chrome's hamburger in WP6 — likely as a command
// registered in `main.ts` that round-trips the visible-data snapshot via a network
// event. Until WP6 lands the new wiring, the helpers are removed to keep the
// web-view free of dead code.

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
  // The fourth tuple slot (`setScrollGroupId`) is reserved for a future scroll-group picker UI
  // (parity with checks-side-panel Tasks 13/14); omitted here until that UI is wired.
  const [liveScrRef, setLiveScrRef, scrollGroupId] = useWebViewScrollGroupScrRef();

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
  // - `scope` drives the ScopeSelector display label; `verseRange` auto-follows `liveScrRef`
  //   via the effect below.
  // - `verseRange` is the *frozen* request payload sent to the backend (PT9-equivalent;
  //   `undefined` = "All Books", matching PT9 memento with empty FirstVerseRef/LastVerseRef).
  // - `rangeStart` / `rangeEnd` back the BCV pickers shown in `range` mode.
  // - `selectedBookIds` is wired to ScopeSelector but inert (its mode is not in availableScopes).
  const [scope, setScope] = useWebViewState<ScopeWithRange>('checklistScope', 'chapter');
  const [rangeStart, setRangeStart] = useWebViewState<SerializedVerseRef>(
    'checklistRangeStart',
    defaultScrRef,
  );
  const [rangeEnd, setRangeEnd] = useWebViewState<SerializedVerseRef>(
    'checklistRangeEnd',
    defaultScrRef,
  );
  const [verseRange, setVerseRange] = useWebViewState<ScriptureRange | undefined>(
    'checklistVerseRange',
    undefined,
  );
  const [selectedBookIds, setSelectedBookIds] = useWebViewState<string[]>(
    'checklistSelectedBookIds',
    [],
  );

  // Note: `scope`, `setScope`, `rangeStart`, `setRangeStart`, `rangeEnd`,
  // `setRangeEnd`, `selectedBookIds`, and `setSelectedBookIds` are all consumed below by the
  // ScopeSelector wiring (Task 8). `setLiveScrRef` and `scrollGroupId` are consumed by the
  // goto handler (Task 9). `setScrollGroupId` stays `void`-suppressed until a scroll-group
  // picker is wired (parity with checks-side-panel Tasks 13/14).

  // ─── Localization ─────────────────────────────────────────────────────────

  const checklistStringKeys = useMemo(() => Array.from(CHECKLIST_STRING_KEYS), []);
  const localizedStringsWithLoadingState = useLocalizedStrings(checklistStringKeys);
  const [localizedStrings] = localizedStringsWithLoadingState;

  const markerSettingsStringKeys = useMemo(() => Array.from(MARKER_SETTINGS_STRING_KEYS), []);
  const markerSettingsLocalizedStrings = useLocalizedStrings(markerSettingsStringKeys);

  const scopeSelectorStringKeys = useMemo(() => Array.from(SCOPE_SELECTOR_STRING_KEYS), []);
  const [scopeSelectorLocalizedStrings] = useLocalizedStrings(scopeSelectorStringKeys);

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

  // ─── Books-present for ScopeSelector ──────────────────────────────────────
  const [booksPresent, setBooksPresent] = useState<string>(
    '0'.repeat(124), // 124 books per BookSet — empty default until project setting resolves
  );
  useEffect(() => {
    if (!projectId) return () => {};
    let cancelled = false;
    (async () => {
      try {
        const pdp = await papi.projectDataProviders.get('platform.base', projectId);
        const next = await pdp.getSetting('platformScripture.booksPresent');
        if (cancelled) return;
        if (typeof next === 'string') setBooksPresent(next);
      } catch (err) {
        logger.debug(`ChecklistWebView: booksPresent fetch failed: ${getErrorMessage(err)}`);
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
          // The `'rows' in response` narrowing already proves response is the success variant,
          // so we can pass it through without further casting.
          setData(toChecklistData(response));
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

  // ─── Versification lookups (Theme 6) ──────────────────────────────────────
  //
  // Mirrors platform-scripture-editor.web-view.tsx:351-377. Uses VersificationService for
  // current-book verse counts; other books would need their own fetch/cache (matches the
  // scripture-editor's existing limitation).

  const currentBookNum = useMemo(() => Canon.bookIdToNumber(liveScrRef.book), [liveScrRef.book]);

  const fetchLastVersesInCurrentBook = useCallback(async (): Promise<number[] | undefined> => {
    if (!projectId || currentBookNum <= 0) return undefined;
    try {
      const versificationService = await papi.networkObjects.get<IVersificationService>(
        'platformScripture.versificationService',
      );
      if (!versificationService) return undefined;
      return await versificationService.lookupFinalVerseNumbersInBook(projectId, currentBookNum);
    } catch (err) {
      logger.debug(`ChecklistWebView: VersificationService unavailable: ${getErrorMessage(err)}`);
      return undefined;
    }
  }, [projectId, currentBookNum]);
  const [lastVersesInCurrentBook] = usePromise(fetchLastVersesInCurrentBook, undefined);

  const getEndVerse = useCallback(
    (bookId: string, chapterNum: number): number => {
      if (Canon.bookIdToNumber(bookId) !== currentBookNum) return 0;
      return lastVersesInCurrentBook?.[chapterNum] ?? 0;
    },
    [currentBookNum, lastVersesInCurrentBook],
  );

  // Last-chapter lookup derived from the same per-book array as getEndVerse.
  // The verses array is 1-indexed (matches scripture-editor.web-view.tsx:374's
  // `[chapterNum]` access pattern), so length - 1 yields the highest chapter number.
  // Returns 0 for non-current books — computeRangeFromScope tolerates 0 by falling back
  // to the documented 999 sentinel (FALLBACK_END_CHAPTER).
  const getLastChapter = useCallback(
    (bookId: string): number => {
      if (Canon.bookIdToNumber(bookId) !== currentBookNum) return 0;
      if (!lastVersesInCurrentBook || lastVersesInCurrentBook.length === 0) return 0;
      return lastVersesInCurrentBook.length - 1;
    },
    [currentBookNum, lastVersesInCurrentBook],
  );

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

  // UX-2 finding #1 (WP3): the inner TabToolbar was removed because the outer
  // Platform.Bible tab chrome already surfaces the same hamburger menu. The
  // outer chrome subscribes to `WebViewMenu` directly for this web-view's type
  // and renders the contributed items itself, so the web-view no longer needs
  // its own `useData(menuData)` subscription. WP6 wires the command handlers
  // (Open Project Settings, Copy, Settings) into the outer chrome via menu
  // contributions in `menus.json` + `main.ts`.

  // ─── Subscribe to the "open settings" network event (UI-PKG-003) ─────────

  const handleOpenSettingsEvent = useCallback(() => {
    setIsSettingsOpen(true);
  }, []);
  useEvent(
    network.getNetworkEvent<undefined>(CHECKLIST_OPEN_SETTINGS_EVENT),
    handleOpenSettingsEvent,
  );

  // ─── Comparative-texts picker via real ProjectSelector (draft PR #2223) ────
  //
  // Fetch all scripture projects on mount; filter the primary out (no self-comparison); track open
  // tabs for the "Open tabs" section in the popover. On selection change, map the returned
  // `ProjectSelectorProjectPair[]` back to our `ChecklistComparativeTextRef[]` persistence shape.

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
            // pdp.getSetting can return `null` for missing settings — must compare against null
            // explicitly here, so we disable the no-null rule for this guard only.
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

  // UX-2 finding #14: bidirectional exclusion. The comparative selector hides the currently
  // selected primary; the primary selector (below) hides every project already chosen as a
  // comparative. Filter rules live in `checklist-project-filter.utils.ts` with their own unit
  // tests so the rule can't regress silently.
  const comparativeProjects = useMemo<ProjectSelectorProject[]>(
    () => filterComparativeProjects(allProjects, projectId),
    [allProjects, projectId],
  );

  const primaryProjects = useMemo<ProjectSelectorProject[]>(
    () =>
      filterPrimaryProjects(
        allProjects,
        comparativeTexts.map((ref) => ref.id),
      ),
    [allProjects, comparativeTexts],
  );

  // Comparative-texts ProjectSelector tracks ALL project-bound tabs (no webViewType filter).
  // The shared `useOpenProjectTabs` hook (introduced for goto-focus tracking) returns a richer
  // shape with webViewId + webViewType; map back to the lighter ProjectSelectorOpenTab shape that
  // ProjectSelector's `openTabs` prop expects.
  const allOpenProjectTabs = useOpenProjectTabs();
  const comparativeOpenTabs = useMemo<ProjectSelectorOpenTab[]>(
    () =>
      allOpenProjectTabs.map((t) => ({ projectId: t.projectId, scrollGroupId: t.scrollGroupId })),
    [allOpenProjectTabs],
  );

  // ─── Editor-tab tracking (for goto focus, Q4-C) ───────────────────────────
  const editorTabsFilter = useCallback(
    (wv: { webViewType: string }) => wv.webViewType === 'platformScriptureEditor.react',
    [],
  );
  const editorTabs = useOpenProjectTabs(editorTabsFilter);
  const editorTabsByProject = useMemo(
    () => new Map(editorTabs.map((t) => [t.projectId, t])),
    [editorTabs],
  );

  const comparativeSelection = useMemo(
    () => ({ pairs: comparativeTexts.map((ref) => ({ projectId: ref.id })) }),
    [comparativeTexts],
  );

  const handleComparativeTextsChange = useCallback(
    (selection: { pairs: ProjectSelectorProjectPair[] }) => {
      const nextRefs: ChecklistComparativeTextRef[] = selection.pairs.map((pair) => ({
        id: pair.projectId,
      }));
      setComparativeTexts(nextRefs);
    },
    [setComparativeTexts],
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
          buttonClassName="tw-h-8 tw-min-w-32 tw-font-normal"
          // UX-2 finding #6: show a placeholder when no comparatives are
          // selected. The tooltip on the trigger carries the full hint on hover.
          buttonPlaceholder={
            localizedStrings['%markersChecklist_toolbar_comparativeTextsPlaceholder%'] ??
            'Select comparative texts'
          }
          ariaLabel={localizedStrings['%markersChecklist_toolbar_comparativeTexts%']}
          // UX-2 finding #6: hide the "Select all" button. Selecting every project
          // as a comparative text is rarely useful and creates accidental wide
          // queries.
          hideSelectAll
        />
      </div>
    ),
    [
      comparativeProjects,
      comparativeOpenTabs,
      comparativeSelection,
      handleComparativeTextsChange,
      localizedStrings,
    ],
  );

  // ─── ScopeSelector handlers (R1: snapshot at click-time) ─────────────────

  const handleScopeChange = useCallback(
    (newScope: ScopeWithRange) => {
      // Auto-follow: verseRange is derived via the effect below from {scope, liveScrRef,
      // rangeStart, rangeEnd}. handleScopeChange just commits the new mode.
      setScope(newScope);
    },
    [setScope],
  );

  const handleRangeStartChange = useCallback(
    (next: SerializedVerseRef) => {
      setRangeStart(next);
      if (scope === 'range') setVerseRange({ start: next, end: rangeEnd });
    },
    [scope, rangeEnd, setRangeStart, setVerseRange],
  );

  const handleRangeEndChange = useCallback(
    (next: SerializedVerseRef) => {
      setRangeEnd(next);
      if (scope === 'range') setVerseRange({ start: rangeStart, end: next });
    },
    [scope, rangeStart, setRangeEnd, setVerseRange],
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

  // ─── Primary-project picker via real ProjectSelector (Theme 5 #2) ─────────
  //
  // Single-select picker. On change, retargets the checklist to a new project via
  // `updateWebViewDefinition`. Reuses `allProjects` and `comparativeOpenTabs` from the
  // comparative-texts wiring. PT9 confirmed interactive (`ChecklistsTool.cs:179`).

  const primaryProjectSelectorNode = useMemo(
    () => (
      <div data-testid="checklist-primary-project-trigger">
        <ProjectSelector
          mode="project"
          projects={primaryProjects}
          openTabs={comparativeOpenTabs}
          selection={{ projectId }}
          onChangeSelection={(next: { projectId: string }) =>
            updateWebViewDefinition({ projectId: next.projectId })
          }
          buttonClassName="tw-h-8 tw-min-w-32 tw-font-normal"
          // UX-2 finding #5: drop the truncating "Select primary S..." placeholder.
          // When a project is selected the short name fills the trigger; when none
          // is selected the trigger stays empty and the aria-label / tooltip carries
          // the localized hint instead.
          ariaLabel={localizedStrings['%markersChecklist_toolbar_primaryProject%']}
        />
      </div>
    ),
    [primaryProjects, comparativeOpenTabs, projectId, updateWebViewDefinition, localizedStrings],
  );

  // ─── Auto-follow effect: recompute verseRange when scope or liveScrRef changes ────
  //
  // Debounced 250ms (matches checks-side-panel.web-view.tsx:496) so rapid editor
  // navigation doesn't fire a backend refetch on every cursor blink. The fetch effect
  // (which depends on verseRange) only fires when the computed range actually changes
  // shape — within a chapter, scope='chapter' produces an identical range so the
  // referential change still bumps verseRange but the request payload is the same;
  // backend can dedupe.
  useEffect(() => {
    const handle = setTimeout(() => {
      const computed = computeRangeFromScope({
        scope,
        ref: liveScrRef,
        rangeStart,
        rangeEnd,
        getEndVerse,
        getLastChapter,
      });
      if (computed) setVerseRange(computed);
    }, 250);
    return () => clearTimeout(handle);
  }, [scope, liveScrRef, rangeStart, rangeEnd, getEndVerse, getLastChapter, setVerseRange]);

  // ─── Verse-range picker via real ScopeSelector (Themes 5 #3 + 6) ─────────
  //
  // Auto-follow semantics: the displayed scripture reference tracks `liveScrRef` directly;
  // verseRange is derived from {scope, liveScrRef, rangeStart, rangeEnd} via the effect above.
  // `availableScopes` excludes `selectedBooks` and `selectedText` because the backend's
  // `ScriptureRange` contract only models contiguous start/end ranges.
  // `getEndVerse` enables verse-grid selection in the BCV pickers used by `range` mode (Theme 6).

  const verseRangeSelectorNode = useMemo(
    () => (
      <div data-testid="checklist-verse-range-trigger">
        <ScopeSelector
          variant="dropdown"
          scope={scope}
          availableScopes={['verse', 'chapter', 'book', 'range']}
          onScopeChange={handleScopeChange}
          availableBookInfo={booksPresent}
          selectedBookIds={selectedBookIds}
          onSelectedBookIdsChange={setSelectedBookIds}
          localizedStrings={scopeSelectorLocalizedStrings}
          currentScrRef={liveScrRef}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onRangeStartChange={handleRangeStartChange}
          onRangeEndChange={handleRangeEndChange}
          getEndVerse={getEndVerse}
          hideLabel
          buttonClassName="tw-h-8 tw-min-w-32 tw-font-normal"
        />
      </div>
    ),
    [
      scope,
      handleScopeChange,
      booksPresent,
      selectedBookIds,
      setSelectedBookIds,
      scopeSelectorLocalizedStrings,
      liveScrRef,
      rangeStart,
      rangeEnd,
      handleRangeStartChange,
      handleRangeEndChange,
      getEndVerse,
    ],
  );

  // ─── Goto-link click handler (Q4: A scroll-group broadcast + C editor focus) ──

  const handleGotoLinkClick = useCallback(
    (_row: ChecklistRow, refStr: string) => {
      const verseRef = parseScrRef(refStr);
      if (!verseRef) {
        logger.debug(`ChecklistWebView: failed to parse scrRef: ${refStr}`);
        return;
      }
      setLiveScrRef(verseRef); // A: scroll-group broadcast
      // C: if an editor tab is open in the same project + same scroll group, raise it.
      // `projectId` is `string | undefined` from WebViewProps; without one we can't pick an
      // editor tab, but the broadcast above still serves any other bound web-view.
      if (!projectId) return;
      const editorTab = editorTabsByProject.get(projectId);
      if (editorTab && editorTab.scrollGroupId === scrollGroupId) {
        papi.window
          .setFocus({ focusType: 'webView', id: editorTab.webViewId })
          .catch((err: unknown) =>
            logger.debug(`ChecklistWebView: setFocus failed: ${getErrorMessage(err)}`),
          );
      }
    },
    [setLiveScrRef, editorTabsByProject, projectId, scrollGroupId],
  );

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
        primaryProjectSelector={primaryProjectSelectorNode}
        comparativeTextsSelector={comparativeTextsSelectorNode}
        verseRangeSelector={verseRangeSelectorNode}
        hideMatches={hideMatches}
        onHideMatchesChange={handleHideMatchesChange}
        showVerseText={showVerseText}
        onShowVerseTextChange={handleShowVerseTextChange}
        matchCountLabel={matchCountLabel}
        onRetry={handleRetry}
        onGotoLinkClick={handleGotoLinkClick}
        // UX-2 finding #1 (WP3): the inner TabToolbar was dropped, so the
        // component no longer accepts a `projectMenuData` / `onSelectProjectMenuItem`
        // pair. WP6 wires the hamburger menu items to the outer Platform.Bible
        // tab chrome via menu contributions in main.ts. The `webViewMenu` and
        // `handleSelectProjectMenuItem` bindings below remain because they will
        // be re-used by WP6 once the menu contributions land.
        // onEditLinkClick: scripture-editor edit-link integration is deferred (DEF-UI-003).
        // Per the no-stubs rule, omitting the prop hides the affordance entirely until the
        // integration lands.
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
