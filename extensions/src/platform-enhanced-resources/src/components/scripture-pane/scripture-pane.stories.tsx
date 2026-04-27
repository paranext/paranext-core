import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  MOCK_FILTERED_TOKEN_ID,
  MOCK_GEN_1_1,
  MOCK_GEN_1_TOKENS,
} from '../../data/marble-form.story-data';
import { ScripturePane, SCRIPTURE_PANE_STRING_KEYS } from './scripture-pane.component';

const localizedStrings = getLocalizedStrings([...SCRIPTURE_PANE_STRING_KEYS]);

const meta: Meta<typeof ScripturePane> = {
  title: 'Bundled Extensions/platform-enhanced-resources/ScripturePane',
  component: ScripturePane,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    currentReference: MOCK_GEN_1_1,
    filteredTokenId: undefined,
    hebrewDisplayMode: 'both',
    greekDisplayMode: 'both',
    showFootnotes: false,
    scripturePaneZoom: 1,
  },
};
export default meta;

type Story = StoryObj<typeof ScripturePane>;

export const Default: Story = {
  args: {
    tokens: MOCK_GEN_1_TOKENS,
    filteredTokenId: undefined,
  },
};

export const Loading: Story = {
  args: {
    tokens: undefined,
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    tokens: undefined,
  },
};

export const WithFilter: Story = {
  args: {
    tokens: MOCK_GEN_1_TOKENS,
    filteredTokenId: MOCK_FILTERED_TOKEN_ID,
    showFootnotes: true,
  },
};

export const Error: Story = {
  args: {
    tokens: undefined,
    errorMessage: 'Failed to load chapter tokens for GEN 1: enhanced resource is not initialized.',
  },
};
