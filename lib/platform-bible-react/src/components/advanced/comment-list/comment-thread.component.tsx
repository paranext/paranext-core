import { cn } from '@/utils/shadcn-ui.util';
import { formatReplacementString } from 'platform-bible-utils';
import { useEffect, useMemo, useRef, useState, MouseEvent, useCallback } from 'react';
import { ArrowUp, AtSign, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { Editor } from '@/components/blocks/editor-00/editor';
import { editorStateToHtml, hasEditorContent } from '@/components/blocks/editor-00/editor-utils';
import { SerializedEditorState } from 'lexical';
import { CommentThreadProps } from './comment-list.types';
import { CommentItem } from './comment-item.component';

// SerializedEditorState type is complex, so we use type assertion for the initial empty state
// eslint-disable-next-line no-type-assertion/no-type-assertion
const initialValue = {
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
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
} as unknown as SerializedEditorState;

export function CommentThread({
  comments,
  localizedStrings,
  isSelected = false,
  verseRef,
  assignedUser,
  handleSelectThread,
  threadId,
  threadStatus,
  handleResolveCommentThread,
  handleAddComment,
}: CommentThreadProps) {
  const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue);
  const [isVerseExpanded, setIsVerseExpanded] = useState<boolean>(false);
  const [isVerseOverflowing, setIsVerseOverflowing] = useState<boolean>(false);
  const [showAllReplies, setShowAllReplies] = useState<boolean>(false);
  const [editorKey, setEditorKey] = useState<number>(0);

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

  useEffect(() => {
    setShowAllReplies(false);
  }, [isSelected]);

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

  // For expanded threads with more than 2 replies, show only the last 2 replies
  const visibleReplies = useMemo(() => {
    if (!isSelected || showAllReplies || replyCount <= 2) {
      return replies;
    }
    // Show only the last 2 replies
    return replies.slice(-2);
  }, [replies, replyCount, isSelected, showAllReplies]);

  const hiddenReplyCount = useMemo(() => {
    if (!isSelected || showAllReplies || replyCount <= 2) {
      return 0;
    }
    return replyCount - 2;
  }, [replyCount, isSelected, showAllReplies]);

  const replyText = useMemo(
    () =>
      replyCount === 1
        ? localizedReplies.singleReply
        : formatReplacementString(localizedReplies.multipleReplies, { count: replyCount }),
    [replyCount, localizedReplies.singleReply, localizedReplies.multipleReplies],
  );

  const hiddenReplyText = useMemo(
    () =>
      hiddenReplyCount === 1
        ? localizedReplies.singleReply
        : formatReplacementString(localizedReplies.multipleReplies, { count: hiddenReplyCount }),
    [hiddenReplyCount, localizedReplies.singleReply, localizedReplies.multipleReplies],
  );

  const handleClickThreadText = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (isSelected) {
        // When expanded, prevent parent click only if user is selecting text
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
          event.stopPropagation();
        }
      }
    },
    [isSelected],
  );

  const handleMouseDownThreadText = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (isSelected) {
        // When expanded, always prevent mousedown propagation to allow text selection
        event.stopPropagation();
      }
    },
    [isSelected],
  );

  const handleSubmitComment = useCallback(() => {
    const success = handleAddComment(threadId, editorStateToHtml(editorState));
    if (success) {
      setEditorState(initialValue);
      setEditorKey((prev) => prev + 1);
    }
  }, [editorState, handleAddComment, threadId]);

  return (
    <Card
      role="option"
      aria-selected={isSelected}
      id={threadId}
      className={cn(
        'tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background',
        {
          'tw-cursor-pointer tw-bg-slate-50 hover:tw-shadow-md': !isSelected,
        },
        { 'tw-bg-background': isSelected },
      )}
      onClick={() => {
        handleSelectThread(threadId);
      }}
      tabIndex={-1}
    >
      <CardContent className="tw-flex tw-flex-col tw-gap-2 tw-p-0">
        <div className="tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4">
          {localizedAssignedToText && (
            <Badge
              onClick={handleClickThreadText}
              onMouseDown={handleMouseDownThreadText}
              className="tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input"
            >
              {localizedAssignedToText}
            </Badge>
          )}
          <div className="tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2">
            {/* Allow clicking to expand thread when collapsed, but allow text selection when expanded */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <p
              ref={verseTextRef}
              className={cn(
                'tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground',
                {
                  'tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words':
                    isVerseExpanded,
                },
                { 'tw-whitespace-nowrap': !isVerseExpanded },
              )}
              onClick={handleClickThreadText}
              onMouseDown={handleMouseDownThreadText}
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
                handleClickCommentText={handleClickThreadText}
                handleMouseDownCommentText={handleMouseDownThreadText}
              />
            </div>
            {isSelected && threadStatus !== 'Resolved' && (
              <Button
                variant="ghost"
                size="icon"
                className="tw-shrink-0"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the expand/collapse
                  handleResolveCommentThread(threadId);
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
          {!isSelected && hasEditorContent(editorState) && (
            <Editor
              editorSerializedState={editorState}
              onSerializedChange={(value) => setEditorState(value)}
              placeholder={localizedStrings['%comment_replyOrAssign%']}
            />
          )}
          {isSelected && (
            <>
              {/* Show "hidden replies" separator before the visible replies if there are hidden replies */}
              {hiddenReplyCount > 0 && (
                <div
                  className="tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllReplies(true);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowAllReplies(true);
                    }
                  }}
                >
                  <div className="tw-w-8">
                    <Separator />
                  </div>
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <p className="tw-text-sm tw-text-muted-foreground">{hiddenReplyText}</p>
                    {showAllReplies ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>
              )}
              {visibleReplies.map((reply) => (
                <div key={reply.id}>
                  <CommentItem
                    comment={reply}
                    localizedStrings={localizedStrings}
                    isReply
                    isThreadExpanded={isSelected}
                    handleClickCommentText={handleClickThreadText}
                    handleMouseDownCommentText={handleMouseDownThreadText}
                  />
                </div>
              ))}

              <div
                role="textbox"
                tabIndex={-1}
                className="tw-w-full tw-space-y-2"
                onClick={(e) => e.stopPropagation()}
                onKeyDownCapture={(e) => {
                  if (e.key === 'Enter' && e.shiftKey) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (hasEditorContent(editorState)) {
                      handleSubmitComment();
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                  }
                }}
              >
                <Editor
                  key={editorKey}
                  editorSerializedState={editorState}
                  onSerializedChange={(value) => setEditorState(value)}
                  placeholder={localizedStrings['%comment_replyOrAssign%']}
                  autoFocus
                />
                <div className="tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="tw-flex tw-items-center tw-justify-center tw-rounded-md"
                    disabled={!hasEditorContent(editorState)}
                  >
                    <AtSign />
                  </Button>
                  <Button
                    size="icon"
                    onClick={handleSubmitComment}
                    className="tw-flex tw-items-center tw-justify-center tw-rounded-md"
                    disabled={!hasEditorContent(editorState)}
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
