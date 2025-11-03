import { cn } from '@/utils/shadcn-ui.util';
import { formatReplacementString } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, AtSign, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import { Badge } from '@/components/shadcn-ui/badge';
import { Input } from '@/components/shadcn-ui/input';
import { Button } from '@/components/shadcn-ui/button';
import { CommentItem } from './comment-item.component';
import { CommentThreadProps } from './comment-list.types';

export function CommentThread({
  comments,
  localizedStrings,
  isSelected = false,
  verseRef,
  verse,
  assignedUser,
  handleSelectThread,
  threadId,
}: CommentThreadProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [isVerseExpanded, setIsVerseExpanded] = useState<boolean>(false);
  const [isVerseOverflowing, setIsVerseOverflowing] = useState<boolean>(false);

  // </p> expects null and not undefined
  // eslint-disable-next-line no-null/no-null
  const verseTextRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const verseTextElement = verseTextRef.current;
    if (!verseTextElement) return;

    const checkOverflow = () => {
      setIsVerseOverflowing(verseTextElement.scrollWidth > verseTextElement.clientWidth);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [verse]);

  const localizedReplies = useMemo(
    () => ({
      singleReply: localizedStrings['%comment_thread_single_reply%'],
      multipleReplies: localizedStrings['%comment_thread_multiple_replies%'],
    }),
    [localizedStrings],
  );

  const localizedAssignedToText = useMemo(
    () =>
      assignedUser
        ? formatReplacementString(localizedStrings['%comment_assigned_to%'], { assignedUser })
        : undefined,
    [assignedUser, localizedStrings],
  );

  const firstComment = useMemo(() => comments[0], [comments]);
  const replies = useMemo(() => comments.slice(1), [comments]);
  const replyCount = useMemo(() => replies.length ?? 0, [replies.length]);
  const hasReplies = useMemo(() => replyCount > 0, [replyCount]);

  const replyText = useMemo(
    () =>
      replyCount === 1
        ? localizedReplies.singleReply
        : formatReplacementString(localizedReplies.multipleReplies, { count: replyCount }),
    [replyCount, localizedReplies.singleReply, localizedReplies.multipleReplies],
  );

  const handleSubmit = useCallback(() => {
    console.log('Submit comment:', inputValue);
    setInputValue('');
  }, [inputValue]);

  const handleResolveCommentThread = useCallback(() => {
    console.log('Resolve comment thread');
  }, []);

  return (
    <Card
      className={cn(
        'tw-w-full tw-rounded-none tw-p-4 tw-transition-all tw-duration-200',
        hasReplies && !isSelected && 'hover:tw-shadow-md',
      )}
      onClick={() => {
        handleSelectThread(threadId);
        // TODO: Scroll thread into view if not fully visible
      }}
    >
      <CardContent className="tw-space-y-4 tw-p-0">
        <div className="tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4">
          {localizedAssignedToText && (
            <Badge className="tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input">
              {localizedAssignedToText}
            </Badge>
          )}
          <div className="tw-flex tw-max-w-full tw-flex-wrap tw-items-start tw-gap-2">
            <p
              ref={verseTextRef}
              className={`tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground ${
                isVerseExpanded
                  ? 'tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words'
                  : 'tw-whitespace-nowrap'
              } tw-flex-1`}
            >
              {verseRef} {verse}
            </p>
            {isVerseOverflowing && (
              <button
                onClick={() => setIsVerseExpanded(!isVerseExpanded)}
                className="tw-text-muted-foreground tw-transition hover:tw-text-foreground"
                aria-label={isVerseExpanded ? 'Collapse text' : 'Expand text'}
                type="button"
              >
                {isVerseExpanded ? (
                  <ChevronUp className="tw-h-5 tw-w-5" />
                ) : (
                  <ChevronDown className="tw-h-5 tw-w-5" />
                )}
              </button>
            )}
          </div>
          <div className="tw-flex tw-flex-row tw-justify-between">
            <CommentItem comment={firstComment} localizedStrings={localizedStrings} />
            {isSelected && (
              <Button
                className="tw-p-1"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the expand/collapse
                  handleResolveCommentThread();
                }}
                variant="ghost"
                size="icon"
              >
                <Check className="tw-h-6 tw-w-6" />
              </Button>
            )}
          </div>
        </div>
        <>
          {hasReplies && !isSelected && (
            <div className="tw-flex tw-items-center tw-gap-5">
              <div className="tw-w-8">
                <Separator />
              </div>
              <p className="tw-text-sm tw-text-muted-foreground">{replyText}</p>
            </div>
          )}
          {isSelected && (
            <>
              {replies.map((reply) => (
                <div key={reply.id}>
                  <CommentItem comment={reply} localizedStrings={localizedStrings} isReply />
                </div>
              ))}

              <div
                role="textbox"
                tabIndex={0}
                className="tw-w-full tw-space-y-2"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <Input
                  className="tw-w-full"
                  placeholder={localizedStrings['%comment_replyOrAssign%']}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2">
                  <Button
                    variant="outline"
                    className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-md"
                  >
                    <AtSign />
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-md"
                  >
                    <ArrowUp />
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      </CardContent>
    </Card>
  );
}
