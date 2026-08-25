import {
  Editorial,
  EditorOptions,
  EditorRef,
  getDefaultViewOptions,
} from '@eten-tech-foundation/platform-editor';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useExtraValidMarkers,
  useTruncationTooltip,
  Spinner,
} from 'platform-bible-react';
import { getErrorMessage, type DblResourceData } from 'platform-bible-utils';
import type {
  DblResourceReference,
  EffectiveResourceReference,
  ResourceReferenceList,
} from 'platform-scripture';
import { ComponentProps, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { selectTextConnection } from './select-dbl-resource';
import { isDblResourceReference, getRefLabel } from './resource-reference.utils';
import { findCachedDblResource } from './scripture-text-grid/dbl-resource-lookup.utils';
import { useDblResourceAutoInstall } from './use-dbl-resource-auto-install.hook';
import { useIsOnline } from './use-is-online.hook';
import { RetryableErrorView, LoadingView } from './panel-state-views.component';
import { getResourcePanelReadiness } from './resource-panel-readiness.utils';
import { PanelReadinessView } from './panel-readiness-view.component';
import type { EffectiveResourceReferenceListState } from './use-effective-resource-reference-list.hook';
import { scrollToVerse } from './editor-dom.util';
import { ResourceBookNotAvailable } from './resource-book-not-available.component';
import { ResourceBlankChapter } from './resource-blank-chapter.component';
import {
  isChapterBlank,
  isMissingBookError,
  isMissingBookOnScreen,
} from './platform-scripture-editor.utils';
import type {
  ModelTextPanelLocalizedStringKey,
  ModelTextPanelLocalizedStrings,
} from './model-text-panel.const';

const DEFAULT_TEXT_DIRECTION = 'ltr';

// The editor's default view options never change, so build them once at module scope. Rebuilding a
// fresh `view` object inside the `options` memo would give `options` a new identity on every fetch,
// and the editor reloads (re-serialize + setEditorState) whenever the `view` object's identity
// changes — so a refetch of identical content would force a pointless full reload.
const VIEW_OPTIONS = getDefaultViewOptions();

/** Max ms to retry scrolling via rAF before giving up (e.g. verse marker missing from USJ) */
const SCROLL_MAX_WAIT_MS = 2000;

export {
  MODEL_TEXT_PANEL_STRING_KEYS,
  type ModelTextPanelLocalizedStringKey,
  type ModelTextPanelLocalizedStrings,
} from './model-text-panel.const';

/**
 * Falls back to the key itself, matching the idiom in `book-not-available-view.component.tsx` and
 * `empty-chapter-view.component.tsx`. Falling back to `''` instead would render an empty message
 * region — a blank panel, which is the exact failure this panel's message exists to remove.
 */
const localize = (strings: ModelTextPanelLocalizedStrings, key: ModelTextPanelLocalizedStringKey) =>
  strings[key] ?? key;

const DEFAULT_SCR_REF: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

export type ModelTextPanelProps = {
  /** Localized strings; import `MODEL_TEXT_PANEL_STRING_KEYS` to resolve them. */
  localizedStrings: ModelTextPanelLocalizedStrings;
  /** Whether the panel has a project context (opened with a project id). */
  hasProject: boolean;
  /**
   * Readiness of the configured model-text list, passed as the whole discriminated state rather
   * than unpacked into a list plus a status.
   *
   * Unpacking it at this boundary would hand the panel an `undefined`-able list AND a loose status
   * string — two values free to disagree, which is precisely what the union exists to prevent. `{
   * status: 'ready', list: undefined }` and `{ status: 'loading' }` carrying a list are both
   * unrepresentable this way, and narrowing survives into the component. The first item of a
   * `ready` list is the configured model text. See `getResourcePanelReadiness` for how the panels
   * share their front-state derivation.
   */
  modelTextsState: EffectiveResourceReferenceListState;
  /** All DBL resources — used to match the configured model text and to feed the resource picker. */
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
  /** The function to get the user-level model-text setting (used when writing a user choice). */
  getUserModelTexts: () => Promise<ResourceReferenceList | undefined>;
  /** Current Scripture reference for the editor. */
  scrRef?: SerializedVerseRef;
  /** Called when the editor changes the Scripture reference. */
  onScrRefChange?: (scrRef: SerializedVerseRef) => void;
  /**
   * Install a DBL resource by its entry uid (fire-and-forget; the panel re-resolves once
   * installed).
   */
  installResource: (dblEntryUid: string) => Promise<void>;
  /** Persist a user-level model-text list. */
  setUserModelTexts: (list: ResourceReferenceList) => Promise<void>;
  /**
   * Open the resource picker for the user to choose a model text. Resolves with the chosen
   * resource, or `undefined` if the picker was cancelled. In the app this opens the
   * `platform.resourcePicker` dialog; in Storybook it renders the real ResourcePickerDialog
   * inline.
   */
  showResourcePicker: (selectedResourceIds: string[]) => Promise<DblResourceData | undefined>;
  /**
   * Retrieve the resolved resource's chapter USJ and text direction. This is a callback (not a
   * prop) because the resource project to read from is resolved inside this component.
   */
  getResourceChapter: (
    resourceProjectId: string,
    scrRef: SerializedVerseRef,
  ) => Promise<{ usj: Usj | undefined; textDirection: string }>;
  /** Logger forwarded to the editor (the webview supplies the PAPI logger; stories may omit it). */
  logger?: ComponentProps<typeof Editorial>['logger'];
};

/**
 * Read-only panel that displays a project's configured "model text" Scripture resource. It owns the
 * orchestration (resolve the configured model text → match a DBL resource → auto-install if needed
 * → load that resource's chapter USJ) so the app webview and Storybook share the same logic; only
 * the data (props) and the PAPI-backed operations (callbacks) differ between them.
 */
export function ModelTextPanel({
  localizedStrings,
  hasProject,
  modelTextsState,
  dblResources,
  isCatalogReady,
  hasCatalogError,
  onRetryCatalog,
  getUserModelTexts,
  scrRef = DEFAULT_SCR_REF,
  onScrRefChange = () => {},
  installResource,
  setUserModelTexts,
  showResourcePicker,
  getResourceChapter,
  logger,
}: ModelTextPanelProps) {
  // --- Resolve the configured model text against the DBL resource list ---

  // Derived from the narrowed union, so it can only be non-undefined when the list is genuinely
  // ready — the invariant the prop shape now guarantees rather than merely documents.
  const effectiveModelTexts = modelTextsState.status === 'ready' ? modelTextsState.list : undefined;
  const effectiveModelText = effectiveModelTexts?.items[0];
  let dblRef: (EffectiveResourceReference & DblResourceReference) | undefined;
  if (isDblResourceReference(effectiveModelText)) dblRef = effectiveModelText;
  const match = dblRef ? findCachedDblResource(dblRef, dblResources) : undefined;
  const resourceProjectId = match?.installed ? match.projectId : undefined;
  const modelTextLabel = effectiveModelText
    ? getRefLabel(effectiveModelText, dblResources)
    : undefined;

  // Only show the tooltip when the header's tw:truncate actually clips modelTextLabel — an
  // unconditional Tooltip would fire on every hover, even when the full label already fits.
  const {
    ref: modelTextLabelRef,
    open: isModelTextLabelTruncatedHovered,
    onPointerEnter: onModelTextLabelPointerEnter,
    onPointerLeave: onModelTextLabelPointerLeave,
  } = useTruncationTooltip<HTMLDivElement>();

  const [isSelecting, setIsSelecting] = useState(false);

  // Auto-install a matched-but-uninstalled configured model text (shared with the resource panel);
  // without it the panel spins forever with the picker unreachable. Skipped while a manual pick is
  // in flight (it installs the resource itself).
  const dblEntryUidToInstall = match && !match.installed ? match.dblEntryUid : undefined;
  const { isInstalling, installFailed, retryInstall, markInstallFailed } =
    useDblResourceAutoInstall(dblEntryUidToInstall, installResource, isSelecting);

  // Only used to add a "check your connection" hint to the install-failed message when the machine
  // is definitely offline (the common cause of a failed download on first run).
  const isOnline = useIsOnline();

  // Tracks the latest scrRef this panel's editor just published so we can suppress the echo that
  // comes back through scroll group 0 (forced in simple mode) and avoid scroll-jumping the user's
  // own click target to the top of the viewport.
  const lastPublishedScrRefRef = useRef<SerializedVerseRef | undefined>(undefined);

  // --- Load the resolved resource's chapter USJ (re-fetch on resource/reference change) ---

  const [usj, setUsj] = useState<Usj | undefined>(undefined);
  const [textDirection, setTextDirection] = useState<string>(DEFAULT_TEXT_DIRECTION);
  // `undefined` means "not yet fetched" so we can show the loading state, matching the original.
  const [isUsjLoading, setIsUsjLoading] = useState(false);
  // The rejection itself is kept, not a boolean derived from it. `isMissingBookOnScreen` then decides
  // in the render body whether the failure still describes the book and model text on screen, so
  // navigating to a book this text does have cannot commit one frame still asserting the message.
  const [fetchError, setFetchError] = useState<unknown>(undefined);
  // WHICH request `usj`/`fetchError` are the answer to. Every state above survives a navigation —
  // `usj` still holds the previous chapter, `fetchError` the previous rejection — and the effect
  // that clears them runs after the commit, so the first render pairing a new reference with the
  // previous answer would otherwise read as an answer about the new one. That frame is what made a
  // step into a book the model text lacks paint "this chapter is empty" first. Comparing this key
  // against the reference being rendered makes the mismatched pairing unrepresentable instead of
  // merely brief.
  const [loadedRequestKey, setLoadedRequestKey] = useState<string | undefined>(undefined);

  const requestKey = `${resourceProjectId ?? ''}:${scrRef.book}:${scrRef.chapterNum}:${scrRef.versificationStr}`;

  useEffect(() => {
    if (!resourceProjectId) {
      setUsj(undefined);
      return undefined;
    }
    let isActive = true;
    setIsUsjLoading(true);
    setFetchError(undefined);
    const keyForThisLoad = requestKey;
    const load = async () => {
      const { usj: nextUsj, textDirection: nextTextDirection } = await getResourceChapter(
        resourceProjectId,
        scrRef,
      );
      if (!isActive) return;
      setUsj(nextUsj);
      setTextDirection(nextTextDirection || DEFAULT_TEXT_DIRECTION);
      setLoadedRequestKey(keyForThisLoad);
      setIsUsjLoading(false);
    };
    load().catch((e) => {
      if (!isActive) return;
      setUsj(undefined);
      setFetchError(e);
      setLoadedRequestKey(keyForThisLoad);
      setIsUsjLoading(false);
      // A missing book is ordinary navigation, not a fault, and it is already explained on screen —
      // so `debug`, which packaged builds drop entirely (`global-this.model.ts` runs at `info` when
      // packaged). That is deliberate rather than a gap: this fires once per resource per navigation
      // and the Scripture Text Grid can hit it for many cells at once, so `info` would be noise. It
      // is also safe, because the quiet path is the CORRECT one — if detection ever broke, the same
      // failure would fall to the `error` branch below and be loud in production, not silent.
      if (isMissingBookError(e))
        logger?.debug(`Book not found in model text: ${getErrorMessage(e)}`);
      else logger?.error(`Error getting model text chapter USJ: ${getErrorMessage(e)}`);
    });
    return () => {
      isActive = false;
    };
    // Intentionally excludes scrRef.verseNum: chapter data only changes with book or chapter, not
    // verse. Also excludes `logger`, used in the catch above: it is a stable module object, so
    // including it would only add a dep that never changes, and `requestKey`, which is built from
    // the four listed deps and so never changes independently of them.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    resourceProjectId,
    scrRef.book,
    scrRef.chapterNum,
    scrRef.versificationStr,
    getResourceChapter,
  ]);

  // Scroll to the current verse whenever the scrRef or USJ changes.
  // Using granular scrRef deps instead of the whole object avoids redundant scroll attempts
  // when scrRef identity changes but the reference itself hasn't.
  useEffect(() => {
    // Suppress our own echo: the panel is on scroll group 0 in simple mode, so a verse click
    // inside Editorial publishes to the scroll group and immediately bounces back as a prop
    // update. Without this check, scrollToVerse would snap the user's click target to the top
    // of the viewport after they clicked it.
    const lastPublished = lastPublishedScrRefRef.current;
    if (
      lastPublished &&
      lastPublished.book === scrRef.book &&
      lastPublished.chapterNum === scrRef.chapterNum &&
      lastPublished.verseNum === scrRef.verseNum
    ) {
      lastPublishedScrRefRef.current = undefined;
      return undefined;
    }

    // Gate on USJ being loaded for the current chapter. On book/chapter change, usj still holds
    // the previous chapter while the fetch is in flight — querying the DOM now would scroll into
    // the wrong chapter's content (or silently no-op). usj in deps ensures we re-run once data
    // arrives and the editor has re-rendered.
    if (!usj || isUsjLoading) return undefined;

    // rAF retry: waits for the editor DOM to paint the new chapter before scrolling. Stops as
    // soon as the verse element is found, or after SCROLL_MAX_WAIT_MS (verse marker absent).
    let cancelled = false;
    const start = Date.now();
    const tryScroll = () => {
      if (cancelled) return;
      const found = scrollToVerse(scrRef);
      if (found || scrRef.verseNum <= 1) return;
      if (Date.now() - start > SCROLL_MAX_WAIT_MS) return;
      requestAnimationFrame(tryScroll);
    };
    tryScroll();
    return () => {
      cancelled = true;
    };
    // scrollToVerse is a stable module-level import — adding it as a dep would cause spurious re-runs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usj, isUsjLoading, scrRef.book, scrRef.chapterNum, scrRef.verseNum]);

  // Whether `usj`/`fetchError` answer the reference currently being rendered. Everything below that
  // makes a claim about the model text is gated on this.
  const isAnswerCurrent = loadedRequestKey === requestKey;

  // A chapter the resource HAS but with nothing in it. Gated on the answer in hand being for this
  // reference, because `usj` keeps the previous chapter's content until the new fetch lands —
  // deriving this from stale content would paint the message over a chapter that is still arriving,
  // or over a book the model text does not have at all.
  const isBlankChapter = useMemo(
    () => isAnswerCurrent && !isUsjLoading && usj !== undefined && isChapterBlank(usj),
    [isAnswerCurrent, usj, isUsjLoading],
  );

  // Whether the failure in hand still describes what this panel is showing. Derived rather than
  // latched in the `catch` so it is accurate for the render it is used in.
  const isBookMissing =
    isAnswerCurrent &&
    isMissingBookOnScreen({
      error: fetchError,
      currentBookNum: Canon.bookIdToNumber(scrRef.book),
      projectId: resourceProjectId,
    });

  // --- Editor ---

  // EditorRef requires null initial value per React ref convention
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  // Markers this resource's content actually uses, so the editor doesn't warn "Unexpected <kind>
  // marker" for handbook/commentary markers (e.g. \pn, \jmp). Scoped per-resource from the displayed
  // USJ — never a global list — and additive, so listing built-in markers is a harmless no-op. The
  // returned array keeps a stable identity while the marker set is unchanged, so `options` below
  // doesn't churn (and reload the editor) on every fetch of identical content.
  const extraValidMarkers = useExtraValidMarkers(usj);

  const options: EditorOptions = useMemo(
    () => ({
      isReadonly: true,
      hasSpellCheck: false,
      // Opt-in: omit `nodes` entirely when there are no extra markers (no behavior change), matching
      // resource-text-panel.
      ...(extraValidMarkers.length > 0 ? { nodes: { extraValidMarkers } } : {}),
      // Narrow the resource's (string) text-direction setting to the editor's union without a cast.
      textDirection: textDirection === 'rtl' || textDirection === 'auto' ? textDirection : 'ltr',
      view: VIEW_OPTIONS,
    }),
    [textDirection, extraValidMarkers],
  );

  // Read-only: push incoming USJ directly into the editor whenever it changes.
  //
  // `isBookMissing` and `isBlankChapter` are deps because those branches UNMOUNT `Editorial` rather
  // than hiding it. A remounted editor holds nothing, and this effect is its only feed — so without
  // re-running when the panel comes back to the editor, the reader gets Lexical's "Enter some
  // Scripture…" placeholder (an edit invitation in a text they cannot edit) until the next USJ
  // happens to arrive.
  useEffect(() => {
    if (usj) editorRef.current?.setUsj(usj);
  }, [usj, isBookMissing, isBlankChapter]);

  // --- Resource picker / selection ---

  const currentModelTextIds = useMemo(() => {
    const items = effectiveModelTexts?.items ?? [];
    const dblItems = items.filter(
      (r): r is EffectiveResourceReference & DblResourceReference => r.type === 'dblResource',
    );
    const adminDblItems = dblItems.filter((r) => r.source === 'admin');
    const relevantItems =
      adminDblItems.length > 0 ? adminDblItems : dblItems.filter((r) => r.source === 'user');
    return relevantItems.map((r) => r.id);
  }, [effectiveModelTexts]);

  const handleResourceSelect = useCallback(
    async (resource: DblResourceData) => {
      setIsSelecting(true);
      // A user-initiated pick is a fresh attempt: clear any prior auto-install failure so the
      // install-failed state doesn't stick.
      retryInstall();
      try {
        await selectTextConnection(resource, getUserModelTexts, setUserModelTexts, async () => {
          try {
            await installResource(resource.dblEntryUid);
          } catch (e) {
            // Record the failure so that once the pick finishes and the auto-install effect
            // re-enables, its failed-uid guard suppresses a duplicate install attempt; this also
            // surfaces the install-failed state immediately instead of after a second attempt.
            markInstallFailed(resource.dblEntryUid);
            throw e;
          }
        });
      } finally {
        setIsSelecting(false);
      }
    },
    [getUserModelTexts, setUserModelTexts, installResource, retryInstall, markInstallFailed],
  );

  const handlePickModelText = useCallback(async () => {
    const resource = await showResourcePicker(currentModelTextIds);
    if (resource) await handleResourceSelect(resource);
  }, [showResourcePicker, currentModelTextIds, handleResourceSelect]);

  const handleScrRefChange = useCallback(
    (newScrRef: SerializedVerseRef) => {
      lastPublishedScrRefRef.current = newScrRef;
      onScrRefChange(newScrRef);
    },
    [onScrRefChange],
  );

  // --- Render the resolved state ---

  // Not-found: a configured model text can't be resolved to a displayable resource (not in the DBL
  // catalog, a non-DBL reference, or an entry missing its id). Offer the picker so the user can
  // recover rather than being stranded.
  const notFoundState = (
    <div className="tw:flex tw:h-screen tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:p-8 tw:text-center">
      <p>{localize(localizedStrings, '%webView_modelTextPanel_unknownResource%')}</p>
      <Button onClick={() => handlePickModelText()}>
        {localize(localizedStrings, '%webView_modelTextPanel_pickModelText%')}
      </Button>
    </div>
  );

  // No project: opened without a project id (expected to be brief).
  if (!hasProject) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <p>{localize(localizedStrings, '%webView_modelTextPanel_noProject%')}</p>
      </div>
    );
  }

  // Front of the state machine: still resolving, an unreadable setting, a catalog that failed, or
  // genuinely nothing configured. Derived from one readiness value and rendered by the same view
  // the Resource panel uses, so the two panels cannot drift apart on the question that caused this
  // bug in the first place.
  const readiness = getResourcePanelReadiness({
    listState: modelTextsState,
    isCatalogReady,
    hasCatalogError,
    // `matchingCount` is omitted: this panel shows the first configured model text whatever its
    // type, so every configured item matches — unlike the Resource panel, which filters by type.
  });

  if (readiness !== 'configured') {
    return (
      <PanelReadinessView
        readiness={readiness}
        errorMessage={localize(localizedStrings, '%webView_modelTextPanel_settingsUnavailable%')}
        catalogErrorMessage={localize(
          localizedStrings,
          '%webView_modelTextPanel_catalogUnavailable%',
        )}
        loadingLabel={localize(localizedStrings, '%webView_modelTextPanel_loading%')}
        emptyPrompt={localize(localizedStrings, '%webView_modelTextPanel_emptyState_prompt%')}
        pickLabel={localize(localizedStrings, '%webView_modelTextPanel_pickModelText%')}
        retryLabel={localize(localizedStrings, '%webView_modelTextPanel_retry%')}
        onPick={() => handlePickModelText()}
        onRetryCatalog={onRetryCatalog}
      />
    );
  }

  // Error state: the configured uid isn't in the DBL list at all. Reachable only once the catalog
  // has arrived, so this is now a fact rather than a guess.
  if (dblRef && match === undefined) {
    return notFoundState;
  }

  // Install failed: the resource is in the catalog but couldn't be installed. Offer a retry rather
  // than spinning forever. Retry re-attempts the same (admin or user) configured resource, so an
  // admin choice is recoverable too; a success drops out of this state on its own. When offline
  // (the usual first-run cause), hint at the connection.
  if (installFailed) {
    return (
      <RetryableErrorView
        message={localize(
          localizedStrings,
          isOnline
            ? '%webView_modelTextPanel_installFailed%'
            : '%webView_modelTextPanel_installFailedOffline%',
        )}
        retryLabel={localize(localizedStrings, '%webView_modelTextPanel_retry%')}
        onRetry={retryInstall}
      />
    );
  }

  // Installing: resource found but not yet installed. Distinguish the two causes so the label is
  // accurate: a user pick (isSelecting) reads "Selecting…", while an auto-install of a configured
  // resource (isInstalling) — where the user picked nothing and it's just downloading — reads
  // "Installing…".
  if (isSelecting || isInstalling) {
    return (
      <LoadingView
        label={localize(
          localizedStrings,
          isSelecting
            ? '%webView_modelTextPanel_selecting%'
            : '%webView_modelTextPanel_installing%',
        )}
      />
    );
  }

  // Unresolvable: a model text is configured but doesn't resolve to a displayable installed
  // resource (e.g. a non-DBL reference, or a DBL entry missing its id). Show the not-found state
  // rather than an endless spinner. By here resources have loaded and any matched-but-uninstalled
  // resource was handled above, so this is a terminal state.
  if (!resourceProjectId) {
    return notFoundState;
  }

  // The model text, or the reason there is none. These are the panel's CONTENT area only: the label
  // header stays mounted above all of them, including the spinner, so the message is attributed to a
  // named text rather than floating in an anonymous panel and does not blink away on every chapter
  // step. Unlike the Bible texts panel there is no in-panel selector to preserve — this panel
  // surfaces its picker only in the zero and not-found states — so this panel's message has to name
  // the remedy in words instead: a different model text, or a book this one covers.
  //
  // A blank chapter is one the model text HAS but with nothing in it. It is invisible to
  // `isBookMissing`, which keys off the fetch rejecting, so it needs its own check; the missing book
  // is tested first because it is the more specific claim. Without the blank-chapter arm the
  // read-only editor renders with nothing set and shows `Editorial`'s "enter some Scripture" prompt
  // — an edit invitation in a text the reader cannot edit.
  //
  // Only the editor gets `dir`. That is the RESOURCE's text direction, and the messages are app
  // chrome: inheriting it would lay a left-to-right UI string out right-to-left whenever the model
  // text is RTL.
  const renderContent = () => {
    if (isBookMissing)
      return (
        <div className="tw:flex-1 tw:overflow-auto">
          <ResourceBookNotAvailable
            message={localize(localizedStrings, '%webView_modelTextPanel_bookNotAvailable%')}
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

    // Nothing in hand for the reference on screen: either the fetch is still out, or it failed in a
    // way this panel has no message for. Keep waiting rather than mounting `Editorial` with nothing
    // set, which paints Lexical's "Enter some Scripture…" placeholder — an edit invitation in a text
    // the reader cannot edit.
    if (!isAnswerCurrent || isUsjLoading || usj === undefined)
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

  // Active: read-only editor showing the model text.
  // This panel is Simple-mode-only, so `editor-container-simple` (flattens .editor-container's
  // rounded top corners — see _simple-mode.scss) is applied unconditionally, unlike the
  // Scripture Editor's conditional use of the same class.
  return (
    <div className="tw:flex tw:h-screen tw:flex-col editor-container-simple">
      {modelTextLabel && (
        <TooltipProvider>
          <Tooltip open={isModelTextLabelTruncatedHovered}>
            <TooltipTrigger asChild>
              <div
                ref={modelTextLabelRef}
                onPointerEnter={onModelTextLabelPointerEnter}
                onPointerLeave={onModelTextLabelPointerLeave}
                // Keyboard/screen-reader users can't hover to trigger the tooltip, so make this
                // otherwise-non-interactive div focusable and reuse the same truncation-gated
                // handlers for focus/blur (they only measure ref.current and set state, so they
                // work regardless of which event triggered them). Matches the tooltip-trigger
                // pattern in platform-scripture-editor.web-view.tsx's structure-protection wrapper.
                onFocus={onModelTextLabelPointerEnter}
                onBlur={onModelTextLabelPointerLeave}
                // This div has no native interactive role, but it must be focusable so keyboard
                // users can reach it and trigger the tooltip via the onFocus handler above.
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
                aria-label={modelTextLabel}
                data-testid="model-text-header"
                // 42px total, matching Column 3's dock tab-bar OUTER height (the 36px active tab
                // plus its 6px --tab-header-to-content-gap) and the Scripture Editor's Simple-mode
                // toolbar override — all three rows' bottom edges need to land at the same Y, which
                // matching total row height achieves on its own. tw:items-center centers the text
                // symmetrically within the full 42px box (no extra top-only padding needed — see
                // _simple-mode.scss's .scripture-editor-tab-nav-simple comment for why that was
                // tried and reverted).
                //
                // tw:truncate + Tooltip: the column has a 300px minWidth (simple-layout.data.ts), and
                // "{fullName} ({displayName})" can exceed that at 300px — truncate to keep the fixed
                // 42px row height intact, with the full label available on hover/focus per the
                // Responsiveness guideline. useTruncationTooltip keeps the tooltip from firing when
                // the label already fits and tw:truncate has nothing to clip.
                className="tw:flex tw:h-[42px] tw:shrink-0 tw:items-center tw:truncate tw:border-b tw:border-border tw:px-3 tw:text-sm tw:font-semibold"
              >
                {modelTextLabel}
              </div>
            </TooltipTrigger>
            <TooltipContent>{modelTextLabel}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {renderContent()}
    </div>
  );
}

export default ModelTextPanel;
