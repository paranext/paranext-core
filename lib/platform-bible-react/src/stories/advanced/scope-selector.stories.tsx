import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { defaultScrRef } from 'platform-bible-utils';
import { ScopeSelector } from '@/components/advanced/scope-selector/scope-selector.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { ScopeWithRange } from '@/components/utils/scripture.util';

// Mock book information - represents which books are available (all books available in this case)
const mockAvailableBookInfo = '1'.repeat(123);

const mockLocalizedBookNames = new Map([
  ['GEN', { localizedId: 'Gen', localizedName: 'Genesis' }],
  ['EXO', { localizedId: 'Exo', localizedName: 'Exodus' }],
  ['LEV', { localizedId: 'Lev', localizedName: 'Leviticus' }],
  ['NUM', { localizedId: 'Num', localizedName: 'Numbers' }],
  ['DEU', { localizedId: 'Deu', localizedName: 'Deuteronomy' }],
  ['MAT', { localizedId: 'Mat', localizedName: 'Matthew' }],
  ['MRK', { localizedId: 'Mrk', localizedName: 'Mark' }],
  ['LUK', { localizedId: 'Luk', localizedName: 'Luke' }],
  ['JHN', { localizedId: 'Jhn', localizedName: 'John' }],
  ['ROM', { localizedId: 'Rom', localizedName: 'Romans' }],
]);

const meta: Meta<typeof ScopeSelector> = {
  title: 'Advanced/Scope Selector',
  component: ScopeSelector,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['radio', 'dropdown'],
      description: 'Visual layout of the scope options.',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-max-w-md tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ScopeSelector>;

export const BookScope: Story = {
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('book');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN', 'MAT']);

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: ScopeWithRange) => {
          console.log('Scope changed to:', newScope);
          setScope(newScope);
        }}
        onSelectedBookIdsChange={(bookIds: string[]) => {
          console.log('Selected books:', bookIds);
          setSelectedBookIds(bookIds);
        }}
        localizedStrings={{
          '%webView_scope_selector_book%': 'Book',
          '%webView_scope_selector_current_book%': 'Current book',
          '%webView_scope_selector_chapter%': 'Chapter',
          '%webView_scope_selector_current_chapter%': 'Current chapter',
          '%webView_scope_selector_verse%': 'Verse',
          '%webView_scope_selector_current_verse%': 'Current verse',
          '%webView_scope_selector_scope%': 'Scope',
          '%webView_scope_selector_choose_books%': 'Choose specific books',
          '%webView_book_selector_books_selected%': 'books selected',
          '%webView_book_selector_select_books%': 'Select books',
        }}
        localizedBookNames={mockLocalizedBookNames}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Scope selector set to book scope with book selection capabilities.',
      },
    },
  },
};

export const ChapterScope: Story = {
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('chapter');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: ScopeWithRange) => {
          console.log('Scope changed to:', newScope);
          setScope(newScope);
        }}
        onSelectedBookIdsChange={(bookIds: string[]) => {
          console.log('Selected books:', bookIds);
          setSelectedBookIds(bookIds);
        }}
        localizedStrings={{
          '%webView_scope_selector_book%': 'Book',
          '%webView_scope_selector_current_book%': 'Current book',
          '%webView_scope_selector_chapter%': 'Chapter',
          '%webView_scope_selector_current_chapter%': 'Current chapter',
          '%webView_scope_selector_verse%': 'Verse',
          '%webView_scope_selector_current_verse%': 'Current verse',
          '%webView_scope_selector_scope%': 'Scope',
          '%webView_scope_selector_choose_books%': 'Choose specific books',
        }}
        localizedBookNames={mockLocalizedBookNames}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Scope selector set to chapter scope.',
      },
    },
  },
};

export const VerseScope: Story = {
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('verse');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: ScopeWithRange) => {
          console.log('Scope changed to:', newScope);
          setScope(newScope);
        }}
        onSelectedBookIdsChange={(bookIds: string[]) => {
          console.log('Selected books:', bookIds);
          setSelectedBookIds(bookIds);
        }}
        localizedStrings={{
          '%webView_scope_selector_book%': 'Book',
          '%webView_scope_selector_current_book%': 'Current book',
          '%webView_scope_selector_chapter%': 'Chapter',
          '%webView_scope_selector_current_chapter%': 'Current chapter',
          '%webView_scope_selector_verse%': 'Verse',
          '%webView_scope_selector_current_verse%': 'Current verse',
          '%webView_scope_selector_scope%': 'Scope',
          '%webView_scope_selector_choose_books%': 'Choose specific books',
        }}
        localizedBookNames={mockLocalizedBookNames}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Scope selector set to verse scope.',
      },
    },
  },
};

const rangeLocalizedStrings = {
  '%webView_scope_selector_book%': 'Book',
  '%webView_scope_selector_current_book%': 'Current book',
  '%webView_scope_selector_chapter%': 'Chapter',
  '%webView_scope_selector_current_chapter%': 'Current chapter',
  '%webView_scope_selector_verse%': 'Verse',
  '%webView_scope_selector_current_verse%': 'Current verse',
  '%webView_scope_selector_selected_text%': 'Selected text',
  '%webView_scope_selector_scope%': 'Scope',
  '%webView_scope_selector_choose_books%': 'Choose specific books',
  '%webView_scope_selector_range%': 'Range',
  '%webView_scope_selector_select_range%': 'Select a range',
  '%webView_scope_selector_range_start%': 'From',
  '%webView_scope_selector_range_end%': 'To',
  '%webView_scope_selector_ok%': 'OK',
  '%webView_scope_selector_navigate%': 'Change current reference',
  '%webView_book_selector_books_selected%': 'books selected',
  '%webView_book_selector_select_books%': 'Select books',
  '%webView_book_selector_search_books%': 'Search books',
  '%webView_book_selector_select_all%': 'Select all',
  '%webView_book_selector_clear_all%': 'Clear all',
  '%webView_book_selector_no_book_found%': 'No book found',
  '%webView_book_selector_more%': 'more',
};

// A small sample verse-count table so the range BCV pickers can show a verse grid.
const SAMPLE_VERSE_COUNTS: Record<string, Record<number, number>> = {
  GEN: { 1: 31, 2: 25, 3: 24 },
  MAT: { 1: 25, 5: 48 },
  JHN: { 3: 36 },
  REV: { 22: 21 },
};

function sampleGetEndVerse(bookId: string, chapterNum: number): number {
  return SAMPLE_VERSE_COUNTS[bookId]?.[chapterNum] ?? 30;
}

export const DropdownVariant: Story = {
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('chapter');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
    const [currentScrRef, setCurrentScrRef] = useState<SerializedVerseRef>({
      book: 'MAT',
      chapterNum: 5,
      verseNum: 3,
    });

    return (
      <ScopeSelector
        variant="dropdown"
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: ScopeWithRange) => setScope(newScope)}
        onSelectedBookIdsChange={(bookIds: string[]) => setSelectedBookIds(bookIds)}
        localizedStrings={rangeLocalizedStrings}
        localizedBookNames={mockLocalizedBookNames}
        currentScrRef={currentScrRef}
        onCurrentScrRefChange={setCurrentScrRef}
        getEndVerse={sampleGetEndVerse}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Scope selector rendered as a dropdown instead of radio buttons. Use `variant="dropdown"` when screen space is tight.',
      },
    },
  },
};

export const RangeScope: Story = {
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('range');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
    const [rangeStart, setRangeStart] = useState<SerializedVerseRef>(defaultScrRef);
    const [rangeEnd, setRangeEnd] = useState<SerializedVerseRef>({
      book: 'GEN',
      chapterNum: 3,
      verseNum: 24,
    });

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: ScopeWithRange) => setScope(newScope)}
        onSelectedBookIdsChange={(bookIds: string[]) => setSelectedBookIds(bookIds)}
        localizedStrings={rangeLocalizedStrings}
        localizedBookNames={mockLocalizedBookNames}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        onRangeStartChange={setRangeStart}
        onRangeEndChange={setRangeEnd}
        getEndVerse={sampleGetEndVerse}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Range scope renders two BookChapterControl pickers so the user can pick the first and last verse. When `getEndVerse` is provided, the BCV controls also allow verse selection.',
      },
    },
  },
};

export const DropdownVariantWithRange: Story = {
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('range');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
    const [rangeStart, setRangeStart] = useState<SerializedVerseRef | undefined>(undefined);
    const [rangeEnd, setRangeEnd] = useState<SerializedVerseRef | undefined>(undefined);
    const [currentScrRef, setCurrentScrRef] = useState<SerializedVerseRef>({
      book: 'MAT',
      chapterNum: 5,
      verseNum: 3,
    });

    return (
      <ScopeSelector
        variant="dropdown"
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: ScopeWithRange) => setScope(newScope)}
        onSelectedBookIdsChange={(bookIds: string[]) => setSelectedBookIds(bookIds)}
        localizedStrings={rangeLocalizedStrings}
        localizedBookNames={mockLocalizedBookNames}
        currentScrRef={currentScrRef}
        onCurrentScrRefChange={setCurrentScrRef}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        onRangeStartChange={setRangeStart}
        onRangeEndChange={setRangeEnd}
        getEndVerse={sampleGetEndVerse}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Combines the dropdown variant with the range scope.',
      },
    },
  },
};

export const SelectedBooksScope: Story = {
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('selectedBooks');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN', 'EXO', 'MAT', 'JHN']);

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: ScopeWithRange) => {
          console.log('Scope changed to:', newScope);
          setScope(newScope);
        }}
        onSelectedBookIdsChange={(bookIds: string[]) => {
          console.log('Selected books:', bookIds);
          setSelectedBookIds(bookIds);
        }}
        localizedStrings={{
          '%webView_scope_selector_book%': 'Book',
          '%webView_scope_selector_current_book%': 'Current book',
          '%webView_scope_selector_chapter%': 'Chapter',
          '%webView_scope_selector_current_chapter%': 'Current chapter',
          '%webView_scope_selector_verse%': 'Verse',
          '%webView_scope_selector_current_verse%': 'Current verse',
          '%webView_scope_selector_scope%': 'Scope',
          '%webView_scope_selector_choose_books%': 'Choose specific books',
          '%webView_book_selector_books_selected%': 'books selected',
          '%webView_book_selector_select_books%': 'Select books',
          '%webView_book_selector_search_books%': 'Search books',
          '%webView_book_selector_select_all%': 'Select all',
          '%webView_book_selector_clear_all%': 'Clear all',
        }}
        localizedBookNames={mockLocalizedBookNames}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Scope selector with selected books scope showing book selection interface.',
      },
    },
  },
};

// Sample localized book names for Spanish
const spanishBookNames = new Map([
  ['GEN', { localizedId: 'GÉN', localizedName: 'Génesis' }],
  ['EXO', { localizedId: 'ÉXO', localizedName: 'Éxodo' }],
  ['LEV', { localizedId: 'LEV', localizedName: 'Levítico' }],
  ['NUM', { localizedId: 'NÚM', localizedName: 'Números' }],
  ['DEU', { localizedId: 'DEU', localizedName: 'Deuteronomio' }],
  ['JOS', { localizedId: 'JOS', localizedName: 'Josué' }],
  ['JDG', { localizedId: 'JUE', localizedName: 'Jueces' }],
  ['RUT', { localizedId: 'RUT', localizedName: 'Rut' }],
  ['1SA', { localizedId: '1SA', localizedName: '1 Samuel' }],
  ['2SA', { localizedId: '2SA', localizedName: '2 Samuel' }],
  ['1KI', { localizedId: '1RE', localizedName: '1 Reyes' }],
  ['2KI', { localizedId: '2RE', localizedName: '2 Reyes' }],
  ['1CH', { localizedId: '1CR', localizedName: '1 Crónicas' }],
  ['2CH', { localizedId: '2CR', localizedName: '2 Crónicas' }],
  ['EZR', { localizedId: 'ESD', localizedName: 'Esdras' }],
  ['NEH', { localizedId: 'NEH', localizedName: 'Nehemías' }],
  ['EST', { localizedId: 'EST', localizedName: 'Ester' }],
  ['JOB', { localizedId: 'JOB', localizedName: 'Job' }],
  ['PSA', { localizedId: 'SAL', localizedName: 'Salmos' }],
  ['PRO', { localizedId: 'PRO', localizedName: 'Proverbios' }],
  ['ECC', { localizedId: 'ECL', localizedName: 'Eclesiastés' }],
  ['SNG', { localizedId: 'CNT', localizedName: 'Cantares' }],
  ['ISA', { localizedId: 'ISA', localizedName: 'Isaías' }],
  ['JER', { localizedId: 'JER', localizedName: 'Jeremías' }],
  ['LAM', { localizedId: 'LAM', localizedName: 'Lamentaciones' }],
  ['EZK', { localizedId: 'EZE', localizedName: 'Ezequiel' }],
  ['DAN', { localizedId: 'DAN', localizedName: 'Daniel' }],
  ['HOS', { localizedId: 'OSE', localizedName: 'Oseas' }],
  ['JOL', { localizedId: 'JOE', localizedName: 'Joel' }],
  ['AMO', { localizedId: 'AMÓ', localizedName: 'Amós' }],
  ['OBA', { localizedId: 'ABD', localizedName: 'Abdías' }],
  ['JON', { localizedId: 'JON', localizedName: 'Jonás' }],
  ['MIC', { localizedId: 'MIQ', localizedName: 'Miqueas' }],
  ['NAM', { localizedId: 'NAH', localizedName: 'Nahúm' }],
  ['HAB', { localizedId: 'HAB', localizedName: 'Habacuc' }],
  ['ZEP', { localizedId: 'SOF', localizedName: 'Sofonías' }],
  ['HAG', { localizedId: 'HAG', localizedName: 'Hageo' }],
  ['ZEC', { localizedId: 'ZAC', localizedName: 'Zacarías' }],
  ['MAL', { localizedId: 'MAL', localizedName: 'Malaquías' }],
  ['MAT', { localizedId: 'MAT', localizedName: 'Mateo' }],
  ['MRK', { localizedId: 'MAR', localizedName: 'Marcos' }],
  ['LUK', { localizedId: 'LUC', localizedName: 'Lucas' }],
  ['JHN', { localizedId: 'JUA', localizedName: 'Juan' }],
  ['ACT', { localizedId: 'HEC', localizedName: 'Hechos' }],
  ['ROM', { localizedId: 'ROM', localizedName: 'Romanos' }],
  ['1CO', { localizedId: '1CO', localizedName: '1 Corintios' }],
  ['2CO', { localizedId: '2CO', localizedName: '2 Corintios' }],
  ['GAL', { localizedId: 'GÁL', localizedName: 'Gálatas' }],
  ['EPH', { localizedId: 'EFE', localizedName: 'Efesios' }],
  ['PHP', { localizedId: 'FIL', localizedName: 'Filipenses' }],
  ['COL', { localizedId: 'COL', localizedName: 'Colosenses' }],
  ['1TH', { localizedId: '1TE', localizedName: '1 Tesalonicenses' }],
  ['2TH', { localizedId: '2TE', localizedName: '2 Tesalonicenses' }],
  ['1TI', { localizedId: '1TI', localizedName: '1 Timoteo' }],
  ['2TI', { localizedId: '2TI', localizedName: '2 Timoteo' }],
  ['TIT', { localizedId: 'TIT', localizedName: 'Tito' }],
  ['PHM', { localizedId: 'FLM', localizedName: 'Filemón' }],
  ['HEB', { localizedId: 'HEB', localizedName: 'Hebreos' }],
  ['JAS', { localizedId: 'STG', localizedName: 'Santiago' }],
  ['1PE', { localizedId: '1PE', localizedName: '1 Pedro' }],
  ['2PE', { localizedId: '2PE', localizedName: '2 Pedro' }],
  ['1JN', { localizedId: '1JN', localizedName: '1 Juan' }],
  ['2JN', { localizedId: '2JN', localizedName: '2 Juan' }],
  ['3JN', { localizedId: '3JN', localizedName: '3 Juan' }],
  ['JUD', { localizedId: 'JUD', localizedName: 'Judas' }],
  ['REV', { localizedId: 'APO', localizedName: 'Apocalipsis' }],
]);

// Sample localized book names for German
const germanBookNames = new Map([
  ['GEN', { localizedId: '1MO', localizedName: '1. Mose' }],
  ['EXO', { localizedId: '2MO', localizedName: '2. Mose' }],
  ['LEV', { localizedId: '3MO', localizedName: '3. Mose' }],
  ['NUM', { localizedId: '4MO', localizedName: '4. Mose' }],
  ['DEU', { localizedId: '5MO', localizedName: '5. Mose' }],
  ['PSA', { localizedId: 'PS', localizedName: 'Psalmen' }],
  ['MAT', { localizedId: 'MT', localizedName: 'Matthäus' }],
  ['MRK', { localizedId: 'MK', localizedName: 'Markus' }],
  ['LUK', { localizedId: 'LK', localizedName: 'Lukas' }],
  ['JHN', { localizedId: 'JOH', localizedName: 'Johannes' }],
  ['ACT', { localizedId: 'APG', localizedName: 'Apostelgeschichte' }],
  ['ROM', { localizedId: 'RÖM', localizedName: 'Römer' }],
  ['1CO', { localizedId: '1KOR', localizedName: '1. Korinther' }],
  ['2CO', { localizedId: '2KOR', localizedName: '2. Korinther' }],
  ['GAL', { localizedId: 'GAL', localizedName: 'Galater' }],
  ['EPH', { localizedId: 'EPH', localizedName: 'Epheser' }],
  ['PHP', { localizedId: 'PHIL', localizedName: 'Philipper' }],
  ['REV', { localizedId: 'OFFB', localizedName: 'Offenbarung' }],
]);

// Full-projects availability string used by the localized-book-names stories — matches the
// representative project layout used in the Playground story so all four testaments render.
const fullProjectAvailableBookInfo =
  '100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000';

export const WithLocalizedSpanishBookNames: Story = {
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('selectedBooks');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([
      'GEN',
      'PSA',
      'MAT',
      'JHN',
      'REV',
    ]);

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={fullProjectAvailableBookInfo}
        availableScopes={['selectedText', 'chapter', 'book', 'selectedBooks']}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: ScopeWithRange) => {
          console.log('Scope changed to:', newScope);
          setScope(newScope);
        }}
        onSelectedBookIdsChange={(bookIds: string[]) => {
          console.log('Selected books:', bookIds);
          setSelectedBookIds(bookIds);
        }}
        localizedStrings={{
          '%webView_scope_selector_book%': 'Book',
          '%webView_scope_selector_current_book%': 'Current book',
          '%webView_scope_selector_chapter%': 'Chapter',
          '%webView_scope_selector_current_chapter%': 'Current chapter',
          '%webView_scope_selector_scope%': 'Scope',
          '%webView_scope_selector_choose_books%': 'Choose specific books',
          '%webView_book_selector_books_selected%': 'books selected',
          '%webView_book_selector_select_books%': 'Select books',
          '%webView_book_selector_search_books%': 'Search books',
          '%webView_book_selector_select_all%': 'Select all',
          '%webView_book_selector_clear_all%': 'Clear all',
        }}
        localizedBookNames={spanishBookNames}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Localized Book Names (Spanish)** - Demonstrates the ScopeSelector with Spanish localized book names.

When you open the book selector, you'll see:
- Spanish book names (e.g., "Génesis" instead of "Genesis")
- Spanish book IDs (e.g., "GÉN" instead of "GEN") shown as smaller text
- Proper search functionality with both English and Spanish terms
- Testament color coding preserved (OT=red, NT=purple, DC=indigo, Extra=amber)

The localization is provided through the \`localizedBookNames\` prop, which maps English book IDs to their localized equivalents.
        `,
      },
    },
  },
};

export const WithLocalizedGermanBookNames: Story = {
  render: () => {
    const [scope, setScope] = useState<ScopeWithRange>('selectedBooks');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([
      'GEN',
      'PSA',
      'MAT',
      'JHN',
      'REV',
    ]);

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={fullProjectAvailableBookInfo}
        availableScopes={['selectedText', 'chapter', 'book', 'selectedBooks']}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: ScopeWithRange) => {
          console.log('Scope changed to:', newScope);
          setScope(newScope);
        }}
        onSelectedBookIdsChange={(bookIds: string[]) => {
          console.log('Selected books:', bookIds);
          setSelectedBookIds(bookIds);
        }}
        localizedStrings={{
          '%webView_scope_selector_book%': 'Book',
          '%webView_scope_selector_current_book%': 'Current book',
          '%webView_scope_selector_chapter%': 'Chapter',
          '%webView_scope_selector_current_chapter%': 'Current chapter',
          '%webView_scope_selector_scope%': 'Scope',
          '%webView_scope_selector_choose_books%': 'Choose specific books',
          '%webView_book_selector_books_selected%': 'books selected',
          '%webView_book_selector_select_books%': 'Select books',
          '%webView_book_selector_search_books%': 'Search books',
          '%webView_book_selector_select_all%': 'Select all',
          '%webView_book_selector_clear_all%': 'Clear all',
        }}
        localizedBookNames={germanBookNames}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Localized Book Names (German)** - Demonstrates the ScopeSelector with German localized book names.

Features include:
- German book names (e.g., "1. Mose" instead of "Genesis", "Matthäus" instead of "Matthew")
- German book IDs where different (e.g., "1MO" for Genesis, "JOH" for John)
- Traditional German biblical book naming conventions
- Full multi-select functionality preserved

Note: This example includes a representative subset of books to demonstrate German localization patterns.
        `,
      },
    },
  },
};
