import { useCallback, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Input, Textarea, Checkbox } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { Plus, Trash2 } from 'lucide-react';
import { useProjectCreation, NoteTag } from '../../context/project-creation-context';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%projectCreation_notes_title%',
  '%projectCreation_notes_instruction%',
  '%projectCreation_notes_icon%',
  '%projectCreation_notes_name%',
  '%projectCreation_notes_creatorResolve%',
  '%projectCreation_notes_template%',
  '%projectCreation_notes_delete%',
  '%projectCreation_notes_addNew%',
];

// Available note icons
const NOTE_ICONS = ['!', '?', 'i', '*', '+', '-', '~', '#', '@', '^'];

/** Note Tag Row Component */
function NoteTagRow({
  tag,
  onUpdate,
  onDelete,
  canDelete,
}: {
  tag: NoteTag;
  onUpdate: (id: string, updates: Partial<NoteTag>) => void;
  onDelete: (id: string) => void;
  canDelete: boolean;
}) {
  const [showTemplate, setShowTemplate] = useState(false);

  return (
    <tr className="tw-border-b last:tw-border-b-0">
      {/* Icon */}
      <td className="tw-p-2">
        <select
          value={tag.icon}
          onChange={(e) => onUpdate(tag.id, { icon: e.target.value })}
          className="tw-h-8 tw-w-12 tw-rounded-md tw-border tw-bg-background tw-text-center"
        >
          {NOTE_ICONS.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </select>
      </td>

      {/* Name */}
      <td className="tw-p-2">
        <Input
          value={tag.name}
          onChange={(e) => onUpdate(tag.id, { name: e.target.value })}
          className="tw-w-full"
          disabled={tag.id === 'todo'} // "To do" tag name cannot be changed
        />
      </td>

      {/* Creator Can Resolve */}
      <td className="tw-p-2 tw-text-center">
        <Checkbox
          checked={tag.creatorCanResolve}
          onCheckedChange={(checked) => onUpdate(tag.id, { creatorCanResolve: !!checked })}
        />
      </td>

      {/* Template */}
      <td className="tw-p-2">
        <Button variant="outline" size="sm" onClick={() => setShowTemplate(!showTemplate)}>
          {showTemplate ? 'Hide' : '...'}
        </Button>
        {showTemplate && (
          <div className="tw-mt-2">
            <Textarea
              value={tag.template}
              onChange={(e) => onUpdate(tag.id, { template: e.target.value })}
              placeholder="Enter template text..."
              className="tw-min-h-[80px] tw-w-full"
            />
          </div>
        )}
      </td>

      {/* Delete */}
      <td className="tw-p-2 tw-text-center">
        {canDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(tag.id)}
            className="tw-text-destructive hover:tw-text-destructive"
          >
            <Trash2 className="tw-h-4 tw-w-4" />
          </Button>
        )}
      </td>
    </tr>
  );
}

/**
 * Notes Tab Component (part of CAP-UI-001)
 *
 * Allows users to configure project note tags including:
 *
 * - Tag icon (displayed in notes panel)
 * - Tag name (user-defined label)
 * - Creator can resolve option
 * - Note template text
 */
export function NotesTab() {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const { state, dispatch } = useProjectCreation();

  // Handle tag update
  const handleTagUpdate = useCallback(
    (id: string, updates: Partial<NoteTag>) => {
      dispatch({ type: 'UPDATE_NOTE_TAG', id, updates });
    },
    [dispatch],
  );

  // Handle tag delete
  const handleTagDelete = useCallback(
    (id: string) => {
      dispatch({ type: 'DELETE_NOTE_TAG', id });
    },
    [dispatch],
  );

  // Handle add new tag
  const handleAddTag = useCallback(() => {
    const newTag: NoteTag = {
      id: `tag-${Date.now()}`,
      icon: '?',
      name: 'New Tag',
      creatorCanResolve: false,
      template: '',
    };
    dispatch({ type: 'ADD_NOTE_TAG', tag: newTag });
  }, [dispatch]);

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      <p className="tw-text-sm tw-text-muted-foreground">
        {localizedStrings['%projectCreation_notes_instruction%'] ||
          'Edit project note tag icons and names:'}
      </p>

      {/* Note Tags Table */}
      <div className="tw-overflow-hidden tw-rounded-md tw-border">
        <table className="tw-w-full">
          <thead className="tw-bg-muted">
            <tr>
              <th className="tw-w-16 tw-p-2 tw-text-left tw-text-sm tw-font-medium">
                {localizedStrings['%projectCreation_notes_icon%'] || 'Icon'}
              </th>
              <th className="tw-p-2 tw-text-left tw-text-sm tw-font-medium">
                {localizedStrings['%projectCreation_notes_name%'] || 'Name'}
              </th>
              <th className="tw-w-32 tw-p-2 tw-text-center tw-text-sm tw-font-medium">
                {localizedStrings['%projectCreation_notes_creatorResolve%'] ||
                  'Creator can resolve'}
              </th>
              <th className="tw-w-24 tw-p-2 tw-text-left tw-text-sm tw-font-medium">
                {localizedStrings['%projectCreation_notes_template%'] || 'Template'}
              </th>
              <th className="tw-w-16 tw-p-2 tw-text-center tw-text-sm tw-font-medium">
                {localizedStrings['%projectCreation_notes_delete%'] || 'Delete'}
              </th>
            </tr>
          </thead>
          <tbody>
            {state.noteTags.map((tag) => (
              <NoteTagRow
                key={tag.id}
                tag={tag}
                onUpdate={handleTagUpdate}
                onDelete={handleTagDelete}
                canDelete={tag.id !== 'todo'} // "To do" tag cannot be deleted
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Tag Button */}
      <Button variant="outline" onClick={handleAddTag} className="tw-w-fit">
        <Plus className="tw-mr-2 tw-h-4 tw-w-4" />
        {localizedStrings['%projectCreation_notes_addNew%'] || 'Add new tag'}
      </Button>
    </div>
  );
}

export default NotesTab;
