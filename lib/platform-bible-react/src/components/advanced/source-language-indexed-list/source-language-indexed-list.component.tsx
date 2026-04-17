import { RefObject, useMemo } from 'react';
import { cn } from '@/utils/shadcn-ui.util';
import { useListbox, type ListboxOption } from '@/hooks/listbox-keyboard-navigation.hook';
import { Separator } from '@/components/shadcn-ui/separator';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import type {
  IndexedListItem,
  SourceLanguageIndexedListProps,
} from './source-language-indexed-list.types';

/**
 * A shared list component for displaying source-language indexed items. Supports two-column layout
 * (resource term + source language term), keyboard navigation, text and thumbnail variants, and
 * loading/empty states.
 *
 * Used by Enhanced Resources (dictionary, encyclopedia, media) and lexical tools (dictionary).
 *
 * @example
 *
 * ```tsx
 * <SourceLanguageIndexedList
 *   items={dictionaryItems}
 *   onItemClick={handleItemClick}
 *   selectedItemId={selectedId}
 *   showSourceLanguage
 *   showTransliteration
 * />;
 * ```
 */
export default function SourceLanguageIndexedList<T extends IndexedListItem>({
  items,
  renderItem,
  onItemClick,
  selectedItemId,
  emptyStateMessage = 'No items found',
  isLoading = false,
  variant = 'text',
  showSourceLanguage = false,
  showTransliteration = false,
  onCharacterPress,
  className,
}: SourceLanguageIndexedListProps<T>) {
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
            className={cn('tw-h-12 tw-w-full tw-rounded', {
              'tw-h-20': variant === 'thumbnail',
            })}
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
    <div className={cn('tw-overflow-y-auto', className)}>
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
        {items.map((item) => {
          const isSelected = selectedItemId === item.id;
          return (
            <li
              key={item.id}
              id={item.id}
              role="option"
              aria-selected={isSelected}
              tabIndex={-1}
              onClick={() => onItemClick?.(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onItemClick?.(item);
                }
              }}
              className={cn(
                'tw-flex tw-cursor-pointer tw-items-center tw-gap-3 tw-p-2 tw-outline-none',
                {
                  'tw-bg-muted': isSelected,
                  'hover:tw-bg-muted': !isSelected,
                },
              )}
            >
              {renderItem ? (
                renderItem(item)
              ) : (
                <DefaultListItemContent
                  item={item}
                  variant={variant}
                  showSourceLanguage={showSourceLanguage}
                  showTransliteration={showTransliteration}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Default rendering for a list item showing the two-column layout */
function DefaultListItemContent<T extends IndexedListItem>({
  item,
  variant,
  showSourceLanguage,
  showTransliteration,
}: {
  item: T;
  variant: 'text' | 'thumbnail';
  showSourceLanguage: boolean;
  showTransliteration: boolean;
}) {
  return (
    <>
      {variant === 'thumbnail' && item.thumbnailUrl && (
        <img
          src={item.thumbnailUrl}
          alt={item.thumbnailAlt ?? item.primaryText}
          className="tw-h-14 tw-w-14 tw-shrink-0 tw-rounded tw-object-cover"
        />
      )}
      <div className="tw-flex tw-flex-1 tw-items-baseline tw-gap-4 tw-overflow-hidden">
        <span className="tw-shrink-0 tw-truncate tw-text-sm">{item.primaryText}</span>
        {showSourceLanguage && item.sourceLanguageText && (
          <span className="tw-truncate tw-text-sm tw-text-muted-foreground">
            {item.sourceLanguageText}
            {showTransliteration && item.transliteration && (
              <span className="tw-ml-1">({item.transliteration})</span>
            )}
          </span>
        )}
      </div>
      <Separator className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0" />
    </>
  );
}
