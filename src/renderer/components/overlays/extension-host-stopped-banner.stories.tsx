import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';
import {
  ENGLISH_FALLBACKS,
  EXTENSION_HOST_STOPPED_DISMISS_KEY,
  EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY,
  EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY,
  EXTENSION_HOST_STOPPED_RESTART_APP_KEY,
  EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY,
  EXTENSION_HOST_STOPPED_RESTARTED_MESSAGE_KEY,
  EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY,
  EXTENSION_HOST_STOPPED_RESTARTING_KEY,
  EXTENSION_HOST_STOPPED_TITLE_KEY,
  ExtensionHostStoppedBannerPresentational,
} from './extension-host-stopped-banner.component';

/** A toolbar-height strip and some body text, so the story shows where the banner sits. */
function WithSimulatedApp(Story: Parameters<Decorator>[0]): ReturnType<Decorator> {
  return (
    <>
      <div className="pr-twp">
        <div
          aria-hidden="true"
          className="tw:fixed tw:inset-x-0 tw:top-0 tw:h-12 tw:border-b tw:border-border tw:bg-muted"
        />
        <div aria-hidden="true" className="tw:fixed tw:inset-x-0 tw:top-32 tw:px-4 tw:text-sm">
          For God so loved the world, that he gave his only begotten Son.
        </div>
      </div>
      <Story />
    </>
  );
}

const meta: Meta<typeof ExtensionHostStoppedBannerPresentational> = {
  title: 'Advanced/ExtensionHostStoppedBanner',
  component: ExtensionHostStoppedBannerPresentational,
  tags: ['autodocs'],
  decorators: [WithSimulatedApp],
  parameters: {
    docs: {
      description: {
        component:
          'Shown in every window when the extension host stops without being asked to. A non-blocking strip below the toolbar: the rest of the window stays usable, because everything main provides still works. Offers a restart of the extension host and, as the sure fix, a restart of the app. While the new extension host comes up the buttons are disabled; afterwards the strip stays up in a calmer state until dismissed, because a restart does not heal every part of a window.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExtensionHostStoppedBannerPresentational>;

const ARGS = {
  phase: 'stopped' as const,
  title: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_TITLE_KEY],
  message: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY],
  restartExtensionsLabel: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY],
  restartAppLabel: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTART_APP_KEY],
  dismissLabel: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_DISMISS_KEY],
  isPowerMode: true,
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

export const SimpleMode: Story = {
  args: { ...ARGS, isPowerMode: false },
};
