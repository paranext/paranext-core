import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import {
  REPLACE_MARKERS_PROMPT_STRING_KEYS,
  ReplaceMarkersPrompt,
} from './replace-markers-prompt.component';

/**
 * `ReplaceMarkersPrompt` stands between a single Replace and a match that includes USFM markers. A
 * match of whole markers offers **Cancel** and **Replace (including markers)**. A match Replace may
 * not touch is skipped, with a message and only **OK**. How the markers look is provisional until
 * UX designs it, and the skipped messages are drafts.
 */
const meta: Meta<typeof ReplaceMarkersPrompt> = {
  title: 'Bundled Extensions/platform-scripture/Find/Replace Markers Prompt',
  component: ReplaceMarkersPrompt,
  tags: ['autodocs', 'test'],
  args: {
    localizedStrings: getLocalizedStrings([...REPLACE_MARKERS_PROMPT_STRING_KEYS]),
    skippedMessage: '',
    onDismiss: () => {},
    onConfirm: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof ReplaceMarkersPrompt>;

export const WholeMarkers: Story = {
  args: { action: 'confirm', matchedUsfm: 'paragraph ends with b\n\\p And the second' },
};

export const OneEndOfAPair: Story = {
  args: {
    action: 'oneEndedMarker',
    skippedMessage:
      'The text in GEN 1:3 to be replaced ("Lord God") includes only part of a marker, so it will be skipped.',
  },
};

export const ChapterMarker: Story = {
  args: {
    action: 'chapterMarker',
    skippedMessage:
      'The text in GEN 1:31 to be replaced ("last wordsFirst") includes a chapter marker, so it will be skipped.',
  },
};

export const StructureLocked: Story = {
  args: {
    action: 'structureProtected',
    skippedMessage:
      'The text in GEN 1:2 to be replaced ("cDverse") includes a verse number, paragraph break, or chapter marker, and structure protection is on, so it will be skipped.',
  },
};
