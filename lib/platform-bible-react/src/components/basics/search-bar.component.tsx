import { Input } from '@/components/shadcn-ui/input';
import { cn } from '@/utils/shadcn-ui.util';
import { useState } from 'react';

/** Props for the SearchBar component. */
export type SearchBarProps = {
  /** Additional css classes to help with unique styling of the search bar */
  className?: string;
  /**
   * Callback fired to handle the search query when button pressed
   *
   * @param searchQuery
   */
  onSearch: (searchQuery: string) => void;

  /** Optional string that appears in the search bar without a search string */
  placeholder?: string;

  /** Optional boolean to set the input base to full width */
  isFullWidth?: boolean;
};

export default function SearchBar({
  className,
  onSearch,
  placeholder,
  isFullWidth,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (searchString: string) => {
    setSearchQuery(searchString);
    onSearch(searchString);
  };

  return (
    <Input
      className={cn(
        'tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-[color:hsl(240,5%,64.9%)] focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50',
        { 'tw-w-full': isFullWidth },
        className,
      )}
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
}
