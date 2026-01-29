import React, { useCallback, useRef, useEffect } from 'react';
import { cn } from 'platform-bible-react';
import type { InterlinearSetupItem } from '../../types/interlinear-setup.types';

export interface TaskListProps {
  /** List of existing interlinear setup items */
  items: InterlinearSetupItem[];
  /** Currently selected item */
  selectedItem: InterlinearSetupItem | undefined;
  /** Callback when an item is selected */
  onSelectItem: (item: InterlinearSetupItem) => void;
}

/**
 * TaskList displays existing interlinear setups as a selectable list. Supports keyboard navigation
 * with arrow keys and Enter/Space selection.
 */
export function TaskList({ items, selectedItem, onSelectItem }: TaskListProps) {
  // eslint-disable-next-line no-null/no-null
  const listRef = useRef<HTMLUListElement>(null);

  // Handle keyboard navigation on list items
  const handleItemKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>, item: InterlinearSetupItem, index: number) => {
      let newIndex = index;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          newIndex = index < items.length - 1 ? index + 1 : 0;
          break;
        case 'ArrowUp':
          event.preventDefault();
          newIndex = index > 0 ? index - 1 : items.length - 1;
          break;
        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newIndex = items.length - 1;
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          onSelectItem(item);
          return;
        default:
          return;
      }

      if (newIndex !== index && newIndex >= 0 && newIndex < items.length) {
        onSelectItem(items[newIndex]);
        // Focus the new item
        const listElement = listRef.current;
        if (listElement) {
          const itemElements = listElement.querySelectorAll('[role="option"]');
          const targetElement = itemElements[newIndex];
          if (targetElement instanceof HTMLElement) {
            targetElement.focus();
          }
        }
      }
    },
    [items, onSelectItem],
  );

  // Scroll selected item into view when selection changes
  useEffect(() => {
    if (selectedItem && listRef.current) {
      const selectedElement = listRef.current.querySelector('[aria-selected="true"]');
      if (selectedElement instanceof HTMLElement && selectedElement.scrollIntoView) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedItem]);

  if (items.length === 0) {
    return (
      <div className="tw-text-muted-foreground tw-text-sm tw-py-4 tw-text-center">
        No existing interlinear setups found.
      </div>
    );
  }

  return (
    <ul
      ref={listRef}
      role="listbox"
      aria-label="Existing interlinear setups"
      className="tw-flex tw-flex-col tw-gap-1 tw-max-h-48 tw-overflow-y-auto tw-rounded"
    >
      {items.map((item, index) => {
        const isSelected = selectedItem?.id === item.id;
        return (
          <li
            key={item.id}
            role="option"
            aria-selected={isSelected}
            tabIndex={0}
            onClick={() => onSelectItem(item)}
            onKeyDown={(e) => handleItemKeyDown(e, item, index)}
            className={cn(
              'tw-px-3 tw-py-2 tw-rounded tw-cursor-pointer tw-transition-colors',
              'hover:tw-bg-muted focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring',
              isSelected && 'tw-bg-muted/50 tw-border tw-border-input',
            )}
          >
            <span className="tw-text-sm">{item.displayText}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default TaskList;
