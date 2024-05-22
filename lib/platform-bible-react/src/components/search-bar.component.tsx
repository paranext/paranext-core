import { Paper } from '@mui/material';
import { useState } from 'react';
import TextField from '@/components/text-field.component';
import '@/components/search-bar.component.css';

export type SearchBarProps = {
  /**
   * Callback fired to handle the search query when button pressed
   *
   * @param searchQuery
   */
  onSearch: (searchQuery: string) => void;

  /** Optional string that appears in the search bar without a search string */
  placeholder?: string;
};

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (searchString: string) => {
    setSearchQuery(searchString);
    onSearch(searchString);
  };

  return (
    <Paper component="form" className="search-bar-paper">
      <TextField
        className="search-bar-input"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </Paper>
  );
}
