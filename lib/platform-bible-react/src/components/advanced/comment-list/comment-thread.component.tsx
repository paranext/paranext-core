import { Editor } from '@/components/advanced/editor/editor';
import {
  editorStateToHtml,
  handleEditorKeyNavigation,
  hasEditorContent,
} from '@/components/advanced/editor/editor-utils';
import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import { DisabledTooltipWrapper } from '@/components/basics/disabled-tooltip-wrapper.component';
import { Separator } from '@/components/shadcn-ui/separator';
import { cn } from '@/utils/shadcn-ui/utils';
import {
  SerializedEditorState,
  SerializedElementNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from 'lexical';
import { ArrowUp, AtSign, ChevronDown, ChevronUp, Mail, MailOpen } from 'lucide-react';
import { formatReplacementString } from 'platform-bible-utils';
import { memo, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn-ui/tooltip';
import { Command, CommandItem, CommandList } from '@/components/shadcn-ui/command';
import { CommentItem } from './comment-item.component';
import {
  AddCommentToThreadOptions,
  CommentDraft,
  CommentThreadProps,
  getCommentThreadElementId,
} from './comment-list.types';
import { ResolveCheckButton } from './resolve-check-button.component';
import {
  didPressCtrlOrCmdEnter,
  getAssignedUserDisplayName,
  hasCommentEdits,
  isCommentDraftEmpty,
  localizeOrFallback,
} from './comment-list.utils';

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
 * Wrapped in `memo`: `CommentList` rebuilds a fresh `commonThreadProps` object for every thread on
 * every render (e.g. one keystroke into one thread's draft re-renders `CommentList` itself), but
 * each individual prop value it spreads onto an unrelated thread is unchanged by reference — memo's
 * shallow comparison is exactly what turns that per-prop stability into a skipped re-render for
 * every thread but the one actually affected.
 *
 * @props CommentThreadProps
 */
export const CommentThread = memo(function CommentThread({
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
  activeComments: providedActiveComments,
  rootContentSlot,
  resolveActionSlot,
  spaceRootContentFromReplies = false,
  draft,
  onDraftChange,
}: CommentThreadProps) {
  // Sometimes-controlled: a consumer that supplies `draft` owns what is displayed here, so a
  // thread unmounted by a filter change and remounted comes back showing the same draft instead of
  // losing it. `internalDraft` is the fallback for callers (Storybook, most existing tests) that
  // don't manage drafts at all.
  const [internalDraft, setInternalDraft] = useState<CommentDraft>({});
  const effectiveDraft = draft ?? internalDraft;
  const pendingCommentEditorState = effectiveDraft.editorState ?? initialValue;
  const pendingCommentAssignedUser = effectiveDraft.assignedUser;

  // A consumer that supplies `onDraftChange` owns this draft exclusively, for the whole lifetime of
  // the component — not just while `draft` happens to be defined. Gating on the current value
  // instead would seed `internalDraft` from the first patch (while `draft` is still undefined) and
  // then, once the consumer echoes that value back through `draft`, block every later patch —
  // including one that empties the draft — leaving the stale seed to resurface the moment `draft`
  // itself is cleared.
  const isControlled = onDraftChange !== undefined;

  // `updateDraft` is captured by callbacks (`clearEditor`, `handleSubmitComment`) that themselves
  // get invoked from an event whose async work (e.g. a submit round trip) outlives the render they
  // were created on. Reading `effectiveDraft` straight from the render closure means such a
  // callback merges its patch on top of whatever the draft looked like when the *callback* was
  // created, silently discarding any patch applied in between (e.g. an in-progress comment edit
  // started while the submit was still in flight). Routing every read through this ref instead
  // means `updateDraft` always merges onto the most recently applied draft, however stale the
  // closure invoking it is. Assigning unconditionally on every render (not in an effect) keeps it
  // current before any same-render event handler can fire.
  const effectiveDraftRef = useRef(effectiveDraft);
  effectiveDraftRef.current = effectiveDraft;

  const updateDraft = useCallback(
    (patch: Partial<CommentDraft>) => {
      const next: CommentDraft = { ...effectiveDraftRef.current, ...patch };
      // Keep the ref current immediately, not just on the next render: two `updateDraft` calls in
      // the same synchronous tick (or one right after another before React re-renders) must each
      // see the other's patch rather than both merging onto the same pre-update snapshot.
      effectiveDraftRef.current = next;
      // Only write the fallback while it is actually the source of truth. While controlled,
      // writing it anyway would let stale content resurface later: if the consumer drops the
      // `draft` prop to `undefined` for a reason that did not go through `onDraftChange` (e.g.
      // pruning an entry against threads that no longer exist), `effectiveDraft` would fall back to
      // this shadow copy instead of the harmless empty default.
      if (!isControlled) setInternalDraft(next);
      onDraftChange?.(threadId, isCommentDraftEmpty(next) ? undefined : next);
    },
    [isControlled, onDraftChange, threadId],
  );

  // An in-progress edit to an existing comment is tracked separately from the reply draft above
  // (see CommentDraft.commentEdits) because the two can be live at once: the reply box stays
  // visible with its own content while a different comment is being edited. Only one comment can
  // enter edit mode at a time — CommentThread gates every comment's edit affordance on the
  // `isAnyCommentEditing` flag below (which also accounts for a resumed edit, not just one started
  // during this mount) — but the map is still keyed by comment id, since a boolean alone couldn't
  // say which comment the content belongs to.
  const updateCommentEditDraft = useCallback(
    (commentId: string, value: SerializedEditorState | undefined) => {
      const nextCommentEdits = { ...effectiveDraft.commentEdits };
      if (value === undefined) {
        delete nextCommentEdits[commentId];
      } else {
        nextCommentEdits[commentId] = value;
      }
      updateDraft({
        commentEdits: hasCommentEdits(nextCommentEdits) ? nextCommentEdits : undefined,
      });
    },
    [effectiveDraft.commentEdits, updateDraft],
  );

  const [lastSubmittedAssignedUser, setLastSubmittedAssignedUser] = useState<string | undefined>();
  const isVerseExpanded = isSelected;
  const [showAllReplies, setShowAllReplies] = useState<boolean>(false);
  // `isAnyCommentEditingLocal` only reflects edits started during this mount — a filter change
  // unmounts and remounts the thread without it. `commentEdits` (in `effectiveDraft`) survives that
  // remount, and a non-empty entry resumes its own CommentItem into edit mode on mount (see
  // `draftEditorState` below) without ever calling `onEditingChange`. So the thread-wide gate has to
  // read both, or the one-edit-at-a-time rule holds before a remount and silently stops holding
  // after one. (`isAnyCommentEditing` itself is computed below, once `activeComments` exists.)
  const [isAnyCommentEditingLocal, setIsAnyCommentEditingLocal] = useState<boolean>(false);
  const [isAssignPopoverOpen, setIsAssignPopoverOpen] = useState<boolean>(false);
  const [canAssign, setCanAssign] = useState<boolean>(false);
  const [canResolve, setCanResolve] = useState<boolean>(false);
  const [isRead, setIsRead] = useState<boolean>(isReadProp);
  const [manuallyUnread, setManuallyUnread] = useState<boolean>(false);
  const autoReadTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [commentEditDeletePermissions, setCommentEditDeletePermissions] = useState<
    Map<string, boolean>
  >(new Map());

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
        updateDraft({ assignedUser: undefined });
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
        updateDraft({ assignedUser: initialAssignedUser });
        assigneeSelectionStateRef.current = 'auto-populated';
      }
    } else if (assigneeSelectionStateRef.current === 'auto-populated') {
      // Permission was granted long enough to pre-populate but has now been revoked (for example,
      // the async check resolved to false, or the thread-specific permission changed). Clear the
      // stale value so the submit handler doesn't send an unauthorized assignment.
      updateDraft({ assignedUser: undefined });
      assigneeSelectionStateRef.current = 'pending';
    }
  }, [isSelected, initialAssignedUser, canAssign, assignedUser, updateDraft]);

  // Mirrors of the values the unmount-only cleanup below needs, since a `useEffect` cleanup that
  // must fire exactly once — at teardown, not on every dependency change (see that effect for why)
  // — has to read them through a ref instead of its own dependency array.
  const lastSubmittedAssignedUserRef = useRef(lastSubmittedAssignedUser);
  lastSubmittedAssignedUserRef.current = lastSubmittedAssignedUser;
  const onDraftChangeRef = useRef(onDraftChange);
  onDraftChangeRef.current = onDraftChange;
  const threadIdRef = useRef(threadId);
  threadIdRef.current = threadId;

  // Both `handleSubmitComment` and `handleAddCommentToThreadWithContents` deliberately leave a
  // just-submitted assignee sitting in the draft (see their own comments) so the "Assigning to:"
  // indicator doesn't flicker, and so the assignment stays sticky for a subsequent reply typed
  // into the same still-open thread. Once submission succeeds, though, that value is no longer
  // unsent content the moment nothing else is pending — it's exactly what `lastSubmittedAssignedUser`
  // already is. The deselect branch of the assignee-selection effect above is the only place that
  // clears it, and it only runs when `isSelected` transitions to false while this component stays
  // mounted — never when the thread unmounts while still selected, which is what a filter change
  // does. Left uncleared, a submitted-then-orphaned assignee becomes a phantom draft: non-empty per
  // `isCommentDraftEmpty`, reported upward, and persisted with nothing in the UI able to clear it.
  //
  // Scoped tightly to that one case, so it does not undercut the durable-draft feature this exists
  // alongside: real unsent editor text, an in-progress comment edit, or an assignee that was chosen
  // but never submitted (including one reselected after a submit — see the popover's
  // `setLastSubmittedAssignedUser(undefined)`) all leave the condition below false, so they still
  // survive the unmount the way a draft is supposed to.
  useEffect(() => {
    return () => {
      const { current } = effectiveDraftRef;
      if (
        current.assignedUser !== undefined &&
        current.assignedUser === lastSubmittedAssignedUserRef.current &&
        current.editorState === undefined &&
        !hasCommentEdits(current.commentEdits)
      ) {
        onDraftChangeRef.current?.(threadIdRef.current, undefined);
      }
    };
    // Intentionally unmount-only (empty dependency array): the deselect branch above already
    // handles the "still mounted" transition, so re-running this on every dependency change would
    // just duplicate that path — and would fire mid-session on ordinary state changes (e.g. a new
    // submission) rather than only when the thread actually goes away. The refs above keep the
    // cleanup seeing each render's latest values regardless.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prefer the caller's pre-computed active comments (ConflictThread already derives them) over
  // re-filtering, so a conflict thread doesn't run the same non-deleted filter twice per render.
  const activeComments = useMemo(
    () => providedActiveComments ?? comments.filter((comment) => !comment.deleted),
    [providedActiveComments, comments],
  );

  // A persisted `commentEdits` entry can outlive the comment it belongs to — e.g. another user
  // deletes it via Send/Receive while the edit was in progress. That comment is filtered out of
  // `activeComments`, so its own CommentItem can never mount again and nothing in the UI can ever
  // clear the entry. Ignore entries for comments no longer active so a stranded one cannot gate
  // every other comment's edit affordance forever; an entry for a still-active comment (e.g. a
  // reply currently outside the visible reply tail — see `visibleReplies` below, which keeps that
  // comment mounted instead) continues to count normally.
  const activeCommentEdits = useMemo(() => {
    const { commentEdits } = effectiveDraft;
    if (!commentEdits) return commentEdits;
    const activeIds = new Set(activeComments.map((comment) => comment.id));
    const filtered = Object.fromEntries(
      Object.entries(commentEdits).filter(([commentId]) => activeIds.has(commentId)),
    );
    return hasCommentEdits(filtered) ? filtered : undefined;
  }, [effectiveDraft, activeComments]);
  const isAnyCommentEditing = isAnyCommentEditingLocal || hasCommentEdits(activeCommentEdits);

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

  // </p> expects null and not undefined
  // eslint-disable-next-line no-null/no-null
  const verseTextRef = useRef<HTMLParagraphElement | null>(null);
  const clearEditorRef = useRef<(() => void) | undefined>(undefined);

  const clearEditor = useCallback(() => {
    clearEditorRef.current?.();
    updateDraft({ editorState: undefined });
  }, [updateDraft]);

  // Shared by both the unselected-thread preview Editor and the compose Editor: empty content means
  // no draft, so it clears the stored editor state rather than persisting an empty one.
  const handleEditorSerializedChange = useCallback(
    (value: SerializedEditorState) => {
      updateDraft({ editorState: hasEditorContent(value) ? value : undefined });
    },
    [updateDraft],
  );

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

  // For expanded threads with more than 2 replies, show only the last 2 replies. `showAllReplies`
  // resets to false on every mount (see the effect above) — the same state a filter-change remount
  // produces — so a reply with an in-progress edit that falls outside that tail must still be kept
  // visible here: otherwise its own CommentItem (and its only reachable Cancel/Save) never mounts,
  // permanently stranding the edit and the thread-wide gate it holds (see `activeCommentEdits`
  // above).
  const visibleReplies = useMemo(() => {
    if (showAllReplies || replyCount <= 2) {
      return replies;
    }
    const lastTwoIds = new Set(replies.slice(-2).map((reply) => reply.id));
    return replies.filter(
      (reply) => lastTwoIds.has(reply.id) || effectiveDraft.commentEdits?.[reply.id] !== undefined,
    );
  }, [replies, replyCount, showAllReplies, effectiveDraft.commentEdits]);

  const hiddenReplyCount = useMemo(() => {
    if (showAllReplies || replyCount <= 2) {
      return 0;
    }
    return replyCount - visibleReplies.length;
  }, [replyCount, showAllReplies, visibleReplies.length]);

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

  // If the thread gets unselected while a reply (never the first comment, which stays mounted
  // regardless of selection) is being edited, that reply's CommentItem unmounts. Its content
  // survives via the persisted `commentEdits` entry above and resumes when the thread re-expands,
  // so only the local "something is being edited" flag needs resetting here.
  useEffect(() => {
    // If there are replies and a comment is being edited, the edited comment is not the first
    // comment, so reset editing state when thread is unselected
    if (!isSelected && isAnyCommentEditing && hasReplies) {
      setIsAnyCommentEditingLocal(false);
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

  // If all comments have been deleted there is nothing to render
  if (activeComments.length === 0) return undefined;

  // Shared with the disabled-tooltip wrapper below the button that reads it, so the tooltip
  // explanation and the actual disabled condition can never drift apart.
  const isAssignDisabled =
    !canAssign ||
    !assignableUsers ||
    assignableUsers.length === 0 ||
    !assignableUsers.includes(currentUser);
  const isSubmitDisabled =
    !hasEditorContent(pendingCommentEditorState) &&
    (pendingCommentAssignedUser === undefined ||
      pendingCommentAssignedUser === lastSubmittedAssignedUser);

  // The default root-comment render, used unless a rootContentSlot override is supplied (e.g. a
  // conflict thread's summary or resolution card).
  const defaultRootComment = (
    <CommentItem
      comment={firstComment}
      localizedStrings={localizedStrings}
      isThreadExpanded={isSelected}
      threadStatus={threadStatus}
      handleAddCommentToThread={handleAddCommentToThreadWithContents}
      handleUpdateComment={handleUpdateComment}
      handleDeleteComment={handleDeleteComment}
      onEditingChange={setIsAnyCommentEditingLocal}
      canEditOrDelete={
        (!isAnyCommentEditing && commentEditDeletePermissions.get(firstComment.id)) ?? false
      }
      canUserResolveThread={canResolve}
      draftEditorState={effectiveDraft.commentEdits?.[firstComment.id]}
      onDraftEditorStateChange={(value) => updateCommentEditDraft(firstComment.id, value)}
    />
  );

  return (
    <Card
      role="option"
      aria-selected={isSelected}
      id={getCommentThreadElementId(threadId)}
      className={cn(
        // `border-s-4` is always present so the bar's width is reserved on every card and
        // selecting one does not shift its content sideways. Logical property, so it follows RTL.
        'tw:group tw:w-full tw:rounded-none tw:border-s-4 tw:p-3 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background',
        { 'tw:cursor-pointer tw:hover:shadow-md': !isSelected },
        // Selection rides the leading bar and elevation, never the background. The background
        // channel already carries three meanings (unread, resolved, read) and cannot express a
        // fourth. The bar is `foreground` rather than `primary` because `primary` measures 2.38:1
        // against the card in paratext-dark, below the 3:1 non-text minimum — see
        // active-comment-bar-contrast.test.ts.
        {
          'tw:border-foreground tw:shadow-md': isSelected,
          'tw:border-transparent': !isSelected,
        },
        // Status keeps the background channel. `--card` is the surface token; text-on-* tokens
        // like `--primary-foreground` are not surfaces and render near-white in paratext-dark.
        {
          'tw:bg-card': threadStatus !== 'Resolved' && isRead,
          'tw:bg-muted': threadStatus === 'Resolved',
          'tw:bg-accent': !isRead && threadStatus !== 'Resolved',
        },
      )}
      onClick={() => {
        handleSelectThread(threadId);
      }}
      tabIndex={-1}
    >
      <CardContent className="tw:flex tw:flex-col tw:gap-2 tw:p-0">
        <div className="tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-2">
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
            {resolveActionSlot === undefined ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              <ResolveCheckButton
                show={canResolve && threadStatus !== 'Resolved'}
                onClick={() =>
                  handleAddCommentToThreadWithContents({ threadId, status: 'Resolved' })
                }
                ariaLabel={localizedStrings['%comment_aria_resolve_thread%'] ?? 'Resolve thread'}
              />
            ) : (
              resolveActionSlot
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
          {rootContentSlot ?? defaultRootComment}
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
              onSerializedChange={handleEditorSerializedChange}
              placeholder={localizedStrings['%comment_replyOrAssign%']}
            />
          )}
          {isSelected && (
            <>
              {/* Extra vertical spacing between custom root content (e.g. a conflict resolution
                  card) and the reply comments. Only rendered when there is at least one visible
                  reply, so a thread with no other comments doesn't get dead whitespace before the
                  compose editor. */}
              {spaceRootContentFromReplies && visibleReplies.length > 0 && (
                <div className="tw:h-2" data-slot="root-content-reply-gap" aria-hidden="true" />
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
                    onEditingChange={setIsAnyCommentEditingLocal}
                    canEditOrDelete={
                      (!isAnyCommentEditing && commentEditDeletePermissions.get(reply.id)) ?? false
                    }
                    draftEditorState={effectiveDraft.commentEdits?.[reply.id]}
                    onDraftEditorStateChange={(value) => updateCommentEditDraft(reply.id, value)}
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
                      onSerializedChange={handleEditorSerializedChange}
                      placeholder={
                        threadStatus === 'Resolved'
                          ? localizedStrings['%comment_reopenResolved%']
                          : localizedStrings['%comment_replyOrAssign%']
                      }
                      autoFocus
                      onClear={(clearFn) => {
                        clearEditorRef.current = clearFn;
                      }}
                      actions={
                        <>
                          {pendingCommentAssignedUser !== undefined &&
                          (hasEditorContent(pendingCommentEditorState) ||
                            pendingCommentAssignedUser !== lastSubmittedAssignedUser) ? (
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
                          ) : (
                            <div className="tw:flex-1" />
                          )}
                          <Popover open={isAssignPopoverOpen} onOpenChange={setIsAssignPopoverOpen}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                {/* Disabled buttons are removed from the tab order and don't fire
                                    the pointer/focus events Tooltip listens for, so without this
                                    wrapper a keyboard or screen-reader user hovering/focusing the
                                    greyed-out button gets no explanation for why it's disabled. */}
                                <DisabledTooltipWrapper
                                  isDisabled={isAssignDisabled}
                                  disabledExplanation={localizeOrFallback(
                                    '%comment_aria_assign_user%',
                                    localizedStrings,
                                    'Assign user',
                                  )}
                                >
                                  <PopoverTrigger asChild>
                                    <Button
                                      size="icon-sm"
                                      variant="outline"
                                      className="tw:flex tw:items-center tw:justify-center tw:rounded-md"
                                      disabled={isAssignDisabled}
                                      aria-label={
                                        localizedStrings['%comment_aria_assign_user%'] ??
                                        'Assign user'
                                      }
                                    >
                                      <AtSign />
                                    </Button>
                                  </PopoverTrigger>
                                </DisabledTooltipWrapper>
                              </TooltipTrigger>
                              <TooltipContent>
                                {localizeOrFallback(
                                  '%comment_aria_assign_user%',
                                  localizedStrings,
                                  'Assign user',
                                )}
                              </TooltipContent>
                            </Tooltip>
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
                                        updateDraft({
                                          assignedUser: user !== assignedUser ? user : undefined,
                                        });
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
                                      <span>
                                        {getAssignedUserDisplayName(user, localizedStrings)}
                                      </span>
                                    </CommandItem>
                                  ))}
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              {/* Disabled buttons are removed from the tab order and don't fire
                                  the pointer/focus events Tooltip listens for, so without this
                                  wrapper a keyboard or screen-reader user gets no explanation for
                                  why there's nothing to submit. */}
                              <DisabledTooltipWrapper
                                isDisabled={isSubmitDisabled}
                                disabledExplanation={localizeOrFallback(
                                  '%comment_aria_submit_comment%',
                                  localizedStrings,
                                  'Submit comment',
                                )}
                                className="tw:inline-flex"
                              >
                                <Button
                                  size="icon-sm"
                                  onClick={handleSubmitComment}
                                  className="tw:flex tw:items-center tw:justify-center tw:rounded-md"
                                  disabled={isSubmitDisabled}
                                  aria-label={
                                    localizedStrings['%comment_aria_submit_comment%'] ??
                                    'Submit comment'
                                  }
                                >
                                  <ArrowUp />
                                </Button>
                              </DisabledTooltipWrapper>
                            </TooltipTrigger>
                            <TooltipContent>
                              {localizeOrFallback(
                                '%comment_aria_submit_comment%',
                                localizedStrings,
                                'Submit comment',
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </>
                      }
                    />
                  </div>
                )}
            </>
          )}
        </>
      </CardContent>
    </Card>
  );
});
