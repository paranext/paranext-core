import { FocusEventHandler, forwardRef, KeyboardEvent, MouseEventHandler } from 'react';
import { History } from 'lucide-react';
import { Input as ShadInput } from '@/components/shadcn-ui/input';

export type BookChapterInputProps = {
  handleSearch: (searchString: string) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  handleOnClick: MouseEventHandler<HTMLInputElement>;
  handleSubmit: () => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  value: string;
  placeholder: string;
};

// Shadcn Input sets type to "button"- HAVE to prop spread before setting type
const BookChapterInput = forwardRef<HTMLInputElement, BookChapterInputProps>(
  (
    { handleSearch, handleKeyDown, handleOnClick, handleSubmit, ...props }: BookChapterInputProps,
    ref,
  ) => {
    return (
      <div className="pr-relative">
        <ShadInput
          {...props}
          type="text"
          className="pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none"
          onChange={(event) => handleSearch(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
            handleKeyDown(e);
          }}
          onClick={handleOnClick}
          ref={ref}
        />
        <History
          className="pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500"
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
