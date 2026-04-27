import { useCallback } from 'react';
import { Button, cn } from 'platform-bible-react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { LocalizedStringValue } from 'platform-bible-utils';

/** Object containing all keys used for localization in this component. */
export const DOMAIN_TREE_NODE_STRING_KEYS = Object.freeze([
  '%enhancedResources_semanticDomain_expand%',
  '%enhancedResources_semanticDomain_collapse%',
  '%enhancedResources_semanticDomain_openArticleLabel%',
  '%enhancedResources_semanticDomain_focusCategoryLabel%',
] as const);

type DomainTreeNodeLocalizedStringKey = (typeof DOMAIN_TREE_NODE_STRING_KEYS)[number];
type DomainTreeNodeLocalizedStrings = {
  [key in DomainTreeNodeLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Pure data shape for a node in the semantic domain hierarchy. Mirrors the SemanticDomainNode
 * contract from data-contracts.md / ui-state-contracts.md (the recursive `children` and the
 * `hasArticle` flag are the load-bearing fields for click routing).
 */
export type SemanticDomainNode = {
  id: string;
  label: string;
  children: SemanticDomainNode[];
  /** Whether this node has associated article content (true => displaydomain, false => displaycat). */
  hasArticle: boolean;
};

export type DomainTreeNodeProps = {
  /** The node data to render. */
  node: SemanticDomainNode;
  /** 1-based ARIA tree level. Recursive children pass `level + 1`. */
  level: number;
  /** 1-based position among siblings. Used for `aria-posinset`. */
  positionInSet: number;
  /** Total siblings at this level. Used for `aria-setsize`. */
  setSize: number;
  /** Set of expanded node ids (controlled). */
  expandedIds: Set<string>;
  /** The id of the currently focused / "current" domain (used for visual highlight + focus). */
  currentDomainId?: string;
  /** Toggle expansion for a given node id. */
  onExpandToggle?: (id: string) => void;
  /**
   * Activate a category (`hasArticle === false`). Parent should re-focus the tree on this id and
   * update the breadcrumb path - corresponds to the legacy `displaycat` link.
   */
  onSelectCategory?: (id: string) => void;
  /**
   * Activate a domain entry (`hasArticle === true`). Parent should close the drawer and open the
   * ArticleViewer - corresponds to the legacy `displaydomain` link. The viewer composes this with
   * its own `onCategoryEntryClick`.
   */
  onSelectDomainEntry?: (id: string) => void;
  localizedStringsWithLoadingState?: [DomainTreeNodeLocalizedStrings, boolean];
};

/**
 * Pure presentational tree node implementing the ARIA tree pattern (no third-party tree dep - see
 * forward note FN-005). Each node renders a `role="treeitem"` with `aria-level`, `aria-posinset`,
 * `aria-setsize`, and (when expandable) `aria-expanded`. Children are wrapped in a nested
 * `role="group"` `<ul>` so the tree structure is announced to assistive tech.
 *
 * The component is recursive: it renders its own children when expanded. Keyboard navigation (Arrow
 * Up/Down between siblings, Left to collapse/parent, Right to expand/first-child) is owned by the
 * parent tree container which receives keydown events bubbling from these treeitems - this
 * component only forwards toggle requests through `onExpandToggle`.
 */
export function DomainTreeNode({
  node,
  level,
  positionInSet,
  setSize,
  expandedIds,
  currentDomainId,
  onExpandToggle = () => {},
  onSelectCategory = () => {},
  onSelectDomainEntry = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: DomainTreeNodeProps) {
  const getLocalizedString = (key: DomainTreeNodeLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const hasChildren = node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isCurrent = currentDomainId === node.id;

  const expandLabel = String(getLocalizedString('%enhancedResources_semanticDomain_expand%'));
  const collapseLabel = String(getLocalizedString('%enhancedResources_semanticDomain_collapse%'));
  const openArticleLabel = String(
    getLocalizedString('%enhancedResources_semanticDomain_openArticleLabel%'),
  );
  const focusCategoryLabel = String(
    getLocalizedString('%enhancedResources_semanticDomain_focusCategoryLabel%'),
  );

  // Maintain DOM focus on the "current" domain so keyboard users land on the focused row when the
  // drawer opens. We use a callback ref so the focus call runs the moment the label mounts (or
  // when isCurrent flips to true on a re-render) without needing a separate effect + Ref<...>(null)
  // - which would otherwise conflict with the no-null rule.
  const focusIfCurrent = useCallback(
    (element: HTMLButtonElement | undefined) => {
      if (isCurrent && element) {
        element.focus();
      }
    },
    [isCurrent],
  );

  const handleActivate = () => {
    if (node.hasArticle) {
      onSelectDomainEntry(node.id);
    } else {
      onSelectCategory(node.id);
    }
  };

  const labelAriaLabel = node.hasArticle ? openArticleLabel : focusCategoryLabel;

  return (
    <li
      role="treeitem"
      aria-level={level}
      aria-posinset={positionInSet}
      aria-setsize={setSize}
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isCurrent}
      data-testid={`domain-tree-node-${node.id}`}
      className="tw-flex tw-flex-col"
    >
      <div
        className={cn(
          'tw-flex tw-items-center tw-gap-1 tw-rounded tw-px-1 tw-py-0.5',
          isCurrent && 'tw-bg-accent tw-text-accent-foreground',
        )}
        // Indent visually by level (the wrapper preserves the role="treeitem" semantics; the
        // padding-left is purely presentational and computed inline because Tailwind's purge
        // would not see dynamic values).
        style={{ paddingInlineStart: `${(level - 1) * 16}px` }}
      >
        {hasChildren ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            tabIndex={-1}
            aria-label={isExpanded ? collapseLabel : expandLabel}
            data-testid={`domain-tree-toggle-${node.id}`}
            onClick={() => onExpandToggle(node.id)}
            className="tw-h-5 tw-w-5 tw-shrink-0"
          >
            {isExpanded ? (
              <ChevronDown className="tw-h-4 tw-w-4" aria-hidden="true" />
            ) : (
              <ChevronRight className="tw-h-4 tw-w-4" aria-hidden="true" />
            )}
          </Button>
        ) : (
          // Maintain alignment with sibling rows that have a toggle.
          <span aria-hidden="true" className="tw-inline-block tw-h-5 tw-w-5 tw-shrink-0" />
        )}
        <button
          ref={(element) => focusIfCurrent(element ?? undefined)}
          type="button"
          aria-label={labelAriaLabel}
          data-testid={`domain-tree-label-${node.id}`}
          onClick={handleActivate}
          className={cn(
            'tw-min-w-0 tw-flex-1 tw-truncate tw-text-start tw-text-sm tw-rounded',
            'focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-ring',
            node.hasArticle
              ? 'tw-text-foreground hover:tw-underline'
              : 'tw-text-foreground/90 hover:tw-text-foreground',
          )}
        >
          {node.label}
        </button>
      </div>
      {hasChildren && isExpanded && (
        <ul role="group" className="tw-flex tw-flex-col">
          {node.children.map((child, idx) => (
            <DomainTreeNode
              key={child.id}
              node={child}
              level={level + 1}
              positionInSet={idx + 1}
              setSize={node.children.length}
              expandedIds={expandedIds}
              currentDomainId={currentDomainId}
              onExpandToggle={onExpandToggle}
              onSelectCategory={onSelectCategory}
              onSelectDomainEntry={onSelectDomainEntry}
              localizedStringsWithLoadingState={localizedStringsWithLoadingState}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default DomainTreeNode;
