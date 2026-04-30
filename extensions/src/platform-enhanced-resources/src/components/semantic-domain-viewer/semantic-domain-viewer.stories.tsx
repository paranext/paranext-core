import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import type { SemanticDomain } from 'platform-bible-react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  SemanticDomainViewer,
  SEMANTIC_DOMAIN_VIEWER_STRING_KEYS,
} from './semantic-domain-viewer.component';
import {
  MOCK_DOMAIN_TREE,
  MOCK_DOMAIN_PATH_DEEP,
  MOCK_DICT_ENTRIES_FILTERED,
} from '../../data/semantic-domain-viewer.story-data';

const localizedStrings = getLocalizedStrings([...SEMANTIC_DOMAIN_VIEWER_STRING_KEYS]);

const meta: Meta<typeof SemanticDomainViewer> = {
  title: 'Bundled Extensions/platform-enhanced-resources/SemanticDomainViewer/SemanticDomainViewer',
  component: SemanticDomainViewer,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    allDomains: MOCK_DOMAIN_TREE,
    filteredEntries: MOCK_DICT_ENTRIES_FILTERED,
    isLoading: false,
    onOpenChange: () => {},
    onDomainChange: () => {},
  },
};
export default meta;
type Story = StoryObj<typeof SemanticDomainViewer>;

/** Default - dialog open with a deep breadcrumb path and a populated entries list. */
export const Default: Story = {
  args: { open: true, domainPath: MOCK_DOMAIN_PATH_DEEP },
};

/** Loading - skeleton list inside the breadcrumb-popover layout. */
export const Loading: Story = {
  args: {
    open: true,
    domainPath: MOCK_DOMAIN_PATH_DEEP,
    filteredEntries: [],
    isLoading: true,
  },
};

/** Empty - focused domain has no associated entries. */
export const Empty: Story = {
  args: { open: true, domainPath: MOCK_DOMAIN_PATH_DEEP, filteredEntries: [] },
};

/**
 * Interactive - parent owns the domain path and reacts to breadcrumb-popover navigation. Click a
 * breadcrumb segment to expose the tree popover, then drill in / out of the hierarchy.
 */
export const Interactive: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [open, setOpen] = useState(true);
    const [domainPath, setDomainPath] = useState<SemanticDomain[]>(MOCK_DOMAIN_PATH_DEEP);
    return (
      <SemanticDomainViewer
        open={open}
        domainPath={domainPath}
        allDomains={MOCK_DOMAIN_TREE}
        filteredEntries={MOCK_DICT_ENTRIES_FILTERED}
        onOpenChange={setOpen}
        onDomainChange={setDomainPath}
        onAllOccurrencesClick={(tokenId) => {
          // Storybook-only diagnostic - production routes to MarbleForm filtered by occurrences.
          // eslint-disable-next-line no-console
          console.log('[SemanticDomainViewer story] all-occurrences-click', tokenId);
        }}
        onSenseOccurrencesClick={(senseId) => {
          // Storybook-only diagnostic - production routes to MarbleForm filtered by sense.
          // eslint-disable-next-line no-console
          console.log('[SemanticDomainViewer story] sense-occurrences-click', senseId);
        }}
        localizedStringsWithLoadingState={[localizedStrings, false]}
      />
    );
  },
};

/**
 * OpenedAtRoot - parent passes no `domainPath`, so the dialog falls back to the first top-level
 * domain. Mirrors the "Browse semantic domains" cold entry path.
 */
export const OpenedAtRoot: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [open, setOpen] = useState(true);
    const [domainPath, setDomainPath] = useState<SemanticDomain[] | undefined>(undefined);
    return (
      <SemanticDomainViewer
        open={open}
        domainPath={domainPath}
        allDomains={MOCK_DOMAIN_TREE}
        filteredEntries={MOCK_DICT_ENTRIES_FILTERED}
        onOpenChange={setOpen}
        onDomainChange={setDomainPath}
        localizedStringsWithLoadingState={[localizedStrings, false]}
      />
    );
  },
};
