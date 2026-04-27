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
 * the body past the drawer height and force the inner scroll container to scroll. Mirrors the
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

/**
 * Walking sequence used for the prev/next controls in the Interactive story. Hoisted to module
 * scope so the array reference is stable across renders (avoids triggering useCallback dep churn
 * inside the render function).
 */
const INTERACTIVE_SEQUENCE: MockArticleData[] = [
  MOCK_ARTICLE_CONTENTS,
  MOCK_ARTICLE_CAMEL,
  MOCK_ARTICLE_HEAVEN,
  MOCK_ARTICLE_MINIMAL,
];

const meta: Meta<typeof ArticleViewer> = {
  title: 'Bundled Extensions/platform-enhanced-resources/ArticleViewer',
  component: ArticleViewer,
  tags: ['autodocs'],
  args: {
    open: true,
    currentArticle: MOCK_ARTICLE_CAMEL,
    isLoading: false,
    previousArticleAvailable: false,
    nextArticleAvailable: false,
    imageUrlResolver: mockImageUrlResolver,
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      // The Drawer renders into a portal at document.body, so the surrounding container exists
      // mostly to provide a stable backdrop in the Storybook canvas.
      <div className="tw-relative tw-h-[720px] tw-w-[1024px] tw-border tw-border-border tw-bg-muted/40">
        <div className="tw-p-4 tw-text-sm tw-text-muted-foreground">
          ArticleViewer Drawer is rendered in a portal - look at the right side of the viewport.
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
    currentArticle: MOCK_ARTICLE_CAMEL,
  },
};

/** Inline images visible inside paragraphs (Camel article has Dromedary inline image). */
export const WithImages: Story = {
  args: {
    currentArticle: MOCK_ARTICLE_CAMEL,
  },
};

/** Multiple see-also links rendered as a list under the article. */
export const WithSeeAlso: Story = {
  args: {
    currentArticle: MOCK_ARTICLE_HEAVEN_MULTI_SEEALSO,
  },
};

/** Abbreviations footer with hover-revealed full text via shadcn Tooltip. */
export const WithAbbreviations: Story = {
  args: {
    currentArticle: MOCK_ARTICLE_CAMEL,
  },
};

/** Single-paragraph article with no extras (covers minimal-content edge case). */
export const Minimal: Story = {
  args: {
    currentArticle: MOCK_ARTICLE_MINIMAL,
  },
};

/** First article in a sequence - Previous control disabled, Next enabled. */
export const AtSequenceStart: Story = {
  args: {
    currentArticle: MOCK_ARTICLE_CAMEL,
    previousArticleAvailable: false,
    nextArticleAvailable: true,
  },
};

/** Last article in a sequence - Next control disabled, Previous enabled. */
export const AtSequenceEnd: Story = {
  args: {
    currentArticle: MOCK_ARTICLE_HEAVEN,
    previousArticleAvailable: true,
    nextArticleAvailable: false,
  },
};

/** No sequence available - Previous and Next controls hidden entirely. */
export const NoSequence: Story = {
  args: {
    currentArticle: MOCK_ARTICLE_CAMEL,
    previousArticleAvailable: false,
    nextArticleAvailable: false,
  },
};

/** Long article body that overflows the drawer height (forces inner scroll). */
export const LongArticle: Story = {
  args: {
    currentArticle: MOCK_ARTICLE_LONG,
    previousArticleAvailable: true,
    nextArticleAvailable: true,
  },
};

/** Loading state - skeleton lines while the article body is being fetched. */
export const Loading: Story = {
  args: {
    currentArticle: undefined,
    isLoading: true,
  },
};

/** Empty state - drawer is open but no article data is available. */
export const Empty: Story = {
  args: {
    currentArticle: undefined,
    isLoading: false,
  },
};

/**
 * Interactive variant: parent owns state and reacts to all callbacks. Demonstrates the full
 * UI-PKG-006 acceptance criteria in action - close, sequence prev/next, see-also navigation (parent
 * swaps the article in-place), and verse-link / image clicks (logged to console). The trigger
 * button restores focus per Drawer focus management.
 */
export const Interactive: StoryObj<typeof ArticleViewer> = {
  args: {
    open: false,
  },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open ?? false);
    const [sequenceIndex, setSequenceIndex] = useState(1); // start on Camel
    const [currentArticle, setCurrentArticle] = useState<MockArticleData>(MOCK_ARTICLE_CAMEL);

    const handleOpen = useCallback(() => {
      setSequenceIndex(1);
      setCurrentArticle(MOCK_ARTICLE_CAMEL);
      setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
      setOpen(false);
    }, []);

    const handlePrevious = useCallback(() => {
      setSequenceIndex((i) => {
        const next = Math.max(0, i - 1);
        setCurrentArticle(INTERACTIVE_SEQUENCE[next]);
        return next;
      });
    }, []);

    const handleNext = useCallback(() => {
      setSequenceIndex((i) => {
        const next = Math.min(INTERACTIVE_SEQUENCE.length - 1, i + 1);
        setCurrentArticle(INTERACTIVE_SEQUENCE[next]);
        return next;
      });
    }, []);

    const handleCrossReference = useCallback((ref: ArticleCrossRefData) => {
      if (ref.type === 'launchViewer') {
        // Storybook-only diagnostic: in production this opens MediaViewer; here we just log.
        // eslint-disable-next-line no-console
        console.log('[ArticleViewer story] launchViewer ->', ref.targetArticleId);
        return;
      }
      const target = ARTICLE_INDEX[ref.targetArticleId];
      if (target) {
        setCurrentArticle(target);
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
          Try ArrowLeft / ArrowRight to step through the sequence, click a See also link to swap
          articles in place, or click a verse reference / inline image to log the callback. Escape
          closes.
        </p>
        <ArticleViewer
          {...args}
          open={open}
          currentArticle={currentArticle}
          previousArticleAvailable={sequenceIndex > 0}
          nextArticleAvailable={sequenceIndex < INTERACTIVE_SEQUENCE.length - 1}
          imageUrlResolver={mockImageUrlResolver}
          localizedStringsWithLoadingState={[localizedStrings, false]}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
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
