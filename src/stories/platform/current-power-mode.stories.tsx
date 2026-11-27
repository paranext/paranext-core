import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { CurrentAppShell } from './current-app-shell';
import {
  buildCurrentPowerDefaultLayout,
  buildCurrentPowerWorkingLayout,
} from './current-app-mock-panels';

/**
 * Power mode as it is on `main`: the shorter title bar (menus, Home, reference history, the wide
 * book/chapter/verse control, the scroll-group selector, profile) over a free-form dock with
 * draggable, closable tabs and the inset around the tab groups.
 */
const meta: Meta<typeof CurrentAppShell> = {
  title: 'platform/Current Power mode',
  component: CurrentAppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The current Power-mode window, rendered with the real title bar components, the real ' +
          'rc-dock groups (drag, edge docking, the tab-bar drop zone and panel extras) and dock ' +
          'stylesheets, and the real `PlatformTabTitle`. Only the panel contents are mocks. Build ' +
          'full-app design stories on `CurrentAppShell` (`src/stories/platform/current-app-shell.tsx`).',
      },
    },
  },
  args: { mode: 'power', layout: buildCurrentPowerWorkingLayout() },
  argTypes: { layout: { control: false }, groups: { control: false } },
  decorators: [
    (Story) => (
      <div className="tw:h-screen tw:w-full">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CurrentAppShell>;

/** Home and two project editors, with a resource and tools on the right. One plausible layout. */
export const Default: Story = {};

/** A fresh Power window: the single Home tab that `testLayout` opens. */
export const FreshWindow: Story = { args: { layout: buildCurrentPowerDefaultLayout() } };

/**
 * The unmodified `PlatformBibleToolbar`. It renders in Storybook, but its book/chapter/verse
 * control and scroll-group selector are disabled: there is no live Scripture editor for it to
 * target.
 */
export const RealToolbar: Story = { args: { toolbar: 'real' } };
