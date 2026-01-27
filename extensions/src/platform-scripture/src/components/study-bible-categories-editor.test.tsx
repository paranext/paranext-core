import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  StudyBibleCategoriesEditor,
  StudyBibleCategoriesEditorProps,
  StudyBibleCategory,
  STUDY_BIBLE_CATEGORIES_EDITOR_STRING_KEYS,
} from './study-bible-categories-editor.component';

// =====================================================
// TEST CONSTANTS
// =====================================================

const createMockCategory = (overrides: Partial<StudyBibleCategory> = {}): StudyBibleCategory => ({
  id: `category-${Math.random().toString(36).substring(7)}`,
  name: 'Test Category',
  showInSidebars: true,
  showInFootnotes: false,
  ...overrides,
});

// =====================================================
// TEST HELPERS
// =====================================================

const defaultProps: StudyBibleCategoriesEditorProps = {
  categories: [],
  onChange: vi.fn(),
  disabled: false,
};

function renderStudyBibleCategoriesEditor(props: Partial<StudyBibleCategoriesEditorProps> = {}) {
  const mergedProps = { ...defaultProps, ...props };
  return render(<StudyBibleCategoriesEditor {...mergedProps} />);
}

/** Gets the row element for a category by its name. */
function getCategoryRow(categoryName: string): HTMLElement {
  // Find the input with the category name and get its parent row
  const nameInput = screen.getByDisplayValue(categoryName);
  const row = nameInput.closest('tr');
  if (!row) throw new Error(`Could not find row for category: ${categoryName}`);
  return row;
}

/** Gets the delete button for a specific category row. */
function getDeleteButton(categoryRow: HTMLElement): HTMLElement {
  const deleteButton = within(categoryRow).getByRole('button', { name: /delete/i });
  return deleteButton;
}

/** Gets the checkbox for "Show in Sidebars" in a specific category row. */
function getShowInSidebarsCheckbox(categoryRow: HTMLElement): HTMLElement {
  const checkbox = within(categoryRow).getByRole('checkbox', { name: /show in sidebars/i });
  return checkbox;
}

/** Gets the checkbox for "Show in Footnotes" in a specific category row. */
function getShowInFootnotesCheckbox(categoryRow: HTMLElement): HTMLElement {
  const checkbox = within(categoryRow).getByRole('checkbox', { name: /show in footnotes/i });
  return checkbox;
}

// =====================================================
// TESTS
// =====================================================

describe('StudyBibleCategoriesEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with column headers', () => {
      renderStudyBibleCategoriesEditor();

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Show in Sidebars')).toBeInTheDocument();
      expect(screen.getByText('Show in Footnotes')).toBeInTheDocument();
    });

    it('renders "Add category" button', () => {
      renderStudyBibleCategoriesEditor();

      expect(screen.getByRole('button', { name: /add category/i })).toBeInTheDocument();
    });

    it('renders category count showing "0 categories" when empty', () => {
      renderStudyBibleCategoriesEditor({ categories: [] });

      expect(screen.getByText('0 categories')).toBeInTheDocument();
    });

    it('renders category count with singular "category" for 1 category', () => {
      renderStudyBibleCategoriesEditor({ categories: [createMockCategory()] });

      expect(screen.getByText('1 category')).toBeInTheDocument();
    });

    it('renders category count with plural "categories" for multiple categories', () => {
      renderStudyBibleCategoriesEditor({
        categories: [
          createMockCategory({ name: 'Category 1' }),
          createMockCategory({ name: 'Category 2' }),
        ],
      });

      expect(screen.getByText('2 categories')).toBeInTheDocument();
    });

    it('renders empty state message when no categories', () => {
      renderStudyBibleCategoriesEditor({ categories: [] });

      expect(screen.getByText(/no categories configured/i)).toBeInTheDocument();
    });

    it('renders category rows for each category', () => {
      const categories = [
        createMockCategory({ name: 'First Category' }),
        createMockCategory({ name: 'Second Category' }),
      ];
      renderStudyBibleCategoriesEditor({ categories });

      expect(screen.getByDisplayValue('First Category')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Second Category')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = renderStudyBibleCategoriesEditor({ className: 'custom-class' });

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Add New Category', () => {
    it('calls onChange with new category when "Add category" is clicked', () => {
      const onChange = vi.fn();
      renderStudyBibleCategoriesEditor({ categories: [], onChange });

      const addButton = screen.getByRole('button', { name: /add category/i });
      fireEvent.click(addButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      const newCategories = onChange.mock.calls[0][0];
      expect(newCategories).toHaveLength(1);
      expect(newCategories[0]).toMatchObject({
        name: '',
        showInSidebars: true,
        showInFootnotes: false,
      });
      expect(newCategories[0].id).toBeDefined();
    });

    it('adds new category to existing categories', () => {
      const existingCategory = createMockCategory({ name: 'Existing' });
      const onChange = vi.fn();
      renderStudyBibleCategoriesEditor({ categories: [existingCategory], onChange });

      const addButton = screen.getByRole('button', { name: /add category/i });
      fireEvent.click(addButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      const newCategories = onChange.mock.calls[0][0];
      expect(newCategories).toHaveLength(2);
      expect(newCategories[0]).toEqual(existingCategory);
    });

    it('disables "Add category" button when disabled prop is true', () => {
      renderStudyBibleCategoriesEditor({ disabled: true });

      const addButton = screen.getByRole('button', { name: /add category/i });
      expect(addButton).toBeDisabled();
    });
  });

  describe('Name Editing', () => {
    it('calls onChange when name is changed', () => {
      const category = createMockCategory({ name: 'Original' });
      const onChange = vi.fn();
      renderStudyBibleCategoriesEditor({ categories: [category], onChange });

      const nameInput = screen.getByDisplayValue('Original');
      fireEvent.change(nameInput, { target: { value: 'Updated' } });

      expect(onChange).toHaveBeenCalledWith([
        expect.objectContaining({ id: category.id, name: 'Updated' }),
      ]);
    });

    it('shows error when name is left empty on blur', () => {
      const category = createMockCategory({ name: 'Original' });
      const onChange = vi.fn();
      renderStudyBibleCategoriesEditor({ categories: [category], onChange });

      const nameInput = screen.getByDisplayValue('Original');
      fireEvent.change(nameInput, { target: { value: '' } });
      fireEvent.blur(nameInput);

      expect(screen.getByRole('alert')).toHaveTextContent(/name is required/i);
    });

    it('shows error when name is duplicate on blur', () => {
      const categories = [
        createMockCategory({ name: 'First Category' }),
        createMockCategory({ name: 'Second Category' }),
      ];
      const onChange = vi.fn();
      renderStudyBibleCategoriesEditor({ categories, onChange });

      const secondNameInput = screen.getByDisplayValue('Second Category');
      fireEvent.change(secondNameInput, { target: { value: 'First Category' } });
      fireEvent.blur(secondNameInput);

      expect(screen.getByRole('alert')).toHaveTextContent(/name must be unique/i);
    });

    it('clears error when name is changed after error', () => {
      const category = createMockCategory({ name: '' });
      const onChange = vi.fn();
      renderStudyBibleCategoriesEditor({ categories: [category], onChange });

      const nameInput = screen.getByPlaceholderText(/enter category name/i);
      fireEvent.blur(nameInput); // Trigger required error
      expect(screen.getByRole('alert')).toBeInTheDocument();

      fireEvent.change(nameInput, { target: { value: 'New Name' } });
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('validates duplicate names case-insensitively', () => {
      const categories = [
        createMockCategory({ name: 'Introduction' }),
        createMockCategory({ name: 'Second' }),
      ];
      const onChange = vi.fn();
      renderStudyBibleCategoriesEditor({ categories, onChange });

      const secondNameInput = screen.getByDisplayValue('Second');
      fireEvent.change(secondNameInput, { target: { value: 'INTRODUCTION' } });
      fireEvent.blur(secondNameInput);

      expect(screen.getByRole('alert')).toHaveTextContent(/name must be unique/i);
    });
  });

  describe('Show in Sidebars Checkbox', () => {
    it('renders checked by default for new categories', () => {
      const category = createMockCategory({ showInSidebars: true, name: 'Test' });
      renderStudyBibleCategoriesEditor({ categories: [category] });

      const row = getCategoryRow('Test');
      const checkbox = getShowInSidebarsCheckbox(row);
      expect(checkbox).toBeChecked();
    });

    it('renders unchecked when showInSidebars is false', () => {
      const category = createMockCategory({ showInSidebars: false, name: 'Test' });
      renderStudyBibleCategoriesEditor({ categories: [category] });

      const row = getCategoryRow('Test');
      const checkbox = getShowInSidebarsCheckbox(row);
      expect(checkbox).not.toBeChecked();
    });

    it('calls onChange when checkbox is toggled', () => {
      const category = createMockCategory({ showInSidebars: true, name: 'Test' });
      const onChange = vi.fn();
      renderStudyBibleCategoriesEditor({ categories: [category], onChange });

      const row = getCategoryRow('Test');
      const checkbox = getShowInSidebarsCheckbox(row);
      fireEvent.click(checkbox);

      expect(onChange).toHaveBeenCalledWith([
        expect.objectContaining({ id: category.id, showInSidebars: false }),
      ]);
    });
  });

  describe('Show in Footnotes Checkbox', () => {
    it('renders unchecked by default for new categories', () => {
      const category = createMockCategory({ showInFootnotes: false, name: 'Test' });
      renderStudyBibleCategoriesEditor({ categories: [category] });

      const row = getCategoryRow('Test');
      const checkbox = getShowInFootnotesCheckbox(row);
      expect(checkbox).not.toBeChecked();
    });

    it('renders checked when showInFootnotes is true', () => {
      const category = createMockCategory({ showInFootnotes: true, name: 'Test' });
      renderStudyBibleCategoriesEditor({ categories: [category] });

      const row = getCategoryRow('Test');
      const checkbox = getShowInFootnotesCheckbox(row);
      expect(checkbox).toBeChecked();
    });

    it('calls onChange when checkbox is toggled', () => {
      const category = createMockCategory({ showInFootnotes: false, name: 'Test' });
      const onChange = vi.fn();
      renderStudyBibleCategoriesEditor({ categories: [category], onChange });

      const row = getCategoryRow('Test');
      const checkbox = getShowInFootnotesCheckbox(row);
      fireEvent.click(checkbox);

      expect(onChange).toHaveBeenCalledWith([
        expect.objectContaining({ id: category.id, showInFootnotes: true }),
      ]);
    });
  });

  describe('Delete Category', () => {
    it('calls onChange with category removed when delete is clicked', () => {
      const category = createMockCategory({ name: 'To Delete' });
      const onChange = vi.fn();
      renderStudyBibleCategoriesEditor({ categories: [category], onChange });

      const row = getCategoryRow('To Delete');
      const deleteButton = getDeleteButton(row);
      fireEvent.click(deleteButton);

      expect(onChange).toHaveBeenCalledWith([]);
    });

    it('preserves other categories when one is deleted', () => {
      const categories = [
        createMockCategory({ name: 'Keep Me' }),
        createMockCategory({ name: 'Delete Me' }),
      ];
      const onChange = vi.fn();
      renderStudyBibleCategoriesEditor({ categories, onChange });

      const row = getCategoryRow('Delete Me');
      const deleteButton = getDeleteButton(row);
      fireEvent.click(deleteButton);

      expect(onChange).toHaveBeenCalledWith([expect.objectContaining({ name: 'Keep Me' })]);
    });

    it('allows deletion of all categories (no built-in categories)', () => {
      const categories = [
        createMockCategory({ name: 'First' }),
        createMockCategory({ name: 'Second' }),
      ];
      const onChange = vi.fn();
      renderStudyBibleCategoriesEditor({ categories, onChange });

      // First delete
      const firstRow = getCategoryRow('First');
      const firstDeleteButton = getDeleteButton(firstRow);
      expect(firstDeleteButton).not.toBeDisabled();
      fireEvent.click(firstDeleteButton);

      // Verify first was removed
      expect(onChange).toHaveBeenCalledWith([expect.objectContaining({ name: 'Second' })]);
    });
  });

  describe('Disabled State', () => {
    it('disables all name inputs when disabled prop is true', () => {
      const category = createMockCategory({ name: 'Test' });
      renderStudyBibleCategoriesEditor({ categories: [category], disabled: true });

      const nameInput = screen.getByDisplayValue('Test');
      expect(nameInput).toBeDisabled();
    });

    it('disables all sidebars checkboxes when disabled prop is true', () => {
      const category = createMockCategory({ name: 'Test' });
      renderStudyBibleCategoriesEditor({ categories: [category], disabled: true });

      const row = getCategoryRow('Test');
      const checkbox = getShowInSidebarsCheckbox(row);
      expect(checkbox).toBeDisabled();
    });

    it('disables all footnotes checkboxes when disabled prop is true', () => {
      const category = createMockCategory({ name: 'Test' });
      renderStudyBibleCategoriesEditor({ categories: [category], disabled: true });

      const row = getCategoryRow('Test');
      const checkbox = getShowInFootnotesCheckbox(row);
      expect(checkbox).toBeDisabled();
    });

    it('disables all delete buttons when disabled prop is true', () => {
      const category = createMockCategory({ name: 'Test' });
      renderStudyBibleCategoriesEditor({ categories: [category], disabled: true });

      const row = getCategoryRow('Test');
      const deleteButton = getDeleteButton(row);
      expect(deleteButton).toBeDisabled();
    });
  });

  describe('Localization', () => {
    it('uses localized column headers when provided', () => {
      renderStudyBibleCategoriesEditor({
        localizedStrings: {
          '%study_bible_name%': 'Nombre',
          '%study_bible_show_sidebars%': 'Mostrar en barras laterales',
          '%study_bible_show_footnotes%': 'Mostrar en notas al pie',
        },
      });

      expect(screen.getByText('Nombre')).toBeInTheDocument();
      expect(screen.getByText('Mostrar en barras laterales')).toBeInTheDocument();
      expect(screen.getByText('Mostrar en notas al pie')).toBeInTheDocument();
    });

    it('uses localized button text when provided', () => {
      renderStudyBibleCategoriesEditor({
        localizedStrings: {
          '%study_bible_add%': 'Agregar categoria',
        },
      });

      expect(screen.getByRole('button', { name: /agregar categoria/i })).toBeInTheDocument();
    });

    it('uses localized error messages when provided', () => {
      const category = createMockCategory({ name: '' });
      renderStudyBibleCategoriesEditor({
        categories: [category],
        localizedStrings: {
          '%study_bible_error_required%': 'Se requiere nombre',
        },
      });

      const nameInput = screen.getByPlaceholderText(/enter category name/i);
      fireEvent.blur(nameInput);

      expect(screen.getByRole('alert')).toHaveTextContent('Se requiere nombre');
    });

    it('exports STUDY_BIBLE_CATEGORIES_EDITOR_STRING_KEYS for localization', () => {
      expect(STUDY_BIBLE_CATEGORIES_EDITOR_STRING_KEYS).toContain('%study_bible_name%');
      expect(STUDY_BIBLE_CATEGORIES_EDITOR_STRING_KEYS).toContain('%study_bible_show_sidebars%');
      expect(STUDY_BIBLE_CATEGORIES_EDITOR_STRING_KEYS).toContain('%study_bible_show_footnotes%');
      expect(STUDY_BIBLE_CATEGORIES_EDITOR_STRING_KEYS).toContain('%study_bible_add%');
      expect(STUDY_BIBLE_CATEGORIES_EDITOR_STRING_KEYS).toContain('%study_bible_error_duplicate%');
      expect(STUDY_BIBLE_CATEGORIES_EDITOR_STRING_KEYS).toContain('%study_bible_error_required%');
    });
  });

  describe('Multiple Categories', () => {
    it('handles updates to correct category when multiple exist', () => {
      const categories = [
        createMockCategory({ id: 'cat-1', name: 'Category A' }),
        createMockCategory({ id: 'cat-2', name: 'Category B' }),
        createMockCategory({ id: 'cat-3', name: 'Category C' }),
      ];
      const onChange = vi.fn();
      renderStudyBibleCategoriesEditor({ categories, onChange });

      // Update the middle category
      const middleRow = getCategoryRow('Category B');
      const sidebarsCheckbox = getShowInSidebarsCheckbox(middleRow);
      fireEvent.click(sidebarsCheckbox);

      // Verify only the middle category was updated
      expect(onChange).toHaveBeenCalledWith([
        expect.objectContaining({ id: 'cat-1', name: 'Category A' }),
        expect.objectContaining({ id: 'cat-2', name: 'Category B', showInSidebars: false }),
        expect.objectContaining({ id: 'cat-3', name: 'Category C' }),
      ]);
    });

    it('maintains category order when updating', () => {
      const categories = [
        createMockCategory({ id: 'cat-1', name: 'First' }),
        createMockCategory({ id: 'cat-2', name: 'Second' }),
        createMockCategory({ id: 'cat-3', name: 'Third' }),
      ];
      const onChange = vi.fn();
      renderStudyBibleCategoriesEditor({ categories, onChange });

      // Update the first category's name
      const firstNameInput = screen.getByDisplayValue('First');
      fireEvent.change(firstNameInput, { target: { value: 'Updated First' } });

      // Verify order is maintained
      const newCategories = onChange.mock.calls[0][0];
      expect(newCategories[0].name).toBe('Updated First');
      expect(newCategories[1].name).toBe('Second');
      expect(newCategories[2].name).toBe('Third');
    });
  });
});
