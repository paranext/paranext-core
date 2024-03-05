import { forwardRef } from 'react';
import { History } from 'lucide-react';
import { Input as ShadInput } from '@/components/shadcn-ui/input';
import '@/components/book-chapter-control/book-chapter-input.component.css';

export type BookChapterInputProps = {
  handleSearch: (searchString: string) => void;
  value: string;
  placeholder: string;
};

// Shadcn Input sets type to "button"- HAVE to prop spread before setting type
const BookChapterInput = forwardRef<HTMLInputElement, BookChapterInputProps>(
  ({ handleSearch, ...props }: BookChapterInputProps, ref) => {
    return (
      <div className="input-container">
        <ShadInput
          {...props}
          type="text"
          className="book-chapter-input"
          onChange={(event) => handleSearch(event.target.value)}
          ref={ref}
        />
        <div className="history-icon-container">
          <History
            size={16}
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('back in history');
            }}
          />
        </div>
      </div>
    );
  },
);

export default BookChapterInput;
