import { Editor } from '@/components/advanced/editor/editor';
import {
  editorStateToHtml,
  focusContentEditable,
  handleEditorKeyNavigation,
  hasEditorContent,
} from '@/components/advanced/editor/editor-utils';
import { Button } from '@/components/shadcn-ui/button';
import { Command, CommandItem, CommandList } from '@/components/shadcn-ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { CancelAcceptButtons } from '@/components/basics/cancel-accept-buttons.component';
import {
  SerializedEditorState,
  SerializedElementNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from 'lexical';
import { AtSign } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CommentEditorLocalizedStrings } from './comment-editor.types';
import { didPressCtrlOrCmdEnter } from '../comment-list/comment-list.utils';

const initialValue: SerializedEditorState<
  SerializedParagraphNode & SerializedElementNode<SerializedTextNode>
> = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
        textFormat: 0,
        textStyle: '',
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
};

/** Interface containing the types of the properties that are passed to the `CommentEditor` */
export interface CommentEditorProps {
  /** List of users that can be assigned to the new comment thread */
  assignableUsers: string[];
  /**
   * External function to handle saving the new comment
   *
   * @param contents HTML content of the comment
   * @param assignedUser Optional user to assign the comment to
   */
  onSave: (contents: string, assignedUser?: string) => void;
  /**
   * External function to handle closing the comment editor. Gets called when the editor is closed
   * without saving changes
   */
  onClose: () => void;
  /** Localized strings to be passed to the comment editor component */
  localizedStrings: CommentEditorLocalizedStrings;
  /**
   * The user to pre-select in the "Assign to" dropdown when the editor opens. Used to persist the
   * last chosen assignee across consecutive comment creations within a session.
   */
  initialAssignedUser?: string;
}

/**
 * Gets the display name for an assigned user
 *
 * @param user The user identifier (empty string for unassigned, "Team" for team, or username)
 * @param localizedStrings Localized strings for special values
 * @returns The display name for the user
 */
function getAssignedUserDisplayName(
  user: string,
  localizedStrings: CommentEditorLocalizedStrings,
): string {
  if (user === '') {
    return localizedStrings['%commentEditor_unassigned%'] ?? 'Unassigned';
  }
  if (user === 'Team') {
    return localizedStrings['%commentEditor_team%'] ?? 'Team';
  }
  return user;
}

/**
 * Component to create a new project comment from within the scripture editor
 *
 * @param CommentEditorProps - The properties for the comment editor component
 */
export default function CommentEditor({
  assignableUsers,
  onSave,
  onClose,
  localizedStrings,
  initialAssignedUser,
}: CommentEditorProps) {
  const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue);
  const [selectedUser, setSelectedUser] = useState<string | undefined>(initialAssignedUser);
  const [isAssignPopoverOpen, setIsAssignPopoverOpen] = useState<boolean>(false);
  const clearEditorRef = useRef<(() => void) | undefined>(undefined);

  // Using null for React ref compatibility
  // eslint-disable-next-line no-null/no-null
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Focus the editor after a delay to allow any closing popover/dropdown to finish
  useEffect(() => {
    let isMounted = true;
    const container = editorContainerRef.current;
    if (!container) return undefined;

    const timeoutId = setTimeout(() => {
      if (!isMounted) return;
      focusContentEditable(container);
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const handleSave = useCallback(() => {
    if (!hasEditorContent(editorState)) return;

    const contents = editorStateToHtml(editorState);
    onSave(contents, selectedUser);
  }, [editorState, onSave, selectedUser]);

  const placeholder =
    localizedStrings['%commentEditor_placeholder%'] ?? 'Type your comment here...';
  const assignToLabel = localizedStrings['%commentEditor_assignTo_label%'] ?? 'Assign to';

  return (
    <div className="pr-twp tw:grid tw:gap-3">
      <div className="tw:flex tw:items-center tw:justify-between">
        <span className="tw:text-sm tw:font-medium">{assignToLabel}</span>
        <CancelAcceptButtons
          onCancelClick={onClose}
          onAcceptClick={handleSave}
          canAccept={hasEditorContent(editorState)}
          localizedStrings={localizedStrings}
          acceptLabel={localizedStrings['%commentEditor_saveButton_tooltip%']}
        />
      </div>

      <div className="tw:flex tw:items-center tw:gap-2">
        <Popover open={isAssignPopoverOpen} onOpenChange={setIsAssignPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2"
              disabled={assignableUsers.length === 0}
            >
              <AtSign className="tw:h-4 tw:w-4" />
              <span>
                {selectedUser !== undefined
                  ? getAssignedUserDisplayName(selectedUser, localizedStrings)
                  : getAssignedUserDisplayName('', localizedStrings)}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="tw:w-auto tw:p-0"
            align="start"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.stopPropagation();
                setIsAssignPopoverOpen(false);
              }
            }}
          >
            <Command>
              <CommandList>
                {assignableUsers.map((user) => (
                  <CommandItem
                    key={user || 'unassigned'}
                    onSelect={() => {
                      // Normalize '' (Unassigned) to undefined so onSave receives undefined
                      // rather than '', keeping "Unassigned" as a no-op assignment action that
                      // won't propagate to setLastAssignedUser in the parent.
                      setSelectedUser(user || undefined);
                      setIsAssignPopoverOpen(false);
                    }}
                    className="tw:flex tw:items-center"
                  >
                    <span>{getAssignedUserDisplayName(user, localizedStrings)}</span>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div
        ref={editorContainerRef}
        role="textbox"
        tabIndex={-1}
        className="tw:outline-hidden"
        onKeyDownCapture={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          } else if (didPressCtrlOrCmdEnter(e)) {
            e.preventDefault();
            e.stopPropagation();
            if (hasEditorContent(editorState)) {
              handleSave();
            }
          }
        }}
        onKeyDown={(e) => {
          handleEditorKeyNavigation(e);
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation();
          }
        }}
      >
        <Editor
          editorSerializedState={editorState}
          onSerializedChange={(value) => setEditorState(value)}
          placeholder={placeholder}
          onClear={(clearFn) => {
            clearEditorRef.current = clearFn;
          }}
        />
      </div>
    </div>
  );
}
