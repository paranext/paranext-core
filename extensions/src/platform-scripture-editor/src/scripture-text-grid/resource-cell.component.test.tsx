// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';
import { ResourceCell } from './resource-cell.component';

const { mockUseProjectData, mockUseProjectSetting, setUsjSpy, capturedEditorOptions } = vi.hoisted(
  () => ({
    mockUseProjectData: vi.fn(),
    mockUseProjectSetting: vi.fn(),
    setUsjSpy: vi.fn(),
    /** Collects the `options` prop passed to each Editorial render. */
    capturedEditorOptions: vi.fn(),
  }),
);

vi.mock('@papi/frontend', () => ({ logger: { warn: vi.fn(), info: vi.fn() } }));
vi.mock('@papi/frontend/react', () => ({
  useProjectData: (...a: unknown[]) => mockUseProjectData(...a),
  useProjectSetting: (...a: unknown[]) => mockUseProjectSetting(...a),
  useLocalizedStrings: () => [
    {
      '%webView_scriptureTextGrid_cell_unavailable%': 'Resource unavailable',
      '%webView_scriptureTextGrid_cell_status_loading%': 'Resource is loading…',
      '%webView_scriptureTextGrid_cell_status_failed%': 'Download failed',
      '%webView_scriptureTextGrid_cell_verse_empty%': 'No text for this verse',
    },
    false,
  ],
}));
vi.mock('@eten-tech-foundation/platform-editor', () => {
  return {
    Editorial: React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
      capturedEditorOptions(props.options);
      React.useImperativeHandle(ref, () => ({ setUsj: setUsjSpy }));
      return <div data-testid="editorial" />;
    }),
  };
});
// Mock platform-bible-react: stub useExtraValidMarkers (used by ResourceCell) and pass through
// the UI components that ResourceCellView needs to render properly in jsdom.
vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    useExtraValidMarkers: () => [],
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
const props = {
  resourceRef: { resourceId: 'r1', projectId: 'p1', label: 'WEB' },
  scrRef,
  setScrRef: vi.fn(),
};

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
  it('shows the Spinner and neutral loading message while downloading', () => {
    setUsjResult(undefined, true);
    render(<ResourceCell {...props} />);
    expect(screen.getByText('Resource is loading…')).toBeInTheDocument();
    expect(screen.queryByText('Resource unavailable')).not.toBeInTheDocument();
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
    render(
      <ResourceCell
        {...props}
        resourceRef={{ resourceId: 'r1', projectId: 'p1', label: 'עברית' }}
      />,
    );
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

describe('ResourceCell zoom', () => {
  it('passes the controller factor to the cell content as a zoom style', () => {
    const zoom = {
      getZoom: () => 1.4,
      setZoomForResource: vi.fn(),
      adjustZoom: vi.fn(),
      resetZoom: vi.fn(),
      pruneToResourceIds: vi.fn(),
    };
    setUsjResult(chapter, false);
    render(
      <div role="grid">
        <div role="row">
          <ResourceCell
            resourceRef={{ resourceId: 'r1', projectId: 'p1', label: 'WEB' }}
            scrRef={scrRef}
            setScrRef={() => {}}
            viewMode="chapter"
            zoom={zoom}
            zoomMenuLabels={{
              zoomIn: 'Zoom In',
              zoomOut: 'Zoom Out',
              reset: 'Reset Zoom',
              options: 'Zoom options',
            }}
          />
        </div>
      </div>,
    );
    // jsdom does not serialize CSS `zoom` into the style attribute string, so
    // `[style*="zoom"]` selectors fail. Instead check the CSSOM property directly on
    // the content wrapper element (the div with dir="ltr" that carries the zoom style).
    const contentWrapper = document.querySelector('[dir="ltr"]');
    expect(contentWrapper).not.toBeNull();
    expect(contentWrapper instanceof HTMLElement && contentWrapper.style.zoom).toBe('1.4');
  });

  it('forwards zoom items into the editor options.contextMenu when zoom and zoomMenuLabels are provided', () => {
    // The editor's built-in ContextMenuPlugin owns `contextmenu` events over the editor
    // content, so a wrapping Radix ContextMenu cannot intercept right-clicks there.
    // Instead, ResourceCell appends zoom actions to the editor's own context menu via
    // EditorOptions.contextMenu so they appear alongside the editor's native items.
    const adjustZoom = vi.fn();
    const resetZoom = vi.fn();
    const zoom = {
      getZoom: () => 1, // at default — canReset should be false
      setZoomForResource: vi.fn(),
      adjustZoom,
      resetZoom,
      pruneToResourceIds: vi.fn(),
    };
    setUsjResult(chapter, false);
    render(
      <div role="grid">
        <div role="row">
          <ResourceCell
            resourceRef={{ resourceId: 'r1', projectId: 'p1', label: 'WEB' }}
            scrRef={scrRef}
            setScrRef={() => {}}
            viewMode="chapter"
            zoom={zoom}
            zoomMenuLabels={{
              zoomIn: 'Zoom In',
              zoomOut: 'Zoom Out',
              reset: 'Reset Zoom',
              options: 'Zoom options',
            }}
          />
        </div>
      </div>,
    );

    // Editorial should have been rendered; grab the options it was called with.
    expect(capturedEditorOptions).toHaveBeenCalled();
    const [lastOptions] = capturedEditorOptions.mock.lastCall ?? [];
    const contextMenu: { title: string; onSelect: () => void; isDisabled: boolean }[] =
      lastOptions?.contextMenu ?? [];

    // Three items: Zoom In, Zoom Out, Reset Zoom.
    expect(contextMenu).toHaveLength(3);
    expect(contextMenu[0].title).toBe('Zoom In');
    expect(contextMenu[1].title).toBe('Zoom Out');
    expect(contextMenu[2].title).toBe('Reset Zoom');

    // At factor = 1 (default): both Zoom In and Zoom Out are enabled; Reset is disabled.
    expect(contextMenu[0].isDisabled).toBe(false); // canZoomIn: 1 < MAX_ZOOM_FACTOR (3)
    expect(contextMenu[1].isDisabled).toBe(false); // canZoomOut: 1 > MIN_ZOOM_FACTOR (0.5)
    expect(contextMenu[2].isDisabled).toBe(true); // canReset: factor === DEFAULT (1) → false

    // Invoking onSelect calls the zoom controller with the correct resource id.
    contextMenu[0].onSelect(); // Zoom In
    expect(adjustZoom).toHaveBeenCalledWith('r1', 1);

    contextMenu[1].onSelect(); // Zoom Out
    expect(adjustZoom).toHaveBeenCalledWith('r1', -1);

    contextMenu[2].onSelect(); // Reset
    expect(resetZoom).toHaveBeenCalledWith('r1');
  });
});
