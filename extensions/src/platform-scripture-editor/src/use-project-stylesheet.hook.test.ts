// @vitest-environment jsdom

import { generateUsjCss, type StyleInfo } from '@eten-tech-foundation/platform-editor';
import { renderHook } from '@testing-library/react';
import { useStylesheet } from 'platform-bible-react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FOOTNOTE_ROWS_SELECTOR, generateProjectFontCss } from './project-font-css.util';
import {
  projectStylesheetMode,
  useFootnotePaneFontStylesheet,
  useProjectStylesheet,
} from './use-project-stylesheet.hook';

vi.mock('platform-bible-react', () => ({ useStylesheet: vi.fn() }));
// The full-sheet generator is the editor package's; only the hook's choice of generator is under test.
vi.mock('@eten-tech-foundation/platform-editor', () => ({
  generateUsjCss: vi.fn(
    (_info: unknown, options: { rtl: boolean }) => `full-sheet rtl=${options.rtl}`,
  ),
}));

const mockUseStylesheet = vi.mocked(useStylesheet);

const styleInfo: StyleInfo = {
  defaultFont: 'Ezra SIL',
  defaultFontSize: 14,
  markers: {
    p: { marker: 'p', styleType: 'paragraph', fontName: 'Noto', bold: true, leftMargin: 1 },
  },
};

describe('useProjectStylesheet', () => {
  beforeEach(() => {
    mockUseStylesheet.mockClear();
  });

  it("passes the fonts-only CSS in 'fonts' mode", () => {
    renderHook(() => useProjectStylesheet(styleInfo, false, 'fonts'));
    const css = mockUseStylesheet.mock.lastCall?.[0];
    expect(css).toBe(generateProjectFontCss(styleInfo));
    expect(css).toContain('Ezra SIL');
    expect(css).not.toContain('bold');
  });

  it("passes the whole generated stylesheet in 'full' mode", () => {
    renderHook(() => useProjectStylesheet(styleInfo, true, 'full'));
    expect(mockUseStylesheet.mock.lastCall?.[0]).toBe('full-sheet rtl=true');
    expect(generateUsjCss).toHaveBeenCalledWith(styleInfo, { rtl: true });
  });

  it.each(['full', 'fonts'] as const)("passes '' without style info in '%s' mode", (mode) => {
    renderHook(() => useProjectStylesheet(undefined, false, mode));
    expect(mockUseStylesheet.mock.lastCall?.[0]).toBe('');
  });
});

describe('useFootnotePaneFontStylesheet', () => {
  beforeEach(() => {
    mockUseStylesheet.mockClear();
  });

  it("passes the fonts-only CSS scoped to the pane's read-only rows", () => {
    renderHook(() => useFootnotePaneFontStylesheet(styleInfo));
    expect(mockUseStylesheet).toHaveBeenCalledTimes(1);
    const css = mockUseStylesheet.mock.lastCall?.[0];
    expect(css).toBe(
      generateProjectFontCss(styleInfo, { containerSelector: FOOTNOTE_ROWS_SELECTOR }),
    );
    expect(css).toContain(FOOTNOTE_ROWS_SELECTOR);
    expect(css).not.toContain('bold');
  });

  it("passes '' without style info", () => {
    renderHook(() => useFootnotePaneFontStylesheet(undefined));
    expect(mockUseStylesheet.mock.lastCall?.[0]).toBe('');
  });
});

describe('projectStylesheetMode', () => {
  // Both sheets set the project font family and size, so nothing rendered tells them apart; this
  // pins which view gets which.
  it.each([
    ['standard', 'full'],
    ['formatted', 'fonts'],
    ['markers', 'fonts'],
  ] as const)("gives the '%s' view the '%s' sheet", (viewType, mode) => {
    expect(projectStylesheetMode(viewType)).toBe(mode);
  });
});
