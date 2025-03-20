// This was disabled so class functions that are similar in purpose can be grouped together
/* eslint-disable @typescript-eslint/member-ordering */
import {
  USJ_TYPE,
  type MarkerContent,
  type MarkerObject,
  type Usj,
} from '@biblionexus-foundation/scripture-utilities';
import { SerializedVerseRef, VerseRef } from '@sillsdev/scripture';
import { JSONPath } from 'jsonpath-plus';
import {
  CHAPTER_TYPE,
  ContentJsonPath,
  IUsjReaderWriter,
  UsjContentLocation,
  VERSE_TYPE,
  VerseRefOffset,
} from './usj-reader-writer.model';

const NODE_TYPES_NOT_CONTAINING_VERSE_TEXT = ['figure', 'note', 'sidebar', 'table'];
Object.freeze(NODE_TYPES_NOT_CONTAINING_VERSE_TEXT);

/** Map of USJ content arrays and objects inside content arrays to the content array owner */
type UsjParentMap = Map<MarkerObject | MarkerContent[], MarkerObject | Usj>;

/**
 * Represents information about where a USJ node resides in the `content` array of its parent.
 * `parent` is a reference to the node's parent, and `index` represents the numeric index inside of
 * `parent`'s content array.
 */
type StackItem = { parent: MarkerObject | Usj; index: number };

/**
 * Stack of levels inside a USJ tree relative to a specific node. The top of the stack should always
 * be the root Usj object.
 */
type WorkingStack = StackItem[];

/**
 * Chapter and verse numbers along with the node within a USJ object that represents the start of
 * that chapter + verse
 */
type ChapterVerseNode = {
  chapterNum: number | undefined;
  verseNum: number | undefined;
  /**
   * All text following this node belongs to the given chapter and verse until another chapter or
   * verse node is found
   */
  startingContentNode: MarkerObject | undefined;
};

/** Represents USJ formatted scripture with helpful utilities for working with it */
export default class UsjReaderWriter implements IUsjReaderWriter {
  private readonly usj: Usj;
  private parentMapInternal: UsjParentMap | undefined;

  constructor(usj: Usj) {
    this.usj = usj;
  }

  // If new variables are created to speed up queries, they should be reset here
  usjChanged(): void {
    this.parentMapInternal = undefined;
  }

  // #region Directly using the JSONPath package to perform JSONPath query -> USJ node

  findSingleValue<T>(jsonPathQuery: string): T | undefined {
    const wrappedResults = JSONPath({ path: jsonPathQuery, json: this.usj, wrap: true });
    if (wrappedResults === undefined || wrappedResults.length === 0) return undefined;
    if (!Array.isArray(wrappedResults[0])) return wrappedResults[0];

    // There is no way to tell the difference between a query that returns a single result that is an
    // array and a query that returns multiple results wrapped in an array when `wrap` is false.
    // However, if `wrap` is true then a single result that is an array will be a different array
    // object than the array object within `usj`. So we need to run with `wrap` as true and false to
    // get the original array object back for a query that returns a single array.
    const unwrappedResults = JSONPath({ path: jsonPathQuery, json: this.usj, wrap: false });
    if (unwrappedResults.length === 1 && Array.isArray(unwrappedResults[0]))
      // I have no idea why eslint is mad about casting from `any` to `T`, but it doesn't like it
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return unwrappedResults[0] as T;
    return unwrappedResults;
  }

  findParent<T>(jsonPathQuery: string): T | undefined {
    // Note that "resultType: 'parent'" does not work for queries
    // The "jsonpath-plus" package allows putting a carat at the end of a query to get a parent
    return this.findSingleValue(`${jsonPathQuery}^`);
  }

  private findBookId(): string | undefined {
    return this.findSingleValue('$.content[?(@.type=="book" && @.marker=="id")].code');
  }

  private findChapterNode(chapterNumber: number): MarkerObject | undefined {
    const chapterQuery = `$..content[?(@.type=="chapter" && @.number=="${chapterNumber}")]`;
    return this.findSingleValue(chapterQuery);
  }

  // #endregion

  // #region Parent Maps

  private static createParentMapInternal(
    obj: MarkerObject,
    parent: MarkerObject | Usj,
    parentMap: UsjParentMap,
  ): void {
    parentMap.set(obj, parent);
    // USJ queries may return pointers to content arrays, not just objects
    if (obj.content) parentMap.set(obj.content, obj);
    obj.content?.forEach((child) => {
      if (typeof child === 'object') UsjReaderWriter.createParentMapInternal(child, obj, parentMap);
    });
  }

  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  private createUsjParentMap(): UsjParentMap {
    const parentMap = new Map<MarkerObject | MarkerContent[], MarkerObject | Usj>();
    if (this.usj.content) parentMap.set(this.usj.content, this.usj);
    this.usj.content.forEach((content) => {
      if (typeof content === 'object')
        UsjReaderWriter.createParentMapInternal(content, this.usj, parentMap);
    });
    return parentMap;
  }

  /** Create the parent map if it doesn't already exist and return it */
  private get parentMap(): UsjParentMap {
    if (this.parentMapInternal) return this.parentMapInternal;
    this.parentMapInternal = this.createUsjParentMap();
    return this.parentMapInternal;
  }

  // #endregion

  // #region Working Stacks

  /** Return the working stack applicable to the given node */
  private createWorkingStack(node: MarkerObject): WorkingStack {
    // Represents levels in the USJ node tree that are above the current node (i.e., ancestors)
    // Levels in the tree are represented as a stack, so the last item in the stack is node's parent
    const workingStack: WorkingStack = [];

    // Grab a reference so we don't keep checking if it exists
    const { parentMap } = this;

    // `node` might be in the middle of the USJ tree, so build up the stack before walking the tree
    let tempNode: MarkerObject | Usj = node;
    let tempParent = parentMap.get(tempNode);
    while (tempParent !== undefined) {
      if (!tempParent.content)
        throw new Error('Invalid parentMap: all parents should have content');

      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disable-next-line no-loop-func
        !tempParent.content.find((tempChild, index) => {
          if (tempChild !== tempNode) return false;
          if (!tempParent) throw new Error('undefined "tempParent" should not be possible');
          workingStack.unshift({ parent: tempParent, index });
          return true;
        })
      )
        throw new Error(`Unable to find correct parent node of ${JSON.stringify(tempNode)}`);

      if (tempParent.type === USJ_TYPE) break;
      tempNode = tempParent;
      // TS doesn't understand that only Usj objects have type == USJ_TYPE
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      tempParent = parentMap.get(tempParent as MarkerObject);
    }

    return workingStack;
  }

  private static convertWorkingStackToJsonPath(stack: WorkingStack): ContentJsonPath {
    let jsonPath = '$';
    stack.forEach((stackLevel) => {
      jsonPath = `${jsonPath}.content[${stackLevel.index}]`;
    });
    // The JSONPath string construction above conforms to the ContentJsonPath type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return jsonPath as ContentJsonPath;
  }

  private convertJsonPathToWorkingStack(jsonPath: ContentJsonPath): WorkingStack {
    const retVal: WorkingStack = [];

    const levels = jsonPath.match(/content\[(\d+)\]/g);
    if (!levels) throw new Error(`Malformed or unexpected jsonPath: ${jsonPath}`);

    let onNode: Usj | MarkerObject = this.usj;

    levels.forEach((level, onLevel) => {
      const indexString = /(\d+)/.exec(level);
      if (!indexString) throw new Error(`Malformed or unexpected jsonPath: ${jsonPath}`);
      const index = parseInt(indexString[0], 10);
      retVal.push({ parent: onNode, index });
      if (onLevel + 1 < levels.length) {
        if (typeof onNode === 'string' || !onNode.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(onNode)}`);
        const nextNode = onNode.content[index];
        if (typeof nextNode === 'string')
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(nextNode)}`);
        onNode = nextNode;
      }
    });

    return retVal;
  }

  // #endregion

  // #region Walk the node tree

  /**
   * Given the starting point of a tree to consider (`node`), find the rightmost MarkerObject from
   * the array of `content`. In the following example, this would be "J".
   *
   *         A        <- Consider "A" to be `node`
   *     / / | \ \
   *     B C D E F    <- Consider these to be MarkerObjects inside the `content` array owned by "A"
   *     |  / \  |
   *     G H   I J    <- Consider these to be MarkerObjects inside their parents `content` arrays
   *
   * If "F" did not exist in this example, then "E" would be returned. If "E" and "F" didn't exist,
   * then "I" would be returned.
   *
   * The general idea here is that we are looking for the MarkerObject in Usj that is immediately
   * adjacent to whatever `node`'s next sibling is in `parent`'s `content` array.
   */
  private static findRightMostDescendantMarkerObject(
    node: MarkerObject,
    parent: MarkerObject | Usj,
    skipTypes: string[] = [],
  ): { node: MarkerObject; parent: MarkerObject | Usj } {
    // There are no descendants, so this is as deep as it goes
    if (!node.content) return { node, parent };

    for (let index = node.content.length - 1; index >= 0; index--) {
      const candidate = node.content[index];
      if (typeof candidate === 'object' && !skipTypes.includes(candidate.type)) {
        if (candidate.content)
          return this.findRightMostDescendantMarkerObject(candidate, node, skipTypes);
        return { node: candidate, parent: node };
      }
    }

    // All descendants were strings which aren't MarkerObjects
    return { node, parent };
  }

  private static findNextMatchingNodeUsingWorkingStack(
    node: MarkerContent,
    workingStack: WorkingStack,
    skipTypes: string[],
    searchFunction: (potentiallyMatchingNode: MarkerContent, workingStack: WorkingStack) => boolean,
  ): MarkerContent | undefined {
    // Walk the nodes in a depth-first, left-to-right manner until the search function returns true
    let nextNode: MarkerContent | undefined = node;
    while (nextNode !== undefined) {
      const skipNextNode = typeof nextNode === 'object' && skipTypes.includes(nextNode.type);

      // If we found the node we're looking for, we're done
      if (!skipNextNode && searchFunction(nextNode, workingStack)) return nextNode;

      // Look at the node's children
      if (!skipNextNode && typeof nextNode === 'object' && (nextNode.content?.length ?? 0) > 0) {
        workingStack.push({ parent: nextNode, index: 0 });
        // Same as `nextNode = nextNode.content[0];` without triggering 2 different eslint errors
        [nextNode] = nextNode.content;
      }
      // The node has no children, so look at the next sibling, or the parent's next sibling, etc. up the stack
      else {
        nextNode = undefined;
        while (workingStack.length > 0) {
          const nextLevel = workingStack.pop();
          // We know that `content` exists due to its presence in this data structure
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          if (nextLevel && nextLevel.index + 1 < nextLevel.parent.content!.length) {
            nextLevel.index += 1;
            workingStack.push(nextLevel);
            // We know that `content` exists due to its presence in this data structure
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            nextNode = nextLevel.parent.content![nextLevel.index];
            break;
          }
        }
      }
    }

    // We've looked everywhere, so there must not be an appropriate node anywhere
    return undefined;
  }

  /**
   * Walk through a USJ node tree depth-first, left-to-right to find the first node that matches
   * criteria specified by `searchFunction` (i.e., the first node where `searchFunction` returns
   * `true`)
   */
  private findNextMatchingNode(
    node: MarkerObject,
    skipTypes: string[],
    searchFunction: (potentiallyMatchingNode: MarkerContent, workingStack: WorkingStack) => boolean,
  ): MarkerContent | undefined {
    // Represents levels in the USJ node tree that are above the current node (i.e., ancestors)
    // Levels in the tree are represented as a stack, so the last item is the current node's parent
    const workingStack = this.createWorkingStack(node);

    return UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      node,
      workingStack,
      skipTypes,
      searchFunction,
    );
  }

  // #endregion

  // #region Node -> JSONPath

  nodeToJsonPath(node: MarkerObject): ContentJsonPath {
    return UsjReaderWriter.convertWorkingStackToJsonPath(this.createWorkingStack(node));
  }

  // #endregion

  // #region USJ + node -> VerseRef + offset

  /** Find the chapter and verse that apply to a given USJ node */
  private findVerseRefForNode(
    node: MarkerContent,
    nodeParent: MarkerObject | Usj,
    retVal: ChapterVerseNode = {
      chapterNum: undefined,
      verseNum: undefined,
      startingContentNode: undefined,
    },
  ): ChapterVerseNode {
    // If we already have the data, we're done
    if (retVal.verseNum !== undefined && retVal.chapterNum !== undefined) return retVal;

    // See if this node gives us the data
    if (typeof node === 'object' && node.number !== undefined) {
      const nodeNumber = Number.parseInt(node.number, 10);
      if (node.type === CHAPTER_TYPE) {
        retVal.chapterNum = nodeNumber;
        retVal.verseNum = retVal.verseNum ?? 0;
        retVal.startingContentNode = retVal.startingContentNode ?? node;
        return retVal;
      }
      if (node.type === VERSE_TYPE && !retVal.verseNum) {
        retVal.verseNum = nodeNumber;
        retVal.startingContentNode = node;
      }
    }

    // Prepare to look for siblings of this node in the parent
    if (!nodeParent.content)
      throw new Error(`"content" array not found: ${JSON.stringify(nodeParent)}`);

    // Find the position of this node in the parent's content
    let nodeIndex = 0;
    for (let index = 0; index < nodeParent.content.length; index++) {
      if (nodeParent.content[index] === node) {
        nodeIndex = index;
        break;
      }
    }

    // Find the first, previous sibling of this node that is an object
    let previousNodeIndex = nodeIndex - 1;
    while (previousNodeIndex >= 0 && typeof nodeParent.content[previousNodeIndex] !== 'object')
      previousNodeIndex -= 1;

    // There are no more siblings to inspect from this parent, so walk up a level
    if (previousNodeIndex < 0) {
      // We can't walk up a level if we're at the top level Usj node, so we're done
      if (nodeParent.type === USJ_TYPE) {
        if (retVal.chapterNum === undefined) {
          retVal.chapterNum = 1;
          retVal.verseNum = 0;
          retVal.startingContentNode = undefined;
        }
        return retVal;
      }

      // TS doesn't understand that only Usj objects have type == USJ_TYPE
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const nodeParentMarkerObject = nodeParent as MarkerObject;

      const grandparent = this.parentMap.get(nodeParentMarkerObject);
      if (!grandparent) throw new Error(`No parent found for ${JSON.stringify(nodeParent)}`);
      return this.findVerseRefForNode(nodeParentMarkerObject, grandparent, retVal);
    }

    // Walk down the sibling's children as far as we can
    // This is a MarkerObject based on the while loop a few lines above
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const previousNode = nodeParent.content[previousNodeIndex] as MarkerObject;
    const descendant = UsjReaderWriter.findRightMostDescendantMarkerObject(
      previousNode,
      nodeParent,
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
    );
    return this.findVerseRefForNode(descendant.node, descendant.parent, retVal);
  }

  nodeToVerseRefAndOffset(
    bookId: string,
    node: MarkerContent,
    nodeParent: MarkerObject | MarkerContent[] | undefined,
  ): { verseRef: VerseRef; offset: number } | undefined {
    if (typeof node === 'string' && nodeParent === undefined)
      throw new Error(`If "node" is a string, then "nodeParent" cannot be undefined`);

    let realParent: MarkerObject | Usj | undefined;
    // "node" cannot be a string if "nodeParent" is undefined
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    if (nodeParent === undefined) realParent = this.parentMap.get(node as MarkerObject);
    else realParent = Array.isArray(nodeParent) ? this.parentMap.get(nodeParent) : nodeParent;
    if (realParent === undefined)
      throw new Error(`Cannot find parent for ${JSON.stringify(nodeParent)}`);

    const chapterVerseContent = this.findVerseRefForNode(node, realParent);
    if (!chapterVerseContent) return undefined;

    if (!chapterVerseContent.chapterNum)
      throw new Error(`Could not determine chapter number for ${JSON.stringify(node)}`);

    const verseRef = new VerseRef(
      bookId,
      chapterVerseContent.chapterNum.toString(),
      chapterVerseContent.verseNum ? chapterVerseContent.verseNum.toString() : '0',
    );

    let offset = 0;
    // Walk forward through the USJ nodes until `node` is found, incrementing `offset` along the way
    if (chapterVerseContent.startingContentNode !== undefined) {
      this.findNextMatchingNode(chapterVerseContent.startingContentNode, [], (n, stack) => {
        if (n === node) return true;
        if (stack.find((level) => NODE_TYPES_NOT_CONTAINING_VERSE_TEXT.includes(level.parent.type)))
          return false;
        if (typeof n === 'string') {
          offset += n.length;
          return false;
        }
        if (
          (n.type === CHAPTER_TYPE && n.number !== chapterVerseContent.chapterNum?.toString()) ||
          (n.type === VERSE_TYPE && n.number !== chapterVerseContent.verseNum?.toString())
        ) {
          offset = 0;
          return true;
        }
        return false;
      });
    }

    return { verseRef, offset };
  }

  // #endregion

  // #region JSONPath -> VerseRef + offset

  jsonPathToVerseRefAndOffset(jsonPathQuery: string, bookId?: string): VerseRefOffset {
    const effectiveBookId = bookId ?? this.findBookId();
    if (!effectiveBookId) throw new Error('Not able to determine the book ID');

    const target: MarkerContent | undefined = this.findSingleValue(jsonPathQuery);
    if (!target) throw new Error(`No result found for JSONPath query: ${jsonPathQuery}`);

    const parent: MarkerObject | MarkerContent[] | undefined = this.findParent(jsonPathQuery);
    if (!parent) throw new Error(`Could not determine parent for ${jsonPathQuery}`);

    const verseRefAndOffset = this.nodeToVerseRefAndOffset(effectiveBookId, target, parent);
    if (!verseRefAndOffset)
      throw new Error(`Could not determine VerseRef that corresponds to ${jsonPathQuery}`);

    return verseRefAndOffset;
  }

  // #endregion

  // #region VerseRef + offset -> Node + JSONPath + offset

  verseRefToUsjContentLocation(
    verseRef: SerializedVerseRef,
    verseRefOffset: number = 0,
  ): UsjContentLocation {
    if (verseRefOffset < 0) throw new Error('offset must be >= 0');

    // Prefer getting the book ID from the USJ itself, but it might not be available
    const bookId = this.findBookId() ?? verseRef.book;
    if (!bookId) throw new Error('Not able to determine the book ID');
    if (bookId !== verseRef.book)
      throw new Error(`Book IDs don't match: USJ=${bookId}, VerseRef=${verseRef.book}`);

    const chapterNode = this.findChapterNode(verseRef.chapterNum);
    if (chapterNode === undefined)
      throw new Error(`Could not find ${bookId} chapter ${verseRef.chapterNum}`);

    let foundAnotherChapter = false;
    let jsonPath: ContentJsonPath = '';
    const expectedVerse = verseRef.verse;
    const verseNode: MarkerContent | undefined = this.findNextMatchingNode(
      chapterNode,
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
      (node, workingStack) => {
        if (node === chapterNode) {
          if (verseRef.verseNum === 0) {
            jsonPath = UsjReaderWriter.convertWorkingStackToJsonPath(workingStack);
            return true;
          }
          return false;
        }
        if (typeof node !== 'object') return false;
        if (node.type === CHAPTER_TYPE) {
          foundAnotherChapter = true;
          return true;
        }
        if (
          node.type === VERSE_TYPE &&
          node.number !== undefined &&
          node.number === expectedVerse
        ) {
          jsonPath = UsjReaderWriter.convertWorkingStackToJsonPath(workingStack);
          return true;
        }
        return false;
      },
    );

    if (foundAnotherChapter || verseNode === undefined || typeof verseNode === 'string')
      throw new Error(`Verse ${expectedVerse} not found in ${bookId} ${verseRef.chapterNum}`);

    if (verseRefOffset === 0) return { node: verseNode, offset: 0, jsonPath };

    let cumulativeVerseLengthSeen = 0;
    let usjNodeOffset = 0;
    let foundNode: MarkerContent | undefined;
    this.findNextMatchingNode(
      verseNode,
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
      (node, workingStack) => {
        if (node === verseNode) return false;
        if (typeof node === 'string') {
          cumulativeVerseLengthSeen += node.length;
          if (cumulativeVerseLengthSeen > verseRefOffset) {
            jsonPath = UsjReaderWriter.convertWorkingStackToJsonPath(workingStack);
            usjNodeOffset = verseRefOffset - cumulativeVerseLengthSeen + node.length;
            foundNode = node;
            return true;
          }
        }
        // If we found another verse or chapter, then the offset was larger than the verse length
        // Just return the original verse node in that case
        else if (node.type === CHAPTER_TYPE || node.type === VERSE_TYPE) return true;
        return false;
      },
    );

    return { node: foundNode ?? verseNode, offset: usjNodeOffset, jsonPath };
  }

  // #endregion

  // #region Search for text from a node + JSONPath + offset

  findNextLocationOfMatchingText(
    startingPoint: UsjContentLocation,
    text: string,
    maxTextLengthToSearch: number = 1000,
  ): UsjContentLocation | undefined {
    let textScanned = '';
    let lengthScanned = 0;
    let lengthTrimmed = 0;
    let foundStartingAtOffset = 0;
    UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      startingPoint.node,
      this.convertJsonPathToWorkingStack(startingPoint.jsonPath),
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
      (node) => {
        if (typeof node !== 'string') return false;

        lengthScanned += node.length;
        textScanned = `${textScanned}${node}`;
        const textIndex = textScanned.indexOf(text);
        if (textIndex < 0) {
          // Keep the string we're keeping around from going too large
          lengthTrimmed += textScanned.length;
          if (textScanned.length > text.length)
            textScanned = textScanned.substring(textScanned.length - text.length);
          lengthTrimmed -= textScanned.length;

          // Stop looking if we haven't found it after scanning a lot of text
          return lengthScanned > maxTextLengthToSearch;
        }

        // We found it!
        foundStartingAtOffset = lengthTrimmed + textIndex;
        return true;
      },
    );

    // We never found what we wanted
    if (foundStartingAtOffset <= 0) return undefined;

    // The text might have been split between nodes, so we have to go through it one more time
    lengthScanned = 0;
    let finalOffset = 0;
    let finalStack: WorkingStack = [];
    const finalNode = UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      startingPoint.node,
      this.convertJsonPathToWorkingStack(startingPoint.jsonPath),
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
      (node, stack) => {
        if (typeof node !== 'string') return false;

        lengthScanned += node.length;
        if (lengthScanned < foundStartingAtOffset + 1) return false;

        finalOffset = foundStartingAtOffset - lengthScanned + node.length;
        finalStack = stack;
        return true;
      },
    );
    if (!finalNode) throw new Error('Internal error: inconsistent search results');

    return {
      node: finalNode,
      offset: finalOffset,
      jsonPath: UsjReaderWriter.convertWorkingStackToJsonPath(finalStack),
    };
  }

  // #endregion

  // #region Extract text from a node + JSONPath + offset

  extractText(start: UsjContentLocation, desiredLength: number): string {
    let retVal = '';
    let offsetRemaining = start.offset;
    let lengthRecorded = 0;
    UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      start.node,
      this.convertJsonPathToWorkingStack(start.jsonPath),
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
      (node) => {
        if (typeof node !== 'string') return false;
        if (offsetRemaining >= node.length) {
          offsetRemaining -= node.length;
          return false;
        }
        let remainingNode = node;
        if (offsetRemaining > 0) {
          remainingNode = remainingNode.substring(offsetRemaining);
          offsetRemaining = 0;
        }
        if (lengthRecorded + remainingNode.length < desiredLength) {
          lengthRecorded += remainingNode.length;
          retVal = `${retVal}${remainingNode}`;
          return false;
        }
        const lengthToCopy = desiredLength - lengthRecorded;
        retVal = `${retVal}${remainingNode.substring(0, lengthToCopy - 1)}`;
        return true;
      },
    );
    return retVal;
  }

  extractTextBetweenPoints(
    start: UsjContentLocation,
    end: UsjContentLocation,
    maxLength: number = 100,
  ): string {
    let retVal = '';
    UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      start.node,
      this.convertJsonPathToWorkingStack(start.jsonPath),
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
      (node, currentStack) => {
        // `node` and `end.node` are both `MarkerContent` which might be strings or objects
        if (node === end.node) {
          // If both objects are the same, then we definitely found `end`
          if (typeof node === 'object') return true;

          // If both strings are the same, we need to verify that we're at the same place in `usj`
          if (end.jsonPath === UsjReaderWriter.convertWorkingStackToJsonPath(currentStack))
            return true;
        }
        if (typeof node !== 'string') return false;
        retVal = `${retVal}${node}`;
        if (retVal.length > maxLength) retVal = retVal.substring(0, maxLength);
        return retVal.length >= maxLength;
      },
    );
    return retVal;
  }

  // #endregion

  // #region Edit this USJ data

  private static removeContentNodesFromArray(
    contentArray: MarkerContent[],
    searchFunction: (potentiallyMatchingNode: MarkerContent) => boolean,
  ) {
    let removedCount = 0;
    for (let i = contentArray.length - 1; i >= 0; i--) {
      const node = contentArray[i];
      if (searchFunction(node)) {
        contentArray.splice(i, 1);
        removedCount += 1;
      } else if (typeof node !== 'string' && node.content)
        removedCount += this.removeContentNodesFromArray(node.content, searchFunction);
    }
    return removedCount;
  }

  removeContentNodes(searchFunction: (potentiallyMatchingNode: MarkerContent) => boolean): number {
    const retVal = UsjReaderWriter.removeContentNodesFromArray(this.usj.content, searchFunction);
    this.usjChanged();
    return retVal;
  }

  // #endregion
}
