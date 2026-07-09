import { Usj, MarkerObject, MarkerContent } from '@eten-tech-foundation/scripture-utilities';

/**
 * Parses a (possibly combined/partial) verse marker into a numeric range. `"5"` → `{5,5}`,
 * `"14-15"` → `{14,15}`, `"1-3a"` → `{1,3}`, `"3a"` → `{3,3}`. Non-numeric → `{NaN,NaN}`.
 */
export function parseVerseRange(marker: string): { start: number; end: number } {
  const parts = marker.split('-');
  const start = parseInt(parts[0], 10);
  const end = parts.length > 1 ? parseInt(parts[parts.length - 1], 10) : start;
  return { start, end };
}

/** Whether a (possibly combined) verse marker covers `verseNum`. */
export function verseRangeIncludes(marker: string, verseNum: number): boolean {
  const { start, end } = parseVerseRange(marker);
  if (Number.isNaN(start) || Number.isNaN(end)) return false;
  return verseNum >= start && verseNum <= end;
}

/**
 * Paragraph markers that begin a heading/structural block (not verse content). Slicing stops at
 * these so a following section header does not leak into the prior verse.
 */
const STRUCTURAL_MARKERS = new Set([
  's',
  's1',
  's2',
  's3',
  's4',
  'ms',
  'ms1',
  'ms2',
  'ms3',
  'mr',
  'r',
  'd',
  'sp',
  'sr',
  'qa',
]);

function isMarkerObject(node: MarkerContent): node is MarkerObject {
  return typeof node === 'object' && node !== null;
}
function isVerseOpener(node: MarkerContent): node is MarkerObject {
  return isMarkerObject(node) && node.type === 'verse' && node.number !== undefined;
}

/**
 * Slices a chapter USJ down to a single verse. Walks the chapter's top-level paragraphs in document
 * order, collecting the target verse's content PER PARAGRAPH (so poetry `q1`/`q2` stay as separate
 * paragraphs). `usxStringToUsj` (the only USJ producer we consume) drops eid-only verse closers, so
 * there is no closer marker to look for; collection for a verse ends when the next verse opener is
 * hit or a structural/heading paragraph is reached; drops `book`/`chapter` chrome. Emits a
 * combined-verse marker (e.g. `"14-15"`) exactly once (PT-3495). `isEmpty` is true when the verse
 * has no renderable text — e.g. verse-0 or a verse missing from this resource (PT-3133).
 */
export function sliceUsjToVerse(usj: Usj, verseNum: number): { usj: Usj; isEmpty: boolean } {
  const resultContent: MarkerContent[] = [];
  // Persists across paragraphs so a verse that spans multiple poetry lines is collected whole.
  let active = false;

  const collectFromParagraph = (para: MarkerObject): MarkerObject | undefined => {
    const collected: MarkerContent[] = [];
    const items = Array.isArray(para.content) ? para.content : [];
    items.forEach((item) => {
      if (isVerseOpener(item)) {
        active = verseRangeIncludes(String(item.number), verseNum);
        if (active) collected.push(item);
      } else if (active) {
        collected.push(item);
      }
    });
    if (collected.length === 0) return undefined;
    return { ...para, content: collected };
  };

  usj.content.forEach((node) => {
    if (!isMarkerObject(node)) return;
    if (node.type === 'book' || node.type === 'chapter') return; // drop chrome
    if (node.type !== 'para') return;
    if (node.marker && STRUCTURAL_MARKERS.has(node.marker)) {
      active = false; // heading is a boundary; close any open verse
      return;
    }
    const sliced = collectFromParagraph(node);
    if (sliced) resultContent.push(sliced);
  });

  const isEmpty = !resultContent.some((p) => isMarkerObject(p) && hasRenderableText(p.content));
  return { usj: { type: usj.type, version: usj.version, content: resultContent }, isEmpty };
}

/** Whether any renderable (non-whitespace) text exists in the given content tree. */
function hasRenderableText(content: MarkerContent[] | undefined): boolean {
  if (!Array.isArray(content)) return false;
  return content.some((item) => {
    if (typeof item === 'string') return item.trim().length > 0;
    if (isMarkerObject(item) && item.type === 'char') return hasRenderableText(item.content);
    return false;
  });
}
