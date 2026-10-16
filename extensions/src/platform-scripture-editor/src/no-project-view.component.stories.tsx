import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import { NoProjectView, NO_PROJECT_VIEW_STRING_KEYS } from './no-project-view.component';

/**
 * Replaces the editor canvas when the editor has no project. A Simple-mode user with no projects at
 * all is told how to get one — register Paratext, or ask a project administrator to add them.
 */
const meta: Meta<typeof NoProjectView> = {
  title: 'Bundled Extensions/platform-scripture-editor/NoProjectView',
  component: NoProjectView,
  tags: ['autodocs'],
  args: {
    localizedStrings: getLocalizedStrings([...NO_PROJECT_VIEW_STRING_KEYS]),
    presence: 'none',
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

type Story = StoryObj<typeof NoProjectView>;

/** The user has no projects: the guidance on how to get one. */
export const NoProjects: Story = {};

/**
 * Anything short of a confirmed "no projects": projects exist but none is open, the answer is not
 * settled yet (still looking, or a sync is running), or Power mode, where the answer is not asked.
 */
export const NoProjectSelected: Story = {
  args: { presence: 'unknown' },
};

/**
 * No localized strings supplied: every label falls back to its raw localize key. This is what a
 * missing or mistyped key looks like in the running app.
 */
export const MissingStrings: Story = {
  args: { localizedStrings: undefined },
};
