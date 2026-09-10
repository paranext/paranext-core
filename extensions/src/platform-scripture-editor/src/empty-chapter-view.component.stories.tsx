import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import { EmptyChapterView, EMPTY_CHAPTER_VIEW_STRING_KEYS } from './empty-chapter-view.component';

/**
 * Replaces the editor canvas in Simple mode when the current chapter is effectively blank: a short
 * message plus the one action that fills the chapter in, anchored where the first line of text is
 * about to appear.
 *
 * **Try it**: hover (or tab to) the button on the structure-protected story — the action stays
 * visible so the message is never left promising something the user cannot do, and the tooltip
 * names the reason.
 */
const meta: Meta<typeof EmptyChapterView> = {
  title: 'Bundled Extensions/platform-scripture-editor/EmptyChapterView',
  component: EmptyChapterView,
  tags: ['autodocs'],
  args: {
    localizedStrings: getLocalizedStrings([...EMPTY_CHAPTER_VIEW_STRING_KEYS]),
    isStructureProtected: false,
    showButton: true,
    onAddChapterNumber: () => {},
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

type Story = StoryObj<typeof EmptyChapterView>;

/** An editable project: the message and a live button that generates the chapter+verse scaffold. */
export const Editable: Story = {};

/**
 * Structure protection is on: the button stays visible but disabled, with a tooltip explaining that
 * chapter and verse markers cannot be added.
 */
export const StructureProtected: Story = {
  args: { isStructureProtected: true },
};

/**
 * No button at all — a read-only project, `chapterNum: 0` front matter, or versification data still
 * loading. The message has to stand on its own, since there is nothing the user can do here.
 */
export const WithoutButton: Story = {
  args: { showButton: false },
};

/**
 * A published resource rather than a project. The message names the resource, because "this chapter
 * is empty" reads as an invitation to fill it in a text the reader cannot edit.
 */
export const Resource: Story = {
  args: { isResource: true, showButton: false },
};

/**
 * No localized strings supplied: every label falls back to its raw localize key. This is what a
 * missing or mistyped key looks like in the running app.
 */
export const MissingStrings: Story = {
  args: { localizedStrings: undefined },
};
