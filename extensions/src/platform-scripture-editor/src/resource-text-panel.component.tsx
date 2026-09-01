import { Editorial, EditorOptions, EditorRef } from '@eten-tech-foundation/platform-editor';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
// `Canon` is a RUNTIME value and `platform-bible-utils` re-exports it as a type only, so importing
// it from there typechecks, builds, and is `undefined` at render.
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Spinner,
  useExtraValidMarkers,
} from 'platform-bible-react';
import {
  DblResourceData,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
  LocalizedStringValue,
  PlatformError,
  ResourceType,
} from 'platform-bible-utils';
import { ChevronDown } from 'lucide-react';
import { ComponentProps, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  DblResourceReference,
  EffectiveResourceReference,
  ResourceReferenceList,
} from 'platform-scripture';
import {
  getRefLabel,
  isDblResourceReference,
  isProjectReference,
} from './resource-reference.utils';
import { findCachedDblResource } from './scripture-text-grid/dbl-resource-lookup.utils';
import { getResourcePanelReadiness } from './resource-panel-readiness.utils';
import { PanelReadinessView } from './panel-readiness-view.component';
import { LoadingView, RetryableErrorView } from './panel-state-views.component';
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
import { selectTextConnection } from './select-dbl-resource';
import { useCommentaryMarkerStyles } from './use-commentary-marker-styles.hook';
import { useDblResourceAutoInstall } from './use-dbl-resource-auto-install.hook';
import { useIsOnline } from './use-is-online.hook';
import type { EffectiveResourceReferenceListState } from './use-effective-resource-reference-list.hook';

/**
 * Object containing all keys used for localization in the resource text panel. Pass these keys into
 * the Platform's localization hook (in the app) or `getLocalizedStrings` (in Storybook) and pass
 * the resulting localized strings into the `localizedStrings` prop.
 *
 * The per-resource-type keys come from `RESOURCE_PANEL_TYPED_STRING_KEYS` rather than being listed
 * again here. `useLocalizedStrings` seeds key-to-key defaults only for the keys in the array it is
 * given, so a hand-maintained second list is a silent hole: add a field to
 * `ResourcePanelStringKeys`, forget the array, and the render site reads `undefined` and announces
 * an empty message.
 */
export const RESOURCE_PANEL_STRING_KEYS: LocalizeKey[] = [
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

export type ResourcePanelLocalizedStrings = Partial<Record<LocalizeKey, LocalizedStringValue>>;

/**
 * Falls back to the key itself, matching the idiom in `model-text-panel.component.tsx`. Falling
 * back to `''` instead would render an empty message region — a blank panel, which is the exact
 * failure these messages exist to remove.
 */
const localize = (strings: ResourcePanelLocalizedStrings, key: LocalizeKey) => strings[key] ?? key;

/**
 * Identifies the wrapper around `Editorial`. The wrapper, not the editor, is what a message or
 * spinner replaces, so a test asserting that the text on screen was swapped for one of them has to
 * address this element.
 */
export const RESOURCE_TEXT_EDITOR_CONTAINER_TEST_ID = 'resource-text-editor-container';

/** Returns the `id` field for reference types that have one, or `undefined` for others. */
export function getRefId(ref: EffectiveResourceReference | undefined): string | undefined {
  if (ref && (isDblResourceReference(ref) || isProjectReference(ref))) {
    return ref.id;
  }
  return undefined;
}

/**
 * The references this panel can show, given the kind of resource it was opened for.
 *
 * Pure so that the web view can reach the same answer this component renders from: the web view
 * needs the resolved resource for its own PAPI-side concerns (the chapter subscription, the tab
 * title, Ctrl+F, and publishing navigable project ids), and this is the first half of reaching it.
 */
export function filterResourcesByType(
  effectiveResources: EffectiveResourceReference[] | undefined,
  dblResources: DblResourceData[],
  resourceType: ResourceType,
): EffectiveResourceReference[] {
  if (!effectiveResources) return [];
  return effectiveResources.filter((ref) => {
    if (isDblResourceReference(ref)) {
      return dblResources.find((r) => r.dblEntryUid === ref.id)?.type === resourceType;
    }
    if (isProjectReference(ref)) {
      // ProjectReferences only appear in the Bible Texts tab
      return resourceType === 'ScriptureResource';
    }
    return false;
  });
}

/** What the panel is showing, resolved from the selection against the DBL catalog. */
export type SelectedResource = {
  /** The chosen reference, or the first available one when the selection names nothing present. */
  selectedRef: EffectiveResourceReference | undefined;
  /** The catalog entry backing `selectedRef`, when it is a DBL resource. */
  dblMatch: DblResourceData | undefined;
  /**
   * The project of the resource this panel DISPLAYS — not the panel's own `projectId`, which is the
   * container project whose reference list is shown. `undefined` until a DBL resource is
   * installed.
   */
  resourceProjectId: string | undefined;
  /** Display name of the resolved resource, for the tab title. */
  resourceShortName: string | undefined;
};

/**
 * Resolves the selection to the resource actually on screen. Pure, and the second half of what the
 * web view needs — see {@link filterResourcesByType}.
 */
export function resolveSelectedResource(
  filteredResources: EffectiveResourceReference[],
  selectedResourceId: string | undefined,
  dblResources: DblResourceData[],
): SelectedResource {
  const selectedRef =
    filteredResources.find((r) => getRefId(r) === selectedResourceId) ?? filteredResources[0];

  let dblMatch: DblResourceData | undefined;
  let resourceProjectId: string | undefined;
  let resourceShortName: string | undefined;

  if (isDblResourceReference(selectedRef)) {
    dblMatch = findCachedDblResource(selectedRef, dblResources);
    resourceProjectId = dblMatch?.installed ? dblMatch.projectId : undefined;
    if (dblMatch?.installed) resourceShortName = dblMatch.displayName;
  } else if (isProjectReference(selectedRef)) {
    resourceProjectId = selectedRef.id;
    resourceShortName = selectedRef.name;
  }

  return { selectedRef, dblMatch, resourceProjectId, resourceShortName };
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
                checked={refId === getRefId(selectedRef)}
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

const DEFAULT_SCR_REF: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

export type ResourceTextPanelProps = {
  /** Localized strings; import `RESOURCE_PANEL_STRING_KEYS` to resolve them. */
  localizedStrings: ResourcePanelLocalizedStrings;
  /** Whether the panel has a project context (opened with a project id). */
  hasProject: boolean;
  /**
   * Which kind of resource this panel shows. `'ScriptureResource'` is the Bible texts tab; every
   * other type is the commentaries tab. Selects the whole matched set of strings — see
   * `resolveResourcePanelStringKeys`.
   */
  resourceType: ResourceType;
  /**
   * Readiness of the configured reference list, passed as the whole discriminated state rather than
   * unpacked into a list plus a status, so `{ status: 'ready', list: undefined }` stays
   * unrepresentable. See `getResourcePanelReadiness`.
   */
  effectiveResourcesState: EffectiveResourceReferenceListState;
  /** All DBL resources — used to match the selected reference and to label the selector. */
  dblResources: DblResourceData[];
  /**
   * Whether the DBL resource catalog has finished loading AND delivered a real answer. Not the same
   * as "the fetch settled": `dblResources` coerces a missing or failed catalog to `[]`, which is
   * indistinguishable from a genuinely empty one.
   */
  isCatalogReady: boolean;
  /** Whether the DBL resource catalog fetch failed. Recoverable by re-fetching. */
  hasCatalogError: boolean;
  /** Re-runs the DBL resource catalog fetch. */
  onRetryCatalog: () => void;
  /** The reference the panel is displaying. */
  scrRef?: SerializedVerseRef;
  /** Called when the editor changes the Scripture reference. */
  onScrRefChange?: (scrRef: SerializedVerseRef) => void;
  /** Which reference is selected; held by the web view so the choice survives a reopen. */
  selectedResourceId: string | undefined;
  /** Records a new selection. */
  onSelectResource: (id: string | undefined) => void;
  /**
   * The chapter read for {@link SelectedResource.resourceProjectId}, exactly as the data layer
   * returned it — USJ, a `PlatformError`, or `undefined` before anything has arrived. Which message
   * that implies is derived here rather than by the caller, so the app and Storybook share one
   * answer.
   */
  usjPossiblyError: Usj | PlatformError | undefined;
  /**
   * Whether that chapter read is in flight. Gates the blank-chapter message: the data layer keeps
   * serving the PREVIOUS reference's USJ until the new subscription's first update lands, and its
   * default is itself blank.
   */
  isUsjLoading: boolean;
  /** The displayed resource's text direction. Applied to the editor only, never to the messages. */
  textDirection: EditorOptions['textDirection'];
  /**
   * Install a DBL resource by its entry uid (fire-and-forget; the panel re-resolves once
   * installed).
   */
  installResource: (dblEntryUid: string) => Promise<void>;
  /** Read the user-level reference list (used when writing a user choice). */
  getUserResourceTexts: () => Promise<ResourceReferenceList | undefined>;
  /** Persist a user-level reference list. */
  setUserResourceTexts: (list: ResourceReferenceList) => Promise<void>;
  /**
   * Open the resource picker for the user to choose a resource. Resolves with the chosen resource,
   * or `undefined` if the picker was cancelled. In the app this opens the `platform.resourcePicker`
   * dialog; in Storybook it renders the real ResourcePickerDialog inline.
   */
  showResourcePicker: (selectedResourceIds: string[]) => Promise<DblResourceData | undefined>;
  /** Logger forwarded to the editor (the web view supplies the PAPI logger; tests may omit it). */
  logger?: ComponentProps<typeof Editorial>['logger'];
};

/**
 * Read-only panel that displays one referenced Scripture resource or commentary. It owns the
 * orchestration (filter the configured references by resource type → resolve the selection against
 * the DBL catalog → auto-install if needed → decide what the chapter read means) so the app webview
 * and Storybook share the same logic; only the data (props) and the PAPI-backed operations
 * (callbacks) differ between them.
 */
export function ResourceTextPanel({
  localizedStrings,
  hasProject,
  resourceType,
  effectiveResourcesState,
  dblResources,
  isCatalogReady,
  hasCatalogError,
  onRetryCatalog,
  scrRef = DEFAULT_SCR_REF,
  onScrRefChange = () => {},
  selectedResourceId,
  onSelectResource,
  usjPossiblyError,
  isUsjLoading,
  textDirection,
  installResource,
  getUserResourceTexts,
  setUserResourceTexts,
  showResourcePicker,
  logger,
}: ResourceTextPanelProps) {
  // #region Selection

  const effectiveResources =
    effectiveResourcesState.status === 'ready' ? effectiveResourcesState.list : undefined;

  const filteredResources = useMemo(
    () => filterResourcesByType(effectiveResources?.items, dblResources, resourceType),
    [effectiveResources, dblResources, resourceType],
  );

  // Readiness is decided from whether the sources have ARRIVED, never from whether the filtered
  // result came out empty — see `getResourcePanelReadiness`.
  const readiness = getResourcePanelReadiness({
    listState: effectiveResourcesState,
    isCatalogReady,
    hasCatalogError,
    matchingCount: filteredResources.length,
  });

  // Holds the ID of a resource just selected from the picker while it propagates through the
  // reactive settings chain and into filteredResources. Prevents the auto-correct below from
  // resetting the selection before the new resource has arrived in the list.
  const [pendingResourceId, setPendingResourceId] = useState<string | undefined>(undefined);

  // Once the pending resource appears in filteredResources, commit it as the active selection.
  useEffect(() => {
    if (!pendingResourceId) return;
    const found = filteredResources.find((r) => getRefId(r) === pendingResourceId);
    if (found) {
      onSelectResource(pendingResourceId);
      setPendingResourceId(undefined);
    }
  }, [filteredResources, pendingResourceId, onSelectResource]);

  // Auto-correct selectedResourceId when the selected item leaves the filtered list.
  // Skipped while a pending selection is in-flight to avoid overriding it prematurely.
  useEffect(() => {
    if (filteredResources.length === 0) return;
    if (pendingResourceId) return;
    const currentId = filteredResources.find((r) => getRefId(r) === selectedResourceId);
    if (!currentId) onSelectResource(getRefId(filteredResources[0]));
  }, [filteredResources, selectedResourceId, onSelectResource, pendingResourceId]);

  const { selectedRef, dblMatch, resourceProjectId } = useMemo(
    () => resolveSelectedResource(filteredResources, selectedResourceId, dblResources),
    [filteredResources, selectedResourceId, dblResources],
  );

  const [isSelecting, setIsSelecting] = useState(false);

  // Auto-install a selected DBL resource matched in the catalog but not installed locally yet
  // (shared with the model-text panel); without it the panel spins forever. Skipped while a manual
  // pick is in flight (it installs the resource itself).
  const dblEntryUidToInstall = dblMatch && !dblMatch.installed ? dblMatch.dblEntryUid : undefined;
  const { isInstalling, installFailed, retryInstall, markInstallFailed } =
    useDblResourceAutoInstall(dblEntryUidToInstall, installResource, isSelecting);

  // Only used to add a "check your connection" hint to the install-failed message when offline.
  const isOnline = useIsOnline();

  // Load PT9-derived marker styles when the displayed resource is a supported commentary.
  // Keyed on the resource's project id (not the panel's container project) since the resource is
  // what gets rendered.
  useCommentaryMarkerStyles(resourceProjectId);

  // #endregion

  // #region Content state

  const usjFromPdp = !isPlatformError(usjPossiblyError) ? usjPossiblyError : undefined;

  // A chapter the resource HAS but with nothing in it. Gated on the load having finished because
  // the data layer doesn't reset to its default when the reference changes — it keeps the previous
  // chapter's USJ until the new subscription's first update lands, and that default is itself
  // blank. Without the gate the panel would claim "empty" over a chapter that is still arriving,
  // and again on first mount.
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
      logger?.debug(`Book not found in resource text: ${message}`);
    else logger?.error(`Error getting resource chapter USJ: ${message}`);
  }, [usjPossiblyError, logger]);

  // #endregion

  // #region Resource picker

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

  const openResourcePicker = useCallback(() => {
    showResourcePicker(currentFilteredDblIds)
      .then((resource) => {
        if (resource) return handleResourceSelect(resource);
        return undefined;
      })
      .catch((e) => logger?.error(`Resource selection failed: ${getErrorMessage(e)}`));
  }, [showResourcePicker, currentFilteredDblIds, handleResourceSelect, logger]);

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

  // One resource type, one matched set of strings. See `resolveResourcePanelStringKeys`.
  const { emptyStatePromptKey, bookNotAvailableKey, pickButtonKey } =
    resolveResourcePanelStringKeys(resourceType);

  if (!hasProject) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <p>{localize(localizedStrings, '%webView_resourcePanel_noProject%')}</p>
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
        errorMessage={localize(localizedStrings, '%webView_resourcePanel_settingsUnavailable%')}
        emptyPrompt={localize(localizedStrings, emptyStatePromptKey)}
        catalogErrorMessage={localize(
          localizedStrings,
          '%webView_resourcePanel_catalogUnavailable%',
        )}
        loadingLabel={localize(localizedStrings, '%webView_resourcePanel_loading%')}
        pickLabel={localize(localizedStrings, pickButtonKey)}
        retryLabel={localize(localizedStrings, '%webView_resourcePanel_retry%')}
        onPick={() => openResourcePicker()}
        onRetryCatalog={onRetryCatalog}
      />
    );
  }

  // Install failed: the selected resource is in the catalog but couldn't be installed. Offer a
  // retry rather than spinning forever; a success drops out of this state on its own. When offline
  // (the usual first-run cause), hint at the connection.
  if (installFailed) {
    return (
      <RetryableErrorView
        message={localize(
          localizedStrings,
          isOnline
            ? '%webView_resourcePanel_installFailed%'
            : '%webView_resourcePanel_installFailedOffline%',
        )}
        retryLabel={localize(localizedStrings, '%webView_resourcePanel_retry%')}
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
        label={localize(
          localizedStrings,
          isSelecting ? '%webView_resourcePanel_selecting%' : '%webView_resourcePanel_installing%',
        )}
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
            message={localize(localizedStrings, bookNotAvailableKey)}
            announcementKey={`${resourceProjectId}:${scrRef.book}`}
          />
        </div>
      );

    if (isBlankChapter)
      return (
        <div className="tw:flex-1 tw:overflow-auto">
          <ResourceBlankChapter
            message={localize(
              localizedStrings,
              '%webView_platformScriptureEditor_emptyChapter_messageResource%',
            )}
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
            message={localize(localizedStrings, '%webView_resourcePanel_textUnavailable%')}
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
      <div
        className="tw:flex-1 tw:overflow-auto"
        dir={options.textDirection}
        data-testid={RESOURCE_TEXT_EDITOR_CONTAINER_TEST_ID}
      >
        <Editorial
          ref={editorRef}
          scrRef={scrRef}
          onScrRefChange={onScrRefChange}
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
        onSelectResource={onSelectResource}
        onShowResourcePicker={openResourcePicker}
        downloadResourcesLabel={localize(
          localizedStrings,
          '%webView_resourcePanel_downloadResources%',
        )}
      />

      {renderContent()}
    </div>
  );

  // #endregion
}
