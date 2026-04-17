import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '@/components/shadcn-ui/button';
import { Separator } from '@/components/shadcn-ui/separator';
import { Badge } from '@/components/shadcn-ui/badge';
import SourceLanguageIndexedList from '@/components/advanced/source-language-indexed-list/source-language-indexed-list.component';
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
// Domain data (always 2 levels)
// ---------------------------------------------------------------------------

const sampleAllDomains: SemanticDomain[] = [
  {
    id: 'exist',
    label: 'Exist',
    children: [
      { id: 'exist-create', label: 'Create' },
      { id: 'exist-destroy', label: 'Destroy' },
      { id: 'exist-change', label: 'Change State' },
    ],
  },
  {
    id: 'happen',
    label: 'Happen',
    children: [
      { id: 'happen-cause', label: 'Cause' },
      { id: 'happen-prevent', label: 'Prevent' },
    ],
  },
  {
    id: 'social-relations',
    label: 'Social Relations',
    children: [
      { id: 'family', label: 'Family' },
      { id: 'authority', label: 'Authority' },
      { id: 'worship', label: 'Worship' },
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    children: [
      { id: 'speak', label: 'Speak' },
      { id: 'write', label: 'Write' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Sense type for ER dictionary entries
// ---------------------------------------------------------------------------

type DictionarySense = {
  number: number;
  definition: string;
  occurrenceCount: number;
  glosses: string;
  domain: EntryDomain;
};

type DictionaryEntryWithSenses = IndexedListItem & {
  senses: DictionarySense[];
  totalOccurrences: number;
};

// ---------------------------------------------------------------------------
// Sample ER dictionary items (matching the screenshot structure)
// ---------------------------------------------------------------------------

const sampleDictionaryItems: DictionaryEntryWithSenses[] = [
  {
    id: 'entry-bara',
    primaryText: 'create',
    sourceLanguageText: '\u05D1\u05B8\u05BC\u05E8\u05B8\u05D0',
    transliteration: 'br\u02BE',
    senses: [
      {
        number: 1,
        definition:
          'causative action by which a deity brings to existence something that did not exist before.',
        occurrenceCount: 41,
        glosses: 'to create',
        domain: { id: 'exist', label: 'Exist', code: '1.0' },
      },
      {
        number: 2,
        definition:
          'causative action by which a deity causes something to happen that did not happen before.',
        occurrenceCount: 7,
        glosses: 'to create (an event); to cause to happen',
        domain: { id: 'happen', label: 'Happen', code: '2.0' },
      },
    ],
    totalOccurrences: 48,
  },
  {
    id: 'entry-amar',
    primaryText: 'say',
    sourceLanguageText: '\u05D0\u05B8\u05DE\u05B7\u05E8',
    transliteration: '\u02BEmr',
    senses: [
      {
        number: 1,
        definition: 'to utter words or speech; to communicate verbally.',
        occurrenceCount: 523,
        glosses: 'to say, to speak, to tell',
        domain: { id: 'speak', label: 'Speak', parentId: 'communication', code: '4.1' },
      },
      {
        number: 2,
        definition: 'to think or intend within oneself.',
        occurrenceCount: 34,
        glosses: 'to say to oneself, to think',
        domain: { id: 'happen-cause', label: 'Cause', parentId: 'happen', code: '2.1' },
      },
    ],
    totalOccurrences: 557,
  },
  {
    id: 'entry-asa',
    primaryText: 'make',
    sourceLanguageText: '\u05E2\u05B8\u05E9\u05B8\u05C2\u05D4',
    transliteration: '\u02BF\u015Bh',
    senses: [
      {
        number: 1,
        definition: 'to bring something into being by forming, constructing, or producing.',
        occurrenceCount: 412,
        glosses: 'to make, to do, to produce',
        domain: { id: 'exist-create', label: 'Create', parentId: 'exist', code: '1.1' },
      },
    ],
    totalOccurrences: 412,
  },
  {
    id: 'entry-halak',
    primaryText: 'walk',
    sourceLanguageText: '\u05D4\u05B8\u05DC\u05B7\u05DA\u05B0',
    transliteration: 'hlk',
    senses: [
      {
        number: 1,
        definition: 'to move on foot; to go or travel by walking.',
        occurrenceCount: 198,
        glosses: 'to walk, to go, to travel',
        domain: { id: 'happen-cause', label: 'Cause', parentId: 'happen', code: '2.1' },
      },
    ],
    totalOccurrences: 198,
  },
  {
    id: 'entry-shama',
    primaryText: 'hear',
    sourceLanguageText: '\u05E9\u05B8\u05C1\u05DE\u05B7\u05E2',
    transliteration: '\u0161m\u02BF',
    senses: [
      {
        number: 1,
        definition: 'to perceive sound with the ear; to listen attentively.',
        occurrenceCount: 287,
        glosses: 'to hear, to listen, to obey',
        domain: { id: 'speak', label: 'Speak', parentId: 'communication', code: '4.1' },
      },
    ],
    totalOccurrences: 287,
  },
];

// ---------------------------------------------------------------------------
// Sample encyclopedia / media / lexical data
// ---------------------------------------------------------------------------

const sampleEncyclopediaItems: EncyclopediaTeaser[] = [
  {
    id: 'enc-1',
    primaryText: 'Ephesus',
    sourceLanguageText: '\u1F1C\u03C6\u03B5\u03C3\u03BF\u03C2',
    transliteration: 'Ephesos',
    teaserText: 'An ancient Greek city on the coast of Ionia, renowned for the Temple of Artemis.',
  },
  {
    id: 'enc-2',
    primaryText: 'Corinth',
    sourceLanguageText: '\u039A\u03CC\u03C1\u03B9\u03BD\u03B8\u03BF\u03C2',
    transliteration: 'Korinthos',
    teaserText:
      'A major Greek city-state on the isthmus connecting the Peloponnese to mainland Greece.',
  },
  {
    id: 'enc-3',
    primaryText: 'Baptism',
    sourceLanguageText: '\u03B2\u03AC\u03C0\u03C4\u03B9\u03C3\u03BC\u03B1',
    transliteration: 'baptisma',
    teaserText: 'A rite of washing with water as a sign of religious purification.',
  },
];

const sampleMediaItems: MediaItem[] = [
  {
    id: 'media-1',
    primaryText: 'Map of Ancient Ephesus',
    sourceLanguageText: '\u1F1C\u03C6\u03B5\u03C3\u03BF\u03C2',
    thumbnailUrl: 'https://placehold.co/200x200/e2e8f0/64748b?text=Map',
    mediaType: 'map',
    caption: 'City plan showing the harbor and Temple of Artemis',
  },
  {
    id: 'media-2',
    primaryText: 'Theater at Ephesus',
    thumbnailUrl: 'https://placehold.co/200x200/e2e8f0/64748b?text=Photo',
    mediaType: 'image',
    caption: 'The Great Theater, seating ~25,000 spectators',
  },
];

const sampleLexicalEntries: LexicalDictionaryEntry[] = [
  {
    id: 'lex-1',
    primaryText: '\u03BB\u03CC\u03B3\u03BF\u03C2',
    transliteration: 'logos',
    strongsCodes: ['G3056'],
    glosses: 'word, speech, message, reason',
    occurrenceCount: 23,
  },
  {
    id: 'lex-2',
    primaryText: '\u03B8\u03B5\u03CC\u03C2',
    transliteration: 'theos',
    strongsCodes: ['G2316'],
    glosses: 'God, god, deity',
    occurrenceCount: 45,
  },
  {
    id: 'lex-3',
    primaryText: '\u03BA\u03CC\u03C3\u03BC\u03BF\u03C2',
    transliteration: 'kosmos',
    strongsCodes: ['G2889'],
    glosses: 'world, universe, order',
    occurrenceCount: 17,
  },
  {
    id: 'lex-4',
    primaryText: '\u03C6\u1FF6\u03C2',
    transliteration: 'phos',
    strongsCodes: ['G5457'],
    glosses: 'light, radiance',
    occurrenceCount: 9,
  },
  {
    id: 'lex-5',
    primaryText: '\u03B6\u03C9\u03AE',
    transliteration: 'zoe',
    strongsCodes: ['G2222'],
    glosses: 'life, living',
    occurrenceCount: 11,
  },
];

// ---------------------------------------------------------------------------
// Detail content renderers
// ---------------------------------------------------------------------------

/** ER Dictionary entry detail - matches the PT9 screenshot layout with shadcn styling */
function ErDictionaryDetail({
  item,
  onClose,
  onDomainClick,
}: {
  item: DictionaryEntryWithSenses;
  onClose: () => void;
  onDomainClick?: (domain: EntryDomain) => void;
}) {
  return (
    <div>
      <Button onClick={onClose} variant="link" className="tw-mb-3 tw-h-auto tw-p-0">
        <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
        Back to list
      </Button>

      {/* Header: source language text + transliteration */}
      <div className="tw-mb-4">
        <span className="tw-text-lg tw-font-normal">{item.sourceLanguageText}</span>
        {item.transliteration && (
          <span className="tw-ml-1 tw-text-base tw-text-muted-foreground">
            ({item.transliteration})
          </span>
        )}
      </div>

      {/* Senses */}
      <div className="tw-space-y-4">
        {item.senses.map((sense) => (
          <div key={sense.number} className="tw-pl-1">
            <p className="tw-text-sm">
              <span className="tw-mr-2 tw-font-bold tw-text-primary">{sense.number}</span>
              <span>{sense.definition}</span>
              <span className="tw-ml-1 tw-text-muted-foreground">({sense.occurrenceCount})</span>
            </p>
            <p className="tw-mt-0.5 tw-pl-5 tw-text-sm tw-text-muted-foreground">
              Glosses: <span className="tw-italic">{sense.glosses}</span>
            </p>
            <p className="tw-pl-5 tw-text-sm tw-text-muted-foreground">
              Domain:{' '}
              <Button
                variant="link"
                className="tw-h-auto tw-p-0 tw-text-sm tw-italic tw-underline"
                onClick={() => onDomainClick?.(sense.domain)}
              >
                {sense.domain.label}
              </Button>
            </p>
          </div>
        ))}
      </div>

      <Separator className="tw-my-3" />

      {/* Occurrences */}
      <p className="tw-text-sm">
        Occurrences in all books{' '}
        <span className="tw-text-muted-foreground">({item.totalOccurrences})</span>
      </p>
    </div>
  );
}

/** Encyclopedia detail */
function EncyclopediaDetail({ item, onClose }: { item: EncyclopediaTeaser; onClose: () => void }) {
  return (
    <div>
      <Button onClick={onClose} variant="link" className="tw-mb-3 tw-h-auto tw-p-0">
        <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
        Back to list
      </Button>
      <h2 className="tw-mb-1 tw-text-xl tw-font-normal">{item.primaryText}</h2>
      {item.sourceLanguageText && (
        <p className="tw-text-sm tw-text-muted-foreground">
          {item.sourceLanguageText}
          {item.transliteration && <span className="tw-ml-1">({item.transliteration})</span>}
        </p>
      )}
      <Separator className="tw-my-3" />
      <p className="tw-text-sm">{item.teaserText}</p>
    </div>
  );
}

/** Media detail */
function MediaDetail({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  return (
    <div>
      <Button onClick={onClose} variant="link" className="tw-mb-3 tw-h-auto tw-p-0">
        <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
        Back to list
      </Button>
      <div className="tw-mb-3 tw-flex tw-items-center tw-gap-2">
        <h2 className="tw-text-lg tw-font-normal">{item.primaryText}</h2>
        <Badge variant="outline">{item.mediaType}</Badge>
      </div>
      {item.thumbnailUrl && (
        <img
          src={item.thumbnailUrl}
          alt={item.thumbnailAlt ?? item.primaryText}
          className="tw-mb-3 tw-w-full tw-rounded tw-object-contain"
        />
      )}
      {item.caption && <p className="tw-text-sm tw-text-muted-foreground">{item.caption}</p>}
    </div>
  );
}

/** Lexical dictionary detail (extracted from platform-lexical-tools pattern) */
function LexicalDetail({ item, onClose }: { item: LexicalDictionaryEntry; onClose: () => void }) {
  return (
    <div>
      <Button onClick={onClose} variant="link" className="tw-mb-3 tw-h-auto tw-p-0">
        <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
        Back to list
      </Button>
      <div className="tw-mb-3">
        <span className="scripture-font tw-text-2xl tw-font-normal">{item.primaryText}</span>
        <span className="tw-ml-2 tw-text-lg tw-text-muted-foreground">{item.glosses}</span>
      </div>
      <div className="tw-flex tw-gap-1">
        {item.strongsCodes.map((code) => (
          <span key={code} className="tw-rounded tw-bg-accent tw-px-2 tw-py-0.5 tw-text-sm">
            {code}
          </span>
        ))}
      </div>
      <Separator className="tw-my-3" />
      <p className="tw-text-sm">
        Occurrences <span className="tw-text-muted-foreground">({item.occurrenceCount})</span>
      </p>
      <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">
        Scripture references would appear here.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ER dictionary list item with full 2-row content (kept at this height always)
// ---------------------------------------------------------------------------

function ErDictionaryListItem({ item }: { item: DictionaryEntryWithSenses }) {
  const firstSense = item.senses[0];
  return (
    <div className="tw-flex tw-w-full tw-flex-col tw-gap-0.5">
      <div className="tw-flex tw-items-baseline tw-gap-2">
        <span className="tw-text-sm tw-font-medium">{item.primaryText}</span>
        <span className="tw-text-sm tw-text-muted-foreground">
          {item.sourceLanguageText}
          {item.transliteration && <span className="tw-ml-1">({item.transliteration})</span>}
        </span>
        <span className="tw-ml-auto tw-shrink-0 tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs">
          {item.totalOccurrences}
        </span>
      </div>
      <p className="tw-truncate tw-text-sm tw-text-muted-foreground">
        {firstSense?.glosses}
        {item.senses.length > 1 && ` (+${item.senses.length - 1} more)`}
      </p>
    </div>
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
          'Base SourceLanguageIndexedList without a detail panel. Clicking items toggles selection.',
      },
    },
  },
};

/** Loading state */
export const Loading: Story = {
  render: () => (
    <div className="tw-h-[400px] tw-rounded tw-border">
      <SourceLanguageIndexedList items={[]} isLoading />
    </div>
  ),
};

/** Empty state */
export const EmptyState: Story = {
  render: () => (
    <div className="tw-h-[400px] tw-rounded tw-border">
      <SourceLanguageIndexedList items={[]} emptyStateMessage="No entries found for this scope" />
    </div>
  ),
};

/**
 * All ER tabs with inline panel detail view and inline domain navigation. This is the primary
 * layout showing Dictionary, Encyclopedia, and Media tabs together. Clicking a domain link in the
 * dictionary detail replaces the view inline with a back button.
 */
export const AllErTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<'dictionary' | 'encyclopedia' | 'media'>(
      'dictionary',
    );
    const [selectedDictItem, setSelectedDictItem] = useState<
      DictionaryEntryWithSenses | undefined
    >();
    const [selectedEncItem, setSelectedEncItem] = useState<EncyclopediaTeaser | undefined>();
    const [selectedMediaItem, setSelectedMediaItem] = useState<MediaItem | undefined>();

    // Inline domain navigation state
    const [activeDomain, setActiveDomain] = useState<
      | {
          level1: SemanticDomain;
          level2?: SemanticDomain;
        }
      | undefined
    >();

    const handleDomainClick = (domain: EntryDomain) => {
      const l1 = sampleAllDomains.find(
        (d) => d.id === domain.id || d.children?.some((c) => c.id === domain.id),
      );
      if (l1) {
        setActiveDomain({ level1: l1, level2: l1.children?.find((c) => c.id === domain.id) });
        setSelectedDictItem(undefined);
      }
    };

    return (
      <div className="tw-flex tw-h-[550px] tw-flex-col tw-rounded tw-border">
        {/* Tabs */}
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
                setSelectedDictItem(undefined);
                setSelectedEncItem(undefined);
                setSelectedMediaItem(undefined);
                setActiveDomain(undefined);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="tw-flex-1 tw-overflow-hidden">
          {activeTab === 'dictionary' && !activeDomain && (
            <div className="tw-relative tw-flex tw-h-full tw-overflow-hidden">
              {/* List pane */}
              <div
                className={cn('tw-h-full tw-overflow-y-auto tw-border-r', {
                  'tw-w-full': !selectedDictItem,
                  'tw-w-1/5 tw-min-w-[120px]': !!selectedDictItem,
                })}
              >
                <ul role="listbox" className="tw-outline-none">
                  {sampleDictionaryItems.map((item) => {
                    const isSelected = selectedDictItem?.id === item.id;
                    return (
                      <li
                        key={item.id}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => setSelectedDictItem(isSelected ? undefined : item)}
                        className={cn('tw-cursor-pointer tw-border-b tw-p-2', {
                          'tw-bg-muted': isSelected,
                          'hover:tw-bg-muted': !isSelected,
                        })}
                      >
                        <ErDictionaryListItem item={item} />
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* Detail pane */}
              {selectedDictItem && (
                <div className="tw-w-4/5 tw-overflow-y-auto tw-bg-background tw-p-4">
                  <ErDictionaryDetail
                    item={selectedDictItem}
                    onClose={() => setSelectedDictItem(undefined)}
                    onDomainClick={handleDomainClick}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'dictionary' && activeDomain && (
            <ErDictionaryFilteredList
              items={sampleDictionaryItems.filter((entry) =>
                entry.senses.some(
                  (s) =>
                    s.domain.id === activeDomain.level1.id ||
                    s.domain.id === activeDomain.level2?.id ||
                    s.domain.parentId === activeDomain.level1.id,
                ),
              )}
              selectedLevel1Domain={activeDomain.level1}
              selectedLevel2Domain={activeDomain.level2}
              allDomains={sampleAllDomains}
              onDomainChange={(l1, l2) => setActiveDomain({ level1: l1, level2: l2 })}
              onBack={() => setActiveDomain(undefined)}
              renderItem={(item) => <ErDictionaryListItem item={item} />}
              renderDetailContent={(item, onClose) => (
                <ErDictionaryDetail item={item} onClose={onClose} />
              )}
              className="tw-h-full"
            />
          )}

          {activeTab === 'encyclopedia' && (
            <div className="tw-relative tw-flex tw-h-full tw-overflow-hidden">
              <div
                className={cn('tw-h-full tw-overflow-y-auto tw-border-r', {
                  'tw-w-full': !selectedEncItem,
                  'tw-w-1/5 tw-min-w-[120px]': !!selectedEncItem,
                })}
              >
                <ul role="listbox" className="tw-outline-none">
                  {sampleEncyclopediaItems.map((item) => {
                    const isSelected = selectedEncItem?.id === item.id;
                    return (
                      <li
                        key={item.id}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => setSelectedEncItem(isSelected ? undefined : item)}
                        className={cn('tw-cursor-pointer tw-border-b tw-p-2', {
                          'tw-bg-muted': isSelected,
                          'hover:tw-bg-muted': !isSelected,
                        })}
                      >
                        <div className="tw-flex tw-flex-col tw-gap-0.5">
                          <span className="tw-text-sm tw-font-medium">{item.primaryText}</span>
                          <span className="tw-truncate tw-text-xs tw-text-muted-foreground">
                            {item.teaserText}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {selectedEncItem && (
                <div className="tw-w-4/5 tw-overflow-y-auto tw-bg-background tw-p-4">
                  <EncyclopediaDetail
                    item={selectedEncItem}
                    onClose={() => setSelectedEncItem(undefined)}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'media' && (
            <div className="tw-relative tw-flex tw-h-full tw-overflow-hidden">
              <div
                className={cn('tw-h-full tw-overflow-y-auto tw-border-r', {
                  'tw-w-full': !selectedMediaItem,
                  'tw-w-1/5 tw-min-w-[120px]': !!selectedMediaItem,
                })}
              >
                <ul role="listbox" className="tw-outline-none">
                  {sampleMediaItems.map((item) => {
                    const isSelected = selectedMediaItem?.id === item.id;
                    return (
                      <li
                        key={item.id}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => setSelectedMediaItem(isSelected ? undefined : item)}
                        className={cn(
                          'tw-flex tw-cursor-pointer tw-items-center tw-gap-2 tw-border-b tw-p-2',
                          { 'tw-bg-muted': isSelected, 'hover:tw-bg-muted': !isSelected },
                        )}
                      >
                        {item.thumbnailUrl && (
                          <img
                            src={item.thumbnailUrl}
                            alt={item.primaryText}
                            className="tw-h-10 tw-w-10 tw-rounded tw-object-cover"
                          />
                        )}
                        <div className="tw-flex tw-flex-col tw-gap-0.5">
                          <span className="tw-text-sm tw-font-medium">{item.primaryText}</span>
                          <Badge variant="outline" className="tw-w-fit tw-text-xs">
                            {item.mediaType}
                          </Badge>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {selectedMediaItem && (
                <div className="tw-w-4/5 tw-overflow-y-auto tw-bg-background tw-p-4">
                  <MediaDetail
                    item={selectedMediaItem}
                    onClose={() => setSelectedMediaItem(undefined)}
                  />
                </div>
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
          'All ER tabs combined with inline panel detail views and inline domain navigation. Dictionary entries open a detail panel matching the PT9 screenshot layout. Domain links replace the dictionary view inline with breadcrumb navigation and a back arrow.',
      },
    },
  },
};

/** ER Dictionary filtered by domain - standalone view with breadcrumbs, dropdowns, and tree */
export const ErDictionaryFilteredByDomain: Story = {
  render: () => {
    const [selectedL1, setSelectedL1] = useState(sampleAllDomains[0]);
    const [selectedL2, setSelectedL2] = useState<SemanticDomain | undefined>(
      sampleAllDomains[0].children?.[0],
    );

    return (
      <div className="tw-h-[500px] tw-rounded tw-border">
        <ErDictionaryFilteredList
          items={sampleDictionaryItems}
          selectedLevel1Domain={selectedL1}
          selectedLevel2Domain={selectedL2}
          allDomains={sampleAllDomains}
          onDomainChange={(l1, l2) => {
            setSelectedL1(l1);
            setSelectedL2(l2);
          }}
          renderItem={(item) => <ErDictionaryListItem item={item} />}
          renderDetailContent={(item, onClose) => (
            <ErDictionaryDetail item={item} onClose={onClose} />
          )}
          className="tw-h-full"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dictionary filtered by semantic domain. Breadcrumbs use dot separator with dropdown navigation. Tree button (right-aligned) opens the full domain tree in a scoped drawer.',
      },
    },
  },
};

/**
 * Lexical extension dictionary with inline panel detail view. Shows entries with source language
 * lemma, occurrence count, glosses, and Strong's codes. Clicking an entry opens a detail panel.
 */
export const LexicalDictionary: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState<LexicalDictionaryEntry | undefined>();

    return (
      <div className="tw-h-[500px] tw-rounded tw-border">
        <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">
          Lexical Dictionary
        </h3>
        <div className="tw-relative tw-flex tw-h-[calc(100%-41px)] tw-overflow-hidden">
          <div
            className={cn('tw-h-full tw-overflow-y-auto', {
              'tw-w-full': !selectedItem,
              'tw-w-1/5 tw-min-w-[80px] tw-border-r': !!selectedItem,
            })}
          >
            <LexicalDictionaryList
              items={sampleLexicalEntries}
              onItemClick={(item) =>
                setSelectedItem(item.id === selectedItem?.id ? undefined : item)
              }
              selectedItemId={selectedItem?.id}
              occurrenceCountLabel="Occurrences in chapter"
              strongsCodeLabel="Strong's code"
            />
          </div>
          {selectedItem && (
            <div className="tw-w-4/5 tw-overflow-y-auto tw-bg-background tw-p-4">
              <LexicalDetail item={selectedItem} onClose={() => setSelectedItem(undefined)} />
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
          "Lexical extension dictionary with inline panel. Shows entries with source language lemma, occurrence count, glosses, and Strong's codes. Clicking an entry opens a detail panel extracted from the platform-lexical-tools extension.",
      },
    },
  },
};

/** ER Encyclopedia list with inline panel */
export const ErEncyclopedia: Story = {
  render: () => (
    <div className="tw-h-[500px] tw-rounded tw-border">
      <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">Encyclopedia</h3>
      <ErEncyclopediaList
        items={sampleEncyclopediaItems}
        showSourceLanguage
        showTransliteration
        renderDetailContent={(item, onClose) => (
          <EncyclopediaDetail item={item} onClose={onClose} />
        )}
      />
    </div>
  ),
};

/** ER Media list with inline panel */
export const ErMedia: Story = {
  render: () => (
    <div className="tw-h-[500px] tw-rounded tw-border">
      <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">
        Media (Images &amp; Maps)
      </h3>
      <ErMediaList
        items={sampleMediaItems}
        showSourceLanguage
        renderDetailContent={(item, onClose) => <MediaDetail item={item} onClose={onClose} />}
      />
    </div>
  ),
};
