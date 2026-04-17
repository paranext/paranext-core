import { useState } from 'react';
import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '@/components/shadcn-ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { ChevronRight, ChevronDown, X, List, FolderTree } from 'lucide-react';
import SourceLanguageIndexedList from './source-language-indexed-list.component';
import type {
  ErDictionaryFilteredListProps,
  IndexedListItem,
  SemanticDomain,
} from './source-language-indexed-list.types';

/**
 * ER Dictionary list filtered by semantic domain with 2-level breadcrumb navigation.
 *
 * Layout (top to bottom):
 *
 * 1. **Breadcrumbs**: Always shows exactly 2 levels (`Category > Domain`). Both breadcrumb segments
 *    are interactive. In **dropdown mode** each opens a dropdown with siblings at that level. In
 *    **tree mode** each opens an inline tree panel within the component. When switching a category,
 *    the first child domain is auto-selected.
 * 2. **Dictionary list**: A `SourceLanguageIndexedList` showing entries filtered to the selected
 *    domain. Clicking an entry shows a detail panel inline within the list area.
 * 3. **Navigation mode toggle**: Switch between dropdown and tree navigation.
 *
 * All panels (detail, tree) render **inside this component's bounding box**, never as full-page
 * overlays. Dropdown menus use Radix portals so they correctly layer on top of a parent Dialog.
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
  navigationMode,
  onNavigationModeChange,
  className,
}: ErDictionaryFilteredListProps<T>) {
  const [treeOpen, setTreeOpen] = useState(false);

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

  const openTreePanel = () => setTreeOpen(true);

  // Sibling domains at level 2 (children of the selected level 1)
  const level2Siblings = selectedLevel1Domain.children ?? [];

  return (
    <div className={cn('tw-relative tw-flex tw-h-full tw-flex-col', className)}>
      {/* Breadcrumbs - always 2 levels: Category > Domain */}
      <div className="tw-flex tw-items-center tw-gap-1 tw-border-b tw-px-3 tw-py-2">
        <nav
          aria-label="Semantic domain breadcrumbs"
          className="tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-1"
        >
          {/* Level 1 breadcrumb (Category) */}
          {navigationMode === 'dropdown' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="tw-h-auto tw-gap-1 tw-p-1 tw-text-sm">
                  {selectedLevel1Domain.label}
                  <ChevronDown className="tw-h-3 tw-w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="tw-z-[60]">
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
          ) : (
            <Button variant="ghost" className="tw-h-auto tw-p-1 tw-text-sm" onClick={openTreePanel}>
              {selectedLevel1Domain.label}
            </Button>
          )}

          {/* Separator - always shown since we always have 2 levels */}
          <ChevronRight className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />

          {/* Level 2 breadcrumb (Domain) */}
          {navigationMode === 'dropdown' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="tw-h-auto tw-gap-1 tw-p-1 tw-text-sm tw-font-medium"
                >
                  {effectiveLevel2?.label ?? 'All'}
                  <ChevronDown className="tw-h-3 tw-w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="tw-z-[60]">
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
          ) : (
            <Button
              variant="ghost"
              className="tw-h-auto tw-p-1 tw-text-sm tw-font-medium"
              onClick={openTreePanel}
            >
              {effectiveLevel2?.label ?? 'All'}
            </Button>
          )}
        </nav>
      </div>

      {/* Main content area: list OR tree panel (mutually exclusive, both inline) */}
      <div className="tw-relative tw-flex-1 tw-overflow-hidden">
        {treeOpen ? (
          /* Inline tree panel - renders inside this container, not as a portal */
          <div className="tw-absolute tw-inset-0 tw-z-10 tw-flex tw-flex-col tw-bg-background">
            <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-px-3 tw-py-2">
              <span className="tw-text-sm tw-font-semibold">Semantic Domains</span>
              <Button
                variant="ghost"
                size="icon"
                className="tw-h-7 tw-w-7"
                onClick={() => setTreeOpen(false)}
              >
                <X className="tw-h-4 tw-w-4" />
              </Button>
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
        ) : (
          /* Dictionary list with optional inline detail panel */
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
        )}
      </div>

      {/* Navigation mode toggle at the bottom */}
      <div className="tw-flex tw-items-center tw-justify-end tw-border-t tw-px-3 tw-py-1.5">
        <ToggleGroup
          type="single"
          value={navigationMode}
          onValueChange={(value) => {
            if (value === 'tree' || value === 'dropdown') {
              onNavigationModeChange?.(value);
            }
          }}
        >
          <ToggleGroupItem
            value="dropdown"
            aria-label="Dropdown navigation"
            className="tw-h-7 tw-w-7 tw-p-0"
          >
            <List className="tw-h-3.5 tw-w-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="tree"
            aria-label="Tree navigation"
            className="tw-h-7 tw-w-7 tw-p-0"
          >
            <FolderTree className="tw-h-3.5 tw-w-3.5" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

/** Full 2-level domain tree rendered inline within the component */
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
