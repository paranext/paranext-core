import { Editorial, EditorOptions, EditorRef } from '@eten-tech-foundation/platform-editor';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
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
  useViewVisibility,
} from 'platform-bible-react';
import {
  DblResourceData,
  getErrorMessage,
  isPlatformError,
  PlatformError,
  ResourceType,
} from 'platform-bible-utils';
import { ChevronDown } from 'lucide-react';
import { ComponentProps, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  hasNewScrollTarget,
  isEchoOfPublishedScrRef,
  SCROLL_MAX_WAIT_MS,
  scrollToVerse,
} from './editor-dom.util';
import { getRefLabel, getResourceReferenceRowId } from './resource-reference.utils';
import type { PickerResource } from './downloaded-resources.utils';
import type { ResourcePanelReadiness } from './resource-panel-readiness.utils';
import { PanelReadinessView } from './panel-readiness-view.component';
import {
  ExpandableInfo,
  LoadingView,
  PanelRetryableErrorView,
} from './panel-state-views.component';
import { ResourceBookNotAvailable } from './resource-book-not-available.component';
import { ResourceBlankChapter } from './resource-blank-chapter.component';
import { ResourceTextUnavailable } from './resource-text-unavailable.component';
import {
  isBlankChapterOnScreen,
  isMissingBookError,
  resolveResourceContentState,
} from './platform-scripture-editor.utils';
import { resolveResourcePanelStringKeys } from './resource-panel-strings.utils';
import type {
  ResourcePanelLocalizedStringKey,
  ResourcePanelLocalizedStrings,
} from './resource-text-panel.const';
import type { DblResourceInstallFailureReason } from './use-dbl-resource-auto-install.hook';

/**
 * Falls back to the key itself, matching the idiom in `model-text-panel.component.tsx`. Falling
 * back to `''` instead would render an empty message region — a blank panel, which is the exact
 * failure these messages exist to remove.
 */
const localize = (strings: ResourcePanelLocalizedStrings, key: ResourcePanelLocalizedStringKey) =>
  strings[key] ?? key;

/**
 * Identifies the wrapper around `Editorial`. The wrapper, not the editor, is what a message or
 * spinner replaces, so a test asserting that the text on screen was swapped for one of them has to
 * address this element.
 */
export const RESOURCE_TEXT_EDITOR_CONTAINER_TEST_ID = 'resource-text-editor-container';

/**
 * Identifies the content area's waiting state. `Spinner` is a bare `LoaderCircle` SVG with no role
 * and no accessible name, so without a handle here a test can only assert that the messages and the
 * editor are ABSENT — which a content area rendering nothing at all satisfies just as well.
 * Asserting the spinner is present is what makes "the panel is waiting" a falsifiable claim.
 */
export const RESOURCE_TEXT_WAITING_TEST_ID = 'resource-text-waiting';

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
   * The rows this panel offers, already filtered to `resourceType`. Filtering needs the panel's
   * union of referenced and locally-downloaded rows, which only the caller has.
   */
  filteredResources: PickerResource[];
  /**
   * The row being displayed, already resolved from the persisted selection — see
   * `resolveResourceSelection`. Resolved by the caller rather than here because the caller keys its
   * chapter subscription off this row's project id and feeds the result back in as
   * `usjPossiblyError`: deriving it on both sides would be two answers to one question.
   */
  selectedRef: PickerResource | undefined;
  /**
   * Which of the panel's front states to render, or `configured` to continue to the content
   * branches. Decided by the caller from whether its sources have ARRIVED — see
   * `getResourcePanelReadiness`, and the caller's promotion of `empty` once the downloaded rows are
   * in.
   */
  readiness: ResourcePanelReadiness;
  /** All DBL resources — used to label the selector rows. */
  dblResources: DblResourceData[];
  /** Re-runs the DBL resource catalog fetch. */
  onRetryCatalog: () => void;
  /** The reference the panel is displaying. */
  scrRef: SerializedVerseRef;
  /** Called when the editor changes the Scripture reference. */
  onScrRefChange: (scrRef: SerializedVerseRef) => void;
  /** Records a new selection by row id (see `getResourceReferenceRowId`). */
  onSelectResource: (id: string) => void;
  /**
   * The chapter read for `selectedRef`'s project, exactly as the data layer returned it — USJ, a
   * `PlatformError`, or `undefined` before anything has arrived. Which message that implies is
   * derived here rather than by the caller, so every consumer gets one answer.
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
   * Whether a user-initiated pick is in flight, which this panel renders as "Selecting…". Distinct
   * from `isInstalling`, where the user picked nothing and a configured resource is just
   * downloading.
   */
  isSelecting: boolean;
  /** Whether an auto-install of the selected resource is in flight. */
  isInstalling: boolean;
  /** Whether the last install attempt for the selected resource failed. */
  installFailed: boolean;
  /** Why the install failed, when it did. Decides whether the connection hint applies. */
  installFailureReason: DblResourceInstallFailureReason | undefined;
  /** Re-reads the catalog and re-attempts the same resource. */
  retryInstall: () => void;
  /** Whether the machine is online. Only adds a "check your connection" hint to install failures. */
  isOnline: boolean;
  /**
   * Ask the caller to open the resource picker and act on whatever the user chooses.
   * Fire-and-forget and argument-free: the whole pick — the ids to pre-select, the install, the
   * write, and the in-flight and unmount guards `useDialogCallback` already provides — belongs to
   * the caller, so this panel only reports that the affordance was activated.
   */
  onShowResourcePicker: () => void;
  /** Logger forwarded to the editor (the web view supplies the PAPI logger; tests may omit it). */
  logger?: ComponentProps<typeof Editorial>['logger'];
};

/**
 * Read-only panel that displays one referenced Scripture resource or commentary. It owns the render
 * and the content-state decisions — what a chapter read in hand means and which of the panel's
 * states is on screen. Changing which resource is shown is dispatched to the caller.
 *
 * Everything upstream of that arrives already resolved, and `selectedRef` is the load-bearing case:
 * the caller has to resolve it regardless, because that row's project id keys the chapter
 * subscription whose result comes back down here as `usjPossiblyError`. So the resolved row flows
 * down as a prop and this component MUST NOT re-derive it — a second derivation would be a second
 * answer to one question, free to disagree with the subscription that produced the content on
 * screen. Resolve it once, in the caller, and pass it (see `resolveResourceSelection`).
 *
 * This callback-out shape is the pattern to follow for a panel component, not merely one of two
 * in-tree options. `ModelTextPanelProps` takes `showResourcePicker` returning the chosen resource
 * plus the get/set/install callbacks, and owns the pick, the install and the write inside the
 * component; this panel takes an argument-free `onShowResourcePicker` and owns none of them.
 * Keeping that work in the caller is what keeps `@papi` out of this file — which is what makes the
 * component renderable from a test and a story at all, since neither can serve a PAPI call.
 * `ModelTextPanel` has not converged yet; see PT-4561, which already touches both panels.
 */
export function ResourceTextPanel({
  localizedStrings,
  hasProject,
  resourceType,
  filteredResources,
  selectedRef,
  readiness,
  dblResources,
  onRetryCatalog,
  scrRef,
  onScrRefChange,
  onSelectResource,
  usjPossiblyError,
  isUsjLoading,
  textDirection,
  isSelecting,
  isInstalling,
  installFailed,
  installFailureReason,
  retryInstall,
  isOnline,
  onShowResourcePicker,
  logger,
}: ResourceTextPanelProps) {
  // #region Content state

  const resourceProjectId = selectedRef?.projectId;

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
      onScrRefChange(newScrRef);
    },
    [onScrRefChange],
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

  // `contentState` and `isBlankChapter` are deps because the content-area branches below UNMOUNT
  // `Editorial` rather than hiding it. A remounted editor holds nothing, and this effect is its only
  // feed — so without re-running when the panel comes back to the editor, the reader gets Lexical's
  // "Enter some Scripture…" placeholder (an edit invitation in a text they cannot edit) until the
  // next USJ happens to arrive.
  //
  // TODO(PT-4517): These deps cover only the content-area branches. The four whole-panel early
  // returns below also unmount the editor — `!hasProject`, `readiness !== 'configured'`,
  // `installFailed`, `isSelecting || isInstalling` — and none of them is a dep here, so returning
  // from one with the USJ and content state unchanged remounts an editor this effect never re-feeds.
  // Picking the resource already on screen is the reachable case: `isSelecting` unmounts, the pick
  // resolves, and nothing in the deps moved.
  //
  // `ModelTextPanel`'s `tw:hidden` is NOT the fix to copy here: it covers only that panel's
  // content-area states — the half this dep list already handles — and it keeps six whole-panel
  // early returns of its own, fed by an effect keyed on the USJ alone. In those branches the editor
  // is not rendered in any form, so there is no element to hide.
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

  // Ahead of the readiness branch below, because a pick in flight outranks what the reference list
  // currently says. On a FIRST pick the list is still empty — the resource is not referenced until
  // `selectTextConnection` has installed it and the write has propagated back — so readiness is
  // `empty`, and testing readiness first would leave the reader on "no texts selected", with an
  // enabled pick button and no progress, for the whole download.
  //
  // Distinguish the two causes so the label is accurate: a user pick (isSelecting) reads
  // "Selecting…", while an auto-install of an already-configured resource (isInstalling) — where
  // the user picked nothing and it is just downloading — reads "Installing…".
  //
  // TODO(PT-4561): Fold this into `getResourcePanelReadiness` so branch order here is not a second
  // answer to "is this panel ready?", per `adr-panel-readiness-from-sources`. Ordering it here also
  // makes a pick in flight outrank an unreadable settings list, which that function's own precedence
  // argues against — PT-4561 decides that deliberately. `model-text-panel.component.tsx` still tests
  // readiness first and so has this same first-pick defect.
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

  // Front of the state machine: still resolving, unreadable setting, or genuinely nothing
  // configured. Driven by one readiness value so the empty prompt can only appear once emptiness is
  // actually known — the loading branch deliberately outlasts the catalog fetch when something is
  // configured.
  if (readiness !== 'configured') {
    return (
      <PanelReadinessView
        readiness={readiness}
        errorMessage={localize(localizedStrings, '%webView_resourcePanel_settingsUnavailable%')}
        emptyPrompt={localize(localizedStrings, emptyStatePromptKey)}
        moreInfo={
          // Only Bible Texts needs the disclosure; the Commentaries prompt says what it is asking
          // for, so it renders the shorter empty state.
          resourceType === 'ScriptureResource' ? (
            <ExpandableInfo
              moreLabel={localize(
                localizedStrings,
                '%webView_resourcePanel_bibleTexts_emptyState_moreInfo%',
              )}
              lessLabel={localize(
                localizedStrings,
                '%webView_resourcePanel_bibleTexts_emptyState_lessInfo%',
              )}
              body={localize(
                localizedStrings,
                '%webView_resourcePanel_bibleTexts_emptyState_moreInfo_body%',
              )}
            />
          ) : undefined
        }
        catalogErrorMessage={localize(
          localizedStrings,
          '%webView_resourcePanel_catalogUnavailable%',
        )}
        loadingLabel={localize(localizedStrings, '%webView_resourcePanel_loading%')}
        pickLabel={localize(localizedStrings, pickButtonKey)}
        retryLabel={localize(localizedStrings, '%webView_resourcePanel_retry%')}
        onPick={() => onShowResourcePicker()}
        onRetryCatalog={onRetryCatalog}
      />
    );
  }

  // Install failed: the selected resource is in the catalog but couldn't be installed. Offer a
  // retry rather than spinning forever; a success drops out of this state on its own. When offline
  // (the usual first-run cause), hint at the connection.
  if (installFailed) {
    return (
      <PanelRetryableErrorView
        message={localize(
          localizedStrings,
          // The connection hint only fits a download that actually failed. When the install
          // succeeded and the catalog simply has not caught up, the network is not the problem.
          isOnline || installFailureReason === 'listNotConverging'
            ? '%webView_resourcePanel_installFailed%'
            : '%webView_resourcePanel_installFailedOffline%',
        )}
        retryLabel={localize(localizedStrings, '%webView_resourcePanel_retry%')}
        onRetry={retryInstall}
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
        <div
          className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:p-8"
          data-testid={RESOURCE_TEXT_WAITING_TEST_ID}
        >
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
        <div
          className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:p-8"
          data-testid={RESOURCE_TEXT_WAITING_TEST_ID}
        >
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
        onSelectResource={onSelectResource}
        onShowResourcePicker={onShowResourcePicker}
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

export default ResourceTextPanel;
