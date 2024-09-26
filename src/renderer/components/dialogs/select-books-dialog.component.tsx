import { Check } from 'lucide-react';
import { Button, Checklist } from 'platform-bible-react';
import { useState } from 'react';
import { Canon } from '@sillsdev/scripture';
import DIALOG_BASE from './dialog-base.data';
import { DialogDefinition, DialogTypes, SELECT_BOOKS_DIALOG_TYPE } from './dialog-definition.model';
import './select-books-dialog.component.scss';

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
      <div>{prompt}</div>
      <br />
      <div className="book-list">
        <Checklist
          listItems={bookIds}
          createLabel={createBookLabel}
          handleSelectListItem={handleBookToggle}
          selectedListItems={selectedBookIds}
        />
      </div>
      <br />
      <div className="select-books-dialog-submit-button">
        <Button onClick={() => submitDialog(selectedBookIds)}>
          <Check />
        </Button>
      </div>
    </div>
  );
}

const SELECT_BOOKS_DIALOG: DialogDefinition<typeof SELECT_BOOKS_DIALOG_TYPE> = Object.freeze({
  ...DIALOG_BASE,
  tabType: SELECT_BOOKS_DIALOG_TYPE,
  defaultTitle: 'Select Books',
  initialSize: {
    width: 500,
    height: 400,
  },
  Component: SelectBooksDialog,
});

export default SELECT_BOOKS_DIALOG;
