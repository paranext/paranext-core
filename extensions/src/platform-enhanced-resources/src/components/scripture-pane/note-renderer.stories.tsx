import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  MOCK_NOTE_DEFAULT,
  MOCK_NOTE_EMPTY,
  MOCK_NOTE_LONG,
} from '../../data/marble-form.story-data';
import { NoteRenderer, NOTE_RENDERER_STRING_KEYS } from './note-renderer.component';

const localizedStrings = getLocalizedStrings([...NOTE_RENDERER_STRING_KEYS]);

const meta: Meta<typeof NoteRenderer> = {
  title: 'Bundled Extensions/platform-enhanced-resources/NoteRenderer',
  component: NoteRenderer,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
};
export default meta;

type Story = StoryObj<typeof NoteRenderer>;

export const Default: Story = {
  args: {
    data: MOCK_NOTE_DEFAULT,
  },
};

export const LongFootnote: Story = {
  args: {
    data: MOCK_NOTE_LONG,
  },
};

export const Empty: Story = {
  args: {
    data: MOCK_NOTE_EMPTY,
  },
};
