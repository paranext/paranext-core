import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';

export type FootnoteLayout = 'horizontal' | 'vertical';

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
   * - `'horizontal'`: caller and reference appear in a leading-aligned column, with the contents in a
   *   second column (typically used in a wide pane below the text).
   * - `'vertical'`: caller and reference appear on the first line, with the contents displayed
   *   beneath (typically used side-by-side with the text).
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
   * - `'horizontal'`: caller and reference appear in a leading-aligned column, with the contents in a
   *   second column (typically used in a wide pane below the text).
   * - `'vertical'`: caller and reference appear on the first line, with the contents displayed
   *   beneath (typically used side-by-side with the text).
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
}
