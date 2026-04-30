import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  EncyclopediaDisplayItem,
  ENCYCLOPEDIA_DISPLAY_ITEM_STRING_KEYS,
  type EncyclopediaDisplayItemData,
} from './encyclopedia-display-item.component';
import {
  MOCK_ENC_ENTRY_GAMAL,
  MOCK_ENC_ENTRY_KAMELOS,
  MOCK_ENC_ENTRY_NO_IMAGES,
  MOCK_ENC_ENTRY_SHAMAYIM,
} from '../../data/encyclopedia-tab.story-data';

const localizedStrings = getLocalizedStrings([...ENCYCLOPEDIA_DISPLAY_ITEM_STRING_KEYS]);

const meta: Meta<typeof EncyclopediaDisplayItem> = {
  title: 'Bundled Extensions/platform-enhanced-resources/EncyclopediaTab/EncyclopediaDisplayItem',
  component: EncyclopediaDisplayItem,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      <div className="tw-w-[720px] tw-rounded tw-border tw-border-border tw-p-3">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof EncyclopediaDisplayItem>;

type FixtureKey = 'hebrew-gamal' | 'greek-kamelos' | 'multiple-articles' | 'no-images';
const FIXTURES: Record<FixtureKey, EncyclopediaDisplayItemData> = {
  'hebrew-gamal': MOCK_ENC_ENTRY_GAMAL,
  'greek-kamelos': MOCK_ENC_ENTRY_KAMELOS,
  'multiple-articles': MOCK_ENC_ENTRY_SHAMAYIM,
  'no-images': MOCK_ENC_ENTRY_NO_IMAGES,
};

/**
 * Default - fully interactive. Reviewers can switch between four fixtures (Hebrew gamal, Greek
 * kamelos, Hebrew shamayim with two article references, and a no-image fixture) and exercise the
 * source-text click + the BHV-353 context menu (Copy surface form / Copy lemma) on the real
 * component. Per Theme 14, the row body is just the clickable source-language headline plus a
 * single ~80-char teaser preview - the previous count badge / collection italic / multi-column
 * structure is gone.
 */
function InteractiveDisplayItemDemo() {
  const [fixture, setFixture] = useState<FixtureKey>('hebrew-gamal');
  const [eventLog, setEventLog] = useState<string[]>([]);

  const item = FIXTURES[fixture];
  const log = (label: string) =>
    setEventLog((s) => [`${new Date().toISOString().slice(11, 19)} ${label}`, ...s].slice(0, 12));

  return (
    <div className="tw-flex tw-flex-col tw-gap-3">
      <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-3 tw-text-xs">
        <label className="tw-flex tw-items-center tw-gap-1">
          Fixture:
          <select
            value={fixture}
            onChange={(e) => {
              if (
                e.target.value === 'hebrew-gamal' ||
                e.target.value === 'greek-kamelos' ||
                e.target.value === 'multiple-articles' ||
                e.target.value === 'no-images'
              ) {
                setFixture(e.target.value);
              }
            }}
          >
            <option value="hebrew-gamal">Hebrew (gamal / camel)</option>
            <option value="greek-kamelos">Greek (kamēlos / camel)</option>
            <option value="multiple-articles">Hebrew (shamayim / 2 article refs)</option>
            <option value="no-images">No images (bibliography)</option>
          </select>
        </label>
      </div>
      <EncyclopediaDisplayItem
        item={item}
        onSourceTextClick={(tokenId) => log(`source-text-click ${tokenId}`)}
        onCopySurfaceForm={(entry) => log(`copy-surface-form ${entry.sourceText}`)}
        onCopyLemma={(entry) => log(`copy-lemma ${entry.translit}`)}
        localizedStringsWithLoadingState={[localizedStrings, false]}
      />
      <div className="tw-rounded tw-border tw-border-dashed tw-border-border tw-p-2 tw-text-xs">
        <div className="tw-mb-1 tw-font-semibold">Event log (most recent first):</div>
        {eventLog.length === 0 ? (
          <span className="tw-text-muted-foreground">
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
