/**
 * BookChooser - Custom book selection grid for Project Properties
 *
 * Features:
 *
 * - Grid layout with OT/NT/DC/Other sections
 * - Select All / Clear buttons per section
 * - Checkbox for each book
 * - Keyboard accessible
 */

import { useCallback, useMemo } from 'react';
import { Button, Checkbox, Label, cn } from 'platform-bible-react';

// =============================================================================
// BOOK DATA
// =============================================================================

/** Book information */
interface BookInfo {
  code: string;
  name: string;
  abbrev: string;
}

/** Old Testament books */
const OT_BOOKS: BookInfo[] = [
  { code: 'GEN', name: 'Genesis', abbrev: 'Gen' },
  { code: 'EXO', name: 'Exodus', abbrev: 'Exo' },
  { code: 'LEV', name: 'Leviticus', abbrev: 'Lev' },
  { code: 'NUM', name: 'Numbers', abbrev: 'Num' },
  { code: 'DEU', name: 'Deuteronomy', abbrev: 'Deu' },
  { code: 'JOS', name: 'Joshua', abbrev: 'Jos' },
  { code: 'JDG', name: 'Judges', abbrev: 'Jdg' },
  { code: 'RUT', name: 'Ruth', abbrev: 'Rut' },
  { code: '1SA', name: '1 Samuel', abbrev: '1Sa' },
  { code: '2SA', name: '2 Samuel', abbrev: '2Sa' },
  { code: '1KI', name: '1 Kings', abbrev: '1Ki' },
  { code: '2KI', name: '2 Kings', abbrev: '2Ki' },
  { code: '1CH', name: '1 Chronicles', abbrev: '1Ch' },
  { code: '2CH', name: '2 Chronicles', abbrev: '2Ch' },
  { code: 'EZR', name: 'Ezra', abbrev: 'Ezr' },
  { code: 'NEH', name: 'Nehemiah', abbrev: 'Neh' },
  { code: 'EST', name: 'Esther', abbrev: 'Est' },
  { code: 'JOB', name: 'Job', abbrev: 'Job' },
  { code: 'PSA', name: 'Psalms', abbrev: 'Psa' },
  { code: 'PRO', name: 'Proverbs', abbrev: 'Pro' },
  { code: 'ECC', name: 'Ecclesiastes', abbrev: 'Ecc' },
  { code: 'SNG', name: 'Song of Songs', abbrev: 'Sng' },
  { code: 'ISA', name: 'Isaiah', abbrev: 'Isa' },
  { code: 'JER', name: 'Jeremiah', abbrev: 'Jer' },
  { code: 'LAM', name: 'Lamentations', abbrev: 'Lam' },
  { code: 'EZK', name: 'Ezekiel', abbrev: 'Ezk' },
  { code: 'DAN', name: 'Daniel', abbrev: 'Dan' },
  { code: 'HOS', name: 'Hosea', abbrev: 'Hos' },
  { code: 'JOL', name: 'Joel', abbrev: 'Jol' },
  { code: 'AMO', name: 'Amos', abbrev: 'Amo' },
  { code: 'OBA', name: 'Obadiah', abbrev: 'Oba' },
  { code: 'JON', name: 'Jonah', abbrev: 'Jon' },
  { code: 'MIC', name: 'Micah', abbrev: 'Mic' },
  { code: 'NAM', name: 'Nahum', abbrev: 'Nam' },
  { code: 'HAB', name: 'Habakkuk', abbrev: 'Hab' },
  { code: 'ZEP', name: 'Zephaniah', abbrev: 'Zep' },
  { code: 'HAG', name: 'Haggai', abbrev: 'Hag' },
  { code: 'ZEC', name: 'Zechariah', abbrev: 'Zec' },
  { code: 'MAL', name: 'Malachi', abbrev: 'Mal' },
];

/** New Testament books */
const NT_BOOKS: BookInfo[] = [
  { code: 'MAT', name: 'Matthew', abbrev: 'Mat' },
  { code: 'MRK', name: 'Mark', abbrev: 'Mrk' },
  { code: 'LUK', name: 'Luke', abbrev: 'Luk' },
  { code: 'JHN', name: 'John', abbrev: 'Jhn' },
  { code: 'ACT', name: 'Acts', abbrev: 'Act' },
  { code: 'ROM', name: 'Romans', abbrev: 'Rom' },
  { code: '1CO', name: '1 Corinthians', abbrev: '1Co' },
  { code: '2CO', name: '2 Corinthians', abbrev: '2Co' },
  { code: 'GAL', name: 'Galatians', abbrev: 'Gal' },
  { code: 'EPH', name: 'Ephesians', abbrev: 'Eph' },
  { code: 'PHP', name: 'Philippians', abbrev: 'Php' },
  { code: 'COL', name: 'Colossians', abbrev: 'Col' },
  { code: '1TH', name: '1 Thessalonians', abbrev: '1Th' },
  { code: '2TH', name: '2 Thessalonians', abbrev: '2Th' },
  { code: '1TI', name: '1 Timothy', abbrev: '1Ti' },
  { code: '2TI', name: '2 Timothy', abbrev: '2Ti' },
  { code: 'TIT', name: 'Titus', abbrev: 'Tit' },
  { code: 'PHM', name: 'Philemon', abbrev: 'Phm' },
  { code: 'HEB', name: 'Hebrews', abbrev: 'Heb' },
  { code: 'JAS', name: 'James', abbrev: 'Jas' },
  { code: '1PE', name: '1 Peter', abbrev: '1Pe' },
  { code: '2PE', name: '2 Peter', abbrev: '2Pe' },
  { code: '1JN', name: '1 John', abbrev: '1Jn' },
  { code: '2JN', name: '2 John', abbrev: '2Jn' },
  { code: '3JN', name: '3 John', abbrev: '3Jn' },
  { code: 'JUD', name: 'Jude', abbrev: 'Jud' },
  { code: 'REV', name: 'Revelation', abbrev: 'Rev' },
];

/** Deuterocanonical books */
const DC_BOOKS: BookInfo[] = [
  { code: 'TOB', name: 'Tobit', abbrev: 'Tob' },
  { code: 'JDT', name: 'Judith', abbrev: 'Jdt' },
  { code: 'ESG', name: 'Esther (Greek)', abbrev: 'EsG' },
  { code: 'WIS', name: 'Wisdom', abbrev: 'Wis' },
  { code: 'SIR', name: 'Sirach', abbrev: 'Sir' },
  { code: 'BAR', name: 'Baruch', abbrev: 'Bar' },
  { code: 'LJE', name: 'Letter of Jeremiah', abbrev: 'LJe' },
  { code: 'S3Y', name: 'Song of 3 Young Men', abbrev: 'S3Y' },
  { code: 'SUS', name: 'Susanna', abbrev: 'Sus' },
  { code: 'BEL', name: 'Bel and the Dragon', abbrev: 'Bel' },
  { code: '1MA', name: '1 Maccabees', abbrev: '1Ma' },
  { code: '2MA', name: '2 Maccabees', abbrev: '2Ma' },
  { code: '3MA', name: '3 Maccabees', abbrev: '3Ma' },
  { code: '4MA', name: '4 Maccabees', abbrev: '4Ma' },
  { code: '1ES', name: '1 Esdras', abbrev: '1Es' },
  { code: '2ES', name: '2 Esdras', abbrev: '2Es' },
  { code: 'MAN', name: 'Prayer of Manasseh', abbrev: 'Man' },
  { code: 'PS2', name: 'Psalm 151', abbrev: 'Ps2' },
];

// =============================================================================
// SECTION COMPONENT
// =============================================================================

interface BookSectionProps {
  title: string;
  books: BookInfo[];
  selectedBooks: string[];
  onToggleBook: (code: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

function BookSection({
  title,
  books,
  selectedBooks,
  onToggleBook,
  onSelectAll,
  onClearAll,
}: BookSectionProps) {
  const selectedCount = books.filter((b) => selectedBooks.includes(b.code)).length;
  const allSelected = selectedCount === books.length;
  const noneSelected = selectedCount === 0;

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      {/* Section header */}
      <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-border-border tw-pb-1">
        <span className="tw-font-medium tw-text-foreground">
          {title} ({selectedCount}/{books.length})
        </span>
        <div className="tw-flex tw-gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSelectAll}
            disabled={allSelected}
            className="tw-h-6 tw-px-2 tw-text-xs"
          >
            All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            disabled={noneSelected}
            className="tw-h-6 tw-px-2 tw-text-xs"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Book grid */}
      <div className="tw-grid tw-grid-cols-4 sm:tw-grid-cols-6 md:tw-grid-cols-8 tw-gap-1">
        {books.map((book) => {
          const isSelected = selectedBooks.includes(book.code);
          return (
            <div
              key={book.code}
              className={cn(
                'tw-flex tw-items-center tw-gap-1 tw-p-1 tw-rounded tw-cursor-pointer',
                'hover:tw-bg-muted/50',
                isSelected && 'tw-bg-primary/10',
              )}
              onClick={() => onToggleBook(book.code)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggleBook(book.code);
                }
              }}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              title={book.name}
            >
              <Checkbox
                id={`book-${book.code}`}
                checked={isSelected}
                onCheckedChange={() => onToggleBook(book.code)}
                tabIndex={-1}
                className="tw-h-3 tw-w-3"
              />
              <Label
                htmlFor={`book-${book.code}`}
                className="tw-text-xs tw-cursor-pointer tw-select-none"
              >
                {book.abbrev}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export interface BookChooserProps {
  /** Currently selected book codes */
  selectedBooks: string[];

  /** Callback when book selection changes */
  onSelectedBooksChange: (books: string[]) => void;

  /** Callback to toggle a single book */
  onToggleBook: (code: string) => void;

  /** Whether to show DC books section */
  showDeuterocanonical?: boolean;

  /** Optional className */
  className?: string;
}

/**
 * BookChooser - Grid-based book selection component
 *
 * Implements BHV-114: Books present tracking
 */
export function BookChooser({
  selectedBooks,
  onSelectedBooksChange,
  onToggleBook,
  showDeuterocanonical = true,
  className,
}: BookChooserProps) {
  // Handlers for select/clear all in each section
  const handleSelectAllOT = useCallback(() => {
    const otCodes = OT_BOOKS.map((b) => b.code);
    const newSelection = new Set([...selectedBooks, ...otCodes]);
    onSelectedBooksChange(Array.from(newSelection));
  }, [selectedBooks, onSelectedBooksChange]);

  const handleClearAllOT = useCallback(() => {
    const otCodes = new Set(OT_BOOKS.map((b) => b.code));
    onSelectedBooksChange(selectedBooks.filter((code) => !otCodes.has(code)));
  }, [selectedBooks, onSelectedBooksChange]);

  const handleSelectAllNT = useCallback(() => {
    const ntCodes = NT_BOOKS.map((b) => b.code);
    const newSelection = new Set([...selectedBooks, ...ntCodes]);
    onSelectedBooksChange(Array.from(newSelection));
  }, [selectedBooks, onSelectedBooksChange]);

  const handleClearAllNT = useCallback(() => {
    const ntCodes = new Set(NT_BOOKS.map((b) => b.code));
    onSelectedBooksChange(selectedBooks.filter((code) => !ntCodes.has(code)));
  }, [selectedBooks, onSelectedBooksChange]);

  const handleSelectAllDC = useCallback(() => {
    const dcCodes = DC_BOOKS.map((b) => b.code);
    const newSelection = new Set([...selectedBooks, ...dcCodes]);
    onSelectedBooksChange(Array.from(newSelection));
  }, [selectedBooks, onSelectedBooksChange]);

  const handleClearAllDC = useCallback(() => {
    const dcCodes = new Set(DC_BOOKS.map((b) => b.code));
    onSelectedBooksChange(selectedBooks.filter((code) => !dcCodes.has(code)));
  }, [selectedBooks, onSelectedBooksChange]);

  // Summary counts
  const summary = useMemo(() => {
    const otCount = OT_BOOKS.filter((b) => selectedBooks.includes(b.code)).length;
    const ntCount = NT_BOOKS.filter((b) => selectedBooks.includes(b.code)).length;
    const dcCount = DC_BOOKS.filter((b) => selectedBooks.includes(b.code)).length;
    return { ot: otCount, nt: ntCount, dc: dcCount, total: selectedBooks.length };
  }, [selectedBooks]);

  return (
    <div className={cn('pr-twp tw-flex tw-flex-col tw-gap-4', className)}>
      {/* Summary */}
      <div className="tw-text-sm tw-text-muted-foreground">
        {summary.total} book{summary.total !== 1 ? 's' : ''} selected
      </div>

      {/* Old Testament */}
      <BookSection
        title="Old Testament"
        books={OT_BOOKS}
        selectedBooks={selectedBooks}
        onToggleBook={onToggleBook}
        onSelectAll={handleSelectAllOT}
        onClearAll={handleClearAllOT}
      />

      {/* New Testament */}
      <BookSection
        title="New Testament"
        books={NT_BOOKS}
        selectedBooks={selectedBooks}
        onToggleBook={onToggleBook}
        onSelectAll={handleSelectAllNT}
        onClearAll={handleClearAllNT}
      />

      {/* Deuterocanonical */}
      {showDeuterocanonical && (
        <BookSection
          title="Deuterocanonical"
          books={DC_BOOKS}
          selectedBooks={selectedBooks}
          onToggleBook={onToggleBook}
          onSelectAll={handleSelectAllDC}
          onClearAll={handleClearAllDC}
        />
      )}
    </div>
  );
}

export default BookChooser;
