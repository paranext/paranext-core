import { LanguageStrings } from 'platform-bible-utils';
import BookSelectorComponent from './book-selector.component';

export interface BooksTabProps {
  selectedBooks: string[];
  onChange: (selectedBooks: string[]) => void;
  error?: string;
  localizedStrings: LanguageStrings;
}

export default function BooksTab({
  selectedBooks,
  onChange,
  error,
  localizedStrings,
}: BooksTabProps) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      <BookSelectorComponent
        selectedBooks={selectedBooks}
        onChange={onChange}
        error={error}
        selectAllLabel={
          localizedStrings['%webView_projectProperties_button_selectAll%'] ?? 'Select All'
        }
        deselectAllLabel={
          localizedStrings['%webView_projectProperties_button_deselectAll%'] ?? 'Deselect All'
        }
        otSectionLabel={
          localizedStrings['%webView_projectProperties_section_ot%'] ?? 'Old Testament'
        }
        ntSectionLabel={
          localizedStrings['%webView_projectProperties_section_nt%'] ?? 'New Testament'
        }
        dcSectionLabel={
          localizedStrings['%webView_projectProperties_section_dc%'] ?? 'Deuterocanon'
        }
      />
    </div>
  );
}
