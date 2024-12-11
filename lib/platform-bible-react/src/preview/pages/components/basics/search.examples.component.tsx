import SearchBar from '@/components/basics/search-bar.component';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';

// eslint-disable-next-line no-undef
let timer: NodeJS.Timeout;

function onSearchDebounced(search: string) {
  clearTimeout(timer);
  timer = setTimeout(() => alert(`you searched for ${search}`), 1000);
}

export default function SearchBarExamples({ direction }: HasDirection) {
  return (
    <div className="tw-flex tw-gap-2">
      <SearchBar onSearch={onSearchDebounced} direction={direction} />{' '}
      {direction === 'rtl' ? <>&rarr;</> : <>&larr;</>} type here
    </div>
  );
}
