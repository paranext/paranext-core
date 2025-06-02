import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/shadcn-ui.util';
import { getBooksForSection, isSectionFullySelected, Section } from './scope-selector-utils';

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
}: {
  section: Section;
  availableBookIds: string[];
  selectedBookIds: string[];
  onToggle: (section: Section) => void;
}) {
  const isDisabled = getBooksForSection(availableBookIds, section).length === 0;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onToggle(section)}
      className={cn(
        isSectionFullySelected(availableBookIds, section, selectedBookIds) &&
          !isDisabled &&
          'tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90',
      )}
      disabled={isDisabled}
    >
      {section}
    </Button>
  );
}

export default SectionButton;
