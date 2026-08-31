import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';
import { ConnectionLostOverlayPresentational } from './overlay-connection-lost.component';

/** Renders a toolbar-height strip and some body text so the story shows what the state covers. */
function WithSimulatedApp(Story: Parameters<Decorator>[0]): ReturnType<Decorator> {
  return (
    <>
      <div className="pr-twp">
        <div
          aria-hidden="true"
          className="tw:fixed tw:inset-x-0 tw:top-0 tw:h-12 tw:border-b tw:border-border tw:bg-muted"
        />
        <div aria-hidden="true" className="tw:fixed tw:inset-x-0 tw:top-24 tw:px-4 tw:text-sm">
          For God so loved the world, that he gave his only begotten Son.
        </div>
      </div>
      <Story />
    </>
  );
}

const meta: Meta<typeof ConnectionLostOverlayPresentational> = {
  title: 'Advanced/OverlayConnectionLost',
  component: ConnectionLostOverlayPresentational,
  tags: ['autodocs'],
  decorators: [WithSimulatedApp],
  parameters: {
    docs: {
      description: {
        component:
          'Shown when this renderer loses its websocket connection to the rest of the app. A banner names the problem and offers a reload; a scrim covers the whole window, including the toolbar, because every control on screen reaches the app over the connection that just died.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConnectionLostOverlayPresentational>;

const ARGS = {
  title: 'Connection lost.',
  message:
    "Platform.Bible can't reach its background services. Anything you changed just now may not be saved.",
  reloadLabel: 'Reload',
  onReload: () => {},
};

export const PowerMode: Story = { args: { ...ARGS, isPowerMode: true } };

export const SimpleMode: Story = { args: { ...ARGS, isPowerMode: false } };
