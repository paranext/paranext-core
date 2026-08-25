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
} from 'platform-bible-react';
import {
  DblResourceData,
  formatReplacementString,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
  ResourceType,
} from 'platform-bible-utils';
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
import { RetryableErrorView, LoadingView } from './panel-state-views.component';
import { selectTextConnection } from './select-dbl-resource';

const DEFAULT_TEXT_DIRECTION = 'ltr';

const RESOURCE_PANEL_STRING_KEYS: LocalizeKey[] = [
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
  '%webView_resourcePanel_bibleTexts_emptyState_prompt%',
  '%webView_resourcePanel_bibleTexts_pick%',
  '%webView_resourcePanel_bibleTexts_title%',
  '%webView_resourcePanel_bibleTexts_title_withResource%',
  '%webView_resourcePanel_commentaries_emptyState_prompt%',
  '%webView_resourcePanel_commentaries_pick%',
  '%webView_resourcePanel_commentaries_title%',
  '%webView_resourcePanel_commentaries_title_withResource%',
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

  // #endregion

  // #region Dynamic title

  let resourceShortName: string | undefined;
  if (isDblResourceReference(selectedRef) && dblMatch?.installed) {
    resourceShortName = dblMatch.displayName;
  } else if (isProjectReference(selectedRef)) {
    resourceShortName = selectedRef?.name;
  }

  const titleKey =
    resourceType === 'ScriptureResource'
      ? '%webView_resourcePanel_bibleTexts_title%'
      : '%webView_resourcePanel_commentaries_title%';
  const titleWithResourceKey =
    resourceType === 'ScriptureResource'
      ? '%webView_resourcePanel_bibleTexts_title_withResource%'
      : '%webView_resourcePanel_commentaries_title_withResource%';

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
  // `adr-verse-zero-resolves-to-verse-one`).
  const [usjPossiblyError] = useProjectData(
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

  useEffect(() => {
    if (usjFromPdp) editorRef.current?.setUsj(usjFromPdp);
  }, [usjFromPdp]);

  // #endregion

  // #region Render

  const emptyStatePromptKey =
    resourceType === 'ScriptureResource'
      ? '%webView_resourcePanel_bibleTexts_emptyState_prompt%'
      : '%webView_resourcePanel_commentaries_emptyState_prompt%';

  const pickButtonKey =
    resourceType === 'ScriptureResource'
      ? '%webView_resourcePanel_bibleTexts_pick%'
      : '%webView_resourcePanel_commentaries_pick%';

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

  // Loading state: USJ not yet available
  if (!resourceProjectId || usjPossiblyError === undefined) {
    return <LoadingView label={localizedStrings['%webView_resourcePanel_loading%']} />;
  }

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

      {/* Scripture content */}
      <div className="tw:flex-1 tw:overflow-auto" dir={options.textDirection}>
        <Editorial
          ref={editorRef}
          scrRef={scrRef}
          onScrRefChange={setScrRef}
          options={options}
          logger={logger}
        />
      </div>
    </div>
  );

  // #endregion
};
