import type { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useDataProvider, useDialogCallback, useLocalizedStrings } from '@papi/frontend/react';
import { Button, Popover, PopoverContent, PopoverTrigger } from 'platform-bible-react';
import { Settings2 } from 'lucide-react';
import { DblResourceData, getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import type { DblResourceReference } from 'platform-scripture';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  addToUserResources,
  getViewOptionsTexts,
  removeFromUserResources,
  setUserDisplay,
} from './scripture-text-grid-contents.utils';
import { useTextCollectionSources } from './use-text-collection-sources.hook';
import {
  ScriptureTextGridOptions,
  SCRIPTURE_TEXT_GRID_OPTIONS_STRING_KEYS,
  type ScriptureTextGridViewMode,
} from './scripture-text-grid-options/scripture-text-grid-options.component';

// The tab is icon-only; this is the hover tooltip / accessible name for it.
const TITLE_KEY = '%webView_scriptureTextGrid_title_multiple%';
const VIEW_OPTIONS_BUTTON_KEY = '%webView_scriptureTextGrid_viewOptions_openPanel%';
const INSTALL_FAILED_KEY = '%webView_selectDblResource_installFailed%';

const ALL_STRING_KEYS: LocalizeKey[] = [
  TITLE_KEY,
  VIEW_OPTIONS_BUTTON_KEY,
  ...SCRIPTURE_TEXT_GRID_OPTIONS_STRING_KEYS,
];

// The Scripture Text Grid shows Bible-text resources.
const GRID_RESOURCE_TYPE = 'ScriptureResource';

// Theme-adaptive tab icon: the platform paints the tab icon as a static CSS background-image, so a
// `currentColor` SVG can't follow the theme. Swap between a dark-stroke (light theme) and a
// light-stroke (dark theme) variant based on the web view's themed foreground brightness.
const LIGHT_THEME_ICON_URL = 'papi-extension://platformScriptureEditor/assets/library.svg';
const DARK_THEME_ICON_URL = 'papi-extension://platformScriptureEditor/assets/library-dark.svg';

/**
 * Scripture Text Grid web view: the tab shell, per-user first-open overlay initialization, and the
 * View Options panel.
 *
 * Renders the header View Options icon button + popover wrapping the reusable
 * `ScriptureTextGridOptions` component, wired to the View Options data-layer helpers and persisted
 * through the per-user text-connection PDP setters. The grid body (the verse-cell row renderer) is
 * built separately; this file owns only the header and leaves the body placeholder below the seam.
 */
globalThis.webViewComponent = function ScriptureTextGridWebView({
  projectId,
  updateWebViewDefinition,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings, isLoadingLocalizedStrings] = useLocalizedStrings(ALL_STRING_KEYS);

  // Follow whichever project is driving the active Scripture reference (the editor's project) when
  // opened without an explicit project — e.g. from the default layout, whose tab carries no
  // projectId. An explicit `projectId` (e.g. a direct openWebView) takes precedence.
  const [, , , , activeEditorProjectId] = useWebViewScrollGroupScrRef();
  const effectiveProjectId = projectId ?? activeEditorProjectId;

  const { sources, textConnectionPdp } = useTextCollectionSources(effectiveProjectId);

  // Latest sources for the async callbacks below — reading the render-closure `sources` would let a
  // rapid second toggle (or a toggle mid-install) compute its next-state from a pre-write snapshot
  // and clobber the first write. A ref always hands the callbacks the freshest snapshot.
  const sourcesRef = useRef(sources);
  sourcesRef.current = sources;

  const [viewMode, setViewMode] = useState<ScriptureTextGridViewMode>('verse');
  // Resources whose install is in flight after a Get Resources pick (keyed by id so duplicate
  // display names can't drop each other's row); their names drive the "Installing {name}…" rows.
  const [installing, setInstalling] = useState<Array<{ id: string; name: string }>>([]);

  const { top, bottom } = useMemo(
    () => (sources ? getViewOptionsTexts(sources) : { top: [], bottom: [] }),
    [sources],
  );

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

  // Pick the tab icon variant from the web view's themed foreground brightness (light text ⇒ dark
  // theme). getComputedStyle serializes colors to `rgb(...)`, so parsing is reliable; the observer
  // re-checks when the theme toggles the root class/attribute.
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
    const recompute = () => {
      const channels = getComputedStyle(document.body).color.match(/\d+/g);
      if (!channels || channels.length < 3) return;
      const [r, g, b] = channels.map(Number);
      setIsDarkTheme(0.299 * r + 0.587 * g + 0.114 * b > 140);
    };
    recompute();
    const observer = new MutationObserver(recompute);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    updateWebViewDefinition({ iconUrl: isDarkTheme ? DARK_THEME_ICON_URL : LIGHT_THEME_ICON_URL });
  }, [isDarkTheme, updateWebViewDefinition]);

  const handleCheckedChange = useCallback(
    (resourceId: string, checked: boolean) => {
      const { current } = sourcesRef;
      if (!current || !textConnectionPdp) return;
      const next = setUserDisplay(resourceId, checked, current);
      if (next.userReferenced !== current.userReferenced) {
        textConnectionPdp
          .setUserReferencedProjectsAndResources(next.userReferenced)
          .catch((e) => logger.warn(`Failed to persist user list: ${getErrorMessage(e)}`));
      }
      if (next.overlay !== current.overlay) {
        textConnectionPdp
          .setShownByDefaultOverlay(next.overlay)
          .catch((e) => logger.warn(`Failed to persist overlay: ${getErrorMessage(e)}`));
      }
    },
    [textConnectionPdp],
  );

  const handleRemoveFromList = useCallback(
    (resourceId: string) => {
      const { current } = sourcesRef;
      if (!current || !textConnectionPdp) return;
      const next = removeFromUserResources(resourceId, current.userReferenced);
      if (next !== current.userReferenced) {
        textConnectionPdp
          .setUserReferencedProjectsAndResources(next)
          .catch((e) => logger.warn(`Failed to persist removal: ${getErrorMessage(e)}`));
      }
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
      const next = addToUserResources(reference, current.userReferenced);
      if (next !== current.userReferenced) {
        textConnectionPdp
          .setUserReferencedProjectsAndResources(next)
          .catch((e) => logger.warn(`Failed to persist added resource: ${getErrorMessage(e)}`));
      }
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
    <div data-testid="scripture-text-grid" className="tw:flex tw:h-screen tw:flex-col">
      <div className="tw:flex tw:items-center tw:justify-end tw:border-b tw:p-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={localizedStrings[VIEW_OPTIONS_BUTTON_KEY]}
            >
              <Settings2 className="tw:h-4 tw:w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="tw:max-h-[70vh] tw:overflow-y-auto">
            <ScriptureTextGridOptions
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              top={top}
              bottom={bottom}
              installingResourceNames={installingResourceNames}
              onCheckedChange={handleCheckedChange}
              onRemoveFromList={handleRemoveFromList}
              onGetResources={showResourcePicker}
              localizedStrings={localizedStrings}
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* The grid body (verse-cell rows) renders below this header seam; this file owns the header. */}
      <div className="tw:flex-1" />
    </div>
  );
};
