import SearchBar from '@/components/basics/search-bar.component';
import { Direction, readDirection } from '@/utils/dir-helper.util';

// eslint-disable-next-line no-undef
let timer: NodeJS.Timeout;

function onSearchDebounced(search: string) {
  clearTimeout(timer);
  timer = setTimeout(() => alert(`you searched for ${search}`), 1000);
}

export default function SearchBarExamples() {
  const dir: Direction = readDirection();
  return (
    <div className="tw-flex tw-gap-2">
      <SearchBar onSearch={onSearchDebounced} /> {dir === 'rtl' ? <>&rarr;</> : <>&larr;</>} type
      here
    </div>
  );
}
