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
  assignedUser,
  handleSelectThread,
  threadId,
  threadStatus,
}: CommentThreadProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [isVerseExpanded, setIsVerseExpanded] = useState<boolean>(false);
  const [isVerseOverflowing, setIsVerseOverflowing] = useState<boolean>(false);

  const firstComment = useMemo(() => comments[0], [comments]);

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
  }, [firstComment.verse]);

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
    // TODO: Handle submitting comment
    console.log('Submit comment:', inputValue);
    setInputValue('');
  }, [inputValue]);

  const handleResolveCommentThread = useCallback(() => {
    // TODO: Handle resolving comment thread
    console.log('Resolve comment thread');
  }, []);

  return (
    <Card
      role="option"
      aria-selected={isSelected}
      id={threadId}
      className={cn(
        'tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background',
        {
          'tw-bg-slate-50 hover:tw-shadow-md': !isSelected,
        },
        { 'tw-bg-background': isSelected },
      )}
      onClick={() => {
        handleSelectThread(threadId);
        // TODO: Scroll thread into view if not fully visible
      }}
      tabIndex={-1}
    >
      <CardContent className="tw-space-y-4 tw-p-0">
        <div className="tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4">
          {localizedAssignedToText && (
            <Badge className="tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input">
              {localizedAssignedToText}
            </Badge>
          )}
          <div className="tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2">
            <p
              ref={verseTextRef}
              className={`tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground ${
                isVerseExpanded
                  ? 'tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words'
                  : 'tw-whitespace-nowrap'
              } tw-flex-1`}
            >
              {verseRef} {firstComment.verse}
            </p>
            {isVerseOverflowing && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the expand/collapse of the thread
                  setIsVerseExpanded(!isVerseExpanded);
                }}
                className="tw-text-muted-foreground tw-transition hover:tw-text-foreground"
                aria-label={isVerseExpanded ? 'Collapse text' : 'Expand text'}
              >
                {isVerseExpanded ? <ChevronUp /> : <ChevronDown />}
              </Button>
            )}
          </div>
          <div className="tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3">
            <div className="tw-flex-1">
              <CommentItem
                comment={firstComment}
                localizedStrings={localizedStrings}
                isThreadExpanded={isSelected}
              />
            </div>
            {isSelected && threadStatus !== 'Resolved' && (
              <Button
                variant="ghost"
                size="icon"
                className="tw-shrink-0"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the expand/collapse
                  handleResolveCommentThread();
                }}
              >
                <Check />
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
                  <CommentItem
                    comment={reply}
                    localizedStrings={localizedStrings}
                    isReply
                    isThreadExpanded={isSelected}
                  />
                </div>
              ))}

              <div
                role="textbox"
                tabIndex={-1}
                className="tw-w-full tw-space-y-2"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                  }
                }}
              >
                <Input
                  className="tw-w-full"
                  placeholder={localizedStrings['%comment_replyOrAssign%']}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="tw-flex tw-items-center tw-justify-center tw-rounded-md"
                    disabled={!inputValue}
                  >
                    <AtSign />
                  </Button>
                  <Button
                    size="icon"
                    onClick={handleSubmit}
                    className="tw-flex tw-items-center tw-justify-center tw-rounded-md"
                    disabled={!inputValue}
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
