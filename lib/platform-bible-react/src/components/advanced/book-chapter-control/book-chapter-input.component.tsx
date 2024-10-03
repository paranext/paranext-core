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
      <div className="tw-relative">
        <ShadInput
          {...props}
          type="text"
          className="tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-shadow-none tw-outline-none"
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
          className="tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground"
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
