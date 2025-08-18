import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/shadcn-ui.util';
import { LanguageStrings, Section } from 'platform-bible-utils';
import { getSectionShortName } from '@/components/shared/book.utils';
import { getBooksForSection, isSectionFullySelected } from './scope-selector.utils';

/**
 * A button component that represents a scripture section (testament) in the book selector. The
 * button shows a different state when all books in its section are selected and becomes disabled
 * when no books are available in its section.
 */
function SectionButton({
  section,
  availableBookIds,
  selectedBookIds,
  onToggle,
  localizedStrings,
}: {
  section: Section;
  availableBookIds: string[];
  selectedBookIds: string[];
  onToggle: (section: Section) => void;
  localizedStrings: LanguageStrings;
}) {
  const isDisabled = getBooksForSection(availableBookIds, section).length === 0;

  const sectionOtShortText = localizedStrings['%scripture_section_ot_short%'];
  const sectionNtShortText = localizedStrings['%scripture_section_nt_short%'];
  const sectionDcShortText = localizedStrings['%scripture_section_dc_short%'];
  const sectionExtraShortText = localizedStrings['%scripture_section_extra_short%'];

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onToggle(section)}
      className={cn(
        isSectionFullySelected(availableBookIds, section, selectedBookIds) &&
          !isDisabled &&
          'tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground',
      )}
      disabled={isDisabled}
    >
      {getSectionShortName(
        section,
        sectionOtShortText,
        sectionNtShortText,
        sectionDcShortText,
        sectionExtraShortText,
      )}
    </Button>
  );
}

export default SectionButton;
