import { ReactNode, useMemo } from 'react';
import { CommentThreadProps } from './comment-list.types';
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
export function ConflictThread(props: CommentThreadProps) {
  const {
    comments,
    localizedStrings,
    isSelected = false,
    threadId,
    threadStatus,
    conflictResolution,
  } = props;

  const activeComments = useMemo(() => comments.filter((comment) => !comment.deleted), [comments]);
  const firstComment = activeComments[0];

  const { conflictOptions, isResolving, resolve, resolvedResolution, showResolveCheck } =
    useConflictResolution({
      threadId,
      threadStatus,
      isSelected,
      activeComments,
      conflictResolution,
    });

  const isVerseText = isVerseTextConflictNote(firstComment);

  // verseText conflicts render the resolution UI; other conflict types leave rootContentSlot
  // undefined so the shell renders its default CommentItem (the non-verseText chrome fix).
  let rootContentSlot: ReactNode;
  if (isVerseText && firstComment) {
    rootContentSlot = isSelected ? (
      <ConflictNoteCard
        comment={firstComment}
        localizedStrings={localizedStrings}
        availableActions={conflictOptions}
        resolvedResolution={resolvedResolution}
        onResolve={resolve}
        isResolving={isResolving}
      />
    ) : (
      <ConflictThreadSummary
        comment={firstComment}
        localizedStrings={localizedStrings}
        resolvedResolution={resolvedResolution}
      />
    );
  }

  // For a verseText conflict, override the header check with the conflict-gated resolve (or `false`
  // to hide it when the conflict isn't resolvable). For a non-verseText conflict, leave it undefined
  // so the shell renders its generic status-resolve check.
  let resolveActionSlot: ReactNode;
  if (isVerseText) {
    resolveActionSlot = showResolveCheck ? (
      <ResolveCheckButton
        show
        disabled={isResolving}
        onClick={() => resolve('accept')}
        ariaLabel={localizedStrings['%comment_aria_resolve_thread%'] ?? 'Resolve thread'}
      />
    ) : (
      false
    );
  }

  return (
    <CommentThread
      {...props}
      rootContentSlot={rootContentSlot}
      resolveActionSlot={resolveActionSlot}
      spaceRootContentFromReplies={isVerseText && isSelected}
    />
  );
}

export default ConflictThread;
