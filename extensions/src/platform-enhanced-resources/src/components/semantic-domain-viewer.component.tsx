import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { Button } from 'platform-bible-react';
import { X, ChevronRight, ChevronDown } from 'lucide-react';

// Import utilities for use in this component
import { computeBreadcrumbPath, computeAncestorNumbers } from './semantic-domain-viewer.utils';

// --- Types ---

/** A word entry within a semantic domain */
export interface SemanticDomainWord {
  /** The lemma (source language form) */
  lemma: string;
  /** The translated term */
  term: string;
}

/** A node in the semantic domain tree hierarchy */
export interface SemanticDomain {
  /** Domain number (e.g., "1.1.1") */
  number: string;
  /** Domain name */
  name: string;
  /** Words associated with this domain */
  words?: SemanticDomainWord[];
  /** Child domains */
  children: SemanticDomain[];
}

/** A breadcrumb path item */
export interface BreadcrumbItem {
  /** Domain number */
  number: string;
  /** Domain name */
  name: string;
}

/** Input data for opening the semantic domain viewer */
export interface SemanticDomainViewerInput {
  /** The initially selected domain number */
  selectedDomainNumber: string;
  /** The full domain tree */
  domainTree: SemanticDomain[];
}

/** Props for the SemanticDomainViewer component */
export interface SemanticDomainViewerProps {
  /** The initially selected domain number */
  selectedDomainNumber: string;
  /** The full domain tree */
  domainTree: SemanticDomain[];
  /** Callback when the overlay is closed */
  onClose: () => void;
  /** Callback when a word link is clicked to navigate to a dictionary entry */
  onNavigateToWord: (term: string) => void;
}

// --- Constants ---

/** Localization keys used by the SemanticDomainViewer */
const SEMANTIC_DOMAIN_LOCALIZED_KEYS: LocalizeKey[] = [
  '%enhancedResources_semanticDomain_close%',
  '%enhancedResources_semanticDomain_breadcrumbLabel%',
  '%enhancedResources_semanticDomain_expandNode%',
  '%enhancedResources_semanticDomain_collapseNode%',
  '%enhancedResources_semanticDomain_title%',
  '%enhancedResources_semanticDomain_goToWord%',
];

// Re-export utility functions for consumers
export {
  findDomainByNumber,
  computeBreadcrumbPath,
  computeAncestorNumbers,
} from './semantic-domain-viewer.utils';

// --- Tree Node Component ---

interface TreeNodeProps {
  node: SemanticDomain;
  level: number;
  expandedNodes: Set<string>;
  selectedDomainNumber: string;
  onToggleExpand: (domainNumber: string) => void;
  onSelectDomain: (domainNumber: string) => void;
  onNavigateToWord: (term: string) => void;
  localizedStrings: LanguageStrings;
  selectedNodeRef: React.MutableRefObject<HTMLLIElement | undefined>;
}

function TreeNode({
  node,
  level,
  expandedNodes,
  selectedDomainNumber,
  onToggleExpand,
  onSelectDomain,
  onNavigateToWord,
  localizedStrings,
  selectedNodeRef,
}: TreeNodeProps) {
  const isExpanded = expandedNodes.has(node.number);
  const isSelected = node.number === selectedDomainNumber;
  const hasChildren = node.children.length > 0;

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggleExpand(node.number);
    },
    [node.number, onToggleExpand],
  );

  const handleSelect = useCallback(() => {
    onSelectDomain(node.number);
  }, [node.number, onSelectDomain]);

  const handleWordClick = useCallback(
    (term: string) => (e: React.MouseEvent) => {
      e.stopPropagation();
      onNavigateToWord(term);
    },
    [onNavigateToWord],
  );

  return (
    <li
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isSelected}
      aria-level={level}
      ref={
        isSelected
          ? (el: HTMLLIElement | null) => {
              // eslint-disable-next-line no-param-reassign
              selectedNodeRef.current = el ?? undefined;
            }
          : undefined
      }
      className={`tw-list-none ${isSelected ? 'tw-bg-accent tw-rounded' : ''}`}
      data-testid={`domain-node-${node.number}`}
    >
      <div
        className="tw-flex tw-items-center tw-gap-1 tw-py-0.5 tw-cursor-pointer hover:tw-bg-accent/50 tw-rounded tw-px-1"
        style={{ paddingLeft: `${(level - 1) * 16 + 4}px` }}
      >
        {/* Caret toggle for expand/collapse */}
        {hasChildren ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="tw-h-5 tw-w-5 tw-p-0 tw-shrink-0"
            onClick={handleToggle}
            aria-label={
              isExpanded
                ? `${localizedStrings['%enhancedResources_semanticDomain_collapseNode%']} ${node.number} ${node.name}`
                : `${localizedStrings['%enhancedResources_semanticDomain_expandNode%']} ${node.number} ${node.name}`
            }
          >
            {isExpanded ? (
              <ChevronDown className="tw-h-3.5 tw-w-3.5" />
            ) : (
              <ChevronRight className="tw-h-3.5 tw-w-3.5" />
            )}
          </Button>
        ) : (
          <span className="tw-w-5 tw-shrink-0" aria-hidden="true" />
        )}

        {/* Domain number and name - clickable to select */}
        <button
          type="button"
          className={`tw-border-0 tw-bg-transparent tw-text-left tw-text-sm tw-cursor-pointer tw-flex-1 tw-truncate tw-p-0 ${
            isSelected ? 'tw-font-bold' : ''
          }`}
          onClick={handleSelect}
        >
          <span className="tw-font-medium tw-mr-1">{node.number}</span>
          <span>{node.name}</span>
        </button>
      </div>

      {/* Word links for this domain (shown when selected or expanded) */}
      {isSelected && node.words && node.words.length > 0 ? (
        <div
          className="tw-flex tw-flex-wrap tw-gap-1 tw-ml-10 tw-mb-1 tw-mt-0.5"
          data-testid={`domain-words-${node.number}`}
        >
          {node.words.map((word) => (
            <Button
              key={`${word.lemma}-${word.term}`}
              type="button"
              variant="link"
              size="sm"
              className="tw-h-auto tw-p-0 tw-text-xs tw-text-blue-600 hover:tw-text-blue-800"
              onClick={handleWordClick(word.term)}
              aria-label={`${localizedStrings['%enhancedResources_semanticDomain_goToWord%']}: ${word.term}`}
            >
              {word.term}
            </Button>
          ))}
        </div>
      ) : undefined}

      {/* Child nodes */}
      {hasChildren && isExpanded ? (
        <ul role="group" className="tw-m-0 tw-p-0">
          {node.children.map((child) => (
            <TreeNode
              key={child.number}
              node={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              selectedDomainNumber={selectedDomainNumber}
              onToggleExpand={onToggleExpand}
              onSelectDomain={onSelectDomain}
              onNavigateToWord={onNavigateToWord}
              localizedStrings={localizedStrings}
              selectedNodeRef={selectedNodeRef}
            />
          ))}
        </ul>
      ) : undefined}
    </li>
  );
}

// --- Main Component ---

/**
 * SemanticDomainViewer renders a tree overlay displaying semantic domain hierarchy with breadcrumb
 * navigation. It is launched from DictionaryTab's semantic domain links and displays the full
 * domain tree with the selected domain highlighted and its ancestors auto-expanded.
 *
 * Features:
 *
 * - Collapsible tree nodes with caret toggle
 * - Auto-expanded path to selected domain
 * - Selected domain scrolled into view
 * - Breadcrumb navigation from root to selected domain
 * - Breadcrumb links navigate to different domains
 * - Word links navigate to dictionary entries (closes overlay)
 * - Close button and Escape key return to dictionary tab
 * - ARIA tree role attributes for accessibility
 */
export default function SemanticDomainViewer({
  selectedDomainNumber,
  domainTree,
  onClose,
  onNavigateToWord,
}: SemanticDomainViewerProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => SEMANTIC_DOMAIN_LOCALIZED_KEYS, []));

  // Current selected domain (can change via breadcrumb navigation)
  const [currentDomainNumber, setCurrentDomainNumber] = useState(selectedDomainNumber);

  // Expanded nodes set - initialized with ancestors of selected domain
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => {
    return computeAncestorNumbers(domainTree, selectedDomainNumber);
  });

  // Ref for scrolling the selected node into view
  const selectedNodeRef = useRef<HTMLLIElement | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement | undefined>(undefined);
  const hasScrolledRef = useRef(false);

  // Breadcrumb path for current domain
  const breadcrumbPath = useMemo(
    () => computeBreadcrumbPath(domainTree, currentDomainNumber),
    [domainTree, currentDomainNumber],
  );

  // Scroll selected node into view after initial render
  useEffect(() => {
    if (!hasScrolledRef.current && selectedNodeRef.current) {
      selectedNodeRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
      hasScrolledRef.current = true;
    }
  });

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Focus container on mount
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  // Toggle expand/collapse of a tree node
  const handleToggleExpand = useCallback((domainNumber: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(domainNumber)) {
        next.delete(domainNumber);
      } else {
        next.add(domainNumber);
      }
      return next;
    });
  }, []);

  // Select a domain (from breadcrumb or tree click)
  const handleSelectDomain = useCallback(
    (domainNumber: string) => {
      setCurrentDomainNumber(domainNumber);
      // Auto-expand ancestors of the newly selected domain
      const newAncestors = computeAncestorNumbers(domainTree, domainNumber);
      setExpandedNodes((prev) => {
        const next = new Set(prev);
        newAncestors.forEach((a) => next.add(a));
        return next;
      });
      // Reset scroll flag so we scroll to the new selection
      hasScrolledRef.current = false;
    },
    [domainTree],
  );

  // Handle breadcrumb click
  const handleBreadcrumbClick = useCallback(
    (domainNumber: string) => {
      handleSelectDomain(domainNumber);
    },
    [handleSelectDomain],
  );

  // Handle word link click - navigates to dictionary entry and closes overlay
  const handleWordClick = useCallback(
    (term: string) => {
      onNavigateToWord(term);
    },
    [onNavigateToWord],
  );

  return (
    <div
      ref={(el: HTMLDivElement | null) => {
        // eslint-disable-next-line no-param-reassign
        containerRef.current = el ?? undefined;
      }}
      data-testid="semantic-domain-viewer"
      className="tw-absolute tw-inset-0 tw-z-30 tw-bg-background tw-flex tw-flex-col tw-border tw-border-border tw-rounded tw-shadow-lg"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      role="dialog"
      aria-label={localizedStrings['%enhancedResources_semanticDomain_title%']}
    >
      {/* Header with title and close button */}
      <div className="tw-flex tw-items-center tw-justify-between tw-px-3 tw-py-2 tw-border-b tw-border-border tw-shrink-0">
        <h2 className="tw-text-sm tw-font-semibold tw-m-0">
          {localizedStrings['%enhancedResources_semanticDomain_title%']}
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="tw-h-6 tw-w-6 tw-p-0"
          onClick={onClose}
          aria-label={localizedStrings['%enhancedResources_semanticDomain_close%']}
        >
          <X className="tw-h-4 tw-w-4" />
        </Button>
      </div>

      {/* Breadcrumb navigation */}
      <nav
        className="tw-flex tw-items-center tw-flex-wrap tw-gap-0.5 tw-px-3 tw-py-1.5 tw-border-b tw-border-border tw-shrink-0 tw-text-xs"
        aria-label={localizedStrings['%enhancedResources_semanticDomain_breadcrumbLabel%']}
        data-testid="semantic-domain-breadcrumb"
      >
        {breadcrumbPath.map((item, index) => {
          const isLast = index === breadcrumbPath.length - 1;
          return (
            <React.Fragment key={item.number}>
              {index > 0 ? (
                <ChevronRight
                  className="tw-h-3 tw-w-3 tw-text-muted-foreground tw-shrink-0"
                  aria-hidden="true"
                />
              ) : undefined}
              {isLast ? (
                <span className="tw-font-medium tw-text-foreground">
                  {item.number} {item.name}
                </span>
              ) : (
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="tw-h-auto tw-p-0 tw-text-xs tw-text-blue-600 hover:tw-text-blue-800"
                  onClick={() => handleBreadcrumbClick(item.number)}
                >
                  {item.number} {item.name}
                </Button>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Domain tree */}
      <div className="tw-flex-1 tw-overflow-auto tw-min-h-0 tw-px-2 tw-py-1">
        <ul
          role="tree"
          className="tw-m-0 tw-p-0"
          aria-label={localizedStrings['%enhancedResources_semanticDomain_title%']}
        >
          {domainTree.map((rootNode) => (
            <TreeNode
              key={rootNode.number}
              node={rootNode}
              level={1}
              expandedNodes={expandedNodes}
              selectedDomainNumber={currentDomainNumber}
              onToggleExpand={handleToggleExpand}
              onSelectDomain={handleSelectDomain}
              onNavigateToWord={handleWordClick}
              localizedStrings={localizedStrings}
              selectedNodeRef={selectedNodeRef}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
