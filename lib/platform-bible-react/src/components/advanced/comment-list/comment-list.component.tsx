import { ListboxOption, useListbox } from '@/hooks/listbox-keyboard-navigation.hook';
import { cn } from '@/utils/shadcn-ui.util';
import React, { RefObject, useCallback, useState } from 'react';
import { CommentListProps } from './comment-list.types';
import { CommentThread } from './comment-thread.component';

/**
 * Component for rendering a list of comment threads
 *
 * @param CommentListProps Props for the CommentList component
 */
export default function CommentList({
  className = '',
  threads,
  currentUser,
  localizedStrings,
  handleAddCommentToThread,
  handleUpdateComment,
  handleDeleteComment,
  assignableUsers,
}: CommentListProps) {
  const [selectedThreadId, setSelectedThreadId] = useState<string | undefined>();

  const activeThreads = threads.filter((thread) =>
    thread.comments.some((comment) => !comment.deleted),
  );

  const options: ListboxOption[] = activeThreads.map((thread) => ({
    id: thread.id,
  }));

  const handleKeyboardSelectThread = useCallback((option: ListboxOption) => {
    setSelectedThreadId(option.id);
  }, []);

  const handleSelectThread = useCallback((threadId: string) => {
    setSelectedThreadId(threadId);
  }, []);

  const { listboxRef, activeId, handleKeyDown } = useListbox({
    options,
    onOptionSelect: handleKeyboardSelectThread,
  });

  // Set selected thread id to undefined when Escape is pressed
  const handleKeyDownWithEscape = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        setSelectedThreadId(undefined);
        event.preventDefault();
        event.stopPropagation();
      } else {
        handleKeyDown(event);
      }
    },
    [handleKeyDown],
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
          className={cn({
            'tw-opacity-60': thread.status === 'Resolved',
          })}
        >
          <CommentThread
            comments={thread.comments}
            localizedStrings={localizedStrings}
            verseRef={thread.verseRef}
            handleSelectThread={handleSelectThread}
            threadId={thread.id}
            isSelected={selectedThreadId === thread.id}
            currentUser={currentUser}
            assignedUser={thread.assignedUser}
            threadStatus={thread.status}
            handleAddCommentToThread={handleAddCommentToThread}
            handleUpdateComment={handleUpdateComment}
            handleDeleteComment={handleDeleteComment}
            assignableUsers={assignableUsers}
          />
        </div>
      ))}
    </div>
  );
}
