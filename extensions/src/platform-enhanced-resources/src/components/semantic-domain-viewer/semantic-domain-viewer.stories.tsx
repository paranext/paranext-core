import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useCallback, useMemo, useState } from 'react';
import { Button } from 'platform-bible-react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  SemanticDomainViewer,
  SEMANTIC_DOMAIN_VIEWER_STRING_KEYS,
} from './semantic-domain-viewer.component';
import type { SemanticDomainNode } from './domain-tree-node.component';
import type { DomainBreadcrumbItem } from './domain-breadcrumb.component';
import type { SemanticDomainFilteredEntry } from './semantic-domain-display-item.component';
import {
  MOCK_DOMAIN_TREE,
  MOCK_FILTERED_ENTRIES_GOSPEL,
  MOCK_FILTERED_ENTRIES_MESSAGE,
  MOCK_FILTERED_ENTRIES_WORD,
} from '../../data/semantic-domain-viewer.story-data';

const localizedStrings = getLocalizedStrings([...SEMANTIC_DOMAIN_VIEWER_STRING_KEYS]);

const ROOT_BREADCRUMB: DomainBreadcrumbItem[] = [{ id: '', label: 'All' }];

const COMMUNICATION_BREADCRUMB: DomainBreadcrumbItem[] = [
  { id: '', label: 'All' },
  { id: '5', label: '5. Communication' },
  { id: '5.1', label: '5.1 Speak' },
];

const DEEP_BREADCRUMB: DomainBreadcrumbItem[] = [
  { id: '', label: 'All' },
  { id: '1', label: '1. Physical' },
  { id: '1.1', label: '1.1 Movement' },
  { id: '1.1.3', label: '1.1.3 Carry' },
  { id: '1.1.3.3', label: '1.1.3.3 Carry in hand' },
];

/** Walks the tree and returns the path of (id, label) segments to the target id. */
function findPath(
  tree: SemanticDomainNode[],
  targetId: string,
): DomainBreadcrumbItem[] | undefined {
  // Use Array.reduce instead of for-of to satisfy no-restricted-syntax. The first match short-
  // circuits because subsequent iterations preserve the already-resolved accumulator.
  return tree.reduce<DomainBreadcrumbItem[] | undefined>((acc, node) => {
    if (acc) return acc;
    if (node.id === targetId) {
      return [{ id: node.id, label: node.label }];
    }
    const childPath = findPath(node.children, targetId);
    if (childPath) {
      return [{ id: node.id, label: node.label }, ...childPath];
    }
    return undefined;
  }, undefined);
}

/** Returns the chain of ancestor ids for the target (used to expand parents). */
function ancestorIds(tree: SemanticDomainNode[], targetId: string): string[] {
  const path = findPath(tree, targetId);
  if (!path) return [];
  return path.slice(0, -1).map((p) => p.id);
}

/** Domain id -> filtered entry list for the Interactive story. */
const ENTRIES_BY_DOMAIN: Record<string, SemanticDomainFilteredEntry[] | undefined> = {
  '5.1.1': MOCK_FILTERED_ENTRIES_WORD,
  '5.1.2': MOCK_FILTERED_ENTRIES_MESSAGE,
  '5.1.3': MOCK_FILTERED_ENTRIES_GOSPEL,
};

const meta: Meta<typeof SemanticDomainViewer> = {
  title: 'Bundled Extensions/platform-enhanced-resources/SemanticDomainViewer',
  component: SemanticDomainViewer,
  tags: ['autodocs'],
  args: {
    open: true,
    domainTree: MOCK_DOMAIN_TREE,
    expandedNodeIds: new Set<string>(),
    breadcrumbPath: ROOT_BREADCRUMB,
    isLoadingTree: false,
    isLoadingEntries: false,
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      // The Drawer renders into a portal at document.body, so the surrounding container exists
      // mostly to provide a stable backdrop in the Storybook canvas.
      <div className="tw-relative tw-h-[720px] tw-w-[1024px] tw-border tw-border-border tw-bg-muted/40">
        <div className="tw-p-4 tw-text-sm tw-text-muted-foreground">
          SemanticDomainViewer Drawer is rendered in a portal - look at the right side of the
          viewport.
        </div>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SemanticDomainViewer>;

/** Default - tree at root level, all branches collapsed, no entries shown. */
export const Default: Story = {
  args: {
    domainTree: MOCK_DOMAIN_TREE,
    expandedNodeIds: new Set<string>(),
    breadcrumbPath: ROOT_BREADCRUMB,
  },
};

/** One branch expanded showing children (Communication). */
export const ExpandedNode: Story = {
  args: {
    domainTree: MOCK_DOMAIN_TREE,
    expandedNodeIds: new Set(['5']),
    currentDomainId: '5',
    breadcrumbPath: [
      { id: '', label: 'All' },
      { id: '5', label: '5. Communication' },
    ],
  },
};

/** 4-5 levels of nesting visible (Physical -> Movement -> Carry -> leaves). */
export const DeepHierarchy: Story = {
  args: {
    domainTree: MOCK_DOMAIN_TREE,
    expandedNodeIds: new Set(['1', '1.1', '1.1.3']),
    currentDomainId: '1.1.3.3',
    breadcrumbPath: DEEP_BREADCRUMB,
  },
};

/** Leaf currently focused, breadcrumb shows full path; no children to expand. */
export const LeafView: Story = {
  args: {
    domainTree: MOCK_DOMAIN_TREE,
    expandedNodeIds: new Set(['5', '5.1']),
    currentDomainId: '5.1.1',
    breadcrumbPath: [
      { id: '', label: 'All' },
      { id: '5', label: '5. Communication' },
      { id: '5.1', label: '5.1 Speak' },
      { id: '5.1.1', label: '5.1.1 Word' },
    ],
  },
};

/** Filtered dictionary entries visible after selecting a category in the tree. */
export const WithFilteredEntries: Story = {
  args: {
    domainTree: MOCK_DOMAIN_TREE,
    expandedNodeIds: new Set(['5', '5.1']),
    currentDomainId: '5.1',
    breadcrumbPath: COMMUNICATION_BREADCRUMB,
    filteredEntries: MOCK_FILTERED_ENTRIES_WORD,
  },
};

/** Empty domain tree (e.g. resource has no semantic-domain data). */
export const Empty: Story = {
  args: {
    domainTree: [],
    expandedNodeIds: new Set<string>(),
    breadcrumbPath: ROOT_BREADCRUMB,
  },
};

/** Loading state - skeleton tree while data is being fetched. */
export const Loading: Story = {
  args: {
    domainTree: [],
    isLoadingTree: true,
    breadcrumbPath: ROOT_BREADCRUMB,
  },
};

/** Filtered entries section is loading while the tree is already populated. */
export const FilteredEntriesLoading: Story = {
  args: {
    domainTree: MOCK_DOMAIN_TREE,
    expandedNodeIds: new Set(['5', '5.1']),
    currentDomainId: '5.1',
    breadcrumbPath: COMMUNICATION_BREADCRUMB,
    filteredEntries: [],
    isLoadingEntries: true,
  },
};

/** Filtered entries section visible but empty (focused domain has no associated entries). */
export const FilteredEntriesEmpty: Story = {
  args: {
    domainTree: MOCK_DOMAIN_TREE,
    expandedNodeIds: new Set(['2']),
    currentDomainId: '2.1',
    breadcrumbPath: [
      { id: '', label: 'All' },
      { id: '2', label: '2. Supernatural' },
      { id: '2.1', label: '2.1 Deity' },
    ],
    filteredEntries: [],
  },
};

/**
 * Interactive: parent owns expansion + current-domain + breadcrumb state and reacts to all
 * callbacks. Demonstrates the full UI-PKG-007 acceptance criteria - tree expand/collapse, category
 * click re-renders the tree, breadcrumb click navigates up, domain entry click closes the drawer
 * and forwards the id (logged in lieu of the ArticleViewer).
 */
export const Interactive: StoryObj<typeof SemanticDomainViewer> = {
  args: {
    open: false,
  },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open ?? false);
    const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(new Set(['5', '5.1']));
    const [currentDomainId, setCurrentDomainId] = useState<string | undefined>('5.1');

    const breadcrumbPath = useMemo<DomainBreadcrumbItem[]>(() => {
      if (!currentDomainId) return ROOT_BREADCRUMB;
      const path = findPath(MOCK_DOMAIN_TREE, currentDomainId);
      if (!path) return ROOT_BREADCRUMB;
      return [{ id: '', label: 'All' }, ...path];
    }, [currentDomainId]);

    const filteredEntries = currentDomainId ? ENTRIES_BY_DOMAIN[currentDomainId] : undefined;

    const handleOpen = useCallback(() => {
      setExpandedNodeIds(new Set(['5', '5.1']));
      setCurrentDomainId('5.1');
      setOpen(true);
    }, []);

    const handleClose = useCallback(() => setOpen(false), []);

    const handleExpandToggle = useCallback((id: string) => {
      setExpandedNodeIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    }, []);

    const handleSelectCategory = useCallback((id: string) => {
      setCurrentDomainId(id);
      // Auto-expand the category's ancestors so the focused node is visible.
      setExpandedNodeIds((prev) => {
        const next = new Set(prev);
        ancestorIds(MOCK_DOMAIN_TREE, id).forEach((parent) => next.add(parent));
        next.add(id);
        return next;
      });
    }, []);

    const handleBreadcrumbClick = useCallback((id: string) => {
      if (!id) {
        setCurrentDomainId(undefined);
        setExpandedNodeIds(new Set());
        return;
      }
      setCurrentDomainId(id);
    }, []);

    return (
      <div className="tw-flex tw-flex-col tw-gap-3 tw-p-4">
        <Button type="button" onClick={handleOpen}>
          Open SemanticDomainViewer
        </Button>
        <p className="tw-text-sm tw-text-muted-foreground">
          Try ArrowUp / ArrowDown / ArrowLeft / ArrowRight on the tree, click a category to focus
          it, click a breadcrumb to navigate up, or click a leaf domain entry (e.g. &quot;5.1.1
          Word&quot;) to close the drawer (logs the id - in production this opens the
          ArticleViewer). Escape and click-outside also close.
        </p>
        <SemanticDomainViewer
          {...args}
          open={open}
          domainTree={MOCK_DOMAIN_TREE}
          currentDomainId={currentDomainId}
          expandedNodeIds={expandedNodeIds}
          breadcrumbPath={breadcrumbPath}
          filteredEntries={filteredEntries}
          localizedStringsWithLoadingState={[localizedStrings, false]}
          onClose={handleClose}
          onExpandToggle={handleExpandToggle}
          onSelectCategory={handleSelectCategory}
          onBreadcrumbClick={handleBreadcrumbClick}
          onCategoryEntryClick={(id) => {
            // Storybook-only diagnostic - production wires this to ArticleViewer open.
            // eslint-disable-next-line no-console
            console.log('[SemanticDomainViewer story] open article', id);
          }}
          onFilteredEntryClick={(id) => {
            // Storybook-only diagnostic - production wires this to dictionary-entry open.
            // eslint-disable-next-line no-console
            console.log('[SemanticDomainViewer story] filtered entry click', id);
          }}
        />
      </div>
    );
  },
};
