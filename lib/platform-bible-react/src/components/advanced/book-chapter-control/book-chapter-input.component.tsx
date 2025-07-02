import { FocusEventHandler, forwardRef, KeyboardEvent, MouseEventHandler, useState } from 'react';
import { Check, CircleSlash } from 'lucide-react';
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
  hasTopMatch?: boolean;
  hasNoMatches?: boolean;
  hasInputChanged?: boolean;
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
      hasTopMatch,
      hasNoMatches,
      hasInputChanged,
      ...props
    }: BookChapterInputProps,
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="tw-relative tw-max-w-48">
        <Input
          {...props}
          type="text"
          className={cn(
            'tw-relative tw-w-full tw-min-w-0 tw-flex-shrink tw-grow tw-basis-32 tw-gap-2.5 tw-text-ellipsis tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 !tw-pe-10 tw-ps-4 tw-font-medium tw-text-foreground tw-shadow-none tw-outline-none',
            hasInputChanged &&
              (hasTopMatch
                ? 'focus-visible:tw-ring-green-600'
                : hasNoMatches && 'focus-visible:tw-ring-destructive'),
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
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          ref={ref}
        />
        {isFocused &&
          hasInputChanged &&
          (hasTopMatch ? (
            <Check className="tw-absolute tw-right-2 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-text-green-600" />
          ) : (
            hasNoMatches && (
              <CircleSlash className="tw-absolute tw-right-2 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-text-destructive" />
            )
          ))}
      </div>
    );
  },
);

export default BookChapterInput;
