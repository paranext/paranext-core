// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScriptureTextGrid } from './scripture-text-grid.component';
import type { ResourceZoomController } from './use-resource-zoom.hook';

const mockResourceCell = vi.fn(
  ({
    resourceRef,
    scrRef,
    viewMode,
    onActivate,
  }: {
    resourceRef: { label: string; projectId: string; resourceId: string };
    scrRef: { verseNum: number };
    viewMode?: string;
    onActivate?: () => void;
  }) => (
    <div
      role="gridcell"
      aria-label={resourceRef.label}
      data-view-mode={viewMode}
      data-testid={`cell-${resourceRef.projectId}`}
      tabIndex={onActivate ? 0 : undefined}
      onClick={onActivate}
      onKeyDown={(event) => {
        if (event.key === 'Enter') onActivate?.();
      }}
    >{`${resourceRef.label}@${scrRef.verseNum}`}</div>
  ),
);

vi.mock('./resource-cell.component', () => ({
  ResourceCell: (props: Parameters<typeof mockResourceCell>[0]) => mockResourceCell(props),
}));

vi.mock('./use-resource-zoom-input.hook', () => ({
  useResourceZoomInput: vi.fn(),
}));

vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    ResizablePanelGroup: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="resizable-panel-group">{children}</div>
    ),
    ResizablePanel: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="resizable-panel">{children}</div>
    ),
    ResizableHandle: () => <div data-testid="resizable-handle" />,
  };
});

const scrRef = { book: 'MAT', chapterNum: 5, verseNum: 3, versificationStr: 'English' };
const setScrRef = vi.fn();
const resources = [
  { resourceId: 'r-a', projectId: 'a', label: 'WEB' },
  { resourceId: 'r-b', projectId: 'b', label: 'KJV' },
  { resourceId: 'r-c', projectId: 'c', label: 'עברית' },
];

type RenderOptions = { zoom?: ResourceZoomController };

function renderGrid(gridResources: typeof resources, options: RenderOptions = {}) {
  const result = render(
    <ScriptureTextGrid
      resources={gridResources}
      scrRef={scrRef}
      setScrRef={setScrRef}
      {...(options.zoom ? { zoom: options.zoom } : {})}
    />,
  );
  return {
    ...result,
    rerender: (nextResources: typeof resources, nextOptions: RenderOptions = {}) =>
      result.rerender(
        <ScriptureTextGrid
          resources={nextResources}
          scrRef={scrRef}
          setScrRef={setScrRef}
          {...(nextOptions.zoom ? { zoom: nextOptions.zoom } : {})}
        />,
      ),
  };
}

// Reset between tests so per-test assertions on the mock's calls aren't polluted by prior renders.
beforeEach(() => {
  mockResourceCell.mockClear();
});

describe('ScriptureTextGrid', () => {
  it('renders one gridcell per resource in effective-list order', () => {
    render(<ScriptureTextGrid resources={resources} scrRef={scrRef} setScrRef={setScrRef} />);
    expect(screen.getAllByRole('gridcell').map((c) => c.getAttribute('aria-label'))).toEqual([
      'WEB',
      'KJV',
      'עברית',
    ]);
  });
  it('feeds the same scrRef to every cell', () => {
    render(<ScriptureTextGrid resources={resources} scrRef={scrRef} setScrRef={setScrRef} />);
    expect(screen.getByText('WEB@3')).toBeInTheDocument();
    expect(screen.getByText('KJV@3')).toBeInTheDocument();
  });
  it('names the grid region with the provided accessible label', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        ariaLabel="Text Collection"
      />,
    );
    expect(screen.getByRole('grid', { name: 'Text Collection' })).toBeInTheDocument();
  });
  it('has grid and row roles', () => {
    render(<ScriptureTextGrid resources={resources} scrRef={scrRef} setScrRef={setScrRef} />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.getByRole('row')).toBeInTheDocument();
  });
  it('renders a single resource as a whole-chapter region, not a verse grid', () => {
    render(
      <ScriptureTextGrid
        resources={[{ projectId: 'a', label: 'WEB' }]}
        scrRef={scrRef}
        setScrRef={setScrRef}
        ariaLabel="Text Collection"
      />,
    );
    // Single resource: a labeled region rendering the whole chapter — not the verse-cell grid/row.
    expect(screen.getByRole('region', { name: 'Text Collection' })).toBeInTheDocument();
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    expect(screen.queryByRole('row')).not.toBeInTheDocument();
    expect(screen.getByTestId('cell-a')).toHaveAttribute('data-view-mode', 'chapter');
  });
  it('defaults row cells to verse view mode', () => {
    render(<ScriptureTextGrid resources={resources} scrRef={scrRef} setScrRef={setScrRef} />);
    expect(screen.getByTestId('cell-a')).toHaveAttribute('data-view-mode', 'verse');
    expect(screen.getByTestId('cell-b')).toHaveAttribute('data-view-mode', 'verse');
  });
  it('does not render the chapter-context split when closed', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={vi.fn()}
      />,
    );
    expect(screen.queryByTestId('scripture-text-grid-chapter-context')).not.toBeInTheDocument();
    expect(screen.queryByTestId('resizable-panel-group')).not.toBeInTheDocument();
  });
  it('opens the chapter-context split for the activated resource', () => {
    const onChapterContextChange = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={onChapterContextChange}
      />,
    );
    fireEvent.click(screen.getByTestId('cell-b'));
    expect(onChapterContextChange).toHaveBeenCalledWith(resources[1]);
  });
  it('renders the chapter-context region when split is open', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[1]}
        onChapterContextChange={vi.fn()}
      />,
    );
    expect(screen.getByTestId('resizable-panel-group')).toBeInTheDocument();
    expect(screen.getByTestId('scripture-text-grid-chapter-context')).toHaveAttribute(
      'aria-label',
      'KJV',
    );
    // Row cells stay verse mode; chapter panel uses chapter mode.
    expect(screen.getByTestId('cell-a')).toHaveAttribute('data-view-mode', 'verse');
    const chapterCells = mockResourceCell.mock.calls.filter(
      (call) => call[0].viewMode === 'chapter',
    );
    expect(chapterCells).toHaveLength(1);
    expect(chapterCells[0][0].resourceRef).toEqual(resources[1]);
  });
  it('closes the split via the labeled close button', () => {
    const onChapterContextClose = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[1]}
        onChapterContextChange={vi.fn()}
        onChapterContextClose={onChapterContextClose}
        closeChapterContextLabel="Close chapter view"
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close chapter view' }));
    expect(onChapterContextClose).toHaveBeenCalledTimes(1);
  });
  it('restores focus to the opening cell when the split closes', () => {
    const { rerender } = render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={vi.fn()}
      />,
    );
    // Activating a cell records it as the focus-restore target.
    fireEvent.click(screen.getByTestId('cell-b'));
    // Open, then close the split (the parent controls `chapterContext`).
    rerender(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[1]}
        onChapterContextChange={vi.fn()}
      />,
    );
    rerender(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={vi.fn()}
      />,
    );
    expect(screen.getByTestId('cell-b')).toHaveFocus();
  });

  it('tags each cell with its stable data-resource-id', () => {
    renderGrid([
      { resourceId: 'r1', projectId: 'p1', label: 'WEB' },
      { resourceId: 'r2', projectId: 'p2', label: 'NIV' },
    ]);
    expect(document.querySelector('[data-resource-id="r1"]')).not.toBeNull();
    expect(document.querySelector('[data-resource-id="r2"]')).not.toBeNull();
  });

  it('prunes zoom entries for resources no longer present', () => {
    const zoom: ResourceZoomController = {
      getZoom: () => 1,
      setZoomForResource: vi.fn(),
      adjustZoom: vi.fn(),
      resetZoom: vi.fn(),
      pruneToResourceIds: vi.fn(),
    };
    const { rerender } = renderGrid(
      [
        { resourceId: 'r1', projectId: 'p1', label: 'WEB' },
        { resourceId: 'r2', projectId: 'p2', label: 'NIV' },
      ],
      { zoom },
    );
    expect(zoom.pruneToResourceIds).toHaveBeenLastCalledWith(['r1', 'r2']);
    rerender([{ resourceId: 'r1', projectId: 'p1', label: 'WEB' }], { zoom });
    expect(zoom.pruneToResourceIds).toHaveBeenLastCalledWith(['r1']);
  });
});
