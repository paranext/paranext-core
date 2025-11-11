import { cn } from '@/utils/shadcn-ui.util';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { ListboxOption, useListbox } from '@/hooks/listbox-keyboard-navigation.hook';
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
  localizedStrings,
  handleAddComment,
  handleResolveCommentThread,
}: CommentListProps) {
  const [selectedThreadId, setSelectedThreadId] = useState<string | undefined>();
  const uniqueThreadId = (id: string) => `thread-${id}`;

  const options: ListboxOption[] = threads.map((thread) => ({
    id: uniqueThreadId(thread.id),
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

  // When a thread is expanded, focus the input field
  useEffect(() => {
    if (!selectedThreadId) return;

    const container = document.getElementById(selectedThreadId);
    if (!container) return;

    const requestAnimationFrameScheduled = requestAnimationFrame(() => {
      const requestAnimationFrameChangesRendered = requestAnimationFrame(() => {
        const inputField = container.querySelector<HTMLElement>(
          'input:not([disabled]):not([type="hidden"])',
        );
        const fallback = container.querySelector<HTMLElement>(
          'textarea:not([disabled]), select:not([disabled]), button:not([disabled])',
        );
        const toFocus = inputField ?? fallback;
        toFocus?.focus();
      });
      return () => cancelAnimationFrame(requestAnimationFrameChangesRendered);
    });
    return () => cancelAnimationFrame(requestAnimationFrameScheduled);
  }, [selectedThreadId]);

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
        'tw-flex tw-w-full tw-max-w-screen-md tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background',
        className,
      )}
      onKeyDown={handleKeyDown}
    >
      {threads.map((thread) => (
        <div key={uniqueThreadId(thread.id)}>
          <CommentThread
            comments={thread.comments}
            localizedStrings={localizedStrings}
            verseRef={thread.verseRef}
            handleSelectThread={handleSelectThread}
            threadId={uniqueThreadId(thread.id)}
            isSelected={selectedThreadId === uniqueThreadId(thread.id)}
            assignedUser={thread.assignedUser}
            threadStatus={thread.status}
            handleAddComment={handleAddComment}
            handleResolveCommentThread={handleResolveCommentThread}
          />
        </div>
      ))}
    </div>
  );
}
