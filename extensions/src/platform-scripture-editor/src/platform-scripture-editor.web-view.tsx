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
  BookChapterControl,
  Button,
  COMMENT_EDITOR_STRING_KEYS,
  CommentEditor,
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
  Spinner,
  TabToolbar,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  UNDO_REDO_BUTTONS_STRING_KEYS,
  UndoRedoButtons,
  isMacOs,
  usePromise,
} from 'platform-bible-react';
import {
  areUsjContentsEqualExceptWhitespace,
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
import { useStructureProtectionState } from './use-structure-protection-state.hook';
import {
  getLocalizeKeysFromDecorations,
  mergeDecorations,
  removeDecorations,
} from './decorations.util';
import { runOnFirstLoad, scrollToAnnotation, scrollToVerse } from './editor-dom.util';
import { createFlushableDebouncer } from './flushable-debouncer.util';
import { useEditorPdpSync } from './use-editor-pdp-sync.hook';
import { useProjectStylesheet } from './use-project-stylesheet.hook';
import { FootnotesLayout } from './platform-scripture-editor-footnotes.component';
import {
  availableScrollGroupIds,
  blockMarkerToBlockNames,
  deepEqualAcrossIframes,
  findNoteIndexByOps,
  formatEditorTitle,
  generateParagraphMenuListItems,
  openCommentListAndSelectThreadSafe,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
} from './platform-scripture-editor.utils';
import {
  clearPaletteSessionIfCurrent,
  generateInlineMarkerMenuListItems,
  markerMenuItemToCommandPaletteItem,
} from './platform-scripture-editor.web-view.utils';
import { ParagraphMarkerTooltipOverlay } from './paragraph-marker-tooltip/paragraph-marker-tooltip-overlay.component';

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
 * Time in ms to delay taking action to wait for the editor to load. Hope to be obsoleted by a way
 * to listen for the editor to finish loading
 *
 * This is best used for when the editor is transitioning between loads. For the first time the
 * editor loads, use {@link runOnFirstLoad} instead
 */
const EDITOR_LOAD_DELAY_TIME = 200;

const EDITOR_LOCALIZED_STRINGS: LocalizeKey[] = [
  ...COMMENT_EDITOR_STRING_KEYS,
  ...FOOTNOTE_EDITOR_STRING_KEYS,
  ...UNDO_REDO_BUTTONS_STRING_KEYS,
  ...MARKER_MENU_STRING_KEYS,
  ...STRUCTURE_PROTECTION_BUTTON_STRING_KEYS,
  ...Object.values(blockMarkerToBlockNames),
  ...Object.entries(usfmMarkers)
    .map((item) => item[1].description)
    .filter((item) => !!item),
  '%paragraphMenu_misc_markerDescription%',
  '%versionHistoryCommit_beforeInsertFootnote%',
  '%versionHistoryCommit_beforeInsertCrossReference%',
  '%webView_platformScriptureEditor_error_bookNotFoundProject%',
  '%webView_platformScriptureEditor_error_bookNotFoundResource%',
  '%webView_platformScriptureEditor_emptyState_noProject%',
  '%webView_platformScriptureEditor_error_permissions_format%',
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

// This regex is connected directly to the exception message within MissingBookException.cs
const bookNotFoundRegex = /Book number \d+ not found in project/;

// This regex is connected directly to the exception message within PermissionsException.cs
const PERMISSIONS_EXCEPTION_REGEX = /Permissions exception for projectId/;

/**
 * Corrects editor USJ version from 3.1 to 3.0. Returns a shallow clone of the object passed in.
 *
 * Currently, this is appropriate to do because the editor seems to work properly with 3.0, but it
 * doesn't handle the version well right now. It always sets it to 3.1 even if it started as 3.0.
 * When we better deal with USFM version differences and when Paratext 9 adds 3.1.2 support, we will
 * need to change how we're handling this.
 */
function correctEditorUsjVersion(editorUsj: Usj): Usj {
  // Use version 3.0 because `ParatextData.dll` serves 3.0 but the editor isn't handling version
  // well right now
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { ...editorUsj, version: '3.0' as typeof USJ_VERSION };
}

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

  const editingNoteKey = useRef<string | undefined>(undefined);
  const editingNoteOps = useRef<DeltaOpInsertNoteEmbed[] | undefined>(undefined);
  /** True when the footnote editor was opened for a newly inserted note (not an existing one) */
  const editingNoteIsNew = useRef(false);

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

  /**
   * Session state for a standard-view marker-menu palette while it's open (single owner: the
   * keydown flow in the effect below).
   *
   * `'backslash'` is only ever set for a _passive_ palette — the collapsed-caret `\` trigger, whose
   * `\` (and subsequent marker characters) keep landing as literal text in the document while the
   * palette stays open, so those keystrokes need the while-open forwarding table below to also
   * drive the palette. The selection-wrap `\` trigger opens a _focused_ palette instead (nothing
   * lands, typing filters the palette's own search box), so it's never tracked here.
   *
   * `'enter'` only guards against a second Enter re-opening a palette while the first request's
   * round-trip to the overlay service is still in flight — its palette is always focused too, so
   * there's no forwarding table for it either.
   *
   * `token` (allocated from the monotonic counter below) identifies which session an async
   * show-promise settlement belongs to, so a stale promise's cleanup can only clear its own
   * session, never a newer one (see `clearPaletteSessionIfCurrent`).
   */
  const paletteSession = useRef<
    | {
        kind: 'backslash';
        token: number;
        literalPrefixLanded: boolean;
        filter: string;
        items: MarkerMenuItem[];
      }
    | { kind: 'enter'; token: number; items: MarkerMenuItem[] }
    | undefined
  >(undefined);

  /** Monotonic allocator for {@link paletteSession} tokens. */
  const paletteSessionCounter = useRef(0);

  const [isReadOnly] = useWebViewState<boolean>('isReadOnly', true);
  const [decorations, setDecorations] = useWebViewState<EditorDecorations>(
    'decorations',
    defaultEditorDecorations,
  );

  // `platform.interfaceMode` is read here (rather than down by its other consumers, `bcvControls`
  // etc.) because the `viewType` state below needs `isPowerMode` for its default value.
  const [interfaceModePossiblyError, , , isLoadingInterfaceMode] = useSetting(
    'platform.interfaceMode',
    'simple',
  );

  const isPowerMode = useMemo(() => {
    if (isPlatformError(interfaceModePossiblyError)) return false;
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

  const [viewType, setViewType] = useWebViewState<ScriptureEditorViewType>(
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
    if (isLoadingInterfaceMode) return;
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
  }, [hadPersistedViewTypeAtMount, isLoadingInterfaceMode, isPowerMode, setViewType]);

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

  // Project stylesheet-derived style info for the current book (spec §8 stage 4); feeds
  // `generateUsjCss` via `useProjectStylesheet` below and `EditorOptions.styleInfo`.
  const [styleInfoPossiblyError] = useProjectData(
    'platformScripture.StyleInfo',
    projectId ?? undefined,
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
  const [lastVersesInCurrentBook] = usePromise(fetchLastVersesInCurrentBook, undefined);
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

  const [footnotesPaneVisible, setFootnotesPaneVisible] = useWebViewState<boolean>(
    'footnotesPaneVisible',
    false,
  );

  const footnotesPaneVisibleRef = useRef(footnotesPaneVisible);

  useEffect(() => {
    footnotesPaneVisibleRef.current = footnotesPaneVisible;
  }, [footnotesPaneVisible]);

  /**
   * Requests that the footnotes pane select/highlight a given note index, mirroring a real pane-row
   * click. Set by `nodeOptions.noteCallerOnClick` when a collapsed note caller is clicked while the
   * pane is visible (PT9 navigate-to-note). Ephemeral UI state — not persisted via
   * `useWebViewState` since it only needs to survive the current session, not a web-view reload.
   */
  const [footnotePaneFocusRequest, setFootnotePaneFocusRequest] = useState<
    { index: number } | undefined
  >(undefined);

  // Project-settings-sourced separators/callers for `nodeOptions` below (PT9
  // ChapterVerseSeparator / RangeIndicator / DefaultFootnoteCaller / DefaultCrossRefCaller). Each
  // fallback matches the pre-C#-restart `UsjNodeOptions` default so behavior is unchanged if the
  // setting can't be read. `noteCallers` is intentionally left unset so the editor's built-in
  // default (lowercase Latin a-z) applies; `crossRefCallers` has no corresponding Paratext setting
  // and stays hard-coded.
  const [chapterVerseSeparatorPossiblyError] = useProjectSetting(
    projectId,
    'platformScripture.chapterVerseSeparator',
    ':',
  );
  const chapterVerseSeparator = useMemo(() => {
    if (isPlatformError(chapterVerseSeparatorPossiblyError)) {
      logger.warn(
        `Error getting chapter/verse separator: ${getErrorMessage(chapterVerseSeparatorPossiblyError)}`,
      );
      return ':';
    }
    return chapterVerseSeparatorPossiblyError;
  }, [chapterVerseSeparatorPossiblyError]);

  const [verseRangeSeparatorPossiblyError] = useProjectSetting(
    projectId,
    'platformScripture.verseRangeSeparator',
    '-',
  );
  const verseRangeSeparator = useMemo(() => {
    if (isPlatformError(verseRangeSeparatorPossiblyError)) {
      logger.warn(
        `Error getting verse range separator: ${getErrorMessage(verseRangeSeparatorPossiblyError)}`,
      );
      return '-';
    }
    return verseRangeSeparatorPossiblyError;
  }, [verseRangeSeparatorPossiblyError]);

  const [defaultFootnoteCallerPossiblyError] = useProjectSetting(
    projectId,
    'platformScripture.defaultFootnoteCaller',
    GENERATOR_NOTE_CALLER,
  );
  const defaultFootnoteCaller = useMemo(() => {
    if (isPlatformError(defaultFootnoteCallerPossiblyError)) {
      logger.warn(
        `Error getting default footnote caller: ${getErrorMessage(defaultFootnoteCallerPossiblyError)}`,
      );
      return GENERATOR_NOTE_CALLER;
    }
    return defaultFootnoteCallerPossiblyError;
  }, [defaultFootnoteCallerPossiblyError]);

  const [defaultCrossRefCallerPossiblyError] = useProjectSetting(
    projectId,
    'platformScripture.defaultCrossRefCaller',
    HIDDEN_NOTE_CALLER,
  );
  const defaultCrossRefCaller = useMemo(() => {
    if (isPlatformError(defaultCrossRefCallerPossiblyError)) {
      logger.warn(
        `Error getting default cross-reference caller: ${getErrorMessage(defaultCrossRefCallerPossiblyError)}`,
      );
      return HIDDEN_NOTE_CALLER;
    }
    return defaultCrossRefCallerPossiblyError;
  }, [defaultCrossRefCallerPossiblyError]);

  const nodeOptions = useMemo<UsjNodeOptions>(
    () => ({
      chapterVerseSeparator,
      verseRangeSeparator,
      defaultFootnoteCaller,
      defaultCrossRefCaller,
      crossRefCallers: ['†'],
      noteCallerOnClick: isReadOnly
        ? undefined
        : (event, noteNodeKey, isCollapsed, _getCaller, _setCaller, getNoteOps) => {
            if (!isCollapsed || editingNoteKey.current) return;

            // Pane visible → focus/highlight the note there (PT9 navigate-to-note) instead of
            // opening the popover, regardless of the auto-show setting (Decision 6).
            if (footnotesPaneVisibleRef.current) {
              const noteOps = getNoteOps();
              const index = noteOps ? findNoteIndexByOps(editorRef, noteOps) : undefined;
              if (index !== undefined) setFootnotePaneFocusRequest({ index });
              return;
            }

            // Pane hidden → open the popover (existing behavior).
            const noteOp = getNoteOps()?.at(0);
            if (!noteOp || !isInsertEmbedOpOfType('note', noteOp)) return;

            const targetRect = event.currentTarget.getBoundingClientRect();
            setNotePopoverAnchorX(targetRect.left);
            setNotePopoverAnchorY(targetRect.top);
            setNotePopoverAnchorHeight(targetRect.height);
            editingNoteKey.current = noteNodeKey;
            editingNoteOps.current = [noteOp];
            setShowFootnoteEditor(true);
          },
    }),
    [
      isReadOnly,
      editingNoteKey,
      chapterVerseSeparator,
      verseRangeSeparator,
      defaultFootnoteCaller,
      defaultCrossRefCaller,
    ],
  );

  /**
   * Whether the editor is effectively read-only, considering both the isReadOnly flag and the view
   * type. This can probably be removed and replaced with `isReadOnly` once we allow editing in
   * markers view
   */
  const isReadOnlyEffective = useMemo(
    () =>
      isReadOnly ||
      (viewType === 'markers' && localStorage.getItem('dev-editableMarkersView') !== 'true'),
    [isReadOnly, viewType],
  );

  // Effective structure-protection state for this project/user, used to gate keyboard edits to
  // paragraph/verse markers in the editor (passed to EditorOptions.isStructureProtected below). The
  // toolbar StructureProtectionButton subscribes to the same state independently.
  const { isStructureProtected } = useStructureProtectionState(projectId);

  // Get the updated title. Note this is NO_UPDATE_TITLE if no update is needed
  const [newTitleIfUpdated] = usePromise(
    useCallback(async () => {
      if (unformattedTitle === NO_UPDATE_TITLE || projectName === defaultProjectName)
        return NO_UPDATE_TITLE;
      const updatedTitle = await formatEditorTitle(
        unformattedTitle,
        projectId,
        isReadOnlyEffective,
        async () => projectName,
        papi.localization.getLocalizedStrings,
      );

      // Don't need to update if the title is the same as before
      if (updatedTitle === title) return NO_UPDATE_TITLE;

      return updatedTitle;
    }, [isReadOnlyEffective, title, projectId, projectName, unformattedTitle]),
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
   * PT9-divergent NN3 setting (default off, so PT9's manual/persistent behavior is unchanged by
   * default): when on, the footnotes pane auto-shows/hides in standard view based on whether the
   * current chapter has notes. See the `chapterHasNotes`/auto-show `useEffect` below, which runs
   * once `usjFromPdp` is available.
   */
  const [footnotesAutoShow, setFootnotesAutoShow] = useWebViewState<boolean>(
    'footnotesAutoShow',
    false,
  );

  const footnotesAutoShowRef = useRef(footnotesAutoShow);

  useEffect(() => {
    footnotesAutoShowRef.current = footnotesAutoShow;
  }, [footnotesAutoShow]);

  /**
   * Whether the user has manually toggled the footnotes pane for the current chapter. When set, it
   * wins over the `footnotesAutoShow` auto-show/hide behavior until the chapter changes. This is
   * intentionally a ref (not persisted web-view state) since it only needs to survive re-renders
   * within a chapter, not across web-view reloads.
   */
  const footnotesAutoOverrideRef = useRef(false);

  // Chapter change resets the manual override so auto-show/hide behavior resumes for the new
  // chapter.
  useEffect(() => {
    footnotesAutoOverrideRef.current = false;
  }, [scrRef.book, scrRef.chapterNum]);

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

  const paragraphSwitcherMenuItems = useMemo(
    () =>
      generateParagraphMenuListItems(
        editorRef,
        localizedStrings,
        isStructureProtected,
        notifyStructureProtected,
      ),
    [localizedStrings, isStructureProtected, notifyStructureProtected],
  );

  const nextSelectionRange = useRef<SelectionRange | undefined>(undefined);

  const insertCommentAtCurrentSelection = useCallback(() => {
    const selection = currentSelectionRef.current;

    if (!selection?.start || !canUserCreateComments) return;

    // Store the selection as annotation range to show it as the pending annotation
    const annotationRange: AnnotationRange = {
      start: { ...selection.start },
      end: { ...(selection.end ?? selection.start) },
    };

    // Validate that the selection doesn't contain markers, and that there is meaningful content
    const editorUsj = editorRef.current?.getUsj();
    const editorUsjCorrected = editorUsj ? correctEditorUsjVersion(editorUsj) : undefined;
    if (editorUsjCorrected) {
      const usjRW = new UsjReaderWriter(editorUsjCorrected, {
        markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
      });

      const startNodeAndDocumentLocation = usjRW.jsonPathToUsjNodeAndDocumentLocation(
        selection.start.jsonPath,
      );
      const endNodeAndDocumentLocation = selection.end
        ? usjRW.jsonPathToUsjNodeAndDocumentLocation(selection.end.jsonPath)
        : startNodeAndDocumentLocation;

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
  }, [scrRef, canUserCreateComments]);

  /**
   * Corrects `editingNoteKey.current` to the newly-inserted note's TRUE Lexical key after
   * `insertMarker` creates it (Ctrl+T footnote/cross-reference insertion). `insertMarker`'s return
   * value IS that true key (`platform-editor`'s `EditorRef.insertMarker`, Task 14b), but the
   * auto-open path below (`handleEditorialUsjChange` -> `openFootnoteEditorOnNewNote`) hasn't run
   * yet at this point: Lexical's `editor.update()` callback runs synchronously, but the DOM
   * reconciliation + update-listener dispatch that fires `onUsjChange` is deferred to a microtask
   * (confirmed empirically against `lexical@0.43`'s `updateEditor`/`scheduleMicroTask` - see the
   * Task 14b report). `openFootnoteEditorOnNewNote` therefore runs on an EARLIER-queued microtask
   * and sets `editingNoteKey.current` to the WRONG key - derived from "delta-doc" OT coordinates
   * via `getInsertedNodeKey`, which double-counts editable VerseNodes and lands past the note when
   * one precedes it (root cause of Cancel's `replaceEmbedUpdate` silently no-opping on the wrong
   * key). Queuing this correction as a SECOND microtask guarantees FIFO ordering behind that first
   * one, so it runs after and overwrites it - fixing the bug without touching
   * `openFootnoteEditorOnNewNote`, `DeltaOnChangePlugin`, or any other OT coordinate code.
   */
  const correctEditingNoteKeyAfterInsert = useCallback((insertedNoteKey: string | undefined) => {
    if (!insertedNoteKey) return;
    queueMicrotask(() => {
      // Only correct a key the auto-open path actually set. If it early-returned (no popover
      // opened - e.g. its ops/element checks failed - so editingNoteKey was never set), writing
      // the true key here would wedge a truthy key with no editing session, permanently
      // suppressing future auto-opens via handleEditorialUsjChange's editingNoteKey guard.
      if (!editingNoteKey.current) return;
      editingNoteKey.current = insertedNoteKey;
    });
  }, []);

  /**
   * Inserts a footnote at the current selection (spec §6/§9). Shared by the "Insert footnote"
   * context-menu item, the Ctrl+T keyboard shortcut, and the top-menu
   * `platformScriptureEditor.insertFootnoteAtSelection` command (via the `webViewMessageListener`
   * effect below), so the version-history commit + `insertMarker` behavior stays identical across
   * every entry point.
   */
  const insertFootnoteAtCurrentSelection = useCallback(async () => {
    // Commits a snapshot of the project to the version history
    if (projectId)
      try {
        await papi.commands.sendCommand(
          'paratextBibleSendReceive.commitChanges',
          projectId,
          localizedStrings['%versionHistoryCommit_beforeInsertFootnote%'],
          true,
        );
      } catch (err: unknown) {
        const errMessage = getErrorMessage(err);
        // Requires the `commitChanges` command handler to throw
        // `PlatformUnimplementedException` having the `ERROR_UNIMPLEMENTED` prefix to
        // successfully handle if this command is not implemented in the application version
        if (errMessage.includes('ERROR_UNIMPLEMENTED')) {
          logger.info(errMessage);
        } else {
          logger.warn(
            `Error committing changes to version history before inserting footnote: ${getErrorMessage(err)}`,
          );
        }
      }

    correctEditingNoteKeyAfterInsert(editorRef.current?.insertMarker('f'));
  }, [projectId, localizedStrings, correctEditingNoteKeyAfterInsert]);

  /**
   * Inserts a cross-reference at the current selection (spec §6/§9). Shared by the "Insert
   * cross-reference" context-menu item, the Ctrl+Shift+T keyboard shortcut, and the top-menu
   * `platformScriptureEditor.insertCrossReferenceAtSelection` command (via the
   * `webViewMessageListener` effect below).
   */
  const insertCrossReferenceAtCurrentSelection = useCallback(async () => {
    // Commits a snapshot of the project to the version history
    if (projectId)
      try {
        await papi.commands.sendCommand(
          'paratextBibleSendReceive.commitChanges',
          projectId,
          localizedStrings['%versionHistoryCommit_beforeInsertCrossReference%'],
          true,
        );
      } catch (err: unknown) {
        const errMessage = getErrorMessage(err);
        // Requires the `commitChanges` command handler to throw
        // `PlatformUnimplementedException` having the `ERROR_UNIMPLEMENTED` prefix to
        // successfully handle if this command is not implemented in the application version
        if (errMessage.includes('ERROR_UNIMPLEMENTED')) {
          logger.info(errMessage);
        } else {
          logger.warn(
            `Error committing changes to version history before inserting cross-reference: ${getErrorMessage(err)}`,
          );
        }
      }

    correctEditingNoteKeyAfterInsert(editorRef.current?.insertMarker('x'));
  }, [projectId, localizedStrings, correctEditingNoteKeyAfterInsert]);

  const options = useMemo<EditorOptions>(
    () => ({
      isReadonly: isReadOnlyEffective,
      isStructureProtected,
      hasSpellCheck: false,
      nodes: nodeOptions,
      textDirection: textDirectionEffective,
      markerMenuTrigger: '\\',
      view: viewOptions,
      styleInfo,
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
          isDisabled: !canUserCreateComments,
        },
      ],
    }),
    [
      isReadOnlyEffective,
      isStructureProtected,
      canUserCreateComments,
      textDirectionEffective,
      nodeOptions,
      viewOptions,
      styleInfo,
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
          // Cycle formatted -> standard -> markers -> formatted for QA (Phase 5 will replace this
          // with the polished power-default + menu). Switch on the current `viewType` state
          // directly rather than `viewOptions.markerMode`: in non-power mode both 'formatted' and
          // 'markers' resolve to markerMode 'hidden' (the non-power markers branch of
          // getViewOptionsForType overrides only noteMode, not markerMode), so a markerMode-based
          // cycle would orphan 'formatted'.
          const nextViewType: ScriptureEditorViewType =
            // eslint-disable-next-line no-nested-ternary
            viewType === 'formatted'
              ? 'standard'
              : viewType === 'standard'
                ? 'markers'
                : 'formatted';
          setViewType(nextViewType);
          break;
        }
        case 'toggleFootnotesPaneVisibility': {
          // A manual toggle wins over the `footnotesAutoShow` auto-show/hide behavior until the
          // next chapter change (see `footnotesAutoOverrideRef`).
          footnotesAutoOverrideRef.current = true;
          const { current } = footnotesPaneVisibleRef;
          setFootnotesPaneVisible(!current);
          break;
        }
        case 'toggleFootnotesAutoShow': {
          const { current } = footnotesAutoShowRef;
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
  ]);

  const inlineMarkerMenuItems = useMemo(
    () =>
      generateInlineMarkerMenuListItems(
        editorRef,
        () => setShowMarkersMenu(false),
        localizedStrings,
        isStructureProtected,
        notifyStructureProtected,
        contextMarker,
        styleInfo,
      ),
    [contextMarker, localizedStrings, isStructureProtected, notifyStructureProtected, styleInfo],
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
   * reused wherever a marker menu needs to be shown from a `MarkerMenuContext` (e.g. Task 11's
   * marker-glyph click popover), not just from the live keydown flow below.
   *
   * `passive` sets up the `'backslash'` session used by the while-open forwarding table (only
   * meaningful for the collapsed-caret trigger, whose keystrokes keep landing in the document).
   * `literalPrefixLanded` is forwarded to `applyMarkerMenuSelection` as-is — see that method's
   * docs.
   */
  const openMarkerPalette = useCallback(
    (
      ctx: MarkerMenuAnchorContext,
      items: MarkerMenuItem[],
      openOptions: { passive: boolean; literalPrefixLanded: boolean },
    ) => {
      const { passive, literalPrefixLanded } = openOptions;
      paletteSessionCounter.current += 1;
      const token = paletteSessionCounter.current;
      paletteSession.current = passive
        ? { kind: 'backslash', token, literalPrefixLanded, filter: '', items }
        : undefined;

      papi.overlays
        .showCommandPalette(
          { items: items.map(markerMenuItemToCommandPaletteItem), anchor: ctx.anchorRect, passive },
          webViewId,
        )
        .then((id) => {
          clearPaletteSessionIfCurrent(paletteSession, token);
          if (id !== undefined) {
            const selected = items.find((item) => item.marker === id);
            if (selected) {
              editorRef.current?.applyMarkerMenuSelection(selected, {
                trigger: 'backslash',
                literalPrefixLanded,
              });
            }
            editorRef.current?.focus();
          } else if (!passive) {
            // Focused palette dismissed: focus never left the passive case, but the focused
            // palette's own search input had it, so bring it back to the editor.
            editorRef.current?.focus();
          }
          return undefined;
        })
        .catch(() => {
          // Replaced by a newer overlay request (PlatformError code ABORTED) or any other rejection
          // — treat the same as an explicit dismissal.
          clearPaletteSessionIfCurrent(paletteSession, token);
          if (!passive) editorRef.current?.focus();
        });
    },
    [webViewId],
  );

  /**
   * Opens the Enter-triggered paragraph-split palette (`getEnterMenuItems` /
   * `EditorRef.splitParagraphWithMarker`). Always a focused palette — nothing lands on the Enter
   * keypress itself, so there's no forwarding table to drive and no literal prefix to clean up.
   */
  const openEnterPalette = useCallback(
    (ctx: MarkerMenuAnchorContext, items: MarkerMenuItem[]) => {
      paletteSessionCounter.current += 1;
      const token = paletteSessionCounter.current;
      paletteSession.current = { kind: 'enter', token, items };

      papi.overlays
        .showCommandPalette(
          {
            items: items.map(markerMenuItemToCommandPaletteItem),
            anchor: ctx.anchorRect,
            passive: false,
          },
          webViewId,
        )
        .then((id) => {
          clearPaletteSessionIfCurrent(paletteSession, token);
          if (id !== undefined) editorRef.current?.splitParagraphWithMarker(id);
          editorRef.current?.focus();
          return undefined;
        })
        .catch(() => {
          clearPaletteSessionIfCurrent(paletteSession, token);
          editorRef.current?.focus();
        });
    },
    [webViewId],
  );

  /**
   * `FootnoteEditor`'s marker-palette driver (Task 11), wrapping `papi.overlays.*` with this web
   * view's `webViewId`. Built once and passed down so the popover's own editor gets the same
   * PT9-parity `\` palette as the main editor (Task 10) without `platform-bible-react` depending on
   * the overlay service directly. Unlike `openMarkerPalette`/`openEnterPalette` above, this carries
   * no session tracking of its own — the popover's `FootnoteEditor` owns its own session state and
   * only needs the four overlay primitives forwarded through. Anchor coordinates from the popover's
   * own inner editor are already iframe-relative (same iframe as this web view), so they're passed
   * straight through with no translation.
   */
  const footnoteMarkerPalette = useMemo<FootnoteEditorMarkerPalette>(
    () => ({
      show: (items, anchor, passive) =>
        papi.overlays.showCommandPalette({ items, anchor, passive }, webViewId),
      update: (update) => papi.overlays.updateCommandPalette(webViewId, update),
      commit: () => papi.overlays.commitCommandPaletteSelection(webViewId),
      dismiss: () => papi.overlays.dismissCommandPalette(webViewId),
    }),
    [webViewId],
  );

  // Listen for Ctrl+F to open find dialog, for the marker menu trigger to open the marker menu,
  // for Ctrl+T / Ctrl+Shift+T to insert a footnote/cross-reference (spec §6/§9), and for
  // Cmd+Alt+M (macOS) or Ctrl+Alt+M / Ctrl+Shift+N (Windows/Linux) to insert comment at selection
  useEffect(() => {
    const editorInput = document.querySelector<HTMLDivElement>('.editor-input') ?? undefined;
    // CAPTURE phase: the Standard-view `\`/Enter marker palettes must run BEFORE Lexical's own
    // root-element keydown listener. Lexical dispatches KEY_ENTER_COMMAND synchronously from that
    // listener, so a window BUBBLE-phase handler runs too late — the paragraph has already split
    // before it can preventDefault (QA item 6). Registering in capture puts this ahead of Lexical.
    // Keys we fully claim (Enter trigger, selection `\`, and the in-session Arrow/Enter/Escape
    // controls) additionally stopPropagation so Lexical never processes them; keys that must land as
    // literal document text (the collapsed `\`, filter characters, Space/`*`) are deliberately left
    // to propagate — capture phase doesn't change that, the literal still lands. The legacy
    // non-standard-view interception stays in the bubble-phase `handleKeyDown` below, unchanged.
    const handleStandardViewTriggers = (event: KeyboardEvent) => {
      if (
        viewType === 'standard' &&
        !isReadOnlyEffective &&
        editorInput &&
        document.activeElement === editorInput
      ) {
        const session = paletteSession.current;

        if (session?.kind === 'backslash') {
          if (
            event.key === 'Shift' ||
            event.key === 'Control' ||
            event.key === 'Alt' ||
            event.key === 'Meta'
          ) {
            // Pure modifier keydowns aren't input — e.g. the Shift half of a `+` chord fires its
            // own keydown before the `+` arrives. Falling through to the dismiss-on-any-other-key
            // rule would kill the session mid-chord and break `\+w` nested-marker filtering.
            return;
          }
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            event.stopPropagation(); // in capture, keep Lexical from moving the doc caret
            papi.overlays.updateCommandPalette(webViewId, {
              moveSelection: event.key === 'ArrowDown' ? 1 : -1,
            });
            return;
          }
          if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation(); // in capture, keep Lexical from splitting the paragraph
            // The session ends here as far as keydown routing is concerned — the commit's
            // resolution flows through the show-promise, which captured the items it needs, so
            // clear synchronously like every other session-ending key rather than waiting for the
            // async settlement.
            paletteSession.current = undefined;
            papi.overlays.commitCommandPaletteSelection(webViewId);
            return;
          }
          if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation(); // in capture, keep Lexical from handling Escape
            paletteSession.current = undefined;
            papi.overlays.dismissCommandPalette(webViewId);
            return;
          }
          if (event.key === ' ' || event.key === '*') {
            // PT9 Space-commit / `*`-close: the key lands as literal text and is picked up by the
            // engine's own Tier 2 marker-completion trigger, so our overlay is no longer relevant.
            paletteSession.current = undefined;
            papi.overlays.dismissCommandPalette(webViewId);
            return;
          }
          if (event.key === 'Backspace' || /^[a-z0-9+]$/.test(event.key)) {
            // Filter mirroring is keydown-tracked and display-only: `applyMarkerMenuSelection` reads
            // the real literal run from the document at apply time, so drift here (fast typing,
            // IME composition) can never corrupt the actual insert.
            session.filter =
              event.key === 'Backspace' ? session.filter.slice(0, -1) : session.filter + event.key;
            papi.overlays.updateCommandPalette(webViewId, { filterText: session.filter });
            return;
          }
          // Any other key: what's about to land no longer matches what the palette is offering.
          paletteSession.current = undefined;
          papi.overlays.dismissCommandPalette(webViewId);
          return;
        }

        // Enter-menu safety net (Task 15 round 3, QA run 3 item 5): the Enter palette is a
        // FOCUSED palette designed to be driven by the renderer overlay's own input, but if the
        // cross-frame focus handoff loses (or the user clicks back into the editor), keys land
        // HERE — pre-fix, Escape then reached Lexical instead of cancelling (the split committed
        // and the palette zombied because nothing ever dismissed the 'enter' session). Forward
        // the session-control keys; any other typing means the user resumed editing, so dismiss
        // and let the keystroke land.
        if (session?.kind === 'enter') {
          if (
            event.key === 'Shift' ||
            event.key === 'Control' ||
            event.key === 'Alt' ||
            event.key === 'Meta'
          )
            return;
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            event.stopPropagation();
            papi.overlays.updateCommandPalette(webViewId, {
              moveSelection: event.key === 'ArrowDown' ? 1 : -1,
            });
            return;
          }
          if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation(); // keep Lexical from performing the default split
            paletteSession.current = undefined;
            papi.overlays.commitCommandPaletteSelection(webViewId);
            return;
          }
          if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            paletteSession.current = undefined;
            papi.overlays.dismissCommandPalette(webViewId);
            return;
          }
          // Any other key: the user resumed editing — close the palette, let the key land.
          paletteSession.current = undefined;
          papi.overlays.dismissCommandPalette(webViewId);
          return;
        }

        if (!session && event.key === defaultMarkersMenuTrigger) {
          const ctx = editorRef.current?.getMarkerMenuContext();
          if (ctx) {
            const items = getMarkerMenuItems(styleInfo ?? defaultStyleInfo, ctx);
            if (items.length > 0) {
              const passive = !ctx.hasTextSelection;
              // Collapsed caret: don't prevent default — the `\` lands as literal text and the
              // passive palette tracks it. Selection: prevent default AND stopPropagation (focused
              // palette; in capture phase this now actually keeps Lexical from typing `\` over the
              // selected text, fixing item 5's text loss).
              if (!passive) {
                event.preventDefault();
                event.stopPropagation();
              }
              openMarkerPalette(ctx, items, { passive, literalPrefixLanded: passive });
            }
          }
          return;
        }

        if (
          !session &&
          event.key === 'Enter' &&
          !event.shiftKey &&
          !event.ctrlKey &&
          !event.altKey &&
          !event.metaKey
        ) {
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
          editorInput &&
          document.activeElement === editorInput &&
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

      // Find dialog trigger listener
      if (event.ctrlKey && event.key.toLowerCase() === 'f') {
        event.preventDefault();
        papi.commands.sendCommand('platformScripture.openFind', webViewId);
      } else if (
        !isReadOnlyEffective &&
        viewType === 'standard' &&
        editorInput &&
        document.activeElement === editorInput &&
        event.ctrlKey &&
        event.key.toLowerCase() === 't'
      ) {
        // Ctrl+T inserts a footnote; Ctrl+Shift+T inserts a cross-reference (spec §6/§9). Scoped
        // to the main editor via the same `editorInput`/`activeElement` check used for the marker
        // menu trigger above, so the shortcut doesn't fire while the FootnoteEditor/CommentEditor
        // popovers (which have their own separate `.editor-input`) have focus. Standard-view only,
        // matching the other Standard view PT9-parity entry points.
        event.preventDefault();
        if (event.shiftKey) {
          insertCrossReferenceAtCurrentSelection();
        } else {
          insertFootnoteAtCurrentSelection();
        }
      } else {
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
        }
      }
    };

    window.addEventListener('keydown', handleStandardViewTriggers, { capture: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleStandardViewTriggers, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    webViewId,
    insertCommentAtCurrentSelection,
    insertFootnoteAtCurrentSelection,
    insertCrossReferenceAtCurrentSelection,
    showMarkersMenu,
    showInlineMarkersMenu,
    isMac,
    isReadOnlyEffective,
    viewType,
    styleInfo,
    openMarkerPalette,
    openEnterPalette,
  ]);

  // Apply annotation styles from extensions
  useAnnotationStyleSheet();

  // Apply the project stylesheet-derived CSS (standard view only; spec §8 stage 4)
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
      // Preserve versificationStr: ScriptureReferencePlugin returns {book, chapterNum, verseNum}
      // without versificationStr, so falling back to scrRef keeps the versification consistent and
      // prevents the PDP selector from changing on every click.
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

  const [usjFromPdpPossiblyError, saveUsjToPdpRaw] = useProjectData(
    'platformScripture.USJ_Chapter',
    projectId,
  ).ChapterUSJ(
    useMemo(() => {
      return {
        book: scrRef.book,
        chapterNum: scrRef.chapterNum,
        verseNum: 1,
        versificationStr: scrRef.versificationStr,
      };
    }, [scrRef.book, scrRef.chapterNum, scrRef.versificationStr]),
    defaultUsj,
    // `whichUpdates` set to `*` because we need to receive all updates instead of just ones that
    // are not deeply equal so we can tell when the PDP finished processing our latest changes sent
    useMemo(() => ({ whichUpdates: '*' }), []),
  );
  // Handle a PlatformError if one comes in instead of project text
  const [usjFromPdp, bookExists] = useMemo(() => {
    if (!isPlatformError(usjFromPdpPossiblyError)) return [usjFromPdpPossiblyError, true];

    const errorMessage = getErrorMessage(usjFromPdpPossiblyError);
    logger.error(`Error getting USJ from PDP: ${errorMessage}`);
    return [defaultUsj, !bookNotFoundRegex.test(errorMessage)];
  }, [usjFromPdpPossiblyError]);
  const usjSentToPdp = useRef<Usj | undefined>(usjFromPdp);
  const currentlyWritingUsjToPdp = useRef(false);
  // Updated in useEffect (which runs after all useLayoutEffects), so this ref is stable for the
  // entire layout phase of each render. If a useLayoutEffect fires during a chapter-change render
  // (e.g. footnote-editor closing), this ref still holds the OLD chapter's setter — preventing
  // footnote changes from being saved to the wrong chapter.
  const saveUsjToPdpRawStableRef = useRef<typeof saveUsjToPdpRaw>(saveUsjToPdpRaw);
  useEffect(() => {
    saveUsjToPdpRawStableRef.current = saveUsjToPdpRaw;
  }, [saveUsjToPdpRaw]);

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

  /* If the editor has updates that the PDP hasn't recorded, save them to the PDP */
  const saveUsjToPdpIfUpdated = useMemo(() => {
    function saveUsjToPdpIfUpdatedInternal(usjFromEditor = editorRef.current?.getUsj()) {
      if (!usjFromEditor) return;

      const usjFromEditorWithCorrectedVersion = correctEditorUsjVersion(usjFromEditor);
      if (!areUsjContentsEqualExceptWhitespace(usjFromPdp, usjFromEditorWithCorrectedVersion))
        saveUsjToPdpInternal(usjFromEditorWithCorrectedVersion);
    }

    // We used to have this running on the editor's `onUsjChanged`, but it seems the editor still
    // fires an `onUsjChanged` when its USJ is set. Until this is fixed, we will just use
    // `saveUsjToPdpIfUpdated` everywhere.
    async function saveUsjToPdpInternal(newUsj: Usj) {
      if (!saveUsjToPdpRawStableRef.current) return;

      // Don't start writing to the PDP again if we're in the middle of writing now
      if (currentlyWritingUsjToPdp.current) return;

      // Indicate we're in the process of writing to the PDP so we don't trigger multiple writes
      currentlyWritingUsjToPdp.current = true;
      usjSentToPdp.current = newUsj;
      try {
        const saveResult = await saveUsjToPdpRawStableRef.current(newUsj);

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
        } else if (!saveResult && currentlyWritingUsjToPdp.current) {
          currentlyWritingUsjToPdp.current = false;

          // The set was unsuccessful AND we haven't received new USJ from the PDP, so there is a
          // chance the editor has more updates since the last attempted save. Let's check and save
          // again if there have been updates
          let editorUsj = editorRef.current?.getUsj();
          if (editorUsj) editorUsj = correctEditorUsjVersion(editorUsj);
          if (!deepEqualAcrossIframes(editorUsj, newUsj)) saveUsjToPdpIfUpdatedInternal(editorUsj);
        }
      } catch (e) {
        const errorMessage = getErrorMessage(e);
        logger.error(`Error saving USJ to PDP: ${errorMessage}`);
        currentlyWritingUsjToPdp.current = false;

        if (!PERMISSIONS_EXCEPTION_REGEX.test(errorMessage)) return;

        // The error is due to a permissions issue, so make a notification to inform the user and
        // reset the text to how it was before
        try {
          if (usjFromPdp && editorRef.current) {
            usjSentToPdp.current = usjFromPdp;
            setEditorUsj.current(usjFromPdp);
          }
          await papi.notifications.send({
            severity: 'error',
            message: formatReplacementString(
              localizedStrings['%webView_platformScriptureEditor_error_permissions_format%'],
              { projectName },
            ),
          });
        } catch (innerError) {
          logger.error(
            `Error handling permissions exception when saving USJ to PDP: ${getErrorMessage(
              innerError,
            )}`,
          );
        }
      }
    }

    return saveUsjToPdpIfUpdatedInternal;
  }, [usjFromPdp, projectName, localizedStrings, projectId]);

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
    setShowFootnoteEditor(false);
  }, []);

  /** Called by FootnoteEditor's onClose prop (X button or save-then-close). */
  const onFootnoteEditorClose = useCallback(() => {
    closeFootnoteEditor(true);
  }, [closeFootnoteEditor]);

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
      editingNoteIsNew.current = true;
      setShowFootnoteEditor(true);
    }
  }, []);

  /**
   * Latest save function behind a stable ref: `saveUsjToPdpIfUpdated`'s identity changes with every
   * `usjFromPdp` update, and recreating the debounced wrapper on each change would drop the pending
   * trailing-edge timer (losing the save of the final keystrokes).
   */
  const saveUsjToPdpIfUpdatedRef = useRef(saveUsjToPdpIfUpdated);
  useEffect(() => {
    saveUsjToPdpIfUpdatedRef.current = saveUsjToPdpIfUpdated;
  }, [saveUsjToPdpIfUpdated]);

  /**
   * Task 15 (fluent marker typing): saving on EVERY editor change round-trips a mid-marker-typing
   * doc (pending literal `\q1` still in plain text) through the PDP's USFM normalization; the
   * content-different echoes then fight the editor for the doc under the caret ~150-250ms after
   * each keystroke (`useEditorPdpSync` defends the focused editor, but the echo storm itself is the
   * disease). Debounce the keystroke-driven save — trailing edge, so the save always fires once
   * typing rests. The 700ms interval is chosen to kill the per-keystroke echo storm; it is ballpark
   * consistent with PT9's UI timer granularity, not a cited PT9 constant. Only the save half is
   * debounced (the footnote-editor bookkeeping in `handleEditorialUsjChange` must stay
   * synchronous). Imperative saves elsewhere (explicit flows, `useEditorPdpSync`'s push-back) are
   * unaffected.
   *
   * Uses the local flushable debouncer (not `platform-bible-utils`' `debounce`, which has no
   * flush/cancel) so pending edits survive lifecycle boundaries — see the effects below.
   */
  const saveUsjToPdpDebounced = useMemo(
    () => createFlushableDebouncer((usj: Usj) => saveUsjToPdpIfUpdatedRef.current(usj), 700),
    [],
  );

  // Lifecycle for the debounced save (wave review, Important): a pending trailing call must never
  // be LOST (crash-resilience vs. the prior per-change save) nor fire against the WRONG chapter's
  // save context.
  //
  // (1) Chapter/book switch: flush in this effect's CLEANUP, which React runs when book/chapter
  // change BEFORE the same render pass's later effects re-point `saveUsjToPdpIfUpdatedRef` (refs
  // are only reassigned in the new effect pass), so the pending call — which captured the OLD
  // chapter's USJ — resolves against the OLD chapter's save function. This ordering is the
  // stale-write kill: without it the pending call would write the old chapter's USJ through the
  // NEW chapter's data selector. Unmount runs the same cleanup, covering web-view dispose.
  useEffect(() => {
    return () => saveUsjToPdpDebounced.flush();
  }, [saveUsjToPdpDebounced, scrRef.book, scrRef.chapterNum]);

  // (2) Focus loss / page teardown: best-effort flush on window blur and pagehide/beforeunload.
  // The underlying save is async (a papi network send); on teardown paths there is no guarantee
  // the send completes before the renderer dies — this is deliberately best-effort, matching the
  // reliability of any async work in these events. On plain blur the send proceeds normally.
  useEffect(() => {
    const flush = () => saveUsjToPdpDebounced.flush();
    window.addEventListener('blur', flush);
    window.addEventListener('pagehide', flush);
    window.addEventListener('beforeunload', flush);
    return () => {
      window.removeEventListener('blur', flush);
      window.removeEventListener('pagehide', flush);
      window.removeEventListener('beforeunload', flush);
    };
  }, [saveUsjToPdpDebounced]);

  const handleEditorialUsjChange = useCallback(
    (usj: Usj, ops?: DeltaOp[], _source?: DeltaSource, insertedNodeKey?: string) => {
      saveUsjToPdpDebounced.schedule(usj);
      if (editingNoteKey.current) {
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

  // Sync editor content with PDP data and track write completion
  useEditorPdpSync({
    usjFromPdp,
    editorRef,
    usjSentToPdp,
    setEditorUsj,
    currentlyWritingUsjToPdp,
    saveUsjToPdpIfUpdated,
  });

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
      logger.warn(
        `Error checking chapter USJ for notes (footnotes auto-show): ${getErrorMessage(e)}. USJ: ${JSON.stringify(usjFromPdp)}`,
      );
      return false;
    }
  }, [usjFromPdp]);

  // PT9-divergent NN3 behavior (behind `footnotesAutoShow`, default off): in standard view,
  // auto-show the footnotes pane when the loaded chapter has notes and auto-hide it when it
  // doesn't, unless the user has manually overridden the pane's visibility for this chapter (see
  // `footnotesAutoOverrideRef`/`toggleFootnotesPaneVisibility` above).
  useEffect(() => {
    if (!footnotesAutoShow || viewType !== 'standard' || footnotesAutoOverrideRef.current) return;
    setFootnotesPaneVisible(chapterHasNotes);
  }, [footnotesAutoShow, viewType, chapterHasNotes, setFootnotesPaneVisible]);

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

          // Open the comment list and select the new thread
          await openCommentListAndSelectThreadSafe(papi, webViewId, newThreadId);
        }

        pendingCommentAnnotationRange.current = undefined;
        if (assignedUser !== undefined) setLastAssignedUser(assignedUser);
        setShowCommentEditor(false);
      } catch (error) {
        logger.error(`Error creating comment: ${getErrorMessage(error)}`);
      } finally {
        isSubmittingComment.current = false;
      }
    },
    [projectId, scrRef, createCommentAnnotationClickHandler, webViewId],
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
      // Assuming that the project menu command is one of the registered command handlers in papi
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      papi.commands.sendCommand(projectMenuCommand.command as keyof CommandHandlers, webViewId);
    },
    [webViewId],
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
      return (
        <div className="tw:flex tw:items-center tw:justify-center tw:h-full tw:px-4">
          {workaround}
          {isReadOnly
            ? localizedStrings['%webView_platformScriptureEditor_error_bookNotFoundResource%']
            : localizedStrings['%webView_platformScriptureEditor_error_bookNotFoundProject%']}
        </div>
      );
    }
    if (!usjFromPdp || usjFromPdp === defaultUsj) {
      return (
        <div className="tw:flex tw:items-center tw:justify-center tw:h-full">
          <Spinner />
        </div>
      );
    }

    return (
      <>
        {workaround}
        <ParagraphMarkerTooltipOverlay>
          <EditorKeyboardShortcuts editorRef={editorRef}>
            <Editorial
              ref={editorRef}
              scrRef={scrRef}
              onScrRefChange={setScrRefNoScroll}
              options={options}
              logger={logger}
              onUsjChange={isReadOnly ? undefined : handleEditorialUsjChange}
              onSelectionChange={handleSelectionChange}
              onStateChange={(state) => {
                setCanUndo(state.canUndo);
                setCanRedo(state.canRedo);
                setBlockMarker(state.blockMarker);
                setContextMarker(state.contextMarker);
              }}
            />
          </EditorKeyboardShortcuts>
        </ParagraphMarkerTooltipOverlay>
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
    />
  ) : undefined;

  const scrollGroupSelector = isPowerMode ? (
    <ScrollGroupSelector
      availableScrollGroupIds={availableScrollGroupIds}
      scrollGroupId={scrollGroupId}
      onChangeScrollGroupId={setScrollGroupId}
      localizedStrings={scrollGroupLocalizedStrings}
    />
  ) : undefined;

  return (
    <div className="tw:flex tw:flex-col tw:h-screen">
      <TabToolbar
        onSelectProjectMenuItem={menuCommandHandler}
        onSelectViewInfoMenuItem={menuCommandHandler}
        projectMenuData={webViewMenu.topMenu}
        className="scripture-editor-tab-nav tw:block tw:z-10"
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

                {blockMarker !== undefined && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {/* When the button is disabled for structure protection it is not focusable,
                            so make the wrapper focusable and named while disabled to keep the
                            explanatory tooltip reachable for keyboard and screen-reader users. */}
                        <div
                          role={isStructureProtected ? 'group' : undefined}
                          // Disabled buttons cannot host their own tooltip; the wrapper must be focusable to surface the structure-protection explanation to keyboard and screen-reader users
                          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                          tabIndex={isStructureProtected ? 0 : undefined}
                          aria-label={
                            isStructureProtected
                              ? localizedStrings[
                                  '%webView_platformScriptureEditor_paragraphSelection_protectedTooltip%'
                                ]
                              : undefined
                          }
                        >
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                className="tw:h-8"
                                aria-label="Paragraph Selection"
                                title={isStructureProtected ? undefined : 'Paragraph Selection'}
                                disabled={isStructureProtected}
                                variant="outline"
                              >
                                {blockMarker ? `${blockMarker} - ` : ''}
                                {blockMarker &&
                                Object.entries(blockMarkerToBlockNames).some(
                                  ([marker]) => marker === blockMarker,
                                )
                                  ? localizedStrings[blockMarkerToBlockNames[blockMarker]]
                                  : localizedStrings['%paragraphMenu_misc_markerDescription%']}
                                <ChevronDown />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="tw:p-0 tw:w-96">
                              <MarkerMenu
                                localizedStrings={localizedStrings}
                                markerMenuItems={paragraphSwitcherMenuItems}
                                searchPlaceholder={
                                  localizedStrings['%markerMenu_searchPlaceholder_paragraph%']
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </TooltipTrigger>
                      {isStructureProtected && (
                        <TooltipContent>
                          <p className="tw:max-w-xs tw:whitespace-pre-line">
                            {
                              localizedStrings[
                                '%webView_platformScriptureEditor_paragraphSelection_protectedTooltip%'
                              ]
                            }
                          </p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                )}
              </>
            )}
          </>
        }
        endAreaChildren={
          <>
            <StructureProtectionButton
              projectId={projectId}
              localizedStrings={localizedStrings}
              className="tw:h-8"
            />
            {scrollGroupSelector}
          </>
        }
      />
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

              {footnotesPaneVisible && usjFromPdp ? (
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
            isNewNote={editingNoteIsNew.current}
            onClose={onFootnoteEditorClose}
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
