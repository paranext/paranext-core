import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { MOCK_FILTERED_TOKEN_ID, MOCK_GEN_1_TOKENS } from '../../data/marble-form.story-data';
import {
  TempScripturePane,
  TEMP_SCRIPTURE_PANE_STRING_KEYS,
} from './temp-scripture-pane.component';

const localizedStrings = getLocalizedStrings([...TEMP_SCRIPTURE_PANE_STRING_KEYS]);

const meta: Meta<typeof TempScripturePane> = {
  title: 'Temp/TempScripturePane',
  component: TempScripturePane,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    filteredTokenId: undefined,
    showFootnotes: false,
    scripturePaneZoom: 1,
  },
};
export default meta;

type Story = StoryObj<typeof TempScripturePane>;

/**
 * [Revised: 2026-04-29] Theme 4 — fully interactive default story. Clicking a linked word in the
 * pane toggles the filteredTokenId so reviewers see the highlight + filter-status row update;
 * clicking the same word again clears the filter. The footnote pane toggle exercises BHV-302's
 * design-phase surface.
 */
export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [filteredTokenId, setFilteredTokenId] = useState<string | undefined>(undefined);
    const [showFootnotes, setShowFootnotes] = useState(false);
    const [zoom, setZoom] = useState(1);

    const handleTokenClick = (id: string) => {
      setFilteredTokenId((prev) => (prev === id ? undefined : id));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
        <div style={{ display: 'flex', gap: 12, padding: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 12 }}>
            <input
              type="checkbox"
              checked={showFootnotes}
              onChange={(e) => setShowFootnotes(e.target.checked)}
            />{' '}
            Show footnotes
          </label>
          <label style={{ fontSize: 12 }}>
            Zoom:
            <input
              type="range"
              min="0.6"
              max="2"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              style={{ marginLeft: 6 }}
            />
            <span style={{ marginLeft: 4 }}>{zoom.toFixed(1)}x</span>
          </label>
          <span style={{ fontSize: 12, color: 'gray' }}>
            (Click linked words to toggle the filter)
          </span>
        </div>
        <TempScripturePane
          localizedStringsWithLoadingState={[localizedStrings, false]}
          tokens={MOCK_GEN_1_TOKENS}
          filteredTokenId={filteredTokenId}
          showFootnotes={showFootnotes}
          scripturePaneZoom={zoom}
          onTokenClick={handleTokenClick}
        />
      </div>
    );
  },
};

/** Loading skeleton — unreachable from the interactive flow. */
export const Loading: Story = {
  args: {
    tokens: undefined,
    isLoading: true,
  },
};

/** Empty (no tokens loaded yet) — unreachable from the interactive flow. */
export const Empty: Story = {
  args: {
    tokens: undefined,
  },
};

/** Pre-filtered + footnotes pane visible — illustrates filter-status + footnotes panel together. */
export const WithFilter: Story = {
  args: {
    tokens: MOCK_GEN_1_TOKENS,
    filteredTokenId: MOCK_FILTERED_TOKEN_ID,
    showFootnotes: true,
  },
};

/** Error variant — unreachable from the interactive flow. */
export const Error: Story = {
  args: {
    tokens: undefined,
    errorMessage: 'Failed to load chapter tokens for GEN 1: enhanced resource is not initialized.',
  },
};
