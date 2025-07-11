import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Direction, readDirection } from '@/utils/dir-helper.util';
import { cn } from '@/utils/shadcn-ui.util';
import { Search, X } from 'lucide-react';
import { forwardRef } from 'react';

/** Props for the SearchBar component. */
export type SearchBarProps = {
  /** Search query for the search bar */
  value: string;
  /**
   * Callback fired to handle the search query is updated
   *
   * @param searchQuery
   */
  onSearch: (searchQuery: string) => void;

  /** Optional string that appears in the search bar without a search string */
  placeholder?: string;

  /** Optional boolean to set the input base to full width */
  isFullWidth?: boolean;

  /** Additional css classes to help with unique styling of the search bar */
  className?: string;

  /** Optional boolean to disable the search bar */
  isDisabled?: boolean;
};

/**
 * A search bar component with a search icon and a clear button when the search query is not empty.
 *
 * @param {SearchBarProps} props - The props for the component.
 * @param {string} props.value - The search query for the search bar
 * @param {(searchQuery: string) => void} props.onSearch - Callback fired to handle the search query
 *   is updated
 * @param {string} [props.placeholder] - Optional string that appears in the search bar without a
 *   search string
 * @param {boolean} [props.isFullWidth] - Optional boolean to set the input base to full width
 * @param {string} [props.className] - Additional css classes to help with unique styling of the
 *   search bar
 * @param {boolean} [props.isDisabled] - Optional boolean to disable the search bar
 */
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onSearch, placeholder, isFullWidth, className, isDisabled = false }, inputRef) => {
    const dir: Direction = readDirection();

    return (
      <div className={cn('tw-relative', { 'tw-w-full': isFullWidth }, className)}>
        <Search
          className={cn(
            'tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50',
            { 'tw-right-3': dir === 'rtl' },
            { 'tw-left-3': dir === 'ltr' },
          )}
        />
        <Input
          ref={inputRef}
          className="tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          disabled={isDisabled}
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent',
              { 'tw-left-0': dir === 'rtl' },
              { 'tw-right-0': dir === 'ltr' },
            )}
            onClick={() => {
              onSearch('');
            }}
          >
            <X className="tw-h-4 tw-w-4" />
            <span className="tw-sr-only">Clear</span>
          </Button>
        )}
      </div>
    );
  },
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
