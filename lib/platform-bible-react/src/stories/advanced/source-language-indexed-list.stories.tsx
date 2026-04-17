import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '@/components/shadcn-ui/button';
import { Separator } from '@/components/shadcn-ui/separator';
import { Badge } from '@/components/shadcn-ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/shadcn-ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import SourceLanguageIndexedList from '@/components/advanced/source-language-indexed-list/source-language-indexed-list.component';
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
      { id: 'authority', label: 'Authority & Leadership' },
      { id: 'worship', label: 'Worship & Religion' },
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    children: [
      { id: 'speak', label: 'Speak & Proclaim' },
      { id: 'write', label: 'Write & Inscribe' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Sense / entry types
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
// Sample ER dictionary items (longer words)
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
    primaryText: 'say, speak, declare',
    sourceLanguageText: '\u05D0\u05B8\u05DE\u05B7\u05E8',
    transliteration: '\u02BEmr',
    senses: [
      {
        number: 1,
        definition: 'to utter words or speech; to communicate verbally.',
        occurrenceCount: 523,
        glosses: 'to say, to speak, to tell',
        domain: { id: 'speak', label: 'Speak & Proclaim', parentId: 'communication', code: '4.1' },
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
    primaryText: 'make, produce, accomplish',
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
    primaryText: 'walk, journey, proceed',
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
    primaryText: 'hear, listen, obey',
    sourceLanguageText: '\u05E9\u05B8\u05C1\u05DE\u05B7\u05E2',
    transliteration: '\u0161m\u02BF',
    senses: [
      {
        number: 1,
        definition: 'to perceive sound with the ear; to listen attentively and respond.',
        occurrenceCount: 287,
        glosses: 'to hear, to listen, to obey',
        domain: { id: 'speak', label: 'Speak & Proclaim', parentId: 'communication', code: '4.1' },
      },
    ],
    totalOccurrences: 287,
  },
];

// ---------------------------------------------------------------------------
// Sample encyclopedia items (longer words, with source language)
// ---------------------------------------------------------------------------

const sampleEncyclopediaItems: EncyclopediaTeaser[] = [
  {
    id: 'enc-1',
    primaryText: 'Temple of Artemis at Ephesus',
    sourceLanguageText: '\u1F08\u03C1\u03C4\u03B5\u03BC\u03AF\u03C3\u03B9\u03BF\u03BD',
    transliteration: 'Artemision',
    teaserText:
      'One of the Seven Wonders of the Ancient World, dedicated to the Greek goddess Artemis.',
  },
  {
    id: 'enc-2',
    primaryText: 'Corinthian Church Community',
    sourceLanguageText:
      '\u1F10\u03BA\u03BA\u03BB\u03B7\u03C3\u03AF\u03B1 \u039A\u03BF\u03C1\u03AF\u03BD\u03B8\u03BF\u03C5',
    transliteration: 'ekklesia Korinthou',
    teaserText: 'The early Christian community in Corinth addressed in two Pauline epistles.',
  },
  {
    id: 'enc-3',
    primaryText: 'Rite of Baptismal Purification',
    sourceLanguageText: '\u03B2\u03AC\u03C0\u03C4\u03B9\u03C3\u03BC\u03B1',
    transliteration: 'baptisma',
    teaserText:
      'A rite of washing with water as a sign of religious purification and consecration.',
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
    caption: 'The Great Theater, seating ~25,000 spectators',
  },
];

// ---------------------------------------------------------------------------
// Sample lexical entries (full detail)
// ---------------------------------------------------------------------------

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
        glosses: ['word', 'message', 'statement'],
        definition: 'A meaningful unit of spoken or written language.',
        domains: [{ taxonomy: 'SDBG-Lexical', code: '33.A', label: 'Communication' }],
      },
      {
        id: 's2',
        glosses: ['reason', 'account'],
        definition: 'The rational faculty or principle; explanation.',
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
        glosses: ['God', 'the true God'],
        definition: 'The supreme deity; the creator and ruler of the universe.',
        domains: [{ taxonomy: 'SDBG-Lexical', code: '12.A', label: 'Supernatural' }],
      },
    ],
    chapterOccurrences: [
      { ref: 'John 1:1' },
      { ref: 'John 1:2' },
      { ref: 'John 1:6' },
      { ref: 'John 1:12' },
      { ref: 'John 1:13' },
      { ref: 'John 1:18' },
    ],
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
        glosses: ['light', 'radiance', 'illumination'],
        definition:
          'Natural agent that makes things visible; figuratively, truth or understanding.',
        domains: [{ taxonomy: 'SDBG-Lexical', code: '14.A', label: 'Physical' }],
      },
    ],
    chapterOccurrences: [
      { ref: 'John 1:4' },
      { ref: 'John 1:5' },
      { ref: 'John 1:7' },
      { ref: 'John 1:8' },
      { ref: 'John 1:9' },
    ],
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
        glosses: ['life', 'living', 'existence'],
        definition: 'The state of being alive; vitality. Often refers to eternal life.',
        domains: [{ taxonomy: 'SDBG-Lexical', code: '23.A', label: 'Physiological' }],
      },
    ],
    chapterOccurrences: [{ ref: 'John 1:4' }],
    allOccurrences: Array.from({ length: 11 }, (_, i) => ({ ref: `Ref ${i + 1}` })),
  },
];

// ---------------------------------------------------------------------------
// Shared list item renderers
// ---------------------------------------------------------------------------

/** ER dictionary list item - always 2 rows. Hides occurrence count when `compact`. */
function ErDictListItem({
  item,
  compact = false,
}: {
  item: DictionaryEntryWithSenses;
  compact?: boolean;
}) {
  const firstSense = item.senses[0];
  return (
    <div className="tw-flex tw-w-full tw-flex-col tw-gap-0.5">
      <div className="tw-flex tw-items-baseline tw-gap-2">
        <span className="tw-text-sm tw-font-medium">{item.primaryText}</span>
        <span className="tw-text-sm tw-text-muted-foreground">
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

/** Lexical list item - same padding/border/hover style as ER dictionary */
function LexicalListItem({ item, compact = false }: { item: LexicalEntryFull; compact?: boolean }) {
  return (
    <div className="tw-flex tw-w-full tw-flex-col tw-gap-0.5">
      <div className="tw-flex tw-items-baseline tw-gap-2">
        <span className="scripture-font tw-text-sm">{item.primaryText}</span>
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
// Detail content renderers
// ---------------------------------------------------------------------------

/** ER Dictionary entry detail (PT9 screenshot layout) */
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

      <div className="tw-mb-4">
        <span className="tw-text-lg tw-font-normal">{item.sourceLanguageText}</span>
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
              <span className="tw-text-muted-foreground">({sense.occurrenceCount})</span>
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
      <p className="tw-text-sm">
        Occurrences in all books{' '}
        <span className="tw-text-muted-foreground">({item.totalOccurrences})</span>
      </p>
    </div>
  );
}

/** Full lexical dictionary detail (matching platform-lexical-tools extension) */
function LexicalDetail({ item, onClose }: { item: LexicalEntryFull; onClose: () => void }) {
  const [selectedSenseId, setSelectedSenseId] = useState<string | undefined>(
    item.senses.length === 1 ? item.senses[0].id : undefined,
  );
  const [occurrenceView, setOccurrenceView] = useState<'chapter' | 'all'>('chapter');

  const selectedSense = item.senses.find((s) => s.id === selectedSenseId);
  const occurrences = occurrenceView === 'chapter' ? item.chapterOccurrences : item.allOccurrences;

  return (
    <div>
      <Button onClick={onClose} variant="link" className="tw-mb-3 tw-h-auto tw-p-0">
        <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
        Back to list
      </Button>

      {/* Header */}
      <div className="tw-mb-3">
        <div className="tw-flex tw-items-baseline tw-justify-between tw-gap-2">
          <span className="tw-flex tw-items-baseline tw-gap-2">
            <span className="scripture-font tw-text-2xl tw-font-normal">{item.primaryText}</span>
            <span className="tw-text-lg tw-text-muted-foreground">{item.glosses}</span>
          </span>
          <div className="tw-flex tw-gap-1">
            {item.strongsCodes.map((code) => (
              <span key={code} className="tw-rounded tw-bg-accent tw-px-2 tw-py-0.5 tw-text-sm">
                {code}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Separator className="tw-my-3" />

      {/* Senses */}
      <div className="tw-mb-4">
        <h3 className="tw-mb-1 tw-font-semibold">Senses</h3>
        <div className="tw-flex tw-flex-col tw-gap-3">
          {item.senses.map((sense, idx) => (
            <button
              key={sense.id}
              type="button"
              onClick={() =>
                setSelectedSenseId(selectedSenseId === sense.id ? undefined : sense.id)
              }
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
      </div>

      {/* Occurrences with chapter/all toggle */}
      <div>
        <div className="tw-mb-2 tw-flex tw-items-center tw-justify-between">
          <h3 className="tw-font-semibold">
            {selectedSense ? `Occurrences for sense` : 'All occurrences'}
          </h3>
          <div className="tw-flex tw-items-center tw-gap-0 tw-rounded-md tw-border">
            <button
              type="button"
              className={cn('tw-rounded-s-md tw-px-3 tw-py-1 tw-text-xs', {
                'tw-bg-accent': occurrenceView === 'chapter',
                'hover:tw-bg-accent': occurrenceView !== 'chapter',
              })}
              onClick={() => setOccurrenceView('chapter')}
            >
              Chapter ({item.chapterOccurrences.length})
            </button>
            <button
              type="button"
              className={cn('tw-rounded-e-md tw-px-3 tw-py-1 tw-text-xs', {
                'tw-bg-accent': occurrenceView === 'all',
                'hover:tw-bg-accent': occurrenceView !== 'all',
              })}
              onClick={() => setOccurrenceView('all')}
            >
              All ({item.allOccurrences.length})
            </button>
          </div>
        </div>
        <ul className="tw-list-inside tw-list-disc">
          {occurrences.map((occ) => (
            <li key={occ.ref} className="tw-py-0.5">
              <Button variant="link" className="tw-h-auto tw-p-0">
                {occ.ref}
              </Button>
            </li>
          ))}
        </ul>
      </div>
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

// ---------------------------------------------------------------------------
// Domain tree dialog (expandable, scrolls to current)
// ---------------------------------------------------------------------------

function DomainTreeDialog({
  domains,
  selectedLevel1Id,
  selectedLevel2Id,
  onSelect,
  trigger,
}: {
  domains: SemanticDomain[];
  selectedLevel1Id: string;
  selectedLevel2Id?: string;
  onSelect: (level1: SemanticDomain, level2?: SemanticDomain) => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set([selectedLevel1Id]));
  // ref.current expects null not undefined for element refs
  // eslint-disable-next-line no-null/no-null
  const selectedRef = useRef<HTMLButtonElement>(null);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Expand the selected category and scroll to it when dialog opens
  useEffect(() => {
    if (open) {
      setExpanded((prev) => new Set(prev).add(selectedLevel1Id));
      // Defer scroll until DOM has rendered
      requestAnimationFrame(() => {
        selectedRef.current?.scrollIntoView({ block: 'center' });
      });
    }
  }, [open, selectedLevel1Id]);

  const handleSelect = useCallback(
    (l1: SemanticDomain, l2?: SemanticDomain) => {
      onSelect(l1, l2);
      setOpen(false);
    },
    [onSelect],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="tw-flex tw-max-h-[70vh] tw-max-w-sm tw-flex-col tw-p-0">
        <DialogTitle className="tw-px-4 tw-pt-4 tw-text-base tw-font-semibold">
          Semantic Domains
        </DialogTitle>
        <div className="tw-flex-1 tw-overflow-y-auto tw-px-2 tw-pb-4">
          <ul className="tw-space-y-0.5">
            {domains.map((level1) => {
              const isExpanded = expanded.has(level1.id);
              return (
                <li key={level1.id}>
                  <button
                    type="button"
                    className="tw-flex tw-w-full tw-items-center tw-gap-1 tw-rounded tw-px-2 tw-py-1.5 tw-text-left tw-text-sm tw-font-semibold hover:tw-bg-muted"
                    onClick={() => toggleExpand(level1.id)}
                  >
                    {isExpanded ? (
                      <ChevronDown className="tw-h-4 tw-w-4 tw-shrink-0" />
                    ) : (
                      <ChevronRight className="tw-h-4 tw-w-4 tw-shrink-0" />
                    )}
                    {level1.label}
                  </button>
                  {isExpanded && level1.children && (
                    <ul className="tw-ml-5 tw-space-y-0.5">
                      {level1.children.map((level2) => {
                        const isActive =
                          level1.id === selectedLevel1Id && level2.id === selectedLevel2Id;
                        return (
                          <li key={level2.id}>
                            <button
                              type="button"
                              ref={isActive ? selectedRef : undefined}
                              className={cn(
                                'tw-w-full tw-rounded tw-px-2 tw-py-1 tw-text-left tw-text-sm',
                                isActive ? 'tw-bg-accent tw-font-medium' : 'hover:tw-bg-muted',
                              )}
                              onClick={() => handleSelect(level1, level2)}
                            >
                              {level2.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Shared inline list+detail layout
// ---------------------------------------------------------------------------

/** Generic inline list + detail pane. List hides overflow (no scroll) when detail is shown. */
function InlineListDetail<T extends { id: string }>({
  items,
  selectedItem,
  onSelectItem,
  renderListItem,
  renderDetail,
  listClassName,
}: {
  items: T[];
  selectedItem: T | undefined;
  onSelectItem: (item: T | undefined) => void;
  renderListItem: (item: T, compact: boolean) => React.ReactNode;
  renderDetail: (item: T) => React.ReactNode;
  listClassName?: string;
}) {
  return (
    <div className="tw-relative tw-flex tw-h-full tw-overflow-hidden">
      <div
        className={cn(
          'tw-h-full',
          selectedItem
            ? 'tw-w-1/5 tw-min-w-[120px] tw-overflow-hidden tw-border-r'
            : 'tw-w-full tw-overflow-y-auto',
          listClassName,
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
      {selectedItem && (
        <div className="tw-w-4/5 tw-overflow-y-auto tw-bg-background tw-p-4">
          {renderDetail(selectedItem)}
        </div>
      )}
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

/** Base list without detail panel */
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
 * All ER tabs with inline panel detail view and inline domain navigation. Dictionary entries open a
 * detail panel matching the PT9 screenshot layout. Domain links replace the dictionary view
 * inline.
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

        <div className="tw-flex-1 tw-overflow-hidden">
          {activeTab === 'dictionary' && !activeDomain && (
            <InlineListDetail
              items={sampleDictionaryItems}
              selectedItem={selectedDictItem}
              onSelectItem={setSelectedDictItem}
              renderListItem={(item, compact) => <ErDictListItem item={item} compact={compact} />}
              renderDetail={(item) => (
                <ErDictionaryDetail
                  item={item}
                  onClose={() => setSelectedDictItem(undefined)}
                  onDomainClick={handleDomainClick}
                />
              )}
            />
          )}

          {activeTab === 'dictionary' && activeDomain && (
            <DomainFilteredInline
              activeDomain={activeDomain}
              onDomainChange={(l1, l2) => setActiveDomain({ level1: l1, level2: l2 })}
              onBack={() => setActiveDomain(undefined)}
            />
          )}

          {activeTab === 'encyclopedia' && (
            <InlineListDetail
              items={sampleEncyclopediaItems}
              selectedItem={selectedEncItem}
              onSelectItem={setSelectedEncItem}
              renderListItem={(item) => (
                <div className="tw-flex tw-flex-col tw-gap-0.5">
                  <div className="tw-flex tw-items-baseline tw-gap-2">
                    <span className="tw-text-sm tw-font-medium">{item.primaryText}</span>
                    <span className="tw-text-sm tw-text-muted-foreground">
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
                <EncyclopediaDetail item={item} onClose={() => setSelectedEncItem(undefined)} />
              )}
            />
          )}

          {activeTab === 'media' && (
            <InlineListDetail
              items={sampleMediaItems}
              selectedItem={selectedMediaItem}
              onSelectItem={setSelectedMediaItem}
              renderListItem={(item) => (
                <div className="tw-flex tw-items-center tw-gap-2">
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
                </div>
              )}
              renderDetail={(item) => (
                <MediaDetail item={item} onClose={() => setSelectedMediaItem(undefined)} />
              )}
            />
          )}
        </div>
      </div>
    );
  },
};

/**
 * Lexical extension dictionary with inline panel. Full detail view with senses, occurrence
 * chapter/all toggle, domains, and Strong's codes. List uses same styling as ER dictionary.
 */
export const LexicalDictionary: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState<LexicalEntryFull | undefined>();
    return (
      <div className="tw-h-[550px] tw-rounded tw-border">
        <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">
          Lexical Dictionary
        </h3>
        <div className="tw-h-[calc(100%-41px)]">
          <InlineListDetail
            items={sampleLexicalEntries}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
            renderListItem={(item, compact) => <LexicalListItem item={item} compact={compact} />}
            renderDetail={(item) => (
              <LexicalDetail item={item} onClose={() => setSelectedItem(undefined)} />
            )}
          />
        </div>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Helper: domain filtered inline view used within AllErTabs
// ---------------------------------------------------------------------------

function DomainFilteredInline({
  activeDomain,
  onDomainChange,
  onBack,
}: {
  activeDomain: { level1: SemanticDomain; level2?: SemanticDomain };
  onDomainChange: (level1: SemanticDomain, level2?: SemanticDomain) => void;
  onBack: () => void;
}) {
  const [selectedItem, setSelectedItem] = useState<DictionaryEntryWithSenses | undefined>();

  const effectiveLevel2 = activeDomain.level2 ?? activeDomain.level1.children?.[0];
  const domainLabel = effectiveLevel2
    ? `${activeDomain.level1.label} \u00B7 ${effectiveLevel2.label}`
    : activeDomain.level1.label;

  const filteredItems = useMemo(
    () =>
      sampleDictionaryItems.filter((entry) =>
        entry.senses.some(
          (s) =>
            s.domain.id === activeDomain.level1.id ||
            s.domain.id === effectiveLevel2?.id ||
            s.domain.parentId === activeDomain.level1.id,
        ),
      ),
    [activeDomain.level1.id, effectiveLevel2?.id],
  );

  return (
    <div className="tw-flex tw-h-full tw-flex-col">
      {/* Header: [← Back] [domain dropdown centered] */}
      <div className="tw-flex tw-items-center tw-gap-2 tw-border-b tw-px-2 tw-py-1.5">
        <Button variant="ghost" size="sm" onClick={onBack} className="tw-shrink-0 tw-gap-1">
          <ArrowLeft className="tw-h-4 tw-w-4" />
          Back
        </Button>
        <div className="tw-flex tw-flex-1 tw-justify-center">
          <DomainTreeDialog
            domains={sampleAllDomains}
            selectedLevel1Id={activeDomain.level1.id}
            selectedLevel2Id={effectiveLevel2?.id}
            onSelect={(l1, l2) => {
              onDomainChange(l1, l2);
              setSelectedItem(undefined);
            }}
            trigger={
              <Button variant="outline" className="tw-gap-1 tw-text-sm">
                {domainLabel}
                <ChevronDown className="tw-h-3 tw-w-3" />
              </Button>
            }
          />
        </div>
      </div>

      {/* List + detail */}
      <div className="tw-flex-1 tw-overflow-hidden">
        <InlineListDetail
          items={filteredItems}
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
}
