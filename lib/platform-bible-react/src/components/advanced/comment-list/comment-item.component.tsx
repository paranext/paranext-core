import { useMemo } from 'react';
import { MarkdownRenderer } from '@/components/advanced/extension-marketplace/markdown-renderer.component';
import { cn } from '@/utils/shadcn-ui.util';
import { formatReplacementString } from 'platform-bible-utils';
import { Calendar, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/shadcn-ui/avatar';
import { Badge } from '@/components/shadcn-ui/badge';
import { CommentItemProps } from './comment-list.types';

export function CommentItem({
  comment,
  formatDate,
  isReply = false,
  localizedStrings,
}: CommentItemProps) {
  const displayDate = useMemo(
    () => (formatDate ? formatDate(comment.date) : comment.date.toLocaleDateString()),
    [formatDate, comment.date],
  );

  const userLabel = useMemo(
    () =>
      !isReply && comment.assignedUser
        ? formatReplacementString(
            localizedStrings?.['%comment_assigned_to%'] ?? 'Assigned to {assignedUser}',
            {
              assignedUser: comment.assignedUser,
            },
          )
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
      <div className="tw-flex tw-items-start tw-gap-3">
        <Avatar className={cn(isReply ? 'tw-h-8 tw-w-8' : 'tw-h-10 tw-w-10')}>
          <AvatarFallback className="tw-text-xs tw-font-medium">{initials}</AvatarFallback>
        </Avatar>

        <div className="tw-min-w-0 tw-flex-1">
          <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2">
            <div className="tw-flex tw-items-center tw-gap-2">
              <span className="tw-font-semibold tw-text-foreground">{userLabel}</span>
              {comment.assignedUser && !isReply && (
                <Badge variant="secondary" className="tw-text-xs">
                  <User className="tw-mr-1 tw-h-3 tw-w-3" />
                  Assigned
                </Badge>
              )}
            </div>

            <div className="tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-muted-foreground">
              <Calendar className="tw-h-3 tw-w-3" />
              <time dateTime={comment.date.toISOString()}>{displayDate}</time>
            </div>

            {comment.verseRef && (
              <Badge variant="outline" className="tw-text-xs">
                {comment.verseRef}
              </Badge>
            )}

            {comment.status && (
              <Badge
                variant={comment.status.toLowerCase() === 'resolved' ? 'default' : 'secondary'}
                className="tw-text-xs"
              >
                {comment.status}
              </Badge>
            )}
          </div>

          <div className="tw-mt-2 tw-break-words tw-text-foreground">
            <MarkdownRenderer markdown={comment.contents} />
          </div>
        </div>
      </div>
    </div>
  );
}
