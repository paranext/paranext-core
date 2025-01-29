import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Direction, readDirection } from '@/utils/dir-helper.util';
import { cn } from '@/utils/shadcn-ui.util';
import { Search, X } from 'lucide-react';

/** Props for the SearchBar component. */
export type SearchBarProps = {
  /** Seach query for the search bar */
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
};

export default function SearchBar({
  value,
  onSearch,
  placeholder,
  isFullWidth,
  className,
}: SearchBarProps) {
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
        className="tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onSearch(e.target.value)}
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
}
