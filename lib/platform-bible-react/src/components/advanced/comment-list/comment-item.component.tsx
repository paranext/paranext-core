import { Editor } from '@/components/advanced/editor/editor';
import {
  editorStateToHtml,
  focusContentEditable,
  handleEditorKeyNavigation,
  hasEditorContent,
  htmlToEditorState,
} from '@/components/advanced/editor/editor-utils';
import { Avatar, AvatarFallback } from '@/components/shadcn-ui/avatar';
import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { cn } from '@/utils/shadcn-ui.util';
import { SerializedEditorState } from 'lexical';
import { ArrowUp, Check, MoreHorizontal, Pencil, X } from 'lucide-react';
import {
  formatRelativeDate,
  formatReplacementString,
  hasCustomParatextTags,
  parseParatextHtml,
} from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CommentItemProps } from './comment-list.types';

/**
 * A single comment item in the comment list.
 *
 * @param CommentItemProps The properties for the CommentItem component
 */
export function CommentItem({
  comment,
  isReply = false,
  isEditable = false,
  localizedStrings,
  isThreadExpanded = false,
  threadStatus = 'Unspecified',
  handleResolveCommentThread = () => {},
  handleUpdateComment,
  onEditingChange,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editorState, setEditorState] = useState<SerializedEditorState>();

  // eslint-disable-next-line no-null/no-null
  const editContainerRef = useRef<HTMLDivElement | null>(null);

  // Focus the editor when entering edit mode, after dropdown menu has fully closed
  useEffect(() => {
    if (!isEditing) return undefined;

    let isMounted = true;
    const container = editContainerRef.current;
    if (!container) return undefined;

    /**
     * The `Edit Comment` menu item is inside a dropdown that takes time to close. When the dropdown
     * closes, it brings focus back to the dropdown trigger button, which steals focus from the
     * editor. To work around this, we add a slight delay before focusing the editor. Unfortunately
     * there is no reliable way to detect when the dropdown has fully closed, which leaves us with
     * no other option than to use a timeout.
     */
    const timeoutId = setTimeout(() => {
      if (!isMounted) return;
      focusContentEditable(container);
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isEditing]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditorState(undefined);
    onEditingChange?.(false);
  }, [onEditingChange]);

  const handleSaveEdit = useCallback(async () => {
    if (!editorState || !handleUpdateComment) return;
    const isUpdateSuccessful = await handleUpdateComment(
      comment.id,
      editorStateToHtml(editorState),
    );
    if (isUpdateSuccessful) {
      setIsEditing(false);
      setEditorState(undefined);
      onEditingChange?.(false);
    }
  }, [editorState, handleUpdateComment, comment.id, onEditingChange]);

  const displayDate = useMemo(() => {
    const date = new Date(comment.date);
    const relativeDate = formatRelativeDate(
      date,
      localizedStrings['%comment_date_today%'],
      localizedStrings['%comment_date_yesterday%'],
    );
    const time = date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
    return formatReplacementString(localizedStrings['%comment_dateAtTime%'], {
      date: relativeDate,
      time,
    });
  }, [comment.date, localizedStrings]);

  const userLabel = useMemo(
    () =>
      !isReply && comment.assignedUser
        ? formatReplacementString(localizedStrings['%comment_assigned_to%'], {
            assignedUser: comment.assignedUser,
          })
        : comment.user,
    [isReply, comment.assignedUser, comment.user, localizedStrings],
  );

  // Generate initials for avatar
  const initials = useMemo(
    () =>
      comment.user
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
    [comment.user],
  );

  const dropdownContent = useMemo(() => {
    if (!isThreadExpanded) return undefined;
    if (!isEditable) return undefined;
    if (hasCustomParatextTags(comment.contents)) return undefined;
    return (
      <DropdownMenuItem
        onClick={() => {
          setIsEditing(true);
          setEditorState(htmlToEditorState(parseParatextHtml(comment.contents)));
          onEditingChange?.(true);
        }}
      >
        <Pencil className="tw-me-2 tw-h-4 tw-w-4" />
        {localizedStrings['%comment_editComment%']}
      </DropdownMenuItem>
    );
  }, [isEditable, isThreadExpanded, localizedStrings, comment.contents, onEditingChange]);

  return (
    <div
      className={cn('tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3', {
        'tw-text-sm': isReply,
      })}
    >
      <Avatar className="tw-h-8 tw-w-8">
        <AvatarFallback className="tw-text-xs tw-font-medium">{initials}</AvatarFallback>
      </Avatar>
      <div className="tw-flex tw-flex-1 tw-flex-col tw-gap-2">
        <div className="tw-flex tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2">
          <p className="tw-text-sm tw-font-medium">{userLabel}</p>
          <p className="tw-text-xs tw-font-normal tw-text-muted-foreground">{displayDate}</p>
        </div>
        {isEditing && (
          <div
            role="textbox"
            tabIndex={-1}
            className="tw-flex tw-flex-col tw-gap-2"
            ref={editContainerRef}
            onKeyDownCapture={(e) => {
              if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                handleCancelEdit();
              } else if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                e.stopPropagation();
                if (hasEditorContent(editorState)) {
                  handleSaveEdit();
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
            />
            <div className="tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2">
              <Button
                size="icon"
                onClick={handleCancelEdit}
                variant="outline"
                className="tw-flex tw-items-center tw-justify-center tw-rounded-md"
              >
                <X />
              </Button>
              <Button
                size="icon"
                onClick={handleSaveEdit}
                className="tw-flex tw-items-center tw-justify-center tw-rounded-md"
                disabled={!hasEditorContent(editorState)}
              >
                <ArrowUp />
              </Button>
            </div>
          </div>
        )}
        {!isEditing && (
          <div
            className={cn(
              'tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground',
              {
                'tw-line-clamp-3': !isThreadExpanded,
              },
            )}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: parseParatextHtml(comment.contents) }}
          />
        )}
      </div>
      {isThreadExpanded && !isReply && threadStatus !== 'Resolved' && (
        <Button
          variant="ghost"
          size="icon"
          className="tw-shrink-0"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the expand/collapse
            handleResolveCommentThread(comment.thread);
          }}
        >
          <Check />
        </Button>
      )}
      {dropdownContent && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">{dropdownContent}</DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
