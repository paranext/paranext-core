import { isBlockMarker, USFM_MARKERS_MAP_3_0 } from 'platform-bible-utils';

/**
 * Matches a USFM backslash marker token: optional `+` nesting, a marker name with optional numeric
 * suffix, and an optional suffix that is either a `-N` column span (`thc3-4`) or a milestone's
 * `-s`/`-e` start/end marker (`qt-s`), followed by an optional closing `*`.
 *
 * Exported so that every consumer in the Find folder tokenizes USFM the same way. Use
 * {@link forEachMarkerToken} rather than this constant directly unless you need the raw pattern — a
 * `g`-flagged regex carries `lastIndex` state and must not be shared between loops.
 */
export const MARKER_TOKEN_PATTERN = String.raw`\\\+?([a-z]+\d*(?:-(?:\d+|[se]))?)\*?`;

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

/** The markers map's node type for a note — a footnote, endnote, or cross reference. */
const NOTE_MAP_TYPE = 'note';

/**
 * Marker-map node types that begin their own block. `para`, `row`/`cell` and `sidebar` are the
 * USFM/USX spellings the markers map uses; `table:row`/`table:cell` are the USJ spellings of the
 * same two types.
 */
const BLOCK_MARKER_MAP_TYPES = new Set([
  'para',
  'row',
  'cell',
  'table:row',
  'table:cell',
  'sidebar',
]);

/**
 * Strips the suffix that qualifies a marker without changing what kind of marker it is: a cell's
 * column span (`\thc3-4` spans columns 3 through 4) or a milestone's start/end half (`\qt-s`). The
 * markers map stores only the base name, so a lookup has to ask about that.
 */
function stripMarkerSuffix(marker: string): string {
  return marker.replace(/-(?:\d+|[se])$/, '');
}

/**
 * Looks a marker up in the shared markers map, which answers for markers that the `usfmMarkers`
 * list omits entirely — table cells and rows, sidebars, the deprecated `\ph#` and `\p#` paragraphs,
 * and the study-Bible note variants.
 *
 * The map stores most markers by name but matches the table cell markers by pattern
 * (`t[hc][rc]?\d+`), so both stores are consulted. Deriving from the map rather than a hand-written
 * list is what keeps the centred and right-aligned spellings (`thc3`, `tcc2`, `thr4`) covered
 * alongside the plain ones.
 */
function lookupMarkerMapType(marker: string): string | undefined {
  const byName = USFM_MARKERS_MAP_3_0.markers[marker]?.type;
  if (byName) return byName;
  const baseName = stripMarkerSuffix(marker);
  const byPattern = Object.entries(USFM_MARKERS_MAP_3_0.markersRegExp).find(([pattern]) =>
    new RegExp(`^(?:${pattern})$`).test(baseName),
  );
  return byPattern?.[1]?.type;
}

/**
 * True when a marker begins its own block — a paragraph, verse, chapter, table row or cell, or
 * sidebar.
 *
 * Wraps {@link isBlockMarker}, which is driven by the `usfmMarkers` list and so cannot see table and
 * sidebar markers, nor the paragraph markers that list omits (`\ph`, `\ph1`–`\ph3`, `\p1`, `\p2`,
 * `\k1`, `\k2`). Those are resolved through the shared markers map instead, which types every one
 * of them `para`.
 */
export function isStructuralMarker(marker: string): boolean {
  if (isBlockMarker(marker)) return true;
  const mapType = lookupMarkerMapType(marker);
  return mapType !== undefined && BLOCK_MARKER_MAP_TYPES.has(mapType);
}

/**
 * True when a marker opens a note — a footnote, endnote, or cross reference.
 *
 * Driven entirely by the shared markers map, which types `f`, `fe`, `x` and the study-Bible
 * extended variants `ef`, `efe` and `ex` alike as notes. Deriving from the map rather than naming
 * the extended variants by hand is what keeps `\efe` covered.
 */
export function isNoteMarker(marker: string): boolean {
  return lookupMarkerMapType(marker) === NOTE_MAP_TYPE;
}

/**
 * Every marker the shared map types as a note, longest name first so that the alternation in
 * {@link NOTE_SPAN_REGEX} binds the whole name: were `f` tried before `fe`, the backreference in
 * `\fe … \fe*` would look for a `\f*` closer that is not there.
 */
const NOTE_MARKER_NAMES = Object.entries(USFM_MARKERS_MAP_3_0.markers)
  .filter(([, definition]) => definition?.type === NOTE_MAP_TYPE)
  .map(([name]) => name)
  .sort((a, b) => b.length - a.length || a.localeCompare(b));

/**
 * A whole note — opening marker, caller, content markers, and closing marker.
 *
 * The opener must be followed by whitespace, which is what separates it from the identically
 * spelled closer: without that, the orphan `\f*` that begins the after-context of any match inside
 * a note reads as an opener, and the lazy scan then swallows everything up to the _next_ note's
 * closer.
 */
const NOTE_SPAN_REGEX = new RegExp(
  String.raw`\\\+?(${NOTE_MARKER_NAMES.join('|')})(?=\s)[\s\S]*?\\\+?\1\*`,
  'g',
);
/**
 * A note that a slice cut in half, once every whole note has been removed.
 *
 * A result's before- and after-context are slices of a book's USFM, so either can begin or end
 * inside a note. What is left is note content with no body text in it: an opener with no closer
 * runs to the end of the slice, and a closer with no opener owns everything before it. Both read as
 * ordinary verse text on the card and in "Copy verse text" otherwise — `house + ` for the caller of
 * a note the before-context ran into.
 */
const UNCLOSED_NOTE_TAIL_REGEX = new RegExp(
  String.raw`\\\+?(?:${NOTE_MARKER_NAMES.join('|')})(?=\s)[\s\S]*$`,
);
const ORPHAN_NOTE_HEAD_REGEX = new RegExp(
  String.raw`^[\s\S]*?\\\+?(?:${NOTE_MARKER_NAMES.join('|')})\*`,
);
/** A marker's `|attribute` payload, which ends where the closing marker begins. */
const MARKER_ATTRIBUTES_REGEX = /\|[^\\]*(?=\\)/g;
/**
 * A marker token, capturing its name, or a bare `\*` closer — the form a milestone (`\qt-s
 *
 * |who="Pilate"\*`) closes with. A pattern rather than a regex because the scan below drives
 *
 * `lastIndex` by hand, which a shared `g`-flagged regex could not survive.
 */
const MARKER_CONSTRUCT_PATTERN = String.raw`${MARKER_TOKEN_PATTERN}|\\\*`;
/**
 * The number or identifier that is a verse or chapter marker's operand (`4`, `4a`, `4-5`, `1`),
 * together with the whitespace separating it from the marker.
 */
const VERSE_OR_CHAPTER_OPERAND_REGEX = /^[ \t\r\n]*\d[\w-]*/;
/**
 * Whitespace USFM uses to separate a marker from what follows it. Deliberately not `\s`: that also
 * matches the non-breaking, narrow no-break and thin spaces that are authored content, and that
 * "show invisible characters" exists to display.
 */
const SEPARATOR_WHITESPACE_REGEX = /^[ \t\r\n]+/;
const TRAILING_SEPARATOR_WHITESPACE_REGEX = /[ \t\r\n]+$/;

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
 * What a removed construct leaves behind depends on what the editor shows in its place. A block
 * boundary is a line break, so a structural marker collapses to a single space. A character marker
 * or a note is not a break at all — `\nd LORD\nd*’s` reads `LORD’s` — so those collapse to nothing,
 * and only the whitespace that separated an opening marker from its content goes with them.
 *
 * This is display only. Replace ranges come from a result's `start`/`end` locations and never from
 * this text.
 */
export function collapseUsfmMarkersForDisplay(text: string): string {
  // A backslash cannot appear in USFM body text, so text without one holds no markers and must be
  // returned untouched — the whitespace handling below would otherwise rewrite ordinary spacing.
  if (!text.includes('\\')) return text;

  // Whole notes first, so that the only opener or closer still standing afterwards is one whose
  // other half the slice cut off.
  const withoutNotes = text
    .replace(NOTE_SPAN_REGEX, '')
    .replace(ORPHAN_NOTE_HEAD_REGEX, '')
    .replace(UNCLOSED_NOTE_TAIL_REGEX, '');
  const remaining = withoutNotes.replace(MARKER_ATTRIBUTES_REGEX, '');

  let result = '';
  let cursor = 0;
  const regex = new RegExp(MARKER_CONSTRUCT_PATTERN, 'g');
  let match = regex.exec(remaining);
  // regex.exec() returns null (not undefined) when there is no match
  // eslint-disable-next-line no-null/no-null
  while (match !== null) {
    result += remaining.slice(cursor, match.index);
    // A bare `\*` closer has no name to capture.
    const marker = match[1];
    const isClosingMarker = match[0].endsWith('*');
    let end = match.index + match[0].length;

    if (marker === 'v' || marker === 'c') {
      const operand = remaining.slice(end).match(VERSE_OR_CHAPTER_OPERAND_REGEX);
      if (operand) end += operand[0].length;
    }

    if (marker !== undefined && isStructuralMarker(marker)) {
      // The editor shows a line break here, so the marker and the whitespace on either side of it
      // become one space. Consecutive structural markers (`\p\r\n\v 2`) coalesce into that same
      // one space, because the space this appends is what the next one strips.
      result = result.replace(TRAILING_SEPARATOR_WHITESPACE_REGEX, '');
      end += remaining.slice(end).match(SEPARATOR_WHITESPACE_REGEX)?.[0].length ?? 0;
      result += ' ';
    } else if (!isClosingMarker) {
      // An opening character or note marker is separated from its content by whitespace that is
      // USFM syntax, not text, so it goes with the marker. A closing marker has no such separator,
      // and the whitespace after it is the author's.
      end += remaining.slice(end).match(SEPARATOR_WHITESPACE_REGEX)?.[0].length ?? 0;
    }

    cursor = end;
    regex.lastIndex = end;
    match = regex.exec(remaining);
  }

  return result + remaining.slice(cursor);
}
