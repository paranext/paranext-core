// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScriptureTextGrid } from './scripture-text-grid.component';

vi.mock('./resource-cell.component', () => ({
  ResourceCell: ({
    resourceRef,
    scrRef,
  }: {
    resourceRef: { label: string };
    scrRef: { verseNum: number };
  }) => (
    <div
      role="gridcell"
      aria-label={resourceRef.label}
    >{`${resourceRef.label}@${scrRef.verseNum}`}</div>
  ),
}));

const scrRef = { book: 'MAT', chapterNum: 5, verseNum: 3, versificationStr: 'English' };
const setScrRef = vi.fn();
const resources = [
  { projectId: 'a', label: 'WEB' },
  { projectId: 'b', label: 'KJV' },
  { projectId: 'c', label: 'עברית' },
];

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
});
