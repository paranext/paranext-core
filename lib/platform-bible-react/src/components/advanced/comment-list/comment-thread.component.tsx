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
import { cn } from '@/utils/shadcn-ui/utils';
import {
  SerializedEditorState,
  SerializedElementNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from 'lexical';
import { ArrowUp, AtSign, Check, ChevronDown, ChevronUp, Mail, MailOpen } from 'lucide-react';
import { formatReplacementString } from 'platform-bible-utils';
import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { Command, CommandItem, CommandList } from '@/components/shadcn-ui/command';
import { CommentItem } from './comment-item.component';
import { AddCommentToThreadOptions, CommentThreadProps } from './comment-list.types';
import { ConflictNoteCard } from './conflict-note-card.component';
import {
  ConflictResolution,
  ConflictResolutionOptions,
  ConflictResolutionOutcome,
} from './conflict-note-card.types';
import { didPressCtrlOrCmdEnter, getAssignedUserDisplayName } from './comment-list.utils';

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
  thread,
  threadStatus,
  handleAddCommentToThread,
  handleUpdateComment,
  handleDeleteComment,
  handleReadStatusChange,
  assignableUsers,
  canUserAddCommentToThread,
  canUserAssignThreadCallback,
  canUserResolveThreadCallback,
  canUserEditOrDeleteCommentCallback,
  isRead: isReadProp = false,
  autoReadDelay = 5,
  onVerseRefClick,
  initialAssignedUser,
  handleResolveConflict,
  getConflictResolutionOptionsCallback,
}: CommentThreadProps) {
  const [pendingCommentEditorState, setPendingCommentEditorState] =
    useState<SerializedEditorState>(initialValue);
  const [pendingCommentAssignedUser, setPendingCommentAssignedUser] = useState<
    string | undefined
  >();
  const [lastSubmittedAssignedUser, setLastSubmittedAssignedUser] = useState<string | undefined>();
  const isVerseExpanded = isSelected;
  const [showAllReplies, setShowAllReplies] = useState<boolean>(false);
  const [isAnyCommentEditing, setIsAnyCommentEditing] = useState<boolean>(false);
  const [isAssignPopoverOpen, setIsAssignPopoverOpen] = useState<boolean>(false);
  const [canAssign, setCanAssign] = useState<boolean>(false);
  const [canResolve, setCanResolve] = useState<boolean>(false);
  const [isRead, setIsRead] = useState<boolean>(isReadProp);
  const [manuallyUnread, setManuallyUnread] = useState<boolean>(false);
  const autoReadTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [commentEditDeletePermissions, setCommentEditDeletePermissions] = useState<
    Map<string, boolean>
  >(new Map());

  const isConflictThread = thread.type === 'Conflict';
  const [conflictOptions, setConflictOptions] = useState<ConflictResolutionOptions>('none');
  const [selectedResolution, setSelectedResolution] = useState<ConflictResolution>('accept');
  const [isResolvingConflict, setIsResolvingConflict] = useState<boolean>(false);

  // Check resolve permission on mount so the button can appear on hover
  useEffect(() => {
    let isPromiseCurrent = true;

    const checkResolvePermission = async () => {
      const resolveResult = canUserResolveThreadCallback
        ? await canUserResolveThreadCallback(threadId)
        : false;

      if (!isPromiseCurrent) return;
      setCanResolve(resolveResult);
    };

    checkResolvePermission();
    return () => {
      isPromiseCurrent = false;
    };
  }, [threadId, canUserResolveThreadCallback]);

  // Which conflict resolution actions the user may take; re-checked when the thread status
  // changes (resolve/reopen both change what is available).
  useEffect(() => {
    let isPromiseCurrent = true;
    if (!isConflictThread) return undefined;

    const checkConflictOptions = async () => {
      const options = getConflictResolutionOptionsCallback
        ? await getConflictResolutionOptionsCallback(threadId)
        : 'none';
      if (!isPromiseCurrent) return;
      setConflictOptions(options);
    };

    checkConflictOptions();
    return () => {
      isPromiseCurrent = false;
    };
  }, [isConflictThread, threadId, threadStatus, getConflictResolutionOptionsCallback]);

  // Check remaining async permissions when thread is selected
  useEffect(() => {
    let isPromiseCurrent = true;

    if (!isSelected) {
      setCanAssign(false);
      setCommentEditDeletePermissions(new Map());
      return undefined;
    }

    const checkPermissions = async () => {
      const assignResult = canUserAssignThreadCallback
        ? await canUserAssignThreadCallback(threadId)
        : false;

      if (!isPromiseCurrent) return;
      setCanAssign(assignResult);
    };

    checkPermissions();
    return () => {
      isPromiseCurrent = false;
    };
  }, [isSelected, threadId, canUserAssignThreadCallback]);

  // Pre-populate the pending assignee when the thread opens, using the last assignee from the
  // parent. Gated on `canAssign` so users without assign permission on this thread don't see the
  // "Assigning to" indicator or trigger an unauthorized assignment on submit — `canAssign` is
  // resolved asynchronously so the pre-population waits for that check to succeed. Clears the
  // value when the thread collapses, and also clears any auto-populated value if `canAssign`
  // later flips back to false so stale pending assignments can't leak into submissions.
  //
  // Four states:
  //   IDLE         → thread collapsed; transitions to PENDING when isSelected becomes true
  //   PENDING      → thread open, waiting for canAssign or conditions not yet met;
  //                  transitions to AUTO_POPULATED or back to IDLE on deselect
  //   AUTO_POPULATED → pre-filled from parent's lastAssignedUser, not yet overridden;
  //                  transitions to USER_SELECTED on popover pick, PENDING if canAssign revoked,
  //                  or IDLE on deselect
  //   USER_SELECTED → user explicitly chose an assignee; further initialAssignedUser changes are
  //                  ignored; transitions to IDLE on deselect
  type AssigneeSelectionState = 'idle' | 'pending' | 'auto-populated' | 'user-selected';
  const assigneeSelectionStateRef = useRef<AssigneeSelectionState>('idle');
  useEffect(() => {
    if (!isSelected) {
      if (assigneeSelectionStateRef.current !== 'idle') {
        setPendingCommentAssignedUser(undefined);
        setLastSubmittedAssignedUser(undefined);
        assigneeSelectionStateRef.current = 'idle';
      }
      return;
    }

    if (assigneeSelectionStateRef.current === 'idle') {
      assigneeSelectionStateRef.current = 'pending';
    }

    if (canAssign) {
      if (
        assigneeSelectionStateRef.current === 'pending' &&
        initialAssignedUser !== undefined &&
        // Skip pre-population if the thread is already assigned to this user — doing so
        // would show "Assigning to: Alice" and enable the submit button for a no-op call.
        initialAssignedUser !== assignedUser
      ) {
        setPendingCommentAssignedUser(initialAssignedUser);
        assigneeSelectionStateRef.current = 'auto-populated';
      }
    } else if (assigneeSelectionStateRef.current === 'auto-populated') {
      // Permission was granted long enough to pre-populate but has now been revoked (for example,
      // the async check resolved to false, or the thread-specific permission changed). Clear the
      // stale value so the submit handler doesn't send an unauthorized assignment.
      setPendingCommentAssignedUser(undefined);
      assigneeSelectionStateRef.current = 'pending';
    }
  }, [isSelected, initialAssignedUser, canAssign, assignedUser]);

  const activeComments = useMemo(() => comments.filter((comment) => !comment.deleted), [comments]);

  // Check edit/delete permissions for all comments when thread is selected or comments change
  useEffect(() => {
    let isPromiseCurrent = true;

    if (!isSelected || !canUserEditOrDeleteCommentCallback) {
      setCommentEditDeletePermissions(new Map());
      return undefined;
    }

    const checkCommentPermissions = async () => {
      const permissionsMap = new Map<string, boolean>();

      await Promise.all(
        activeComments.map(async (comment) => {
          const canEdit = await canUserEditOrDeleteCommentCallback(comment.id);
          if (isPromiseCurrent) {
            permissionsMap.set(comment.id, canEdit);
          }
        }),
      );

      if (isPromiseCurrent) {
        setCommentEditDeletePermissions(permissionsMap);
      }
    };

    checkCommentPermissions();
    return () => {
      isPromiseCurrent = false;
    };
  }, [isSelected, activeComments, canUserEditOrDeleteCommentCallback]);

  const firstComment = useMemo(() => activeComments[0], [activeComments]);

  // Which way an already-resolved conflict was resolved, read off the resolution comment's
  // conflictResolutionAction (scanning last-to-first for the first one present, mirroring how the
  // backend records it on the appended comment): 'replaced' -> reject, 'merged' -> merged. If none
  // is present but the thread is Resolved, it was an accept (which writes no action). Undefined for
  // non-conflict threads and for conflicts that are not yet resolved. Consumed by ConflictNoteCard
  // only in its read-only ('none') state.
  const resolvedResolution = useMemo<ConflictResolutionOutcome | undefined>(() => {
    if (!isConflictThread) return undefined;
    for (let i = activeComments.length - 1; i >= 0; i -= 1) {
      const action = activeComments[i].conflictResolutionAction;
      if (action === 'replaced') return 'reject';
      if (action === 'merged') return 'merged';
    }
    return threadStatus === 'Resolved' ? 'accept' : undefined;
  }, [isConflictThread, activeComments, threadStatus]);

  // </p> expects null and not undefined
  // eslint-disable-next-line no-null/no-null
  const verseTextRef = useRef<HTMLParagraphElement | null>(null);
  const clearEditorRef = useRef<(() => void) | undefined>(undefined);

  const clearEditor = useCallback(() => {
    clearEditorRef.current?.();
    setPendingCommentEditorState(initialValue);
  }, []);

  const toggleRead = useCallback(() => {
    const newIsRead = !isRead;
    setIsRead(newIsRead);
    if (!newIsRead) {
      setManuallyUnread(true);
    } else {
      setManuallyUnread(false);
    }
    handleReadStatusChange?.(threadId, newIsRead);
  }, [isRead, handleReadStatusChange, threadId]);

  useEffect(() => {
    setShowAllReplies(false);
  }, [isSelected]);

  useEffect((): void | (() => void) => {
    if (isSelected && !isRead && !manuallyUnread) {
      const timer = setTimeout(() => {
        setIsRead(true);
        handleReadStatusChange?.(threadId, true);
      }, autoReadDelay * 1000);
      autoReadTimerRef.current = timer;
      return () => clearTimeout(timer);
    }
    if (autoReadTimerRef.current) {
      clearTimeout(autoReadTimerRef.current);
      autoReadTimerRef.current = undefined;
    }
  }, [isSelected, isRead, manuallyUnread, autoReadDelay, threadId, handleReadStatusChange]);

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

  // If the thread gets unselected and a comment other than the first is being edited, the comment
  // being edited was removed from the screen, so note that no comment is being edited
  // Note: this means we will lose some editor content. May need to be fixed with https://paratextstudio.atlassian.net/browse/PT-3725
  useEffect(() => {
    // If there are replies and a comment is being edited, the edited comment is not the first
    // comment, so reset editing state when thread is unselected
    if (!isSelected && isAnyCommentEditing && hasReplies) {
      setIsAnyCommentEditing(false);
    }
  }, [isSelected, isAnyCommentEditing, hasReplies]);

  const handleSubmitComment = useCallback(
    async (e?: MouseEvent) => {
      if (e) e.stopPropagation();

      const contents = hasEditorContent(pendingCommentEditorState)
        ? editorStateToHtml(pendingCommentEditorState)
        : undefined;

      // If there's a pending assignment, include it
      if (pendingCommentAssignedUser !== undefined) {
        const success = await handleAddCommentToThread({
          threadId,
          contents,
          assignedUser: pendingCommentAssignedUser,
        });
        if (success) {
          // Don't clear pendingCommentAssignedUser here — the feature intentionally persists the
          // last assignee for subsequent replies, so the initialAssignedUser effect will re-populate
          // it after setLastAssignedUser propagates. Clearing it here causes a brief flicker where
          // the "Assigning to:" indicator disappears then immediately reappears.
          // Instead, track what was submitted so the button stays disabled until the user makes
          // a new change (new content or a different assignee selection).
          setLastSubmittedAssignedUser(pendingCommentAssignedUser);
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
    },
    [
      clearEditor,
      pendingCommentEditorState,
      handleAddCommentToThread,
      pendingCommentAssignedUser,
      threadId,
    ],
  );

  const handleAddCommentToThreadWithContents = useCallback(
    async (options: AddCommentToThreadOptions) => {
      const contents = hasEditorContent(pendingCommentEditorState)
        ? editorStateToHtml(pendingCommentEditorState)
        : undefined;
      // Only apply the auto-populated pending assignee for new comments, not for
      // status changes (resolve/reopen) where it would silently reassign the thread
      const resolvedAssignedUser = options.status
        ? options.assignedUser
        : (pendingCommentAssignedUser ?? options.assignedUser);
      const success = await handleAddCommentToThread({
        ...options,
        contents,
        assignedUser: resolvedAssignedUser,
      });
      if (success) {
        if (resolvedAssignedUser !== undefined) {
          // Mirror what handleSubmitComment does so the "Assigning to:" indicator hides and the
          // submit button disables after a successful submission via this path (e.g. from CommentItem).
          setLastSubmittedAssignedUser(resolvedAssignedUser);
        }
        if (contents) {
          clearEditor();
        }
      }
      // Don't clear pendingCommentAssignedUser here — the feature intentionally persists the
      // last assignee for subsequent replies, so the initialAssignedUser effect will re-populate
      // it after setLastAssignedUser propagates. Clearing it here causes a brief flicker where
      // the "Assigning to:" indicator disappears then immediately reappears.
      return success;
    },
    [clearEditor, pendingCommentEditorState, handleAddCommentToThread, pendingCommentAssignedUser],
  );

  const handleResolveConflictClick = useCallback(
    async (resolution: ConflictResolution) => {
      if (!handleResolveConflict) return;
      setIsResolvingConflict(true);
      try {
        const success = await handleResolveConflict(threadId, resolution);
        // Lock the controls immediately on success; the data-update re-fetch confirms via
        // threadStatus. Prevents a double resolve during the stale-props window (and stays
        // correct even if the fire-and-forget update event never arrives).
        if (success) setConflictOptions('none');
      } finally {
        // Always clear the busy state, even if a consumer-supplied handleResolveConflict rejects
        // (contract violation) — otherwise the card would stay locked in its isResolving state.
        setIsResolvingConflict(false);
      }
    },
    [handleResolveConflict, threadId],
  );

  // If all comments have been deleted there is nothing to render
  if (activeComments.length === 0) return undefined;

  return (
    <Card
      role="option"
      aria-selected={isSelected}
      id={threadId}
      className={cn(
        'tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background',
        { 'tw:cursor-pointer tw:hover:shadow-md': !isSelected },
        {
          'tw:bg-primary-foreground': !isSelected && threadStatus !== 'Resolved' && isRead,
          'tw:bg-background': isSelected && threadStatus !== 'Resolved' && isRead,
          'tw:bg-muted': threadStatus === 'Resolved',
          'tw:bg-accent': !isRead && !isSelected && threadStatus !== 'Resolved',
        },
      )}
      onClick={() => {
        handleSelectThread(threadId);
      }}
      tabIndex={-1}
    >
      <CardContent className="tw:flex tw:flex-col tw:gap-2 tw:p-0">
        <div className="tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4">
          <div className="tw:flex tw:items-center tw:gap-2">
            {localizedAssignedToText && (
              <Badge className="tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input">
                {localizedAssignedToText}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                toggleRead();
              }}
              className="tw:text-muted-foreground tw:transition tw:hover:text-foreground"
              aria-label={
                isRead
                  ? (localizedStrings['%comment_aria_mark_as_unread%'] ?? 'Mark as unread')
                  : (localizedStrings['%comment_aria_mark_as_read%'] ?? 'Mark as read')
              }
            >
              {isRead ? <MailOpen /> : <Mail />}
            </Button>
            {canResolve && threadStatus !== 'Resolved' && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'tw:ms-auto',
                  'tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10',
                  'tw:opacity-0 tw:group-hover:opacity-100',
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  // A conflict thread's generic status-change path
                  // (`handleAddCommentToThreadWithContents({ status: 'Resolved' })`) is blocked by
                  // the backend, so route conflicts through the same conflict-resolve handler
                  // passed to ConflictNoteCard's `onResolve`, defaulting to 'accept' (keep the
                  // current/accepted text) since this button offers no choice of resolution.
                  if (isConflictThread) {
                    handleResolveConflictClick('accept');
                  } else {
                    handleAddCommentToThreadWithContents({
                      threadId,
                      status: 'Resolved',
                    });
                  }
                }}
                aria-label={localizedStrings['%comment_aria_resolve_thread%'] ?? 'Resolve thread'}
              >
                <Check className="tw:h-4 tw:w-4" />
              </Button>
            )}
          </div>
          <div className="tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2">
            {/* Allow clicking to expand thread when collapsed, but allow text selection when expanded */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <p
              ref={verseTextRef}
              className={cn(
                'tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground',
                {
                  'tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words':
                    isVerseExpanded,
                },
                { 'tw:whitespace-nowrap': !isVerseExpanded },
              )}
            >
              {verseRef && onVerseRefClick ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    onVerseRefClick(thread);
                  }}
                >
                  {verseRef}
                </Button>
              ) : (
                verseRef
              )}
              <span className={classNameForVerseText}>
                {firstComment.contextBefore}
                <span className="tw:font-bold">{firstComment.selectedText}</span>
                {firstComment.contextAfter}
              </span>
            </p>
          </div>
          {isConflictThread && isSelected ? (
            <ConflictNoteCard
              comment={firstComment}
              localizedStrings={localizedStrings}
              selectedResolution={selectedResolution}
              onResolutionChange={setSelectedResolution}
              availableActions={threadStatus === 'Resolved' ? 'none' : conflictOptions}
              resolvedResolution={resolvedResolution}
              onResolve={handleResolveConflictClick}
              isResolving={isResolvingConflict}
            />
          ) : (
            <CommentItem
              comment={firstComment}
              localizedStrings={localizedStrings}
              isThreadExpanded={isSelected}
              threadStatus={threadStatus}
              handleAddCommentToThread={handleAddCommentToThreadWithContents}
              handleUpdateComment={handleUpdateComment}
              handleDeleteComment={handleDeleteComment}
              onEditingChange={setIsAnyCommentEditing}
              canEditOrDelete={
                (!isAnyCommentEditing && commentEditDeletePermissions.get(firstComment.id)) ?? false
              }
              canUserResolveThread={canResolve}
            />
          )}
        </div>
        <>
          {hasReplies && !isSelected && (
            <div className="tw:flex tw:items-center tw:gap-5">
              <div className="tw:w-8">
                <Separator />
              </div>
              <p className="tw:text-sm tw:text-muted-foreground">{replyText}</p>
            </div>
          )}
          {/* Show Editor on an unselected thread when it has drafted content */}
          {!isSelected && hasEditorContent(pendingCommentEditorState) && (
            <Editor
              editorSerializedState={pendingCommentEditorState}
              onSerializedChange={(value) => setPendingCommentEditorState(value)}
              placeholder={localizedStrings['%comment_replyOrAssign%']}
            />
          )}
          {isSelected && (
            <>
              {/* Extra vertical spacing between the conflict card and its reply comments
                  (Storybook feedback item 4). Only rendered when the conflict thread has at
                  least one visible reply, so a conflict thread with no other comments doesn't
                  get dead whitespace before the compose editor. */}
              {isConflictThread && visibleReplies.length > 0 && (
                <div className="tw:h-2" data-slot="conflict-reply-gap" aria-hidden="true" />
              )}
              {/* Show "hidden replies" separator before the visible replies if there are hidden replies */}
              {hiddenReplyCount > 0 && (
                <div
                  className="tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2"
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
                  <div className="tw:w-8">
                    <Separator />
                  </div>
                  <div className="tw:flex tw:items-center tw:gap-2">
                    <p className="tw:text-sm tw:text-muted-foreground">{hiddenReplyText}</p>
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
                    canEditOrDelete={
                      (!isAnyCommentEditing && commentEditDeletePermissions.get(reply.id)) ?? false
                    }
                  />
                </div>
              ))}

              {/* Only show main Editor if user can add comments, no comment is being edited, or if it has draft content */}
              {canUserAddCommentToThread !== false &&
                (!isAnyCommentEditing || hasEditorContent(pendingCommentEditorState)) && (
                  <div
                    role="textbox"
                    tabIndex={-1}
                    className="tw:w-full tw:space-y-2"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDownCapture={(e) => {
                      if (didPressCtrlOrCmdEnter(e)) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (
                          hasEditorContent(pendingCommentEditorState) ||
                          (pendingCommentAssignedUser !== undefined &&
                            pendingCommentAssignedUser !== lastSubmittedAssignedUser)
                        ) {
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
                      editorSerializedState={pendingCommentEditorState}
                      onSerializedChange={(value) => setPendingCommentEditorState(value)}
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
                    <div className="tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2">
                      {pendingCommentAssignedUser !== undefined &&
                        (hasEditorContent(pendingCommentEditorState) ||
                          pendingCommentAssignedUser !== lastSubmittedAssignedUser) && (
                          <span className="tw:flex-1 tw:text-sm tw:text-muted-foreground">
                            {formatReplacementString(
                              localizedStrings['%comment_assigning_to%'] ??
                                'Assigning to: {assignedUser}',
                              {
                                assignedUser: getAssignedUserDisplayName(
                                  pendingCommentAssignedUser,
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
                            className="tw:flex tw:items-center tw:justify-center tw:rounded-md"
                            disabled={
                              !canAssign ||
                              !assignableUsers ||
                              assignableUsers.length === 0 ||
                              !assignableUsers.includes(currentUser)
                            }
                            aria-label={
                              localizedStrings['%comment_aria_assign_user%'] ?? 'Assign user'
                            }
                          >
                            <AtSign />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="tw:w-auto tw:p-0"
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
                                      setPendingCommentAssignedUser(user);
                                    } else {
                                      setPendingCommentAssignedUser(undefined);
                                    }
                                    // Manual selection supersedes the auto-populated value —
                                    // don't treat it as stale if `canAssign` later flips, and
                                    // don't overwrite it if `initialAssignedUser` later changes.
                                    // Also clear last-submitted tracking so a re-selection always
                                    // re-enables the submit button.
                                    assigneeSelectionStateRef.current = 'user-selected';
                                    setLastSubmittedAssignedUser(undefined);
                                    setIsAssignPopoverOpen(false);
                                  }}
                                  className="tw:flex tw:items-center"
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
                        className="tw:flex tw:items-center tw:justify-center tw:rounded-md"
                        disabled={
                          !hasEditorContent(pendingCommentEditorState) &&
                          (pendingCommentAssignedUser === undefined ||
                            pendingCommentAssignedUser === lastSubmittedAssignedUser)
                        }
                        aria-label={
                          localizedStrings['%comment_aria_submit_comment%'] ?? 'Submit comment'
                        }
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
