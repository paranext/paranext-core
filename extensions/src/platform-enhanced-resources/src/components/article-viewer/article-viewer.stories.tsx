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
 * Heaven article variant with extra cross-references so the see-also list renders with multiple
 * entries. Mirrors the original Heaven fixture (same articleId / paragraphs / abbreviations /
 * inline images) but adds three more see-also links plus a launchViewer cross-ref so the Default
 * story can exercise the full set of cross-reference branches in `onCrossReferenceClick`.
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

/**
 * Long-article fixture used only by the LongArticle path inside the Default cycle. Repeats the
 * Camel paragraphs to push the body past the dialog height and force the inner scroll container to
 * scroll. Mirrors the ArticleRendererData shape exactly (no story-only fields).
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
 * Articles indexed by id, used by the Default story to navigate cross-references. Heaven's id
 * (REALIA:5.2) maps to the multi-seealso variant so the see-also list is rich enough to exercise
 * all branches: a target with a fixture, two targets without a fixture (diagnostic-log path), and a
 * launchViewer cross-ref.
 */
const ARTICLE_INDEX: Record<string, MockArticleData> = {
  [MOCK_ARTICLE_HEAVEN_MULTI_SEEALSO.articleId]: MOCK_ARTICLE_HEAVEN_MULTI_SEEALSO,
  [MOCK_ARTICLE_CONTENTS.articleId]: MOCK_ARTICLE_CONTENTS,
  [MOCK_ARTICLE_CAMEL.articleId]: MOCK_ARTICLE_CAMEL,
  [MOCK_ARTICLE_MINIMAL.articleId]: MOCK_ARTICLE_MINIMAL,
  [MOCK_ARTICLE_LONG.articleId]: MOCK_ARTICLE_LONG,
};

const SEED_ARTICLE_ID = MOCK_ARTICLE_HEAVEN_MULTI_SEEALSO.articleId;

const meta: Meta<typeof ArticleViewer> = {
  title: 'Bundled Extensions/platform-enhanced-resources/ArticleViewer',
  component: ArticleViewer,
  tags: ['autodocs'],
  args: {
    open: true,
    articleId: SEED_ARTICLE_ID,
    articleData: MOCK_ARTICLE_HEAVEN_MULTI_SEEALSO,
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

/**
 * Default - fully-interactive story. The trigger button opens the dialog seeded with the Heaven
 * (multi-seealso) article. The article body exercises:
 *
 * - Abbreviation tooltip on hover (paragraph 1's "ANE" -> "Ancient Near Eastern")
 * - Inline image click (Cosmology image; logs the imageId via onImageClick)
 * - Verse reference click (paragraph 2's John 3:16 link; logs the link via onVerseLinkClick)
 * - See-also navigation: the four cross-refs cover (a) a target WITH a fixture (Contents and
 *   Introduction -> MOCK_ARTICLE_CONTENTS; from Contents the user can drill into MOCK_ARTICLE_CAMEL
 *   via its CROSS_REF_CAMEL_DETAIL), (b) targets WITHOUT a fixture (Sky and clouds, Stars and
 *   constellations - log path), and (c) a launchViewer cross-ref (ANE Cosmology diagram - log path;
 *   production wires this to MediaViewer).
 *
 * Three secondary trigger buttons exist so a reviewer can re-seed the dialog with the long-article
 * fixture (forces inner scroll), the minimal-content fixture (single paragraph edge case), and a
 * pre-undefined "loading" state. Closing via the Dialog's X / Escape / click-outside feeds back
 * through onOpenChange to flip open back to false.
 */
export const Default: StoryObj<typeof ArticleViewer> = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [activeArticleId, setActiveArticleId] = useState<string>(SEED_ARTICLE_ID);
    const [articleLoading, setArticleLoading] = useState(false);

    const currentArticle = articleLoading ? undefined : ARTICLE_INDEX[activeArticleId];

    const openWithArticle = useCallback((articleId: string) => {
      setArticleLoading(false);
      setActiveArticleId(articleId);
      setOpen(true);
    }, []);

    const openLoading = useCallback(() => {
      setArticleLoading(true);
      setActiveArticleId('FAUNA:fetching');
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
        setArticleLoading(false);
        setActiveArticleId(ref.targetArticleId);
      } else {
        // Storybook-only diagnostic when a see-also target has no fixture in the story map.
        // eslint-disable-next-line no-console
        console.log('[ArticleViewer story] no fixture for see-also target', ref.targetArticleId);
      }
    }, []);

    return (
      <div className="tw-flex tw-flex-col tw-gap-3 tw-p-4">
        <div className="tw-flex tw-flex-wrap tw-gap-2">
          <Button type="button" onClick={() => openWithArticle(SEED_ARTICLE_ID)}>
            Open ArticleViewer
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => openWithArticle(MOCK_ARTICLE_LONG.articleId)}
          >
            Open long article
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => openWithArticle(MOCK_ARTICLE_MINIMAL.articleId)}
          >
            Open minimal article
          </Button>
          <Button type="button" variant="outline" onClick={openLoading}>
            Open loading state
          </Button>
        </div>
        <p className="tw-text-sm tw-text-muted-foreground">
          Click a See also link to swap articles in place, hover an abbreviation (e.g. ANE) to see
          its tooltip, click an inline image or verse reference to log the callback. Escape and
          click-outside close.
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

/**
 * Loading state - skeleton lines while the article body is being fetched. Kept as a dedicated
 * static story so the loading-skeleton evidence stays isolated and stable for visual review. (The
 * interactive Default also reaches this state via the "Open loading state" trigger, so this export
 * is optional per Theme 4 - but keeping it preserves the snapshot as a baseline.)
 */
export const Loading: Story = {
  args: {
    articleId: 'art-001',
    articleData: undefined,
  },
};
