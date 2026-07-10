import { ReactNode, useMemo } from 'react';
import { ConflictThreadProps } from './comment-list.types';
import { CommentThread } from './comment-thread.component';
import { ConflictNoteCard } from './conflict-note-card.component';
import { ConflictThreadSummary } from './conflict-thread-summary.component';
import { ResolveCheckButton } from './resolve-check-button.component';
import { isVerseTextConflictNote } from './comment-list.utils';
import { useConflictResolution } from './use-conflict-resolution.hook';

/**
 * The conflict-thread container. Wraps the conflict-agnostic {@link CommentThread} shell and fills
 * its slots with conflict-specific content:
 *
 * - A verseText conflict shows the resolution UI - the ConflictNoteCard when the thread is open, the
 *   collapsed ConflictThreadSummary otherwise - plus a conflict-gated resolve check.
 * - Any other conflict type falls through to the shell's default CommentItem (keeping its
 *   author/date/status/menu) and the shell's generic status-resolve check, since a non-verseText
 *   conflict is resolved through a plain status change, not resolveConflict.
 *
 * All conflict state and logic live in {@link useConflictResolution}.
 */
export function ConflictThread(props: ConflictThreadProps) {
  const {
    comments,
    localizedStrings,
    isSelected = false,
    threadId,
    threadStatus,
    conflictResolution,
  } = props;

  const activeComments = useMemo(() => comments.filter((comment) => !comment.deleted), [comments]);
  // The conflict root is not reliably comments[0]: a fragment-merged thread (PT9 FB-22392) tail-
  // appends the older fragment's comments, leaving the genuine root mid-list (see
  // LegacyCommentThread.comments and C# RootCommentId). Only the root carries conflictType and the
  // diff/result fields the card reads, so locate it by that field, not by position.
  const rootComment = useMemo(
    () => activeComments.find((comment) => comment.conflictType) ?? activeComments[0],
    [activeComments],
  );

  const { conflictOptions, isResolving, resolve, resolvedResolution, showResolveCheck } =
    useConflictResolution({
      threadId,
      threadStatus,
      isSelected,
      activeComments,
      conflictResolution,
    });

  const isVerseText = isVerseTextConflictNote(rootComment);

  // verseText conflicts render the resolution UI; other conflict types leave rootContentSlot
  // undefined so the shell renders its default CommentItem (the non-verseText chrome fix).
  let rootContentSlot: ReactNode;
  if (isVerseText && rootComment) {
    rootContentSlot = isSelected ? (
      <ConflictNoteCard
        comment={rootComment}
        localizedStrings={localizedStrings}
        availableActions={conflictOptions}
        resolvedResolution={resolvedResolution}
        onResolve={resolve}
        isResolving={isResolving}
      />
    ) : (
      <ConflictThreadSummary
        comment={rootComment}
        localizedStrings={localizedStrings}
        resolvedResolution={resolvedResolution}
      />
    );
  }

  // For a verseText conflict, override the header check with the conflict-gated resolve.
  // ResolveCheckButton self-gates on `show` (renders nothing when false), and passing the element
  // rather than a bare `false` still overrides the shell's generic status-resolve default — so a
  // non-resolvable verseText conflict shows no ✓. For a non-verseText conflict, leave the slot
  // undefined so the shell renders its generic status-resolve check.
  let resolveActionSlot: ReactNode;
  if (isVerseText) {
    resolveActionSlot = (
      <ResolveCheckButton
        show={showResolveCheck}
        disabled={isResolving}
        onClick={() => resolve('accept')}
        ariaLabel={localizedStrings['%comment_aria_resolve_thread%'] ?? 'Resolve thread'}
      />
    );
  }

  return (
    <CommentThread
      {...props}
      activeComments={activeComments}
      rootContentSlot={rootContentSlot}
      resolveActionSlot={resolveActionSlot}
      spaceRootContentFromReplies={isVerseText && isSelected}
    />
  );
}

export default ConflictThread;
