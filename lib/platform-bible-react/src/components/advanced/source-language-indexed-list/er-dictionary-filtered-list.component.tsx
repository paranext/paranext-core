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
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from '@/components/shadcn-ui/drawer';
import { ChevronRight, ChevronDown, List, FolderTree } from 'lucide-react';
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
 * 1. **Breadcrumbs**: Always shows 2-level breadcrumbs (`Level 1 > Level 2`). Clicking a breadcrumb
 *    opens either a dropdown (in dropdown mode) or a domain tree drawer (in tree mode) to switch
 *    the domain.
 * 2. **Dictionary list**: A `SourceLanguageIndexedList` showing entries filtered to the selected
 *    domain. Clicking an entry opens a detail drawer.
 * 3. **Navigation mode toggle**: Switch between dropdown and tree view for domain navigation.
 *
 * Domains are always exactly 2 levels deep.
 *
 * @example
 *
 * ```tsx
 * <ErDictionaryFilteredList
 *   items={filteredEntries}
 *   selectedLevel1Domain={level1}
 *   selectedLevel2Domain={level2}
 *   allDomains={allDomains}
 *   onDomainChange={handleDomainChange}
 *   navigationMode="dropdown"
 *   onNavigationModeChange={setNavMode}
 *   renderDetailContent={(item, onClose) => <Detail entry={item} onBack={onClose} />}
 * />;
 * ```
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
  const [treeDrawerOpen, setTreeDrawerOpen] = useState(false);

  const handleLevel1BreadcrumbClick = () => {
    if (navigationMode === 'dropdown') {
      // Dropdown opens via DropdownMenu component natively
      return;
    }
    // Tree mode: open the domain tree drawer
    setTreeDrawerOpen(true);
  };

  const handleLevel2BreadcrumbClick = () => {
    if (navigationMode === 'dropdown') {
      // Dropdown opens via DropdownMenu component natively
      return;
    }
    // Tree mode: open the domain tree drawer
    setTreeDrawerOpen(true);
  };

  const handleDomainSelectFromTree = (level1: SemanticDomain, level2?: SemanticDomain) => {
    onDomainChange(level1, level2);
    setTreeDrawerOpen(false);
  };

  // Sibling domains at level 1 (all top-level domains)
  const level1Siblings = allDomains;

  // Sibling domains at level 2 (children of the selected level 1)
  const level2Siblings = selectedLevel1Domain.children ?? [];

  return (
    <div className={cn('tw-flex tw-h-full tw-flex-col', className)}>
      {/* Breadcrumbs - always 2 levels */}
      <div className="tw-flex tw-items-center tw-gap-1 tw-border-b tw-px-3 tw-py-2">
        <nav
          aria-label="Semantic domain breadcrumbs"
          className="tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-1"
        >
          {/* Level 1 breadcrumb */}
          {navigationMode === 'dropdown' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="tw-h-auto tw-gap-1 tw-p-1 tw-text-sm">
                  {selectedLevel1Domain.label}
                  <ChevronDown className="tw-h-3 tw-w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {level1Siblings.map((domain) => (
                  <DropdownMenuItem
                    key={domain.id}
                    className={cn({
                      'tw-font-medium': domain.id === selectedLevel1Domain.id,
                    })}
                    onClick={() => onDomainChange(domain)}
                  >
                    {domain.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              className="tw-h-auto tw-p-1 tw-text-sm"
              onClick={handleLevel1BreadcrumbClick}
            >
              {selectedLevel1Domain.label}
            </Button>
          )}

          {/* Separator */}
          {selectedLevel2Domain && (
            <ChevronRight className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />
          )}

          {/* Level 2 breadcrumb (if a level-2 domain is selected) */}
          {selectedLevel2Domain &&
            (navigationMode === 'dropdown' ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="tw-h-auto tw-gap-1 tw-p-1 tw-text-sm">
                    {selectedLevel2Domain.label}
                    <ChevronDown className="tw-h-3 tw-w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {level2Siblings.map((domain) => (
                    <DropdownMenuItem
                      key={domain.id}
                      className={cn({
                        'tw-font-medium': domain.id === selectedLevel2Domain.id,
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
                onClick={handleLevel2BreadcrumbClick}
              >
                {selectedLevel2Domain.label}
              </Button>
            ))}
        </nav>
      </div>

      {/* Dictionary list with optional detail drawer */}
      <div className="tw-flex-1 tw-overflow-y-auto">
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
        />
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

      {/* Domain tree drawer (tree mode only) */}
      <Drawer direction="right" open={treeDrawerOpen} onOpenChange={setTreeDrawerOpen}>
        <DrawerContent hideDrawerHandle className="tw-max-w-sm">
          <div className="tw-overflow-y-auto tw-p-4">
            <DrawerTitle className="tw-mb-4">Semantic Domains</DrawerTitle>
            <DomainTreeView
              domains={allDomains}
              selectedLevel1Id={selectedLevel1Domain.id}
              selectedLevel2Id={selectedLevel2Domain?.id}
              onSelect={handleDomainSelectFromTree}
            />
            <div className="tw-mt-4">
              <DrawerClose asChild>
                <Button variant="outline" className="tw-w-full">
                  Close
                </Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

/** Full 2-level domain tree view shown inside the tree drawer */
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
          <Button
            variant="ghost"
            className={cn('tw-h-auto tw-w-full tw-justify-start tw-px-2 tw-py-1.5 tw-text-sm', {
              'tw-bg-accent tw-font-medium': level1.id === selectedLevel1Id && !selectedLevel2Id,
            })}
            onClick={() => onSelect(level1)}
          >
            {level1.label}
          </Button>
          {level1.children && level1.children.length > 0 && (
            <ul className="tw-ml-4 tw-space-y-0.5">
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
