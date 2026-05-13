import { Check } from 'lucide-react';
import { Button, Checklist, Label } from 'platform-bible-react';
import { useState } from 'react';
import { Canon } from '@sillsdev/scripture';
import { LocalizeKey } from 'platform-bible-utils';
import { DIALOG_BASE } from './dialog-base.data';
import { DialogDefinition, DialogTypes, SELECT_BOOKS_DIALOG_TYPE } from './dialog-definition.model';
import './select-books-dialog.component.scss';

/** @deprecated 2026-05-13. This dialog is no longer used by Platform.Bible. */
function SelectBooksDialog({
  prompt,
  submitDialog,
  selectedBookIds: initialSelectedBookIds,
}: DialogTypes[typeof SELECT_BOOKS_DIALOG_TYPE]['props']) {
  const bookIds = Canon.allBookIds.filter((bookId) =>
    Canon.isBookOTNT(Canon.bookIdToNumber(bookId)),
  );

  const [selectedBookIds, setSelectedBookIds] = useState<string[]>(initialSelectedBookIds || []);

  const handleBookToggle = (toggledBookId: string) => {
    if (selectedBookIds.includes(toggledBookId)) {
      setSelectedBookIds(selectedBookIds.filter((bookId) => bookId !== toggledBookId));
    } else setSelectedBookIds([...selectedBookIds, toggledBookId]);
  };

  const createBookLabel = (bookId: string) => {
    return Canon.bookIdToEnglishName(bookId);
  };

  return (
    <div className="select-books-dialog">
      <Label>{prompt}</Label>
      <div className="select-books-dialog-scroll">
        <Checklist
          className="book-list"
          listItems={bookIds}
          createLabel={createBookLabel}
          handleSelectListItem={handleBookToggle}
          selectedListItems={selectedBookIds}
        />
      </div>
      <Button
        className="select-books-dialog-submit-button"
        onClick={() => submitDialog(selectedBookIds)}
      >
        <Check />
      </Button>
    </div>
  );
}

const localizeSelectBooksKey: LocalizeKey = `%selectBooks_title_selectBooks%`;

/** @deprecated 2026-05-13. This dialog is no longer used by Platform.Bible. */
export const SELECT_BOOKS_DIALOG: DialogDefinition<typeof SELECT_BOOKS_DIALOG_TYPE> = Object.freeze(
  {
    ...DIALOG_BASE,
    tabType: SELECT_BOOKS_DIALOG_TYPE,
    defaultTitle: localizeSelectBooksKey,
    initialSize: {
      width: 500,
      height: 400,
    },
    Component: SelectBooksDialog,
  },
);

export default SELECT_BOOKS_DIALOG;
