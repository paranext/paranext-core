import { useCallback, useMemo, useState } from 'react';
import {
  Button,
  Checkbox,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
} from 'platform-bible-react';
import { Trash2, Plus } from 'lucide-react';

// =====================================================
// INTERFACES
// =====================================================

/**
 * Represents a single study Bible category. Categories are used to organize study Bible content
 * into sidebars and footnotes.
 */
export interface StudyBibleCategory {
  /** Unique identifier for the category (generated when category is created) */
  id: string;
  /** Display name for the category (must be unique) */
  name: string;
  /** Whether this category's content should appear in sidebars */
  showInSidebars: boolean;
  /** Whether this category's content should appear in footnotes */
  showInFootnotes: boolean;
}

/**
 * Localized strings for the StudyBibleCategoriesEditor component. Pass these via
 * useLocalizedStrings hook from the extension.
 */
export interface StudyBibleCategoriesEditorLocalizedStrings {
  /** Column header: Name */
  '%study_bible_name%'?: string;
  /** Column header: Show in Sidebars */
  '%study_bible_show_sidebars%'?: string;
  /** Column header: Show in Footnotes */
  '%study_bible_show_footnotes%'?: string;
  /** Column header: Delete */
  '%study_bible_delete%'?: string;
  /** Add category button text */
  '%study_bible_add%'?: string;
  /** Error: Duplicate name */
  '%study_bible_error_duplicate%'?: string;
  /** Error: Name required */
  '%study_bible_error_required%'?: string;
  /** Placeholder for new category name */
  '%study_bible_new_name_placeholder%'?: string;
  /** Delete button label */
  '%study_bible_delete_label%'?: string;
}

/** Keys for localizing study Bible categories editor components. */
export const STUDY_BIBLE_CATEGORIES_EDITOR_STRING_KEYS = Object.freeze([
  '%study_bible_name%',
  '%study_bible_show_sidebars%',
  '%study_bible_show_footnotes%',
  '%study_bible_delete%',
  '%study_bible_add%',
  '%study_bible_error_duplicate%',
  '%study_bible_error_required%',
  '%study_bible_new_name_placeholder%',
  '%study_bible_delete_label%',
] as const);

/**
 * Props for the StudyBibleCategoriesEditor component. Based on strategic-plan-ui.md UI-PKG-008
 * acceptance criteria.
 */
export interface StudyBibleCategoriesEditorProps {
  /** Array of currently configured study Bible categories */
  categories: StudyBibleCategory[];
  /** Callback when categories change (add, edit, or delete) */
  onChange: (categories: StudyBibleCategory[]) => void;
  /** Whether the control is disabled (e.g., during loading or for read-only view) */
  disabled?: boolean;
  /** Optional localized strings for the component */
  localizedStrings?: StudyBibleCategoriesEditorLocalizedStrings;
  /** Optional CSS class name for styling */
  className?: string;
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Generates a unique ID for a new category.
 *
 * @returns A unique string ID
 */
function generateCategoryId(): string {
  return `category-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Creates a new category with default values.
 *
 * @returns A new StudyBibleCategory with defaults
 */
function createDefaultCategory(): StudyBibleCategory {
  return {
    id: generateCategoryId(),
    name: '',
    showInSidebars: true,
    showInFootnotes: false,
  };
}

/**
 * Checks if a category name is a duplicate (excluding the current category).
 *
 * @param name - The name to check
 * @param categories - All current categories
 * @param currentCategoryId - The ID of the current category (to exclude from check)
 * @returns True if the name is a duplicate
 */
function isDuplicateName(
  name: string,
  categories: StudyBibleCategory[],
  currentCategoryId: string,
): boolean {
  const normalizedName = name.trim().toLowerCase();
  return categories.some(
    (category) =>
      category.id !== currentCategoryId && category.name.trim().toLowerCase() === normalizedName,
  );
}

// =====================================================
// CATEGORY ROW COMPONENT
// =====================================================

interface CategoryRowProps {
  category: StudyBibleCategory;
  categories: StudyBibleCategory[];
  onUpdate: (updatedCategory: StudyBibleCategory) => void;
  onDelete: (categoryId: string) => void;
  disabled?: boolean;
  localizedStrings?: StudyBibleCategoriesEditorLocalizedStrings;
}

function CategoryRow({
  category,
  categories,
  onUpdate,
  onDelete,
  disabled,
  localizedStrings,
}: CategoryRowProps) {
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  // Track the current editing value for validation - this ensures we validate the
  // actual input value even if the parent hasn't re-rendered yet
  const [currentName, setCurrentName] = useState(category.name);

  const handleNameChange = (newName: string) => {
    // Clear error on change
    setNameError(undefined);
    // Track the current value locally for validation
    setCurrentName(newName);
    onUpdate({ ...category, name: newName });
  };

  const handleNameBlur = () => {
    // Validate on blur using the current editing value
    const trimmedName = currentName.trim();

    if (trimmedName.length === 0) {
      setNameError(localizedStrings?.['%study_bible_error_required%'] ?? 'Name is required');
      return;
    }

    if (isDuplicateName(trimmedName, categories, category.id)) {
      setNameError(localizedStrings?.['%study_bible_error_duplicate%'] ?? 'Name must be unique');
    }
  };

  const handleShowInSidebarsChange = (checked: boolean) => {
    onUpdate({ ...category, showInSidebars: checked });
  };

  const handleShowInFootnotesChange = (checked: boolean) => {
    onUpdate({ ...category, showInFootnotes: checked });
  };

  const handleDelete = () => {
    onDelete(category.id);
  };

  const deleteLabel = localizedStrings?.['%study_bible_delete_label%'] ?? 'Delete';

  return (
    <TableRow>
      {/* Name column */}
      <TableCell className="tw-py-2">
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Input
            value={currentName}
            onChange={(e) => handleNameChange(e.target.value)}
            onBlur={handleNameBlur}
            disabled={disabled}
            className={cn('tw-h-8', nameError && 'tw-border-destructive')}
            placeholder={
              localizedStrings?.['%study_bible_new_name_placeholder%'] ?? 'Enter category name...'
            }
            aria-label="Category name"
            aria-invalid={!!nameError}
          />
          {nameError && (
            <span className="tw-text-xs tw-text-destructive" role="alert">
              {nameError}
            </span>
          )}
        </div>
      </TableCell>

      {/* Show in Sidebars column */}
      <TableCell className="tw-w-32 tw-py-2 tw-text-center">
        <Checkbox
          checked={category.showInSidebars}
          onCheckedChange={handleShowInSidebarsChange}
          disabled={disabled}
          aria-label="Show in sidebars"
        />
      </TableCell>

      {/* Show in Footnotes column */}
      <TableCell className="tw-w-32 tw-py-2 tw-text-center">
        <Checkbox
          checked={category.showInFootnotes}
          onCheckedChange={handleShowInFootnotesChange}
          disabled={disabled}
          aria-label="Show in footnotes"
        />
      </TableCell>

      {/* Delete column */}
      <TableCell className="tw-w-20 tw-py-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={disabled}
          className="tw-text-destructive hover:tw-text-destructive hover:tw-bg-destructive/10"
          aria-label={deleteLabel}
        >
          <Trash2 className="tw-h-4 tw-w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================

/**
 * StudyBibleCategoriesEditor component for managing study Bible categories. Provides an editable
 * grid with columns for name, show in sidebars, show in footnotes, and delete.
 *
 * @remarks
 * This component is embedded in the Study Bible tab of the ProjectPropertiesForm. It provides:
 *
 * - Editable grid for category configuration
 * - Editable name with uniqueness validation
 * - Checkbox for "Show in Sidebars" option
 * - Checkbox for "Show in Footnotes" option
 * - Add category button
 * - Delete button for each row (all categories can be deleted)
 *
 * The Study Bible tab is only visible for StudyBibleAdditions projects in edit mode.
 * @example
 *
 * ```tsx
 * const [categories, setCategories] = useState<StudyBibleCategory[]>([
 *   { id: '1', name: 'Introduction', showInSidebars: true, showInFootnotes: false },
 * ]);
 *
 * <StudyBibleCategoriesEditor
 *   categories={categories}
 *   onChange={setCategories}
 *   disabled={false}
 * />;
 * ```
 */
export function StudyBibleCategoriesEditor({
  categories,
  onChange,
  disabled = false,
  localizedStrings,
  className,
}: StudyBibleCategoriesEditorProps) {
  // Localized column headers
  const nameHeader = localizedStrings?.['%study_bible_name%'] ?? 'Name';
  const showSidebarsHeader =
    localizedStrings?.['%study_bible_show_sidebars%'] ?? 'Show in Sidebars';
  const showFootnotesHeader =
    localizedStrings?.['%study_bible_show_footnotes%'] ?? 'Show in Footnotes';
  const deleteHeader = localizedStrings?.['%study_bible_delete%'] ?? '';
  const addCategoryText = localizedStrings?.['%study_bible_add%'] ?? 'Add category';

  // Handle adding a new category
  const handleAddCategory = useCallback(() => {
    const newCategory = createDefaultCategory();
    onChange([...categories, newCategory]);
  }, [categories, onChange]);

  // Handle updating a category
  const handleUpdateCategory = useCallback(
    (updatedCategory: StudyBibleCategory) => {
      const newCategories = categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category,
      );
      onChange(newCategories);
    },
    [categories, onChange],
  );

  // Handle deleting a category
  const handleDeleteCategory = useCallback(
    (categoryId: string) => {
      const newCategories = categories.filter((category) => category.id !== categoryId);
      onChange(newCategories);
    },
    [categories, onChange],
  );

  // Memoize the category count for display
  const categoryCount = useMemo(() => categories.length, [categories]);

  return (
    <div className={cn('tw-flex tw-flex-col tw-gap-2', className)}>
      {/* Table */}
      <div className="tw-border tw-rounded-md tw-overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{nameHeader}</TableHead>
              <TableHead className="tw-w-32 tw-text-center">{showSidebarsHeader}</TableHead>
              <TableHead className="tw-w-32 tw-text-center">{showFootnotesHeader}</TableHead>
              <TableHead className="tw-w-20">{deleteHeader}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="tw-text-center tw-text-muted-foreground tw-py-8">
                  No categories configured. Click &quot;Add category&quot; to create one.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <CategoryRow
                  key={category.id}
                  category={category}
                  categories={categories}
                  onUpdate={handleUpdateCategory}
                  onDelete={handleDeleteCategory}
                  disabled={disabled}
                  localizedStrings={localizedStrings}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer with Add button and count */}
      <div className="tw-flex tw-items-center tw-justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddCategory}
          disabled={disabled}
          className="tw-gap-1"
        >
          <Plus className="tw-h-4 tw-w-4" />
          {addCategoryText}
        </Button>
        <span className="tw-text-sm tw-text-muted-foreground">
          {categoryCount} {categoryCount !== 1 ? 'categories' : 'category'}
        </span>
      </div>
    </div>
  );
}

export default StudyBibleCategoriesEditor;
