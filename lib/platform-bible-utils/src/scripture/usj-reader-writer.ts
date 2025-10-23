// This was disabled so class functions that are similar in purpose can be grouped together
/* eslint-disable @typescript-eslint/member-ordering */
import {
  USJ_TYPE,
  type MarkerContent,
  type MarkerObject,
  type Usj,
} from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { JSONPath } from 'jsonpath-plus';
import {
  BOOK_TYPE,
  CHAPTER_TYPE,
  ContentJsonPath,
  IUsjReaderWriter,
  NO_BOOK_ID,
  PropertyJsonPath,
  UsfmLocation,
  UsjNodeAndDocumentLocation,
  UsjDocumentLocation,
  UsjReaderWriterOptions,
  UsjSearchResult,
  VERSE_TYPE,
  VerseRefOffset,
  UsjTextContentLocation,
} from './usj-reader-writer.model';
import { SortedNumberMap } from '../sorted-number-map';
import { extractFootnotesFromUsjContent } from './footnote-util';
import {
  AttributeMarkerInfo,
  MarkerInfo,
  MarkersMap,
  MarkerTypeInfo,
  USFM_MARKERS_MAP as USFM_MARKERS_MAP_3_1,
} from './markers-map-3.1.model';
import { deepClone, isString } from '../util';

const NODE_TYPES_NOT_CONTAINING_VERSE_TEXT = ['figure', 'note', 'sidebar', 'table'];
Object.freeze(NODE_TYPES_NOT_CONTAINING_VERSE_TEXT);

/** RegExp that matches all NBSP characters in a string. Used to convert NBSP in USJ to ~ in USFM */
const TEXT_CONTENT_NBSP_REGEXP = /\u00A0/g;

/**
 * RegExp that matches a USX/USJ table marker to get the number out of it. Used to figure out the
 * USFM cell range for table markers with `colspan` attribute in USX/USJ
 *
 * Matches:
 *
 * - 0: the whole string
 * - 1: the number portion of the marker (the starting column of this cell)
 */
const TABLE_MARKER_NUMBER_REGEXP = /\w+(\d+)/;

/**
 * RegExp that matches a USFM/USX/USJ verse number (optionally a span) to get the starting verse
 * number and optionally an ending verse number out of it.
 *
 * Matches:
 *
 * - 0: the whole string
 * - 1: the starting number portion of the verse number
 * - 2: the ending number portion of the verse number if one exists
 *
 * Example:
 *
 * ```usfm
 * \v 15-16
 * ```
 *
 * We would match this RegExp against `"15-16"`
 *
 * Match 1 would be `"15"`, and match 2 would be `"16"`
 */
const VERSE_MARKER_NUMBER_SPAN_REGEXP = /(\d+)-?(\d+)?/;

/** Map of USJ content arrays and objects inside content arrays to the content array owner */
type UsjParentMap = Map<MarkerObject | MarkerContent[], MarkerObject | Usj>;

/** Token indicating a marker closed */
type UsjClosingMarker = { isClosingMarker: true; forMarker: MarkerObject | Usj };

/**
 * A string found in the USJ document, a marker (including top-level USJ marker), or a closing
 * marker indicator
 */
type MarkerToken = MarkerContent | UsjClosingMarker | Usj;

/** Fragment indicating the value for an attribute */
type UsjAttributeValue = { isAttributeValueForKey: string; forMarker: MarkerObject | Usj };
/** Fragment indicating the key for an attribute */
type UsjAttributeKey = { isAttributeKey: string; forMarker: MarkerObject | Usj };
/** Fragment indicating the opening of an attribute marker */
type UsjAttributeMarker = { isAttributeMarker: string; forMarker: MarkerObject | Usj };
/** Fragment indicating the closing of an attribute marker */
type UsjAttributeMarkerClosingMarker = {
  isAttributeMarkerClosingMarker: string;
  forMarker: MarkerObject | Usj;
};

/** A part of a USJ document or a JSON representation of some piece of USFM that is not in USJ */
type UsjFragment =
  | MarkerToken
  | UsjAttributeValue
  | UsjAttributeKey
  | UsjAttributeMarker
  | UsjAttributeMarkerClosingMarker;

type UsjFragmentInfoMinimal = {
  fragment: UsjFragment;
  indexInUsfm: number;
};

type TokenToUsfmReturn = {
  usfm: string;
  fragmentsInfo: UsjFragmentInfoMinimal[];
};

type UsjFragmentInfo = UsjFragmentInfoMinimal & {
  workingStack: WorkingStack;
};

/** Fragments at each index in the USFM string */
type FragmentsByIndexInUsfm = SortedNumberMap<UsjFragmentInfo>;

/**
 * String index of the start of each verse (the backslash on the verse marker) in the USFM
 * representation of the USJ document. Used for taking an index based on the start of a verse and
 * determining the index in the whole USFM document to look up in {@link FragmentsByIndexInUsfm}.
 *
 * Note that all indices before a book id are associated with the first book id present. If there is
 * not a book id present in the USJ data, everything will be in book {@link NO_BOOK_ID}.
 *
 * Note that all indices before a chapter number are associated with the first chapter number
 * present. If there is not a chapter number present in the USJ data, everything will be in chapter
 * 0.
 *
 * Note that any indices that occur before a verse number will be in verse 0.
 *
 * The start of a book is at the book name, chapter 1 (or 0 if no chapter numbers), verse 0. The
 * start of a chapter is at the book name, chapter number, verse 0.
 */
type IndicesInUsfmByVerseRef = {
  [book: string]:
    | {
        [chapterNum: number]:
          | {
              [verseNum: number]: number | undefined;
            }
          | undefined;
      }
    | undefined;
};

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
export class UsjReaderWriter implements IUsjReaderWriter {
  private readonly usj: Usj;
  private readonly markersMap: MarkersMap;
  private readonly shouldAllowInvisibleCharacters: boolean;

  // Cached properties
  private parentMapInternal: UsjParentMap | undefined;
  private fragmentsByIndexInUsfmInternal: FragmentsByIndexInUsfm | undefined;
  private indicesInUsfmByVerseRefInternal: IndicesInUsfmByVerseRef | undefined;
  private usfmInternal: string | undefined;

  constructor(usj: Usj, options?: UsjReaderWriterOptions) {
    this.usj = usj;

    const { markersMap: providedMarkersMap, shouldAllowInvisibleCharacters } = options ?? {};

    if (providedMarkersMap) this.markersMap = providedMarkersMap;
    else {
      if (this.usj.version !== '3.1' && this.usj.version !== '3.0')
        throw new Error('USJ version is not 3.1 or 3.0! Not equipped to handle yet');
      // TODO: Handle 3.0 properly when we get a better markers map
      // TODO: Handle other than 3.1/0
      this.markersMap = USFM_MARKERS_MAP_3_1;
    }

    if (this.usj.version !== this.markersMap.version)
      console.warn(
        `Warning: USJ provided has version ${this.usj.version}, but markers map has version ${this.markersMap.version}. This may cause unexpected issues when transforming between formats.`,
      );

    this.shouldAllowInvisibleCharacters = shouldAllowInvisibleCharacters ?? false;
  }

  // If new variables are created to speed up queries, they should be reset here
  usjChanged(): void {
    this.parentMapInternal = undefined;
    this.fragmentsByIndexInUsfmInternal = undefined;
    this.indicesInUsfmByVerseRefInternal = undefined;
    this.usfmInternal = undefined;
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

  // #endregion

  // #region marker helper methods

  /**
   * Determine if the passed in marker is the USJ marker (should be the top-level marker)
   *
   * @param marker Marker to test if it is USJ marker
   * @returns `true` if it is a USJ marker; false otherwise
   */
  static isUsjMarker(marker: Usj | MarkerContent): marker is Usj {
    return typeof marker === 'object' && marker.type === USJ_TYPE;
  }

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

  /**
   * Checks if two stack items are equal using shallow equivalence, testing the stack item
   * properties for [strict
   * equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
   *
   * Note that this requires the parent of the two stack items to have reference equality
   */
  private static areStackItemsShallowEqual(a: StackItem, b: StackItem): boolean {
    return a.index === b.index && a.parent === b.parent;
  }

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

  private static convertWorkingStackAndPropertyToJsonPath(
    stack: WorkingStack,
    property: string,
  ): PropertyJsonPath {
    // Adding this property makes it conform to PropertyJsonPath. Always using bracket notation
    // because it works in more cases than dot notation does
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return `${UsjReaderWriter.convertWorkingStackToJsonPath(stack)}['${property}']` as PropertyJsonPath;
  }

  private convertJsonPathToWorkingStack(
    jsonPath: ContentJsonPath | PropertyJsonPath,
  ): WorkingStack {
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

  /**
   * If `property` is `undefined`, the `jsonPath` passed in was a `ContentJsonPath`. Otherwise, it
   * was a `PropertyJsonPath`
   */
  private convertJsonPathToWorkingStackAndProperty(jsonPath: ContentJsonPath | PropertyJsonPath): {
    stack: WorkingStack;
    property: string | undefined;
  } {
    const stack = this.convertJsonPathToWorkingStack(jsonPath);

    // Get the property from dot notation or bracket notation. If neither match, there is no property
    const [, property] =
      jsonPath.match(/\.([^[]+)$/) ??
      jsonPath.match(/\['(.+)']$/) ??
      jsonPath.match(/\["(.+)"]$/) ??
      [];

    return { stack, property };
  }

  // #endregion

  // #region Walk the node tree

  /**
   * Extract textual notes (aka, "footnotes") from a full USJ object.
   *
   * @returns An array of MarkerObjects representing all textual notes found in the USJ content.
   */
  findAllNotes(): MarkerObject[] {
    return extractFootnotesFromUsjContent(this.usj?.content);

    // Note that the following could be used instead of the above call to
    // extractFootnotesFromUsjContent, and that function could be removed. However, this is about
    // 100x slower than the custom traversal in extractFootnotesFromUsjContent.
    // return this.findAll('$.content..[?(@.type=="note")]');
    // This would depend on implementing findAll in this class:
    // findAll<T>(jsonPathQuery: string): T[] {
    //   const results = JSONPath({ path: jsonPathQuery, json: this.usj, wrap: true });
    //   return Array.isArray(results) ? results as T[] : [];
    // }
  }

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

  /**
   * Look through the USJ document for a token matching some condition
   *
   * @param token Token from which to start looking
   * @param workingStack Working stack pointing to this token (should not include this token)
   * @param skipTypes List of marker types to skip
   * @param searchFunction Function that tokens will be passed into to determine if they are the
   *   correct token. Stops searching and returns the token if this function returns `true`
   * @returns Token matching condition tested by the search function
   */
  private static findNextMatchingTokenUsingWorkingStack(
    token: MarkerToken,
    workingStack: WorkingStack,
    skipTypes: string[],
    searchFunction: (potentiallyMatchingToken: MarkerToken, workingStack: WorkingStack) => boolean,
  ) {
    // TODO: handle if they pass in a closing marker?
    if (typeof token === 'object' && 'isClosingMarker' in token) return;

    // Walk the nodes in a depth-first, left-to-right manner until the search function returns true
    let nextNode: MarkerContent | Usj | undefined = token;
    while (nextNode !== undefined) {
      const skipNextNode = typeof nextNode === 'object' && skipTypes.includes(nextNode.type);

      // If we found the node we're looking for, we're done
      if (!skipNextNode && searchFunction(nextNode, workingStack)) return nextNode;

      // Look at the node's children
      if (!skipNextNode && typeof nextNode === 'object' && (nextNode.content?.length ?? 0) > 0) {
        workingStack.push({ parent: nextNode, index: 0 });
        // Same as `nextNode = nextNode.content[0];` without triggering 2 different eslint errors
        [nextNode] = nextNode.content;
      } else {
        // The node has no children, so check the closing marker for this node
        const nextNodeClosingMarker: UsjClosingMarker | undefined =
          typeof nextNode === 'object' ? { isClosingMarker: true, forMarker: nextNode } : undefined;
        if (
          !skipNextNode &&
          nextNodeClosingMarker &&
          searchFunction(nextNodeClosingMarker, workingStack)
        )
          return nextNodeClosingMarker;

        // Then look at the next sibling, or the parent's next sibling, or the parent's closing
        // marker, etc. up the stack
        nextNode = undefined;
        while (workingStack.length > 0) {
          const nextLevel = workingStack.pop();
          if (nextLevel) {
            // We know that `content` exists due to its presence in this data structure
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            if (nextLevel.index + 1 < nextLevel.parent.content!.length) {
              // Check the next sibling
              nextLevel.index += 1;
              workingStack.push(nextLevel);
              // We know that `content` exists due to its presence in this data structure
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              nextNode = nextLevel.parent.content![nextLevel.index];
              break;
            } else {
              // There is no next sibling, so check the closing marker for the parent before we continue
              // to look at the parent's next sibling and etc.
              const parentClosingMarker: UsjClosingMarker = {
                isClosingMarker: true,
                forMarker: nextLevel.parent,
              };
              // Need to check if parent is skipped because we could have started in the middle of a
              // skipped marker
              // TODO: Does this make sense? Or should we not skip parent closing markers?
              if (
                !skipTypes.includes(parentClosingMarker.forMarker.type) &&
                searchFunction(parentClosingMarker, workingStack)
              )
                return parentClosingMarker;
            }
          }
        }
      }
    }

    // We've looked everywhere, so there must not be an appropriate node anywhere
    return undefined;
  }

  /**
   * Look through the USJ document for a node matching some condition
   *
   * @param node Node from which to start looking
   * @param workingStack Working stack pointing to this node (should not include this node)
   * @param skipTypes List of marker types to skip
   * @param searchFunction Function that nodes will be passed into to determine if they are the
   *   correct node. Stops searching and returns the node if this function returns `true`
   * @returns Node matching condition tested by the search function
   */
  private static findNextMatchingNodeUsingWorkingStack(
    node: MarkerContent,
    workingStack: WorkingStack,
    skipTypes: string[],
    searchFunction: (potentiallyMatchingNode: MarkerContent, workingStack: WorkingStack) => boolean,
  ): MarkerContent | undefined {
    // We are filtering out closing markers in our search function
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const result = this.findNextMatchingTokenUsingWorkingStack(
      node,
      workingStack,
      skipTypes,
      (potentiallyMatchingToken, currentWorkingStack) => {
        if (typeof potentiallyMatchingToken === 'object') {
          // Skip closing markers
          if ('isClosingMarker' in potentiallyMatchingToken) return false;

          // Skip Usj (presumably this will not ever hit because you are not providing Usj, and the
          // Usj object should not occur below top level)
          if (UsjReaderWriter.isUsjMarker(potentiallyMatchingToken)) return false;
        }

        // Just search normal markers and text as appropriate for this method
        return searchFunction(potentiallyMatchingToken, currentWorkingStack);
      },
    ) as MarkerContent | undefined;

    return result;
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

  // #region USJ + node -> SerializedVerseRef + offset

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

  // TODO: Rename nodeToUsfmLocation
  nodeToVerseRefAndOffset(
    bookId: string,
    node: MarkerContent,
    nodeParent: MarkerObject | MarkerContent[] | undefined,
  ): { verseRef: SerializedVerseRef; offset: number } | undefined {
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

    const verseRef: SerializedVerseRef = {
      book: bookId,
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

  // #region JSONPath -> SerializedVerseRef + offset

  // TODO: Rename usjLocationToUsfmLocation? Or make new method
  jsonPathToVerseRefAndOffset(jsonPathQuery: string, bookId?: string): VerseRefOffset {
    const effectiveBookId = bookId ?? this.findBookId();
    if (!effectiveBookId) throw new Error('Not able to determine the book ID');

    const target: MarkerContent | undefined = this.findSingleValue(jsonPathQuery);
    if (!target) throw new Error(`No result found for JSONPath query: ${jsonPathQuery}`);

    const parent: MarkerObject | MarkerContent[] | undefined = this.findParent(jsonPathQuery);
    if (!parent) throw new Error(`Could not determine parent for ${jsonPathQuery}`);

    const verseRefAndOffset = this.nodeToVerseRefAndOffset(effectiveBookId, target, parent);
    if (!verseRefAndOffset)
      throw new Error(
        `Could not determine SerializedVerseRef that corresponds to ${jsonPathQuery}`,
      );

    return verseRefAndOffset;
  }

  // #endregion

  // #region USFM location -> Usj location

  usfmLocationToUsjNodeAndDocumentLocation(
    usfmLocation: UsfmLocation | SerializedVerseRef,
  ): UsjNodeAndDocumentLocation {
    const verseRef = 'verseRef' in usfmLocation ? usfmLocation.verseRef : usfmLocation;
    const verseRefOffset = 'verseRef' in usfmLocation ? (usfmLocation.offset ?? 0) : 0;

    if (verseRefOffset < 0) throw new Error('offset must be >= 0');

    // Make sure the requested book ID is in the USJ content
    const availableBookIds = Object.keys(this.indicesInUsfmByVerseRef);
    const noBookIdsFound =
      availableBookIds.length === 0 ||
      (availableBookIds.length === 1 && availableBookIds[0] === NO_BOOK_ID);
    const bookId = noBookIdsFound ? NO_BOOK_ID : verseRef.book;
    const bookIndices = this.indicesInUsfmByVerseRef[bookId];
    if (!bookIndices)
      throw new Error(
        `Book ID ${verseRef.book} not found in USJ! ${noBookIdsFound ? `There seems to be no USJ content because there is no content in ${NO_BOOK_ID} either` : `Book IDs in USJ: ${JSON.stringify(availableBookIds)}`}`,
      );

    // Make sure the requested chapter number is in the USJ content
    const chapterIndices = bookIndices[verseRef.chapterNum];
    if (!chapterIndices) throw new Error(`Could not find ${bookId} chapter ${verseRef.chapterNum}`);

    // Make sure the requested verse number is in the USJ content
    const verseIndexInUsfm = chapterIndices[verseRef.verseNum];
    if (verseIndexInUsfm === undefined)
      // TODO: What should we do about verse ranges? The original code required that the range
      // given match exactly to the range in the text instead of starting at the first verse in the
      // range and going from there. Maybe just fill in each verse in the range with the same map?
      // Maybe too unclear now to do something about?
      throw new Error(`Verse ${verseRef.verseNum} not found in ${bookId} ${verseRef.chapterNum}`);

    // The USFM location's index in the USFM representation of this USJ document
    const usfmLocationIndexInUsfm = verseIndexInUsfm + verseRefOffset;

    const { value: fragmentInfo } = this.fragmentsByIndexInUsfm.findClosestLessThanOrEqual(
      usfmLocationIndexInUsfm,
    ) ?? {
      value: undefined,
    };
    if (!fragmentInfo)
      throw new Error(
        `Somehow, did not find anything at index in verse ${verseRefOffset} or below in ${bookId} ${verseRef.chapterNum}:${verseRef.verseNum}. Not sure how this would happen.`,
      );

    // Return the appropriate `UsjDocumentLocation` subtype based on what this fragment is

    // Get the offset within the fragment where the USFM location is pointing
    const usjOffset = usfmLocationIndexInUsfm - fragmentInfo.indexInUsfm;

    // Check if the fragment itself is the target (`string`, `MarkerObject`, and `Usj`)
    if (
      isString(fragmentInfo.fragment) ||
      UsjReaderWriter.isFragmentAMarker(fragmentInfo.fragment)
    ) {
      // The fragment itself is the target. Get JsonPath to the fragment
      const jsonPath = UsjReaderWriter.convertWorkingStackToJsonPath(fragmentInfo.workingStack);

      if (isString(fragmentInfo.fragment))
        return {
          node: fragmentInfo.fragment,
          // If the target is a text content string, location is the jsonPath and the offset in that
          // string
          documentLocation: { jsonPath, offset: usjOffset },
        };

      return {
        node: fragmentInfo.fragment,
        // The target is a marker itself, so location is just the marker jsonPath. We don't currently
        // provide a way to represent an offset within the opening marker.
        documentLocation: { jsonPath },
      };
    }

    // Check if the target is a closing marker
    if ('isClosingMarker' in fragmentInfo.fragment) {
      // Get JsonPath to the marker this is a closing marker for
      const jsonPath = UsjReaderWriter.convertWorkingStackToJsonPath(fragmentInfo.workingStack);

      return {
        node: fragmentInfo.fragment.forMarker,
        // Location is the jsonPath to the marker and an offset within the closing marker
        documentLocation: { jsonPath, closingMarkerOffset: usjOffset },
      };
    }

    // Check if the target is a property value (`marker` or an attribute)
    if ('isAttributeValueForKey' in fragmentInfo.fragment) {
      // Get JsonPath to the indicated property on the marker this is a property for
      const jsonPath = UsjReaderWriter.convertWorkingStackAndPropertyToJsonPath(
        fragmentInfo.workingStack,
        fragmentInfo.fragment.isAttributeValueForKey,
      );

      return {
        node: fragmentInfo.fragment.forMarker,
        // Location is the jsonPath to the property on the marker and the offset within the property
        // value
        documentLocation: { jsonPath, propertyOffset: usjOffset },
      };
    }

    // Check if the target is an attribute key
    if ('isAttributeKey' in fragmentInfo.fragment) {
      // Get JsonPath to the marker this is an attribute key for
      const jsonPath = UsjReaderWriter.convertWorkingStackToJsonPath(fragmentInfo.workingStack);

      return {
        node: fragmentInfo.fragment.forMarker,
        // Location is the jsonPath to the marker, the key, and the offset within that key
        documentLocation: {
          jsonPath,
          keyName: fragmentInfo.fragment.isAttributeKey,
          keyOffset: usjOffset,
        },
      };
    }

    // Check if the target is an attribute marker
    if ('isAttributeMarker' in fragmentInfo.fragment) {
      // Get JsonPath to the marker this is an attribute marker for
      const jsonPath = UsjReaderWriter.convertWorkingStackToJsonPath(fragmentInfo.workingStack);

      return {
        node: fragmentInfo.fragment.forMarker,
        // Location is the jsonPath to the marker and the key for the attribute marker. We don't
        // currently provide a way to represent an offset within the opening marker.
        documentLocation: { jsonPath, keyName: fragmentInfo.fragment.isAttributeMarker },
      };
    }

    // Check if the target is an attribute marker closing marker
    if ('isAttributeMarkerClosingMarker' in fragmentInfo.fragment) {
      // Get JsonPath to the marker this is an attribute marker for
      const jsonPath = UsjReaderWriter.convertWorkingStackToJsonPath(fragmentInfo.workingStack);

      return {
        node: fragmentInfo.fragment.forMarker,
        // Location is the jsonPath to the marker and the key for the attribute marker
        documentLocation: {
          jsonPath,
          keyName: fragmentInfo.fragment.isAttributeMarkerClosingMarker,
          keyClosingMarkerOffset: usjOffset,
        },
      };
    }

    throw new Error(
      `Found unrecognized fragment closest before ${JSON.stringify(usfmLocation)}: ${JSON.stringify(fragmentInfo)}`,
    );
  }

  usfmLocationToUsjDocumentLocation(
    usfmLocation: UsfmLocation | SerializedVerseRef,
  ): UsjDocumentLocation {
    return this.usfmLocationToUsjNodeAndDocumentLocation(usfmLocation).documentLocation;
  }

  verseRefToNextTextLocation(
    verseRef: SerializedVerseRef,
  ): UsjNodeAndDocumentLocation<UsjTextContentLocation> {
    // Get the location of the verse marker
    const verseLocation = this.usfmLocationToUsjNodeAndDocumentLocation(verseRef);

    // Find the first string after the verse marker
    const firstStringLocationAfterVerseMarker = this.findNextLocationOfMatchingText(
      verseLocation,
      '',
    );

    if (!firstStringLocationAfterVerseMarker)
      throw new Error(
        `Could not find next text location after verse ${JSON.stringify(verseRef)} at location ${
          verseLocation.documentLocation.jsonPath
        }`,
      );

    return firstStringLocationAfterVerseMarker;
  }

  // #endregion

  // #region Search for text from a node + JSONPath + offset

  /**
   * Determine if the USJ document location is pointing to a text content location instead of some
   * location related to a marker object
   *
   * @param usjDocumentLocation USJ document location to test
   * @returns `true` if the location is for text content; `false` otherwise
   */
  static isUsjDocumentLocationForTextContent(
    usjDocumentLocation: UsjDocumentLocation,
  ): usjDocumentLocation is UsjTextContentLocation;
  /**
   * Determine if the USJ document location in this node and document location is pointing to a text
   * content location instead of some location related to a marker object
   *
   * @param usjNodeAndDocumentLocation USJ node and document location to test
   * @returns `true` if the location is for text content; `false` otherwise
   */
  static isUsjDocumentLocationForTextContent(
    usjNodeAndDocumentLocation: UsjNodeAndDocumentLocation,
  ): usjNodeAndDocumentLocation is UsjNodeAndDocumentLocation<UsjTextContentLocation>;
  static isUsjDocumentLocationForTextContent(
    usjDocumentLocationMaybeNode: UsjDocumentLocation | UsjNodeAndDocumentLocation,
  ): boolean {
    let documentLocation = usjDocumentLocationMaybeNode;
    if ('node' in usjDocumentLocationMaybeNode) {
      // If it's a UsjNodeAndDocumentLocation, the node must be a string
      if (!isString(usjDocumentLocationMaybeNode.node)) return false;

      documentLocation = usjDocumentLocationMaybeNode.documentLocation;
    }

    // Text content representation in USJDocumentLocation requires offset and nothing else has offset
    return 'offset' in documentLocation;
  }

  findNextLocationOfMatchingText(
    startingPoint: UsjNodeAndDocumentLocation,
    text: string,
    maxTextLengthToSearch: number = 1000,
  ): UsjNodeAndDocumentLocation<UsjTextContentLocation> | undefined {
    let textScanned = '';
    let lengthScanned = 0;
    let lengthTrimmed = 0;
    let foundStartingAtOffset = -1;
    const workingStackForStartingPoint = this.convertJsonPathToWorkingStack(
      startingPoint.documentLocation.jsonPath,
    );
    // Cloning because the working stack items are modified during search
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
          if (!('offset' in startingPoint.documentLocation))
            throw new Error(
              `Somehow 'offset' was not in text content string document location. This should not happen. ${JSON.stringify(startingPoint.documentLocation)}`,
            );
          nodeTextToSearch = node.substring(startingPoint.documentLocation.offset);
          // We're skipping the offset characters in the first node, so we need to adjust the final
          // foundStartingAtOffset to account for that
          lengthTrimmed += startingPoint.documentLocation.offset;
        }

        lengthScanned += nodeTextToSearch.length;
        textScanned = `${textScanned}${nodeTextToSearch}`;
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
    if (foundStartingAtOffset < 0) return undefined;

    // The text might have been split between nodes, so we have to go through it one more time
    lengthScanned = 0;
    let finalOffset = 0;
    let finalStack: WorkingStack = [];
    const finalNode = UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      startingPoint.node,
      this.convertJsonPathToWorkingStack(startingPoint.documentLocation.jsonPath),
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
    if (!isString(finalNode))
      throw new Error(
        `Somehow found non-string node while searching for strings: ${JSON.stringify(finalNode)}`,
      );

    return {
      node: finalNode,
      documentLocation: {
        jsonPath: UsjReaderWriter.convertWorkingStackToJsonPath(finalStack),
        offset: finalOffset,
      },
    };
  }

  search(regex: RegExp): UsjSearchResult[] {
    const retVal: UsjSearchResult[] = [];
    if (this.usj.content.length === 0) return retVal;

    // Start searching from the first node in the USJ content tree
    const startingPoint: UsjNodeAndDocumentLocation = {
      node: this.usj.content[0],
      documentLocation: {
        jsonPath: `$.content[0]`,
      },
    };
    // Make sure it is a valid document location: put offset 0 on it if it is a text content string
    if (isString(this.usj.content[0]))
      // We just verified this is a text content string, so we're just properly making it a UsjTextContentLocation
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      (startingPoint.documentLocation as UsjTextContentLocation).offset = 0;

    // This will hold all of the text content from the USJ, so we can search it all at once
    const textChunks: string[] = [];
    // This will map the index of each text chunk in the full text, so we can find the location
    const fullTextIndexMap = new SortedNumberMap<
      UsjNodeAndDocumentLocation<UsjTextContentLocation>
    >();

    // Variables to track our current position while walking through the USJ content tree
    let currentIndex = 0;
    let nextNode: MarkerContent | undefined = startingPoint.node;
    while (nextNode !== undefined) {
      nextNode = UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
        startingPoint.node,
        this.convertJsonPathToWorkingStack(startingPoint.documentLocation.jsonPath),
        [],
        // We need to use variables from outside the function to keep track of our current position
        // eslint-disable-next-line no-loop-func
        (node, workingStack) => {
          if (typeof node !== 'string') return false;

          textChunks.push(node);
          fullTextIndexMap.set(currentIndex, {
            node,
            documentLocation: {
              offset: 0,
              jsonPath: UsjReaderWriter.convertWorkingStackToJsonPath(workingStack),
            },
          });
          currentIndex += node.length;
          return false;
        },
      );
    }

    // Connect all the text chunks together so we can search them all at once. Note that there are
    // no spaces between the text chunks. If we need spaces inserted between verses, chapters, etc.
    // then we should adjust how we walk through the tree to insert extra spaces at the right times.
    const fullText = textChunks.join('');

    // Lean on regular expressions to do the heavy lifting of finding matches
    let match: RegExpExecArray | null = regex.exec(fullText);
    while (match) {
      // If the match is empty, then we don't want to include it in the results
      if (match[0].length > 0) {
        if (match.index < 0 || match.index >= fullText.length)
          throw new Error(`Match index out of bounds: ${match.index}`);
        const closestNode = fullTextIndexMap.findClosestLessThanOrEqual(match.index);
        if (!closestNode)
          throw new Error(`Internal error: no closest node found for index ${match.index}`);
        const location: UsjNodeAndDocumentLocation<UsjTextContentLocation> = {
          node: closestNode.value.node,
          documentLocation: {
            jsonPath: closestNode.value.documentLocation.jsonPath,
            offset: match.index - closestNode.key,
          },
        };
        retVal.push({ text: match[0], location });
      }

      // If the regex is not global, then running `exec` again will return the same match
      if (!regex.global) break;
      match = regex.exec(fullText);
    }

    return retVal;
  }

  // #endregion

  // #region Extract text from a node + JSONPath + offset

  extractText(start: UsjNodeAndDocumentLocation, desiredLength: number): string {
    let retVal = '';
    let offsetRemaining = 'offset' in start.documentLocation ? start.documentLocation.offset : 0;
    let lengthRecorded = 0;
    UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      start.node,
      this.convertJsonPathToWorkingStack(start.documentLocation.jsonPath),
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
    start: UsjNodeAndDocumentLocation,
    end: UsjNodeAndDocumentLocation,
    maxLength: number = 100,
  ): string {
    let retVal = '';
    UsjReaderWriter.findNextMatchingNodeUsingWorkingStack(
      start.node,
      this.convertJsonPathToWorkingStack(start.documentLocation.jsonPath),
      NODE_TYPES_NOT_CONTAINING_VERSE_TEXT,
      (node, currentStack) => {
        // `node` and `end.node` are both `MarkerContent` which might be strings or objects
        if (node === end.node) {
          // If both objects are the same, then we definitely found `end`
          if (typeof node === 'object') return true;

          // If both strings are the same, we need to verify that we're at the same place in `usj`
          if (
            end.documentLocation.jsonPath ===
            UsjReaderWriter.convertWorkingStackToJsonPath(currentStack)
          )
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

  // #region transform USJ to USFM

  /**
   * Get `MarkerInfo` by marker name
   *
   * @param markerName Name of the marker for which to get `MarkerInfo`
   * @returns `MarkerInfo` for the marker by name if the marker is in the markers map. `undefined`
   *   if the marker is not in the markers map. If you have the marker type, you can build a fake
   *   `MarkerInfo` for an unknown marker by making an object with just the type. If not, might be
   *   best to throw an error since there probably isn't enough information available to do anything
   *   with that marker.
   */
  private getMarkerInfo(markerName: string): MarkerInfo | undefined {
    // Try to get by exact marker name first
    let markerInfo = this.markersMap.markers[markerName];

    // If not found by exact name, try to match the RegExp marker names
    if (!markerInfo)
      [, markerInfo] =
        Object.entries(this.markersMap.markersRegExp).find(([markerRegExp]) =>
          new RegExp(markerRegExp).test(markerName),
        ) ?? [];

    // Didn't find the marker, so just return `undefined
    return markerInfo;
  }

  /**
   * Gathers various pieces of information about a marker that are helpful for transforming the
   * marker to USFM
   *
   * @param marker A USJ marker (can be USJ type) or a string which is the marker name
   * @param markersMap The markers map from which to gather info
   * @returns Various pieces of info about the marker
   */
  private getInfoForMarker(marker: MarkerObject | Usj | string): {
    markerName: string;
    markerNameUsfm: string;
    markerInfo: MarkerInfo;
    markerType: string;
    markerTypeInfo: MarkerTypeInfo;
    /**
     * Array of tuples containing the USFM name of an attribute marker that may be present on this
     * marker and the marker info for that attribute marker
     *
     * This is like the returned value from `Object.entries`. However, the order of these is
     * important in some cases, so it cannot simply be an object.
     */
    attributeMarkerInfoEntries: [
      attributeMarkerName: string,
      attributeMarkerInfo: AttributeMarkerInfo,
    ][];
  } {
    let markerName: string;
    if (isString(marker)) markerName = marker;
    else if (UsjReaderWriter.isUsjMarker(marker)) markerName = marker.type;
    else markerName = marker.marker ?? marker.type;

    // If we don't have marker info for the marker or the marker type doesn't match the type in the
    // marker info, this marker is considered unknown. Do some special handling.
    let markerIsUnknown = false;

    let markerInfo = this.getMarkerInfo(markerName);

    // Didn't find the marker, so create `MarkerInfo` with the marker type if possible
    if (!markerInfo) {
      if (isString(marker))
        throw new Error(`Unknown marker ${markerName} and no marker type provided`);

      markerInfo = { type: marker.type };
      markerIsUnknown = true;

      console.warn(
        `Unknown marker ${markerName}. Creating MarkerInfo to use: ${JSON.stringify(markerInfo)}`,
      );
    }

    let markerType = markerInfo.type;

    // Special case: If the marker is a table marker, remove "table:" from the start because that is
    // present in USJ but not in the markers map or the other formats
    const isTableMarker = !isString(marker) && marker.type.startsWith('table:');

    if (
      !isString(marker) &&
      ((isTableMarker && marker.type.substring('table:'.length) !== markerInfo.type) ||
        (!isTableMarker && marker.type !== markerInfo.type))
    ) {
      console.warn(
        `Warning: Mismatching marker type in the USJ content ${marker.type} vs marker type in the marker info ${markerInfo.type} for marker ${markerName}. Using the type from the USJ content.`,
      );
      markerType = isTableMarker ? marker.type.substring('table:'.length) : marker.type;
      markerIsUnknown = true;
    }

    let markerTypeInfo = this.markersMap.markerTypes[markerType];

    // Special case: If the marker type is para and it is unknown, do not add a newline before
    // the marker to match Paratext 9
    if (markerIsUnknown && markerType === 'para' && markerTypeInfo)
      markerTypeInfo = { ...markerTypeInfo, hasNewlineBefore: false };

    // Special case: If the marker type is `unmatched`, use empty marker type info
    if (!markerTypeInfo && markerType === 'unmatched') markerTypeInfo = {};

    // Couldn't find the marker type info
    // Note: In this case, Paratext just ignores the marker and prints the marker's content. This
    // really shouldn't happen, though. I had to manually change a marker type in USX and then import
    // it to Paratext to see this behavior. If you hit this, something is already going terribly wrong.
    if (!markerTypeInfo) {
      throw new Error(`Unknown marker type ${markerType} on marker ${markerName}! Cannot proceed.`);
    }

    // Figure out attribute marker attribute names
    const attributeMarkerInfoEntries: [string, AttributeMarkerInfo][] = [];
    if (markerInfo.attributeMarkers) {
      markerInfo.attributeMarkers.forEach((attributeMarkerName) => {
        const attributeMarkerInfo = this.getMarkerInfo(attributeMarkerName);

        // Markers map lists an attribute marker that doesn't exist. Just skip this attribute
        if (!attributeMarkerInfo) return;

        // Markers map lists an attribute marker that doesn't seem to be an attribute marker.
        // Just skip this attribute
        if (!('attributeMarkerAttributeName' in attributeMarkerInfo)) return;

        attributeMarkerInfoEntries.push([attributeMarkerName, attributeMarkerInfo]);
      });
    }

    // Add the marker name
    // Special case with USJ marker - transform to usfm marker
    let markerNameUsfm = markerName === USJ_TYPE ? 'usfm' : markerName;

    // Markers can have any properties. All are strings. Only exception is content, so don't use
    // it here
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const markerWithAnyAttributes = marker as unknown as Record<string, string>;

    // Special case: cell-type markers with `colspan` need to be cell range marker
    if (markerType === 'cell' && markerWithAnyAttributes.colspan) {
      // Get the number of columns that this cell spans
      const columnsSpanned = parseInt(markerWithAnyAttributes.colspan, 10);

      const tableMarkerMatches = TABLE_MARKER_NUMBER_REGEXP.exec(markerName);

      if (tableMarkerMatches?.[1]) {
        // Get the starting cell column number
        const startingColumn = parseInt(tableMarkerMatches[1], 10);
        if (!Number.isNaN(startingColumn) && !Number.isNaN(columnsSpanned)) {
          // Create cell range marker like `tc1-3`
          markerNameUsfm = `${markerName}-${startingColumn + columnsSpanned - 1}`;
          // Set `colspan` so it is not output to USFM since it was just incorporated properly
          markerTypeInfo = {
            ...markerTypeInfo,
            skipOutputAttributeToUsfm: [
              ...(markerTypeInfo.skipOutputAttributeToUsfm ?? []),
              'colspan',
            ],
          };
        }
      }
    }

    return {
      markerName,
      markerNameUsfm,
      markerInfo,
      markerType,
      markerTypeInfo,
      attributeMarkerInfoEntries,
    };
  }

  /** Converts the text content of a marker to its equivalent in USFM */
  private textContentToUsfm(textContent: string): TokenToUsfmReturn {
    // Special case: NBSP should be replaced with ~ in USFM if invisible characters are not allowed
    return {
      usfm: this.shouldAllowInvisibleCharacters
        ? textContent
        : textContent.replace(TEXT_CONTENT_NBSP_REGEXP, '~'),
      fragmentsInfo: [{ fragment: textContent, indexInUsfm: 0 }],
    };
  }

  /**
   * Merge an independent array of fragment info into an existing array of fragment info, offsetting
   * the indices of the new fragments so their locations start from the end of the string
   */
  private static mergeFragmentsInfoIntoExistingArray(
    newFragmentsInfo: UsjFragmentInfoMinimal[],
    existingFragmentsInfo: UsjFragmentInfoMinimal[],
    existingUsfmLength: number,
  ) {
    newFragmentsInfo.forEach((fragmentInfo) => {
      const fragmentIndex = existingUsfmLength + fragmentInfo.indexInUsfm;
      existingFragmentsInfo.push({
        ...fragmentInfo,
        indexInUsfm: fragmentIndex,
      });
    });
  }

  /**
   * Determine if a fragment is a marker, not a text content string or some kind of position
   * fragment that isn't actually a marker e.g. closing marker fragment
   */
  private static isFragmentAMarker(fragment: UsjFragment): fragment is MarkerObject | Usj {
    return !isString(fragment) && !('forMarker' in fragment);
  }

  /**
   * Transforms the provided USJ marker into its opening marker representation in USFM
   *
   * Includes a newline before the marker if applicable. Generally also includes a space at the end.
   *
   * Opening markers generally look like the following:
   *
   * ```text
   * \markerName leadingAttributes textContentAttribute attributeMarkers
   * ```
   *
   * @param marker The marker to transform
   * @param isInsideMarkerWithSameType `true` if this marker is inside another marker of the same
   *   type. This is used to determine if a prefix should be added before the marker name.
   * @returns String containing the marker information that should come before the contents of the
   *   marker in USFM
   */
  private openingMarkerToUsfm(
    marker: MarkerObject | Usj,
    isInsideMarkerWithSameType: boolean,
  ): TokenToUsfmReturn {
    let usfm = '';
    const fragmentsInfo: UsjFragmentInfoMinimal[] = [];

    const { markerNameUsfm, markerInfo, markerType, markerTypeInfo, attributeMarkerInfoEntries } =
      this.getInfoForMarker(marker);

    // Markers can have any properties. All are strings. Only exception is content, so don't use
    // it here
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const markerWithAnyAttributes = marker as unknown as Record<string, string>;

    // Add newline before the marker if there's supposed to be one
    // Special case: `USJ` marker should have a newline before
    if (markerTypeInfo.hasNewlineBefore || UsjReaderWriter.isUsjMarker(marker)) usfm += `\n`;

    // Special case with `char` markers - prefix with `+` if inside another `char` marker
    const markerPrefix = markerType === 'char' && isInsideMarkerWithSameType ? '+' : '';

    // Add the marker name
    // Special case with `optbreak` - transform to `//`
    // Special case with `unmatched` - no space after the marker name because it is basically a closing marker
    // Fragment representing the very beginning of the marker is the marker itself
    fragmentsInfo.push({ fragment: marker, indexInUsfm: usfm.length });
    usfm += markerType === 'optbreak' ? '//' : `\\${markerPrefix}`;

    if (markerType !== 'optbreak') {
      // Fragment representing the marker name is the `marker` property
      fragmentsInfo.push({
        fragment: { isAttributeValueForKey: 'marker', forMarker: marker },
        indexInUsfm: usfm.length,
      });
      usfm += `${markerNameUsfm}${markerType === 'unmatched' ? '' : ' '}`;
    }

    // Add leading attributes in listed order
    if (markerInfo.leadingAttributes) {
      markerInfo.leadingAttributes.forEach((attributeName) => {
        const attributeValue = markerWithAnyAttributes[attributeName];

        if (!attributeValue) return;

        fragmentsInfo.push({
          fragment: { isAttributeValueForKey: attributeName, forMarker: marker },
          indexInUsfm: usfm.length,
        });
        usfm += `${attributeValue} `;
      });
    }

    // Add text content attribute
    if (
      markerInfo.textContentAttribute &&
      markerWithAnyAttributes[markerInfo.textContentAttribute]
    ) {
      fragmentsInfo.push({
        fragment: { isAttributeValueForKey: markerInfo.textContentAttribute, forMarker: marker },
        indexInUsfm: usfm.length,
      });
      usfm += `${markerWithAnyAttributes[markerInfo.textContentAttribute]} `;
    }

    // Add attribute markers in listed order
    if (markerInfo.attributeMarkers) {
      attributeMarkerInfoEntries.forEach(([attributeMarkerName, attributeMarkerInfo]) => {
        const attributeValue =
          markerWithAnyAttributes[attributeMarkerInfo.attributeMarkerAttributeName];

        if (!attributeValue) return;

        // Create a marker that represents this attribute marker so we can make the USFM
        const attributeMarker: MarkerObject = {
          type: attributeMarkerInfo.type,
          marker: attributeMarkerName,
          content: [attributeValue],
        };

        // Add the attribute marker USFM to the document
        // Caveat: it's not technically always true that this marker is the parent of the attribute
        // markers, but there is currently no known case where it matters because there are no
        // attribute markers that have the same marker type as the marker on which they are
        // attributes. It likely will never matter as this is a very strange concept and it seems
        // the USFM committee doesn't want to create more attribute markers.

        // TODO: add new location type for attribute marker opening?

        /* UsjReaderWriter.mergeFragmentsInfoIntoExistingArray(
        markerFragmentsInfo,
        fragmentsInfo,
        usfmOutput.length,
      ); */

        // Collect opening and closing attribute marker fragments so we can modify them before adding
        // them to the main fragments
        const attributeMarkerFragmentsInfo: UsjFragmentInfoMinimal[] = [];

        usfm = this.addMarkerUsfmToString(
          usfm,
          attributeMarker,
          marker,
          attributeMarkerFragmentsInfo,
        );
        const { usfm: textContentUsfm } = this.textContentToUsfm(attributeValue);
        fragmentsInfo.push({
          fragment: {
            isAttributeValueForKey: attributeMarkerInfo.attributeMarkerAttributeName,
            forMarker: marker,
          },
          indexInUsfm: usfm.length,
        });
        usfm += textContentUsfm;
        usfm = this.addMarkerUsfmToString(
          usfm,
          {
            isClosingMarker: true,
            forMarker: attributeMarker,
          },
          marker,
          attributeMarkerFragmentsInfo,
        );

        // Transform the opening fragments to attribute marker fragments and add them to the main
        // fragments
        attributeMarkerFragmentsInfo.forEach((fragmentInfo) => {
          // There should never be such a thing as text content in the opening/closing of an attribute
          // marker or an attribute key for an attribute marker
          if (isString(fragmentInfo.fragment) || 'isAttributeKey' in fragmentInfo.fragment)
            throw new Error(
              `Attribute marker opening or closing markers generated a text content fragment or an attribute key fragment! This does not make sense. ${JSON.stringify(fragmentInfo)}`,
            );

          if (UsjReaderWriter.isFragmentAMarker(fragmentInfo.fragment)) {
            // Opening marker. Need to point to the original marker and indicate this is the opening
            // marker for its attribute marker
            fragmentsInfo.push({
              ...fragmentInfo,
              fragment: {
                isAttributeMarker: attributeMarkerInfo.attributeMarkerAttributeName,
                forMarker: marker,
              },
            });

            return;
          }

          if ('isAttributeValueForKey' in fragmentInfo.fragment) {
            // There should never be an attribute value for an attribute marker other than the marker name
            if (fragmentInfo.fragment.isAttributeValueForKey !== 'marker')
              throw new Error(
                `Attribute marker opening or closing markers generated an attribute value fragment for a key that was not marker! This does not make sense. ${JSON.stringify(fragmentInfo)}`,
              );
            // Marker representation of the attribute marker. Change to attribute key for attribute
            // marker attribute name.
            fragmentsInfo.push({
              ...fragmentInfo,
              fragment: {
                isAttributeKey: attributeMarkerInfo.attributeMarkerAttributeName,
                forMarker: marker,
              },
            });
            return;
          }

          if ('isClosingMarker' in fragmentInfo.fragment) {
            // Closing marker. Need to point to the original marker and indicate this is the closing
            // marker for its attribute marker

            // Need to remove isClosingMarker but will not use it again. This was the easiest way to
            // delete it without TypeScript going berserk
            // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
            const { isClosingMarker: _, ...partialClosingFragment } = fragmentInfo.fragment;

            const fragment: UsjAttributeMarkerClosingMarker = {
              ...partialClosingFragment,
              forMarker: marker,
              isAttributeMarkerClosingMarker: attributeMarkerInfo.attributeMarkerAttributeName,
            };

            fragmentsInfo.push({
              ...fragmentInfo,
              fragment,
            });

            return;
          }

          // That should have been all of them, so not sure what other fragment this could be
          throw new Error(
            `Attribute marker opening or closing markers generated an unrecognized fragment: ${JSON.stringify(fragmentInfo)}`,
          );
        });

        if (
          !this.markersMap.isSpaceAfterAttributeMarkersContent &&
          attributeMarkerInfo.hasStructuralSpaceAfterCloseAttributeMarker
        )
          // Add the optional structural space after the attribute marker according to spec
          usfm += ' ';
      });
    }

    return { usfm, fragmentsInfo };
  }

  /**
   * Transforms the provided USJ marker into its closing marker representation in USFM
   *
   * Closing markers do not include the attributes listed as part of the opening markers (leading
   * attributes, text content attributes, and attribute markers). They only include other kinds of
   * attributes including the default attribute if present.
   *
   * Closing markers with only the default attribute present generally look like the following:
   *
   * ```text
   * |defaultAttribute\markerName*
   * ```
   *
   * Closing markers with at least one non-default attribute present generally look like the
   * following:
   *
   * ```text
   * |attributeName="AttributeValue" attributeName="AttributeValue"\markerName*
   * ```
   *
   * @param marker The marker to transform
   * @param isInsideMarkerWithSameType `true` if this marker is inside another marker of the same
   *   type. This is used to determine if a prefix should be added before the marker name.
   * @returns String containing the marker information that should come after the contents of the
   *   marker in USFM
   */
  private closingMarkerToUsfm(
    marker: MarkerObject | Usj,
    isInsideMarkerWithSameType: boolean,
  ): TokenToUsfmReturn {
    const {
      markerName,
      markerNameUsfm,
      markerInfo,
      markerType,
      markerTypeInfo,
      attributeMarkerInfoEntries,
    } = this.getInfoForMarker(marker);

    // Gather attributes that are not listed as part of the opening marker and not skipped in USFM
    const closingMarkerAttributeNames = Object.keys(marker).filter((attributeName) => {
      // Skip properties that are not attributes
      if (attributeName === 'type') return false;
      if (attributeName === 'marker') return false;
      if (attributeName === 'content') return false;

      // Special case: skip `closed` as it is not present in USFM
      if (attributeName === 'closed') return false;

      // Skip attributes that are supposed to be skipped when outputting to USFM
      if (markerTypeInfo.skipOutputAttributeToUsfm?.includes(attributeName)) return false;

      // Not a leadingAttribute
      if (markerInfo.leadingAttributes?.includes(attributeName)) return false;

      // Not a textContentAttribute
      if (markerInfo.textContentAttribute === attributeName) return false;

      // Not an attributeMarker
      if (
        attributeMarkerInfoEntries.some(
          ([, attributeMarkerInfo]) =>
            attributeMarkerInfo.attributeMarkerAttributeName === attributeName,
        )
      )
        return false;

      // There are no other attributes that go on the opening marker, so this must go on the closing
      // marker
      return true;
    });

    // Markers can have any properties. All are strings. Only exception is content, so don't use
    // it here
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const markerWithAnyAttributes = marker as unknown as Record<string, string>;

    // We don't have examples of markers that have both normal closing markers and independent
    // closing markers, so just throw an error if we encounter this situation
    if (
      markerTypeInfo.hasClosingMarker &&
      markerInfo.independentClosingMarkers &&
      markerInfo.independentClosingMarkers.length > 0
    )
      throw new Error(
        `Marker ${
          markerNameUsfm
        } is intended to have a normal closing marker and independent closing markers. As of writing this code, there is no known syntax for this situation in USFM. Cannot proceed.`,
      );

    // Determine if the marker is supposed to have an explicit closing marker
    let hasExplicitClosingMarker = true;
    // If the closing marker is required
    if (!markerInfo.isClosingMarkerOptional) {
      // If it is specified as not closed, it should not have a closing marker
      if (markerWithAnyAttributes.closed === 'false') hasExplicitClosingMarker = false;
    } else if (
      !this.markersMap.shouldOptionalClosingMarkersBePresent &&
      markerWithAnyAttributes.closed !== 'true'
    )
      // The closing marker is optional
      // If optional closing markers should be left out and it is not specified as closed, it
      // should not have a closing marker
      hasExplicitClosingMarker = false;
    else if (
      this.markersMap.shouldOptionalClosingMarkersBePresent &&
      markerWithAnyAttributes.closed === 'false'
    )
      // If optional closing markers should still be explicitly closed and it is specified as not
      // closed, it should not have a closing marker
      hasExplicitClosingMarker = false;

    // If this marker has an independent closing marker, create that
    if (
      markerInfo.independentClosingMarkers &&
      markerInfo.independentClosingMarkers.length > 0 &&
      hasExplicitClosingMarker
    ) {
      // Create a marker that represents this independent closing marker so we can make the USFM
      const independentClosingMarker: MarkerObject = {
        type: markerType,
        marker: markerInfo.independentClosingMarkers[0],
        // Put all the closing marker attributes on here since we don't really have a better place
        // to put them and might as well
        ...Object.fromEntries(
          closingMarkerAttributeNames.map((attributeName) => [
            attributeName,
            markerWithAnyAttributes[attributeName],
          ]),
        ),
      };

      let usfm = '';
      const fragmentsInfo: UsjFragmentInfoMinimal[] = [];

      const { usfm: openingMarkerUsfm, fragmentsInfo: openingFragmentsInfo } =
        this.openingMarkerToUsfm(independentClosingMarker, isInsideMarkerWithSameType);
      // Fragment for independent closing marker is just the normal closing fragment. So find the
      // opening fragment, change it to closing fragment, and add it to the fragments for this
      // marker. Need to get the opening marker so we have the right indexInUsfm (might be 1 if
      // the marker has a newline before it, for example)
      const openingFragmentInfo = openingFragmentsInfo.find((fragmentInfo) => {
        return UsjReaderWriter.isFragmentAMarker(fragmentInfo.fragment);
      });
      if (!openingFragmentInfo)
        throw new Error(
          `Could not find opening fragment info for independent closing marker ${JSON.stringify(
            independentClosingMarker,
          )}. Fragments info generated: ${JSON.stringify(openingFragmentsInfo)}`,
        );
      fragmentsInfo.push({
        ...openingFragmentInfo,
        fragment: { isClosingMarker: true, forMarker: marker },
      });
      usfm += openingMarkerUsfm;
      // Only add the independent closing marker if it does not have the same name as the marker we
      // are closing so we don't get in an infinite loop
      if (markerName !== independentClosingMarker.marker)
        // ENHANCE: If we ever have a situation where closing marker attributes get on a marker
        // with an independent closing marker, let's add fragments for the attributes here. Though
        // I think this may be something the USFM committee intends to avoid doing based on the
        // proposal to add attributes at the opening marker
        usfm = this.addMarkerUsfmToString(
          usfm,
          {
            isClosingMarker: true,
            forMarker: independentClosingMarker,
          },
          isInsideMarkerWithSameType,
        );

      return { usfm, fragmentsInfo };
    }

    // This marker doesn't have an independent closing marker, so create a normal closing marker
    let usfm = '';
    const fragmentsInfo: UsjFragmentInfoMinimal[] = [];

    // Add attributes to the closing marker USFM
    if (closingMarkerAttributeNames.length > 0) {
      // Add the bar before closing attributes
      usfm += '|';

      // Default attribute syntax if it is the only attribute present
      if (
        closingMarkerAttributeNames.length === 1 &&
        closingMarkerAttributeNames[0] === markerInfo.defaultAttribute
      ) {
        fragmentsInfo.push({
          fragment: { isAttributeValueForKey: markerInfo.defaultAttribute, forMarker: marker },
          indexInUsfm: usfm.length,
        });
        usfm += markerWithAnyAttributes[markerInfo.defaultAttribute];
      } else {
        // List all attributes with key and value
        closingMarkerAttributeNames.forEach((attributeName, index) => {
          // Special case: fig's file attribute is src in USFM
          const attributeNameUsfm =
            markerName === 'fig' && attributeName === 'file' ? 'src' : attributeName;
          // Add to the accumulated usfm (starting with a bar): a space if this is after the first
          // attribute, then the attribute name, then =, then "the attribute value"
          if (index > 0) usfm += ' ';
          fragmentsInfo.push({
            fragment: { isAttributeKey: attributeName, forMarker: marker },
            indexInUsfm: usfm.length,
          });
          usfm += `${attributeNameUsfm}="`;
          fragmentsInfo.push({
            fragment: { isAttributeValueForKey: attributeName, forMarker: marker },
            indexInUsfm: usfm.length,
          });
          usfm += `${markerWithAnyAttributes[attributeName]}"`;
        });
      }
    }

    // Add the normal closing marker
    if (markerTypeInfo.hasClosingMarker && hasExplicitClosingMarker) {
      const closingMarkerName = markerTypeInfo.isClosingMarkerEmpty ? '' : markerNameUsfm;

      // Special case with `char` markers - prefix with `+` if inside another `char` marker
      const markerPrefix = markerType === 'char' && isInsideMarkerWithSameType ? '+' : '';

      fragmentsInfo.push({
        fragment: { isClosingMarker: true, forMarker: marker },
        indexInUsfm: usfm.length,
      });
      usfm += `\\${markerPrefix}${closingMarkerName}*`;
    }

    return { usfm, fragmentsInfo };
  }

  /**
   * Determines whether this marker and all its content should be skipped entirely when outputting
   * to USFM
   *
   * @param marker Marker to check
   * @returns `true` if this marker should be skipped; `false` otherwise
   */
  private shouldSkipOutputMarkerToUsfm(marker: MarkerObject) {
    const { markerType, markerTypeInfo } = this.getInfoForMarker(marker);

    // Special case: `table`-type marker doesn't exist in USFM
    if (markerType === 'table') return true;

    if (
      markerTypeInfo.skipOutputMarkerToUsfmIfAttributeIsPresent?.some(
        (attributeName) => attributeName in marker,
      )
    )
      return true;

    return false;
  }

  /** Removes one space at the end of the string if present */
  private static removeEndSpace(value: string) {
    // TODO: should this use the surrogate-aware functions?
    if (value.at(-1) !== ' ') return value;
    return value.slice(0, -1);
  }

  /**
   * Add an opening or closing marker USFM representation to the end of a string of USFM
   *
   * @param usfm The USFM string to add the marker to
   * @param marker The opening or closing marker to add to the USFM
   * @param tokenParent Parent of the marker being added. Used to determine if this marker is nested
   *   within another marker of the same type
   * @param fragmentsInfo The array of fragment information built so far for the USFM string passed
   *   in. THIS METHOD WILL MODIFY THE ARRAY PASSED IN; it will add new fragments that correspond to
   *   the marker added.
   * @returns Final USFM string with the marker added
   */
  private addMarkerUsfmToString(
    usfm: string,
    marker: MarkerObject | UsjClosingMarker,
    tokenParent: MarkerObject | Usj | undefined,
    fragmentsInfo?: UsjFragmentInfoMinimal[],
  ): string;
  /**
   * Add an opening or closing marker USFM representation to the end of a string of USFM
   *
   * @param usfm The USFM string to add the marker to
   * @param marker The opening or closing marker to add to the USFM
   * @param isInsideMarkerWithSameType `true` if this marker is inside another marker of the same
   *   type. This is used to determine if a prefix should be added before the marker name.
   * @param fragmentsInfo The array of fragment information built so far for the USFM string passed
   *   in. THIS METHOD WILL MODIFY THE ARRAY PASSED IN; it will add new fragments that correspond to
   *   the marker added.
   * @returns Final USFM string with the marker added
   */
  private addMarkerUsfmToString(
    usfm: string,
    marker: MarkerObject | UsjClosingMarker,
    isInsideMarkerWithSameType: boolean,
    fragmentsInfo?: UsjFragmentInfoMinimal[],
  ): string;
  private addMarkerUsfmToString(
    usfm: string,
    marker: MarkerObject | UsjClosingMarker,
    tokenParentOrIsInsideMarkerWithSameType: MarkerObject | Usj | boolean | undefined,
    fragmentsInfo?: UsjFragmentInfoMinimal[],
  ): string {
    let usfmOutput = usfm;

    // Build up the marker's usfm and fragment info separately first because we may modify it before
    // adding it to the full usfm
    let markerUsfmOutput;
    let markerFragmentsInfo: UsjFragmentInfoMinimal[];

    const { markerName, markerType, markerTypeInfo } = this.getInfoForMarker(
      'isClosingMarker' in marker ? marker.forMarker : marker,
    );

    // Determine if this marker is a direct child of another marker of the same type
    let isParentSameType = false;
    if (typeof tokenParentOrIsInsideMarkerWithSameType === 'boolean')
      isParentSameType = tokenParentOrIsInsideMarkerWithSameType;
    else if (tokenParentOrIsInsideMarkerWithSameType) {
      const { markerType: parentMarkerType } = this.getInfoForMarker(
        tokenParentOrIsInsideMarkerWithSameType,
      );
      if (parentMarkerType === markerType) {
        isParentSameType = true;
      }
    }

    if ('isClosingMarker' in marker) {
      const { usfm: closingUsfm, fragmentsInfo: closingFragmentsInfo } = this.closingMarkerToUsfm(
        marker.forMarker,
        isParentSameType,
      );
      markerFragmentsInfo = closingFragmentsInfo;
      markerUsfmOutput = closingUsfm;

      // If the closing marker is supposed to be empty, there was nothing in the marker content, and
      // there are no closing marker attributes present, we need to remove the structural space after
      // the opening marker
      if (
        markerTypeInfo.hasClosingMarker &&
        markerTypeInfo.isClosingMarkerEmpty &&
        // No contents
        (!marker.forMarker.content || marker.forMarker.content.length === 0) &&
        // No closing marker attributes
        !markerUsfmOutput.startsWith('|')
      ) {
        usfmOutput = UsjReaderWriter.removeEndSpace(usfmOutput);
      }
    } else {
      const { usfm: openingUsfm, fragmentsInfo: openingFragmentsInfo } = this.openingMarkerToUsfm(
        marker,
        isParentSameType,
      );
      markerFragmentsInfo = openingFragmentsInfo;
      markerUsfmOutput = openingUsfm;
    }

    if (markerUsfmOutput.startsWith('\n')) {
      if (usfmOutput.length === 0) {
        // If the USFM is empty, don't add a newline at the start
        markerFragmentsInfo.map((fragmentInfo) => ({
          ...fragmentInfo,
          indexInUsfm: fragmentInfo.indexInUsfm - 1,
        }));
        markerUsfmOutput = markerUsfmOutput.substring(1);
      } else {
        // If there's supposed to be a newline before the marker, it should eat the last space if
        // there is one (that last space gets turned into the newline in this format)
        usfmOutput = UsjReaderWriter.removeEndSpace(usfmOutput);
      }
    }

    // Special case: `ca` after chapter marker needs a newline and space before in Paratext USFM for
    // some reason
    // Note that there is not a newline and space before `ca` after importing from USX in Paratext,
    // so maybe we should just remove the newline and space in the PDP
    if (this.markersMap.isSpaceAfterAttributeMarkersContent && markerName === 'ca') {
      // Find the last marker in the current USFM output
      const lastMarkerBackslashIndex = usfmOutput.lastIndexOf('\\');
      if (lastMarkerBackslashIndex >= 0) {
        // We just want to know if it's a chapter marker, so we can just get two characters, c and space
        const lastMarker = usfm.substring(
          lastMarkerBackslashIndex + 1,
          lastMarkerBackslashIndex + 3,
        );
        if (lastMarker === 'c ') {
          usfmOutput = UsjReaderWriter.removeEndSpace(usfmOutput);
          usfmOutput += '\n ';
        }
      }
    }

    // Add the marker fragments and USFM into the existing fragments and USFM
    if (fragmentsInfo)
      UsjReaderWriter.mergeFragmentsInfoIntoExistingArray(
        markerFragmentsInfo,
        fragmentsInfo,
        usfmOutput.length,
      );
    usfmOutput += markerUsfmOutput;

    return usfmOutput;
  }

  toUsfm() {
    return this.usfm;
  }

  // #endregion

  // #region USFM-related cached properties

  /**
   * Fill out fragments info from a minimal fragments info array and move them into the final
   * fragments map
   *
   * @param fragmentsInfo Minimal fragments info array to fill out and put into maps. ALL CONTENTS
   *   OF THIS ARRAY ARE REMOVED IN THIS METHOD
   * @param workingStack Current working stack
   * @param position Object containing properties describing where in the USFM document these
   *   fragments are. PROPERTIES ON THIS OBJECT ARE MODIFIED IN THIS METHOD
   * @param fragmentsByIndexInUsfm Map to add fragment information to
   * @param indicesInUsfmByVerseRef Map to add verse start locations to
   */
  private static transferFragmentsInfoArrayToMaps(
    fragmentsInfo: UsjFragmentInfoMinimal[],
    workingStack: WorkingStack,
    position: {
      bookId: string;
      chapterNum: number;
      verseNum: number;
    },
    fragmentsByIndexInUsfm: SortedNumberMap<UsjFragmentInfo>,
    indicesInUsfmByVerseRef: IndicesInUsfmByVerseRef,
  ) {
    // Add the extra information to each fragment to make it complete
    const fullFragmentsInfo = fragmentsInfo.map((fragmentInfo) => {
      // Adjust current verse ref if we find start of book, chapter, or verse marker
      if (typeof fragmentInfo.fragment === 'object' && 'type' in fragmentInfo.fragment) {
        const marker = fragmentInfo.fragment;

        if (marker.type === BOOK_TYPE && marker.code) {
          // Found book marker. Update current verse ref to new book
          position.bookId = marker.code;
          position.chapterNum = 0;
          position.verseNum = 0;

          // If there are any fragments before the first encountered book id, move them to the first
          // encountered book id
          if (indicesInUsfmByVerseRef[NO_BOOK_ID]) {
            indicesInUsfmByVerseRef[position.bookId] = indicesInUsfmByVerseRef[NO_BOOK_ID];
            delete indicesInUsfmByVerseRef[NO_BOOK_ID];
          }
        } else if (marker.type === CHAPTER_TYPE && marker.number) {
          // Found chapter marker. Try to update chapter
          const nextChapterNum = parseInt(marker.number, 10);

          if (Number.isNaN(nextChapterNum)) {
            console.warn(
              `Found ${CHAPTER_TYPE} type marker with number ${
                marker.number
              }, but could not parse chapter number from it. Continuing using previous chapter number ${
                position.chapterNum
              }`,
            );
          } else {
            // Update current verse ref to new chapter
            position.chapterNum = nextChapterNum;
            position.verseNum = 0;

            // If there are any fragments before the first encountered chapter number, move them to
            // the first encountered chapter number
            const currentBookFragments = indicesInUsfmByVerseRef[position.bookId];
            if (currentBookFragments?.[0]) {
              // Not array destructuring because it's really hard to read here
              // eslint-disable-next-line prefer-destructuring
              currentBookFragments[position.chapterNum] = currentBookFragments[0];
              delete currentBookFragments[0];
            }
          }
        } else if (marker.type === VERSE_TYPE && marker.number) {
          // Found verse marker. Try to update verse
          const nextVerseNumString = VERSE_MARKER_NUMBER_SPAN_REGEXP.exec(marker.number)?.[1];

          if (!nextVerseNumString) {
            console.warn(
              `Found ${VERSE_TYPE} type marker with number ${
                marker.number
              }, but could not find starting verse number in it. Continuing using previous verse number ${
                position.verseNum
              }`,
            );
          } else {
            const nextVerseNum = parseInt(nextVerseNumString, 10);

            if (Number.isNaN(nextVerseNum)) {
              console.warn(
                `Found ${VERSE_TYPE} type marker with number ${
                  marker.number
                }, but could not parse starting verse number from ${nextVerseNumString}. Continuing using previous verse number ${
                  position.verseNum
                }`,
              );
            } else if (position.verseNum === nextVerseNum) {
              console.warn(
                `Found multiple ${VERSE_TYPE} markers in a row with same number ${
                  position.verseNum
                }! Not updating verse start index. All positions will be based on the first ${
                  VERSE_TYPE
                } marker index.`,
              );
            } else if (
              indicesInUsfmByVerseRef[position.bookId]?.[position.chapterNum]?.[nextVerseNum]
            ) {
              console.warn(`Found ${VERSE_TYPE} marker with existing number ${nextVerseNum} after
                  current ${VERSE_TYPE} number ${
                    position.verseNum
                  }! Not updating verse start index. All positions in this duplicate verse will be based on the current ${
                    VERSE_TYPE
                  } marker, not the new duplicate marker.`);
            } else {
              if (nextVerseNum < position.verseNum)
                console.debug(
                  `Found ${VERSE_TYPE} marker with number ${nextVerseNum} lower than current ${
                    VERSE_TYPE
                  } number ${position.verseNum}. Verses are out of order. There may be some issues.`,
                );

              // Update current verse ref to new verse
              position.verseNum = nextVerseNum;
            }
          }
        }
      }

      // Fill out the rest of the fragment info
      const fullFragmentInfo: UsjFragmentInfo = {
        ...fragmentInfo,
        // TODO: does it make a meaningful difference if we instead convert to JSONPath? Or maybe
        // doesn't matter since this is an internal detail
        workingStack: deepClone(workingStack),
      };

      return fullFragmentInfo;
    });

    // Add staged fragments to final fragments maps
    fullFragmentsInfo.forEach((fragmentInfo) => {
      fragmentsByIndexInUsfm.set(fragmentInfo.indexInUsfm, fragmentInfo);

      // We are ensuring the properties are defined all the way through before use, so allow the
      // bang operator. This would be way more verbose without bang operator.
      /* eslint-disable no-type-assertion/no-type-assertion */
      if (!indicesInUsfmByVerseRef[position.bookId]) indicesInUsfmByVerseRef[position.bookId] = {};
      if (!indicesInUsfmByVerseRef[position.bookId]![position.chapterNum])
        indicesInUsfmByVerseRef[position.bookId]![position.chapterNum] = {};
      if (
        indicesInUsfmByVerseRef[position.bookId]![position.chapterNum]![position.verseNum] ===
        undefined
      )
        indicesInUsfmByVerseRef[position.bookId]![position.chapterNum]![position.verseNum] =
          fragmentInfo.indexInUsfm;
      /* eslint-enable no-type-assertion/no-type-assertion */
    });

    // Remove all elements from fragmentsInfo
    fragmentsInfo.splice(0);
  }

  private calculateUsfmProperties(): {
    usfm: string;
    fragmentsByIndexInUsfm: FragmentsByIndexInUsfm;
    indicesInUsfmByVerseRef: IndicesInUsfmByVerseRef;
  } {
    // Build the USFM up from the USJ content
    let usfm = '';
    // Build the fragments maps as we go
    const fragmentsByIndexInUsfm = new SortedNumberMap<UsjFragmentInfo>();
    const indicesInUsfmByVerseRef: IndicesInUsfmByVerseRef = {};

    // Temporary staging array to put fragments in before loading them into the map
    const fragmentsInfo: UsjFragmentInfoMinimal[] = [];

    // Keep track of current verse reference numbers as we go through the content so we can put
    // fragments in the right place
    const currentPosition = {
      bookId: NO_BOOK_ID,
      chapterNum: 0,
      verseNum: 0,
    };
    /** Move the fragments info that are in `fragmentsInfo` into the final fragments map */
    function transferFragmentsInfo(workingStack: WorkingStack) {
      UsjReaderWriter.transferFragmentsInfoArrayToMaps(
        fragmentsInfo,
        workingStack,
        currentPosition,
        fragmentsByIndexInUsfm,
        indicesInUsfmByVerseRef,
      );
    }

    // Special case: Opening marker of the `USJ` marker - needs to go after `id` closes in USFM even
    // though it is before it in USJ
    let usjOpeningMarker: MarkerObject | undefined;
    // Whether we have already passed the `id` marker; leave USJ markers alone after this
    let hasPassedIdMarker = false;
    // The marker objects we're currently skipping ordered as a stack (last entry is the deepest
    // marker we are skipping and therefore will be the next to close). If this has entries, it
    // means we are walking through tokens of marker objects whose opening marker we already skipped
    // and whose closing marker we should also skip outputting to USFM
    const markersToSkipOutput: MarkerObject[] = [];

    UsjReaderWriter.findNextMatchingTokenUsingWorkingStack(
      this.usj,
      // Working stack is empty since the top-level object doesn't have any parents
      [],
      // Don't skip anything
      [],
      (token, workingStack) => {
        if (typeof token !== 'object') {
          // Add the text contents USFM representation
          const { usfm: textContentUsfm, fragmentsInfo: textContentFragmentsInfo } =
            this.textContentToUsfm(token);
          UsjReaderWriter.mergeFragmentsInfoIntoExistingArray(
            textContentFragmentsInfo,
            fragmentsInfo,
            usfm.length,
          );
          transferFragmentsInfo(workingStack);
          usfm += textContentUsfm;
          return false;
        }

        // Determine this marker's parent
        let tokenParent: MarkerObject | Usj | undefined;
        if (workingStack.length > 0) {
          tokenParent = workingStack[workingStack.length - 1].parent;
        }

        if ('isClosingMarker' in token) {
          // If we are supposed to skip this marker in USFM, skip its closing marker
          if (
            markersToSkipOutput.length > 0 &&
            markersToSkipOutput[markersToSkipOutput.length - 1] === token.forMarker
          ) {
            // Indicate the skipped marker has now closed by removing it from the stack
            markersToSkipOutput.pop();
            return false;
          }

          // Add the closing marker USFM representation
          usfm = this.addMarkerUsfmToString(usfm, token, tokenParent, fragmentsInfo);
          transferFragmentsInfo(workingStack);

          // If this is closing the `id` marker (the only marker whose type is `book`), add the
          // top-level USJ opening marker after it
          if (token.forMarker.type === 'book' && !hasPassedIdMarker) {
            if (usjOpeningMarker) {
              usfm = this.addMarkerUsfmToString(usfm, usjOpeningMarker, tokenParent, fragmentsInfo);
              transferFragmentsInfo(workingStack);
            }

            hasPassedIdMarker = true;
          }

          return false;
        }

        // If we are supposed to skip this marker in USFM, skip its opening marker
        if (this.shouldSkipOutputMarkerToUsfm(token)) {
          markersToSkipOutput.push(token);
          return false;
        }

        // If this is the USJ marker at the start of the doc, save it until after `id` marker closes
        if (!hasPassedIdMarker && UsjReaderWriter.isUsjMarker(token) && !usjOpeningMarker) {
          // The USJ types aren't set up to know about 3.0 right now, but we should handle it anyway
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          if ((token.version as string) !== '3.0') {
            // Special case: don't output the USJ marker if it is 3.0 (3.0 is assumed and should not
            // appear in the USFM)
            usjOpeningMarker = token;
          }
          return false;
        }

        // Add the opening marker USFM representation
        usfm = this.addMarkerUsfmToString(usfm, token, tokenParent, fragmentsInfo);
        transferFragmentsInfo(workingStack);

        // Keep going through the whole document
        return false;
      },
    );

    // Always add newline at the end of the file; likely replaces a space
    usfm = `${UsjReaderWriter.removeEndSpace(usfm)}\n`;

    return { usfm, fragmentsByIndexInUsfm, indicesInUsfmByVerseRef };
  }

  private get usfm(): string {
    if (this.usfmInternal !== undefined) return this.usfmInternal;

    ({
      usfm: this.usfmInternal,
      fragmentsByIndexInUsfm: this.fragmentsByIndexInUsfmInternal,
      indicesInUsfmByVerseRef: this.indicesInUsfmByVerseRefInternal,
    } = this.calculateUsfmProperties());

    return this.usfmInternal;
  }

  private get fragmentsByIndexInUsfm(): FragmentsByIndexInUsfm {
    if (this.fragmentsByIndexInUsfmInternal) return this.fragmentsByIndexInUsfmInternal;

    ({
      usfm: this.usfmInternal,
      fragmentsByIndexInUsfm: this.fragmentsByIndexInUsfmInternal,
      indicesInUsfmByVerseRef: this.indicesInUsfmByVerseRefInternal,
    } = this.calculateUsfmProperties());

    return this.fragmentsByIndexInUsfmInternal;
  }

  private get indicesInUsfmByVerseRef(): IndicesInUsfmByVerseRef {
    if (this.indicesInUsfmByVerseRefInternal) return this.indicesInUsfmByVerseRefInternal;

    ({
      usfm: this.usfmInternal,
      fragmentsByIndexInUsfm: this.fragmentsByIndexInUsfmInternal,
      indicesInUsfmByVerseRef: this.indicesInUsfmByVerseRefInternal,
    } = this.calculateUsfmProperties());

    return this.indicesInUsfmByVerseRefInternal;
  }

  // #endregion
}

export default UsjReaderWriter;
