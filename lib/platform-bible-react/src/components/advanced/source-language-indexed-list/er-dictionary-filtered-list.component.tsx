import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '@/components/shadcn-ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { ChevronRight, List, FolderTree } from 'lucide-react';
import SourceLanguageIndexedList from './source-language-indexed-list.component';
import type {
  ErDictionaryFilteredListProps,
  IndexedListItem,
  SemanticDomain,
} from './source-language-indexed-list.types';

/**
 * ER Dictionary list filtered by semantic domain. Shows a breadcrumb trail for the domain hierarchy
 * and a toggle to switch between tree view (Option A) and dropdown view (Option B) for domain
 * navigation.
 *
 * Screen A from ui-alignment.md: Dictionary entries filtered by a selected semantic domain, with
 * breadcrumbs showing the domain path and the list below filtered to that domain.
 *
 * @example
 *
 * ```tsx
 * <ErDictionaryFilteredList
 *   items={filteredEntries}
 *   domainPath={[root, naturalWorld, animals]}
 *   navigationMode="tree"
 *   onNavigationModeChange={setNavMode}
 *   onBreadcrumbClick={handleBreadcrumbClick}
 *   domainChildren={currentDomainChildren}
 *   onDomainSelect={handleDomainSelect}
 * />;
 * ```
 */
export default function ErDictionaryFilteredList<T extends IndexedListItem>({
  domainPath,
  onBreadcrumbClick,
  navigationMode,
  onNavigationModeChange,
  domainChildren,
  onDomainSelect,
  className,
  ...listProps
}: ErDictionaryFilteredListProps<T>) {
  return (
    <div className={cn('tw-flex tw-h-full tw-flex-col', className)}>
      {/* Header: Breadcrumb trail + navigation mode toggle */}
      <div className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-border-b tw-px-3 tw-py-2">
        <DomainBreadcrumbs domainPath={domainPath} onBreadcrumbClick={onBreadcrumbClick} />
        <ToggleGroup
          type="single"
          value={navigationMode}
          onValueChange={(value) => {
            if (value === 'tree' || value === 'dropdown') {
              onNavigationModeChange?.(value);
            }
          }}
          className="tw-shrink-0"
        >
          <ToggleGroupItem value="tree" aria-label="Tree view" className="tw-h-8 tw-w-8 tw-p-0">
            <FolderTree className="tw-h-4 tw-w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="dropdown"
            aria-label="Dropdown view"
            className="tw-h-8 tw-w-8 tw-p-0"
          >
            <List className="tw-h-4 tw-w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Domain navigation area (tree or dropdown based on mode) */}
      {domainChildren && domainChildren.length > 0 && (
        <div className="tw-border-b tw-px-3 tw-py-2">
          {navigationMode === 'dropdown' ? (
            <DomainDropdown domains={domainChildren} onSelect={onDomainSelect} />
          ) : (
            <DomainTree domains={domainChildren} onSelect={onDomainSelect} />
          )}
        </div>
      )}

      {/* Filtered dictionary list */}
      <div className="tw-flex-1 tw-overflow-y-auto">
        <SourceLanguageIndexedList {...listProps} showSourceLanguage showTransliteration />
      </div>
    </div>
  );
}

/** Breadcrumb trail showing the domain hierarchy path */
function DomainBreadcrumbs({
  domainPath,
  onBreadcrumbClick,
}: {
  domainPath: SemanticDomain[];
  onBreadcrumbClick?: (domain: SemanticDomain) => void;
}) {
  return (
    <nav
      aria-label="Semantic domain breadcrumbs"
      className="tw-flex tw-min-w-0 tw-items-center tw-gap-1 tw-overflow-x-auto"
    >
      {domainPath.map((domain, index) => {
        const isLast = index === domainPath.length - 1;
        return (
          <span key={domain.id} className="tw-flex tw-shrink-0 tw-items-center tw-gap-1">
            {isLast ? (
              <span className="tw-text-sm tw-font-medium">{domain.label}</span>
            ) : (
              <>
                <Button
                  variant="link"
                  className="tw-h-auto tw-p-0 tw-text-sm"
                  onClick={() => onBreadcrumbClick?.(domain)}
                >
                  {domain.label}
                </Button>
                <ChevronRight className="tw-h-3 tw-w-3 tw-text-muted-foreground" />
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
}

/** Dropdown navigation showing sibling domains at the current level */
function DomainDropdown({
  domains,
  onSelect,
}: {
  domains: SemanticDomain[];
  onSelect?: (domain: SemanticDomain) => void;
}) {
  return (
    <Select
      onValueChange={(value) => {
        const domain = domains.find((d) => d.id === value);
        if (domain) onSelect?.(domain);
      }}
    >
      <SelectTrigger className="tw-w-full">
        <SelectValue placeholder="Select a domain..." />
      </SelectTrigger>
      <SelectContent>
        {domains.map((domain) => (
          <SelectItem key={domain.id} value={domain.id}>
            {domain.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/** Tree navigation showing the full hierarchy of child domains */
function DomainTree({
  domains,
  onSelect,
  level = 0,
}: {
  domains: SemanticDomain[];
  onSelect?: (domain: SemanticDomain) => void;
  level?: number;
}) {
  return (
    <ul className={cn('tw-space-y-0.5', { 'tw-pl-4': level > 0 })}>
      {domains.map((domain) => (
        <li key={domain.id}>
          <Button
            variant="ghost"
            className="tw-h-auto tw-w-full tw-justify-start tw-px-2 tw-py-1 tw-text-sm"
            onClick={() => onSelect?.(domain)}
          >
            {domain.label}
          </Button>
          {domain.children && domain.children.length > 0 && (
            <DomainTree domains={domain.children} onSelect={onSelect} level={level + 1} />
          )}
        </li>
      ))}
    </ul>
  );
}
