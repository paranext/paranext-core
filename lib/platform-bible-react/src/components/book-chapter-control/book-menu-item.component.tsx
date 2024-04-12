import { Canon } from '@sillsdev/scripture';
import { PropsWithChildren } from 'react';
import { Tally1 } from 'lucide-react';
import { DropdownMenuItem as ShadDropdownMenuItem } from '@/components/shadcn-ui/dropdown-menu';
import { cn } from '@/utils/shadcn-ui.util';
import '@/components/book-chapter-control/book-menu-item.component.css';

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
    <ShadDropdownMenuItem
      key={bookId}
      textValue={bookId}
      className={cn('pr-font-normal pr-text-slate-700', isSelected ?? 'selected')}
      onSelect={(e) => {
        // preventDefault() here prevents the entire dropdown menu from closing when selecting this item
        e.preventDefault();
        handleSelectBook(bookId);
      }}
    >
      <Tally1 className={cn('pr-mr-2.5 pr-h-4 pr-w-0.5', `${bookType.toLowerCase()}`)} />
      {Canon.bookIdToEnglishName(bookId)}
      {isSelected && <div>{children}</div>}
    </ShadDropdownMenuItem>
  );
}

export default BookMenuItem;
