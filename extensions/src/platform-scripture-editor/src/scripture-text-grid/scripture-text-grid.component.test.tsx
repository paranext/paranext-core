// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest';
import * as React from 'react';
import { act, render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CONTENT_ZOOM_SCOPE_ATTRIBUTE } from 'platform-bible-react';
import { ScriptureTextGrid } from './scripture-text-grid.component';
import { ResourceCellView, type ZoomMenuLabels } from './resource-cell-view.component';
import type { ResourceZoomController } from './use-resource-content-zoom.hook';

const { mockWarn } = vi.hoisted(() => ({ mockWarn: vi.fn() }));
vi.mock('@papi/frontend', () => ({ logger: { warn: mockWarn } }));

/** Verse blocks the mocked cell renders in aligned mode; `top` is the stubbed geometry. */
let alignedVerseBlocks: { start: number; end: number; top: number }[] = [];

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
    zoomArea,
    scrRef,
    // setScrRef stays in the type (so mock.calls[n][0].setScrRef type-checks in the setter-sync test)
    // but is not destructured here because it is not used in the rendered JSX.
    viewMode,
    zoomMenuLabels,
    showDragHandle,
    reorderHandleLabel,
    reorderHint,
    onReorderKeyDown,
    headerDrag,
    onDisclosureActivate,
    disclosureAccessibleName,
    isDisclosureExpanded,
    disclosureControlsId,
  }: {
    resourceRef: { label: string; projectId: string; resourceId: string };
    zoomArea: string;
    zoom?: unknown;
    zoomMenuLabels?: unknown;
    scrRef: { verseNum: number };
    setScrRef: (scrRef: unknown) => void;
    isViewVisible?: boolean;
    viewMode?: string;
    orderIndex?: number;
    zoomMenuLabels?: ZoomMenuLabels;
    showDragHandle?: boolean;
    reorderHandleLabel?: string;
    reorderHint?: string;
    onReorderKeyDown?: (event: React.KeyboardEvent) => void;
    headerDrag?: { onDragStart: () => void; onDragEnd: () => void };
    onDisclosureActivate?: () => void;
    disclosureAccessibleName?: string;
    isDisclosureExpanded?: boolean;
    disclosureControlsId?: string;
  }) =>
    viewMode === 'verse' ? (
      <div
        data-testid={`cell-${resourceRef.projectId}`}
        data-view-mode={viewMode}
        data-zoom-area={zoomArea}
      >
        {/* Verse rows delegate to the real ResourceCellView, so the grip and the name control render
            exactly where production renders them; a hand-rolled grip here would keep passing for a
            row that ships without one. Only the PAPI fetch/direction/availability wiring is
            stubbed. */}
        <ResourceCellView
          state="ready"
          zoomArea={zoomArea}
          label={resourceRef.label}
          textDirection="ltr"
          localizedStrings={{}}
          copyLimit={undefined}
          editor={`${resourceRef.label}@${scrRef.verseNum}`}
          nameDisplay="inline"
          zoomMenuLabels={zoomMenuLabels}
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
    ) : (
      <div
        data-testid={`cell-${resourceRef.projectId}`}
        data-view-mode={viewMode}
        data-zoom-area={zoomArea}
      >
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
          // Mirror the real wiring: a focusable grip that forwards keydown and exposes its id. Column
          // views only; verse rows render the real grip above.
          <button
            type="button"
            data-reorder-handle-id={resourceRef.resourceId}
            data-testid={`grip-${resourceRef.resourceId}`}
            aria-label={reorderHandleLabel}
            onKeyDown={onReorderKeyDown}
          >
            grip
          </button>
        ) : undefined}
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

// Stands in for the web view root's `useViewVisibility()`, whose answer the grid takes as a prop.
// Mutable so a test can model an inactive dock tab: the real hook needs an IntersectionObserver,
// which jsdom has not got, and would report `false` regardless because jsdom reports zero geometry
// for everything — so the aligned grid's deferred scroll could never be observed without this.
const mockVisibility = { isVisible: true };

vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
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
      isViewVisible
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
          isViewVisible
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
  mockWarn.mockClear();
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
        isViewVisible
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
        isViewVisible
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
    render(
      <ScriptureTextGrid
        isViewVisible
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
      />,
    );
    expect(screen.getByText('WEB@3')).toBeInTheDocument();
    expect(screen.getByText('KJV@3')).toBeInTheDocument();
  });
  it('names the list region with the provided accessible label', () => {
    render(
      <ScriptureTextGrid
        isViewVisible
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        ariaLabel="Text Collection"
      />,
    );
    expect(screen.getByRole('list', { name: 'Text Collection' })).toBeInTheDocument();
  });
  it('has list and listitem roles, no grid or row', () => {
    render(
      <ScriptureTextGrid
        isViewVisible
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
      />,
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(resources.length);
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    expect(screen.queryByRole('row')).not.toBeInTheDocument();
  });
  it('renders a single resource as a whole-chapter region, not a verse list', () => {
    render(
      <ScriptureTextGrid
        isViewVisible
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
    render(
      <ScriptureTextGrid
        isViewVisible
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
      />,
    );
    expect(screen.getByTestId('cell-a')).toHaveAttribute('data-view-mode', 'verse');
    expect(screen.getByTestId('cell-b')).toHaveAttribute('data-view-mode', 'verse');
  });
  it('does not render the chapter-context split when closed', () => {
    render(
      <ScriptureTextGrid
        isViewVisible
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={vi.fn()}
      />,
    );
    expect(screen.queryByTestId('scripture-text-grid-chapter-context')).not.toBeInTheDocument();
    expect(screen.queryByTestId('resizable-handle')).not.toBeInTheDocument();
  });
  it('opens the chapter-context split for the activated listitem', () => {
    const onChapterContextChange = vi.fn();
    render(
      <ScriptureTextGrid
        isViewVisible
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
        isViewVisible
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[1]}
        onChapterContextChange={vi.fn()}
      />,
    );
    // The panel group always renders; opening the split adds the handle and the second panel.
    expect(screen.getByTestId('resizable-handle')).toBeInTheDocument();
    expect(screen.getAllByTestId('resizable-panel')).toHaveLength(2);
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
  it('hands every chapter surface the view visibility it was given, so a hidden tab defers', () => {
    // A chapter cell scrolls itself, and while its dock tab is hidden it must defer that scroll and
    // catch up on activation. That only works if the cell hears the real answer; a hard-coded
    // `true` at any one call site would scroll a pane with no layout, which silently does nothing.
    const surfaces = [
      { name: 'single resource', extra: { resources: [resources[0]] } },
      { name: 'chapter columns', extra: { viewMode: 'chapter' as const } },
      {
        name: 'chapter-context split',
        extra: { chapterContext: resources[1], onChapterContextChange: vi.fn() },
      },
    ];
    const results = surfaces.map(({ name, extra }) => {
      mockResourceCell.mockClear();
      const { unmount } = render(
        <ScriptureTextGrid
          isViewVisible={false}
          resources={resources}
          scrRef={scrRef}
          setScrRef={setScrRef}
          {...extra}
        />,
      );
      const chapterCells = mockResourceCell.mock.calls.filter(
        (call) => call[0].viewMode === 'chapter',
      );
      unmount();
      return {
        name,
        rendersChapterCell: chapterCells.length > 0,
        visibilities: [...new Set(chapterCells.map((call) => call[0].isViewVisible))],
      };
    });

    expect(results).toEqual(
      surfaces.map(({ name }) => ({ name, rendersChapterCell: true, visibilities: [false] })),
    );
  });
  it('tells each chapter column its position, so a reorder re-arms its scroll', () => {
    // A moved column's scroll container loses its scroll position; the cell uses its position to
    // notice the move.
    render(
      <ScriptureTextGrid
        isViewVisible
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
      />,
    );

    expect(
      mockResourceCell.mock.calls.map((call) => [
        call[0].resourceRef.resourceId,
        call[0].orderIndex,
      ]),
    ).toEqual([
      ['r-a', 0],
      ['r-b', 1],
      ['r-c', 2],
    ]);
  });
  it('closes the split via the labeled close button', () => {
    const onChapterContextClose = vi.fn();
    render(
      <ScriptureTextGrid
        isViewVisible
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
        isViewVisible
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
        isViewVisible
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[1]}
        onChapterContextChange={vi.fn()}
      />,
    );
    rerender(
      <ScriptureTextGrid
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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

  it('single-resource container exposes data-resource-id so an element inside it can be traced to its resource', () => {
    renderGrid([{ resourceId: 'r-solo', projectId: 'p-solo', label: 'SOLO' }]);
    expect(document.querySelector('[data-resource-id="r-solo"]')).not.toBeNull();
  });

  it('chapter-context region exposes data-resource-id for its resource', () => {
    render(
      <ScriptureTextGrid
        isViewVisible
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
  it('leaves the split open after a double-click on a row', () => {
    const onChapterContextChange = vi.fn();
    const onChapterContextClose = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={onChapterContextChange}
        onChapterContextClose={onChapterContextClose}
      />,
    );
    const row = screen.getAllByRole('listitem')[1];

    fireEvent.click(row, { detail: 1 });
    fireEvent.click(row, { detail: 2 });
    expect(onChapterContextChange).toHaveBeenCalledTimes(1);
    expect(onChapterContextClose).not.toHaveBeenCalled();
  });
  it('does not toggle the split for a click on a button inside the verse text', () => {
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
    // The open split shows the same text, so look only inside the row.
    const rowText = within(screen.getAllByRole('listitem')[1]).getByText('KJV@3');
    // Stands in for the editor's footnote caller, a plain button that lets its click bubble.
    const caller = document.createElement('button');
    caller.type = 'button';
    rowText.append(caller);

    fireEvent.click(caller);
    expect(onChapterContextClose).not.toHaveBeenCalled();

    // Positive control: the same row's text still toggles.
    fireEvent.click(rowText);
    expect(onChapterContextClose).toHaveBeenCalledTimes(1);
  });
  it('activates a row while text elsewhere is still selected', () => {
    const onChapterContextChange = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={onChapterContextChange}
      />,
    );

    // A draggable row leaves an existing selection in place when pressed, so one made earlier
    // (e.g. in the chapter-context panel) is still there when the row is clicked.
    const range = document.createRange();
    range.selectNodeContents(screen.getByText('WEB@3'));
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    try {
      expect(selection?.toString().trim()).not.toBe('');

      fireEvent.click(screen.getByText('KJV@3'));
      expect(onChapterContextChange).toHaveBeenCalledWith(resources[1]);
    } finally {
      selection?.removeAllRanges();
    }
  });
  it('ignores a click on a right-click menu item, which bubbles to the row through its portal', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onChapterContextChange = vi.fn();
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        zoomMenuLabels={{
          zoomIn: 'Zoom In',
          zoomOut: 'Zoom Out',
          reset: 'Reset Zoom',
          options: 'Zoom options',
        }}
        onChapterContextChange={onChapterContextChange}
      />,
    );

    fireEvent.contextMenu(screen.getByText('KJV@3'));
    await user.click(screen.getByRole('menuitem', { name: /^Zoom In/ }));
    expect(onChapterContextChange).not.toHaveBeenCalled();
  });
  it("moves focus into the clicked row's resource, without adding a tab stop", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        onChapterContextChange={vi.fn()}
      />,
    );
    const row = screen.getAllByRole('listitem')[1];

    // Find targets the resource holding focus, so a click on read-only text must land focus
    // inside that row's `[data-project-id]`.
    await user.click(screen.getByText('KJV@3'));
    expect(document.activeElement?.closest('[data-project-id]')).toBe(row);
    expect(row.tabIndex).toBe(-1);
  });
  it('keeps the verse column mounted, and focus on the opener, as the split opens and closes', () => {
    const renderWith = (chapterContext?: (typeof resources)[number]) => (
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={chapterContext}
        onChapterContextChange={vi.fn()}
        onChapterContextClose={vi.fn()}
      />
    );
    const { rerender } = render(renderWith());
    const opener = getDisclosure('r-b');
    opener.focus();

    rerender(renderWith(resources[1]));
    // Same node, not an equal one: a remount would rebuild every row's editor.
    expect(getDisclosure('r-b')).toBe(opener);
    expect(opener).toHaveFocus();

    rerender(renderWith());
    expect(getDisclosure('r-b')).toBe(opener);
    expect(opener).toHaveFocus();
  });
  it('leaves focus where it is when the split closes without losing it', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const renderWith = (chapterContext?: (typeof resources)[number]) => (
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={chapterContext}
        onChapterContextChange={vi.fn()}
        onChapterContextClose={vi.fn()}
      />
    );
    const { rerender } = render(renderWith(resources[1]));
    const row = screen.getAllByRole('listitem')[1];

    // A click on the open row's text toggles it closed and focuses the row itself; moving focus up
    // to the name would scroll a tall row away from where the user clicked.
    await user.click(within(row).getByText('KJV@3'));
    rerender(renderWith());
    expect(row).toHaveFocus();

    // Escape pressed while focus sits on another row's control leaves it there.
    rerender(renderWith(resources[1]));
    await user.click(within(row).getByText('KJV@3'));
    getDisclosure('r-c').focus();
    rerender(renderWith());
    expect(getDisclosure('r-c')).toHaveFocus();
  });
});

describe('ScriptureTextGrid — verse view reorder', () => {
  it('calls onReorder with the reordered id sequence after a drag-and-drop', () => {
    const onReorder = vi.fn();
    render(
      <ScriptureTextGrid
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
    // The icon inside the grip is where a pointer usually lands.
    const gripIcon = getGrip('r-a').querySelector('svg');
    if (!gripIcon) throw new Error('No icon rendered inside the grip');
    fireEvent.click(gripIcon);
    expect(onChapterContextChange).not.toHaveBeenCalled();

    // Positive control: the same row's text still activates.
    fireEvent.click(screen.getByText('KJV@3'));
    expect(onChapterContextChange).toHaveBeenCalledTimes(1);
  });
  it('toggles exactly once for a click on the name control, opening and closing', () => {
    const onChapterContextChange = vi.fn();
    const onChapterContextClose = vi.fn();
    const renderWith = (chapterContext?: (typeof resources)[number]) => (
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={chapterContext}
        onReorder={vi.fn()}
        onChapterContextChange={onChapterContextChange}
        onChapterContextClose={onChapterContextClose}
      />
    );
    const { rerender } = render(renderWith());

    fireEvent.click(getDisclosure('r-b'));
    expect(onChapterContextChange).toHaveBeenCalledTimes(1);
    expect(onChapterContextChange).toHaveBeenCalledWith(resources[1]);

    rerender(renderWith(resources[1]));
    fireEvent.click(getDisclosure('r-b'));
    expect(onChapterContextClose).toHaveBeenCalledTimes(1);
    expect(onChapterContextChange).toHaveBeenCalledTimes(1);
  });
});

// Reorder (drag + keyboard) is wired into the chapter view's side-by-side columns.
describe('ScriptureTextGrid — chapter view reorder', () => {
  it('calls onReorder with the reordered id sequence after a drag-and-drop', () => {
    const onReorder = vi.fn();
    render(
      <ScriptureTextGrid
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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

describe('ScriptureTextGrid — zoom areas', () => {
  /** The zoom scope each element carries, read through the exported attribute name. */
  const scopesOf = (elements: HTMLElement[]) =>
    elements.map((element) => element.getAttribute(CONTENT_ZOOM_SCOPE_ATTRIBUTE));

  it('gives each resource its own area, the same one in its verse row and its chapter panel', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[1]}
        onChapterContextChange={vi.fn()}
      />,
    );
    const cellsOfB = screen.getAllByTestId('cell-b');
    // Positive control: the verse row and the chapter panel both render resource b.
    expect(cellsOfB).toHaveLength(2);
    expect(cellsOfB.map((cell) => cell.getAttribute('data-zoom-area'))).toEqual([
      'resource-r-b',
      'resource-r-b',
    ]);
    expect(screen.getByTestId('cell-a')).toHaveAttribute('data-zoom-area', 'resource-r-a');
    expect(screen.getByTestId('cell-c')).toHaveAttribute('data-zoom-area', 'resource-r-c');
  });

  it('puts the zoom scope with its resource’s area on every verse row and on the chapter panel', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[2]}
        onChapterContextChange={vi.fn()}
      />,
    );
    expect(scopesOf(screen.getAllByRole('listitem'))).toEqual([
      'resource-r-a',
      'resource-r-b',
      'resource-r-c',
    ]);
    expect(screen.getByTestId('scripture-text-grid-chapter-context')).toHaveAttribute(
      CONTENT_ZOOM_SCOPE_ATTRIBUTE,
      'resource-r-c',
    );
  });

  it('puts the zoom scope on every chapter-view column', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
      />,
    );
    expect(scopesOf(screen.getAllByRole('region'))).toEqual([
      'resource-r-a',
      'resource-r-b',
      'resource-r-c',
    ]);
    expect(
      ['cell-a', 'cell-b', 'cell-c'].map((testId) =>
        screen.getByTestId(testId).getAttribute('data-zoom-area'),
      ),
    ).toEqual(['resource-r-a', 'resource-r-b', 'resource-r-c']);
  });

  it('puts the zoom scope on the single-resource region', () => {
    renderGrid([{ resourceId: 'r-solo', projectId: 'p-solo', label: 'SOLO' }]);
    expect(screen.getByRole('region')).toHaveAttribute(
      CONTENT_ZOOM_SCOPE_ATTRIBUTE,
      'resource-r-solo',
    );
    expect(screen.getByTestId('cell-p-solo')).toHaveAttribute('data-zoom-area', 'resource-r-solo');
  });

  it('falls back to the shared text-collection area for an id with nothing to keep, warning once', () => {
    // The grid remembers which ids it has warned about for the whole session, so no other test in
    // this file may use this id.
    const gridResources = [{ resourceId: '日本語', projectId: 'jp', label: 'JP' }, resources[0]];
    const { rerender } = render(
      <ScriptureTextGrid resources={gridResources} scrRef={scrRef} setScrRef={setScrRef} />,
    );
    rerender(
      <ScriptureTextGrid resources={[...gridResources]} scrRef={scrRef} setScrRef={setScrRef} />,
    );
    expect(screen.getByTestId('cell-jp')).toHaveAttribute('data-zoom-area', 'text-collection');
    expect(scopesOf(screen.getAllByRole('listitem'))).toEqual(['text-collection', 'resource-r-a']);
    expect(mockWarn).toHaveBeenCalledTimes(1);
    expect(String(mockWarn.mock.calls[0][0])).toContain('"日本語"');
  });

  it('hands every cell the zoom controller and menu labels, in all four layouts', () => {
    const zoom = {
      getZoom: () => 1,
      hasOwnLevel: () => false,
      adjustZoom: vi.fn(),
      resetZoom: vi.fn(),
    };
    const zoomMenuLabels = { zoomIn: 'in', zoomOut: 'out', reset: 'reset', options: 'options' };
    const everyCellGotThem = () =>
      mockResourceCell.mock.calls.every(
        ([cellProps]) => cellProps.zoom === zoom && cellProps.zoomMenuLabels === zoomMenuLabels,
      );

    const verseView = render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        chapterContext={resources[0]}
        onChapterContextChange={vi.fn()}
        zoom={zoom}
        zoomMenuLabels={zoomMenuLabels}
      />,
    );
    // Positive control: three verse rows plus the chapter panel rendered.
    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(4);
    expect(everyCellGotThem()).toBe(true);
    verseView.unmount();

    mockResourceCell.mockClear();
    const chapterView = render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="chapter"
        zoom={zoom}
        zoomMenuLabels={zoomMenuLabels}
      />,
    );
    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(3);
    expect(everyCellGotThem()).toBe(true);
    chapterView.unmount();

    mockResourceCell.mockClear();
    render(
      <ScriptureTextGrid
        resources={[resources[0]]}
        scrRef={scrRef}
        setScrRef={setScrRef}
        zoom={zoom}
        zoomMenuLabels={zoomMenuLabels}
      />,
    );
    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(1);
    expect(everyCellGotThem()).toBe(true);
  });

  it('puts the zoom scope on every Grid-view column, and hands each cell its area and the controller', () => {
    const zoom = {
      getZoom: () => 1,
      hasOwnLevel: () => false,
      adjustZoom: vi.fn(),
      resetZoom: vi.fn(),
    };
    const zoomMenuLabels = { zoomIn: 'in', zoomOut: 'out', reset: 'reset', options: 'options' };
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode="aligned"
        zoom={zoom}
        zoomMenuLabels={zoomMenuLabels}
      />,
    );
    expect(scopesOf(screen.getAllByRole('region'))).toEqual([
      'resource-r-a',
      'resource-r-b',
      'resource-r-c',
    ]);
    expect(
      ['cell-a', 'cell-b', 'cell-c'].map((testId) =>
        screen.getByTestId(testId).getAttribute('data-zoom-area'),
      ),
    ).toEqual(['resource-r-a', 'resource-r-b', 'resource-r-c']);
    expect(
      mockResourceCell.mock.calls.every(
        ([cellProps]) => cellProps.zoom === zoom && cellProps.zoomMenuLabels === zoomMenuLabels,
      ),
    ).toBe(true);
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
        isViewVisible={mockVisibility.isVisible}
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

    it('keeps following the reference when content shrinks until nothing overflows', async () => {
      // With nothing left to scroll the browser clamps scrollTop all the way to 0. That is still a
      // clamp, not the reader, so a later column growing the content again must still be corrected.
      stubGeometry();
      const { port, rerenderAt } = renderAligned(alignedRef);
      rerenderAt({ ...alignedRef, verseNum: 5 });
      expect(port.scrollTop).toBe(900 - HEADER_HEIGHT);

      // Resources are unchecked until what is left fits the port.
      Object.defineProperty(port, 'scrollHeight', { value: PORT_HEIGHT, configurable: true });
      Object.defineProperty(port, 'clientHeight', { value: PORT_HEIGHT, configurable: true });
      port.scrollTop = 0;
      alignedVerseBlocks = [{ start: 1, end: 1, top: 100 }];
      rerenderAt({ ...alignedRef, verseNum: 5 });
      // Let the mutation-driven check run against the shrunk content.
      await act(
        () =>
          new Promise<void>((resolve) => {
            setTimeout(resolve, 50);
          }),
      );

      Object.defineProperty(port, 'scrollHeight', { value: 2000, configurable: true });
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
