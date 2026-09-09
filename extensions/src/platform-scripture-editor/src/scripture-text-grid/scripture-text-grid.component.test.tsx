// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ScriptureTextGrid } from './scripture-text-grid.component';
import type { ResourceZoomController } from './use-resource-zoom.hook';

/** Verse blocks the mocked cell renders in aligned mode; `top` is the stubbed geometry. */
let alignedVerseBlocks: { start: number; end: number; top: number }[] = [];

const mockResourceCell = vi.fn(
  ({
    resourceRef,
    scrRef,
    // setScrRef stays in the type (so mock.calls[n][0].setScrRef type-checks in the setter-sync test)
    // but is not destructured here because it is not used in the rendered JSX.
    viewMode,
    showDragHandle,
    reorderHandleLabel,
    onReorderKeyDown,
    headerDrag,
  }: {
    resourceRef: { label: string; projectId: string; resourceId: string };
    scrRef: { verseNum: number };
    setScrRef: (scrRef: unknown) => void;
    viewMode?: string;
    showDragHandle?: boolean;
    reorderHandleLabel?: string;
    onReorderKeyDown?: (event: React.KeyboardEvent) => void;
    headerDrag?: { onDragStart: () => void; onDragEnd: () => void };
  }) => (
    <div data-testid={`cell-${resourceRef.projectId}`} data-view-mode={viewMode}>
      {`${resourceRef.label}@${scrRef.verseNum}`}
      {/* The real cell's header band, which is the reorder drag source — the column itself must not
          be draggable, or a click-drag over the text starts a reorder instead of selecting. */}
      {headerDrag ? (
        <div
          data-cell-header
          data-testid={`header-${resourceRef.resourceId}`}
          draggable
          onDragStart={headerDrag.onDragStart}
          onDragEnd={headerDrag.onDragEnd}
        />
      ) : undefined}
      {/* In the aligned grid the real cell renders an editor whose verse blocks carry the range the
          layout places them on, and which the reference scroll targets. Stand in for those, with
          the geometry the scroll reads (jsdom measures nothing) declared per element. */}
      {viewMode === 'aligned' ? (
        <>
          <div data-cell-header data-stub-top="0" data-stub-height="20" />
          {alignedVerseBlocks.map((block) => (
            <div
              key={block.start}
              className="verse-block"
              data-testid={`block-${resourceRef.projectId}-${block.start}`}
              data-verse-start={block.start}
              data-verse-end={block.end}
              data-stub-top={block.top}
            />
          ))}
        </>
      ) : undefined}
      {showDragHandle ? (
        // Mirror the real wiring: a focusable grip that forwards keydown and exposes its id.
        // NOTE: the real `ResourceCellView` renders this only in its header-band layout, so a verse
        // -view test that uses it is exercising the handler, not the rendered UI. The grip's own
        // presence is covered against the real component in `resource-cell-view.component.test.tsx`.
        <button
          type="button"
          data-reorder-handle-id={resourceRef.resourceId}
          data-testid={`grip-${resourceRef.resourceId}`}
          aria-label={reorderHandleLabel}
          // Mirror the real grip: stop click bubbling so a reorder grip click never activates the
          // enclosing verse listitem's chapter-context split.
          onClick={(event: React.MouseEvent) => event.stopPropagation()}
          onKeyDown={onReorderKeyDown}
        >
          grip
        </button>
      ) : undefined}
    </div>
  ),
);

vi.mock('./resource-cell.component', () => ({
  ResourceCell: (props: Parameters<typeof mockResourceCell>[0]) => mockResourceCell(props),
}));

vi.mock('./use-resource-zoom-input.hook', () => ({
  useResourceZoomInput: vi.fn(),
}));

// Mutable so a test can model an inactive dock tab. `useViewVisibility` itself needs an
// IntersectionObserver, which jsdom has not got, and would report `false` regardless because jsdom
// reports zero geometry for everything — so the aligned grid's deferred scroll could never be
// observed without this.
const mockVisibility = { isVisible: true };

vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    useViewVisibility: () => mockVisibility.isVisible,
    // The aligned stylesheet is inert in jsdom, which lays nothing out, so injecting ~400 rules per
    // mount would only cost parse time. `aligned-grid.styles.test.ts` asserts its content instead.
    useStylesheet: () => {},
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
  it('renders one listitem per resource in effective-list order', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        cellAccessibleNameTemplate="{resourceName}, {reference}"
      />,
    );
    expect(screen.getAllByRole('listitem').map((c) => c.getAttribute('aria-label'))).toEqual([
      'WEB, MAT 5:3',
      'KJV, MAT 5:3',
      'עברית, MAT 5:3',
    ]);
  });
  it('announces verse 1 at a verse-0 reference, matching what the cells render (PT-3133)', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={{ ...scrRef, verseNum: 0 }}
        setScrRef={setScrRef}
        cellAccessibleNameTemplate="{resourceName}, {reference}"
      />,
    );
    // Cells fall forward to verse 1, so announcing "5:0" would contradict the rendered verse number.
    expect(screen.getAllByRole('listitem').map((c) => c.getAttribute('aria-label'))).toEqual([
      'WEB, MAT 5:1',
      'KJV, MAT 5:1',
      'עברית, MAT 5:1',
    ]);
  });
  it('feeds the same scrRef to every cell', () => {
    render(<ScriptureTextGrid resources={resources} scrRef={scrRef} setScrRef={setScrRef} />);
    expect(screen.getByText('WEB@3')).toBeInTheDocument();
    expect(screen.getByText('KJV@3')).toBeInTheDocument();
  });
  it('names the list region with the provided accessible label', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        ariaLabel="Text Collection"
      />,
    );
    expect(screen.getByRole('list', { name: 'Text Collection' })).toBeInTheDocument();
  });
  it('has list and listitem roles, no grid or row', () => {
    render(<ScriptureTextGrid resources={resources} scrRef={scrRef} setScrRef={setScrRef} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(resources.length);
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    expect(screen.queryByRole('row')).not.toBeInTheDocument();
  });
  it('renders a single resource as a whole-chapter region, not a verse list', () => {
    render(
      <ScriptureTextGrid
        resources={[{ resourceId: 'r-a', projectId: 'a', label: 'WEB' }]}
        scrRef={scrRef}
        setScrRef={setScrRef}
        ariaLabel="Text Collection"
      />,
    );
    // Single resource: a labeled region rendering the whole chapter — not the verse-cell list.
    expect(screen.getByRole('region', { name: 'Text Collection' })).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
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
  it('opens the chapter-context split for the activated listitem', () => {
    const onChapterContextChange = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={onChapterContextChange}
      />,
    );
    // Click the listitem wrapper (not the mock cell inside it).
    const listitems = screen.getAllByRole('listitem');
    fireEvent.click(listitems[1]);
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
  it('restores focus to the opening listitem when the split closes', () => {
    const { rerender } = render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={vi.fn()}
      />,
    );
    // Activating a listitem records it as the focus-restore target.
    const listitems = screen.getAllByRole('listitem');
    fireEvent.click(listitems[1]);
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
    // The listitem with data-project-id="b" should receive focus.
    const focusedListitem = document.querySelector('[data-project-id="b"]');
    expect(focusedListitem).toHaveFocus();
  });
});

describe('ScriptureTextGrid — chapter view', () => {
  it('stacks one chapter cell per resource, each in its own region', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        ariaLabel="Text Collection"
      />,
    );
    // A group of N labeled regions (vertical stack), not a verse list.
    expect(screen.getByRole('group', { name: 'Text Collection' })).toBeInTheDocument();
    const regions = screen.getAllByRole('region');
    expect(regions).toHaveLength(resources.length);
    expect(regions.map((r) => r.getAttribute('aria-label'))).toEqual(['WEB', 'KJV', 'עברית']);
    regions.forEach((r) => {
      // The cell inside each region is in chapter mode.
      const cell = r.querySelector('[data-view-mode]');
      expect(cell).toHaveAttribute('data-view-mode', 'chapter');
    });
  });

  it('does not open a chapter-context split in chapter mode, even when a handler is provided', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        onChapterContextChange={vi.fn()}
      />,
    );
    // No listitem in chapter mode — not activatable.
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    expect(screen.queryByTestId('resizable-panel-group')).not.toBeInTheDocument();
    expect(screen.queryByTestId('scripture-text-grid-chapter-context')).not.toBeInTheDocument();
  });

  it('gives every chapter cell the shared scrRef setter (selection stays in sync)', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
      />,
    );
    const setters = mockResourceCell.mock.calls.map((call) => call[0].setScrRef);
    expect(setters).toHaveLength(resources.length);
    setters.forEach((setter) => expect(setter).toBe(setScrRef));
  });

  it('renders a single resource as a whole-chapter region in chapter mode too', () => {
    render(
      <ScriptureTextGrid
        resources={[{ resourceId: 'r-a', projectId: 'a', label: 'WEB' }]}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        ariaLabel="Text Collection"
      />,
    );
    expect(screen.getByRole('region', { name: 'Text Collection' })).toBeInTheDocument();
    expect(screen.queryByRole('group')).not.toBeInTheDocument();
    expect(screen.getByTestId('cell-a')).toHaveAttribute('data-view-mode', 'chapter');
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

  it('does not call pruneToResourceIds when the resource list is empty (prevents data loss during source loading)', () => {
    const zoom: ResourceZoomController = {
      getZoom: () => 1,
      setZoomForResource: vi.fn(),
      adjustZoom: vi.fn(),
      resetZoom: vi.fn(),
      pruneToResourceIds: vi.fn(),
    };
    renderGrid([], { zoom });
    expect(zoom.pruneToResourceIds).not.toHaveBeenCalled();
  });

  it('single-resource container exposes data-resource-id so the zoom input hook can resolve the target', () => {
    renderGrid([{ resourceId: 'r-solo', projectId: 'p-solo', label: 'SOLO' }]);
    expect(document.querySelector('[data-resource-id="r-solo"]')).not.toBeNull();
  });

  it('chapter-context region exposes data-resource-id for its resource so Ctrl+wheel zoom works over the split panel', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[1]}
        onChapterContextChange={vi.fn()}
      />,
    );
    const chapterContextRegion = screen.getByTestId('scripture-text-grid-chapter-context');
    expect(chapterContextRegion).toHaveAttribute('data-resource-id', resources[1].resourceId);
  });
});

// Reorder (drag + keyboard) is also wired into the verse view's vertical listitems, reusing the
// same handlers but with vertical drag and ArrowUp/ArrowDown on the grips.
describe('ScriptureTextGrid — verse view reorder', () => {
  it('calls onReorder with the reordered id sequence after a drag-and-drop', () => {
    const onReorder = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="verse"
        onReorder={onReorder}
      />,
    );
    const wrappers = screen.getAllByTestId('scripture-text-grid-cell-draggable');
    fireEvent.dragStart(wrappers[1]); // drag KJV (resourceId 'r-b')
    fireEvent.drop(wrappers[0]); // onto WEB (resourceId 'r-a')
    expect(onReorder).toHaveBeenCalledWith(['r-b', 'r-a', 'r-c']);
  });
  it('keyboard: ArrowDown on the first item moves it one position toward the end', () => {
    const onReorder = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="verse"
        onReorder={onReorder}
        getReorderHandleLabel={(name) => `Reorder ${name}`}
      />,
    );
    fireEvent.keyDown(screen.getByTestId('grip-r-a'), { key: 'ArrowDown' });
    expect(onReorder).toHaveBeenCalledWith(['r-b', 'r-a', 'r-c']);
  });
  it('keyboard: ArrowUp on the first item is a no-op at the start boundary', () => {
    const onReorder = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="verse"
        onReorder={onReorder}
        getReorderHandleLabel={(name) => `Reorder ${name}`}
      />,
    );
    fireEvent.keyDown(screen.getByTestId('grip-r-a'), { key: 'ArrowUp' });
    expect(onReorder).not.toHaveBeenCalled();
  });
  it('highlights the hovered drop-target item and clears the highlight on dragEnd', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="verse"
        onReorder={vi.fn()}
      />,
    );
    const wrappers = screen.getAllByTestId('scripture-text-grid-cell-draggable');
    fireEvent.dragStart(wrappers[1]); // drag KJV (resourceId 'r-b')
    fireEvent.dragOver(wrappers[0]); // hover over WEB (resourceId 'r-a')
    expect(wrappers[0].className).toContain('tw:ring-2');
    expect(wrappers[0].className).toContain('tw:ring-inset');
    expect(wrappers[0].className).toContain('tw:ring-primary');
    fireEvent.dragEnd(wrappers[1]);
    expect(wrappers[0].className).not.toContain('tw:ring-2');
  });
  it('grip click does not trigger chapter-context activation', () => {
    const onChapterContextChange = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="verse"
        onReorder={vi.fn()}
        onChapterContextChange={onChapterContextChange}
        getReorderHandleLabel={(name) => `Reorder ${name}`}
      />,
    );
    fireEvent.click(screen.getByTestId('grip-r-a'));
    expect(onChapterContextChange).not.toHaveBeenCalled();
  });
});

// Reorder (drag + keyboard) is wired into the chapter view's side-by-side columns.
describe('ScriptureTextGrid — chapter view reorder', () => {
  it('calls onReorder with the reordered id sequence after a drag-and-drop', () => {
    const onReorder = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        onReorder={onReorder}
      />,
    );
    const wrappers = screen.getAllByTestId('scripture-text-grid-column-drop-target');
    fireEvent.dragStart(screen.getByTestId('header-r-b')); // drag KJV by its header
    fireEvent.drop(wrappers[0]); // onto WEB (resourceId 'r-a')
    expect(onReorder).toHaveBeenCalledWith(['r-b', 'r-a', 'r-c']);
  });
  it('highlights the hovered drop-target cell and clears the highlight on dragEnd', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        onReorder={vi.fn()}
      />,
    );
    const wrappers = screen.getAllByTestId('scripture-text-grid-column-drop-target');
    fireEvent.dragStart(screen.getByTestId('header-r-b')); // drag KJV by its header
    fireEvent.dragOver(wrappers[0]); // hover over WEB (resourceId 'r-a')
    expect(wrappers[0].className).toContain('tw:ring-2');
    expect(wrappers[0].className).toContain('tw:ring-inset');
    expect(wrappers[0].className).toContain('tw:ring-primary');
    fireEvent.dragEnd(screen.getByTestId('header-r-b'));
    expect(wrappers[0].className).not.toContain('tw:ring-2');
  });
  it('does not highlight the dragged cell itself when hovered', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        onReorder={vi.fn()}
      />,
    );
    const wrappers = screen.getAllByTestId('scripture-text-grid-column-drop-target');
    fireEvent.dragStart(screen.getByTestId('header-r-b')); // drag KJV by its header
    fireEvent.dragOver(wrappers[1]); // hover over itself
    expect(wrappers[1].className).not.toContain('tw:ring-2');
  });
  it('clears the drop-target highlight after drop', () => {
    const onReorder = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        onReorder={onReorder}
      />,
    );
    const wrappers = screen.getAllByTestId('scripture-text-grid-column-drop-target');
    fireEvent.dragStart(screen.getByTestId('header-r-b'));
    fireEvent.dragOver(wrappers[0]);
    expect(wrappers[0].className).toContain('tw:ring-2');
    fireEvent.drop(wrappers[0]);
    expect(wrappers[0].className).not.toContain('tw:ring-2');
  });
  it('keyboard: ArrowRight on the first cell moves it one position toward the end', () => {
    const onReorder = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        onReorder={onReorder}
        getReorderHandleLabel={(name) => `Reorder ${name}`}
      />,
    );
    fireEvent.keyDown(screen.getByTestId('grip-r-a'), { key: 'ArrowRight' });
    expect(onReorder).toHaveBeenCalledWith(['r-b', 'r-a', 'r-c']);
  });
  it('keyboard: ArrowLeft on the first cell is a no-op at the start boundary', () => {
    const onReorder = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        onReorder={onReorder}
        getReorderHandleLabel={(name) => `Reorder ${name}`}
      />,
    );
    fireEvent.keyDown(screen.getByTestId('grip-r-a'), { key: 'ArrowLeft' });
    expect(onReorder).not.toHaveBeenCalled();
  });
  it('keyboard: the live region announces the move after a successful keyboard reorder', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        onReorder={vi.fn()}
        getReorderHandleLabel={(name) => `Reorder ${name}`}
        getReorderAnnouncement={(name, position, total) =>
          `Moved ${name} to position ${position} of ${total}`
        }
      />,
    );
    expect(screen.getByRole('status')).toHaveTextContent('');
    fireEvent.keyDown(screen.getByTestId('grip-r-a'), { key: 'ArrowRight' });
    expect(screen.getByRole('status')).toHaveTextContent('Moved WEB to position 2 of 3');
  });
  it('keyboard: ArrowLeft on a middle cell moves it one position toward the start', () => {
    const onReorder = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        onReorder={onReorder}
        getReorderHandleLabel={(name) => `Reorder ${name}`}
      />,
    );
    fireEvent.keyDown(screen.getByTestId('grip-r-b'), { key: 'ArrowLeft' });
    expect(onReorder).toHaveBeenCalledWith(['r-b', 'r-a', 'r-c']);
  });
  it('keyboard: ArrowRight on the last cell is a no-op at the end boundary', () => {
    const onReorder = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        onReorder={onReorder}
        getReorderHandleLabel={(name) => `Reorder ${name}`}
      />,
    );
    fireEvent.keyDown(screen.getByTestId('grip-r-c'), { key: 'ArrowRight' });
    expect(onReorder).not.toHaveBeenCalled();
  });
  it('keyboard: arrows move by logical index for an RTL cell (not visually flipped)', () => {
    const onReorder = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        onReorder={onReorder}
        getReorderHandleLabel={(name) => `Reorder ${name}`}
      />,
    );
    // 'r-c' (עברית) is the last logical cell; ArrowLeft moves it one slot toward the start.
    fireEvent.keyDown(screen.getByTestId('grip-r-c'), { key: 'ArrowLeft' });
    expect(onReorder).toHaveBeenCalledWith(['r-a', 'r-c', 'r-b']);
  });
  it('keyboard: restores focus to the moved cell grip after the row re-renders', () => {
    const { rerender } = render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        onReorder={vi.fn()}
        getReorderHandleLabel={(name) => `Reorder ${name}`}
      />,
    );
    fireEvent.keyDown(screen.getByTestId('grip-r-a'), { key: 'ArrowRight' });
    // The parent persists → the reordered resources come back as a new prop; the row re-renders
    // with 'r-a' in its new slot and focus must follow it to the moved grip.
    rerender(
      <ScriptureTextGrid
        resources={[resources[1], resources[0], resources[2]]}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        onReorder={vi.fn()}
        getReorderHandleLabel={(name) => `Reorder ${name}`}
      />,
    );
    expect(screen.getByTestId('grip-r-a')).toHaveFocus();
  });
});

describe('ScriptureTextGrid — aligned (Grid) view', () => {
  const alignedRef = { book: 'MAT', chapterNum: 5, verseNum: 1, versificationStr: 'English' };
  /** Height of the stubbed scroll port; a block below this is off screen. */
  const PORT_HEIGHT = 300;
  /** Height of the stubbed sticky header, which covers the top of the port. */
  const HEADER_HEIGHT = 20;

  /**
   * Jsdom lays nothing out, so every rect is zero and none of the scroll decisions would be
   * observable. Give each element the geometry it declares via `data-stub-*` instead.
   *
   * Verse blocks move with the port's scroll, as they would in a browser; the port and its
   * `position: sticky` header do not.
   */
  function stubGeometry() {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function stub(
      this: HTMLElement,
    ) {
      const isPort = this.getAttribute('data-testid') === 'scripture-text-grid-aligned';
      const port = this.closest<HTMLElement>('[data-testid="scripture-text-grid-aligned"]');
      const scrolledBy = this.classList.contains('verse-block') ? (port?.scrollTop ?? 0) : 0;
      const top = isPort ? 0 : Number(this.dataset.stubTop ?? 0) - scrolledBy;
      const height = isPort ? PORT_HEIGHT : Number(this.dataset.stubHeight ?? 0);
      return new DOMRect(0, top, 0, height);
    });
  }

  function renderAligned(
    reference: typeof alignedRef,
    gridResources: typeof resources = resources,
    extraProps: Record<string, unknown> = {},
  ) {
    const ui = (currentRef: typeof alignedRef) => (
      <ScriptureTextGrid
        resources={gridResources}
        scrRef={currentRef}
        setScrRef={setScrRef}
        viewMode="aligned"
        ariaLabel="Text Collection"
        {...extraProps}
      />
    );
    const result = render(ui(reference));
    const port = screen.getByTestId('scripture-text-grid-aligned');
    return { ...result, port, rerenderAt: (next: typeof alignedRef) => result.rerender(ui(next)) };
  }

  beforeEach(() => {
    mockVisibility.isVisible = true;
    // Verse 1 starts on screen; the 4-5 bridge is far below it.
    alignedVerseBlocks = [
      { start: 1, end: 1, top: 100 },
      { start: 4, end: 5, top: 900 },
    ];
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders every resource as a column of one grid, with no verse listitems', () => {
    renderAligned(alignedRef);

    expect(screen.getByTestId('scripture-text-grid-aligned')).toBeInTheDocument();
    expect(screen.getAllByRole('region')).toHaveLength(3);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('puts every cell in aligned mode, so each asks the editor for block verses', () => {
    renderAligned(alignedRef);

    expect(screen.getByTestId('cell-a')).toHaveAttribute('data-view-mode', 'aligned');
    expect(screen.getByTestId('cell-b')).toHaveAttribute('data-view-mode', 'aligned');
  });

  it('gives the scroll port a tab stop, since nothing that scrolls it can be focused', () => {
    // The columns do have tab stops — the reorder grip and the zoom kebab — but both sit in the
    // sticky header, which never moves. Without this the content below the fold is reachable only
    // by pointer, because Arrow and PageDown have nothing to scroll.
    const { port } = renderAligned(alignedRef, resources, {
      onReorder: vi.fn(),
      getReorderHandleLabel: (name: string) => `Reorder ${name}`,
    });

    expect(port).toHaveAttribute('tabindex', '0');
    expect(port.className).toContain('tw:focus-visible:ring-2');
  });

  it('lays out one column per resource', () => {
    const { port } = renderAligned(alignedRef);

    expect(port.style.gridTemplateColumns).toBe('repeat(3, minmax(16rem, 1fr))');
  });

  it('asks for one column while the resource list is still empty, since repeat() rejects zero', () => {
    // The web view passes an empty list briefly while its sources load.
    const { port } = renderAligned(alignedRef, []);

    expect(port.style.gridTemplateColumns).toBe('repeat(1, minmax(16rem, 1fr))');
  });

  it('renders a single resource as a one-column aligned grid, not a chapter view', () => {
    // Falling through to the chapter branch here would silently drop the aligned layout for anyone
    // down to one text.
    renderAligned(alignedRef, [resources[0]]);

    expect(screen.getByTestId('scripture-text-grid-aligned')).toBeInTheDocument();
    expect(screen.getByTestId('cell-a')).toHaveAttribute('data-view-mode', 'aligned');
  });

  it('opens no chapter-context split, even when a handler is provided', () => {
    renderAligned(alignedRef, resources, { onChapterContextChange: vi.fn() });

    fireEvent.click(screen.getAllByRole('region')[0]);

    expect(screen.queryByTestId('scripture-text-grid-chapter-context')).not.toBeInTheDocument();
  });

  describe('reorder', () => {
    const reorderProps = {
      onReorder: vi.fn(),
      getReorderHandleLabel: (name: string) => `Reorder ${name}`,
    };

    beforeEach(() => {
      reorderProps.onReorder.mockClear();
    });

    it('moves a column with the keyboard', () => {
      renderAligned(alignedRef, resources, reorderProps);

      fireEvent.keyDown(screen.getByTestId('grip-r-a'), { key: 'ArrowRight' });

      expect(reorderProps.onReorder).toHaveBeenCalledWith(['r-b', 'r-a', 'r-c']);
    });

    it('moves a column by dragging its header onto another column', () => {
      // The header is the drag source; the column is the drop target. A column-wide drag source
      // would start a reorder when the reader tried to select text.
      renderAligned(alignedRef, resources, reorderProps);
      const columns = screen.getAllByTestId('scripture-text-grid-column-drop-target');

      fireEvent.dragStart(screen.getByTestId('header-r-b'));
      fireEvent.drop(columns[0]);

      expect(reorderProps.onReorder).toHaveBeenCalledWith(['r-b', 'r-a', 'r-c']);
    });

    it('rings the hovered column as a drop target', () => {
      renderAligned(alignedRef, resources, reorderProps);
      const columns = screen.getAllByTestId('scripture-text-grid-column-drop-target');

      fireEvent.dragStart(screen.getByTestId('header-r-b'));
      fireEvent.dragOver(columns[0]);

      expect(columns[0].className).toContain('tw:ring-2');
    });
  });

  describe('scrolling to the reference', () => {
    it('scrolls a reference that is off screen to just below the sticky header', () => {
      stubGeometry();
      const { port, rerenderAt } = renderAligned(alignedRef);

      rerenderAt({ ...alignedRef, verseNum: 5 });

      // No block starts at verse 5; the 4-5 bridge covers it, and sits at 900.
      expect(port.scrollTop).toBe(900 - HEADER_HEIGHT);
    });

    it('leaves a reference that is already on screen where it is', () => {
      // Clicking a verse reports it as the new reference. Scrolling it to the top of the port would
      // move the passage out from under the reader in response to their own click.
      stubGeometry();
      const { port, rerenderAt } = renderAligned(alignedRef);

      rerenderAt({ ...alignedRef, verseNum: 1 });

      expect(port.scrollTop).toBe(0);
    });

    it('scrolls again when a late-arriving column pushes the target back off screen', async () => {
      stubGeometry();
      const { port, rerenderAt } = renderAligned(alignedRef);
      rerenderAt({ ...alignedRef, verseNum: 5 });
      expect(port.scrollTop).toBe(900 - HEADER_HEIGHT);

      // A slower resource renders: its verse 2 block appears, adding height above the target and
      // moving it down the page.
      alignedVerseBlocks = [
        { start: 1, end: 1, top: 100 },
        { start: 2, end: 2, top: 600 },
        { start: 4, end: 5, top: 1500 },
      ];
      rerenderAt({ ...alignedRef, verseNum: 5 });

      await waitFor(() => expect(port.scrollTop).toBe(1500 - HEADER_HEIGHT));
    });

    it('stops correcting once the reader scrolls, until the reference changes', async () => {
      stubGeometry();
      const { port, rerenderAt } = renderAligned(alignedRef);
      rerenderAt({ ...alignedRef, verseNum: 5 });
      expect(port.scrollTop).toBe(900 - HEADER_HEIGHT);

      // The reader scrolls away, then a slower resource renders and moves the target again.
      port.scrollTop = 200;
      alignedVerseBlocks = [
        { start: 1, end: 1, top: 100 },
        { start: 2, end: 2, top: 600 },
        { start: 4, end: 5, top: 1500 },
      ];
      rerenderAt({ ...alignedRef, verseNum: 5 });
      await waitFor(() => expect(screen.getByTestId('block-a-2')).toBeInTheDocument());

      expect(port.scrollTop).toBe(200);

      // A new reference re-arms it.
      rerenderAt({ ...alignedRef, verseNum: 1 });
      await waitFor(() => expect(port.scrollTop).toBe(100 - HEADER_HEIGHT));
    });

    it('keeps following the reference when the browser clamps scrollTop after content shrinks', async () => {
      // Removing a resource (or zooming one out) shortens the content, and the browser then clamps
      // scrollTop to the new bottom. That is not the reader moving the port, and reading it as such
      // stood the reference scroll down for good — silently killing the late-column correction in
      // the one case it exists for.
      stubGeometry();
      const { port, rerenderAt } = renderAligned(alignedRef);
      rerenderAt({ ...alignedRef, verseNum: 5 });
      expect(port.scrollTop).toBe(900 - HEADER_HEIGHT);

      // The port can now scroll only to 400, so the browser moves scrollTop down to it.
      Object.defineProperty(port, 'scrollHeight', { value: 400 + PORT_HEIGHT, configurable: true });
      Object.defineProperty(port, 'clientHeight', { value: PORT_HEIGHT, configurable: true });
      port.scrollTop = 400;

      // A slower resource then renders and moves the target, which must still be corrected.
      alignedVerseBlocks = [
        { start: 1, end: 1, top: 100 },
        { start: 2, end: 2, top: 600 },
        { start: 4, end: 5, top: 1500 },
      ];
      rerenderAt({ ...alignedRef, verseNum: 5 });

      await waitFor(() => expect(port.scrollTop).toBe(1500 - HEADER_HEIGHT));
    });

    it('defers the scroll while the tab is hidden and catches up when it is shown', () => {
      stubGeometry();
      mockVisibility.isVisible = false;
      const { port, rerenderAt } = renderAligned(alignedRef);

      rerenderAt({ ...alignedRef, verseNum: 5 });
      // A hidden rc-dock pane has no layout, so scrolling now would silently do nothing.
      expect(port.scrollTop).toBe(0);

      mockVisibility.isVisible = true;
      rerenderAt({ ...alignedRef, verseNum: 5 });

      expect(port.scrollTop).toBe(900 - HEADER_HEIGHT);
    });
  });
});
