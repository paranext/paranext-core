import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { ScriptureTextGridEmptyState } from './scripture-text-grid-empty-state.component';

/**
 * The Scripture Text Grid body when nothing is renderable: centered directional copy pointing the
 * user at the View Options button. Presentational — the app resolves the localized prompt and
 * decides when to render it; the story drives it directly.
 */
const meta: Meta<typeof ScriptureTextGridEmptyState> = {
  title: 'Bundled Extensions/platform-scripture-editor/ScriptureTextGridEmptyState',
  component: ScriptureTextGridEmptyState,
  tags: ['autodocs', 'test'],
};
export default meta;

type Story = StoryObj<typeof ScriptureTextGridEmptyState>;

const EMPTY_STATE_KEY = '%webView_scriptureTextGrid_emptyState_prompt%';
const localizedStrings = getLocalizedStrings([EMPTY_STATE_KEY]);

/** Bounds the component so its `h-full` centering behaves like the real grid body. */
const BODY_BOX_STYLE: React.CSSProperties = {
  height: '320px',
  width: '480px',
  border: '1px solid var(--border)',
  borderRadius: '4px',
};

/** The localized directional prompt centered in a grid-body-sized box. */
export const Default: Story = {
  render: () => (
    <div style={BODY_BOX_STYLE}>
      <ScriptureTextGridEmptyState prompt={localizedStrings[EMPTY_STATE_KEY]} />
    </div>
  ),
};
