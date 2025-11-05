import {
  Comments,
  EditorOptions,
  Editorial,
  EditorRef,
  Marginal,
  MarginalRef,
  SelectionRange,
  getDefaultViewOptions,
  UsjNodeOptions,
  DeltaOp,
  ViewOptions,
  DeltaSource,
  isInsertEmbedOpOfType,
} from '@eten-tech-foundation/platform-editor';
import {
  MarkerContent,
  USJ_TYPE,
  USJ_VERSION,
  Usj,
} from '@eten-tech-foundation/scripture-utilities';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  useLocalizedStrings,
  useProjectData,
  useProjectSetting,
  useSetting,
} from '@papi/frontend/react';
import {
  areUsjContentsEqualExceptWhitespace,
  compareScrRefs,
  deepClone,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
  serialize,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjReaderWriter,
  LegacyComment,
} from 'platform-bible-utils';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  FOOTNOTE_EDITOR_STRING_KEYS,
  FootnoteEditor,
  MarkdownRenderer,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Spinner,
} from 'platform-bible-react';
import {
  EditorDecorations,
  EditorWebViewMessage,
  ScriptureEditorViewType,
} from 'platform-scripture-editor';
import { createHtmlPortalNode, InPortal, OutPortal } from 'react-reverse-portal';
import { FootnotesLayout } from './platform-scripture-editor-footnotes.component';
import { deepEqualAcrossIframes } from './platform-scripture-editor.utils';
import {
  convertEditorCommentsToLegacyComments,
  convertLegacyCommentsToEditorThreads,
  insertCommentAnchorsIntoUsj,
  MILESTONE_END,
  MILESTONE_START,
} from './comments';
import {
  getLocalizeKeysFromDecorations,
  mergeDecorations,
  removeDecorations,
} from './decorations.util';
import { runOnFirstLoad, scrollToVerse } from './editor-dom.util';

/**
 * Time in ms to delay taking action to wait for the editor to load. Hope to be obsoleted by a way
 * to listen for the editor to finish loading
 *
 * This is best used for when the editor is transitioning between loads. For the first time the
 * editor loads, use {@link runOnFirstLoad} instead
 */
const EDITOR_LOAD_DELAY_TIME = 200;

const EDITOR_LOCALIZED_STRINGS: LocalizeKey[] = [
  ...FOOTNOTE_EDITOR_STRING_KEYS,
  '%webView_platformScriptureEditor_error_bookNotFoundProject%',
  '%webView_platformScriptureEditor_error_bookNotFoundResource%',
];

const defaultUsj: Usj = { type: USJ_TYPE, version: USJ_VERSION, content: [] };

const defaultLegacyComments: LegacyComment[] = [];

const defaultEditorDecorations: EditorDecorations = {};

const defaultProjectName = '';

const defaultTextDirection = 'ltr';

const defaultView: ViewOptions = getDefaultViewOptions();
// Return the appropriate ViewOptions for the given webview `viewType`.
// Centralizes the logic so initialization and effects can call the same helper
// instead of duplicating the shallow-copy code.
const getViewOptionsForType = (viewType: ScriptureEditorViewType): ViewOptions => {
  const base = { ...defaultView };
  if (viewType === 'markers') return { ...base, markerMode: 'visible' };
  return base;
};

// This regex is connected directly to the exception message within MissingBookException.cs
const bookNotFoundRegex = /Book number \d+ not found in project/;

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
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => EDITOR_LOCALIZED_STRINGS, []));

  // These two control the placement of the note editor popover by setting the location of the anchor
  const [notePopoverAnchorX, setNotePopoverAnchorX] = useState<number>();
  const [notePopoverAnchorY, setNotePopoverAnchorY] = useState<number>();
  const [notePopoverAnchorHeight, setNotePopoverAnchorHeight] = useState<number>();

  const [showFootnoteEditor, setShowFootnoteEditor] = useState<boolean>();
  const [editingNoteKey, setEditingNoteKey] = useState<string>();
  const [editingNoteOps, setEditingNoteOps] = useState<DeltaOp[]>();

  const [isReadOnly] = useWebViewState<boolean>('isReadOnly', true);
  const [decorations, setDecorations] = useWebViewState<EditorDecorations>(
    'decorations',
    defaultEditorDecorations,
  );

  const [viewType, setViewType] = useWebViewState<ScriptureEditorViewType>('viewType', 'formatted');

  const [scrRef, setScrRefWithScroll] = useWebViewScrollGroupScrRef();

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

  const nodeOptions = useMemo<UsjNodeOptions>(
    () => ({
      noteCallerOnClick: isReadOnly
        ? undefined
        : (event, noteNodeKey, isCollapsed, _getCaller, _setCaller, getNoteOps) => {
            if (isCollapsed) {
              if (editingNoteKey) return;

              const targetRect = event.currentTarget.getBoundingClientRect();
              setNotePopoverAnchorX(targetRect.left);
              setNotePopoverAnchorY(targetRect.top);
              setNotePopoverAnchorHeight(targetRect.height);
              setEditingNoteKey(noteNodeKey);
              setEditingNoteOps(getNoteOps());
              setShowFootnoteEditor(true);
            }
          },
    }),
    [isReadOnly, editingNoteKey],
  );

  const [viewOptions, setViewOptions] = useState<ViewOptions>(() => {
    return getViewOptionsForType(viewType);
  });

  // Keep viewOptions in sync with the `viewType` webview state. When `viewType` changes
  // we reset the viewOptions to the appropriate default with the requested marker/note modes.
  useEffect(() => {
    setViewOptions(() => getViewOptionsForType(viewType));
  }, [viewType]);

  const options = useMemo<EditorOptions>(
    () => ({
      isReadonly: isReadOnly,
      hasSpellCheck: false,
      nodes: nodeOptions,
      textDirection: textDirectionEffective,
      view: viewOptions,
    }),
    [isReadOnly, textDirectionEffective, nodeOptions, viewOptions],
  );

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
  const editorRef = useRef<EditorRef | MarginalRef | null>(null);
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
            'tw-contents',
        },
      }),
    [],
  );

  const nextSelectionRange = useRef<SelectionRange | undefined>(undefined);

  // listen to messages from the web view controller
  useEffect(() => {
    const webViewMessageListener = ({
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
          editorRef.current?.insertNote('f');
          break;
        }
        case 'insertCrossReferenceAtSelection': {
          editorRef.current?.insertNote('x');
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
    scrRef,
    setScrRefWithScroll,
    decorations,
    setDecorations,
    setFootnotesPaneVisible,
    setViewType,
    viewOptions.markerMode,
  ]);

  // Listen for Ctrl+F to open find dialog
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'f') {
        event.preventDefault();
        papi.commands.sendCommand('platformScripture.openFind', webViewId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [webViewId]);

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

  const [commentsEnabledPossiblyError] = useSetting('platform.commentsEnabled', false);

  const commentsEnabled = useMemo(() => {
    if (isPlatformError(commentsEnabledPossiblyError)) {
      logger.warn('Failed to load setting: platform.commentsEnabled', commentsEnabledPossiblyError);
      return false;
    }

    return commentsEnabledPossiblyError;
  }, [commentsEnabledPossiblyError]);

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
      internalVerseLocationRef.current = newVerseLocation;
      setScrRefWithScroll(newVerseLocation);
    },
    [setScrRefWithScroll],
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
  const usjFromPdpPrev = useRef<Usj | undefined>(undefined);
  useEffect(() => {
    return () => {
      usjFromPdpPrev.current = usjFromPdp;
    };
  }, [usjFromPdp]);

  /* Latest USJ from the PDP with comment anchors inserted */
  const usjFromPdpWithAnchors = useRef(defaultUsj);

  const usjSentToPdp = useRef(usjFromPdp);
  const currentlyWritingUsjToPdp = useRef(false);

  const [usjForFootnoteDisplay, setUsjForFootnoteDisplay] = useState<Usj | undefined>();

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
    function saveUsjToPdpIfUpdatedInternal(editorUsj = editorRef.current?.getUsj()) {
      if (
        editorUsj &&
        !areUsjContentsEqualExceptWhitespace(
          usjFromPdpWithAnchors.current,
          correctEditorUsjVersion(editorUsj),
        )
      )
        saveUsjToPdpInternal(editorUsj);
    }

    // We used to have this running on the editor's `onUsjChanged`, but it seems the editor still
    // fires an `onUsjChanged` when its USJ is set. Until this is fixed, we will just use
    // `saveUsjToPdpIfUpdated` everywhere.
    async function saveUsjToPdpInternal(newUsj: Usj) {
      if (!saveUsjToPdpRaw) return;

      // Don't start writing to the PDP again if we're in the middle of writing now
      if (currentlyWritingUsjToPdp.current) return;

      // Remove the milestones that we inserted before writing back to the PDP
      const clonedUsj = deepClone(correctEditorUsjVersion(newUsj));
      const usjRW = new UsjReaderWriter(clonedUsj, { markersMap: USFM_MARKERS_MAP_PARATEXT_3_0 });
      usjRW.removeContentNodes((node: MarkerContent) => {
        if (typeof node === 'string') return false;
        if (node.type !== 'ms') return false;
        return node.marker === MILESTONE_START || node.marker === MILESTONE_END;
      });

      // Indicate we're in the process of writing to the PDP so we don't trigger multiple writes
      currentlyWritingUsjToPdp.current = true;
      usjSentToPdp.current = clonedUsj;
      try {
        if (!(await saveUsjToPdpRaw(clonedUsj)) && currentlyWritingUsjToPdp.current) {
          currentlyWritingUsjToPdp.current = false;

          // The set was unsuccessful AND we haven't received new USJ from the PDP, so there is a
          // chance the editor has more updates since the last attempted save. Let's check and save
          // again if there have been updates
          let editorUsj = editorRef.current?.getUsj();
          if (editorUsj) editorUsj = correctEditorUsjVersion(editorUsj);
          if (!deepEqualAcrossIframes(editorUsj, correctEditorUsjVersion(newUsj)))
            saveUsjToPdpIfUpdatedInternal(editorUsj);
        }
      } catch (e) {
        logger.error(`Error saving USJ to PDP: ${getErrorMessage(e)}`);
        currentlyWritingUsjToPdp.current = false;
      }
    }

    return saveUsjToPdpIfUpdatedInternal;
  }, [saveUsjToPdpRaw]);

  const [legacyCommentsFromPdpPossiblyError, saveLegacyCommentsToPdp] = useProjectData(
    'legacyCommentManager.comments',
    // Only load comments if we have them turned on
    commentsEnabled ? projectId : undefined,
  ).Comments(
    useMemo(() => {
      return { bookId: scrRef.book, chapterNum: scrRef.chapterNum };
    }, [scrRef.book, scrRef.chapterNum]),
    defaultLegacyComments,
  );

  const legacyCommentsFromPdp = useMemo(() => {
    if (isPlatformError(legacyCommentsFromPdpPossiblyError)) {
      logger.warn(
        `Error getting legacy comments from PDP: ${getErrorMessage(legacyCommentsFromPdpPossiblyError)}`,
      );
      return defaultLegacyComments;
    }
    return legacyCommentsFromPdpPossiblyError;
  }, [legacyCommentsFromPdpPossiblyError]);

  /**
   * Write the latest comments back to the PDP. We need `usjWithAnchors` to know where (e.g., verse
   * refs) the latest comments are in scripture text.
   */
  const saveCommentsToPdp = useCallback(
    (
      newComments: Comments | undefined,
      usjWithAnchors: Usj | undefined = editorRef.current?.getUsj(),
    ) => {
      // Cannot convert between legacy and current comments without access to corresponding USJ
      if (!usjWithAnchors) {
        logger.warn('Updating comments without providing USJ');
        return;
      }
      // We aren't currently overwriting comments, so if it's empty we have nothing to do
      if (!newComments) {
        logger.debug('Updating comments, but the comments are empty');
        return;
      }
      // If we can't save a newly merged set of comments, we have nothing to do
      if (!saveLegacyCommentsToPdp) {
        logger.warn('Updating comments without a way to save the comments to a PDP');
        return;
      }

      // Record all the IDs of previously known comments
      const legacyCommentIds = new Set<string>();
      legacyCommentsFromPdp.forEach((existingComment) => legacyCommentIds.add(existingComment.id));

      // Determine which "new" comments are actually new
      const usjRW = new UsjReaderWriter(correctEditorUsjVersion(usjWithAnchors), {
        markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
      });
      const newLegacyComments = convertEditorCommentsToLegacyComments(newComments, usjRW, scrRef);
      const legacyCommentsToAdd: LegacyComment[] = [];
      newLegacyComments.forEach((newComment) => {
        if (!legacyCommentIds.has(newComment.id)) legacyCommentsToAdd.push(newComment);
      });

      // Nothing to do
      if (legacyCommentsToAdd.length === 0) return;

      // Save the new comments to the data provider
      const newCommentArray = [...legacyCommentsFromPdp, ...legacyCommentsToAdd];
      saveLegacyCommentsToPdp(newCommentArray);
    },
    [legacyCommentsFromPdp, scrRef, saveLegacyCommentsToPdp],
  );

  /**
   * Modify `newUsj` to include anchors that the editor uses to highlight text where a comment
   * should be. The source of the comments is the legacy comment PDP.
   */
  const insertCommentAnchors = useCallback(
    (newUsj: Usj) => {
      try {
        insertCommentAnchorsIntoUsj(newUsj, legacyCommentsFromPdp);
        // Getting more information about the error
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        logger.debug(`Error inserting anchors into USJ: ${error}, stack = ${error.stack}"`);
      }
    },
    [legacyCommentsFromPdp],
  );

  const openFootnoteEditorOnNewNote = useCallback(
    (ops?: DeltaOp[], insertedNodeKey?: string) => {
      if (insertedNodeKey && ops) {
        // If we are already editing a note, then returns
        if (editingNoteKey) return;

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
        setEditingNoteKey(insertedNodeKey);
        setEditingNoteOps([noteOp]);
        setShowFootnoteEditor(true);
      }
    },
    [editingNoteKey],
  );

  const handleEditorialUsjChange = useCallback(
    (usj: Usj, ops?: DeltaOp[], _source?: DeltaSource, insertedNodeKey?: string) => {
      saveUsjToPdpIfUpdated(usj);
      openFootnoteEditorOnNewNote(ops, insertedNodeKey);
    },
    [openFootnoteEditorOnNewNote, saveUsjToPdpIfUpdated],
  );

  const onUsjAndCommentsChange = useCallback(
    (
      newUsjFromEditor: Usj,
      newCommentsFromEditor: Comments | undefined,
      ops?: DeltaOp[],
      _source?: DeltaSource,
      insertedNodeKey?: string,
    ) => {
      saveCommentsToPdp(newCommentsFromEditor, newUsjFromEditor);
      saveUsjToPdpIfUpdated(newUsjFromEditor);
      openFootnoteEditorOnNewNote(ops, insertedNodeKey);
    },
    [saveUsjToPdpIfUpdated, saveCommentsToPdp, openFootnoteEditorOnNewNote],
  );

  // This should only be used in the following `useEffect`
  const mostRecentlySetLegacyComments = useRef(legacyCommentsFromPdp);

  // Update the editor if a change comes in from the PDP
  // Note: this will run every time we get data from the PDP whether or not it is different than it
  // was previously. We need to know when data comes in so we can set
  // `currentlyWritingUsjToPdp.current` to `false` appropriately
  useEffect(() => {
    if (!usjFromPdp || !legacyCommentsFromPdp || !editorRef.current) return;

    // The PDP informed us of updates, so writing to it must be complete (if we were writing)
    currentlyWritingUsjToPdp.current = false;

    // Recalculate usj from PDP with anchors if the new USJ we received from the PDP is different
    // than the previous we received
    if (!deepEqualAcrossIframes(usjFromPdp, usjFromPdpPrev.current)) {
      // The editor's USJ already has anchors, so insert them into the PDP's USJ before comparing
      usjFromPdpWithAnchors.current = deepClone(usjFromPdp);
      insertCommentAnchors(usjFromPdpWithAnchors.current);
    }

    // If what the PDP provided is different than the last thing we sent to the PDP, assume the PDP
    // has the best data. This could happen if the selected chapter changed or something other than
    // the editor wrote to the PDP.
    if (!areUsjContentsEqualExceptWhitespace(usjFromPdpWithAnchors.current, usjSentToPdp.current)) {
      usjSentToPdp.current = usjFromPdpWithAnchors.current;
      editorRef.current.setUsj(usjFromPdpWithAnchors.current);
    }
    // If the editor has updates that the PDP hasn't recorded, save them to the PDP
    else saveUsjToPdpIfUpdated();

    // --- Ensure footnotes reflect the authoritative USJ after PDP update / reconciliation ---
    // Prefer whatever is actually in the editor (editorRef), because earlier in this effect
    // we may have set the editor from the PDP if the PDP had a "trumping" change. Ira expressed
    // doubts as to whether the above changes will have been fully applied to the editor by now, but
    // they seem to be. At least I have not yet found another way to do this that keeps the
    // footnotes in sync.
    const authoritativeUsj =
      editorRef.current?.getUsj() ?? usjFromPdpWithAnchors.current ?? usjFromPdp;
    if (authoritativeUsj) setUsjForFootnoteDisplay(authoritativeUsj);

    // Make sure the editor has the latest comment data from the PDP
    if (
      'setComments' in editorRef.current &&
      !deepEqualAcrossIframes(legacyCommentsFromPdp, mostRecentlySetLegacyComments.current)
    ) {
      const threads = convertLegacyCommentsToEditorThreads(legacyCommentsFromPdp);
      mostRecentlySetLegacyComments.current = legacyCommentsFromPdp;
      // The editor's USJ needs to have anchors for these comments or the editor will error
      editorRef.current.setComments?.(threads);
    }
  }, [
    insertCommentAnchors,
    legacyCommentsFromPdp,
    saveUsjToPdpIfUpdated,
    usjFromPdp,
    setUsjForFootnoteDisplay,
  ]);

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

        let nextTextLocationJsonPath = '';
        try {
          nextTextLocationJsonPath = new UsjReaderWriter(usjFromPdp, {
            markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
          }).usfmVerseLocationToNextTextLocation(scrRef).documentLocation.jsonPath;
        } catch (e) {
          logger.debug(`Could not get next text location for verse ref ${serialize(scrRef)}`);
        }

        editorRef.current?.focus();

        if (!nextTextLocationJsonPath) return;

        editorRef.current?.setSelection({
          start: {
            jsonPath: nextTextLocationJsonPath,
            offset: 0,
          },
        });
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

  const onFootnoteEditorClose = useCallback(() => {
    setEditingNoteKey(undefined);
    setEditingNoteOps(undefined);
    setShowFootnoteEditor(false);
  }, []);

  const onFootnoteEditorSave = (newNoteOps: DeltaOp[]) => {
    if (editingNoteKey) {
      editorRef.current?.replaceEmbedUpdate(editingNoteKey, newNoteOps);
    }
    onFootnoteEditorClose();
  };

  function renderEditor() {
    const commonProps = {
      ref: editorRef,
      scrRef,
      onScrRefChange: setScrRefNoScroll,
      options,
      logger,
    };

    /* Workaround to pull in platform-bible-react styles into the editor */
    const workaround = <Button className="tw-hidden" />;

    if (!bookExists) {
      return (
        <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-px-4">
          {workaround}
          {isReadOnly
            ? localizedStrings['%webView_platformScriptureEditor_error_bookNotFoundResource%']
            : localizedStrings['%webView_platformScriptureEditor_error_bookNotFoundProject%']}
        </div>
      );
    }
    if (!usjFromPdp || usjFromPdp === defaultUsj) {
      return (
        <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
          <Spinner />
        </div>
      );
    }
    if (commentsEnabled && !isReadOnly) {
      return (
        <>
          {workaround}
          <Marginal
            {...commonProps}
            onUsjChange={onUsjAndCommentsChange}
            onCommentChange={saveCommentsToPdp}
          />
        </>
      );
    }
    return (
      <>
        {workaround}
        <Editorial
          {...commonProps}
          onUsjChange={isReadOnly ? undefined : handleEditorialUsjChange}
        />
      </>
    );
  }

  return (
    <>
      {/* Mount the editor in a reverse portal so it doesn't unmount and lose its internal state */}
      <InPortal node={editorPortalNode}>{renderEditor()}</InPortal>
      <div className="tw-h-screen tw-w-screen">
        {/* Containers */}
        {Object.entries(decorations.containers ?? {}).reduce(
          (children, [id, decoration]) => (
            <div
              className="tw-h-full"
              data-container-id={id}
              key={`container-${id}`}
              style={decoration.style}
            >
              {children}
            </div>
          ),
          <div className="tw-flex tw-flex-col tw-h-full">
            <div className="tw-flex-grow tw-min-h-0 tw-m-1 tw-flex tw-flex-col tw-gap-1">
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
                      className="tw-h-4 tw-w-4"
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
                        className="tw-max-w-none tw-text-sm"
                        markdown={decorationsLocalizedStrings[header.descriptionMd]}
                      />
                    </AlertDescription>
                  )}
                </Alert>
              ))}

              {footnotesPaneVisible && usjForFootnoteDisplay ? (
                <FootnotesLayout
                  usj={usjForFootnoteDisplay}
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
      {/** Footnote editor components */}
      <Popover open={showFootnoteEditor}>
        <PopoverAnchor
          className="tw-absolute"
          style={{
            top: notePopoverAnchorY,
            left: notePopoverAnchorX,
            // This height makes it so that visually the popover displays below the current line where the footnote is
            height: notePopoverAnchorHeight,
            width: 0,
            pointerEvents: 'none',
          }}
        />
        <PopoverContent className="tw-w-96 tw-p-[10px]">
          <FootnoteEditor
            noteOps={editingNoteOps}
            noteKey={editingNoteKey}
            onSave={onFootnoteEditorSave}
            onClose={onFootnoteEditorClose}
            scrRef={scrRef}
            viewOptions={options.view ?? defaultView}
            localizedStrings={localizedStrings}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
