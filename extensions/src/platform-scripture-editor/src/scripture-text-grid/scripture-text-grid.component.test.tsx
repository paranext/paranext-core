// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScriptureTextGrid } from './scripture-text-grid.component';

const mockResourceCell = vi.fn(
  ({
    resourceRef,
    scrRef,
    // setScrRef stays in the type (so mock.calls[n][0].setScrRef type-checks in the setter-sync test)
    // but is not destructured here because it is not used in the rendered JSX.
    viewMode,
  }: {
    resourceRef: { label: string; projectId: string };
    scrRef: { verseNum: number };
    setScrRef: (scrRef: unknown) => void;
    viewMode?: string;
  }) => (
    <div
      data-testid={`cell-${resourceRef.projectId}`}
      data-view-mode={viewMode}
    >{`${resourceRef.label}@${scrRef.verseNum}`}</div>
  ),
);

vi.mock('./resource-cell.component', () => ({
  ResourceCell: (props: Parameters<typeof mockResourceCell>[0]) => mockResourceCell(props),
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
  { projectId: 'a', label: 'WEB' },
  { projectId: 'b', label: 'KJV' },
  { projectId: 'c', label: 'עברית' },
];

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
        resources={[{ projectId: 'a', label: 'WEB' }]}
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
        resources={[{ projectId: 'a', label: 'WEB' }]}
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
});
