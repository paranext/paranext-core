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
  useViewVisibility,
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
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ResourceReferenceList } from 'platform-scripture';
import {
  hasNewScrollTarget,
  isEchoOfPublishedScrRef,
  SCROLL_MAX_WAIT_MS,
  scrollToVerse,
} from './editor-dom.util';
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
import { PanelReadinessView } from './panel-readiness-view.component';
import { useCommentaryMarkerStyles } from './use-commentary-marker-styles.hook';
import { useDblResourceAutoInstall } from './use-dbl-resource-auto-install.hook';
import { useInstallDblResource } from './use-install-dbl-resource.hook';
import { useIsOnline } from './use-is-online.hook';
import {
  isDblResourceReference,
  isProjectReference,
  getRefLabel,
  getResourceReferenceRowId,
} from './resource-reference.utils';
import { resolveResourceSelection } from './resource-selection.utils';
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
import { ExpandableInfo, RetryableErrorView, LoadingView } from './panel-state-views.component';
import { selectTextConnection } from './select-dbl-resource';
import { usePublishNavigableProjectIds } from './use-publish-navigable-project-ids.hook';

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
  // The Bible-texts empty state's "More info" disclosure. Not part of
  // RESOURCE_PANEL_TYPED_STRING_KEYS: that set pairs one key per field for BOTH resource types,
  // and commentaries deliberately has no disclosure — its prompt is self-explanatory.
  '%webView_resourcePanel_bibleTexts_emptyState_moreInfo%',
  '%webView_resourcePanel_bibleTexts_emptyState_lessInfo%',
  '%webView_resourcePanel_bibleTexts_emptyState_moreInfo_body%',
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

// This panel offers locally-downloaded resources alongside the ones already in the text
// collection, so its rows are the union of both.
const RESOURCE_PICKER_OPTIONS = { includeDownloaded: true } as const;

type ResourceSelectorDropdownProps = {
  filteredResources: PickerResource[];
  selectedRef: PickerResource | undefined;
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
              {selectedRef ? getRefLabel(selectedRef.reference, dblResources) : ''}
            </span>
            <ChevronDown className="tw:ml-1 tw:h-4 tw:w-4 tw:shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="tw:w-72">
          {filteredResources.map((ref) => {
            const refId = getResourceReferenceRowId(ref.reference);
            return (
              <DropdownMenuCheckboxItem
                key={refId}
                checked={
                  refId ===
                  (selectedRef ? getResourceReferenceRowId(selectedRef.reference) : undefined)
                }
                onCheckedChange={() => {
                  onSelectResource(refId);
                }}
              >
                {getRefLabel(ref.reference, dblResources)}
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

  // The IDs the Resource Picker shows as already INCLUDED. Rows sourced from `downloaded` are
  // installed locally but not in the text collection, so they belong in the picker's INSTALLED
  // section instead. Drawn from every picker row rather than the type-filtered ones so a resource
  // of another type that is in the text collection (a commentary alongside Bible texts) is not
  // re-offered as INSTALLED.
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
              // re-enables, its failed-uid guard suppresses a duplicate install attempt; this also
              // surfaces the install-failed state immediately instead of after a second attempt.
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

  // What this panel last published to its scroll group, and what it last successfully scrolled to.
  // Both feed the guards on the reveal-scroll effect below.
  const lastPublishedScrRefRef = useRef<SerializedVerseRef | undefined>(undefined);
  const lastScrolledForRef = useRef<{ scrRef: SerializedVerseRef; usj: unknown } | undefined>(
    undefined,
  );
  const isViewVisible = useViewVisibility();

  // Record what we publish before forwarding it, so the bounce-back can be recognised as our own.
  const handleScrRefChange = useCallback(
    (newScrRef: SerializedVerseRef) => {
      lastPublishedScrRefRef.current = newScrRef;
      setScrRef(newScrRef);
    },
    [setScrRef],
  );
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

  // Scroll to the current verse when this tab is shown, and again once a chapter's content lands.
  //
  // `Editorial` renders the reference it is given but does not scroll to the verse — every consumer
  // that scrolls does it by calling `scrollToVerse`, as the Scripture editor and the model text
  // panel both do.
  //
  // Keyed on visibility AND on the reference: visibility covers the reveal (a tab activation carries
  // no reference change of its own), and the reference covers "go to result" landing on a panel that
  // is already visible.
  useEffect(() => {
    // The echo is consumed FIRST, and whether or not this panel is visible. A verse click inside
    // `Editorial` publishes to scroll group 0 and bounces straight back as a prop update; scrolling
    // on that would yank the user's own click target to the top. Leaving the latch armed because
    // the panel happened to be hidden would be worse: a later, genuine "go to result" onto that
    // same verse would look like an echo and be swallowed, and a panel registers no web view
    // controller, so nothing would retry it.
    if (isEchoOfPublishedScrRef(lastPublishedScrRefRef.current, scrRef)) {
      lastPublishedScrRefRef.current = undefined;
      // The clicked verse IS this panel's position now. Recording it keeps a later bare reveal from
      // treating it as a new target and snapping away from wherever the user has since scrolled.
      lastScrolledForRef.current = { scrRef, usj: usjFromPdp };
      return undefined;
    }
    // The latch is only ever valid for the very NEXT reference, so any other reference discards it.
    // Otherwise a publish whose echo never arrives as its own update — a Find result writing to the
    // group before the round-trip lands — leaves the latch armed forever, and a later genuine "go to
    // result" onto that verse would match it and be swallowed.
    lastPublishedScrRefRef.current = undefined;

    // `isUsjLoading` is the guard that keeps a scroll off the PREVIOUS chapter: `useProjectData`
    // holds the old USJ across a selector change, and that content is fully laid out, so the settle
    // loop below would happily accept it. `scrollToVerse` matches on verse number alone, with no
    // book or chapter qualifier, so scrolling then lands on — and pulses — the same verse number in
    // the wrong chapter.
    if (!isViewVisible || !usjFromPdp || isUsjLoading) return undefined;

    // Nothing new since the last scroll — this is a bare reveal, so leave the user's scroll alone.
    if (!hasNewScrollTarget(lastScrolledForRef.current, scrRef, usjFromPdp)) return undefined;

    // Wait for the revealed pane's layout to SETTLE, then scroll exactly once.
    //
    // Two traps here. First, the verse marker enters the DOM before the chapter has finished laying
    // out, so an offset computed at that moment is measured against a much shorter content box and
    // scrolls to a fraction of the real target. Second — and why a naive rAF retry does not rescue
    // it — `scrollToVerse` scrolls with `behavior: 'smooth'`, so re-calling it every frame restarts
    // the animation from wherever it had crept to and it never converges.
    //
    // Sampling the scroll container's height until it stops changing avoids both: the geometry is
    // trustworthy by then, and the single call that follows animates uninterrupted.
    let cancelled = false;
    const start = Date.now();
    let lastScrollHeight = -1;
    // Pulses the verse we land on, so the match is identifiable when several share a verse or a
    // commentary entry is long. Same treatment the Scripture editor gives an arrived verse.
    let highlightedVerseElement: HTMLElement | undefined;
    const scrollWhenSettled = () => {
      if (cancelled) return;
      const timedOut = Date.now() - start > SCROLL_MAX_WAIT_MS;

      // Below verse 1 means the chapter top, which `scrollToVerse` reaches without a verse marker
      // and so without settled geometry — but it still needs the container in the DOM, and it
      // cannot report that, since it returns an element only when it matched a marker. So the
      // container is checked here before recording; otherwise a reveal that beat the container into
      // the DOM would scroll nothing and still be recorded as done. Verse 1 is NOT in this case: it
      // has a real marker and real geometry, so it goes through the settle loop like any other.
      if (scrRef.verseNum < 1) {
        if (document.querySelector('.editor-container')) {
          scrollToVerse(scrRef);
          lastScrolledForRef.current = { scrRef, usj: usjFromPdp };
          return;
        }
        if (timedOut) return;
        requestAnimationFrame(scrollWhenSettled);
        return;
      }

      // `.editor-container` is sampled as a CONTENT-GROWTH PROXY, not as the scroll container.
      // Which element actually scrolls differs by host — `_editor-overrides.scss` warns that this
      // one is auto-height in the Scripture editor and its wrapper scrolls instead — so the scroll
      // itself is left to `scrollToVerse`, which discovers the container via `findScrollContainer`.
      // Only the height is read here, and that tracks the chapter laying out either way.
      const contentElement = document.querySelector<HTMLElement>('.editor-container');
      // `querySelector` yields null, not undefined, so compare truthily — treating a missing
      // element as "settled" would scroll against geometry that does not exist yet.
      const scrollHeight = contentElement ? contentElement.scrollHeight : -1;
      const isSettled = !!contentElement && scrollHeight === lastScrollHeight;
      lastScrollHeight = scrollHeight;

      if (isSettled) {
        highlightedVerseElement = scrollToVerse(scrRef);
        // Only a scroll that actually landed is recorded. The verse marker can be genuinely absent
        // — a `\v 16-17` range publishes no `[data-number="17"]` — so recording regardless would
        // make `hasNewScrollTarget` answer "same target" forever and the panel would never catch up
        // on a later reveal.
        if (highlightedVerseElement) {
          lastScrolledForRef.current = { scrRef, usj: usjFromPdp };
          highlightedVerseElement.classList.add('highlighted');
          return;
        }
        // Settled but no marker yet. Two consecutive equal heights are cheap to reach — an empty,
        // flex-sized container reports the same height every frame before Lexical has reconciled
        // the chapter — so "settled" is not "rendered". Keep waiting rather than treating one
        // agreeing pair as the answer; `scrollToVerse` does not scroll without a marker, so
        // re-calling it cannot restart an animation.
      }
      // Out of time: give up WITHOUT recording, so a later reveal tries again instead of being
      // told the target is unchanged.
      if (timedOut) return;
      requestAnimationFrame(scrollWhenSettled);
    };
    scrollWhenSettled();
    return () => {
      cancelled = true;
      highlightedVerseElement?.classList.remove('highlighted');
    };
    // The rule wants `scrRef` itself, but this effect is keyed on the three fields that decide where
    // to scroll. `useWebViewScrollGroupScrRef` hands back a fresh object whenever the scroll group
    // publishes, including for a reference that did not change, so depending on the object would
    // restart the settle loop on updates that cannot move the target.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isViewVisible, usjFromPdp, isUsjLoading, scrRef.book, scrRef.chapterNum, scrRef.verseNum]);

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
        moreInfo={
          // Only Bible Texts needs the disclosure; the Commentaries prompt says what it is asking
          // for, so it renders the shorter empty state.
          resourceType === 'ScriptureResource' ? (
            <ExpandableInfo
              moreLabel={localizedStrings['%webView_resourcePanel_bibleTexts_emptyState_moreInfo%']}
              lessLabel={localizedStrings['%webView_resourcePanel_bibleTexts_emptyState_lessInfo%']}
              body={localizedStrings['%webView_resourcePanel_bibleTexts_emptyState_moreInfo_body%']}
            />
          ) : undefined
        }
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
          onScrRefChange={handleScrRefChange}
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
