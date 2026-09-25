/**
 * Helpers for specs that address the scripture editor by USJ position through the web view
 * controller network object (`object:webViewController<webViewId>.…`), the same surface extensions
 * use. The offsets come from the chapter's own USJ, read from the project data provider that feeds
 * the editor — the offsets a real caller (a checks result, a comment anchor) computes.
 */
import {
  LAUNCH_PHASE_TIMEOUT_MS,
  sendPapiRequestOnce,
  waitForPapiMethodRegistered,
} from './helpers';
import { SAMPLE_WEB_PROJECT_ID } from './scripture-editor-helpers';

const WEBSOCKET_PORT = 8876;
const REQUEST_TIMEOUT_MS = 30_000;

/** The PDP factory that layers the USJ `projectInterface`s over the C# Paratext projects. */
const SCRIPTURE_EXTENDER_PDP_ID_METHOD =
  'object:platformScripture.scriptureExtenderPdpf-pdpf.getProjectDataProviderId';

/** A verse reference in the serialized shape the PDP and `ScriptureRange` locations take. */
export interface SerializedVerseRef {
  book: string;
  chapterNum: number;
  verseNum: number;
}

/** A USJ node: a marker object whose `content` holds text and further marker objects. */
export interface UsjMarkerObject {
  type: string;
  marker?: string;
  /** The verse or chapter number a `type: 'verse'` / `type: 'chapter'` node carries. */
  number?: string;
  content?: (string | UsjMarkerObject)[];
}

/** The USJ document the PDP returns for one chapter. */
export interface UsjDocument {
  content?: (string | UsjMarkerObject)[];
}

/** Where a char span's text sits in a USJ document, in the coordinates the editor is addressed in. */
export interface CharSpanTextLocation {
  /** JSONPath to the text string itself, e.g. `$.content[6].content[1].content[0]`. */
  jsonPath: string;
  /** The text string at that path. */
  text: string;
}

/** A document location as the editor reports it back through `getSelection`. */
export interface ReportedDocumentLocation {
  jsonPath?: string;
  offset?: number;
}

/** The selection shape `getSelection` resolves to (`ScriptureRangeUsjVerseRefChapterLocation`). */
export interface ReportedSelection {
  start?: { documentLocation?: ReportedDocumentLocation };
  end?: { documentLocation?: ReportedDocumentLocation };
}

/** Build the JSONPath for a chain of `content` indexes, the form USJ document locations use. */
export function contentJsonPath(indexes: readonly number[]): string {
  return indexes.reduce((path, index) => `${path}.content[${index}]`, '$');
}

/**
 * Depth-first search for the first char span with `marker` whose content starts with plain text,
 * returning that text and its JSONPath. Recursive rather than index-arithmetic against a known
 * shape so the location stays correct if the chapter gains or loses content before the span.
 */
export function findCharSpanText(
  content: readonly (string | UsjMarkerObject)[],
  marker: string,
  indexes: readonly number[] = [],
): CharSpanTextLocation | undefined {
  return content.reduce<CharSpanTextLocation | undefined>((found, node, index) => {
    if (found || typeof node === 'string') return found;
    const nodeIndexes = [...indexes, index];
    const children = node.content ?? [];
    if (node.type === 'char' && node.marker === marker) {
      const textIndex = children.findIndex((child) => typeof child === 'string');
      const text = children[textIndex];
      if (typeof text === 'string')
        return { jsonPath: contentJsonPath([...nodeIndexes, textIndex]), text };
    }
    return findCharSpanText(children, marker, nodeIndexes);
  }, undefined);
}

/**
 * Where a verse's own opening text sits in a USJ document: its JSONPath, its text, and the full
 * `content` index chain to it (so a caller can derive a SIBLING'S path by index arithmetic — e.g.
 * the text that lands after a marker inserted mid-string, which takes this text's own index plus 2,
 * once the array holds text-before/marker/text-after in place of the one original string).
 */
export interface VerseTextLocation extends CharSpanTextLocation {
  /** The index chain to the text node itself, i.e. the indexes segment `jsonPath` encodes. */
  indexes: readonly number[];
}

/**
 * Depth-first search for the `type: 'verse'` marker whose `number` is `verseNumber`, returning the
 * plain text string immediately following it in the same content array — the verse's own opening
 * text — together with its JSONPath and index chain. A location computed from this text against a
 * chapter USJ read BEFORE some other, unrelated edit stays valid through that edit as long as the
 * edit lands in a DIFFERENT paragraph: paragraphs are sibling entries in the chapter's own
 * `content` array, so splitting a string inside one paragraph never renumbers another paragraph's
 * own children. An edit that splits THIS SAME text (a marker typed mid-verse) is still computable
 * from this one read: it replaces this text's single array slot with up to three new slots (text
 * before, the new marker, text after) in the same position, so a caller can derive the split
 * siblings' own paths from `indexes` without a second read.
 */
export function findVerseText(
  content: readonly (string | UsjMarkerObject)[],
  verseNumber: string,
  indexes: readonly number[] = [],
): VerseTextLocation | undefined {
  return content.reduce<VerseTextLocation | undefined>((found, node, index) => {
    if (found || typeof node === 'string') return found;
    const nodeIndexes = [...indexes, index];
    if (node.type === 'verse' && node.number === verseNumber) {
      const textIndexes = [...indexes, index + 1];
      const next = content[index + 1];
      return typeof next === 'string'
        ? { jsonPath: contentJsonPath(textIndexes), text: next, indexes: textIndexes }
        : undefined;
    }
    return findVerseText(node.content ?? [], verseNumber, nodeIndexes);
  }, undefined);
}

/**
 * Read one chapter of the sample WEB project's USJ straight from the project data provider — the
 * editor's own source, and the oracle the editor's answers are measured against.
 */
export async function getChapterUsj(verseRef: SerializedVerseRef): Promise<UsjDocument> {
  await waitForPapiMethodRegistered(
    SCRIPTURE_EXTENDER_PDP_ID_METHOD,
    WEBSOCKET_PORT,
    LAUNCH_PHASE_TIMEOUT_MS,
  );
  const pdpId = await sendPapiRequestOnce<string>(
    SCRIPTURE_EXTENDER_PDP_ID_METHOD,
    [SAMPLE_WEB_PROJECT_ID],
    WEBSOCKET_PORT,
    REQUEST_TIMEOUT_MS,
  );
  // A PDP's network object carries a `-data` suffix on top of the id its factory reports (the
  // platform's own `getDataProviderObjectId` rule). The C# factories report the suffixed name
  // already; the TypeScript layering factory this one comes from reports the bare id.
  const pdpObjectId = pdpId.endsWith('-data') ? pdpId : `${pdpId}-data`;
  return sendPapiRequestOnce<UsjDocument>(
    `object:${pdpObjectId}.getChapterUSJ`,
    [verseRef],
    WEBSOCKET_PORT,
    REQUEST_TIMEOUT_MS,
  );
}

/** JSON-RPC method name for one method on an editor's web view controller network object. */
export function webViewControllerMethod(editorId: string, method: string): string {
  return `object:webViewController${editorId}.${method}`;
}

/** A chapter-relative USJ location for `jsonPath` at `offset`, the shape a `ScriptureRange` takes. */
export function chapterLocation(verseRef: SerializedVerseRef, jsonPath: string, offset: number) {
  return {
    verseRef,
    granularity: 'chapter',
    documentLocation: { jsonPath, offset },
  };
}

/** Send one request to an editor's web view controller. */
export async function sendToEditorController<T = unknown>(
  editorId: string,
  method: string,
  params: unknown[],
): Promise<T> {
  return sendPapiRequestOnce<T>(
    webViewControllerMethod(editorId, method),
    params,
    WEBSOCKET_PORT,
    REQUEST_TIMEOUT_MS,
  );
}

/** Wait until the editor's web view controller answers `method`. */
export async function waitForEditorControllerMethod(
  editorId: string,
  method: string,
): Promise<void> {
  await waitForPapiMethodRegistered(
    webViewControllerMethod(editorId, method),
    WEBSOCKET_PORT,
    LAUNCH_PHASE_TIMEOUT_MS,
  );
}

/** The editor's current selection, or undefined while the controller is still waiting for one. */
export async function readEditorSelection(
  editorId: string,
): Promise<ReportedSelection | undefined> {
  try {
    return await sendToEditorController<ReportedSelection>(editorId, 'getSelection', []);
  } catch {
    // The controller blocks its first caller until the editor reports a selection, so a slow
    // first report is a retry, not a result.
    return undefined;
  }
}
