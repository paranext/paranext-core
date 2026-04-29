import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  MOCK_TOOLTIP_DEFAULT,
  MOCK_TOOLTIP_MISSING_STRONGS,
  MOCK_TOOLTIP_MULTIPLE_SENSES,
} from '../../data/marble-form.story-data';
import {
  TempTooltipRenderer,
  TEMP_TOOLTIP_RENDERER_STRING_KEYS,
} from './temp-tooltip-renderer.component';

const localizedStrings = getLocalizedStrings([...TEMP_TOOLTIP_RENDERER_STRING_KEYS]);

const meta: Meta<typeof TempTooltipRenderer> = {
  title: 'Temp/TempTooltipRenderer',
  component: TempTooltipRenderer,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
};
export default meta;

type Story = StoryObj<typeof TempTooltipRenderer>;

export const Default: Story = {
  args: {
    data: MOCK_TOOLTIP_DEFAULT,
  },
};

export const MultipleSenses: Story = {
  args: {
    data: MOCK_TOOLTIP_MULTIPLE_SENSES,
  },
};

export const MissingStrongs: Story = {
  args: {
    data: MOCK_TOOLTIP_MISSING_STRONGS,
  },
};
