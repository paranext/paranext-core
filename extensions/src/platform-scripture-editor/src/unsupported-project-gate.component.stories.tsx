import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  UnsupportedProjectGate,
  UnsupportedProjectMessage,
} from './unsupported-project-gate.component';

const STUDY_BIBLE_ADDITIONS_REASON = '%project_unsupported_studyBibleAdditions%';

/** Stands in for the Scripture editor, which the gate mounts only for a project that can be opened. */
function EditorStandIn() {
  return (
    <div className="tw:flex tw:h-full tw:items-center tw:justify-center tw:border tw:border-dashed">
      Scripture editor
    </div>
  );
}

/**
 * Replaces the Scripture editor for a project that cannot be opened (e.g. a Study Bible Additions
 * project), saying why. The editor is never mounted for such a project, so none of its text is
 * requested.
 *
 * The reason is the project's `unsupportedReason` localize key. It is localized only when the
 * project is unsupported; until then a spinner holds its place, and a key with no translation falls
 * back to a generic sentence, so a raw key never shows.
 */
const meta: Meta<typeof UnsupportedProjectGate> = {
  title: 'Bundled Extensions/platform-scripture-editor/UnsupportedProjectGate',
  component: UnsupportedProjectGate,
  tags: ['autodocs'],
  args: {
    unsupportedReason: STUDY_BIBLE_ADDITIONS_REASON,
    announcementKey: 'SBA',
    children: <EditorStandIn />,
  },
  // The message fills its container, so give it a canvas with real height to sit in.
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

export const Unsupported: Story = {};

/** While the reason is being localized, a spinner holds its place rather than a raw key. */
export const LocalizingReason: Story = {
  render: ({ announcementKey }) => (
    <UnsupportedProjectMessage message={undefined} announcementKey={announcementKey} />
  ),
};

/** A project that can be opened gets the editor, untouched. */
export const Supported: Story = {
  args: { unsupportedReason: '' },
};

/** At the 300px minimum web view width the reason has to wrap. */
export const NarrowPanel: Story = {
  decorators: [
    (Story) => (
      <div className="tw:h-96 tw:w-[300px] tw:border">
        <Story />
      </div>
    ),
  ],
};
