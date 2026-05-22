import { usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import { alertCommand } from '../../../../.storybook/story.utils';
import { ModelTextPanel, MODEL_TEXT_PANEL_STRING_KEYS } from './model-text-panel.component';

/**
 * `ModelTextPanel` is the presentational half of the model-text panel web view. It shows a
 * project's configured "model text" Scripture resource read-only, rendering whichever state the web
 * view resolves: no project, loading, a prompt to pick a model text, an unknown/installing
 * resource, or the active editor. The web view owns all PAPI data resolution and drives `status`.
 */

const localizedStrings = getLocalizedStrings([...MODEL_TEXT_PANEL_STRING_KEYS]);

const sampleUsj = usxStringToUsj(`<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="GEN" style="id">World English Bible (WEB)</book>
  <chapter number="1" style="c" sid="GEN 1" />
  <para style="p">
    <verse number="1" style="v" sid="GEN 1:1" />In the beginning, God created the heavens and the earth.<verse eid="GEN 1:1" /></para>
</usx>
`);

const meta: Meta<typeof ModelTextPanel> = {
  title: 'Bundled Extensions/platform-scripture-editor/ModelTextPanel',
  component: ModelTextPanel,
  tags: ['autodocs'],
  args: {
    localizedStrings,
    onPickModelText: () => alertCommand('platform.resourcePicker'),
    scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    onScrRefChange: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof ModelTextPanel>;

/** The panel was opened without a project id. */
export const NoProject: Story = {
  args: { status: 'noProject' },
};

/** Still resolving which model text is configured. */
export const LoadingModelTexts: Story = {
  args: { status: 'loadingModelTexts' },
};

/** No model text configured yet — prompt the user to pick one. */
export const NoModelText: Story = {
  args: { status: 'noModelText' },
};

/** The configured resource id isn't present in the DBL list. */
export const UnknownResource: Story = {
  args: { status: 'unknownResource' },
};

/** The resource was found but is still installing. */
export const Installing: Story = {
  args: { status: 'installing' },
};

/** The resource is installed but its text hasn't loaded yet. */
export const LoadingText: Story = {
  args: { status: 'loadingText' },
};

/** The active state: a read-only Scripture editor showing the model text. */
export const Active: Story = {
  args: { status: 'active', usj: sampleUsj, textDirection: 'ltr' },
};
