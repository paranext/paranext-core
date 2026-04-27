import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { Toolbar, TOOLBAR_STRING_KEYS } from './toolbar.component';

const localizedStrings = getLocalizedStrings([...TOOLBAR_STRING_KEYS]);

const meta: Meta<typeof Toolbar> = {
  title: 'Bundled Extensions/platform-enhanced-resources/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    activeTab: 'dictionary',
    scope: 'current-verse',
    hasSenseScope: false,
    searchValue: '',
    highlightMode: 'none',
    currentReferenceLabel: 'GEN 1:1',
    scrollGroupId: 0,
    availableScrollGroupIds: [undefined, 0, 1, 2, 3],
  },
};
export default meta;

type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {};

export const WithSearch: Story = {
  args: {
    searchValue: 'beginning',
  },
};

export const HighlightAllResearchTerms: Story = {
  args: {
    highlightMode: 'all-research-terms',
  },
};

export const ScopeChapter: Story = {
  args: {
    scope: 'current-chapter',
  },
};

export const ScopeSection: Story = {
  args: {
    scope: 'current-section',
  },
};

export const WithSenseScope: Story = {
  args: {
    scope: 'current-sense',
    hasSenseScope: true,
  },
};
