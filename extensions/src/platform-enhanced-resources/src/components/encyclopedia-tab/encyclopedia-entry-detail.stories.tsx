import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  EncyclopediaEntryDetail,
  ENCYCLOPEDIA_ENTRY_DETAIL_STRING_KEYS,
} from './encyclopedia-entry-detail.component';
import type { ArticleRendererData } from '../shared/article-renderer.component';
import type { EncyclopediaEntryRefData } from './encyclopedia-display-item.component';
import {
  MOCK_ARTICLE_CAMEL,
  MOCK_ARTICLE_HEAVEN,
  MOCK_ARTICLE_MINIMAL,
  MOCK_ENC_ENTRY_GAMAL,
  MOCK_ENC_ENTRY_NO_IMAGES,
  MOCK_ENC_ENTRY_SHAMAYIM,
} from '../../data/encyclopedia-tab.story-data';

const localizedStrings = getLocalizedStrings([...ENCYCLOPEDIA_ENTRY_DETAIL_STRING_KEYS]);

const meta: Meta<typeof EncyclopediaEntryDetail> = {
  title: 'Bundled Extensions/platform-enhanced-resources/EncyclopediaTab/EncyclopediaEntryDetail',
  component: EncyclopediaEntryDetail,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      <div className="tw:w-[640px] tw:rounded tw:border tw:border-border tw:bg-muted/20 tw:p-3">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof EncyclopediaEntryDetail>;

type FixtureKey = 'camel-v1' | 'heaven-v2' | 'minimal-bibliography';

type Fixture = { entry: EncyclopediaEntryRefData; article: ArticleRendererData };

const FIXTURES: Record<FixtureKey, Fixture> = {
  'camel-v1': { entry: MOCK_ENC_ENTRY_GAMAL.entries[0], article: MOCK_ARTICLE_CAMEL },
  'heaven-v2': { entry: MOCK_ENC_ENTRY_SHAMAYIM.entries[0], article: MOCK_ARTICLE_HEAVEN },
  'minimal-bibliography': {
    entry: MOCK_ENC_ENTRY_NO_IMAGES.entries[0],
    article: MOCK_ARTICLE_MINIMAL,
  },
};

/**
 * Default - fully interactive. Reviewers can switch between three article fixtures spanning V1 and
 * V2 source formats and toggle the loading state to confirm the skeleton path. Per Theme 14, the
 * panel is just the headline + a paragraph preview of the article content - no References, no See
 * also, no "View full article" footer (those structures have no producer in shipped Marble data).
 */
function InteractiveEntryDetailDemo() {
  const [fixture, setFixture] = useState<FixtureKey>('camel-v1');
  const [showLoading, setShowLoading] = useState(false);
  const [previewParagraphs, setPreviewParagraphs] = useState(2);

  const { entry, article } = FIXTURES[fixture];

  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:text-xs">
        <label className="tw:flex tw:items-center tw:gap-1">
          Fixture:
          <select
            value={fixture}
            onChange={(e) => {
              if (
                e.target.value === 'camel-v1' ||
                e.target.value === 'heaven-v2' ||
                e.target.value === 'minimal-bibliography'
              ) {
                setFixture(e.target.value);
              }
            }}
          >
            <option value="camel-v1">Camel, dromedary (V1)</option>
            <option value="heaven-v2">Heaven (V2)</option>
            <option value="minimal-bibliography">Selected Bibliography (single ¶)</option>
          </select>
        </label>
        <label className="tw:flex tw:items-center tw:gap-1">
          <input
            type="checkbox"
            checked={showLoading}
            onChange={(e) => setShowLoading(e.target.checked)}
          />
          Show loading skeleton (articleData undefined)
        </label>
        <label className="tw:flex tw:items-center tw:gap-1">
          Preview paragraphs:
          <input
            type="number"
            min={0}
            max={10}
            value={previewParagraphs}
            onChange={(e) => setPreviewParagraphs(Number(e.target.value))}
            className="tw:w-14"
          />
        </label>
      </div>
      <EncyclopediaEntryDetail
        entry={entry}
        articleData={showLoading ? undefined : article}
        previewParagraphCount={previewParagraphs}
        localizedStringsWithLoadingState={[localizedStrings, false]}
      />
    </div>
  );
}

export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => <InteractiveEntryDetailDemo />,
};
