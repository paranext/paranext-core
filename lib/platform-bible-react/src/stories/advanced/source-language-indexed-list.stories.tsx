import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import {
  ArrowLeft,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '@/components/shadcn-ui/button';
import { Separator } from '@/components/shadcn-ui/separator';
import { Badge } from '@/components/shadcn-ui/badge';
import { Dialog, DialogContent, DialogTitle } from '@/components/shadcn-ui/dialog';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/shadcn-ui/drawer';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/shadcn-ui/resizable';
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
      <Button data-back-to-list onClick={onClose} variant="ghost" size="sm" className="tw-mb-3">
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
      <Button data-back-to-list onClick={onClose} variant="ghost" size="sm" className="tw-mb-3">
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
      <Button data-back-to-list onClick={onClose} variant="ghost" size="sm" className="tw-mb-3">
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

const ZOOM_MIN = 0.25;
const ZOOM_MAX = 5;
const ZOOM_STEP = 0.25;

function MediaDetail({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: MediaItem;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const imageAlt = item.thumbnailAlt ?? item.primaryText;

  // Reset zoom when navigating to a different item so the new image starts
  // at fit-to-viewport scale.
  useEffect(() => {
    setZoom(1);
  }, [item.id]);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN)), []);

  return (
    <div>
      <Button data-back-to-list onClick={onClose} variant="ghost" size="sm" className="tw-mb-3">
        <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
        Back to list
      </Button>
      <div className="tw-mb-3 tw-flex tw-items-center tw-gap-2">
        <h2 className="tw-text-lg">{item.primaryText}</h2>
        <Badge variant="outline">{item.mediaType}</Badge>
      </div>
      {item.thumbnailUrl && (
        <div className="tw-relative tw-mb-3">
          <img
            src={item.thumbnailUrl}
            alt={imageAlt}
            className="tw-w-full tw-rounded tw-object-contain"
          />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={() => setExpanded(true)}
            aria-label="Expand image"
            className="tw-absolute tw-right-2 tw-top-2 tw-h-8 tw-w-8 tw-bg-background/80 tw-shadow hover:tw-bg-background"
          >
            <Maximize2 className="tw-h-4 tw-w-4" />
          </Button>
        </div>
      )}
      {item.caption && <p className="tw-text-sm tw-text-muted-foreground">{item.caption}</p>}
      {item.thumbnailUrl && (
        <Dialog open={expanded} onOpenChange={setExpanded}>
          <DialogContent className="tw-flex tw-max-h-[95vh] tw-w-[95vw] tw-max-w-[95vw] tw-flex-col tw-overflow-hidden tw-p-4">
            <div className="tw-flex tw-items-center tw-gap-2">
              <DialogTitle className="tw-flex-1 tw-truncate">{item.primaryText}</DialogTitle>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={onPrev}
                      disabled={!onPrev}
                      aria-label="Previous item"
                      className="tw-h-8 tw-w-8"
                    >
                      <ChevronLeftIcon className="tw-h-4 tw-w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Previous item</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={onNext}
                      disabled={!onNext}
                      aria-label="Next item"
                      className="tw-h-8 tw-w-8"
                    >
                      <ChevronRightIcon className="tw-h-4 tw-w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Next item</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={zoomOut}
                      disabled={zoom <= ZOOM_MIN}
                      aria-label="Zoom out"
                      className="tw-h-8 tw-w-8"
                    >
                      <ZoomOut className="tw-h-4 tw-w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom out</TooltipContent>
                </Tooltip>
                <span className="tw-w-12 tw-text-center tw-text-xs tw-tabular-nums tw-text-muted-foreground">
                  {Math.round(zoom * 100)}%
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={zoomIn}
                      disabled={zoom >= ZOOM_MAX}
                      aria-label="Zoom in"
                      className="tw-h-8 tw-w-8"
                    >
                      <ZoomIn className="tw-h-4 tw-w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom in</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* Spacer for the built-in DialogContent close (X) button */}
              <div className="tw-w-8" />
            </div>
            <div className="tw-flex tw-flex-1 tw-items-center tw-justify-center tw-overflow-auto">
              <img
                src={item.thumbnailUrl}
                alt={imageAlt}
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                className="tw-max-h-full tw-max-w-full tw-object-contain tw-transition-transform"
              />
            </div>
            {item.caption && (
              <p className="tw-text-sm tw-text-muted-foreground">{item.caption}</p>
            )}
          </DialogContent>
        </Dialog>
      )}
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
  listRef: externalListRef,
}: {
  items: T[];
  selectedItem: T | undefined;
  onSelectItem: (item: T | undefined) => void;
  renderListItem: (item: T, compact: boolean) => React.ReactNode;
  renderDetail: (item: T, onClose: () => void) => React.ReactNode;
  /** Optional ref to the listbox <ul> element so the caller can focus it. */
  listRef?: React.MutableRefObject<HTMLUListElement | null>;
}) {
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line no-null/no-null
  const internalListRef = useRef<HTMLUListElement>(null);
  const listRef = externalListRef ?? internalListRef;
  const [narrow, setNarrow] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);

  // Focus the list on mount so tab-switches and initial renders land on the
  // list (enabling immediate keyboard navigation).
  useEffect(() => {
    listRef.current?.focus();
    // Only run once on mount. listRef is either the stable internal ref or the
    // caller's ref; in both cases we don't want to re-focus on re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry?.contentRect.width ?? 0;
      setContainerWidth(width);
      setNarrow(width < 350);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showSideBySide = selectedItem && !narrow;
  const showFullDetail = selectedItem && narrow;

  // react-resizable-panels uses percentages; convert the pixel minima for the
  // list (100px) and detail (150px) panels based on the observed container.
  const listMinPct = containerWidth > 0 ? (100 / containerWidth) * 100 : 20;
  const detailMinPct = containerWidth > 0 ? (150 / containerWidth) * 100 : 30;

  // Keyboard navigation: arrows move focus, behavior depends on narrow/wide.
  // First keypress starts from the selected item (or first/last if none).
  // At the boundaries the list stays put (no wrap, no reselect).
  const handleListKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (items.length === 0) return;
      const selectedIdx = selectedItem ? items.findIndex((i) => i.id === selectedItem.id) : -1;
      const startIdx = focusedIdx >= 0 ? focusedIdx : selectedIdx;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = startIdx < 0 ? 0 : Math.min(startIdx + 1, items.length - 1);
        if (next === focusedIdx) return;
        setFocusedIdx(next);
        if (!narrow) onSelectItem(items[next]);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = startIdx < 0 ? items.length - 1 : Math.max(startIdx - 1, 0);
        if (prev === focusedIdx) return;
        setFocusedIdx(prev);
        if (!narrow) onSelectItem(items[prev]);
      } else if ((e.key === 'Enter' || e.key === ' ') && narrow && focusedIdx >= 0) {
        e.preventDefault();
        onSelectItem(items[focusedIdx]);
      }
    },
    [items, focusedIdx, narrow, onSelectItem, selectedItem],
  );

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIdx < 0 || !listRef.current) return;
    const li = listRef.current.children[focusedIdx] as HTMLElement | undefined;
    li?.scrollIntoView({ block: 'nearest' });
  }, [focusedIdx, listRef]);

  // On close, restore focus to the list starting from the last selected item.
  const handleCloseDetail = useCallback(() => {
    const closingId = selectedItem?.id;
    onSelectItem(undefined);
    if (closingId) {
      const idx = items.findIndex((i) => i.id === closingId);
      if (idx >= 0) setFocusedIdx(idx);
      requestAnimationFrame(() => {
        listRef.current?.focus();
      });
    }
  }, [items, onSelectItem, selectedItem, listRef]);

  // When detail opens in narrow (full-detail) mode the list is unmounted, so
  // move focus to the Back button. In side-by-side mode focus stays on the
  // list so repeated Up/Down arrows continue to work.
  // eslint-disable-next-line no-null/no-null
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const selectedItemId = selectedItem?.id;
  useEffect(() => {
    if (!narrow || !selectedItemId) return;
    const back = detailPanelRef.current?.querySelector<HTMLButtonElement>('[data-back-to-list]');
    back?.focus();
  }, [narrow, selectedItemId]);

  // Switching from list-only to side-by-side replaces the list's wrapper with
  // a ResizablePanelGroup, which remounts the <ul> and drops keyboard focus.
  // Re-focus it so repeated Up/Down after the first selection keep working.
  const isSideBySide = !!showSideBySide;
  useEffect(() => {
    if (isSideBySide) listRef.current?.focus();
  }, [isSideBySide, listRef]);

  const listElement = (
    <ul
      ref={listRef}
      role="listbox"
      tabIndex={0}
      className="tw-p-0.5 tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-inset focus-visible:tw-ring-ring"
      onKeyDown={handleListKeyDown}
    >
      {items.map((item, idx) => {
        const isSelected = selectedItem?.id === item.id;
        const isFocused = focusedIdx === idx;
        return (
          <li
            key={item.id}
            role="option"
            aria-selected={isSelected}
            onClick={() => {
              setFocusedIdx(-1);
              onSelectItem(isSelected ? undefined : item);
            }}
            className={cn('tw-cursor-pointer tw-border-b tw-p-2', {
              'tw-bg-muted': isSelected,
              'hover:tw-bg-muted': !isSelected,
              'tw-ring-1 tw-ring-inset tw-ring-ring': isFocused && !isSelected,
            })}
          >
            {renderListItem(item, !!selectedItem)}
          </li>
        );
      })}
    </ul>
  );

  const detailElement = selectedItem ? renderDetail(selectedItem, handleCloseDetail) : undefined;

  let body: ReactNode;
  if (showSideBySide && detailElement !== undefined) {
    body = (
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={33.3333} minSize={listMinPct}>
          <div className="tw-h-full tw-overflow-y-auto">{listElement}</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={66.6667} minSize={detailMinPct}>
          <div className="tw-h-full tw-overflow-y-auto tw-bg-background tw-p-4">
            {detailElement}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  } else if (showFullDetail && detailElement !== undefined) {
    body = (
      <div
        ref={detailPanelRef}
        className="tw-h-full tw-w-full tw-overflow-y-auto tw-bg-background tw-p-4"
      >
        {detailElement}
      </div>
    );
  } else {
    body = <div className="tw-h-full tw-w-full tw-overflow-y-auto">{listElement}</div>;
  }

  return (
    <div ref={containerRef} className="tw-relative tw-flex tw-h-full tw-overflow-hidden">
      {body}
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

// ---------------------------------------------------------------------------
// Shared AllErTabs layout: tabs + per-tab list/detail + pluggable domain overlay
// ---------------------------------------------------------------------------

type DomainOverlayProps = {
  domainPath: SemanticDomain[] | undefined;
  setDomainPath: (path: SemanticDomain[] | undefined) => void;
  handleDomainClick: (domain: EntryDomain, pathIds?: string[]) => void;
  tabContentRef: React.RefObject<HTMLDivElement>;
  isDictionaryTab: boolean;
};

function AllErTabsLayout({ Overlay }: { Overlay: React.ComponentType<DomainOverlayProps> }) {
  const [activeTab, setActiveTab] = useState<'dictionary' | 'encyclopedia' | 'media'>('dictionary');
  const [selectedDict, setSelectedDict] = useState<DictionaryEntryWithSenses | undefined>();
  const [selectedEnc, setSelectedEnc] = useState<EncyclopediaTeaser | undefined>();
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | undefined>();
  const [domainPath, setDomainPath] = useState<SemanticDomain[] | undefined>();
  // eslint-disable-next-line no-null/no-null
  const tabContentRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line no-null/no-null
  const dictListRef = useRef<HTMLUListElement | null>(null);
  // eslint-disable-next-line no-null/no-null
  const encListRef = useRef<HTMLUListElement | null>(null);
  // eslint-disable-next-line no-null/no-null
  const mediaListRef = useRef<HTMLUListElement | null>(null);

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
              requestAnimationFrame(() => {
                if (tab === 'dictionary') dictListRef.current?.focus();
                else if (tab === 'encyclopedia') encListRef.current?.focus();
                else mediaListRef.current?.focus();
              });
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
            listRef={dictListRef}
            renderListItem={(item, compact) => <ErDictListItem item={item} compact={compact} />}
            renderDetail={(item, onClose) => (
              <ErDictionaryDetail
                item={item}
                onClose={onClose}
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
            listRef={encListRef}
            renderListItem={(item) => (
              <div className="tw-flex tw-flex-col tw-gap-0.5 tw-overflow-hidden">
                <div className="tw-flex tw-items-baseline tw-gap-2 tw-overflow-hidden">
                  <span className="tw-shrink-0 tw-text-sm tw-font-medium">{item.primaryText}</span>
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
            renderDetail={(item, onClose) => <EncyclopediaDetail item={item} onClose={onClose} />}
          />
        )}
        {activeTab === 'media' && (
          <InlineListDetail
            items={sampleMediaItems}
            selectedItem={selectedMedia}
            onSelectItem={setSelectedMedia}
            listRef={mediaListRef}
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
                  <span className="tw-truncate tw-text-sm tw-font-medium">{item.primaryText}</span>
                  <Badge variant="outline" className="tw-w-fit tw-text-xs">
                    {item.mediaType}
                  </Badge>
                </div>
              </div>
            )}
            renderDetail={(item, onClose) => {
              const idx = sampleMediaItems.findIndex((m) => m.id === item.id);
              const onPrev =
                idx > 0 ? () => setSelectedMedia(sampleMediaItems[idx - 1]) : undefined;
              const onNext =
                idx >= 0 && idx < sampleMediaItems.length - 1
                  ? () => setSelectedMedia(sampleMediaItems[idx + 1])
                  : undefined;
              return (
                <MediaDetail item={item} onClose={onClose} onPrev={onPrev} onNext={onNext} />
              );
            }}
          />
        )}
        <Overlay
          domainPath={domainPath}
          setDomainPath={setDomainPath}
          handleDomainClick={handleDomainClick}
          tabContentRef={tabContentRef}
          isDictionaryTab={activeTab === 'dictionary'}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Domain-overlay variants
// ---------------------------------------------------------------------------

/** Overlay variant: centered modal Dialog. ESC + close button are built-in. */
function DialogDomainOverlay({
  domainPath,
  setDomainPath,
  handleDomainClick,
  isDictionaryTab,
}: DomainOverlayProps) {
  return (
    <Dialog
      open={isDictionaryTab && domainPath !== undefined}
      onOpenChange={(open) => {
        if (!open) setDomainPath(undefined);
      }}
    >
      <DialogContent className="tw-flex tw-h-[80vh] tw-max-h-[600px] tw-w-[90vw] tw-max-w-3xl tw-flex-col tw-overflow-hidden tw-p-0">
        <DialogTitle className="tw-sr-only">Filtered dictionary</DialogTitle>
        {domainPath && (
          <DomainFilteredView
            domainPath={domainPath}
            onDomainChange={setDomainPath}
            onDomainClick={handleDomainClick}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Overlay variant: shadcn (vaul) Drawer scoped to the tab content area. */
function StandardDrawerDomainOverlay({
  domainPath,
  setDomainPath,
  handleDomainClick,
  tabContentRef,
  isDictionaryTab,
}: DomainOverlayProps) {
  return (
    <Drawer
      open={isDictionaryTab && domainPath !== undefined}
      onOpenChange={(open) => {
        if (!open) setDomainPath(undefined);
      }}
      direction="bottom"
    >
      <DrawerContent
        container={tabContentRef.current ?? undefined}
        className="tw-h-[85%]"
      >
        <DrawerTitle className="tw-sr-only">Filtered dictionary</DrawerTitle>
        {domainPath && (
          <DomainFilteredView
            domainPath={domainPath}
            onDomainChange={setDomainPath}
            onDomainClick={handleDomainClick}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
}

/**
 * Overlay variant: custom absolute panel (not vaul) so tab switching above the drawer keeps
 * working while open. Clicking the visible backdrop strip closes the drawer.
 */
function CustomDrawerDomainOverlay({
  domainPath,
  setDomainPath,
  handleDomainClick,
  isDictionaryTab,
}: DomainOverlayProps) {
  // Close on ESC. An open popover inside the drawer uses
  // `e.nativeEvent.stopImmediatePropagation()` in its own ESC handler, so ESC
  // inside an open popover only closes the popover, not the drawer.
  useEffect(() => {
    if (domainPath === undefined) return undefined;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setDomainPath(undefined);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [domainPath, setDomainPath]);

  if (!isDictionaryTab || domainPath === undefined) return undefined;
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className="tw-absolute tw-inset-0 tw-z-40 tw-cursor-pointer tw-bg-black/50"
        onClick={() => setDomainPath(undefined)}
        aria-hidden
      />
      <div className="tw-absolute tw-bottom-0 tw-left-2 tw-right-2 tw-top-2 tw-z-50 tw-flex tw-flex-col tw-overflow-hidden tw-rounded-t-lg tw-border tw-bg-background tw-shadow-xl">
        <DomainFilteredView
          domainPath={domainPath}
          onDomainChange={setDomainPath}
          onClose={() => setDomainPath(undefined)}
          onDomainClick={handleDomainClick}
        />
      </div>
    </>
  );
}

/**
 * All ER tabs with inline panel detail views. Domain links open a centered modal Dialog containing
 * the domain-filtered list with breadcrumb navigation. Interaction works while details are shown:
 * selecting entries, clicking close, breadcrumbs, and domain links all remain functional.
 */
export const AllErTabs: Story = {
  render: () => <AllErTabsLayout Overlay={DialogDomainOverlay} />,
};

/** Same as AllErTabs but the domain-filtered view appears in a bottom Drawer (shadcn / vaul). */
export const AllErTabsDrawerVariant: Story = {
  render: () => <AllErTabsLayout Overlay={StandardDrawerDomainOverlay} />,
  parameters: {
    docs: {
      description: {
        story:
          'Variant using the standard shadcn Drawer (vaul-based), scoped to the tab content area via the `container` prop.',
      },
    },
  },
};

/**
 * Same as AllErTabs but uses a custom absolute panel as the drawer. Implemented directly (not via
 * vaul) so tab switching above the drawer keeps working while open.
 */
export const AllErTabsCustomDrawerVariant: Story = {
  render: () => <AllErTabsLayout Overlay={CustomDrawerDomainOverlay} />,
  parameters: {
    docs: {
      description: {
        story:
          'Variant using a custom absolute panel (not vaul) so tab switching above the drawer keeps working while open.',
      },
    },
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
            renderDetail={(item, onClose) => <LexicalDetail item={item} onClose={onClose} />}
          />
        </div>
      </div>
    );
  },
};

/**
 * Alternative to AllErTabs: shows the domain-filtered view inside a centered modal Dialog instead
 * of a bottom Drawer. Clicking a domain link inside an entry's detail opens the dialog.
 */
export const AllErTabsDialogVariant: Story = {
  render: () => {
    const [selectedDict, setSelectedDict] = useState<DictionaryEntryWithSenses | undefined>();
    const [domainPath, setDomainPath] = useState<SemanticDomain[] | undefined>();

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

    return (
      <div className="tw-flex tw-h-[550px] tw-flex-col tw-rounded tw-border">
        <h3 className="tw-border-b tw-px-3 tw-py-2 tw-text-sm tw-font-semibold">
          Dictionary (Dialog variant)
        </h3>
        <div className="tw-flex-1 tw-overflow-hidden">
          <InlineListDetail
            items={sampleDictionaryItems}
            selectedItem={selectedDict}
            onSelectItem={setSelectedDict}
            renderListItem={(item, compact) => <ErDictListItem item={item} compact={compact} />}
            renderDetail={(item, onClose) => (
              <ErDictionaryDetail item={item} onClose={onClose} onDomainClick={handleDomainClick} />
            )}
          />
        </div>
        <Dialog
          open={domainPath !== undefined}
          onOpenChange={(open) => {
            if (!open) setDomainPath(undefined);
          }}
        >
          <DialogContent className="tw-flex tw-h-[80vh] tw-max-h-[600px] tw-w-[90vw] tw-max-w-3xl tw-flex-col tw-overflow-hidden tw-p-0">
            <DialogTitle className="tw-sr-only">Filtered dictionary</DialogTitle>
            {domainPath && (
              // Dialog already provides a close button + ESC dismiss, so we do
              // not pass onClose (which hides the in-header Back button).
              <DomainFilteredView
                domainPath={domainPath}
                onDomainChange={setDomainPath}
                onDomainClick={handleDomainClick}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Alternative to the bottom Drawer: the domain-filtered view is presented in a centered modal Dialog.',
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
  /** When omitted, the Back button in the filtered list header is hidden. */
  onClose?: () => void;
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
