import {
  generateUsjCss,
  generateUsjFontCss,
  StyleInfo,
} from '@eten-tech-foundation/platform-editor';
import type { ScriptureEditorViewType } from 'platform-scripture-editor';
import { useStylesheet } from 'platform-bible-react';
import { useMemo } from 'react';

/**
 * Scope for the footnotes pane's read-only rows: the rows of the pane's list, never the row being
 * edited (the editor in that row has its own project sheet) and never the main editor. It targets
 * each row's `<li>` because that element carries the platform's `scripture-font` family, which
 * would beat anything inherited from the list.
 */
export const FOOTNOTE_ROWS_SELECTOR =
  "[data-footnotes-pane] .formatted-font > li:not([data-state='editing'])";

/**
 * Which project sheet a view gets from {@link useProjectStylesheet}: the whole sheet in the Standard
 * view, fonts only in every other view.
 */
export function projectStylesheetMode(viewType: ScriptureEditorViewType): 'full' | 'fonts' {
  return viewType === 'standard' ? 'full' : 'fonts';
}

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
      : generateUsjFontCss(styleInfo);
  }, [styleInfo, effectiveRtl, mode]);
  useStylesheet(css);
}

/**
 * Injects the project's fonts for the footnotes pane's read-only rows. The pane sits in the same
 * document in every view, so unlike {@link useProjectStylesheet} this never varies with the view.
 */
export function useFootnotePaneFontStylesheet(styleInfo: StyleInfo | undefined): void {
  const css = useMemo(
    () =>
      styleInfo ? generateUsjFontCss(styleInfo, { containerSelector: FOOTNOTE_ROWS_SELECTOR }) : '',
    [styleInfo],
  );
  useStylesheet(css);
}
