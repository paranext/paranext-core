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
}: CommentListProps) {
  const [internalSelectedThreadId, setInternalSelectedThreadId] = useState<string | undefined>(
    undefined,
  );

  // Use external selection if provided, otherwise use internal state
  const selectedThreadId = externalSelectedThreadId ?? internalSelectedThreadId;

  // Sync internal state with external selection when it changes
  useEffect(() => {
    if (externalSelectedThreadId !== undefined) {
      setInternalSelectedThreadId(externalSelectedThreadId);
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
      setInternalSelectedThreadId(option.id);
      onSelectedThreadChange?.(option.id);
    },
    [onSelectedThreadChange],
  );

  const handleSelectThread = useCallback(
    (threadId: string) => {
      setInternalSelectedThreadId(threadId);
      onSelectedThreadChange?.(threadId);
    },
    [onSelectedThreadChange],
  );

  const { listboxRef, activeId, handleKeyDown } = useListbox({
    options,
    onOptionSelect: handleKeyboardSelectThread,
  });

  // Set selected thread id to undefined when Escape is pressed
  const handleKeyDownWithEscape = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        setInternalSelectedThreadId(undefined);
        onSelectedThreadChange?.(undefined);
        event.preventDefault();
        event.stopPropagation();
      } else {
        handleKeyDown(event);
      }
    },
    [handleKeyDown, onSelectedThreadChange],
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
            isSelected={selectedThreadId === thread.id}
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
          />
        </div>
      ))}
    </div>
  );
}
