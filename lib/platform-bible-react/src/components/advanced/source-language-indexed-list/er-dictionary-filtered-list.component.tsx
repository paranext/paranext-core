import { useRef, useState } from 'react';
import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '@/components/shadcn-ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from '@/components/shadcn-ui/drawer';
import { ArrowLeft, ChevronRight, FolderTree } from 'lucide-react';
import SourceLanguageIndexedList from './source-language-indexed-list.component';
import type {
  ErDictionaryFilteredListProps,
  IndexedListItem,
  SemanticDomain,
} from './source-language-indexed-list.types';

/**
 * ER Dictionary list filtered by semantic domain with breadcrumb navigation (up to 5 levels).
 *
 * Breadcrumb row: `[← Back] ... > Level3 > Level4 > Level5 ......... [🌳]`
 *
 * Breadcrumbs truncate from the **left** with "..." when space is limited. The rightmost segments
 * are always visible. Clicking any breadcrumb segment navigates to that domain.
 *
 * The tree button opens a **bottom Drawer** (scoped to this component) that fills the full height
 * of the container, showing the expandable domain tree.
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
  onBack,
  className,
}: ErDictionaryFilteredListProps<T>) {
  const [treeOpen, setTreeOpen] = useState(false);
  // ref.current expects null not undefined for div ref
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTreeSelect = (path: SemanticDomain[]) => {
    onDomainChange(path);
    setTreeOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn('tw-relative tw-flex tw-h-full tw-flex-col tw-overflow-hidden', className)}
    >
      {/* Breadcrumb row */}
      <div className="tw-flex tw-items-center tw-gap-1 tw-border-b tw-px-2 tw-py-1.5">
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            className="tw-shrink-0 tw-gap-1"
            onClick={onBack}
            aria-label="Back to dictionary"
          >
            <ArrowLeft className="tw-h-4 tw-w-4" />
            Back
          </Button>
        )}

        <nav
          aria-label="Domain breadcrumbs"
          className="tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden"
          dir="rtl"
        >
          {/* Render breadcrumbs in reverse order so RTL + overflow clips from the LEFT (oldest
              ancestors are clipped first, most-specific domain is always visible). The visual order
              stays correct because each segment is forced back to LTR via dir="ltr". */}
          <div className="tw-flex tw-flex-row-reverse tw-items-center tw-gap-0.5" dir="ltr">
            {domainPath.map((domain, idx) => {
              const isLast = idx === domainPath.length - 1;
              return (
                <span key={domain.id} className="tw-flex tw-shrink-0 tw-items-center tw-gap-0.5">
                  {idx > 0 && (
                    <ChevronRight className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />
                  )}
                  {isLast ? (
                    <span className="tw-text-sm tw-font-medium">{domain.label}</span>
                  ) : (
                    <Button
                      variant="link"
                      className="tw-h-auto tw-p-0 tw-text-sm"
                      onClick={() => onDomainChange(domainPath.slice(0, idx + 1))}
                    >
                      {domain.label}
                    </Button>
                  )}
                </span>
              );
            })}
          </div>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="tw-h-7 tw-w-7 tw-shrink-0"
          onClick={() => setTreeOpen(true)}
          aria-label="Browse domain tree"
        >
          <FolderTree className="tw-h-3.5 tw-w-3.5" />
        </Button>
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

      {/* Domain tree bottom Drawer (fills full height of container) */}
      <Drawer direction="bottom" modal={false} open={treeOpen} onOpenChange={setTreeOpen}>
        <DrawerContent
          container={containerRef.current}
          hideDrawerHandle
          className="tw-mt-0 tw-h-full tw-max-h-full tw-rounded-none"
        >
          <div className="tw-flex tw-h-full tw-flex-col">
            <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-px-3 tw-py-2">
              <DrawerTitle className="tw-text-sm tw-font-semibold">Semantic Domains</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="outline" size="sm">
                  Close
                </Button>
              </DrawerClose>
            </div>
            <div className="tw-flex-1 tw-overflow-y-auto tw-p-2">
              <ExpandableTree
                domains={allDomains}
                currentPath={domainPath}
                onSelect={handleTreeSelect}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Expandable tree (recursive, with chevron expand/collapse)
// ---------------------------------------------------------------------------

function ExpandableTree({
  domains,
  currentPath,
  onSelect,
  depth = 0,
}: {
  domains: SemanticDomain[];
  currentPath: SemanticDomain[];
  onSelect: (path: SemanticDomain[]) => void;
  depth?: number;
}) {
  return (
    <ul className={cn('tw-space-y-0.5', { 'tw-ml-4': depth > 0 })}>
      {domains.map((domain) => (
        <ExpandableTreeNode
          key={domain.id}
          domain={domain}
          currentPath={currentPath}
          onSelect={onSelect}
          depth={depth}
          parentPath={[]}
        />
      ))}
    </ul>
  );
}

function ExpandableTreeNode({
  domain,
  currentPath,
  onSelect,
  depth,
  parentPath,
}: {
  domain: SemanticDomain;
  currentPath: SemanticDomain[];
  onSelect: (path: SemanticDomain[]) => void;
  depth: number;
  parentPath: SemanticDomain[];
}) {
  const thisPath = [...parentPath, domain];
  const isInCurrentPath = currentPath.some((d) => d.id === domain.id);
  const isSelected = currentPath.length > 0 && currentPath[currentPath.length - 1].id === domain.id;
  const hasChildren = domain.children && domain.children.length > 0;
  const [expanded, setExpanded] = useState(isInCurrentPath);

  return (
    <li>
      <div className="tw-flex tw-items-center tw-gap-0.5">
        {hasChildren ? (
          <button
            type="button"
            className="tw-flex tw-h-6 tw-w-6 tw-shrink-0 tw-items-center tw-justify-center tw-rounded hover:tw-bg-muted"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronRight className="tw-h-3.5 tw-w-3.5 tw-rotate-90 tw-transition-transform" />
            ) : (
              <ChevronRight className="tw-h-3.5 tw-w-3.5 tw-transition-transform" />
            )}
          </button>
        ) : (
          <span className="tw-w-6 tw-shrink-0" />
        )}
        <button
          type="button"
          className={cn(
            'tw-flex-1 tw-rounded tw-px-2 tw-py-1 tw-text-left tw-text-sm',
            isSelected ? 'tw-bg-accent tw-font-medium' : 'hover:tw-bg-muted',
            depth === 0 && 'tw-font-semibold',
          )}
          onClick={() => onSelect(thisPath)}
        >
          {domain.label}
        </button>
      </div>
      {expanded && hasChildren && (
        <ul className="tw-ml-4 tw-space-y-0.5">
          {domain.children?.map((child) => (
            <ExpandableTreeNode
              key={child.id}
              domain={child}
              currentPath={currentPath}
              onSelect={onSelect}
              depth={depth + 1}
              parentPath={thisPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
