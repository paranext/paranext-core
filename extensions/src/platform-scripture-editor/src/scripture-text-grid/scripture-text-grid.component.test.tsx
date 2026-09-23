// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScriptureTextGrid } from './scripture-text-grid.component';
import { ResourceCellView } from './resource-cell-view.component';
import type { ResourceZoomController } from './use-resource-zoom.hook';

// jsdom doesn't ship a ResizeObserver (needed by the grip's Radix tooltip), or PointerCapture APIs.
// Stubs are sufficient since these tests don't inspect layout behavior.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  if (typeof Element.prototype.hasPointerCapture !== 'function') {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

const mockResourceCell = vi.fn(
  ({
    resourceRef,
    scrRef,
    // setScrRef stays in the type (so mock.calls[n][0].setScrRef type-checks in the setter-sync test)
    // but is not destructured here because it is not used in the rendered JSX.
    viewMode,
    showDragHandle,
    reorderHandleLabel,
    reorderHint,
    onReorderKeyDown,
    onDisclosureActivate,
    disclosureAccessibleName,
    isDisclosureExpanded,
    disclosureControlsId,
  }: {
    resourceRef: { label: string; projectId: string; resourceId: string };
    scrRef: { verseNum: number };
    setScrRef: (scrRef: unknown) => void;
    viewMode?: string;
    showDragHandle?: boolean;
    reorderHandleLabel?: string;
    reorderHint?: string;
    onReorderKeyDown?: (event: React.KeyboardEvent) => void;
    onDisclosureActivate?: () => void;
    disclosureAccessibleName?: string;
    isDisclosureExpanded?: boolean;
    disclosureControlsId?: string;
  }) => (
    <div data-testid={`cell-${resourceRef.projectId}`} data-view-mode={viewMode}>
      {/* Only the PAPI fetch/direction/availability wiring is stubbed; the presentation delegates to
          the real ResourceCellView so the grip renders exactly where production renders it. A
          hand-rolled grip here would keep passing for a view mode that ships without one. */}
      <ResourceCellView
        state="ready"
        label={resourceRef.label}
        textDirection="ltr"
        localizedStrings={{}}
        editor={`${resourceRef.label}@${scrRef.verseNum}`}
        nameDisplay={viewMode === 'verse' ? 'inline' : 'header'}
        showDragHandle={showDragHandle}
        reorderHandleId={resourceRef.resourceId}
        reorderHandleLabel={reorderHandleLabel}
        reorderHint={reorderHint}
        onReorderKeyDown={onReorderKeyDown}
        onDisclosureActivate={onDisclosureActivate}
        disclosureAccessibleName={disclosureAccessibleName}
        isDisclosureExpanded={isDisclosureExpanded}
        disclosureControlsId={disclosureControlsId}
      />
    </div>
  ),
);

/**
 * A verse row's disclosure control — the name button that owns the tab stop, the accessible name
 * and `aria-expanded`. Found by the attribute the grid's focus-restore effects query.
 */
function getDisclosure(resourceId: string): HTMLElement {
  const control = document.querySelector<HTMLElement>(
    `[data-resource-id="${resourceId}"] [data-disclosure-control]`,
  );
  if (!control) throw new Error(`No disclosure control rendered for resource "${resourceId}"`);
  return control;
}

/**
 * The reorder grip, found by the attribute production actually queries for focus restore. Throws a
 * named error rather than returning null so a view mode that renders no grip fails loudly.
 */
function getGrip(resourceId: string): HTMLElement {
  const grip = document.querySelector<HTMLElement>(`[data-reorder-handle-id="${resourceId}"]`);
  if (!grip) throw new Error(`No reorder grip rendered for resource "${resourceId}"`);
  return grip;
}

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
  it('names each row in effective-list order, on the control that carries the name', () => {
    // `onChapterContextChange` is what production always passes, so the name lives on each row's
    // disclosure control rather than the row. Asserting without it would exercise a shape that
    // never ships.
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={vi.fn()}
        cellAccessibleNameTemplate="{resourceName}, {reference}"
      />,
    );
    expect(
      resources.map((resource) => getDisclosure(resource.resourceId).getAttribute('aria-label')),
    ).toEqual(['WEB, MAT 5:3', 'KJV, MAT 5:3', 'עברית, MAT 5:3']);
  });
  it('names the row itself when no disclosure control exists to carry the name', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        cellAccessibleNameTemplate="{resourceName}, {reference}"
      />,
    );
    // Without a control the row must still be named, or the list announces unnamed items.
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
        onChapterContextChange={vi.fn()}
        cellAccessibleNameTemplate="{resourceName}, {reference}"
      />,
    );
    // Cells fall forward to verse 1, so announcing "5:0" would contradict the rendered verse number.
    expect(
      resources.map((resource) => getDisclosure(resource.resourceId).getAttribute('aria-label')),
    ).toEqual(['WEB, MAT 5:1', 'KJV, MAT 5:1', 'עברית, MAT 5:1']);
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
  it("restores focus to the opening row's control when the split closes", () => {
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
    // Focus lands on the row's disclosure control, which is what owns the tab stop.
    expect(getDisclosure('r-b')).toHaveFocus();
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
describe('ScriptureTextGrid — chapter-context toggle', () => {
  it('closes the split when the already-open row is activated again', () => {
    const onChapterContextChange = vi.fn();
    const onChapterContextClose = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[1]}
        onChapterContextChange={onChapterContextChange}
        onChapterContextClose={onChapterContextClose}
      />,
    );
    fireEvent.click(screen.getAllByRole('listitem')[1]);
    expect(onChapterContextClose).toHaveBeenCalledTimes(1);
    expect(onChapterContextChange).not.toHaveBeenCalled();
  });
  it('switches the split to a different row rather than closing it', () => {
    const onChapterContextChange = vi.fn();
    const onChapterContextClose = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[1]}
        onChapterContextChange={onChapterContextChange}
        onChapterContextClose={onChapterContextClose}
      />,
    );
    fireEvent.click(screen.getAllByRole('listitem')[2]);
    expect(onChapterContextChange).toHaveBeenCalledWith(resources[2]);
    expect(onChapterContextClose).not.toHaveBeenCalled();
  });
  it('marks only the open row as expanded', () => {
    const { rerender } = render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={vi.fn()}
      />,
    );
    expect(
      resources.map((resource) => getDisclosure(resource.resourceId).getAttribute('aria-expanded')),
    ).toEqual(['false', 'false', 'false']);

    rerender(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[1]}
        onChapterContextChange={vi.fn()}
      />,
    );
    expect(
      resources.map((resource) => getDisclosure(resource.resourceId).getAttribute('aria-expanded')),
    ).toEqual(['false', 'true', 'false']);
  });
  it('tints the open row so the panel is visibly tied to the row that owns it', () => {
    const { rerender } = render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={vi.fn()}
      />,
    );
    const rowFor = (resourceId: string) =>
      document.querySelector<HTMLElement>(`[data-resource-id="${resourceId}"]`);
    // Positive control: the class is absent while closed, so the assertion below is not vacuous.
    expect(rowFor('r-b')?.className).not.toContain('tw:bg-muted/50');

    rerender(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[1]}
        onChapterContextChange={vi.fn()}
      />,
    );
    expect(rowFor('r-b')?.className).toContain('tw:bg-muted/50');
    expect(rowFor('r-a')?.className).not.toContain('tw:bg-muted/50');
  });
  it('points aria-controls at the open panel, and drops it when closed', () => {
    const { rerender } = render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[1]}
        onChapterContextChange={vi.fn()}
      />,
    );
    const openControl = getDisclosure('r-b');
    const panelId = screen.getByTestId('scripture-text-grid-chapter-context').id;
    expect(panelId).not.toBe('');
    expect(openControl).toHaveAttribute('aria-expanded', 'true');
    expect(openControl).toHaveAttribute('aria-controls', panelId);

    rerender(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={vi.fn()}
      />,
    );
    resources.forEach((resource) => {
      expect(getDisclosure(resource.resourceId)).not.toHaveAttribute('aria-controls');
    });
  });
  it('toggles from the keyboard, via Enter and Space on the focused control', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onChapterContextClose = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[1]}
        onChapterContextChange={vi.fn()}
        onChapterContextClose={onChapterContextClose}
      />,
    );
    // The control is a native button, so it activates on both keys with no key handler of our own —
    // this drives them for real rather than standing in with a click.
    getDisclosure('r-b').focus();
    await user.keyboard('{Enter}');
    expect(onChapterContextClose).toHaveBeenCalledTimes(1);
    await user.keyboard(' ');
    expect(onChapterContextClose).toHaveBeenCalledTimes(2);
  });
  it('ignores a click that ends a text selection, so copying does not toggle the split', () => {
    const onChapterContextChange = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={onChapterContextChange}
      />,
    );

    // A real selection over the cell's text, rather than a stubbed one, so this exercises the same
    // window.getSelection() the guard reads.
    const range = document.createRange();
    range.selectNodeContents(screen.getByText('KJV@3'));
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    // Positive control: without a non-empty selection this test would pass vacuously.
    expect(window.getSelection()?.toString().trim()).not.toBe('');

    fireEvent.click(screen.getAllByRole('listitem')[1]);
    expect(onChapterContextChange).not.toHaveBeenCalled();

    // The control activates regardless: the guard is on the row's pointer shortcut, which is what
    // a drag-selection release lands on.
    fireEvent.click(getDisclosure('r-b'));
    expect(onChapterContextChange).toHaveBeenCalledWith(resources[1]);

    selection?.removeAllRanges();
  });
  it('restores focus to the opening listitem when the split OPENS', () => {
    // The verse column remounts on open as well as close, so without a restore on both transitions
    // focus falls to <body> and a keyboard toggle cannot fire a second time.
    const { rerender } = render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={vi.fn()}
      />,
    );
    fireEvent.click(getDisclosure('r-b'));
    rerender(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[1]}
        onChapterContextChange={vi.fn()}
      />,
    );
    expect(getDisclosure('r-b')).toHaveFocus();
  });
});

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
    fireEvent.keyDown(getGrip('r-a'), { key: 'ArrowDown' });
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
    fireEvent.keyDown(getGrip('r-a'), { key: 'ArrowUp' });
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
    fireEvent.click(getGrip('r-a'));
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
    const wrappers = screen.getAllByTestId('scripture-text-grid-cell-draggable');
    fireEvent.dragStart(wrappers[1]); // drag KJV (resourceId 'r-b')
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
    const wrappers = screen.getAllByTestId('scripture-text-grid-cell-draggable');
    fireEvent.dragStart(wrappers[1]); // drag KJV (resourceId 'r-b')
    fireEvent.dragOver(wrappers[0]); // hover over WEB (resourceId 'r-a')
    expect(wrappers[0].className).toContain('tw:ring-2');
    expect(wrappers[0].className).toContain('tw:ring-inset');
    expect(wrappers[0].className).toContain('tw:ring-primary');
    fireEvent.dragEnd(wrappers[1]);
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
    const wrappers = screen.getAllByTestId('scripture-text-grid-cell-draggable');
    fireEvent.dragStart(wrappers[1]); // drag KJV (resourceId 'r-b')
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
    const wrappers = screen.getAllByTestId('scripture-text-grid-cell-draggable');
    fireEvent.dragStart(wrappers[1]);
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
    fireEvent.keyDown(getGrip('r-a'), { key: 'ArrowRight' });
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
    fireEvent.keyDown(getGrip('r-a'), { key: 'ArrowLeft' });
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
    fireEvent.keyDown(getGrip('r-a'), { key: 'ArrowRight' });
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
    fireEvent.keyDown(getGrip('r-b'), { key: 'ArrowLeft' });
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
    fireEvent.keyDown(getGrip('r-c'), { key: 'ArrowRight' });
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
    fireEvent.keyDown(getGrip('r-c'), { key: 'ArrowLeft' });
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
    fireEvent.keyDown(getGrip('r-a'), { key: 'ArrowRight' });
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
    expect(getGrip('r-a')).toHaveFocus();
  });
});
