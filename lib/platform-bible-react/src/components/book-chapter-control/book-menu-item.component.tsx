import { Canon } from '@sillsdev/scripture';
import { PropsWithChildren } from 'react';
import { ChevronUp, Tally1 } from 'lucide-react';
import { DropdownMenuItem as ShadDropdownMenuItem } from '../shadcn-ui/dropdown-menu';
import './book-menu-item.component.css';

export type BookType = 'OT' | 'NT' | 'DC';

type BookMenuItemProps = PropsWithChildren<{
  // String id of book
  bookId: string;
  // Callback to run when a book menu item is selected
  handleSelectBook: (bookId: string) => void;
  // True if this menu item is currently selected
  isSelected: boolean;
  // Type of book associated with this menu item, coordinates color labels
  // ? Mock up has the labels coordinated to genre
  bookType: BookType;
}>;

function BookMenuItem({
  bookId,
  handleSelectBook,
  isSelected,
  bookType,
  children,
}: BookMenuItemProps) {
  return (
    <div>
      <ShadDropdownMenuItem
        key={bookId}
        textValue={bookId}
        className={isSelected ? 'selected-menu-item' : 'menu-item'}
        onSelect={(e) => {
          // preventDefault() here prevents the dropdown menu from closing when selecting this item
          e.preventDefault();
          handleSelectBook(bookId);
        }}
      >
        {isSelected ? (
          <Tally1
            style={{ marginRight: '10px' }}
            className={`selected-book-color-label ${bookType.toLowerCase()}`}
          />
        ) : (
          <Tally1
            style={{ marginRight: '10px' }}
            className={`book-color-label ${bookType.toLowerCase()}`}
          />
        )}
        {Canon.bookIdToEnglishName(bookId)}
        {isSelected && <ChevronUp name="chevron-up" />}
      </ShadDropdownMenuItem>
      {isSelected && children}
    </div>
  );
}

export default BookMenuItem;
