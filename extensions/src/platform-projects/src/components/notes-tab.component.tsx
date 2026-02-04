import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo } from 'react';
import type { ProjectPropertiesFormState, NoteTagConfig } from 'platform-projects';

// #region Constants

/** Default note tag icons available */
const NOTE_TAG_ICONS = [
  { value: 'flag', label: 'Flag' },
  { value: 'star', label: 'Star' },
  { value: 'check', label: 'Check' },
  { value: 'question', label: 'Question' },
  { value: 'exclamation', label: 'Exclamation' },
  { value: 'bookmark', label: 'Bookmark' },
  { value: 'comment', label: 'Comment' },
  { value: 'edit', label: 'Edit' },
];

/** Default note tag statuses */
const NOTE_TAG_STATUSES = [
  { value: 'open', label: 'Open' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

/** Default note tags for new projects */
const DEFAULT_NOTE_TAGS: NoteTagConfig[] = [
  { name: 'To Do', icon: 'flag', defaultStatus: 'open' },
  { name: 'Question', icon: 'question', defaultStatus: 'open' },
  { name: 'Discussion', icon: 'comment', defaultStatus: 'open' },
];

// #endregion

// #region Localized Strings

const NOTES_TAB_LOCALIZED_KEYS: LocalizeKey[] = [
  '%webView_projectProperties_notesTab_header%',
  '%webView_projectProperties_notesTab_tagName_label%',
  '%webView_projectProperties_notesTab_icon_label%',
  '%webView_projectProperties_notesTab_defaultStatus_label%',
  '%webView_projectProperties_notesTab_addTag%',
  '%webView_projectProperties_notesTab_removeTag%',
  '%webView_projectProperties_notesTab_placeholder_name%',
  '%webView_projectProperties_notesTab_validation_nameRequired%',
  '%webView_projectProperties_notesTab_validation_nameUnique%',
];

// #endregion

// #region Types

interface NotesTabProps {
  formState: ProjectPropertiesFormState;
  onFieldChange: (field: keyof ProjectPropertiesFormState, value: unknown) => void;
  validationErrors: Record<string, string>;
  isDisabled: boolean;
}

// #endregion

export function NotesTab({
  formState,
  onFieldChange,
  validationErrors,
  isDisabled,
}: NotesTabProps) {
  const [localizedStrings] = useLocalizedStrings(NOTES_TAB_LOCALIZED_KEYS);

  // Initialize with default tags if empty
  const noteTags = useMemo(() => {
    if (formState.noteTags.length === 0) {
      return DEFAULT_NOTE_TAGS;
    }
    return formState.noteTags;
  }, [formState.noteTags]);

  // Handle tag field change
  const handleTagChange = useCallback(
    (index: number, field: keyof NoteTagConfig, value: string) => {
      const updatedTags = [...noteTags];
      updatedTags[index] = { ...updatedTags[index], [field]: value };
      onFieldChange('noteTags', updatedTags);
    },
    [noteTags, onFieldChange],
  );

  // Handle add tag
  const handleAddTag = useCallback(() => {
    const newTag: NoteTagConfig = {
      name: '',
      icon: 'flag',
      defaultStatus: 'open',
    };
    onFieldChange('noteTags', [...noteTags, newTag]);
  }, [noteTags, onFieldChange]);

  // Handle remove tag
  const handleRemoveTag = useCallback(
    (index: number) => {
      const updatedTags = noteTags.filter((_, i) => i !== index);
      onFieldChange('noteTags', updatedTags);
    },
    [noteTags, onFieldChange],
  );

  // Check for duplicate names
  const getDuplicateNames = useCallback(() => {
    const names = noteTags.map((tag) => tag.name.trim().toLowerCase());
    const duplicates = new Set<string>();
    names.forEach((name, index) => {
      if (name && names.indexOf(name) !== index) {
        duplicates.add(name);
      }
    });
    return duplicates;
  }, [noteTags]);

  const duplicateNames = getDuplicateNames();

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Header */}
      <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-border-border tw-pb-2">
        <Label className="tw-text-base tw-font-semibold">
          {localizedStrings['%webView_projectProperties_notesTab_header%']}
        </Label>
        <Button variant="outline" size="sm" onClick={handleAddTag} disabled={isDisabled}>
          {localizedStrings['%webView_projectProperties_notesTab_addTag%']}
        </Button>
      </div>

      {/* Validation Error */}
      {validationErrors.noteTags && (
        <div className="tw-rounded-md tw-border tw-border-destructive tw-bg-destructive/10 tw-p-2 tw-text-sm tw-text-destructive">
          {validationErrors.noteTags}
        </div>
      )}

      {/* Note Tags Table */}
      <div className="tw-overflow-auto">
        <table className="tw-w-full tw-border-collapse">
          <thead>
            <tr className="tw-border-b tw-border-border">
              <th className="tw-p-2 tw-text-left tw-text-sm tw-font-medium">
                {localizedStrings['%webView_projectProperties_notesTab_tagName_label%']}
              </th>
              <th className="tw-p-2 tw-text-left tw-text-sm tw-font-medium">
                {localizedStrings['%webView_projectProperties_notesTab_icon_label%']}
              </th>
              <th className="tw-p-2 tw-text-left tw-text-sm tw-font-medium">
                {localizedStrings['%webView_projectProperties_notesTab_defaultStatus_label%']}
              </th>
              <th className="tw-p-2 tw-text-right tw-text-sm tw-font-medium">
                {/* Actions column */}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Note tags don't have unique IDs, using index is acceptable for this editable list */}
            {noteTags.map((tag, index) => {
              const hasEmptyName = !tag.name.trim();
              const hasDuplicateName = duplicateNames.has(tag.name.trim().toLowerCase());
              const hasError = hasEmptyName || hasDuplicateName;

              return (
                <tr
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={`tw-border-b tw-border-border ${hasError ? 'tw-bg-destructive/5' : ''}`}
                >
                  {/* Tag Name */}
                  <td className="tw-p-2">
                    <div className="tw-flex tw-flex-col tw-gap-1">
                      <Input
                        value={tag.name}
                        onChange={(e) => handleTagChange(index, 'name', e.target.value)}
                        placeholder={
                          localizedStrings['%webView_projectProperties_notesTab_placeholder_name%']
                        }
                        disabled={isDisabled}
                        className={hasError ? 'tw-border-destructive' : ''}
                        aria-invalid={hasError}
                      />
                      {hasEmptyName && (
                        <span className="tw-text-xs tw-text-destructive">
                          {
                            localizedStrings[
                              '%webView_projectProperties_notesTab_validation_nameRequired%'
                            ]
                          }
                        </span>
                      )}
                      {hasDuplicateName && !hasEmptyName && (
                        <span className="tw-text-xs tw-text-destructive">
                          {
                            localizedStrings[
                              '%webView_projectProperties_notesTab_validation_nameUnique%'
                            ]
                          }
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Icon */}
                  <td className="tw-p-2">
                    <Select
                      value={tag.icon}
                      onValueChange={(value) => handleTagChange(index, 'icon', value)}
                      disabled={isDisabled}
                    >
                      <SelectTrigger className="tw-w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {NOTE_TAG_ICONS.map((icon) => (
                          <SelectItem key={icon.value} value={icon.value}>
                            {icon.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>

                  {/* Default Status */}
                  <td className="tw-p-2">
                    <Select
                      value={tag.defaultStatus}
                      onValueChange={(value) => handleTagChange(index, 'defaultStatus', value)}
                      disabled={isDisabled}
                    >
                      <SelectTrigger className="tw-w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {NOTE_TAG_STATUSES.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>

                  {/* Remove Button */}
                  <td className="tw-p-2 tw-text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveTag(index)}
                      disabled={isDisabled || noteTags.length <= 1}
                      className="tw-text-destructive hover:tw-text-destructive"
                    >
                      {localizedStrings['%webView_projectProperties_notesTab_removeTag%']}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Info text */}
      <div className="tw-mt-4 tw-text-sm tw-text-muted-foreground">
        <p>
          Note tags are used to categorize project notes. Each tag has a name, icon, and default
          status when a new note is created.
        </p>
      </div>
    </div>
  );
}

export default NotesTab;
