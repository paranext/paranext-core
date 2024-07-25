import TextField from '@/components/basics/text-field.component';
import { useState } from 'react';

export type SearchBarProps = {
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

export default function SearchBar({ onSearch, placeholder, isFullWidth }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (searchString: string) => {
    setSearchQuery(searchString);
    onSearch(searchString);
  };

  return (
    <TextField
      isFullWidth={isFullWidth}
      className="search-bar-input"
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
}
