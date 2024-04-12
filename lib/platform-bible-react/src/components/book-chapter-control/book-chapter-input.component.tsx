import { forwardRef } from 'react';
import { History } from 'lucide-react';
import { Input as ShadInput } from '../shadcn-ui/input';
import './book-chapter-input.component.css';
import '../../index.css';

export type BookChapterInputProps = {
  handleSearch: (searchString: string) => void;
  value: string;
  placeholder: string;
};

// Shadcn Input sets type to "button"- HAVE to prop spread before setting type
const BookChapterInput = forwardRef<HTMLInputElement, BookChapterInputProps>(
  ({ handleSearch, ...props }: BookChapterInputProps, ref) => {
    return (
      <div>
        <ShadInput
          {...props}
          type="text"
          className="book-chapter-input"
          onChange={(event) => handleSearch(event.target.value)}
          ref={ref}
        />
        <History
          style={{
            cursor: 'pointer',
            height: '16px',
            width: '16px',
          }}
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('back in history');
          }}
        />
      </div>
    );
  },
);

export default BookChapterInput;
