import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/shadcn-ui/utils';
import { Section } from 'platform-bible-utils';
import { getSectionShortName } from '@/components/shared/book.utils';
import { DisabledActionTooltip } from '@/components/basics/disabled-action-tooltip.component';
import { getBooksForSection, isSectionFullySelected } from './scope-selector.utils';
import { SelectBooksLocalizedStrings } from './select-books.types';

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
  disabledExplanation,
}: {
  section: Section;
  availableBookIds: string[];
  selectedBookIds: string[];
  onToggle: (section: Section) => void;
  localizedStrings: SelectBooksLocalizedStrings;
  /**
   * Why this section has no available books, shown as a tooltip while the button is disabled. Worth
   * supplying when the consumer withholds a section's books deliberately, since a bare disabled
   * button otherwise reads as "this project has none".
   */
  disabledExplanation?: string;
}) {
  const isDisabled = getBooksForSection(availableBookIds, section).length === 0;

  const sectionOtShortText = localizedStrings['%scripture_section_ot_short%'];
  const sectionNtShortText = localizedStrings['%scripture_section_nt_short%'];
  const sectionDcShortText = localizedStrings['%scripture_section_dc_short%'];
  const sectionExtraShortText = localizedStrings['%scripture_section_extra_short%'];

  const button = (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onToggle(section)}
      className={cn(
        isSectionFullySelected(availableBookIds, section, selectedBookIds) &&
          !isDisabled &&
          'tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground',
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

  if (!isDisabled || !disabledExplanation) return button;

  return (
    <DisabledActionTooltip disabled tooltipText={disabledExplanation}>
      {button}
    </DisabledActionTooltip>
  );
}

export default SectionButton;
