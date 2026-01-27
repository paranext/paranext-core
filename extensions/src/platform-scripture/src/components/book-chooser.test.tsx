import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  BookChooserControl,
  BookChooserProps,
  BOOK_CHOOSER_STRING_KEYS,
} from './book-chooser.component';

// =====================================================
// TEST CONSTANTS
// =====================================================

const OT_BOOKS = ['GEN', 'EXO', 'LEV', 'NUM', 'DEU'];
const NT_BOOKS = ['MAT', 'MRK', 'LUK', 'JHN', 'ACT'];
const ALL_TEST_BOOKS = [...OT_BOOKS, ...NT_BOOKS];

// =====================================================
// TEST HELPERS
// =====================================================

const defaultProps: BookChooserProps = {
  selectedBooks: [],
  onChange: vi.fn(),
  disabled: false,
  showMessage: false,
};

function renderBookChooser(props: Partial<BookChooserProps> = {}) {
  const mergedProps = { ...defaultProps, ...props };
  return render(<BookChooserControl {...mergedProps} />);
}

/** Gets the section's Select All button by finding the section header and its associated button. */
function getSectionSelectAllButton(sectionName: RegExp): HTMLElement {
  // Find all Select All buttons and filter to the one in the correct section
  const buttons = screen.getAllByRole('button', { name: 'Select All' });
  const sectionHeader = screen.getByRole('button', { name: sectionName });
  const sectionContainer = sectionHeader.closest('.tw-border');
  if (!sectionContainer) throw new Error(`Could not find section container for ${sectionName}`);

  const sectionButton = buttons.find((btn) => sectionContainer.contains(btn));
  if (!sectionButton) throw new Error(`Could not find Select All button in section ${sectionName}`);

  return sectionButton;
}

/** Gets the section's Clear All button by finding the section header and its associated button. */
function getSectionClearAllButton(sectionName: RegExp): HTMLElement {
  const buttons = screen.getAllByRole('button', { name: 'Clear All' });
  const sectionHeader = screen.getByRole('button', { name: sectionName });
  const sectionContainer = sectionHeader.closest('.tw-border');
  if (!sectionContainer) throw new Error(`Could not find section container for ${sectionName}`);

  const sectionButton = buttons.find((btn) => sectionContainer.contains(btn));
  if (!sectionButton) throw new Error(`Could not find Clear All button in section ${sectionName}`);

  return sectionButton;
}

/** Gets the global Select All button (the one in the header, not in a section). */
function getGlobalSelectAllButton(): HTMLElement {
  // The global buttons are in the header area with the count text
  const countText = screen.getByText(/of.*books selected/);
  const headerContainer = countText.closest('.tw-border-b');
  if (!headerContainer) throw new Error('Could not find header container');

  const parentContainer = headerContainer.parentElement;
  if (!parentContainer) throw new Error('Could not find parent container');

  const buttonElements = Array.from(parentContainer.querySelectorAll('button'));
  const selectAllButton = buttonElements.find((btn) => btn.textContent === 'Select All');
  if (!selectAllButton) throw new Error('Could not find global Select All button');

  return selectAllButton;
}

/** Gets the global Clear All button (the one in the header, not in a section). */
function getGlobalClearAllButton(): HTMLElement {
  const countText = screen.getByText(/of.*books selected/);
  const headerContainer = countText.closest('.tw-border-b');
  if (!headerContainer) throw new Error('Could not find header container');

  const parentContainer = headerContainer.parentElement;
  if (!parentContainer) throw new Error('Could not find parent container');

  const buttonElements = Array.from(parentContainer.querySelectorAll('button'));
  const clearAllButton = buttonElements.find((btn) => btn.textContent === 'Clear All');
  if (!clearAllButton) throw new Error('Could not find global Clear All button');

  return clearAllButton;
}

// =====================================================
// TESTS
// =====================================================

describe('BookChooserControl', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with default state showing all section headers', () => {
      renderBookChooser();

      // Section headers should be visible
      expect(screen.getByText(/Old Testament/)).toBeInTheDocument();
      expect(screen.getByText(/New Testament/)).toBeInTheDocument();
    });

    it('renders global select all and clear all buttons', () => {
      renderBookChooser();

      const buttons = screen.getAllByRole('button');
      const selectAllButton = buttons.find((btn) => btn.textContent === 'Select All');
      const clearAllButton = buttons.find((btn) => btn.textContent === 'Clear All');

      expect(selectAllButton).toBeInTheDocument();
      expect(clearAllButton).toBeInTheDocument();
    });

    it('renders selected count text', () => {
      renderBookChooser({ selectedBooks: ['GEN', 'EXO', 'MAT'] });

      expect(screen.getByText(/3 of/)).toBeInTheDocument();
    });

    it('renders checkboxes for books when section is expanded', () => {
      renderBookChooser();

      // Genesis should be visible in expanded OT section
      expect(screen.getByLabelText('Genesis')).toBeInTheDocument();
    });

    it('shows "Books are not needed" message when showMessage is true', () => {
      renderBookChooser({ showMessage: true });

      expect(screen.getByText('Books are not needed for this project type.')).toBeInTheDocument();

      // Should not show book sections
      expect(screen.queryByText(/Old Testament/)).not.toBeInTheDocument();
    });

    it('shows custom message when showMessage is true and localized string provided', () => {
      renderBookChooser({
        showMessage: true,
        localizedStrings: {
          '%book_chooser_not_needed%': 'Custom not needed message',
        },
      });

      expect(screen.getByText('Custom not needed message')).toBeInTheDocument();
    });

    it('applies disabled state to checkboxes when disabled prop is true', () => {
      renderBookChooser({ disabled: true });

      const genesisCheckbox = screen.getByLabelText('Genesis');
      expect(genesisCheckbox).toBeDisabled();
    });
  });

  describe('Book Selection', () => {
    it('calls onChange when a book checkbox is clicked', () => {
      const onChange = vi.fn();
      renderBookChooser({ onChange, selectedBooks: [] });

      const genesisCheckbox = screen.getByLabelText('Genesis');
      fireEvent.click(genesisCheckbox);

      expect(onChange).toHaveBeenCalledWith(['GEN']);
    });

    it('removes book from selection when unchecked', () => {
      const onChange = vi.fn();
      renderBookChooser({ onChange, selectedBooks: ['GEN'] });

      const genesisCheckbox = screen.getByLabelText('Genesis');
      fireEvent.click(genesisCheckbox);

      expect(onChange).toHaveBeenCalledWith([]);
    });

    it('shows checkbox as checked for selected books', () => {
      renderBookChooser({ selectedBooks: ['GEN', 'EXO'] });

      const genesisCheckbox = screen.getByLabelText('Genesis');
      const exodusCheckbox = screen.getByLabelText('Exodus');
      const levitusCheckbox = screen.getByLabelText('Leviticus');

      expect(genesisCheckbox).toBeChecked();
      expect(exodusCheckbox).toBeChecked();
      expect(levitusCheckbox).not.toBeChecked();
    });
  });

  describe('Section Toggle', () => {
    it('collapses section when header is clicked', () => {
      renderBookChooser();

      // Find OT section header button
      const otHeader = screen.getByRole('button', { name: /Old Testament/ });

      // Genesis should be visible initially
      expect(screen.getByLabelText('Genesis')).toBeInTheDocument();

      // Click to collapse
      fireEvent.click(otHeader);

      // Genesis should no longer be visible
      expect(screen.queryByLabelText('Genesis')).not.toBeInTheDocument();
    });

    it('expands section when header is clicked again', () => {
      renderBookChooser();

      const otHeader = screen.getByRole('button', { name: /Old Testament/ });

      // Collapse then expand
      fireEvent.click(otHeader);
      fireEvent.click(otHeader);

      // Genesis should be visible again
      expect(screen.getByLabelText('Genesis')).toBeInTheDocument();
    });

    it('shows selected count in collapsed section', () => {
      renderBookChooser({ selectedBooks: ['GEN', 'EXO'] });

      const otHeader = screen.getByRole('button', { name: /Old Testament/ });
      fireEvent.click(otHeader);

      // Should show "2 books selected" when collapsed
      expect(screen.getByText('2 books selected')).toBeInTheDocument();
    });
  });

  describe('Select All / Clear All per Section', () => {
    it('selects all books in section when Select All is clicked', () => {
      const onChange = vi.fn();
      renderBookChooser({
        onChange,
        selectedBooks: [],
        availableBooks: ALL_TEST_BOOKS,
      });

      const selectAllButton = getSectionSelectAllButton(/Old Testament/);
      fireEvent.click(selectAllButton);

      // Should have called onChange with all OT books
      expect(onChange).toHaveBeenCalled();
      const calledWith: string[] = onChange.mock.calls[0][0];
      expect(calledWith).toContain('GEN');
      expect(calledWith).toContain('EXO');
      expect(calledWith).toContain('LEV');
    });

    it('clears all books in section when Clear All is clicked', () => {
      const onChange = vi.fn();
      renderBookChooser({
        onChange,
        selectedBooks: OT_BOOKS,
        availableBooks: ALL_TEST_BOOKS,
      });

      const clearAllButton = getSectionClearAllButton(/Old Testament/);
      fireEvent.click(clearAllButton);

      // Should have called onChange without OT books
      expect(onChange).toHaveBeenCalledWith([]);
    });

    it('disables section Select All when all books are selected', () => {
      renderBookChooser({
        selectedBooks: OT_BOOKS,
        availableBooks: ALL_TEST_BOOKS,
      });

      const selectAllButton = getSectionSelectAllButton(/Old Testament/);
      expect(selectAllButton).toBeDisabled();
    });

    it('disables section Clear All when no books are selected', () => {
      renderBookChooser({
        selectedBooks: [],
        availableBooks: ALL_TEST_BOOKS,
      });

      const clearAllButton = getSectionClearAllButton(/Old Testament/);
      expect(clearAllButton).toBeDisabled();
    });
  });

  describe('Global Select All / Clear All', () => {
    it('selects all books when global Select All is clicked', () => {
      const onChange = vi.fn();
      renderBookChooser({
        onChange,
        selectedBooks: [],
        availableBooks: ALL_TEST_BOOKS,
      });

      const selectAllButton = getGlobalSelectAllButton();
      fireEvent.click(selectAllButton);

      expect(onChange).toHaveBeenCalled();
      const calledWith: string[] = onChange.mock.calls[0][0];
      expect(calledWith.length).toBe(ALL_TEST_BOOKS.length);
    });

    it('clears all books when global Clear All is clicked', () => {
      const onChange = vi.fn();
      renderBookChooser({
        onChange,
        selectedBooks: ALL_TEST_BOOKS,
        availableBooks: ALL_TEST_BOOKS,
      });

      const clearAllButton = getGlobalClearAllButton();
      fireEvent.click(clearAllButton);

      expect(onChange).toHaveBeenCalledWith([]);
    });
  });

  describe('Localization', () => {
    it('uses localized section names when provided', () => {
      renderBookChooser({
        localizedStrings: {
          '%book_chooser_ot%': 'Antiguo Testamento',
          '%book_chooser_nt%': 'Nuevo Testamento',
        },
      });

      expect(screen.getByText(/Antiguo Testamento/)).toBeInTheDocument();
      expect(screen.getByText(/Nuevo Testamento/)).toBeInTheDocument();
    });

    it('uses localized button text when provided', () => {
      renderBookChooser({
        localizedStrings: {
          '%book_chooser_select_all%': 'Seleccionar Todo',
          '%book_chooser_clear_all%': 'Limpiar Todo',
        },
      });

      expect(screen.getAllByRole('button', { name: 'Seleccionar Todo' }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('button', { name: 'Limpiar Todo' }).length).toBeGreaterThan(0);
    });

    it('uses localized book names when provided', () => {
      renderBookChooser({
        localizedBookNames: new Map([['GEN', 'Genesis (Localized)']]),
      });

      expect(screen.getByLabelText('Genesis (Localized)')).toBeInTheDocument();
    });

    it('exports BOOK_CHOOSER_STRING_KEYS for localization', () => {
      expect(BOOK_CHOOSER_STRING_KEYS).toContain('%book_chooser_ot%');
      expect(BOOK_CHOOSER_STRING_KEYS).toContain('%book_chooser_nt%');
      expect(BOOK_CHOOSER_STRING_KEYS).toContain('%book_chooser_select_all%');
      expect(BOOK_CHOOSER_STRING_KEYS).toContain('%book_chooser_not_needed%');
    });
  });

  describe('Available Books Filter', () => {
    it('only shows books from availableBooks when provided', () => {
      renderBookChooser({
        availableBooks: ['GEN', 'EXO'],
      });

      expect(screen.getByLabelText('Genesis')).toBeInTheDocument();
      expect(screen.getByLabelText('Exodus')).toBeInTheDocument();
      expect(screen.queryByLabelText('Leviticus')).not.toBeInTheDocument();
    });

    it('shows all canonical books when availableBooks is not provided', () => {
      renderBookChooser();

      // Should have Matthew from NT
      expect(screen.getByLabelText('Matthew')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-expanded on section headers', () => {
      renderBookChooser();

      const otHeader = screen.getByRole('button', { name: /Old Testament/ });
      expect(otHeader).toHaveAttribute('aria-expanded', 'true');

      fireEvent.click(otHeader);
      expect(otHeader).toHaveAttribute('aria-expanded', 'false');
    });

    it('has proper aria-controls linking header to content', () => {
      renderBookChooser();

      const otHeader = screen.getByRole('button', { name: /Old Testament/ });
      expect(otHeader).toHaveAttribute('aria-controls', 'book-section-OT');
    });

    it('has role="group" on book sections', () => {
      renderBookChooser();

      const otGroup = screen.getByRole('group', { name: 'Old Testament' });
      expect(otGroup).toBeInTheDocument();
    });

    it('provides aria-label for book checkboxes', () => {
      renderBookChooser();

      const genesisCheckbox = screen.getByLabelText('Genesis');
      expect(genesisCheckbox).toHaveAttribute('aria-label', 'Genesis');
    });
  });
});
