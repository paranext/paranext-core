import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/shadcn-ui.util';
import { getBooksForSection, isSectionFullySelected, Section } from './scope-selector-utils';

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
