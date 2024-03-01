import { forwardRef } from 'react';
import { Input as ShadInput } from '../shadcn-ui/input';
import './book-chapter-input.component.css';

export type BookChapterInputProps = {
  handleSearch: (searchString: string) => void;
  handleClick: () => void;
  value: string;
  placeholder: string;
};

// Shadcn Input sets type to "button"- HAVE to prop spread before setting type
const BookChapterInput = forwardRef<HTMLInputElement, BookChapterInputProps>(
  ({ handleSearch, handleClick, ...props }: BookChapterInputProps, ref) => {
    return (
      <ShadInput
        {...props}
        type="text"
        className="book-chapter-input"
        onChange={(event) => handleSearch(event.target.value)}
        onClick={handleClick}
        ref={ref}
      />
    );
  },
);

export default BookChapterInput;
