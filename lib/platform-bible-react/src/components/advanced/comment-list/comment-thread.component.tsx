import { cn } from '@/utils/shadcn-ui.util';
import { formatReplacementString } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import { Button } from '@/components/shadcn-ui/button';
import { Separator } from '@/components/shadcn-ui/separator';
import { CommentItem } from './comment-item.component';
import { CommentThreadProps } from './comment-list.types';

export function CommentThread({
  comment,
  formatDate,
  localizedStrings,
  isSelected = false,
}: CommentThreadProps) {
  const [isExpanded, setIsExpanded] = useState(isSelected || (comment.replies?.length ?? 0) === 0);

  const localizedReplies = useMemo(
    () => ({
      singleReply: localizedStrings?.['%comment_thread_single_reply%'] ?? '1 reply',
      multipleReplies: localizedStrings?.['%comment_thread_multiple_replies%'] ?? '{count} replies',
    }),
    [localizedStrings],
  );

  const replyCount = useMemo(() => comment.replies?.length ?? 0, [comment.replies?.length]);
  const hasReplies = useMemo(() => replyCount > 0, [replyCount]);

  const toggleExpanded = useCallback(() => {
    if (hasReplies) {
      setIsExpanded((prev) => !prev);
    }
  }, [hasReplies]);

  const replyText = useMemo(
    () =>
      replyCount === 1
        ? localizedReplies.singleReply
        : formatReplacementString(localizedReplies.multipleReplies, { count: replyCount }),
    [replyCount, localizedReplies.singleReply, localizedReplies.multipleReplies],
  );

  return (
    <Card
      className={cn(
        'tw-w-full tw-transition-all tw-duration-200',
        hasReplies && !isExpanded && 'hover:tw-shadow-md',
      )}
    >
      <CardContent className="tw-p-0">
        <div className="tw-p-4">
          <CommentItem
            comment={comment}
            formatDate={formatDate}
            localizedStrings={localizedStrings}
          />
        </div>

        {hasReplies && (
          <>
            <Separator />
            <div className="tw-px-4 tw-py-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpanded}
                className="tw-w-full tw-justify-between tw-text-muted-foreground hover:tw-text-foreground"
              >
                <div className="tw-flex tw-items-center tw-gap-2">
                  <MessageCircle className="tw-h-4 tw-w-4" />
                  <span>{replyText}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="tw-h-4 tw-w-4" />
                ) : (
                  <ChevronDown className="tw-h-4 tw-w-4" />
                )}
              </Button>

              {isExpanded && (
                <div className="tw-mt-4 tw-space-y-3">
                  {comment.replies?.map((reply) => (
                    <div key={reply.id} className="tw-ml-6 tw-border-l tw-border-border tw-pl-4">
                      <CommentItem
                        comment={reply}
                        formatDate={formatDate}
                        localizedStrings={localizedStrings}
                        isReply
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
