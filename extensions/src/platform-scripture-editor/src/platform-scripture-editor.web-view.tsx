import {
  AnnotationRange,
  DeltaOp,
  DeltaOpInsertNoteEmbed,
  DeltaSource,
  Editorial,
  EditorOptions,
  EditorRef,
  getDefaultViewOptions,
  isInsertEmbedOpOfType,
  SelectionRange,
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
  FOOTNOTE_EDITOR_STRING_KEYS,
  FootnoteEditor,
  MarkdownRenderer,
  Popover,
  PopoverAnchor,
  PopoverContent,
  ScrollGroupSelector,
  SelectMenuItemHandler,
  Spinner,
  TabToolbar,
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
  LocalizeKey,
  serialize,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjReaderWriter,
  WebViewMenu,
} from 'platform-bible-utils';
import {
  AnnotationActionHandler,
  EditorDecorations,
  EditorMessageSetAnnotation,
  EditorWebViewMessage,
  ScriptureEditorViewType,
  ScriptureRangeUsjVerseRefChapterLocation,
} from 'platform-scripture-editor';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createHtmlPortalNode, InPortal, OutPortal } from 'react-reverse-portal';
import { useAnnotationStyleSheet } from './annotations/use-annotation-stylesheet.hook';
import {
  getLocalizeKeysFromDecorations,
  mergeDecorations,
  removeDecorations,
} from './decorations.util';
import { runOnFirstLoad, scrollToAnnotation, scrollToVerse } from './editor-dom.util';
import { FootnotesLayout } from './platform-scripture-editor-footnotes.component';
import {
  availableScrollGroupIds,
  deepEqualAcrossIframes,
  formatEditorTitle,
  openCommentListAndSelectThreadSafe,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
} from './platform-scripture-editor.utils';
import { Redo, Undo } from 'lucide-react';

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
  '%webView_platformScriptureEditor_error_bookNotFoundProject%',
  '%webView_platformScriptureEditor_error_bookNotFoundResource%',
  '%webView_platformScriptureEditor_error_permissions_format%',
  '%webView_platformScriptureEditor_error_noTextSelected%',
  '%webView_platformScriptureEditor_error_selectionContainsMarkers%',
];

/** Annotation type used for translator comments (kebab-case to match CSS class naming) */
const ANNOTATION_TYPE_TRANSLATOR_COMMENT = 'translator-comment';

/** Annotation ID used for a pending comment that hasn't been saved yet */
const PENDING_COMMENT_ANNOTATION_ID = 'pending-comment';

/** Prefix the editor puts on annotation type when calling the annotation's callbacks */
const EDITOR_ANNOTATION_TYPE_PREFIX = 'external-';

const BOOKS_PRESENT_DEFAULT = '';

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

const defaultView: ViewOptions = getDefaultViewOptions();

// Return the appropriate ViewOptions for the given webview `viewType`.
// Centralizes the logic so initialization and effects can call the same helper
// instead of duplicating the shallow-copy code.
const getViewOptionsForType = (viewType: ScriptureEditorViewType): ViewOptions => {
  const base = { ...defaultView };
  if (viewType === 'markers') return { ...base, markerMode: 'visible', noteMode: 'expanded' };
  return base;
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

  const editingNoteKey = useRef<string>();
  const editingNoteOps = useRef<DeltaOpInsertNoteEmbed[]>();

  // These control the placement of the comment editor popover by setting the location of the anchor
  const [showCommentEditor, setShowCommentEditor] = useState<boolean>(false);
  const [commentPopoverAnchorX, setCommentPopoverAnchorX] = useState<number>();
  const [commentPopoverAnchorY, setCommentPopoverAnchorY] = useState<number>();
  const [commentPopoverAnchorHeight, setCommentPopoverAnchorHeight] = useState<number>();

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

  const [isReadOnly] = useWebViewState<boolean>('isReadOnly', true);
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

  const textDirectionEffective = useMemo(() => {
    // OHEBGRK is a special case where we want to show the OT in RTL but the NT in LTR
    if (projectName === 'OHEBGRK')
      if (Canon.isBookOT(scrRef.book)) return 'rtl';
      else return 'ltr';

    return textDirection;
  }, [projectName, scrRef, textDirection]);

  const commentsPdp = useProjectDataProvider('legacyCommentManager.comments', projectId);

  const fetchAssignableUsers = useCallback(async () => {
    if (!commentsPdp) {
      logger.debug('Comments PDP is not yet available for fetchAssignableUsers');
      return [];
    }
    return commentsPdp.findAssignableUsers();
  }, [commentsPdp]);
  const [commentEditorAssignableUsers] = usePromise(fetchAssignableUsers, []);

  const nodeOptions = useMemo<UsjNodeOptions>(
    () => ({
      noteCallerOnClick: isReadOnly
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
    [isReadOnly, editingNoteKey],
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
    return getViewOptionsForType(viewType);
  }, [viewType]);

  const options = useMemo<EditorOptions>(
    () => ({
      isReadonly: isReadOnlyEffective,
      hasSpellCheck: false,
      nodes: nodeOptions,
      textDirection: textDirectionEffective,
      markerMenuTrigger: '\\',
      view: viewOptions,
      hasExternalUI: true,
    }),
    [isReadOnlyEffective, textDirectionEffective, nodeOptions, viewOptions],
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
            'tw-contents',
        },
      }),
    [],
  );

  const nextSelectionRange = useRef<SelectionRange | undefined>(undefined);

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
          editorRef.current?.insertNote('f');
          break;
        }
        case 'insertCrossReferenceAtSelection': {
          editorRef.current?.insertNote('x');
          break;
        }
        case 'insertCommentAtSelection': {
          const selection = currentSelectionRef.current;

          // Validate that a text range is selected
          if (!selection?.start || !selection.end) {
            papi.notifications.send({
              message: '%webView_platformScriptureEditor_error_noTextSelected%',
              severity: 'warning',
            });
            return;
          }

          // Validate that the selection doesn't contain markers
          const editorUsj = editorRef.current?.getUsj();
          const editorUsjCorrected = editorUsj ? correctEditorUsjVersion(editorUsj) : undefined;
          if (editorUsjCorrected) {
            const usjRW = new UsjReaderWriter(editorUsjCorrected, {
              markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
            });

            const startNodeAndDocumentLocation = usjRW.jsonPathToUsjNodeAndDocumentLocation(
              selection.start.jsonPath,
            );
            const endNodeAndDocumentLocation = usjRW.jsonPathToUsjNodeAndDocumentLocation(
              selection.end.jsonPath,
            );

            // Make sure the selection is in a string and doesn't span multiple USJ nodes
            const selectionHasMarker =
              !isString(startNodeAndDocumentLocation?.node) ||
              startNodeAndDocumentLocation?.node !== endNodeAndDocumentLocation?.node;

            if (selectionHasMarker) {
              papi.notifications.send({
                message: '%webView_platformScriptureEditor_error_selectionContainsMarkers%',
                severity: 'warning',
              });
              return;
            }
          }

          // Store the selection as annotation range for later use
          const annotationRange: AnnotationRange = {
            start: { ...selection.start },
            end: { ...selection.end },
          };
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

  // Apply annotation styles from extensions
  useAnnotationStyleSheet();

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
  const usjSentToPdp = useRef<Usj | undefined>(usjFromPdp);
  const currentlyWritingUsjToPdp = useRef(false);

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
      if (!saveUsjToPdpRaw) return;

      // Don't start writing to the PDP again if we're in the middle of writing now
      if (currentlyWritingUsjToPdp.current) return;

      // Indicate we're in the process of writing to the PDP so we don't trigger multiple writes
      currentlyWritingUsjToPdp.current = true;
      usjSentToPdp.current = newUsj;
      try {
        if (!(await saveUsjToPdpRaw(newUsj)) && currentlyWritingUsjToPdp.current) {
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
  }, [saveUsjToPdpRaw, usjFromPdp, projectName, localizedStrings]);

  const openFootnoteEditorOnNewNote = useCallback(
    (ops?: DeltaOp[], insertedNodeKey?: string) => {
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

  // Update the editor if a change comes in from the PDP
  // Note: this will run every time we get data from the PDP whether or not it is different than it
  // was previously. We need to know when data comes in so we can set
  // `currentlyWritingUsjToPdp.current` to `false` appropriately
  useEffect(() => {
    if (!usjFromPdp || !editorRef.current) return;

    // The PDP informed us of updates, so writing to it must be complete (if we were writing)
    currentlyWritingUsjToPdp.current = false;

    // If what the PDP provided is different than the last thing we sent to the PDP, assume the PDP
    // has the best data. This could happen if the selected chapter changed or something other than
    // the editor wrote to the PDP.
    if (!areUsjContentsEqualExceptWhitespace(usjFromPdp, usjSentToPdp.current)) {
      usjSentToPdp.current = usjFromPdp;
      setEditorUsj.current(usjFromPdp);
    }
    // If the editor has updates that the PDP hasn't recorded, save them to the PDP
    else saveUsjToPdpIfUpdated();
  }, [saveUsjToPdpIfUpdated, usjFromPdp]);

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

  const onFootnoteEditorClose = useCallback(() => {
    editingNoteKey.current = undefined;
    editingNoteOps.current = undefined;
    setShowFootnoteEditor(false);
  }, []);

  const onFootnoteEditorSave = (newNoteOps: DeltaOp[]) => {
    if (editingNoteKey.current) {
      editorRef.current?.replaceEmbedUpdate(editingNoteKey.current, newNoteOps);
    }
    onFootnoteEditorClose();
  };

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

  const fetchActiveBooks = () => {
    return Array.from(booksPresent).reduce((ids: string[], char, index) => {
      if (char === '1') {
        ids.push(Canon.bookNumberToId(index + 1));
      }

      return ids;
    }, []);
  };

  const { recentScriptureRefs, addRecentScriptureRef } = useRecentScriptureRefs();

  const menuCommandHandler = useCallback<SelectMenuItemHandler>((projectMenuCommand) => {
    papi.commands.sendCommand(projectMenuCommand.command as keyof CommandHandlers, webViewId);
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [canUndo, setCanUndo] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [canRedo, setCanRedo] = useState(false);

  function renderEditor() {
    /* Workaround to pull in platform-bible-react styles into the editor */
    const workaround = <Button className="tw-hidden" />;

    // When not rendering the editor component itself, make sure not to try to apply the scripture-font
    // in the useEffect above

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

    return (
      <>
        {workaround}
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
          }}
        />
      </>
    );
  }

  return (
    <>
      {/* Mount the editor in a reverse portal so it doesn't unmount and lose its internal state */}
      <TabToolbar
        onSelectProjectMenuItem={menuCommandHandler}
        onSelectViewInfoMenuItem={menuCommandHandler}
        projectMenuData={webViewMenu.topMenu}
        className="scripture-editor-tab-nav"
        startAreaChildren={
          <>
            <BookChapterControl
              scrRef={scrRef}
              handleSubmit={setScrRefWithScroll}
              getActiveBookIds={booksPresent ? fetchActiveBooks : undefined}
              recentSearches={recentScriptureRefs}
              onAddRecentSearch={addRecentScriptureRef}
            />
            {!isReadOnly && (
              <>
                <Button
                  aria-label="Undo"
                  title="Undo"
                  variant="ghost"
                  size="icon"
                  onClick={() => editorRef.current?.undo()}
                  disabled={!canUndo}
                >
                  <Undo />
                </Button>
                <Button
                  aria-label="Redo"
                  title="Redo"
                  variant="ghost"
                  size="icon"
                  onClick={() => editorRef.current?.redo()}
                  disabled={!canRedo}
                >
                  <Redo />
                </Button>
              </>
            )}
          </>
        }
        endAreaChildren={
          <ScrollGroupSelector
            availableScrollGroupIds={availableScrollGroupIds}
            scrollGroupId={scrollGroupId}
            onChangeScrollGroupId={setScrollGroupId}
            localizedStrings={scrollGroupLocalizedStrings}
          />
        }
      />
      <InPortal node={editorPortalNode}>{renderEditor()}</InPortal>
      <div className="tw-h-screen tw-w-screen" dir={options.textDirection}>
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
        <PopoverContent className="tw-w-[500px] tw-p-[10px]">
          <FootnoteEditor
            classNameForEditor="scripture-font"
            noteOps={editingNoteOps.current}
            noteKey={editingNoteKey.current}
            onSave={onFootnoteEditorSave}
            onClose={onFootnoteEditorClose}
            scrRef={scrRef}
            editorOptions={options}
            localizedStrings={localizedStrings}
          />
        </PopoverContent>
      </Popover>
      {/** Comment editor for creating new comment threads */}
      <Popover open={showCommentEditor}>
        <PopoverAnchor
          className="tw-absolute"
          style={{
            top: commentPopoverAnchorY,
            left: commentPopoverAnchorX,
            height: commentPopoverAnchorHeight,
            width: 0,
            pointerEvents: 'none',
          }}
        />
        <PopoverContent className="tw-w-[400px] tw-p-[10px]">
          <CommentEditor
            assignableUsers={commentEditorAssignableUsers}
            onSave={onCommentEditorSave}
            onClose={onCommentEditorCancel}
            localizedStrings={localizedStrings}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
