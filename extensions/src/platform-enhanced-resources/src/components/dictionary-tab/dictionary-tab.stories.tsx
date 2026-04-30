import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { DictionaryTab, DICTIONARY_TAB_STRING_KEYS } from './dictionary-tab.component';
import {
  MOCK_DICT_ENTRIES_GREEK,
  MOCK_DICT_ENTRIES_HEBREW,
} from '../../data/dictionary-tab.story-data';

const localizedStrings = getLocalizedStrings([...DICTIONARY_TAB_STRING_KEYS]);

const meta: Meta<typeof DictionaryTab> = {
  title: 'Bundled Extensions/platform-enhanced-resources/DictionaryTab/DictionaryTab',
  component: DictionaryTab,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    selectedTokenId: undefined,
    isLoading: false,
    emptyState: 'none',
    activeDictionary: 'SDBH',
    hideLessRelevantSenses: false,
    scopeLabel: 'current verse',
  },
  decorators: [
    (Story) => (
      <div className="tw-h-[640px] tw-w-[800px] tw-border tw-border-border">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DictionaryTab>;

type DictKey = 'sdbh' | 'sdbg';

/**
 * Default - fully interactive. The wrapper drives selection, the active dictionary, the
 * hide-less-relevant-senses toggle, and the per-row callbacks (sourceText / occurrence-link /
 * helpfulness flow / context-menu copy/find), exercising every user flow on the real component with
 * sample data. Reviewers see selection drive the in-container detail panel that exposes the
 * helpfulness Yes/No prompt + optional "Give feedback..." link (Theme 13b) and the source-language
 * word ContextMenu (Theme 16).
 */
function InteractiveDictionaryTabDemo() {
  const [selectedTokenId, setSelectedTokenId] = useState<string | undefined>();
  const [hideLessRelevant, setHideLessRelevant] = useState(false);
  const [dictionary, setDictionary] = useState<DictKey>('sdbh');
  const [eventLog, setEventLog] = useState<string[]>([]);

  const items = dictionary === 'sdbh' ? MOCK_DICT_ENTRIES_HEBREW : MOCK_DICT_ENTRIES_GREEK;
  const log = (label: string) =>
    setEventLog((s) => [`${new Date().toISOString().slice(11, 19)} ${label}`, ...s].slice(0, 12));

  return (
    <div className="tw-flex tw-h-full tw-flex-col tw-gap-2">
      <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-3 tw-text-xs">
        <label className="tw-flex tw-items-center tw-gap-1">
          Dictionary:
          <select
            value={dictionary}
            onChange={(e) => {
              if (e.target.value === 'sdbh' || e.target.value === 'sdbg') {
                setDictionary(e.target.value);
              }
            }}
          >
            <option value="sdbh">SDBH (Hebrew)</option>
            <option value="sdbg">SDBG (Greek)</option>
          </select>
        </label>
        <span className="tw-text-muted-foreground">
          Selected: <strong>{selectedTokenId ?? 'none'}</strong>
        </span>
      </div>
      <div className="tw-min-h-0 tw-flex-1">
        <DictionaryTab
          items={items}
          activeDictionary={dictionary === 'sdbh' ? 'SDBH' : 'SDBG'}
          selectedTokenId={selectedTokenId}
          onSelectionChange={setSelectedTokenId}
          hideLessRelevantSenses={hideLessRelevant}
          onToggleHideLessRelevantSenses={(hide) => {
            setHideLessRelevant(hide);
            log(`hide-less-relevant ${hide}`);
          }}
          onSourceTextClick={(tokenId) => log(`source-text-click ${tokenId}`)}
          onAllOccurrencesClick={(tokenId) => log(`all-occurrences-click ${tokenId}`)}
          onSenseOccurrencesClick={(senseId) => log(`sense-occurrences-click ${senseId}`)}
          onHelpfulnessAnswer={(tokenId, answer) => log(`helpfulness ${answer} (${tokenId})`)}
          onGiveFeedback={(tokenId) => log(`give-feedback ${tokenId}`)}
          onCopySurfaceForm={(entry, variant) =>
            log(`copy-surface-form (${variant}) ${entry.sourceText}`)
          }
          onCopyLemma={(entry, variant) => log(`copy-lemma (${variant}) ${entry.sourceText}`)}
          onFindSense={(entry) => log(`find-sense ${entry.sourceText}`)}
          onFindLemma={(entry) => log(`find-lemma ${entry.sourceText}`)}
          onFindText={(entry) => log(`find-text ${entry.sourceText}`)}
          localizedStringsWithLoadingState={[localizedStrings, false]}
          scopeLabel="current verse"
        />
      </div>
      <div className="tw-rounded tw-border tw-border-dashed tw-border-border tw-p-2 tw-text-xs">
        <div className="tw-mb-1 tw-font-semibold">Event log (most recent first):</div>
        {eventLog.length === 0 ? (
          <span className="tw-text-muted-foreground">
            (Click a row, the source word, the context menu, or the helpfulness Yes/No radios...)
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
  render: () => <InteractiveDictionaryTabDemo />,
};

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
  },
};

export const EmptyNoData: Story = {
  args: {
    items: [],
    emptyState: 'no-data',
    scopeLabel: 'current chapter',
  },
};

export const EmptyNoMatch: Story = {
  args: {
    items: [],
    emptyState: 'no-match',
    filterWord: 'bereʼshiyt',
    scopeLabel: 'current chapter',
  },
};

export const EmptyWordNotInScope: Story = {
  args: {
    items: [],
    emptyState: 'word-not-in-scope',
    filterWord: 'bereʼshiyt',
    scopeLabel: 'current verse',
  },
};
