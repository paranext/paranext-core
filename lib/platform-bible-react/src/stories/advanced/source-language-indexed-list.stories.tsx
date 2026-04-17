import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useCallback } from 'react';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { ArrowLeft, BookA } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '@/components/shadcn-ui/button';
import { Separator } from '@/components/shadcn-ui/separator';
import { Badge } from '@/components/shadcn-ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/shadcn-ui/dialog';
import { DrawerClose, DrawerTitle, DrawerDescription } from '@/components/shadcn-ui/drawer';
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
  EntryDomain,
} from '@/components/advanced/source-language-indexed-list/source-language-indexed-list.types';

// ---------------------------------------------------------------------------
// Sample domain data (always 2 levels)
// ---------------------------------------------------------------------------

const sampleAllDomains: SemanticDomain[] = [
  {
    id: 'natural-world',
    label: 'Natural World',
    children: [
      { id: 'animals', label: 'Animals' },
      { id: 'plants', label: 'Plants' },
      { id: 'weather', label: 'Weather & Climate' },
    ],
  },
  {
    id: 'human-body',
    label: 'Human Body',
    children: [
      { id: 'body-parts', label: 'Body Parts' },
      { id: 'senses', label: 'Senses & Perception' },
      { id: 'health', label: 'Health & Sickness' },
    ],
  },
  {
    id: 'social-relations',
    label: 'Social Relations',
    children: [
      { id: 'family', label: 'Family' },
      { id: 'authority', label: 'Authority & Leadership' },
      { id: 'worship', label: 'Worship & Religion' },
    ],
  },
  {
    id: 'abstract-concepts',
    label: 'Abstract Concepts',
    children: [
      { id: 'time', label: 'Time' },
      { id: 'quantity', label: 'Quantity & Number' },
      { id: 'quality', label: 'Quality & Attributes' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Dictionary entry type with domains for stories
// ---------------------------------------------------------------------------

type DictionaryEntryWithDomains = IndexedListItem & {
  glosses: string;
  strongsCodes: string[];
  occurrenceCount: number;
  domains: EntryDomain[];
  definition?: string;
};

// ---------------------------------------------------------------------------
// Sample dictionary items
// ---------------------------------------------------------------------------

const sampleDictionaryItems: DictionaryEntryWithDomains[] = [
  {
    id: 'entry-1',
    primaryText: 'grace',
    sourceLanguageText: '\u03C7\u03AC\u03C1\u03B9\u03C2',
    transliteration: 'charis',
    glosses: 'grace, favor, kindness',
    strongsCodes: ['G5485'],
    occurrenceCount: 12,
    domains: [{ id: 'abstract-concepts', label: 'Abstract Concepts', code: '1.1' }],
    definition:
      'Unmerited divine favor or assistance given to humans for regeneration or sanctification.',
  },
  {
    id: 'entry-2',
    primaryText: 'faith',
    sourceLanguageText: '\u03C0\u03AF\u03C3\u03C4\u03B9\u03C2',
    transliteration: 'pistis',
    glosses: 'faith, belief, trust',
    strongsCodes: ['G4102'],
    occurrenceCount: 8,
    domains: [
      { id: 'worship', label: 'Worship & Religion', parentId: 'social-relations', code: '3.3' },
    ],
    definition: 'Complete trust or confidence in something or someone; firm belief.',
  },
  {
    id: 'entry-3',
    primaryText: 'love',
    sourceLanguageText: '\u1F00\u03B3\u03AC\u03C0\u03B7',
    transliteration: 'agape',
    glosses: 'love, affection, goodwill',
    strongsCodes: ['G26'],
    occurrenceCount: 15,
    domains: [
      {
        id: 'social-relations',
        label: 'Social Relations',
        code: '3.0',
      },
    ],
    definition:
      'Unconditional love, especially the love of God for humanity and the love expected between believers.',
  },
  {
    id: 'entry-4',
    primaryText: 'righteousness',
    sourceLanguageText: '\u03B4\u03B9\u03BA\u03B1\u03B9\u03BF\u03C3\u03CD\u03BD\u03B7',
    transliteration: 'dikaiosyne',
    glosses: 'righteousness, justice',
    strongsCodes: ['G1343'],
    occurrenceCount: 5,
    domains: [
      { id: 'quality', label: 'Quality & Attributes', parentId: 'abstract-concepts', code: '1.3' },
    ],
    definition: 'The quality of being morally right or justifiable; conformity to divine law.',
  },
  {
    id: 'entry-5',
    primaryText: 'salvation',
    sourceLanguageText: '\u03C3\u03C9\u03C4\u03B7\u03C1\u03AF\u03B1',
    transliteration: 'soteria',
    glosses: 'salvation, deliverance, preservation',
    strongsCodes: ['G4991'],
    occurrenceCount: 3,
    domains: [
      { id: 'worship', label: 'Worship & Religion', parentId: 'social-relations', code: '3.3' },
    ],
    definition: 'Deliverance from sin and its consequences, brought about by faith in Christ.',
  },
  {
    id: 'entry-6',
    primaryText: 'glory',
    sourceLanguageText: '\u03B4\u03CC\u03BE\u03B1',
    transliteration: 'doxa',
    glosses: 'glory, splendor, brightness',
    strongsCodes: ['G1391'],
    occurrenceCount: 7,
    domains: [
      { id: 'quality', label: 'Quality & Attributes', parentId: 'abstract-concepts', code: '1.3' },
    ],
    definition:
      'Great beauty, magnificence, or splendor. Often refers to the manifest presence and power of God.',
  },
];

// ---------------------------------------------------------------------------
// Sample encyclopedia items
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Sample media items
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Sample lexical entries
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Shared detail content renderers (extracted from lexical dictionary pattern)
// ---------------------------------------------------------------------------

/** Renders detailed dictionary entry content inside the scoped drawer */
function DictionaryDetailContent({
  item,
  onClose,
  onDomainClick,
}: {
  item: DictionaryEntryWithDomains;
  onClose: () => void;
  onDomainClick?: (domain: EntryDomain) => void;
}) {
  return (
    <>
      <DrawerClose asChild>
        <Button onClick={onClose} className="tw-mb-4 tw-flex tw-items-center" variant="link">
          <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
          Back to list
        </Button>
      </DrawerClose>

      <div className="tw-mb-4">
        <div className="tw-flex tw-items-baseline tw-justify-between tw-gap-2">
          <span className="tw-flex tw-flex-row tw-items-baseline tw-gap-2">
            <DrawerTitle className="tw-text-2xl tw-font-normal">{item.primaryText}</DrawerTitle>
            <DrawerDescription className="tw-text-lg tw-text-muted-foreground">
              {item.glosses}
            </DrawerDescription>
          </span>
          <ul className="tw-flex tw-flex-row tw-gap-1">
            {item.strongsCodes.map((code) => (
              <li
                key={code}
                className="tw-ml-auto tw-rounded tw-bg-accent tw-px-2 tw-py-0.5 tw-text-sm"
              >
                {code}
              </li>
            ))}
          </ul>
        </div>
        {item.sourceLanguageText && (
          <p className="tw-mt-1 tw-text-sm tw-text-muted-foreground">
            {item.sourceLanguageText}
            {item.transliteration && <span className="tw-ml-1">({item.transliteration})</span>}
          </p>
        )}
      </div>

      <Separator className="tw-my-3" />

      {item.definition && (
        <div className="tw-mb-4">
          <h3 className="tw-mb-1 tw-font-semibold">Definition</h3>
          <p className="tw-text-sm tw-text-muted-foreground">{item.definition}</p>
        </div>
      )}

      {/* Domains as clickable links */}
      {item.domains.length > 0 && (
        <div className="tw-mb-4">
          <h3 className="tw-mb-2 tw-font-semibold">Domains</h3>
          <div className="tw-flex tw-flex-wrap tw-gap-2">
            {item.domains.map((domain) => (
              <Button
                key={domain.id}
                variant="outline"
                className="tw-h-auto tw-gap-1 tw-px-2 tw-py-1 tw-text-xs"
                onClick={() => onDomainClick?.(domain)}
              >
                <BookA className="tw-h-3 tw-w-3" />
                {domain.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      <Separator className="tw-my-3" />

      <div>
        <h3 className="tw-mb-2 tw-font-semibold">Occurrences ({item.occurrenceCount})</h3>
        <p className="tw-text-sm tw-text-muted-foreground">
          Scripture references would appear here in the real application.
        </p>
      </div>
    </>
  );
}

/** Renders detailed encyclopedia content inside the scoped drawer */
function EncyclopediaDetailContent({
  item,
  onClose,
}: {
  item: EncyclopediaTeaser;
  onClose: () => void;
}) {
  return (
    <>
      <DrawerClose asChild>
        <Button onClick={onClose} className="tw-mb-4 tw-flex tw-items-center" variant="link">
          <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
          Back to list
        </Button>
      </DrawerClose>

      <DrawerTitle className="tw-mb-1 tw-text-2xl tw-font-normal">{item.primaryText}</DrawerTitle>
      {item.sourceLanguageText && (
        <DrawerDescription className="tw-text-sm tw-text-muted-foreground">
          {item.sourceLanguageText}
          {item.transliteration && <span className="tw-ml-1">({item.transliteration})</span>}
        </DrawerDescription>
      )}

      <Separator className="tw-my-3" />

      <p className="tw-text-sm">
        {item.teaserText ?? 'Full article content would be displayed here in the real application.'}
      </p>
    </>
  );
}

/** Renders detailed media content inside the scoped drawer */
function MediaDetailContent({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  return (
    <>
      <DrawerClose asChild>
        <Button onClick={onClose} className="tw-mb-4 tw-flex tw-items-center" variant="link">
          <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
          Back to list
        </Button>
      </DrawerClose>

      <div className="tw-mb-4 tw-flex tw-items-center tw-gap-2">
        <DrawerTitle className="tw-text-xl tw-font-normal">{item.primaryText}</DrawerTitle>
        <Badge variant="outline">{item.mediaType}</Badge>
      </div>
      <DrawerDescription className="tw-sr-only">
        {item.caption ?? item.primaryText}
      </DrawerDescription>

      {item.thumbnailUrl && (
        <img
          src={item.thumbnailUrl}
          alt={item.thumbnailAlt ?? item.primaryText}
          className="tw-mb-4 tw-w-full tw-rounded tw-object-contain"
        />
      )}

      {item.caption && <p className="tw-text-sm tw-text-muted-foreground">{item.caption}</p>}
    </>
  );
}

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
          'Base SourceLanguageIndexedList without a detail panel. Clicking items toggles selection only.',
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
 * ER Dictionary list with detail panel. Clicking an entry opens a inline detail panel showing the
 * full entry details (glosses, Strong's codes, definition, domains as clickable links). Clicking a
 * domain link opens the "ER Dictionary Filtered by Type" dialog.
 */
export const ErDictionary: Story = {
  render: () => {
    const [filteredDialogOpen, setFilteredDialogOpen] = useState(false);
    const [filteredDomainL1, setFilteredDomainL1] = useState(sampleAllDomains[0]);
    const [filteredDomainL2, setFilteredDomainL2] = useState<SemanticDomain | undefined>();
    const [navMode, setNavMode] = useState<'tree' | 'dropdown'>('dropdown');

    const handleDomainClick = (domain: EntryDomain) => {
      // Find the matching level-1 domain and optionally level-2
      const l1 = sampleAllDomains.find(
        (d) => d.id === domain.id || d.children?.some((c) => c.id === domain.id),
      );
      if (l1) {
        setFilteredDomainL1(l1);
        const l2 = l1.children?.find((c) => c.id === domain.id);
        setFilteredDomainL2(l2);
        setFilteredDialogOpen(true);
      }
    };

    return (
      <>
        <div className="tw-h-[500px] tw-rounded tw-border">
          <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">Dictionary</h3>
          <ErDictionaryList
            items={sampleDictionaryItems}
            showSourceLanguage
            showTransliteration
            getDescription={(item) => item.glosses}
            getBadges={(item) => item.strongsCodes}
            getOccurrenceCount={(item) => item.occurrenceCount}
            renderDetailContent={(item, onClose) => (
              <DictionaryDetailContent
                item={item}
                onClose={onClose}
                onDomainClick={handleDomainClick}
              />
            )}
          />
        </div>

        {/* Dialog that opens when clicking a domain link in the detail panel */}
        <Dialog open={filteredDialogOpen} onOpenChange={setFilteredDialogOpen}>
          <DialogContent className="tw-flex tw-h-[500px] tw-max-w-lg tw-flex-col tw-p-0">
            <DialogTitle className="tw-px-4 tw-pt-4 tw-text-base tw-font-semibold">
              Dictionary by Domain
            </DialogTitle>
            <ErDictionaryFilteredList
              items={sampleDictionaryItems.filter((entry) =>
                entry.domains.some(
                  (d) =>
                    d.id === filteredDomainL1.id ||
                    d.id === filteredDomainL2?.id ||
                    d.parentId === filteredDomainL1.id,
                ),
              )}
              selectedLevel1Domain={filteredDomainL1}
              selectedLevel2Domain={filteredDomainL2}
              allDomains={sampleAllDomains}
              onDomainChange={(l1, l2) => {
                setFilteredDomainL1(l1);
                setFilteredDomainL2(l2);
              }}
              navigationMode={navMode}
              onNavigationModeChange={setNavMode}
              renderDetailContent={(item, onClose) => (
                <DictionaryDetailContent item={item} onClose={onClose} />
              )}
              className="tw-min-h-0 tw-flex-1"
            />
          </DialogContent>
        </Dialog>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'ER Dictionary list with a detail panel. Clicking an entry opens a inline detail panel with full details. Domain names in the detail view are clickable links that open the "ER Dictionary Filtered by Type" dialog.',
      },
    },
  },
};

/**
 * ER Dictionary filtered by semantic domain, shown in a Dialog. Features 2-level breadcrumbs,
 * dropdown/tree navigation toggle, and entry detail panel.
 */
export const ErDictionaryFilteredByType: Story = {
  render: () => {
    const [selectedL1, setSelectedL1] = useState(sampleAllDomains[0]);
    const [selectedL2, setSelectedL2] = useState<SemanticDomain | undefined>(
      sampleAllDomains[0].children?.[0],
    );
    const [navMode, setNavMode] = useState<'tree' | 'dropdown'>('dropdown');

    const handleDomainChange = useCallback((l1: SemanticDomain, l2?: SemanticDomain) => {
      setSelectedL1(l1);
      setSelectedL2(l2);
    }, []);

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dictionary by Domain</Button>
        </DialogTrigger>
        <DialogContent className="tw-flex tw-h-[550px] tw-max-w-lg tw-flex-col tw-p-0">
          <DialogTitle className="tw-px-4 tw-pt-4 tw-text-base tw-font-semibold">
            Dictionary by Semantic Domain
          </DialogTitle>
          <ErDictionaryFilteredList
            items={sampleDictionaryItems}
            selectedLevel1Domain={selectedL1}
            selectedLevel2Domain={selectedL2}
            allDomains={sampleAllDomains}
            onDomainChange={handleDomainChange}
            navigationMode={navMode}
            onNavigationModeChange={setNavMode}
            renderDetailContent={(item, onClose) => (
              <DictionaryDetailContent item={item} onClose={onClose} />
            )}
            className="tw-min-h-0 tw-flex-1"
          />
        </DialogContent>
      </Dialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'ER Dictionary filtered by semantic domain inside a Dialog. 2-level breadcrumbs at top; clicking them opens either a dropdown (dropdown mode) or a domain tree drawer (tree mode). Toggle between modes at the bottom. Clicking an entry opens a detail panel.',
      },
    },
  },
};

/** ER Encyclopedia list with detail panel showing article titles and teaser text. */
export const ErEncyclopedia: Story = {
  render: () => (
    <div className="tw-h-[500px] tw-rounded tw-border">
      <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">Encyclopedia</h3>
      <ErEncyclopediaList
        items={sampleEncyclopediaItems}
        showSourceLanguage
        showTransliteration
        renderDetailContent={(item, onClose) => (
          <EncyclopediaDetailContent item={item} onClose={onClose} />
        )}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'ER Encyclopedia list with a detail panel. Clicking an article opens the full article content in a inline detail panel.',
      },
    },
  },
};

/** ER Media list (images and maps) with detail panel showing image preview. */
export const ErMedia: Story = {
  render: () => (
    <div className="tw-h-[500px] tw-rounded tw-border">
      <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">
        Media (Images &amp; Maps)
      </h3>
      <ErMediaList
        items={sampleMediaItems}
        showSourceLanguage
        renderDetailContent={(item, onClose) => (
          <MediaDetailContent item={item} onClose={onClose} />
        )}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'ER Media list with a detail panel. Clicking an image or map opens a preview in a inline detail panel with zoom/pan support.',
      },
    },
  },
};

/**
 * Lexical extension dictionary list extracted from platform-lexical-tools. Shows entries with lemma
 * text, occurrence count badges, formatted glosses, and Strong's code badges.
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
          "Lexical extension dictionary list extracted from platform-lexical-tools. Shows entries with source language lemma, occurrence count, glosses, and Strong's codes.",
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
    const [filteredDialogOpen, setFilteredDialogOpen] = useState(false);
    const [filteredDomainL1, setFilteredDomainL1] = useState(sampleAllDomains[0]);
    const [filteredDomainL2, setFilteredDomainL2] = useState<SemanticDomain | undefined>();
    const [navMode, setNavMode] = useState<'tree' | 'dropdown'>('dropdown');

    const handleDomainClick = (domain: EntryDomain) => {
      const l1 = sampleAllDomains.find(
        (d) => d.id === domain.id || d.children?.some((c) => c.id === domain.id),
      );
      if (l1) {
        setFilteredDomainL1(l1);
        setFilteredDomainL2(l1.children?.find((c) => c.id === domain.id));
        setFilteredDialogOpen(true);
      }
    };

    return (
      <>
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
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="tw-flex-1 tw-overflow-hidden">
            {activeTab === 'dictionary' && (
              <ErDictionaryList
                items={sampleDictionaryItems}
                showSourceLanguage
                showTransliteration
                getDescription={(item) => item.glosses}
                getBadges={(item) => item.strongsCodes}
                getOccurrenceCount={(item) => item.occurrenceCount}
                renderDetailContent={(item, onClose) => (
                  <DictionaryDetailContent
                    item={item}
                    onClose={onClose}
                    onDomainClick={handleDomainClick}
                  />
                )}
              />
            )}
            {activeTab === 'encyclopedia' && (
              <ErEncyclopediaList
                items={sampleEncyclopediaItems}
                showSourceLanguage
                showTransliteration
                renderDetailContent={(item, onClose) => (
                  <EncyclopediaDetailContent item={item} onClose={onClose} />
                )}
              />
            )}
            {activeTab === 'media' && (
              <ErMediaList
                items={sampleMediaItems}
                showSourceLanguage
                renderDetailContent={(item, onClose) => (
                  <MediaDetailContent item={item} onClose={onClose} />
                )}
              />
            )}
          </div>
        </div>

        <Dialog open={filteredDialogOpen} onOpenChange={setFilteredDialogOpen}>
          <DialogContent className="tw-flex tw-h-[500px] tw-max-w-lg tw-flex-col tw-p-0">
            <DialogTitle className="tw-px-4 tw-pt-4 tw-text-base tw-font-semibold">
              Dictionary by Domain
            </DialogTitle>
            <ErDictionaryFilteredList
              items={sampleDictionaryItems.filter((entry) =>
                entry.domains.some(
                  (d) =>
                    d.id === filteredDomainL1.id ||
                    d.id === filteredDomainL2?.id ||
                    d.parentId === filteredDomainL1.id,
                ),
              )}
              selectedLevel1Domain={filteredDomainL1}
              selectedLevel2Domain={filteredDomainL2}
              allDomains={sampleAllDomains}
              onDomainChange={(l1, l2) => {
                setFilteredDomainL1(l1);
                setFilteredDomainL2(l2);
              }}
              navigationMode={navMode}
              onNavigationModeChange={setNavMode}
              renderDetailContent={(item, onClose) => (
                <DictionaryDetailContent item={item} onClose={onClose} />
              )}
              className="tw-min-h-0 tw-flex-1"
            />
          </DialogContent>
        </Dialog>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'All ER tabs combined with detail panels and domain-filtered dialog. Dictionary entries open a detail panel with clickable domain links. Clicking a domain opens the filtered dictionary dialog.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Alternative: Inline panel (flex layout, no Drawer)
// ---------------------------------------------------------------------------

/**
 * Alternative layout using an inline flex panel instead of a Drawer. The detail view renders as a
 * sibling div that takes 4/5 of the width while the list collapses. No portal or overlay involved.
 */
export const InlinePanelAlternative: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState<DictionaryEntryWithDomains | undefined>();

    return (
      <div className="tw-h-[500px] tw-rounded tw-border">
        <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">
          Dictionary (Inline Panel Alternative)
        </h3>
        <div className="tw-relative tw-flex tw-h-[calc(100%-41px)] tw-overflow-hidden">
          {/* List pane */}
          <div
            className={cn('tw-overflow-y-auto tw-transition-all tw-duration-200', {
              'tw-w-full': !selectedItem,
              'tw-w-1/5 tw-min-w-0': !!selectedItem,
            })}
          >
            <ul role="listbox" className="tw-outline-none">
              {sampleDictionaryItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={-1}
                    onClick={() => setSelectedItem(isSelected ? undefined : item)}
                    className={cn(
                      'tw-flex tw-cursor-pointer tw-flex-col tw-gap-0.5 tw-border-b tw-p-2',
                      {
                        'tw-bg-muted': isSelected,
                        'hover:tw-bg-muted': !isSelected,
                      },
                    )}
                  >
                    <span className="tw-text-sm tw-font-medium">{item.primaryText}</span>
                    {!selectedItem && (
                      <span className="tw-truncate tw-text-xs tw-text-muted-foreground">
                        {item.glosses}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Inline detail pane */}
          {selectedItem && (
            <div className="tw-w-4/5 tw-overflow-y-auto tw-border-l tw-bg-background tw-p-4">
              <Button
                onClick={() => setSelectedItem(undefined)}
                className="tw-mb-4 tw-flex tw-items-center"
                variant="link"
              >
                <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
                Back to list
              </Button>
              <h2 className="tw-text-2xl tw-font-normal">{selectedItem.primaryText}</h2>
              <p className="tw-text-lg tw-text-muted-foreground">{selectedItem.glosses}</p>
              {selectedItem.sourceLanguageText && (
                <p className="tw-mt-1 tw-text-sm tw-text-muted-foreground">
                  {selectedItem.sourceLanguageText}
                  {selectedItem.transliteration && (
                    <span className="tw-ml-1">({selectedItem.transliteration})</span>
                  )}
                </p>
              )}
              <Separator className="tw-my-3" />
              {selectedItem.definition && (
                <p className="tw-text-sm tw-text-muted-foreground">{selectedItem.definition}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Alternative layout using an inline flex panel instead of a Drawer. The list shrinks to 1/5 width and the detail panel takes 4/5. No portal, overlay, or z-index concerns. Compare with the Drawer-based ErDictionary story.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Alternative: Inline domain navigation (no Dialog)
// ---------------------------------------------------------------------------

/**
 * Alternative to using a Dialog for domain-filtered navigation. Clicking a domain link in the
 * dictionary detail view replaces the current dictionary list with the filtered domain view inline.
 * A back button returns to the original list.
 */
export const ErDictionaryInlineNavigation: Story = {
  render: () => {
    const [activeDomain, setActiveDomain] = useState<
      | {
          level1: SemanticDomain;
          level2?: SemanticDomain;
        }
      | undefined
    >();
    const [navMode, setNavMode] = useState<'tree' | 'dropdown'>('dropdown');

    const handleDomainClick = (domain: EntryDomain) => {
      const l1 = sampleAllDomains.find(
        (d) => d.id === domain.id || d.children?.some((c) => c.id === domain.id),
      );
      if (l1) {
        const l2 = l1.children?.find((c) => c.id === domain.id);
        setActiveDomain({ level1: l1, level2: l2 });
      }
    };

    return (
      <div className="tw-h-[500px] tw-rounded tw-border">
        {activeDomain ? (
          /* Domain-filtered view (replaces the dictionary list) */
          <>
            <div className="tw-flex tw-items-center tw-gap-2 tw-border-b tw-px-3 tw-py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveDomain(undefined)}
                className="tw-gap-1"
              >
                <ArrowLeft className="tw-h-4 tw-w-4" />
                Back to Dictionary
              </Button>
              <span className="tw-text-sm tw-text-muted-foreground">
                {activeDomain.level1.label}
                {activeDomain.level2 && ` / ${activeDomain.level2.label}`}
              </span>
            </div>
            <ErDictionaryFilteredList
              items={sampleDictionaryItems.filter((entry) =>
                entry.domains.some(
                  (d) =>
                    d.id === activeDomain.level1.id ||
                    d.id === activeDomain.level2?.id ||
                    d.parentId === activeDomain.level1.id,
                ),
              )}
              selectedLevel1Domain={activeDomain.level1}
              selectedLevel2Domain={activeDomain.level2}
              allDomains={sampleAllDomains}
              onDomainChange={(l1, l2) => setActiveDomain({ level1: l1, level2: l2 })}
              navigationMode={navMode}
              onNavigationModeChange={setNavMode}
              renderDetailContent={(item, onClose) => (
                <DictionaryDetailContent item={item} onClose={onClose} />
              )}
              className="tw-h-[calc(100%-45px)]"
            />
          </>
        ) : (
          /* Normal dictionary list */
          <>
            <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">
              Dictionary (Inline Navigation)
            </h3>
            <ErDictionaryList
              items={sampleDictionaryItems}
              showSourceLanguage
              showTransliteration
              getDescription={(item) => item.glosses}
              getBadges={(item) => item.strongsCodes}
              getOccurrenceCount={(item) => item.occurrenceCount}
              renderDetailContent={(item, onClose) => (
                <DictionaryDetailContent
                  item={item}
                  onClose={onClose}
                  onDomainClick={handleDomainClick}
                />
              )}
            />
          </>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Alternative to using a Dialog for domain navigation. Clicking a domain link in the detail view replaces the entire dictionary with the domain-filtered view inline. A back button returns to the original list. Compare with the Dialog-based ErDictionary story.',
      },
    },
  },
};
