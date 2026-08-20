import {
  AnnotationRange,
  DeltaOp,
  DeltaOpInsertNoteEmbed,
  DeltaSource,
  Editorial,
  EditorOptions,
  EditorRef,
  getDefaultViewOptions,
  getViewOptions,
  isInsertEmbedOpOfType,
  PARAGRAPH_STRUCTURE_VIEW_MODE,
  SelectionRange,
  StructureProtectionMode,
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
  DisabledActionTooltip,
  EditorKeyboardShortcuts,
  FOOTNOTE_EDITOR_STRING_KEYS,
  FootnoteEditor,
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
import { EmptyChapterView, EMPTY_CHAPTER_VIEW_STRING_KEYS } from './empty-chapter-view.component';
import {
  BookNotAvailableView,
  BOOK_NOT_AVAILABLE_VIEW_STRING_KEYS,
  type ManageBooksDisabledReason,
} from './book-not-available-view.component';
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
import { resolveFindSelectionText } from './find-trigger.util';
import { useOpenFindShortcut } from './use-open-find-shortcut.hook';
import { useSelectionSnapshot } from './use-selection-snapshot.hook';
import { useEditorPdpSync } from './use-editor-pdp-sync.hook';
import { FootnotesLayout } from './platform-scripture-editor-footnotes.component';
import {
  availableScrollGroupIds,
  blockMarkerToBlockNames,
  buildChapterScaffoldOps,
  canAddChapterNumber,
  correctEditorUsjVersion,
  deepEqualAcrossIframes,
  formatEditorTitle,
  generateInlineMarkerMenuListItems,
  generateParagraphMenuListItems,
  isChapterBlank,
  openCommentListAndSelectThreadSafe,
  resolveAddChapterNumberClick,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
  selectCommentThreadInPanelSafe,
} from './platform-scripture-editor.utils';
import { CHARACTER_MARKER_MENU_STRING_KEYS } from './character-marker-menu.utils';
import { CHARACTER_MARKER_CONTROL_STRING_KEYS } from './character-marker-control/character-marker-control.component';
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
        <span className="tw:inline-block tw:w-[6ch] tw:overflow-hidden tw:font-mono">
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
  ...Object.values(blockMarkerToBlockNames),
  ...Object.entries(usfmMarkers)
    .map((item) => item[1].description)
    .filter((item) => !!item),
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

const defaultTextDirection = 'ltr';

const defaultMarkersMenuTrigger = '\\';

// Return the appropriate ViewOptions for the given webview `viewType`.
// Centralizes the logic so initialization and effects can call the same helper
// instead of duplicating the shallow-copy code.
const getViewOptionsForType = (
  viewType: ScriptureEditorViewType,
  isPowerMode: boolean,
): ViewOptions => {
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

  /** Reads the current editor selection. A ref read has no dependencies. */
  const getSelection = useCallback(() => currentSelectionRef.current, []);

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

  const [viewType, setViewType] = useWebViewState<ScriptureEditorViewType>('viewType', 'formatted');

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
      // Gated on isReadOnlyEffective (not the narrower isReadOnly) so an Observer on an otherwise-
      // editable project can't open a note caller and attempt a note write the backend will reject.
      // isReadOnlyEffective already includes isSyncBlocked, so no separate check is needed for that.
      noteCallerOnClick: isReadOnlyEffective
        ? undefined
        : (event, noteNodeKey, isCollapsed, _getCaller, _setCaller, getNoteOps) => {
            if (!isCollapsed || editingNoteKey.current) return;

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
    [isReadOnlyEffective, editingNoteKey],
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

  const [footnotesPaneVisible, setFootnotesPaneVisible] = useWebViewState<boolean>(
    'footnotesPaneVisible',
    false,
  );

  const footnotesPaneVisibleRef = useRef(footnotesPaneVisible);

  useEffect(() => {
    footnotesPaneVisibleRef.current = footnotesPaneVisible;
  }, [footnotesPaneVisible]);

  // Using react's ref api which uses null, so we must use null
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);

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
  }, [scrRef, canUserCreateComments, isSyncBlocked, notifySyncEditBlocked]);

  const options = useMemo<EditorOptions>(
    () => ({
      isReadonly: isReadOnlyEffective,
      structureProtectionMode,
      hasSpellCheck: false,
      nodes: nodeOptions,
      textDirection: textDirectionEffective,
      markerMenuTrigger: '\\',
      view: viewOptions,
      hasExternalUI: true,
      contextMenu: [
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
      localizedStrings,
      insertCommentAtCurrentSelection,
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
          setViewType(viewOptions.markerMode === 'hidden' ? 'markers' : 'formatted');
          break;
        }
        case 'toggleFootnotesPaneVisibility': {
          const { current } = footnotesPaneVisibleRef;
          setFootnotesPaneVisible(!current);
          break;
        }
        case 'insertFootnoteAtSelection': {
          // Commits a snapshot of the project to the version history. Best-effort: see
          // `commitVersionHistorySnapshot`, which owns the ERROR_UNIMPLEMENTED handling shared with
          // the cross-reference and character-marker-removal paths.
          await commitVersionHistorySnapshot(
            projectId,
            localizedStrings['%versionHistoryCommit_beforeInsertFootnote%'],
            'inserting footnote',
          );

          editorRef.current?.insertMarker('f');
          break;
        }
        case 'insertCrossReferenceAtSelection': {
          // Commits a snapshot of the project to the version history — see the footnote case above.
          await commitVersionHistorySnapshot(
            projectId,
            localizedStrings['%versionHistoryCommit_beforeInsertCrossReference%'],
            'inserting cross-reference',
          );

          editorRef.current?.insertMarker('x');
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
    scrRef,
    setScrRefWithScroll,
    decorations,
    setDecorations,
    setFootnotesPaneVisible,
    setViewType,
    viewOptions.markerMode,
    localizedStrings,
    projectId,
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
      ),
    [contextMarker, localizedStrings, isStructureProtected, notifyStructureProtected],
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

  // Listen for the marker menu trigger to open the marker menu, and for
  // Cmd+Alt+M (macOS) or Ctrl+Alt+M / Ctrl+Shift+N (Windows/Linux) to insert comment at selection
  useEffect(() => {
    const editorInput = document.querySelector<HTMLDivElement>('.editor-input') ?? undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      // Shows the marker menu if it isn't already being shown and if the editor is currently selected
      if (currentSelectionRef.current) {
        if (
          !showMarkersMenu &&
          editorInput &&
          document.activeElement === editorInput &&
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [insertCommentAtCurrentSelection, showMarkersMenu, showInlineMarkersMenu, isMac]);

  // Apply annotation styles from extensions
  useAnnotationStyleSheet();

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

  const [usjFromPdpPossiblyError, saveUsjToPdpRaw, isUsjFromPdpLoading] = useProjectData(
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
  // also flip `isBlankChapter` to `false`) do not steal focus or scroll. Also gated on
  // `!isPowerMode`: the empty-chapter-view feature (and this button) is Simple-mode only, so the
  // button can't render in Power mode today — the guard is currently redundant but documents that
  // invariant and protects against a future refactor.
  useEffect(() => {
    if (isBlankChapter) return;
    // The round trip the in-flight guard above was waiting for has completed, regardless of what
    // caused this transition.
    if (!isPowerMode && pendingScaffoldInsertRef.current) {
      scrollToVerse(scrRef);
      editorRef.current?.focus();
    }
    pendingScaffoldInsertRef.current = false;
  }, [isBlankChapter, isPowerMode, scrRef]);

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

        // Two recoverable backend rejections revert the editor to the last PDP state and notify;
        // only the message differs. A sync-edit-block is expected/transient (editing paused during
        // an automatic Send/Receive), so it is a warning; a permissions failure is an error.
        const isSyncEditBlocked = SYNC_EDIT_BLOCKED_REGEX.test(errorMessage);
        const isPermissionsError = PERMISSIONS_EXCEPTION_REGEX.test(errorMessage);
        if (!isSyncEditBlocked && !isPermissionsError) return;

        try {
          if (usjFromPdp && editorRef.current) {
            usjSentToPdp.current = usjFromPdp;
            setEditorUsj.current(usjFromPdp);
          }
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
      }
    }

    return saveUsjToPdpIfUpdatedInternal;
  }, [usjFromPdp, projectName, localizedStrings, projectId, notifySyncEditBlocked]);

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

  const handleEditorialUsjChange = useCallback(
    (usj: Usj, ops?: DeltaOp[], _source?: DeltaSource, insertedNodeKey?: string) => {
      saveUsjToPdpIfUpdated(usj);
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
    [closeFootnoteEditor, openFootnoteEditorOnNewNote, saveUsjToPdpIfUpdated],
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
      // indistinguishable from an answer — `isLoading` is the only thing that separates them. The code
      // this replaced rendered one string for all of these cases, which is why the hazard is new here.
      // Same class of problem this file guards `CharacterMarkerBarOverlay` against further down.
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
        return (
          <div className="tw:flex tw:items-center tw:justify-center tw:h-full tw:px-4">
            {workaround}
            {localizedStrings['%webView_platformScriptureEditor_error_bookNotFoundResource%']}
          </div>
        );
      }
      return (
        <>
          {workaround}
          <BookNotAvailableView
            localizedStrings={localizedStrings}
            isPowerMode={isPowerMode}
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

    const showEmptyChapterView = !isPowerMode && isBlankChapter;

    return (
      <>
        {workaround}
        {showEmptyChapterView && (
          <EmptyChapterView
            localizedStrings={localizedStrings}
            isStructureProtected={isStructureProtected}
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

                {blockMarker !== undefined && (
                  <DisabledActionTooltip
                    disabled={isStructureProtected}
                    tooltipText={
                      localizedStrings[
                        '%webView_platformScriptureEditor_paragraphSelection_protectedTooltip%'
                      ]
                    }
                  >
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          // `tw:min-w-0` lets the button shrink so its label can truncate rather
                          // than push the end-zone buttons out of the clipped toolbar. The width
                          // ceiling lives on the label itself (30 characters) so it is expressed in
                          // the same units UX specified it in — see ParagraphStyleLabel.
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

              {footnotesPaneVisible && usjFromPdp ? (
                <FootnotesLayout
                  usj={usjFromPdp}
                  onFootnoteSelected={handleFootnoteSelected}
                  useWebViewState={useWebViewState}
                  showMarkers={options.view?.markerMode !== 'hidden'}
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
            scrRef={scrRef}
            editorOptions={options}
            defaultMarkerMenuTrigger={defaultMarkersMenuTrigger}
            localizedStrings={localizedStrings}
            parentEditorRef={editorRef}
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
