import { Canon } from '@sillsdev/scripture';
import { PropsWithChildren } from 'react';
import { DropdownMenuItem as ShadDropdownMenuItem } from '@/components/shadcn-ui/dropdown-menu';
import { cn } from '@/utils/shadcn-ui.util';

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
      className={cn('pr-font-normal pr-text-slate-700', {
        // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
        'pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-50': isSelected,
      })}
      onSelect={(e: Event) => {
        // preventDefault() here prevents the entire dropdown menu from closing when selecting this item
        e.preventDefault();
        handleSelectBook(bookId);
      }}
    >
      <span
        className={cn(
          'pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2',
          {
            'pr-font-bold': isSelected,
            'pr-border-l-red-200': bookType.toLowerCase() === 'ot',
            'pr-border-l-purple-200': bookType.toLowerCase() === 'nt',
            'pr-border-l-indigo-200': bookType.toLowerCase() === 'dc',
          },
        )}
      >
        {Canon.bookIdToEnglishName(bookId)}
      </span>
      {isSelected && <div>{children}</div>}
    </ShadDropdownMenuItem>
  );
}

export default BookMenuItem;

// gap-2
