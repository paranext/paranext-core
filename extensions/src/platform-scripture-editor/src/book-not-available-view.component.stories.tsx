import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import {
  BookNotAvailableView,
  BOOK_NOT_AVAILABLE_VIEW_STRING_KEYS,
} from './book-not-available-view.component';

/**
 * Replaces the editor canvas when the current book is not part of the active project. Simple mode
 * points Saroj at a project administrator; Power mode offers Donna a zero-state that launches
 * Manage Books straight into creating this book.
 *
 * **Try it**: hover (or tab to) the button on the disabled stories — the action stays visible so
 * the description's promise is never broken, and the tooltip names the actual reason it cannot be
 * used.
 */
const meta: Meta<typeof BookNotAvailableView> = {
  title: 'Bundled Extensions/platform-scripture-editor/BookNotAvailableView',
  component: BookNotAvailableView,
  tags: ['autodocs'],
  args: {
    localizedStrings: getLocalizedStrings([...BOOK_NOT_AVAILABLE_VIEW_STRING_KEYS]),
    isPowerMode: true,
    showManageBooksButton: true,
    onOpenManageBooks: () => {},
  },
  // The view fills its container, so give it a canvas with real height to sit in.
  decorators: [
    (Story) => (
      <div className="tw:h-96 tw:w-full">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof BookNotAvailableView>;

/** Simple mode: only the administrator message — never a button, whatever the other props say. */
export const SimpleMode: Story = {
  args: { isPowerMode: false },
};

/** Power mode on an editable project: the full zero-state with a live Manage books button. */
export const PowerModeEnabled: Story = {};

/** Power mode while an automatic Send/Receive is syncing: button disabled, tooltip explains why. */
export const PowerModeDisabledBySync: Story = {
  args: { manageBooksDisabledReason: 'syncInProgress' },
};

/** Power mode in the markers view, where books cannot be added. */
export const PowerModeDisabledByMarkersView: Story = {
  args: { manageBooksDisabledReason: 'markersView' },
};

/** Power mode on a read-only project. */
export const PowerModeDisabledByReadOnly: Story = {
  args: { manageBooksDisabledReason: 'readOnly' },
};

/**
 * No localized strings supplied: every label falls back to its raw localize key. This is what a
 * missing or mistyped key looks like in the running app.
 */
export const MissingStrings: Story = {
  args: { localizedStrings: undefined },
};
