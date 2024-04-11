import { Input as ShadInput } from '../shadcn-ui/input';
// import React from 'react'; // find out why shadcn wants this
import './book-chapter-input.component.css';

export type BookChapterInputProps = {
  // handleSearch: (searchString: string) => void;
  // handleClick: () => void;
  value: string;
  placeholder: string;
};

function BookChapterInput({
  // handleSearch,
  // handleClick,
  value,
  placeholder,
}: BookChapterInputProps) {
  return (
    <ShadInput
      className="book-chapter-input"
      placeholder={placeholder}
      // size="small"
      type="text"
      value={value}
      // From shoelace docs- "event.target will be a reference to the underlying custom element"
      // Have to assert SlInputElement to use the value correctly
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      // onSlInput={(event) => handleSearch((event.target).value)}
      // onClick={handleClick}
    />
  );
}

export default BookChapterInput;
