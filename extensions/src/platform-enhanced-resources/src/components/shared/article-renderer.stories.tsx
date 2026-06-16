import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  ArticleRenderer,
  ARTICLE_RENDERER_STRING_KEYS,
  type ArticleRendererMode,
} from './article-renderer.component';
import {
  MOCK_ARTICLE_CAMEL,
  MOCK_ARTICLE_HEAVEN,
  MOCK_ARTICLE_MINIMAL,
  mockImageUrlResolver,
} from '../../data/encyclopedia-tab.story-data';

const localizedStrings = getLocalizedStrings([...ARTICLE_RENDERER_STRING_KEYS]);

type FixtureKey = 'camel' | 'heaven' | 'minimal';

const FIXTURES = {
  camel: MOCK_ARTICLE_CAMEL,
  heaven: MOCK_ARTICLE_HEAVEN,
  minimal: MOCK_ARTICLE_MINIMAL,
};

const meta: Meta<typeof ArticleRenderer> = {
  title: 'Bundled Extensions/platform-enhanced-resources/EncyclopediaTab/ArticleRenderer',
  component: ArticleRenderer,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    imageUrlResolver: mockImageUrlResolver,
  },
  decorators: [
    (Story) => (
      <div className="tw:w-[640px] tw:rounded tw:border tw:border-border tw:p-4">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ArticleRenderer>;

/**
 * Default - fully interactive. Reviewers can switch between three article fixtures (Camel with
 * inline images, Heaven with cross-references, Minimal with a single paragraph) and toggle preview
 * / full mode. Click counters track verse-link, cross-reference, and inline-image clicks.
 */
function InteractiveArticleRendererDemo() {
  const [fixture, setFixture] = useState<FixtureKey>('camel');
  const [mode, setMode] = useState<ArticleRendererMode>('full');
  const [previewParagraphs, setPreviewParagraphs] = useState(2);
  const [eventLog, setEventLog] = useState<string[]>([]);

  const article = FIXTURES[fixture];
  const log = (label: string) =>
    setEventLog((s) => [`${new Date().toISOString().slice(11, 19)} ${label}`, ...s].slice(0, 12));

  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:text-xs">
        <label className="tw:flex tw:items-center tw:gap-1">
          Article:
          <select
            value={fixture}
            onChange={(e) => {
              if (
                e.target.value === 'camel' ||
                e.target.value === 'heaven' ||
                e.target.value === 'minimal'
              ) {
                setFixture(e.target.value);
              }
            }}
          >
            <option value="camel">Camel (inline images)</option>
            <option value="heaven">Heaven (cross-refs)</option>
            <option value="minimal">Minimal</option>
          </select>
        </label>
        <label className="tw:flex tw:items-center tw:gap-1">
          Mode:
          <select
            value={mode}
            onChange={(e) => {
              if (e.target.value === 'preview' || e.target.value === 'full') {
                setMode(e.target.value);
              }
            }}
          >
            <option value="preview">preview</option>
            <option value="full">full</option>
          </select>
        </label>
        {mode === 'preview' && (
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
        )}
      </div>
      <ArticleRenderer
        article={article}
        mode={mode}
        previewParagraphCount={previewParagraphs}
        imageUrlResolver={mockImageUrlResolver}
        onVerseLinkClick={(link) => log(`verse-link ${link.displayText}`)}
        onCrossReferenceClick={(ref) => log(`cross-ref ${ref.displayText}`)}
        onImageClick={(imageId) => log(`image-click ${imageId}`)}
        localizedStringsWithLoadingState={[localizedStrings, false]}
      />
      <div className="tw:rounded tw:border tw:border-dashed tw:border-border tw:p-2 tw:text-xs">
        <div className="tw:mb-1 tw:font-semibold">Event log (most recent first):</div>
        {eventLog.length === 0 ? (
          <span className="tw:text-muted-foreground">
            (Click a verse link, a cross-reference, or an inline image...)
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
  render: () => <InteractiveArticleRendererDemo />,
};

/** Empty - unreachable from Default because the interactive demo always supplies an article. */
export const Empty: Story = {
  args: {
    article: undefined,
    mode: 'preview',
  },
};
