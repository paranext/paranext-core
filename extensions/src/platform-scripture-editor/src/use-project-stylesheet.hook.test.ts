// @vitest-environment jsdom

import {
  generateUsjCss,
  generateUsjFontCss,
  type StyleInfo,
} from '@eten-tech-foundation/platform-editor';
import { renderHook } from '@testing-library/react';
import { useStylesheet } from 'platform-bible-react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  FOOTNOTE_ROWS_SELECTOR,
  projectStylesheetMode,
  useFootnotePaneFontStylesheet,
  useProjectStylesheet,
} from './use-project-stylesheet.hook';

vi.mock('platform-bible-react', () => ({ useStylesheet: vi.fn() }));
// Both generators are the editor package's; only the hook's choice of generator and options is
// under test.
vi.mock('@eten-tech-foundation/platform-editor', () => ({
  generateUsjCss: vi.fn(
    (_info: unknown, options: { rtl: boolean }) => `full-sheet rtl=${options.rtl}`,
  ),
  generateUsjFontCss: vi.fn(
    (_info: unknown, options?: { containerSelector?: string }) =>
      `font-sheet scope=${options?.containerSelector ?? 'default'}`,
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
    vi.clearAllMocks();
  });

  it("passes the fonts-only CSS in the editor's default scope in 'fonts' mode", () => {
    renderHook(() => useProjectStylesheet(styleInfo, true, 'fonts'));
    expect(mockUseStylesheet.mock.lastCall?.[0]).toBe('font-sheet scope=default');
    expect(generateUsjFontCss).toHaveBeenCalledWith(styleInfo);
    expect(generateUsjCss).not.toHaveBeenCalled();
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
    vi.clearAllMocks();
  });

  it("passes the fonts-only CSS scoped to the pane's read-only rows", () => {
    renderHook(() => useFootnotePaneFontStylesheet(styleInfo));
    expect(mockUseStylesheet).toHaveBeenCalledTimes(1);
    expect(mockUseStylesheet.mock.lastCall?.[0]).toBe(`font-sheet scope=${FOOTNOTE_ROWS_SELECTOR}`);
    expect(generateUsjFontCss).toHaveBeenCalledWith(styleInfo, {
      containerSelector: FOOTNOTE_ROWS_SELECTOR,
    });
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
