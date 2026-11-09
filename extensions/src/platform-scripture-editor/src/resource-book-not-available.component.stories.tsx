import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { ResourceBookNotAvailable } from './resource-book-not-available.component';

/**
 * Replaces a resource panel's editor when the current book is not in the resource on screen (Model
 * text, Bible texts, Commentaries).
 *
 * Unlike the sibling `BookNotAvailableView`, this carries **no action by default and no
 * Simple/Power split**. A project missing a book is actionable in Power mode — Manage Books can
 * create it — but a published resource cannot gain a book in either mode, so both arms would say
 * the same thing. Usually the remedy lives outside this component: the panel keeps its resource
 * selector mounted above, so switching to a text that has the book is one click away. A caller that
 * owns a remedy passes `action` (see `WithAction`): the Model text panel does, for a text the user
 * chose themselves. See adr-resource-missing-book-message.
 *
 * Each story shows the wording for one panel, because the caller resolves the message so it can
 * name the thing the user is actually looking at.
 */
const meta: Meta<typeof ResourceBookNotAvailable> = {
  title: 'Bundled Extensions/platform-scripture-editor/ResourceBookNotAvailable',
  component: ResourceBookNotAvailable,
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

export const BibleText: Story = {
  args: { message: 'This book does not exist in this Bible text.' },
};

export const Commentary: Story = {
  args: { message: 'This book does not exist in this commentary.' },
};

/**
 * The Model text panel's wording when the admin chose the text: the user cannot change it there, so
 * the message points to the team layout and offers no button.
 */
export const ModelText: Story = {
  args: {
    message:
      'This book does not exist in this model text. Go to a book it contains. A project admin can choose a different model text in the team layout.',
  },
};

/**
 * The Model text panel's wording when the user chose the text themselves: the button opens the
 * picker so they can choose a different one. The sentence stays the only announced content.
 */
export const WithAction: Story = {
  args: {
    message:
      'This book does not exist in this model text. Choose a different model text or go to a book it contains.',
    action: { label: 'Pick model text…', onClick: fn() },
  },
};

/**
 * At the 300px minimum web view width the message has to wrap without the padding eating the line
 * length — which is why this uses `px-4` rather than a larger inset.
 */
export const NarrowPanel: Story = {
  args: { message: 'This book does not exist in this Bible text.' },
  decorators: [
    (Story) => (
      <div className="tw:h-96 tw:w-[300px] tw:border">
        <Story />
      </div>
    ),
  ],
};
