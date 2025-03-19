import {
  Comments,
  EditorOptions,
  Editorial,
  EditorRef,
  Marginal,
  MarginalRef,
} from '@biblionexus-foundation/platform-editor';
import {
  MarkerContent,
  USJ_TYPE,
  USJ_VERSION,
  Usj,
} from '@biblionexus-foundation/scripture-utilities';
import { Canon, SerializedVerseRef, VerseRef } from '@sillsdev/scripture';
import { JSX, useCallback, useEffect, useMemo, useRef } from 'react';
import type { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
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
  serialize,
  UsjReaderWriter,
} from 'platform-bible-utils';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  MarkdownRenderer,
} from 'platform-bible-react';
import { LegacyComment } from 'legacy-comment-manager';
import { EditorDecorations, EditorWebViewMessage, SelectionRange } from 'platform-scripture-editor';
import { createHtmlPortalNode, InPortal, OutPortal } from 'react-reverse-portal';
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

/** The offset in pixels from the top of the window to scroll to show the verse number */
const VERSE_NUMBER_SCROLL_OFFSET = 80;

/**
 * Time in ms to delay taking action to wait for the editor to load. Hope to be obsoleted by a way
 * to listen for the editor to finish loading
 */
const EDITOR_LOAD_DELAY_TIME = 100;

const defaultUsj: Usj = { type: USJ_TYPE, version: USJ_VERSION, content: [] };

const defaultEditorDecorations: EditorDecorations = {};

/**
 * Check deep equality of two values such that two equal objects or arrays created in two different
 * iframes successfully test as equal
 *
 * @param a
 * @param b
 * @returns
 */
function deepEqualAcrossIframes(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function scrollToVerse(verseLocation: SerializedVerseRef): HTMLElement | undefined {
  const verseElement =
    document.querySelector<HTMLElement>(
      `.editor-container span[data-marker="v"][data-number="${verseLocation.verseNum}"]`,
    ) ?? undefined;

  const scrollContainerElement =
    document.querySelector<HTMLElement>('.editor-container') ?? undefined;

  // Scroll if we find the verse or we're at the start of the chapter
  if (scrollContainerElement && (verseElement || verseLocation.verseNum === 1)) {
    // Get the scroll position all the way up to the scroll container
    let offsetElement = verseElement;
    // If we're at the first verse, scroll to the top so we can see intro material
    let verseOffsetTop = 0;
    if (verseLocation.verseNum > 1) {
      // Find the y offset from the scrolling container
      while (offsetElement && offsetElement !== scrollContainerElement) {
        verseOffsetTop += offsetElement.offsetTop;
        offsetElement =
          offsetElement.offsetParent instanceof HTMLElement
            ? offsetElement.offsetParent
            : undefined;
      }
      // Scroll a bit above the verse so you can see a bit of context
      verseOffsetTop -= VERSE_NUMBER_SCROLL_OFFSET;
    }

    scrollContainerElement?.scrollTo({
      behavior: 'smooth',
      top: verseOffsetTop,
    });
  }

  return verseElement;
}

globalThis.webViewComponent = function PlatformScriptureEditor({
  projectId,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps): JSX.Element {
  const [isReadOnly] = useWebViewState<boolean>('isReadOnly', true);
  const [decorations, setDecorations] = useWebViewState<EditorDecorations>(
    'decorations',
    defaultEditorDecorations,
  );

  // Using react's ref api which uses null, so we must use null
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | MarginalRef | null>(null);
  const [scrRef, setScrRefWithScroll] = useWebViewScrollGroupScrRef();
  const verseLocation = useMemo<SerializedVerseRef>(
    () => ({
      book: Canon.bookNumberToId(scrRef.bookNum),
      chapterNum: scrRef.chapterNum,
      verseNum: scrRef.verseNum,
    }),
    [scrRef],
  );
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
  }, [scrRef, setScrRefWithScroll, decorations, setDecorations]);

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

  const [commentsEnabled] = useSetting('platform.commentsEnabled', false);

  /**
   * Scripture reference we set most recently. Used so we don't scroll on updates to scrRef that
   * come from us
   */
  const internalVerseLocationRef = useRef<SerializedVerseRef | undefined>(undefined);

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

  const [usjFromPdp, saveUsjToPdpRaw] = useProjectData(
    'platformScripture.USJ_Chapter',
    projectId,
  ).ChapterUSJ(
    useMemo(
      () =>
        VerseRef.fromJSON({
          book: verseLocation.book,
          chapterNum: verseLocation.chapterNum,
          verseNum: 1,
          versificationStr: verseLocation.versificationStr,
        }),
      [verseLocation.book, verseLocation.chapterNum, verseLocation.versificationStr],
    ),
    defaultUsj,
    // `whichUpdates` set to `*` because we need to receive all updates instead of just ones that
    // are not deeply equal so we can tell when the PDP finished processing our latest changes sent
    useMemo(() => ({ whichUpdates: '*' }), []),
  );
  const usjFromPdpPrev = useRef<Usj | undefined>(undefined);
  useEffect(() => {
    return () => {
      usjFromPdpPrev.current = usjFromPdp;
    };
  }, [usjFromPdp]);

  /** Latest USJ from the PDP with comment anchors inserted */
  const usjFromPdpWithAnchors = useRef(defaultUsj);

  const usjSentToPdp = useRef(usjFromPdp);
  const currentlyWritingUsjToPdp = useRef(false);

  /** If the editor has updates that the PDP hasn't recorded, save them to the PDP */
  const saveUsjToPdpIfUpdated = useMemo(() => {
    function saveUsjToPdpIfUpdatedInternal(editorUsj = editorRef.current?.getUsj()) {
      if (
        editorUsj &&
        !areUsjContentsEqualExceptWhitespace(usjFromPdpWithAnchors.current, editorUsj)
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
      const clonedUsj = deepClone(newUsj);
      const usjRW = new UsjReaderWriter(clonedUsj);
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
          const editorUsj = editorRef.current?.getUsj();
          if (!deepEqualAcrossIframes(editorUsj, newUsj)) saveUsjToPdpIfUpdatedInternal(editorUsj);
        }
      } catch (e) {
        logger.error(`Error saving USJ to PDP: ${e}`);
        currentlyWritingUsjToPdp.current = false;
      }
    }

    return saveUsjToPdpIfUpdatedInternal;
  }, [saveUsjToPdpRaw]);

  const [legacyCommentsFromPdp, saveLegacyCommentsToPdp] = useProjectData(
    'legacyCommentManager.comments',
    // Only load comments if we have them turned on
    commentsEnabled ? projectId : undefined,
  ).Comments(
    useMemo(() => {
      return { bookId: verseLocation.book, chapterNum: verseLocation.chapterNum };
    }, [verseLocation.book, verseLocation.chapterNum]),
    [],
  );

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
      const usjRW = new UsjReaderWriter(usjWithAnchors);
      const newLegacyComments = convertEditorCommentsToLegacyComments(
        newComments,
        usjRW,
        verseLocation,
      );
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
    [legacyCommentsFromPdp, verseLocation, saveLegacyCommentsToPdp],
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

  const onUsjAndCommentsChange = useCallback(
    (newUsjFromEditor: Usj, newCommentsFromEditor: Comments | undefined) => {
      saveCommentsToPdp(newCommentsFromEditor, newUsjFromEditor);
      saveUsjToPdpIfUpdated(newUsjFromEditor);
    },
    [saveUsjToPdpIfUpdated, saveCommentsToPdp],
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
  }, [insertCommentAnchors, legacyCommentsFromPdp, saveUsjToPdpIfUpdated, usjFromPdp]);

  // On loading the first time, scroll the selected verse into view
  useEffect(() => {
    if (usjFromPdp && !hasFirstRetrievedScripture.current) {
      hasFirstRetrievedScripture.current = true;
      // Wait before scrolling to make sure there is time for the editor to load
      // TODO: hook into the editor and detect when it has loaded somehow
      setTimeout(() => scrollToVerse(verseLocation), EDITOR_LOAD_DELAY_TIME);
    }
  }, [usjFromPdp, verseLocation]);

  // Scroll the selected verse and selection range into view
  useEffect(() => {
    // If we made this latest scrRef change, don't scroll
    if (
      internalVerseLocationRef.current &&
      internalVerseLocationRef.current.book === verseLocation.book &&
      internalVerseLocationRef.current.chapterNum === verseLocation.chapterNum &&
      internalVerseLocationRef.current.verseNum === verseLocation.verseNum
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
      highlightedVerseElement = scrollToVerse(verseLocation);
      highlightedVerseElement?.classList.add('highlighted');

      internalVerseLocationRef.current = undefined;

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
  }, [verseLocation]);

  const [projectName] = useProjectSetting(projectId, 'platform.name', '');

  const options = useMemo<EditorOptions>(
    () => ({
      isReadonly: isReadOnly,
      hasSpellCheck: false,
      textDirection:
        projectName === 'OHEBGRK' && Canon.isBookOT(verseLocation.book) ? 'rtl' : 'ltr',
    }),
    [isReadOnly, projectName, verseLocation],
  );

  function renderEditor() {
    if (isReadOnly) {
      return (
        <>
          {/* Workaround to pull in platform-bible-react styles into the editor */}
          <Button className="tw-hidden" />
          <Editorial
            ref={editorRef}
            scrRef={verseLocation}
            onScrRefChange={setScrRefNoScroll}
            options={options}
            logger={logger}
          />
        </>
      );
    }
    if (commentsEnabled) {
      return (
        <>
          {/* Workaround to pull in platform-bible-react styles into the editor */}
          <Button className="tw-hidden" />
          <Marginal
            ref={editorRef}
            scrRef={verseLocation}
            onScrRefChange={setScrRefNoScroll}
            onUsjChange={onUsjAndCommentsChange}
            onCommentChange={saveCommentsToPdp}
            options={options}
            logger={logger}
          />
        </>
      );
    }
    return (
      <>
        {/* Workaround to pull in platform-bible-react styles into the editor */}
        <Button className="tw-hidden" />
        <Editorial
          ref={editorRef}
          scrRef={verseLocation}
          onScrRefChange={setScrRefNoScroll}
          onUsjChange={saveUsjToPdpIfUpdated}
          options={options}
          logger={logger}
        />
      </>
    );
  }

  return (
    <>
      {/** Mount the editor in a reverse portal so it doesn't unmount and lose its internal state */}
      <InPortal node={editorPortalNode}>{renderEditor()}</InPortal>
      <div className="tw-h-screen tw-w-screen">
        {/** Containers */}
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
            {/** Headers */}
            <div className="tw-flex-grow-0 tw-m-1 tw-flex tw-flex-col tw-gap-1">
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
            </div>
            {/** Render the editor inside the container decorations without re-mounting on re-parent */}
            <OutPortal node={editorPortalNode} />
          </div>,
        )}
      </div>
    </>
  );
};
