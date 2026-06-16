// xmldom returns generic Node types; we narrow to XElement via duck-typed casts
// at element boundaries since the types from @xmldom/xmldom are loose. The
// MarbleMarker shape ((MarkerObject & Record<string, unknown>)) likewise needs
// casts to write marble-specific attrs that the editor preserves via its
// __unknownAttributes mechanism. xmldom's child-list APIs may surface either
// undefined or null for "absent", so we coalesce both at boundaries.
/* eslint-disable no-type-assertion/no-type-assertion, no-null/no-null */
import { DOMParser } from '@xmldom/xmldom';
import {
  USJ_TYPE,
  USJ_VERSION,
  type MarkerObject,
  type Usj,
} from '@eten-tech-foundation/scripture-utilities';

/**
 * Marble-aware USX→USJ converter (FN-014).
 *
 * Consumes a chapter-scoped marble XML string (as returned by backend M-019 `loadMarbleChapterXml`,
 * with stable `id="..."` already stamped on each `<wg>` and `<note>` element) and produces:
 *
 * - A clean USJ document the platform-scripture-editor can render in read-only mode (FN-013: `wg` is
 *   in the editor's recognized USFM char marker list, alongside w/wa/wh/wj)
 * - An annotation map of `(usjPath, kind, annotationId, metadata)` triples - the IDs are forwarded
 *   verbatim to backend `buildTooltipData` / `buildNoteData` PAPI commands.
 *
 * Why not reuse `usxStringToUsj` from scripture-utilities? Marble XML is a non-standard variant: it
 * wraps content in `<usx_book>` (no outer `<usx><book>` shell), uses `chapter="N"`/`pubnumber="N"`
 * attribute names, and emits `<wg>` (not present in standard USX). Direct walking gives full
 * control over how marble attrs (strong, target_links, ...) are surfaced on emitted MarkerObjects
 * so the editor's `__unknownAttributes` mechanism preserves them through round-trips.
 */

/** Discriminator for annotation kind. */
export type MarbleAnnotationKind = 'word' | 'note';

/** Marble attributes captured at conversion time, used at click-time. */
export interface MarbleAnnotationMetadata {
  /** Strong's number (e.g. "H7225"). Word-kind only. */
  strong?: string;
  /** Target_links semicolon-delimited values, split. Word-kind only. */
  targetLinks?: string[];
  /** Thematic_links values, split. Word-kind only. */
  thematicLinks?: string[];
  /** Lexical_links values, split. Word-kind only. */
  lexicalLinks?: string[];
  /** Image_links values, split. Word-kind only. */
  imageLinks?: string[];
  /** Map_links values, split. Word-kind only. */
  mapLinks?: string[];
  /** Verse number this word belongs to, captured at conversion time. Word-kind only. */
  verseNum?: number;
  /** Caller character ('+', 'a', 'b', etc.). Note-kind only. */
  caller?: string;
  /** Raw inner XML of the note element. Note-kind only. */
  innerXml?: string;
}

/**
 * One annotation - either for a marble word (`<wg>`) or a note (`<note>`). `usjPath` resolves to
 * the corresponding MarkerObject in the emitted USJ.
 */
export interface MarbleAnnotation {
  usjPath: string;
  kind: MarbleAnnotationKind;
  annotationId: string;
  metadata: MarbleAnnotationMetadata;
}

/** Output of the converter. */
export interface MarbleConversionResult {
  usj: Usj;
  annotations: MarbleAnnotation[];
}

/**
 * Marker objects with arbitrary marble attributes. The base MarkerObject type does not include
 * these, but the editor's `__unknownAttributes` mechanism preserves them, so we surface them as
 * additional fields.
 */
type MarbleMarker = MarkerObject & Record<string, unknown>;

/**
 * Convert a marble chapter XML string to USJ + annotation map.
 *
 * Throws when input is empty, malformed, or has no `<usx_book>` root.
 */
export function convertMarbleChapterXml(marbleChapterXml: string): MarbleConversionResult {
  if (!marbleChapterXml || marbleChapterXml.trim() === '') {
    throw new Error('marble-converter: input XML is empty');
  }

  let parseError: Error | undefined;
  const parser = new DOMParser({
    errorHandler: {
      error: (msg: unknown) => {
        parseError ??= new Error(`marble-converter: XML parse error: ${String(msg)}`);
      },
      fatalError: (msg: unknown) => {
        parseError ??= new Error(`marble-converter: XML parse fatal error: ${String(msg)}`);
      },
    },
  });

  const doc = parser.parseFromString(marbleChapterXml, 'text/xml');
  if (parseError) throw parseError;

  // xmldom's documentElement is typed as HTMLElement which doesn't match our
  // looser XNode shape; bridge via unknown.
  const usxBook = findUsxBook(doc.documentElement as unknown as XNode | undefined);
  if (!usxBook) {
    throw new Error('marble-converter: no <usx_book> root element found in input XML');
  }

  const annotations: MarbleAnnotation[] = [];
  const usj: Usj = { type: USJ_TYPE, version: USJ_VERSION, content: [] };

  walkChildren(usxBook, usj.content, '$', annotations, { value: 0 });

  return { usj, annotations };
}

// -- DOM helpers ------------------------------------------------------------

type XNode = {
  nodeType: number;
  nodeName: string;
  nodeValue: string | undefined;
  childNodes: { length: number; item: (i: number) => XNode | undefined };
  attributes?: { length: number; item: (i: number) => XAttr | undefined };
  toString: () => string;
};
type XElement = XNode & {
  tagName: string;
  getAttribute: (name: string) => string;
};
type XAttr = { name: string; value: string };

const NODE_TYPE_ELEMENT = 1;
const NODE_TYPE_TEXT = 3;
const NODE_TYPE_CDATA = 4;

function findUsxBook(root: XNode | undefined): XElement | undefined {
  if (!root) return undefined;

  // Iterative depth-first search (avoids for-of and recursion fall-throughs).
  const stack: XNode[] = [root];
  while (stack.length > 0) {
    const node = stack.pop()!;
    if (node.nodeType === NODE_TYPE_ELEMENT && (node as XElement).tagName === 'usx_book') {
      return node as XElement;
    }
    // Push children in reverse so DFS order matches document order.
    getChildren(node)
      .slice()
      .reverse()
      .forEach((c) => stack.push(c));
  }
  return undefined;
}

function getChildren(node: XNode): XNode[] {
  return Array.from({ length: node.childNodes.length }, (_, i) => node.childNodes.item(i)).filter(
    // xmldom returns undefined past the end of the list (a few build setups
    // surface null). Treat both falsy values as "absent".
    (c): c is XNode => c !== undefined && c !== null,
  );
}

// -- USJ generation ---------------------------------------------------------

type ContentItem = string | MarkerObject;

function walkChildren(
  parent: XNode,
  output: ContentItem[],
  parentPath: string,
  annotations: MarbleAnnotation[],
  currentVerseNum: { value: number } = { value: 0 },
): void {
  getChildren(parent).forEach((node) => {
    if (node.nodeType === NODE_TYPE_TEXT || node.nodeType === NODE_TYPE_CDATA) {
      const text = collapseWhitespace(node.nodeValue ?? '');
      if (text.length > 0) output.push(text);
      return;
    }
    if (node.nodeType !== NODE_TYPE_ELEMENT) return;

    const childPath = `${parentPath}.content[${output.length}]`;
    const emitted = walkElement(node as XElement, childPath, annotations, currentVerseNum);
    if (emitted) output.push(emitted);
  });
}

function walkElement(
  el: XElement,
  path: string,
  annotations: MarbleAnnotation[],
  currentVerseNum: { value: number },
): MarkerObject | undefined {
  switch (el.tagName) {
    case 'chapter':
      return emitChapter(el);
    case 'verse': {
      const verseMarker = emitVerse(el);
      const parsed = parseInt(verseMarker.number ?? '0', 10);
      if (parsed > 0) currentVerseNum.value = parsed;
      return verseMarker;
    }
    case 'para':
      return emitContainer(el, 'para', path, annotations, currentVerseNum);
    case 'char':
      return emitContainer(el, 'char', path, annotations, currentVerseNum);
    case 'wg':
      return emitWg(el, path, annotations, currentVerseNum.value);
    case 'note':
      return emitNote(el, path, annotations);
    case 'ref':
      return emitRef(el);
    default:
      return emitContainer(el, el.tagName, path, annotations, currentVerseNum);
  }
}

function emitChapter(el: XElement): MarkerObject {
  // Marble emits `chapter="N"`; standard USX emits `number="N"`. xmldom's
  // getAttribute returns "" for missing attrs; fall back via emptiness, not
  // nullish-coalescing. Marble's `code="GEN"` attribute on <chapter> duplicates
  // the book code from <usx_book code="GEN">; drop here since MarkerObject.code
  // is BookCode-narrowed and not useful on the chapter marker.
  const number = firstNonEmpty(el.getAttribute('chapter'), el.getAttribute('number'));
  return { type: 'chapter', marker: 'c', number };
}

function emitVerse(el: XElement): MarkerObject {
  // Marble emits `pubnumber="N"`; standard USX emits `number="N"`.
  const number = firstNonEmpty(el.getAttribute('pubnumber'), el.getAttribute('number'));
  return { type: 'verse', marker: 'v', number };
}

function emitContainer(
  el: XElement,
  type: string,
  path: string,
  annotations: MarbleAnnotation[],
  currentVerseNum: { value: number },
): MarkerObject {
  const styleAttr = el.getAttribute('style');
  const marker = styleAttr.length > 0 ? styleAttr : type;
  const out: MarkerObject = { type, marker, content: [] };
  walkChildren(el, out.content!, path, annotations, currentVerseNum);
  return out;
}

const WG_LINK_ATTRS: readonly string[] = [
  'target_links',
  'thematic_links',
  'lexical_links',
  'image_links',
  'map_links',
  'textual_links',
];

// FN-029 (Session 2 follow-up): `<wg>` is intentionally retained as a `char` MarkerObject
// with marker="wg" because the annotation infrastructure anchors ranges to markers via
// closingMarkerOffset (scripture-pane.component.tsx:annotationToRange). Dropping the marker
// would break range computation. The unwanted side-effect — every <wg> renders with
// title="wg" in the browser via CharNode.createDOM():207 — is tracked as FN-029 and
// addressed editor-side in Session 2 by making the title attribute suppressible via a new
// ViewOptions.showCharMarkerTitles option. See working-docs/2026-05-04-pt9-fidelity-session-1-design.md §7.
function emitWg(
  el: XElement,
  path: string,
  annotations: MarbleAnnotation[],
  verseNum: number,
): MarbleMarker {
  // Marble <wg> is an inline tagged word; emit as a `char` MarkerObject with
  // `marker="wg"`. The editor recognizes "wg" via its USFM char marker list
  // (FN-013), and the editor's __unknownAttributes mechanism preserves
  // marble's inline attrs (strong, target_links, ...) on the char node.
  const node: MarbleMarker = { type: 'char', marker: 'wg', content: [collectText(el)] };

  // Surface marble attrs as direct properties so the editor preserves them.
  const strong = el.getAttribute('strong');
  if (strong.length > 0) node.strong = strong;
  WG_LINK_ATTRS.forEach((attrName) => {
    const value = el.getAttribute(attrName);
    if (value.length > 0) node[attrName] = value;
  });

  const id = el.getAttribute('id');
  if (id.length > 0) {
    node.id = id;
    // A <wg> is treated as a research term only when it carries at least one link attribute
    // that drives a user-visible research surface: `lexical_links` (gloss / dictionary),
    // `thematic_links` (thematic categories), `image_links` (media tab), or `map_links` (maps).
    // `target_links` alone does NOT qualify - those are cross-reference pointers to other
    // verses (no gloss, no dictionary entry, nothing to render in any research tab), so PT9
    // leaves target-only words unhighlighted. The <wg> MarkerObject is still emitted so the
    // text content displays; only the annotation is skipped, which gates all overlays, hover,
    // and click filter behavior for this word. (See Gen 26:8 "When" - target_links only.)
    const targetLinks = splitLinks(el.getAttribute('target_links'));
    const thematicLinks = splitLinks(el.getAttribute('thematic_links'));
    const lexicalLinks = splitLinks(el.getAttribute('lexical_links'));
    const imageLinks = splitLinks(el.getAttribute('image_links'));
    const mapLinks = splitLinks(el.getAttribute('map_links'));
    const hasResearchLink =
      lexicalLinks.length > 0 ||
      thematicLinks.length > 0 ||
      imageLinks.length > 0 ||
      mapLinks.length > 0;
    if (hasResearchLink) {
      annotations.push({
        usjPath: path,
        kind: 'word',
        annotationId: id,
        metadata: {
          strong: strong.length > 0 ? strong : undefined,
          targetLinks,
          thematicLinks,
          lexicalLinks,
          imageLinks,
          mapLinks,
          verseNum: verseNum > 0 ? verseNum : undefined,
        },
      });
    }
  }

  return node;
}

function emitNote(el: XElement, path: string, annotations: MarbleAnnotation[]): MarbleMarker {
  const styleAttr = el.getAttribute('style');
  const marker = styleAttr.length > 0 ? styleAttr : 'f';
  const node: MarbleMarker = { type: 'note', marker, content: [] };

  const caller = el.getAttribute('caller');
  if (caller.length > 0) node.caller = caller;

  walkChildren(el, node.content as ContentItem[], path, annotations);

  const id = el.getAttribute('id');
  if (id.length > 0) {
    node.id = id;
    annotations.push({
      usjPath: path,
      kind: 'note',
      annotationId: id,
      metadata: {
        caller: caller.length > 0 ? caller : undefined,
        innerXml: getInnerXml(el),
      },
    });
  }

  return node;
}

function emitRef(el: XElement): MarkerObject {
  const out: MarbleMarker = { type: 'ref', marker: 'ref', content: [collectText(el)] };
  const loc = el.getAttribute('loc');
  if (loc.length > 0) out.loc = loc;
  return out;
}

// -- attribute / text helpers ----------------------------------------------

function collectText(el: XElement): string {
  const buf = getChildren(el).reduce((acc, child) => {
    if (child.nodeType === NODE_TYPE_TEXT || child.nodeType === NODE_TYPE_CDATA) {
      return acc + (child.nodeValue ?? '');
    }
    if (child.nodeType === NODE_TYPE_ELEMENT) {
      return acc + collectText(child as XElement);
    }
    return acc;
  }, '');
  return collapseWhitespace(buf);
}

function getInnerXml(el: XElement): string {
  return getChildren(el)
    .map((c) => c.toString())
    .join('');
}

/**
 * Match MarbleTokenParser's whitespace handling: skip text that's purely whitespace AND contains a
 * newline (XML formatting indentation), but keep inline single-space separators.
 */
function collapseWhitespace(text: string): string {
  if (!text) return '';
  if (text.trim() === '' && text.includes('\n')) return '';
  return text;
}

function splitLinks(value: string): string[] {
  if (!value) return [];
  return value.split(';').filter((s) => s.length > 0);
}

function firstNonEmpty(...values: string[]): string {
  return values.find((v) => v && v.length > 0) ?? '';
}
