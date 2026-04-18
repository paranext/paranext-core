import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { defaultScrRef } from 'platform-bible-utils';
import { ScopeSelector } from '@/components/advanced/scope-selector/scope-selector.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { Scope } from '@/components/utils/scripture.util';

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
    const [scope, setScope] = useState<Scope>('book');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN', 'MAT']);

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: Scope) => {
          console.log('Scope changed to:', newScope);
          setScope(newScope);
        }}
        onSelectedBookIdsChange={(bookIds: string[]) => {
          console.log('Selected books:', bookIds);
          setSelectedBookIds(bookIds);
        }}
        localizedStrings={{
          '%webView_scope_selector_current_book%': 'Current book',
          '%webView_scope_selector_current_chapter%': 'Current chapter',
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
    const [scope, setScope] = useState<Scope>('chapter');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: Scope) => {
          console.log('Scope changed to:', newScope);
          setScope(newScope);
        }}
        onSelectedBookIdsChange={(bookIds: string[]) => {
          console.log('Selected books:', bookIds);
          setSelectedBookIds(bookIds);
        }}
        localizedStrings={{
          '%webView_scope_selector_current_book%': 'Current book',
          '%webView_scope_selector_current_chapter%': 'Current chapter',
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
    const [scope, setScope] = useState<Scope>('verse');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: Scope) => {
          console.log('Scope changed to:', newScope);
          setScope(newScope);
        }}
        onSelectedBookIdsChange={(bookIds: string[]) => {
          console.log('Selected books:', bookIds);
          setSelectedBookIds(bookIds);
        }}
        localizedStrings={{
          '%webView_scope_selector_current_book%': 'Current book',
          '%webView_scope_selector_current_chapter%': 'Current chapter',
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
  '%webView_scope_selector_current_book%': 'Current book',
  '%webView_scope_selector_current_chapter%': 'Current chapter',
  '%webView_scope_selector_current_verse%': 'Current verse',
  '%webView_scope_selector_selected_text%': 'Selected text',
  '%webView_scope_selector_scope%': 'Scope',
  '%webView_scope_selector_choose_books%': 'Choose specific books',
  '%webView_scope_selector_range%': 'Range',
  '%webView_scope_selector_range_start%': 'From',
  '%webView_scope_selector_range_end%': 'To',
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
    const [scope, setScope] = useState<Scope>('chapter');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

    return (
      <ScopeSelector
        variant="dropdown"
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: Scope) => setScope(newScope)}
        onSelectedBookIdsChange={(bookIds: string[]) => setSelectedBookIds(bookIds)}
        localizedStrings={rangeLocalizedStrings}
        localizedBookNames={mockLocalizedBookNames}
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
    const [scope, setScope] = useState<Scope>('range');
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
        onScopeChange={(newScope: Scope) => setScope(newScope)}
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
    const [scope, setScope] = useState<Scope>('range');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
    const [rangeStart, setRangeStart] = useState<SerializedVerseRef>(defaultScrRef);
    const [rangeEnd, setRangeEnd] = useState<SerializedVerseRef>({
      book: 'REV',
      chapterNum: 22,
      verseNum: 21,
    });

    return (
      <ScopeSelector
        variant="dropdown"
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: Scope) => setScope(newScope)}
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
        story: 'Combines the dropdown variant with the range scope.',
      },
    },
  },
};

export const SelectedBooksScope: Story = {
  render: () => {
    const [scope, setScope] = useState<Scope>('selectedBooks');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN', 'EXO', 'MAT', 'JHN']);

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: Scope) => {
          console.log('Scope changed to:', newScope);
          setScope(newScope);
        }}
        onSelectedBookIdsChange={(bookIds: string[]) => {
          console.log('Selected books:', bookIds);
          setSelectedBookIds(bookIds);
        }}
        localizedStrings={{
          '%webView_scope_selector_current_book%': 'Current book',
          '%webView_scope_selector_current_chapter%': 'Current chapter',
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
