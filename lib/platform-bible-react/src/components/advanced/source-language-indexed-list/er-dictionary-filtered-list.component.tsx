import { useRef, useState } from 'react';
import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from '@/components/shadcn-ui/drawer';
import { ArrowLeft, ChevronDown, FolderTree } from 'lucide-react';
import { Z_INDEX_MODAL } from '@/components/z-index';
import SourceLanguageIndexedList from './source-language-indexed-list.component';
import type {
  ErDictionaryFilteredListProps,
  IndexedListItem,
  SemanticDomain,
} from './source-language-indexed-list.types';

/** Z-index that sits above the Dialog modal layer so dropdowns are visible */
const Z_ABOVE_MODAL = Z_INDEX_MODAL + 10;

/**
 * ER Dictionary list filtered by semantic domain with 2-level breadcrumb navigation.
 *
 * Breadcrumb row layout: `[← back] [Category ▼] · [Domain ▼] ........... [🌳]`
 *
 * - **Back arrow** (icon only, no text): navigates back when `onBack` is provided.
 * - **Breadcrumbs** with dot separator: both segments are dropdowns showing siblings at that level.
 *   When switching a category the first child domain is auto-selected.
 * - **Tree button** (right-aligned): opens a scoped Drawer with the full 2-level domain tree.
 *
 * Below the breadcrumbs: a `SourceLanguageIndexedList` showing entries filtered to the selected
 * domain. Clicking an entry opens a detail panel inline within the list area.
 *
 * Domains are always exactly 2 levels deep.
 */
export default function ErDictionaryFilteredList<T extends IndexedListItem>({
  items,
  renderItem,
  renderDetailContent,
  onItemClick,
  selectedItemId,
  emptyStateMessage,
  isLoading,
  selectedLevel1Domain,
  selectedLevel2Domain,
  allDomains,
  onDomainChange,
  onBack,
  className,
}: ErDictionaryFilteredListProps<T>) {
  const [treeOpen, setTreeOpen] = useState(false);
  // ref.current expects null not undefined for div ref
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure we always have a level-2 domain; fall back to first child
  const effectiveLevel2 = selectedLevel2Domain ?? selectedLevel1Domain.children?.[0];

  const handleCategoryChange = (newLevel1: SemanticDomain) => {
    // Auto-select the first child domain when switching categories
    onDomainChange(newLevel1, newLevel1.children?.[0]);
  };

  const handleDomainSelectFromTree = (level1: SemanticDomain, level2?: SemanticDomain) => {
    onDomainChange(level1, level2 ?? level1.children?.[0]);
    setTreeOpen(false);
  };

  // Sibling domains at level 2 (children of the selected level 1)
  const level2Siblings = selectedLevel1Domain.children ?? [];

  return (
    <div
      ref={containerRef}
      className={cn('tw-relative tw-flex tw-h-full tw-flex-col tw-overflow-hidden', className)}
    >
      {/* Breadcrumb row: [← back] [Category ▼] · [Domain ▼] ... [tree] */}
      <div className="tw-flex tw-items-center tw-gap-1 tw-border-b tw-px-2 tw-py-1.5">
        {/* Back arrow (icon only) */}
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            className="tw-h-7 tw-w-7 tw-shrink-0"
            onClick={onBack}
            aria-label="Back to dictionary"
          >
            <ArrowLeft className="tw-h-4 tw-w-4" />
          </Button>
        )}

        {/* Breadcrumbs with dot separator */}
        <nav
          aria-label="Semantic domain breadcrumbs"
          className="tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-0.5"
        >
          {/* Level 1 (Category) dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="tw-h-auto tw-gap-1 tw-px-1.5 tw-py-0.5 tw-text-sm">
                {selectedLevel1Domain.label}
                <ChevronDown className="tw-h-3 tw-w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" style={{ zIndex: Z_ABOVE_MODAL }}>
              {allDomains.map((domain) => (
                <DropdownMenuItem
                  key={domain.id}
                  className={cn({
                    'tw-font-medium': domain.id === selectedLevel1Domain.id,
                  })}
                  onClick={() => handleCategoryChange(domain)}
                >
                  {domain.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dot separator */}
          <span className="tw-select-none tw-text-muted-foreground" aria-hidden>
            &middot;
          </span>

          {/* Level 2 (Domain) dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="tw-h-auto tw-gap-1 tw-px-1.5 tw-py-0.5 tw-text-sm tw-font-medium"
              >
                {effectiveLevel2?.label ?? 'All'}
                <ChevronDown className="tw-h-3 tw-w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" style={{ zIndex: Z_ABOVE_MODAL }}>
              {level2Siblings.map((domain) => (
                <DropdownMenuItem
                  key={domain.id}
                  className={cn({
                    'tw-font-medium': domain.id === effectiveLevel2?.id,
                  })}
                  onClick={() => onDomainChange(selectedLevel1Domain, domain)}
                >
                  {domain.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Tree button (right-aligned) */}
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

      {/* Domain tree Drawer - scoped to this component */}
      <Drawer direction="right" modal={false} open={treeOpen} onOpenChange={setTreeOpen}>
        <DrawerContent
          container={containerRef.current}
          hideDrawerHandle
          className="tw-ml-0 tw-w-4/5 tw-max-w-none tw-rounded-none"
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
              <DomainTreeView
                domains={allDomains}
                selectedLevel1Id={selectedLevel1Domain.id}
                selectedLevel2Id={effectiveLevel2?.id}
                onSelect={handleDomainSelectFromTree}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

/** Full 2-level domain tree rendered inside the drawer */
function DomainTreeView({
  domains,
  selectedLevel1Id,
  selectedLevel2Id,
  onSelect,
}: {
  domains: SemanticDomain[];
  selectedLevel1Id: string;
  selectedLevel2Id?: string;
  onSelect: (level1: SemanticDomain, level2?: SemanticDomain) => void;
}) {
  return (
    <ul className="tw-space-y-1">
      {domains.map((level1) => (
        <li key={level1.id}>
          <span
            className={cn('tw-block tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold', {
              'tw-text-primary': level1.id === selectedLevel1Id,
            })}
          >
            {level1.label}
          </span>
          {level1.children && level1.children.length > 0 && (
            <ul className="tw-ml-3 tw-space-y-0.5">
              {level1.children.map((level2) => (
                <li key={level2.id}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'tw-h-auto tw-w-full tw-justify-start tw-px-2 tw-py-1 tw-text-sm',
                      {
                        'tw-bg-accent tw-font-medium':
                          level1.id === selectedLevel1Id && level2.id === selectedLevel2Id,
                      },
                    )}
                    onClick={() => onSelect(level1, level2)}
                  >
                    {level2.label}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
