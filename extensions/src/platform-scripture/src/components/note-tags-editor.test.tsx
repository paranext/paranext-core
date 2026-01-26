import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  NoteTagsEditor,
  NoteTagsEditorProps,
  NoteTag,
  NOTE_TAGS_EDITOR_STRING_KEYS,
  NOTE_TAG_ICONS,
} from './note-tags-editor.component';

// =====================================================
// TEST CONSTANTS
// =====================================================

const createMockTag = (overrides: Partial<NoteTag> = {}): NoteTag => ({
  id: `tag-${Math.random().toString(36).substring(7)}`,
  icon: 'flag',
  name: 'Test Tag',
  creatorCanResolve: false,
  template: '',
  ...overrides,
});

const TODO_TAG: NoteTag = {
  id: 'builtin-todo',
  icon: 'check',
  name: 'To do',
  creatorCanResolve: true,
  template: '',
};

// =====================================================
// TEST HELPERS
// =====================================================

const defaultProps: NoteTagsEditorProps = {
  tags: [],
  onChange: vi.fn(),
  disabled: false,
};

function renderNoteTagsEditor(props: Partial<NoteTagsEditorProps> = {}) {
  const mergedProps = { ...defaultProps, ...props };
  return render(<NoteTagsEditor {...mergedProps} />);
}

/** Gets the row element for a tag by its name. */
function getTagRow(tagName: string): HTMLElement {
  // Find the input with the tag name and get its parent row
  const nameInput = screen.getByDisplayValue(tagName);
  const row = nameInput.closest('tr');
  if (!row) throw new Error(`Could not find row for tag: ${tagName}`);
  return row;
}

/** Gets the delete button for a specific tag row. */
function getDeleteButton(tagRow: HTMLElement): HTMLElement {
  const deleteButton = within(tagRow).getByRole('button', { name: /delete|cannot be deleted/i });
  return deleteButton;
}

/** Gets the icon select trigger for a specific tag row. */
function getIconSelectTrigger(tagRow: HTMLElement): HTMLElement {
  const selectTrigger = within(tagRow).getByRole('combobox', { name: /select icon/i });
  return selectTrigger;
}

/** Gets the checkbox for "Creator can resolve" in a specific tag row. */
function getCreatorResolveCheckbox(tagRow: HTMLElement): HTMLElement {
  const checkbox = within(tagRow).getByRole('checkbox', { name: /creator can resolve/i });
  return checkbox;
}

/** Gets the template edit button in a specific tag row. */
function getTemplateButton(tagRow: HTMLElement): HTMLElement {
  const button = within(tagRow).getByRole('button', { name: /edit template/i });
  return button;
}

// =====================================================
// TESTS
// =====================================================

describe('NoteTagsEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with column headers', () => {
      renderNoteTagsEditor();

      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Creator can resolve')).toBeInTheDocument();
      expect(screen.getByText('Template')).toBeInTheDocument();
    });

    it('renders "Add new tag" button', () => {
      renderNoteTagsEditor();

      expect(screen.getByRole('button', { name: /add new tag/i })).toBeInTheDocument();
    });

    it('renders tag count showing "0 tags" when empty', () => {
      renderNoteTagsEditor({ tags: [] });

      expect(screen.getByText('0 tags')).toBeInTheDocument();
    });

    it('renders tag count with singular "tag" for 1 tag', () => {
      renderNoteTagsEditor({ tags: [createMockTag()] });

      expect(screen.getByText('1 tag')).toBeInTheDocument();
    });

    it('renders tag count with plural "tags" for multiple tags', () => {
      renderNoteTagsEditor({
        tags: [createMockTag({ name: 'Tag 1' }), createMockTag({ name: 'Tag 2' })],
      });

      expect(screen.getByText('2 tags')).toBeInTheDocument();
    });

    it('renders empty state message when no tags', () => {
      renderNoteTagsEditor({ tags: [] });

      expect(screen.getByText(/no tags configured/i)).toBeInTheDocument();
    });

    it('renders tag rows for each tag', () => {
      const tags = [createMockTag({ name: 'First Tag' }), createMockTag({ name: 'Second Tag' })];
      renderNoteTagsEditor({ tags });

      expect(screen.getByDisplayValue('First Tag')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Second Tag')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = renderNoteTagsEditor({ className: 'custom-class' });

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Add New Tag', () => {
    it('calls onChange with new tag when "Add new tag" is clicked', () => {
      const onChange = vi.fn();
      renderNoteTagsEditor({ tags: [], onChange });

      const addButton = screen.getByRole('button', { name: /add new tag/i });
      fireEvent.click(addButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      const newTags = onChange.mock.calls[0][0];
      expect(newTags).toHaveLength(1);
      expect(newTags[0]).toMatchObject({
        icon: 'flag',
        name: '',
        creatorCanResolve: false,
        template: '',
      });
      expect(newTags[0].id).toBeDefined();
    });

    it('adds new tag to existing tags', () => {
      const existingTag = createMockTag({ name: 'Existing' });
      const onChange = vi.fn();
      renderNoteTagsEditor({ tags: [existingTag], onChange });

      const addButton = screen.getByRole('button', { name: /add new tag/i });
      fireEvent.click(addButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      const newTags = onChange.mock.calls[0][0];
      expect(newTags).toHaveLength(2);
      expect(newTags[0]).toEqual(existingTag);
    });

    it('disables "Add new tag" button when disabled prop is true', () => {
      renderNoteTagsEditor({ disabled: true });

      const addButton = screen.getByRole('button', { name: /add new tag/i });
      expect(addButton).toBeDisabled();
    });
  });

  describe('Name Editing', () => {
    it('calls onChange when name is changed', () => {
      const tag = createMockTag({ name: 'Original' });
      const onChange = vi.fn();
      renderNoteTagsEditor({ tags: [tag], onChange });

      const nameInput = screen.getByDisplayValue('Original');
      fireEvent.change(nameInput, { target: { value: 'Updated' } });

      expect(onChange).toHaveBeenCalledWith([
        expect.objectContaining({ id: tag.id, name: 'Updated' }),
      ]);
    });

    it('shows error when name is left empty on blur', () => {
      const tag = createMockTag({ name: 'Original' });
      const onChange = vi.fn();
      renderNoteTagsEditor({ tags: [tag], onChange });

      const nameInput = screen.getByDisplayValue('Original');
      fireEvent.change(nameInput, { target: { value: '' } });
      fireEvent.blur(nameInput);

      expect(screen.getByRole('alert')).toHaveTextContent(/name is required/i);
    });

    it('shows error when name is duplicate on blur', () => {
      const tags = [createMockTag({ name: 'First Tag' }), createMockTag({ name: 'Second Tag' })];
      const onChange = vi.fn();
      renderNoteTagsEditor({ tags, onChange });

      const secondNameInput = screen.getByDisplayValue('Second Tag');
      fireEvent.change(secondNameInput, { target: { value: 'First Tag' } });
      fireEvent.blur(secondNameInput);

      expect(screen.getByRole('alert')).toHaveTextContent(/name must be unique/i);
    });

    it('clears error when name is changed after error', () => {
      const tag = createMockTag({ name: '' });
      const onChange = vi.fn();
      renderNoteTagsEditor({ tags: [tag], onChange });

      const nameInput = screen.getByPlaceholderText(/enter tag name/i);
      fireEvent.blur(nameInput); // Trigger required error
      expect(screen.getByRole('alert')).toBeInTheDocument();

      fireEvent.change(nameInput, { target: { value: 'New Name' } });
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('disables name input for built-in "To do" tag', () => {
      renderNoteTagsEditor({ tags: [TODO_TAG] });

      const nameInput = screen.getByDisplayValue('To do');
      expect(nameInput).toBeDisabled();
    });
  });

  describe('Icon Selection', () => {
    it('displays current icon in select trigger', () => {
      const tag = createMockTag({ icon: 'star', name: 'Star Tag' });
      renderNoteTagsEditor({ tags: [tag] });

      const row = getTagRow('Star Tag');
      const iconTrigger = getIconSelectTrigger(row);
      expect(iconTrigger).toBeInTheDocument();
    });

    it('calls onChange when icon is changed', () => {
      const tag = createMockTag({ icon: 'flag', name: 'Test' });
      const onChange = vi.fn();
      renderNoteTagsEditor({ tags: [tag], onChange });

      const row = getTagRow('Test');
      const iconTrigger = getIconSelectTrigger(row);
      fireEvent.click(iconTrigger);

      // Select a different icon
      const starOption = screen.getByText('Star');
      fireEvent.click(starOption);

      expect(onChange).toHaveBeenCalledWith([
        expect.objectContaining({ id: tag.id, icon: 'star' }),
      ]);
    });
  });

  describe('Creator Can Resolve Checkbox', () => {
    it('renders unchecked by default', () => {
      const tag = createMockTag({ creatorCanResolve: false, name: 'Test' });
      renderNoteTagsEditor({ tags: [tag] });

      const row = getTagRow('Test');
      const checkbox = getCreatorResolveCheckbox(row);
      expect(checkbox).not.toBeChecked();
    });

    it('renders checked when creatorCanResolve is true', () => {
      const tag = createMockTag({ creatorCanResolve: true, name: 'Test' });
      renderNoteTagsEditor({ tags: [tag] });

      const row = getTagRow('Test');
      const checkbox = getCreatorResolveCheckbox(row);
      expect(checkbox).toBeChecked();
    });

    it('calls onChange when checkbox is toggled', () => {
      const tag = createMockTag({ creatorCanResolve: false, name: 'Test' });
      const onChange = vi.fn();
      renderNoteTagsEditor({ tags: [tag], onChange });

      const row = getTagRow('Test');
      const checkbox = getCreatorResolveCheckbox(row);
      fireEvent.click(checkbox);

      expect(onChange).toHaveBeenCalledWith([
        expect.objectContaining({ id: tag.id, creatorCanResolve: true }),
      ]);
    });
  });

  describe('Template Editor', () => {
    it('renders template edit button', () => {
      const tag = createMockTag({ name: 'Test' });
      renderNoteTagsEditor({ tags: [tag] });

      const row = getTagRow('Test');
      const templateButton = getTemplateButton(row);
      expect(templateButton).toBeInTheDocument();
    });

    it('opens template popover when button is clicked', () => {
      const tag = createMockTag({ name: 'Test', template: '' });
      renderNoteTagsEditor({ tags: [tag] });

      const row = getTagRow('Test');
      const templateButton = getTemplateButton(row);
      fireEvent.click(templateButton);

      expect(screen.getByText('Note Template')).toBeInTheDocument();
      // Template textarea has a specific placeholder
      expect(screen.getByPlaceholderText('Enter template text...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument();
    });

    it('shows existing template in popover', () => {
      const tag = createMockTag({ name: 'Test', template: 'Existing template text' });
      renderNoteTagsEditor({ tags: [tag] });

      const row = getTagRow('Test');
      const templateButton = getTemplateButton(row);
      fireEvent.click(templateButton);

      // Use the textarea placeholder to find the right element
      const textarea = screen.getByPlaceholderText('Enter template text...');
      expect(textarea).toHaveValue('Existing template text');
    });

    it('calls onChange when template is saved', () => {
      const tag = createMockTag({ name: 'Test', template: '' });
      const onChange = vi.fn();
      renderNoteTagsEditor({ tags: [tag], onChange });

      const row = getTagRow('Test');
      const templateButton = getTemplateButton(row);
      fireEvent.click(templateButton);

      // Use the textarea placeholder to find the right element
      const textarea = screen.getByPlaceholderText('Enter template text...');
      fireEvent.change(textarea, { target: { value: 'New template' } });

      const doneButton = screen.getByRole('button', { name: /done/i });
      fireEvent.click(doneButton);

      expect(onChange).toHaveBeenCalledWith([
        expect.objectContaining({ id: tag.id, template: 'New template' }),
      ]);
    });

    it('shows indicator when tag has template', () => {
      const tagWithTemplate = createMockTag({ name: 'With Template', template: 'Some content' });
      const tagWithoutTemplate = createMockTag({ name: 'Without Template', template: '' });
      renderNoteTagsEditor({ tags: [tagWithTemplate, tagWithoutTemplate] });

      const rowWithTemplate = getTagRow('With Template');
      const rowWithoutTemplate = getTagRow('Without Template');

      // Button with template has different variant (default vs outline)
      const buttonWithTemplate = getTemplateButton(rowWithTemplate);
      const buttonWithoutTemplate = getTemplateButton(rowWithoutTemplate);

      // The button with template should have additional indicator
      expect(within(buttonWithTemplate).queryByText('...')).toBeInTheDocument();
      expect(within(buttonWithoutTemplate).queryByText('...')).not.toBeInTheDocument();
    });
  });

  describe('Delete Tag', () => {
    it('calls onChange with tag removed when delete is clicked', () => {
      const tag = createMockTag({ name: 'To Delete' });
      const onChange = vi.fn();
      renderNoteTagsEditor({ tags: [tag], onChange });

      const row = getTagRow('To Delete');
      const deleteButton = getDeleteButton(row);
      fireEvent.click(deleteButton);

      expect(onChange).toHaveBeenCalledWith([]);
    });

    it('preserves other tags when one is deleted', () => {
      const tags = [createMockTag({ name: 'Keep Me' }), createMockTag({ name: 'Delete Me' })];
      const onChange = vi.fn();
      renderNoteTagsEditor({ tags, onChange });

      const row = getTagRow('Delete Me');
      const deleteButton = getDeleteButton(row);
      fireEvent.click(deleteButton);

      expect(onChange).toHaveBeenCalledWith([expect.objectContaining({ name: 'Keep Me' })]);
    });

    it('disables delete button for built-in "To do" tag', () => {
      renderNoteTagsEditor({ tags: [TODO_TAG] });

      const row = getTagRow('To do');
      const deleteButton = getDeleteButton(row);
      expect(deleteButton).toBeDisabled();
    });

    it('shows tooltip for disabled delete button on built-in tag', () => {
      renderNoteTagsEditor({ tags: [TODO_TAG] });

      const row = getTagRow('To do');
      const deleteButton = getDeleteButton(row);
      expect(deleteButton).toHaveAttribute('title', 'Built-in tag cannot be deleted');
    });
  });

  describe('Disabled State', () => {
    it('disables all name inputs when disabled prop is true', () => {
      const tag = createMockTag({ name: 'Test' });
      renderNoteTagsEditor({ tags: [tag], disabled: true });

      const nameInput = screen.getByDisplayValue('Test');
      expect(nameInput).toBeDisabled();
    });

    it('disables all checkboxes when disabled prop is true', () => {
      const tag = createMockTag({ name: 'Test' });
      renderNoteTagsEditor({ tags: [tag], disabled: true });

      const row = getTagRow('Test');
      const checkbox = getCreatorResolveCheckbox(row);
      expect(checkbox).toBeDisabled();
    });

    it('disables all delete buttons when disabled prop is true', () => {
      const tag = createMockTag({ name: 'Test' });
      renderNoteTagsEditor({ tags: [tag], disabled: true });

      const row = getTagRow('Test');
      const deleteButton = getDeleteButton(row);
      expect(deleteButton).toBeDisabled();
    });

    it('disables all template buttons when disabled prop is true', () => {
      const tag = createMockTag({ name: 'Test' });
      renderNoteTagsEditor({ tags: [tag], disabled: true });

      const row = getTagRow('Test');
      const templateButton = getTemplateButton(row);
      expect(templateButton).toBeDisabled();
    });
  });

  describe('Localization', () => {
    it('uses localized column headers when provided', () => {
      renderNoteTagsEditor({
        localizedStrings: {
          '%note_tags_icon%': 'Icono',
          '%note_tags_name%': 'Nombre',
          '%note_tags_creator_resolve%': 'El creador puede resolver',
          '%note_tags_template%': 'Plantilla',
        },
      });

      expect(screen.getByText('Icono')).toBeInTheDocument();
      expect(screen.getByText('Nombre')).toBeInTheDocument();
      expect(screen.getByText('El creador puede resolver')).toBeInTheDocument();
      expect(screen.getByText('Plantilla')).toBeInTheDocument();
    });

    it('uses localized button text when provided', () => {
      renderNoteTagsEditor({
        localizedStrings: {
          '%note_tags_add%': 'Agregar etiqueta',
        },
      });

      expect(screen.getByRole('button', { name: /agregar etiqueta/i })).toBeInTheDocument();
    });

    it('uses localized error messages when provided', () => {
      const tag = createMockTag({ name: '' });
      renderNoteTagsEditor({
        tags: [tag],
        localizedStrings: {
          '%note_tags_error_required%': 'Se requiere nombre',
        },
      });

      const nameInput = screen.getByPlaceholderText(/enter tag name/i);
      fireEvent.blur(nameInput);

      expect(screen.getByRole('alert')).toHaveTextContent('Se requiere nombre');
    });

    it('exports NOTE_TAGS_EDITOR_STRING_KEYS for localization', () => {
      expect(NOTE_TAGS_EDITOR_STRING_KEYS).toContain('%note_tags_icon%');
      expect(NOTE_TAGS_EDITOR_STRING_KEYS).toContain('%note_tags_name%');
      expect(NOTE_TAGS_EDITOR_STRING_KEYS).toContain('%note_tags_add%');
      expect(NOTE_TAGS_EDITOR_STRING_KEYS).toContain('%note_tags_error_duplicate%');
    });
  });

  describe('Icon Constants', () => {
    it('exports NOTE_TAG_ICONS with expected values', () => {
      expect(NOTE_TAG_ICONS).toContain('flag');
      expect(NOTE_TAG_ICONS).toContain('comment');
      expect(NOTE_TAG_ICONS).toContain('question');
      expect(NOTE_TAG_ICONS).toContain('star');
      expect(NOTE_TAG_ICONS).toContain('check');
      expect(NOTE_TAG_ICONS).toContain('info');
      expect(NOTE_TAG_ICONS).toContain('warning');
      expect(NOTE_TAG_ICONS).toContain('exclamation');
      expect(NOTE_TAG_ICONS).toHaveLength(8);
    });
  });
});
