import {
  AnnotationRange,
  defaultStyleInfo,
  DeltaOp,
  DeltaOpInsertNoteEmbed,
  DeltaSource,
  Editorial,
  EditorOptions,
  EditorRef,
  getEnterMenuItems,
  getMarkerMenuItems,
  GENERATOR_NOTE_CALLER,
  getDefaultViewOptions,
  getViewOptions,
  HIDDEN_NOTE_CALLER,
  isInsertEmbedOpOfType,
  MarkerMenuContext,
  MarkerMenuItem,
  PARAGRAPH_STRUCTURE_VIEW_MODE,
  SelectionRange,
  STANDARD_VIEW_MODE,
  StructureProtectionMode,
  StyleInfo,
  TypedMarkOnClick,
  TypedMarkOnRemove,
  TypedMarkRemovalCause,
  UsjNodeOptions,
  ViewOptions,
} from '@eten-tech-foundation/platform-editor';
import { Usj, USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import type { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  useData,
  useLocalizedStrings,
  useProjectData,
  useProjectDataProvider,
  useProjectSetting,
  useRecentScriptureRefs,
  useSetting,
} from '@papi/frontend/react';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import type { CommandHandlers, CommandNames } from 'papi-shared-types';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  BOOK_CHAPTER_CONTROL_STRING_KEYS,
  BookChapterControl,
  Button,
  COMMENT_EDITOR_STRING_KEYS,
  CommentEditor,
  DisabledActionTooltip,
  EditorKeyboardShortcuts,
  FOOTNOTE_EDITOR_STRING_KEYS,
  FootnoteEditor,
  type FootnoteEditorMarkerPalette,
  MarkdownRenderer,
  MARKER_MENU_STRING_KEYS,
  MarkerMenu,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  ScrollGroupSelector,
  SelectMenuItemHandler,
  SHRINK_STEP,
  Spinner,
  TabToolbar,
  ToolbarCompoundLabel,
  useShrinkStepValue,
  UNDO_REDO_BUTTONS_STRING_KEYS,
  UndoRedoButtons,
  isMacOs,
  usePromise,
} from 'platform-bible-react';
import {
  clearPaletteSessionIfCurrent,
  handleMarkerPaletteSessionKeyDown,
  type MarkerPaletteKeyEvent,
  type MarkerPaletteOpenSession,
  runMarkerPaletteSession,
} from 'platform-bible-react/experimental';
import {
  ABORTED,
  compareScrRefs,
  formatReplacementString,
  getErrorMessage,
  getLocalizeKeysForScrollGroupIds,
  isPlatformError,
  isString,
  isWhiteSpace,
  LocalizeKey,
  serialize,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  usfmMarkers,
  UsjReaderWriter,
} from 'platform-bible-utils';
import {
  BOOKS_PRESENT_DEFAULT,
  getBookIdsFromBooksPresent,
} from 'platform-bible-utils/experimental';
import {
  AnnotationActionHandler,
  EditorDecorations,
  EditorMessageSetAnnotation,
  EditorWebViewMessage,
  ScriptureEditorViewType,
  ScriptureRangeUsjVerseRefChapterLocation,
} from 'platform-scripture-editor';
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createHtmlPortalNode, InPortal, OutPortal } from 'react-reverse-portal';
import { ChevronDown } from 'lucide-react';
import { useAnnotationStyleSheet } from './annotations/use-annotation-stylesheet.hook';
import { useCommentaryMarkerStyles } from './use-commentary-marker-styles.hook';
import {
  StructureProtectionButton,
  STRUCTURE_PROTECTION_BUTTON_STRING_KEYS,
} from './structure-protection-button.component';
import { useMarkerSettleDelay } from './use-marker-settle-delay.hook';
import { useStructureProtectionState } from './use-structure-protection-state.hook';
import { EmptyChapterView, EMPTY_CHAPTER_VIEW_STRING_KEYS } from './empty-chapter-view.component';
import {
  BookNotAvailableView,
  BOOK_NOT_AVAILABLE_VIEW_STRING_KEYS,
  type ManageBooksDisabledReason,
} from './book-not-available-view.component';
import { ResourceBookNotAvailable } from './resource-book-not-available.component';
import {
  ShareLayoutButton,
  SHARE_LAYOUT_BUTTON_STRING_KEYS,
} from './share-layout-button.component';
import {
  getLocalizeKeysFromDecorations,
  mergeDecorations,
  removeDecorations,
} from './decorations.util';
import { runOnFirstLoad, scrollToAnnotation, scrollToVerse } from './editor-dom.util';
import { createFlushableDebouncer } from './flushable-debouncer.util';
import { performDebouncedPdpSave, resolveUsjToSaveToPdp } from './debounced-pdp-save.util';
import { withWriteInFlightGuard } from './write-in-flight-guard.util';
import { resolveFindSelectionText } from './find-trigger.util';
import { useOpenFindShortcut } from './use-open-find-shortcut.hook';
import { useSelectionSnapshot } from './use-selection-snapshot.hook';
import { useEditorPdpSync } from './use-editor-pdp-sync.hook';
import { useProjectStylesheet } from './use-project-stylesheet.hook';
import { FootnotesLayout } from './platform-scripture-editor-footnotes.component';
import {
  availableScrollGroupIds,
  blockMarkerToBlockNames,
  buildChapterScaffoldOps,
  canAddChapterNumber,
  correctEditorUsjVersion,
  decideNoteCallerClickAction,
  deepEqualAcrossIframes,
  formatEditorTitle,
  generateParagraphMenuListItems,
  getNextViewTypeInCycle,
  isChapterBlank,
  isMissingBookError,
  isMissingBookInfoOnScreen,
  isOverrunProjectIdParse,
  openCommentListAndSelectThreadSafe,
  parseMissingBookError,
  resolveAddChapterNumberClick,
  resolveViewTypeForInterfaceMode,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
  selectCommentThreadInPanelSafe,
} from './platform-scripture-editor.utils';
import { CHARACTER_MARKER_MENU_STRING_KEYS } from './character-marker-menu.utils';
import { CHARACTER_MARKER_CONTROL_STRING_KEYS } from './character-marker-control/character-marker-control.component';
import {
  generateInlineMarkerMenuListItems,
  getChapterKey,
  markerMenuItemsToResolvedPaletteItems,
  resolvePaletteItemStrings,
  parseCallerSequenceSetting,
  resolveEditingSessionActivity,
  resolveFootnotesPaneAutoVisibility,
  restoreSelectionIfLost,
  shouldSpaceCommitNoteMarker,
  STALE_NOTE_EDITING_SESSION_MS,
} from './platform-scripture-editor.web-view.utils';
import { useGuardedProjectSetting } from './use-guarded-project-setting.hook';
import { ParagraphMarkerTooltipOverlay } from './paragraph-marker-tooltip/paragraph-marker-tooltip-overlay.component';
import { TwoStepDeleteTooltipOverlay } from './two-step-delete-tooltip/two-step-delete-tooltip-overlay.component';
import { CharacterMarkerBarOverlay } from './character-marker-bar/character-marker-bar-overlay.component';
import { CharacterMarkerBar } from './character-marker-bar/character-marker-bar.component';
import { REMOVE_CHARACTER_MARKER_STRING_KEYS } from './character-marker-bar/use-remove-character-marker.hook';
import {
  commitVersionHistorySnapshot,
  notifySyncEditBlocked as sendSyncEditBlockedNotification,
  SYNC_EDIT_BLOCKED_KEY,
} from './editor-side-effects.utils';
import {
  SyncBlockedBanner,
  SYNC_BLOCKED_BANNER_STRING_KEYS,
} from './sync-blocked-banner.component';

/**
 * Pass-through wrapper for the editor inside {@link InPortal}. `react-reverse-portal`'s `InPortal`
 * clones its child with the props passed to `OutPortal` (always at least `node: undefined`), and
 * cloning a `Fragment` with any prop other than `key`/`children` makes React log an error. This
 * wrapper absorbs those props so `renderEditor` can keep returning a Fragment.
 */
function PortalContents({ children }: PropsWithChildren) {
  return children;
}

/**
 * Characters the paragraph-style trigger reserves for the USFM marker. UX set six, which fits the
 * long markers in ordinary use (`periph`). Must match the `tw:w-[6ch]` literal on the marker slot —
 * Tailwind cannot read this constant, so the two are kept in step by hand.
 */
const MARKER_SLOT_CHARACTERS = 6;

/**
 * Separator between the marker and its style name. Shared by the rendered label and the tooltip's
 * full text so the two can never disagree about how the label reads.
 */
const MARKER_STYLE_SEPARATOR = ' - ';

/**
 * Label for the paragraph-style trigger: the marker code, then the style name.
 *
 * A separate component rather than inline JSX because it reads `ShrinkStepContext`, which
 * `TabToolbarContainer` publishes. `PlatformScriptureEditor` _renders_ the `TabToolbar`, so a hook
 * call there would sit above the provider and read the widest step forever. This renders as the
 * toolbar's descendant, so it sees the real value.
 */
function ParagraphStyleLabel({
  blockMarker,
  styleName,
}: {
  blockMarker: string;
  /** Undefined until the localized strings resolve, and for any marker without a description. */
  styleName: string | undefined;
}) {
  const shrinkStep = useShrinkStepValue();
  // With no style name there is nothing to put beside the marker, so the label is already at its
  // shortest form — and `fullText` must not advertise a name it cannot show.
  const isAtMinimum = shrinkStep >= SHRINK_STEP.MINIMUM || !styleName;
  // A marker longer than the slot is cut without an ellipsis, and a clipped `restor` still reads as
  // a plausible marker — so declare the label partial and let the tooltip carry the real one.
  // `ToolbarCompoundLabel`'s own clip detection cannot see this: it watches the style name.
  const isMarkerClipped = blockMarker.length > MARKER_SLOT_CHARACTERS;

  return (
    <ToolbarCompoundLabel
      // A USFM marker is a code, so it reads as one — monospace, inheriting the row's foreground
      // rather than taking a marker colour.
      //
      // The slot is a fixed 6 characters at every step, not sized to the marker: monospace makes
      // `6ch` exactly six glyphs, which is the width UX asked for, and a content-sized slot would
      // resize the trigger as the cursor moved between a `p` and a `toc1`, shifting every button
      // after it. `overflow-hidden` keeps a longer marker inside the slot instead of pushing the
      // chevron out. Written as a literal because Tailwind extracts class names statically — an
      // interpolated `tw:w-[${n}ch]` would silently emit no rule at all.
      primary={
        // `inline-flex` + `items-center`, not `inline-block`. The slot is taller than its siblings
        // — a monospace line box against the row's proportional one — and an `inline-block` puts
        // its text at the top of that taller box, so centring the box on the row still leaves the
        // marker sitting visibly high next to the style name. A flex container centres its own
        // content instead, which removes the offset at the source rather than compensating for it.
        // The marker menu's rows have no fixed slot at all, which is why they never showed this.
        <span className="tw:inline-flex tw:w-[6ch] tw:items-center tw:overflow-hidden tw:font-mono">
          {blockMarker}
        </span>
      }
      secondary={styleName}
      separator={MARKER_STYLE_SEPARATOR}
      showSecondary={!isAtMinimum}
      isPartial={isMarkerClipped || (!!styleName && isAtMinimum)}
      fullText={styleName ? `${blockMarker}${MARKER_STYLE_SEPARATOR}${styleName}` : blockMarker}
      // A ceiling, not a width: long style names stop the trigger growing without bound, but the
      // label still shrinks below this.
      className="tw:max-w-[30ch]"
    />
  );
}

/**
 * Time in ms to delay taking action to wait for the editor to load. Hope to be obsoleted by a way
 * to listen for the editor to finish loading
 *
 * This is best used for when the editor is transitioning between loads. For the first time the
 * editor loads, use {@link runOnFirstLoad} instead
 */
const EDITOR_LOAD_DELAY_TIME = 200;

/**
 * Trailing-edge debounce for the keystroke-driven PDP save, in milliseconds. Chosen to kill the
 * per-keystroke echo storm while keeping the save close behind the typing; ballpark, not tuned. See
 * the `saveUsjToPdpDebounced` doc comment for the full rationale and the lifecycle flushes that
 * keep the trailing window from losing the final edits.
 */
const PDP_SAVE_DEBOUNCE_MS = 700;

const EDITOR_LOCALIZED_STRINGS: LocalizeKey[] = [
  ...COMMENT_EDITOR_STRING_KEYS,
  ...FOOTNOTE_EDITOR_STRING_KEYS,
  ...UNDO_REDO_BUTTONS_STRING_KEYS,
  ...MARKER_MENU_STRING_KEYS,
  ...STRUCTURE_PROTECTION_BUTTON_STRING_KEYS,
  ...EMPTY_CHAPTER_VIEW_STRING_KEYS,
  ...BOOK_NOT_AVAILABLE_VIEW_STRING_KEYS,
  ...SHARE_LAYOUT_BUTTON_STRING_KEYS,
  ...SYNC_BLOCKED_BANNER_STRING_KEYS,
  // Not read by this file. Loaded here so that whichever component mounts the character-marker menu
  // gets its remove row localized through the `localizedStrings` this web view already resolves.
  ...CHARACTER_MARKER_MENU_STRING_KEYS,
  // Not read by this file either. Consumed by CharacterMarkerControl, which the character-marker
  // bar mounts. Preloaded here because the web view owns the key list; resolving these extra keys
  // in Power mode, where the bar never renders, costs nothing.
  ...CHARACTER_MARKER_CONTROL_STRING_KEYS,
  // Consumed by the character-marker bar's removal action, which this file does not
  // call directly.
  ...REMOVE_CHARACTER_MARKER_STRING_KEYS,
  // Read only by the BookChapterControl this web view mounts in Power mode — its section headings,
  // recent-searches labels, and the show-more-books/not-in-project strings that appear once a
  // book outside this project is reachable.
  ...BOOK_CHAPTER_CONTROL_STRING_KEYS,
  ...Object.values(blockMarkerToBlockNames),
  ...Object.entries(usfmMarkers)
    .map((item) => item[1].description)
    .filter((item) => !!item),
  // Resolved into the marker-palette items at construction time (the close-tag badge) so palette
  // requests carry no unresolved keys — see `markerMenuItemsToResolvedPaletteItems`.
  '%markerMenu_endTag_label%',
  '%paragraphMenu_misc_markerDescription%',
  '%versionHistoryCommit_beforeInsertFootnote%',
  '%versionHistoryCommit_beforeInsertCrossReference%',
  '%webView_platformScriptureEditor_error_bookNotFoundResource%',
  '%webView_platformScriptureEditor_emptyState_noProject%',
  '%webView_platformScriptureEditor_error_permissions_format%',
  // The one listing of this key. Named via the const so the sync-blocked message, its severity, and
  // its self-catching stay in one place (`editor-side-effects.utils.ts`) — the character-marker
  // bar's removal action shows the same notice through the same helper and deliberately does not
  // re-list the key.
  SYNC_EDIT_BLOCKED_KEY,
  '%webView_platformScriptureEditor_error_noTextSelected%',
  '%webView_platformScriptureEditor_error_selectionContainsMarkers%',
  '%webView_platformScriptureEditor_paragraphSelection_protectedTooltip%',
  '%webView_platformScriptureEditor_insertCommentAtSelection%',
  '%webView_platformScriptureEditor_insertFootnoteAtSelection%',
  '%webView_platformScriptureEditor_insertCrossReferenceAtSelection%',
];

/** Annotation type used for translator comments (kebab-case to match CSS class naming) */
const ANNOTATION_TYPE_TRANSLATOR_COMMENT = 'translator-comment';

/** Annotation ID used for a pending comment that hasn't been saved yet */
const PENDING_COMMENT_ANNOTATION_ID = 'pending-comment';

/** Prefix the editor puts on annotation type when calling the annotation's callbacks */
const EDITOR_ANNOTATION_TYPE_PREFIX = 'external-';

const DEFAULT_WEBVIEW_MENU = {
  topMenu: undefined,
  includeDefaults: true,
  contextMenu: undefined,
};

const scrollGroupLocalizedStringKeys = getLocalizeKeysForScrollGroupIds(availableScrollGroupIds);

/**
 * Extracts scripture text snippets from a selection range.
 *
 * @param selection The selection range from the editor
 * @param editorUsj The USJ document from the editor
 * @param bookId The book ID (e.g., "GEN")
 * @returns The extracted scripture text or undefined if extraction failed
 */
// scripture text extraction now handled by legacyCommentManager.createCommentUsj

const defaultUsj: Usj = correctEditorUsjVersion({
  type: USJ_TYPE,
  version: USJ_VERSION,
  content: [],
});

const defaultEditorDecorations: EditorDecorations = {};

const defaultProjectName = '';

/**
 * Special value we use internally to check if formatting the title produces a different value that
 * should be set on the web view definition
 */
const NO_UPDATE_TITLE = '__do_not_update_title_not_for_use__';

/**
 * Sentinel that is never a real {@link ScriptureEditorViewType}, used as the `defaultValue` in a
 * one-off `globalThis.getWebViewState('viewType', ...)` probe (see the
 * `hadPersistedViewTypeAtMount` computation below) to detect whether `viewType` was ever explicitly
 * persisted for this web view.
 */
const VIEW_TYPE_UNSET = '__view_type_unset_not_a_real_view_type__';

const defaultTextDirection = 'ltr';

const defaultMarkersMenuTrigger = '\\';

/**
 * Logs a marker-palette open failure, EXCEPT the routine one: a newer palette request replacing an
 * older one rejects the older show promise with `ABORTED`, which the `\` reopen flow does on every
 * keystroke that commits and reopens.
 *
 * Everything else reaching a palette `.catch` means the palette did not open at all — the request
 * failed validation (too many items for a large project stylesheet, a malformed anchor), or the web
 * view was not visible. Without this the palette silently does nothing and there is no record of
 * why.
 */
function warnUnlessReplaced(paletteDescription: string, error: unknown): void {
  if (isPlatformError(error) && error.code === ABORTED) return;
  logger.warn(
    `platform-scripture-editor: the ${paletteDescription} did not open: ${getErrorMessage(error)}`,
  );
}

/**
 * The marker-menu context plus the caret/selection anchor rect returned by
 * `EditorRef.getMarkerMenuContext`. Anchor coordinates are iframe-relative by contract, so they can
 * be passed straight through to `papi.overlays.showCommandPalette`'s `anchor` option.
 */
type MarkerMenuAnchorContext = MarkerMenuContext & {
  anchorRect?: { x: number; y: number; width: number; height: number };
};

// Return the appropriate ViewOptions for the given webview `viewType`.
// Centralizes the logic so initialization and effects can call the same helper
// instead of duplicating the shallow-copy code.
const getViewOptionsForType = (
  viewType: ScriptureEditorViewType,
  isPowerMode: boolean,
): ViewOptions => {
  if (viewType === 'standard') {
    return getViewOptions(STANDARD_VIEW_MODE) ?? getDefaultViewOptions();
  }
  // Power users get to choose their own view options, so don't force the paragraph-structure
  // preset on them. The markers tweaks below predate this and are required to keep the read-only
  // markers view working.
  if (isPowerMode) {
    const base = getDefaultViewOptions();
    if (viewType === 'markers') return { ...base, markerMode: 'visible', noteMode: 'expanded' };
    return base;
  }
  const paragraphStructure =
    getViewOptions(PARAGRAPH_STRUCTURE_VIEW_MODE) ?? getDefaultViewOptions();
  if (viewType === 'markers') return { ...paragraphStructure, noteMode: 'expanded' };
  return paragraphStructure;
};

// This regex is connected directly to the exception message within PermissionsException.cs
const PERMISSIONS_EXCEPTION_REGEX = /Permissions exception for projectId/;

// Sentinel appended by the backend write-gate (SendReceiveWriteLock in paranext-core's c-sharp)
// when a project write is rejected because an automatic Send/Receive is syncing that project.
const SYNC_EDIT_BLOCKED_REGEX = /\(SR_EDIT_BLOCKED\)/;

globalThis.webViewComponent = function PlatformScriptureEditor({
  id: webViewId,
  projectId,
  title,
  useWebViewState,
  useWebViewScrollGroupScrRef,
  updateWebViewDefinition,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => EDITOR_LOCALIZED_STRINGS, []));
  const [scrollGroupLocalizedStrings] = useLocalizedStrings(scrollGroupLocalizedStringKeys);

  // These control the placement of the footnote editor popover by setting the location of the anchor
  const [showFootnoteEditor, setShowFootnoteEditor] = useState<boolean>(false);
  const [notePopoverAnchorX, setNotePopoverAnchorX] = useState<number>();
  const [notePopoverAnchorY, setNotePopoverAnchorY] = useState<number>();
  const [notePopoverAnchorHeight, setNotePopoverAnchorHeight] = useState<number>();

  /**
   * Mirror of {@link showFootnoteEditor} readable from the stable `noteCallerOnClick` closure: an
   * editing-session key whose popover is NOT actually shown is stale bookkeeping and must not
   * dead-end caller clicks.
   */
  const showFootnoteEditorRef = useRef(showFootnoteEditor);
  useEffect(() => {
    showFootnoteEditorRef.current = showFootnoteEditor;
  }, [showFootnoteEditor]);

  const editingNoteKey = useRef<string | undefined>(undefined);
  const editingNoteOps = useRef<DeltaOpInsertNoteEmbed[] | undefined>(undefined);
  /** True when the footnote editor was opened for a newly inserted note (not an existing one) */
  const editingNoteIsNew = useRef(false);
  /**
   * `Date.now()` when the {@link editingNoteKey} session was opened, last edited in, or last saved
   * from (`undefined` while no session is open). The PDP-sync deferral consults it through
   * `resolveEditingSessionActivity`: a session older than `STALE_NOTE_EDITING_SESSION_MS` with no
   * interaction is treated as an orphaned key (a popover that died without cleanup) rather than a
   * live edit, so it stops holding incoming PDP updates at bay. Refreshed on every user edit inside
   * the popover (`FootnoteEditor`'s `onNoteEdit` — see `onFootnoteEditorNoteEdit`) and on every
   * save from the popover (the note-editing branch of `handleEditorialUsjChange`), so a live long
   * edit never trips the bound.
   */
  const editingNoteSessionRefreshedAt = useRef<number | undefined>(undefined);

  // These control the placement of the comment editor popover by setting the location of the anchor
  const [showCommentEditor, setShowCommentEditor] = useState<boolean>(false);
  /** Remembers the last assignee chosen so the next new comment pre-selects the same user */
  const [lastAssignedUser, setLastAssignedUser] = useState<string | undefined>();
  const [commentPopoverAnchorX, setCommentPopoverAnchorX] = useState<number>();
  const [commentPopoverAnchorY, setCommentPopoverAnchorY] = useState<number>();
  const [commentPopoverAnchorHeight, setCommentPopoverAnchorHeight] = useState<number>();

  // These control the placement of the inline markers menu by setting the location of the anchor
  const [showMarkersMenu, setShowMarkersMenu] = useState<boolean>(false);
  const [markersMenuAnchorX, setMarkersMenuAnchorX] = useState<number>();
  const [markersMenuAnchorY, setMarkersMenuAnchorY] = useState<number>();
  const [markersMenuAnchorHeight, setMarkersMenuAnchorHeight] = useState<number>();

  // The refs needs to start out with null for it to work as a element ref
  // eslint-disable-next-line no-null/no-null
  const markerMenuSearchRef = useRef<HTMLInputElement>(null);
  // The refs needs to start out with null for it to work as a element ref
  // eslint-disable-next-line no-null/no-null
  const editorContainerRef = useRef<HTMLDivElement>(null);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockMarker, setBlockMarker] = useState<string | undefined>();
  const [contextMarker, setContextMarker] = useState<string | undefined>();

  const isMac = isMacOs();

  /**
   * Stores the annotation range for the pending comment being created. This is captured when the
   * user initiates comment creation and used to create the annotation highlight and to extract
   * selection info when saving the comment.
   */
  const pendingCommentAnnotationRange = useRef<
    { range: AnnotationRange; verseRef: SerializedVerseRef } | undefined
  >(undefined);

  /** Map from annotationId -> info about the annotation that we need to keep to perform some actions */
  const annotationInfoByIdRef = useRef<
    Map<
      string,
      Pick<EditorMessageSetAnnotation, 'annotationType' | 'interactionCommand' | 'annotationRange'>
    >
  >(new Map());

  /** Function to run to clear all annotation info when the editor clears all annotation info */
  const clearAnnotationInfo = useRef(() => {
    annotationInfoByIdRef.current.clear();
  });

  /**
   * Set of annotation IDs that are currently being set - used to prevent removing annotations while
   * they are being updated
   */
  const annotationIdsBeingSet = useRef<Set<string>>(new Set());

  /** Stores the current editor selection, updated on every selection change. */
  const currentSelectionRef = useRef<SelectionRange | undefined>(undefined);

  /** Reads the current editor selection. A ref read has no dependencies. */
  const getSelection = useCallback(() => currentSelectionRef.current, []);

  /**
   * Last live selection of the main editor, captured as focus left it (the focusout listener effect
   * below). A palette mouse click steals focus BEFORE the commit round-trips, and Lexical's blur
   * processing can null the live selection outright; the palette commit paths restore this capture
   * (via {@link restoreSelectionIfLost}) so the apply still lands at the caret the user last saw.
   * Not merged into `currentSelectionRef` above: that ref mirrors every selection-change event
   * INCLUDING the blur-path nulling this capture must survive.
   */
  const lastFocusOutSelectionRef = useRef<SelectionRange | undefined>(undefined);

  /**
   * Session state for a standard-view marker-menu palette while it's open (single owner: the
   * keydown flow in the effect below). Every kind is ACTIVE: the trigger is claimed and never
   * lands, and typed characters are claimed by the while-open forwarding table and routed into the
   * palette's query — never the document.
   *
   * `'backslash'` is the collapsed-caret `\` trigger's session. Its palette keeps the overlay's
   * non-focus-stealing (`passive: true`) DISPLAY — the caret stays visible in the editor — so the
   * forwarding table is the palette's only key path, not a safety net. The selection-wrap `\`
   * trigger opens a _focused_ palette tracked as `'selection'`.
   *
   * `'enter'` only guards against a second Enter re-opening a palette while the first request's
   * round-trip to the overlay service is still in flight — its palette is always focused too. It
   * and `'selection'` also carry the capture-phase forwarding table as a SAFETY NET: focused
   * palettes are designed to be driven by the renderer overlay's own input, but the cross-frame
   * focus handoff can lose (the editor iframe re-grabs focus on Lexical commits), and without the
   * safety net the keystrokes then hit the document instead — typing REPLACED the wrapped selection
   * and Escape fell through to Lexical.
   *
   * `token` (allocated from the monotonic counter below) identifies which session an async
   * show-promise settlement belongs to, so a stale promise's cleanup can only clear its own
   * session, never a newer one (see `clearPaletteSessionIfCurrent`).
   */
  const paletteSession = useRef<
    | MarkerPaletteOpenSession<MarkerMenuItem>
    | { kind: 'enter'; token: number; filter: string; items: MarkerMenuItem[] }
    | undefined
  >(undefined);

  /** Monotonic allocator for {@link paletteSession} tokens. */
  const paletteSessionCounter = useRef(0);

  const [isReadOnly] = useWebViewState<boolean>('isReadOnly', true);
  // Set by the core auto-sync edit-block driver while an automatic (scheduled) Send/Receive is
  // syncing this project: editing is frozen (folded into isReadOnlyEffective below) and a slim
  // banner is shown, but the rest of the UI stays usable. Always defaults false; the web-view
  // factory forces it back to false when rebuilding saved state so a crash mid-sync can't persist
  // it (see main.ts).
  const [isSyncBlocked] = useWebViewState<boolean>('isSyncBlocked', false);
  const [decorations, setDecorations] = useWebViewState<EditorDecorations>(
    'decorations',
    defaultEditorDecorations,
  );

  // `platform.interfaceMode` is read here (rather than down by its other consumers, `bcvControls`
  // etc.) because the `viewType` state below needs `isPowerMode` for its default value.
  const [interfaceModePossiblyError, , , isInterfaceModeLoading] = useSetting(
    'platform.interfaceMode',
    'simple',
  );

  const isPowerMode = useMemo(() => {
    if (isPlatformError(interfaceModePossiblyError)) {
      logger.warn(`Error getting interface mode: ${getErrorMessage(interfaceModePossiblyError)}`);
      return false;
    }
    return interfaceModePossiblyError === 'power';
  }, [interfaceModePossiblyError]);

  /**
   * Whether `viewType` was already explicitly persisted for this web view when it mounted (as
   * opposed to only ever having been the `useWebViewState` default below). Computed once via a lazy
   * `useState` initializer, mirroring how `useWebViewState`'s own local state is seeded once at
   * mount (see `use-web-view-state.hook.ts`): only an explicit `setViewType` call persists a value,
   * so a `false` here means this web view had no real choice saved as of mount.
   *
   * We need this because `useSetting`'s `isLoading` starts `true` on every mount (see
   * `create-use-data-hook.util.ts`), so `isPowerMode` is guaranteed `false` on this component's
   * very first render regardless of the real, eventually-resolved setting value. `useWebViewState`
   * captures its default into local state via a lazy initializer that runs only once, so a stale
   * 'formatted' default captured on that first render will not self-correct once `isPowerMode`
   * later resolves `true` -- it would otherwise be stuck at 'formatted' for the life of this
   * webview instance. The correction effect below uses this flag only as a fast-path short-circuit;
   * because it is a mount-time snapshot that can go stale (the user could persist a choice between
   * mount and `platform.interfaceMode` resolving), the effect re-probes the store fresh at fire
   * time and that fresh probe is the decider.
   */
  const [hadPersistedViewTypeAtMount] = useState(
    () => globalThis.getWebViewState('viewType', VIEW_TYPE_UNSET) !== VIEW_TYPE_UNSET,
  );

  const [persistedViewType, setViewType] = useWebViewState<ScriptureEditorViewType>(
    'viewType',
    // Saved-state views never flip -- `useWebViewState` only reads this default when nothing is
    // persisted yet. A first-ever-open power-mode view may still render one or more frames as
    // 'formatted' before `platform.interfaceMode` resolves (see evidence above); the effect below
    // corrects that once resolution completes, without ever touching a saved value.
    isPowerMode ? 'standard' : 'formatted',
  );

  /**
   * One-shot guard for the correction effect below, so it only ever applies the power-mode default
   * once per webview instance -- even if `platform.interfaceMode` (an app-wide setting a user could
   * toggle repeatedly while this webview stays open) flips power mode on, off, and on again later,
   * we must never re-clobber a view type the user has since chosen (e.g. via
   * `changeScriptureView`).
   */
  const hasAppliedInitialPowerDefaultRef = useRef(false);

  useEffect(() => {
    // Only ever correct a fresh (never-saved) view, and only once, and only when power mode is
    // confirmed (not merely the not-yet-loaded default).
    if (hasAppliedInitialPowerDefaultRef.current) return;
    if (hadPersistedViewTypeAtMount) return;
    if (isInterfaceModeLoading) return;
    if (!isPowerMode) return;
    // Re-probe the store fresh at fire time -- the mount snapshot above is only a fast path. The
    // user could have persisted a genuine choice (e.g. `changeScriptureView`; `setViewType`
    // persists synchronously) in the window between mount and `platform.interfaceMode`
    // resolving, and that choice must win over the power-mode default.
    if (globalThis.getWebViewState('viewType', VIEW_TYPE_UNSET) !== VIEW_TYPE_UNSET) {
      hasAppliedInitialPowerDefaultRef.current = true;
      return;
    }
    hasAppliedInitialPowerDefaultRef.current = true;
    // This write is intentionally sticky: it persists 'standard', so future reloads of this web
    // view see a persisted value and skip this whole correction dance.
    setViewType('standard');
  }, [hadPersistedViewTypeAtMount, isInterfaceModeLoading, isPowerMode, setViewType]);

  // Standard view must never be shown in simple mode: simple mode pairs with structure
  // protection, which intentionally blocks the paragraph-marker edits standard view's editing
  // affordances are built around (see `resolveViewTypeForInterfaceMode`). This covers both a
  // 'standard' persisted during a power-mode session loading while the app is in simple mode and
  // a live `platform.interfaceMode` flip to simple while this standard-view web view is open.
  // The coercion is DERIVED for display, never written back: persisting it would destroy the
  // user's choice permanently — flipping back to power mode could not restore it, because the
  // one-shot power-default correction above is gated on `hadPersistedViewTypeAtMount` and its
  // fresh re-probe would then find the persisted 'formatted'. Every consumer below reads this
  // effective value; only an explicit user action (`setViewType` via cycling or
  // `changeScriptureView`) writes the store. Waits for `platform.interfaceMode` to resolve
  // because `isPowerMode` is always `false` while the setting loads — coercing then would hide a
  // power user's persisted standard view on every mount's first frames.
  const viewType = isInterfaceModeLoading
    ? persistedViewType
    : resolveViewTypeForInterfaceMode(persistedViewType, isPowerMode);

  const [unformattedTitle] = useWebViewState<string | undefined>(
    'unformattedTitle',
    NO_UPDATE_TITLE,
  );

  const [scrRef, setScrRefWithScroll, scrollGroupId, setScrollGroupId] =
    useWebViewScrollGroupScrRef();

  const [projectNamePossiblyError] = useProjectSetting(
    projectId,
    'platform.name',
    defaultProjectName,
  );

  const projectName = useMemo(() => {
    if (isPlatformError(projectNamePossiblyError)) {
      logger.warn(`Error getting project name: ${getErrorMessage(projectNamePossiblyError)}`);
      return defaultProjectName;
    }
    return projectNamePossiblyError;
  }, [projectNamePossiblyError]);

  const [textDirectionPossiblyError] = useProjectSetting(
    projectId,
    'platform.textDirection',
    defaultTextDirection,
  );

  const textDirection = useMemo(() => {
    if (isPlatformError(textDirectionPossiblyError)) {
      logger.warn(`Error getting is right to left: ${getErrorMessage(textDirectionPossiblyError)}`);
      return defaultTextDirection;
    }

    // Using || to make sure we get default if it is an empty string or if it is undefined
    return textDirectionPossiblyError || defaultTextDirection;
  }, [textDirectionPossiblyError]);

  // The next two reactive signals gate whether the Scripture Editor is writable: whether the
  // project itself is editable (`platform.isEditable`) and whether the current user has a
  // non-Observer Scripture-edit role. Both fail OPEN below (return `true`, i.e. don't block
  // editing) on a read error, because these are LIVE signals that self-correct on the next
  // successful PAPI update — unlike the one-shot `CanUserEditScripture()` C# method and its
  // `pdp.canUserEditScripture()` TS caller in this extension's utils.ts (used for the
  // non-recoverable, one-time default-project-picker decision), which both fail closed instead.
  const [isProjectEditablePossiblyError, , , isProjectEditableLoading] = useProjectSetting(
    projectId,
    'platform.isEditable',
    true,
  );

  const isProjectEditable = useMemo(() => {
    if (isPlatformError(isProjectEditablePossiblyError)) {
      logger.warn(
        `Error getting project editable setting: ${getErrorMessage(isProjectEditablePossiblyError)}`,
      );
      // Fail open — see comment above.
      return true;
    }
    return isProjectEditablePossiblyError;
  }, [isProjectEditablePossiblyError]);

  const [canUserEditScripturePossiblyError, , canUserEditScriptureLoading] = useProjectData(
    'platformScripture.scriptureEditPermissions',
    projectId,
  ).CanUserEditScripture(undefined, true);

  const canUserEditScripture = useMemo(() => {
    if (isPlatformError(canUserEditScripturePossiblyError)) {
      logger.warn(
        `Error getting Scripture edit permission: ${getErrorMessage(canUserEditScripturePossiblyError)}`,
      );
      // Fail open — see comment above.
      return true;
    }
    return canUserEditScripturePossiblyError;
  }, [canUserEditScripturePossiblyError]);

  // `canUserEditScriptureLoading` above can never become `false` for a project whose PDP doesn't
  // advertise `platformScripture.scriptureEditPermissions`: no subscription is ever created, so the
  // hook's `isLoading` latches `true` forever (a `usePromise`/`useProjectDataProvider` limitation —
  // `usePromise` has no rejection handling at all — not specific to this data type). Independently
  // check whether the project actually supports the interface so "still resolving" can be told apart
  // from "will never resolve", instead of treating the latter as a permanent loading state.
  const checkScriptureEditPermissionsSupported = useCallback(async () => {
    // No `projectId` means no project to check support for — and, like the catch below,
    // `canUserEditScriptureLoading` can be permanently stuck in this case too (no `projectId` means
    // no PDP source, so no subscription ever fires). Don't feed that back into "still resolving".
    if (!projectId) return false;
    try {
      const matchingMetadata = await papi.projectLookup.getMetadataForAllProjects({
        includeProjectIds: projectId,
        includeProjectInterfaces: ['platformScripture.scriptureEditPermissions'],
      });
      return matchingMetadata.length > 0;
    } catch (e) {
      logger.warn(`Error checking Scripture edit permissions support: ${getErrorMessage(e)}`);
      // Stop waiting rather than assume supported: returning `true` here would fall back to
      // trusting `canUserEditScriptureLoading` directly — the exact signal this check exists to
      // work around, which can be the same permanently-stuck state. This promise never rejects
      // (we catch our own errors), so `usePromise` always resolves it promptly either way;
      // returning `false` falls through to `canUserEditScripture`'s own fail-open default and
      // self-corrects if the underlying subscription later resolves on its own.
      return false;
    }
  }, [projectId]);
  const [isScriptureEditPermissionsSupported] = usePromise(
    checkScriptureEditPermissionsSupported,
    true,
  );

  // Whether `canUserEditScripture` is genuinely still resolving, as opposed to latched because the
  // project will never advertise the interface (see comment above).
  const isCanUserEditScriptureUnresolved =
    canUserEditScriptureLoading && isScriptureEditPermissionsSupported;

  const textDirectionEffective = useMemo(() => {
    // OHEBGRK is a special case where we want to show the OT in RTL but the NT in LTR
    if (projectName === 'OHEBGRK')
      if (Canon.isBookOT(scrRef.book)) return 'rtl';
      else return 'ltr';

    return textDirection;
  }, [projectName, scrRef, textDirection]);

  const commentsPdp = useProjectDataProvider('legacyCommentManager.comments', projectId);

  // Pre-fetch this project's verse counts for the current book so the BookChapterControl can offer
  // verse selection. When the book changes we refetch; for books other than the current one we do
  // not offer verse selection (the picker falls back to chapter-level submission).
  const currentBookNum = useMemo(() => Canon.bookIdToNumber(scrRef.book), [scrRef.book]);

  // Project stylesheet-derived style info for the current book; feeds
  // `generateUsjCss` via `useProjectStylesheet` below and `EditorOptions.styleInfo`.
  // Disabled (undefined source, the hook's no-subscription state) while `currentBookNum` is not a
  // real book: an unrecognized book id resolves to 0, which the backend rejects, so an enabled
  // subscription delivered nothing but PlatformErrors — same guard as the versification fetch
  // below.
  const [styleInfoPossiblyError] = useProjectData(
    'platformScripture.StyleInfo',
    currentBookNum > 0 ? (projectId ?? undefined) : undefined,
  ).StyleInfo(currentBookNum, undefined);
  const styleInfo = useMemo<StyleInfo | undefined>(() => {
    if (isPlatformError(styleInfoPossiblyError)) {
      logger.warn(`Error getting style info: ${getErrorMessage(styleInfoPossiblyError)}`);
      return undefined;
    }
    return styleInfoPossiblyError;
  }, [styleInfoPossiblyError]);

  const versificationPdp = useProjectDataProvider('platformScripture.Versification', projectId);
  const fetchLastVersesInCurrentBook = useCallback(async (): Promise<number[] | undefined> => {
    if (!versificationPdp || currentBookNum <= 0) return undefined;
    try {
      return await versificationPdp.getFinalVerseNumbersInBook(currentBookNum);
    } catch (err) {
      logger.debug(
        `Failed to fetch verse counts for book ${currentBookNum}: ${getErrorMessage(err)}`,
      );
      return undefined;
    }
  }, [versificationPdp, currentBookNum]);
  // `preserveValue: false` clears the value the instant `currentBookNum` changes (rather than
  // waiting for the new book's fetch to resolve). Without this, `usePromise`'s default of
  // preserving the previous value would let `getEndVerse` briefly return the OLD book's verse
  // counts for the NEW book — `currentBookNum` updates synchronously with `scrRef.book`, but this
  // array would otherwise lag behind until the refetch lands, and a click during that window would
  // scaffold the wrong number of `\v` markers.
  const [lastVersesInCurrentBook] = usePromise(fetchLastVersesInCurrentBook, undefined, {
    preserveValue: false,
  });
  const getEndVerse = useCallback(
    (bookId: string, chapterNum: number): number => {
      // Only serve verse counts for the current book. Other books (e.g. when the user types a
      // different reference into the search input) would require their own fetch/cache; returning
      // 0 here makes the control skip the verse grid for them.
      if (Canon.bookIdToNumber(bookId) !== currentBookNum) return 0;
      return lastVersesInCurrentBook?.[chapterNum] ?? 0;
    },
    [currentBookNum, lastVersesInCurrentBook],
  );

  const fetchAssignableUsers = useCallback(async () => {
    if (!commentsPdp) {
      logger.debug('Comments PDP is not yet available for fetchAssignableUsers');
      return [];
    }
    return commentsPdp.findAssignableUsers();
  }, [commentsPdp]);
  const [commentEditorAssignableUsers] = usePromise(fetchAssignableUsers, []);

  const fetchCanUserCreateComments = useCallback(async () => {
    if (!commentsPdp) return false;
    return commentsPdp.canUserCreateComments();
  }, [commentsPdp]);
  const [canUserCreateComments] = usePromise(fetchCanUserCreateComments, false);

  // Using react's ref api which uses null, so we must use null
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);

  /**
   * Ends the open marker-palette session the way the keydown table's Escape branch does — clear the
   * session and dismiss the overlay.
   *
   * Only navigation needs this. Clicking or pressing Escape anywhere in the app window, including
   * inside this iframe, is handled without the web view: the main process announces the gesture and
   * the overlay service dismisses the palette, which resolves the show promise whose `.then` clears
   * the session. Under the ACTIVE palette nothing of the session's is in the document (the trigger
   * and every filter character were claimed), so a dismissal leaves the document untouched — no
   * transient-input declaration is needed anywhere in this flow anymore.
   */
  const dismissPaletteSessionIfOpen = useCallback(() => {
    if (!paletteSession.current) return;
    paletteSession.current = undefined;
    papi.overlays.dismissCommandPalette(webViewId).catch((error) => {
      logger.warn(`Error dismissing marker palette: ${getErrorMessage(error)}`);
    });
  }, [webViewId]);

  // Book/chapter navigation replaces the document the palette was typing into, and it can arrive
  // with no input gesture in this window at all (a scroll group update driven from elsewhere), so
  // the app-wide click/Escape dismissal cannot cover it. Keyed on book/chapter only: verse-level
  // scrRef changes ride along with ordinary caret movement inside the loaded chapter.
  useEffect(() => {
    dismissPaletteSessionIfOpen();
  }, [scrRef.book, scrRef.chapterNum, dismissPaletteSessionIfOpen]);

  // #region Footnotes Pane State

  const [footnotesPaneVisible, setFootnotesPaneVisible] = useWebViewState<boolean>(
    'footnotesPaneVisible',
    false,
  );

  const footnotesPaneVisibleRef = useRef(footnotesPaneVisible);

  useEffect(() => {
    footnotesPaneVisibleRef.current = footnotesPaneVisible;
  }, [footnotesPaneVisible]);

  /**
   * Whether the footnotes pane is ACTUALLY rendered — `footnotesPaneVisible && usjFromPdp`, not the
   * visibility toggle alone (a caller click routed to a pane that is not really rendered is a dead
   * click). Mirrors the single `footnotesPaneRendered` value (derived next to the `usjFromPdp`
   * derivation) that also gates the `FootnotesLayout` render, so the click routing and the render
   * gate cannot drift apart.
   */
  const footnotesPaneRenderedRef = useRef(false);

  /**
   * Requests that the footnotes pane select/highlight a given note index, mirroring a real pane-row
   * click. Set by `nodeOptions.noteCallerOnClick` when a collapsed note caller is clicked while the
   * pane is visible (PT9 navigate-to-note). Ephemeral UI state — not persisted via
   * `useWebViewState` since it only needs to survive the current session, not a web-view reload.
   */
  const [footnotePaneFocusRequest, setFootnotePaneFocusRequest] = useState<
    { index: number } | undefined
  >(undefined);

  /**
   * The user's explicit footnotes-pane auto-show choice, or `undefined` when they have never
   * toggled it. Kept separate from the EFFECTIVE value below because the default is per interface
   * mode, and `useWebViewState` captures its default at mount — before `platform.interfaceMode` has
   * resolved — so baking the mode into the stored default would freeze it at the loading-time
   * value.
   */
  const [footnotesAutoShowChoice, setFootnotesAutoShow] = useWebViewState<boolean | undefined>(
    'footnotesAutoShow',
    undefined,
  );

  /**
   * Footnotes-pane auto-show/hide, as applied: the user's explicit choice when they have made one,
   * else ON in Power mode and OFF in Simple mode (PT9's manual, persistent pane visibility
   * unchanged there by default). Applies in EVERY editor view. When on, the pane auto-shows/hides
   * based on whether the current chapter has notes (see the `chapterHasNotes`/auto-show `useEffect`
   * below, which runs once `usjFromPdp` is available), and a note-caller click also shows a closed
   * pane (see `noteCallerOnClick`).
   */
  const footnotesAutoShow = footnotesAutoShowChoice ?? isPowerMode;

  const footnotesAutoShowRef = useRef(footnotesAutoShow);

  useEffect(() => {
    footnotesAutoShowRef.current = footnotesAutoShow;
  }, [footnotesAutoShow]);

  /**
   * The chapter (`getChapterKey`) in which the user last manually showed or hid the footnotes pane,
   * or `undefined` when they have not. A manual toggle wins over the `footnotesAutoShow`
   * auto-show/hide behavior for that chapter only — see `resolveFootnotesPaneAutoVisibility`, which
   * compares this against the loaded chapter rather than trusting a flag to have been cleared.
   *
   * Intentionally a ref (not persisted web-view state) since it only needs to survive re-renders
   * within a chapter, not across web-view reloads.
   */
  const footnotesManualOverrideChapterRef = useRef<string | undefined>(undefined);

  // Chapter change drops per-chapter transient footnotes state: the manual pane override (so
  // auto-show/hide resumes for the new chapter, and so returning to the earlier chapter starts
  // fresh rather than reviving its old override) and any pending pane-focus request (so a request
  // that was dropped as out-of-bounds while `footnotes` was momentarily empty can't be retried
  // against the NEW chapter's notes once they repopulate).
  useEffect(() => {
    footnotesManualOverrideChapterRef.current = undefined;
    setFootnotePaneFocusRequest(undefined);
  }, [scrRef.book, scrRef.chapterNum]);

  // #endregion Footnotes Pane State

  // Project-settings-sourced separators/callers for `nodeOptions` below (PT9
  // ChapterVerseSeparator / RangeIndicator / DefaultFootnoteCaller / DefaultCrossRefCaller). Each
  // fallback matches the CONTRIBUTION's default (projectSettings.json — '.' like Paratext, not
  // ':'), so a read error and an unset setting render the same reference. The guarded reader also
  // covers the empty string: `GetProjectSetting` returns ParametersDictionary values verbatim, so
  // an empty `<ChapterVerseSeparator/>` in Settings.xml would otherwise yield '' and render
  // `Mt 13` — the same guard the `textDirection` memo above applies.
  const chapterVerseSeparator = useGuardedProjectSetting(
    projectId,
    'platformScripture.chapterVerseSeparator',
    '.',
    'chapter/verse separator',
  );
  const verseRangeSeparator = useGuardedProjectSetting(
    projectId,
    'platformScripture.verseRangeSeparator',
    '-',
    'verse range separator',
  );
  const defaultFootnoteCaller = useGuardedProjectSetting(
    projectId,
    'platformScripture.defaultFootnoteCaller',
    GENERATOR_NOTE_CALLER,
    'default footnote caller',
  );
  const defaultCrossRefCaller = useGuardedProjectSetting(
    projectId,
    'platformScripture.defaultCrossRefCaller',
    HIDDEN_NOTE_CALLER,
    'default cross-reference caller',
  );

  // The auto-generated caller SEQUENCES are Paratext settings too, but LANGUAGE-backed rather
  // than Settings.xml tags: PT9 stores them as per-language character sets
  // (`ScrLanguage.FootnoteCallers` / `.CrossReferenceCallers`, Paratext repo,
  // ParatextData/Languages/ScrLanguage.cs:290-300, space-separated and possibly empty) and its
  // Standard view passes them to the renderer with a '†' fallback for an empty cross-reference
  // sequence (ViewUsfmXhtmlConverter.cs:73-74), while `GetNthCaller`
  // (ParatextInternalShared/ScriptureEditor/UsfmXsltExtensions.cs:322) cycles the sequence modulo
  // its length and defaults to a-z when it is empty. They reach this web view through the
  // language-backed `platformScripture.footnoteCallers` / `platformScripture.crossRefCallers`
  // project settings, read with '' as the fallback ('' IS the no-sequence value, so a read error
  // degrades to it); `parseCallerSequenceSetting` then maps '' to `undefined`, which leaves
  // `noteCallers` unset so the editor's built-in a-z default applies (matching GetNthCaller), and
  // an empty cross-reference sequence keeps PT9's exact '†' fallback.
  const footnoteCallersSetting = useGuardedProjectSetting(
    projectId,
    'platformScripture.footnoteCallers',
    '',
    'footnote caller sequence',
  );
  const footnoteCallers = useMemo(
    () => parseCallerSequenceSetting(footnoteCallersSetting),
    [footnoteCallersSetting],
  );

  const crossRefCallersSetting = useGuardedProjectSetting(
    projectId,
    'platformScripture.crossRefCallers',
    '',
    'cross-reference caller sequence',
  );
  const crossRefCallers = useMemo(
    () => parseCallerSequenceSetting(crossRefCallersSetting) ?? ['†'],
    [crossRefCallersSetting],
  );

  /**
   * Whether the editor is effectively read-only, considering the isReadOnly flag, the project's
   * `platform.isEditable` setting, the user's Scripture-edit permission, sync-blocked state, and
   * view type. The markers-view clause is the one placeholder piece here: once editing is allowed
   * in markers view, that clause can be dropped, but the rest of this combination stays.
   *
   * Fails CLOSED (read-only) while `isProjectEditable`/`canUserEditScripture` are genuinely still
   * resolving — see `isCanUserEditScriptureUnresolved` above — rather than relying on their
   * fail-open default values during that window: a briefly-writable editor is worse than a
   * briefly-read-only one.
   */
  const isReadOnlyEffective = useMemo(
    () =>
      isReadOnly ||
      isProjectEditableLoading ||
      !isProjectEditable ||
      isCanUserEditScriptureUnresolved ||
      !canUserEditScripture ||
      isSyncBlocked ||
      (viewType === 'markers' && localStorage.getItem('dev-editableMarkersView') !== 'true'),
    [
      isReadOnly,
      isProjectEditableLoading,
      isProjectEditable,
      isCanUserEditScriptureUnresolved,
      canUserEditScripture,
      isSyncBlocked,
      viewType,
    ],
  );

  const nodeOptions = useMemo<UsjNodeOptions>(
    () => ({
      chapterVerseSeparator,
      verseRangeSeparator,
      defaultFootnoteCaller,
      defaultCrossRefCaller,
      // Unset (rather than an explicit a-z array) when the language defines no sequence: the
      // editor's built-in default is the same a-z sequence PT9's GetNthCaller falls back to.
      noteCallers: footnoteCallers,
      crossRefCallers,
      // Gated on isReadOnlyEffective (not the narrower isReadOnly): it folds in the project's
      // editability, the user's Scripture-edit permission, AND the sync-blocked freeze — opening a
      // note caller can create/edit a note, a project write every one of those must block.
      noteCallerOnClick: isReadOnlyEffective
        ? undefined
        : (event, noteNodeKey, isCollapsed, _getCaller, _setCaller, getNoteOps, getNoteIndex) => {
            // The caller-click flow has historically failed silently (dead click); keep the inputs
            // of every click diagnosable from a debug log.
            logger.debug(
              `noteCallerOnClick: noteNodeKey=${noteNodeKey} isCollapsed=${isCollapsed} ` +
                `editingNoteKey=${editingNoteKey.current} popoverShown=${showFootnoteEditorRef.current} ` +
                `paneVisible=${footnotesPaneVisibleRef.current} paneRendered=${footnotesPaneRenderedRef.current} ` +
                `viewType=${viewType}`,
            );
            const decision = decideNoteCallerClickAction({
              isCollapsed,
              editingNoteKey: editingNoteKey.current,
              popoverShown: showFootnoteEditorRef.current,
              paneVisible: footnotesPaneVisibleRef.current,
              // The render condition, not just the toggle: the pane only consumes focus requests
              // when it is actually rendered.
              paneRendered: footnotesPaneRenderedRef.current,
              isAutoShowEnabled: footnotesAutoShowRef.current,
            });
            if (decision.clearStaleEditingSession) {
              // A prior session's key survived without its popover — orphaned bookkeeping that
              // would otherwise dead-end every caller click from here on.
              logger.warn(
                `noteCallerOnClick: clearing stale editing session for note ${editingNoteKey.current}`,
              );
              editingNoteIsNew.current = false;
              editingNoteKey.current = undefined;
              editingNoteOps.current = undefined;
              editingNoteSessionRefreshedAt.current = undefined;
            }
            if (decision.action === 'ignore-expanded' || decision.action === 'ignore-popover-open')
              return;

            // Alongside the popover below: show the pane when the click is what reveals it
            // (auto-show behavior, so the per-chapter manual override is NOT recorded), and
            // select/highlight the clicked note there (PT9 navigate-to-note). The pane addresses
            // notes by document-order index, which the editor computes exactly at click time; a
            // focus request sent while the pane's data is still mounting is retried when it
            // repopulates.
            if (decision.showPane) setFootnotesPaneVisible(true);
            if (decision.sendPaneFocusRequest) {
              // TODO(PT-4478): The editor's index and the pane's own index are computed from
              // different snapshots, so they can disagree inside the save debounce window. Unify
              // them on one source rather than recomputing here.
              const index = getNoteIndex();
              if (index !== undefined) setFootnotePaneFocusRequest({ index });
              else
                logger.warn(
                  'noteCallerOnClick: clicked note is no longer attached; pane focus request dropped',
                );
            }

            // The popover opens on every routed click — it is the only surface that can EDIT a
            // note today; the pane work above is navigation alongside it.
            const noteOp = getNoteOps()?.at(0);
            if (!noteOp || !isInsertEmbedOpOfType('note', noteOp)) {
              logger.warn('noteCallerOnClick: clicked note produced no valid note op; ignoring');
              return;
            }

            const targetRect = event.currentTarget.getBoundingClientRect();
            setNotePopoverAnchorX(targetRect.left);
            setNotePopoverAnchorY(targetRect.top);
            setNotePopoverAnchorHeight(targetRect.height);
            editingNoteKey.current = noteNodeKey;
            editingNoteOps.current = [noteOp];
            editingNoteSessionRefreshedAt.current = Date.now();
            setShowFootnoteEditor(true);
          },
    }),
    [
      isReadOnlyEffective,
      editingNoteKey,
      viewType,
      chapterVerseSeparator,
      verseRangeSeparator,
      defaultFootnoteCaller,
      defaultCrossRefCaller,
      footnoteCallers,
      crossRefCallers,
      setFootnotesPaneVisible,
    ],
  );

  // The "durable" reasons the editor is read-only — excludes isSyncBlocked, a transient freeze
  // during an automatic Send/Receive, not a real read-only state. Used for the title instead of
  // isReadOnlyEffective so the tab doesn't relabel "(Read-only)" and back on every scheduled sync;
  // SyncBlockedBanner already communicates that transient state.
  const isDurablyReadOnly = useMemo(
    () =>
      isReadOnly ||
      !isProjectEditable ||
      !canUserEditScripture ||
      (viewType === 'markers' && localStorage.getItem('dev-editableMarkersView') !== 'true'),
    [isReadOnly, isProjectEditable, canUserEditScripture, viewType],
  );

  // `undefined` means isProjectEditable/canUserEditScripture are still genuinely resolving (not
  // latched — see isCanUserEditScriptureUnresolved above). The title effect below skips its update
  // in that case instead of pushing a title, so the previously-persisted title stays showing.
  const isReadOnlyForTitle = useMemo(
    () =>
      isProjectEditableLoading || isCanUserEditScriptureUnresolved ? undefined : isDurablyReadOnly,
    [isProjectEditableLoading, isCanUserEditScriptureUnresolved, isDurablyReadOnly],
  );

  /**
   * Why the "Manage books" action on the book-not-available zero-state cannot be taken right now,
   * or `undefined` when it can.
   *
   * Deliberately NOT derived from `isReadOnlyEffective`, which folds in `viewType === 'markers'`
   * because the editor CANVAS is not editable in that view. Manage Books is a separate floating
   * dialog, and its ability to create a book does not depend on which view the editor is showing —
   * so gating on the effective flag disabled an action that would have worked fine. Only the two
   * conditions that genuinely prevent adding a book are listed, checked in the order in which the
   * user can do something about them: a read-only project is a standing state they must get
   * changed, while a sync is transient and about to end on its own.
   */
  const manageBooksDisabledReason = useMemo<ManageBooksDisabledReason | undefined>(() => {
    if (isReadOnly) return 'readOnly';
    if (isSyncBlocked) return 'syncInProgress';
    return undefined;
  }, [isReadOnly, isSyncBlocked]);

  // Effective structure-protection state for this project/user, used to gate keyboard edits to
  // paragraph/verse markers in the editor (fed into EditorOptions.structureProtectionMode below). The
  // toolbar StructureProtectionButton subscribes to the same state independently.
  const { isStructureProtected, isProtectionActive } = useStructureProtectionState(projectId);

  // Locked (by admin, personal preference, or both) always yields "protected" (hard block); Power
  // mode leaves the feature fully inactive regardless of lock state ("off"); otherwise (Simple mode,
  // not locked) the editor still guards structural deletes with a two-step confirm ("guarded").
  const structureProtectionMode = useMemo<StructureProtectionMode>(() => {
    if (!isProtectionActive) return 'off';
    return isStructureProtected ? 'protected' : 'guarded';
  }, [isProtectionActive, isStructureProtected]);

  // EXPERIMENTAL idle marker-settle delay override, fed into
  // EditorOptions.markerSettleDelayMs below; undefined leaves the editor on its own default.
  const markerSettleDelayMs = useMarkerSettleDelay();

  // Get the updated title. Note this is NO_UPDATE_TITLE if no update is needed
  const [newTitleIfUpdated] = usePromise(
    useCallback(async () => {
      if (
        unformattedTitle === NO_UPDATE_TITLE ||
        projectName === defaultProjectName ||
        isReadOnlyForTitle === undefined
      )
        return NO_UPDATE_TITLE;
      const updatedTitle = await formatEditorTitle(
        unformattedTitle,
        projectId,
        isReadOnlyForTitle,
        async () => projectName,
        papi.localization.getLocalizedStrings,
      );

      // Don't need to update if the title is the same as before
      if (updatedTitle === title) return NO_UPDATE_TITLE;

      return updatedTitle;
    }, [isReadOnlyForTitle, title, projectId, projectName, unformattedTitle]),
    NO_UPDATE_TITLE,
  );

  // Keep the title up-to-date
  useEffect(() => {
    if (newTitleIfUpdated === NO_UPDATE_TITLE) return;

    updateWebViewDefinition({
      title: newTitleIfUpdated,
    });
  }, [newTitleIfUpdated, updateWebViewDefinition]);

  const viewOptions = useMemo<ViewOptions>(() => {
    return getViewOptionsForType(viewType, isPowerMode);
  }, [viewType, isPowerMode]);

  /**
   * Function to run to set the editor's USJ content. Also clears annotation info because setting
   * the editor's USJ silently removes all annotations
   *
   * @param usj The USJ to set in the editor
   */
  const setEditorUsj = useRef((usj: Usj) => {
    editorRef.current?.setUsj(usj);
    clearAnnotationInfo.current();
  });
  /**
   * Reverse portal node for the editor. Using this allows us to mount the editor once and re-parent
   * it without the editor unmounting and remounting. We need to re-parent the editor when container
   * decorations are added and/or removed. We need to avoid remounting the editor because it needs
   * to preserve its internal state like current selection.
   */
  const editorPortalNode = useMemo(
    () =>
      createHtmlPortalNode({
        // The reverse portal is a `div` containing the contents of `InPortal`. These attributes are
        // attached to the reverse portal's `div` element.
        attributes: {
          class:
            // We don't want this `div` in our document flow, so we functionally get rid of it with
            // `display: contents`
            'tw:contents',
        },
      }),
    [],
  );

  const notifyStructureProtected = useCallback(
    () =>
      papi.notifications.send({
        message: '%webView_platformScriptureEditor_error_structureProtected%',
        severity: 'warning',
      }),
    [],
  );

  /**
   * Show the standard "editing paused during Send/Receive" warning notification (the
   * `(SR_EDIT_BLOCKED)` gate rejection surfaced to the user).
   *
   * The severity, message key, and self-catching all live in
   * {@link sendSyncEditBlockedNotification}, shared with the character-marker bar's removal action
   * so they cannot drift across the call sites that report this. This wrapper exists only to bind
   * `localizedStrings` and give the callback a stable identity for the effect dependency lists
   * below.
   */
  const notifySyncEditBlocked = useCallback(
    () => sendSyncEditBlockedNotification(localizedStrings),
    [localizedStrings],
  );

  // Opening the paragraph switcher's Radix popover takes focus off `.editor-input`, where Lexical's
  // blur processing can null the selection — and `formatPara` needs one, so the retag would refuse.
  // The `\` and Enter palettes restore it the same way before they apply.
  const restoreEditorSelection = useCallback(() => {
    restoreSelectionIfLost(editorRef.current, lastFocusOutSelectionRef.current);
  }, []);

  const paragraphSwitcherMenuItems = useMemo(
    () =>
      generateParagraphMenuListItems(
        editorRef,
        localizedStrings,
        isStructureProtected,
        notifyStructureProtected,
        restoreEditorSelection,
      ),
    [localizedStrings, isStructureProtected, notifyStructureProtected, restoreEditorSelection],
  );

  const nextSelectionRange = useRef<SelectionRange | undefined>(undefined);

  const insertCommentAtCurrentSelection = useCallback(() => {
    const selection = currentSelectionRef.current;

    // Comment creation is gated by canUserCreateComments (not read-only), so it must be blocked
    // separately during an automatic Send/Receive. Guarding here covers both the hotkey and the
    // context-menu item's onSelect.
    if (!selection?.start || !canUserCreateComments) return;
    // The context-menu item is visibly disabled while sync-blocked, but the hotkey reaches here
    // directly — show the same "editing paused" notice instead of silently no-op'ing.
    if (isSyncBlocked) {
      notifySyncEditBlocked();
      return;
    }

    // Store the selection as annotation range to show it as the pending annotation
    const annotationRange: AnnotationRange = {
      start: { ...selection.start },
      end: { ...(selection.end ?? selection.start) },
    };

    // Validate that the selection doesn't contain markers, and that there is meaningful content.
    // `selection`'s jsonPaths address the LIVE tree (EditorRef.getSelection's contract), while
    // `getUsj()` returns the SETTLED document — identical when nothing is pending, but while a
    // command surface has in-progress input elsewhere in the document, settled indices can shift
    // out from under a jsonPath captured earlier. `jsonPathToUsjNodeAndDocumentLocation` throws
    // outright when a path no longer resolves at all, and can otherwise resolve to a
    // still-valid-but-DIFFERENT node whose string is a different length than the live one the
    // offsets below were computed against — both guarded here rather than trusted, since neither
    // is distinguishable from a genuine marker-boundary case by the caller.
    const editorUsj = editorRef.current?.getUsj();
    const editorUsjCorrected = editorUsj ? correctEditorUsjVersion(editorUsj) : undefined;
    if (editorUsjCorrected) {
      const usjRW = new UsjReaderWriter(editorUsjCorrected, {
        markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
      });

      let startNodeAndDocumentLocation;
      let endNodeAndDocumentLocation;
      try {
        startNodeAndDocumentLocation = usjRW.jsonPathToUsjNodeAndDocumentLocation(
          selection.start.jsonPath,
        );
        endNodeAndDocumentLocation = selection.end
          ? usjRW.jsonPathToUsjNodeAndDocumentLocation(selection.end.jsonPath)
          : startNodeAndDocumentLocation;
      } catch {
        // A path that no longer resolves at all against the settled tree: same fail-safe response
        // as an unresolvable selection below, not a crash.
        papi.notifications.send({
          message: '%webView_platformScriptureEditor_error_selectionContainsMarkers%',
          severity: 'warning',
        });
        return;
      }

      const startNode = startNodeAndDocumentLocation?.node;
      const isStartNodeAString = isString(startNode);

      // Make sure the selection is in a string and doesn't span multiple USJ nodes
      const selectionHasMarker =
        !isStartNodeAString ||
        startNodeAndDocumentLocation?.node !== endNodeAndDocumentLocation?.node;

      if (selectionHasMarker) {
        papi.notifications.send({
          message: '%webView_platformScriptureEditor_error_selectionContainsMarkers%',
          severity: 'warning',
        });
        return;
      }

      // If the selection is collapsed (cursor with no range), require a non-whitespace character
      // on at least one side of the cursor position so the backend code can select the word
      const startTextDocumentLocation = selection.start;
      const endTextDocumentLocation = selection.end ?? selection.start;
      const isCollapsed =
        UsjReaderWriter.isUsjDocumentLocationForTextContent(startTextDocumentLocation) &&
        UsjReaderWriter.isUsjDocumentLocationForTextContent(endTextDocumentLocation) &&
        startTextDocumentLocation.jsonPath === endTextDocumentLocation.jsonPath &&
        startTextDocumentLocation.offset === endTextDocumentLocation.offset;
      // A live-tree offset that no longer fits the settled string it resolved to: concrete
      // evidence the two snapshots disagree about this node's content, not just a stale offset —
      // proceeding would either mis-anchor the comment or (for offset > length) walk off the end
      // of `startNode` below. Bail out the same way an unresolvable path already does.
      if (
        isCollapsed &&
        'offset' in startTextDocumentLocation &&
        startTextDocumentLocation.offset > startNode.length
      ) {
        papi.notifications.send({
          message: '%webView_platformScriptureEditor_error_selectionContainsMarkers%',
          severity: 'warning',
        });
        return;
      }
      if (isCollapsed) {
        if (!('offset' in startTextDocumentLocation)) {
          papi.notifications.send({
            message: '%webView_platformScriptureEditor_error_noTextSelected%',
            severity: 'warning',
          });
          return;
        }
        const { offset } = startTextDocumentLocation;
        let charBefore = offset > 0 ? startNode[offset - 1] : '';
        let charAfter = offset < startNode.length ? startNode[offset] : '';
        if (
          (charBefore.length === 0 || isWhiteSpace(charBefore)) &&
          (charAfter.length === 0 || isWhiteSpace(charAfter))
        ) {
          papi.notifications.send({
            message: '%webView_platformScriptureEditor_error_noTextSelected%',
            severity: 'warning',
          });
          return;
        }

        // Expand the annotation range to include surrounding non-whitespace characters.
        // This is a quick and dirty way to do this; the backend will do this properly with the
        // definition of whitespace according to the project
        let tempOffset = offset; // Start at the cursor position because that is charAfter
        while (charAfter.length > 0 && !isWhiteSpace(charAfter)) {
          charAfter = tempOffset + 1 < startNode.length ? startNode[tempOffset + 1] : '';
          tempOffset += 1;
        }
        annotationRange.end = {
          ...annotationRange.end,
          offset: tempOffset,
        };
        tempOffset = offset - 1; // Start at the character before the cursor since charBefore is already one step before the offset
        while (charBefore.length > 0 && !isWhiteSpace(charBefore)) {
          charBefore = tempOffset > 0 ? startNode[tempOffset - 1] : '';
          tempOffset -= 1;
        }
        annotationRange.start = {
          ...annotationRange.start,
          offset: tempOffset + 1, // +1 to move back to the first non-whitespace character
        };
      }
    }

    pendingCommentAnnotationRange.current = { range: annotationRange, verseRef: scrRef };

    // Create a temporary annotation to highlight the selected text
    editorRef.current?.setAnnotation(
      annotationRange,
      ANNOTATION_TYPE_TRANSLATOR_COMMENT,
      PENDING_COMMENT_ANNOTATION_ID,
    );

    // Position the popover near the annotation
    // Try to find the selected text element for positioning
    const editorContainer = document.querySelector<HTMLElement>('.usfm');
    if (editorContainer) {
      // Use the browser's selection to get the bounding rect of the selected text
      const domSelection = window.getSelection();
      if (domSelection && domSelection.rangeCount > 0) {
        const range = domSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setCommentPopoverAnchorX(rect.left);
        setCommentPopoverAnchorY(rect.bottom);
        setCommentPopoverAnchorHeight(0);
      } else {
        // Fallback to center of editor viewport
        const rect = editorContainer.getBoundingClientRect();
        setCommentPopoverAnchorX(rect.left + rect.width / 2);
        setCommentPopoverAnchorY(rect.top + rect.height / 2);
        setCommentPopoverAnchorHeight(0);
      }
    }

    setShowCommentEditor(true);
  }, [scrRef, canUserCreateComments, isSyncBlocked, notifySyncEditBlocked]);

  /**
   * Inserts a footnote at the current selection. Shared by the "Insert footnote" context-menu item,
   * the Ctrl+T keyboard shortcut, and the top-menu
   * `platformScriptureEditor.insertFootnoteAtSelection` command (via the `webViewMessageListener`
   * effect below), so the version-history commit + `insertMarker` behavior stays identical across
   * every entry point.
   */
  const insertFootnoteAtCurrentSelection = useCallback(async () => {
    // Commits a snapshot of the project to the version history. Best-effort: see
    // `commitVersionHistorySnapshot`, which owns the ERROR_UNIMPLEMENTED handling shared with
    // the cross-reference and character-marker-removal paths.
    await commitVersionHistorySnapshot(
      projectId,
      localizedStrings['%versionHistoryCommit_beforeInsertFootnote%'],
      'inserting footnote',
    );

    editorRef.current?.insertMarker('f');
  }, [projectId, localizedStrings]);

  /**
   * Inserts a cross-reference at the current selection. Shared by the "Insert cross-reference"
   * context-menu item, the Ctrl+Shift+T keyboard shortcut, and the top-menu
   * `platformScriptureEditor.insertCrossReferenceAtSelection` command (via the
   * `webViewMessageListener` effect below).
   */
  const insertCrossReferenceAtCurrentSelection = useCallback(async () => {
    // Commits a snapshot of the project to the version history — see the footnote helper above.
    await commitVersionHistorySnapshot(
      projectId,
      localizedStrings['%versionHistoryCommit_beforeInsertCrossReference%'],
      'inserting cross-reference',
    );

    editorRef.current?.insertMarker('x');
  }, [projectId, localizedStrings]);

  const options = useMemo<EditorOptions>(
    () => ({
      isReadonly: isReadOnlyEffective,
      structureProtectionMode,
      hasSpellCheck: false,
      nodes: nodeOptions,
      textDirection: textDirectionEffective,
      markerMenuTrigger: '\\',
      view: viewOptions,
      styleInfo,
      markerSettleDelayMs,
      hasExternalUI: true,
      contextMenu: [
        {
          title: localizedStrings['%webView_platformScriptureEditor_insertFootnoteAtSelection%'],
          onSelect: insertFootnoteAtCurrentSelection,
          isDisabled: isReadOnlyEffective,
        },
        {
          title:
            localizedStrings['%webView_platformScriptureEditor_insertCrossReferenceAtSelection%'],
          onSelect: insertCrossReferenceAtCurrentSelection,
          isDisabled: isReadOnlyEffective,
        },
        {
          title: localizedStrings['%webView_platformScriptureEditor_insertCommentAtSelection%'],
          onSelect: insertCommentAtCurrentSelection,
          // Disabled while sync-blocked too, so the menu reflects the frozen state.
          isDisabled: !canUserCreateComments || isSyncBlocked,
        },
      ],
    }),
    [
      isReadOnlyEffective,
      structureProtectionMode,
      canUserCreateComments,
      isSyncBlocked,
      textDirectionEffective,
      nodeOptions,
      viewOptions,
      styleInfo,
      markerSettleDelayMs,
      localizedStrings,
      insertCommentAtCurrentSelection,
      insertFootnoteAtCurrentSelection,
      insertCrossReferenceAtCurrentSelection,
    ],
  );

  // listen to messages from the web view controller
  useEffect(() => {
    const webViewMessageListener = async ({
      data: editorMessage,
    }: MessageEvent<EditorWebViewMessage>) => {
      switch (editorMessage.method) {
        case 'selectRange': {
          const { scrRef: targetScrRef, range } = editorMessage;
          logger.debug(`selectRange targetScrRef ${serialize(targetScrRef)} ${serialize(range)}`);

          if (compareScrRefs(scrRef, targetScrRef) !== 0) {
            // Need to update scr ref, let the editor load the Scripture text at the new scrRef,
            // and scroll to the new scrRef before setting the range. Set the nextSelectionRange
            // which will set the range after a short wait time in a `useEffect` below
            setScrRefWithScroll(targetScrRef);
            nextSelectionRange.current = range;
          }
          // We're on the right scr ref. Go ahead and set the selection
          else editorRef.current?.setSelection(range);

          break;
        }
        case 'updateDecorations': {
          const { decorationsToAdd, decorationsToRemove } = editorMessage;

          const updatedDecorations = mergeDecorations(decorations, decorationsToAdd);

          removeDecorations(updatedDecorations, decorationsToRemove);

          setDecorations(updatedDecorations);
          break;
        }
        case 'changeScriptureView': {
          // Cycle through the available views for QA (a temporary affordance, to be replaced by
          // the polished power-default view + menu). The cycle is mode-aware: standard view is
          // power-mode-only, so in simple mode the cycle skips it (see `getNextViewTypeInCycle`
          // for the full cycle semantics and why it switches on `viewType` rather than
          // `viewOptions.markerMode`).
          setViewType(getNextViewTypeInCycle(viewType, isPowerMode));
          break;
        }
        case 'toggleFootnotesPaneVisibility': {
          // A manual toggle wins over the `footnotesAutoShow` auto-show/hide behavior for the
          // chapter it was made in (see `footnotesManualOverrideChapterRef`).
          footnotesManualOverrideChapterRef.current = getChapterKey(
            scrRef.book,
            scrRef.chapterNum,
            scrRef.versificationStr,
          );
          const { current } = footnotesPaneVisibleRef;
          setFootnotesPaneVisible(!current);
          break;
        }
        case 'toggleFootnotesAutoShow': {
          const { current } = footnotesAutoShowRef;
          // Turning auto-show ON must take effect immediately: a manual pane toggle earlier in
          // this chapter recorded the override, and without dropping it the auto-show effect has
          // no opinion until the next chapter change — the menu item looks broken.
          if (!current) footnotesManualOverrideChapterRef.current = undefined;
          setFootnotesAutoShow(!current);
          break;
        }
        case 'insertFootnoteAtSelection': {
          await insertFootnoteAtCurrentSelection();
          break;
        }
        case 'insertCrossReferenceAtSelection': {
          await insertCrossReferenceAtCurrentSelection();
          break;
        }
        case 'insertCommentAtSelection': {
          insertCommentAtCurrentSelection();
          break;
        }
        case 'setAnnotation': {
          const {
            verseRef: targetVerseRef,
            annotationRange,
            annotationType,
            annotationId,
            interactionCommand,
          } = editorMessage;
          logger.debug(
            `setAnnotation targetScrRef ${serialize(targetVerseRef)} ${serialize(annotationRange)} type=${annotationType} id=${annotationId} interactionCommand=${String(interactionCommand)}`,
          );

          // If we're on a different book or chapter, don't set the annotation
          if (
            scrRef.book !== targetVerseRef.book ||
            scrRef.chapterNum !== targetVerseRef.chapterNum
          ) {
            break;
          }

          // This type helps us enforce that the arguments match the parameters of interactionCommand
          let argumentsForCommand: Parameters<AnnotationActionHandler>;

          const onClickAnnotation: TypedMarkOnClick | undefined = interactionCommand
            ? async (_event: MouseEvent, typeEditorInternal: string, id: string) => {
                const type = typeEditorInternal.startsWith(EDITOR_ANNOTATION_TYPE_PREFIX)
                  ? typeEditorInternal.slice(EDITOR_ANNOTATION_TYPE_PREFIX.length)
                  : typeEditorInternal;

                argumentsForCommand = [type, id, 'clicked'];
                try {
                  await papi.commands.sendCommand(
                    interactionCommand,
                    // We are dictating the parameters and the command is responsible for implementing
                    // them correctly. The parameters are explained in the TSDocs for `interactionCommand`
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    ...(argumentsForCommand as unknown as Parameters<
                      CommandHandlers[CommandNames]
                    >),
                  );
                } catch (e) {
                  logger.warn(`Error sending annotation click command: ${getErrorMessage(e)}`);
                }
              }
            : undefined;

          const onRemoveAnnotation: TypedMarkOnRemove | undefined = async (
            typeEditorInternal: string,
            id: string,
            cause: TypedMarkRemovalCause,
          ) => {
            const type = typeEditorInternal.startsWith(EDITOR_ANNOTATION_TYPE_PREFIX)
              ? typeEditorInternal.slice(EDITOR_ANNOTATION_TYPE_PREFIX.length)
              : typeEditorInternal;

            // If this annotation is currently being set (when it is being updated), don't remove it
            if (annotationIdsBeingSet.current.has(id)) {
              return;
            }

            // When the annotation is removed, remove it from our map
            annotationInfoByIdRef.current.delete(id);

            if (interactionCommand) {
              argumentsForCommand = [type, id, cause];
              try {
                await papi.commands.sendCommand(
                  interactionCommand,
                  // We are dictating the parameters and the command is responsible for implementing
                  // them correctly. The parameters are explained in the TSDocs for `interactionCommand`
                  // eslint-disable-next-line no-type-assertion/no-type-assertion
                  ...(argumentsForCommand as unknown as Parameters<CommandHandlers[CommandNames]>),
                );
              } catch (e) {
                logger.warn(`Error sending annotation removal command: ${getErrorMessage(e)}`);
              }
            }
          };

          // Keep track of this annotation so messages from the controller can act on it later
          annotationInfoByIdRef.current.set(annotationId, {
            annotationType,
            interactionCommand,
            annotationRange,
          });

          // Keeping track of annotations being set because setAnnotation on an existing annotation
          // removes it (including calling `onRemoveAnnotation`) and adds it again
          annotationIdsBeingSet.current.add(annotationId);

          try {
            editorRef.current?.setAnnotation(
              annotationRange,
              annotationType,
              annotationId,
              onClickAnnotation,
              onRemoveAnnotation,
            );
          } finally {
            annotationIdsBeingSet.current.delete(annotationId);
          }

          break;
        }
        case 'runAnnotationAction': {
          const { annotationId, action } = editorMessage;

          try {
            const info = annotationInfoByIdRef.current.get(annotationId);
            if (!info) throw new Error(`No annotation info found for id ${annotationId}`);

            const { annotationType, interactionCommand, annotationRange } = info;

            if (action === 'removed' || action === 'destroyed') {
              // The onRemoveAnnotation callback will handle removing the annotation from the editor
              // and calling the command
              editorRef.current?.removeAnnotation(annotationType, annotationId);
              break;
            }

            if (!interactionCommand)
              throw new Error(`No interactionCommand for annotation ${annotationId}`);

            // If this is a click action, set the editor selection to the annotation's range so the
            // user sees it when the command runs.
            if (action === 'clicked') {
              scrollToAnnotation(annotationId);
              editorRef.current?.setSelection(annotationRange);
            }

            // This type helps us enforce that the arguments match the parameters of interactionCommand
            const argumentsForCommand: Parameters<AnnotationActionHandler> = [
              annotationType,
              annotationId,
              action,
            ];

            await papi.commands.sendCommand(
              interactionCommand,
              // We are dictating the parameters and the command is responsible for implementing
              // them correctly. The parameters are explained in the TSDocs for `interactionCommand`
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              ...(argumentsForCommand as unknown as Parameters<CommandHandlers[CommandNames]>),
            );
          } catch (e) {
            logger.warn(
              `Error running annotation action ${action} on annotation ${annotationId}: ${getErrorMessage(e)}`,
            );
          }
          break;
        }
        case 'changeFootnotesPaneLocation': {
          break;
        } // handled in FootnoteLayout
        default:
          // Unknown method name
          logger.debug(
            `Received event with unknown method. Message data: ${serialize(editorMessage)}`,
          );
          break;
      }
    };

    window.addEventListener('message', webViewMessageListener);

    return () => {
      window.removeEventListener('message', webViewMessageListener);
    };
  }, [
    insertCommentAtCurrentSelection,
    insertFootnoteAtCurrentSelection,
    insertCrossReferenceAtCurrentSelection,
    scrRef,
    setScrRefWithScroll,
    decorations,
    setDecorations,
    setFootnotesPaneVisible,
    setFootnotesAutoShow,
    setViewType,
    viewType,
    isPowerMode,
  ]);

  // #region Marker Palettes

  const inlineMarkerMenuItems = useMemo(
    () =>
      generateInlineMarkerMenuListItems(
        editorRef,
        () => setShowMarkersMenu(false),
        localizedStrings,
        isStructureProtected,
        notifyStructureProtected,
        restoreEditorSelection,
        contextMarker,
        styleInfo,
      ),
    [
      contextMarker,
      localizedStrings,
      isStructureProtected,
      notifyStructureProtected,
      restoreEditorSelection,
      styleInfo,
    ],
  );

  // When the marker menu closes, should refocus the editor
  useEffect(() => {
    if (!showMarkersMenu) editorRef.current?.focus();
  }, [showMarkersMenu]);

  const showInlineMarkersMenu = useCallback(() => {
    // Only shows the markers menu if there is currently a selection in the editor and there are
    // existing marker menu items to be shown
    const currentSelection = window.getSelection();
    if (inlineMarkerMenuItems.length && currentSelection && currentSelection.rangeCount > 0) {
      const selectionRect = currentSelection.getRangeAt(0).getBoundingClientRect();
      setMarkersMenuAnchorX(selectionRect.left);
      setMarkersMenuAnchorY(selectionRect.top);
      setMarkersMenuAnchorHeight(selectionRect.height);
      setShowMarkersMenu(true);
    }
  }, [inlineMarkerMenuItems]);

  // Need to add a window listener for click events that will close the markers menu when you click
  // outside. There is another `onClick` listener for the marker menu that prevents click events
  // from being passed to this listener if the marker menu is being clicked. Those click events are
  // handled separately.
  useEffect(() => {
    const clickListener = () => {
      if (showMarkersMenu) setShowMarkersMenu(false);
    };

    window.addEventListener('click', clickListener);

    return () => {
      window.removeEventListener('click', clickListener);
    };
  }, [showMarkersMenu]);

  // When the inline markers menu is shown, makes sure the search input is focused
  useEffect(() => {
    if (showMarkersMenu) {
      markerMenuSearchRef.current?.focus();
    }
  }, [showMarkersMenu]);

  /**
   * Opens a marker-menu palette (the standard-view `\` trigger's apply path — see
   * `EditorRef.applyMarkerMenuSelection`). Takes the already-resolved context/items so it can be
   * reused wherever a marker menu needs to be shown from a `MarkerMenuContext` (e.g. the
   * marker-glyph click popover), not just from the live keydown flow below.
   *
   * `passive` selects the collapsed-caret flavor: a `'backslash'` session driven entirely by the
   * while-open forwarding table, shown in the overlay's non-focus-stealing (`passive: true`)
   * display. Both flavors are ACTIVE — the caller claims the trigger and the table claims every
   * filter character, so nothing of the palette's ever lands in the document.
   */
  /**
   * Always-current {@link runPaletteSessionKey} (assigned below, once it exists). The palette
   * captures its forwarded-key callback ONCE, when shown, while the handler it must run is rebuilt
   * whenever the session or its dependencies change — the ref is what keeps a long-lived callback
   * pointing at the current one.
   */
  const runPaletteSessionKeyRef = useRef<(event: MarkerPaletteKeyEvent) => void>(() => {});

  const openMarkerPalette = useCallback(
    (ctx: MarkerMenuAnchorContext, items: MarkerMenuItem[], openOptions: { passive: boolean }) => {
      const { passive } = openOptions;
      runMarkerPaletteSession({
        items,
        passive,
        // Space COMMITS (like Enter) when the typed filter exactly names a NOTE marker:
        // materializing the typed `\f ` literal instead would hand it to the Tier-2
        // tokenizer, which mid-text absorbs the following word into the new footnote as its
        // caller. Committing inserts an empty footnote exactly like `\f` + Enter.
        shouldSpaceCommit: (filter) => shouldSpaceCommitNoteMarker(items, filter),
        sessionCounterRef: paletteSessionCounter,
        setSession: (session) => {
          paletteSession.current = session;
        },
        clearSessionIfCurrent: (token) => clearPaletteSessionIfCurrent(paletteSession, token),
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (event) => runPaletteSessionKeyRef.current(event),
        show: (keyForwarding) =>
          papi.overlays.showCommandPalette(
            {
              // Every LocalizeKey already resolved: a request with no unresolved item text skips
              // the overlay host's localization await, so the palette can receive forwarded keys
              // the moment it is requested — marker palettes open MID-typing, and keystrokes
              // during that await were dropped.
              items: markerMenuItemsToResolvedPaletteItems(items, localizedStrings),
              anchor: ctx.anchorRect,
              passive,
              // Marker palettes filter on the label ONLY (the label IS the marker): an exact
              // typed marker must never be buried under items whose descriptions contain the
              // typed text.
              searchFields: ['label'],
              // The same key `MarkerMenu` puts in its own search field, so the two ways of
              // picking a marker read identically instead of this one falling back to a generic
              // "Search...". Passed as the key, not a resolved string: the overlay renders in the
              // renderer frame and localizes it there (the palette-open path only awaits
              // localization for ITEM text, so a key here does not reintroduce the
              // dropped-keystroke window). Inert for the passive flavor, which has no search
              // field.
              placeholder: '%markerMenu_searchPlaceholder%',
              keyForwarding,
              // Exact containment only: typing a marker and pressing Space must agree
              // byte-for-byte with the rendered list (keyForwarding already forces this;
              // stated so the semantic survives if the forwarding wiring ever changes).
              disableFuzzyMatching: true,
            },
            webViewId,
          ),
        // The apply path's literal cleanup AND note insertion both silently no-op without a range
        // selection (live-observed: the `\f` literal stranded in the document, no footnote
        // created, and the literal then reached the PDP as data), so a nulled selection is
        // restored from the focus-out capture before the spine focuses and applies.
        restoreSelectionIfLost: () =>
          restoreSelectionIfLost(editorRef.current, lastFocusOutSelectionRef.current),
        focusEditor: () => editorRef.current?.focus(),
        applyItem: (selected) =>
          editorRef.current?.applyMarkerMenuSelection(selected, {
            trigger: 'backslash',
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: false,
          }),
        onShowError: (error) => warnUnlessReplaced('marker palette', error),
      });
    },
    [webViewId, localizedStrings],
  );

  /**
   * Opens the marker palette at the CURRENT caret, exactly as the `\` trigger does — the reopen
   * path for the `\` commit key, so the new session gets identical items, ranking, search bar and
   * zero-match rules rather than a second, subtly different open.
   */
  const openMarkerPaletteAtCaret = useCallback((): boolean => {
    const ctx = editorRef.current?.getMarkerMenuContext();
    if (!ctx) return false;
    const items = getMarkerMenuItems(styleInfo ?? defaultStyleInfo, ctx);
    if (items.length === 0) return false;
    openMarkerPalette(ctx, items, { passive: !ctx.hasTextSelection });
    return true;
  }, [openMarkerPalette, styleInfo]);

  /**
   * Routes ONE key through the open session — the single implementation behind both entry points:
   * this web view's capture-phase listener (used while the editor holds focus) and the keys the
   * palette forwards back (used while the palette holds focus). Two entry points, one semantics.
   *
   * Shared while-open forwarding table (platform-bible-react), the single source of the session key
   * semantics for BOTH this web view and the FootnoteEditor popover — the per-consumer copies
   * drifted once already. Overlay ops wrap the overlay service for this web view; the commit ops
   * are EDITOR-side applies this web view owns (it holds the editor ref). The table calls
   * `dismiss()` right after each, resolving the show promise `undefined` — which
   * openMarkerPalette's `.then` treats as a dismissal, so nothing double-applies.
   */
  const runPaletteSessionKey = useCallback(
    (event: MarkerPaletteKeyEvent) => {
      const session = paletteSession.current;
      if (!session) return;
      const outcome = handleMarkerPaletteSessionKeyDown(event, session, {
        update: (update) => papi.overlays.updateCommandPalette(webViewId, update),
        commit: () => papi.overlays.commitCommandPaletteSelection(webViewId),
        dismiss: () => papi.overlays.dismissCommandPalette(webViewId),
        commitTyped: (typed) => editorRef.current?.commitTypedMarker(typed),
        commitTypedAndReopen: (typed) => {
          // The `\` commit: same materialization as Space with NO terminating space, then a
          // fresh palette for the backslash just pressed. Showing a new palette replaces the
          // current overlay (the old show promise rejects ABORTED, already handled), so there is
          // no explicit dismiss to sequence against the commit.
          editorRef.current?.commitTypedMarker(typed, { trailingSpace: false });
          openMarkerPaletteAtCaret();
        },
        commitTypedCloser: (typed) => editorRef.current?.commitTypedCloser(typed),
        commitItem: (marker) => {
          const selected = session.items.find((item) => item.marker === marker);
          if (!selected) return;
          editorRef.current?.applyMarkerMenuSelection(selected, {
            trigger: 'backslash',
            literalPrefixLanded: false,
          });
        },
      });
      // Clear only if this session is still the current one: a `\` commit opens a REPLACEMENT
      // session synchronously inside the table call, and an unconditional clear would kill it.
      if (outcome === 'ended') clearPaletteSessionIfCurrent(paletteSession, session.token);
    },
    [webViewId, openMarkerPaletteAtCaret],
  );

  useEffect(() => {
    runPaletteSessionKeyRef.current = runPaletteSessionKey;
  }, [runPaletteSessionKey]);

  /**
   * Opens the Enter-triggered paragraph-split palette (`getEnterMenuItems` /
   * `EditorRef.splitParagraphWithMarker`). Always a focused palette — nothing lands on the Enter
   * keypress itself, so there's no forwarding table to drive and no literal prefix to clean up.
   */
  const openEnterPalette = useCallback(
    (ctx: MarkerMenuAnchorContext, items: MarkerMenuItem[]) => {
      paletteSessionCounter.current += 1;
      const token = paletteSessionCounter.current;
      paletteSession.current = { kind: 'enter', token, filter: '', items };

      papi.overlays
        .showCommandPalette(
          {
            // Pre-resolved for the same reason as the `\` palette above: no localization await,
            // so the palette is drivable the moment it is requested.
            items: markerMenuItemsToResolvedPaletteItems(items, localizedStrings),
            anchor: ctx.anchorRect,
            passive: false,
            // Marker palette: label-only matching, same as the `\` palette above.
            searchFields: ['label'],
          },
          webViewId,
        )
        .then((id) => {
          clearPaletteSessionIfCurrent(paletteSession, token);
          // The Enter palette is always focused, so the editor is blurred the whole time it is
          // open and Lexical's blur processing can null the live selection; a nulled selection
          // makes the split land at the document end (focus() cannot restore it). Put the caret
          // back from the focus-out capture before splitting, same as the `\` palette above.
          restoreSelectionIfLost(editorRef.current, lastFocusOutSelectionRef.current);
          if (id !== undefined) editorRef.current?.splitParagraphWithMarker(id);
          editorRef.current?.focus();
          return undefined;
        })
        .catch((error: unknown) => {
          clearPaletteSessionIfCurrent(paletteSession, token);
          editorRef.current?.focus();
          warnUnlessReplaced('Enter palette', error);
        });
    },
    [webViewId, localizedStrings],
  );

  /**
   * `FootnoteEditor`'s marker-palette driver, wrapping `papi.overlays.*` with this web view's
   * `webViewId`. Built once and passed down so the popover's own editor gets the same PT9-parity
   * `\` palette as the main editor without `platform-bible-react` depending on the overlay service
   * directly. Unlike `openMarkerPalette`/`openEnterPalette` above, this carries no session tracking
   * of its own — the popover's `FootnoteEditor` owns its own session state and only needs the four
   * overlay primitives forwarded through. Anchor coordinates from the popover's own inner editor
   * are already iframe-relative (same iframe as this web view), so they're passed straight through
   * with no translation.
   */
  const footnoteMarkerPalette = useMemo<FootnoteEditorMarkerPalette>(
    () => ({
      // All FOUR parameters forwarded. TypeScript accepts a shorter implementation arity, so a
      // three-parameter version compiled while silently dropping `keyForwarding` — the popover's
      // selection-`\` palette then opened focus-stealing with no forwarding, and the Space/`*`/
      // `\`/Backspace commit semantics never ran.
      show: (items, anchor, passive, keyForwarding) =>
        papi.overlays.showCommandPalette(
          {
            // Resolved here for the same reason the main editor resolves its own items: an
            // unresolved LocalizeKey (the close-tag badge) sends the request down the overlay
            // host's localization await, and keys typed during that await are dropped — which,
            // for a palette opened MID-typing, opens it with an empty filter over a session that
            // has already moved on.
            items: resolvePaletteItemStrings(items, localizedStrings),
            anchor,
            passive,
            keyForwarding,
            // Marker palette: label-only matching (the label IS the marker), same as the main
            // editor's `\`/Enter palettes above.
            searchFields: ['label'],
            // The same placeholder the main editor's marker palettes use, so the popover's palette
            // does not fall back to the generic "Search...".
            placeholder: '%markerMenu_searchPlaceholder%',
            // Exact containment only, same as the main editor's marker palettes: the rendered
            // list participates in commit semantics.
            disableFuzzyMatching: true,
          },
          webViewId,
        ),
      update: (update) => papi.overlays.updateCommandPalette(webViewId, update),
      commit: () => papi.overlays.commitCommandPaletteSelection(webViewId),
      dismiss: () => papi.overlays.dismissCommandPalette(webViewId),
    }),
    [webViewId, localizedStrings],
  );

  // Capture the last live selection whenever focus leaves the main editor's input. A palette
  // mouse click (the overlay lives in the renderer frame, outside this iframe's document) steals
  // focus BEFORE the commit round-trips, and Lexical's blur-path selection processing can NULL
  // the editor-state selection — after which focus() no longer restores the caret: with no
  // selection it falls back to selecting the document END. focusout fires synchronously at the
  // moment of the steal, ahead of that nulling, so the selection read here is the caret the user
  // last saw; the palette commit paths restore it (restoreSelectionIfLost) when they find the
  // live selection gone. Only overwrite when readable: if the selection is already gone at
  // focusout, the previous capture is the best remaining approximation. Scoped to the main
  // editor's own input inside editorContainerRef — the footnote popover's editor renders in a
  // portal outside it and keeps its own capture. Cleared on book/chapter change: the capture is
  // in content coordinates, so it must never be restored into different chapter content.
  useEffect(() => {
    lastFocusOutSelectionRef.current = undefined;
    const handleFocusOut = (event: FocusEvent) => {
      const editorInput = editorContainerRef.current?.querySelector('.editor-input');
      if (!editorInput || event.target !== editorInput) return;
      const selection = editorRef.current?.getSelection();
      if (selection) lastFocusOutSelectionRef.current = selection;
    };
    window.addEventListener('focusout', handleFocusOut);
    return () => window.removeEventListener('focusout', handleFocusOut);
  }, [scrRef.book, scrRef.chapterNum]);

  // #endregion Marker Palettes

  // #region Keydown Routing

  // Ctrl+F opens Find for this editor's own project. Uses the same hook as the read-only reference
  // panels so there is a single Ctrl+F→openFind implementation across every scripture tab type.
  useOpenFindShortcut(webViewId, projectId);

  // `.editor-input` is the Lexical content element (the same selector the marker-menu handler uses).
  const getSelectionBeforePointerPress = useSelectionSnapshot('.editor-input');

  /**
   * The text the tab menu's Find item should search for: the live selection, or — when the click
   * that opened the menu has already collapsed it — what was selected just before that click.
   *
   * Only the menu path consults the snapshot, because only a pointer press destroys the selection
   * it is about to act on. Ctrl+F (`useOpenFindShortcut`) reads the live selection directly and
   * deliberately does NOT fall back here: a keystroke destroys nothing, so the live value is always
   * the honest answer. Falling back would let a selection made much earlier pre-fill and
   * immediately re-run a search, overwriting whatever term the user already had in an open Find
   * panel.
   */
  const getMenuFindSelectionText = useCallback(
    () =>
      resolveFindSelectionText(window.getSelection()?.toString(), getSelectionBeforePointerPress()),
    [getSelectionBeforePointerPress],
  );

  // Listen for the marker menu trigger to open the marker menu, for Ctrl+T / Ctrl+Shift+T to
  // insert a footnote/cross-reference, and for
  // Cmd+Alt+M (macOS) or Ctrl+Alt+M / Ctrl+Shift+N (Windows/Linux) to insert comment at selection
  useEffect(() => {
    // CAPTURE phase: the Standard-view `\`/Enter marker palettes must run BEFORE Lexical's own
    // root-element keydown listener. Lexical dispatches KEY_ENTER_COMMAND synchronously from that
    // listener, so a window BUBBLE-phase handler runs too late — the paragraph has already split
    // before it can preventDefault. Registering in capture puts this ahead of Lexical.
    // Every claimed key (the `\`/Enter triggers and the whole in-session table: filter
    // characters, Space, Arrow/Enter/Escape/Backspace) additionally stopPropagations so Lexical
    // never processes it — under the ACTIVE palette nothing of the palette's may land in the
    // document. Keys the table declines (IME composition, pure modifiers, chords, resumed-typing
    // dismissals) still propagate. The legacy non-standard-view interception stays in the
    // bubble-phase `handleKeyDown` below, unchanged.
    const handleStandardViewTriggers = (event: KeyboardEvent) => {
      // Never intercept IME composition keys: an Enter (or `\`) that confirms or feeds a
      // CJK/complex-script candidate arrives with `isComposing` (keyCode 229) and must reach
      // Lexical's own composition-guarded handlers, not open a marker palette. This capture-phase
      // listener runs ahead of MarkerEditPlugin's `editor.isComposing()` guard, so it needs its own.
      if (event.isComposing || event.keyCode === 229) return;

      // Scoped to the MAIN editor instance via `isFocused()`, not a global `.editor-input` query:
      // the footnote-editor popover renders its own `.editor-input`, and a captured element goes
      // stale across an editor remount. Evaluated per-event so it always reflects current focus.
      if (viewType === 'standard' && !isReadOnlyEffective && editorRef.current?.isFocused()) {
        const session = paletteSession.current;

        if (session) {
          // Through the ref so this listener and the palette's forwarded keys provably run the
          // same handler (and so this effect needs no dependency on it).
          runPaletteSessionKeyRef.current(event);
          return;
        }

        // Everything below runs only with no open session — the `if (session)` above returns.
        if (event.key === defaultMarkersMenuTrigger) {
          // ACTIVE palette: the trigger never lands, whatever the selection shape — typing
          // filters the palette, not the document. In capture phase the claim keeps Lexical
          // from ever seeing the `\`. (`passive` still selects the overlay's
          // non-focus-stealing display for the collapsed caret.)
          // Claimed only when a palette actually opens: with nothing to offer, the `\` is an
          // ordinary character and must still reach the document.
          if (openMarkerPaletteAtCaret()) {
            event.preventDefault();
            event.stopPropagation();
          }
          return;
        }

        // Enter is claimed in EVERY modifier state, which is why this tests the key alone (PT9
        // parity: KeyPressEditHandler has no modifier check). An unclaimed Ctrl/Alt/Meta+Enter
        // would let Lexical plain-split the paragraph — the unmarked empty-paragraph merge problem
        // this palette exists to prevent — and Shift+Enter's soft line break has no USFM
        // representation, so it serializes as a plain space: the same data problem as an unmarked
        // split.
        if (event.key === 'Enter') {
          const ctx = editorRef.current?.getMarkerMenuContext();
          // Pass through untouched when there's no context, inside a note, or inside marker glyph
          // text — the library engine owns Enter in those cases (e.g. `\fp` inside a footnote).
          if (!ctx || ctx.noteMarker || ctx.inMarkerText) return;
          const items = getEnterMenuItems(styleInfo ?? defaultStyleInfo, ctx);
          if (items.length === 0) return;
          event.preventDefault();
          event.stopPropagation();
          openEnterPalette(ctx, items);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Shows the marker menu if it isn't already being shown and if the editor is currently selected
      if (currentSelectionRef.current) {
        if (
          !showMarkersMenu &&
          editorRef.current?.isFocused() &&
          viewType !== 'standard' &&
          event.key === defaultMarkersMenuTrigger
        ) {
          event.preventDefault();
          showInlineMarkersMenu();
        } else if (showMarkersMenu && event.key === 'Escape') {
          event.preventDefault();
          setShowMarkersMenu(false);
        }
      }

      const isInsertCommentHotkey = isMac
        ? event.metaKey &&
          event.altKey &&
          // In some cases, Mac interprets Option+M as 'µ', so check both 'm' just in case
          (event.key.toLowerCase() === 'm' || event.key.toLowerCase() === 'µ')
        : (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'm') ||
          (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'n');
      if (isInsertCommentHotkey) {
        event.preventDefault();
        event.stopPropagation();
        insertCommentAtCurrentSelection();
      } else if (
        !isReadOnlyEffective &&
        viewType === 'standard' &&
        editorRef.current?.isFocused() &&
        event.ctrlKey &&
        // AltGr reports as Ctrl+Alt on Windows/Linux, and it is how `t`-bearing characters are
        // typed on several European layouts — so an unqualified Ctrl+T would eat those keystrokes
        // and insert a footnote instead. Meta is excluded for the same reason: it is a different
        // chord, not this one.
        !event.altKey &&
        !event.metaKey &&
        event.key.toLowerCase() === 't'
      ) {
        // Ctrl+T inserts a footnote; Ctrl+Shift+T inserts a cross-reference. Scoped to
        // the main editor via the same `editorRef.current.isFocused()` check used for the marker
        // menu trigger above, so the shortcut doesn't fire while the FootnoteEditor/CommentEditor
        // popovers (which have their own separate `.editor-input`) have focus. Standard-view only,
        // matching the other Standard view PT9-parity entry points.
        event.preventDefault();
        // Both are async and this handler is not, so surface a rejection instead of dropping it as
        // an unhandled promise: the user pressed a key and must not be left with no marker and no
        // explanation.
        const isCrossReference = event.shiftKey;
        const insert = isCrossReference
          ? insertCrossReferenceAtCurrentSelection()
          : insertFootnoteAtCurrentSelection();
        insert.catch((error) => {
          logger.warn(
            `Error inserting ${isCrossReference ? 'cross-reference' : 'footnote'} from keyboard shortcut: ${getErrorMessage(error)}`,
          );
        });
      }
    };

    window.addEventListener('keydown', handleStandardViewTriggers, { capture: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleStandardViewTriggers, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    insertCommentAtCurrentSelection,
    insertFootnoteAtCurrentSelection,
    insertCrossReferenceAtCurrentSelection,
    showMarkersMenu,
    showInlineMarkersMenu,
    isMac,
    isReadOnlyEffective,
    viewType,
    styleInfo,
    openMarkerPaletteAtCaret,
    openEnterPalette,
  ]);

  // #endregion Keydown Routing

  // Apply annotation styles from extensions
  useAnnotationStyleSheet();

  // Apply the project stylesheet-derived CSS (standard view only)
  useProjectStylesheet(styleInfo, textDirectionEffective === 'rtl', viewType === 'standard');

  // Load PT9-derived marker styles when the open project is a supported commentary
  useCommentaryMarkerStyles(projectId);

  const [decorationsLocalizedStringsBase] = useLocalizedStrings(
    useMemo(() => getLocalizeKeysFromDecorations(decorations), [decorations]),
  );

  /**
   * Localized strings from the decorations.
   *
   * If it doesn't have a localized string value for the key you pass in, it will return the key. As
   * such, you always get the appropriate string to use for any key you pass in.
   */
  const decorationsLocalizedStrings = useMemo(
    () =>
      // We are creating a proxy that provides this conversion, but TS can't tell that is the case
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      new Proxy(decorationsLocalizedStringsBase as Record<string, string>, {
        get(target, prop: string) {
          if (prop in target) return target[prop];
          // If the string is not in the localized strings, just return the string as it is probably
          // not a localize key
          return prop;
        },
      }),
    [decorationsLocalizedStringsBase],
  );

  /**
   * Scripture reference we set most recently. Used so we don't scroll on updates to scrRef that
   * come from us
   */
  const internalVerseLocationRef = useRef<SerializedVerseRef | undefined>(undefined);

  // When true, allow the next scrRef change that matches `internalVerseLocationRef` to
  // trigger scrolling/highlighting. This is used when the editor initiates a selection change
  // (e.g., via `selectNote`) and we want to treat that internal change like an external one
  // for the purposes of scrolling. This volatile flag is cleared the first time the
  // scrRef-useEffect observes it, so there is a risk of a race condition.
  const allowScrollForInternalRef = useRef(false);

  const setScrRefNoScroll = useCallback(
    (newVerseLocation: SerializedVerseRef) => {
      // Preserve versificationStr so the PDP selector doesn't change on every click. Against
      // platform-editor 0.8.15 the fallback is a no-op: `positionToScrRef` carries the host's
      // `versificationStr` on every position report (a document states no versification of its
      // own), and that plugin is the sole caller of this handler. Kept as cheap insurance in case
      // that contract changes — versions before 0.8.15 reported positions without it.
      const preservedLocation: SerializedVerseRef = {
        ...newVerseLocation,
        versificationStr: newVerseLocation.versificationStr ?? scrRef.versificationStr,
      };
      internalVerseLocationRef.current = preservedLocation;
      setScrRefWithScroll(preservedLocation);
    },
    [setScrRefWithScroll, scrRef.versificationStr],
  );

  /**
   * Whether we have gotten the Scripture data for the very first time. Used to scroll to the
   * current scrRef on startup
   */
  const hasFirstRetrievedScripture = useRef(false);

  // The chapter-data selector. Also passed to `useEditorPdpSync` as the document identity of
  // whatever data this subscription delivers — keep it the SAME memoized object for both so the
  // data/identity pairing can't drift.
  const chapterUsjSelector = useMemo(() => {
    return {
      book: scrRef.book,
      chapterNum: scrRef.chapterNum,
      verseNum: 1,
      versificationStr: scrRef.versificationStr,
    };
  }, [scrRef.book, scrRef.chapterNum, scrRef.versificationStr]);

  const [usjFromPdpPossiblyError, saveUsjToPdpRaw, isUsjFromPdpLoading] = useProjectData(
    'platformScripture.USJ_Chapter',
    projectId,
  ).ChapterUSJ(
    chapterUsjSelector,
    defaultUsj,
    // `whichUpdates` set to `*` because we need to receive all updates instead of just ones that
    // are not deeply equal so we can tell when the PDP finished processing our latest changes sent
    useMemo(() => ({ whichUpdates: '*' }), []),
  );
  // What the failure in hand IS, independent of what is on screen. Parsed once per failure, and
  // deliberately not keyed on the reference: the same held error is re-read on every navigation, and
  // re-parsing (and re-logging) it each time is pure waste.
  const usjFromPdpError = useMemo(() => {
    if (!isPlatformError(usjFromPdpPossiblyError)) return undefined;
    return {
      message: getErrorMessage(usjFromPdpPossiblyError),
      isMissingBook: isMissingBookError(usjFromPdpPossiblyError),
      identities: parseMissingBookError(usjFromPdpPossiblyError),
    };
  }, [usjFromPdpPossiblyError]);

  // Handle a PlatformError if one comes in instead of project text.
  //
  // "Book not in this project" is decided by comparing what the failure NAMES against the book and
  // project on screen, not by the failure's mere presence. The hook keeps serving the previous
  // selector's result until the new subscription's first update lands, so a bare predicate would
  // report a missing book for one committed render after the user navigates to a book the project
  // does have.
  //
  // Pure: the diagnostics this decision would otherwise emit live in the effect below, so that a
  // render pass — or React's double-invocation of memos in development — cannot write to the log.
  const [usjFromPdp, bookExists] = useMemo(() => {
    if (!isPlatformError(usjFromPdpPossiblyError)) return [usjFromPdpPossiblyError, true];
    // Unreachable while `usjFromPdpError` is derived from this same value; keeps the narrowing
    // above and the memo below reading from one source rather than re-testing the error shape.
    if (!usjFromPdpError) return [defaultUsj, true];

    // The comparison needs both identities parsed out of the message. If that wording ever drifts
    // so they cannot be, fall back to detection alone rather than to `bookExists`: a STALE failure
    // always parses — it names some other book or project — so an unparseable one cannot be stale.
    // This gate has no neutral outcome, and the alternative is the worse one; `bookExists` true
    // with USJ that never arrives leaves this editor on an indefinite spinner.
    const isBookMissingHere =
      isMissingBookInfoOnScreen({
        missingBook: usjFromPdpError.identities,
        currentBookNum,
        projectId,
      }) ||
      (usjFromPdpError.isMissingBook && !usjFromPdpError.identities);

    return [defaultUsj, !isBookMissingHere];
  }, [usjFromPdpError, usjFromPdpPossiblyError, currentBookNum, projectId]);

  // A book the project simply lacks is ordinary navigation rather than a fault, so it is logged at
  // `debug`, which packaged builds drop (`global-this.model.ts` runs at `info` when packaged). That
  // is deliberate: it fires on every navigation into a missing book, and the quiet path is the
  // CORRECT one — if detection ever broke, the same failure would fall to `error` and stay loud in
  // production. Keyed on the failure alone so that paging through books while one sticky failure is
  // held (a permissions error, an offline PDP) writes one line rather than one per book.
  useEffect(() => {
    if (!usjFromPdpError) return;
    if (usjFromPdpError.isMissingBook)
      logger.debug(`Book not found in project: ${usjFromPdpError.message}`);
    else logger.error(`Error getting USJ from PDP: ${usjFromPdpError.message}`);
  }, [usjFromPdpError]);

  // A message that parses into the WRONG project is the one shape neither branch of `bookExists`
  // covers: the fallback needs the parse to FAIL, so a mis-parse leaves `bookExists` true with USJ
  // that never arrives — an indefinite spinner rather than the missing-book message. The known
  // trigger is a trailing sentence on the same line, because the identity capture runs greedily to
  // the terminal period so that project ids containing `.` survive; narrowing it only trades one
  // break for the other, so this warns rather than changing the parse.
  //
  // `isOverrunProjectIdParse` is what keeps this off the common paths. Both ordinary staleness
  // (which names the book the user just left) and switching projects at the same reference (which
  // names a genuinely different project) are quiet, because only an over-run capture starts with the
  // id actually on screen.
  // TODO(PT-4416): Replace message matching with a structured error carrying the book and project.
  useEffect(() => {
    const identities = usjFromPdpError?.identities;
    if (
      !identities ||
      identities.bookNum !== currentBookNum ||
      !isOverrunProjectIdParse(identities.projectId, projectId)
    )
      return;
    logger.warn(
      `Book-not-found error names project "${identities.projectId}" but this editor is showing "${projectId}", so the message cannot be trusted to describe the book on screen. If the editor never finishes loading, suspect the exception's wording: ${usjFromPdpError.message}`,
    );
  }, [usjFromPdpError, currentBookNum, projectId]);
  const usjSentToPdp = useRef<Usj | undefined>(usjFromPdp);
  const currentlyWritingUsjToPdp = useRef(false);
  // Monotonic count of PDP deliveries observed — the failed-save retry gate's other half.
  // `withWriteInFlightGuard` owns the in-flight flag for exactly the write's own duration, so the
  // flag carries no information about deliveries; this counter is what lets a failed save tell
  // whether newer PDP data arrived while its write was in flight (see the retry gate in
  // `saveUsjToPdpInternal`, which deliberately does NOT re-push over an overlapped delivery).
  //
  // Counted on the RAW subscription value, not the error-mapped `usjFromPdp`: the PlatformError
  // path above maps every errored delivery to the same module-level `defaultUsj` constant, whose
  // unchanged identity would leave the count still — a save that failed during an error burst
  // would then read "no delivery arrived" and re-push while deliveries were in fact streaming in.
  // Each raw delivery (success or error) is a fresh object, so identity is a faithful signal
  // here.
  const pdpDeliveryCount = useRef(0);
  useEffect(() => {
    pdpDeliveryCount.current += 1;
  }, [usjFromPdpPossiblyError]);

  // Single source of truth for "is the footnotes pane ACTUALLY rendered": the same value gates the
  // `FootnotesLayout` render below AND (mirrored into `footnotesPaneRenderedRef`) the
  // `noteCallerOnClick` routing, so a caller click can never be routed to a pane that is not really
  // there. Deriving it once keeps the render gate and the click routing from drifting apart.
  const footnotesPaneRendered = footnotesPaneVisible && !!usjFromPdp;
  useEffect(() => {
    footnotesPaneRenderedRef.current = footnotesPaneRendered;
  }, [footnotesPaneRendered]);
  // Updated in useEffect (which runs after all useLayoutEffects), so this ref is stable for the
  // entire layout phase of each render. If a useLayoutEffect fires during a chapter-change render
  // (e.g. footnote-editor closing), this ref still holds the OLD chapter's setter — preventing
  // footnote changes from being saved to the wrong chapter.
  const saveUsjToPdpRawStableRef = useRef<typeof saveUsjToPdpRaw>(saveUsjToPdpRaw);
  useEffect(() => {
    saveUsjToPdpRawStableRef.current = saveUsjToPdpRaw;
  }, [saveUsjToPdpRaw]);

  // `useProjectData`'s underlying `useData` hook doesn't reset its value back to the default when
  // the selector (here, `scrRef`) changes — it keeps the previous chapter's USJ until the new
  // subscription's first update lands. Gating on `isUsjFromPdpLoading` (which DOES flip `true` as
  // soon as the chapter changes, ahead of the round trip) prevents `isBlankChapter` from being
  // computed against stale content: without this, navigating from a blank chapter into a populated
  // one could briefly show the empty-chapter view (and its live, clickable button) over the
  // still-loading real content.
  const isBlankChapter = useMemo(
    () => !isUsjFromPdpLoading && isChapterBlank(usjFromPdp ?? defaultUsj),
    [usjFromPdp, isUsjFromPdpLoading],
  );

  const lastVerse = useMemo(
    () => getEndVerse(scrRef.book, scrRef.chapterNum),
    [scrRef.book, scrRef.chapterNum, getEndVerse],
  );

  // Tracks a scaffold insert this component triggered that hasn't yet been observed to land
  // (`isBlankChapter` flipping to `false`) or been superseded by navigating away. Serves two roles
  // that are always set and reset together: (1) re-entrancy guard for the whole applyUpdate -> save
  // -> PDP-echo round trip (~300ms measured) — while `true`, a second click is a no-op instead of
  // inserting the scaffold twice; (2) "the chapter just stopped being blank because of THIS insert"
  // signal for the refocus effect below, distinguishing that from any other cause of the same
  // transition (ordinary navigation, a remote/collaborative update, a Send/Receive sync landing).
  const pendingScaffoldInsertRef = useRef(false);

  // Scopes `pendingScaffoldInsertRef` to the chapter it was set in: without this, the ref is
  // component-wide, so it leaks across navigation. Two concrete bugs that caused: clicking Add on a
  // blank chapter then navigating to a DIFFERENT blank chapter left the ref stuck `true` forever
  // (since that chapter's `isBlankChapter` never flips `false` to trigger the reset below), making
  // every future click on it silently resolve to `'already-in-flight'`; and navigating mid-flight to
  // a different, already-populated chapter could fire the refocus effect's `.focus()` on THAT
  // chapter instead, stealing focus from wherever the user's navigation put it. Declared before the
  // refocus effect so its reset always lands in an earlier commit than that effect's check.
  useEffect(() => {
    pendingScaffoldInsertRef.current = false;
  }, [scrRef.book, scrRef.chapterNum]);

  const handleAddChapterNumber = useCallback(() => {
    // Defense-in-depth: unreachable while the button is disabled (`disabled={isStructureProtected}`
    // in `EmptyChapterView`), mirroring the same second-layer check already used for the paragraph
    // and inline marker menus in this file — a structural insert like this one should never fire
    // solely because a disabled-state prop drifted out of sync with the action in some future
    // refactor.
    if (isStructureProtected) {
      notifyStructureProtected();
      return;
    }
    const outcome = resolveAddChapterNumberClick(pendingScaffoldInsertRef.current, lastVerse);
    if (outcome === 'already-in-flight') return;
    if (outcome === 'no-versification') {
      // `showButton` below already gates on `canAddChapterNumber(lastVerse)`, so this should be
      // unreachable in normal use. Warn instead of silently returning so a future gap in that gate
      // is diagnosable rather than presenting as "the button did nothing."
      logger.warn(
        `handleAddChapterNumber: no versification entry for ${scrRef.book} chapter ${scrRef.chapterNum}; ignoring click`,
      );
      return;
    }
    pendingScaffoldInsertRef.current = true;
    // Undo for this insert depends on the editor keeping its history across the `onUsjChange` round
    // trip this call sets off: the editor's state-load effect fires Lexical's
    // `CLEAR_HISTORY_COMMAND` unconditionally, so anything that re-runs it moments after an edit
    // wipes the undo stack. `@eten-tech-foundation/platform-editor` 0.8.15 is the first published
    // version that holds that effect's inputs stable BY VALUE rather than by reference; 0.8.14 does
    // not. The pin is `~0.8.15`, so a patch release could regress it without a bump review, and no
    // test here or upstream covers undo for this path — re-check it by hand when the pin moves.
    editorRef.current?.applyUpdate(buildChapterScaffoldOps(scrRef.chapterNum, lastVerse), 'local');
  }, [scrRef.book, scrRef.chapterNum, lastVerse, isStructureProtected, notifyStructureProtected]);

  // `Editorial` stays mounted but visually hidden while the chapter is blank, so any focus/cursor
  // or scroll effect Lexical/the "scroll the selected verse" effect above would normally run for
  // newly-inserted content is a no-op while hidden (`.claude/rules/cross-view-sync-hidden-views.md`)
  // — re-trigger focus AND scroll-into-view explicitly once the insert *this component* triggered
  // actually lands. The "scroll the selected verse" effect above is keyed on `scrRef`, which doesn't
  // change across this insert (same chapter, no navigation), so it never re-fires on its own once
  // the editor un-hides — without the explicit `scrollToVerse` call here, a blank chapter opened at
  // `verseNum > 1` would land scrolled to the top instead of at that verse. Gated on
  // `pendingScaffoldInsertRef` so ordinary chapter navigation away from a blank chapter, a
  // remote/collaborative update landing content, or a Send/Receive sync completing (all of which can
  // also flip `isBlankChapter` to `false`) do not steal focus or scroll.
  useEffect(() => {
    if (isBlankChapter) return;
    // The round trip the in-flight guard above was waiting for has completed, regardless of what
    // caused this transition.
    if (pendingScaffoldInsertRef.current) {
      scrollToVerse(scrRef);
      editorRef.current?.focus();
    }
    pendingScaffoldInsertRef.current = false;
  }, [isBlankChapter, scrRef]);

  /**
   * Creates a click handler for a comment annotation that opens the comment list and scrolls to the
   * specified thread.
   *
   * @param threadId The ID of the thread to scroll to when the annotation is clicked
   * @returns A click handler function that can be passed to setAnnotation
   */
  const createCommentAnnotationClickHandler = useCallback(
    (threadId: string) => async () => {
      await openCommentListAndSelectThreadSafe(papi, webViewId, threadId);
    },
    [webViewId],
  );

  const handleFootnoteSelected = useCallback((index: number) => {
    // Mark that we want the next scrRef change (even if it matches our internalVerseLocationRef)
    // to trigger scrolling/highlighting. This volatile flag is cleared the first time the
    // scrRef-useEffect observes it, so there is a risk of a race condition. It would be better to
    // note the Scripture reference of this note and check for that in the scrRef-useEffect, but at
    // this time, notes don't have Scripture references filled in and `selectNote` does not return
    // that information.
    allowScrollForInternalRef.current = true;
    editorRef.current?.selectNote(index);
  }, []);

  // #region PDP Save Write Path

  /* If the editor has updates that the PDP hasn't recorded, save them to the PDP. Resolves `true`
   * only when a write actually RAN (the in-flight guard accepted it) — the deferral bookkeeping
   * in `useEditorPdpSync` records a push only on that confirmation, so a dropped save is never
   * misremembered as content that left the editor. */
  const saveUsjToPdpIfUpdated = useMemo(() => {
    function saveUsjToPdpIfUpdatedInternal(
      usjFromEditor = editorRef.current?.getUsj(),
    ): Promise<boolean> {
      if (!usjFromEditor) return Promise.resolve(false);

      // An open command surface's in-progress input is excluded by the editor itself
      // (`setTransientInput`), so what arrives here is already the document we mean to save.
      const usjToSave = resolveUsjToSaveToPdp(correctEditorUsjVersion(usjFromEditor), usjFromPdp);
      if (usjToSave) return saveUsjToPdpInternal(usjToSave);
      return Promise.resolve(false);
    }

    // Not wired directly to the editor's `onUsjChanged`: the editor fires `onUsjChanged` even
    // when its USJ is SET programmatically, so a save wired there would echo every applied update
    // straight back to the PDP. Until that is fixed, `saveUsjToPdpIfUpdated` (which compares
    // first) is used everywhere.
    /**
     * Tells the user a save failed, for the two backend rejections that are worth surfacing: a
     * sync-edit-block (expected and transient — editing pauses during an automatic Send/Receive, so
     * a warning) and a permissions failure (an error). Touches no editor content, so both the live
     * rejection path and the zombie path can report through it.
     *
     * @returns Whether the rejection was one of those two.
     */
    async function notifyRecoverableSaveFailure(errorMessage: string): Promise<boolean> {
      const isSyncEditBlocked = SYNC_EDIT_BLOCKED_REGEX.test(errorMessage);
      const isPermissionsError = PERMISSIONS_EXCEPTION_REGEX.test(errorMessage);
      if (!isSyncEditBlocked && !isPermissionsError) return false;

      try {
        if (isSyncEditBlocked) {
          await notifySyncEditBlocked();
        } else {
          await papi.notifications.send({
            severity: 'error',
            message: formatReplacementString(
              localizedStrings['%webView_platformScriptureEditor_error_permissions_format%'],
              { projectName },
            ),
          });
        }
      } catch (innerError) {
        logger.error(
          `Error handling ${
            isSyncEditBlocked ? 'sync-edit-block' : 'permissions'
          } exception when saving USJ to PDP: ${getErrorMessage(innerError)}`,
        );
      }
      return true;
    }

    async function saveUsjToPdpInternal(newUsj: Usj): Promise<boolean> {
      const rawSave = saveUsjToPdpRawStableRef.current;
      if (!rawSave) return false;

      const deliveriesAtWriteStart = pdpDeliveryCount.current;
      try {
        // `withWriteInFlightGuard` holds `currentlyWritingUsjToPdp` for exactly the duration of the
        // write and clears it when the write settles — so it is never reset mid-write by an
        // unrelated PDP update and never left stuck. It is a no-op (`ran: false`) when a write is
        // already in flight, which is how we avoid triggering multiple concurrent writes.
        const outcome = await withWriteInFlightGuard(currentlyWritingUsjToPdp, () => {
          usjSentToPdp.current = newUsj;
          return rawSave(newUsj);
        });
        if (!outcome.ran) {
          if (outcome.released) {
            // A zombie write — one that settled only after the guard's 60s release. If it RESOLVED,
            // its bytes reached the PDP and the release warning already said all there is to say.
            // If it REJECTED, the user's edits did not save, so say so — but do NOT restore
            // `usjFromPdp` the way the live rejection path below does: that snapshot is at least as
            // old as the release, so restoring it would discard every edit made since.
            if (outcome.error !== undefined) {
              const zombieMessage = getErrorMessage(outcome.error);
              logger.error(
                `Error saving USJ to PDP (write rejected after the in-flight guard released, so the editor keeps its content): ${zombieMessage}`,
              );
              await notifyRecoverableSaveFailure(zombieMessage);
            }
            return false;
          }
          // A save arriving while another write is in flight is DROPPED here, not queued: the
          // debouncer has already consumed its pending args, and the echo-driven push-back only
          // re-pushes while the editor still shows this document — so a chapter-switch flush
          // that lands on a held guard loses those edits outright. Surface it loudly until a
          // re-queue exists.
          logger.warn(
            'saveUsjToPdp: dropped a save because another PDP write was already in flight — ' +
              'no retry is queued for this content, so if this was a chapter-switch flush the ' +
              'flushed edits did not reach the PDP',
          );
          return false;
        }
        const { result: saveResult } = outcome;

        // Prompts the PDP to commit changes to the version history once a day if the save was successfully
        if (saveResult && projectId) {
          try {
            await papi.commands.sendCommand('paratextBibleSendReceive.commitDaily', projectId);
          } catch (err: unknown) {
            const errMessage = getErrorMessage(err);
            // Requires the `commitChanges` command handler to throw
            // `PlatformUnimplementedException` having the `ERROR_UNIMPLEMENTED` prefix to
            // successfully handle if this command is not implemented in the application version
            if (errMessage.includes('ERROR_UNIMPLEMENTED')) {
              logger.info(errMessage);
            } else {
              logger.warn(
                `Error committing version history after saving USJ to PDP: ${getErrorMessage(err)}`,
              );
            }
          }
        } else if (!saveResult) {
          // The set was unsuccessful, so there is a chance the editor has more updates since the
          // last attempted save. Retry ONLY when no newer PDP data arrived while the write was
          // in flight: a delivery that landed mid-write may carry a concurrent external change
          // (a Send/Receive merge, another app's write), and an unconditional re-push would
          // clobber it with content from before the merge. The deferral logic owns that
          // reconciliation; a delivery-overlapped failure leaves it to the incoming update.
          if (pdpDeliveryCount.current !== deliveriesAtWriteStart) {
            logger.debug(
              'saveUsjToPdp: a PDP update arrived while the failed write was in flight; ' +
                'skipping the retry and letting the incoming update reconcile.',
            );
            return true;
          }
          let editorUsj = editorRef.current?.getUsj();
          if (editorUsj) editorUsj = correctEditorUsjVersion(editorUsj);
          if (!deepEqualAcrossIframes(editorUsj, newUsj)) saveUsjToPdpIfUpdatedInternal(editorUsj);
        }
        return true;
      } catch (e) {
        // The write rejected while it still owned the guard, so the guard's `finally` cleared
        // the in-flight flag (a rejection AFTER the release comes back as `outcome.error` above).
        const errorMessage = getErrorMessage(e);
        logger.error(`Error saving USJ to PDP: ${errorMessage}`);

        // The two recoverable backend rejections revert the editor to the last PDP state and
        // notify. The revert is safe here and only here: this write still owns the guard, so
        // `usjFromPdp` is the state the failed write started from rather than a stale snapshot.
        if (
          SYNC_EDIT_BLOCKED_REGEX.test(errorMessage) ||
          PERMISSIONS_EXCEPTION_REGEX.test(errorMessage)
        ) {
          try {
            if (usjFromPdp && editorRef.current) {
              usjSentToPdp.current = usjFromPdp;
              setEditorUsj.current(usjFromPdp);
            }
          } catch (innerError) {
            logger.error(
              `Error restoring the last PDP state after a failed save: ${getErrorMessage(innerError)}`,
            );
          }
          await notifyRecoverableSaveFailure(errorMessage);
        }
        // The write RAN (and rejected); only a guard-dropped save reports false, since that is
        // the one case where the content never left the editor at all.
        return true;
      }
    }

    return saveUsjToPdpIfUpdatedInternal;
  }, [usjFromPdp, projectName, localizedStrings, projectId, notifySyncEditBlocked]);

  // #endregion PDP Save Write Path

  /**
   * Close the footnote editor, optionally deleting the note from the main editor first. Pass
   * `deleteIfNew = true` when the user explicitly discards (X button); pass `false` when the note
   * was already deleted externally so there is nothing left to remove.
   */
  const closeFootnoteEditor = useCallback((deleteIfNew: boolean) => {
    if (deleteIfNew && editingNoteIsNew.current && editingNoteKey.current)
      editorRef.current?.replaceEmbedUpdate(editingNoteKey.current, []);
    editingNoteIsNew.current = false;
    editingNoteKey.current = undefined;
    editingNoteOps.current = undefined;
    editingNoteSessionRefreshedAt.current = undefined;
    setShowFootnoteEditor(false);
  }, []);

  /** Called by FootnoteEditor's onClose prop (X button or save-then-close). */
  const onFootnoteEditorClose = useCallback(() => {
    closeFootnoteEditor(true);
  }, [closeFootnoteEditor]);

  /**
   * Called by FootnoteEditor's onNoteEdit prop on every user edit inside the popover (typing,
   * caller changes). Those edits stay inside the popover's own editor — nothing reaches this main
   * editor (and its `handleEditorialUsjChange` refresh) until a save applies to the parent — so
   * without this stamp a user composing a note for longer than the staleness bound would have a
   * LIVE session reaped as orphaned, discarding the popover mid-edit.
   */
  const onFootnoteEditorNoteEdit = useCallback(() => {
    editingNoteSessionRefreshedAt.current = Date.now();
  }, []);

  const openFootnoteEditorOnNewNote = useCallback((ops?: DeltaOp[], insertedNodeKey?: string) => {
    if (insertedNodeKey && ops) {
      // If we are already editing a note, then returns
      if (editingNoteKey.current) return;

      // Makes sure the node is a note
      const noteOp = ops[1];
      if (!isInsertEmbedOpOfType('note', noteOp)) return;

      const noteElement = editorRef.current?.getElementByKey(insertedNodeKey);
      // Note element must be defined
      if (!noteElement) return;

      const targetRect = noteElement.getBoundingClientRect();
      setNotePopoverAnchorX(targetRect.left);
      setNotePopoverAnchorY(targetRect.top);
      setNotePopoverAnchorHeight(targetRect.height);
      editingNoteKey.current = insertedNodeKey;
      editingNoteOps.current = [noteOp];
      editingNoteSessionRefreshedAt.current = Date.now();
      editingNoteIsNew.current = true;
      setShowFootnoteEditor(true);
    }
  }, []);

  // #region Debounced Save Scheduling

  /**
   * Latest save function behind a stable ref: `saveUsjToPdpIfUpdated`'s identity changes with every
   * `usjFromPdp` update, and recreating the debounced wrapper on each change would drop the pending
   * trailing-edge timer (losing the save of the final keystrokes).
   */
  const saveUsjToPdpIfUpdatedRef = useRef(saveUsjToPdpIfUpdated);
  useEffect(() => {
    saveUsjToPdpIfUpdatedRef.current = saveUsjToPdpIfUpdated;
  }, [saveUsjToPdpIfUpdated]);

  // The chapter currently loaded, kept in a ref so the debounced save's fire (below) can compare
  // the chapter active NOW against the chapter a pending save was scheduled for (see
  // `performDebouncedPdpSave`'s chapter-safety guard). Assigned during render — NOT in an effect —
  // so that at a chapter-switch flush (which runs in an effect cleanup, before effects) it already
  // reflects the NEW chapter and the guard sees the mismatch.
  const chapterKey = getChapterKey(scrRef.book, scrRef.chapterNum, scrRef.versificationStr);
  const chapterKeyRef = useRef(chapterKey);
  chapterKeyRef.current = chapterKey;

  /**
   * For fluent marker typing: saving on EVERY editor change round-trips a mid-marker-typing doc
   * (pending literal `\q1` still in plain text) through the PDP's USFM normalization; the
   * content-different echoes then fight the editor for the doc under the caret ~150-250ms after
   * each keystroke (`useEditorPdpSync` defends the focused editor, but the echo storm itself is the
   * disease). Debounce the keystroke-driven save — trailing edge, so the save always fires once
   * typing rests. The 700ms interval is chosen to kill the per-keystroke echo storm; it is ballpark
   * consistent with PT9's UI timer granularity, not a cited PT9 constant. Only the save half is
   * debounced (the footnote-editor bookkeeping in `handleEditorialUsjChange` must stay
   * synchronous). Imperative saves elsewhere (explicit flows, `useEditorPdpSync`'s push-back) are
   * unaffected.
   *
   * Uses the local flushable debouncer (a fire-and-forget adapter over `platform-bible-utils`'
   * `debounce` and its `flush`/`cancel`) so pending edits survive lifecycle boundaries — see the
   * effects below. Each `schedule` captures the current chapter's save fn and chapter key into the
   * payload, so `performDebouncedPdpSave` can guarantee the save targets the chapter the content
   * was typed in.
   */
  const saveUsjToPdpDebounced = useMemo(
    () =>
      createFlushableDebouncer(
        (usj: Usj, capturedSave: (savedUsj: Usj) => void, scheduledChapterKey: string) => {
          performDebouncedPdpSave({
            usj,
            scheduledChapterKey,
            currentChapterKey: chapterKeyRef.current,
            capturedSave,
            latestSave: (savedUsj?: Usj) => saveUsjToPdpIfUpdatedRef.current(savedUsj),
            getEditorUsj: () => editorRef.current?.getUsj(),
          });
        },
        PDP_SAVE_DEBOUNCE_MS,
      ),
    [],
  );

  // Lifecycle for the debounced save: a pending trailing call must never be LOST (the trailing
  // window is where a crash, dispose, or quit would otherwise take the final edits with it) nor
  // fire against the WRONG chapter's save context.
  //
  // (1) Chapter-document switch: flush in this effect's CLEANUP so a pending trailing save is not
  // dropped when the chapter changes or the web view disposes. The deps mirror `getChapterKey`'s
  // identity fields exactly — book, chapter number, AND versification, since a versification
  // change re-selects the chapter document just as a chapter switch does. Chapter-safety does not
  // rest on React effect ordering: each `schedule` captured the chapter's save fn and chapter key
  // into the payload, and `performDebouncedPdpSave` compares the captured chapter key against
  // `chapterKeyRef.current` (already the NEW chapter here) — a mismatch saves the captured content
  // via the captured save fn instead of reading the now-swapped editor. Unmount runs the same
  // cleanup, covering web-view dispose.
  useEffect(() => {
    return () => {
      saveUsjToPdpDebounced.flush();
    };
  }, [saveUsjToPdpDebounced, scrRef.book, scrRef.chapterNum, scrRef.versificationStr]);

  // (2) Focus loss / page teardown: best-effort flush on window blur and pagehide/beforeunload.
  // The underlying save is async (a papi network send); on teardown paths there is no guarantee
  // the send completes before the renderer dies — this is deliberately best-effort, matching the
  // reliability of any async work in these events. On plain blur the send proceeds normally.
  useEffect(() => {
    const flush = () => saveUsjToPdpDebounced.flush();
    const flushOnBlur = () => {
      // A FOCUSED marker palette is an overlay OUTSIDE this iframe, so opening one blurs this
      // window — a mid-edit save per palette interaction, not a real focus loss. Skip the blur
      // flush while a palette session is open: nothing typed during the session lands in the
      // document (the palette owns the keys and the trigger literal is transient-excluded), so
      // the debounce simply keeps running, and the chapter-switch and teardown flushes still
      // cover the windows this one exists for.
      if (paletteSession.current !== undefined) return;
      flush();
    };
    window.addEventListener('blur', flushOnBlur);
    window.addEventListener('pagehide', flush);
    window.addEventListener('beforeunload', flush);
    return () => {
      window.removeEventListener('blur', flushOnBlur);
      window.removeEventListener('pagehide', flush);
      window.removeEventListener('beforeunload', flush);
    };
  }, [saveUsjToPdpDebounced]);

  /**
   * (3) External replace: fires the pending debounced save, if one is pending, and returns that
   * invocation's promise (`undefined` when nothing was pending). Passed to `useEditorPdpSync`,
   * whose replace path calls it just before an external PDP update overwrites the editor — so
   * recent keystrokes still inside the trailing window are written through the normal save pipeline
   * instead of being silently discarded (see the "recent typing wins" comment there). Stable
   * identity (reads only the stable debouncer) so it never re-triggers the sync effect.
   */
  const flushPendingDebouncedSave = useCallback(() => {
    if (!saveUsjToPdpDebounced.isPending()) return undefined;
    return saveUsjToPdpDebounced.flush();
  }, [saveUsjToPdpDebounced]);

  /**
   * `Date.now()` of the last LOCAL editor edit (`undefined` until the first one). Stamped in
   * {@link handleEditorialUsjChange} for `'local'`-source changes only — the same signal that
   * schedules the debounced PDP save — and read by `useEditorPdpSync`, whose
   * `EDITOR_OWNERSHIP_WINDOW_MS` contract lets the focused editor defer incoming PDP updates only
   * while a local edit is recent. External applies never refresh it (see the stamp site).
   */
  const lastLocalEditTimestamp = useRef<number | undefined>(undefined);

  const handleEditorialUsjChange = useCallback(
    (usj: Usj, ops?: DeltaOp[], source?: DeltaSource, insertedNodeKey?: string) => {
      // Stamp the last LOCAL edit — the recency signal behind useEditorPdpSync's
      // EDITOR_OWNERSHIP_WINDOW_MS focused-deferral contract. Gated on the editor's own change
      // source: `'local'` is what typing, marker applies, and other user-originated editor
      // updates report, while programmatic applies (e.g. the footnote popover's
      // `replaceEmbedUpdate` save) report `'remote'`. An EXTERNAL apply (`setEditorUsj` →
      // `EditorRef.setUsj`) must never refresh this stamp, and it cannot: the editor loads
      // external content under its change-suppression tag (`EXTERNAL_USJ_MUTATION_TAG`, excluded
      // by `DeltaOnChangePlugin`'s ignore list), so it never reaches this callback at all — the
      // source gate is belt-and-braces on top of that.
      if (source === 'local') lastLocalEditTimestamp.current = Date.now();
      // Capture the current chapter's save fn and chapter key into the debounce payload so a
      // pending trailing save always targets the chapter this content was typed in.
      //
      // Schedule the SETTLED, transient-excluded snapshot (`EditorRef.getUsj()`), not the raw
      // `usj` this callback was invoked with: `onUsjChange`'s payload is the unsettled document as
      // typed, and `setTransientInput`'s exclusion applies only to `getUsj()`. A pending trailing
      // save can fire via the cross-chapter flush (`performDebouncedPdpSave`'s `capturedSave`
      // branch) or via the editor-unavailable fallback in its same-chapter branch — neither of
      // those can re-read the editor safely at fire time (the chapter has moved on, or the editor
      // is gone), so the snapshot captured HERE, at schedule time, is what they replay. Reading it
      // settled and transient-excluded now means both replay paths carry canonical bytes instead
      // of a stray palette trigger literal. Falls back to the raw `usj` only if the editor is
      // unavailable at this exact keystroke (should not happen in practice — `onUsjChange` only
      // fires from a mounted editor).
      //
      // LOAD-BEARING: reverting `editorRef.current?.getUsj() ?? usj` back to the plain `usj`
      // argument compiles and passes every existing test — this web view has no component-level
      // test harness for its save-scheduling path — but silently reopens a live corruption class:
      // a save that fires mid-keystroke (the debounce timer, a window-blur flush, or the
      // cross-chapter flush) would then schedule the UNSETTLED bytes directly, bypassing
      // `setTransientInput`'s exclusion entirely, so an in-progress command-surface literal (e.g. a
      // marker-palette trigger) could reach disk as a phantom marker even when the exclusion itself
      // is working correctly. Only a live check (type a trigger literal, force a save before the
      // surface consumes it, inspect the saved bytes) catches a regression on this line.
      saveUsjToPdpDebounced.schedule(
        editorRef.current?.getUsj() ?? usj,
        saveUsjToPdpIfUpdatedRef.current,
        chapterKeyRef.current,
      );
      if (editingNoteKey.current) {
        // Any editor change that lands while the note-editing session is open counts as
        // interaction with it — most importantly the popover's own save path (replaceEmbedUpdate
        // → this callback) — so refresh the session's staleness clock: a live long edit must
        // never be reaped as an orphaned session. This stamp alone is not enough, though: edits
        // made INSIDE the popover never reach this callback until a save applies to the parent,
        // so they refresh the same clock through FootnoteEditor's onNoteEdit
        // (onFootnoteEditorNoteEdit above).
        editingNoteSessionRefreshedAt.current = Date.now();
        // When the FootnoteEditor saves, Lexical emits a replaceEmbedUpdate. This triggers
        // onUsjChange with an insertedNodeKey.
        // Detect this case (has insertedNodeKey but is not an insert op) and mark the note
        // as no longer "new", so that closing the editor as part of the save does not
        // delete the note the user just saved.
        if (insertedNodeKey && !isInsertEmbedOpOfType('note', ops?.[1]))
          editingNoteIsNew.current = false;
        // Close the footnote editor and discard the note being edited if its caller was deleted in
        // the main editor.
        else if (!editorRef.current?.getNoteOps(editingNoteKey.current)) closeFootnoteEditor(false); // false => the note caller is already gone.
      } else openFootnoteEditorOnNewNote(ops, insertedNodeKey);
    },
    [closeFootnoteEditor, openFootnoteEditorOnNewNote, saveUsjToPdpDebounced],
  );

  // #endregion Debounced Save Scheduling

  /**
   * Handle selection changes in the editor. Updates the local ref and notifies the backend so it
   * can track the current selection and emit events.
   *
   * Converts the editor's SelectionRange to ScriptureRangeUsjVerseRefChapterLocation by combining
   * the selection range with the current verse reference.
   */
  const handleSelectionChange = useCallback(
    async (change: SelectionRange | undefined) => {
      currentSelectionRef.current = change;

      // Convert to ScriptureRangeUsjVerseRefChapterLocation format
      let scriptureSelection: ScriptureRangeUsjVerseRefChapterLocation | undefined;
      if (change?.start) {
        scriptureSelection = {
          start: {
            verseRef: scrRef,
            granularity: 'chapter',
            documentLocation: change.start,
          },
          end: {
            verseRef: scrRef,
            granularity: 'chapter',
            documentLocation: change.end ?? change.start,
          },
        };
      }

      // Notify the backend of the selection change via WebViewController method
      try {
        const webViewController = await papi.webViews.getWebViewController(
          'platformScriptureEditor.react',
          webViewId,
        );
        if (webViewController) {
          await webViewController.updateSelectionInternal(scriptureSelection);
        }
      } catch (e) {
        logger.debug(`Failed to notify backend of selection change: ${getErrorMessage(e)}`);
      }
    },
    [scrRef, webViewId],
  );

  // Sync editor content with PDP data. The write-in-flight guard (`currentlyWritingUsjToPdp`) is
  // owned entirely by the save path (`withWriteInFlightGuard`), so it is not passed here.
  // The editor owns its content while a marker-palette session or a LIVE footnote-popover editing
  // session is open, even though DOM focus sits in the overlay/popover: a same-document echo
  // replacing the editor mid-session regenerates every Lexical key and kills the session
  // (live-observed: the popover's Save no-oping, the editor "jumping to the top" mid-insert).
  // A note session past its staleness bound is the exception — that key is orphaned bookkeeping
  // from a popover that died without cleanup, and until the time bound existed it wedged sync
  // until the user happened to click another note caller. `resolveEditingSessionActivity` makes
  // the live/stale call; a stale session is closed through the normal footnote-editor close path
  // (popover state stays consistent) and stops deferring.
  // Wrapped in useCallback (reads only refs; `closeFootnoteEditor` is itself stable) so its
  // identity is stable; a fresh arrow each render would re-run useEditorPdpSync's effect on every
  // render, firing an immediate non-debounced push-back save that partially defeats the 700ms
  // save debounce.
  const isEditingSessionActive = useCallback(() => {
    const activity = resolveEditingSessionActivity({
      hasPaletteSession: paletteSession.current !== undefined,
      editingNoteKey: editingNoteKey.current,
      noteSessionRefreshedAtMs: editingNoteSessionRefreshedAt.current,
      nowMs: Date.now(),
    });
    if (activity.isNoteSessionStale) {
      logger.warn(
        `Note-editing session for note ${editingNoteKey.current} saw no interaction for over ` +
          `${STALE_NOTE_EDITING_SESSION_MS} ms; clearing the stale session so incoming PDP ` +
          `updates are no longer deferred.`,
      );
      closeFootnoteEditor(false);
    }
    return activity.isActive;
  }, [closeFootnoteEditor]);
  useEditorPdpSync({
    usjFromPdp,
    documentSelector: chapterUsjSelector,
    editorRef,
    usjSentToPdp,
    setEditorUsj,
    saveUsjToPdpIfUpdated,
    flushPendingDebouncedSave,
    isEditingSessionActive,
    lastLocalEditTimestamp,
  });

  // #region Footnotes Auto-Show Decision

  /**
   * Whether the currently loaded chapter has at least one note. Reuses the same
   * `UsjReaderWriter(...).findAllNotes()` mechanism `FootnotesLayout` uses to populate the
   * footnotes pane, so this stays consistent with what the pane would actually show.
   */
  const chapterHasNotes = useMemo(() => {
    if (!usjFromPdp) return false;
    try {
      return (
        new UsjReaderWriter(usjFromPdp, {
          markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
        }).findAllNotes().length > 0
      );
    } catch (e) {
      // Bounded snippet, never the whole chapter — same cap as the divergence logger's snippets
      // (`describeUsjContentDivergence`).
      const usjText = JSON.stringify(usjFromPdp);
      const usjSnippet = usjText.length > 200 ? `${usjText.slice(0, 200)}…` : usjText;
      logger.warn(
        `Error checking chapter USJ for notes (footnotes auto-show): ${getErrorMessage(e)}. USJ: ${usjSnippet}`,
      );
      return false;
    }
  }, [usjFromPdp]);

  // Apply the footnotes-pane auto-show/hide decision. All of the reasoning about when the pane
  // should follow the chapter — and when a manual toggle keeps it where the user put it — lives in
  // `resolveFootnotesPaneAutoVisibility`; `undefined` means leave the pane alone.
  useEffect(() => {
    const autoVisibility = resolveFootnotesPaneAutoVisibility({
      isAutoShowEnabled: footnotesAutoShow,
      chapterHasNotes,
      manualOverrideChapterKey: footnotesManualOverrideChapterRef.current,
      currentChapterKey: chapterKey,
    });
    if (autoVisibility !== undefined) setFootnotesPaneVisible(autoVisibility);
  }, [footnotesAutoShow, chapterHasNotes, chapterKey, setFootnotesPaneVisible]);

  // #endregion Footnotes Auto-Show Decision

  // On loading the first time, scroll the selected verse into view and set focus to the editor
  useEffect(() => {
    if (
      usjFromPdp &&
      (usjFromPdp.content?.length ?? 0) > 0 &&
      !hasFirstRetrievedScripture.current
    ) {
      // Wait before scrolling to make sure there is time for the editor to load
      // TODO: hook into the editor and detect when it has loaded somehow
      const cancelRunOnLoad = runOnFirstLoad(() => {
        hasFirstRetrievedScripture.current = true;
        scrollToVerse(scrRef);
        editorRef.current?.focus();
        // On Load, the editor sets the selection to `scrRef`. Since this is an internal change, we
        // don't want to scroll again when we get this scrRef back from the PDP, so we set
        // `internalVerseLocationRef` to it.
        internalVerseLocationRef.current = scrRef;
      });

      return cancelRunOnLoad;
    }

    // Do nothing in destructor since we didn't do anything. TypeScript requires a returned function
    return () => {};
  }, [usjFromPdp, scrRef]);

  // Scroll the selected verse and selection range into view
  useEffect(() => {
    // If we made this latest scrRef change, don't scroll
    if (
      !allowScrollForInternalRef.current &&
      internalVerseLocationRef.current &&
      internalVerseLocationRef.current.book === scrRef.book &&
      internalVerseLocationRef.current.chapterNum === scrRef.chapterNum &&
      internalVerseLocationRef.current.verseNum === scrRef.verseNum
    ) {
      internalVerseLocationRef.current = undefined;
      return () => {};
    }

    let highlightedVerseElement: HTMLElement | undefined;

    // Queue up the next selection range to be set and clear it so we don't accidentally set the
    // range to the wrong thing
    const nextRange = nextSelectionRange.current;
    nextSelectionRange.current = undefined;

    // Wait before scrolling to make sure there is time for the editor to load
    // TODO: hook into the editor and detect when it has loaded somehow
    const scrollTimeout = setTimeout(() => {
      // Scroll to and add a highlight to the current verse element
      highlightedVerseElement = scrollToVerse(scrRef);
      highlightedVerseElement?.classList.add('highlighted');

      // Clear the internal verse ref since we've handled it and also clear the volatile
      // allow-scroll flag so this special-casing only happens once.
      internalVerseLocationRef.current = undefined;
      allowScrollForInternalRef.current = false;

      // Set the selection if the selection was set to something as part of this scr ref change
      if (nextRange) editorRef.current?.setSelection(nextRange);
    }, EDITOR_LOAD_DELAY_TIME);

    return () => {
      // Cancel this timeout to scroll if it is running because the scrRef changed and we need to
      // scroll somewhere else
      clearTimeout(scrollTimeout);

      // Remove highlight from the current verse element
      highlightedVerseElement?.classList.remove('highlighted');
    };
  }, [scrRef]);

  const onCommentEditorCancel = useCallback(() => {
    // Remove the pending annotation if one was created
    if (pendingCommentAnnotationRange.current) {
      editorRef.current?.removeAnnotation(
        ANNOTATION_TYPE_TRANSLATOR_COMMENT,
        PENDING_COMMENT_ANNOTATION_ID,
      );
      pendingCommentAnnotationRange.current = undefined;
    }
    setShowCommentEditor(false);
  }, []);

  /** Flag to indicate if a comment submission is in progress so we don't submit multiple times */
  const isSubmittingComment = useRef(false);

  const onCommentEditorSave = useCallback(
    async (contents: string, assignedUser?: string) => {
      if (isSubmittingComment.current) {
        logger.info('Comment submission already in progress');
        return;
      }
      if (!projectId) {
        logger.warn('Cannot create comment: no projectId');
        return;
      }
      // A comment popover opened before the block began is not closed by it, so Save must be
      // guarded here too. Early-return keeps the popover open (the user's text isn't lost — they
      // can save once the sync finishes) and warns like the scripture-edit path.
      if (isSyncBlocked) {
        await notifySyncEditBlocked();
        return;
      }

      const capturedSelection = pendingCommentAnnotationRange.current;

      try {
        isSubmittingComment.current = true;

        // The editor selection range locations are already UsjDocumentLocation
        const startDocLocation = capturedSelection?.range.start;
        const endDocLocation = capturedSelection?.range.end;

        const commentsUsjPdp = await papi.projectDataProviders.get(
          'legacyCommentManager.commentsUsj',
          projectId,
        );

        const newCommentId = await commentsUsjPdp.createComment(
          {
            contents,
            assignedUser,
            replyToUser: assignedUser,
          },
          // We should have the verseRef from the captured selection, but just use the current
          // scrRef as a fallback
          capturedSelection?.verseRef ?? scrRef,
          startDocLocation,
          endDocLocation,
        );

        const newThreadId = newCommentId ? newCommentId.split('/')[0] : undefined;

        // Successfully created comment - update the annotation ID from pending to the actual thread ID
        if (newThreadId && pendingCommentAnnotationRange.current) {
          // Remove the pending annotation
          editorRef.current?.removeAnnotation(
            ANNOTATION_TYPE_TRANSLATOR_COMMENT,
            PENDING_COMMENT_ANNOTATION_ID,
          );
          // Create a new annotation with the actual thread ID and click handler
          editorRef.current?.setAnnotation(
            pendingCommentAnnotationRange.current.range,
            ANNOTATION_TYPE_TRANSLATOR_COMMENT,
            newThreadId,
            createCommentAnnotationClickHandler(newThreadId),
          );

          // Power mode: open/focus the editor-anchored comment list and select the new thread.
          // Simple mode: the new comment already lands in the fixed Column 3 Comments tab via its
          // own PDP subscription (opening the editor-anchored panel here would just pop a second
          // "Comments" tab and steal focus — PT-4204), but select the new thread in it so
          // Simple-mode users get the same "yes, that worked" confirmation Power-mode users
          // already get. bringToFront is deliberately false here: forcing the Comments tab to the
          // front on every insert would interrupt a user who is actively working in a different
          // Column 3 tab (UX feedback on PT-4204) — the selection still applies silently and is
          // visible whenever the user next switches to the Comments tab themselves.
          if (isPowerMode) {
            await openCommentListAndSelectThreadSafe(papi, webViewId, newThreadId);
          } else {
            await selectCommentThreadInPanelSafe(papi, newThreadId, false);
          }
        }

        pendingCommentAnnotationRange.current = undefined;
        if (assignedUser !== undefined) setLastAssignedUser(assignedUser);
        setShowCommentEditor(false);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        logger.error(`Error creating comment: ${errorMessage}`);
        // A sync started in the window between the isSyncBlocked guard above and the backend
        // write, and the backend gate rejected the comment. Warn like the scripture-edit path and
        // discard the pending state (close the popover, clear the pending highlight) — the
        // rejected comment cannot be saved as-is.
        if (SYNC_EDIT_BLOCKED_REGEX.test(errorMessage)) {
          await notifySyncEditBlocked();
          onCommentEditorCancel();
        }
      } finally {
        isSubmittingComment.current = false;
      }
    },
    [
      projectId,
      scrRef,
      createCommentAnnotationClickHandler,
      webViewId,
      isPowerMode,
      isSyncBlocked,
      notifySyncEditBlocked,
      onCommentEditorCancel,
    ],
  );

  // Clear annotation info when the editor clears annotations internally
  // Note: the editor does not have any notification to tell us when its annotation clear, so we
  // are doing our best here and other places clearAnnotationInfo is run
  useEffect(() => {
    // Annotations are cleared when viewOptions change
    clearAnnotationInfo.current();
  }, [viewOptions]);

  // On loading the editor, add the scripture-font class to the editor. Can't just put this on a div
  // around the editor because the editor currently renders a toolbar that should have normal UI font
  useEffect(() => {
    // Do not add the scripture-font class if the editor isn't rendered (see `renderEditor`)
    if (!bookExists) return;
    if (!usjFromPdp || usjFromPdp === defaultUsj) return;

    const cancelRunOnLoad = runOnFirstLoad(() => {
      const editorElement = document.querySelector('.editor-inner');
      if (!editorElement) return;

      editorElement.classList.add('scripture-font');
    });

    return () => {
      cancelRunOnLoad();
    };
  }, [bookExists, usjFromPdp]);

  const [webViewMenuPossiblyError] = useData(papi.menuData.dataProviderName).WebViewMenu(
    SCRIPTURE_EDITOR_WEBVIEW_TYPE,
    DEFAULT_WEBVIEW_MENU,
  );

  const webViewMenu = useMemo(() => {
    if (isPlatformError(webViewMenuPossiblyError)) {
      logger.warn(
        `Failed to load web view menu for ${SCRIPTURE_EDITOR_WEBVIEW_TYPE}`,
        webViewMenuPossiblyError,
      );
      return DEFAULT_WEBVIEW_MENU;
    }
    return webViewMenuPossiblyError;
  }, [webViewMenuPossiblyError]);

  const [booksPresentPossiblyError] = useProjectSetting(
    projectId,
    'platformScripture.booksPresent',
    BOOKS_PRESENT_DEFAULT,
  );

  // `platform.isPublished` is the project-kind classification (resource vs project); `isReadOnly` /
  // `platform.isEditable` is Scripture-text edit PERMISSION and says nothing about kind. Only the
  // former may decide whether the user is told "this book is not in this resource", which is a
  // statement of fact with no remedy. Same distinction the open path draws in this extension's
  // `main.ts`, where the comment on `isPublished` spells out why the two must not be conflated.
  // Defaults to false so an unresolved setting shows the actionable project message rather than
  // wrongly telling a project owner their project is a resource.
  const [isPublishedPossiblyError, , , isIsPublishedLoading] = useProjectSetting(
    projectId,
    'platform.isPublished',
    false,
  );

  const isResource = useMemo(() => {
    if (isPlatformError(isPublishedPossiblyError)) {
      logger.warn(
        `Error getting whether the project is published: ${getErrorMessage(isPublishedPossiblyError)}`,
      );
      return false;
    }
    return isPublishedPossiblyError;
  }, [isPublishedPossiblyError]);

  const booksPresent = useMemo(() => {
    if (isPlatformError(booksPresentPossiblyError)) {
      logger.warn(`Error getting books present: ${getErrorMessage(booksPresentPossiblyError)}`);
      return BOOKS_PRESENT_DEFAULT;
    }
    return booksPresentPossiblyError;
  }, [booksPresentPossiblyError]);

  const fetchActiveBooks = useCallback(
    () => getBookIdsFromBooksPresent(booksPresent),
    [booksPresent],
  );

  const { recentScriptureRefs, addRecentScriptureRef } = useRecentScriptureRefs();

  const menuCommandHandler = useCallback<SelectMenuItemHandler>(
    (projectMenuCommand) => {
      // Find is the one menu command that needs more than the tab id: it carries this tab's current
      // text selection so the Find panel pre-fills and searches it, matching Ctrl+F. The source
      // project is deliberately left off — `openFind` resolves it from this editor's own web view
      // definition, which is the same project this component renders. (When neither yields a
      // project, `openFind` fronts an already-open Find as-is and creates nothing, so the selection
      // is dropped on that path rather than pre-filling a panel pointed at some other project.)
      // Hidden-target case: the Find panel may be an inactive (display:none) tab when this fires.
      // Nothing here is layout-dependent — the text travels as web view state (findSearchTerm) and
      // openFind brings the panel to front — so a hidden Find catches up on activation by
      // construction, with no deferred side effect to replay.
      if (projectMenuCommand.command === 'platformScripture.openFind') {
        papi.commands
          .sendCommand('platformScripture.openFind', webViewId, getMenuFindSelectionText())
          .catch((e) =>
            logger.warn(`Failed to open Find from the editor tab menu: ${getErrorMessage(e)}`),
          );
        return;
      }
      // Assuming that the project menu command is one of the registered command handlers in papi
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      papi.commands.sendCommand(projectMenuCommand.command as keyof CommandHandlers, webViewId);
    },
    [getMenuFindSelectionText, webViewId],
  );

  function renderEditor() {
    /* Workaround to pull in platform-bible-react styles into the editor */
    const workaround = <Button className="tw:hidden" />;

    // When not rendering the editor component itself, make sure not to try to apply the scripture-font
    // in the useEffect above

    // No project selected — render an empty state instead of the loading spinner. Without this
    // branch the editor would stay on the spinner forever in Platform.Bible's simple mode when
    // started without a pre-selected project.
    if (!projectId) {
      return (
        <div className="tw:flex tw:items-center tw:justify-center tw:h-full tw:px-4">
          {workaround}
          {localizedStrings['%webView_platformScriptureEditor_emptyState_noProject%']}
        </div>
      );
    }
    if (!bookExists) {
      // Each branch below picks DIFFERENT advice, so none of them may render off a setting's default:
      //   - `platform.interfaceMode` decides Simple's "ask your project administrator" against Power's
      //     actionable zero-state. Showing Simple's advice to a Power user tells them to go ask
      //     someone for something they can do themselves in two clicks.
      //   - `platform.isPublished` decides the resource message against the zero-state. Either default
      //     is wrong for someone: a resource reader would briefly get an add-this-book button, or a
      //     project owner would briefly be told their project is a resource.
      // Both hooks serve their default until the real value arrives, which makes the default
      // indistinguishable from an answer — `isLoading` is the only thing that separates them. The
      // hazard is specific to branching on a setting: a surface that renders one string for every
      // case has nothing to get wrong while the settings load. Same class of problem this file guards
      // `CharacterMarkerBarOverlay` against further down.
      if (isInterfaceModeLoading || isIsPublishedLoading) {
        return (
          <div className="tw:flex tw:items-center tw:justify-center tw:h-full">
            {workaround}
            <Spinner />
          </div>
        );
      }
      // A resource keeps its own message: "not in this resource" is a statement of fact with no
      // remedy, whereas a project's missing book is actionable (Manage Books) for Donna. Branching on
      // `isResource` (`platform.isPublished`) rather than on editability is what keeps a read-only
      // PROJECT — a real and common case — out of this branch: it is not a resource, so it gets the
      // zero-state, with the Manage books button disabled and a tooltip saying the project is
      // read-only.
      if (isResource) {
        // Same component the Bible texts, Commentaries, and Model text panels use, so one sentence is
        // worded, styled, announced, and focus-repaired identically on every surface that can show it.
        return (
          <>
            {workaround}
            <ResourceBookNotAvailable
              message={
                localizedStrings['%webView_platformScriptureEditor_error_bookNotFoundResource%']
              }
              announcementKey={`${projectId}:${scrRef.book}`}
            />
          </>
        );
      }
      return (
        <>
          {workaround}
          <BookNotAvailableView
            localizedStrings={localizedStrings}
            isPowerMode={isPowerMode}
            announcementKey={`${projectId}:${scrRef.book}`}
            manageBooksDisabledReason={manageBooksDisabledReason}
            onOpenManageBooks={() => {
              papi.commands
                .sendCommand('platformScripture.openManageBooks', webViewId, 'createMissingBook')
                .catch((e) =>
                  logger.warn(`Failed to open Manage Books from the book-not-available view: ${e}`),
                );
            }}
          />
        </>
      );
    }
    if (!usjFromPdp || usjFromPdp === defaultUsj) {
      return (
        <div className="tw:flex tw:items-center tw:justify-center tw:h-full">
          <Spinner />
        </div>
      );
    }

    const editorTree = (
      <TwoStepDeleteTooltipOverlay>
        <EditorKeyboardShortcuts editorRef={editorRef}>
          <Editorial
            ref={editorRef}
            scrRef={scrRef}
            onScrRefChange={setScrRefNoScroll}
            options={options}
            logger={logger}
            onUsjChange={isReadOnlyEffective ? undefined : handleEditorialUsjChange}
            onSelectionChange={handleSelectionChange}
            onStateChange={(state) => {
              setCanUndo(state.canUndo);
              setCanRedo(state.canRedo);
              setBlockMarker(state.blockMarker);
              setContextMarker(state.contextMarker);
            }}
          />
        </EditorKeyboardShortcuts>
      </TwoStepDeleteTooltipOverlay>
    );

    // Simple mode only. This view REPLACES the editing surface (the subtree below is
    // `display: none`, which takes it out of both the accessibility tree and the tab order), and the
    // scaffold button is the only way back in — but `showButton` withholds it for read-only
    // projects, for `chapterNum: 0` front matter, and transiently while versification loads. In
    // Power mode, where typing directly into a blank chapter is the expected workflow, that would
    // turn those cases into dead ends. A Power user sees the ordinary empty editor instead.
    const showEmptyChapterView = isBlankChapter && !isPowerMode;

    return (
      <>
        {workaround}
        {showEmptyChapterView && (
          <EmptyChapterView
            localizedStrings={localizedStrings}
            isStructureProtected={isStructureProtected}
            isResource={isResource}
            showButton={
              !isReadOnlyEffective &&
              lastVersesInCurrentBook !== undefined &&
              canAddChapterNumber(lastVerse)
            }
            onAddChapterNumber={handleAddChapterNumber}
          />
        )}
        {/* The empty-chapter view HIDES this subtree rather than replacing it, for the same reason
            the overlay below is mounted in both modes: unmounting would take Lexical's undo history
            and the scroll position with it, and a blank chapter is transient — adding a chapter
            number flips `isBlankChapter` straight back. The overlay lives INSIDE this wrapper so the
            bar is hidden along with the text it annotates rather than painting beside an empty
            chapter.

            Being hidden HERE is not the case the overlay's `useViewVisibility` deferral handles:
            that hook reports on this iframe's own visibility (whether the tab is active), so it
            still reads visible while this inner subtree is `display: none`. What covers this case
            is the overlay's zero-geometry guard — it declines to position, and crucially declines
            to latch `hasPositionedRef`, when the editor root has no layout — plus its
            ResizeObserver, which fires when the subtree regains layout because `display: none`
            collapses the observed anchor to a 0x0 box. */}
        <div className={showEmptyChapterView ? 'tw:hidden' : undefined}>
          {/* The overlay is mounted in BOTH modes and only its `bar` slot is gated, so the element type
            at this position never changes. Choosing between two different wrappers here would make
            React unmount and remount `editorTree` whenever the mode changes — including the very
            first resolution of `platform.interfaceMode`, which starts at its 'simple' default before
            the stored value arrives — taking Lexical's undo history and the scroll position with it.
            An empty slot renders nothing beside the editor.

            `hasGutterParaMarkers` is checked here because it is the OTHER half of the condition the
            gutter reservation in `_simple-mode.scss` matches on
            (`.editor-container-simple .usfm.psc-gutter-markers`). Gating the bar on the same two
            things the CSS does keeps the bar and the space it occupies inseparable: if this view ever
            stops using the paragraph-structure preset — a Simple view-option chooser would do it —
            the reservation and the bar disappear together instead of leaving the bar painting over
            project text. The reservation cannot simply be broadened to match `!isPowerMode` alone,
            because `_simple-mode.scss` is compiled into the resource-text and model-text panels too,
            and both apply `editor-container-simple` unconditionally to an editor that has no gutter
            markers. */}
          <CharacterMarkerBarOverlay
            bar={
              isPowerMode || !viewOptions.hasGutterParaMarkers ? undefined : (
                <CharacterMarkerBar
                  editorRef={editorRef}
                  getSelection={getSelection}
                  blockMarker={blockMarker}
                  contextMarker={contextMarker}
                  isSyncBlocked={isSyncBlocked}
                  // Snapshotted into version history before a removal; absent means no snapshot.
                  projectId={projectId}
                  // The same direction the editor itself is given below. The marker menu portals to
                  // `document.body`, outside that `dir` element, so it can only mirror its alignment for
                  // an RTL project if the direction is handed to it explicitly.
                  textDirection={textDirectionEffective}
                  localizedStrings={localizedStrings}
                />
              )
            }
          >
            <ParagraphMarkerTooltipOverlay>{editorTree}</ParagraphMarkerTooltipOverlay>
          </CharacterMarkerBarOverlay>
        </div>
      </>
    );
  }

  const bcvControls = isPowerMode ? (
    <BookChapterControl
      scrRef={scrRef}
      handleSubmit={setScrRefWithScroll}
      getActiveBookIds={booksPresent ? fetchActiveBooks : undefined}
      getEndVerse={getEndVerse}
      recentSearches={recentScriptureRefs}
      onAddRecentSearch={addRecentScriptureRef}
      localizedStrings={localizedStrings}
    />
  ) : undefined;

  /**
   * Localized name of the current paragraph style, or the generic fallback. Undefined until the
   * localized strings resolve — `ParagraphStyleLabel` renders the marker code alone until then.
   *
   * `Object.hasOwn`, not a bare lookup: a marker named `constructor` or `toString` would otherwise
   * find an inherited `Object.prototype` member and take the wrong branch.
   */
  const blockMarkerName =
    blockMarker && Object.hasOwn(blockMarkerToBlockNames, blockMarker)
      ? localizedStrings[blockMarkerToBlockNames[blockMarker]]
      : localizedStrings['%paragraphMenu_misc_markerDescription%'];

  const scrollGroupSelector = isPowerMode ? (
    <ScrollGroupSelector
      availableScrollGroupIds={availableScrollGroupIds}
      scrollGroupId={scrollGroupId}
      onChangeScrollGroupId={setScrollGroupId}
      localizedStrings={scrollGroupLocalizedStrings}
    />
  ) : undefined;

  return (
    <div
      className={`tw:flex tw:flex-col tw:h-screen${isPowerMode ? '' : ' editor-container-simple'}`}
    >
      <TabToolbar
        onSelectProjectMenuItem={menuCommandHandler}
        onSelectViewInfoMenuItem={menuCommandHandler}
        projectMenuData={webViewMenu.topMenu}
        className={`scripture-editor-tab-nav tw:block tw:z-10${isPowerMode ? '' : ' scripture-editor-tab-nav-simple'}`}
        startAreaChildren={
          <>
            {bcvControls}
            {!isReadOnlyEffective && (
              <>
                <UndoRedoButtons
                  className="tw:h-8"
                  onUndoClick={() => editorRef.current?.undo()}
                  onRedoClick={() => editorRef.current?.redo()}
                  canUndo={canUndo}
                  canRedo={canRedo}
                  localizedStrings={localizedStrings}
                />

                {/* Truthy, not just defined: an empty marker has nothing to put in the fixed
                    marker slot, so the trigger would render a blank six-character box followed by
                    a dangling " - " and the generic fallback description. No marker and no block
                    are the same state to a user, so they read the same way. */}
                {!!blockMarker && (
                  <DisabledActionTooltip
                    disabled={isStructureProtected}
                    tooltipText={
                      localizedStrings[
                        '%webView_platformScriptureEditor_paragraphSelection_protectedTooltip%'
                      ]
                    }
                    // This wrapper div — not the Button inside it — is the toolbar zone's flex
                    // item, so this is where the shrink floor has to be lifted. Without it the div
                    // stays pinned at min-content and the Button's own `tw:min-w-0` can never come
                    // into play, because the box around it never narrows.
                    className="tw:min-w-0"
                  >
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          // `tw:min-w-0` lets the button shrink inside the wrapper so its label can
                          // truncate rather than push the end-zone buttons out of the clipped
                          // toolbar. It only bites because the wrapper above carries the same
                          // floor-lift; on its own it would be inert. The width ceiling lives on
                          // the label itself (30 characters) so it is expressed in the same units
                          // UX specified it in — see ParagraphStyleLabel.
                          className="tw:h-8 tw:min-w-0"
                          aria-label="Paragraph Selection"
                          // No native `title` here. The label inside now raises its own tooltip
                          // whenever it is abbreviated or clipped, and a native tooltip would open
                          // on top of it a beat later — two overlapping bubbles for one control.
                          // `aria-label` still names the button for assistive technology.
                          disabled={isStructureProtected}
                          variant="outline"
                        >
                          <ParagraphStyleLabel
                            blockMarker={blockMarker}
                            styleName={blockMarkerName}
                          />
                          {/* An icon has no shorter form, so it must never be the thing squeezed. */}
                          <ChevronDown className="tw:shrink-0" />
                        </Button>
                      </PopoverTrigger>
                      {/* 384px is the width this menu wants, not a width it can insist on. Simple
                          mode gives the editor ~302px at the 900px window minimum, and a fixed
                          384px popover lays out at full width and is then clipped by the web view
                          edge — taking roughly 80px of every row with it, including the ellipsis
                          each row had correctly truncated to. The rows were degrading properly into
                          space nobody could see. Radix measures the room actually available and
                          publishes it, so cap against that and let the menu narrow instead. */}
                      <PopoverContent className="tw:w-96 tw:max-w-(--radix-popover-content-available-width) tw:p-0">
                        <MarkerMenu
                          localizedStrings={localizedStrings}
                          markerMenuItems={paragraphSwitcherMenuItems}
                          searchPlaceholder={
                            localizedStrings['%markerMenu_searchPlaceholder_paragraph%']
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </DisabledActionTooltip>
                )}
              </>
            )}
          </>
        }
        endAreaChildren={
          <>
            {/* This container is flex-row-reverse, so StructureProtectionButton must come first
            in JSX order to render visually after (to the right of) ShareLayoutButton. */}
            <StructureProtectionButton
              projectId={projectId}
              localizedStrings={localizedStrings}
              className="tw:h-8"
            />
            {/* Share Layout is only available in 10 Simple right now. Later it will be made available in 10 Power too. */}
            {!isPowerMode && (
              <ShareLayoutButton
                projectId={projectId}
                localizedStrings={localizedStrings}
                className="tw:h-8"
              />
            )}
            {scrollGroupSelector}
          </>
        }
      />
      {/* Slim, non-covering banner while an automatic Send/Receive freezes editing. Shown only when
          sync-blocked and not genuinely read-only (a real viewer shouldn't say "editing paused"). */}
      {isSyncBlocked && !isReadOnly && <SyncBlockedBanner localizedStrings={localizedStrings} />}
      {/* Mount the editor in a reverse portal so it doesn't unmount and lose its internal state */}
      <InPortal node={editorPortalNode}>
        <PortalContents>{renderEditor()}</PortalContents>
      </InPortal>
      <div
        ref={editorContainerRef}
        className="tw:h-auto tw:flex-1 tw:min-h-0 tw:overflow-auto"
        dir={options.textDirection}
      >
        {/* Containers */}
        {Object.entries(decorations.containers ?? {}).reduce(
          (children, [id, decoration]) => (
            <div
              className="tw:h-full"
              data-container-id={id}
              key={`container-${id}`}
              style={decoration.style}
            >
              {children}
            </div>
          ),
          <div className="tw:flex tw:flex-col tw:h-full">
            <div className="tw:grow tw:min-h-0 tw:m-1 tw:flex tw:flex-col tw:gap-1">
              {Object.entries(decorations.headers ?? {}).map(([id, header]) => (
                // Headers
                <Alert
                  data-header-id={id}
                  key={`header-${id}`}
                  // Must use `any` here because Alert doesn't expose its variant type which is very
                  // specific strings. We are passing in a variant string. If it is not accepted, it uses `default` variant
                  // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
                  variant={header.variant as any}
                >
                  {header.iconUrl && (
                    <img
                      className="tw:h-4 tw:w-4"
                      src={header.iconUrl}
                      alt={
                        header.iconAltText
                          ? decorationsLocalizedStrings[header.iconAltText]
                          : undefined
                      }
                    />
                  )}
                  {header.title && (
                    <AlertTitle>{decorationsLocalizedStrings[header.title]}</AlertTitle>
                  )}
                  {header.descriptionMd && (
                    <AlertDescription>
                      <MarkdownRenderer
                        anchorTarget="_blank"
                        className="tw:max-w-none tw:text-sm"
                        markdown={decorationsLocalizedStrings[header.descriptionMd]}
                      />
                    </AlertDescription>
                  )}
                </Alert>
              ))}

              {footnotesPaneRendered ? (
                <FootnotesLayout
                  usj={usjFromPdp}
                  onFootnoteSelected={handleFootnoteSelected}
                  useWebViewState={useWebViewState}
                  showMarkers={options.view?.markerMode !== 'hidden'}
                  focusRequest={footnotePaneFocusRequest}
                >
                  {/* Render the editor inside the container decorations without re-mounting on re-parent */}
                  <OutPortal node={editorPortalNode} />
                </FootnotesLayout>
              ) : (
                <>
                  {/* Render the editor inside the container decorations without re-mounting on re-parent */}
                  <OutPortal node={editorPortalNode} />
                </>
              )}
            </div>
          </div>,
        )}
      </div>
      {/** Inline markers menu components */}
      <Popover open={showMarkersMenu}>
        <PopoverAnchor
          className="tw:absolute"
          style={{
            top: markersMenuAnchorY,
            left: markersMenuAnchorX,
            height: markersMenuAnchorHeight,
            width: 0,
            pointerEvents: 'none',
          }}
        />
        <PopoverContent
          className="tw:w-[500px] tw:p-0"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <MarkerMenu
            markerMenuItems={inlineMarkerMenuItems}
            localizedStrings={localizedStrings}
            searchRef={markerMenuSearchRef}
            searchPlaceholder={localizedStrings['%markerMenu_searchPlaceholder_insert%']}
          />
        </PopoverContent>
      </Popover>
      {/** Footnote editor components */}
      <Popover open={showFootnoteEditor}>
        <PopoverAnchor
          className="tw:absolute"
          style={{
            top: notePopoverAnchorY,
            left: notePopoverAnchorX,
            // This height makes it so that visually the popover displays below the current line where the footnote is
            height: notePopoverAnchorHeight,
            width: 0,
            pointerEvents: 'none',
          }}
        />
        <PopoverContent className="tw:w-max tw:min-w-[500px] tw:p-[10px]">
          <FootnoteEditor
            classNameForEditor="scripture-font"
            noteOps={editingNoteOps.current}
            noteKey={editingNoteKey.current}
            onClose={onFootnoteEditorClose}
            onNoteEdit={onFootnoteEditorNoteEdit}
            scrRef={scrRef}
            editorOptions={options}
            defaultMarkerMenuTrigger={defaultMarkersMenuTrigger}
            localizedStrings={localizedStrings}
            parentEditorRef={editorRef}
            markerPalette={footnoteMarkerPalette}
          />
        </PopoverContent>
      </Popover>
      {/** Comment editor for creating new comment threads */}
      <Popover open={showCommentEditor}>
        <PopoverAnchor
          className="tw:absolute"
          style={{
            top: commentPopoverAnchorY,
            left: commentPopoverAnchorX,
            height: commentPopoverAnchorHeight,
            width: 0,
            pointerEvents: 'none',
          }}
        />
        <PopoverContent className="tw:w-[400px] tw:p-[10px]">
          <CommentEditor
            assignableUsers={commentEditorAssignableUsers}
            onSave={onCommentEditorSave}
            onClose={onCommentEditorCancel}
            localizedStrings={localizedStrings}
            initialAssignedUser={lastAssignedUser}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
