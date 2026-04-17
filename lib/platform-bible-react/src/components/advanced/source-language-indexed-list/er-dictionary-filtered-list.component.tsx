import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { ArrowUp, ChevronRight, MoreHorizontal } from 'lucide-react';
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
 * Header layout (top to bottom):
 *
 * 1. "Back to dictionary" button with arrow-up icon to slide the drawer back down.
 * 2. Breadcrumb bar: a single clickable button showing the domain path left-aligned. When space is
 *    limited, intermediate segments collapse into an ellipsis while the root and deepest segments
 *    stay visible. Last segment is bold. Clicking opens a popover with a searchable expandable
 *    domain tree.
 *
 * The detail panel within `SourceLanguageIndexedList` does not block interaction with the list or
 * header elements because it is rendered as an absolutely-positioned sibling, not a modal overlay.
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

  const handleDomainSelect = useCallback(
    (path: SemanticDomain[]) => {
      onDomainChange(path);
      setPopoverOpen(false);
    },
    [onDomainChange],
  );

  return (
    <div className={cn('tw-relative tw-flex tw-h-full tw-flex-col tw-overflow-hidden', className)}>
      {/* "Back to dictionary" button */}
      {onClose && (
        <div className="tw-border-b tw-px-2 tw-py-1">
          <Button variant="ghost" size="sm" className="tw-gap-1" onClick={onClose}>
            <ArrowUp className="tw-h-4 tw-w-4" />
            Back to dictionary
          </Button>
        </div>
      )}

      {/* Breadcrumb bar */}
      <div className="tw-border-b tw-px-2 tw-py-1">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="tw-group tw-flex tw-w-full tw-min-w-0 tw-items-center tw-gap-1 tw-overflow-hidden tw-rounded tw-px-1.5 tw-py-1 tw-text-left hover:tw-bg-muted"
            >
              <BreadcrumbDisplay path={domainPath} />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="tw-w-[var(--radix-popover-trigger-width)] tw-p-0"
            style={{ zIndex: Z_INDEX_MODAL + 10 }}
          >
            <DomainSearchTree
              domains={allDomains}
              currentPath={domainPath}
              onSelect={handleDomainSelect}
            />
          </PopoverContent>
        </Popover>
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
// Breadcrumb display: left-aligned, stable ellipsis (no flicker), last bold
// ---------------------------------------------------------------------------

/**
 * Renders the breadcrumb path. Uses a hidden measurement pass to determine how many trailing
 * segments fit before the component mounts visually, avoiding flicker. The root segment is always
 * shown; intermediate ones collapse into an ellipsis (`...`) when the container is too narrow.
 */
function BreadcrumbDisplay({ path }: { path: SemanticDomain[] }) {
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line no-null/no-null
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleFromEnd, setVisibleFromEnd] = useState(path.length);

  // Measure once after layout, synchronously before paint, to avoid flicker
  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const availableWidth = container.clientWidth;

    // measureRef contains all segments rendered invisibly. We measure from the right:
    // always keep the root, then try adding trailing segments + ellipsis until it overflows.
    const segments = Array.from(measure.children) as HTMLElement[];
    if (segments.length === 0) return;

    // Full width of all segments
    let totalWidth = 0;
    for (const seg of segments) totalWidth += seg.scrollWidth;

    if (totalWidth <= availableWidth) {
      setVisibleFromEnd(path.length);
      return;
    }

    // Root width + ellipsis (approx 32px for chevron+dots)
    const rootWidth = segments[0].scrollWidth;
    const ellipsisWidth = 32;
    let budget = availableWidth - rootWidth - ellipsisWidth;
    let count = 0;

    // Count from the end how many fit
    for (let i = segments.length - 1; i >= 1 && budget > 0; i -= 1) {
      const segWidth = segments[i].scrollWidth;
      if (segWidth > budget) break;
      budget -= segWidth;
      count += 1;
    }

    setVisibleFromEnd(Math.max(1, count) + 1); // +1 for root
  }, [path]);

  // Also re-measure on resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const observer = new ResizeObserver(() => {
      // Re-run the layout effect by triggering a state update with the full count,
      // then the layout effect will correct it synchronously before paint
      setVisibleFromEnd(path.length);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [path.length]);

  const showEllipsis = visibleFromEnd < path.length;
  const rootItem = path[0];
  const trailingItems = showEllipsis ? path.slice(-(visibleFromEnd - 1)) : path.slice(1);

  return (
    <>
      {/* Hidden measurement div: renders all segments invisibly to measure their widths */}
      <div
        ref={measureRef}
        className="tw-pointer-events-none tw-invisible tw-absolute tw-flex tw-items-center tw-gap-0.5 tw-whitespace-nowrap"
        aria-hidden
      >
        {path.map((domain, idx) => (
          <span key={domain.id} className="tw-flex tw-shrink-0 tw-items-center tw-gap-0.5">
            {idx > 0 && <ChevronRight className="tw-h-3 tw-w-3" />}
            <span className="tw-text-sm">{domain.label}</span>
          </span>
        ))}
      </div>

      {/* Visible breadcrumbs */}
      <div ref={containerRef} className="tw-flex tw-items-center tw-gap-0.5 tw-overflow-hidden">
        {rootItem && (
          <span className="tw-shrink-0 tw-text-sm group-hover:tw-underline">{rootItem.label}</span>
        )}
        {showEllipsis && (
          <>
            <ChevronRight className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />
            <MoreHorizontal className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />
          </>
        )}
        {trailingItems.map((domain, idx) => {
          const isLast = idx === trailingItems.length - 1;
          return (
            <span key={domain.id} className="tw-flex tw-shrink-0 tw-items-center tw-gap-0.5">
              <ChevronRight className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />
              <span
                className={cn('tw-text-sm group-hover:tw-underline', {
                  'tw-font-bold': isLast,
                })}
              >
                {domain.label}
              </span>
            </span>
          );
        })}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Domain search tree
// ---------------------------------------------------------------------------

function DomainSearchTree({
  domains,
  currentPath,
  onSelect,
}: {
  domains: SemanticDomain[];
  currentPath: SemanticDomain[];
  onSelect: (path: SemanticDomain[]) => void;
}) {
  const [filter, setFilter] = useState('');
  // eslint-disable-next-line no-null/no-null
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      selectedRef.current?.scrollIntoView({ block: 'center' });
    });
  }, []);

  const filterLower = filter.toLowerCase();

  return (
    <div className="tw-flex tw-max-h-[300px] tw-flex-col">
      <div className="tw-border-b tw-p-2">
        <Input
          placeholder="Search domains..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="tw-h-8 tw-text-sm"
          autoFocus
        />
      </div>
      <div className="tw-flex-1 tw-overflow-y-auto tw-p-1">
        <FilterableTreeNodes
          domains={domains}
          currentPath={currentPath}
          onSelect={onSelect}
          parentPath={[]}
          filter={filterLower}
          selectedRef={selectedRef}
        />
      </div>
    </div>
  );
}

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

function FilterableTreeNodes({
  domains,
  currentPath,
  onSelect,
  parentPath,
  filter,
  selectedRef,
}: {
  domains: SemanticDomain[];
  currentPath: SemanticDomain[];
  onSelect: (path: SemanticDomain[]) => void;
  parentPath: SemanticDomain[];
  filter: string;
  selectedRef: React.RefObject<HTMLButtonElement>;
}) {
  return (
    <ul className={cn('tw-space-y-0.5', { 'tw-ml-3': parentPath.length > 0 })}>
      {domains.map((domain) => {
        if (filter && !domainMatchesFilter(domain, filter)) return undefined;

        const thisPath = [...parentPath, domain];
        const isInCurrentPath = currentPath.some((d) => d.id === domain.id);
        const isSelected =
          currentPath.length > 0 && currentPath[currentPath.length - 1].id === domain.id;
        const hasChildren = domain.children && domain.children.length > 0;
        const shouldExpand = !!filter || isInCurrentPath;

        return (
          <FilterableTreeNode
            key={domain.id}
            domain={domain}
            thisPath={thisPath}
            isSelected={isSelected}
            hasChildren={hasChildren ?? false}
            defaultExpanded={shouldExpand}
            currentPath={currentPath}
            onSelect={onSelect}
            filter={filter}
            selectedRef={selectedRef}
          />
        );
      })}
    </ul>
  );
}

function FilterableTreeNode({
  domain,
  thisPath,
  isSelected,
  hasChildren,
  defaultExpanded,
  currentPath,
  onSelect,
  filter,
  selectedRef,
}: {
  domain: SemanticDomain;
  thisPath: SemanticDomain[];
  isSelected: boolean;
  hasChildren: boolean;
  defaultExpanded: boolean;
  currentPath: SemanticDomain[];
  onSelect: (path: SemanticDomain[]) => void;
  filter: string;
  selectedRef: React.RefObject<HTMLButtonElement>;
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
          ref={isSelected ? selectedRef : undefined}
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
        <FilterableTreeNodes
          domains={domain.children!}
          currentPath={currentPath}
          onSelect={onSelect}
          parentPath={thisPath}
          filter={filter}
          selectedRef={selectedRef}
        />
      )}
    </li>
  );
}
