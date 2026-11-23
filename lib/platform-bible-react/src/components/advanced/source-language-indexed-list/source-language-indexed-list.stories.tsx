import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import SourceLanguageIndexedList from './source-language-indexed-list.component';
import type { IndexedListItem } from './source-language-indexed-list.types';

/** Representative dictionary-style entries with source-language text and transliteration. */
const TEXT_ITEMS: IndexedListItem[] = [
  {
    id: 'logos',
    primaryText: 'word',
    sourceLanguageText: 'λόγος',
    transliteration: 'logos',
  },
  {
    id: 'agape',
    primaryText: 'love',
    sourceLanguageText: 'ἀγάπη',
    transliteration: 'agapē',
  },
  {
    id: 'pistis',
    primaryText: 'faith',
    sourceLanguageText: 'πίστις',
    transliteration: 'pistis',
  },
  {
    id: 'charis',
    primaryText: 'grace',
    sourceLanguageText: 'χάρις',
    transliteration: 'charis',
  },
  {
    id: 'eirene',
    primaryText: 'peace',
    sourceLanguageText: 'εἰρήνη',
    transliteration: 'eirēnē',
  },
];

/** Media-style entries with thumbnails for the `thumbnail` variant. */
const THUMBNAIL_ITEMS: IndexedListItem[] = [
  {
    id: 'jerusalem',
    primaryText: 'Jerusalem',
    sourceLanguageText: 'יְרוּשָׁלַיִם',
    thumbnailUrl: 'https://placehold.co/64x64?text=Map',
    thumbnailAlt: 'Map of Jerusalem',
  },
  {
    id: 'temple',
    primaryText: 'Temple',
    sourceLanguageText: 'הֵיכָל',
    thumbnailUrl: 'https://placehold.co/64x64?text=Img',
    thumbnailAlt: 'Image of the Temple',
  },
  {
    id: 'jordan',
    primaryText: 'Jordan River',
    thumbnailUrl: 'https://placehold.co/64x64?text=Map',
    thumbnailAlt: 'Map of the Jordan River',
  },
];

const meta: Meta<typeof SourceLanguageIndexedList> = {
  title: 'Advanced/SourceLanguageIndexedList',
  component: SourceLanguageIndexedList,
  tags: ['autodocs', 'test'],
  parameters: {
    docs: {
      description: {
        component: `
A shared list component for displaying source-language indexed items (dictionary, encyclopedia, and media entries).

Features:
- Two-column layout (resource term + source-language term, with optional transliteration)
- Keyboard navigation (arrow keys, type-ahead)
- \`text\` and \`thumbnail\` display variants
- Loading and empty states
- Optional side-by-side detail panel via \`renderDetailContent\`
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="tw:h-[400px] tw:max-w-2xl tw:border">
        <Story />
      </div>
    ),
  ],
  args: {
    items: TEXT_ITEMS,
    showSourceLanguage: true,
    showTransliteration: true,
    onItemClick: fn(),
    onCharacterPress: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default text list with source-language text and transliteration shown.',
      },
    },
  },
};

export const WithoutSourceLanguage: Story = {
  args: {
    showSourceLanguage: false,
    showTransliteration: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary text only, with the source-language column hidden.',
      },
    },
  },
};

export const SelectedItem: Story = {
  args: {
    selectedItemId: 'agape',
  },
  parameters: {
    docs: {
      description: {
        story: 'A controlled selection highlighting the "love / ἀγάπη" entry.',
      },
    },
  },
};

export const WithDetailPanel: Story = {
  args: {
    renderDetailContent: (item, onClose) => (
      <div className="tw:flex tw:flex-col tw:gap-2">
        <h3 className="tw:text-lg tw:font-bold">{item.primaryText}</h3>
        {item.sourceLanguageText && (
          <p className="tw:text-sm tw:text-muted-foreground">
            {item.sourceLanguageText}
            {item.transliteration ? ` (${item.transliteration})` : ''}
          </p>
        )}
        <button type="button" className="tw:self-start tw:text-sm tw:underline" onClick={onClose}>
          Close
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Clicking an item opens a side-by-side detail panel rendered by `renderDetailContent`.',
      },
    },
  },
};

export const ThumbnailVariant: Story = {
  args: {
    items: THUMBNAIL_ITEMS,
    variant: 'thumbnail',
    showSourceLanguage: true,
    showTransliteration: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Thumbnail variant used for media/maps entries with image previews.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state shown while items are being fetched.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    items: [],
    emptyStateMessage: 'No entries found',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with a custom message when no items match.',
      },
    },
  },
};
