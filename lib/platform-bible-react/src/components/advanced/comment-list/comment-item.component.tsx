import { Avatar, AvatarFallback } from '@/components/shadcn-ui/avatar';
import { cn } from '@/utils/shadcn-ui.util';
import {
  formatRelativeDate,
  formatReplacementString,
  parseParatextHtml,
} from 'platform-bible-utils';
import { useMemo } from 'react';
import { CommentItemProps } from './comment-list.types';

/**
 * A single comment item in the comment list.
 *
 * @param CommentItemProps The properties for the CommentItem component
 */
export function CommentItem({
  comment,
  isReply = false,
  localizedStrings,
  isThreadExpanded = false,
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

  return (
    <div
      className={cn('tw-flex tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3', {
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
      </div>
    </div>
  );
}
