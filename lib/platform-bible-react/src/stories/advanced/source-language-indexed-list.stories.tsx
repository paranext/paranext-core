import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import SourceLanguageIndexedList from '@/components/advanced/source-language-indexed-list/source-language-indexed-list.component';
import ErDictionaryList from '@/components/advanced/source-language-indexed-list/er-dictionary-list.component';
import ErDictionaryFilteredList from '@/components/advanced/source-language-indexed-list/er-dictionary-filtered-list.component';
import ErEncyclopediaList from '@/components/advanced/source-language-indexed-list/er-encyclopedia-list.component';
import ErMediaList from '@/components/advanced/source-language-indexed-list/er-media-list.component';
import LexicalDictionaryList from '@/components/advanced/source-language-indexed-list/lexical-dictionary-list.component';
import type {
  IndexedListItem,
  EncyclopediaTeaser,
  MediaItem,
  LexicalDictionaryEntry,
  SemanticDomain,
} from '@/components/advanced/source-language-indexed-list/source-language-indexed-list.types';

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const sampleDictionaryItems: (IndexedListItem & {
  glosses: string;
  strongsCodes: string[];
  occurrenceCount: number;
})[] = [
  {
    id: 'entry-1',
    primaryText: 'grace',
    sourceLanguageText: '\u03C7\u03AC\u03C1\u03B9\u03C2',
    transliteration: 'charis',
    glosses: 'grace, favor, kindness',
    strongsCodes: ['G5485'],
    occurrenceCount: 12,
  },
  {
    id: 'entry-2',
    primaryText: 'faith',
    sourceLanguageText: '\u03C0\u03AF\u03C3\u03C4\u03B9\u03C2',
    transliteration: 'pistis',
    glosses: 'faith, belief, trust',
    strongsCodes: ['G4102'],
    occurrenceCount: 8,
  },
  {
    id: 'entry-3',
    primaryText: 'love',
    sourceLanguageText: '\u1F00\u03B3\u03AC\u03C0\u03B7',
    transliteration: 'agape',
    glosses: 'love, affection, goodwill',
    strongsCodes: ['G26'],
    occurrenceCount: 15,
  },
  {
    id: 'entry-4',
    primaryText: 'righteousness',
    sourceLanguageText: '\u03B4\u03B9\u03BA\u03B1\u03B9\u03BF\u03C3\u03CD\u03BD\u03B7',
    transliteration: 'dikaiosyne',
    glosses: 'righteousness, justice',
    strongsCodes: ['G1343'],
    occurrenceCount: 5,
  },
  {
    id: 'entry-5',
    primaryText: 'salvation',
    sourceLanguageText: '\u03C3\u03C9\u03C4\u03B7\u03C1\u03AF\u03B1',
    transliteration: 'soteria',
    glosses: 'salvation, deliverance, preservation',
    strongsCodes: ['G4991'],
    occurrenceCount: 3,
  },
  {
    id: 'entry-6',
    primaryText: 'glory',
    sourceLanguageText: '\u03B4\u03CC\u03BE\u03B1',
    transliteration: 'doxa',
    glosses: 'glory, splendor, brightness',
    strongsCodes: ['G1391'],
    occurrenceCount: 7,
  },
];

const sampleEncyclopediaItems: EncyclopediaTeaser[] = [
  {
    id: 'enc-1',
    primaryText: 'Ephesus',
    sourceLanguageText: '\u1F1C\u03C6\u03B5\u03C3\u03BF\u03C2',
    transliteration: 'Ephesos',
    teaserText:
      'An ancient Greek city on the coast of Ionia, renowned for the Temple of Artemis. Paul spent about three years there establishing the early church.',
  },
  {
    id: 'enc-2',
    primaryText: 'Corinth',
    sourceLanguageText: '\u039A\u03CC\u03C1\u03B9\u03BD\u03B8\u03BF\u03C2',
    transliteration: 'Korinthos',
    teaserText:
      'A major Greek city-state located on the isthmus connecting the Peloponnese to mainland Greece. Paul wrote two epistles to the church there.',
  },
  {
    id: 'enc-3',
    primaryText: 'Baptism',
    sourceLanguageText: '\u03B2\u03AC\u03C0\u03C4\u03B9\u03C3\u03BC\u03B1',
    transliteration: 'baptisma',
    teaserText:
      'A rite of washing with water as a sign of religious purification and consecration. Central to Christian initiation.',
  },
  {
    id: 'enc-4',
    primaryText: 'Pharisees',
    sourceLanguageText: '\u03A6\u03B1\u03C1\u03B9\u03C3\u03B1\u1FD6\u03BF\u03B9',
    transliteration: 'Pharisaioi',
    teaserText:
      'A Jewish sect known for strict observance of the Torah and oral traditions. Frequently mentioned in the Gospels in dialogue with Jesus.',
  },
  {
    id: 'enc-5',
    primaryText: 'Covenant',
    sourceLanguageText: '\u03B4\u03B9\u03B1\u03B8\u03AE\u03BA\u03B7',
    transliteration: 'diatheke',
    teaserText:
      'A solemn agreement between God and his people. Key covenants include those with Abraham, Moses, and the New Covenant through Christ.',
  },
];

const sampleMediaItems: MediaItem[] = [
  {
    id: 'media-1',
    primaryText: 'Map of Ancient Ephesus',
    sourceLanguageText: '\u1F1C\u03C6\u03B5\u03C3\u03BF\u03C2',
    transliteration: 'Ephesos',
    thumbnailUrl: 'https://placehold.co/200x200/e2e8f0/64748b?text=Map',
    thumbnailAlt: 'Map of Ancient Ephesus',
    mediaType: 'map',
    caption: 'City plan showing the harbor, theater, and Temple of Artemis',
  },
  {
    id: 'media-2',
    primaryText: 'Theater at Ephesus',
    sourceLanguageText: '\u03B8\u03AD\u03B1\u03C4\u03C1\u03BF\u03BD',
    transliteration: 'theatron',
    thumbnailUrl: 'https://placehold.co/200x200/e2e8f0/64748b?text=Photo',
    thumbnailAlt: 'Photo of the ancient theater at Ephesus',
    mediaType: 'image',
    caption: 'The Great Theater, seating approximately 25,000 spectators',
  },
  {
    id: 'media-3',
    primaryText: "Paul's Missionary Journeys",
    sourceLanguageText: '\u03BF\u03B4\u03BF\u03B9\u03C0\u03BF\u03C1\u03AF\u03B1',
    transliteration: 'hodoiporia',
    thumbnailUrl: 'https://placehold.co/200x200/e2e8f0/64748b?text=Map',
    thumbnailAlt: "Map of Paul's missionary journeys",
    mediaType: 'map',
    caption: 'Routes of the first, second, and third missionary journeys',
  },
  {
    id: 'media-4',
    primaryText: 'Temple of Artemis',
    sourceLanguageText: '\u0391\u03C1\u03C4\u03AD\u03BC\u03B9\u03C2',
    transliteration: 'Artemis',
    thumbnailUrl: 'https://placehold.co/200x200/e2e8f0/64748b?text=Photo',
    thumbnailAlt: 'Artistic reconstruction of the Temple of Artemis',
    mediaType: 'image',
    caption: 'One of the Seven Wonders of the Ancient World',
  },
];

const sampleLexicalEntries: LexicalDictionaryEntry[] = [
  {
    id: 'lex-1',
    primaryText: '\u03BB\u03CC\u03B3\u03BF\u03C2',
    sourceLanguageText: '\u03BB\u03CC\u03B3\u03BF\u03C2',
    transliteration: 'logos',
    strongsCodes: ['G3056'],
    glosses: 'word, speech, message, reason',
    occurrenceCount: 23,
  },
  {
    id: 'lex-2',
    primaryText: '\u03B8\u03B5\u03CC\u03C2',
    sourceLanguageText: '\u03B8\u03B5\u03CC\u03C2',
    transliteration: 'theos',
    strongsCodes: ['G2316'],
    glosses: 'God, god, deity',
    occurrenceCount: 45,
  },
  {
    id: 'lex-3',
    primaryText: '\u03BA\u03CC\u03C3\u03BC\u03BF\u03C2',
    sourceLanguageText: '\u03BA\u03CC\u03C3\u03BC\u03BF\u03C2',
    transliteration: 'kosmos',
    strongsCodes: ['G2889'],
    glosses: 'world, universe, order',
    occurrenceCount: 17,
  },
  {
    id: 'lex-4',
    primaryText: '\u03C6\u1FF6\u03C2',
    sourceLanguageText: '\u03C6\u1FF6\u03C2',
    transliteration: 'phos',
    strongsCodes: ['G5457'],
    glosses: 'light, radiance',
    occurrenceCount: 9,
  },
  {
    id: 'lex-5',
    primaryText: '\u03C3\u03BA\u03BF\u03C4\u03AF\u03B1',
    sourceLanguageText: '\u03C3\u03BA\u03BF\u03C4\u03AF\u03B1',
    transliteration: 'skotia',
    strongsCodes: ['G4653'],
    glosses: 'darkness, gloom',
    occurrenceCount: 4,
  },
  {
    id: 'lex-6',
    primaryText: '\u03B6\u03C9\u03AE',
    sourceLanguageText: '\u03B6\u03C9\u03AE',
    transliteration: 'zoe',
    strongsCodes: ['G2222'],
    glosses: 'life, living',
    occurrenceCount: 11,
  },
  {
    id: 'lex-7',
    primaryText: '\u1F00\u03BB\u03AE\u03B8\u03B5\u03B9\u03B1',
    sourceLanguageText: '\u1F00\u03BB\u03AE\u03B8\u03B5\u03B9\u03B1',
    transliteration: 'aletheia',
    strongsCodes: ['G225'],
    glosses: 'truth, reality',
    occurrenceCount: 6,
  },
];

const sampleDomainPath: SemanticDomain[] = [
  { id: 'root', label: 'All Domains' },
  { id: 'natural-world', label: 'Natural World' },
  { id: 'animals', label: 'Animals' },
];

const sampleDomainChildren: SemanticDomain[] = [
  {
    id: 'domestic',
    label: 'Domestic Animals',
    children: [
      { id: 'cattle', label: 'Cattle' },
      { id: 'sheep', label: 'Sheep & Goats' },
      { id: 'donkeys', label: 'Donkeys' },
    ],
  },
  {
    id: 'wild',
    label: 'Wild Animals',
    children: [
      { id: 'predators', label: 'Predators' },
      { id: 'prey', label: 'Prey Animals' },
    ],
  },
  { id: 'birds', label: 'Birds' },
  { id: 'fish', label: 'Fish & Sea Creatures' },
  { id: 'insects', label: 'Insects' },
];

const sampleFilteredItems: IndexedListItem[] = [
  {
    id: 'filtered-1',
    primaryText: 'lamb',
    sourceLanguageText: '\u1F00\u03BC\u03BD\u03CC\u03C2',
    transliteration: 'amnos',
  },
  {
    id: 'filtered-2',
    primaryText: 'sheep',
    sourceLanguageText: '\u03C0\u03C1\u03CC\u03B2\u03B1\u03C4\u03BF\u03BD',
    transliteration: 'probaton',
  },
  {
    id: 'filtered-3',
    primaryText: 'goat',
    sourceLanguageText: '\u03B1\u1F34\u03BE',
    transliteration: 'aix',
  },
  {
    id: 'filtered-4',
    primaryText: 'ox',
    sourceLanguageText: '\u03B2\u03BF\u1FE6\u03C2',
    transliteration: 'bous',
  },
  {
    id: 'filtered-5',
    primaryText: 'donkey',
    sourceLanguageText: '\u1F44\u03BD\u03BF\u03C2',
    transliteration: 'onos',
  },
];

// ---------------------------------------------------------------------------
// Story meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof SourceLanguageIndexedList> = {
  title: 'Advanced/SourceLanguageIndexedList',
  component: SourceLanguageIndexedList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-max-w-2xl tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SourceLanguageIndexedList>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Base SourceLanguageIndexedList with default two-column layout */
export const Default: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | undefined>();

    return (
      <div className="tw-h-[400px] tw-rounded tw-border">
        <SourceLanguageIndexedList
          items={sampleDictionaryItems}
          onItemClick={(item) => setSelectedId(item.id === selectedId ? undefined : item.id)}
          selectedItemId={selectedId}
          showSourceLanguage
          showTransliteration
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Base SourceLanguageIndexedList component showing the default two-column layout with resource terms and source language terms.',
      },
    },
  },
};

/** Loading state with skeleton placeholders */
export const Loading: Story = {
  render: () => (
    <div className="tw-h-[400px] tw-rounded tw-border">
      <SourceLanguageIndexedList items={[]} isLoading />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading state showing skeleton placeholders while data is being fetched.',
      },
    },
  },
};

/** Empty state with custom message */
export const EmptyState: Story = {
  render: () => (
    <div className="tw-h-[400px] tw-rounded tw-border">
      <SourceLanguageIndexedList
        items={[]}
        emptyStateMessage="No dictionary entries found for this scope"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state shown when no items match the current filter or scope.',
      },
    },
  },
};

/**
 * ER Dictionary list showing both columns (resource term + source language), occurrence count
 * badges, formatted glosses, and Strong's code badges.
 */
export const ErDictionary: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | undefined>();

    return (
      <div className="tw-h-[500px] tw-rounded tw-border">
        <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">Dictionary</h3>
        <ErDictionaryList
          items={sampleDictionaryItems}
          onItemClick={(item) => setSelectedId(item.id === selectedId ? undefined : item.id)}
          selectedItemId={selectedId}
          getDescription={(item) => item.glosses}
          getBadges={(item) => item.strongsCodes}
          getOccurrenceCount={(item) => item.occurrenceCount}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "ER Dictionary list showing both columns with occurrence counts, glosses, and Strong's codes. Used in the Dictionary tab of the Enhanced Resources research pane.",
      },
    },
  },
};

/**
 * ER Dictionary filtered by semantic domain, showing breadcrumb navigation and a toggle to switch
 * between tree view (Option A) and dropdown view (Option B) for domain navigation.
 */
export const ErDictionaryFilteredByType: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | undefined>();
    const [navMode, setNavMode] = useState<'tree' | 'dropdown'>('tree');
    const [domainPath, setDomainPath] = useState<SemanticDomain[]>(sampleDomainPath);

    const handleBreadcrumbClick = (domain: SemanticDomain) => {
      const index = domainPath.findIndex((d) => d.id === domain.id);
      if (index >= 0) {
        setDomainPath(domainPath.slice(0, index + 1));
      }
    };

    const handleDomainSelect = (domain: SemanticDomain) => {
      setDomainPath([...domainPath, domain]);
    };

    return (
      <div className="tw-h-[600px] tw-rounded tw-border">
        <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">
          Dictionary &mdash; Filtered by Semantic Domain
        </h3>
        <ErDictionaryFilteredList
          items={sampleFilteredItems}
          onItemClick={(item) => setSelectedId(item.id === selectedId ? undefined : item.id)}
          selectedItemId={selectedId}
          domainPath={domainPath}
          onBreadcrumbClick={handleBreadcrumbClick}
          navigationMode={navMode}
          onNavigationModeChange={setNavMode}
          domainChildren={sampleDomainChildren}
          onDomainSelect={handleDomainSelect}
          className="tw-h-full"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dictionary entries filtered by semantic domain. Shows breadcrumb trail for the domain hierarchy and a toggle to switch between tree view (Option A, showing nested hierarchy) and dropdown view (Option B, showing siblings at each level). Corresponds to Screen A from ui-alignment.md.',
      },
    },
  },
};

/** ER Encyclopedia list showing article titles with teaser/summary text. */
export const ErEncyclopedia: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | undefined>();

    return (
      <div className="tw-h-[500px] tw-rounded tw-border">
        <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">Encyclopedia</h3>
        <ErEncyclopediaList
          items={sampleEncyclopediaItems}
          onItemClick={(item) => setSelectedId(item.id === selectedId ? undefined : item.id)}
          selectedItemId={selectedId}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'ER Encyclopedia list showing article titles with teaser/summary text and source language terms. Used in the Encyclopedia tab of the Enhanced Resources research pane.',
      },
    },
  },
};

/** ER Media list (images and maps) using the thumbnail variant with image previews. */
export const ErMedia: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | undefined>();

    return (
      <div className="tw-h-[500px] tw-rounded tw-border">
        <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">
          Media (Images &amp; Maps)
        </h3>
        <ErMediaList
          items={sampleMediaItems}
          onItemClick={(item) => setSelectedId(item.id === selectedId ? undefined : item.id)}
          selectedItemId={selectedId}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'ER Media list showing images and maps with thumbnail previews, media type badges, and captions. Used in the Media and Maps tabs of the Enhanced Resources research pane.',
      },
    },
  },
};

/**
 * Lexical extension dictionary list extracted from platform-lexical-tools. Shows entries with lemma
 * text, occurrence count badges, formatted glosses, and Strong's code badges. Matches the existing
 * dictionary list pattern from the lexical tools extension.
 */
export const LexicalDictionary: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | undefined>();

    return (
      <div className="tw-h-[500px] tw-rounded tw-border">
        <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">
          Lexical Dictionary
        </h3>
        <LexicalDictionaryList
          items={sampleLexicalEntries}
          onItemClick={(item) => setSelectedId(item?.id === selectedId ? undefined : item?.id)}
          selectedItemId={selectedId}
          occurrenceCountLabel="Occurrences in chapter"
          strongsCodeLabel="Strong's code"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Lexical extension dictionary list extracted from platform-lexical-tools. Shows entries with source language lemma, occurrence count, glosses, and Strong's codes. This is the shared version of the existing dictionary list component.",
      },
    },
  },
};

/** All ER tabs combined to show how the components work together in a research pane layout. */
export const AllErTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<'dictionary' | 'encyclopedia' | 'media'>(
      'dictionary',
    );
    const [selectedId, setSelectedId] = useState<string | undefined>();

    const handleItemClick = (item: IndexedListItem) => {
      setSelectedId(item.id === selectedId ? undefined : item.id);
    };

    return (
      <div className="tw-flex tw-h-[500px] tw-flex-col tw-rounded tw-border">
        <div className="tw-flex tw-border-b">
          {(['dictionary', 'encyclopedia', 'media'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tw-px-4 tw-py-2 tw-text-sm tw-capitalize ${
                activeTab === tab
                  ? 'tw-border-b-2 tw-border-primary tw-font-medium'
                  : 'tw-text-muted-foreground hover:tw-text-foreground'
              }`}
              onClick={() => {
                setActiveTab(tab);
                setSelectedId(undefined);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="tw-flex-1 tw-overflow-hidden">
          {activeTab === 'dictionary' && (
            <ErDictionaryList
              items={sampleDictionaryItems}
              onItemClick={handleItemClick}
              selectedItemId={selectedId}
              getDescription={(item) => item.glosses}
              getBadges={(item) => item.strongsCodes}
              getOccurrenceCount={(item) => item.occurrenceCount}
            />
          )}
          {activeTab === 'encyclopedia' && (
            <ErEncyclopediaList
              items={sampleEncyclopediaItems}
              onItemClick={handleItemClick}
              selectedItemId={selectedId}
            />
          )}
          {activeTab === 'media' && (
            <ErMediaList
              items={sampleMediaItems}
              onItemClick={handleItemClick}
              selectedItemId={selectedId}
            />
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'All ER research pane tabs combined to demonstrate how Dictionary, Encyclopedia, and Media lists work together in a tabbed layout, matching the Enhanced Resources research pane structure.',
      },
    },
  },
};
