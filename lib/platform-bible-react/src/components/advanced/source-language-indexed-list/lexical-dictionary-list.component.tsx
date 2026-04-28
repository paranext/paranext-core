import { RefObject, useMemo } from 'react';
import { cn } from '@/utils/shadcn-ui.util';
import { useListbox, type ListboxOption } from '@/hooks/listbox-keyboard-navigation.hook';
import { Separator } from '@/components/shadcn-ui/separator';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import type {
  LexicalDictionaryEntry,
  LexicalDictionaryListProps,
} from './source-language-indexed-list.types';

/**
 * Lexical Dictionary list component. Extracted from platform-lexical-tools extension dictionary
 * list pattern. Displays dictionary entries with lemma, occurrence count badge, formatted glosses,
 * and Strong's code badges. Uses keyboard navigation via `useListbox`.
 *
 * This is the shared version of
 * `extensions/src/platform-lexical-tools/src/components/dictionary/dictionary-list-item.component.tsx`
 * moved to platform-bible-react so it can be reused by both lexical tools and enhanced resources.
 *
 * @example
 *
 * ```tsx
 * <LexicalDictionaryList
 *   items={entries}
 *   onItemClick={handleSelect}
 *   selectedItemId={selectedId}
 *   occurrenceCountLabel="Occurrences in chapter"
 *   strongsCodeLabel="Strong's code"
 * />;
 * ```
 */
export default function LexicalDictionaryList<T extends LexicalDictionaryEntry>({
  items,
  onItemClick,
  selectedItemId,
  emptyStateMessage = 'No entries found',
  isLoading = false,
  onCharacterPress,
  className,
  occurrenceCountLabel = 'Occurrences',
  strongsCodeLabel = "Strong's code",
}: LexicalDictionaryListProps<T>) {
  const options: ListboxOption[] = useMemo(() => items.map((item) => ({ id: item.id })), [items]);

  const handleOptionSelect = (option: ListboxOption) => {
    const clickedItem = items.find((item) => item.id === option.id);
    if (clickedItem) onItemClick?.(clickedItem);
  };

  const { listboxRef, activeId, handleKeyDown } = useListbox({
    options,
    onOptionSelect: handleOptionSelect,
    onCharacterPress,
  });

  if (isLoading) {
    return (
      <div className={cn('tw-flex tw-flex-col tw-gap-2 tw-p-2', className)}>
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton
            // Loading skeleton placeholders don't have meaningful keys
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="tw-h-12 tw-w-full tw-rounded"
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        className={cn(
          'tw-flex tw-items-center tw-justify-center tw-p-8 tw-text-sm tw-text-muted-foreground',
          className,
        )}
      >
        {emptyStateMessage}
      </div>
    );
  }

  return (
    <div className={cn('tw-overflow-y-auto tw-px-2 tw-py-2', className)}>
      <ul
        role="listbox"
        tabIndex={0}
        // useListbox returns a generic HTMLElement ref for flexibility across element types
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        ref={listboxRef as RefObject<HTMLUListElement>}
        aria-activedescendant={activeId ?? undefined}
        className="tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background"
        onKeyDown={handleKeyDown}
      >
        {items.map((entry) => {
          const isSelected = selectedItemId === entry.id;
          return (
            <div key={entry.id}>
              {/* Keyboard navigation is handled by the useListbox hook on the parent ul */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <li
                role="option"
                aria-selected={isSelected}
                id={entry.id}
                onClick={() => onItemClick?.(entry)}
                className={cn(
                  'tw-flex tw-flex-col tw-p-2 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background',
                  {
                    'tw-bg-muted': isSelected,
                    'hover:tw-bg-muted': !isSelected,
                  },
                )}
                tabIndex={-1}
              >
                <div className="tw-flex tw-items-baseline tw-gap-2">
                  <span className="scripture-font tw-text-sm">{entry.primaryText}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="tw-ml-1 tw-cursor-help tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs">
                          {entry.occurrenceCount}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{occurrenceCountLabel}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="tw-mt-0.5 tw-flex tw-items-center tw-gap-2 tw-overflow-hidden">
                  <p className="tw-truncate tw-text-sm tw-text-muted-foreground">{entry.glosses}</p>
                  {entry.strongsCodes.map((strongsCode) => (
                    <TooltipProvider key={strongsCode}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="tw-ml-1 tw-shrink-0 tw-cursor-help tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs">
                            {strongsCode}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{strongsCodeLabel}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </li>
              <Separator />
            </div>
          );
        })}
      </ul>
    </div>
  );
}
