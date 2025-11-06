import { useMemo } from 'react';
import { MarkdownRenderer } from '@/components/advanced/extension-marketplace/markdown-renderer.component';
import { Avatar, AvatarFallback } from '@/components/shadcn-ui/avatar';
import { cn } from '@/utils/shadcn-ui.util';
import { formatReplacementString, formatRelativeDate } from 'platform-bible-utils';
import { CommentItemProps } from './comment-list.types';

export function CommentItem({
  comment,
  isReply = false,
  localizedStrings,
  isThreadExpanded = false,
  handleClickCommentText,
  handleMouseDownCommentText,
}: CommentItemProps) {
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
    return `${relativeDate} at ${time}`;
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

  return (
    <div className={cn('tw-space-y-3', isReply && 'tw-text-sm')}>
      <div className="tw-flex tw-flex-row tw-gap-3">
        <Avatar className={cn(isReply ? 'tw-h-8 tw-w-8' : 'tw-h-8 tw-w-8')}>
          <AvatarFallback className="tw-text-xs tw-font-medium">{initials}</AvatarFallback>
        </Avatar>
        <div className="tw-flex tw-flex-1 tw-flex-col tw-gap-2">
          <div className="tw-flex tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2">
            {/* Allow clicking to expand thread when collapsed, but allow text selection when expanded */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <p
              className="tw-text-sm tw-font-medium"
              onClick={handleClickCommentText}
              onMouseDown={handleMouseDownCommentText}
            >
              {userLabel}
            </p>
            {/* Allow clicking to expand thread when collapsed, but allow text selection when expanded */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <p
              className="tw-text-xs tw-font-normal tw-text-muted-foreground"
              onClick={handleClickCommentText}
              onMouseDown={handleMouseDownCommentText}
            >
              {displayDate}
            </p>
          </div>
          {/* Allow clicking to expand thread when collapsed, but allow text selection when expanded */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className="tw-flex tw-flex-row tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground"
            onClick={handleClickCommentText}
            onMouseDown={handleMouseDownCommentText}
          >
            <MarkdownRenderer
              className="tw-text-sm tw-font-normal tw-text-primary"
              markdown={comment.contents}
              truncate={!isThreadExpanded}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
