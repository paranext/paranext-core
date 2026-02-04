import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Input, Label, Textarea } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo } from 'react';
import type { ProjectPropertiesFormState, StudyBibleCategory } from 'platform-projects';

// #region Constants

/** Default Study Bible categories */
const DEFAULT_CATEGORIES: StudyBibleCategory[] = [
  { name: 'Introduction', description: 'Book and section introductions' },
  { name: 'Notes', description: 'Study notes and annotations' },
  { name: 'Cross-references', description: 'Scripture cross-references' },
];

// #endregion

// #region Localized Strings

const STUDY_BIBLE_TAB_LOCALIZED_KEYS: LocalizeKey[] = [
  '%webView_projectProperties_studyBibleTab_header%',
  '%webView_projectProperties_studyBibleTab_categoryName_label%',
  '%webView_projectProperties_studyBibleTab_categoryDescription_label%',
  '%webView_projectProperties_studyBibleTab_addCategory%',
  '%webView_projectProperties_studyBibleTab_removeCategory%',
  '%webView_projectProperties_studyBibleTab_placeholder_name%',
  '%webView_projectProperties_studyBibleTab_placeholder_description%',
  '%webView_projectProperties_studyBibleTab_validation_nameRequired%',
  '%webView_projectProperties_studyBibleTab_validation_nameUnique%',
];

// #endregion

// #region Types

interface StudyBibleTabProps {
  formState: ProjectPropertiesFormState;
  onFieldChange: (field: keyof ProjectPropertiesFormState, value: unknown) => void;
  validationErrors: Record<string, string>;
  isDisabled: boolean;
}

// #endregion

export function StudyBibleTab({
  formState,
  onFieldChange,
  validationErrors,
  isDisabled,
}: StudyBibleTabProps) {
  const [localizedStrings] = useLocalizedStrings(STUDY_BIBLE_TAB_LOCALIZED_KEYS);

  // Initialize with default categories if empty
  const categories = useMemo(() => {
    if (formState.studyBibleCategories.length === 0) {
      return DEFAULT_CATEGORIES;
    }
    return formState.studyBibleCategories;
  }, [formState.studyBibleCategories]);

  // Handle category field change
  const handleCategoryChange = useCallback(
    (index: number, field: keyof StudyBibleCategory, value: string) => {
      const updatedCategories = [...categories];
      updatedCategories[index] = { ...updatedCategories[index], [field]: value };
      onFieldChange('studyBibleCategories', updatedCategories);
    },
    [categories, onFieldChange],
  );

  // Handle add category
  const handleAddCategory = useCallback(() => {
    const newCategory: StudyBibleCategory = {
      name: '',
      description: '',
    };
    onFieldChange('studyBibleCategories', [...categories, newCategory]);
  }, [categories, onFieldChange]);

  // Handle remove category
  const handleRemoveCategory = useCallback(
    (index: number) => {
      const updatedCategories = categories.filter((_, i) => i !== index);
      onFieldChange('studyBibleCategories', updatedCategories);
    },
    [categories, onFieldChange],
  );

  // Check for duplicate names
  const getDuplicateNames = useCallback(() => {
    const names = categories.map((cat) => cat.name.trim().toLowerCase());
    const duplicates = new Set<string>();
    names.forEach((name, index) => {
      if (name && names.indexOf(name) !== index) {
        duplicates.add(name);
      }
    });
    return duplicates;
  }, [categories]);

  const duplicateNames = getDuplicateNames();

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Header */}
      <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-border-border tw-pb-2">
        <Label className="tw-text-base tw-font-semibold">
          {localizedStrings['%webView_projectProperties_studyBibleTab_header%']}
        </Label>
        <Button variant="outline" size="sm" onClick={handleAddCategory} disabled={isDisabled}>
          {localizedStrings['%webView_projectProperties_studyBibleTab_addCategory%']}
        </Button>
      </div>

      {/* Validation Error */}
      {validationErrors.studyBibleCategories && (
        <div className="tw-rounded-md tw-border tw-border-destructive tw-bg-destructive/10 tw-p-2 tw-text-sm tw-text-destructive">
          {validationErrors.studyBibleCategories}
        </div>
      )}

      {/* Categories List */}
      <div className="tw-flex tw-flex-col tw-gap-4">
        {/* Study Bible categories don't have unique IDs, using index is acceptable for this editable list */}
        {categories.map((category, index) => {
          const hasEmptyName = !category.name.trim();
          const hasDuplicateName = duplicateNames.has(category.name.trim().toLowerCase());
          const hasError = hasEmptyName || hasDuplicateName;

          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`tw-rounded-lg tw-border tw-border-border tw-p-4 ${hasError ? 'tw-border-destructive tw-bg-destructive/5' : ''}`}
            >
              <div className="tw-flex tw-items-start tw-justify-between tw-gap-4">
                <div className="tw-flex tw-flex-1 tw-flex-col tw-gap-3">
                  {/* Category Name */}
                  <div className="tw-flex tw-flex-col tw-gap-1">
                    <Label htmlFor={`category-name-${index}`} className="tw-text-sm tw-font-medium">
                      {
                        localizedStrings[
                          '%webView_projectProperties_studyBibleTab_categoryName_label%'
                        ]
                      }
                    </Label>
                    <Input
                      id={`category-name-${index}`}
                      value={category.name}
                      onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
                      placeholder={
                        localizedStrings[
                          '%webView_projectProperties_studyBibleTab_placeholder_name%'
                        ]
                      }
                      disabled={isDisabled}
                      className={hasError ? 'tw-border-destructive' : ''}
                      aria-invalid={hasError}
                    />
                    {hasEmptyName && (
                      <span className="tw-text-xs tw-text-destructive">
                        {
                          localizedStrings[
                            '%webView_projectProperties_studyBibleTab_validation_nameRequired%'
                          ]
                        }
                      </span>
                    )}
                    {hasDuplicateName && !hasEmptyName && (
                      <span className="tw-text-xs tw-text-destructive">
                        {
                          localizedStrings[
                            '%webView_projectProperties_studyBibleTab_validation_nameUnique%'
                          ]
                        }
                      </span>
                    )}
                  </div>

                  {/* Category Description */}
                  <div className="tw-flex tw-flex-col tw-gap-1">
                    <Label
                      htmlFor={`category-description-${index}`}
                      className="tw-text-sm tw-font-medium"
                    >
                      {
                        localizedStrings[
                          '%webView_projectProperties_studyBibleTab_categoryDescription_label%'
                        ]
                      }
                    </Label>
                    <Textarea
                      id={`category-description-${index}`}
                      value={category.description}
                      onChange={(e) => handleCategoryChange(index, 'description', e.target.value)}
                      placeholder={
                        localizedStrings[
                          '%webView_projectProperties_studyBibleTab_placeholder_description%'
                        ]
                      }
                      disabled={isDisabled}
                      rows={2}
                    />
                  </div>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveCategory(index)}
                  disabled={isDisabled || categories.length <= 1}
                  className="tw-text-destructive hover:tw-text-destructive"
                >
                  {localizedStrings['%webView_projectProperties_studyBibleTab_removeCategory%']}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info text */}
      <div className="tw-mt-4 tw-text-sm tw-text-muted-foreground">
        <p>
          Study Bible categories organize the additional content in your Study Bible project. Each
          category groups related annotations such as introductions, study notes, and
          cross-references.
        </p>
      </div>
    </div>
  );
}

export default StudyBibleTab;
