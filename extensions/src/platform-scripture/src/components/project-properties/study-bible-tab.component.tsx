/**
 * StudyBibleTab - Study Bible categories and options tab Only visible for StudyBibleAdditions
 * project type
 */

import { useCallback } from 'react';
import { Button, Checkbox, Input, Label, cn } from 'platform-bible-react';
import { Plus, Trash2 } from 'lucide-react';
import type { StudyBibleCategory } from '../../types/project-properties.types';

// =============================================================================
// PROPS
// =============================================================================

export interface StudyBibleTabProps {
  /** Study Bible categories */
  categories: StudyBibleCategory[];

  /** Allow hiding base footnotes */
  allowHidingBaseNotes: boolean;

  /** Place callers on left of selection */
  placeCallersOnLeft: boolean;

  /** Callback to add a category */
  onAddCategory: (category: StudyBibleCategory) => void;

  /** Callback to update a category */
  onUpdateCategory: (index: number, category: StudyBibleCategory) => void;

  /** Callback to remove a category */
  onRemoveCategory: (index: number) => void;

  /** Callback when allow hiding changes */
  onAllowHidingChange: (value: boolean) => void;

  /** Callback when place callers changes */
  onPlaceCallersChange: (value: boolean) => void;

  /** Optional className */
  className?: string;
}

// =============================================================================
// DEFAULT CATEGORY
// =============================================================================

const DEFAULT_NEW_CATEGORY: StudyBibleCategory = {
  name: 'New Category',
  showInSidebars: true,
  showInFootnotes: true,
};

// =============================================================================
// CATEGORY ROW COMPONENT
// =============================================================================

interface CategoryRowProps {
  category: StudyBibleCategory;
  index: number;
  onUpdate: (index: number, category: StudyBibleCategory) => void;
  onRemove: (index: number) => void;
}

function CategoryRow({ category, index, onUpdate, onRemove }: CategoryRowProps) {
  const handleNameChange = useCallback(
    (name: string) => {
      onUpdate(index, { ...category, name });
    },
    [category, index, onUpdate],
  );

  const handleShowInSidebarsChange = useCallback(
    (checked: boolean) => {
      onUpdate(index, { ...category, showInSidebars: checked });
    },
    [category, index, onUpdate],
  );

  const handleShowInFootnotesChange = useCallback(
    (checked: boolean) => {
      onUpdate(index, { ...category, showInFootnotes: checked });
    },
    [category, index, onUpdate],
  );

  return (
    <div className="tw-grid tw-grid-cols-[1fr_auto_auto_auto] tw-gap-4 tw-items-center tw-p-2 tw-border tw-border-border tw-rounded">
      {/* Name */}
      <Input
        value={category.name}
        onChange={(e) => handleNameChange(e.target.value)}
        placeholder="Category name"
        className="tw-h-8"
      />

      {/* Show in Sidebars */}
      <div className="tw-flex tw-items-center tw-gap-1">
        <Checkbox
          id={`sidebar-${index}`}
          checked={category.showInSidebars}
          onCheckedChange={(checked) => handleShowInSidebarsChange(checked === true)}
        />
        <Label htmlFor={`sidebar-${index}`} className="tw-text-xs tw-cursor-pointer">
          Sidebars
        </Label>
      </div>

      {/* Show in Footnotes */}
      <div className="tw-flex tw-items-center tw-gap-1">
        <Checkbox
          id={`footnotes-${index}`}
          checked={category.showInFootnotes}
          onCheckedChange={(checked) => handleShowInFootnotesChange(checked === true)}
        />
        <Label htmlFor={`footnotes-${index}`} className="tw-text-xs tw-cursor-pointer">
          Footnotes
        </Label>
      </div>

      {/* Delete */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(index)}
        className="tw-h-8 tw-w-8 tw-p-0 tw-text-destructive hover:tw-text-destructive"
        aria-label={`Remove category ${category.name}`}
      >
        <Trash2 className="tw-h-4 tw-w-4" />
      </Button>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * StudyBibleTab - Seventh tab in Project Properties dialog (SBA only)
 *
 * Configures Study Bible categories and footnote display options.
 */
export function StudyBibleTab({
  categories,
  allowHidingBaseNotes,
  placeCallersOnLeft,
  onAddCategory,
  onUpdateCategory,
  onRemoveCategory,
  onAllowHidingChange,
  onPlaceCallersChange,
  className,
}: StudyBibleTabProps) {
  const handleAddNewCategory = useCallback(() => {
    onAddCategory({ ...DEFAULT_NEW_CATEGORY, name: `Category ${categories.length + 1}` });
  }, [categories.length, onAddCategory]);

  return (
    <div className={cn('pr-twp tw-flex tw-flex-col tw-gap-4', className)}>
      {/* Categories Section */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <div className="tw-flex tw-items-center tw-justify-between">
          <Label className="tw-font-medium">Categories</Label>
          <Button variant="outline" size="sm" onClick={handleAddNewCategory} className="tw-gap-1">
            <Plus className="tw-h-3 tw-w-3" />
            Add Category
          </Button>
        </div>

        <p className="tw-text-sm tw-text-muted-foreground">
          Define categories for organizing study Bible content. Categories can be shown in sidebars,
          footnotes, or both.
        </p>

        {/* Column Headers */}
        {categories.length > 0 && (
          <div className="tw-grid tw-grid-cols-[1fr_auto_auto_auto] tw-gap-4 tw-px-2 tw-text-xs tw-text-muted-foreground tw-font-medium">
            <span>Name</span>
            <span>Show in</span>
            <span />
            <span className="tw-w-8" />
          </div>
        )}

        {/* Category List */}
        <div className="tw-flex tw-flex-col tw-gap-2">
          {categories.length === 0 ? (
            <div className="tw-text-sm tw-text-muted-foreground tw-text-center tw-py-4 tw-border tw-border-dashed tw-border-border tw-rounded">
              No categories defined. Click &quot;Add Category&quot; to create one.
            </div>
          ) : (
            categories.map((category, index) => {
              // Using name + options as key since categories don't have unique IDs
              const categoryKey = `cat-${category.name}-${category.showInSidebars}-${category.showInFootnotes}`;
              return (
                <CategoryRow
                  key={categoryKey}
                  category={category}
                  index={index}
                  onUpdate={onUpdateCategory}
                  onRemove={onRemoveCategory}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Footnote Options */}
      <div className="tw-flex tw-flex-col tw-gap-2 tw-border-t tw-border-border tw-pt-4">
        <Label className="tw-font-medium">Footnote Options</Label>

        <div className="tw-flex tw-items-center tw-gap-2">
          <Checkbox
            id="allow-hiding-check"
            checked={allowHidingBaseNotes}
            onCheckedChange={(checked) => onAllowHidingChange(checked === true)}
          />
          <Label htmlFor="allow-hiding-check" className="tw-font-normal tw-cursor-pointer">
            Allow hiding base footnotes
          </Label>
        </div>
        <p className="tw-text-sm tw-text-muted-foreground tw-pl-6">
          When enabled, users can hide footnotes from the base text in the study Bible output.
        </p>

        <div className="tw-flex tw-items-center tw-gap-2">
          <Checkbox
            id="callers-left-check"
            checked={placeCallersOnLeft}
            onCheckedChange={(checked) => onPlaceCallersChange(checked === true)}
          />
          <Label htmlFor="callers-left-check" className="tw-font-normal tw-cursor-pointer">
            Place callers to the left of selection
          </Label>
        </div>
        <p className="tw-text-sm tw-text-muted-foreground tw-pl-6">
          Controls the placement of footnote callers relative to selected text.
        </p>
      </div>
    </div>
  );
}

export default StudyBibleTab;
