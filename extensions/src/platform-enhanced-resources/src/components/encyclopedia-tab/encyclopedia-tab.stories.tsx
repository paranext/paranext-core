import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { EncyclopediaTab, ENCYCLOPEDIA_TAB_STRING_KEYS } from './encyclopedia-tab.component';
import {
  MOCK_ARTICLE_DATA_MAP,
  MOCK_ENC_ENTRIES_GREEK,
  MOCK_ENC_ENTRIES_HEBREW,
  MOCK_ENC_ENTRY_SHAMAYIM,
} from '../../data/encyclopedia-tab.story-data';

const localizedStrings = getLocalizedStrings([...ENCYCLOPEDIA_TAB_STRING_KEYS]);

const meta: Meta<typeof EncyclopediaTab> = {
  title: 'Bundled Extensions/platform-enhanced-resources/EncyclopediaTab/EncyclopediaTab',
  component: EncyclopediaTab,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    isLoading: false,
    emptyState: 'none',
    scopeLabel: 'current verse',
    articleDataMap: MOCK_ARTICLE_DATA_MAP,
  },
  decorators: [
    (Story) => (
      <div className="tw:h-[640px] tw:w-[800px] tw:border tw:border-border">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof EncyclopediaTab>;

type FixtureKey = 'hebrew' | 'greek' | 'multiple-articles-per-lemma';

/**
 * Default - fully interactive. The wrapper lets reviewers toggle between Hebrew, Greek, and a
 * "shamayim" fixture that has multiple article references stacked in the side drawer. Selection
 * state is wired so clicking a row opens the side drawer with the (Theme 14) headline-plus-content
 * detail; clicking the same row again closes it. Per-row callbacks (source-text click, BHV-353
 * context menu) are wired with a click counter for diagnostic feedback.
 */
function InteractiveEncyclopediaTabDemo() {
  const [fixture, setFixture] = useState<FixtureKey>('hebrew');
  const [selectedTokenId, setSelectedTokenId] = useState<string | undefined>();
  const [eventLog, setEventLog] = useState<string[]>([]);

  const items = (() => {
    if (fixture === 'hebrew') return MOCK_ENC_ENTRIES_HEBREW;
    if (fixture === 'greek') return MOCK_ENC_ENTRIES_GREEK;
    // shamayim has 2 article refs - synthesize a 3rd to exercise the dense stack case (3+
    // EncyclopediaEntryDetail panels rendered in the side drawer).
    const seed = MOCK_ENC_ENTRY_SHAMAYIM;
    const dense = {
      ...seed,
      entries: [
        ...seed.entries,
        {
          ...seed.entries[0],
          articleId: 'REALIA:5.4',
          key: '5.4',
          title: 'Cosmic waters',
          teaserText:
            'Many texts also speak of waters above the firmament, an upper sea separated from the lower sea by the dome...',
        },
      ],
    };
    return [dense];
  })();
  const log = (label: string) =>
    setEventLog((s) => [`${new Date().toISOString().slice(11, 19)} ${label}`, ...s].slice(0, 12));

  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:gap-2">
      <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:text-xs">
        <label className="tw:flex tw:items-center tw:gap-1">
          Fixture:
          <select
            value={fixture}
            onChange={(e) => {
              if (
                e.target.value === 'hebrew' ||
                e.target.value === 'greek' ||
                e.target.value === 'multiple-articles-per-lemma'
              ) {
                setFixture(e.target.value);
                setSelectedTokenId(undefined);
              }
            }}
          >
            <option value="hebrew">Hebrew entries</option>
            <option value="greek">Greek entries</option>
            <option value="multiple-articles-per-lemma">
              Hebrew shamayim (3 article refs - dense stack)
            </option>
          </select>
        </label>
        <span className="tw:text-muted-foreground">
          Selected: <strong>{selectedTokenId ?? 'none'}</strong>
        </span>
      </div>
      <div className="tw:min-h-0 tw:flex-1">
        <EncyclopediaTab
          items={items}
          articleDataMap={MOCK_ARTICLE_DATA_MAP}
          selectedTokenId={selectedTokenId}
          onSelectionChange={setSelectedTokenId}
          onSourceTextClick={(tokenId) => log(`source-text-click ${tokenId}`)}
          onCopySurfaceForm={(item) => log(`copy-surface-form ${item.lemma}`)}
          onCopyLemma={(item) => log(`copy-lemma ${item.translit}`)}
          localizedStringsWithLoadingState={[localizedStrings, false]}
          scopeLabel="current verse"
        />
      </div>
      <div className="tw:rounded tw:border tw:border-dashed tw:border-border tw:p-2 tw:text-xs">
        <div className="tw:mb-1 tw:font-semibold">Event log (most recent first):</div>
        {eventLog.length === 0 ? (
          <span className="tw:text-muted-foreground">
            (Click a row, the source word, or right-click for the context menu...)
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
  render: () => <InteractiveEncyclopediaTabDemo />,
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
    filterWord: 'gamal',
    scopeLabel: 'current chapter',
  },
};

export const EmptyWordNotInScope: Story = {
  args: {
    items: [],
    emptyState: 'word-not-in-scope',
    filterWord: 'gamal',
    scopeLabel: 'current verse',
  },
};
