import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';

export interface FootnoteItemProps {
  className?: string;
  footnote: MarkerObject;
  showMarkers?: boolean;
  formatCaller?: (caller: string | undefined) => string | undefined;
}
