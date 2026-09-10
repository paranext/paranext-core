import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ResourceTextUnavailable } from './resource-text-unavailable.component';

/**
 * Replaces a resource panel's editor when reading the chapter failed for a reason other than the
 * text simply not containing the book — an unreadable project, a permissions failure, a data
 * provider that cannot open the resource.
 *
 * The two stories are the whole contract: whether a retry is offered is the caller's decision, not
 * this component's. A caller that can genuinely re-drive the read passes `onRetry` and the reader
 * gets a way out; one that cannot omits it, because an inert control in a state that withholds
 * every other affordance is worse than no control.
 *
 * Layout, focus repair, and re-announcement on navigation are shared with
 * `ResourceBookNotAvailable` and `ResourceBlankChapter` through `ResourceMessageView`.
 */
const meta: Meta<typeof ResourceTextUnavailable> = {
  title: 'Bundled Extensions/platform-scripture-editor/ResourceTextUnavailable',
  component: ResourceTextUnavailable,
  tags: ['autodocs'],
  // The component fills its container, so give it a canvas with real height to sit in.
  decorators: [
    (Story) => (
      <div className="tw:h-96 tw:w-full">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

/** The Bible texts and Commentaries panels, which can re-drive the chapter read. */
export const WithRetry: Story = {
  args: {
    message: 'This text could not be loaded.',
    retryLabel: 'Try again',
    onRetry: () => {},
  },
};

/**
 * The Model text panel, which has no re-subscribe path for this failure and so names it without
 * offering a control that could not act.
 */
export const Terminal: Story = {
  args: { message: 'This text could not be loaded.' },
};

/**
 * At the 300px minimum web view width the message has to wrap without the padding eating the line
 * length, and the retry control has to stay reachable below it.
 */
export const NarrowPanel: Story = {
  args: {
    message: 'This text could not be loaded.',
    retryLabel: 'Try again',
    onRetry: () => {},
  },
  decorators: [
    (Story) => (
      <div className="tw:h-96 tw:w-[300px] tw:border">
        <Story />
      </div>
    ),
  ],
};
