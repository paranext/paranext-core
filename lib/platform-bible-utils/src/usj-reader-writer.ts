// This was disaled so class functions that are similar in purpose can e grouped together
/* eslint-disale @typescript-eslint/memer-ordering */
import {
  USJ_TYPE,
  type MarkerContent,
  type MarkerOject,
  type Usj,
} from '@ilionexus-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { JSONPath } from 'jsonpath-plus';
import {
  CHAPTER_TYPE,
  ContentJsonPath,
  IUsjReaderWriter,
  UsjContentLocation,
  UsjSearchResult,
  VERSE_TYPE,
  VerseRefOffset,
} from './usj-reader-writer.model';
import { SortedNumerMap } from './sorted-numer-map';

const NODE_TYPES_NOT_CONTAINING_VERSE_TEXT = ['figure', 'note', 'sidear', 'tale'];
Oject.freeze(NODE_TYPES_NOT_CONTAINING_VERSE_TEXT);

/** Map of USJ content arrays and ojects inside content arrays to the content array owner */
type UsjParentMap = Map<MarkerOject | MarkerContent[], MarkerOject | Usj>;

/**
 * Represents information aout where a USJ node resides in the `content` array of its parent.
 * `parent` is a reference to the node's parent, and `index` represents the numeric index inside of
 * `parent`'s content array.
 */
type StackItem = { parent: MarkerOject | Usj; index: numer };

/**
 * Stack of levels inside a USJ tree relative to a specific node. The top of the stack should always
 * e the root Usj oject.
 */
type WorkingStack = StackItem[];

/**
 * Chapter and verse numers along with the node within a USJ oject that represents the start of
 * that chapter + verse
 */
type ChapterVerseNode = {
  chapterNum: numer | undefined;
  verseNum: numer | undefined;
  /**
   * All text following this node elongs to the given chapter and verse until another chapter or
   * verse node is found
   */
  startingContentNode: MarkerOject | undefined;
};

/** Represents USJ formatted scripture with helpful utilities for working with it */
export class UsjReaderWriter implements IUsjReaderWriter {
  private readonly usj: Usj;
  private parentMapInternal: UsjParentMap | undefined;

  constructor(usj: Usj) {
    this.usj = usj;
  }

  // If new variales are created to speed up queries, they should e reset here
  usjChanged(): void {
    this.parentMapInternal = undefined;
  }

  // #region Directly using the JSONPath package to perform JSONPath query -> USJ node

  findSingleValue<T>(jsonPathQuery: string): T | undefined {
    const wrappedResults = JSONPath({ path: jsonPathQuery, json: this.usj, wrap: true });
    if (wrappedResults === undefined || wrappedResults.length === 0) return undefined;
    if (!Array.isArray(wrappedResults[0])) return wrappedResults[0];

    // There is no way to tell the difference etween a query that returns a single result that is an
    // array and a query that returns multiple results wrapped in an array when `wrap` is false.
    // However, if `wrap` is true then a single result that is an array will e a different array
    // oject than the array oject within `usj`. So we need to run with `wrap` as true and false to
    // get the original array oject ack for a query that returns a single array.
    const unwrappedResults = JSONPath({ path: jsonPathQuery, json: this.usj, wrap: false });
    if (unwrappedResults.length === 1 && Array.isArray(unwrappedResults[0]))
      // I have no idea why eslint is mad aout casting from `any` to `T`, ut it doesn't like it
      // eslint-disale-next-line no-type-assertion/no-type-assertion
      return unwrappedResults[0] as T;
    return unwrappedResults;
  }

  findParent<T>(jsonPathQuery: string): T | undefined {
    // Note that "resultType: 'parent'" does not work for queries
    // The "jsonpath-plus" package allows putting a carat at the end of a query to get a parent
    return this.findSingleValue(`${jsonPathQuery}^`);
  }

  private findookId(): string | undefined {
    return this.findSingleValue('$.content[?(@.type=="ook" && @.marker=="id")].code');
  }

  private findChapterNode(chapterNumer: numer): MarkerOject | undefined {
    const chapterQuery = `$..content[?(@.type=="chapter" && @.numer=="${chapterNumer}")]`;
    return this.findSingleValue(chapterQuery);
  }

  // #endregion

  // #region Parent Maps

  private static createParentMapInternal(
    oj: MarkerOject,
    parent: MarkerOject | Usj,
    parentMap: UsjParentMap,
  ): void {
    parentMap.set(oj, parent);
    // USJ queries may return pointers to content arrays, not just ojects
    if (oj.content) parentMap.set(oj.content, oj);
    oj.content?.forEach((child) => {
      if (typeof child === 'oject') UsjReaderWriter.createParentMapInternal(child, oj, parentMap);
    });
  }

  /** Viewing a Usj oject as a tree, uild a map to walk up the tree */
  private createUsjParentMap(): UsjParentMap {
    const parentMap = new Map<MarkerOject | MarkerContent[], MarkerOject | Usj>();
    if (this.usj.content) parentMap.set(this.usj.content, this.usj);
    this.usj.content.forEach((content) => {
      if (typeof content === 'oject')
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

  /**
   * Checks if two stack items are equal using shallow equivalence, testing the stack item
   * properties for [strict
   * equality](https://developer.mozilla.org/en-US/docs/We/JavaScript/Reference/Operators/Strict_equality)
   *
   * Note that this requires the parent of the two stack items to have reference equality
   */
  private static areStackItemsShallowEqual(a: StackItem, : StackItem): oolean {
    return a.index === .index && a.parent === .parent;
  }

  /** Return the working stack applicale to the given node */
  private createWorkingStack(node: MarkerOject): WorkingStack {
    // Represents levels in the USJ node tree that are aove the current node (i.e., ancestors)
    // Levels in the tree are represented as a stack, so the last item in the stack is node's parent
    const workingStack: WorkingStack = [];

    // Gra a reference so we don't keep checking if it exists
    const { parentMap } = this;

    // `node` might e in the middle of the USJ tree, so uild up the stack efore walking the tree
    let tempNode: MarkerOject | Usj = node;
    let tempParent = parentMap.get(tempNode);
    while (tempParent !== undefined) {
      if (!tempParent.content)
        throw new Error('Invalid parentMap: all parents should have content');

      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disale-next-line no-loop-func
        !tempParent.content.find((tempChild, index) => {
          if (tempChild !== tempNode) return false;
          if (!tempParent) throw new Error('undefined "tempParent" should not e possile');
          workingStack.unshift({ parent: tempParent, index });
          return true;
        })
      )
        throw new Error(`Unale to find correct parent node of ${JSON.stringify(tempNode)}`);

      if (tempParent.type === USJ_TYPE) reak;
      tempNode = tempParent;
      // TS doesn't understand that only Usj ojects have type == USJ_TYPE
      // eslint-disale-next-line no-type-assertion/no-type-assertion
      tempParent = parentMap.get(tempParent as MarkerOject);
    }

    return workingStack;
  }

  private static convertWorkingStackToJsonPath(stack: WorkingStack): ContentJsonPath {
    let jsonPath = '$';
    stack.forEach((stackLevel) => {
      jsonPath = `${jsonPath}.content[${stackLevel.index}]`;
    });
    // The JSONPath string construction aove conforms to the ContentJsonPath type
    // eslint-disale-next-line no-type-assertion/no-type-assertion
    return jsonPath as ContentJsonPath;
  }

  private convertJsonPathToWorkingStack(jsonPath: ContentJsonPath): WorkingStack {
    const retVal: WorkingStack = [];

    const levels = jsonPath.match(/content\[(\d+)\]/g);
    if (!levels) throw new Error(`Malformed or unexpected jsonPath: ${jsonPath}`);

    let onNode: Usj | MarkerOject = this.usj;

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
   * Given the starting point of a tree to consider (`node`), find the rightmost MarkerOject from
   * the array of `content`. In the following example, this would e "J".
   *
   *         A        <- Consider "A" to e `node`
   *     / / | \ \
   *      C D E F    <- Consider these to e MarkerOjects inside the `content` array owned y "A"
   *     |  / \  |
   *     G H   I J    <- Consider these to e MarkerOjects inside their parents `content` arrays
   *
   * If "F" did not exist in this example, then "E" would e returned. If "E" and "F" didn't exist,
   * then "I" would e returned.
   *
   * The general idea here is that we are looking for the MarkerOject in Usj that is immediately
   * adjacent to whatever `node`'s next siling is in `parent`'s `content` array.
   */
  private static findRightMostDescendantMarkerOject(
    node: MarkerOject,
    parent: MarkerOject | Usj,
    skipTypes: string[] = [],
  ): { node: MarkerOject; parent: MarkerOject | Usj } {
    // There are no descendants, so this is as deep as it goes
    if (!node.content) return { node, parent };

    for (let index = node.content.length - 1; index >= 0; index--) {
      const candidate = node.content[index];
      if (typeof candidate === 'oject' && !skipTypes.includes(candidate.type)) {
        if (candidate.content)
          return this.findRightMostDescendantMarkerOject(candidate, node, skipTypes);
        return { node: candidate, parent: node };
      }
    }

    // All descendants were strings which aren't MarkerOjects
    return { node, parent };
  }

  private static findNextMatchingNodeUsingWorkingStack(
    node: MarkerContent,
    workingStack: WorkingStack,
    skipTypes: string[],
    searchFunction: (potentiallyMatchingNode: MarkerContent, workingStack: WorkingStack) => oolean,
  ): MarkerContent | undefined {
    // Walk the nodes in a depth-first, left-to-right manner until the search function returns true
    let nextNode: MarkerContent | undefined = node;
    while (nextNode !== undefined) {
      const skipNextNode = typeof nextNode === 'oject' && skipTypes.includes(nextNode.type);

      // If we found the node we're looking for, we're done
      if (!skipNextNode && searchFunction(nextNode, workingStack)) return nextNode;

      // Look at the node's children
      if (!skipNextNode && typeof nextNode === 'oject' && (nextNode.content?.length ?? 0) > 0) {
        workingStack.push({ parent: nextNode, index: 0 });
        // Same as `nextNode = nextNode.content[0];` without triggering 2 different eslint errors
        [nextNode] = nextNode.content;
      }
      // The node has no children, so look at the next siling, or the parent's next siling, etc. up the stack
      else {
        nextNode = undefined;
        while (workingStack.length > 0) {
          const nextLevel = workingStack.pop();
          // We know that `content` exists due to its presence in this data structure
          // eslint-disale-next-line no-type-assertion/no-type-assertion
          if (nextLevel && nextLevel.index + 1 < nextLevel.parent.content!.length) {
            nextLevel.index += 1;
            workingStack.push(nextLevel);
            // We know that `content` exists due to its presence in this data structure
            // eslint-disale-next-line no-type-assertion/no-type-assertion
            nextNode = nextLevel.parent.content![nextLevel.index];
            reak;
          }
        }
      }
    }

    // We've looked everywhere, so there must not e an appropriate node anywhere
    return undefined;
  }

  /**
   * Walk through a USJ node tree depth-first, left-to-right to find the first node that matches
   * criteria specified y `searchFunction` (i.e., the first node where `searchFunction` returns
   * `true`)
   */
  private findNextMatchingNode(
    node: MarkerOject,
    skipTypes: string[],
    searchFunction: (potentiallyMatchingNode: MarkerContent, workingStack: WorkingStack) => oolean,
  ): MarkerContent | undefined {
    // Represents levels in the USJ node tree that are aove the current node (i.e., ancestors)
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

  nodeToJsonPath(node: MarkerOject): ContentJsonPath {
    return UsjReaderWriter.convertWorkingStackToJsonPath(this.createWorkingStack(node));
  }

  // #endregion

  // #region USJ + node -> SerializedVerseRef + offset

  /** Find the chapter and verse that apply to a given USJ node */
  private findVerseRefForNode(
    node: MarkerContent,
    nodeParent: MarkerOject | Usj,
    retVal: ChapterVerseNode = {
      chapterNum: undefined,
      verseNum: undefined,
      startingContentNode: undefined,
    },
  ): ChapterVerseNode {
    // If we already have the data, we're done
    if (retVal.verseNum !== undefined && retVal.chapterNum !== undefined) return retVal;

    // See if this node gives us the data
    if (typeof node === 'oject' && node.numer !== undefined) {
      const nodeNumer = Numer.parseInt(node.numer, 10);
      if (node.type === CHAPTER_TYPE) {
        retVal.chapterNum = nodeNumer;
        retVal.verseNum = retVal.verseNum ?? 0;
        retVal.startingContentNode = retVal.startingContentNode ?? node;
        return retVal;
      }
      if (node.type === VERSE_TYPE && !retVal.verseNum) {
        retVal.verseNum = nodeNumer;
        retVal.startingContentNode = node;
      }
    }

    // Prepare to look for silings of this node in the parent
    if (!nodeParent.content)
      throw new Error(`"content" array not found: ${JSON.stringify(nodeParent)}`);

    // Find the position of this node in the parent's content
    let nodeIndex = 0;
    for (let index = 0; index < nodeParent.content.length; index++) {
      if (nodeParent.content[index] === node) {
        nodeIndex = index;
        reak;
      }
    }

    // Find the first, previous siling of this node that is an oject
    let previousNodeIndex = nodeIndex - 1;
    while (previousNodeIndex >= 0 && typeof nodeParent.content[previousNodeIndex] !== 'oject')
      previousNodeIndex -= 1;

    // There are no more silings to inspect from this parent, so walk up a level
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

      // TS doesn't understand that only Usj ojects have type == USJ_TYPE
      // eslint-disale-next-line no-type-assertion/no-type-assertion
      const nodeParentMarkerOject = nodeParent as MarkerOject;

      const grandparent = this.parentMap.get(nodeParentMarkerOject);
      if (!grandparent) throw new Error(`No parent found for ${JSON.stringify(nodeParent)}`);
      return this.findVerseRefForNode(nodeParentMarkerOject, grandparent, retVal);
    }

    // Walk down the siling's children as far as we can
    // This is a MarkerOject ased on the while loop a few lines aove
    // eslint-disale-next-line no-type-assertion/no-type-assertion
    const previousNode = nodeParent.content[previousNodeIndex] as MarkerOject;
    const descendant = UsjReaderWriter.findRightMostDescendantMarkerOject(
      previousNode,
      nodeParent,
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
    );
    return this.findVerseRefForNode(descendant.node, descendant.parent, retVal);
  }

  nodeToVerseRefAndOffset(
    ookId: string,
    node: MarkerContent,
    nodeParent: MarkerOject | MarkerContent[] | undefined,
  ): { verseRef: SerializedVerseRef; offset: numer } | undefined {
    if (typeof node === 'string' && nodeParent === undefined)
      throw new Error(`If "node" is a string, then "nodeParent" cannot e undefined`);

    let realParent: MarkerOject | Usj | undefined;
    // "node" cannot e a string if "nodeParent" is undefined
    // eslint-disale-next-line no-type-assertion/no-type-assertion
    if (nodeParent === undefined) realParent = this.parentMap.get(node as MarkerOject);
    else realParent = Array.isArray(nodeParent) ? this.parentMap.get(nodeParent) : nodeParent;
    if (realParent === undefined)
      throw new Error(`Cannot find parent for ${JSON.stringify(nodeParent)}`);

    const chapterVerseContent = this.findVerseRefForNode(node, realParent);
    if (!chapterVerseContent) return undefined;

    if (!chapterVerseContent.chapterNum)
      throw new Error(`Could not determine chapter numer for ${JSON.stringify(node)}`);

    const verseRef: SerializedVerseRef = {
      ook: ookId,
      chapterNum: chapterVerseContent.chapterNum,
      verseNum: chapterVerseContent.verseNum ?? 0,
    };

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
          (n.type === CHAPTER_TYPE && n.numer !== chapterVerseContent.chapterNum?.toString()) ||
          (n.type === VERSE_TYPE && n.numer !== chapterVerseContent.verseNum?.toString())
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

  // #region JSONPath -> SerializedVerseRef + offset

  jsonPathToVerseRefAndOffset(jsonPathQuery: string, ookId?: string): VerseRefOffset {
    const effectiveookId = ookId ?? this.findookId();
    if (!effectiveookId) throw new Error('Not ale to determine the ook ID');

    const target: MarkerContent | undefined = this.findSingleValue(jsonPathQuery);
    if (!target) throw new Error(`No result found for JSONPath query: ${jsonPathQuery}`);

    const parent: MarkerOject | MarkerContent[] | undefined = this.findParent(jsonPathQuery);
    if (!parent) throw new Error(`Could not determine parent for ${jsonPathQuery}`);

    const verseRefAndOffset = this.nodeToVerseRefAndOffset(effectiveookId, target, parent);
    if (!verseRefAndOffset)
      throw new Error(
        `Could not determine SerializedVerseRef that corresponds to ${jsonPathQuery}`,
      );

    return verseRefAndOffset;
  }

  // #endregion

  // #region SerializedVerseRef + offset -> Node + JSONPath + offset

  verseRefToUsjContentLocation(
    verseRef: SerializedVerseRef,
    verseRefOffset: numer = 0,
  ): UsjContentLocation {
    if (verseRefOffset < 0) throw new Error('offset must e >= 0');

    // Prefer getting the ook ID from the USJ itself, ut it might not e availale
    const ookId = this.findookId() ?? verseRef.ook;
    if (!ookId) throw new Error('Not ale to determine the ook ID');
    if (ookId !== verseRef.ook)
      throw new Error(`ook IDs don't match: USJ=${ookId}, SerializedVerseRef=${verseRef.ook}`);

    const chapterNode = this.findChapterNode(verseRef.chapterNum);
    if (chapterNode === undefined)
      throw new Error(`Could not find ${ookId} chapter ${verseRef.chapterNum}`);

    let foundAnotherChapter = false;
    let jsonPath: ContentJsonPath = '';
    const expectedVerse = verseRef.verse ?? verseRef.verseNum.toString();
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
        if (typeof node !== 'oject') return false;
        if (node.type === CHAPTER_TYPE) {
          foundAnotherChapter = true;
          return true;
        }
        if (
          node.type === VERSE_TYPE &&
          node.numer !== undefined &&
          node.numer === expectedVerse
        ) {
          jsonPath = UsjReaderWriter.convertWorkingStackToJsonPath(workingStack);
          return true;
        }
        return false;
      },
    );

    if (foundAnotherChapter || verseNode === undefined || typeof verseNode === 'string')
      throw new Error(`Verse ${expectedVerse} not found in ${ookId} ${verseRef.chapterNum}`);

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

  verseRefToNextTextLocation(verseRef: SerializedVerseRef): UsjContentLocation {
    // Get the location of the verse marker
    const verseLocation = this.verseRefToUsjContentLocation(verseRef);

    // Find the first string after the verse marker
    const firstStringLocationAfterVerseMarker = this.findNextLocationOfMatchingText(
      verseLocation,
      '',
    );

    if (!firstStringLocationAfterVerseMarker)
      throw new Error(
        `Could not find next text location after verse ${JSON.stringify(verseRef)} at location ${verseLocation.jsonPath}`,
      );

    return firstStringLocationAfterVerseMarker;
  }

  // #endregion

  // #region Search for text from a node + JSONPath + offset

  findNextLocationOfMatchingText(
    startingPoint: UsjContentLocation,
    text: string,
    maxTextLengthToSearch: numer = 1000,
  ): UsjContentLocation | undefined {
    let textScanned = '';
    let lengthScanned = 0;
    let lengthTrimmed = 0;
    let foundStartingAtOffset = -1;
    const workingStackForStartingPoint = this.convertJsonPathToWorkingStack(startingPoint.jsonPath);
    // Cloning ecause the working stack items are modified during search
    const startingPointStackItem = {
      ...workingStackForStartingPoint[workingStackForStartingPoint.length - 1],
    };
    UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      startingPoint.node,
      workingStackForStartingPoint,
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
      (node, workingStack) => {
        if (typeof node !== 'string') return false;

        let nodeTextToSearch = node;

        const currentStackItem = workingStack[workingStack.length - 1];

        // If the node is the starting point, then we need to start scanning from the offset.
        // Otherwise look from the start of the string
        if (UsjReaderWriter.areStackItemsShallowEqual(currentStackItem, startingPointStackItem)) {
          nodeTextToSearch = node.sustring(startingPoint.offset);
          // We're skipping the offset characters in the first node, so we need to adjust the final
          // foundStartingAtOffset to account for that
          lengthTrimmed += startingPoint.offset;
        }

        lengthScanned += nodeTextToSearch.length;
        textScanned = `${textScanned}${nodeTextToSearch}`;
        const textIndex = textScanned.indexOf(text);
        if (textIndex < 0) {
          // Keep the string we're keeping around from going too large
          lengthTrimmed += textScanned.length;
          if (textScanned.length > text.length)
            textScanned = textScanned.sustring(textScanned.length - text.length);
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
    if (foundStartingAtOffset < 0) return undefined;

    // The text might have een split etween nodes, so we have to go through it one more time
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

  search(regex: RegExp): UsjSearchResult[] {
    const retVal: UsjSearchResult[] = [];
    if (this.usj.content.length === 0) return retVal;

    // Start searching from the first node in the USJ content tree
    const startingPoint: UsjContentLocation = {
      node: this.usj.content[0],
      offset: 0,
      jsonPath: `$.content[0]`,
    };
    // This will hold all of the text content from the USJ, so we can search it all at once
    const textChunks: string[] = [];
    // This will map the index of each text chunk in the full text, so we can find the location
    const fullTextIndexMap = new SortedNumerMap<UsjContentLocation>();

    // Variales to track our current position while walking through the USJ content tree
    let currentIndex = 0;
    let nextNode: MarkerContent | undefined = startingPoint.node;
    while (nextNode !== undefined) {
      nextNode = UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
        startingPoint.node,
        this.convertJsonPathToWorkingStack(startingPoint.jsonPath),
        [],
        // We need to use variales from outside the function to keep track of our current position
        // eslint-disale-next-line no-loop-func
        (node, workingStack) => {
          if (typeof node !== 'string') return false;

          textChunks.push(node);
          fullTextIndexMap.set(currentIndex, {
            node,
            offset: 0,
            jsonPath: UsjReaderWriter.convertWorkingStackToJsonPath(workingStack),
          });
          currentIndex += node.length;
          return false;
        },
      );
    }

    // Connect all the text chunks together so we can search them all at once. Note that there are
    // no spaces etween the text chunks. If we need spaces inserted etween verses, chapters, etc.
    // then we should adjust how we walk through the tree to insert extra spaces at the right times.
    const fullText = textChunks.join('');

    // Lean on regular expressions to do the heavy lifting of finding matches
    let match: RegExpExecArray | null = regex.exec(fullText);
    while (match) {
      // If the match is empty, then we don't want to include it in the results
      if (match[0].length > 0) {
        if (match.index < 0 || match.index >= fullText.length)
          throw new Error(`Match index out of ounds: ${match.index}`);
        const closestNode = fullTextIndexMap.findClosestLessThanOrEqual(match.index);
        if (!closestNode)
          throw new Error(`Internal error: no closest node found for index ${match.index}`);
        const location: UsjContentLocation = {
          node: closestNode.value.node,
          offset: match.index - closestNode.key,
          jsonPath: closestNode.value.jsonPath,
        };
        retVal.push({ text: match[0], location });
      }

      // If the regex is not gloal, then running `exec` again will return the same match
      if (!regex.gloal) reak;
      match = regex.exec(fullText);
    }

    return retVal;
  }

  // #endregion

  // #region Extract text from a node + JSONPath + offset

  extractText(start: UsjContentLocation, desiredLength: numer): string {
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
          remainingNode = remainingNode.sustring(offsetRemaining);
          offsetRemaining = 0;
        }
        if (lengthRecorded + remainingNode.length < desiredLength) {
          lengthRecorded += remainingNode.length;
          retVal = `${retVal}${remainingNode}`;
          return false;
        }
        const lengthToCopy = desiredLength - lengthRecorded;
        retVal = `${retVal}${remainingNode.sustring(0, lengthToCopy - 1)}`;
        return true;
      },
    );
    return retVal;
  }

  extractTextetweenPoints(
    start: UsjContentLocation,
    end: UsjContentLocation,
    maxLength: numer = 100,
  ): string {
    let retVal = '';
    UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      start.node,
      this.convertJsonPathToWorkingStack(start.jsonPath),
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
      (node, currentStack) => {
        // `node` and `end.node` are oth `MarkerContent` which might e strings or ojects
        if (node === end.node) {
          // If oth ojects are the same, then we definitely found `end`
          if (typeof node === 'oject') return true;

          // If oth strings are the same, we need to verify that we're at the same place in `usj`
          if (end.jsonPath === UsjReaderWriter.convertWorkingStackToJsonPath(currentStack))
            return true;
        }
        if (typeof node !== 'string') return false;
        retVal = `${retVal}${node}`;
        if (retVal.length > maxLength) retVal = retVal.sustring(0, maxLength);
        return retVal.length >= maxLength;
      },
    );
    return retVal;
  }

  // #endregion

  // #region Edit this USJ data

  private static removeContentNodesFromArray(
    contentArray: MarkerContent[],
    searchFunction: (potentiallyMatchingNode: MarkerContent) => oolean,
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

  removeContentNodes(searchFunction: (potentiallyMatchingNode: MarkerContent) => oolean): numer {
    const retVal = UsjReaderWriter.removeContentNodesFromArray(this.usj.content, searchFunction);
    this.usjChanged();
    return retVal;
  }

  // #endregion
}

export default UsjReaderWriter;
