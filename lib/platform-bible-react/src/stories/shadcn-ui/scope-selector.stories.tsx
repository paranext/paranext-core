import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScopeSelector } from '@/components/advanced/scope-selector/scope-selector.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { ComponentProps, useCallback, useState } from 'react';
import { Scope } from '@/components/utils/scripture.util';

const localizedStrings = {
  '%webView_scope_selector_selected_text%': 'Selected text',
  '%webView_scope_selector_current_verse%': 'Current verse',
  '%webView_scope_selector_current_chapter%': 'Current chapter',
  '%webView_scope_selector_current_book%': 'Current book',
  '%webView_scope_selector_choose_books%': 'Choose books',
  '%webView_scope_selector_scope%': 'Scope',
  '%webView_scope_selector_select_books%': 'Select books',
  '%webView_book_selector_books_selected%': 'Books selected',
  '%webView_book_selector_select_books%': 'Select books...',
  '%webView_book_selector_search_books%': 'Search books...',
  '%webView_book_selector_select_all%': 'Select all',
  '%webView_book_selector_clear_all%': 'Clear all',
  '%webView_book_selector_no_book_found%': 'No book found.',
  '%webView_book_selector_more%': 'more',
  '%scripture_section_ot_long%': 'Old Testament',
  '%scripture_section_ot_short%': 'OT',
  '%scripture_section_nt_long%': 'New Testament',
  '%scripture_section_nt_short%': 'NT',
  '%scripture_section_dc_long%': 'Deuterocanonical',
  '%scripture_section_dc_short%': 'DC',
  '%scripture_section_extra_long%': 'Extra material',
  '%scripture_section_extra_short%': 'Extra',
};

type ScopeSelectorWrapperProps = Omit<
  ComponentProps<typeof ScopeSelector>,
  'scope' | 'selectedBookIds' | 'onScopeChange' | 'onSelectedBookIdsChange'
> & {
  scope: Scope;
  selectedBookIds: string[];
  onScopeChange: (scope: Scope) => void;
  onSelectedBookIdsChange: (books: string[]) => void;
};

// Wrapper component to handle state
function ScopeSelectorWrapper({
  scope: initialScope,
  selectedBookIds: initialSelectedBooks,
  onScopeChange,
  onSelectedBookIdsChange,
  ...rest
}: ScopeSelectorWrapperProps) {
  const [scope, setScope] = useState<Scope>(initialScope);
  const [selectedBooks, setSelectedBooks] = useState<string[]>(initialSelectedBooks);

  const handleScopeChange = useCallback(
    (newScope: Scope) => {
      setScope(newScope);
      onScopeChange(newScope);
    },
    [onScopeChange],
  );

  const handleSelectedBooksChange = useCallback(
    (books: string[]) => {
      setSelectedBooks(books);
      onSelectedBookIdsChange(books);
    },
    [onSelectedBookIdsChange],
  );

  return (
    <ThemeProvider>
      <ScopeSelector
        {...rest}
        scope={scope}
        selectedBookIds={selectedBooks}
        onScopeChange={handleScopeChange}
        onSelectedBookIdsChange={handleSelectedBooksChange}
      />
    </ThemeProvider>
  );
}

const meta: Meta<typeof ScopeSelector> = {
  title: 'Advanced/ScopeSelector',
  component: ScopeSelector,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
  args: {
    scope: 'chapter',
    availableBookInfo:
      '100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000',
    selectedBookIds: [],
    localizedStrings,
    onScopeChange: (scope) => console.log('Search scope changed:', scope),
    onSelectedBookIdsChange: (books) => console.log('Selected books changed:', books),
  },
  // Use the wrapper component to render stories
  render: (args) => <ScopeSelectorWrapper {...args} />,
};

export default meta;

type Story = StoryObj<typeof ScopeSelector>;

export const Default: Story = {};

export const Chapter: Story = {
  args: {
    scope: 'chapter',
    selectedBookIds: [],
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'ScopeSelector in chapter scope. You can change the scope and select books - the state will be managed automatically.',
      },
    },
  },
};

export const Book: Story = {
  args: {
    scope: 'book',
    selectedBookIds: [],
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'ScopeSelector in book scope. You can change the scope and select books - the state will be managed automatically.',
      },
    },
  },
};

export const Verse: Story = {
  args: {
    scope: 'verse',
    selectedBookIds: [],
    availableScopes: ['selectedText', 'verse', 'book', 'selectedBooks'],
    availableBookInfo:
      '100111000000000000110000001000000000010111111111111111111111111111000000000000000000111000000000000000000000000000000000000',
  },
};

export const SelectedBooks: Story = {
  args: {
    scope: 'selectedBooks',
    selectedBookIds: ['GEN', 'EXO', 'LEV'],
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'ScopeSelector in selectedBooks mode with some initial book selections. The selected books state will be preserved as you interact with the component.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    scope: 'selectedBooks',
    availableBookInfo:
      '100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000',
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks'],
    selectedBookIds: ['GEN', 'PSA', 'MAT', 'REV', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive ScopeSelector component with state management. The component maintains its own state for selected scope and books, while still calling the provided callbacks. You can:\n' +
          ' - Switch between different scopes (selectedText, chapter, book, selectedBooks)\n' +
          ' - Select and deselect books when in selectedBooks mode\n' +
          ' - See the state changes logged to the console\n' +
          'The availableBookInfo string represents which books are available in the current project.',
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

export const WithLocalizedSpanishBookNames: Story = {
  args: {
    scope: 'selectedBooks',
    selectedBookIds: ['GEN', 'PSA', 'MAT', 'JHN', 'REV'],
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks'],
    availableBookInfo:
      '100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000',
    localizedBookNames: spanishBookNames,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Localized Book Names (Spanish)** - Demonstrates the ScopeSelector with Spanish localized book names.

This example shows how the component displays localized book names in Spanish. When you open the book selector, you'll see:
- Spanish book names (e.g., "Génesis" instead of "Genesis")
- Spanish book IDs (e.g., "GÉN" instead of "GEN") shown as smaller text
- Proper search functionality with both English and Spanish terms
- Testament color coding preserved (OT=red, NT=purple, DC=indigo, Extra=amber)

The localization is provided through the \`localizedBookNames\` prop, which maps English book IDs to their localized equivalents. You can search for books using either English or Spanish names and IDs.
        `,
      },
    },
  },
};

export const WithLocalizedGermanBookNames: Story = {
  args: {
    scope: 'selectedBooks',
    selectedBookIds: ['GEN', 'PSA', 'MAT', 'JHN', 'REV'],
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks'],
    availableBookInfo:
      '100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000',
    localizedBookNames: germanBookNames,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Localized Book Names (German)** - Demonstrates the ScopeSelector with German localized book names.

This example shows how the component displays localized book names in German. Features include:
- German book names (e.g., "1. Mose" instead of "Genesis", "Matthäus" instead of "Matthew")
- German book IDs where different (e.g., "1MO" for Genesis, "JOH" for John)
- Traditional German biblical book naming conventions
- Full multi-select functionality preserved

Note: This example includes a representative subset of books to demonstrate German localization patterns. German biblical translations often use traditional naming conventions that differ significantly from English.
        `,
      },
    },
  },
};
