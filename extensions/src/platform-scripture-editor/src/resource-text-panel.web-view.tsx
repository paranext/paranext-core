import { EMPTY_USJ } from '@eten-tech-foundation/scripture-utilities';
import type { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  useDataProvider,
  useDialogCallback,
  useLocalizedStrings,
  useProjectData,
  useProjectDataProvider,
  useProjectSetting,
  useSetting,
} from '@papi/frontend/react';
import { useTabIconSelection, type TabIconUrls } from 'platform-bible-react';
import {
  DblResourceData,
  formatReplacementString,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
  ResourceType,
} from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ResourceReferenceList } from 'platform-scripture';
import { useOpenFindShortcut } from './use-open-find-shortcut.hook';
import { useEffectiveResourceReferenceList } from './use-effective-resource-reference-list.hook';
import { useResourcePickerResources } from './use-resource-picker-resources.hook';
import type { PickerResource } from './downloaded-resources.utils';
import {
  canPublishResourcePanelProjectIds,
  getResourcePanelReadiness,
  type ResourcePanelReadiness,
} from './resource-panel-readiness.utils';
import { useDblResourceCatalog } from './use-dbl-resource-catalog.hook';
import { useCommentaryMarkerStyles } from './use-commentary-marker-styles.hook';
import { useDblResourceAutoInstall } from './use-dbl-resource-auto-install.hook';
import { useInstallDblResource } from './use-install-dbl-resource.hook';
import { useIsOnline } from './use-is-online.hook';
import {
  getResourceReferenceRowId,
  isDblResourceReference,
  isProjectReference,
} from './resource-reference.utils';
import { resolveResourceSelection } from './resource-selection.utils';
import { findCachedDblResource } from './scripture-text-grid/dbl-resource-lookup.utils';
import { resolveResourcePanelStringKeys } from './resource-panel-strings.utils';
import { selectTextConnection } from './select-dbl-resource';
import { ResourceTextPanel } from './resource-text-panel.component';
import { RESOURCE_PANEL_STRING_KEYS } from './resource-text-panel.const';
import { usePublishNavigableProjectIds } from './use-publish-navigable-project-ids.hook';

const DEFAULT_TEXT_DIRECTION = 'ltr';

// Built once at module scope, not inline in the `useLocalizedStrings` call. The hook's key array
// must keep a stable identity across renders — a fresh array every render re-runs its lookup — and
// `RESOURCE_PANEL_STRING_KEYS` is a frozen readonly tuple, so it is spread into a mutable
// `LocalizeKey[]` exactly once here.
const ALL_STRING_KEYS: LocalizeKey[] = [...RESOURCE_PANEL_STRING_KEYS];

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

// This panel offers locally-downloaded resources alongside the ones already in the text
// collection, so its rows are the union of both.
const RESOURCE_PICKER_OPTIONS = { includeDownloaded: true } as const;

/**
 * Thin data-loader for the Bible Texts / Commentaries panel. It wires PAPI to the props of
 * `ResourceTextPanel`, which owns the render and the content-state decisions.
 *
 * The selection is resolved HERE rather than in the component because the resolved row's project id
 * keys the `ChapterUSJ` subscription below, whose result is then handed back down to the component
 * as `usjPossiblyError`. The component takes the resolved row as a prop and never re-derives it, so
 * there is exactly one answer to "which resource is on screen".
 */
globalThis.webViewComponent = function ResourceTextPanelWebView({
  id: webViewId,
  projectId,
  updateWebViewDefinition,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(ALL_STRING_KEYS);

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
  const [pickerResources, arePickerResourcesLoading] = useResourcePickerResources(
    projectId,
    RESOURCE_PICKER_OPTIONS,
    dblResources,
    isCatalogReady || hasCatalogError,
  );
  const getUserResourceTexts = useCallback(
    async () => textConnectionsProvider?.getUserReferencedProjectsAndResources(),
    [textConnectionsProvider],
  );
  const setUserResourceTexts = useCallback(
    async (resources: ResourceReferenceList) =>
      textConnectionsProvider?.setUserReferencedProjectsAndResources(resources),
    [textConnectionsProvider],
  );

  // Re-resolve the cached resource list once an install completes so the resource flips to
  // installed and renders; the install itself lives in the shared hook. Returns a no-op until the
  // provider resolves — its identity change then re-fires the auto-install effect for the real
  // install.
  const installResource = useInstallDblResource(
    dblResourcesProvider,
    'resource text panel',
    refetchCatalog,
  );

  // #endregion

  // #region Filter list based on resourceType

  const filteredResources = useMemo<PickerResource[]>(
    () => (pickerResources ?? []).filter((row) => row.type === resourceType),
    [pickerResources, resourceType],
  );

  // Readiness is decided from whether the sources have ARRIVED, never from whether the filtered
  // result came out empty — see `getResourcePanelReadiness`.
  const listReadiness = getResourcePanelReadiness({
    listState: effectiveResourcesState,
    isCatalogReady,
    hasCatalogError,
    matchingCount: filteredResources.length,
  });

  // `getResourcePanelReadiness` answers "is anything configured?" from the referenced list alone.
  // This panel also offers locally-downloaded resources that are not referenced yet, so an empty
  // referenced list is only genuinely empty once those rows have arrived and none of them matched.
  let readiness: ResourcePanelReadiness = listReadiness;
  if (listReadiness === 'empty') {
    if (arePickerResourcesLoading) readiness = 'loading';
    else if (filteredResources.length > 0) readiness = 'configured';
  }

  // #endregion

  // #region Selection management

  // Holds the row id of a resource just selected from the picker while it propagates through the
  // reactive settings chain and into filteredResources. Written from the reference
  // `selectTextConnection` actually stored, so it is comparable to the row ids of the list.
  const [pendingResourceId, setPendingResourceId] = useState<string | undefined>(undefined);

  // Committing a pick, holding still while one is in flight, migrating a legacy bare id and
  // falling back when the selection leaves the list are one decision, not four effects that can
  // disagree across renders. `resolveResourceSelection` makes it, and is tested directly.
  const selection = resolveResourceSelection(
    filteredResources,
    selectedResourceId,
    pendingResourceId,
  );
  const selectedRef = selection.selectedRow;

  useEffect(() => {
    if (selection.nextSelectedResourceId !== undefined)
      setSelectedResourceId(selection.nextSelectedResourceId);
    if (selection.shouldClearPending) setPendingResourceId(undefined);
  }, [selection.nextSelectedResourceId, selection.shouldClearPending, setSelectedResourceId]);

  const [isSelecting, setIsSelecting] = useState(false);

  // resourceProjectId is the search source passed to Find: the project of the resource this panel
  // is displaying, NOT the panel's own `projectId` prop (that is the container project whose
  // reference list is shown). `PickerResource` resolves it for every reference kind.
  const resourceProjectId = selectedRef?.projectId;

  // The catalog entry behind the selection, for the dynamic title's display name.
  const dblMatch =
    selectedRef && isDblResourceReference(selectedRef.reference)
      ? findCachedDblResource(selectedRef.reference, dblResources)
      : undefined;

  // Auto-install a selected DBL resource matched in the catalog but not installed locally yet
  // (shared with the model-text panel); without it the panel spins forever. Skipped while a manual
  // pick is in flight (it installs the resource itself).
  const dblEntryUidToInstall = dblMatch && !dblMatch.installed ? dblMatch.dblEntryUid : undefined;
  const { isInstalling, installFailed, retryInstall, markInstallFailed } =
    useDblResourceAutoInstall(dblEntryUidToInstall, installResource, isSelecting);

  // Only used to add a "check your connection" hint to the install-failed message when offline.
  const isOnline = useIsOnline();

  // Load PT9-derived marker styles when the displayed resource is a supported commentary.
  // Keyed on the resource's project id (not the user's projectId prop) since the resource is what
  // gets rendered in this iframe.
  useCommentaryMarkerStyles(resourceProjectId);

  // Ctrl+F opens Find for the displayed resource.
  useOpenFindShortcut(webViewId, resourceProjectId);

  // This web view's definition `projectId` is the container project whose reference list is shown,
  // so the displayed resource is invisible to global navigation UI unless declared here.
  usePublishNavigableProjectIds(
    useWebViewState,
    resourceProjectId ? [resourceProjectId] : [],
    canPublishResourcePanelProjectIds(
      effectiveResourcesState,
      isCatalogReady,
      pickerResources !== undefined,
    ),
  );

  // #endregion

  // #region Dynamic title

  let resourceShortName: string | undefined;
  if (selectedRef) {
    const { reference } = selectedRef;
    if (isDblResourceReference(reference) && dblMatch?.installed) {
      resourceShortName = dblMatch.displayName;
    } else if (isProjectReference(reference)) {
      resourceShortName = reference.name;
    }
  }

  // One resource type, one matched set of strings. See `resolveResourcePanelStringKeys`. Only the
  // title keys are read here; the panel resolves the rest for itself from the same helper.
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

  // #region USJ Fetch

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

  // #endregion

  // #region Text direction

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

  // #region Resource picker dialog

  // The IDs the Resource Picker shows as already INCLUDED. Rows sourced from `downloaded` are
  // installed locally but not in the text collection, so they belong in the picker's INSTALLED
  // section instead. Drawn from every picker row rather than the type-filtered ones so a resource
  // of another type that is in the text collection (a commentary alongside Bible texts) is not
  // re-offered as INSTALLED. That is also why the pick belongs here rather than in the panel: the
  // panel sees only its type-filtered rows.
  const currentFilteredDblIds = useMemo(() => {
    return (pickerResources ?? []).flatMap((r) => {
      if (r.source === 'downloaded') return [];
      const { reference } = r;
      if (isDblResourceReference(reference) || isProjectReference(reference)) return [reference.id];
      return [];
    });
  }, [pickerResources]);

  const handleResourceSelect = useCallback(
    async (resource: DblResourceData) => {
      setIsSelecting(true);
      // A user-initiated pick is a fresh attempt: clear any prior auto-install failure.
      retryInstall();
      try {
        await selectTextConnection(
          resource,
          getUserResourceTexts,
          setUserResourceTexts,
          async (dblEntryUid: string) => {
            try {
              await installResource(dblEntryUid);
            } catch (e) {
              // Record the failure so that once the pick finishes and the auto-install effect
              // re-enables, its failed-uid guard suppresses a duplicate install attempt.
              //
              // TODO(PT-4508): This does NOT surface the failure on screen. `selectTextConnection`
              // swallows the rethrow below and returns without persisting, so the selection never
              // changes, `dblEntryUidToInstall` stays `undefined`, and `installFailed` never becomes
              // true — a failed pick is silent until the user tries again.
              markInstallFailed(dblEntryUid);
              throw e;
            }
          },
          (writtenReference) => setPendingResourceId(getResourceReferenceRowId(writtenReference)),
        );
      } finally {
        setIsSelecting(false);
      }
    },
    [getUserResourceTexts, setUserResourceTexts, installResource, retryInstall, markInstallFailed],
  );

  // `useDialogCallback` is what keeps a second activation from destroying the picker the user is
  // working in: the dialog service REPLACES rather than queues, rejecting the open overlay with
  // ABORTED, and the hook's default `maximumOpenDialogs: 1` drops the second request instead. It
  // also holds the mounted guard, so a picker resolving after this tab closes cannot write the
  // user's reference list. Both are the hook's, not this module's — do not hand-roll them.
  const showResourcePicker = useDialogCallback(
    'platform.resourcePicker',
    useMemo(
      () => ({ resourceType, selectedResourceIds: currentFilteredDblIds, isModal: true }),
      [resourceType, currentFilteredDblIds],
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

  // #endregion

  return (
    <ResourceTextPanel
      localizedStrings={localizedStrings}
      hasProject={projectId !== undefined}
      resourceType={resourceType}
      filteredResources={filteredResources}
      selectedRef={selectedRef}
      readiness={readiness}
      dblResources={dblResources}
      onRetryCatalog={refetchCatalog}
      scrRef={scrRef}
      onScrRefChange={setScrRef}
      onSelectResource={setSelectedResourceId}
      usjPossiblyError={usjPossiblyError}
      isUsjLoading={isUsjLoading}
      textDirection={textDirection}
      isSelecting={isSelecting}
      isInstalling={isInstalling}
      installFailed={installFailed}
      retryInstall={retryInstall}
      isOnline={isOnline}
      onShowResourcePicker={showResourcePicker}
      logger={logger}
    />
  );
};
