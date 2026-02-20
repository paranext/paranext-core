import { ListboxOption, useListbox } from '@/hooks/listbox-keyboard-navigation.hook';
import { cn } from '@/utils/shadcn-ui.util';
import React, { RefObject, useCallback, useEffect, useState } from 'react';
import { CommentListProps } from './comment-list.types';
import { CommentThread } from './comment-thread.component';

/**
 * Component for rendering a list of comment threads
 *
 * @param CommentListProps Props for the CommentList component
 */
export default function CommentList({
  className = '',
  classNameForVerseText,
  threads,
  currentUser,
  localizedStrings,
  handleAddCommentToThread,
  handleUpdateComment,
  handleDeleteComment,
  handleReadStatusChange,
  assignableUsers,
  canUserAddCommentToThread,
  canUserAssignThreadCallback,
  canUserResolveThreadCallback,
  canUserEditOrDeleteCommentCallback,
  selectedThreadId: externalSelectedThreadId,
  onSelectedThreadChange,
  onVerseRefClick,
}: CommentListProps) {
  const [expandedThreadIds, setExpandedThreadIds] = useState<Set<string>>(new Set());
  const [lastInteractedThreadId, setLastInteractedThreadId] = useState<string | undefined>();

  // When external selection changes, add it to expanded set
  useEffect(() => {
    if (externalSelectedThreadId) {
      setExpandedThreadIds((prev) => new Set(prev).add(externalSelectedThreadId));
      setLastInteractedThreadId(externalSelectedThreadId);
    }
  }, [externalSelectedThreadId]);

  const activeThreads = threads.filter((thread) =>
    thread.comments.some((comment) => !comment.deleted),
  );

  const options: ListboxOption[] = activeThreads.map((thread) => ({
    id: thread.id,
  }));

  const handleKeyboardSelectThread = useCallback(
    (option: ListboxOption) => {
      setExpandedThreadIds((prev) => new Set(prev).add(option.id));
      setLastInteractedThreadId(option.id);
      onSelectedThreadChange?.(option.id);
    },
    [onSelectedThreadChange],
  );

  const handleSelectThread = useCallback(
    (threadId: string) => {
      const isCollapsing = expandedThreadIds.has(threadId);
      setExpandedThreadIds((prev) => {
        const next = new Set(prev);
        if (next.has(threadId)) {
          next.delete(threadId);
        } else {
          next.add(threadId);
        }
        return next;
      });
      setLastInteractedThreadId(threadId);
      onSelectedThreadChange?.(isCollapsing ? undefined : threadId);
    },
    [expandedThreadIds, onSelectedThreadChange],
  );

  const { listboxRef, activeId, handleKeyDown } = useListbox({
    options,
    onOptionSelect: handleKeyboardSelectThread,
  });

  // Collapse the last interacted thread when Escape is pressed
  const handleKeyDownWithEscape = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        if (lastInteractedThreadId && expandedThreadIds.has(lastInteractedThreadId)) {
          setExpandedThreadIds((prev) => {
            const next = new Set(prev);
            next.delete(lastInteractedThreadId);
            return next;
          });
          setLastInteractedThreadId(undefined);
          onSelectedThreadChange?.(undefined);
        }
        event.preventDefault();
        event.stopPropagation();
      } else {
        handleKeyDown(event);
      }
    },
    [lastInteractedThreadId, expandedThreadIds, handleKeyDown, onSelectedThreadChange],
  );

  return (
    <div
      id="comment-list"
      role="listbox"
      tabIndex={0}
      // The listboxRef is an HTMLElement so that the keyboard navigation can be used with multiple types of elements
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      ref={listboxRef as RefObject<HTMLDivElement>}
      aria-activedescendant={activeId ?? undefined}
      aria-label="Comments"
      className={cn(
        'tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background',

        className,
      )}
      onKeyDown={handleKeyDownWithEscape}
    >
      {activeThreads.map((thread) => (
        <div
          key={thread.id}
          id={thread.id}
          className={cn({
            'tw-opacity-60': thread.status === 'Resolved',
          })}
        >
          <CommentThread
            classNameForVerseText={classNameForVerseText}
            comments={thread.comments}
            localizedStrings={localizedStrings}
            verseRef={thread.verseRef}
            handleSelectThread={handleSelectThread}
            threadId={thread.id}
            isRead={thread.isRead}
            isSelected={expandedThreadIds.has(thread.id)}
            currentUser={currentUser}
            assignedUser={thread.assignedUser}
            threadStatus={thread.status}
            handleAddCommentToThread={handleAddCommentToThread}
            handleUpdateComment={handleUpdateComment}
            handleDeleteComment={handleDeleteComment}
            handleReadStatusChange={handleReadStatusChange}
            assignableUsers={assignableUsers}
            canUserAddCommentToThread={canUserAddCommentToThread}
            canUserAssignThreadCallback={canUserAssignThreadCallback}
            canUserResolveThreadCallback={canUserResolveThreadCallback}
            canUserEditOrDeleteCommentCallback={canUserEditOrDeleteCommentCallback}
            onVerseRefClick={onVerseRefClick}
          />
        </div>
      ))}
    </div>
  );
}
