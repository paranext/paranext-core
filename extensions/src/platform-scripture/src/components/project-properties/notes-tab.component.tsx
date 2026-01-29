/** NotesTab - Comment tags configuration tab for Project Properties dialog */

import { useCallback } from 'react';
import { Button, Checkbox, Input, Label, cn } from 'platform-bible-react';
import { Plus, Trash2 } from 'lucide-react';
import type { CommentTag } from '../../types/project-properties.types';

// =============================================================================
// PROPS
// =============================================================================

export interface NotesTabProps {
  /** Comment tags configuration */
  commentTags: CommentTag[];

  /** Callback to add a new tag */
  onAddTag: (tag: CommentTag) => void;

  /** Callback to update a tag */
  onUpdateTag: (index: number, tag: CommentTag) => void;

  /** Callback to remove a tag */
  onRemoveTag: (index: number) => void;

  /** Optional className */
  className?: string;
}

// =============================================================================
// DEFAULT TAGS
// =============================================================================

const DEFAULT_NEW_TAG: CommentTag = {
  icon: 'comment',
  name: 'New Tag',
  creatorResolve: false,
  template: '',
};

// =============================================================================
// TAG ROW COMPONENT
// =============================================================================

interface TagRowProps {
  tag: CommentTag;
  index: number;
  onUpdate: (index: number, tag: CommentTag) => void;
  onRemove: (index: number) => void;
}

function TagRow({ tag, index, onUpdate, onRemove }: TagRowProps) {
  const handleNameChange = useCallback(
    (name: string) => {
      onUpdate(index, { ...tag, name });
    },
    [tag, index, onUpdate],
  );

  const handleCreatorResolveChange = useCallback(
    (checked: boolean) => {
      onUpdate(index, { ...tag, creatorResolve: checked });
    },
    [tag, index, onUpdate],
  );

  const handleTemplateChange = useCallback(
    (template: string) => {
      onUpdate(index, { ...tag, template });
    },
    [tag, index, onUpdate],
  );

  return (
    <div className="tw-grid tw-grid-cols-[1fr_auto_2fr_auto] tw-gap-2 tw-items-center tw-p-2 tw-border tw-border-border tw-rounded">
      {/* Name */}
      <Input
        value={tag.name}
        onChange={(e) => handleNameChange(e.target.value)}
        placeholder="Tag name"
        className="tw-h-8"
      />

      {/* Creator Resolve */}
      <div className="tw-flex tw-items-center tw-gap-1">
        <Checkbox
          id={`creator-resolve-${index}`}
          checked={tag.creatorResolve}
          onCheckedChange={(checked) => handleCreatorResolveChange(checked === true)}
        />
        <Label htmlFor={`creator-resolve-${index}`} className="tw-text-xs tw-cursor-pointer">
          Creator can resolve
        </Label>
      </div>

      {/* Template */}
      <Input
        value={tag.template}
        onChange={(e) => handleTemplateChange(e.target.value)}
        placeholder="Response template (optional)"
        className="tw-h-8"
      />

      {/* Delete */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(index)}
        className="tw-h-8 tw-w-8 tw-p-0 tw-text-destructive hover:tw-text-destructive"
        aria-label={`Remove tag ${tag.name}`}
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
 * NotesTab - Fourth tab in Project Properties dialog
 *
 * Configures comment tags for project notes.
 */
export function NotesTab({
  commentTags,
  onAddTag,
  onUpdateTag,
  onRemoveTag,
  className,
}: NotesTabProps) {
  const handleAddNewTag = useCallback(() => {
    onAddTag({ ...DEFAULT_NEW_TAG, name: `Tag ${commentTags.length + 1}` });
  }, [commentTags.length, onAddTag]);

  return (
    <div className={cn('pr-twp tw-flex tw-flex-col tw-gap-4', className)}>
      {/* Header */}
      <div className="tw-flex tw-items-center tw-justify-between">
        <Label className="tw-font-medium">Note Tags</Label>
        <Button variant="outline" size="sm" onClick={handleAddNewTag} className="tw-gap-1">
          <Plus className="tw-h-3 tw-w-3" />
          Add New Tag...
        </Button>
      </div>

      {/* Instructions */}
      <p className="tw-text-sm tw-text-muted-foreground">
        Configure tags that can be applied to project notes. Tags help organize and categorize notes
        for easier filtering.
      </p>

      {/* Column Headers */}
      {commentTags.length > 0 && (
        <div className="tw-grid tw-grid-cols-[1fr_auto_2fr_auto] tw-gap-2 tw-px-2 tw-text-xs tw-text-muted-foreground tw-font-medium">
          <span>Name</span>
          <span>Options</span>
          <span>Template</span>
          <span className="tw-w-8" />
        </div>
      )}

      {/* Tag List */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        {commentTags.length === 0 ? (
          <div className="tw-text-sm tw-text-muted-foreground tw-text-center tw-py-4 tw-border tw-border-dashed tw-border-border tw-rounded">
            No custom tags defined. Click &quot;Add New Tag...&quot; to create one.
          </div>
        ) : (
          commentTags.map((tag, index) => {
            // Using name + icon as key since tags don't have unique IDs
            const tagKey = `tag-${tag.name}-${tag.icon}`;
            return (
              <TagRow
                key={tagKey}
                tag={tag}
                index={index}
                onUpdate={onUpdateTag}
                onRemove={onRemoveTag}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default NotesTab;
