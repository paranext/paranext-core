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
 * Each breadcrumb segment (including the ellipsis) is clickable and opens a DropdownMenu (modal)
 * aligned to that segment, showing the expandable domain tree with that segment's level expanded.
 * The DropdownMenu captures keyboard: arrow keys move through items, Tab cycles expand/collapse
 * buttons, Esc closes only the dropdown (not the parent drawer).
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

  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
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
  const handleItemClick = (item: T) => {
    onItemClick?.(item);
    setSelectedId(item.id === selectedId ? undefined : item.id);
  };

  const showSideBySide = selectedItem && !narrow;
  const showFullDetail = selectedItem && narrow;

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
              <ul role="listbox" className="tw-outline-none">
                {items.map((item) => {
                  const isSelected = selectedId === item.id;
                  return (
                    <li
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleItemClick(item)}
                      className={cn('tw-cursor-pointer tw-border-b tw-p-2', {
                        'tw-bg-muted': isSelected,
                        'hover:tw-bg-muted': !isSelected,
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
  // The expand target for the ellipsis dropdown: first hidden segment
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
        {/* Root */}
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

        {/* Ellipsis: clickable (opens dropdown) + tooltip (immediate) */}
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

        {/* Trailing segments */}
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
// SegmentDropdown: a breadcrumb segment that opens a DropdownMenu with domain tree
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

  const handleSelect = (newPath: SemanticDomain[]) => {
    onDomainSelect(newPath);
    setOpen(false);
  };

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
        // Prevent Esc from propagating to the parent Drawer
        onEscapeKeyDown={(e) => {
          e.stopPropagation();
          setOpen(false);
        }}
      >
        <DomainTreeContent
          domains={allDomains}
          currentPath={currentPath}
          expandToId={expandToId}
          onSelect={handleSelect}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ---------------------------------------------------------------------------
// Domain tree inside dropdown (proper keyboard: focusable buttons, Esc stops)
// ---------------------------------------------------------------------------

function DomainTreeContent({
  domains,
  currentPath,
  expandToId,
  onSelect,
}: {
  domains: SemanticDomain[];
  currentPath: SemanticDomain[];
  expandToId: string;
  onSelect: (path: SemanticDomain[]) => void;
}) {
  // eslint-disable-next-line no-null/no-null
  const scrollRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollIntoView({ block: 'center' });
    });
  }, [expandToId]);

  return (
    // Role="menu" wrapping div so arrow keys work natively via the DropdownMenu Radix primitive.
    // We use onKeyDown at this level to trap Esc.
    <div
      onKeyDown={(e) => {
        if (e.key === 'Escape') e.stopPropagation();
      }}
    >
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
            tabIndex={0}
            className="tw-flex tw-h-5 tw-w-5 tw-shrink-0 tw-items-center tw-justify-center tw-rounded hover:tw-bg-muted focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-ring"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
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
          tabIndex={0}
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
