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
} from 'platform-bible-react';
import {
  DblResourceData,
  getErrorMessage,
  isPlatformError,
  PlatformError,
  ResourceType,
} from 'platform-bible-utils';
import { ChevronDown } from 'lucide-react';
import { ComponentProps, useEffect, useMemo, useRef } from 'react';
import { getRefLabel, getResourceReferenceRowId } from './resource-reference.utils';
import type { PickerResource } from './downloaded-resources.utils';
import type { ResourcePanelReadiness } from './resource-panel-readiness.utils';
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
import { resolveResourcePanelStringKeys } from './resource-panel-strings.utils';
import type {
  ResourcePanelLocalizedStringKey,
  ResourcePanelLocalizedStrings,
} from './resource-text-panel.const';

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
  /** Clears the failed-install state and re-attempts the same resource. */
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
  // configured.
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
