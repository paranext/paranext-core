import { useCallback, useMemo, type KeyboardEvent } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  Skeleton,
} from 'platform-bible-react';
import { formatReplacementString, type LocalizedStringValue } from 'platform-bible-utils';
import { ArrowLeft, X } from 'lucide-react';
import {
  ResourceList,
  RESOURCE_LIST_STRING_KEYS,
  type ResourceListItem,
} from '../shared/resource-list.component';
import {
  DomainBreadcrumb,
  DOMAIN_BREADCRUMB_STRING_KEYS,
  type DomainBreadcrumbItem,
} from './domain-breadcrumb.component';
import {
  DomainTreeNode,
  DOMAIN_TREE_NODE_STRING_KEYS,
  type SemanticDomainNode,
} from './domain-tree-node.component';
import {
  SemanticDomainDisplayItem,
  SEMANTIC_DOMAIN_DISPLAY_ITEM_STRING_KEYS,
  type SemanticDomainFilteredEntry,
} from './semantic-domain-display-item.component';

export type { SemanticDomainNode } from './domain-tree-node.component';
export type { SemanticDomainFilteredEntry } from './semantic-domain-display-item.component';

/** Object containing all keys used for localization in this component. */
export const SEMANTIC_DOMAIN_VIEWER_STRING_KEYS = Object.freeze([
  '%enhancedResources_semanticDomain_title%',
  '%enhancedResources_semanticDomain_description%',
  '%enhancedResources_semanticDomain_back%',
  '%enhancedResources_semanticDomain_close%',
  '%enhancedResources_semanticDomain_treeAriaLabel%',
  '%enhancedResources_semanticDomain_filteredEntriesHeader%',
  '%enhancedResources_semanticDomain_filteredEntriesAriaLabel%',
  '%enhancedResources_semanticDomain_filteredEntriesEmpty%',
  '%enhancedResources_semanticDomain_filteredEntriesLoading%',
  '%enhancedResources_semanticDomain_treeLoading%',
  '%enhancedResources_semanticDomain_treeEmpty%',
  ...DOMAIN_BREADCRUMB_STRING_KEYS,
  ...DOMAIN_TREE_NODE_STRING_KEYS,
  ...SEMANTIC_DOMAIN_DISPLAY_ITEM_STRING_KEYS,
  ...RESOURCE_LIST_STRING_KEYS,
] as const);

type SemanticDomainViewerLocalizedStringKey = (typeof SEMANTIC_DOMAIN_VIEWER_STRING_KEYS)[number];
type SemanticDomainViewerLocalizedStrings = {
  [key in SemanticDomainViewerLocalizedStringKey]?: LocalizedStringValue;
};

export type SemanticDomainViewerProps = {
  /** Whether the drawer is open (controlled by parent). */
  open: boolean;
  /** Full domain hierarchy (root nodes). */
  domainTree: SemanticDomainNode[];
  /** Currently focused domain id (drives breadcrumb + tree highlight + initial focus). */
  currentDomainId?: string;
  /**
   * Set of expanded node ids - controlled by the parent so the viewer can be re-opened with the
   * same expansion state (e.g. when navigating away and back).
   */
  expandedNodeIds?: Set<string>;
  /**
   * Resolved breadcrumb path from synthetic root to the current domain. The first item is the
   * synthetic "All" root with id = ''. The parent is responsible for computing this from
   * `currentDomainId` + `domainTree` because the lookup is data-shape-specific (we keep the viewer
   * pure).
   */
  breadcrumbPath?: DomainBreadcrumbItem[];
  /** Dictionary entries belonging to the focused domain. Hidden entirely when undefined. */
  filteredEntries?: SemanticDomainFilteredEntry[];
  /** Loading flag for the tree (skeleton in tree pane). */
  isLoadingTree?: boolean;
  /** Loading flag for the filtered entries list. */
  isLoadingEntries?: boolean;

  /** Close handler - parent flips `open` to false and restores focus to trigger. */
  onClose?: () => void;
  /** Toggle expansion for a tree node. */
  onExpandToggle?: (id: string) => void;
  /**
   * Click on a category (`hasArticle === false`) - parent should update `currentDomainId` and
   * re-derive `breadcrumbPath`. Corresponds to the legacy displaycat link.
   */
  onSelectCategory?: (id: string) => void;
  /**
   * Click on a domain entry (`hasArticle === true`) inside the tree. Per AC: closes the drawer and
   * the parent should open the ArticleViewer for the associated article. The viewer fires `onClose`
   * automatically; the parent only needs to handle `onCategoryEntryClick` to open the
   * ArticleViewer.
   */
  onCategoryEntryClick?: (id: string) => void;
  /**
   * Click on a breadcrumb segment - within-viewer navigation only (FN-006). Parent should update
   * `currentDomainId` and recompute `breadcrumbPath`.
   */
  onBreadcrumbClick?: (id: string) => void;
  /**
   * Click on a row inside the filtered-entries ResourceList. Parent typically opens the dictionary
   * entry detail.
   */
  onFilteredEntryClick?: (entryId: string) => void;

  localizedStringsWithLoadingState?: [SemanticDomainViewerLocalizedStrings, boolean];
};

/**
 * Pure presentational SemanticDomainViewer rendered as a right-side Drawer (vaul + shadcn).
 * Implements UI-PKG-007: a slide-in side panel that displays the semantic-domain hierarchy with a
 * breadcrumb, an ARIA-tree of domain nodes, and (when a category is focused) a `ResourceList` of
 * dictionary entries belonging to the focused domain.
 *
 * Controlled API: parent owns `open`, `currentDomainId`, `expandedNodeIds`, `breadcrumbPath`, and
 * `filteredEntries` and reacts to the callback props. The component reflects state into the DOM
 * (aria-expanded, focus on current node, loading skeletons) but never mutates parent state.
 *
 * Acceptance criteria (UI-PKG-007):
 *
 * - Shadcn `Drawer` slide-in from the right (matches ArticleViewer for visual consistency)
 * - Tree view with expand/collapse - role="tree" / role="treeitem" / aria-expanded / aria-level
 * - Breadcrumb (in-viewer click navigation per FN-006)
 * - Filtered dictionary entries via the shared `ResourceList`
 * - Click domain entry (displaydomain) closes the drawer and forwards via `onCategoryEntryClick` so
 *   the parent can open the ArticleViewer
 * - Click category (displaycat) re-renders the tree at that level via `onSelectCategory`
 * - Click breadcrumb navigates to that level via `onBreadcrumbClick`
 * - Back button + Escape + click-outside dismiss (built into vaul Drawer + DrawerClose)
 * - Keyboard: ArrowUp/ArrowDown move between visible treeitems; ArrowLeft collapses or moves to
 *   parent; ArrowRight expands or moves to first child. Enter / Space activate the current node.
 * - Focus management: vaul provides the trap + return; the tree auto-focuses the current treeitem
 *   when `currentDomainId` is set.
 */
export function SemanticDomainViewer({
  open,
  domainTree,
  currentDomainId,
  expandedNodeIds,
  breadcrumbPath = [],
  filteredEntries,
  isLoadingTree = false,
  isLoadingEntries = false,
  onClose = () => {},
  onExpandToggle = () => {},
  onSelectCategory = () => {},
  onCategoryEntryClick = () => {},
  onBreadcrumbClick = () => {},
  onFilteredEntryClick = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: SemanticDomainViewerProps) {
  const getLocalizedString = (key: SemanticDomainViewerLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const titleLabel = String(getLocalizedString('%enhancedResources_semanticDomain_title%'));
  const descriptionLabel = String(
    getLocalizedString('%enhancedResources_semanticDomain_description%'),
  );
  const backLabel = String(getLocalizedString('%enhancedResources_semanticDomain_back%'));
  const closeLabel = String(getLocalizedString('%enhancedResources_semanticDomain_close%'));
  const treeAriaLabel = String(
    getLocalizedString('%enhancedResources_semanticDomain_treeAriaLabel%'),
  );
  const filteredEntriesHeaderTemplate = String(
    getLocalizedString('%enhancedResources_semanticDomain_filteredEntriesHeader%'),
  );
  const filteredEntriesAriaLabel = String(
    getLocalizedString('%enhancedResources_semanticDomain_filteredEntriesAriaLabel%'),
  );
  const filteredEntriesEmpty = String(
    getLocalizedString('%enhancedResources_semanticDomain_filteredEntriesEmpty%'),
  );
  const filteredEntriesLoading = String(
    getLocalizedString('%enhancedResources_semanticDomain_filteredEntriesLoading%'),
  );
  const treeLoadingLabel = String(
    getLocalizedString('%enhancedResources_semanticDomain_treeLoading%'),
  );
  const treeEmptyLabel = String(getLocalizedString('%enhancedResources_semanticDomain_treeEmpty%'));

  // The expansion set is parent-owned, but if the parent omits it we render a fully-collapsed tree.
  // useMemo prevents a fresh Set instance from churning the prop diff on each render.
  const effectiveExpandedIds = useMemo(
    () => expandedNodeIds ?? new Set<string>(),
    [expandedNodeIds],
  );

  // Drawer onOpenChange: vaul fires this for Escape, click-outside, and the close button. We
  // forward !next through onClose so the parent can restore focus and unset its `open` state.
  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next) onClose();
    },
    [onClose],
  );

  // Domain entry click (displaydomain): the AC requires the drawer to close AND the parent to open
  // the ArticleViewer. We close ourselves and forward the id so the parent only needs to handle the
  // article-open side-effect.
  const handleSelectDomainEntry = useCallback(
    (id: string) => {
      onCategoryEntryClick(id);
      onClose();
    },
    [onCategoryEntryClick, onClose],
  );

  // Tree-level keyboard navigation per AC. We walk the visible tree (respecting expansion) to
  // implement ArrowUp/Down between visible siblings and ArrowLeft/Right collapse-or-parent /
  // expand-or-first-child semantics. Each treeitem's label button has data-testid =
  // `domain-tree-label-{id}`; we resolve focus targets through that selector to avoid threading
  // refs through every recursive node.
  const handleTreeKeyDown = useCallback(
    (event: KeyboardEvent<HTMLUListElement>) => {
      // event.target is widened to EventTarget; narrow to HTMLElement via instanceof so we can
      // read data-testid without an assertion (no-type-assertion/no-type-assertion).
      const { target } = event;
      if (!(target instanceof HTMLElement)) return;
      // Only react when the focus is on a treeitem label (the buttons inside DomainTreeNode).
      const targetTestId = target.getAttribute('data-testid');
      if (!targetTestId || !targetTestId.startsWith('domain-tree-label-')) return;
      const focusedId = targetTestId.slice('domain-tree-label-'.length);

      // Build a flat list of currently visible node ids (depth-first, respecting expansion).
      const visibleIds: string[] = [];
      const parentOf = new Map<string, string | undefined>();
      const childrenOf = new Map<string, SemanticDomainNode[]>();
      const walk = (nodes: SemanticDomainNode[], parentId: string | undefined) => {
        nodes.forEach((node) => {
          visibleIds.push(node.id);
          parentOf.set(node.id, parentId);
          childrenOf.set(node.id, node.children);
          if (effectiveExpandedIds.has(node.id) && node.children.length > 0) {
            walk(node.children, node.id);
          }
        });
      };
      walk(domainTree, undefined);

      const focusLabel = (id: string) => {
        const root = event.currentTarget;
        const next = root.querySelector<HTMLElement>(`[data-testid="domain-tree-label-${id}"]`);
        next?.focus();
      };

      const idx = visibleIds.indexOf(focusedId);
      if (idx === -1) return;

      switch (event.key) {
        case 'ArrowDown': {
          if (idx < visibleIds.length - 1) {
            event.preventDefault();
            focusLabel(visibleIds[idx + 1]);
          }
          break;
        }
        case 'ArrowUp': {
          if (idx > 0) {
            event.preventDefault();
            focusLabel(visibleIds[idx - 1]);
          }
          break;
        }
        case 'ArrowRight': {
          const children = childrenOf.get(focusedId);
          const expanded = effectiveExpandedIds.has(focusedId);
          if (children && children.length > 0) {
            event.preventDefault();
            if (!expanded) {
              onExpandToggle(focusedId);
            } else {
              focusLabel(children[0].id);
            }
          }
          break;
        }
        case 'ArrowLeft': {
          const expanded = effectiveExpandedIds.has(focusedId);
          const hasChildren = (childrenOf.get(focusedId)?.length ?? 0) > 0;
          if (hasChildren && expanded) {
            event.preventDefault();
            onExpandToggle(focusedId);
          } else {
            const parentId = parentOf.get(focusedId);
            if (parentId) {
              event.preventDefault();
              focusLabel(parentId);
            }
          }
          break;
        }
        default:
          break;
      }
    },
    [domainTree, effectiveExpandedIds, onExpandToggle],
  );

  // Resolve the current domain label for the filtered-entries section header. If the breadcrumb
  // has at least one non-root segment we use the last one, otherwise fall back to the title.
  const currentDomainLabel = useMemo(() => {
    if (breadcrumbPath.length === 0) return titleLabel;
    return breadcrumbPath[breadcrumbPath.length - 1].label;
  }, [breadcrumbPath, titleLabel]);

  const filteredEntriesHeader = formatReplacementString(filteredEntriesHeaderTemplate, {
    domainLabel: currentDomainLabel,
  });

  // Convert the filtered entries to ResourceListItem instances. The viewer composes the row body
  // through SemanticDomainDisplayItem, leaving the row chrome (hover, selection) to ResourceList.
  const resourceListItems: ResourceListItem[] = useMemo(() => {
    if (!filteredEntries) return [];
    return filteredEntries.map((entry) => ({
      id: entry.entryId,
      primary: (
        <SemanticDomainDisplayItem
          item={entry}
          localizedStringsWithLoadingState={localizedStringsWithLoadingState}
        />
      ),
      // Two-column layout is unnecessary here - the row body already organises lemma + glosses.
      secondary: undefined,
    }));
  }, [filteredEntries, localizedStringsWithLoadingState]);

  const renderTreeBody = () => {
    if (isLoadingTree) {
      return (
        <div
          aria-busy="true"
          aria-label={treeLoadingLabel}
          className="tw-flex tw-flex-col tw-gap-2"
          data-testid="semantic-domain-viewer-tree-loading"
        >
          <Skeleton className="tw-h-5 tw-w-3/4" />
          <Skeleton className="tw-h-5 tw-w-2/3" />
          <Skeleton className="tw-h-5 tw-w-3/4" />
          <Skeleton className="tw-h-5 tw-w-1/2" />
          <Skeleton className="tw-h-5 tw-w-3/5" />
        </div>
      );
    }
    if (domainTree.length === 0) {
      return (
        <div
          role="status"
          data-testid="semantic-domain-viewer-tree-empty"
          className="tw-py-4 tw-text-sm tw-italic tw-text-muted-foreground"
        >
          {treeEmptyLabel}
        </div>
      );
    }
    return (
      <ul
        role="tree"
        aria-label={treeAriaLabel}
        data-testid="semantic-domain-viewer-tree"
        className="tw-flex tw-flex-col"
        onKeyDown={handleTreeKeyDown}
      >
        {domainTree.map((node, idx) => (
          <DomainTreeNode
            key={node.id}
            node={node}
            level={1}
            positionInSet={idx + 1}
            setSize={domainTree.length}
            expandedIds={effectiveExpandedIds}
            currentDomainId={currentDomainId}
            onExpandToggle={onExpandToggle}
            onSelectCategory={onSelectCategory}
            onSelectDomainEntry={handleSelectDomainEntry}
            localizedStringsWithLoadingState={localizedStringsWithLoadingState}
          />
        ))}
      </ul>
    );
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} direction="right">
      <DrawerContent
        className="tw-ml-auto tw-flex tw-h-full tw-w-full tw-max-w-[480px] tw-flex-col"
        data-testid="semantic-domain-viewer"
        hideDrawerHandle
      >
        <DrawerHeader className="tw-flex tw-flex-col tw-gap-2 tw-border-b tw-border-border">
          <div className="tw-flex tw-flex-row tw-items-start tw-justify-between tw-gap-2">
            <div className="tw-flex tw-items-start tw-gap-2">
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={backLabel}
                  data-testid="semantic-domain-viewer-back"
                >
                  <ArrowLeft className="tw-h-5 tw-w-5" aria-hidden="true" />
                </Button>
              </DrawerClose>
              <div className="tw-min-w-0 tw-flex-1 tw-text-start">
                <DrawerTitle
                  className="tw-truncate tw-text-base"
                  data-testid="semantic-domain-viewer-title"
                >
                  {titleLabel}
                </DrawerTitle>
                <DrawerDescription className="tw-sr-only">{descriptionLabel}</DrawerDescription>
              </div>
            </div>
            <DrawerClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={closeLabel}
                data-testid="semantic-domain-viewer-close"
              >
                <X className="tw-h-5 tw-w-5" aria-hidden="true" />
              </Button>
            </DrawerClose>
          </div>
          {breadcrumbPath.length > 0 && (
            <DomainBreadcrumb
              path={breadcrumbPath}
              onItemClick={onBreadcrumbClick}
              localizedStringsWithLoadingState={localizedStringsWithLoadingState}
            />
          )}
        </DrawerHeader>

        <div
          className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-4 tw-overflow-y-auto tw-px-4 tw-py-3"
          data-testid="semantic-domain-viewer-content"
        >
          {renderTreeBody()}

          {filteredEntries !== undefined && (
            <section
              aria-label={filteredEntriesAriaLabel}
              data-testid="semantic-domain-viewer-filtered-entries"
              className="tw-border-t tw-border-border tw-pt-3"
            >
              <h4 className="tw-mb-2 tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
                {filteredEntriesHeader}
              </h4>
              <ResourceList
                items={resourceListItems}
                showSecondaryColumn={false}
                isLoading={isLoadingEntries}
                onItemClick={onFilteredEntryClick}
                ariaLabel={filteredEntriesAriaLabel}
                emptyMessage={filteredEntriesEmpty}
                testId="semantic-domain-viewer-filtered-list"
                localizedStringsWithLoadingState={[
                  {
                    '%enhancedResources_resourceList_expand%':
                      localizedStringsWithLoadingState[0][
                        '%enhancedResources_resourceList_expand%'
                      ],
                    '%enhancedResources_resourceList_collapse%':
                      localizedStringsWithLoadingState[0][
                        '%enhancedResources_resourceList_collapse%'
                      ],
                    '%enhancedResources_resourceList_loading%':
                      localizedStringsWithLoadingState[0][
                        '%enhancedResources_resourceList_loading%'
                      ] ?? filteredEntriesLoading,
                  },
                  localizedStringsWithLoadingState[1],
                ]}
              />
            </section>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default SemanticDomainViewer;
