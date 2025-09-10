import { MarkerObject } from "@eten-tech-foundation/scripture-utilities";

export interface FootnoteItemProps {
  className?: string;
  footnote: MarkerObject;
  formatCaller? (caller: string | undefined): string | undefined;
  showMarkers?: boolean,
}
