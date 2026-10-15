import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';
import { formatReplacementString } from 'platform-bible-utils';
import {
  ENGLISH_FALLBACKS,
  EXTENSION_HOST_STOPPED_DISMISS_KEY,
  EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY,
  EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY,
  EXTENSION_HOST_STOPPED_RESTART_APP_KEY,
  EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY,
  EXTENSION_HOST_STOPPED_RESTART_UNCONFIRMED_TITLE_KEY,
  EXTENSION_HOST_STOPPED_RESTARTED_MESSAGE_KEY,
  EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY,
  EXTENSION_HOST_STOPPED_RESTARTING_KEY,
  EXTENSION_HOST_STOPPED_TITLE_KEY,
  ExtensionHostStoppedBannerPresentational,
  PRODUCT_NAME_KEY,
} from './extension-host-stopped-banner.component';

/**
 * A toolbar-height strip above the banner and some body text below it, all in flow, so the story
 * shows the banner pushing the content down rather than covering it.
 */
function WithSimulatedApp(Story: Parameters<Decorator>[0]): ReturnType<Decorator> {
  return (
    <div className="pr-twp tw:flex tw:flex-col">
      <div aria-hidden="true" className="tw:h-12 tw:border-b tw:border-border tw:bg-muted" />
      <Story />
      <div aria-hidden="true" className="tw:px-4 tw:py-2 tw:text-sm">
        For God so loved the world, that he gave his only begotten Son.
      </div>
    </div>
  );
}

const meta: Meta<typeof ExtensionHostStoppedBannerPresentational> = {
  title: 'Advanced/ExtensionHostStoppedBanner',
  component: ExtensionHostStoppedBannerPresentational,
  tags: ['autodocs', 'test'],
  decorators: [WithSimulatedApp],
  parameters: {
    docs: {
      description: {
        component:
          'Shown in every window when the extension host stops without being asked to. A non-blocking strip in flow between the toolbar and the dock, which moves down to make room: the rest of the window stays usable, because everything main provides still works. The copy calls the extension host "a service on this computer" and never names extensions. Offers a restart of the extension host (Restart service) and, as the sure fix, a restart of the app. While the new extension host comes up, Restart service is disabled and Restart app stays available; afterwards the strip stays up in a calmer state until dismissed, because a restart does not heal every part of a window. If the new extension host never announces its start, the calmer state says the restart may not have worked.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExtensionHostStoppedBannerPresentational>;

const ARGS = {
  phase: 'stopped' as const,
  title: formatReplacementString(ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_TITLE_KEY], {
    productName: ENGLISH_FALLBACKS[PRODUCT_NAME_KEY],
  }),
  message: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY],
  restartExtensionsLabel: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY],
  restartAppLabel: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTART_APP_KEY],
  dismissLabel: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_DISMISS_KEY],
  onRestartExtensions: () => {},
  onRestartApp: () => {},
  onDismiss: () => {},
};

export const LostConnection: Story = { args: ARGS };

export const Crashed: Story = {
  args: { ...ARGS, message: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY] },
};

export const Restarting: Story = {
  args: {
    ...ARGS,
    phase: 'restarting',
    message: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTARTING_KEY],
  },
};

export const Restarted: Story = {
  args: {
    ...ARGS,
    phase: 'restarted',
    title: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY],
    message: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTARTED_MESSAGE_KEY],
  },
};

export const RestartUnconfirmed: Story = {
  args: {
    ...ARGS,
    phase: 'restarted',
    isRestartConfirmed: false,
    title: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTART_UNCONFIRMED_TITLE_KEY],
    message: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTARTED_MESSAGE_KEY],
  },
};
