import type { DialogTypes, WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import {
  useDataProvider,
  useDialogCallback,
  useLocalizedStrings,
  useProjectDataProvider,
  useProjectSetting,
  useScrollGroupScrRef,
} from '@papi/frontend/react';
import {
  DblResourceData,
  formatReplacementString,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
  ResourceType,
} from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ResourceReferenceList } from 'platform-scripture';
import { useChapterUsjWithCopyLimit } from './copy-limit/use-chapter-usj-with-copy-limit.hook';
import { useOpenFindShortcut } from './use-open-find-shortcut.hook';
import { useEffectiveResourceReferenceList } from './use-effective-resource-reference-list.hook';
import { useResourcePickerResources } from './use-resource-picker-resources.hook';
import { getPickerDialogSelection, type PickerResource } from './downloaded-resources.utils';
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
import { useIsPowerMode } from './use-is-power-mode.hook';
import {
  getResourceReferenceRowId,
  isDblResourceReference,
  isProjectReference,
} from './resource-reference.utils';
import {
  findSelectedRow,
  isTeamPickerResource,
  matchesSelectedResourceId,
  resolveResourceSelection,
  type ResourceSelectionResolution,
} from './resource-selection.utils';
import { findCachedDblResource } from './scripture-text-grid/dbl-resource-lookup.utils';
import { resolveLocalizedString } from './scripture-text-grid/view-options-notice.utils';
import { resolveResourcePanelStringKeys } from './resource-panel-strings.utils';
import { selectTextConnection } from './select-dbl-resource';
import {
  removeFromUserListAndNotify,
  RESOURCE_REMOVED_FROM_USER_LIST_KEY,
} from './scripture-text-grid-persistence.utils';
import { ResourceTextPanel } from './resource-text-panel.component';
import { RESOURCE_PANEL_STRING_KEYS } from './resource-text-panel.const';
import { usePublishNavigableProjectIds } from './use-publish-navigable-project-ids.hook';
import { COPYRIGHT_NOTICE_STRING_KEYS } from './copyright-notice/copyright-notice.const';
import { ProjectCopyrightNotice } from './copyright-notice/project-copyright-notice.component';

const DEFAULT_TEXT_DIRECTION = 'ltr';

// Built once at module scope, not inline in the `useLocalizedStrings` call. The hook's key array
// must keep a stable identity across renders — a fresh array every render re-runs its lookup — and
// `RESOURCE_PANEL_STRING_KEYS` is a frozen readonly tuple, so it is spread into a mutable
// `LocalizeKey[]` exactly once here.
const ALL_STRING_KEYS: LocalizeKey[] = [
  ...RESOURCE_PANEL_STRING_KEYS,
  ...COPYRIGHT_NOTICE_STRING_KEYS,
  RESOURCE_REMOVED_FROM_USER_LIST_KEY,
];

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
  scrollGroupScrRef,
  updateWebViewDefinition,
  useWebViewState,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(ALL_STRING_KEYS);

  // #region Web view state

  // resourceType is injected by the web view provider at open time
  const [resourceType] = useWebViewState<ResourceType>('resourceType', 'ScriptureResource');
  const [selectedResourceId, setSelectedResourceId] = useWebViewState<string | undefined>(
    'selectedResourceId',
    undefined,
  );
  // The resource the user last chose themselves, so a selection the panel fell back to can be told
  // apart from one the user picked. See `resolveResourceSelection` for why a fallback must not
  // outlive a configured resource arriving. Written also by `buildResourceTextPanelState`.
  const [userPickedResourceId, setUserPickedResourceId] = useWebViewState<string | undefined>(
    'userPickedResourceId',
    undefined,
  );

  // #endregion

  // #region Interface mode

  // Undefined until the setting loads; the tab icon and tooltip treat that as Simple.
  const isPowerMode = useIsPowerMode();
  // The resource picker waits for a confirmed Simple before it shows team resources or offers
  // removing.
  const isSimpleMode = isPowerMode === false;

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
  const { dblResources, isCatalogReady, hasCatalogError, isAwaitingDblCatalog, refetchCatalog } =
    useDblResourceCatalog();
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
  // A saved DBL reference has no row while the catalog is down, since only the catalog resolves it.
  const hasRowForSavedSelection =
    selectedResourceId === undefined ||
    filteredResources.some((row) => matchesSelectedResourceId(row, selectedResourceId));
  if (!projectId) {
    // No project, so no referenced list to wait for: the rows are the downloaded resources alone.
    if (arePickerResourcesLoading) readiness = 'loading';
    else if (hasCatalogError && !hasRowForSavedSelection) readiness = 'catalogError';
    else readiness = filteredResources.length > 0 ? 'configured' : 'empty';
  } else if (listReadiness === 'empty' || listReadiness === 'catalogError') {
    // Neither an empty referenced list nor a failed catalog may hide the downloaded extras: they are
    // read straight off disk, so they can be correct even while the catalog fetch is down. A failed
    // catalog still shows its error view when the saved selection is not among them, so the panel
    // never swaps the user's choice for some other downloaded resource without saying so.
    if (arePickerResourcesLoading) readiness = 'loading';
    else if (hasCatalogError && !hasRowForSavedSelection) readiness = 'catalogError';
    else if (filteredResources.length > 0) readiness = 'configured';
  }

  // #endregion

  // #region Selection management

  // Holds the row id of a resource just selected from the picker while it propagates through the
  // reactive settings chain and into filteredResources. Written from the reference
  // `selectTextConnection` actually stored, so it is comparable to the row ids of the list.
  //
  // TODO(PT-4509): The dropdown is interactive during that window — `isSelecting` goes false in its
  // `finally`, removing the LoadingView that covered the selector, before the written reference
  // reaches `filteredResources` — and `resolveResourceSelection`'s pending branch ignores
  // `selectedResourceId`. So a user who changes their mind in that window watches the panel jump to
  // the resource they abandoned, with nothing indicating their own earlier pick won.
  const [pendingResourceId, setPendingResourceId] = useState<string | undefined>(undefined);

  // The downloaded fallback shown last. Kept in React state rather than web view state because a
  // fallback is never persisted; holding it keeps a newly installed resource from taking its place.
  const [heldFallbackRowId, setHeldFallbackRowId] = useState<string | undefined>(undefined);

  // Committing a pick, holding still while one is in flight, migrating a legacy bare id, falling
  // back when the selection leaves the list, and replacing a downloaded fallback once something
  // configured is displayable are one decision, not separate effects that can disagree across
  // renders. `resolveResourceSelection` makes it, and is tested directly.
  //
  // Resolved HERE and handed to the panel as `selectedRef`, rather than resolved by the panel and
  // reported back up: `resourceProjectId` below keys the `ChapterUSJ` subscription that produces
  // the `usjPossiblyError` this passes DOWN to the panel, so a callback would close a cycle. That
  // constraint is what fixes the direction of the whole boundary, and it is why there is exactly
  // one answer to "which resource is on screen" rather than two derivations to keep in step.
  //
  // With no project open the panel shows only a resource it was asked for — one opened from Home —
  // and never picks one by itself: there is no list of the user's texts to pick from, so a fallback
  // would put an arbitrary download on screen instead of "open a project".
  const selection: ResourceSelectionResolution = projectId
    ? resolveResourceSelection(filteredResources, {
        selectedResourceId,
        userPickedResourceId,
        pendingResourceId,
        heldFallbackRowId,
        isListComplete:
          effectiveResourcesState.status === 'ready' && !effectiveResourcesState.isUserLayerMissing,
      })
    : {
        nextSelectedResourceId: undefined,
        nextUserPickedResourceId: undefined,
        shouldClearPending: false,
        selectedRow: findSelectedRow(filteredResources, selectedResourceId),
        shownFallbackRowId: undefined,
      };
  // Behind the catalog-error view nothing is on screen, so the first-row fallback must not keep a
  // chapter subscription open or become what Ctrl+F searches.
  const selectedRef = readiness === 'catalogError' ? undefined : selection.selectedRow;

  // Falling back to another row while the catalog is down would overwrite a saved DBL selection
  // that only lacks a row until the catalog returns. Committing a pick and migrating a legacy bare
  // id still go through.
  const isFallbackWhileCatalogFailed =
    hasCatalogError && pendingResourceId === undefined && !hasRowForSavedSelection;
  const nextSelectedResourceId = isFallbackWhileCatalogFailed
    ? undefined
    : selection.nextSelectedResourceId;
  const { nextUserPickedResourceId, shownFallbackRowId } = selection;

  // The user's pick is written before the selection, so no render sees the new selection without
  // it and takes it for a fallback (see `handleSelectResourceFromList`).
  useEffect(() => {
    if (nextUserPickedResourceId !== undefined) setUserPickedResourceId(nextUserPickedResourceId);
    if (nextSelectedResourceId !== undefined) setSelectedResourceId(nextSelectedResourceId);
    if (selection.shouldClearPending) setPendingResourceId(undefined);
  }, [
    nextSelectedResourceId,
    nextUserPickedResourceId,
    selection.shouldClearPending,
    setSelectedResourceId,
    setUserPickedResourceId,
  ]);

  useEffect(() => {
    if (shownFallbackRowId !== undefined) setHeldFallbackRowId(shownFallbackRowId);
  }, [shownFallbackRowId]);

  // The pick is written before the selection so no render sees the user's pick taken for a
  // fallback. Each web view state key comes back as its own web view update, in the order it was
  // written, so the two setters are not applied together; keep the pick first.
  const handleSelectResourceFromList = useCallback(
    (resourceId: string) => {
      setUserPickedResourceId(resourceId);
      setSelectedResourceId(resourceId);
    },
    [setUserPickedResourceId, setSelectedResourceId],
  );

  const [isSelecting, setIsSelecting] = useState(false);

  // resourceProjectId is the search source passed to Find: the project of the resource this panel
  // is displaying, NOT the panel's own `projectId` prop (that is the container project whose
  // reference list is shown). `PickerResource` resolves it for every reference kind.
  const resourceProjectId = selectedRef?.projectId;

  // Follow the scroll group in the DISPLAYED RESOURCE's versification, not this panel's own
  // (container) project's. This web view's definition `projectId` is the container project (it
  // reads that project's reference list and text-connection settings), but it renders the selected
  // resource — so passing the resource's id as the conversion project makes `scrRef` come back
  // converted into the resource's versification and makes a verse click here stamp the resource as
  // the scroll group's source project (other web views then convert FROM it). We call
  // `useScrollGroupScrRef` directly (rather than the `useWebViewScrollGroupScrRef` prop) so we can
  // pass that resource id instead of this web view's own `projectId`; the `scrollGroupScrRef` prop
  // is kept live by the web-view host re-rendering the component on definition updates.
  // `undefined` until a resource with a local project resolves — no conversion, and there is
  // nothing to display yet anyway.
  //
  // This call must stay below the selection region: `resourceProjectId` is what it converts into.
  //
  // TODO(PT-4896): a project-reference row resolves to its project id even when that project is not
  // on this machine, so each verse change repeats a failing versification lookup.
  // TODO(PT-4898): on mount and on a resource switch the hook still returns the reference last shown
  // for the previous conversion project, costing one extra chapter fetch.
  const [scrRef, setScrRef] = useScrollGroupScrRef(
    scrollGroupScrRef,
    useCallback(
      (newScrollGroupScrRef) =>
        updateWebViewDefinition({ scrollGroupScrRef: newScrollGroupScrRef }),
      [updateWebViewDefinition],
    ),
    resourceProjectId,
  );

  // The catalog entry behind the selection, for the dynamic title's display name.
  const dblMatch =
    selectedRef && isDblResourceReference(selectedRef.reference)
      ? findCachedDblResource(selectedRef.reference, dblResources)
      : undefined;

  // Auto-install a selected DBL resource matched in the catalog but not installed locally yet
  // (shared with the model-text panel); without it the panel spins forever. Skipped while a manual
  // pick is in flight (it installs the resource itself).
  const dblEntryUidToInstall = dblMatch && !dblMatch.installed ? dblMatch.dblEntryUid : undefined;
  const {
    isInstalling,
    installFailed,
    installFailureReason,
    retryInstall,
    clearInstallFailure,
    markInstallFailed,
  } = useDblResourceAutoInstall(dblEntryUidToInstall, installResource, {
    skipAutoInstall: isSelecting,
    refreshResourceList: refetchCatalog,
  });

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
      // Rows resolved locally despite a failed catalog (the readiness override above) are an
      // answer; a failed catalog alone is not, and publishing then would wipe the saved list.
      isCatalogReady || readiness === 'configured',
      pickerResources !== undefined,
    ),
    // These panels are re-pointed by reloading them, which reuses the web view id, so the
    // published list must be scoped to the project it was built for.
    projectId,
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

  // #region USJ Fetch and copy limit

  // Chapter view: the whole chapter goes to Editorial, which navigates to scrRef. Deliberately NOT
  // sliced by scripture-text-grid/verse-display.utils — slicing would blank the verse-0 front
  // matter (intros, Psalm superscriptions) this view exists to show. Single-verse surfaces resolve
  // verse 0 to verse 1; whole-chapter surfaces like this one must not (see
  // `adr-single-verse-surfaces-resolve-verse-zero-to-one`).
  const { usjPossiblyError, isUsjLoading, copyLimit } = useChapterUsjWithCopyLimit(
    resourceProjectId,
    scrRef,
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

  // The IDs the Resource Picker shows as already selected: the team's, which it locks, and the
  // user's own, which it lets the user remove. Rows sourced from `downloaded` are installed locally
  // but in neither list, so they belong in the picker's INSTALLED section instead. Drawn from every
  // picker row rather than the type-filtered ones so a resource of another type in the user's list
  // (a commentary alongside Bible texts) is not re-offered as INSTALLED. That is also why the pick
  // belongs here rather than in the panel: the panel sees only its type-filtered rows.
  const pickerSelection = useMemo(() => {
    const rows = pickerResources ?? [];
    return getPickerDialogSelection(
      rows.filter(isTeamPickerResource).map((row) => row.reference),
      rows.filter((row) => row.source === 'user').map((row) => row.reference),
      dblResources,
    );
  }, [pickerResources, dblResources]);

  // What the user's list stores each removable resource under, as the picker showed it when it
  // opened. The rows can change while it is open (a catalog refetch empties them until it
  // reloads), and a removal must take off what the user saw.
  const listIdsAtPickerOpenRef = useRef<ReadonlyMap<string, string[]>>(new Map());

  // Leaves the resource installed; only the user's own list for this project changes, which the
  // Text Collection reads too. When it was the one on screen, the selection logic above keeps it
  // there while it is installed and falls back to the next resource once it leaves the list.
  const handleResourceRemove = useCallback(
    (resource: DblResourceData) =>
      removeFromUserListAndNotify(
        resource,
        listIdsAtPickerOpenRef.current.get(resource.dblEntryUid) ?? [],
        getUserResourceTexts,
        setUserResourceTexts,
        resolveLocalizedString(localizedStrings, RESOURCE_REMOVED_FROM_USER_LIST_KEY),
      ),
    [getUserResourceTexts, setUserResourceTexts, localizedStrings],
  );

  const handleResourceSelect = useCallback(
    async (resource: DblResourceData) => {
      setIsSelecting(true);
      // A user-initiated pick is a fresh attempt: clear any prior auto-install failure.
      clearInstallFailure();
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
    [
      getUserResourceTexts,
      setUserResourceTexts,
      installResource,
      clearInstallFailure,
      markInstallFailed,
    ],
  );

  // `useDialogCallback` is what keeps a second activation from destroying the picker the user is
  // working in: the dialog service REPLACES rather than queues, rejecting the open overlay with
  // ABORTED, and the hook's default `maximumOpenDialogs: 1` drops the second request instead. It
  // also holds the mounted guard, so a picker resolving after this tab closes cannot write the
  // user's reference list. Both are the hook's, not this module's — do not hand-roll them.
  const showResourcePicker = useDialogCallback(
    'platform.resourcePicker',
    useMemo(
      () => ({
        resourceType,
        selectedResourceIds: pickerSelection.selectedResourceIds,
        // Team resources exist only in Simple, so Power keeps the picker's single "Included"
        // section. With no project there is no list of the user's to remove anything from, and
        // until its settings provider arrives there is no way to write one.
        teamResourceIds: projectId && isSimpleMode ? pickerSelection.teamResourceIds : undefined,
        allowRemove: !!projectId && isSimpleMode && !!textConnectionsProvider,
        isModal: true,
      }),
      [resourceType, pickerSelection, projectId, isSimpleMode, textConnectionsProvider],
    ),
    useCallback(
      (result: DialogTypes['platform.resourcePicker']['responseType'] | undefined) => {
        if (!result) return;
        if (result.action === 'remove') {
          handleResourceRemove(result.resource).catch((e) =>
            logger.warn(`Could not report the resource removal: ${getErrorMessage(e)}`),
          );
          return;
        }
        handleResourceSelect(result.resource).catch((e) =>
          logger.error(`Resource selection failed: ${getErrorMessage(e)}`),
        );
      },
      [handleResourceSelect, handleResourceRemove],
    ),
  );

  // The picker is modal, so it cannot be opened again while open and replace the ids it is using.
  const openResourcePicker = useCallback(() => {
    listIdsAtPickerOpenRef.current = pickerSelection.listIdsByRemovableId;
    return showResourcePicker();
  }, [pickerSelection, showResourcePicker]);

  // #endregion

  return (
    <ResourceTextPanel
      localizedStrings={localizedStrings}
      hasProject={!!projectId}
      resourceType={resourceType}
      filteredResources={filteredResources}
      selectedRef={selectedRef}
      readiness={readiness}
      dblResources={dblResources}
      isCatalogUnavailable={isAwaitingDblCatalog}
      // Only Simple mode has team resources, so Power lists every row together. Undefined (still
      // loading) lists them together too, so a Power session never shows the grouping, even for a
      // frame.
      isGrouped={isSimpleMode}
      onRetryCatalog={refetchCatalog}
      scrRef={scrRef}
      onScrRefChange={setScrRef}
      onSelectResource={handleSelectResourceFromList}
      usjPossiblyError={usjPossiblyError}
      isUsjLoading={isUsjLoading}
      textDirection={textDirection}
      copyLimit={copyLimit}
      isSelecting={isSelecting}
      isInstalling={isInstalling}
      installFailed={installFailed}
      installFailureReason={installFailureReason}
      retryInstall={retryInstall}
      isOnline={isOnline}
      onShowResourcePicker={openResourcePicker}
      logger={logger}
      copyrightNotice={
        <ProjectCopyrightNotice
          projectId={resourceProjectId}
          localizedStrings={localizedStrings}
          useWebViewState={useWebViewState}
        />
      }
    />
  );
};
