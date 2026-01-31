import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PassageDetailPane, { PassageDetailPaneProps } from '../passage-detail.component';
import type {
  ParallelPassageDetail,
  PassageDetailRow,
  PassageDetailColumn,
  HighlightedWord,
} from '../../types/parallel-passages.d';

// --- Test data factories ---

function makeWord(
  text: string,
  degree: HighlightedWord['degree'] = 'None',
  gloss?: string,
): HighlightedWord {
  return { text, degree, gloss };
}

function makeColumn(overrides: Partial<PassageDetailColumn> = {}): PassageDetailColumn {
  return {
    verseRef: 'MAT 3:1',
    state: 'Unfinished',
    columnChecked: false,
    editable: false,
    editTooltip: '',
    words: [makeWord('In'), makeWord('the'), makeWord('beginning')],
    statusTooltip: '',
    ...overrides,
  };
}

function makeRow(overrides: Partial<PassageDetailRow> = {}): PassageDetailRow {
  return {
    projectId: 'proj1',
    projectName: 'MyProject',
    isSourceLanguage: false,
    isCollapsible: false,
    isCollapsed: false,
    isApprovable: true,
    rowChecked: false,
    columns: [makeColumn()],
    ...overrides,
  };
}

function makeDetail(overrides: Partial<ParallelPassageDetail> = {}): ParallelPassageDetail {
  return {
    passageType: 'NTtoNT',
    headVerse: 'MAT 3:1',
    effectiveViewType: 'RowView',
    statusFlags: {
      allIgnored: false,
      allTicked: false,
      anyOutdated: false,
      allChanged: false,
      allUnfinished: true,
    },
    projectApprovable: true,
    canApproveRow: true,
    rows: [makeRow()],
    ...overrides,
  };
}

function defaultProps(overrides: Partial<PassageDetailPaneProps> = {}): PassageDetailPaneProps {
  return {
    detail: makeDetail(),
    passageIndex: 0,
    onToggleColumnApproval: vi.fn(),
    onToggleRowApproval: vi.fn(),
    onToggleCollapse: vi.fn(),
    onEditClick: vi.fn(),
    onDiffClick: vi.fn(),
    onGotoReference: vi.fn(),
    ...overrides,
  };
}

// --- Tests ---

describe('PassageDetailPane', () => {
  it('renders empty state when detail is null', () => {
    render(<PassageDetailPane {...defaultProps({ detail: null })} />);
    expect(screen.getByText('Select a passage to view details')).toBeTruthy();
  });

  it('renders project name', () => {
    render(<PassageDetailPane {...defaultProps()} />);
    expect(screen.getByText('MyProject')).toBeTruthy();
  });

  it('renders verse words', () => {
    render(<PassageDetailPane {...defaultProps()} />);
    expect(screen.getByText('In')).toBeTruthy();
    expect(screen.getByText('the')).toBeTruthy();
    expect(screen.getByText('beginning')).toBeTruthy();
  });

  it('renders verse reference as button', () => {
    render(<PassageDetailPane {...defaultProps()} />);
    expect(screen.getByText('MAT 3:1')).toBeTruthy();
  });

  it('calls onGotoReference when verse ref clicked', () => {
    const onGotoReference = vi.fn();
    render(<PassageDetailPane {...defaultProps({ onGotoReference })} />);
    fireEvent.click(screen.getByText('MAT 3:1'));
    expect(onGotoReference).toHaveBeenCalledWith('MAT 3:1');
  });

  // --- Row checkbox (RowView) ---

  it('shows row checkbox in RowView when approvable', () => {
    render(<PassageDetailPane {...defaultProps()} />);
    expect(screen.getByRole('checkbox', { name: /approve all verses/i })).toBeTruthy();
  });

  it('hides row checkbox in ColumnView', () => {
    const detail = makeDetail({ effectiveViewType: 'ColumnView' });
    render(<PassageDetailPane {...defaultProps({ detail })} />);
    expect(screen.queryByRole('checkbox', { name: /approve all verses/i })).toBeNull();
  });

  it('calls onToggleRowApproval when row checkbox clicked', () => {
    const onToggleRowApproval = vi.fn();
    render(<PassageDetailPane {...defaultProps({ onToggleRowApproval })} />);
    fireEvent.click(screen.getByRole('checkbox', { name: /approve all verses/i }));
    expect(onToggleRowApproval).toHaveBeenCalledWith(0);
  });

  // --- Column checkbox (ColumnView) ---

  it('shows column checkbox in ColumnView when approvable', () => {
    const detail = makeDetail({ effectiveViewType: 'ColumnView' });
    render(<PassageDetailPane {...defaultProps({ detail })} />);
    expect(screen.getByRole('checkbox', { name: /approve MAT 3:1/i })).toBeTruthy();
  });

  it('calls onToggleColumnApproval when column checkbox clicked', () => {
    const onToggleColumnApproval = vi.fn();
    const detail = makeDetail({ effectiveViewType: 'ColumnView' });
    render(<PassageDetailPane {...defaultProps({ detail, onToggleColumnApproval })} />);
    fireEvent.click(screen.getByRole('checkbox', { name: /approve MAT 3:1/i }));
    expect(onToggleColumnApproval).toHaveBeenCalledWith(0, 'MAT 3:1');
  });

  // --- Collapse toggle ---

  it('shows collapse toggle for collapsible rows', () => {
    const detail = makeDetail({
      rows: [makeRow({ isCollapsible: true, isSourceLanguage: true })],
    });
    render(<PassageDetailPane {...defaultProps({ detail })} />);
    expect(screen.getByRole('button', { name: /collapse/i })).toBeTruthy();
  });

  it('hides verse content when collapsed', () => {
    const detail = makeDetail({
      rows: [makeRow({ isCollapsible: true, isCollapsed: true })],
    });
    render(<PassageDetailPane {...defaultProps({ detail })} />);
    // Project name visible, but words hidden
    expect(screen.getByText('MyProject')).toBeTruthy();
    expect(screen.queryByText('In')).toBeNull();
  });

  it('calls onToggleCollapse when toggle clicked', () => {
    const onToggleCollapse = vi.fn();
    const detail = makeDetail({
      rows: [makeRow({ isCollapsible: true })],
    });
    render(<PassageDetailPane {...defaultProps({ detail, onToggleCollapse })} />);
    fireEvent.click(screen.getByRole('button', { name: /collapse/i }));
    expect(onToggleCollapse).toHaveBeenCalledWith('proj1');
  });

  // --- Edit link ---

  it('shows edit link when column is editable', () => {
    const detail = makeDetail({
      rows: [
        makeRow({ columns: [makeColumn({ editable: true, editTooltip: 'Edit this verse' })] }),
      ],
    });
    render(<PassageDetailPane {...defaultProps({ detail })} />);
    expect(screen.getByText('Edit')).toBeTruthy();
  });

  it('hides edit link when column is not editable', () => {
    render(<PassageDetailPane {...defaultProps()} />);
    expect(screen.queryByText('Edit')).toBeNull();
  });

  it('calls onEditClick when edit clicked', () => {
    const onEditClick = vi.fn();
    const detail = makeDetail({
      rows: [makeRow({ columns: [makeColumn({ editable: true, editTooltip: 'Edit' })] })],
    });
    render(<PassageDetailPane {...defaultProps({ detail, onEditClick })} />);
    fireEvent.click(screen.getByText('Edit'));
    expect(onEditClick).toHaveBeenCalledWith('proj1', 'MAT 3:1');
  });

  // --- Word highlighting ---

  it('applies CalculatedMatch styles', () => {
    const detail = makeDetail({
      rows: [makeRow({ columns: [makeColumn({ words: [makeWord('match', 'CalculatedMatch')] })] })],
    });
    const { container } = render(<PassageDetailPane {...defaultProps({ detail })} />);
    const span = container.querySelector('.tw-text-lime-700');
    expect(span).toBeTruthy();
    expect(span?.classList.contains('tw-underline')).toBe(true);
  });

  it('applies ExpertExact styles with bold', () => {
    const detail = makeDetail({
      rows: [makeRow({ columns: [makeColumn({ words: [makeWord('exact', 'ExpertExact')] })] })],
    });
    const { container } = render(<PassageDetailPane {...defaultProps({ detail })} />);
    const span = container.querySelector('.tw-text-green-400');
    expect(span).toBeTruthy();
    expect(span?.classList.contains('tw-font-bold')).toBe(true);
    expect(span?.classList.contains('tw-underline')).toBe(true);
  });

  // --- Gloss text ---

  it('renders gloss text below word', () => {
    const detail = makeDetail({
      rows: [makeRow({ columns: [makeColumn({ words: [makeWord('logos', 'None', 'word')] })] })],
    });
    render(<PassageDetailPane {...defaultProps({ detail })} />);
    expect(screen.getByText('logos')).toBeTruthy();
    expect(screen.getByText('word')).toBeTruthy();
  });

  // --- Diff link ---

  it('shows diff link for Outdated state', () => {
    const detail = makeDetail({
      rows: [
        makeRow({ columns: [makeColumn({ state: 'Outdated', statusTooltip: 'Text changed' })] }),
      ],
    });
    render(<PassageDetailPane {...defaultProps({ detail })} />);
    const diffButton = screen.getByRole('button', { name: /view differences/i });
    expect(diffButton).toBeTruthy();
  });

  it('calls onDiffClick when diff link clicked', () => {
    const onDiffClick = vi.fn();
    const detail = makeDetail({
      rows: [makeRow({ columns: [makeColumn({ state: 'Outdated', statusTooltip: 'Changed' })] })],
    });
    render(<PassageDetailPane {...defaultProps({ detail, onDiffClick })} />);
    fireEvent.click(screen.getByRole('button', { name: /view differences/i }));
    expect(onDiffClick).toHaveBeenCalledWith('proj1', 'MAT 3:1');
  });

  // --- Non-approvable row ---

  it('hides checkboxes for non-approvable rows', () => {
    const detail = makeDetail({
      rows: [makeRow({ isApprovable: false })],
    });
    render(<PassageDetailPane {...defaultProps({ detail })} />);
    expect(screen.queryByRole('checkbox')).toBeNull();
  });

  // --- Multiple rows and columns ---

  it('renders multiple rows', () => {
    const detail = makeDetail({
      rows: [
        makeRow({ projectName: 'Project A' }),
        makeRow({ projectId: 'proj2', projectName: 'Project B' }),
      ],
    });
    render(<PassageDetailPane {...defaultProps({ detail })} />);
    expect(screen.getByText('Project A')).toBeTruthy();
    expect(screen.getByText('Project B')).toBeTruthy();
  });

  it('renders multiple columns per row', () => {
    const detail = makeDetail({
      rows: [
        makeRow({
          columns: [makeColumn({ verseRef: 'MAT 3:1' }), makeColumn({ verseRef: 'MRK 1:1' })],
        }),
      ],
    });
    render(<PassageDetailPane {...defaultProps({ detail })} />);
    expect(screen.getByText('MAT 3:1')).toBeTruthy();
    expect(screen.getByText('MRK 1:1')).toBeTruthy();
  });

  // --- Accessibility ---

  it('has region landmark with label', () => {
    render(<PassageDetailPane {...defaultProps()} />);
    expect(screen.getByRole('region', { name: /passage detail/i })).toBeTruthy();
  });

  it('collapse button has aria-expanded', () => {
    const detail = makeDetail({
      rows: [makeRow({ isCollapsible: true, isCollapsed: false })],
    });
    render(<PassageDetailPane {...defaultProps({ detail })} />);
    const btn = screen.getByRole('button', { name: /collapse/i });
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });
});
