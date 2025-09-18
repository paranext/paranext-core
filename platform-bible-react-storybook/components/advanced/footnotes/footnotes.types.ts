import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';

export interface FootnoteItemProps {
  /** Optional additional class name for styling */
  className?: string;
  /**
   * The footnote to display (typically from JSX). Note: Although {@link MarkerObject.content} is an
   * array of {@link MarkerObject}, in practice, for footnotes that array contains only one
   * additional level of `MarkerObject` objects. The `content` of those nested objects will be plain
   * strings, containing the text of the individual footnote data (reference, quoted text, footnote
   * text, etc.).
   */
  footnote: MarkerObject;
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
  /** The footnotes to display (typically from JSX). See {@link FootnoteItemProps.footnote} */
  footnotes: MarkerObject[];
  /**
   * ID provided by the caller that should change whenever the list changes (due to additions,
   * deletions or — unlikely — reordering) )
   */
  listId: string | number;
  /** Flag indicating whether to display USFM-style markers */
  showMarkers?: boolean;
  /**
   * A function that can interpret the two special footnote caller codes defined by USFM, `+` and
   * `-` in order to display (or suppress display of) a meaningful caller in the context where this
   * is being used.
   */
  formatCaller?: (caller: string | undefined, index: number) => string | undefined;
  /** The currently selected footnote (or undefined if none) */
  selectedFootnote?: MarkerObject;
  /** Callback to handle clicking/selecting a footnote in the list */
  onFootnoteSelected?: (footnote: MarkerObject) => void;
}
