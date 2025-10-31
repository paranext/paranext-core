import { Comments } from '@eten-tech-foundation/platform-editor';
import { MarkerContent, MarkerObject, Usj } from '@eten-tech-foundation/scripture-utilities';
import {
  CHAPTER_TYPE,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsfmVerseLocation,
  UsjNodeAndDocumentLocation,
  UsjReaderWriter,
  VERSE_TYPE,
  LegacyComment,
} from 'platform-bible-utils';
import { SerializedVerseRef, VerseRef } from '@sillsdev/scripture';
import { logger } from '@papi/frontend';
import { valuesAreDeeplyEqual } from './platform-scripture-editor.utils';

export const MILESTONE_START = 'zmsc-s';
export const MILESTONE_END = 'zmsc-e';

const ID_TYPE_START = 'sid';
const ID_TYPE_END = 'eid';

/** Individual comment that can be read by the editor */
export type EditorComment = {
  author: string;
  content: string;
  deleted: boolean;
  id: string;
  timeStamp: number;
  type: 'comment';
  legacyComment: LegacyComment;
};

/** Comment thread that can be read by the editor */
export type EditorThread = {
  comments: EditorComment[];
  id: string;
  quote: string;
  type: 'thread';
  legacyComment: LegacyComment;
};

/** Convert comments from the data provider to comments that can be read by the editor */
export function convertLegacyCommentsToEditorThreads(
  legacyComments: LegacyComment[],
): EditorThread[] {
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
  usjRW: UsjReaderWriter,
  commentId: string,
  bookId: string,
): { start: UsfmVerseLocation; selectedText: string; contextAfter: string } | undefined {
  const startQuery = `$..content[?(@.type=="ms" && @.marker=="${MILESTONE_START}" && @.sid=="${commentId}")]`;
  const endQuery = `$..content[?(@.type=="ms" && @.marker=="${MILESTONE_END}" && @.eid=="${commentId}")]`;

  const startNode = usjRW.findSingleValue<MarkerObject>(startQuery);
  const endNode = usjRW.findSingleValue<MarkerObject>(endQuery);
  if (!startNode || !endNode) {
    logger.debug(`Start and end nodes are not both present. start:${startNode} end:${endNode}`);
    return undefined;
  }

  const startParent = usjRW.findParent<MarkerObject>(startQuery);
  const endParent = usjRW.findParent<MarkerObject>(endQuery);
  if (!startParent || !endParent)
    throw new Error(
      `Start and end parents are not both present. start:${startParent} end:${endParent}`,
    );

  const start = usjRW.nodeToUsfmVerseLocation(startNode, startParent, bookId);
  if (!start)
    throw new Error(`Could not find SerializedVerseRef for start of comment ${commentId}`);

  const startPoint = {
    node: startNode,
    documentLocation: { offset: 0, jsonPath: usjRW.nodeToJsonPath(startNode) },
  };
  const endPoint = {
    node: endNode,
    documentLocation: { offset: 0, jsonPath: usjRW.nodeToJsonPath(endNode) },
  };

  const selectedText = usjRW.extractTextBetweenPoints(startPoint, endPoint, 20);
  const contextAfter = usjRW.extractText(endPoint, 10);

  return { start, selectedText, contextAfter };
}

/** Convert comments from the editor into comments that can be saved to the legacy data provider */
export function convertEditorCommentsToLegacyComments(
  comments: Comments,
  usjRW: UsjReaderWriter,
  verseLocation: SerializedVerseRef,
): LegacyComment[] {
  const legacyComments: LegacyComment[] = [];
  comments.forEach((editorComment) => {
    const commentDetails = getCommentDetails(usjRW, editorComment.id, verseLocation.book);
    if (!commentDetails) return;
    const startVerseRef = commentDetails.start.verseRef;
    const verseRef = `${startVerseRef.book} ${startVerseRef.chapterNum}:${startVerseRef.verse ?? startVerseRef.verseNum}`;
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
        startPosition: commentDetails.start.offset ?? 0,
        thread: editorComment.id,
        user: editorComment.author,
        verseRef,
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
          startPosition: commentDetails.start.offset ?? 0,
          thread: editorComment.id,
          user: editorThreadComment.author,
          verseRef,
        });
      });
    }
  });
  return legacyComments;
}

function getAnchorLocation(
  usjRW: UsjReaderWriter,
  anchorMarker: typeof MILESTONE_START | typeof MILESTONE_END,
  anchorIdType: typeof ID_TYPE_START | typeof ID_TYPE_END,
  anchorId: string,
): UsjNodeAndDocumentLocation | undefined {
  const jsonPathExpressionForAnchor = `$..content[?(@.type=="ms" && @.marker=="${anchorMarker}" && @.${anchorIdType}=="${anchorId}")]`;
  const node: MarkerObject | undefined = usjRW.findSingleValue(jsonPathExpressionForAnchor);
  if (!node) return undefined;
  return { node, documentLocation: { jsonPath: usjRW.nodeToJsonPath(node) } };
}

function insertAnchorIfNeeded(
  usjRW: UsjReaderWriter,
  startOrEnd: 'start' | 'end',
  anchorId: string,
  anchorLocation: UsjNodeAndDocumentLocation,
): boolean {
  // Make sure it doesn't already exist
  const anchorMarker = startOrEnd === 'start' ? MILESTONE_START : MILESTONE_END;
  const anchorIdType = startOrEnd === 'start' ? ID_TYPE_START : ID_TYPE_END;
  if (getAnchorLocation(usjRW, anchorMarker, anchorIdType, anchorId)) return false;

  // Find the container for the anchor
  const contentArray: MarkerContent[] | undefined = usjRW.findParent(
    anchorLocation.documentLocation.jsonPath,
  );
  if (!Array.isArray(contentArray))
    throw new Error(`Unexpected anchor location parent: ${JSON.stringify(contentArray)}`);

  // Figure out where this is in the content array
  const matches = anchorLocation.documentLocation.jsonPath.match(/content\[(\d+)\]/g);
  if (!matches || matches.length === 0)
    throw new Error(`Unexpected jsonPath query: ${anchorLocation.documentLocation.jsonPath}`);
  const lastNumber = matches[matches.length - 1].match(/(\d+)/);
  const contentIndex = parseInt(lastNumber ? lastNumber[0] : '0', 10);
  if (contentIndex > contentArray.length - 1)
    throw new Error(
      `Index ${contentIndex} longer than content array: ${anchorLocation.documentLocation.jsonPath}`,
    );
  if (anchorLocation.node && !valuesAreDeeplyEqual(contentArray[contentIndex], anchorLocation.node))
    throw new Error(
      `Found unexpected node at anchor location, expected:${JSON.stringify(anchorLocation.node)}, actual:${JSON.stringify(contentArray[contentIndex])}`,
    );

  // Now insert the anchor
  const anchorNode = { type: 'ms', marker: anchorMarker, [anchorIdType]: anchorId };
  const currentContent = contentArray[contentIndex];
  // If it's an end anchor and the comment didn't specify where it goes, pick a place
  if (!anchorLocation.node && startOrEnd === 'end') {
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
  else if (
    !('offset' in anchorLocation.documentLocation) ||
    anchorLocation.documentLocation.offset === 0
  ) {
    contentArray.splice(contentIndex, 0, anchorNode);
  } else {
    if (typeof currentContent !== 'string')
      throw new Error(
        `Inserting anchor at offset ${anchorLocation.documentLocation.offset} where no string exists`,
      );
    if (anchorLocation.documentLocation.offset > currentContent.length - 1)
      throw new Error(
        `Node was too short for offset ${anchorLocation.documentLocation.offset}: ${currentContent}`,
      );
    // Break up the existing string and put the anchor between the two parts
    const firstPart = currentContent.substring(0, anchorLocation.documentLocation.offset);
    const secondPart = currentContent.substring(anchorLocation.documentLocation.offset);
    contentArray.splice(contentIndex, 1, firstPart, anchorNode, secondPart);
  }
  usjRW.usjChanged();
  return true;
}

/**
 * Inserts comment anchors for the given comments into the provided USJ
 *
 * @returns True if some comment anchors were inserted, false if no comment anchors were inserted
 */
export function insertCommentAnchorsIntoUsj(usj: Usj, legacyComments: LegacyComment[]): boolean {
  const usjRW = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_PARATEXT_3_0 });
  let usjChanged = false;

  const threads = convertLegacyCommentsToEditorThreads(legacyComments);
  threads.forEach((thread) => {
    const lc = thread.legacyComment;
    const serializedVerseRef: SerializedVerseRef = new VerseRef(lc.verseRef).toJSON();
    // BUG: PT9 comments give offset in USFM space, not verse text space
    let start = usjRW.usfmLocationToUsjNodeAndDocumentLocation({
      verseRef: serializedVerseRef,
      offset: lc.startPosition,
    });
    const startAnchorInserted = insertAnchorIfNeeded(usjRW, 'start', thread.id, start);
    if (!startAnchorInserted) {
      // If the start anchor is there already, see if the end anchor is there, too
      if (getAnchorLocation(usjRW, MILESTONE_END, ID_TYPE_END, thread.id)) return;
    }
    usjChanged = true;

    // Relocate the start anchor
    const newStart = getAnchorLocation(usjRW, MILESTONE_START, ID_TYPE_START, thread.id);
    if (!newStart) throw new Error('Unable to find start anchor after it was inserted');
    start = newStart;

    // BUG: PT9 comments may include markup, so we might not find the end
    const indicatedEnd: UsjNodeAndDocumentLocation | undefined = lc.contextAfter
      ? usjRW.findNextLocationOfMatchingText(start, lc.contextAfter)
      : undefined;

    // If no end was provided/found, lean on the insertion function to place the end anchor
    const end = indicatedEnd ?? {
      ...start,
      node: '',
    };
    insertAnchorIfNeeded(usjRW, 'end', thread.id, end);
  });

  return usjChanged;
}
