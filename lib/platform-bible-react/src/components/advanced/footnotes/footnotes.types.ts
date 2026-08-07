import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { ReactNode } from 'react';

export type FootnoteLayout = 'horizontal' | 'vertical';

/**
 * Where the caret should land within a footnote's rendered text.
 *
 * The offset origin is the note text as displayed by `FootnoteItem` in a row's
 * `.textual-note-body`: every character run the note contains, including a leading `fr`/`xo` target
 * reference, which PT9's notes pane and `FootnoteItem` alike render inline at the head of the note
 * text. It EXCLUDES two kinds of chrome: the caller (`FootnoteItem` renders it in a separate header
 * div) and the rendered USFM markers themselves (`.marker` spans; see `isMarkerText` in
 * `footnote-caret.utils.ts`), which the editor renders as non-editable decorators rather than text.
 * A consumer that resolves this offset against a DIFFERENT text flattening - e.g. the editor's raw
 * DOM, which also renders the caller and inserts structural spacing text nodes between top-level
 * runs - must first align to this same origin (see `createNoteBodyTextNodeFilter` in
 * `footnote-editor.utils.ts`).
 *
 * - `'end'`: after the last character of the note text (not the raw editor DOM's last text node,
 *   which may include trailing structural text - see `createNoteBodyTextNodeFilter`).
 * - `{ utf16Offset }`: a flat offset over the note body's visible text content, in UTF-16 code units
 *   (the unit used by DOM Selection APIs and the editor's text nodes). Offsets originate from
 *   browser caret APIs (`caretPositionFromPoint`), which only produce positions at valid caret
 *   boundaries, so surrogate pairs and combining sequences are never split by construction.
 *   Consumers walk text nodes and accumulate `Text.data.length` to resolve it; an offset past the
 *   available text resolves to `'end'`.
 */
export type FootnoteCaretPosition = 'end' | { utf16Offset: number };

/** Interface defining the properties for a single footnote item component */
export interface FootnoteItemProps {
  /**
   * The footnote to display (typically from JSX). Note: Although {@link MarkerObject.content} is an
   * array of {@link MarkerObject}, in practice, for footnotes that array contains only one
   * additional level of `MarkerObject` objects. The `content` of those nested objects will be plain
   * strings, containing the text of the individual footnote data (reference, quoted text, footnote
   * text, etc.).
   */
  footnote: MarkerObject;
  /**
   * Determines how footnotes are displayed:
   *
   * - `'horizontal'`: the note's marker and caller appear in a leading-aligned column, with the note
   *   text in a second column (typically used in a wide pane below the text).
   * - `'vertical'`: the note's marker and caller appear on the first line, with the note text
   *   displayed beneath (typically used side-by-side with the text).
   *
   * A leading `\fr`/`\xo` target reference is part of the note text in both layouts, as it is in
   * PT9's notes pane - it is not aligned in a column of its own.
   *
   * @default 'horizontal'
   */
  layout?: FootnoteLayout;
  /** Flag indicating whether to display USFM-style markers */
  showMarkers?: boolean;
  /**
   * A function that can interpret the two special footnote caller codes defined by USFM, `+` and
   * `-` in order to display (or suppress display of) a meaningful caller in the context where this
   * is being used.
   */
  formatCaller?: (caller: string | undefined) => string | undefined;
}

/** Interface defining the properties for the FootnoteList component */
export interface FootnoteListProps {
  /** Optional additional class name for styling */
  className?: string;
  /** Optional additional class name for styling the `Card` for each `FootnoteItem` in the list */
  classNameForItems?: string;
  /** The footnotes to display (typically from JSX). See {@link FootnoteItemProps.footnote} */
  footnotes: MarkerObject[];
  /**
   * Determines how footnotes are displayed:
   *
   * - `'horizontal'`: the note's marker and caller appear in a leading-aligned column, with the note
   *   text in a second column (typically used in a wide pane below the text).
   * - `'vertical'`: the note's marker and caller appear on the first line, with the note text
   *   displayed beneath (typically used side-by-side with the text).
   *
   * A leading `\fr`/`\xo` target reference is part of the note text in both layouts, as it is in
   * PT9's notes pane - it is not aligned in a column of its own.
   *
   * @default 'horizontal'
   */
  layout?: FootnoteLayout;
  /**
   * ID provided by the caller that should change whenever the list changes (due to additions,
   * deletions or — unlikely — reordering) )
   */
  listId: string | number;
  /** The currently selected footnote (or undefined if none) */
  selectedFootnote?: MarkerObject;
  /** Flag indicating whether to display USFM-style markers */
  showMarkers?: boolean;
  /**
   * Flag indicating whether to suppress USFM-style formatting.
   *
   * @default false
   */
  suppressFormatting?: boolean;
  /**
   * A function that can interpret the two special footnote caller codes defined by USFM, `+` and
   * `-` in order to display (or suppress display of) a meaningful caller in the context where this
   * is being used.
   */
  formatCaller?: (caller: string | undefined, index: number) => string | undefined;
  /** Callback to handle clicking/selecting a footnote in the list */
  onFootnoteSelected?: (footnote: MarkerObject, index: number, listId: string | number) => void;
  /**
   * Callback requesting that a footnote open for editing (e.g. swap the row for an inline editor).
   * When provided, a row click or Enter keypress fires this INSTEAD of `onFootnoteSelected`; Space
   * still fires `onFootnoteSelected`. `caretPosition` maps the click point into the note text (see
   * {@link FootnoteCaretPosition}); keyboard activation passes `'end'`.
   */
  onFootnoteEditRequested?: (
    footnote: MarkerObject,
    index: number,
    listId: string | number,
    caretPosition: FootnoteCaretPosition,
  ) => void;
  /**
   * Index of the footnote currently being edited in place, if any. When set (and
   * `renderEditingFootnote` is provided), that row renders the editor slot instead of its read-only
   * display and is highlighted as the active editing row.
   */
  editingFootnoteIndex?: number;
  /**
   * Render prop for the in-place editor shown for `editingFootnoteIndex`'s row. The list stays
   * presentation-only: it never imports an editor component; the consumer supplies one (e.g. an
   * inline `FootnoteEditor`).
   */
  renderEditingFootnote?: (footnote: MarkerObject, index: number) => ReactNode;
}
