import React, { useCallback, useEffect, useMemo, useState } from 'react';
import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { usePromise } from 'platform-bible-react';

/** Semantic domain node structure for the tree */
export interface SemanticDomainNode {
  id: string;
  prefix: string;
  displayName: string;
  domainRange: string | undefined;
  hasSubDomains: boolean;
  hasEntries: boolean;
  isSelected: boolean;
  children: SemanticDomainNode[];
}

/** Output from the viewer when user takes an action */
export interface SemanticDomainViewerOutput {
  action: 'close' | 'selectDomain';
  selectedDomainId?: string;
}

/** Props for the SemanticDomainViewer component */
interface SemanticDomainViewerProps {
  /** Initial domain ID to highlight/center on */
  initialDomainId: string;
  /** Callback when viewer produces output (close or select domain) */
  onAction: (output: SemanticDomainViewerOutput) => void;
}

/** Backend service interface for semantic domain operations */
interface ERSemanticDomainService {
  getSemanticDomains: (input: {
    initialDomainId: string;
  }) => Promise<{ rootDomains: SemanticDomainNode[] }>;
}

/** Fallback domain tree when backend is unavailable */
const FALLBACK_TREE: SemanticDomainNode[] = [
  {
    id: 'sd-1',
    prefix: '1',
    displayName: 'The Physical World',
    domainRange: undefined,
    hasSubDomains: true,
    hasEntries: false,
    isSelected: false,
    children: [
      {
        id: 'sd-1.1',
        prefix: '1.1',
        displayName: 'Sky',
        domainRange: undefined,
        hasSubDomains: true,
        hasEntries: true,
        isSelected: false,
        children: [
          {
            id: 'sd-1.1.1',
            prefix: '1.1.1',
            displayName: 'Sun',
            domainRange: undefined,
            hasSubDomains: false,
            hasEntries: true,
            isSelected: false,
            children: [],
          },
          {
            id: 'sd-1.1.2',
            prefix: '1.1.2',
            displayName: 'Moon',
            domainRange: undefined,
            hasSubDomains: false,
            hasEntries: true,
            isSelected: false,
            children: [],
          },
        ],
      },
      {
        id: 'sd-1.2',
        prefix: '1.2',
        displayName: 'World',
        domainRange: undefined,
        hasSubDomains: true,
        hasEntries: true,
        isSelected: false,
        children: [
          {
            id: 'sd-1.2.1',
            prefix: '1.2.1',
            displayName: 'Land',
            domainRange: undefined,
            hasSubDomains: false,
            hasEntries: true,
            isSelected: false,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 'sd-2',
    prefix: '2',
    displayName: 'Quantity and Type',
    domainRange: undefined,
    hasSubDomains: true,
    hasEntries: false,
    isSelected: false,
    children: [
      {
        id: 'sd-2.1',
        prefix: '2.1',
        displayName: 'Amount',
        domainRange: undefined,
        hasSubDomains: false,
        hasEntries: true,
        isSelected: false,
        children: [],
      },
    ],
  },
  {
    id: 'sd-3',
    prefix: '3',
    displayName: 'Communication',
    domainRange: undefined,
    hasSubDomains: true,
    hasEntries: false,
    isSelected: false,
    children: [
      {
        id: 'sd-3.1',
        prefix: '3.1',
        displayName: 'Language',
        domainRange: undefined,
        hasSubDomains: true,
        hasEntries: true,
        isSelected: false,
        children: [],
      },
      {
        id: 'sd-3.2',
        prefix: '3.2',
        displayName: 'Written language',
        domainRange: undefined,
        hasSubDomains: true,
        hasEntries: false,
        isSelected: false,
        children: [
          {
            id: 'sd-3.2.1',
            prefix: '3.2.1',
            displayName: 'Writing systems',
            domainRange: undefined,
            hasSubDomains: false,
            hasEntries: true,
            isSelected: false,
            children: [],
          },
          {
            id: 'sd-3.2.2',
            prefix: '3.2.2',
            displayName: 'Script',
            domainRange: '(33.437-33.489)',
            hasSubDomains: true,
            hasEntries: true,
            isSelected: false,
            children: [
              {
                id: 'sd-3.2.2.1',
                prefix: '3.2.2.1',
                displayName: 'Letters',
                domainRange: undefined,
                hasSubDomains: false,
                hasEntries: true,
                isSelected: false,
                children: [],
              },
              {
                id: 'sd-3.2.2.2',
                prefix: '3.2.2.2',
                displayName: 'Alphabet',
                domainRange: undefined,
                hasSubDomains: false,
                hasEntries: true,
                isSelected: false,
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 'sd-3.3',
        prefix: '3.3',
        displayName: 'Speech',
        domainRange: undefined,
        hasSubDomains: true,
        hasEntries: true,
        isSelected: false,
        children: [],
      },
    ],
  },
  {
    id: 'sd-4',
    prefix: '4',
    displayName: 'Social Relations',
    domainRange: undefined,
    hasSubDomains: true,
    hasEntries: false,
    isSelected: false,
    children: [],
  },
  {
    id: 'sd-5',
    prefix: '5',
    displayName: 'Activities',
    domainRange: undefined,
    hasSubDomains: true,
    hasEntries: false,
    isSelected: false,
    children: [],
  },
  {
    id: 'sd-12',
    prefix: '12',
    displayName: 'Supernatural Beings',
    domainRange: undefined,
    hasSubDomains: true,
    hasEntries: false,
    isSelected: false,
    children: [
      {
        id: 'sd-12.1',
        prefix: '12.1',
        displayName: 'Supernatural Beings',
        domainRange: undefined,
        hasSubDomains: false,
        hasEntries: true,
        isSelected: false,
        children: [],
      },
      {
        id: 'sd-12.4',
        prefix: '12.4',
        displayName: 'Spiritual',
        domainRange: undefined,
        hasSubDomains: false,
        hasEntries: true,
        isSelected: false,
        children: [],
      },
    ],
  },
];

/** Localized string keys for the semantic domain viewer */
const DOMAIN_VIEWER_LOCALIZED_KEYS = [
  '%platformEnhancedResources_domainViewer_close%',
  '%platformEnhancedResources_domainViewer_root%',
  '%platformEnhancedResources_domainViewer_breadcrumbNav%',
] as const;

/** Breadcrumb segment type */
interface BreadcrumbSegment {
  id: string;
  name: string;
}

/**
 * Build the breadcrumb path from root to a target node (inclusive of ancestors only). Returns an
 * array of breadcrumb segments.
 */
function buildBreadcrumbPath(
  nodes: SemanticDomainNode[],
  targetId: string,
  currentPath: BreadcrumbSegment[],
): BreadcrumbSegment[] | undefined {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.id === targetId) {
      return currentPath;
    }
    if (node.children.length > 0) {
      const path = buildBreadcrumbPath(node.children, targetId, [
        ...currentPath,
        { id: node.id, name: `${node.prefix} ${node.displayName}` },
      ]);
      if (path) return path;
    }
  }
  return undefined;
}

/** Get all ancestor IDs for a target node to auto-expand them. */
function getAncestorIds(
  nodes: SemanticDomainNode[],
  targetId: string,
  currentAncestors: string[],
): string[] | undefined {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.id === targetId) {
      return currentAncestors;
    }
    if (node.children.length > 0) {
      const result = getAncestorIds(node.children, targetId, [...currentAncestors, node.id]);
      if (result) return result;
    }
  }
  return undefined;
}

/** Props for the DomainTreeNode component */
interface DomainTreeNodeProps {
  node: SemanticDomainNode;
  expandedIds: Set<string>;
  selectedId: string;
  onToggle: (id: string) => void;
  onLeafClick: (id: string) => void;
  onFocusNode: (id: string) => void;
  level: number;
}

/** Renders a single node in the domain tree. Categories are expandable; leaf nodes are clickable. */
function DomainTreeNode({
  node,
  expandedIds,
  selectedId,
  onToggle,
  onLeafClick,
  onFocusNode,
  level,
}: DomainTreeNodeProps) {
  const isExpanded = expandedIds.has(node.id);
  const isSelected = node.id === selectedId;
  const isCategory = node.hasSubDomains;

  const handleClick = useCallback(() => {
    if (isCategory) {
      onToggle(node.id);
    } else {
      onLeafClick(node.id);
    }
  }, [isCategory, node.id, onToggle, onLeafClick]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      } else if (e.key === 'ArrowRight' && isCategory && !isExpanded) {
        e.preventDefault();
        onToggle(node.id);
      } else if (e.key === 'ArrowLeft' && isCategory && isExpanded) {
        e.preventDefault();
        onToggle(node.id);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        // Move focus to next visible treeitem
        const current = e.currentTarget;
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const treeContainer = current.closest('[role="tree"]') as HTMLElement | undefined;
        if (treeContainer) {
          const items = Array.from(treeContainer.querySelectorAll('[role="treeitem"]'));
          const idx = items.indexOf(current);
          if (idx >= 0 && idx < items.length - 1) {
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            (items[idx + 1] as HTMLElement).focus();
          }
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const current = e.currentTarget;
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const treeContainer = current.closest('[role="tree"]') as HTMLElement | undefined;
        if (treeContainer) {
          const items = Array.from(treeContainer.querySelectorAll('[role="treeitem"]'));
          const idx = items.indexOf(current);
          if (idx > 0) {
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            (items[idx - 1] as HTMLElement).focus();
          }
        }
      }
    },
    [handleClick, isCategory, isExpanded, node.id, onToggle],
  );

  // Mark the selected node and focused node for tracking
  useEffect(() => {
    if (isSelected) {
      onFocusNode(node.id);
    }
  }, [isSelected, node.id, onFocusNode]);

  const testIdPrefix = isCategory ? 'er-domain-cat-' : 'er-domain-leaf-';

  return (
    <>
      <div
        role="treeitem"
        tabIndex={isSelected ? 0 : -1}
        aria-expanded={isCategory ? isExpanded : undefined}
        aria-selected={isSelected}
        aria-level={level}
        data-testid={`${testIdPrefix}${node.id}`}
        className={`tw-flex tw-items-center tw-gap-1 tw-px-2 tw-py-1 tw-cursor-pointer hover:tw-bg-accent tw-transition-colors tw-text-sm ${
          isSelected ? 'tw-bg-primary/10 tw-font-bold' : ''
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {/* Expand/collapse indicator */}
        {isCategory && (
          <span className="tw-w-4 tw-text-center tw-shrink-0 tw-text-xs">
            {isExpanded ? '\u25BC' : '\u25B6'}
          </span>
        )}
        {!isCategory && <span className="tw-w-4 tw-text-center tw-shrink-0">&ndash;</span>}

        {/* Domain code and name */}
        <span>
          {node.prefix} {node.displayName}
        </span>

        {/* Domain range (SDBG only) */}
        {node.domainRange && (
          <span data-testid="domain-range" className="tw-text-xs tw-text-muted-foreground tw-ml-1">
            {node.domainRange}
          </span>
        )}

        {/* Selected indicator */}
        {isSelected && (
          <span
            data-testid="er-domain-selected"
            className="tw-inline-block tw-w-2 tw-h-2 tw-rounded-full tw-bg-primary tw-ml-1 tw-shrink-0"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Children (visible when expanded) */}
      {isCategory && isExpanded && node.children.length > 0 && (
        <div role="group">
          {node.children.map((child) => (
            <DomainTreeNode
              key={child.id}
              node={child}
              expandedIds={expandedIds}
              selectedId={selectedId}
              onToggle={onToggle}
              onLeafClick={onLeafClick}
              onFocusNode={onFocusNode}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </>
  );
}

/**
 * SemanticDomainViewer is an overlay panel that displays a hierarchical tree of semantic domains
 * within the Dictionary tab content area. It shows domain hierarchy, breadcrumb navigation,
 * expand/collapse categories, and leaf domain selection.
 *
 * @param props - SemanticDomainViewerProps
 * @returns Semantic domain tree overlay
 */
export default function SemanticDomainViewer({
  initialDomainId,
  onAction,
}: SemanticDomainViewerProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => [...DOMAIN_VIEWER_LOCALIZED_KEYS], []),
  );
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [, setFocusedNodeId] = useState<string>(initialDomainId);

  // Localized labels with fallbacks
  const closeLabel = localizedStrings['%platformEnhancedResources_domainViewer_close%'] || 'Close';
  const rootLabel = localizedStrings['%platformEnhancedResources_domainViewer_root%'] || 'Root';
  const breadcrumbNavLabel =
    localizedStrings['%platformEnhancedResources_domainViewer_breadcrumbNav%'] ||
    'Domain breadcrumb navigation';

  // Attempt to load domain tree from backend with fallback
  const [treeFromBackend] = usePromise(
    useCallback(async () => {
      try {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const erService = (await papi.networkObjects.get('enhancedResources')) as
          | ERSemanticDomainService
          | undefined;
        if (erService) {
          const result = await erService.getSemanticDomains({ initialDomainId });
          return result.rootDomains;
        }
      } catch {
        // Backend not available -- use fallback
      }
      return undefined;
    }, [initialDomainId]),
    undefined,
  );

  const domainTree = treeFromBackend ?? FALLBACK_TREE;

  // Mark the selected node in the fallback tree
  const treeWithSelection = useMemo(() => {
    function markSelected(nodes: SemanticDomainNode[]): SemanticDomainNode[] {
      return nodes.map((node) => ({
        ...node,
        isSelected: node.id === initialDomainId,
        children: markSelected(node.children),
      }));
    }
    return markSelected(domainTree);
  }, [domainTree, initialDomainId]);

  // Auto-expand ancestor categories of the initial domain
  useEffect(() => {
    const ancestors = getAncestorIds(treeWithSelection, initialDomainId, []);
    if (ancestors && ancestors.length > 0) {
      setExpandedIds(new Set(ancestors));
    }
  }, [treeWithSelection, initialDomainId]);

  // Build breadcrumb path
  const breadcrumbPath = useMemo(() => {
    const path = buildBreadcrumbPath(treeWithSelection, initialDomainId, []);
    return path ?? [];
  }, [treeWithSelection, initialDomainId]);

  const handleToggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleLeafClick = useCallback(
    (domainId: string) => {
      onAction({ action: 'selectDomain', selectedDomainId: domainId });
    },
    [onAction],
  );

  const handleClose = useCallback(() => {
    onAction({ action: 'close' });
  }, [onAction]);

  const handleBreadcrumbClick = useCallback(
    (segmentId: string) => {
      // Recenter tree: collapse all, expand only ancestors of clicked segment
      const ancestors = getAncestorIds(treeWithSelection, segmentId, []);
      const newExpanded = new Set<string>(ancestors ?? []);
      newExpanded.add(segmentId);
      setExpandedIds(newExpanded);
    },
    [treeWithSelection],
  );

  const handleBreadcrumbRootClick = useCallback(() => {
    // Collapse everything -- show root-level only
    setExpandedIds(new Set());
  }, []);

  const handleFocusNode = useCallback((id: string) => {
    setFocusedNodeId(id);
  }, []);

  return (
    <div
      data-testid="semantic-domain-viewer"
      className="tw-flex tw-flex-col tw-h-full tw-bg-background tw-border tw-border-border tw-rounded"
    >
      {/* Header with close button */}
      <div className="tw-flex tw-items-center tw-justify-between tw-px-3 tw-py-2 tw-border-b tw-border-border tw-shrink-0">
        <span className="tw-font-medium tw-text-sm">{rootLabel}</span>
        <button
          type="button"
          onClick={handleClose}
          aria-label={closeLabel}
          className="tw-px-2 tw-py-1 tw-text-sm tw-rounded hover:tw-bg-accent tw-transition-colors"
        >
          {closeLabel}
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <nav
        data-testid="er-domain-breadcrumb"
        aria-label={breadcrumbNavLabel}
        className="tw-flex tw-items-center tw-gap-1 tw-px-3 tw-py-1 tw-border-b tw-border-border tw-text-sm tw-shrink-0 tw-flex-wrap"
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- functional tests locate breadcrumb segments via <a> elements */}
        <a
          href="#root"
          onClick={(e) => {
            e.preventDefault();
            handleBreadcrumbRootClick();
          }}
          className="tw-text-primary hover:tw-underline tw-cursor-pointer"
        >
          {rootLabel}
        </a>
        {breadcrumbPath.map((segment) => (
          <React.Fragment key={segment.id}>
            <span className="tw-text-muted-foreground">&gt;</span>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- functional tests locate breadcrumb segments via <a> elements */}
            <a
              href={`#${segment.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleBreadcrumbClick(segment.id);
              }}
              className="tw-text-primary hover:tw-underline tw-cursor-pointer"
            >
              {segment.name}
            </a>
          </React.Fragment>
        ))}
      </nav>

      {/* Domain tree */}
      <div
        data-testid="er-domain-tree"
        role="tree"
        aria-label="Semantic domain tree"
        tabIndex={0}
        className="tw-flex-1 tw-overflow-auto tw-py-1"
      >
        {treeWithSelection.map((node) => (
          <DomainTreeNode
            key={node.id}
            node={node}
            expandedIds={expandedIds}
            selectedId={initialDomainId}
            onToggle={handleToggle}
            onLeafClick={handleLeafClick}
            onFocusNode={handleFocusNode}
            level={1}
          />
        ))}
      </div>
    </div>
  );
}
