// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ResourceCell } from './resource-cell.component';

const { mockUseProjectData, mockUseProjectSetting, setUsjSpy } = vi.hoisted(() => ({
  mockUseProjectData: vi.fn(),
  mockUseProjectSetting: vi.fn(),
  setUsjSpy: vi.fn(),
}));

vi.mock('@papi/frontend', () => ({ logger: { warn: vi.fn(), info: vi.fn() } }));
vi.mock('@papi/frontend/react', () => ({
  useProjectData: (...a: unknown[]) => mockUseProjectData(...a),
  useProjectSetting: (...a: unknown[]) => mockUseProjectSetting(...a),
  useLocalizedStrings: () => [
    {
      '%webView_scriptureTextGrid_cell_unavailable%': 'Resource unavailable',
      '%webView_scriptureTextGrid_cell_unavailable_downloading%': 'Downloading…',
      '%webView_scriptureTextGrid_cell_unavailable_failed%': 'Download failed',
    },
    false,
  ],
}));
vi.mock('@eten-tech-foundation/platform-editor', () => {
  return {
    Editorial: React.forwardRef((_p: unknown, ref: React.Ref<unknown>) => {
      React.useImperativeHandle(ref, () => ({ setUsj: setUsjSpy }));
      return <div data-testid="editorial" />;
    }),
  };
});
vi.mock('@eten-tech-foundation/scripture-utilities', () => ({
  EMPTY_USJ: { type: 'USJ', version: '3.1', content: [] },
  // USJ_TYPE isn't used directly by ResourceCell, but platform-bible-utils's bundled barrel
  // (pulled in transitively by isPlatformError/getErrorMessage) imports it at module-load time.
  USJ_TYPE: 'USJ',
}));

const scrRef = { book: 'MAT', chapterNum: 5, verseNum: 3, versificationStr: 'English' };
const chapter = {
  type: 'USJ',
  version: '3.1',
  content: [
    {
      type: 'para',
      marker: 'p',
      content: [{ type: 'verse', marker: 'v', number: '3' }, 'Blessed...'],
    },
  ],
};
const props = { resourceRef: { projectId: 'p1', label: 'WEB' }, scrRef, setScrRef: vi.fn() };

// 3-tuple [data, setData, isLoading].
function setUsjResult(value: unknown, isLoading = false) {
  mockUseProjectData.mockReturnValue({ ChapterUSJ: () => [value, vi.fn(), isLoading] });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockUseProjectSetting.mockReturnValue(['ltr', vi.fn(), vi.fn(), false]);
});

describe('ResourceCell', () => {
  it('shows the label + Spinner while downloading', () => {
    setUsjResult(undefined, true);
    render(<ResourceCell {...props} />);
    expect(screen.getByText('Resource unavailable')).toBeInTheDocument();
    expect(screen.getByText('Downloading…')).toBeInTheDocument();
    expect(screen.queryByTestId('editorial')).not.toBeInTheDocument();
  });
  it('shows the failed subtitle for a PlatformError', () => {
    setUsjResult({ platformErrorVersion: 1, message: 'x' }, false);
    render(<ResourceCell {...props} />);
    expect(screen.getByText('Download failed')).toBeInTheDocument();
  });
  it('renders Editorial and feeds it the FULL chapter when ready', () => {
    setUsjResult(chapter, false);
    render(<ResourceCell {...props} />);
    expect(screen.getByTestId('editorial')).toBeInTheDocument();
    expect(setUsjSpy).toHaveBeenCalledWith(chapter); // whole chapter, unspliced
  });
  it('applies the resource own text direction', () => {
    setUsjResult(chapter, false);
    mockUseProjectSetting.mockReturnValue(['rtl', vi.fn(), vi.fn(), false]);
    render(<ResourceCell {...props} resourceRef={{ projectId: 'p1', label: 'עברית' }} />);
    expect(document.querySelector('[dir="rtl"]')).toBeInTheDocument();
  });
  it('defaults direction to ltr when the setting is a PlatformError', () => {
    setUsjResult(chapter, false);
    mockUseProjectSetting.mockReturnValue([{ platformErrorVersion: 1 }, vi.fn(), vi.fn(), false]);
    render(<ResourceCell {...props} />);
    expect(document.querySelector('[dir="ltr"]')).toBeInTheDocument();
  });
  it('exposes the resource label as a gridcell (not a button)', () => {
    setUsjResult(chapter, false);
    render(<ResourceCell {...props} />);
    const cell = screen.getByRole('gridcell', { name: 'WEB' });
    expect(cell.tagName).not.toBe('BUTTON');
  });
});
