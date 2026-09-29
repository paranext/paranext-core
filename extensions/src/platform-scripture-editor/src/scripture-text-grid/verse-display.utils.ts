import { Usj, MarkerObject, MarkerContent } from '@eten-tech-foundation/scripture-utilities';

/**
 * The verse a SINGLE-VERSE display surface should show for a focused reference: verse 0 shows verse
 * 1, everything else shows itself.
 *
 * Verse 0 is everything preceding verse 1 (intros, titles, Psalm superscriptions), which a
 * one-verse-tall cell cannot render usefully — so Paratext 9 shows verse 1 there and single-verse
 * surfaces here match it. Display-only: callers must not write the resolved verse back to the
 * scroll group.
 *
 * Chapter surfaces must NOT call this — they show verse-0 front matter directly. Full rationale and
 * rejected alternatives: `adr-single-verse-surfaces-resolve-verse-zero-to-one`.
 *
 * @param verseNum Non-negative integer verse number, as carried by `SerializedVerseRef`. Only `0`
 *   is special-cased; anything else is returned unchanged, so a negative or fractional value passes
 *   through and then slices to nothing, surfacing as the empty state rather than as an error. That
 *   is unreachable through today's callers, but matters if this is promoted to
 *   `lib/platform-bible-utils` (see `adr-single-verse-surfaces-resolve-verse-zero-to-one`), where
 *   callers lose that guarantee.
 */
export function resolveDisplayVerseNum(verseNum: number): number {
  return verseNum === 0 ? 1 : verseNum;
}

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
 *
 * Deliberately hand-scoped to heading markers that can appear MID-CHAPTER (chapter-interior
 * structural boundaries). Not derived from `usfmMarkers`' TitlesHeadings category in
 * `platform-bible-utils`, which also includes book-front titles (`mt`, `mte`, ...) that cannot
 * interrupt a verse mid-chapter (and categorizes `qa` as Poetry, so it would need a special case
 * anyway).
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
  return typeof node === 'object';
}
function isVerseOpener(node: MarkerContent): node is MarkerObject {
  return isMarkerObject(node) && node.type === 'verse' && node.number !== undefined;
}

/**
 * Highest verse number the aligned grid emits a row rule for. Duplicated from
 * `MAX_ALIGNED_VERSE_ROWS` rather than imported so this module stays free of the grid's stylesheet
 * (and so of React); `aligned-grid.styles.test.ts` fails if the two drift apart.
 */
export const MAX_PLACEABLE_VERSE_FOR_EMPTY_STATE = 200;

/** Whether a verse marker resolves to a range the aligned grid has a row rule for. */
function isPlaceableVerseMarker(marker: string): boolean {
  const { start, end } = parseVerseRange(marker);
  if (Number.isNaN(start) || Number.isNaN(end)) return false;
  // Upstream drops both range attributes for a reversed or unparsable range, and the generated row
  // rules only cover 1..MAX_PLACEABLE_VERSE_FOR_EMPTY_STATE — a block outside that is hidden, not placed.
  return start >= 1 && start <= end && end <= MAX_PLACEABLE_VERSE_FOR_EMPTY_STATE;
}

/** Whether any verse opener anywhere under `content` resolves to a placeable range. */
function hasPlaceableVerseOpener(content: MarkerContent[] | undefined): boolean {
  if (!Array.isArray(content)) return false;
  return content.some((node) => {
    if (!isMarkerObject(node)) return false;
    if (isVerseOpener(node) && isPlaceableVerseMarker(String(node.number))) return true;
    return hasPlaceableVerseOpener(Array.isArray(node.content) ? node.content : undefined);
  });
}

/**
 * Whether the chapter has a verse the aligned grid could place on a row.
 *
 * This asks the layout's question, not the model's: that view shows only verse blocks it can place
 * on a shared row and hides everything else, so a chapter whose every verse marker is unplaceable
 * renders a blank column just as surely as one with no verse markers at all. It therefore checks
 * that a marker resolves to a range the generated row rules cover, and searches the whole paragraph
 * subtree, because the editor groups verses from nested content too — a marker one level down would
 * render fine and be wrongly gated out by a direct-children-only check.
 *
 * Only paragraphs count: the editor makes no verse block for a verse inside a table or sidebar, so
 * those would not show either.
 *
 * @param usj The chapter to inspect.
 * @returns True when at least one paragraph opens a verse the grid can place.
 */
export function hasAlignableVerse(usj: Usj): boolean {
  return usj.content.some(
    (node) =>
      isMarkerObject(node) &&
      node.type === 'para' &&
      hasPlaceableVerseOpener(Array.isArray(node.content) ? node.content : undefined),
  );
}

/**
 * Whether the chapter has any renderable text at all, verse-shaped or not.
 *
 * Tells "this chapter has content the other views can show" from "this chapter is empty", which is
 * what decides whether pointing the reader at another view is useful advice or a dead end. A book
 * created before any text is entered arrives as a successful, empty chapter rather than as an
 * error.
 *
 * @param usj The chapter to inspect.
 * @returns True when some marker in the chapter carries non-whitespace text.
 */
export function hasAnyRenderableText(usj: Usj): boolean {
  // Recurses through every marker type, unlike `hasRenderableText`, which only descends into `char`
  // because it inspects an already-sliced single verse.
  const walk = (content: MarkerContent[] | undefined): boolean => {
    if (!Array.isArray(content)) return false;
    return content.some((node) => {
      if (typeof node === 'string') return node.trim().length > 0;
      if (!isMarkerObject(node)) return false;
      // `book` and `chapter` are chrome, not text the reader came for.
      if (node.type === 'book' || node.type === 'chapter') return false;
      return walk(Array.isArray(node.content) ? node.content : undefined);
    });
  };
  return walk(usj.content);
}

/**
 * Slices a chapter USJ down to a single verse. Walks the chapter's top-level paragraphs in document
 * order, collecting the target verse's content PER PARAGRAPH (so poetry `q1`/`q2` stay as separate
 * paragraphs). `usxStringToUsj` (the only USJ producer we consume) drops eid-only verse closers, so
 * there is no closer marker to look for; collection for a verse ends when the next verse opener is
 * hit or a structural/heading paragraph is reached; drops `book`/`chapter` chrome. Emits a
 * combined-verse marker (e.g. `"14-15"`) exactly once (PT-3495). `isEmpty` is true when the slice
 * has no renderable text — the verse is absent from this resource, or present but whitespace-only —
 * which callers render as an empty state rather than blanking the row.
 *
 * Purely mechanical: slices the verse you ask for. Surfaces taking their verse from a focused
 * reference must pass it through {@link resolveDisplayVerseNum} first — a raw verse 0 slices to
 * nothing.
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
    if (node.type === 'book' || node.type === 'chapter') {
      // Chrome is dropped AND acts as a boundary: an open verse never crosses a chapter marker.
      active = false;
      return;
    }
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
