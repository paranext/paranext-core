import { cn } from '@/utils/shadcn-ui.util';
// import { ListboxOption, useListbox } from '@/hooks/listbox-keyboard-navigation.hook';
// import { RefObject, useState } from 'react';
import { useCallback, useState } from 'react';
import { CommentListProps } from './comment-list.types';
import { CommentThread } from './comment-thread.component';

export function CommentList({ className = '', threads, localizedStrings }: CommentListProps) {
  const [selectedThreadId, setSelectedThreadId] = useState<string | undefined>();

  const handleSelectThread = useCallback((threadId: string) => {
    setSelectedThreadId((prevId) => (prevId === threadId ? undefined : threadId));
  }, []);

  // const options: ListboxOption[] = threads.map((thread) => ({
  //   id: `thread-${thread.id}`,
  // }));

  // const handleOptionSelect = (option: ListboxOption) => {
  //   setSelectedThreadId((prevId) => (prevId === option.id ? undefined : option.id));
  // };

  // const { listboxRef, activeId, handleKeyDown } = useListbox({
  //   options,
  //   onOptionSelect: handleOptionSelect,
  // });

  if (threads.length === 0) {
    return (
      <div
        className={cn(
          'tw-w-full tw-max-w-screen-md tw-py-8 tw-text-center tw-text-muted-foreground',
          className,
        )}
      >
        {localizedStrings['%no_comments%']}
      </div>
    );
  }

  return (
    <div
      role="listbox"
      tabIndex={0}
      // The listboxRef is a HTMLElement so that the keyboard navigation can be used with multiple types of elements.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      // ref={listboxRef as RefObject<HTMLDivElement>}
      // aria-activedescendant={activeId ?? undefined}
      // onKeyDown={handleKeyDown}
      aria-label="Comments"
      className={cn('tw-flex tw-w-full tw-max-w-screen-md tw-flex-col tw-space-y-4', className)}
    >
      {threads.map((thread) => (
        <div key={`thread-${thread.id}`}>
          <CommentThread
            comments={thread.comments}
            localizedStrings={localizedStrings}
            verseRef={thread.verseRef}
            verse={thread.verse}
            handleSelectThread={handleSelectThread}
            threadId={thread.id}
            isSelected={selectedThreadId === thread.id}
            assignedUser={thread.assignedUser}
          />
        </div>
      ))}
    </div>
  );
}
