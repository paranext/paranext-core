import {
  Comments,
  EditorOptions,
  Editorial,
  EditorRef,
  Marginal,
  MarginalRef,
} from '@biblionexus-foundation/platform-editor';
import { MarkerContent, MarkerObject, Usj } from '@biblionexus-foundation/scripture-utilities';
import { Canon, VerseRef } from '@sillsdev/scripture';
import { JSX, useCallback, useEffect, useMemo, useRef } from 'react';
import type { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useProjectData, useProjectSetting } from '@papi/frontend/react';
import {
  CHAPTER_TYPE,
  debounce,
  ScriptureReference,
  UsjContentLocation,
  UsjDocument,
  VERSE_TYPE,
  VerseRefOffset,
} from 'platform-bible-utils';
import { Button } from 'platform-bible-react';
import { LegacyComment } from 'legacy-comment-manager';

/** The offset in pixels from the top of the window to scroll to show the verse number */
const VERSE_NUMBER_SCROLL_OFFSET = 80;

/**
 * Time in ms to delay taking action to wait for the editor to load. Hope to be obsoleted by a way
 * to listen for the editor to finish loading
 */
const EDITOR_LOAD_DELAY_TIME = 100;

const MILESTONE_START = 'zmsc-s';
const MILESTONE_END = 'zmsc-e';

const usjDocumentDefault: Usj = { type: 'USJ', version: '0.2.1', content: [] };

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

type EditorComment = {
  author: string;
  content: string;
  deleted: boolean;
  id: string;
  timeStamp: number;
  type: 'comment';
  legacyComment: LegacyComment;
};

type EditorThread = {
  comments: EditorComment[];
  id: string;
  quote: string;
  type: 'thread';
  legacyComment: LegacyComment;
};

function convertLegacyCommentsToEditorThreads(legacyComments: LegacyComment[]): EditorThread[] {
  const retVal: EditorThread[] = [];
  const threads: Map<string, EditorThread> = new Map();
  legacyComments.forEach((legacyComment) => {
    let editorThread = threads.get(legacyComment.thread);
    if (!editorThread) {
      editorThread = {
        comments: [],
        id: legacyComment.thread,
        quote: `${legacyComment.verseRef}${legacyComment.selectedText ? ' - ' : ''}${legacyComment.selectedText ?? ''}`,
        type: 'thread',
        legacyComment,
      };
      threads.set(editorThread.id, editorThread);
      retVal.push(editorThread);
    }

    editorThread.comments.push({
      author: legacyComment.user,
      content: legacyComment.contents,
      deleted: legacyComment.deleted,
      id: legacyComment.id,
      timeStamp: Date.parse(legacyComment.date),
      type: 'comment',
      legacyComment,
    });
  });
  return retVal;
}

function getCommentDetails(
  usjDoc: UsjDocument,
  commentId: string,
  bookId: string,
): { start: VerseRefOffset; selectedText: string; contextAfter: string } {
  const startQuery = `$..content[?(@.type=="ms" && @.marker=="${MILESTONE_START}" && @.sid=="${commentId}")]`;
  const endQuery = `$..content[?(@.type=="ms" && @.marker=="${MILESTONE_END}" && @.eid=="${commentId}")]`;

  const startNode = usjDoc.findSingleValue<MarkerObject>(startQuery);
  const endNode = usjDoc.findSingleValue<MarkerObject>(endQuery);
  if (!startNode || !endNode)
    throw new Error(`Start and end nodes are not both present. start:${startNode} end:${endNode}`);

  const startParent = usjDoc.findParent<MarkerObject>(startQuery);
  const endParent = usjDoc.findParent<MarkerObject>(endQuery);
  if (!startParent || !endParent)
    throw new Error(
      `Start and end parents are not both present. start:${startParent} end:${endParent}`,
    );

  const start = usjDoc.nodeToVerseRefAndOffset(bookId, startNode, startParent);
  if (!start) throw new Error(`Could not find VerseRef for start of comment ${commentId}`);

  const startPoint = { node: startNode, offset: 0, jsonPath: usjDoc.nodeToJsonPath(startNode) };
  const endPoint = { node: endNode, offset: 0, jsonPath: usjDoc.nodeToJsonPath(endNode) };

  const selectedText = usjDoc.extractTextBetweenPoints(startPoint, endPoint, 20);
  const contextAfter = usjDoc.extractText(endPoint, 10);

  return { start, selectedText, contextAfter };
}

function convertEditorCommentsToLegacyComments(
  comments: Comments,
  usjDoc: UsjDocument,
  scrRef: ScriptureReference,
): LegacyComment[] {
  const legacyComments: LegacyComment[] = [];
  comments.forEach((editorComment) => {
    const commentDetails = getCommentDetails(
      usjDoc,
      editorComment.id,
      Canon.bookNumberToId(scrRef.bookNum),
    );
    if (editorComment.type === 'comment') {
      legacyComments.push({
        contents: editorComment.content,
        contextAfter: commentDetails.contextAfter,
        date: new Date(editorComment.timeStamp).toISOString(),
        deleted: editorComment.deleted,
        hideInTextWindow: false,
        id: editorComment.id,
        language: 'en',
        selectedText: commentDetails.selectedText,
        startPosition: commentDetails.start.offset,
        thread: editorComment.id,
        user: editorComment.author,
        verseRef: commentDetails.start.verseRef.toString(),
      });
    } else {
      editorComment.comments.forEach((editorThreadComment) => {
        legacyComments.push({
          contents: editorThreadComment.content,
          contextAfter: commentDetails.contextAfter,
          date: new Date(editorThreadComment.timeStamp).toISOString(),
          deleted: editorThreadComment.deleted,
          hideInTextWindow: false,
          id: editorThreadComment.id,
          language: 'en',
          selectedText: commentDetails.selectedText,
          startPosition: commentDetails.start.offset,
          thread: editorComment.id,
          user: editorThreadComment.author,
          verseRef: commentDetails.start.verseRef.toString(),
        });
      });
    }
  });
  return legacyComments;
}

function insertAnchorIfNeeded(
  usjDoc: UsjDocument,
  startOrEnd: 'start' | 'end',
  anchorId: string,
  anchorLocation: UsjContentLocation,
): boolean {
  // Make sure it doesn't already exist
  const anchorMarker = startOrEnd === 'start' ? MILESTONE_START : MILESTONE_END;
  const idType = startOrEnd === 'start' ? 'sid' : 'eid';
  const jsonPathExpressionForAnchor = `$..content[?(@.type=="ms" && @.marker=="${anchorMarker}" && @.${idType}=="${anchorId}")]`;
  if (usjDoc.findSingleValue(jsonPathExpressionForAnchor)) return false;

  // Find the container for the anchor
  const contentArray: MarkerContent[] | undefined = usjDoc.findParent(anchorLocation.jsonPath);
  if (!Array.isArray(contentArray))
    throw new Error(`Unexpected anchor location parent: ${JSON.stringify(contentArray)}`);

  // Figure out where this is in the content array
  const matches = anchorLocation.jsonPath.match(/content\[(\d+)\]/g);
  if (!matches || matches.length === 0)
    throw new Error(`Unexpected jsonPath query: ${anchorLocation.jsonPath}`);
  const lastNumber = matches[matches.length - 1].match(/(\d+)/);
  const contentIndex = parseInt(lastNumber ? lastNumber[0] : '0', 10);
  if (contentIndex > contentArray.length - 1)
    throw new Error(`Index ${contentIndex} longer than content array: ${anchorLocation.jsonPath}`);
  if (
    anchorLocation.node &&
    !deepEqualAcrossIframes(contentArray[contentIndex], anchorLocation.node)
  )
    throw new Error(
      `Found unexpected node at anchor location, expected:${JSON.stringify(anchorLocation.node)}, actual:${JSON.stringify(contentArray[contentIndex])}`,
    );

  // Now insert the anchor
  const anchorNode = { type: 'ms', marker: anchorMarker, [idType]: anchorId };
  const currentContent = contentArray[contentIndex];
  // If it's an end anchor and the comment didn't specify where it goes, pick a place
  if (!anchorLocation.node && startOrEnd === 'end' && typeof currentContent !== 'string') {
    let potentialIndex = contentIndex;
    while (potentialIndex < contentArray.length) {
      const potentialContent = contentArray[potentialIndex];
      if (typeof potentialContent === 'string') break;
      if (potentialContent.type === VERSE_TYPE || potentialContent.type === CHAPTER_TYPE) {
        if (potentialIndex + 1 < contentArray.length) potentialIndex += 1;
        break;
      }
      potentialIndex += 1;
    }
    contentArray.splice(potentialIndex, 0, anchorNode);
  }
  // Insert the anchor before anything else in that spot
  else if (anchorLocation.offset === 0) {
    contentArray.splice(contentIndex, 0, anchorNode);
  } else {
    if (typeof currentContent !== 'string')
      throw new Error(`Inserting anchor at offset ${anchorLocation.offset} where no string exists`);
    if (anchorLocation.offset > currentContent.length - 1)
      throw new Error(`Node was too short for offset ${anchorLocation.offset}: ${currentContent}`);
    // Break up the existing string and put the anchor between the two parts
    const firstPart = currentContent.substring(0, anchorLocation.offset);
    const secondPart = currentContent.substring(anchorLocation.offset);
    contentArray.splice(contentIndex, 1, firstPart, anchorNode, secondPart);
  }
  usjDoc.usjChanged();
  return true;
}

function scrollToScrRef(scrRef: ScriptureReference): HTMLElement | undefined {
  const verseElement =
    document.querySelector<HTMLElement>(
      `.editor-container span[data-marker="v"][data-number="${scrRef.verseNum}"]`,
    ) ?? undefined;

  // Scroll if we find the verse or we're at the start of the chapter
  if (verseElement || scrRef.verseNum === 1) {
    // If we're at the first verse, scroll to the top so we can see intro material
    let scrollTop = 0;
    if (verseElement && scrRef.verseNum > 1)
      scrollTop =
        verseElement.getBoundingClientRect().top + window.scrollY - VERSE_NUMBER_SCROLL_OFFSET;

    window.scrollTo({
      top: scrollTop,
      behavior: 'smooth',
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

  // Using react's ref api which uses null, so we must use null
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | MarginalRef | null>(null);
  const [scrRef, setScrRefInternal] = useWebViewScrollGroupScrRef();

  /**
   * Scripture reference we set most recently. Used so we don't scroll on updates to scrRef that
   * come from us
   */
  const internallySetScrRefRef = useRef<ScriptureReference | undefined>(undefined);

  const setScrRef = useCallback(
    (newScrRef: ScriptureReference) => {
      internallySetScrRefRef.current = newScrRef;
      return setScrRefInternal(newScrRef);
    },
    [setScrRefInternal],
  );

  /**
   * Whether we have gotten the Scripture data for the very first time. Used to scroll to the
   * current scrRef on startup
   */
  const hasFirstRetrievedScripture = useRef(false);

  const [usj, setUsjRaw] = useProjectData('platformScripture.USJ_Chapter', projectId).ChapterUSJ(
    useMemo(() => new VerseRef(scrRef.bookNum, scrRef.chapterNum, scrRef.verseNum), [scrRef]),
    usjDocumentDefault,
  );

  const setUsj = useCallback(
    (newUsj: Usj) => {
      if (!setUsjRaw) return;
      const usjDoc = new UsjDocument(newUsj);
      // Remove the milestones that we inserted before writing back to the PDP
      usjDoc.removeContentNodes((node: MarkerContent) => {
        if (typeof node === 'string') return false;
        if (node.type !== 'ms') return false;
        if (node.marker === MILESTONE_START || node.marker === MILESTONE_END) return true;
        return true;
      });
      setUsjRaw(newUsj);
    },
    [setUsjRaw],
  );

  const [legacyComments, setLegacyComments] = useProjectData(
    'legacyCommentManager.comments',
    projectId,
  ).Comments(
    useMemo(() => {
      return { bookId: Canon.bookNumberToId(scrRef.bookNum), chapterNum: scrRef.chapterNum };
    }, [scrRef]),
    [],
  );

  const debouncedSetUsj = useMemo(() => debounce((newUsj: Usj) => setUsj?.(newUsj), 300), [setUsj]);

  // Editor's current usj and comment state
  const editorUsj = useRef(usj);
  const editorLegacyComments = useRef(legacyComments);

  const updateCommentsInUsj = useCallback(
    (newUsj: Usj, newComments: Comments | undefined) => {
      const usjDoc = new UsjDocument(newUsj);
      let usjChanged = false;

      if (
        newUsj &&
        editorRef.current &&
        'setComments' in editorRef.current &&
        editorRef.current.setComments &&
        (!deepEqualAcrossIframes(legacyComments, editorLegacyComments.current) ||
          !deepEqualAcrossIframes(newUsj, editorUsj.current))
      ) {
        editorLegacyComments.current = legacyComments;
        const threads = convertLegacyCommentsToEditorThreads(legacyComments);
        threads.forEach((thread) => {
          try {
            const lc = thread.legacyComment;
            const verseRef: VerseRef = new VerseRef(lc.verseRef);
            // BUG: PT9 comments give offset in USFM space, not verse text space
            let start = usjDoc.verseRefToUsjContentLocation(verseRef, lc.startPosition);
            usjChanged = insertAnchorIfNeeded(usjDoc, 'start', thread.id, start) || usjChanged;

            let indicatedEnd: UsjContentLocation | undefined;
            if (lc.contextAfter) {
              // A new anchor might have changed `start`, so find it again
              if (usjChanged)
                start = usjDoc.verseRefToUsjContentLocation(verseRef, lc.startPosition);

              // BUG: PT9 comments may include markup, so we might not find the end
              indicatedEnd = lc.contextAfter
                ? usjDoc.findNextLocationOfMatchingText(start, lc.contextAfter)
                : undefined;
            }
            // If no end was provided/found, lean on the insertion function to place the end anchor
            const end = indicatedEnd ?? {
              node: '',
              offset: start.offset,
              jsonPath: start.jsonPath,
            };
            usjChanged = insertAnchorIfNeeded(usjDoc, 'end', thread.id, end) || usjChanged;
            // Trying to get more information from the error
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            logger.warn(
              `Error inserting anchors into USJ: ${error}, stack = ${error.stack}, comment = "${JSON.stringify(thread.legacyComment)}"`,
            );
          }
        });
        editorRef.current.setComments(threads);
      }

      if (!newComments || !setLegacyComments) return;
      const newLegacyComments = convertEditorCommentsToLegacyComments(newComments, usjDoc, scrRef);
      if (deepEqualAcrossIframes(newLegacyComments, editorLegacyComments.current)) return;
      editorLegacyComments.current = newLegacyComments;
      setLegacyComments(newLegacyComments);

      if (usjChanged) setUsj?.(newUsj);
    },
    [legacyComments, setLegacyComments, setUsj, scrRef],
  );

  // TODO: remove debounce when issue #826 is done.
  const onUsjChange = useCallback(
    (newUsj: Usj, newComments: Comments | undefined) => {
      // There is a bug where the editor's onChange runs when the state is externally set, so let's
      // not run onChange if the change came externally (our tracked editorUsj.current editor state
      // will already be up-to-date)
      if (
        deepEqualAcrossIframes(newUsj, editorUsj.current) &&
        deepEqualAcrossIframes(newComments, editorLegacyComments.current)
      )
        return;

      updateCommentsInUsj(newUsj, newComments);

      editorUsj.current = newUsj;
      debouncedSetUsj(newUsj);
    },
    [updateCommentsInUsj, debouncedSetUsj],
  );

  // Update the editor if a change comes in
  useEffect(() => {
    // Deep compare the old and current state of the usj to make sure we don't change the editor's
    // state without a need. Note that it already does that internally using a different algorithm,
    // but we need to compare in such a way that the same object across iframes works fine
    if (usj && !deepEqualAcrossIframes(usj, editorUsj.current)) {
      updateCommentsInUsj(usj, undefined);
      editorUsj.current = usj;
      editorRef.current?.setUsj(usj);
    }
  }, [usj, updateCommentsInUsj]);

  // On loading the first time, scroll the selected verse into view
  useEffect(() => {
    if (usj && !hasFirstRetrievedScripture.current) {
      hasFirstRetrievedScripture.current = true;
      // Wait before scrolling to make sure there is time for the editor to load
      // TODO: hook into the editor and detect when it has loaded somehow
      setTimeout(() => scrollToScrRef(scrRef), EDITOR_LOAD_DELAY_TIME);
    }
  }, [usj, scrRef]);

  // Scroll the selected verse into view
  useEffect(() => {
    // If we made this latest scrRef change, don't scroll
    if (
      internallySetScrRefRef.current &&
      internallySetScrRefRef.current.bookNum === scrRef.bookNum &&
      internallySetScrRefRef.current.chapterNum === scrRef.chapterNum &&
      internallySetScrRefRef.current.verseNum === scrRef.verseNum
    ) {
      internallySetScrRefRef.current = undefined;
      return () => {};
    }

    let highlightedVerseElement: HTMLElement | undefined;

    // Wait before scrolling to make sure there is time for the editor to load
    // TODO: hook into the editor and detect when it has loaded somehow
    const scrollTimeout = setTimeout(() => {
      // Scroll to and add a highlight to the current verse element
      highlightedVerseElement = scrollToScrRef(scrRef);
      highlightedVerseElement?.classList.add('highlighted');

      internallySetScrRefRef.current = undefined;
    }, EDITOR_LOAD_DELAY_TIME);

    return () => {
      // Cancel this timeout to scroll if it is running because the scrRef changed and we need to
      // scroll somewhere else
      clearTimeout(scrollTimeout);

      // Remove highlight from the current verse element
      highlightedVerseElement?.classList.remove('highlighted');
    };
  }, [scrRef]);

  const [projectName] = useProjectSetting(projectId, 'platform.name', '');

  const options = useMemo<EditorOptions>(
    () => ({
      isReadonly: isReadOnly,
      hasSpellCheck: false,
      textDirection: projectName === 'OHEBGRK' && Canon.isBookOT(scrRef.bookNum) ? 'rtl' : 'ltr',
    }),
    [isReadOnly, projectName, scrRef],
  );

  return isReadOnly ? (
    <>
      {/* Workaround to pull in platform-bible-react styles into the editor */}
      <Button className="pr-hidden" />
      <Editorial
        ref={editorRef}
        scrRef={scrRef}
        onScrRefChange={setScrRef}
        options={options}
        onUsjChange={undefined}
        logger={logger}
      />
    </>
  ) : (
    <>
      {/* Workaround to pull in platform-bible-react styles into the editor */}
      <Button className="pr-hidden" />
      <Marginal
        ref={editorRef}
        scrRef={scrRef}
        onScrRefChange={setScrRef}
        options={options}
        onUsjChange={onUsjChange}
        logger={logger}
      />
    </>
  );
};
