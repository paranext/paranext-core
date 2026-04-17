import { useEffect, useRef, useState } from 'react';
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
 * **Breadcrumb bar**: A single clickable button showing the domain path left-aligned. When space is
 * limited, intermediate segments collapse into an ellipsis (`...`) while the root ("Domain") and
 * the deepest segments stay visible. The last segment is bold. Hovering a segment underlines it.
 * Clicking the breadcrumb bar opens a popover with a searchable expandable domain tree (combobox
 * pattern). The tree auto-expands to and scrolls to the currently selected domain. Filtering keeps
 * ancestor nodes visible and highlights matching characters.
 *
 * **Close button**: An X button on the right to dismiss the filtered view.
 *
 * Below the header: a `SourceLanguageIndexedList` for the filtered entries.
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

  const handleDomainSelect = (path: SemanticDomain[]) => {
    onDomainChange(path);
    setPopoverOpen(false);
  };

  return (
    <div className={cn('tw-relative tw-flex tw-h-full tw-flex-col tw-overflow-hidden', className)}>
      {/* Header: breadcrumb button + close */}
      <div className="tw-flex tw-items-center tw-gap-1 tw-border-b tw-px-2 tw-py-1.5">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="tw-group tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-1 tw-overflow-hidden tw-rounded tw-px-1.5 tw-py-1 tw-text-left hover:tw-bg-muted"
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

        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="tw-h-7 tw-w-7 tw-shrink-0"
            onClick={onClose}
            aria-label="Close filtered view"
          >
            <X className="tw-h-4 tw-w-4" />
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
// Breadcrumb display: left-aligned, ellipsis collapse, last item bold,
// hover underlines individual segments
// ---------------------------------------------------------------------------

function BreadcrumbDisplay({ path }: { path: SemanticDomain[] }) {
  // ref.current expects null not undefined for div ref
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(path.length);

  // Measure which segments fit. Show root + ellipsis + trailing segments.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver(() => {
      // Reset to try full path
      setVisibleCount(path.length);
      requestAnimationFrame(() => {
        if (!el) return;
        if (el.scrollWidth > el.clientWidth) {
          // Binary search for how many trailing segments fit with ellipsis
          let lo = 2;
          let hi = path.length;
          while (lo < hi) {
            const mid = Math.ceil((lo + hi) / 2);
            setVisibleCount(mid);
            // We can't measure synchronously after setState, so use a simpler heuristic:
            // just show fewer if overflowing
            hi = mid - 1;
          }
          setVisibleCount(Math.max(2, lo));
        }
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [path.length]);

  // Always show root ("Domain" label). If collapsed, show root + ... + trailing segments.
  const showEllipsis = visibleCount < path.length;
  const rootItem = path[0];
  const trailingItems = showEllipsis ? path.slice(-(visibleCount - 1)) : path.slice(1);

  return (
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
  );
}

// ---------------------------------------------------------------------------
// Domain search tree: filterable tree inside a popover, with highlight and
// ancestor retention
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
  // ref.current expects null not undefined for element ref
  // eslint-disable-next-line no-null/no-null
  const selectedRef = useRef<HTMLButtonElement>(null);

  // Scroll to current selection when opening
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

/** Check if a domain or any descendant matches the filter */
function domainMatchesFilter(domain: SemanticDomain, filter: string): boolean {
  if (domain.label.toLowerCase().includes(filter)) return true;
  return domain.children?.some((child) => domainMatchesFilter(child, filter)) ?? false;
}

/** Highlight matching characters in a label */
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
        // When filtering, skip domains (and subtrees) that don't match
        if (filter && !domainMatchesFilter(domain, filter)) return undefined;

        const thisPath = [...parentPath, domain];
        const isInCurrentPath = currentPath.some((d) => d.id === domain.id);
        const isSelected =
          currentPath.length > 0 && currentPath[currentPath.length - 1].id === domain.id;
        const hasChildren = domain.children && domain.children.length > 0;
        // Auto-expand: when filtering (show all matches), or when on current path
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

  // Re-expand when filter or path changes
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
