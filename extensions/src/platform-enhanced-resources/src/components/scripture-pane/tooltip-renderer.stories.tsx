import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  MOCK_TOOLTIP_DEFAULT,
  MOCK_TOOLTIP_MISSING_STRONGS,
  MOCK_TOOLTIP_MULTIPLE_SENSES,
} from '../../data/marble-form.story-data';
import { TooltipRenderer, TOOLTIP_RENDERER_STRING_KEYS } from './tooltip-renderer.component';

const localizedStrings = getLocalizedStrings([...TOOLTIP_RENDERER_STRING_KEYS]);

const meta: Meta<typeof TooltipRenderer> = {
  title: 'Bundled Extensions/platform-enhanced-resources/TooltipRenderer',
  component: TooltipRenderer,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
};
export default meta;

type Story = StoryObj<typeof TooltipRenderer>;

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
