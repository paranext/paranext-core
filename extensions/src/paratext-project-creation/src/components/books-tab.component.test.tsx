import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BooksTab, BooksTabProps } from './books-tab.component';

// Mock @papi/frontend
vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: vi.fn() },
  },
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

// Mock @papi/frontend/react
vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [{}],
}));

const defaultProps: BooksTabProps = {
  plannedBooks: [],
  onPlannedBooksChange: vi.fn(),
};

function renderBooksTab(overrides: Partial<BooksTabProps> = {}) {
  const props = { ...defaultProps, ...overrides, onPlannedBooksChange: vi.fn() };
  if (overrides.onPlannedBooksChange) {
    props.onPlannedBooksChange = overrides.onPlannedBooksChange;
  }
  return { ...render(<BooksTab {...props} />), props };
}

describe('BooksTab', () => {
  it('renders the books tab container', () => {
    renderBooksTab();
    expect(screen.getByTestId('books-tab')).toBeInTheDocument();
  });

  it('shows selected count as 0 of 66 when none selected', () => {
    renderBooksTab();
    expect(screen.getByText('0 of 66 books selected')).toBeInTheDocument();
  });

  it('shows correct count when books are selected', () => {
    renderBooksTab({ plannedBooks: [1, 2, 40] });
    expect(screen.getByText('3 of 66 books selected')).toBeInTheDocument();
  });

  it('renders OT and NT group headings', () => {
    renderBooksTab();
    expect(screen.getByText('Old Testament')).toBeInTheDocument();
    expect(screen.getByText('New Testament')).toBeInTheDocument();
  });

  it('renders all 66 book checkboxes', () => {
    renderBooksTab();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(66);
  });

  it('shows Genesis and Revelation labels', () => {
    renderBooksTab();
    expect(screen.getByText('Genesis')).toBeInTheDocument();
    expect(screen.getByText('Revelation')).toBeInTheDocument();
  });

  it('checks boxes for selected books', () => {
    renderBooksTab({ plannedBooks: [1, 66] });
    const genesisCheckbox = screen.getByRole('checkbox', { name: 'Genesis' });
    const revelationCheckbox = screen.getByRole('checkbox', { name: 'Revelation' });
    expect(genesisCheckbox).toBeChecked();
    expect(revelationCheckbox).toBeChecked();
  });

  it('calls onPlannedBooksChange when a book is toggled on', () => {
    const onChange = vi.fn();
    renderBooksTab({ plannedBooks: [], onPlannedBooksChange: onChange });

    const genesisCheckbox = screen.getByRole('checkbox', { name: 'Genesis' });
    fireEvent.click(genesisCheckbox);

    expect(onChange).toHaveBeenCalledWith([1]);
  });

  it('calls onPlannedBooksChange when a book is toggled off', () => {
    const onChange = vi.fn();
    renderBooksTab({ plannedBooks: [1, 2], onPlannedBooksChange: onChange });

    const genesisCheckbox = screen.getByRole('checkbox', { name: 'Genesis' });
    fireEvent.click(genesisCheckbox);

    expect(onChange).toHaveBeenCalledWith([2]);
  });

  it('selects all OT books when Select All is clicked', () => {
    const onChange = vi.fn();
    renderBooksTab({ plannedBooks: [40], onPlannedBooksChange: onChange });

    // First "Select All" button is for OT
    const selectAllButtons = screen.getAllByText('Select All');
    fireEvent.click(selectAllButtons[0]);

    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const result = onChange.mock.calls[0][0] as number[];
    // Should contain all OT (1-39) plus existing NT (40)
    expect(result).toHaveLength(40);
    expect(result).toContain(1);
    expect(result).toContain(39);
    expect(result).toContain(40);
  });

  it('deselects all NT books when Deselect All is clicked', () => {
    const onChange = vi.fn();
    const allBooks = Array.from({ length: 66 }, (_, i) => i + 1);
    renderBooksTab({ plannedBooks: allBooks, onPlannedBooksChange: onChange });

    // Second "Deselect All" is for NT
    const deselectButtons = screen.getAllByText('Deselect All');
    fireEvent.click(deselectButtons[1]);

    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const result = onChange.mock.calls[0][0] as number[];
    // Should contain only OT (1-39)
    expect(result).toHaveLength(39);
    expect(result).not.toContain(40);
  });

  it('disables all checkboxes when disabled prop is true', () => {
    renderBooksTab({ disabled: true });
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((cb) => {
      expect(cb).toBeDisabled();
    });
  });

  it('disables Select All buttons when disabled', () => {
    renderBooksTab({ disabled: true });
    const selectAllButtons = screen.getAllByText('Select All');
    selectAllButtons.forEach((btn) => {
      expect(btn.closest('button')).toBeDisabled();
    });
  });

  it('disables Select All when all books in group are already selected', () => {
    const otBooks = Array.from({ length: 39 }, (_, i) => i + 1);
    renderBooksTab({ plannedBooks: otBooks });

    // First Select All is OT - should be disabled since all OT selected
    const selectAllButtons = screen.getAllByText('Select All');
    expect(selectAllButtons[0].closest('button')).toBeDisabled();
    // NT Select All should still be enabled
    expect(selectAllButtons[1].closest('button')).not.toBeDisabled();
  });

  it('disables Deselect All when no books in group are selected', () => {
    renderBooksTab({ plannedBooks: [] });

    const deselectButtons = screen.getAllByText('Deselect All');
    deselectButtons.forEach((btn) => {
      expect(btn.closest('button')).toBeDisabled();
    });
  });
});
