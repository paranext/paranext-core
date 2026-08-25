import { Editorial, EditorOptions, EditorRef } from '@eten-tech-foundation/platform-editor';
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
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  useExtraValidMarkers,
  useTabIconSelection,
  type TabIconUrls,
  Spinner,
} from 'platform-bible-react';
import {
  DblResourceData,
  formatReplacementString,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
  ResourceType,
} from 'platform-bible-utils';
import { NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY } from 'platform-bible-utils/experimental';
import { Canon } from '@sillsdev/scripture';
import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  DblResourceReference,
  EffectiveResourceReference,
  ResourceReferenceList,
} from 'platform-scripture';
import { useOpenFindShortcut } from './use-open-find-shortcut.hook';
import { useEffectiveResourceReferenceList } from './use-effective-resource-reference-list.hook';
import { getResourcePanelReadiness } from './resource-panel-readiness.utils';
import { useDblResourceCatalog } from './use-dbl-resource-catalog.hook';
import { PanelReadinessView } from './panel-readiness-view.component';
import { useCommentaryMarkerStyles } from './use-commentary-marker-styles.hook';
import { useDblResourceAutoInstall } from './use-dbl-resource-auto-install.hook';
import { useInstallDblResource } from './use-install-dbl-resource.hook';
import { useIsOnline } from './use-is-online.hook';
import {
  isDblResourceReference,
  isProjectReference,
  getRefLabel,
} from './resource-reference.utils';
import { findCachedDblResource } from './scripture-text-grid/dbl-resource-lookup.utils';
import { ResourceBookNotAvailable } from './resource-book-not-available.component';
import { ResourceBlankChapter } from './resource-blank-chapter.component';
import { ResourceTextUnavailable } from './resource-text-unavailable.component';
import {
  isBlankChapterOnScreen,
  isMissingBookError,
  resolveResourceContentState,
} from './platform-scripture-editor.utils';
import {
  RESOURCE_PANEL_TYPED_STRING_KEYS,
  resolveResourcePanelStringKeys,
} from './resource-panel-strings.utils';
import { RetryableErrorView, LoadingView } from './panel-state-views.component';
import { selectTextConnection } from './select-dbl-resource';
import { resolveNavigableProjectIdsWrite } from './navigable-project-ids.utils';

const DEFAULT_TEXT_DIRECTION = 'ltr';

// The per-resource-type keys come from `RESOURCE_PANEL_TYPED_STRING_KEYS` rather than being listed
// again here. `useLocalizedStrings` seeds key-to-key defaults only for the keys in the array it is
// given, so a hand-maintained second list is a silent hole: add a field to `ResourcePanelStringKeys`,
// forget the array, and the render site reads `undefined` and announces an empty message.
const RESOURCE_PANEL_STRING_KEYS: LocalizeKey[] = [
  // Shared with the model text panel's blank-chapter branch. Distinct from the editable
  // `..._emptyChapter_message%`, which sits beside an "Add chapter number" action these read-only
  // panels must not offer. The missing-book wording is per resource type and comes from
  // `RESOURCE_PANEL_TYPED_STRING_KEYS` below; a blank chapter reads the same either way.
  '%webView_platformScriptureEditor_emptyChapter_messageResource%',
  '%webView_resourcePanel_noProject%',
  '%webView_resourcePanel_installing%',
  '%webView_resourcePanel_selecting%',
  '%webView_resourcePanel_installFailed%',
  '%webView_resourcePanel_installFailedOffline%',
  '%webView_resourcePanel_retry%',
  '%webView_resourcePanel_settingsUnavailable%',
  '%webView_resourcePanel_loading%',
  '%webView_resourcePanel_catalogUnavailable%',
  '%webView_resourcePanel_downloadResources%',
  '%webView_resourcePanel_textUnavailable%',
  ...RESOURCE_PANEL_TYPED_STRING_KEYS,
];

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

/** Returns the `id` field for reference types that have one, or `undefined` for others. */
function getRefId(ref: EffectiveResourceReference): string | undefined {
  if (isDblResourceReference(ref) || isProjectReference(ref)) {
    return ref.id;
  }
  return undefined;
}

type ResourceSelectorDropdownProps = {
  filteredResources: EffectiveResourceReference[];
  selectedRef: EffectiveResourceReference | undefined;
  dblResources: DblResourceData[];
  onSelectResource: (id: string) => void;
  onShowResourcePicker: () => void;
  downloadResourcesLabel: string;
};

function ResourceSelectorDropdown({
  filteredResources,
  selectedRef,
  dblResources,
  onSelectResource,
  onShowResourcePicker,
  downloadResourcesLabel,
}: ResourceSelectorDropdownProps) {
  return (
    <div className="tw:px-2 tw:py-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="tw:h-8 tw:w-full tw:justify-between tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap"
          >
            <span className="tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap">
              {selectedRef ? getRefLabel(selectedRef, dblResources) : ''}
            </span>
            <ChevronDown className="tw:ml-1 tw:h-4 tw:w-4 tw:shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="tw:w-72">
          {filteredResources.map((ref) => {
            const refId = getRefId(ref);
            return (
              <DropdownMenuCheckboxItem
                key={refId}
                checked={refId === (selectedRef ? getRefId(selectedRef) : undefined)}
                onCheckedChange={() => {
                  if (refId) onSelectResource(refId);
                }}
              >
                {getRefLabel(ref, dblResources)}
              </DropdownMenuCheckboxItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => onShowResourcePicker()}>
            {downloadResourcesLabel}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

globalThis.webViewComponent = function ResourceTextPanel({
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
  const effectiveResources =
    effectiveResourcesState.status === 'ready' ? effectiveResourcesState.list : undefined;

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

  const filteredResources = useMemo((): EffectiveResourceReference[] => {
    if (!effectiveResources) return [];
    return effectiveResources.items.filter((ref) => {
      if (isDblResourceReference(ref)) {
        return dblResources.find((r) => r.dblEntryUid === ref.id)?.type === resourceType;
      }
      if (isProjectReference(ref)) {
        // ProjectReferences only appear in the Bible Texts tab
        return resourceType === 'ScriptureResource';
      }
      return false;
    });
  }, [effectiveResources, dblResources, resourceType]);

  // Readiness is decided from whether the sources have ARRIVED, never from whether the filtered
  // result came out empty — see `getResourcePanelReadiness`.
  const readiness = getResourcePanelReadiness({
    listState: effectiveResourcesState,
    isCatalogReady,
    hasCatalogError,
    matchingCount: filteredResources.length,
  });

  // #endregion

  // #region Selection management

  // Holds the ID of a resource just selected from the picker while it propagates through the
  // reactive settings chain and into filteredResources. Prevents the auto-correct below from
  // resetting the selection before the new resource has arrived in the list.
  const [pendingResourceId, setPendingResourceId] = useState<string | undefined>(undefined);

  // Once the pending resource appears in filteredResources, commit it as the active selection.
  useEffect(() => {
    if (!pendingResourceId) return;
    const found = filteredResources.find((r) => getRefId(r) === pendingResourceId);
    if (found) {
      setSelectedResourceId(pendingResourceId);
      setPendingResourceId(undefined);
    }
  }, [filteredResources, pendingResourceId, setSelectedResourceId]);

  // Auto-correct selectedResourceId when the selected item leaves the filtered list.
  // Skipped while a pending selection is in-flight to avoid overriding it prematurely.
  useEffect(() => {
    if (filteredResources.length === 0) return;
    if (pendingResourceId) return;
    const currentId = filteredResources.find((r) => getRefId(r) === selectedResourceId);
    if (!currentId) setSelectedResourceId(getRefId(filteredResources[0]));
  }, [filteredResources, selectedResourceId, setSelectedResourceId, pendingResourceId]);

  const selectedRef =
    filteredResources.find((r) => getRefId(r) === selectedResourceId) ?? filteredResources[0];

  const [isSelecting, setIsSelecting] = useState(false);

  // resourceProjectId is the search source passed to Find: the project of the resource this panel
  // is displaying, NOT the panel's own `projectId` prop (that is the container project whose
  // reference list is shown).
  let resourceProjectId: string | undefined;
  let dblMatch: (typeof dblResources)[number] | undefined;

  if (isDblResourceReference(selectedRef)) {
    dblMatch = findCachedDblResource(selectedRef, dblResources);
    resourceProjectId = dblMatch?.installed ? dblMatch.projectId : undefined;
  } else if (isProjectReference(selectedRef)) {
    resourceProjectId = selectedRef.id;
  }

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

  // Declare the project this panel displays so global navigation UI can offer its books. This web
  // view's definition `projectId` is the container project whose reference list is shown, so nothing
  // reading open web view definitions can see the displayed resource otherwise. See
  // NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY.
  const [publishedNavigableProjectIds, setPublishedNavigableProjectIds] = useWebViewState<string[]>(
    NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
    [],
  );
  useEffect(() => {
    // Only publish once both sources have arrived. `resourceProjectId` is undefined until the
    // reference list is `ready` and the DBL catalog is ready, and that is indistinguishable from
    // "no resource is displayed" — publishing then would wipe a correct persisted list on remount.
    // A catalog error is also not readiness: the configured resource cannot be resolved, so its id
    // is unknown rather than absent, and `isCatalogReady` already excludes that case.
    if (effectiveResourcesState.status !== 'ready' || !isCatalogReady) return;
    const toPublish = resolveNavigableProjectIdsWrite(
      resourceProjectId ? [resourceProjectId] : [],
      publishedNavigableProjectIds,
    );
    if (toPublish) setPublishedNavigableProjectIds(toPublish);
    // Hidden case: intentionally handled by doing nothing special. This publishing is data-driven,
    // not geometry-driven, so the effect keeps running while this tab is inactive (rc-dock hides
    // panes with display:none but leaves them mounted) and the declared ids stay current. There is
    // nothing to defer and nothing to catch up on activation.
  }, [
    effectiveResourcesState,
    isCatalogReady,
    resourceProjectId,
    publishedNavigableProjectIds,
    setPublishedNavigableProjectIds,
  ]);

  // #endregion

  // #region Dynamic title

  let resourceShortName: string | undefined;
  if (isDblResourceReference(selectedRef) && dblMatch?.installed) {
    resourceShortName = dblMatch.displayName;
  } else if (isProjectReference(selectedRef)) {
    resourceShortName = selectedRef?.name;
  }

  // One resource type, one matched set of strings. See `resolveResourcePanelStringKeys`.
  const {
    titleKey,
    titleWithResourceKey,
    emptyStatePromptKey,
    bookNotAvailableKey,
    pickButtonKey,
  } = resolveResourcePanelStringKeys(resourceType);

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

  const usjFromPdp = !isPlatformError(usjPossiblyError) ? usjPossiblyError : undefined;

  // A chapter the resource HAS but with nothing in it. Gated on the load having finished because
  // `useProjectData`'s underlying `useData` hook doesn't reset to its default when the selector
  // (here, `scrRef`) changes — it keeps the previous chapter's USJ until the new subscription's
  // first update lands, and its default is `EMPTY_USJ`, which is itself blank. Without the gate the
  // panel would claim "empty" over a chapter that is still arriving, and again on first mount.
  //
  // Chapter 0 is front matter rather than a chapter; `isBlankChapterOnScreen` has that rationale.
  const isBlankChapter = useMemo(
    () => !isUsjLoading && isBlankChapterOnScreen(usjFromPdp, scrRef.chapterNum),
    [usjFromPdp, isUsjLoading, scrRef.chapterNum],
  );

  // The book-not-available message is withheld unless the failure names the book AND project on
  // screen right now, so a result still describing the reference the user just left cannot be
  // misattributed to this one. See `resolveResourceContentState`. Derived here rather than in the
  // render body below so the editor-feeding effect can depend on it.
  const contentState = useMemo(
    () =>
      resolveResourceContentState({
        resourceProjectId,
        usjPossiblyError,
        currentBookNum: Canon.bookIdToNumber(scrRef.book),
      }),
    [resourceProjectId, usjPossiblyError, scrRef.book],
  );

  // A chapter read that fails is otherwise invisible outside the UI, and the state it produces — a
  // named, terminal message — looks the same whatever went wrong, so the log is the only place the
  // cause survives. Keyed on the error alone so paging through books on a sticky failure does not
  // re-emit it once per book.
  //
  // A missing book is ordinary navigation rather than a fault and is already explained on screen, so
  // it goes to `debug`, which packaged builds drop. If detection ever broke, the same failure would
  // fall to `error` below and be loud in production rather than silent.
  useEffect(() => {
    if (!isPlatformError(usjPossiblyError)) return;
    const message = getErrorMessage(usjPossiblyError);
    if (isMissingBookError(usjPossiblyError))
      logger.debug(`Book not found in resource text: ${message}`);
    else logger.error(`Error getting resource chapter USJ: ${message}`);
  }, [usjPossiblyError]);

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

  // Only DblResourceReference IDs are passed to the Resource Picker as pre-selected
  const currentFilteredDblIds = useMemo(() => {
    return filteredResources
      .filter(
        (r): r is EffectiveResourceReference & DblResourceReference => r.type === 'dblResource',
      )
      .map((r) => r.id);
  }, [filteredResources]);

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
              // re-enables, its failed-uid guard suppresses a duplicate install attempt; this also
              // surfaces the install-failed state immediately instead of after a second attempt.
              markInstallFailed(dblEntryUid);
              throw e;
            }
          },
          (dblEntryUid: string) => setPendingResourceId(dblEntryUid),
        );
      } finally {
        setIsSelecting(false);
      }
    },
    [getUserResourceTexts, setUserResourceTexts, installResource, retryInstall, markInstallFailed],
  );

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

  // #region Editor

  // EditorRef requires null initial value per React ref convention
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  // Markers this resource's content actually uses. Passed to the editor as extraValidMarkers so it
  // doesn't warn "Unexpected <kind> marker" for handbook/commentary markers (e.g. \pn, \jmp) — scoped
  // per-resource from the USJ being displayed, never a global list. Empty for content that needs
  // nothing extra, so the option is omitted (opt-in, no behavior change). The returned array keeps a
  // stable identity while the marker set is unchanged, so `options` doesn't churn on every fetch.
  const extraValidMarkers = useExtraValidMarkers(usjFromPdp);

  const options: EditorOptions = useMemo(
    () => ({
      isReadonly: true,
      hasSpellCheck: false,
      textDirection,
      ...(extraValidMarkers.length > 0 ? { nodes: { extraValidMarkers } } : {}),
    }),
    [textDirection, extraValidMarkers],
  );

  // `contentState` and `isBlankChapter` are deps because the branches below UNMOUNT `Editorial`
  // rather than hiding it. A remounted editor holds nothing, and this effect is its only feed — so
  // without re-running when the panel comes back to the editor, the reader gets Lexical's "Enter
  // some Scripture…" placeholder (an edit invitation in a text they cannot edit) until the next USJ
  // happens to arrive.
  useEffect(() => {
    if (usjFromPdp) editorRef.current?.setUsj(usjFromPdp);
  }, [usjFromPdp, contentState, isBlankChapter]);

  // #endregion

  // #region Render

  if (!projectId) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <p>{localizedStrings['%webView_resourcePanel_noProject%']}</p>
      </div>
    );
  }

  // Front of the state machine: still resolving, unreadable setting, or genuinely nothing
  // configured. Driven by one readiness value so the empty prompt can only appear once emptiness is
  // actually known — the loading branch deliberately outlasts the catalog fetch when something is
  // configured, which is the window the old guard let fall through to the empty state.
  if (readiness !== 'configured') {
    return (
      <PanelReadinessView
        readiness={readiness}
        errorMessage={localizedStrings['%webView_resourcePanel_settingsUnavailable%']}
        emptyPrompt={localizedStrings[emptyStatePromptKey]}
        catalogErrorMessage={localizedStrings['%webView_resourcePanel_catalogUnavailable%']}
        loadingLabel={localizedStrings['%webView_resourcePanel_loading%']}
        pickLabel={localizedStrings[pickButtonKey]}
        retryLabel={localizedStrings['%webView_resourcePanel_retry%']}
        onPick={() => showResourcePicker()}
        onRetryCatalog={refetchCatalog}
      />
    );
  }

  // Install failed: the selected resource is in the catalog but couldn't be installed. Offer a
  // retry rather than spinning forever; a success drops out of this state on its own. When offline
  // (the usual first-run cause), hint at the connection.
  if (installFailed) {
    return (
      <RetryableErrorView
        message={
          localizedStrings[
            isOnline
              ? '%webView_resourcePanel_installFailed%'
              : '%webView_resourcePanel_installFailedOffline%'
          ]
        }
        retryLabel={localizedStrings['%webView_resourcePanel_retry%']}
        onRetry={retryInstall}
      />
    );
  }

  // Installing state: selected DblResource found but not yet installed. Distinguish the two causes
  // so the label is accurate: a user pick (isSelecting) reads "Selecting…", while an auto-install
  // of a configured resource (isInstalling) — where the user picked nothing and it's just
  // downloading — reads "Installing…".
  if (isSelecting || isInstalling) {
    return (
      <LoadingView
        label={
          localizedStrings[
            isSelecting ? '%webView_resourcePanel_selecting%' : '%webView_resourcePanel_installing%'
          ]
        }
      />
    );
  }

  // Scripture content, or the reason there is none: nothing has arrived yet, the resource has no
  // such book, or it has the book but the chapter is blank. A blank chapter arrives as a successful,
  // empty USJ rather than as an error, so it is invisible to `contentState` and needs its own check;
  // the missing book is tested first because it is the more specific claim. Every branch beats
  // letting `Editorial` render with no scripture set, which shows its "enter some Scripture" prompt
  // — an edit invitation in a text the reader cannot edit.
  //
  // These are the panel's CONTENT area only. The selector header stays mounted above all of them,
  // including the spinner: a resource missing a book has no remedy inside this panel, so the only
  // thing the user can do about it is switch to a text that has the book, and taking the selector
  // away while a chapter loads would remove that between every navigation.
  //
  // Only the editor gets `dir`. That is the RESOURCE's text direction, and the messages are app
  // chrome: inheriting it would lay a left-to-right UI string out right-to-left whenever the
  // resource is RTL.
  const renderContent = () => {
    if (contentState === 'loading')
      return (
        <div className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:p-8">
          <Spinner />
        </div>
      );

    if (contentState === 'bookNotAvailable')
      return (
        <div className="tw:flex-1 tw:overflow-auto">
          <ResourceBookNotAvailable
            message={localizedStrings[bookNotAvailableKey]}
            announcementKey={`${resourceProjectId}:${scrRef.book}`}
          />
        </div>
      );

    if (isBlankChapter)
      return (
        <div className="tw:flex-1 tw:overflow-auto">
          <ResourceBlankChapter
            message={
              localizedStrings['%webView_platformScriptureEditor_emptyChapter_messageResource%']
            }
            announcementKey={`${resourceProjectId}:${scrRef.book}:${scrRef.chapterNum}`}
          />
        </div>
      );

    // A failure that is not a missing book in the text on screen. Terminal, because the value in
    // hand is an error rather than USJ and nothing re-emits until the data provider does — so a
    // spinner here would claim progress that never arrives.
    if (contentState === 'failed')
      return (
        <div className="tw:flex-1 tw:overflow-auto">
          <ResourceTextUnavailable
            message={localizedStrings['%webView_resourcePanel_textUnavailable%']}
            announcementKey={`${resourceProjectId}:${scrRef.book}:${scrRef.chapterNum}`}
          />
        </div>
      );

    // No USJ in hand for the reference on screen, and no failure to name: the chapter is still on
    // its way. Keep waiting rather than mounting `Editorial` with nothing set, which paints
    // Lexical's "Enter some Scripture…" placeholder — an edit invitation in a text the reader
    // cannot edit.
    if (!usjFromPdp)
      return (
        <div className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:p-8">
          <Spinner />
        </div>
      );

    return (
      <div className="tw:flex-1 tw:overflow-auto" dir={options.textDirection}>
        <Editorial
          ref={editorRef}
          scrRef={scrRef}
          onScrRefChange={setScrRef}
          options={options}
          logger={logger}
        />
      </div>
    );
  };

  // Active state: resource is installed and USJ is available
  // This panel (Bible Texts / Commentaries) is Simple-mode-only, so `editor-container-simple`
  // (flattens .editor-container's rounded top corners — see _simple-mode.scss) is applied
  // unconditionally, unlike the Scripture Editor's conditional use of the same class.
  return (
    <div className="tw:flex tw:h-screen tw:flex-col editor-container-simple">
      <ResourceSelectorDropdown
        filteredResources={filteredResources}
        selectedRef={selectedRef}
        dblResources={dblResources}
        onSelectResource={setSelectedResourceId}
        onShowResourcePicker={showResourcePicker}
        downloadResourcesLabel={localizedStrings['%webView_resourcePanel_downloadResources%']}
      />

      {renderContent()}
    </div>
  );

  // #endregion
};
