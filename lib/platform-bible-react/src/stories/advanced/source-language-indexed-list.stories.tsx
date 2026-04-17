import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '@/components/shadcn-ui/button';
import { Separator } from '@/components/shadcn-ui/separator';
import { Badge } from '@/components/shadcn-ui/badge';
import ComboBox from '@/components/basics/combo-box.component';
import { Drawer, DrawerContent } from '@/components/shadcn-ui/drawer';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import SourceLanguageIndexedList from '@/components/advanced/source-language-indexed-list/source-language-indexed-list.component';
import ErDictionaryFilteredList from '@/components/advanced/source-language-indexed-list/er-dictionary-filtered-list.component';
import type {
  IndexedListItem,
  EncyclopediaTeaser,
  MediaItem,
  LexicalDictionaryEntry,
  SemanticDomain,
  EntryDomain,
} from '@/components/advanced/source-language-indexed-list/source-language-indexed-list.types';

// ---------------------------------------------------------------------------
// Domain data (5 levels deep)
// ---------------------------------------------------------------------------

const sampleAllDomains: SemanticDomain[] = [
  {
    id: 'exist',
    label: 'Exist',
    children: [
      {
        id: 'exist-create',
        label: 'Create',
        children: [
          {
            id: 'exist-create-divine',
            label: 'Divine Creation',
            children: [
              {
                id: 'exist-create-divine-world',
                label: 'World & Cosmos',
                children: [{ id: 'exist-create-divine-world-earth', label: 'Earth & Land' }],
              },
              { id: 'exist-create-divine-life', label: 'Living Beings' },
            ],
          },
          { id: 'exist-create-human', label: 'Human Making' },
        ],
      },
      { id: 'exist-destroy', label: 'Destroy' },
      { id: 'exist-change', label: 'Change State' },
    ],
  },
  {
    id: 'happen',
    label: 'Happen',
    children: [
      {
        id: 'happen-cause',
        label: 'Cause',
        children: [
          { id: 'happen-cause-direct', label: 'Direct Causation' },
          { id: 'happen-cause-indirect', label: 'Indirect Causation' },
        ],
      },
      { id: 'happen-prevent', label: 'Prevent' },
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    children: [
      {
        id: 'speak',
        label: 'Speak & Proclaim',
        children: [
          { id: 'speak-public', label: 'Public Speech' },
          { id: 'speak-private', label: 'Private Speech' },
        ],
      },
      { id: 'write', label: 'Write & Inscribe' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Flatten domains for combobox
// ---------------------------------------------------------------------------

type FlatDomain = { path: SemanticDomain[]; label: string };

function flattenDomains(
  domains: SemanticDomain[],
  parentPath: SemanticDomain[] = [],
): FlatDomain[] {
  const result: FlatDomain[] = [];
  for (const domain of domains) {
    const path = [...parentPath, domain];
    result.push({ path, label: path.map((d) => d.label).join(' > ') });
    if (domain.children) {
      result.push(...flattenDomains(domain.children, path));
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Sense / entry types
// ---------------------------------------------------------------------------

type DictionarySense = {
  number: number;
  definition: string;
  occurrenceCount: number;
  glosses: string;
  domain: EntryDomain;
  domainPath?: string[];
};

type DictionaryEntryWithSenses = IndexedListItem & {
  senses: DictionarySense[];
  totalOccurrences: number;
};

type LexicalSense = {
  id: string;
  glosses: string[];
  definition?: string;
  domains: { taxonomy: string; code: string; label?: string }[];
};

type LexicalEntryFull = LexicalDictionaryEntry & {
  senses: LexicalSense[];
  chapterOccurrences: { ref: string }[];
  allOccurrences: { ref: string }[];
};

// ---------------------------------------------------------------------------
// Sample ER dictionary items
// ---------------------------------------------------------------------------

const sampleDictionaryItems: DictionaryEntryWithSenses[] = [
  {
    id: 'entry-bara',
    primaryText: 'create, bring forth',
    sourceLanguageText: '\u05D1\u05B8\u05BC\u05E8\u05B8\u05D0',
    transliteration: 'br\u02BE',
    senses: [
      {
        number: 1,
        definition:
          'causative action by which a deity brings to existence something that did not exist before.',
        occurrenceCount: 41,
        glosses: 'to create',
        domain: { id: 'exist-create-divine-world-earth', label: 'Earth & Land', code: '1.0' },
        domainPath: [
          'exist',
          'exist-create',
          'exist-create-divine',
          'exist-create-divine-world',
          'exist-create-divine-world-earth',
        ],
      },
      {
        number: 2,
        definition:
          'causative action by which a deity causes something to happen that did not happen before.',
        occurrenceCount: 7,
        glosses: 'to create (an event); to cause to happen',
        domain: { id: 'happen-cause-direct', label: 'Direct Causation', code: '2.0' },
        domainPath: ['happen', 'happen-cause', 'happen-cause-direct'],
      },
    ],
    totalOccurrences: 48,
  },
  {
    id: 'entry-amar',
    primaryText: 'say, speak, declare',
    sourceLanguageText: '\u05D0\u05B8\u05DE\u05B7\u05E8',
    transliteration: '\u02BEmr',
    senses: [
      {
        number: 1,
        definition: 'to utter words or speech; to communicate verbally.',
        occurrenceCount: 523,
        glosses: 'to say, to speak, to tell',
        domain: { id: 'speak-public', label: 'Public Speech', code: '4.1' },
        domainPath: ['communication', 'speak', 'speak-public'],
      },
    ],
    totalOccurrences: 557,
  },
  {
    id: 'entry-asa',
    primaryText: 'make, produce, accomplish',
    sourceLanguageText: '\u05E2\u05B8\u05E9\u05B8\u05C2\u05D4',
    transliteration: '\u02BF\u015Bh',
    senses: [
      {
        number: 1,
        definition: 'to bring something into being by forming, constructing, or producing.',
        occurrenceCount: 412,
        glosses: 'to make, to do, to produce',
        domain: { id: 'exist-create-human', label: 'Human Making', code: '1.1' },
        domainPath: ['exist', 'exist-create', 'exist-create-human'],
      },
    ],
    totalOccurrences: 412,
  },
  {
    id: 'entry-halak',
    primaryText: 'walk, journey, proceed',
    sourceLanguageText: '\u05D4\u05B8\u05DC\u05B7\u05DA\u05B0',
    transliteration: 'hlk',
    senses: [
      {
        number: 1,
        definition: 'to move on foot; to go or travel by walking.',
        occurrenceCount: 198,
        glosses: 'to walk, to go, to travel',
        domain: { id: 'happen-cause-direct', label: 'Direct Causation', code: '2.1' },
        domainPath: ['happen', 'happen-cause', 'happen-cause-direct'],
      },
    ],
    totalOccurrences: 198,
  },
  {
    id: 'entry-shama',
    primaryText: 'hear, listen, obey',
    sourceLanguageText: '\u05E9\u05B8\u05C1\u05DE\u05B7\u05E2',
    transliteration: '\u0161m\u02BF',
    senses: [
      {
        number: 1,
        definition: 'to perceive sound with the ear; to listen attentively and respond.',
        occurrenceCount: 287,
        glosses: 'to hear, to listen, to obey',
        domain: { id: 'speak-public', label: 'Public Speech', code: '4.1' },
        domainPath: ['communication', 'speak', 'speak-public'],
      },
    ],
    totalOccurrences: 287,
  },
];

const sampleEncyclopediaItems: EncyclopediaTeaser[] = [
  {
    id: 'enc-1',
    primaryText: 'Temple of Artemis at Ephesus',
    sourceLanguageText: '\u1F08\u03C1\u03C4\u03B5\u03BC\u03AF\u03C3\u03B9\u03BF\u03BD',
    transliteration: 'Artemision',
    teaserText: 'One of the Seven Wonders of the Ancient World.',
  },
  {
    id: 'enc-2',
    primaryText: 'Corinthian Church Community',
    sourceLanguageText: '\u1F10\u03BA\u03BA\u03BB\u03B7\u03C3\u03AF\u03B1',
    transliteration: 'ekklesia Korinthou',
    teaserText: 'The early Christian community addressed in two Pauline epistles.',
  },
  {
    id: 'enc-3',
    primaryText: 'Rite of Baptismal Purification',
    sourceLanguageText: '\u03B2\u03AC\u03C0\u03C4\u03B9\u03C3\u03BC\u03B1',
    transliteration: 'baptisma',
    teaserText: 'A rite of washing with water as a sign of purification.',
  },
];

const sampleMediaItems: MediaItem[] = [
  {
    id: 'media-1',
    primaryText: 'Map of Ancient Ephesus',
    thumbnailUrl: 'https://placehold.co/200x200/e2e8f0/64748b?text=Map',
    mediaType: 'map',
    caption: 'City plan showing the harbor and Temple of Artemis',
  },
  {
    id: 'media-2',
    primaryText: 'Theater at Ephesus',
    thumbnailUrl: 'https://placehold.co/200x200/e2e8f0/64748b?text=Photo',
    mediaType: 'image',
    caption: 'The Great Theater',
  },
];

const sampleLexicalEntries: LexicalEntryFull[] = [
  {
    id: 'lex-1',
    primaryText: '\u03BB\u03CC\u03B3\u03BF\u03C2',
    transliteration: 'logos',
    strongsCodes: ['G3056'],
    glosses: 'word, speech, message, reason',
    occurrenceCount: 23,
    senses: [
      {
        id: 's1',
        glosses: ['word', 'message'],
        definition: 'A meaningful unit of language.',
        domains: [{ taxonomy: 'SDBG-Lexical', code: '33.A', label: 'Communication' }],
      },
      {
        id: 's2',
        glosses: ['reason', 'account'],
        definition: 'The rational faculty.',
        domains: [{ taxonomy: 'SDBG-Contextual', code: '32.B', label: 'Thought' }],
      },
    ],
    chapterOccurrences: [{ ref: 'John 1:1' }, { ref: 'John 1:14' }],
    allOccurrences: Array.from({ length: 23 }, (_, i) => ({ ref: `Ref ${i + 1}` })),
  },
  {
    id: 'lex-2',
    primaryText: '\u03B8\u03B5\u03CC\u03C2',
    transliteration: 'theos',
    strongsCodes: ['G2316'],
    glosses: 'God, god, deity',
    occurrenceCount: 45,
    senses: [
      {
        id: 's1',
        glosses: ['God'],
        definition: 'The supreme deity.',
        domains: [{ taxonomy: 'SDBG-Lexical', code: '12.A', label: 'Supernatural' }],
      },
    ],
    chapterOccurrences: [{ ref: 'John 1:1' }, { ref: 'John 1:2' }, { ref: 'John 1:6' }],
    allOccurrences: Array.from({ length: 45 }, (_, i) => ({ ref: `Ref ${i + 1}` })),
  },
  {
    id: 'lex-3',
    primaryText: '\u03C6\u1FF6\u03C2',
    transliteration: 'phos',
    strongsCodes: ['G5457'],
    glosses: 'light, radiance',
    occurrenceCount: 9,
    senses: [
      {
        id: 's1',
        glosses: ['light', 'radiance'],
        definition: 'Natural agent that makes things visible.',
        domains: [{ taxonomy: 'SDBG-Lexical', code: '14.A', label: 'Physical' }],
      },
    ],
    chapterOccurrences: [{ ref: 'John 1:4' }, { ref: 'John 1:5' }, { ref: 'John 1:7' }],
    allOccurrences: Array.from({ length: 9 }, (_, i) => ({ ref: `Ref ${i + 1}` })),
  },
  {
    id: 'lex-4',
    primaryText: '\u03B6\u03C9\u03AE',
    transliteration: 'zoe',
    strongsCodes: ['G2222'],
    glosses: 'life, living',
    occurrenceCount: 11,
    senses: [
      {
        id: 's1',
        glosses: ['life', 'living'],
        definition: 'The state of being alive.',
        domains: [{ taxonomy: 'SDBG-Lexical', code: '23.A', label: 'Physiological' }],
      },
    ],
    chapterOccurrences: [{ ref: 'John 1:4' }],
    allOccurrences: Array.from({ length: 11 }, (_, i) => ({ ref: `Ref ${i + 1}` })),
  },
];

// ---------------------------------------------------------------------------
// List item renderers (always 2 lines, no wrap, no horizontal overflow)
// ---------------------------------------------------------------------------

function ErDictListItem({
  item,
  compact = false,
}: {
  item: DictionaryEntryWithSenses;
  compact?: boolean;
}) {
  const firstSense = item.senses[0];
  return (
    <div className="tw-flex tw-w-full tw-flex-col tw-gap-0.5 tw-overflow-hidden">
      <div className="tw-flex tw-items-baseline tw-gap-2 tw-overflow-hidden">
        <span className="tw-shrink-0 tw-text-sm tw-font-medium">{item.primaryText}</span>
        <span className="tw-truncate tw-text-sm tw-text-muted-foreground">
          {item.sourceLanguageText}
          {item.transliteration && <span className="tw-ml-1">({item.transliteration})</span>}
        </span>
        {!compact && (
          <span className="tw-ml-auto tw-shrink-0 tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs">
            {item.totalOccurrences}
          </span>
        )}
      </div>
      <p className="tw-truncate tw-text-sm tw-text-muted-foreground">
        {firstSense?.glosses}
        {item.senses.length > 1 && ` (+${item.senses.length - 1} more)`}
      </p>
    </div>
  );
}

function LexicalListItem({ item, compact = false }: { item: LexicalEntryFull; compact?: boolean }) {
  return (
    <div className="tw-flex tw-w-full tw-flex-col tw-gap-0.5 tw-overflow-hidden">
      <div className="tw-flex tw-items-baseline tw-gap-2 tw-overflow-hidden">
        <span className="scripture-font tw-shrink-0 tw-text-sm">{item.primaryText}</span>
        {!compact && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="tw-ml-auto tw-shrink-0 tw-cursor-help tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs">
                  {item.occurrenceCount}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Occurrences in chapter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="tw-flex tw-items-center tw-gap-2 tw-overflow-hidden">
        <p className="tw-truncate tw-text-sm tw-text-muted-foreground">{item.glosses}</p>
        {!compact &&
          item.strongsCodes.map((code) => (
            <span
              key={code}
              className="tw-shrink-0 tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs"
            >
              {code}
            </span>
          ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Detail renderers
// ---------------------------------------------------------------------------

function ErDictionaryDetail({
  item,
  onClose,
  onDomainClick,
}: {
  item: DictionaryEntryWithSenses;
  onClose: () => void;
  onDomainClick?: (domain: EntryDomain, domainPath?: string[]) => void;
}) {
  return (
    <div>
      <Button onClick={onClose} variant="ghost" size="sm" className="tw-mb-3">
        <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
        Back to list
      </Button>
      <div className="tw-mb-4">
        <span className="tw-text-lg">{item.sourceLanguageText}</span>
        {item.transliteration && (
          <span className="tw-ml-1 tw-text-base tw-text-muted-foreground">
            ({item.transliteration})
          </span>
        )}
      </div>
      <div className="tw-space-y-4">
        {item.senses.map((sense) => (
          <div key={sense.number} className="tw-pl-1">
            <p className="tw-text-sm">
              <span className="tw-mr-2 tw-font-bold tw-text-primary">{sense.number}</span>
              {sense.definition}{' '}
              <button
                type="button"
                className="tw-cursor-pointer tw-text-muted-foreground tw-underline"
                onClick={() => {}}
              >
                ({sense.occurrenceCount})
              </button>
            </p>
            <p className="tw-mt-0.5 tw-pl-5 tw-text-sm tw-text-muted-foreground">
              Glosses: <span className="tw-italic">{sense.glosses}</span>
            </p>
            <p className="tw-pl-5 tw-text-sm tw-text-muted-foreground">
              Domain:{' '}
              <Button
                variant="link"
                className="tw-h-auto tw-p-0 tw-text-sm tw-italic tw-underline"
                onClick={() => onDomainClick?.(sense.domain, sense.domainPath)}
              >
                {sense.domain.label}
              </Button>
            </p>
          </div>
        ))}
      </div>
      <Separator className="tw-my-3" />
      <p className="tw-text-sm">
        Occurrences in all books{' '}
        <button
          type="button"
          className="tw-cursor-pointer tw-text-muted-foreground tw-underline"
          onClick={() => {}}
        >
          ({item.totalOccurrences})
        </button>
      </p>
    </div>
  );
}

function LexicalDetail({ item, onClose }: { item: LexicalEntryFull; onClose: () => void }) {
  const [selectedSenseId, setSelectedSenseId] = useState<string | undefined>(
    item.senses.length === 1 ? item.senses[0].id : undefined,
  );
  const [occView, setOccView] = useState<'chapter' | 'all'>('chapter');
  const occs = occView === 'chapter' ? item.chapterOccurrences : item.allOccurrences;

  return (
    <div>
      <Button onClick={onClose} variant="ghost" size="sm" className="tw-mb-3">
        <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
        Back to list
      </Button>
      <div className="tw-mb-3 tw-flex tw-items-baseline tw-justify-between tw-gap-2">
        <span className="tw-flex tw-items-baseline tw-gap-2">
          <span className="scripture-font tw-text-2xl">{item.primaryText}</span>
          <span className="tw-text-lg tw-text-muted-foreground">{item.glosses}</span>
        </span>
        <div className="tw-flex tw-gap-1">
          {item.strongsCodes.map((c) => (
            <span key={c} className="tw-rounded tw-bg-accent tw-px-2 tw-py-0.5 tw-text-sm">
              {c}
            </span>
          ))}
        </div>
      </div>
      <Separator className="tw-my-3" />
      <h3 className="tw-mb-1 tw-font-semibold">Senses</h3>
      <div className="tw-flex tw-flex-col tw-gap-3">
        {item.senses.map((sense, idx) => (
          <button
            key={sense.id}
            type="button"
            onClick={() => setSelectedSenseId(selectedSenseId === sense.id ? undefined : sense.id)}
            className={cn(
              'tw-flex tw-w-full tw-flex-col tw-items-start tw-rounded-lg tw-border tw-p-3 tw-text-left tw-shadow-sm tw-transition-colors',
              selectedSenseId === sense.id
                ? 'tw-border-accent tw-shadow-md'
                : 'hover:tw-border-accent',
            )}
          >
            <div className="tw-flex tw-items-baseline tw-gap-2">
              <span className="tw-font-bold tw-text-accent-foreground">{idx + 1}</span>
              <span className="tw-text-sm">{sense.glosses.join(', ')}</span>
            </div>
            {sense.definition && (
              <p className="tw-mt-1 tw-text-sm tw-text-muted-foreground">{sense.definition}</p>
            )}
            {sense.domains.length > 0 && (
              <div className="tw-mt-2 tw-flex tw-flex-wrap tw-gap-1">
                {sense.domains.map((d) => (
                  <span
                    key={d.code}
                    className="tw-rounded tw-bg-accent tw-px-2 tw-py-0.5 tw-text-xs"
                  >
                    {d.code} {d.label ?? ''}
                  </span>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>
      <Separator className="tw-my-3" />
      <div className="tw-mb-2 tw-flex tw-items-center tw-justify-between">
        <h3 className="tw-font-semibold">Occurrences</h3>
        <div className="tw-flex tw-rounded-md tw-border">
          <button
            type="button"
            className={cn(
              'tw-rounded-s-md tw-px-3 tw-py-1 tw-text-xs',
              occView === 'chapter' ? 'tw-bg-accent' : 'hover:tw-bg-accent',
            )}
            onClick={() => setOccView('chapter')}
          >
            Chapter ({item.chapterOccurrences.length})
          </button>
          <button
            type="button"
            className={cn(
              'tw-rounded-e-md tw-px-3 tw-py-1 tw-text-xs',
              occView === 'all' ? 'tw-bg-accent' : 'hover:tw-bg-accent',
            )}
            onClick={() => setOccView('all')}
          >
            All ({item.allOccurrences.length})
          </button>
        </div>
      </div>
      <ul className="tw-list-inside tw-list-disc">
        {occs.map((o) => (
          <li key={o.ref} className="tw-py-0.5">
            <Button variant="link" className="tw-h-auto tw-p-0">
              {o.ref}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EncyclopediaDetail({ item, onClose }: { item: EncyclopediaTeaser; onClose: () => void }) {
  return (
    <div>
      <Button onClick={onClose} variant="ghost" size="sm" className="tw-mb-3">
        <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
        Back to list
      </Button>
      <h2 className="tw-mb-1 tw-text-xl">{item.primaryText}</h2>
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

function MediaDetail({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  return (
    <div>
      <Button onClick={onClose} variant="ghost" size="sm" className="tw-mb-3">
        <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
        Back to list
      </Button>
      <div className="tw-mb-3 tw-flex tw-items-center tw-gap-2">
        <h2 className="tw-text-lg">{item.primaryText}</h2>
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

// ---------------------------------------------------------------------------
// Generic inline list+detail layout with responsive breakpoint
// ---------------------------------------------------------------------------

function InlineListDetail<T extends { id: string }>({
  items,
  selectedItem,
  onSelectItem,
  renderListItem,
  renderDetail,
}: {
  items: T[];
  selectedItem: T | undefined;
  onSelectItem: (item: T | undefined) => void;
  renderListItem: (item: T, compact: boolean) => React.ReactNode;
  renderDetail: (item: T) => React.ReactNode;
}) {
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      setNarrow((entry?.contentRect.width ?? 0) < 350);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showSideBySide = selectedItem && !narrow;
  const showFullDetail = selectedItem && narrow;

  return (
    <div ref={containerRef} className="tw-relative tw-flex tw-h-full tw-overflow-hidden">
      {/* List pane: hidden overflow (no scroll) when detail is shown side-by-side, full-width scroll when alone */}
      {!showFullDetail && (
        <div
          className={cn(
            'tw-h-full',
            showSideBySide
              ? 'tw-w-1/3 tw-min-w-[120px] tw-overflow-hidden tw-border-r'
              : 'tw-w-full tw-overflow-y-auto',
          )}
        >
          <ul role="listbox" className="tw-outline-none">
            {items.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <li
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => onSelectItem(isSelected ? undefined : item)}
                  className={cn('tw-cursor-pointer tw-border-b tw-p-2', {
                    'tw-bg-muted': isSelected,
                    'hover:tw-bg-muted': !isSelected,
                  })}
                >
                  {renderListItem(item, !!selectedItem)}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {/* Detail pane */}
      {selectedItem && (
        <div
          className={cn(
            'tw-overflow-y-auto tw-bg-background tw-p-4',
            showFullDetail ? 'tw-w-full' : 'tw-w-2/3',
          )}
        >
          {renderDetail(selectedItem)}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Story meta (full width - no max-w-2xl constraint)
// ---------------------------------------------------------------------------

const meta: Meta<typeof SourceLanguageIndexedList> = {
  title: 'Advanced/SourceLanguageIndexedList',
  component: SourceLanguageIndexedList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-p-4">
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
};

export const Loading: Story = {
  render: () => (
    <div className="tw-h-[400px] tw-rounded tw-border">
      <SourceLanguageIndexedList items={[]} isLoading />
    </div>
  ),
};
export const EmptyState: Story = {
  render: () => (
    <div className="tw-h-[400px] tw-rounded tw-border">
      <SourceLanguageIndexedList items={[]} emptyStateMessage="No entries found" />
    </div>
  ),
};

/**
 * All ER tabs with inline panel detail views. Domain links open a bottom Drawer containing the
 * domain-filtered list with breadcrumb navigation. Interaction works while details are shown:
 * selecting entries, clicking close, breadcrumbs, and domain links all remain functional.
 */
export const AllErTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<'dictionary' | 'encyclopedia' | 'media'>(
      'dictionary',
    );
    const [selectedDict, setSelectedDict] = useState<DictionaryEntryWithSenses | undefined>();
    const [selectedEnc, setSelectedEnc] = useState<EncyclopediaTeaser | undefined>();
    const [selectedMedia, setSelectedMedia] = useState<MediaItem | undefined>();
    const [domainPath, setDomainPath] = useState<SemanticDomain[] | undefined>();
    // eslint-disable-next-line no-null/no-null
    const tabContentRef = useRef<HTMLDivElement>(null);

    const resolveDomainPath = useCallback((pathIds: string[]): SemanticDomain[] => {
      return pathIds.reduce<SemanticDomain[]>((acc, id) => {
        const parent = acc.length === 0 ? sampleAllDomains : (acc[acc.length - 1].children ?? []);
        const found = parent.find((d) => d.id === id);
        if (found) acc.push(found);
        return acc;
      }, []);
    }, []);

    const handleDomainClick = useCallback(
      (_domain: EntryDomain, pathIds?: string[]) => {
        if (pathIds) {
          const path = resolveDomainPath(pathIds);
          if (path.length > 0) setDomainPath(path);
        }
      },
      [resolveDomainPath],
    );

    // Domain click from inside the filtered detail view reuses the same handler
    const handleDomainClickInFiltered = handleDomainClick;

    return (
      <div className="tw-flex tw-h-[550px] tw-flex-col tw-rounded tw-border">
        <div className="tw-flex tw-border-b">
          {(['dictionary', 'encyclopedia', 'media'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tw-px-4 tw-py-2 tw-text-sm tw-capitalize ${activeTab === tab ? 'tw-border-b-2 tw-border-primary tw-font-medium' : 'tw-text-muted-foreground hover:tw-text-foreground'}`}
              onClick={() => {
                setActiveTab(tab);
                setSelectedDict(undefined);
                setSelectedEnc(undefined);
                setSelectedMedia(undefined);
                setDomainPath(undefined);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div ref={tabContentRef} className="tw-relative tw-flex-1 tw-overflow-hidden">
          {activeTab === 'dictionary' && (
            <InlineListDetail
              items={sampleDictionaryItems}
              selectedItem={selectedDict}
              onSelectItem={setSelectedDict}
              renderListItem={(item, compact) => <ErDictListItem item={item} compact={compact} />}
              renderDetail={(item) => (
                <ErDictionaryDetail
                  item={item}
                  onClose={() => setSelectedDict(undefined)}
                  onDomainClick={handleDomainClick}
                />
              )}
            />
          )}
          {activeTab === 'encyclopedia' && (
            <InlineListDetail
              items={sampleEncyclopediaItems}
              selectedItem={selectedEnc}
              onSelectItem={setSelectedEnc}
              renderListItem={(item) => (
                <div className="tw-flex tw-flex-col tw-gap-0.5 tw-overflow-hidden">
                  <div className="tw-flex tw-items-baseline tw-gap-2 tw-overflow-hidden">
                    <span className="tw-shrink-0 tw-text-sm tw-font-medium">
                      {item.primaryText}
                    </span>
                    <span className="tw-truncate tw-text-sm tw-text-muted-foreground">
                      {item.sourceLanguageText}
                      {item.transliteration && (
                        <span className="tw-ml-1">({item.transliteration})</span>
                      )}
                    </span>
                  </div>
                  <span className="tw-truncate tw-text-xs tw-text-muted-foreground">
                    {item.teaserText}
                  </span>
                </div>
              )}
              renderDetail={(item) => (
                <EncyclopediaDetail item={item} onClose={() => setSelectedEnc(undefined)} />
              )}
            />
          )}
          {activeTab === 'media' && (
            <InlineListDetail
              items={sampleMediaItems}
              selectedItem={selectedMedia}
              onSelectItem={setSelectedMedia}
              renderListItem={(item) => (
                <div className="tw-flex tw-items-center tw-gap-2 tw-overflow-hidden">
                  {item.thumbnailUrl && (
                    <img
                      src={item.thumbnailUrl}
                      alt={item.primaryText}
                      className="tw-h-10 tw-w-10 tw-shrink-0 tw-rounded tw-object-cover"
                    />
                  )}
                  <div className="tw-flex tw-flex-col tw-gap-0.5 tw-overflow-hidden">
                    <span className="tw-truncate tw-text-sm tw-font-medium">
                      {item.primaryText}
                    </span>
                    <Badge variant="outline" className="tw-w-fit tw-text-xs">
                      {item.mediaType}
                    </Badge>
                  </div>
                </div>
              )}
              renderDetail={(item) => (
                <MediaDetail item={item} onClose={() => setSelectedMedia(undefined)} />
              )}
            />
          )}

          {/* Domain-filtered bottom Drawer (slides up, fills full tab height) */}
          {activeTab === 'dictionary' && (
            <Drawer
              direction="bottom"
              modal={false}
              open={domainPath !== undefined}
              onOpenChange={(open) => {
                if (!open) setDomainPath(undefined);
              }}
            >
              <DrawerContent
                container={tabContentRef.current}
                hideDrawerHandle
                className="tw-mt-2 tw-h-full tw-max-h-full"
              >
                {domainPath && (
                  <DomainFilteredView
                    domainPath={domainPath}
                    onDomainChange={setDomainPath}
                    onClose={() => setDomainPath(undefined)}
                    onDomainClick={handleDomainClickInFiltered}
                  />
                )}
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </div>
    );
  },
};

/** Lexical dictionary with full detail (senses, chapter/all occurrences, domains, Strong's codes). */
export const LexicalDictionary: Story = {
  render: () => {
    const [selected, setSelected] = useState<LexicalEntryFull | undefined>();
    return (
      <div className="tw-h-[550px] tw-rounded tw-border">
        <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">
          Lexical Dictionary
        </h3>
        <div className="tw-h-[calc(100%-41px)]">
          <InlineListDetail
            items={sampleLexicalEntries}
            selectedItem={selected}
            onSelectItem={setSelected}
            renderListItem={(item, compact) => <LexicalListItem item={item} compact={compact} />}
            renderDetail={(item) => (
              <LexicalDetail item={item} onClose={() => setSelected(undefined)} />
            )}
          />
        </div>
      </div>
    );
  },
};

/** Alternative: domain selection via ComboBox (searchable) instead of Dialog tree. */
export const DomainComboBoxAlternative: Story = {
  render: () => {
    const flatDomains = useMemo(() => flattenDomains(sampleAllDomains), []);
    const [selectedFlat, setSelectedFlat] = useState<FlatDomain>(flatDomains[0]);
    const [selectedItem, setSelectedItem] = useState<DictionaryEntryWithSenses | undefined>();

    return (
      <div className="tw-flex tw-h-[550px] tw-flex-col tw-rounded tw-border">
        <div className="tw-flex tw-items-center tw-gap-2 tw-border-b tw-px-3 tw-py-2">
          <span className="tw-shrink-0 tw-text-sm tw-font-semibold">Domain:</span>
          <ComboBox
            options={flatDomains}
            value={selectedFlat}
            onChange={(v) => {
              setSelectedFlat(v);
              setSelectedItem(undefined);
            }}
            getOptionLabel={(o) => o.label}
            textPlaceholder="Search domains..."
            buttonPlaceholder="Select a domain"
            buttonVariant="outline"
            buttonClassName="tw-flex-1 tw-justify-start tw-text-sm"
          />
        </div>
        <div className="tw-flex-1 tw-overflow-hidden">
          <InlineListDetail
            items={sampleDictionaryItems}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
            renderListItem={(item, compact) => <ErDictListItem item={item} compact={compact} />}
            renderDetail={(item) => (
              <ErDictionaryDetail item={item} onClose={() => setSelectedItem(undefined)} />
            )}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Alternative domain selection using a searchable ComboBox instead of the tree dialog. Type to filter domains across all levels.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Domain-filtered view used inside the bottom drawer in AllErTabs.
// Uses InlineListDetail so the list, breadcrumbs, close button, and domain
// links all remain interactive while the detail panel is open.
// ---------------------------------------------------------------------------

function DomainFilteredView({
  domainPath,
  onDomainChange,
  onClose,
  onDomainClick,
}: {
  domainPath: SemanticDomain[];
  onDomainChange: (path: SemanticDomain[]) => void;
  onClose: () => void;
  onDomainClick: (domain: EntryDomain, pathIds?: string[]) => void;
}) {
  return (
    <ErDictionaryFilteredList
      items={sampleDictionaryItems}
      domainPath={domainPath}
      allDomains={sampleAllDomains}
      onDomainChange={onDomainChange}
      onClose={onClose}
      renderItem={(item) => <ErDictListItem item={item} />}
      renderDetailContent={(item, onCloseDetail) => (
        <ErDictionaryDetail item={item} onClose={onCloseDetail} onDomainClick={onDomainClick} />
      )}
      className="tw-h-full"
    />
  );
}
