// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';
import { ResourceCell } from './resource-cell.component';

const {
  mockUseProjectData,
  mockUseProjectSetting,
  setUsjSpy,
  capturedEditorOptions,
  capturedEditorScrRef,
  captureEditorScrRefChange,
  getEditorScrRefChange,
} = vi.hoisted(() => {
  /** The live `onScrRefChange` Editorial was handed, so tests can drive the write-back channel. */
  let onScrRefChange: ((scrRef: unknown) => void) | undefined;
  return {
    mockUseProjectData: vi.fn(),
    mockUseProjectSetting: vi.fn(),
    setUsjSpy: vi.fn(),
    /** Collects the `options` prop passed to each Editorial render. */
    capturedEditorOptions: vi.fn(),
    /** Collects the `scrRef` prop passed to each Editorial render. */
    capturedEditorScrRef: vi.fn(),
    captureEditorScrRefChange: (handler: ((scrRef: unknown) => void) | undefined) => {
      onScrRefChange = handler;
    },
    getEditorScrRefChange: () => onScrRefChange,
  };
});

vi.mock('@papi/frontend', () => ({ logger: { warn: vi.fn(), info: vi.fn() } }));
vi.mock('@papi/frontend/react', () => ({
  useProjectData: (...a: unknown[]) => mockUseProjectData(...a),
  useProjectSetting: (...a: unknown[]) => mockUseProjectSetting(...a),
  useLocalizedStrings: () => [
    {
      '%webView_scriptureTextGrid_cell_unavailable%': 'Resource unavailable',
      '%webView_scriptureTextGrid_cell_not_installed%': 'Resource not installed',
      '%webView_scriptureTextGrid_cell_status_loading%': 'Resource is loading…',
      '%webView_scriptureTextGrid_cell_status_failed%': 'No content for this reference',
      '%webView_scriptureTextGrid_cell_verse_empty%': 'No text for this verse',
    },
    false,
  ],
}));
vi.mock('@eten-tech-foundation/platform-editor', () => {
  // Just the props ResourceCell passes, typed so the captured handler stays callable without a cast.
  type EditorialMockProps = {
    options?: unknown;
    scrRef?: unknown;
    onScrRefChange?: (scrRef: unknown) => void;
  };
  return {
    Editorial: React.forwardRef((props: EditorialMockProps, ref: React.Ref<unknown>) => {
      capturedEditorOptions(props.options);
      capturedEditorScrRef(props.scrRef);
      captureEditorScrRefChange(props.onScrRefChange);
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

// Chapter whose verses start at 2 — fall-forward to verse 1 finds nothing here.
const noVerseOneChapterUsj = usxStringToUsj(`<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="GEN" style="id">Sample</book>
  <chapter number="1" style="c" sid="GEN 1" />
  <para style="p">
    <verse number="2" style="v" sid="GEN 1:2" />verse two<verse eid="GEN 1:2" /></para>
</usx>
`);

// The shape the feature exists for: real verse-0 front matter (intro + superscription + heading)
// ahead of verse 1. None of it may leak into the one-verse-tall cell.
const frontMatterChapterUsj = usxStringToUsj(`<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="PSA" style="id">Sample</book>
  <para style="ip">Book introduction prose.</para>
  <chapter number="3" style="c" sid="PSA 3" />
  <para style="d">A Psalm of David, when he fled.</para>
  <para style="s">Morning Prayer</para>
  <para style="p">
    <verse number="1" style="v" sid="PSA 3:1" />verse one<verse eid="PSA 3:1" /></para>
</usx>
`);

// Chapter whose opening verse is a combined range, so verse 1 resolves into "1-3".
const combinedOpeningChapterUsj = usxStringToUsj(`<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="GEN" style="id">Sample</book>
  <chapter number="1" style="c" sid="GEN 1" />
  <para style="p">
    <verse number="1-3" style="v" sid="GEN 1:1-3" />combined opening<verse eid="GEN 1:1-3" /></para>
</usx>
`);

// 3-tuple [data, setData, isLoading].
function setUsjResult(value: unknown, isLoading = false) {
  mockUseProjectData.mockReturnValue({ ChapterUSJ: () => [value, vi.fn(), isLoading] });
}

/**
 * Serialized USJ most recently handed to the editor.
 *
 * Throws rather than returning '' when nothing was fed: an empty string silently satisfies every
 * `.not.toContain(...)`, so a vacuous assertion would pass unnoticed. If the editor was never fed,
 * assert `expect(setUsjSpy).not.toHaveBeenCalled()` instead of inspecting content.
 */
function lastFedUsjText(): string {
  if (!setUsjSpy.mock.lastCall) throw new Error('setUsj was never called — nothing was fed');
  const [fedUsj] = setUsjSpy.mock.lastCall;
  return JSON.stringify(fedUsj);
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
  // The captured handler lives in a plain hoisted closure, which `clearAllMocks` does not reset.
  // Without this, a test that drives the write-back channel without rendering Editorial would fire
  // the PREVIOUS test's handler and pass vacuously.
  captureEditorScrRefChange(undefined);
  mockUseProjectSetting.mockReturnValue(['ltr', vi.fn(), vi.fn(), false]);
});

describe('ResourceCell', () => {
  it('shows "Resource not installed" and no editor when projectId is undefined (unavailable resource)', () => {
    setUsjResult(undefined, true);
    render(
      <ResourceCell
        resourceRef={{ resourceId: 'dbl-uid-1', projectId: undefined, label: 'NIV' }}
        scrRef={scrRef}
        setScrRef={vi.fn()}
      />,
    );
    expect(screen.getByText('Resource not installed')).toBeInTheDocument();
    expect(screen.queryByText('Resource is loading…')).not.toBeInTheDocument();
    expect(screen.queryByText('No content for this reference')).not.toBeInTheDocument();
    expect(screen.queryByTestId('editorial')).not.toBeInTheDocument();
  });
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
    expect(screen.getByText('No content for this reference')).toBeInTheDocument();
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
    expect(lastFedUsjText()).toContain('verse two');
    expect(lastFedUsjText()).not.toContain('verse one'); // sliced, not whole chapter
  });

  it('chapter mode is unchanged: feeds the whole chapter', async () => {
    renderResourceCell({
      viewMode: 'chapter',
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 2 },
      chapterUsj: twoVerseChapterUsj,
    });
    await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());
    expect(lastFedUsjText()).toContain('verse one'); // whole chapter present
  });

  it('verse mode with no text for the verse shows the empty state, not the editor or "loading…"', async () => {
    renderResourceCell({
      viewMode: 'verse',
      // A verse this resource does not have (the chapter stops at verse 2) — the genuinely-missing
      // case, which keeps the ghost text. Verse 0 does not reach here; it falls forward below.
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 99 },
      chapterUsj: twoVerseChapterUsj,
    });
    // The empty label is rendered; the editor is not.
    expect(await screen.findByText(/no text for this verse/i)).toBeInTheDocument();
    expect(setUsjSpy).not.toHaveBeenCalled();
    expect(screen.queryByTestId('editorial')).not.toBeInTheDocument();
  });
});

// Verse 0 is everything preceding verse 1, which a one-verse-tall cell cannot render usefully, so a
// verse-0 reference displays verse 1, matching Paratext 9.
describe('ResourceCell verse-0 fall-forward (PT-3133)', () => {
  const verse0 = { book: 'GEN', chapterNum: 1, verseNum: 0 };

  it('verse mode at verse 0 displays verse 1, not the empty state', async () => {
    renderResourceCell({ viewMode: 'verse', scrRef: verse0, chapterUsj: twoVerseChapterUsj });
    await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());
    expect(lastFedUsjText()).toContain('verse one');
    expect(lastFedUsjText()).not.toContain('verse two'); // still a single-verse slice
    expect(screen.queryByText(/no text for this verse/i)).not.toBeInTheDocument();
  });

  it('falls back to the empty state when the chapter has no verse 1 either', async () => {
    renderResourceCell({ viewMode: 'verse', scrRef: verse0, chapterUsj: noVerseOneChapterUsj });
    expect(await screen.findByText(/no text for this verse/i)).toBeInTheDocument();
    // Must not scan forward to the next available verse — verse 2 is not what 1:0 means. Asserted as
    // "never fed" rather than "fed text lacking verse two": once the empty state renders the effect
    // has early-returned, so any content assertion would be inspecting a feed that never happened.
    expect(setUsjSpy).not.toHaveBeenCalled();
  });

  it('shows only verse 1, never the intro, superscription, or heading above it', async () => {
    renderResourceCell({
      viewMode: 'verse',
      scrRef: { book: 'PSA', chapterNum: 3, verseNum: 0 },
      chapterUsj: frontMatterChapterUsj,
    });
    await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());
    // Front matter leaking in would blow out a one-verse-tall row — the whole point of the fix.
    expect(lastFedUsjText()).toContain('verse one');
    expect(lastFedUsjText()).not.toContain('Book introduction');
    expect(lastFedUsjText()).not.toContain('A Psalm of David');
    expect(lastFedUsjText()).not.toContain('Morning Prayer');
  });

  it('emits the combined verse marker once when verse 1 opens a range', async () => {
    renderResourceCell({
      viewMode: 'verse',
      scrRef: verse0,
      chapterUsj: combinedOpeningChapterUsj,
    });
    await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());
    // Count the MARKER, not the text: a PT-3495 regression duplicates the opener, not the content.
    expect(lastFedUsjText().match(/"number":"1-3"/g)).toHaveLength(1);
  });

  it('hands the editor the unresolved reference — only the displayed text falls forward', async () => {
    renderResourceCell({ viewMode: 'verse', scrRef: verse0, chapterUsj: twoVerseChapterUsj });
    await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());
    expect(capturedEditorScrRef).toHaveBeenLastCalledWith(expect.objectContaining({ verseNum: 0 }));
  });

  // `Editorial` is mocked, so these exercise ResourceCell's own write-back channel directly: they
  // pin OUR side of the contract — which reports we forward and which we swallow. They are NOT
  // evidence about the plugin, and the payloads are constructed, not observed. With the editor this
  // repo builds (dev-packages 0.8.15) the plugin reports nothing at all in verse mode, because
  // `$resolvePosition` will not describe a position in a document with no BookNode and no
  // ChapterNode and `sliceUsjToVerse` drops both. These stay because they pin the guard's shape for
  // the day slices become addressable — see `resource-cell.component.tsx`.
  it('swallows the editor write-back at verse 0 so a click cannot move the scroll group', async () => {
    const setScrRef = vi.fn();
    setUsjResult(twoVerseChapterUsj, false);
    render(
      <ResourceCell
        {...props}
        setScrRef={setScrRef}
        viewMode="verse"
        scrRef={{ ...verse0, chapterNum: 5 }}
      />,
    );
    await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());
    getEditorScrRefChange()?.({ book: 'GEN', chapterNum: 1, verseNum: 1 });
    expect(setScrRef).not.toHaveBeenCalled();
  });

  // The other half of the same contract: the guard keys on fall-forward, not on verse mode alone.
  // Again about OUR branch, not a claim that the plugin fires here.
  it('still reports editor selection changes when the verse did not fall forward', async () => {
    const setScrRef = vi.fn();
    setUsjResult(twoVerseChapterUsj, false);
    render(
      <ResourceCell
        {...props}
        setScrRef={setScrRef}
        viewMode="verse"
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 2 }}
      />,
    );
    await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());
    const reported = { book: 'GEN', chapterNum: 1, verseNum: 2 };
    getEditorScrRefChange()?.(reported);
    expect(setScrRef).toHaveBeenCalledWith(reported);
  });

  // The `viewMode` half of the guard, and the one case here that is NOT hypothetical: chapter mode
  // feeds a whole chapter, so the document is addressable and the plugin really does report. Verse 0
  // is an ordinary reference there — the cell shows the front matter. Dropping `viewMode` from the
  // guard would leave the grid's chapter mode and the Resource Viewer unable to sync at any
  // chapter's verse 0, which no other test here would catch.
  it('does not swallow the write-back in chapter mode at verse 0 — the guard is verse-mode only', async () => {
    const setScrRef = vi.fn();
    setUsjResult(frontMatterChapterUsj, false);
    render(
      <ResourceCell
        {...props}
        setScrRef={setScrRef}
        viewMode="chapter"
        scrRef={{ book: 'PSA', chapterNum: 3, verseNum: 0 }}
      />,
    );
    await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());
    const reported = { book: 'PSA', chapterNum: 3, verseNum: 1 };
    getEditorScrRefChange()?.(reported);
    expect(setScrRef).toHaveBeenCalledWith(reported);
  });

  // Leaving the empty state, which the tests above only ever enter. `ResourceCellView` swaps the
  // editor out entirely for the ghost-text label while `isVerseEmpty`, so `Editorial` unmounts
  // and `editorRef.current` goes null; navigating to a verse the resource HAS remounts it and
  // the effect must refeed. That only works because React assigns refs during commit, before
  // effects run — an ordering dependency nothing else here guards. Fall-forward makes this
  // transition reachable at every chapter boundary, so the refeed matters.
  it('refeeds the slice when navigating out of the empty state into a verse that exists', async () => {
    setUsjResult(twoVerseChapterUsj, false);
    const { rerender } = render(
      <ResourceCell
        {...props}
        viewMode="verse"
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 99 }}
      />,
    );
    expect(await screen.findByText(/no text for this verse/i)).toBeInTheDocument();
    expect(setUsjSpy).not.toHaveBeenCalled(); // editor is unmounted; nothing fed

    rerender(
      <ResourceCell
        {...props}
        viewMode="verse"
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 2 }}
      />,
    );
    await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());
    expect(lastFedUsjText()).toContain('verse two');
    expect(screen.queryByText(/no text for this verse/i)).not.toBeInTheDocument();
  });

  it('chapter mode keeps verse-0 front matter — it is exempt from fall-forward', async () => {
    renderResourceCell({
      viewMode: 'chapter',
      scrRef: { book: 'PSA', chapterNum: 3, verseNum: 0 },
      chapterUsj: frontMatterChapterUsj,
    });
    await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());
    expect(lastFedUsjText()).toContain('A Psalm of David');
    expect(lastFedUsjText()).toContain('Morning Prayer');
  });
});

describe('ResourceCell name display', () => {
  it('verse mode uses the inline hanging name (name shares a row with the editor)', async () => {
    setUsjResult(chapter, false);
    const { container } = render(<ResourceCell {...props} viewMode="verse" />);
    const cellRoot = container.firstElementChild;
    const name = screen.getByText('WEB');
    const editorial = await screen.findByTestId('editorial');
    // Inline: name and editor share an intermediate row, not the cell root directly.
    expect(name.parentElement).not.toBe(cellRoot);
    expect(name.parentElement).toContainElement(editorial);
  });

  it('chapter mode uses the header band (name sits in the band atop the cell root)', () => {
    setUsjResult(chapter, false);
    const { container } = render(<ResourceCell {...props} viewMode="chapter" />);
    const cellRoot = container.firstElementChild;
    const name = screen.getByText('WEB');
    // Header mode: the name sits in a header band (which also hosts the zoom kebab) that is a
    // direct child of the cell root, not an inline row shared with the editor.
    expect(name.parentElement?.parentElement).toBe(cellRoot);
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

  it('does NOT forward a contextMenu to the editor when zoom and zoomMenuLabels are provided', () => {
    // Zoom items are now surfaced via the view's own right-click DropdownMenu (intercept in
    // capture phase), not via EditorOptions.contextMenu. The editor options should never contain
    // a contextMenu so the editor's built-in menu and our menu don't conflict.
    const zoom = {
      getZoom: () => 1,
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

    expect(capturedEditorOptions).toHaveBeenCalled();
    const [lastOptions] = capturedEditorOptions.mock.lastCall ?? [];
    // The editor must not receive a contextMenu — zoom is handled by the view's own right-click menu.
    expect(lastOptions?.contextMenu).toBeUndefined();
  });
});
