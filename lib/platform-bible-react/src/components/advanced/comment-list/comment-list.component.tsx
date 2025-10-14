import { cn } from '@/utils/shadcn-ui.util';
import { CommentListProps } from './comment-list.types';
import { CommentThread } from './comment-thread.component';

export function CommentList({
  className = '',
  formatDate,
  comments,
  localizedStrings,
}: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div
        className={cn(
          'tw-w-full tw-max-w-screen-md tw-py-8 tw-text-center tw-text-muted-foreground',
          className,
        )}
      >
        {localizedStrings?.['%no_comments%'] ?? 'No comments yet'}
      </div>
    );
  }

  return (
    <div
      role="listbox"
      aria-label="Comments"
      className={cn('tw-flex tw-w-full tw-max-w-screen-md tw-flex-col', className)}
    >
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <CommentThread
            comment={comment}
            formatDate={formatDate}
            localizedStrings={localizedStrings}
          />
          {index < comments.length - 1 && <div className="tw-mt-4" />}
        </div>
      ))}
    </div>
  );
}
