import { generateUsjCss, StyleInfo } from '@eten-tech-foundation/platform-editor';
import { useStylesheet } from 'platform-bible-react';
import { useMemo } from 'react';
import { generateProjectFontCss } from './project-font-css.util';

/**
 * Injects project-stylesheet-derived CSS layered after the static usj-nodes.css base, so project
 * styles win where defined. The Standard view gets the whole project stylesheet (`'full'`, the PT9
 * CSSCreator port). The formatted view gets fonts only (`'fonts'`: the default font family and
 * size, plus per-marker font families), because it has its own marker layout rules that the full
 * sheet would override.
 */
export function useProjectStylesheet(
  styleInfo: StyleInfo | undefined,
  rtl: boolean,
  mode: 'full' | 'fonts',
): void {
  // The fonts-only sheet has no direction-dependent rules, so `rtl` must not rebuild it.
  const effectiveRtl = mode === 'full' && rtl;
  const css = useMemo(() => {
    if (!styleInfo) return '';
    return mode === 'full'
      ? generateUsjCss(styleInfo, { rtl: effectiveRtl })
      : generateProjectFontCss(styleInfo);
  }, [styleInfo, effectiveRtl, mode]);
  useStylesheet(css);
}
