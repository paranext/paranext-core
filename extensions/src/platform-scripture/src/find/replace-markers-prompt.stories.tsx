import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, within } from 'storybook/test';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { buildSkippedMatchMessage } from './find.utils';
import {
  MarkerPromptAction,
  REPLACE_MARKERS_PROMPT_STRING_KEYS,
  ReplaceMarkersPrompt,
} from './replace-markers-prompt.component';

const localizedStrings = getLocalizedStrings([...REPLACE_MARKERS_PROMPT_STRING_KEYS]);
const localizedBookData = new Map([['GEN', { localizedId: 'GEN', localizedName: 'Genesis' }]]);

/**
 * The message the Find web view shows for a match in Genesis 1 that `action` skips, built from the
 * same strings, so a story cannot drift from what the app says.
 */
function skippedMessageFor(
  action: Exclude<MarkerPromptAction, 'confirm'>,
  verseNum: number,
  text: string,
): string {
  return buildSkippedMatchMessage(
    action,
    { start: { verseRef: { book: 'GEN', chapterNum: 1, verseNum } }, text },
    localizedStrings,
    localizedBookData,
  );
}

/**
 * `ReplaceMarkersPrompt` stands between a single Replace and a match that includes USFM markers. A
 * match of whole markers offers **Cancel** and **Replace (including markers)**, with the markers
 * the replacement deletes tinted and crossed out, and any it puts back shown plain. A match Replace
 * may not touch is skipped, with a message and only **OK**. How the markers look is provisional
 * until UX designs it, and the skipped messages are drafts.
 */
const meta: Meta<typeof ReplaceMarkersPrompt> = {
  title: 'Bundled Extensions/platform-scripture/Find/Replace Markers Prompt',
  component: ReplaceMarkersPrompt,
  tags: ['autodocs', 'test'],
  args: {
    localizedStrings,
    replacementUsfm: '',
    skippedMessage: '',
    focusReturnCandidates: [],
    onDismiss: () => {},
    onConfirm: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof ReplaceMarkersPrompt>;

export const WholeMarkers: Story = {
  args: {
    action: 'confirm',
    matchedUsfm: 'paragraph ends with b\n\\p And the second',
    replacementUsfm: 'paragraph ends with c',
  },
};

/** The replacement puts the paragraph break back, so only the verse number is marked as deleted. */
export const SomeMarkersKept: Story = {
  args: {
    action: 'confirm',
    matchedUsfm: 'of Abraham.\n\\p\n\\v 2 Abraham became',
    replacementUsfm: 'of Abraham.\n\\p Abraham became',
  },
  play: async ({ canvasElement }) => {
    const dialog = await within(canvasElement.ownerDocument.body).findByRole('alertdialog');
    const deleted = within(dialog).getAllByRole('deletion');
    await expect(deleted).toHaveLength(1);
    await expect(deleted[0]).toHaveTextContent('\\v 2');
  },
};

export const OneEndOfAPair: Story = {
  args: {
    action: 'oneEndedMarker',
    skippedMessage: skippedMessageFor('oneEndedMarker', 3, 'Lord God'),
  },
};

export const ChapterMarker: Story = {
  args: {
    action: 'chapterMarker',
    skippedMessage: skippedMessageFor('chapterMarker', 31, 'last wordsFirst'),
  },
};

/** A match running over several verses and a footnote, as `LongMatch` and `LongSkippedMatch` use. */
const LONG_MATCH_TEXT = Array.from(
  { length: 12 },
  (_, index) =>
    `the waters under the sky be gathered together to one place, and let the dry land appear ${index + 2}`,
).join(' ');
const LONG_MATCH_USFM = Array.from(
  { length: 12 },
  (_, index) =>
    `the waters under the sky be gathered together to one place,\\f + \\fr 1:${index + 9} \\ft Or, sea\\f* and let the dry land appear\n\\p\n\\v ${index + 2} `,
).join('');

/**
 * Checks, in a real browser, that the title and the buttons are inside the panel however long the
 * message is. Shrink the preview to see the body scroll between them.
 */
async function expectTitleAndButtonsInView(canvasElement: HTMLElement) {
  const dialog = await within(canvasElement.ownerDocument.body).findByRole('alertdialog');
  const [title] = within(dialog).getAllByRole('heading');
  const buttons = within(dialog).getAllByRole('button');
  const panelHeight = canvasElement.ownerDocument.defaultView?.innerHeight ?? 0;
  await expect(title.getBoundingClientRect().top).toBeGreaterThanOrEqual(0);
  buttons.forEach((button) =>
    expect(button.getBoundingClientRect().bottom).toBeLessThanOrEqual(panelHeight),
  );
}

/** A match long enough that, in a short panel, the markers scroll between the title and buttons. */
export const LongMatch: Story = {
  args: { action: 'confirm', matchedUsfm: LONG_MATCH_USFM },
  play: async ({ canvasElement }) => expectTitleAndButtonsInView(canvasElement),
};

/** A skipped match long enough that, in a short panel, the message scrolls above OK. */
export const LongSkippedMatch: Story = {
  args: {
    action: 'oneEndedMarker',
    skippedMessage: skippedMessageFor('oneEndedMarker', 9, LONG_MATCH_TEXT),
  },
  play: async ({ canvasElement }) => expectTitleAndButtonsInView(canvasElement),
};

export const StructureLocked: Story = {
  args: {
    action: 'structureProtected',
    skippedMessage: skippedMessageFor('structureProtected', 2, 'cDverse'),
  },
};
