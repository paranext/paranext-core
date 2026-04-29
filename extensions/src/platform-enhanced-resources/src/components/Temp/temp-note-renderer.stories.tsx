import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  MOCK_NOTE_DEFAULT,
  MOCK_NOTE_EMPTY,
  MOCK_NOTE_LONG,
} from '../../data/marble-form.story-data';
import { TempNoteRenderer, TEMP_NOTE_RENDERER_STRING_KEYS } from './temp-note-renderer.component';

const localizedStrings = getLocalizedStrings([...TEMP_NOTE_RENDERER_STRING_KEYS]);

const meta: Meta<typeof TempNoteRenderer> = {
  title: 'Temp/TempNoteRenderer',
  component: TempNoteRenderer,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
};
export default meta;

type Story = StoryObj<typeof TempNoteRenderer>;

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
