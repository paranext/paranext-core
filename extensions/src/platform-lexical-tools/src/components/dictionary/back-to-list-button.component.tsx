import { ArrowLeft } from 'lucide-react';
import { ListboxOption, Button, DrawerClose } from 'platform-bible-react';
import { LanguageStrings } from 'platform-bible-utils';
import { Entry } from 'platform-lexical-tools';

/** Props for the BackToListButton component */
type BackToListButtonProps = {
  /** Callback function to handle back button click, returning to the list view */
  handleBackToListButton?: (option: ListboxOption) => void;
  /** Dictionary entry to display in the button */
  dictionaryEntry: Entry;
  /** Whether the display is in a drawer or just next to the list */
  isDrawer: boolean;
  /** Localized strings for the button */
  localizedStrings: LanguageStrings;
};

/**
 * A button that appears above the detailed view of a dictionary entry.
 *
 * If the user is viewing the detailed view in a drawer, this button is a drawer close button.
 * Otherwise, it is a regular button.
 *
 * Clicking the button will return the user to the list view of all dictionary entries.
 */
export function BackToListButton({
  handleBackToListButton,
  dictionaryEntry,
  isDrawer,
  localizedStrings,
}: BackToListButtonProps) {
  if (!handleBackToListButton) return undefined;

  const button = (
    <Button
      onClick={() =>
        handleBackToListButton({
          id: `${dictionaryEntry.lexicalReferenceTextId}-entry-${dictionaryEntry.id}`,
        })
      }
      className="tw-flex tw-items-center"
      variant="link"
    >
      <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
      {localizedStrings['%platformLexicalTools_dictionary_backToList%']}
    </Button>
  );

  return (
    <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
      {isDrawer ? <DrawerClose asChild>{button}</DrawerClose> : button}
    </div>
  );
}
