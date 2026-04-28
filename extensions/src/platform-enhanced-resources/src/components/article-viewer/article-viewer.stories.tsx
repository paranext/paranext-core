import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useCallback, useState } from 'react';
import { Button } from 'platform-bible-react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { ArticleViewer, ARTICLE_VIEWER_STRING_KEYS } from './article-viewer.component';
import type { ArticleCrossRefData } from '../shared/article-renderer.component';
import {
  MOCK_ARTICLE_CAMEL,
  MOCK_ARTICLE_CONTENTS,
  MOCK_ARTICLE_HEAVEN,
  MOCK_ARTICLE_MINIMAL,
  mockImageUrlResolver,
  type MockArticleData,
} from '../../data/encyclopedia-tab.story-data';

const localizedStrings = getLocalizedStrings([...ARTICLE_VIEWER_STRING_KEYS]);

/**
 * Long-article fixture for the scrolling-body story. Repeats the Camel article paragraphs to push
 * the body past the dialog height and force the inner scroll container to scroll. Mirrors the
 * ArticleRendererData shape exactly (no story-only fields).
 */
const MOCK_ARTICLE_LONG: MockArticleData = {
  articleId: 'FAUNA:2.8-LONG',
  title: 'Camel, dromedary (extended discussion)',
  paragraphs: [
    ...MOCK_ARTICLE_CAMEL.paragraphs,
    ...MOCK_ARTICLE_CAMEL.paragraphs.map((paragraph) => ({
      ...paragraph,
      // Drop inline images on the repeated copies to keep visual repetition manageable.
      inlineImageIds: [],
    })),
    {
      text: 'Translators in cultures with no camel equivalent commonly choose between transliteration ("camel"), a generic large-pack-animal term, or a footnote describing the animal. The choice often depends on whether the animal carries theological weight in the immediate context.',
      verseLinks: [],
      abbreviations: [],
      inlineImageIds: [],
    },
    {
      text: 'Bactrian camels (two humps) and dromedaries (one hump) are anatomically distinct but biblical authors do not distinguish between them. Translators should generally use the local term for whichever camel is most familiar to the target audience.',
      verseLinks: [],
      abbreviations: [],
      inlineImageIds: [],
    },
  ],
  crossReferences: MOCK_ARTICLE_CAMEL.crossReferences,
  imageIds: MOCK_ARTICLE_CAMEL.imageIds,
};

/**
 * Heaven article variant with extra cross-references to demonstrate the WithSeeAlso story. Mirrors
 * the original Heaven fixture but adds two more see-also links so the section renders as a list.
 */
const MOCK_ARTICLE_HEAVEN_MULTI_SEEALSO: MockArticleData = {
  ...MOCK_ARTICLE_HEAVEN,
  crossReferences: [
    { targetArticleId: 'REALIA:5.3', displayText: 'Sky and clouds', type: 'seealso' },
    { targetArticleId: 'REALIA:5.4', displayText: 'Stars and constellations', type: 'seealso' },
    { targetArticleId: 'FAUNA:0', displayText: 'Contents and Introduction', type: 'seealso' },
    {
      targetArticleId: 'CosmologyDiagram',
      displayText: 'ANE Cosmology diagram',
      type: 'launchViewer',
    },
  ],
};

/** Articles indexed by id, used by the Interactive story to navigate cross-references. */
const ARTICLE_INDEX: Record<string, MockArticleData> = {
  [MOCK_ARTICLE_CAMEL.articleId]: MOCK_ARTICLE_CAMEL,
  [MOCK_ARTICLE_HEAVEN.articleId]: MOCK_ARTICLE_HEAVEN,
  [MOCK_ARTICLE_CONTENTS.articleId]: MOCK_ARTICLE_CONTENTS,
  [MOCK_ARTICLE_MINIMAL.articleId]: MOCK_ARTICLE_MINIMAL,
};

const meta: Meta<typeof ArticleViewer> = {
  title: 'Bundled Extensions/platform-enhanced-resources/ArticleViewer',
  component: ArticleViewer,
  tags: ['autodocs'],
  args: {
    open: true,
    articleId: MOCK_ARTICLE_CAMEL.articleId,
    articleData: MOCK_ARTICLE_CAMEL,
    imageUrlResolver: mockImageUrlResolver,
    onOpenChange: () => {},
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      // The Dialog renders into a portal at document.body, so the surrounding container exists
      // mostly to provide a stable backdrop in the Storybook canvas.
      <div className="tw-relative tw-h-[720px] tw-w-[1024px] tw-border tw-border-border tw-bg-muted/40">
        <div className="tw-p-4 tw-text-sm tw-text-muted-foreground">
          ArticleViewer Dialog is rendered in a portal - look at the center of the viewport.
        </div>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ArticleViewer>;

/** Default - full article rendered with verse link, inline image, and see-also list. */
export const Default: Story = {
  args: {
    articleId: MOCK_ARTICLE_CAMEL.articleId,
    articleData: MOCK_ARTICLE_CAMEL,
  },
};

/** Inline images visible inside paragraphs (Camel article has Dromedary inline image). */
export const WithImages: Story = {
  args: {
    articleId: MOCK_ARTICLE_CAMEL.articleId,
    articleData: MOCK_ARTICLE_CAMEL,
  },
};

/** Multiple see-also links rendered as a list under the article. */
export const WithSeeAlso: Story = {
  args: {
    articleId: MOCK_ARTICLE_HEAVEN_MULTI_SEEALSO.articleId,
    articleData: MOCK_ARTICLE_HEAVEN_MULTI_SEEALSO,
  },
};

/** Single-paragraph article with no extras (covers minimal-content edge case). */
export const Minimal: Story = {
  args: {
    articleId: MOCK_ARTICLE_MINIMAL.articleId,
    articleData: MOCK_ARTICLE_MINIMAL,
  },
};

/** Long article body that overflows the dialog height (forces inner scroll). */
export const LongArticle: Story = {
  args: {
    articleId: MOCK_ARTICLE_LONG.articleId,
    articleData: MOCK_ARTICLE_LONG,
  },
};

/** Loading state - skeleton lines while the article body is being fetched. */
export const Loading: Story = {
  args: {
    articleId: 'art-001',
    articleData: undefined,
  },
};

/**
 * Interactive variant: parent owns state and reacts to all callbacks. Demonstrates open/close,
 * scrolling, and cross-reference navigation - clicking a "see also" link swaps the article in
 * place. The trigger button restores focus per Dialog focus management.
 */
export const Interactive: StoryObj<typeof ArticleViewer> = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [activeArticleId, setActiveArticleId] = useState<string>(MOCK_ARTICLE_CAMEL.articleId);

    const currentArticle = ARTICLE_INDEX[activeArticleId];

    const handleOpen = useCallback(() => {
      setActiveArticleId(MOCK_ARTICLE_CAMEL.articleId);
      setOpen(true);
    }, []);

    const handleCrossReference = useCallback((ref: ArticleCrossRefData) => {
      if (ref.type === 'launchViewer') {
        // Storybook-only diagnostic: in production this opens MediaViewer; here we just log.
        // eslint-disable-next-line no-console
        console.log('[ArticleViewer story] launchViewer ->', ref.targetArticleId);
        return;
      }
      if (ARTICLE_INDEX[ref.targetArticleId]) {
        setActiveArticleId(ref.targetArticleId);
      } else {
        // Storybook-only diagnostic when a see-also target has no fixture in the story map.
        // eslint-disable-next-line no-console
        console.log('[ArticleViewer story] no fixture for see-also target', ref.targetArticleId);
      }
    }, []);

    return (
      <div className="tw-flex tw-flex-col tw-gap-3 tw-p-4">
        <Button type="button" onClick={handleOpen}>
          Open ArticleViewer
        </Button>
        <p className="tw-text-sm tw-text-muted-foreground">
          Click a See also link to swap articles in place, or click a verse reference / inline image
          to log the callback. Escape and click-outside close.
        </p>
        <ArticleViewer
          open={open}
          articleId={activeArticleId}
          articleData={currentArticle}
          imageUrlResolver={mockImageUrlResolver}
          localizedStringsWithLoadingState={[localizedStrings, false]}
          onOpenChange={setOpen}
          onCrossReferenceClick={handleCrossReference}
          // Storybook-only diagnostic: production wires this to scroll-group sync (MarbleForm).
          // eslint-disable-next-line no-console
          onVerseLinkClick={(link) => console.log('[ArticleViewer story] verse link', link)}
          // Storybook-only diagnostic: production wires this to MediaViewer.
          // eslint-disable-next-line no-console
          onImageClick={(imageId) => console.log('[ArticleViewer story] image', imageId)}
        />
      </div>
    );
  },
};
