import type { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useDataProvider, useDialogCallback, useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  usePromise,
} from 'platform-bible-react';
import { Settings2 } from 'lucide-react';
import {
  DblResourceData,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
} from 'platform-bible-utils';
import type { DblResourceReference } from 'platform-scripture';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  getScriptureTextGridContents,
  getViewOptionsTexts,
} from './scripture-text-grid-contents.utils';
import {
  persistUserAddition,
  persistUserDisplay,
  persistUserRemoval,
} from './scripture-text-grid-persistence.utils';
import { useTextCollectionSources } from './use-text-collection-sources.hook';
import { resolveTextCollectionProjectId } from './scripture-text-grid-project.utils';
import {
  ResourceCollectionOptions,
  RESOURCE_COLLECTION_OPTIONS_STRING_KEYS,
  type ResourceCollectionViewMode,
} from './resource-collection-options/resource-collection-options.component';
import {
  ChapterContextResource,
  ScriptureTextGrid,
} from './scripture-text-grid/scripture-text-grid.component';
import { GridResource } from './scripture-text-grid/resource-cell.component';
import { toGridResources } from './scripture-text-grid/grid-resources.utils';

// The tab is icon-only; this is the hover tooltip / accessible name for it.
const TITLE_KEY = '%webView_scriptureTextGrid_title_multiple%';
const VIEW_OPTIONS_BUTTON_KEY = '%webView_scriptureTextGrid_viewOptions_openPanel%';
// Notification keys are localized by the notification service, so they are NOT fetched via
// `useLocalizedStrings`; only keys rendered directly in JSX go in `ALL_STRING_KEYS` below.
const INSTALL_FAILED_KEY = '%webView_selectDblResource_installFailed%';
const PERSIST_FAILED_KEY = '%webView_scriptureTextGrid_viewOptions_persistFailed%';
const NO_PROJECT_KEY = '%webView_resourcePanel_noProject%';
const CHAPTER_CONTEXT_CLOSE_KEY = '%webView_scriptureTextGrid_chapterContext_close%';
const CELL_ACCESSIBLE_NAME_KEY = '%webView_scriptureTextGrid_cell_accessibleName%';

const ALL_STRING_KEYS: LocalizeKey[] = [
  TITLE_KEY,
  VIEW_OPTIONS_BUTTON_KEY,
  NO_PROJECT_KEY,
  CHAPTER_CONTEXT_CLOSE_KEY,
  CELL_ACCESSIBLE_NAME_KEY,
  ...RESOURCE_COLLECTION_OPTIONS_STRING_KEYS,
];

// The Scripture Text Grid shows Bible-text resources.
const GRID_RESOURCE_TYPE = 'ScriptureResource';

// Theme-adaptive tab icon: the platform paints the tab icon as a static CSS background-image, so a
// `currentColor` SVG can't follow the theme. Swap between a dark-stroke (light theme) and a
// light-stroke (dark theme) variant based on the web view's themed foreground brightness.
const LIGHT_THEME_ICON_URL = 'papi-extension://platformScriptureEditor/assets/library.svg';
const DARK_THEME_ICON_URL = 'papi-extension://platformScriptureEditor/assets/library-dark.svg';

/**
 * Scripture Text Grid web view: the tab shell, per-user first-open overlay initialization, the View
 * Options panel (A5), and the resource body (A4 verse mode / B4 chapter mode).
 *
 * The header hosts the View Options icon button + popover wrapping the reusable
 * `ResourceCollectionOptions` component, wired to the View Options data-layer helpers and persisted
 * through the per-user text-connection PDP setters. Below the header, the body renders one
 * `ResourceCell` per shown resource — the resources come from A3's `getScriptureTextGridContents`
 * selector over the Text Collection sources assembled by `useTextCollectionSources`. The `viewMode`
 * toggle selects the layout: a horizontal verse list, or a vertical stack of full-chapter regions.
 */
globalThis.webViewComponent = function ScriptureTextGridWebView({
  projectId,
  updateWebViewDefinition,
  useWebViewScrollGroupScrRef,
  useWebViewState,
}: WebViewProps) {
  const [localizedStrings, isLoadingLocalizedStrings] = useLocalizedStrings(ALL_STRING_KEYS);

  // The shared scroll-group scrRef is owned here (WebViewProps) and passed down to the grid. The
  // 5th tuple member is the project driving the active Scripture reference (the editor's project):
  // follow it when opened without an explicit project — e.g. from the default layout, whose tab
  // carries no projectId. An explicit `projectId` (e.g. a direct openWebView) takes precedence.
  const [scrRef, setScrRef, , , activeEditorProjectId] = useWebViewScrollGroupScrRef();
  const candidateProjectId = projectId ?? activeEditorProjectId;

  // `effectiveProjectId` is the project whose text collection the grid shows. It starts from the
  // active editor and is refined by a latch effect (below, once `resources` is known) so that
  // focusing one of the grid's own resource cells doesn't hijack it. See resolveTextCollectionProjectId.
  const [effectiveProjectId, setEffectiveProjectId] = useState<string | undefined>(
    candidateProjectId,
  );

  const { sources, textConnectionPdp } = useTextCollectionSources(effectiveProjectId);

  // Latest sources for the async callbacks below — reading the render-closure `sources` would let a
  // rapid second toggle (or a toggle mid-install) compute its next-state from a pre-write snapshot
  // and clobber the first write. A ref always hands the callbacks the freshest snapshot.
  const sourcesRef = useRef(sources);
  sourcesRef.current = sources;

  // View Options `viewMode` toggle; drives the grid body's verse/chapter layout. Persisted per web
  // view via useWebViewState so the choice survives an app restart (mirrors resource-text-panel).
  const [viewMode, setViewMode] = useWebViewState<ResourceCollectionViewMode>('viewMode', 'verse');
  // Resources whose install is in flight after a Get Resources pick (keyed by id so duplicate
  // display names can't drop each other's row); their names drive the "Installing {name}…" rows.
  const [installing, setInstalling] = useState<Array<{ id: string; name: string }>>([]);

  // Chapter-context overlay opened from a verse cell; Escape closes it. Intentionally NOT cleared on
  // a view-mode switch: chapter mode ignores it, and keeping it restores the open split when the user
  // returns to verse mode.
  const [chapterContext, setChapterContext] = useState<ChapterContextResource | undefined>(
    undefined,
  );
  const handleCloseChapterContext = useCallback(() => {
    setChapterContext(undefined);
  }, []);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || chapterContext === undefined) return;
      event.preventDefault();
      event.stopPropagation();
      handleCloseChapterContext();
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [chapterContext, handleCloseChapterContext]);

  const { top, bottom } = useMemo(
    () => (sources ? getViewOptionsTexts(sources) : { top: [], bottom: [] }),
    [sources],
  );

  // The cached DBL resource list resolves DBL references (whose `id` is a DBL entry UID) to the
  // installed project id the cell fetches chapter text with; project references need no lookup.
  const [cachedResources] = usePromise(
    useCallback(() => papi.commands.sendCommand('platformGetResources.getCachedResources'), []),
    undefined,
  );

  // The grid body's cells: A3's selector over the Text Collection sources, resolved to the row's
  // `{ projectId, label }` shape. The selector returns already-filtered, ordered Bible-text refs.
  const resources = useMemo<GridResource[]>(
    () =>
      toGridResources(sources ? getScriptureTextGridContents(sources) : [], cachedResources ?? []),
    [sources, cachedResources],
  );

  // Latch the displayed project. Each grid resource cell is itself a Scripture editor, so focusing
  // one (e.g. clicking a verse in Chapter view) makes that resource the active editor. Never switch
  // the grid to one of its own displayed resources — that project has no text collection and would
  // blank the grid; keep the current project instead. Still follow the active editor to a genuinely
  // different text-collection project.
  useEffect(() => {
    setEffectiveProjectId((previous) =>
      resolveTextCollectionProjectId(previous, {
        explicitProjectId: projectId,
        candidateProjectId,
        candidateIsOwnResource: resources.some(
          (resource) => resource.projectId === candidateProjectId,
        ),
      }),
    );
  }, [projectId, candidateProjectId, resources]);

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');

  // Fire first-open overlay init once per resolved projectId. The server-side marker makes repeated
  // calls safe; this guard just avoids redundant round-trips within a single web-view lifetime.
  const initializedProjectIds = useRef(new Set<string>());
  useEffect(() => {
    if (!effectiveProjectId || !textConnectionPdp) return;
    if (initializedProjectIds.current.has(effectiveProjectId)) return;
    initializedProjectIds.current.add(effectiveProjectId);
    textConnectionPdp.initializeShownByDefaultOverlay().catch((error) => {
      initializedProjectIds.current.delete(effectiveProjectId);
      logger.error(
        `Failed to initialize shown-by-default overlay for ${effectiveProjectId}: ${error}`,
      );
    });
  }, [effectiveProjectId, textConnectionPdp]);

  // Icon-only tab: no visible text label, with "Text Collection" as the hover tooltip / accessible
  // name so the tab stays identifiable.
  useEffect(() => {
    if (isLoadingLocalizedStrings) return;
    updateWebViewDefinition({ title: '', tooltip: localizedStrings[TITLE_KEY] });
  }, [isLoadingLocalizedStrings, localizedStrings, updateWebViewDefinition]);

  // Pick the tab icon variant to match the current theme. The tab icon is painted by the platform
  // as a static background-image, so a `currentColor` SVG can't follow the theme — we swap the
  // `iconUrl` ourselves based on the theme type from `papi.themes`.
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
    let disposed = false;
    let unsubscribe: (() => void) | undefined;
    papi.themes
      .subscribeCurrentTheme(undefined, (theme) => {
        if (!isPlatformError(theme)) setIsDarkTheme(theme.type === 'dark');
      })
      .then((unsub) => {
        if (disposed) unsub();
        else unsubscribe = unsub;
        return undefined;
      })
      .catch((e) => logger.warn(`Failed to subscribe to the current theme: ${getErrorMessage(e)}`));
    return () => {
      disposed = true;
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    updateWebViewDefinition({ iconUrl: isDarkTheme ? DARK_THEME_ICON_URL : LIGHT_THEME_ICON_URL });
  }, [isDarkTheme, updateWebViewDefinition]);

  const handleCheckedChange = useCallback(
    (resourceId: string, checked: boolean) => {
      const { current } = sourcesRef;
      if (!current || !textConnectionPdp) return;
      const writes = persistUserDisplay(textConnectionPdp, resourceId, checked, current);
      // `Promise.all` rejects on the first failed write, so a failed toggle notifies once (not once
      // per underlying list/overlay write).
      Promise.all(writes).catch((e) => {
        papi.notifications.send({ message: PERSIST_FAILED_KEY, severity: 'error' });
        logger.warn(`Failed to persist view-options change: ${getErrorMessage(e)}`);
      });
    },
    [textConnectionPdp],
  );

  const handleRemoveFromList = useCallback(
    (resourceId: string) => {
      const { current } = sourcesRef;
      if (!current || !textConnectionPdp) return;
      persistUserRemoval(textConnectionPdp, resourceId, current.userReferenced)?.catch((e) => {
        papi.notifications.send({ message: PERSIST_FAILED_KEY, severity: 'error' });
        logger.warn(`Failed to persist removal: ${getErrorMessage(e)}`);
      });
    },
    [textConnectionPdp],
  );

  const handleResourceSelect = useCallback(
    async (resource: DblResourceData) => {
      if (!textConnectionPdp) return;

      if (!resource.installed) {
        if (!dblResourcesProvider) return;
        const pending = { id: resource.dblEntryUid, name: resource.displayName };
        setInstalling((prev) => [...prev, pending]);
        try {
          await dblResourcesProvider.installDblResource(resource.dblEntryUid);
        } catch (e: unknown) {
          papi.notifications.send({ message: INSTALL_FAILED_KEY, severity: 'error' });
          logger.warn(`Failed to install resource ${resource.dblEntryUid}: ${getErrorMessage(e)}`);
          return;
        } finally {
          setInstalling((prev) => prev.filter((info) => info.id !== resource.dblEntryUid));
        }
      }

      // Re-read after the await: the subscription may have advanced during the install.
      const { current } = sourcesRef;
      if (!current) return;
      const reference: DblResourceReference = {
        type: 'dblResource',
        name: resource.displayName,
        id: resource.dblEntryUid,
      };
      persistUserAddition(textConnectionPdp, reference, current.userReferenced)?.catch((e) => {
        papi.notifications.send({ message: PERSIST_FAILED_KEY, severity: 'error' });
        logger.warn(`Failed to persist added resource: ${getErrorMessage(e)}`);
      });
    },
    [dblResourcesProvider, textConnectionPdp],
  );

  const selectedResourceIds = useMemo(
    () => [...top, ...bottom].map((entry) => entry.reference.id),
    [top, bottom],
  );

  const showResourcePicker = useDialogCallback(
    'platform.resourcePicker',
    useMemo(
      () => ({ resourceType: GRID_RESOURCE_TYPE, selectedResourceIds, isModal: true }),
      [selectedResourceIds],
    ),
    useCallback(
      (resource: DblResourceData | undefined) => {
        if (!resource) return;
        handleResourceSelect(resource).catch((e) =>
          logger.error(`Resource selection failed: ${getErrorMessage(e)}`),
        );
      },
      [handleResourceSelect],
    ),
  );

  const installingResourceNames = useMemo(() => installing.map((info) => info.name), [installing]);

  return (
    <div
      data-testid="scripture-text-grid"
      className="tw:flex tw:h-screen tw:flex-col tw:bg-background tw:text-foreground"
    >
      <div className="tw:flex tw:items-center tw:justify-end tw:border-b tw:p-1">
        <Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={localizedStrings[VIEW_OPTIONS_BUTTON_KEY]}
                    // Explicit themed colors so the icon is visible in both light and dark themes; a
                    // plain ghost button inherits the (un-themed) default color and vanishes on dark
                    // tabs.
                    className="tw:text-muted-foreground tw:hover:text-foreground"
                  >
                    <Settings2 className="tw:h-4 tw:w-4" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>{localizedStrings[VIEW_OPTIONS_BUTTON_KEY]}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <PopoverContent className="tw:max-h-[70vh] tw:overflow-y-auto">
            <ResourceCollectionOptions
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isChapterEnabled
              top={top}
              bottom={bottom}
              installingResourceNames={installingResourceNames}
              onCheckedChange={handleCheckedChange}
              onRemoveFromList={handleRemoveFromList}
              onGetResources={showResourcePicker}
              // No project/PDP bound yet → every action would silently no-op, so disable the
              // controls. Show the "no project" prompt only when there is genuinely no project (not
              // during the brief load after one is bound).
              disabled={!sources || !textConnectionPdp}
              disabledMessage={effectiveProjectId ? undefined : localizedStrings[NO_PROJECT_KEY]}
              localizedStrings={localizedStrings}
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* Grid body: verse-cell rows below the header seam, verse/chapter layout from `viewMode`. */}
      <div className="tw:flex-1 tw:overflow-hidden">
        <ScriptureTextGrid
          ariaLabel={localizedStrings[TITLE_KEY]}
          resources={resources}
          scrRef={scrRef}
          setScrRef={setScrRef}
          viewMode={viewMode}
          chapterContext={chapterContext}
          onChapterContextChange={setChapterContext}
          onChapterContextClose={handleCloseChapterContext}
          closeChapterContextLabel={localizedStrings[CHAPTER_CONTEXT_CLOSE_KEY]}
          cellAccessibleNameTemplate={localizedStrings[CELL_ACCESSIBLE_NAME_KEY]}
        />
      </div>
    </div>
  );
};
