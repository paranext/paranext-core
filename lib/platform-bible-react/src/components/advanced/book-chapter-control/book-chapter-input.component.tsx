import { FocusEventHandler, forwardRef, KeyboardEvent, MouseEventHandler } from 'react';
import { Input } from '@/components/shadcn-ui/input';
import { cn } from '@/utils/shadcn-ui.util';

export type BookChapterInputProps = {
  handleSearch: (searchString: string) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  handleOnClick: MouseEventHandler<HTMLInputElement>;
  handleSubmit: () => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value: string;
  placeholder: string;
  className?: string;
};

// Shadcn Input sets type to "button"- HAVE to prop spread before setting type
export const BookChapterInput = forwardRef<HTMLInputElement, BookChapterInputProps>(
  (
    {
      handleSearch,
      handleKeyDown,
      handleOnClick,
      handleSubmit,
      className,
      ...props
    }: BookChapterInputProps,
    ref,
  ) => {
    return (
      <Input
        {...props}
        type="text"
        className={cn(
          'tw-relative tw-box-border tw-flex-1 tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-bg-green-300 tw-py-2 tw-pe-2 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none',
          className,
        )}
        onChange={(event) => handleSearch(event.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
            e.preventDefault();
          } else handleKeyDown(e);
        }}
        onClick={handleOnClick}
        ref={ref}
      />
    );
  },
);

export default BookChapterInput;
