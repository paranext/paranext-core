import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';

export interface FootnoteItemProps {
  className?: string;
  footnote: MarkerObject;
  showMarkers?: boolean;
  formatCaller?: (caller: string | undefined) => string | undefined;
}

export interface FootnoteListProps {
  className?: string;
  footnotes: MarkerObject[];
  showMarkers?: boolean;
  formatCaller?: (caller: string | undefined, index: number) => string | undefined;
  /** The currently selected footnote (or undefined if none) */
  selectedFootnote?: MarkerObject;
  /** Callback to handle clicking/selecting a footnote in the list */
  onFootnoteSelected?: (footnote: MarkerObject) => void;
}
