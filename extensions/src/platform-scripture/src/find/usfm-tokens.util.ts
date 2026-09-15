import { isBlockMarker, MarkerType, usfmMarkers, USFM_MARKERS_MAP_3_0 } from 'platform-bible-utils';

/**
 * Matches a USFM backslash marker token: optional `+` nesting, a marker name with optional numeric
 * suffix and optional `-N` column span (e.g. `q1`, `thc3-4`), and an optional closing `*`.
 *
 * Exported so that every consumer in the Find folder tokenizes USFM the same way. Use
 * {@link forEachMarkerToken} rather than this constant directly unless you need the raw pattern — a
 * `g`-flagged regex carries `lastIndex` state and must not be shared between loops.
 */
export const MARKER_TOKEN_PATTERN = String.raw`\\\+?([a-z]+\d*(?:-\d+)?)\*?`;

/** Calls `callback` for each USFM marker token in `usfm`, in order. */
export function forEachMarkerToken(
  usfm: string,
  callback: (marker: string, matchEndIndex: number) => void,
): void {
  const regex = new RegExp(MARKER_TOKEN_PATTERN, 'g');
  let match = regex.exec(usfm);
  // regex.exec() returns null (not undefined) when there is no match
  // eslint-disable-next-line no-null/no-null
  while (match !== null) {
    callback(match[1], regex.lastIndex);
    match = regex.exec(usfm);
  }
}

/**
 * Marker-map node types that begin their own block. `row`/`cell` are the USFM/USX spellings the
 * markers map uses; `table:row`/`table:cell` are the USJ spellings of the same types.
 */
const BLOCK_MARKER_MAP_TYPES = new Set(['row', 'cell', 'table:row', 'table:cell', 'sidebar']);

/**
 * Looks a marker up in the shared markers map, which answers for markers that {@link usfmMarkers}
 * omits entirely — table cells and rows, and sidebars.
 *
 * The map stores most markers by name but matches the table cell markers by pattern
 * (`t[hc][rc]?\d+`), so both stores are consulted. Deriving from the map rather than a hand-written
 * list is what keeps the centred and right-aligned spellings (`thc3`, `tcc2`, `thr4`) covered
 * alongside the plain ones.
 */
function lookupMarkerMapType(marker: string): string | undefined {
  const byName = USFM_MARKERS_MAP_3_0.markers[marker]?.type;
  if (byName) return byName;
  // A cell marker may carry a column span (`\thc3-4` spans columns 3 through 4). The 3.0 map's
  // pattern does not admit the `-N` suffix, so match on the base name; the span never changes what
  // kind of marker it is.
  const baseName = marker.replace(/-\d+$/, '');
  const byPattern = Object.entries(USFM_MARKERS_MAP_3_0.markersRegExp).find(([pattern]) =>
    new RegExp(`^(?:${pattern})$`).test(baseName),
  );
  return byPattern?.[1]?.type;
}

/**
 * True when a marker begins its own block — a paragraph, verse, chapter, table row or cell, or
 * sidebar.
 *
 * Wraps {@link isBlockMarker}, which is driven by {@link usfmMarkers} and so cannot see table and
 * sidebar markers: they are absent from that map entirely. Those are resolved through the shared
 * markers map instead.
 */
export function isStructuralMarker(marker: string): boolean {
  if (isBlockMarker(marker)) return true;
  const mapType = lookupMarkerMapType(marker);
  return mapType !== undefined && BLOCK_MARKER_MAP_TYPES.has(mapType);
}

/**
 * True when a marker opens a note — a footnote, endnote, or cross reference.
 *
 * `f`, `fe`, and `x` are typed {@link MarkerType.Note} in {@link usfmMarkers}; the study-Bible
 * extended variants `ef` and `ex` are absent from that map, so they are named explicitly. Keeping
 * the exception visible as an exception is deliberate — it is the only hand-maintained part.
 */
export function isNoteMarker(marker: string): boolean {
  return usfmMarkers[marker]?.type === MarkerType.Note || /^e[fx]$/.test(marker);
}

/** A whole note — opening marker, caller, content markers, and closing marker. */
const NOTE_SPAN_REGEX = /\\\+?(f|fe|ef|x|ex)\b[\s\S]*?\\\+?\1\*/g;
/** A marker's `|attribute` payload, which ends where the closing marker begins. */
const MARKER_ATTRIBUTES_REGEX = /\|[^\\]*(?=\\)/g;
/** A verse or chapter marker together with the number that is its operand. */
const VERSE_OR_CHAPTER_REGEX = /\\\+?[vc]\s*\d[\w-]*/g;
/** A run of USFM markers and the whitespace around it. */
const MARKER_RUN_REGEX = /\s*(?:\\\+?[a-z]+\d*(?:-\d+)?\*?\s*)+/g;

/**
 * Renders a raw USFM span as the text a reader sees, for display in a result card and for copying
 * to the clipboard.
 *
 * A match may span a block boundary, so the raw USFM slice can read `of Abraham.\r\n\\p\r\n\\v 2
 * Abraham became` where the editor shows a line break and the user's query had a space. Showing the
 * markers inside the highlight — and copying them to the clipboard — would not resemble what was
 * searched for.
 *
 * Each construct is removed with its operand rather than the marker token alone, because a bare
 * token strip leaves the operand behind as stray body text: the verse number of the paragraph the
 * match ran into (`\p \v 2` → a loose `2`), a note's caller and content, or a marker's `|attribute`
 * payload.
 *
 * This is display only. Replace ranges come from a result's `start`/`end` locations and never from
 * this text.
 */
export function collapseUsfmMarkersForDisplay(text: string): string {
  // A backslash cannot appear in USFM body text, so text without one holds no markers and must be
  // returned untouched — the whitespace collapse below would otherwise rewrite ordinary spacing.
  if (!text.includes('\\')) return text;
  return text
    .replace(NOTE_SPAN_REGEX, ' ')
    .replace(MARKER_ATTRIBUTES_REGEX, '')
    .replace(VERSE_OR_CHAPTER_REGEX, ' ')
    .replace(MARKER_RUN_REGEX, ' ')
    .replace(/\s+/g, ' ');
}
