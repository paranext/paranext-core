import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  DictionaryEntryDetail,
  DICTIONARY_ENTRY_DETAIL_STRING_KEYS,
} from './dictionary-entry-detail.component';
import {
  MOCK_DICT_ENTRY_ELOHIM,
  MOCK_DICT_ENTRY_LOGOS,
} from '../../data/dictionary-tab.story-data';

const localizedStrings = getLocalizedStrings([...DICTIONARY_ENTRY_DETAIL_STRING_KEYS]);

const meta: Meta<typeof DictionaryEntryDetail> = {
  title: 'Bundled Extensions/platform-enhanced-resources/DictionaryTab/DictionaryEntryDetail',
  component: DictionaryEntryDetail,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      <div className="tw-w-[640px] tw-rounded tw-border tw-border-border tw-bg-muted/20 tw-p-3">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DictionaryEntryDetail>;

type LangFixture = 'hebrew' | 'greek';

/**
 * Default - fully interactive. The wrapper exposes the hide-less-relevant toggle, a language
 * switcher (Hebrew / Greek fixtures so reviewers can see both ContextMenu sub-menus and both
 * "Occurrences in all books" labels), and click counters that pick up the source-text click,
 * helpfulness Yes/No, "Give feedback..." link, and context-menu copy/find actions. Right-click on
 * the source word reveals the per-component context menu (Theme 16).
 */
function InteractiveEntryDetailDemo() {
  const [hideLessRelevant, setHideLessRelevant] = useState(false);
  const [language, setLanguage] = useState<LangFixture>('hebrew');
  const [eventLog, setEventLog] = useState<string[]>([]);

  const fixture = language === 'hebrew' ? MOCK_DICT_ENTRY_ELOHIM : MOCK_DICT_ENTRY_LOGOS;
  const log = (label: string) =>
    setEventLog((s) => [`${new Date().toISOString().slice(11, 19)} ${label}`, ...s].slice(0, 12));

  return (
    <div className="tw-flex tw-flex-col tw-gap-3">
      <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-3 tw-text-xs">
        <label className="tw-flex tw-items-center tw-gap-1">
          <input
            type="checkbox"
            checked={hideLessRelevant}
            onChange={(e) => setHideLessRelevant(e.target.checked)}
          />
          Hide less-relevant senses
        </label>
        <label className="tw-flex tw-items-center tw-gap-1">
          Language:
          <select
            value={language}
            onChange={(e) => {
              if (e.target.value === 'hebrew' || e.target.value === 'greek') {
                setLanguage(e.target.value);
              }
            }}
          >
            <option value="hebrew">Hebrew (אֱלֹהִים)</option>
            <option value="greek">Greek (λόγος)</option>
          </select>
        </label>
      </div>
      <DictionaryEntryDetail
        tokenId={fixture.tokenId}
        sourceText={fixture.sourceText}
        transliteration={fixture.translit}
        senses={fixture.senses}
        hideLessRelevantSenses={hideLessRelevant}
        onToggleHideLessRelevantSenses={setHideLessRelevant}
        totalOccurrencesInAllBooks={fixture.totalOccurrencesInAllBooks}
        onSourceTextClick={(tokenId) => log(`source-text-click ${tokenId}`)}
        onAllOccurrencesClick={(tokenId) => log(`all-occurrences-click ${tokenId}`)}
        onSenseOccurrencesClick={(senseId) => log(`sense-occurrences-click ${senseId}`)}
        onHelpfulnessAnswer={(answer) => log(`helpfulness ${answer}`)}
        onGiveFeedback={() => log('give-feedback link clicked')}
        onCopySurfaceForm={(entry, variant) =>
          log(`copy-surface-form (${variant}) ${entry.sourceText}`)
        }
        onCopyLemma={(entry, variant) => log(`copy-lemma (${variant}) ${entry.sourceText}`)}
        onFindSense={(entry) => log(`find-sense ${entry.sourceText}`)}
        onFindLemma={(entry) => log(`find-lemma ${entry.sourceText}`)}
        onFindText={(entry) => log(`find-text ${entry.sourceText}`)}
        localizedStringsWithLoadingState={[localizedStrings, false]}
      />
      <div className="tw-rounded tw-border tw-border-dashed tw-border-border tw-p-2 tw-text-xs">
        <div className="tw-mb-1 tw-font-semibold">Event log (most recent first):</div>
        {eventLog.length === 0 ? (
          <span className="tw-text-muted-foreground">
            (Click the source word, the Occurrences links, the Yes/No radios, or right-click for the
            context menu...)
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
  render: () => <InteractiveEntryDetailDemo />,
};

/** EmptyDetail - unreachable from Default because the interactive demo always supplies an entry. */
export const EmptyDetail: Story = {
  args: {
    tokenId: '',
    sourceText: '',
    senses: [],
  },
};
