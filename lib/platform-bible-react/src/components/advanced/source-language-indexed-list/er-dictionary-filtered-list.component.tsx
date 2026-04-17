import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '@/components/shadcn-ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
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
 * Header row: `[breadcrumb button] ......... [↑ Back]`
 *
 * Below the header: an inline list + detail layout (same pattern as the dictionary tab) where the
 * list and detail are side-by-side flex children. All interactive elements (list items,
 * breadcrumbs, back button, domain links) remain clickable while the detail panel is open.
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
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [clickedSegmentId, setClickedSegmentId] = useState<string | undefined>();
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
      setPopoverOpen(false);
      setSelectedId(undefined);
    },
    [onDomainChange],
  );

  const handleBreadcrumbClick = (segmentId: string) => {
    if (popoverOpen) {
      // Close on re-click
      setPopoverOpen(false);
    } else {
      setClickedSegmentId(segmentId);
      setPopoverOpen(true);
    }
  };

  const selectedItem = items.find((item) => item.id === selectedId);
  const handleItemClick = (item: T) => {
    onItemClick?.(item);
    setSelectedId(item.id === selectedId ? undefined : item.id);
  };

  const showSideBySide = selectedItem && !narrow;
  const showFullDetail = selectedItem && narrow;

  return (
    <div className={cn('tw-flex tw-h-full tw-flex-col tw-overflow-hidden', className)}>
      {/* Header: breadcrumb + back */}
      <div className="tw-flex tw-items-center tw-gap-1 tw-border-b tw-px-2 tw-py-1.5">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <div className="tw-min-w-0 tw-flex-1">
              <BreadcrumbBar path={domainPath} onSegmentClick={handleBreadcrumbClick} />
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="tw-w-full tw-max-w-[400px] tw-p-0"
            style={{ zIndex: Z_INDEX_MODAL + 10 }}
          >
            <DomainTree
              domains={allDomains}
              currentPath={domainPath}
              expandToId={clickedSegmentId}
              onSelect={handleDomainSelect}
            />
          </PopoverContent>
        </Popover>

        {onClose && (
          <Button variant="ghost" size="sm" className="tw-shrink-0 tw-gap-1" onClick={onClose}>
            <ArrowUp className="tw-h-4 tw-w-4" />
            Back
          </Button>
        )}
      </div>

      {/* Inline list + detail (same pattern as dictionary tab) */}
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
// BreadcrumbBar: flicker-free collapse, no hover underline
// ---------------------------------------------------------------------------

function BreadcrumbBar({
  path,
  onSegmentClick,
}: {
  path: SemanticDomain[];
  onSegmentClick: (domainId: string) => void;
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

      // Check if everything fits (include some padding buffer)
      const fullWidth = segEls.reduce((sum, el) => sum + el.offsetWidth, 0);
      if (fullWidth <= available - 8) {
        setHideCount(0);
        return;
      }

      const widths = segEls.map((el) => el.offsetWidth);
      const totalSegments = path.length;
      const ellipsisWidth = 44; // chevron + dots + gaps

      // Try hiding from index 1 inward. Always keep the last segment.
      // When h < totalSegments - 1: show root + ellipsis + trailing (from h+1..end)
      // When h >= totalSegments - 1: show ellipsis + last segment only
      for (let h = 1; h < totalSegments; h += 1) {
        let visibleWidth = ellipsisWidth;

        if (h < totalSegments - 1) {
          // Root is still visible
          visibleWidth += widths[0] ?? 0;
          for (let j = h + 1; j < totalSegments; j += 1) {
            visibleWidth += widths[j] ?? 0;
          }
        } else {
          // Root hidden, only last segment + ellipsis
          visibleWidth += widths[totalSegments - 1] ?? 0;
        }

        if (visibleWidth <= available - 8) {
          setHideCount(h);
          return;
        }
      }

      // Cannot fit even ellipsis + last segment - show just last
      setHideCount(totalSegments - 1);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(outer);
    measure();
    return () => observer.disconnect();
  }, [path]);

  const showEllipsis = hideCount > 0;
  const hideRoot = hideCount >= path.length - 1;

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

      {/* Visible breadcrumbs (inline, hugs content) */}
      <span className="tw-inline-flex tw-items-center tw-gap-0.5 tw-rounded tw-text-left">
        {/* Root */}
        {!hideRoot && path[0] && (
          <BreadcrumbSegment domain={path[0]} isLast={path.length === 1} onClick={onSegmentClick} />
        )}

        {/* Ellipsis */}
        {showEllipsis && (
          <>
            {!hideRoot && (
              <ChevronRight className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />
            )}
            <MoreHorizontal className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />
          </>
        )}

        {/* Trailing visible segments */}
        {path.map((domain, idx) => {
          if (idx === 0) return undefined; // root handled above
          if (idx <= hideCount) return undefined; // hidden
          const isLast = idx === path.length - 1;
          return (
            <BreadcrumbSegment
              key={domain.id}
              domain={domain}
              isLast={isLast}
              onClick={onSegmentClick}
              showChevron
            />
          );
        })}
      </span>
    </div>
  );
}

function BreadcrumbSegment({
  domain,
  isLast,
  onClick,
  showChevron = false,
}: {
  domain: SemanticDomain;
  isLast: boolean;
  onClick: (id: string) => void;
  showChevron?: boolean;
}) {
  return (
    <span className="tw-flex tw-shrink-0 tw-items-center tw-gap-0.5">
      {showChevron && (
        <ChevronRight className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />
      )}
      <span
        className={cn(
          'tw-cursor-pointer tw-rounded tw-px-1.5 tw-py-1 tw-text-sm hover:tw-bg-muted',
          isLast && 'tw-font-bold',
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClick(domain.id);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.stopPropagation();
            onClick(domain.id);
          }
        }}
        role="button"
        tabIndex={0}
      >
        {domain.label}
      </span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Domain tree popover (no search, simple expandable tree)
// ---------------------------------------------------------------------------

function DomainTree({
  domains,
  currentPath,
  expandToId,
  onSelect,
}: {
  domains: SemanticDomain[];
  currentPath: SemanticDomain[];
  expandToId?: string;
  onSelect: (path: SemanticDomain[]) => void;
}) {
  // eslint-disable-next-line no-null/no-null
  const scrollTargetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollTargetRef.current?.scrollIntoView({ block: 'center' });
    });
  }, [expandToId]);

  return (
    <div className="tw-max-h-[500px] tw-overflow-y-auto tw-p-1">
      <TreeNodeList
        domains={domains}
        currentPath={currentPath}
        expandToId={expandToId}
        onSelect={onSelect}
        parentPath={[]}
        scrollTargetRef={scrollTargetRef}
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
  scrollTargetRef,
}: {
  domains: SemanticDomain[];
  currentPath: SemanticDomain[];
  expandToId?: string;
  onSelect: (path: SemanticDomain[]) => void;
  parentPath: SemanticDomain[];
  scrollTargetRef: React.RefObject<HTMLButtonElement>;
}) {
  return (
    <ul className={cn('tw-space-y-0.5', { 'tw-ml-3': parentPath.length > 0 })}>
      {domains.map((domain) => {
        const thisPath = [...parentPath, domain];
        const isSelected =
          currentPath.length > 0 && currentPath[currentPath.length - 1].id === domain.id;
        const hasChildren = domain.children && domain.children.length > 0;
        const isOnPath = currentPath.some((d) => d.id === domain.id);
        const containsTarget = expandToId ? isAncestorOf(domain, expandToId) : false;
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
            scrollTargetRef={scrollTargetRef}
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
  scrollTargetRef,
  isScrollTarget,
}: {
  domain: SemanticDomain;
  thisPath: SemanticDomain[];
  isSelected: boolean;
  hasChildren: boolean;
  defaultExpanded: boolean;
  currentPath: SemanticDomain[];
  expandToId?: string;
  onSelect: (path: SemanticDomain[]) => void;
  scrollTargetRef: React.RefObject<HTMLButtonElement>;
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
            className="tw-flex tw-h-5 tw-w-5 tw-shrink-0 tw-items-center tw-justify-center tw-rounded hover:tw-bg-muted"
            onClick={() => setExpanded(!expanded)}
          >
            <ChevronRight
              className={cn('tw-h-3 tw-w-3 tw-transition-transform', { 'tw-rotate-90': expanded })}
            />
          </button>
        ) : (
          <span className="tw-w-5 tw-shrink-0" />
        )}
        <button
          type="button"
          ref={isScrollTarget ? scrollTargetRef : undefined}
          className={cn(
            'tw-flex-1 tw-rounded tw-px-1.5 tw-py-0.5 tw-text-left tw-text-sm',
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
          scrollTargetRef={scrollTargetRef}
        />
      )}
    </li>
  );
}
