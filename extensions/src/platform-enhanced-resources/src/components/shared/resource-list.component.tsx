import { Button, Skeleton, cn } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import type { ReactNode, UIEvent } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

/** Object containing all keys used for localization in this component. */
export const RESOURCE_LIST_STRING_KEYS = Object.freeze([
  '%enhancedResources_resourceList_expand%',
  '%enhancedResources_resourceList_collapse%',
  '%enhancedResources_resourceList_loading%',
] as const);

type ResourceListLocalizedStringKey = (typeof RESOURCE_LIST_STRING_KEYS)[number];
type ResourceListLocalizedStrings = {
  [key in ResourceListLocalizedStringKey]?: LocalizedStringValue;
};

export type ResourceListVariant = 'text' | 'thumbnail';

/**
 * Single row in a ResourceList. The renderer is content-agnostic; primary/secondary/thumbnail
 * provide the row body, and `expanded` (when present) is shown below the row when its id is in
 * `expandedIds`.
 */
export type ResourceListItem = {
  /** Stable id used for expansion state and keys. */
  id: string;
  /** Primary content for column 1 (or only column when secondary is hidden). */
  primary: ReactNode;
  /** Secondary content for column 2 (right column). Ignored when showSecondaryColumn is false. */
  secondary?: ReactNode;
  /** Optional left-side thumbnail for the 'thumbnail' variant. */
  thumbnail?: ReactNode;
  /** Optional trailing badge / count (rendered at the end of the row). */
  trailing?: ReactNode;
  /** Optional expanded panel rendered below the row when expanded. */
  expanded?: ReactNode;
  /** Whether this row is selectable; defaults to true. */
  selectable?: boolean;
};

export type ResourceListProps = {
  /** Items to render. */
  items: ResourceListItem[];
  /** 'text' (dictionary/encyclopedia) or 'thumbnail' (media). Defaults to 'text'. */
  variant?: ResourceListVariant;
  /** When false the second column is hidden (1-column layout). Defaults to true. */
  showSecondaryColumn?: boolean;
  /** Set of expanded row ids (controlled). */
  expandedIds?: Set<string>;
  /** Callback fired when a row's expand toggle is clicked. */
  onExpandToggle?: (id: string) => void;
  /** Callback fired when a row body is clicked (selection / activation). */
  onItemClick?: (id: string) => void;
  /** Optional column headers (rendered above the list). */
  header?: ReactNode;
  /** Optional message rendered when items is empty. */
  emptyMessage?: ReactNode;
  /** Loading flag - shows skeleton rows. */
  isLoading?: boolean;
  /** Number of skeleton rows to show while loading; defaults to 5. */
  loadingRowCount?: number;
  /** Scroll handler for progressive loading (per Theme 14, no virtual scrolling). */
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  /** ARIA label for the list (announced to screen readers). */
  ariaLabel?: string;
  /** Optional test id forwarded to the scroll container. */
  testId?: string;
  localizedStringsWithLoadingState?: [ResourceListLocalizedStrings, boolean];
};

/**
 * Pure presentational 2-column list base with optional expand/collapse per row and progressive
 * loading via onScroll. Used by DictionaryTab (text variant), EncyclopediaTab (text variant), and
 * MediaTab (thumbnail variant).
 *
 * Replaces the legacy CollapsibleListItem pattern (Theme 14).
 *
 * Layout:
 *
 *      [optional header]
 *      +-----------------------------------------------------+
 *      | [v|>] [thumb] | primary | secondary | trailing |    |
 *      |   +-- expanded panel (when expanded) ------------+  |
 *      +-----------------------------------------------------+
 */
export function ResourceList({
  items,
  variant = 'text',
  showSecondaryColumn = true,
  expandedIds,
  onExpandToggle,
  onItemClick,
  header,
  emptyMessage,
  isLoading = false,
  loadingRowCount = 5,
  onScroll,
  ariaLabel,
  testId,
  localizedStringsWithLoadingState = [{}, false],
}: ResourceListProps) {
  const getLocalizedString = (key: ResourceListLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const expandLabel = String(getLocalizedString('%enhancedResources_resourceList_expand%'));
  const collapseLabel = String(getLocalizedString('%enhancedResources_resourceList_collapse%'));
  const loadingLabel = String(getLocalizedString('%enhancedResources_resourceList_loading%'));

  const supportsExpand = onExpandToggle !== undefined;

  return (
    <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col" aria-label={ariaLabel}>
      {header && (
        <div className="tw-shrink-0 tw-border-b tw-border-border tw-bg-muted/40 tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-text-muted-foreground">
          {header}
        </div>
      )}
      <div className="tw-flex-1 tw-overflow-y-auto" onScroll={onScroll} data-testid={testId}>
        {isLoading && (
          <div
            aria-busy="true"
            aria-label={loadingLabel}
            className="tw-flex tw-flex-col tw-gap-2 tw-p-2"
          >
            {Array.from({ length: loadingRowCount }).map((_, index) => (
              // Skeleton placeholders have no semantic identity; index is the only stable key.
              // eslint-disable-next-line react/no-array-index-key
              <Skeleton key={index} className="tw-h-10 tw-w-full" />
            ))}
          </div>
        )}
        {!isLoading && items.length === 0 && emptyMessage && (
          <div
            role="status"
            className="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-p-6 tw-text-center tw-text-sm tw-text-muted-foreground"
          >
            {emptyMessage}
          </div>
        )}
        {!isLoading && items.length > 0 && (
          <ul className="tw-flex tw-flex-col tw-divide-y tw-divide-border">
            {items.map((item) => {
              const isExpanded = expandedIds?.has(item.id) ?? false;
              const selectable = item.selectable !== false;
              return (
                <li key={item.id} className="tw-flex tw-flex-col">
                  <div
                    className={cn(
                      'tw-flex tw-items-start tw-gap-2 tw-px-2 tw-py-2',
                      selectable && 'hover:tw-bg-muted/40',
                    )}
                  >
                    {supportsExpand && item.expanded !== undefined && (
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? collapseLabel : expandLabel}
                        onClick={() => onExpandToggle?.(item.id)}
                        className="tw-mt-0.5 tw-h-6 tw-w-6 tw-shrink-0"
                      >
                        {isExpanded ? (
                          <ChevronDown className="tw-h-4 tw-w-4" />
                        ) : (
                          <ChevronRight className="tw-h-4 tw-w-4" />
                        )}
                      </Button>
                    )}
                    {variant === 'thumbnail' && item.thumbnail && (
                      <div className="tw-shrink-0">{item.thumbnail}</div>
                    )}
                    <button
                      type="button"
                      disabled={!selectable}
                      onClick={() => selectable && onItemClick?.(item.id)}
                      className={cn(
                        'tw-flex tw-flex-1 tw-min-w-0 tw-cursor-default tw-items-start tw-gap-3 tw-text-start',
                        selectable && 'tw-cursor-pointer',
                      )}
                    >
                      <div
                        className={cn(
                          'tw-min-w-0 tw-flex-1 tw-text-sm',
                          showSecondaryColumn && 'tw-basis-1/3',
                        )}
                      >
                        {item.primary}
                      </div>
                      {showSecondaryColumn && (
                        <div className="tw-min-w-0 tw-flex-[2] tw-text-sm tw-text-muted-foreground">
                          {item.secondary}
                        </div>
                      )}
                    </button>
                    {item.trailing && (
                      <div className="tw-shrink-0 tw-text-xs tw-text-muted-foreground">
                        {item.trailing}
                      </div>
                    )}
                  </div>
                  {isExpanded && item.expanded && (
                    <div className="tw-bg-muted/20 tw-px-3 tw-pb-3">{item.expanded}</div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ResourceList;
