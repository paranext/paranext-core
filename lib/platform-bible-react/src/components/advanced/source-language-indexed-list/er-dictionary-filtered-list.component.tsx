import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { ChevronRight, MoreHorizontal, X } from 'lucide-react';
import { Z_INDEX_MODAL } from '@/components/z-index';
import SourceLanguageIndexedList from './source-language-indexed-list.component';
import type {
  ErDictionaryFilteredListProps,
  IndexedListItem,
  SemanticDomain,
} from './source-language-indexed-list.types';

/**
 * ER Dictionary list filtered by semantic domain with breadcrumb-based navigation.
 *
 * Header row: `[breadcrumb button (hugs content)] ......... [X Close]`
 *
 * Breadcrumbs collapse dynamically without flicker. Collapse order: start hiding the 2nd-left item,
 * then continue inward until only `root > ... > leaf` remains, then also hide root.
 *
 * Clicking a breadcrumb segment opens the domain tree popover expanded/scrolled to **that** level.
 * The popover has a full-width search input that filters the tree (showing matches + all ancestors)
 * with character-level highlighting.
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

  const handleDomainSelect = useCallback(
    (path: SemanticDomain[]) => {
      onDomainChange(path);
      setPopoverOpen(false);
    },
    [onDomainChange],
  );

  const handleBreadcrumbSegmentClick = (segmentDomainId: string) => {
    setClickedSegmentId(segmentDomainId);
    setPopoverOpen(true);
  };

  return (
    <div className={cn('tw-relative tw-flex tw-h-full tw-flex-col tw-overflow-hidden', className)}>
      {/* Header: breadcrumb button (hugs content) + Close button (right) */}
      <div className="tw-flex tw-items-center tw-gap-1 tw-border-b tw-px-2 tw-py-1.5">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <div className="tw-min-w-0 tw-flex-1">
              <BreadcrumbBar path={domainPath} onSegmentClick={handleBreadcrumbSegmentClick} />
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="tw-w-[min(var(--radix-popover-trigger-width),400px)] tw-p-0"
            style={{ zIndex: Z_INDEX_MODAL + 10 }}
          >
            <DomainSearchTree
              domains={allDomains}
              currentPath={domainPath}
              expandToId={clickedSegmentId}
              onSelect={handleDomainSelect}
            />
          </PopoverContent>
        </Popover>

        {onClose && (
          <Button variant="ghost" size="sm" className="tw-shrink-0 tw-gap-1" onClick={onClose}>
            <X className="tw-h-4 tw-w-4" />
            Close
          </Button>
        )}
      </div>

      {/* Dictionary list */}
      <div className="tw-flex-1 tw-overflow-hidden">
        <SourceLanguageIndexedList
          items={items}
          renderItem={renderItem}
          renderDetailContent={renderDetailContent}
          onItemClick={onItemClick}
          selectedItemId={selectedItemId}
          emptyStateMessage={emptyStateMessage}
          isLoading={isLoading}
          showSourceLanguage
          showTransliteration
          className="tw-h-full"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// BreadcrumbBar: flicker-free dynamic collapse, individual segment hover
// ---------------------------------------------------------------------------

/**
 * Renders the breadcrumb path as a button that hugs its content. Segments collapse dynamically via
 * CSS `overflow: hidden` and a `ResizeObserver` that checks a hidden measurement row. Collapse
 * order: hide the 2nd-left segment first, then 3rd, etc., until only `root > ... > leaf`. If still
 * too wide, also hide root, showing `... > leaf`.
 *
 * Each segment has its own hover underline (not all segments at once).
 */
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

  // Number of segments to hide, starting from the 2nd item (index 1).
  // 0 = show all, 1 = hide index 1, 2 = hide index 1+2, ...
  // If hideCount >= path.length - 1, we also hide root (show only "... > leaf").
  const [hideCount, setHideCount] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const full = fullRef.current;
    if (!outer || !full) return undefined;

    const measure = () => {
      // Measure the full (unhidden) breadcrumb width vs available width
      const available = outer.clientWidth;
      const fullWidth = full.scrollWidth;

      if (fullWidth <= available) {
        setHideCount(0);
        return;
      }

      // Measure individual segment widths from the hidden row
      const segEls = Array.from(full.children) as HTMLElement[];
      const widths = segEls.map((el) => el.offsetWidth);
      const totalSegments = path.length;

      // Try hiding 1, 2, 3, ... segments from index 1 (keeping root + ellipsis + trailing)
      // Ellipsis takes roughly the width of ChevronRight + MoreHorizontal icons
      const ellipsisWidth = 40;

      for (let h = 1; h < totalSegments; h += 1) {
        // Visible segments: root (index 0) + segments after the hidden range + ellipsis
        // Hidden range: indices 1..h
        let visibleWidth = ellipsisWidth;

        // Include root if h < totalSegments - 1 (i.e., we haven't hidden everything except leaf)
        if (h < totalSegments - 1) {
          visibleWidth += widths[0] ?? 0;
        }

        // Include trailing segments (from index h+1 to end)
        for (let j = h + 1; j < totalSegments; j += 1) {
          visibleWidth += widths[j] ?? 0;
        }

        // Always include the last segment (even if h reaches totalSegments - 1)
        if (h >= totalSegments - 1) {
          visibleWidth += widths[totalSegments - 1] ?? 0;
        }

        if (visibleWidth <= available) {
          setHideCount(h);
          return;
        }
      }

      // Everything hidden except leaf
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
      {/* Hidden measurement row (same content, no hiding, invisible) */}
      <div
        ref={fullRef}
        className="tw-pointer-events-none tw-invisible tw-absolute tw-flex tw-items-center tw-gap-0.5 tw-whitespace-nowrap"
        aria-hidden
      >
        {path.map((d, i) => (
          <span key={d.id} className="tw-flex tw-shrink-0 tw-items-center tw-gap-0.5">
            {i > 0 && <ChevronRight className="tw-h-3 tw-w-3" />}
            <span className="tw-text-sm">{d.label}</span>
          </span>
        ))}
      </div>

      {/* Visible breadcrumbs (inline, hugging content) */}
      <button
        type="button"
        className="tw-inline-flex tw-items-center tw-gap-0.5 tw-rounded tw-px-1.5 tw-py-1 tw-text-left hover:tw-bg-muted"
        onClick={(e) => {
          // If the click was on a specific segment span, that handler fires first.
          // This is the fallback for clicking the button padding.
          const lastDomain = path[path.length - 1];
          if (lastDomain) onSegmentClick(lastDomain.id);
          e.stopPropagation();
        }}
      >
        {/* Root segment */}
        {!hideRoot && path[0] && (
          <span
            className="tw-shrink-0 tw-cursor-pointer tw-text-sm hover:tw-underline"
            onClick={(e) => {
              e.stopPropagation();
              onSegmentClick(path[0].id);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.stopPropagation();
                onSegmentClick(path[0].id);
              }
            }}
            role="button"
            tabIndex={0}
          >
            {path[0].label}
          </span>
        )}

        {/* Ellipsis */}
        {showEllipsis && (
          <>
            <ChevronRight className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />
            <MoreHorizontal className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />
          </>
        )}

        {/* Trailing visible segments */}
        {path.map((domain, idx) => {
          // Skip root (handled above) and hidden segments
          if (idx === 0) return undefined;
          if (idx <= hideCount) return undefined;

          const isLast = idx === path.length - 1;
          return (
            <span key={domain.id} className="tw-flex tw-shrink-0 tw-items-center tw-gap-0.5">
              <ChevronRight className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />
              <span
                className={cn(
                  'tw-cursor-pointer tw-text-sm hover:tw-underline',
                  isLast && 'tw-font-bold',
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onSegmentClick(domain.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.stopPropagation();
                    onSegmentClick(domain.id);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {domain.label}
              </span>
            </span>
          );
        })}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Domain search tree: filterable, expands to clicked segment
// ---------------------------------------------------------------------------

function DomainSearchTree({
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
  const [filter, setFilter] = useState('');
  // eslint-disable-next-line no-null/no-null
  const scrollTargetRef = useRef<HTMLButtonElement>(null);

  // Scroll to the expand-target on mount
  useEffect(() => {
    requestAnimationFrame(() => {
      scrollTargetRef.current?.scrollIntoView({ block: 'center' });
    });
  }, [expandToId]);

  const filterLower = filter.toLowerCase();

  return (
    <div className="tw-flex tw-max-h-[300px] tw-flex-col">
      <div className="tw-border-b tw-p-2">
        <Input
          placeholder="Search domains..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="tw-h-8 tw-w-full tw-text-sm"
          autoFocus
        />
      </div>
      <div className="tw-flex-1 tw-overflow-y-auto tw-p-1">
        <TreeNodeList
          domains={domains}
          currentPath={currentPath}
          expandToId={expandToId}
          onSelect={onSelect}
          parentPath={[]}
          filter={filterLower}
          scrollTargetRef={scrollTargetRef}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tree rendering helpers
// ---------------------------------------------------------------------------

function domainMatchesFilter(domain: SemanticDomain, filter: string): boolean {
  if (domain.label.toLowerCase().includes(filter)) return true;
  return domain.children?.some((child) => domainMatchesFilter(child, filter)) ?? false;
}

function HighlightLabel({ label, filter }: { label: string; filter: string }) {
  if (!filter) return <span>{label}</span>;
  const idx = label.toLowerCase().indexOf(filter);
  if (idx < 0) return <span>{label}</span>;
  return (
    <span>
      {label.slice(0, idx)}
      <mark className="tw-bg-yellow-200 tw-text-inherit dark:tw-bg-yellow-800">
        {label.slice(idx, idx + filter.length)}
      </mark>
      {label.slice(idx + filter.length)}
    </span>
  );
}

/** Check if a domain or any ancestor/descendant has the given id */
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
  filter,
  scrollTargetRef,
}: {
  domains: SemanticDomain[];
  currentPath: SemanticDomain[];
  expandToId?: string;
  onSelect: (path: SemanticDomain[]) => void;
  parentPath: SemanticDomain[];
  filter: string;
  scrollTargetRef: React.RefObject<HTMLButtonElement>;
}) {
  return (
    <ul className={cn('tw-space-y-0.5', { 'tw-ml-3': parentPath.length > 0 })}>
      {domains.map((domain) => {
        if (filter && !domainMatchesFilter(domain, filter)) return undefined;

        const thisPath = [...parentPath, domain];
        const isSelected =
          currentPath.length > 0 && currentPath[currentPath.length - 1].id === domain.id;
        const hasChildren = domain.children && domain.children.length > 0;
        // Expand if: filtering, on current path, or contains the expand target
        const isOnCurrentPath = currentPath.some((d) => d.id === domain.id);
        const containsTarget = expandToId ? isAncestorOf(domain, expandToId) : false;
        const shouldStartExpanded = !!filter || isOnCurrentPath || containsTarget;
        // Scroll target: the domain matching expandToId
        const isScrollTarget = domain.id === expandToId;

        return (
          <TreeNode
            key={domain.id}
            domain={domain}
            thisPath={thisPath}
            isSelected={isSelected}
            hasChildren={hasChildren ?? false}
            defaultExpanded={shouldStartExpanded}
            currentPath={currentPath}
            expandToId={expandToId}
            onSelect={onSelect}
            filter={filter}
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
  filter,
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
  filter: string;
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
          ref={isScrollTarget ? scrollTargetRef : undefined}
          className={cn(
            'tw-flex-1 tw-rounded tw-px-1.5 tw-py-0.5 tw-text-left tw-text-sm',
            isSelected ? 'tw-bg-accent tw-font-medium' : 'hover:tw-bg-muted',
          )}
          onClick={() => onSelect(thisPath)}
        >
          <HighlightLabel label={domain.label} filter={filter} />
        </button>
      </div>
      {expanded && hasChildren && (
        <TreeNodeList
          domains={domain.children!}
          currentPath={currentPath}
          expandToId={expandToId}
          onSelect={onSelect}
          parentPath={thisPath}
          filter={filter}
          scrollTargetRef={scrollTargetRef}
        />
      )}
    </li>
  );
}
