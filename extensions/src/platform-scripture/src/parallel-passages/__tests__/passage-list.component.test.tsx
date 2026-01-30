import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeAll } from 'vitest';
import PassageList, { PassageListProps } from '../passage-list.component';
import type { FilteredPassageEntry, StatusAggregation } from '../../types/parallel-passages';

beforeAll(() => {
  if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  }
});

function makeStatus(overrides: Partial<StatusAggregation> = {}): StatusAggregation {
  return {
    allIgnored: false,
    allTicked: false,
    anyOutdated: false,
    allChanged: false,
    allUnfinished: true,
    ...overrides,
  };
}

function makePassage(
  index: number,
  overrides: Partial<FilteredPassageEntry> = {},
): FilteredPassageEntry {
  return {
    index,
    passageType: 'NTtoNT',
    headVerse: `MAT ${index + 1}:1`,
    references: [
      {
        verseRef: `MAT ${index + 1}:1`,
        state: 'Unfinished',
        displayClass: 'found',
        showDiffIcon: false,
        showCheckmark: false,
      },
      {
        verseRef: `MRK ${index + 1}:1`,
        state: 'Unfinished',
        displayClass: 'found',
        showDiffIcon: false,
        showCheckmark: false,
      },
    ],
    statusAggregation: makeStatus(),
    ...overrides,
  };
}

const defaultProps: PassageListProps = {
  passages: [makePassage(0), makePassage(1), makePassage(2)],
  selectedIndex: null,
  viewType: 'RowView',
  isResourceProject: false,
  hasPassagesPermission: true,
  onSelectPassage: vi.fn(),
  onToggleRowApproval: vi.fn(),
};

function renderList(overrides: Partial<PassageListProps> = {}) {
  const props = { ...defaultProps, ...overrides };
  Object.values(props).forEach((v) => {
    if (typeof v === 'function' && 'mockClear' in v) (v as ReturnType<typeof vi.fn>).mockClear();
  });
  return render(<PassageList {...props} />);
}

describe('PassageList', () => {
  it('renders passage rows', () => {
    renderList();
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('displays verse references', () => {
    renderList();
    expect(screen.getByText('MAT 1:1')).toBeTruthy();
    expect(screen.getByText('MRK 1:1')).toBeTruthy();
  });

  it('shows empty message when no passages', () => {
    renderList({ passages: [] });
    expect(screen.getByText('No passages match the current filter')).toBeTruthy();
  });

  it('highlights selected row', () => {
    renderList({ selectedIndex: 1 });
    const options = screen.getAllByRole('option');
    expect(options[1].getAttribute('aria-selected')).toBe('true');
    expect(options[0].getAttribute('aria-selected')).toBe('false');
  });

  it('calls onSelectPassage on row click', async () => {
    const onSelect = vi.fn();
    renderList({ onSelectPassage: onSelect });
    const rows = screen.getAllByRole('option');
    await userEvent.click(rows[2]);
    expect(onSelect).toHaveBeenCalledWith(2);
  });

  describe('keyboard navigation', () => {
    it('ArrowDown moves selection forward', async () => {
      const onSelect = vi.fn();
      renderList({ selectedIndex: 0, onSelectPassage: onSelect });
      const listbox = screen.getByRole('listbox');
      await userEvent.click(listbox);
      await userEvent.keyboard('{ArrowDown}');
      expect(onSelect).toHaveBeenCalledWith(1);
    });

    it('ArrowUp moves selection backward', async () => {
      const onSelect = vi.fn();
      renderList({ selectedIndex: 2, onSelectPassage: onSelect });
      const listbox = screen.getByRole('listbox');
      await userEvent.click(listbox);
      await userEvent.keyboard('{ArrowUp}');
      expect(onSelect).toHaveBeenCalledWith(1);
    });

    it('ArrowDown does not go past last row', async () => {
      const onSelect = vi.fn();
      renderList({ selectedIndex: 2, onSelectPassage: onSelect });
      const listbox = screen.getByRole('listbox');
      await userEvent.click(listbox);
      await userEvent.keyboard('{ArrowDown}');
      expect(onSelect).toHaveBeenCalledWith(2);
    });

    it('ArrowUp does not go below first row', async () => {
      const onSelect = vi.fn();
      renderList({ selectedIndex: 0, onSelectPassage: onSelect });
      const listbox = screen.getByRole('listbox');
      await userEvent.click(listbox);
      await userEvent.keyboard('{ArrowUp}');
      expect(onSelect).toHaveBeenCalledWith(0);
    });

    it('Space toggles approval in RowView', async () => {
      const onToggle = vi.fn();
      renderList({ selectedIndex: 1, onToggleRowApproval: onToggle, viewType: 'RowView' });
      const listbox = screen.getByRole('listbox');
      await userEvent.click(listbox);
      await userEvent.keyboard(' ');
      expect(onToggle).toHaveBeenCalledWith(1);
    });

    it('Space does NOT toggle approval in ColumnView', async () => {
      const onToggle = vi.fn();
      renderList({ selectedIndex: 1, onToggleRowApproval: onToggle, viewType: 'ColumnView' });
      const listbox = screen.getByRole('listbox');
      await userEvent.click(listbox);
      await userEvent.keyboard(' ');
      expect(onToggle).not.toHaveBeenCalled();
    });
  });

  describe('checkbox states', () => {
    it('shows checked checkbox when allTicked', () => {
      renderList({
        passages: [
          makePassage(0, {
            statusAggregation: makeStatus({ allTicked: true, allUnfinished: false }),
          }),
        ],
      });
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.getAttribute('data-state')).toBe('checked');
    });

    it('shows unchecked checkbox when allUnfinished', () => {
      renderList({
        passages: [makePassage(0, { statusAggregation: makeStatus({ allUnfinished: true }) })],
      });
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.getAttribute('data-state')).toBe('unchecked');
    });

    it('hides checkbox when allIgnored', () => {
      renderList({
        passages: [makePassage(0, { statusAggregation: makeStatus({ allIgnored: true }) })],
      });
      expect(screen.queryByRole('checkbox')).toBeNull();
    });

    it('shows indeterminate checkbox when anyOutdated', () => {
      renderList({
        passages: [
          makePassage(0, {
            statusAggregation: makeStatus({ anyOutdated: true, allUnfinished: false }),
          }),
        ],
      });
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.getAttribute('data-state')).toBe('indeterminate');
    });

    it('disables checkbox for resource projects', () => {
      renderList({
        isResourceProject: true,
        passages: [makePassage(0)],
      });
      const checkbox = screen.getByRole('checkbox');
      expect(
        checkbox.hasAttribute('disabled') || checkbox.getAttribute('data-disabled') !== null,
      ).toBe(true);
    });

    it('disables checkbox when no Passages permission', () => {
      renderList({
        hasPassagesPermission: false,
        passages: [makePassage(0)],
      });
      const checkbox = screen.getByRole('checkbox');
      expect(
        checkbox.hasAttribute('disabled') || checkbox.getAttribute('data-disabled') !== null,
      ).toBe(true);
    });

    it('disables checkbox in ColumnView mode', () => {
      renderList({
        viewType: 'ColumnView',
        passages: [makePassage(0)],
      });
      const checkbox = screen.getByRole('checkbox');
      expect(
        checkbox.hasAttribute('disabled') || checkbox.getAttribute('data-disabled') !== null,
      ).toBe(true);
    });
  });

  describe('reference display', () => {
    it('shows diff icon for outdated references', () => {
      renderList({
        passages: [
          makePassage(0, {
            references: [
              {
                verseRef: 'MAT 1:1',
                state: 'Outdated',
                displayClass: 'found',
                showDiffIcon: true,
                showCheckmark: false,
              },
            ],
          }),
        ],
      });
      expect(screen.getByText('ab')).toBeTruthy();
    });

    it('shows checkmark for finished references', () => {
      renderList({
        passages: [
          makePassage(0, {
            references: [
              {
                verseRef: 'MAT 1:1',
                state: 'Finished',
                displayClass: 'found',
                showDiffIcon: false,
                showCheckmark: true,
              },
            ],
          }),
        ],
      });
      const option = screen.getByRole('option');
      const svgs = option.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('calls onToggleRowApproval when checkbox clicked', async () => {
    const onToggle = vi.fn();
    renderList({ onToggleRowApproval: onToggle, passages: [makePassage(0)] });
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledWith(0);
  });
});
