import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { CurrentAppShell } from './current-app-shell';
import { buildCurrentSimpleLayout } from './current-app-mock-panels';

/**
 * Simple mode as it is on `main`: the title bar (project picker, reference history,
 * book/chapter/verse control, Sync, profile, menus) and the fixed three-column dock with the
 * headless model-text and editor columns and the icon-tab resources column. The dock chrome, tab
 * titles and title-bar controls are the app's own components; the panel contents are mocks.
 */
const meta: Meta<typeof CurrentAppShell> = {
  title: 'platform/Current Simple mode',
  component: CurrentAppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The current Simple-mode window, rendered with the real title bar components, the real ' +
          'rc-dock groups and dock stylesheets, and the real `PlatformTabTitle`. The layout is ' +
          'derived from `simple-layout.data.ts`; only the panel contents are mocks. Build full-app ' +
          'design stories on `CurrentAppShell` (`src/stories/platform/current-app-shell.tsx`).',
      },
    },
  },
  args: { mode: 'simple', layout: buildCurrentSimpleLayout() },
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

/** The title bar composed from the real sub-components, with a working reference control. */
export const Default: Story = {};

/** Sync shows that one project has changes to send, as after an edit. */
export const ChangesToSend: Story = {
  args: {
    syncStatus: {
      status: 'unsynced',
      syncingProjects: [],
      isVerdictFromBackendOnly: false,
      unsyncedProjects: [{ projectId: 'hnf', name: 'HNF', direction: 'send' }],
      unsyncedDirection: 'send',
    },
  },
};

/**
 * The unmodified `PlatformBibleToolbar`. It renders in Storybook, but with no backend its project
 * picker has no projects, its book/chapter/verse control is disabled (no live Scripture editor for
 * the window service to target), and its Sync button waits on an availability probe.
 */
export const RealToolbar: Story = { args: { toolbar: 'real' } };
