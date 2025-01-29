import SearchBar from '@/components/basics/search-bar.component';
import { Direction, readDirection } from '@/utils/dir-helper.util';
import { useState } from 'react';

// eslint-disable-next-line no-undef
let timer: NodeJS.Timeout;

export default function SearchBarExamples() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const onSearchDebounced = (search: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => alert(`you searched for ${search}`), 1000);
    setSearchQuery(search);
  };

  const dir: Direction = readDirection();
  return (
    <div className="tw-flex tw-gap-2">
      <SearchBar value={searchQuery} onSearch={onSearchDebounced} />{' '}
      {dir === 'rtl' ? <>&rarr;</> : <>&larr;</>} type here
    </div>
  );
}
