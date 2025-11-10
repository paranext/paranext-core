import { cn } from '@/utils/shadcn-ui.util';
import React, { RefObject, useCallback, useEffect, useState } from 'react';
import { ListboxOption, useListbox } from '@/hooks/listbox-keyboard-navigation.hook';
import { CommentListProps } from './comment-list.types';
import { CommentThread } from './comment-thread.component';

export default function CommentList({
  className = '',
  threads,
  localizedStrings,
  handleAddComment,
  handleResolveCommentThread,
}: CommentListProps) {
  const [selectedThreadId, setSelectedThreadId] = useState<string | undefined>();

  const options: ListboxOption[] = threads.map((thread) => ({
    id: `thread-${thread.id}`,
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

  // When a thread is expanded, focus the editor and place cursor at the end
  useEffect(() => {
    if (!selectedThreadId) return;

    const container = document.getElementById(selectedThreadId);
    if (!container) return;

    const requestAnimationFrameScheduled = requestAnimationFrame(() => {
      const requestAnimationFrameChangesRendered = requestAnimationFrame(() => {
        const contentEditableField = container.querySelector<HTMLElement>(
          '[contenteditable="true"]',
        );
        const fallback = container.querySelector<HTMLElement>(
          'textarea:not([disabled]), select:not([disabled]), button:not([disabled])',
        );
        const toFocus = contentEditableField ?? fallback;
        if (toFocus) {
          toFocus.focus();
          // Move cursor to the end of the contentEditable element
          if (contentEditableField && toFocus === contentEditableField) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(contentEditableField);
            range.collapse(false); // false = collapse to end
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        }
      });
      return () => cancelAnimationFrame(requestAnimationFrameChangesRendered);
    });
    return () => cancelAnimationFrame(requestAnimationFrameScheduled);
  }, [selectedThreadId]);

  return (
    <div
      id="comment-thread-list"
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
      onKeyDown={handleKeyDownWithEscape}
    >
      {threads.map((thread) => (
        <div key={`thread-${thread.id}`}>
          <CommentThread
            comments={thread.comments}
            localizedStrings={localizedStrings}
            verseRef={thread.verseRef}
            handleSelectThread={handleSelectThread}
            threadId={`thread-${thread.id}`}
            isSelected={selectedThreadId === `thread-${thread.id}`}
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
