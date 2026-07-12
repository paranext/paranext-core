// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';
import { ResourceCell } from './resource-cell.component';

const { mockUseProjectData, mockUseProjectSetting, setUsjSpy } = vi.hoisted(() => ({
  mockUseProjectData: vi.fn(),
  mockUseProjectSetting: vi.fn(),
  setUsjSpy: vi.fn(),
}));

vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    useExtraValidMarkers: () => [],
  };
});
vi.mock('@papi/frontend', () => ({ logger: { warn: vi.fn(), info: vi.fn() } }));
vi.mock('@papi/frontend/react', () => ({
  useProjectData: (...a: unknown[]) => mockUseProjectData(...a),
  useProjectSetting: (...a: unknown[]) => mockUseProjectSetting(...a),
  useLocalizedStrings: () => [
    {
      '%webView_scriptureTextGrid_cell_unavailable%': 'Resource unavailable',
      '%webView_scriptureTextGrid_cell_status_downloading%': 'Downloading…',
      '%webView_scriptureTextGrid_cell_status_failed%': 'Download failed',
      '%webView_scriptureTextGrid_cell_verse_empty%': 'No text for this verse',
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
vi.mock('@eten-tech-foundation/scripture-utilities', async (importOriginal) => {
  // Keep the real usxStringToUsj (used to build test fixtures below) alongside the existing
  // lightweight EMPTY_USJ/USJ_TYPE stand-ins.
  const original =
    await importOriginal<typeof import('@eten-tech-foundation/scripture-utilities')>();
  return {
    ...original,
    EMPTY_USJ: { type: 'USJ', version: '3.1', content: [] },
    // USJ_TYPE isn't used directly by ResourceCell, but platform-bible-utils's bundled barrel
    // (pulled in transitively by isPlatformError/getErrorMessage) imports it at module-load time.
    USJ_TYPE: 'USJ',
  };
});

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

// Two-verse chapter fixture for viewMode tests: verse 1 "verse one" + verse 2 "verse two" in one
// <para style="p">, so a chapter-vs-verse slice is unambiguous.
const twoVerseChapterUsj = usxStringToUsj(`<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="GEN" style="id">Sample</book>
  <chapter number="1" style="c" sid="GEN 1" />
  <para style="p">
    <verse number="1" style="v" sid="GEN 1:1" />verse one<verse eid="GEN 1:1" /><verse number="2" style="v" sid="GEN 1:2" />verse two<verse eid="GEN 1:2" /></para>
</usx>
`);

// 3-tuple [data, setData, isLoading].
function setUsjResult(value: unknown, isLoading = false) {
  mockUseProjectData.mockReturnValue({ ChapterUSJ: () => [value, vi.fn(), isLoading] });
}

// Renders ResourceCell with the given chapter USJ wired through useProjectData, mirroring the
// per-test setUsjResult + render pattern used above but for the viewMode-focused tests below.
function renderResourceCell(
  overrides: Partial<
    Pick<React.ComponentProps<typeof ResourceCell>, 'viewMode' | 'scrRef'> & {
      chapterUsj: unknown;
    }
  >,
) {
  const { chapterUsj, ...rest } = overrides;
  setUsjResult(chapterUsj ?? chapter, false);
  render(<ResourceCell {...props} {...rest} />);
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
  it('shows the resource label (presentational, no landmark role)', () => {
    setUsjResult(chapter, false);
    render(<ResourceCell {...props} />);
    expect(screen.getByText('WEB')).toBeInTheDocument();
    expect(screen.queryByRole('gridcell')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });
});

describe('ResourceCell viewMode', () => {
  it('verse mode feeds Editorial only the focused verse, not the whole chapter', async () => {
    renderResourceCell({
      viewMode: 'verse',
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 2 },
      chapterUsj: twoVerseChapterUsj,
    });
    await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());
    // mock.lastCall (rather than a non-null-asserted array index) avoids no-type-assertion.
    const [fedUsj] = setUsjSpy.mock.lastCall ?? [];
    const text = JSON.stringify(fedUsj);
    expect(text).toContain('verse two');
    expect(text).not.toContain('verse one'); // sliced, not whole chapter
  });

  it('chapter mode is unchanged: feeds the whole chapter', async () => {
    renderResourceCell({
      viewMode: 'chapter',
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 2 },
      chapterUsj: twoVerseChapterUsj,
    });
    await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());
    const [fedUsj] = setUsjSpy.mock.lastCall ?? [];
    expect(JSON.stringify(fedUsj)).toContain('verse one'); // whole chapter present
  });

  it('verse mode with no text for the verse shows the empty state, not the editor or "loading…"', async () => {
    renderResourceCell({
      viewMode: 'verse',
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 0 }, // verse 0 → empty slice
      chapterUsj: twoVerseChapterUsj,
    });
    // The empty label is rendered; the editor is not.
    expect(await screen.findByText(/no text for this verse/i)).toBeInTheDocument();
    expect(setUsjSpy).not.toHaveBeenCalled();
    expect(screen.queryByTestId('editorial')).not.toBeInTheDocument();
  });
});

describe('ResourceCell name display', () => {
  it('verse mode uses the inline hanging name (name shares a row with the editor)', async () => {
    setUsjResult(chapter, false);
    render(<ResourceCell {...props} viewMode="verse" />);
    const cell = screen.getByRole('gridcell', { name: 'WEB' });
    const name = within(cell).getByText('WEB');
    const editorial = await within(cell).findByTestId('editorial');
    // Inline: name and editor share an intermediate row, not the gridcell directly.
    expect(name.parentElement).not.toBe(cell);
    expect(name.parentElement).toContainElement(editorial);
  });

  it('chapter mode uses the header band (name is a direct child of the gridcell)', () => {
    setUsjResult(chapter, false);
    render(<ResourceCell {...props} viewMode="chapter" />);
    const cell = screen.getByRole('gridcell', { name: 'WEB' });
    const name = within(cell).getByText('WEB');
    expect(name.parentElement).toBe(cell);
  });
});
