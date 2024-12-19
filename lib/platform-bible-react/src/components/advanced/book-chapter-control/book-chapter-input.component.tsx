import { FocusEventHandler, forwardRef, KeyboardEvent, MouseEventHandler } from 'react';
import { History } from 'lucide-react';
import { Input } from '@/components/shadcn-ui/input';
import { cn } from '@/utils/shadcn-ui.util';

export type BookChapterInputProps = {
  handleSearch: (searchString: string) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  handleOnClick: MouseEventHandler<HTMLInputElement>;
  handleSubmit: () => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  value: string;
  placeholder: string;
  /** Text and layout direction */
  direction?: 'rtl' | 'ltr';
};

// Shadcn Input sets type to "button"- HAVE to prop spread before setting type
const BookChapterInput = forwardRef<HTMLInputElement, BookChapterInputProps>(
  (
    {
      handleSearch,
      handleKeyDown,
      handleOnClick,
      handleSubmit,
      direction = 'ltr',
      ...props
    }: BookChapterInputProps,
    ref,
  ) => {
    return (
      <div className="tw-relative">
        <Input
          {...props}
          type="text"
          className={cn(
            'tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-9 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none',
          )}
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
          className={cn(
            'tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground',
            { 'tw-right-3': direction === 'ltr' },
            { 'tw-left-3 tw-right-auto': direction === 'rtl' },
          )}
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
