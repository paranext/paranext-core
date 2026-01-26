import { useCallback } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Label, Input, Checkbox } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { Plus, Trash2 } from 'lucide-react';
import { useProjectCreation, StudyBibleCategory } from '../../context/project-creation-context';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%projectCreation_studyBible_allowHiding%',
  '%projectCreation_studyBible_callersLeft%',
  '%projectCreation_studyBible_categories%',
  '%projectCreation_studyBible_name%',
  '%projectCreation_studyBible_showSidebars%',
  '%projectCreation_studyBible_showFootnotes%',
  '%projectCreation_studyBible_delete%',
  '%projectCreation_studyBible_addCategory%',
];

/** Category Row Component */
function CategoryRow({
  category,
  onUpdate,
  onDelete,
}: {
  category: StudyBibleCategory;
  onUpdate: (id: string, updates: Partial<StudyBibleCategory>) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="tw-border-b last:tw-border-b-0">
      {/* Name */}
      <td className="tw-p-2">
        <Input
          value={category.name}
          onChange={(e) => onUpdate(category.id, { name: e.target.value })}
          className="tw-w-full"
        />
      </td>

      {/* Show in Sidebars */}
      <td className="tw-p-2 tw-text-center">
        <Checkbox
          checked={category.showInSidebars}
          onCheckedChange={(checked) => onUpdate(category.id, { showInSidebars: !!checked })}
        />
      </td>

      {/* Show in Footnotes */}
      <td className="tw-p-2 tw-text-center">
        <Checkbox
          checked={category.showInFootnotes}
          onCheckedChange={(checked) => onUpdate(category.id, { showInFootnotes: !!checked })}
        />
      </td>

      {/* Delete */}
      <td className="tw-p-2 tw-text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(category.id)}
          className="tw-text-destructive hover:tw-text-destructive"
        >
          <Trash2 className="tw-h-4 tw-w-4" />
        </Button>
      </td>
    </tr>
  );
}

/**
 * Study Bible Tab Component (part of CAP-UI-001)
 *
 * Allows users to configure Study Bible Additions specific settings including:
 *
 * - Option to hide footnotes/cross-references from base project
 * - Caller placement option
 * - Study Bible categories configuration
 *
 * This tab is only visible for StudyBibleAdditions projects in edit mode.
 */
export function StudyBibleTab() {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const { state, dispatch } = useProjectCreation();

  // Handle allow hiding checkbox
  const handleAllowHidingChange = useCallback(
    (checked: boolean) => {
      dispatch({ type: 'SET_ALLOW_HIDING_FOOTNOTES', allow: checked });
    },
    [dispatch],
  );

  // Handle callers left checkbox
  const handleCallersLeftChange = useCallback(
    (checked: boolean) => {
      dispatch({ type: 'SET_PLACE_CALLER_LEFT', placeLeft: checked });
    },
    [dispatch],
  );

  // Handle category update
  const handleCategoryUpdate = useCallback(
    (id: string, updates: Partial<StudyBibleCategory>) => {
      dispatch({ type: 'UPDATE_CATEGORY', id, updates });
    },
    [dispatch],
  );

  // Handle category delete
  const handleCategoryDelete = useCallback(
    (id: string) => {
      dispatch({ type: 'DELETE_CATEGORY', id });
    },
    [dispatch],
  );

  // Handle add new category
  const handleAddCategory = useCallback(() => {
    const newCategory: StudyBibleCategory = {
      id: `cat-${Date.now()}`,
      name: 'New Category',
      showInSidebars: true,
      showInFootnotes: true,
    };
    dispatch({ type: 'ADD_CATEGORY', category: newCategory });
  }, [dispatch]);

  // Get base project name for display
  const baseProjectName = state.baseProject?.shortName || 'base project';

  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-p-4">
      {/* Allow Hiding Footnotes Option */}
      <div className="tw-flex tw-items-start tw-gap-3">
        <Checkbox
          id="allow-hiding"
          checked={state.allowHidingOfBaseFootnotes}
          onCheckedChange={handleAllowHidingChange}
        />
        <Label htmlFor="allow-hiding" className="tw-cursor-pointer tw-leading-relaxed">
          {localizedStrings['%projectCreation_studyBible_allowHiding%']?.replace(
            '{base}',
            baseProjectName,
          ) ||
            `Allow footnotes and cross references from ${baseProjectName} to be hidden in this Study Bible project.`}
        </Label>
      </div>

      {/* Callers Left Option */}
      <div className="tw-flex tw-items-center tw-gap-3">
        <Checkbox
          id="callers-left"
          checked={state.placeCallerToLeftOfSelection}
          onCheckedChange={handleCallersLeftChange}
        />
        <Label htmlFor="callers-left" className="tw-cursor-pointer">
          {localizedStrings['%projectCreation_studyBible_callersLeft%'] ||
            'Place callers to the left of selection'}
        </Label>
      </div>

      {/* Categories Section */}
      <div className="tw-flex tw-flex-col tw-gap-4">
        <Label className="tw-font-semibold">
          {localizedStrings['%projectCreation_studyBible_categories%'] || 'Categories:'}
        </Label>

        {/* Categories Table */}
        <div className="tw-overflow-hidden tw-rounded-md tw-border">
          <table className="tw-w-full">
            <thead className="tw-bg-muted">
              <tr>
                <th className="tw-p-2 tw-text-left tw-text-sm tw-font-medium">
                  {localizedStrings['%projectCreation_studyBible_name%'] || 'Name'}
                </th>
                <th className="tw-w-32 tw-p-2 tw-text-center tw-text-sm tw-font-medium">
                  {localizedStrings['%projectCreation_studyBible_showSidebars%'] ||
                    'Show in Sidebars'}
                </th>
                <th className="tw-w-32 tw-p-2 tw-text-center tw-text-sm tw-font-medium">
                  {localizedStrings['%projectCreation_studyBible_showFootnotes%'] ||
                    'Show in Footnotes'}
                </th>
                <th className="tw-w-16 tw-p-2 tw-text-center tw-text-sm tw-font-medium">
                  {localizedStrings['%projectCreation_studyBible_delete%'] || 'Delete'}
                </th>
              </tr>
            </thead>
            <tbody>
              {state.categories.length > 0 ? (
                state.categories.map((category) => (
                  <CategoryRow
                    key={category.id}
                    category={category}
                    onUpdate={handleCategoryUpdate}
                    onDelete={handleCategoryDelete}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="tw-p-4 tw-text-center tw-text-sm tw-text-muted-foreground"
                  >
                    No categories defined. Click "Add category" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add Category Button */}
        <Button variant="outline" onClick={handleAddCategory} className="tw-w-fit">
          <Plus className="tw-mr-2 tw-h-4 tw-w-4" />
          {localizedStrings['%projectCreation_studyBible_addCategory%'] || 'Add category'}
        </Button>
      </div>
    </div>
  );
}

export default StudyBibleTab;
