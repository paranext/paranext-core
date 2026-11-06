/*
 * Design-ideas story: the title bar's reference controls, alike in Simple and Power. The
 * book/chapter/verse control's trigger is outlined in both modes and ends in a bookmark instead of
 * the up/down chevron; Simple's back/forward buttons take Power's look, without the pill and
 * divider. Both are `CurrentAppShell` options, also on in Design ideas/Unified designs.
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { CurrentAppShell } from '../platform/current-app-shell';
import {
  buildCurrentPowerWorkingLayout,
  buildCurrentSimpleLayout,
} from '../platform/current-app-mock-panels';

const meta: Meta<typeof CurrentAppShell> = {
  title: 'Design ideas/BCV control',
  component: CurrentAppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '⚠️ **Prototype only.** The title bar with the book/chapter/verse control outlined in ' +
          'both modes and ending in a bookmark, and Simple’s back/forward buttons drawn as ' +
          'Power’s are.',
      },
    },
  },
  args: {
    mode: 'simple',
    layout: buildCurrentSimpleLayout(),
    isBookChapterControlBookmarked: true,
    isHistoryButtonsPowerStyle: true,
  },
  argTypes: { layout: { control: false }, groups: { control: false } },
  decorators: [
    (Story) => (
      <div className="tw:h-screen tw:w-full">
        <Story />
      </div>
    ),
  ],
  tags: ['!autodocs'],
};
export default meta;

type Story = StoryObj<typeof CurrentAppShell>;

export const Simple: Story = {};

export const Power: Story = {
  args: { mode: 'power', layout: buildCurrentPowerWorkingLayout() },
};
