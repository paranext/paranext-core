import { isBlockMarker, MarkerInfo, USFM_MARKERS_MAP_3_0 } from 'platform-bible-utils';

/**
 * A USFM marker's name, with an optional suffix that is either a `-N` column span (`thc3-4`) or a
 * milestone's `-s`/`-e` start/end marker (`qt-s`).
 *
 * The name allows uppercase letters and interior digits because a project's custom `\z` marker can
 * use them, and a marker this cannot read is a marker Replace would delete without noticing.
 */
const MARKER_NAME_PATTERN = String.raw`[A-Za-z][A-Za-z0-9]*(?:-(?:\d+|[se]))?`;

/**
 * Matches a USFM backslash marker token: optional `+` nesting, a marker name (see
 * {@link MARKER_NAME_PATTERN}), and an optional closing `*`.
 *
 * Exported so that every consumer in the Find folder tokenizes USFM the same way. Use
 * {@link forEachMarkerToken} rather than this constant directly unless you need the raw pattern — a
 * `g`-flagged regex carries `lastIndex` state and must not be shared between loops.
 */
export const MARKER_TOKEN_PATTERN = String.raw`\\\+?(${MARKER_NAME_PATTERN})\*?`;

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
 * The markers map's by-pattern entries, compiled once. A lookup falls through to these for every
 * marker the map does not name — table cells, `\z*` markers, milestones — and runs per token.
 */
const MARKER_MAP_ENTRIES_BY_PATTERN = Object.entries(USFM_MARKERS_MAP_3_0.markersRegExp).map(
  ([pattern, markerInfo]) => ({
    regex: new RegExp(`^(?:${pattern})$`),
    markerInfo,
  }),
);

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
function lookupMarkerMapInfo(marker: string): MarkerInfo | undefined {
  const byName = USFM_MARKERS_MAP_3_0.markers[marker];
  if (byName) return byName;
  const baseName = stripMarkerSuffix(marker);
  return MARKER_MAP_ENTRIES_BY_PATTERN.find(({ regex }) => regex.test(baseName))?.markerInfo;
}

/** The markers map's node type for `marker`; see {@link lookupMarkerMapInfo}. */
function lookupMarkerMapType(marker: string): string | undefined {
  return lookupMarkerMapInfo(marker)?.type;
}

/**
 * The attribute a bare `|value` on `marker` sets, per the shared markers map: `\w bread|pan\w*`
 * sets `lemma`, and `\ts-s |t1\*` sets `sid`. Not every milestone start defaults to its id:
 * `\qt-s`'s default attribute is `who`.
 */
export function getMarkerDefaultAttribute(marker: string): string | undefined {
  return lookupMarkerMapInfo(marker)?.defaultAttribute;
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

/** The markers map's node type for a milestone. */
const MILESTONE_MAP_TYPE = 'ms';

/** True when the markers map types `marker` as a note: a footnote, endnote, or cross reference. */
export function isNoteMarker(marker: string): boolean {
  return lookupMarkerMapType(marker) === NOTE_MAP_TYPE;
}

/**
 * The marker that `marker` closes when it is an independent closer the map links to its opener
 * (`esbe` closes `esb`), or `undefined`. A `*` closer (`nd*`) and a milestone's `-e` end are told
 * by their spelling instead.
 */
export function getIndependentlyClosedMarker(marker: string): string | undefined {
  return USFM_MARKERS_MAP_3_0.markers[marker]?.isIndependentClosingMarkerFor?.[0];
}

/**
 * Stock character markers that close with `*` but that the markers map does not know.
 *
 * TODO(PT-4993): Remove once the generated markers map includes them.
 */
const PAIRED_MARKERS_THE_MAP_OMITS = new Set(['fs', 'wr', 'xtSee', 'xtSeeAlso']);

/**
 * True when a marker's effect runs on past the marker until something ends it, so a match that
 * holds this end alone holds only part of it.
 *
 * That includes a marker whose closer is optional, such as a note's `\fq`: with or without a closer
 * in the USFM, the text after the match is still in that style, and deleting the opener would
 * restyle it.
 *
 * Milestones are not answered here: their `-s`/`-e` and `\*` spelling says what they are, and the
 * map's `[Zz].+` entry would otherwise type every custom `\z` marker as one.
 */
export function mustMarkerBeClosed(marker: string): boolean {
  if (PAIRED_MARKERS_THE_MAP_OMITS.has(marker)) return true;
  if (USFM_MARKERS_MAP_3_0.markers[marker]?.independentClosingMarkers?.length) return true;
  const type = lookupMarkerMapType(marker);
  // A marker the map does not know, including a custom `\z` marker, counts as having no other end
  // unless its closer is in sight (the caller checks that). This is on purpose: it may be a
  // paragraph-like marker that never had a closer, and refusing it would refuse every Replace over
  // one. The cost is that confirming can strand the closer of a custom pair whose other end is
  // outside the match.
  // TODO(PT-4489): Look the marker up in the project's stylesheet instead.
  if (type === undefined || type === MILESTONE_MAP_TYPE) return false;
  return !!USFM_MARKERS_MAP_3_0.markerTypes[type]?.isCloseable;
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
/**
 * A marker's `|attribute` payload, which ends right before a closer: the marker's own (`\w*`) or a
 * milestone's bare `\*`. A `|` anywhere else is Scripture text, and so is what follows it.
 */
const MARKER_ATTRIBUTES_PATTERN = String.raw`\|[^\\|]*(?=\\(?:\+?${MARKER_NAME_PATTERN})?\*)`;
/** Read only through {@link stripMarkerAttributes}: `replace` resets the `lastIndex` it carries. */
const MARKER_ATTRIBUTES_REGEX = new RegExp(MARKER_ATTRIBUTES_PATTERN, 'g');

/** Removes every marker's `|attribute` payload from `usfm`, and leaves the markers themselves. */
export function stripMarkerAttributes(usfm: string): string {
  return usfm.replace(MARKER_ATTRIBUTES_REGEX, '');
}

/**
 * A marker token, capturing its name, or a bare `\*` closer — the form a milestone closes with.
 *
 * A pattern rather than a regex because the scan below drives `lastIndex` by hand, which a shared
 * `g`-flagged regex could not survive.
 */
const MARKER_CONSTRUCT_PATTERN = String.raw`${MARKER_TOKEN_PATTERN}|\\\*`;
/**
 * A milestone's empty closer, `\*`, with the `|attribute` payload that may come before it, which it
 * captures. A milestone with no `-s`/`-e` that is followed by this closes itself on the spot.
 */
export const MILESTONE_CLOSER_REGEX = new RegExp(
  String.raw`^[ \t]*(${MARKER_ATTRIBUTES_PATTERN})?\\\*`,
);
/**
 * The number or identifier that is a verse or chapter marker's operand (`4`, `4a`, `4-5`, `1`),
 * together with the whitespace separating it from the marker, which it leaves out of its capture.
 * Only USFM's separator whitespace counts, as in {@link SEPARATOR_WHITESPACE_REGEX}.
 */
export const VERSE_OR_CHAPTER_OPERAND_REGEX = /^[ \t\r\n]*(\d[\w-]*)/;
/**
 * Whitespace USFM uses to separate a marker from what follows it. Deliberately not `\s`: that also
 * matches the non-breaking, narrow no-break and thin spaces that are authored content, and that
 * "show invisible characters" exists to display.
 */
const SEPARATOR_WHITESPACE_REGEX = /^[ \t\r\n]+/;
const SEPARATOR_WHITESPACE_CHARACTERS = new Set([' ', '\t', '\r', '\n']);

/**
 * Removes the separator whitespace at the end of the text `pieces` spell out, across as many pieces
 * as it spans. Walks back from the end one character at a time, so the work is the whitespace
 * removed plus one piece, never the whole text.
 */
function trimTrailingSeparatorWhitespace(pieces: string[]): void {
  while (pieces.length > 0) {
    const last = pieces[pieces.length - 1];
    let end = last.length;
    while (end > 0 && SEPARATOR_WHITESPACE_CHARACTERS.has(last[end - 1])) end -= 1;
    if (end > 0) {
      pieces[pieces.length - 1] = last.slice(0, end);
      return;
    }
    pieces.pop();
  }
}

/** A piece of a USFM span as {@link splitUsfmForMarkerDisplay} shows it. */
export type UsfmDisplaySegment = { text: string; isMarker: boolean };

/** A line break in USFM, with the whitespace around it. It separates, and reads as one space. */
const LINE_BREAK_RUN_REGEX = /[ \t\r\n]*[\r\n][ \t\r\n]*/g;
/** How USFM spells an optional line break, the one marker with no backslash. */
export const OPTIONAL_BREAK_MARKER = '//';

/**
 * Splits a USFM span into text and markers, so a result can show the user which markers its match
 * includes. Unlike {@link collapseUsfmMarkersForDisplay} this keeps every marker and everything
 * inside a note, because this is what Replace would delete. Attributes are left out, as they are
 * not something the user wrote as text.
 *
 * This is display only, like {@link collapseUsfmMarkersForDisplay}.
 */
export function splitUsfmForMarkerDisplay(usfm: string): UsfmDisplaySegment[] {
  const withoutAttributes = stripMarkerAttributes(usfm);
  const segments: UsfmDisplaySegment[] = [];
  const pushText = (text: string) => {
    if (text) segments.push({ text: text.replace(LINE_BREAK_RUN_REGEX, ' '), isMarker: false });
  };

  let cursor = 0;
  const regex = new RegExp(`${MARKER_TOKEN_PATTERN}|${OPTIONAL_BREAK_MARKER}`, 'g');
  let match = regex.exec(withoutAttributes);
  // regex.exec() returns null (not undefined) when there is no match
  // eslint-disable-next-line no-null/no-null
  while (match !== null) {
    pushText(withoutAttributes.slice(cursor, match.index));
    let markerText = match[0];
    let end = match.index + match[0].length;
    const rest = withoutAttributes.slice(end);
    const operand =
      match[1] === 'v' || match[1] === 'c' ? rest.match(VERSE_OR_CHAPTER_OPERAND_REGEX) : undefined;
    // A milestone's empty closer reads as part of the milestone.
    const emptyCloser = rest.match(MILESTONE_CLOSER_REGEX);
    if (operand) {
      markerText += operand[0].replace(LINE_BREAK_RUN_REGEX, ' ');
      end += operand[0].length;
    } else if (emptyCloser) {
      markerText += emptyCloser[0].trim();
      end += emptyCloser[0].length;
    }
    segments.push({ text: markerText, isMarker: true });
    cursor = end;
    regex.lastIndex = end;
    match = regex.exec(withoutAttributes);
  }

  pushText(withoutAttributes.slice(cursor));
  return segments;
}

/**
 * Applies `transform` to each run of text in a USFM span and leaves the markup exactly as it is:
 * marker tokens, a verse or chapter number, a milestone's bare `\*`, attributes, and the whitespace
 * that separates an opening marker from its content. Marker names are case-sensitive, so
 * upper-casing one would make it a different marker.
 */
export function transformUsfmText(usfm: string, transform: (text: string) => string): string {
  const pieces: string[] = [];
  const pushText = (text: string) => pieces.push(text ? transform(text) : text);

  let cursor = 0;
  const regex = new RegExp(`${MARKER_ATTRIBUTES_PATTERN}|${MARKER_CONSTRUCT_PATTERN}`, 'g');
  let match = regex.exec(usfm);
  // regex.exec() returns null (not undefined) when there is no match
  // eslint-disable-next-line no-null/no-null
  while (match !== null) {
    pushText(usfm.slice(cursor, match.index));
    let end = match.index + match[0].length;
    const marker = match[1];
    if (marker === 'v' || marker === 'c')
      end += usfm.slice(end).match(VERSE_OR_CHAPTER_OPERAND_REGEX)?.[0].length ?? 0;
    if (marker !== undefined && !match[0].endsWith('*'))
      end += usfm.slice(end).match(SEPARATOR_WHITESPACE_REGEX)?.[0].length ?? 0;
    pieces.push(usfm.slice(match.index, end));
    cursor = end;
    regex.lastIndex = end;
    match = regex.exec(usfm);
  }

  pushText(usfm.slice(cursor));
  return pieces.join('');
}

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
  const remaining = stripMarkerAttributes(withoutNotes);

  // Built as pieces and joined once. A result card collapses a whole book's prefix and suffix, so
  // re-scanning one accumulated string at every structural marker would be quadratic in the book.
  const pieces: string[] = [];
  let cursor = 0;
  const regex = new RegExp(MARKER_CONSTRUCT_PATTERN, 'g');
  let match = regex.exec(remaining);
  // regex.exec() returns null (not undefined) when there is no match
  // eslint-disable-next-line no-null/no-null
  while (match !== null) {
    pieces.push(remaining.slice(cursor, match.index));
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
      trimTrailingSeparatorWhitespace(pieces);
      end += remaining.slice(end).match(SEPARATOR_WHITESPACE_REGEX)?.[0].length ?? 0;
      pieces.push(' ');
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

  pieces.push(remaining.slice(cursor));
  return pieces.join('');
}
