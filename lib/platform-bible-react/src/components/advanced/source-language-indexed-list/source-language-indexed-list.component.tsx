import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/utils/shadcn-ui/utils';
import { useListbox, type ListboxOption } from '@/hooks/listbox-keyboard-navigation.hook';
import { Separator } from '@/components/shadcn-ui/separator';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/shadcn-ui/resizable';
import type {
  IndexedListItem,
  SourceLanguageIndexedListProps,
} from './source-language-indexed-list.types';

/**
 * A shared list component for displaying source-language indexed items. Supports two-column layout
 * (resource term + source language term), keyboard navigation, text and thumbnail variants,
 * loading/empty states, and an optional side-by-side detail panel.
 *
 * When `renderDetailContent` is provided, clicking an item opens a side-by-side detail panel using
 * a `ResizablePanelGroup` split (list at ~33%, detail at ~67%, with a draggable handle). This is
 * the pattern from PR #2209's stories (`source-language-indexed-list.stories.tsx`); the previous
 * absolute-positioned and vaul-`Drawer` implementations are both abandoned because the former
 * obscured the list and the latter triggered Radix `pointer-events: none` body locks that left only
 * the "back to list" button interactive across the whole page.
 *
 * Click swap: clicking a different list item while the panel is open swaps the detail content
 * without requiring a close-then-reopen cycle. Clicking the already-selected item closes the
 * detail. Pressing Escape while focus is inside the detail panel closes it (focus returns to the
 * listbox). The list and detail are siblings inside the same scrollable container, so outer
 * toolbars, tab switches, scope selectors, and any controls outside the SLI remain fully live.
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
 *   renderDetailContent={(item, onClose) => (
 *     <DictionaryEntryDetail entry={item} onBack={onClose} />
 *   )}
 * />;
 * ```
 */
export default function SourceLanguageIndexedList<T extends IndexedListItem>({
  items,
  renderItem,
  renderDetailContent,
  onItemClick,
  selectedItemId: controlledSelectedId,
  emptyStateMessage = 'No items found',
  isLoading = false,
  variant = 'text',
  showSourceLanguage = false,
  showTransliteration = false,
  onCharacterPress,
  className,
}: SourceLanguageIndexedListProps<T>) {
  const [drawerItemId, setDrawerItemId] = useState<string | undefined>();
  // ref.current expects null not undefined for div ref
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);

  // Use controlled selection if provided, otherwise use internal state
  const effectiveSelectedId = controlledSelectedId ?? drawerItemId;

  const drawerItem = useMemo(
    () => (drawerItemId ? items.find((item) => item.id === drawerItemId) : undefined),
    [drawerItemId, items],
  );

  const options: ListboxOption[] = useMemo(() => items.map((item) => ({ id: item.id })), [items]);

  const handleItemSelect = (item: T) => {
    onItemClick?.(item);
    if (renderDetailContent) {
      // Always set to the clicked item so the drawer stays open with new content.
      // Clicking the already-selected item closes the drawer.
      setDrawerItemId(item.id === drawerItemId ? undefined : item.id);
    }
  };

  const handleOptionSelect = (option: ListboxOption) => {
    const clickedItem = items.find((item) => item.id === option.id);
    if (clickedItem) handleItemSelect(clickedItem);
  };

  const { listboxRef, activeId, handleKeyDown, focusOption } = useListbox({
    options,
    onOptionSelect: handleOptionSelect,
    onCharacterPress,
  });

  // On close, restore focus to the listbox so arrow keys navigate again
  // starting from the previously-selected item.
  const handleCloseDetail = () => {
    const closingId = drawerItemId;
    setDrawerItemId(undefined);
    if (closingId) {
      requestAnimationFrame(() => {
        focusOption(closingId);
        listboxRef.current?.focus();
      });
    }
  };

  // Escape closes the detail panel when focus is inside it (preserves the
  // "Esc to close" UX without trapping focus globally like vaul/Radix would).
  // ref.current expects null not undefined for div ref
  // eslint-disable-next-line no-null/no-null
  const detailPanelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!drawerItem) return undefined;
    const node = detailPanelRef.current;
    if (!node) return undefined;
    const handleDetailKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseDetail();
      }
    };
    node.addEventListener('keydown', handleDetailKeyDown);
    return () => node.removeEventListener('keydown', handleDetailKeyDown);
    // handleCloseDetail uses refs/state setters that are stable enough; we only
    // re-bind when the open/close edge transitions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerItem]);

  if (isLoading) {
    return (
      <div className={cn('tw:flex tw:flex-col tw:gap-2 tw:p-2', className)}>
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton
            // Loading skeleton placeholders don't have meaningful keys
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={cn('tw:h-12 tw:w-full tw:rounded', {
              'tw:h-20': variant === 'thumbnail',
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
          'tw:flex tw:items-center tw:justify-center tw:p-8 tw:text-sm tw:text-muted-foreground',
          className,
        )}
      >
        {emptyStateMessage}
      </div>
    );
  }

  const listContent = (
    <ul
      role="listbox"
      tabIndex={0}
      // useListbox returns a generic HTMLElement ref for flexibility across element types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      ref={listboxRef as RefObject<HTMLUListElement>}
      aria-activedescendant={activeId ?? undefined}
      className="tw:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background"
      onKeyDown={handleKeyDown}
    >
      {items.map((item) => {
        const isSelected = effectiveSelectedId === item.id;
        return (
          <li
            key={item.id}
            id={item.id}
            role="option"
            aria-selected={isSelected}
            tabIndex={-1}
            onClick={() => handleItemSelect(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleItemSelect(item);
              }
            }}
            className={cn(
              'tw:flex tw:cursor-pointer tw:items-center tw:gap-3 tw:p-2 tw:outline-none',
              {
                'tw:bg-muted': isSelected,
                'tw:hover:bg-muted': !isSelected,
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
  );

  const detailElement =
    renderDetailContent && drawerItem
      ? renderDetailContent(drawerItem, handleCloseDetail)
      : undefined;

  return (
    <div ref={containerRef} className={cn('tw:relative tw:flex tw:h-full tw:overflow-hidden', className)}>
      {detailElement ? (
        // Side-by-side ResizablePanelGroup split per PR #2209 stories pattern: list at ~33% with
        // a draggable handle, detail at ~67%. The detail is a sibling of the list (not an overlay)
        // so all controls outside the SLI remain interactive while the detail is open.
        <ResizablePanelGroup direction="horizontal" className="tw:h-full tw:w-full">
          <ResizablePanel defaultSize={33.3333} minSize={20}>
            <div className="tw:h-full tw:overflow-y-auto">{listContent}</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={66.6667} minSize={30}>
            <div
              ref={detailPanelRef}
              role="region"
              aria-label="Selected item details"
              className="tw:h-full tw:overflow-y-auto tw:bg-background tw:p-4"
            >
              {detailElement}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="tw:h-full tw:w-full tw:overflow-y-auto">{listContent}</div>
      )}
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
          className="tw:h-14 tw:w-14 tw:shrink-0 tw:rounded tw:object-cover"
        />
      )}
      <div className="tw:flex tw:flex-1 tw:items-baseline tw:gap-4 tw:overflow-hidden">
        <span className="tw:shrink-0 tw:truncate tw:text-sm">{item.primaryText}</span>
        {showSourceLanguage && item.sourceLanguageText && (
          <span className="tw:truncate tw:text-sm tw:text-muted-foreground">
            {item.sourceLanguageText}
            {showTransliteration && item.transliteration && (
              <span className="tw:ml-1">({item.transliteration})</span>
            )}
          </span>
        )}
      </div>
      <Separator className="tw:absolute tw:bottom-0 tw:left-0 tw:right-0" />
    </>
  );
}
