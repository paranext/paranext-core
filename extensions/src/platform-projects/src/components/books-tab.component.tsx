/**
 * === NEW IN PT10 === Reason: React component for Books tab of Project Properties form Maps to:
 * UI-PKG-001
 */

import { Label } from 'platform-bible-react';
import { LanguageStrings } from 'platform-bible-utils';
import { BookSelector } from './book-selector.component';

export interface BooksTabProps {
  /** Currently selected book IDs */
  selectedBooks: string[];
  /** Callback when selection changes */
  onSelectionChange: (selectedBooks: string[]) => void;
  /** Localized strings */
  localizedStrings: LanguageStrings;
  /** Validation error for books */
  validationError?: string;
  /** Whether the tab is disabled */
  disabled?: boolean;
}

/** BooksTab component for the Books tab of Project Properties form */
export function BooksTab({
  selectedBooks,
  onSelectionChange,
  localizedStrings,
  validationError,
  disabled = false,
}: BooksTabProps) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Validation error */}
      {validationError && (
        <Label className="tw-text-sm tw-text-destructive" role="alert">
          {validationError}
        </Label>
      )}

      {/* Book selector */}
      <BookSelector
        selectedBooks={selectedBooks}
        onSelectionChange={onSelectionChange}
        localizedStrings={localizedStrings}
        disabled={disabled}
      />
    </div>
  );
}

export default BooksTab;
