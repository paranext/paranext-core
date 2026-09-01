import { EMPTY_USJ } from '@eten-tech-foundation/scripture-utilities';
import type { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  useDataProvider,
  useLocalizedStrings,
  useProjectData,
  useProjectDataProvider,
  useProjectSetting,
  useSetting,
} from '@papi/frontend/react';
import { useTabIconSelection, type TabIconUrls } from 'platform-bible-react';
import {
  formatReplacementString,
  getErrorMessage,
  isPlatformError,
  ResourceType,
} from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ResourceReferenceList } from 'platform-scripture';
import { useOpenFindShortcut } from './use-open-find-shortcut.hook';
import { useEffectiveResourceReferenceList } from './use-effective-resource-reference-list.hook';
import { canPublishResourcePanelProjectIds } from './resource-panel-readiness.utils';
import { useDblResourceCatalog } from './use-dbl-resource-catalog.hook';
import { useInstallDblResource } from './use-install-dbl-resource.hook';
import { resolveResourcePanelStringKeys } from './resource-panel-strings.utils';
import {
  filterResourcesByType,
  resolveSelectedResource,
  ResourceTextPanel,
  RESOURCE_PANEL_STRING_KEYS,
} from './resource-text-panel.component';
import { usePublishNavigableProjectIds } from './use-publish-navigable-project-ids.hook';

const DEFAULT_TEXT_DIRECTION = 'ltr';

const BIBLE_TEXTS_ICON_URLS: TabIconUrls = {
  lightDefault: 'papi-extension://platformScriptureEditor/assets/book-open.svg',
  dark: 'papi-extension://platformScriptureEditor/assets/book-open-dark.svg',
  lightSelected: 'papi-extension://platformScriptureEditor/assets/book-open-selected.svg',
  lightUnselected: 'papi-extension://platformScriptureEditor/assets/book-open-unselected.svg',
};

const COMMENTARIES_ICON_URLS: TabIconUrls = {
  lightDefault: 'papi-extension://platformScriptureEditor/assets/file-text.svg',
  dark: 'papi-extension://platformScriptureEditor/assets/file-text-dark.svg',
  lightSelected: 'papi-extension://platformScriptureEditor/assets/file-text-selected.svg',
  lightUnselected: 'papi-extension://platformScriptureEditor/assets/file-text-unselected.svg',
};

/**
 * Thin data-loader for the Bible texts / Commentaries panel. It wires PAPI to the props of
 * `ResourceTextPanel`, which owns the orchestration. Raw data is passed as props; writes and
 * sub-UIs are passed as callbacks.
 */
globalThis.webViewComponent = function ResourceTextPanelWebView({
  id: webViewId,
  projectId,
  updateWebViewDefinition,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(RESOURCE_PANEL_STRING_KEYS);

  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();

  // #region Web view state

  // resourceType is injected by the web view provider at open time
  const [resourceType] = useWebViewState<ResourceType>('resourceType', 'ScriptureResource');
  const [selectedResourceId, setSelectedResourceId] = useWebViewState<string | undefined>(
    'selectedResourceId',
    undefined,
  );

  // #endregion

  // #region Tab icon (Simple mode only — Power mode keeps this tab text-only, as today)

  const [interfaceModePossiblyError] = useSetting('platform.interfaceMode', 'simple');
  const isPowerMode = useMemo(() => {
    if (isPlatformError(interfaceModePossiblyError)) {
      logger.warn(`Error getting interface mode: ${getErrorMessage(interfaceModePossiblyError)}`);
      return false;
    }
    return interfaceModePossiblyError === 'power';
  }, [interfaceModePossiblyError]);

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

  const tabIconUrls =
    resourceType === 'ScriptureResource' ? BIBLE_TEXTS_ICON_URLS : COMMENTARIES_ICON_URLS;
  const tabIconUrl = useTabIconSelection(isDarkTheme, tabIconUrls);
  useEffect(() => {
    // Power mode: no tab icon, exactly as today. Still clear a previously-set iconUrl explicitly
    // (rather than skipping the call) — updateWebViewDefinition's merge only touches keys present in
    // the update object, so a present-but-undefined iconUrl writes through and removes a value a
    // prior Simple-mode run of this same effect may have set, while omitting the key entirely would
    // leave it stuck showing the last Simple-mode icon after switching to Power mode at runtime.
    if (isPowerMode) {
      updateWebViewDefinition({ iconUrl: undefined });
      return;
    }
    updateWebViewDefinition({ iconUrl: tabIconUrl });
  }, [isPowerMode, tabIconUrl, updateWebViewDefinition]);

  // #endregion

  // #region Data sources

  const effectiveResourcesState = useEffectiveResourceReferenceList(
    projectId,
    'platformScripture.referencedProjectsAndResources',
  );

  const textConnectionsProvider = useProjectDataProvider(
    'platformScripture.textConnectionSettings',
    projectId,
  );

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');
  const { dblResources, isCatalogReady, hasCatalogError, refetchCatalog } = useDblResourceCatalog();
  const getUserResourceTexts = useCallback(
    async () => textConnectionsProvider?.getUserReferencedProjectsAndResources(),
    [textConnectionsProvider],
  );
  const setUserResourceTexts = useCallback(
    async (resources: ResourceReferenceList) => {
      await textConnectionsProvider?.setUserReferencedProjectsAndResources(resources);
    },
    [textConnectionsProvider],
  );

  // Re-resolve the cached resource list once an install completes so the resource flips to
  // installed and renders; the install itself lives in the shared hook. Returns a no-op until the
  // provider resolves — its identity change then re-fires the panel's auto-install effect for the
  // real install.
  const installResource = useInstallDblResource(
    dblResourcesProvider,
    'resource text panel',
    refetchCatalog,
  );

  // #endregion

  // #region The resource on screen

  // Resolved here as well as inside the panel because these four PAPI-side concerns all need the
  // DISPLAYED resource, and the panel cannot reach any of them: the chapter subscription and text
  // direction below, the tab title, Ctrl+F, and publishing navigable project ids. Both sides call
  // the same pure pair, so there is one implementation rather than two derivations to keep in step.
  const { resourceProjectId, resourceShortName } = useMemo(() => {
    const effectiveResources =
      effectiveResourcesState.status === 'ready' ? effectiveResourcesState.list : undefined;
    const filtered = filterResourcesByType(effectiveResources?.items, dblResources, resourceType);
    return resolveSelectedResource(filtered, selectedResourceId, dblResources);
  }, [effectiveResourcesState, dblResources, resourceType, selectedResourceId]);

  // Ctrl+F opens Find for the displayed resource.
  useOpenFindShortcut(webViewId, resourceProjectId);

  // This web view's definition `projectId` is the container project whose reference list is shown,
  // so the displayed resource is invisible to global navigation UI unless declared here.
  usePublishNavigableProjectIds(
    useWebViewState,
    resourceProjectId ? [resourceProjectId] : [],
    canPublishResourcePanelProjectIds(effectiveResourcesState, isCatalogReady),
  );

  // #endregion

  // #region Dynamic title

  const { titleKey, titleWithResourceKey } = resolveResourcePanelStringKeys(resourceType);

  useEffect(() => {
    const baseTitle = localizedStrings[titleKey];
    if (!baseTitle) return;
    if (resourceShortName) {
      const resolvedTitle = formatReplacementString(localizedStrings[titleWithResourceKey], {
        textName: resourceShortName,
      });
      updateWebViewDefinition({
        title: resolvedTitle,
        tooltip: isPowerMode ? undefined : resolvedTitle,
      });
    } else {
      updateWebViewDefinition({ title: baseTitle, tooltip: isPowerMode ? undefined : baseTitle });
    }
  }, [
    resourceShortName,
    localizedStrings,
    titleKey,
    titleWithResourceKey,
    updateWebViewDefinition,
    isPowerMode,
  ]);

  // #endregion

  // #region Chapter USJ and text direction

  // Chapter view: the whole chapter goes to Editorial, which navigates to scrRef. Deliberately NOT
  // sliced by scripture-text-grid/verse-display.utils — slicing would blank the verse-0 front
  // matter (intros, Psalm superscriptions) this view exists to show. Single-verse surfaces resolve
  // verse 0 to verse 1; whole-chapter surfaces like this one must not (see
  // `adr-single-verse-surfaces-resolve-verse-zero-to-one`).
  const [usjPossiblyError, , isUsjLoading] = useProjectData(
    'platformScripture.USJ_Chapter',
    resourceProjectId,
  ).ChapterUSJ(
    useMemo(
      () => ({
        book: scrRef.book,
        chapterNum: scrRef.chapterNum,
        verseNum: 1,
        versificationStr: scrRef.versificationStr,
      }),
      [scrRef.book, scrRef.chapterNum, scrRef.versificationStr],
    ),
    EMPTY_USJ,
  );

  const [textDirectionPossiblyError] = useProjectSetting(
    resourceProjectId,
    'platform.textDirection',
    DEFAULT_TEXT_DIRECTION,
  );
  const textDirection = useMemo(() => {
    if (isPlatformError(textDirectionPossiblyError)) {
      logger.warn(
        `Error getting text direction setting: ${getErrorMessage(textDirectionPossiblyError)}`,
      );
      return DEFAULT_TEXT_DIRECTION;
    }
    return textDirectionPossiblyError || DEFAULT_TEXT_DIRECTION;
  }, [textDirectionPossiblyError]);

  // #endregion

  // #region Operation callbacks

  const showResourcePicker = useCallback(
    (selectedResourceIds: string[]) =>
      papi.dialogs.showDialog('platform.resourcePicker', {
        resourceType,
        selectedResourceIds,
        isModal: true,
      }),
    [resourceType],
  );

  // #endregion

  return (
    <ResourceTextPanel
      localizedStrings={localizedStrings}
      hasProject={projectId !== undefined}
      resourceType={resourceType}
      effectiveResourcesState={effectiveResourcesState}
      dblResources={dblResources}
      isCatalogReady={isCatalogReady}
      hasCatalogError={hasCatalogError}
      onRetryCatalog={refetchCatalog}
      scrRef={scrRef}
      onScrRefChange={setScrRef}
      selectedResourceId={selectedResourceId}
      onSelectResource={setSelectedResourceId}
      usjPossiblyError={usjPossiblyError}
      isUsjLoading={isUsjLoading}
      textDirection={textDirection}
      installResource={installResource}
      getUserResourceTexts={getUserResourceTexts}
      setUserResourceTexts={setUserResourceTexts}
      showResourcePicker={showResourcePicker}
      logger={logger}
    />
  );
};
