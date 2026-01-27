import { useCallback, useMemo, useState } from 'react';
import {
  Button,
  Checkbox,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  cn,
} from 'platform-bible-react';
import {
  Flag,
  MessageCircle,
  HelpCircle,
  Star,
  CheckCircle,
  Info,
  AlertTriangle,
  AlertCircle,
  Trash2,
  Plus,
  FileText,
  type LucideIcon,
} from 'lucide-react';

// =====================================================
// CONSTANTS
// =====================================================

/**
 * Standard note tag icons. These match common annotation icons used in Paratext. The value is a
 * unique identifier used in settings persistence.
 */
export const NOTE_TAG_ICONS = [
  'flag',
  'comment',
  'question',
  'star',
  'check',
  'info',
  'warning',
  'exclamation',
] as const;

export type NoteTagIcon = (typeof NOTE_TAG_ICONS)[number];

/** Map of icon names to Lucide icon components */
const ICON_COMPONENTS: Record<NoteTagIcon, LucideIcon> = {
  flag: Flag,
  comment: MessageCircle,
  question: HelpCircle,
  star: Star,
  check: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  exclamation: AlertCircle,
};

/** Default display names for icons */
const ICON_DISPLAY_NAMES: Record<NoteTagIcon, string> = {
  flag: 'Flag',
  comment: 'Comment',
  question: 'Question',
  star: 'Star',
  check: 'Check',
  info: 'Info',
  warning: 'Warning',
  exclamation: 'Exclamation',
};

/** Built-in tag name that cannot be deleted */
const BUILTIN_TAG_NAME = 'To do';

// =====================================================
// INTERFACES
// =====================================================

/** Represents a single note tag configuration. Note tags are used to categorize project notes. */
export interface NoteTag {
  /** Unique identifier for the tag (generated when tag is created) */
  id: string;
  /** Icon identifier for the tag */
  icon: NoteTagIcon;
  /** Display name for the tag (must be unique) */
  name: string;
  /** Whether the creator of a note with this tag can resolve it */
  creatorCanResolve: boolean;
  /** Template text shown when creating a note with this tag */
  template: string;
}

/**
 * Localized strings for the NoteTagsEditor component. Pass these via useLocalizedStrings hook from
 * the extension.
 */
export interface NoteTagsEditorLocalizedStrings {
  /** Column header: Icon */
  '%note_tags_icon%'?: string;
  /** Column header: Name */
  '%note_tags_name%'?: string;
  /** Column header: Creator can resolve */
  '%note_tags_creator_resolve%'?: string;
  /** Column header: Template */
  '%note_tags_template%'?: string;
  /** Column header: Delete */
  '%note_tags_delete%'?: string;
  /** Add new tag button text */
  '%note_tags_add%'?: string;
  /** Edit template button tooltip/text */
  '%note_tags_edit_template%'?: string;
  /** Error: Duplicate name */
  '%note_tags_error_duplicate%'?: string;
  /** Error: Name required */
  '%note_tags_error_required%'?: string;
  /** Built-in tag cannot be deleted tooltip */
  '%note_tags_builtin_tooltip%'?: string;
  /** Placeholder for new tag name */
  '%note_tags_new_name_placeholder%'?: string;
  /** Template editor title */
  '%note_tags_template_title%'?: string;
  /** Done button in template editor */
  '%note_tags_template_done%'?: string;
}

/** Keys for localizing note tags editor components. */
export const NOTE_TAGS_EDITOR_STRING_KEYS = Object.freeze([
  '%note_tags_icon%',
  '%note_tags_name%',
  '%note_tags_creator_resolve%',
  '%note_tags_template%',
  '%note_tags_delete%',
  '%note_tags_add%',
  '%note_tags_edit_template%',
  '%note_tags_error_duplicate%',
  '%note_tags_error_required%',
  '%note_tags_builtin_tooltip%',
  '%note_tags_new_name_placeholder%',
  '%note_tags_template_title%',
  '%note_tags_template_done%',
] as const);

/**
 * Props for the NoteTagsEditor component. Based on strategic-plan-ui.md UI-PKG-007 acceptance
 * criteria.
 */
export interface NoteTagsEditorProps {
  /** Array of currently configured note tags */
  tags: NoteTag[];
  /** Callback when tags change (add, edit, or delete) */
  onChange: (tags: NoteTag[]) => void;
  /** Whether the control is disabled (e.g., during loading or for read-only view) */
  disabled?: boolean;
  /** Optional localized strings for the component */
  localizedStrings?: NoteTagsEditorLocalizedStrings;
  /** Optional CSS class name for styling */
  className?: string;
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Generates a unique ID for a new tag.
 *
 * @returns A unique string ID
 */
function generateTagId(): string {
  return `tag-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Creates a new tag with default values.
 *
 * @returns A new NoteTag with defaults
 */
function createDefaultTag(): NoteTag {
  return {
    id: generateTagId(),
    icon: 'flag',
    name: '',
    creatorCanResolve: false,
    template: '',
  };
}

/**
 * Checks if a tag name is a duplicate (excluding the current tag).
 *
 * @param name - The name to check
 * @param tags - All current tags
 * @param currentTagId - The ID of the current tag (to exclude from check)
 * @returns True if the name is a duplicate
 */
function isDuplicateName(name: string, tags: NoteTag[], currentTagId: string): boolean {
  const normalizedName = name.trim().toLowerCase();
  return tags.some(
    (tag) => tag.id !== currentTagId && tag.name.trim().toLowerCase() === normalizedName,
  );
}

/**
 * Checks if a tag is the built-in "To do" tag.
 *
 * @param tag - The tag to check
 * @returns True if this is the built-in tag
 */
function isBuiltinTag(tag: NoteTag): boolean {
  return tag.name.trim().toLowerCase() === BUILTIN_TAG_NAME.toLowerCase();
}

// =====================================================
// ICON SELECT COMPONENT
// =====================================================

interface IconSelectProps {
  value: NoteTagIcon;
  onChange: (icon: NoteTagIcon) => void;
  disabled?: boolean;
}

/** Type guard to check if a value is a valid NoteTagIcon */
function isNoteTagIcon(value: string): value is NoteTagIcon {
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return NOTE_TAG_ICONS.includes(value as NoteTagIcon);
}

function IconSelect({ value, onChange, disabled }: IconSelectProps) {
  const IconComponent = ICON_COMPONENTS[value];

  const handleValueChange = (v: string) => {
    if (isNoteTagIcon(v)) {
      onChange(v);
    }
  };

  return (
    <Select value={value} onValueChange={handleValueChange} disabled={disabled}>
      <SelectTrigger className="tw-w-20" aria-label="Select icon">
        <SelectValue>
          <div className="tw-flex tw-items-center tw-justify-center">
            <IconComponent className="tw-h-4 tw-w-4" />
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {NOTE_TAG_ICONS.map((iconName) => {
          const Icon = ICON_COMPONENTS[iconName];
          return (
            <SelectItem key={iconName} value={iconName}>
              <div className="tw-flex tw-items-center tw-gap-2">
                <Icon className="tw-h-4 tw-w-4" />
                <span>{ICON_DISPLAY_NAMES[iconName]}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

// =====================================================
// TEMPLATE EDITOR POPOVER COMPONENT
// =====================================================

interface TemplateEditorProps {
  value: string;
  onChange: (template: string) => void;
  disabled?: boolean;
  localizedStrings?: NoteTagsEditorLocalizedStrings;
}

function TemplateEditor({ value, onChange, disabled, localizedStrings }: TemplateEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingValue, setEditingValue] = useState(value);

  const handleOpen = (open: boolean) => {
    if (open) {
      setEditingValue(value);
    }
    setIsOpen(open);
  };

  const handleDone = () => {
    onChange(editingValue);
    setIsOpen(false);
  };

  const editTemplateText = localizedStrings?.['%note_tags_edit_template%'] ?? 'Edit template';
  const templateTitle = localizedStrings?.['%note_tags_template_title%'] ?? 'Note Template';
  const doneText = localizedStrings?.['%note_tags_template_done%'] ?? 'Done';

  const hasTemplate = value.trim().length > 0;

  return (
    <Popover open={isOpen} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={hasTemplate ? 'default' : 'outline'}
          size="sm"
          disabled={disabled}
          className="tw-gap-1"
          aria-label={editTemplateText}
        >
          <FileText className="tw-h-4 tw-w-4" />
          {hasTemplate && <span className="tw-text-xs">...</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="tw-w-80" align="start">
        <div className="tw-flex tw-flex-col tw-gap-2">
          <Label className="tw-font-medium">{templateTitle}</Label>
          <Textarea
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
            placeholder="Enter template text..."
            className="tw-min-h-[100px]"
            disabled={disabled}
          />
          <div className="tw-flex tw-justify-end">
            <Button size="sm" onClick={handleDone} disabled={disabled}>
              {doneText}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// =====================================================
// TAG ROW COMPONENT
// =====================================================

interface TagRowProps {
  tag: NoteTag;
  tags: NoteTag[];
  onUpdate: (updatedTag: NoteTag) => void;
  onDelete: (tagId: string) => void;
  disabled?: boolean;
  localizedStrings?: NoteTagsEditorLocalizedStrings;
}

function TagRow({ tag, tags, onUpdate, onDelete, disabled, localizedStrings }: TagRowProps) {
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  // Track the current editing value for validation - this ensures we validate the
  // actual input value even if the parent hasn't re-rendered yet
  const [currentName, setCurrentName] = useState(tag.name);

  const isBuiltin = isBuiltinTag(tag);
  const canDelete = !isBuiltin;

  const handleNameChange = (newName: string) => {
    // Clear error on change
    setNameError(undefined);
    // Track the current value locally for validation
    setCurrentName(newName);
    onUpdate({ ...tag, name: newName });
  };

  const handleNameBlur = () => {
    // Validate on blur using the current editing value
    const trimmedName = currentName.trim();

    if (trimmedName.length === 0) {
      setNameError(localizedStrings?.['%note_tags_error_required%'] ?? 'Name is required');
      return;
    }

    if (isDuplicateName(trimmedName, tags, tag.id)) {
      setNameError(localizedStrings?.['%note_tags_error_duplicate%'] ?? 'Name must be unique');
    }
  };

  const handleIconChange = (icon: NoteTagIcon) => {
    onUpdate({ ...tag, icon });
  };

  const handleCreatorResolveChange = (checked: boolean) => {
    onUpdate({ ...tag, creatorCanResolve: checked });
  };

  const handleTemplateChange = (template: string) => {
    onUpdate({ ...tag, template });
  };

  const handleDelete = () => {
    onDelete(tag.id);
  };

  const deleteDisabledTooltip =
    localizedStrings?.['%note_tags_builtin_tooltip%'] ?? 'Built-in tag cannot be deleted';
  const deleteLabel = localizedStrings?.['%note_tags_delete%'] ?? 'Delete';

  return (
    <TableRow>
      {/* Icon column */}
      <TableCell className="tw-w-24 tw-py-2">
        <IconSelect value={tag.icon} onChange={handleIconChange} disabled={disabled} />
      </TableCell>

      {/* Name column */}
      <TableCell className="tw-py-2">
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Input
            value={currentName}
            onChange={(e) => handleNameChange(e.target.value)}
            onBlur={handleNameBlur}
            disabled={disabled || isBuiltin}
            className={cn('tw-h-8', nameError && 'tw-border-destructive')}
            placeholder={
              localizedStrings?.['%note_tags_new_name_placeholder%'] ?? 'Enter tag name...'
            }
            aria-label="Tag name"
            aria-invalid={!!nameError}
          />
          {nameError && (
            <span className="tw-text-xs tw-text-destructive" role="alert">
              {nameError}
            </span>
          )}
        </div>
      </TableCell>

      {/* Creator can resolve column */}
      <TableCell className="tw-w-32 tw-py-2 tw-text-center">
        <Checkbox
          checked={tag.creatorCanResolve}
          onCheckedChange={handleCreatorResolveChange}
          disabled={disabled}
          aria-label="Creator can resolve"
        />
      </TableCell>

      {/* Template column */}
      <TableCell className="tw-w-24 tw-py-2">
        <TemplateEditor
          value={tag.template}
          onChange={handleTemplateChange}
          disabled={disabled}
          localizedStrings={localizedStrings}
        />
      </TableCell>

      {/* Delete column */}
      <TableCell className="tw-w-20 tw-py-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={disabled || !canDelete}
          className="tw-text-destructive hover:tw-text-destructive hover:tw-bg-destructive/10"
          aria-label={canDelete ? deleteLabel : deleteDisabledTooltip}
          title={!canDelete ? deleteDisabledTooltip : undefined}
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
 * NoteTagsEditor component for managing project note tags. Provides an editable grid with columns
 * for icon, name, creator can resolve, template, and delete.
 *
 * @remarks
 * This component is embedded in the Notes tab of the ProjectPropertiesForm. It provides:
 *
 * - Editable grid for note tag configuration
 * - Icon dropdown selection for each tag
 * - Editable name with uniqueness validation
 * - Checkbox for "Creator can resolve" option
 * - Popover for editing multiline template text
 * - Add new tag button
 * - Delete button (disabled for built-in "To do" tag)
 *
 * @example
 *
 * ```tsx
 * const [tags, setTags] = useState<NoteTag[]>([
 *   { id: '1', icon: 'flag', name: 'To do', creatorCanResolve: true, template: '' },
 * ]);
 *
 * <NoteTagsEditor tags={tags} onChange={setTags} disabled={false} />;
 * ```
 */
export function NoteTagsEditor({
  tags,
  onChange,
  disabled = false,
  localizedStrings,
  className,
}: NoteTagsEditorProps) {
  // Localized column headers
  const iconHeader = localizedStrings?.['%note_tags_icon%'] ?? 'Icon';
  const nameHeader = localizedStrings?.['%note_tags_name%'] ?? 'Name';
  const creatorResolveHeader =
    localizedStrings?.['%note_tags_creator_resolve%'] ?? 'Creator can resolve';
  const templateHeader = localizedStrings?.['%note_tags_template%'] ?? 'Template';
  const deleteHeader = localizedStrings?.['%note_tags_delete%'] ?? '';
  const addTagText = localizedStrings?.['%note_tags_add%'] ?? 'Add new tag';

  // Handle adding a new tag
  const handleAddTag = useCallback(() => {
    const newTag = createDefaultTag();
    onChange([...tags, newTag]);
  }, [tags, onChange]);

  // Handle updating a tag
  const handleUpdateTag = useCallback(
    (updatedTag: NoteTag) => {
      const newTags = tags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag));
      onChange(newTags);
    },
    [tags, onChange],
  );

  // Handle deleting a tag
  const handleDeleteTag = useCallback(
    (tagId: string) => {
      const newTags = tags.filter((tag) => tag.id !== tagId);
      onChange(newTags);
    },
    [tags, onChange],
  );

  // Memoize the tag count for display
  const tagCount = useMemo(() => tags.length, [tags]);

  return (
    <div className={cn('tw-flex tw-flex-col tw-gap-2', className)}>
      {/* Table */}
      <div className="tw-border tw-rounded-md tw-overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="tw-w-24">{iconHeader}</TableHead>
              <TableHead>{nameHeader}</TableHead>
              <TableHead className="tw-w-32 tw-text-center">{creatorResolveHeader}</TableHead>
              <TableHead className="tw-w-24">{templateHeader}</TableHead>
              <TableHead className="tw-w-20">{deleteHeader}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="tw-text-center tw-text-muted-foreground tw-py-8">
                  No tags configured. Click &quot;Add new tag&quot; to create one.
                </TableCell>
              </TableRow>
            ) : (
              tags.map((tag) => (
                <TagRow
                  key={tag.id}
                  tag={tag}
                  tags={tags}
                  onUpdate={handleUpdateTag}
                  onDelete={handleDeleteTag}
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
          onClick={handleAddTag}
          disabled={disabled}
          className="tw-gap-1"
        >
          <Plus className="tw-h-4 tw-w-4" />
          {addTagText}
        </Button>
        <span className="tw-text-sm tw-text-muted-foreground">
          {tagCount} tag{tagCount !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}

export default NoteTagsEditor;
