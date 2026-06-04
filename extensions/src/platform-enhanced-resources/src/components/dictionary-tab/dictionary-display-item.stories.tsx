import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  DictionaryDisplayItem,
  DICTIONARY_DISPLAY_ITEM_STRING_KEYS,
  type DictionaryDisplayItemData,
} from './dictionary-display-item.component';
import {
  MOCK_DICT_ENTRY_BERESHIT,
  MOCK_DICT_ENTRY_ELOHIM,
  MOCK_DICT_ENTRY_LOGOS,
} from '../../data/dictionary-tab.story-data';

const localizedStrings = getLocalizedStrings([...DICTIONARY_DISPLAY_ITEM_STRING_KEYS]);

const meta: Meta<typeof DictionaryDisplayItem> = {
  title: 'Bundled Extensions/platform-enhanced-resources/DictionaryTab/DictionaryDisplayItem',
  component: DictionaryDisplayItem,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      <div className="tw:w-[720px] tw:rounded tw:border tw:border-border tw:p-3">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DictionaryDisplayItem>;

type FixtureKey = 'elohim' | 'logos' | 'bereshit-no-senses';
const FIXTURES: Record<FixtureKey, DictionaryDisplayItemData> = {
  elohim: MOCK_DICT_ENTRY_ELOHIM,
  logos: MOCK_DICT_ENTRY_LOGOS,
  // First-sense preview is shorter than 80 chars so reviewers can see the un-truncated path.
  'bereshit-no-senses': { ...MOCK_DICT_ENTRY_BERESHIT, senses: [] },
};

/**
 * Default - fully interactive. Reviewers can switch between three fixtures (Hebrew with multiple
 * senses, Greek logos, and Bereshit with senses removed to show the empty-preview path), see the
 * source-text click and the per-component context-menu callbacks fire (Theme 16: copySurfaceForm
 * sub-items, copyLemma sub-items, findSense, findLemma, findText). Right-click on the row body to
 * exercise the menu.
 */
function InteractiveDisplayItemDemo() {
  const [fixture, setFixture] = useState<FixtureKey>('elohim');
  const [eventLog, setEventLog] = useState<string[]>([]);

  const item = FIXTURES[fixture];
  const log = (label: string) =>
    setEventLog((s) => [`${new Date().toISOString().slice(11, 19)} ${label}`, ...s].slice(0, 12));

  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:text-xs">
        <label className="tw:flex tw:items-center tw:gap-1">
          Fixture:
          <select
            value={fixture}
            onChange={(e) => {
              if (
                e.target.value === 'elohim' ||
                e.target.value === 'logos' ||
                e.target.value === 'bereshit-no-senses'
              ) {
                setFixture(e.target.value);
              }
            }}
          >
            <option value="elohim">Hebrew (אֱלֹהִים)</option>
            <option value="logos">Greek (λόγος)</option>
            <option value="bereshit-no-senses">No senses (preview empty)</option>
          </select>
        </label>
      </div>
      <DictionaryDisplayItem
        item={item}
        onSourceTextClick={(tokenId) => log(`source-text-click ${tokenId}`)}
        onCopySurfaceForm={(entry, variant) =>
          log(`copy-surface-form (${variant}) ${entry.sourceText}`)
        }
        onCopyLemma={(entry, variant) => log(`copy-lemma (${variant}) ${entry.sourceText}`)}
        onFindSense={(entry) => log(`find-sense ${entry.sourceText}`)}
        onFindLemma={(entry) => log(`find-lemma ${entry.sourceText}`)}
        onFindText={(entry) => log(`find-text ${entry.sourceText}`)}
        localizedStringsWithLoadingState={[localizedStrings, false]}
      />
      <div className="tw:rounded tw:border tw:border-dashed tw:border-border tw:p-2 tw:text-xs">
        <div className="tw:mb-1 tw:font-semibold">Event log (most recent first):</div>
        {eventLog.length === 0 ? (
          <span className="tw:text-muted-foreground">
            (Click the source word or right-click the row for the context menu...)
          </span>
        ) : (
          <ul>
            {eventLog.map((entry, idx) => (
              // Event log is append-only; idx is part of the key alongside the entry text to keep
              // entries stable while React reconciles the list.
              // eslint-disable-next-line react/no-array-index-key
              <li key={`${entry}-${idx}`}>{entry}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => <InteractiveDisplayItemDemo />,
};
