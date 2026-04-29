import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  MOCK_FILTERED_TOKEN_ID,
  MOCK_GEN_1_1,
  MOCK_GEN_1_TOKENS,
} from '../../data/marble-form.story-data';
import {
  TempScripturePane,
  TEMP_SCRIPTURE_PANE_STRING_KEYS,
} from './temp-scripture-pane.component';

const localizedStrings = getLocalizedStrings([...TEMP_SCRIPTURE_PANE_STRING_KEYS]);

const meta: Meta<typeof TempScripturePane> = {
  title: 'Temp/TempScripturePane',
  component: TempScripturePane,
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

type Story = StoryObj<typeof TempScripturePane>;

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
