import { generateUsjCss, StyleInfo } from '@eten-tech-foundation/platform-editor';
import { useStylesheet } from 'platform-bible-react';
import { useMemo } from 'react';

/**
 * Injects project-stylesheet-derived CSS (PT9 CSSCreator port) layered after the static
 * usj-nodes.css base, so project styles win where defined. Standard view only for now; formatted
 * view keeps its current styling.
 */
export function useProjectStylesheet(
  styleInfo: StyleInfo | undefined,
  rtl: boolean,
  enabled: boolean,
): void {
  const css = useMemo(
    () => (enabled && styleInfo ? generateUsjCss(styleInfo, { rtl }) : ''),
    [styleInfo, rtl, enabled],
  );
  useStylesheet(css);
}
