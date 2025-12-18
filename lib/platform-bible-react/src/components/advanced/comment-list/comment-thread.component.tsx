import { Editor } from '@/components/advanced/editor/editor';
import {
  editorStateToHtml,
  handleEditorKeyNavigation,
  hasEditorContent,
} from '@/components/advanced/editor/editor-utils';
import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import { cn } from '@/utils/shadcn-ui.util';
import {
  SerializedEditorState,
  SerializedElementNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from 'lexical';
import { ArrowUp, AtSign, ChevronDown, ChevronUp } from 'lucide-react';
import { formatReplacementString } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { Command, CommandItem, CommandList } from '@/components/shadcn-ui/command';
import { CommentItem } from './comment-item.component';
import { AddCommentToThreadOptions, CommentThreadProps } from './comment-list.types';
import { getAssignedUserDisplayName } from './comment-list.utils';

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

/**
 * Represents a thread of comments
 *
 * @props CommentThreadProps
 */
export function CommentThread({
  classNameForVerseText,
  comments,
  localizedStrings,
  isSelected = false,
  verseRef,
  assignedUser,
  currentUser,
  handleSelectThread,
  threadId,
  threadStatus,
  handleAddCommentToThread,
  handleUpdateComment,
  handleDeleteComment,
  assignableUsers,
  canUserAddCommentToThread,
  canUserAssignThreadCallback,
  canUserResolveThreadCallback,
  canUserEditOrDeleteCommentCallback,
}: CommentThreadProps) {
  const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue);
  const [isVerseExpanded, setIsVerseExpanded] = useState<boolean>(false);
  const [isVerseOverflowing, setIsVerseOverflowing] = useState<boolean>(false);
  const [showAllReplies, setShowAllReplies] = useState<boolean>(false);
  const [isAnyCommentEditing, setIsAnyCommentEditing] = useState<boolean>(false);
  const [isAssignPopoverOpen, setIsAssignPopoverOpen] = useState<boolean>(false);
  const [pendingAssignedUser, setPendingAssignedUser] = useState<string | undefined>(undefined);
  const [canAssign, setCanAssign] = useState<boolean>(false);
  const [canResolve, setCanResolve] = useState<boolean>(false);
  const [commentEditDeletePermissions, setCommentEditDeletePermissions] = useState<
    Map<string, boolean>
  >(new Map());

  // Check async permissions when thread is selected
  useEffect(() => {
    let isMounted = true;

    if (!isSelected) {
      setCanAssign(false);
      setCanResolve(false);
      setCommentEditDeletePermissions(new Map());
      return undefined;
    }

    const checkPermissions = async () => {
      const assignResult = canUserAssignThreadCallback
        ? await canUserAssignThreadCallback(threadId)
        : false;

      if (!isMounted) return;

      const resolveResult = canUserResolveThreadCallback
        ? await canUserResolveThreadCallback(threadId)
        : false;

      if (!isMounted) return;

      setCanAssign(assignResult);
      setCanResolve(resolveResult);
    };

    checkPermissions();
    return () => {
      isMounted = false;
    };
  }, [isSelected, threadId, canUserAssignThreadCallback, canUserResolveThreadCallback]);

  const activeComments = useMemo(() => comments.filter((comment) => !comment.deleted), [comments]);

  // Check edit/delete permissions for all comments when thread is selected or comments change
  useEffect(() => {
    let isMounted = true;

    if (!isSelected || !canUserEditOrDeleteCommentCallback) {
      setCommentEditDeletePermissions(new Map());
      return undefined;
    }

    const checkCommentPermissions = async () => {
      const permissionsMap = new Map<string, boolean>();

      await Promise.all(
        activeComments.map(async (comment) => {
          const canEdit = await canUserEditOrDeleteCommentCallback(comment.id);
          if (isMounted) {
            permissionsMap.set(comment.id, canEdit);
          }
        }),
      );

      if (isMounted) {
        setCommentEditDeletePermissions(permissionsMap);
      }
    };

    checkCommentPermissions();
    return () => {
      isMounted = false;
    };
  }, [isSelected, activeComments, canUserEditOrDeleteCommentCallback]);

  const firstComment = useMemo(() => activeComments[0], [activeComments]);

  // </p> expects null and not undefined
  // eslint-disable-next-line no-null/no-null
  const verseTextRef = useRef<HTMLParagraphElement | null>(null);
  const clearEditorRef = useRef<(() => void) | undefined>(undefined);

  const clearEditor = useCallback(() => {
    clearEditorRef.current?.();
    setEditorState(initialValue);
  }, []);

  useEffect(() => {
    const verseTextElement = verseTextRef.current;
    if (!verseTextElement) return;

    const checkOverflow = () => {
      setIsVerseOverflowing(verseTextElement.scrollWidth > verseTextElement.clientWidth);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [firstComment?.verse]);

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

  const localizedAssignedToText = useMemo(() => {
    if (assignedUser === undefined) {
      return undefined;
    }
    if (assignedUser === '') {
      return localizedStrings['%comment_assign_unassigned%'] ?? 'Unassigned';
    }
    const displayName = getAssignedUserDisplayName(assignedUser, localizedStrings);
    return formatReplacementString(localizedStrings['%comment_assigned_to%'], {
      assignedUser: displayName,
    });
  }, [assignedUser, localizedStrings]);

  const replies = useMemo(() => activeComments.slice(1), [activeComments]);
  const replyCount = useMemo(() => replies.length ?? 0, [replies.length]);
  const hasReplies = useMemo(() => replyCount > 0, [replyCount]);

  // For expanded threads with more than 2 replies, show only the last 2 replies
  const visibleReplies = useMemo(() => {
    if (showAllReplies || replyCount <= 2) {
      return replies;
    }
    // Show only the last 2 replies
    return replies.slice(-2);
  }, [replies, replyCount, showAllReplies]);

  const hiddenReplyCount = useMemo(() => {
    if (showAllReplies || replyCount <= 2) {
      return 0;
    }
    return replyCount - 2;
  }, [replyCount, showAllReplies]);

  const replyText = useMemo(
    () =>
      replyCount === 1
        ? localizedReplies.singleReply
        : formatReplacementString(localizedReplies.multipleReplies, { count: replyCount }),
    [replyCount, localizedReplies],
  );

  const hiddenReplyText = useMemo(
    () =>
      hiddenReplyCount === 1
        ? localizedReplies.singleReply
        : formatReplacementString(localizedReplies.multipleReplies, { count: hiddenReplyCount }),
    [hiddenReplyCount, localizedReplies],
  );

  const handleSubmitComment = useCallback(async () => {
    const contents = hasEditorContent(editorState) ? editorStateToHtml(editorState) : undefined;

    // If there's a pending assignment, include it
    if (pendingAssignedUser !== undefined) {
      const success = await handleAddCommentToThread({
        threadId,
        contents,
        assignedUser: pendingAssignedUser,
      });
      if (success) {
        setPendingAssignedUser(undefined);
        if (contents) {
          clearEditor();
        }
      }
      return;
    }
    // Otherwise, just add a comment if there's content
    if (contents) {
      const newCommentId = await handleAddCommentToThread({ threadId, contents });
      if (newCommentId) {
        clearEditor();
      }
    }
  }, [clearEditor, editorState, handleAddCommentToThread, pendingAssignedUser, threadId]);

  const handleAddCommentToThreadWithContents = useCallback(
    async (options: AddCommentToThreadOptions) => {
      const contents = hasEditorContent(editorState) ? editorStateToHtml(editorState) : undefined;
      const success = await handleAddCommentToThread({
        ...options,
        contents,
        assignedUser: pendingAssignedUser ?? options.assignedUser,
      });
      if (success && contents) {
        clearEditor();
      }
      if (success && pendingAssignedUser !== undefined) {
        setPendingAssignedUser(undefined);
      }
      return success;
    },
    [clearEditor, editorState, handleAddCommentToThread, pendingAssignedUser],
  );

  return (
    <Card
      role="option"
      aria-selected={isSelected}
      id={threadId}
      className={cn(
        'tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background',
        { 'tw-cursor-pointer hover:tw-shadow-md': !isSelected },
        {
          'tw-bg-primary-foreground': !isSelected && threadStatus !== 'Resolved',
          'tw-bg-background': isSelected && threadStatus !== 'Resolved',
          'tw-bg-muted': threadStatus === 'Resolved',
        },
      )}
      onClick={() => {
        handleSelectThread(threadId);
      }}
      tabIndex={-1}
    >
      <CardContent className="tw-flex tw-flex-col tw-gap-2 tw-p-0">
        <div className="tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4">
          {localizedAssignedToText && (
            <Badge className="tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input">
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
            >
              {verseRef}
              <span className={classNameForVerseText}>
                {firstComment.contextBefore}
                <span className="tw-font-bold">{firstComment.selectedText}</span>
                {firstComment.contextAfter}
              </span>
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
          <CommentItem
            comment={firstComment}
            localizedStrings={localizedStrings}
            isThreadExpanded={isSelected}
            threadStatus={threadStatus}
            handleAddCommentToThread={handleAddCommentToThreadWithContents}
            handleUpdateComment={handleUpdateComment}
            handleDeleteComment={handleDeleteComment}
            onEditingChange={setIsAnyCommentEditing}
            canEditOrDelete={commentEditDeletePermissions.get(firstComment.id) ?? false}
            canUserResolveThread={canResolve}
          />
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
          {/* Show Editor on an unselected thread when it has drafted content */}
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
                    handleUpdateComment={handleUpdateComment}
                    handleDeleteComment={handleDeleteComment}
                    onEditingChange={setIsAnyCommentEditing}
                    canEditOrDelete={commentEditDeletePermissions.get(reply.id) ?? false}
                  />
                </div>
              ))}

              {/* Only show main Editor if user can add comments, no comment is being edited, or if it has draft content */}
              {canUserAddCommentToThread !== false &&
                (!isAnyCommentEditing || hasEditorContent(editorState)) && (
                  <div
                    role="textbox"
                    tabIndex={-1}
                    className="tw-w-full tw-space-y-2"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDownCapture={(e) => {
                      if (e.key === 'Enter' && e.shiftKey) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (hasEditorContent(editorState) || pendingAssignedUser !== undefined) {
                          handleSubmitComment();
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
                      placeholder={
                        threadStatus === 'Resolved'
                          ? localizedStrings['%comment_reopenResolved%']
                          : localizedStrings['%comment_replyOrAssign%']
                      }
                      autoFocus
                      onClear={(clearFn) => {
                        clearEditorRef.current = clearFn;
                      }}
                    />
                    <div className="tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2">
                      {pendingAssignedUser !== undefined && (
                        <span className="tw-flex-1 tw-text-sm tw-text-muted-foreground">
                          {formatReplacementString(
                            localizedStrings['%comment_assigning_to%'] ??
                              'Assigning to: {assignedUser}',
                            {
                              assignedUser: getAssignedUserDisplayName(
                                pendingAssignedUser,
                                localizedStrings,
                              ),
                            },
                          )}
                        </span>
                      )}
                      <Popover open={isAssignPopoverOpen} onOpenChange={setIsAssignPopoverOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="tw-flex tw-items-center tw-justify-center tw-rounded-md"
                            disabled={
                              !canAssign ||
                              !assignableUsers ||
                              assignableUsers.length === 0 ||
                              !assignableUsers.includes(currentUser)
                            }
                            aria-label="Assign user"
                          >
                            <AtSign />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="tw-w-auto tw-p-0"
                          align="end"
                          onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                              e.stopPropagation();
                              setIsAssignPopoverOpen(false);
                            }
                          }}
                        >
                          <Command>
                            <CommandList>
                              {assignableUsers?.map((user) => (
                                <CommandItem
                                  key={user || 'unassigned'}
                                  onSelect={() => {
                                    if (user !== assignedUser) {
                                      setPendingAssignedUser(user);
                                    } else {
                                      setPendingAssignedUser(undefined);
                                    }
                                    setIsAssignPopoverOpen(false);
                                  }}
                                  className="tw-flex tw-items-center"
                                >
                                  <span>{getAssignedUserDisplayName(user, localizedStrings)}</span>
                                </CommandItem>
                              ))}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <Button
                        size="icon"
                        onClick={handleSubmitComment}
                        className="tw-flex tw-items-center tw-justify-center tw-rounded-md"
                        disabled={
                          !hasEditorContent(editorState) && pendingAssignedUser === undefined
                        }
                        aria-label="Submit comment"
                      >
                        <ArrowUp />
                      </Button>
                    </div>
                  </div>
                )}
            </>
          )}
        </>
      </CardContent>
    </Card>
  );
}
