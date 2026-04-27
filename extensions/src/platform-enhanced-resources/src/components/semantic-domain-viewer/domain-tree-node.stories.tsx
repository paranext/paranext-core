import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState, type ReactNode } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  DomainTreeNode,
  DOMAIN_TREE_NODE_STRING_KEYS,
  type SemanticDomainNode,
} from './domain-tree-node.component';
import {
  MOCK_DOMAIN_COMMUNICATION_BRANCH,
  MOCK_DOMAIN_PHYSICAL_BRANCH,
} from '../../data/semantic-domain-viewer.story-data';

const localizedStrings = getLocalizedStrings([...DOMAIN_TREE_NODE_STRING_KEYS]);

/** Standalone leaf node (no children, hasArticle=true). */
const LEAF_NODE: SemanticDomainNode = {
  id: '5.1.1',
  label: '5.1.1 Word',
  hasArticle: true,
  children: [],
};

/** Container node used to host the node-being-rendered so the recursive ul role=tree is present. */
function TreeFrame({ children }: { children: ReactNode }) {
  return (
    <div className="tw-w-[480px] tw-rounded tw-border tw-border-border tw-bg-background tw-p-3">
      <ul role="tree" aria-label="Demo tree" className="tw-flex tw-flex-col">
        {children}
      </ul>
    </div>
  );
}

const meta: Meta<typeof DomainTreeNode> = {
  title: 'Bundled Extensions/platform-enhanced-resources/SemanticDomainViewer/DomainTreeNode',
  component: DomainTreeNode,
  tags: ['autodocs'],
  args: {
    level: 1,
    positionInSet: 1,
    setSize: 1,
    expandedIds: new Set<string>(),
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      <TreeFrame>
        <Story />
      </TreeFrame>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DomainTreeNode>;

/** Leaf node - no expand toggle, label is clickable as displaydomain. */
export const LeafNode: Story = {
  args: {
    node: LEAF_NODE,
  },
};

/** Branch node, collapsed - chevron-right toggle visible. */
export const Collapsed: Story = {
  args: {
    node: MOCK_DOMAIN_COMMUNICATION_BRANCH,
    expandedIds: new Set<string>(),
  },
};

/** Branch node expanded one level - children visible with chevron-down. */
export const ExpandedWithChildren: Story = {
  args: {
    node: MOCK_DOMAIN_COMMUNICATION_BRANCH,
    expandedIds: new Set(['5']),
  },
};

/** Deeply expanded branch demonstrating 4-level nesting via the Physical -> Movement -> Carry chain. */
export const DeepHierarchy: Story = {
  args: {
    node: MOCK_DOMAIN_PHYSICAL_BRANCH,
    expandedIds: new Set(['1', '1.1', '1.1.3']),
  },
};

/** Node flagged as the current domain - highlighted background, autofocused. */
export const Current: Story = {
  args: {
    node: MOCK_DOMAIN_COMMUNICATION_BRANCH,
    expandedIds: new Set(['5']),
    currentDomainId: '5.1',
  },
};

/** Node where hasArticle=false - clicking the label fires onSelectCategory. */
export const CategoryOnly: Story = {
  args: {
    node: { ...LEAF_NODE, hasArticle: false, label: '5.1 Speak (category)' },
  },
};

/** Interactive expand/collapse demo. */
export const Interactive: StoryObj<typeof DomainTreeNode> = {
  args: {
    node: MOCK_DOMAIN_PHYSICAL_BRANCH,
  },
  render: function Render(args) {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['1']));
    const handleToggle = (id: string) => {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    };
    return (
      <DomainTreeNode
        {...args}
        expandedIds={expandedIds}
        onExpandToggle={handleToggle}
        // Storybook-only diagnostic - production wires this to the parent viewer.
        // eslint-disable-next-line no-console
        onSelectCategory={(id) => console.log('[DomainTreeNode story] selectCategory', id)}
        // Storybook-only diagnostic - production wires this to the parent viewer.
        // eslint-disable-next-line no-console
        onSelectDomainEntry={(id) => console.log('[DomainTreeNode story] selectDomainEntry', id)}
      />
    );
  },
};
