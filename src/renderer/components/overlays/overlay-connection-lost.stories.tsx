import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';
import { formatReplacementString } from 'platform-bible-utils';
import {
  CONNECTION_LOST_MESSAGE_KEY,
  CONNECTION_LOST_RELOAD_KEY,
  CONNECTION_LOST_TITLE_KEY,
  ConnectionLostOverlayPresentational,
  ENGLISH_FALLBACKS,
  PRODUCT_NAME_KEY,
} from './overlay-connection-lost.component';

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

// Taken from the component's own English fallbacks rather than restated, so the stories cannot
// drift from the text the app actually renders. The message fallback is the un-expanded template,
// carrying a `{%product_name%}` placeholder that the component substitutes before passing it down —
// so these stories have to run the same substitution, or they render the placeholder verbatim.
const ARGS = {
  title: ENGLISH_FALLBACKS[CONNECTION_LOST_TITLE_KEY],
  message: formatReplacementString(ENGLISH_FALLBACKS[CONNECTION_LOST_MESSAGE_KEY], {
    [PRODUCT_NAME_KEY]: ENGLISH_FALLBACKS[PRODUCT_NAME_KEY],
  }),
  reloadLabel: ENGLISH_FALLBACKS[CONNECTION_LOST_RELOAD_KEY],
  onReload: () => {},
};

export const PowerMode: Story = { args: { ...ARGS, isPowerMode: true } };

export const SimpleMode: Story = { args: { ...ARGS, isPowerMode: false } };
