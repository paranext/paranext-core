/**
 * Unit tests for ShowBooksWebView component
 *
 * UI-PKG-002: ShowBooksForm (Simplest Dialog - read-only display)
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ShowBooksWebView from './show-books.web-view';

// Mock platform-bible-react
vi.mock('platform-bible-react', () => ({
  Button: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  useLocalizedStrings: () => [
    {
      '%showBooks_title%': 'Show Book(s) - {projectName}',
      '%showBooks_helpText%': 'This dialog lists every book that could exist in a project.',
      '%showBooks_close%': 'Close',
      '%showBooks_bookExists%': 'Book exists in project',
      '%showBooks_bookNotExists%': 'Book does not exist in project',
    },
  ],
}));

describe('ShowBooksWebView', () => {
  const defaultInput = {
    projectId: 'test-project-123',
    projectName: 'Test Project',
    allPossibleBooks: [1, 2, 3, 40, 41, 42], // Gen, Exo, Lev, Mat, Mar, Luk
    existingBooks: [1, 40, 41], // Gen, Mat, Mar exist
  };

  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  // ============================================================================
  // Rendering Tests
  // ============================================================================

  it('renders the dialog with project name in title', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    expect(screen.getByText('Show Book(s) - Test Project')).toBeInTheDocument();
  });

  it('renders all books in the input', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    expect(screen.getByText('Genesis')).toBeInTheDocument();
    expect(screen.getByText('Exodus')).toBeInTheDocument();
    expect(screen.getByText('Leviticus')).toBeInTheDocument();
    expect(screen.getByText('Matthew')).toBeInTheDocument();
    expect(screen.getByText('Mark')).toBeInTheDocument();
    expect(screen.getByText('Luke')).toBeInTheDocument();
  });

  it('renders help text', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    expect(
      screen.getByText(/This dialog lists every book that could exist in a project/),
    ).toBeInTheDocument();
  });

  it('renders Close button', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  // ============================================================================
  // Checkmark Tests (BHV-310)
  // ============================================================================

  it('shows checkmarks for existing books', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    // Find list items and verify checkmarks
    const genesisItem = screen.getByRole('listitem', { name: /Genesis, Book exists/i });
    const matthewItem = screen.getByRole('listitem', { name: /Matthew, Book exists/i });

    expect(genesisItem).toBeInTheDocument();
    expect(matthewItem).toBeInTheDocument();
  });

  it('does not show checkmarks for non-existing books', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    // Find list items for non-existing books
    const exodusItem = screen.getByRole('listitem', { name: /Exodus, Book does not exist/i });
    const leviticusItem = screen.getByRole('listitem', { name: /Leviticus, Book does not exist/i });

    expect(exodusItem).toBeInTheDocument();
    expect(leviticusItem).toBeInTheDocument();
  });

  // ============================================================================
  // Obsolete Book Handling Tests
  // ============================================================================

  it('hides obsolete books that do not exist in project', () => {
    const inputWithObsolete = {
      ...defaultInput,
      allPossibleBooks: [1, 2, 83, 84], // Gen, Exo, Prayer of Manasseh (obsolete), Psalm 151 (obsolete)
      existingBooks: [1], // Only Gen exists
    };

    render(<ShowBooksWebView input={inputWithObsolete} onClose={mockOnClose} />);

    expect(screen.getByText('Genesis')).toBeInTheDocument();
    expect(screen.getByText('Exodus')).toBeInTheDocument();
    // Obsolete books should be filtered out if not existing
    expect(screen.queryByText('Prayer of Manasseh')).not.toBeInTheDocument();
    expect(screen.queryByText('Psalm 151')).not.toBeInTheDocument();
  });

  it('shows obsolete books that exist in project', () => {
    const inputWithExistingObsolete = {
      ...defaultInput,
      allPossibleBooks: [1, 83, 84], // Gen, Prayer of Manasseh, Psalm 151
      existingBooks: [1, 83], // Gen and Prayer of Manasseh exist
    };

    render(<ShowBooksWebView input={inputWithExistingObsolete} onClose={mockOnClose} />);

    expect(screen.getByText('Genesis')).toBeInTheDocument();
    expect(screen.getByText('Prayer of Manasseh')).toBeInTheDocument();
    // Psalm 151 should be hidden (obsolete and not existing)
    expect(screen.queryByText('Psalm 151')).not.toBeInTheDocument();
  });

  // ============================================================================
  // Close Action Tests
  // ============================================================================

  it('calls onClose with action "close" when Close button clicked', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledWith({ action: 'close' });
  });

  it('calls onClose with action "close" when Enter key pressed', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    fireEvent.keyDown(document, { key: 'Enter' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledWith({ action: 'close' });
  });

  it('calls onClose with action "close" when Escape key pressed', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledWith({ action: 'close' });
  });

  // ============================================================================
  // Accessibility Tests
  // ============================================================================

  it('has dialog role with aria-label', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'Show Book(s) - Test Project');
  });

  it('has list role for book list', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('has listitem role for each book', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(6); // All 6 books from defaultInput
  });

  it('has descriptive aria-label on each book item', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    // Check an existing book
    const genesisItem = screen.getByRole('listitem', { name: /Genesis, Book exists/i });
    expect(genesisItem).toBeInTheDocument();

    // Check a non-existing book
    const exodusItem = screen.getByRole('listitem', { name: /Exodus, Book does not exist/i });
    expect(exodusItem).toBeInTheDocument();
  });

  // ============================================================================
  // Layout Tests
  // ============================================================================

  it('uses multi-column grid layout', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    const grid = screen.getByRole('list').querySelector('.tw-grid');
    expect(grid).toHaveClass('tw-grid-cols-3');
  });

  it('has data-testid for component identification', () => {
    render(<ShowBooksWebView input={defaultInput} onClose={mockOnClose} />);

    expect(screen.getByTestId('show-books-dialog')).toBeInTheDocument();
  });

  // ============================================================================
  // Empty State Tests
  // ============================================================================

  it('renders empty list when no books available', () => {
    const emptyInput = {
      ...defaultInput,
      allPossibleBooks: [],
      existingBooks: [],
    };

    render(<ShowBooksWebView input={emptyInput} onClose={mockOnClose} />);

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems.length).toBe(0);
  });

  it('renders all books as non-existing when existingBooks is empty', () => {
    const noExistingInput = {
      ...defaultInput,
      existingBooks: [],
    };

    render(<ShowBooksWebView input={noExistingInput} onClose={mockOnClose} />);

    // All books should have "does not exist" aria-label
    const listItems = screen.getAllByRole('listitem');
    listItems.forEach((item) => {
      expect(item.getAttribute('aria-label')).toContain('Book does not exist');
    });
  });
});
