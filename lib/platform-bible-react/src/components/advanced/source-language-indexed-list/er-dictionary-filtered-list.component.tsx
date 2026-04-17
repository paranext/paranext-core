import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { ArrowUp, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Z_INDEX_MODAL } from '@/components/z-index';
import type {
  ErDictionaryFilteredListProps,
  IndexedListItem,
  SemanticDomain,
} from './source-language-indexed-list.types';

/**
 * ER Dictionary list filtered by semantic domain with breadcrumb navigation.
 *
 * Each breadcrumb segment opens a DropdownMenu with a keyboard-navigable domain tree. The list
 * supports arrow-key navigation: in wide mode arrows immediately select items; in narrow mode
 * arrows move focus and Enter/Space submits.
 */
export default function ErDictionaryFilteredList<T extends IndexedListItem>({
  items,
  renderItem,
  renderDetailContent,
  onItemClick,
  selectedItemId,
  emptyStateMessage,
  isLoading,
  domainPath,
  allDomains,
  onDomainChange,
  onClose,
  className,
}: ErDictionaryFilteredListProps<T>) {
  const [selectedId, setSelectedId] = useState<string | undefined>(selectedItemId);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line no-null/no-null
  const listRef = useRef<HTMLUListElement>(null);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      setNarrow((entry?.contentRect.width ?? 0) < 350);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleDomainSelect = useCallback(
    (path: SemanticDomain[]) => {
      onDomainChange(path);
      setSelectedId(undefined);
    },
    [onDomainChange],
  );

  const selectedItem = items.find((item) => item.id === selectedId);
  const showSideBySide = selectedItem && !narrow;
  const showFullDetail = selectedItem && narrow;

  const selectItem = useCallback(
    (item: T) => {
      onItemClick?.(item);
      setSelectedId(item.id === selectedId ? undefined : item.id);
    },
    [onItemClick, selectedId],
  );

  // List keyboard: arrow keys navigate, behavior depends on narrow/wide.
  // First keypress starts from the selected item (or first/last if none selected).
  const handleListKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (items.length === 0) return;
      const selectedIdx = selectedId ? items.findIndex((i) => i.id === selectedId) : -1;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        let next: number;
        if (focusedIndex < 0) {
          // First press: start at selected item, or first item
          next = selectedIdx >= 0 ? Math.min(selectedIdx + 1, items.length - 1) : 0;
        } else {
          next = Math.min(focusedIndex + 1, items.length - 1);
        }
        setFocusedIndex(next);
        if (!narrow) selectItem(items[next]);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        let prev: number;
        if (focusedIndex < 0) {
          // First press: start at selected item, or last item
          prev = selectedIdx >= 0 ? Math.max(selectedIdx - 1, 0) : items.length - 1;
        } else {
          prev = Math.max(focusedIndex - 1, 0);
        }
        setFocusedIndex(prev);
        if (!narrow) selectItem(items[prev]);
      } else if ((e.key === 'Enter' || e.key === ' ') && narrow && focusedIndex >= 0) {
        e.preventDefault();
        selectItem(items[focusedIndex]);
      }
    },
    [items, focusedIndex, narrow, selectItem, selectedId],
  );

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex < 0 || !listRef.current) return;
    const li = listRef.current.children[focusedIndex] as HTMLElement | undefined;
    li?.scrollIntoView({ block: 'nearest' });
  }, [focusedIndex]);

  return (
    <div className={cn('tw-flex tw-h-full tw-flex-col tw-overflow-hidden', className)}>
      {/* Header: breadcrumbs + back */}
      <div className="tw-flex tw-items-center tw-gap-1 tw-border-b tw-px-2 tw-py-1.5">
        <div className="tw-min-w-0 tw-flex-1">
          <BreadcrumbBar
            path={domainPath}
            allDomains={allDomains}
            onDomainSelect={handleDomainSelect}
          />
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" className="tw-shrink-0 tw-gap-1" onClick={onClose}>
            <ArrowUp className="tw-h-4 tw-w-4" />
            Back
          </Button>
        )}
      </div>

      {/* Inline list + detail */}
      <div ref={containerRef} className="tw-relative tw-flex tw-flex-1 tw-overflow-hidden">
        {!showFullDetail && (
          <div
            className={cn(
              'tw-h-full',
              showSideBySide
                ? 'tw-w-1/3 tw-min-w-[120px] tw-overflow-hidden tw-border-r'
                : 'tw-w-full tw-overflow-y-auto',
            )}
          >
            {isLoading ? (
              <div className="tw-p-4 tw-text-sm tw-text-muted-foreground">Loading...</div>
            ) : items.length === 0 ? (
              <div className="tw-p-4 tw-text-sm tw-text-muted-foreground">
                {emptyStateMessage ?? 'No items found'}
              </div>
            ) : (
              <ul
                ref={listRef}
                role="listbox"
                tabIndex={0}
                className="tw-outline-none"
                onKeyDown={handleListKeyDown}
              >
                {items.map((item, idx) => {
                  const isSelected = selectedId === item.id;
                  const isFocused = focusedIndex === idx;
                  return (
                    <li
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setFocusedIndex(-1);
                        selectItem(item);
                      }}
                      className={cn('tw-cursor-pointer tw-border-b tw-p-2', {
                        'tw-bg-muted': isSelected,
                        'hover:tw-bg-muted': !isSelected,
                        'tw-ring-1 tw-ring-inset tw-ring-ring': isFocused && !isSelected,
                      })}
                    >
                      {renderItem ? (
                        renderItem(item)
                      ) : (
                        <span className="tw-text-sm">{item.primaryText}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
        {selectedItem && renderDetailContent && (
          <div
            className={cn(
              'tw-overflow-y-auto tw-bg-background tw-p-4',
              showFullDetail ? 'tw-w-full' : 'tw-w-2/3',
            )}
          >
            {renderDetailContent(selectedItem, () => setSelectedId(undefined))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// BreadcrumbBar
// ---------------------------------------------------------------------------

function BreadcrumbBar({
  path,
  allDomains,
  onDomainSelect,
}: {
  path: SemanticDomain[];
  allDomains: SemanticDomain[];
  onDomainSelect: (path: SemanticDomain[]) => void;
}) {
  // eslint-disable-next-line no-null/no-null
  const outerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line no-null/no-null
  const fullRef = useRef<HTMLDivElement>(null);
  const [hideCount, setHideCount] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const full = fullRef.current;
    if (!outer || !full) return undefined;

    const measure = () => {
      const available = outer.clientWidth;
      const segEls = Array.from(full.children) as HTMLElement[];
      if (segEls.length === 0) return;

      const fullWidth = segEls.reduce((sum, el) => sum + el.offsetWidth, 0);
      if (fullWidth <= available - 4) {
        setHideCount(0);
        return;
      }

      const widths = segEls.map((el) => el.offsetWidth);
      const totalSegments = path.length;
      const ellipsisWidth = 44;

      for (let h = 1; h < totalSegments; h += 1) {
        let visibleWidth = ellipsisWidth;
        if (h < totalSegments - 1) {
          visibleWidth += widths[0] ?? 0;
          for (let j = h + 1; j < totalSegments; j += 1) visibleWidth += widths[j] ?? 0;
        } else {
          visibleWidth += widths[totalSegments - 1] ?? 0;
        }
        if (visibleWidth <= available - 4) {
          setHideCount(h);
          return;
        }
      }
      setHideCount(totalSegments - 1);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(outer);
    measure();
    return () => observer.disconnect();
  }, [path]);

  const showEllipsis = hideCount > 0;
  const hideRoot = hideCount >= path.length - 1;
  const hiddenSegments = showEllipsis
    ? hideRoot
      ? path.slice(0, -1)
      : path.slice(1, hideCount + 1)
    : [];
  const hiddenTooltip = hiddenSegments.map((d) => d.label).join(' > ');
  const ellipsisExpandId = hiddenSegments[0]?.id ?? path[0]?.id;

  return (
    <div ref={outerRef} className="tw-overflow-hidden">
      {/* Hidden measurement row */}
      <div
        ref={fullRef}
        className="tw-pointer-events-none tw-invisible tw-absolute tw-flex tw-items-center tw-gap-0.5 tw-whitespace-nowrap"
        aria-hidden
      >
        {path.map((d, i) => (
          <span key={d.id} className="tw-flex tw-shrink-0 tw-items-center tw-gap-0.5">
            {i > 0 && <ChevronRight className="tw-h-3 tw-w-3" />}
            <span className="tw-px-1.5 tw-py-1 tw-text-sm">{d.label}</span>
          </span>
        ))}
      </div>

      {/* Visible breadcrumbs */}
      <div className="tw-inline-flex tw-items-center tw-gap-0.5">
        {!hideRoot && path[0] && (
          <SegmentDropdown
            label={path[0].label}
            isLast={path.length === 1}
            allDomains={allDomains}
            currentPath={path}
            expandToId={path[0].id}
            onDomainSelect={onDomainSelect}
          />
        )}

        {showEllipsis && (
          <>
            {!hideRoot && (
              <ChevronRight className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />
            )}
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <SegmentDropdown
                      label={<MoreHorizontal className="tw-h-3 tw-w-3" />}
                      isLast={false}
                      allDomains={allDomains}
                      currentPath={path}
                      expandToId={ellipsisExpandId ?? path[0]?.id ?? ''}
                      onDomainSelect={onDomainSelect}
                      isEllipsis
                    />
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="tw-text-xs">{hiddenTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}

        {path.map((domain, idx) => {
          if (idx === 0) return undefined;
          if (idx <= hideCount) return undefined;
          const isLast = idx === path.length - 1;
          return (
            <span key={domain.id} className="tw-flex tw-shrink-0 tw-items-center tw-gap-0.5">
              <ChevronRight className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />
              <SegmentDropdown
                label={domain.label}
                isLast={isLast}
                allDomains={allDomains}
                currentPath={path}
                expandToId={domain.id}
                onDomainSelect={onDomainSelect}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SegmentDropdown
// ---------------------------------------------------------------------------

function SegmentDropdown({
  label,
  isLast,
  allDomains,
  currentPath,
  expandToId,
  onDomainSelect,
  isEllipsis = false,
}: {
  label: React.ReactNode;
  isLast: boolean;
  allDomains: SemanticDomain[];
  currentPath: SemanticDomain[];
  expandToId: string;
  onDomainSelect: (path: SemanticDomain[]) => void;
  isEllipsis?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (newPath: SemanticDomain[]) => {
      onDomainSelect(newPath);
      setOpen(false);
    },
    [onDomainSelect],
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'tw-shrink-0 tw-cursor-pointer tw-rounded tw-text-sm hover:tw-bg-muted',
            isEllipsis ? 'tw-flex tw-items-center tw-px-1 tw-py-1' : 'tw-px-1.5 tw-py-1',
            isLast && !isEllipsis && 'tw-font-bold',
          )}
        >
          {label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="tw-max-h-[500px] tw-w-[300px] tw-overflow-y-auto tw-p-1"
        style={{ zIndex: Z_INDEX_MODAL + 10 }}
        onEscapeKeyDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen(false);
        }}
        onKeyDown={(e) => {
          // Prevent all keyboard events from reaching the parent Drawer
          if (e.key === 'Escape') {
            e.stopPropagation();
          }
        }}
      >
        <TreeKeyboardContainer
          domains={allDomains}
          currentPath={currentPath}
          expandToId={expandToId}
          onSelect={handleSelect}
          onClose={() => setOpen(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ---------------------------------------------------------------------------
// Tree with custom keyboard navigation
// ---------------------------------------------------------------------------

/**
 * Wraps the domain tree and implements custom keyboard navigation:
 *
 * - ArrowDown / ArrowUp: move focus through all visible buttons (domain labels + expand/collapse)
 * - Tab / Shift+Tab: same as arrow keys (cycle through buttons)
 * - Enter / Space on a domain label: select it
 * - Enter / Space on an expand/collapse button: toggle expand
 * - Escape: close the dropdown (stops propagation so the parent drawer stays open)
 */
function TreeKeyboardContainer({
  domains,
  currentPath,
  expandToId,
  onSelect,
  onClose,
}: {
  domains: SemanticDomain[];
  currentPath: SemanticDomain[];
  expandToId: string;
  onSelect: (path: SemanticDomain[]) => void;
  onClose: () => void;
}) {
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line no-null/no-null
  const scrollRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      // Focus and scroll to the expand target
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ block: 'center' });
        scrollRef.current.focus();
      }
    });
  }, [expandToId]);

  const getFocusableButtons = (): HTMLButtonElement[] => {
    if (!containerRef.current) return [];
    return Array.from(containerRef.current.querySelectorAll('button'));
  };

  const moveFocus = (direction: 1 | -1) => {
    const buttons = getFocusableButtons();
    if (buttons.length === 0) return;
    const currentIdx = buttons.indexOf(document.activeElement as HTMLButtonElement);
    let nextIdx = currentIdx + direction;
    if (nextIdx < 0) nextIdx = buttons.length - 1;
    if (nextIdx >= buttons.length) nextIdx = 0;
    buttons[nextIdx].focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        moveFocus(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        moveFocus(-1);
        break;
      case 'Tab':
        e.preventDefault();
        e.stopPropagation();
        moveFocus(e.shiftKey ? -1 : 1);
        break;
      case 'Escape':
        e.preventDefault();
        e.stopPropagation();
        onClose();
        break;
      default:
        break;
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div ref={containerRef} onKeyDown={handleKeyDown}>
      <TreeNodeList
        domains={domains}
        currentPath={currentPath}
        expandToId={expandToId}
        onSelect={onSelect}
        parentPath={[]}
        scrollRef={scrollRef}
      />
    </div>
  );
}

function isAncestorOf(domain: SemanticDomain, targetId: string): boolean {
  if (domain.id === targetId) return true;
  return domain.children?.some((child) => isAncestorOf(child, targetId)) ?? false;
}

function TreeNodeList({
  domains,
  currentPath,
  expandToId,
  onSelect,
  parentPath,
  scrollRef,
}: {
  domains: SemanticDomain[];
  currentPath: SemanticDomain[];
  expandToId: string;
  onSelect: (path: SemanticDomain[]) => void;
  parentPath: SemanticDomain[];
  scrollRef: React.RefObject<HTMLButtonElement>;
}) {
  return (
    <ul className={cn('tw-space-y-0.5', { 'tw-ml-3': parentPath.length > 0 })}>
      {domains.map((domain) => {
        const thisPath = [...parentPath, domain];
        const isSelected =
          currentPath.length > 0 && currentPath[currentPath.length - 1].id === domain.id;
        const hasChildren = domain.children && domain.children.length > 0;
        const isOnPath = currentPath.some((d) => d.id === domain.id);
        const containsTarget = isAncestorOf(domain, expandToId);
        const shouldExpand = isOnPath || containsTarget;
        const isScrollTarget = domain.id === expandToId;

        return (
          <TreeNode
            key={domain.id}
            domain={domain}
            thisPath={thisPath}
            isSelected={isSelected}
            hasChildren={hasChildren ?? false}
            defaultExpanded={shouldExpand}
            currentPath={currentPath}
            expandToId={expandToId}
            onSelect={onSelect}
            scrollRef={scrollRef}
            isScrollTarget={isScrollTarget}
          />
        );
      })}
    </ul>
  );
}

function TreeNode({
  domain,
  thisPath,
  isSelected,
  hasChildren,
  defaultExpanded,
  currentPath,
  expandToId,
  onSelect,
  scrollRef,
  isScrollTarget,
}: {
  domain: SemanticDomain;
  thisPath: SemanticDomain[];
  isSelected: boolean;
  hasChildren: boolean;
  defaultExpanded: boolean;
  currentPath: SemanticDomain[];
  expandToId: string;
  onSelect: (path: SemanticDomain[]) => void;
  scrollRef: React.RefObject<HTMLButtonElement>;
  isScrollTarget: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  useEffect(() => {
    if (defaultExpanded) setExpanded(true);
  }, [defaultExpanded]);

  return (
    <li>
      <div className="tw-flex tw-items-center tw-gap-0.5">
        {hasChildren ? (
          <button
            type="button"
            className="tw-flex tw-h-5 tw-w-5 tw-shrink-0 tw-items-center tw-justify-center tw-rounded hover:tw-bg-muted focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-ring"
            onClick={() => setExpanded(!expanded)}
          >
            <ChevronRight
              className={cn('tw-h-3 tw-w-3 tw-transition-transform', {
                'tw-rotate-90': expanded,
              })}
            />
          </button>
        ) : (
          <span className="tw-w-5 tw-shrink-0" />
        )}
        <button
          type="button"
          ref={isScrollTarget ? scrollRef : undefined}
          className={cn(
            'tw-flex-1 tw-rounded tw-px-1.5 tw-py-0.5 tw-text-left tw-text-sm focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-ring',
            isSelected ? 'tw-bg-accent tw-font-medium' : 'hover:tw-bg-muted',
          )}
          onClick={() => onSelect(thisPath)}
        >
          {domain.label}
        </button>
      </div>
      {expanded && hasChildren && (
        <TreeNodeList
          domains={domain.children!}
          currentPath={currentPath}
          expandToId={expandToId}
          onSelect={onSelect}
          parentPath={thisPath}
          scrollRef={scrollRef}
        />
      )}
    </li>
  );
}
