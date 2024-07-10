import { useState } from 'react';
import { ScriptureReference } from 'platform-bible-utils';
import ThemeToggle from '@/preview/theme-toggle.component';
import {
  BookChapterControl,
  DataTable,
  SearchBar,
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '../..';
import { HasDirection } from '../direction-toggle';
import { columns, data } from './data-sources/data-table-content';

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

function Compositions({ direction }: HasDirection) {
  const [scrRef, setScrRef] = useState(defaultScrRef);

  return (
    <VerticalTabs defaultValue="Book Chapter Control" dir={direction}>
      <VerticalTabsList>
        <VerticalTabsTrigger value="Search Bar">Search Bar</VerticalTabsTrigger>
        <VerticalTabsTrigger value="Book Chapter Control">Book Chapter Control</VerticalTabsTrigger>
        <VerticalTabsTrigger value="Theme Toggle">Theme Toggle</VerticalTabsTrigger>
        <VerticalTabsTrigger value="Data Table">Data Table</VerticalTabsTrigger>
      </VerticalTabsList>

      <VerticalTabsContent value="Search Bar">
        <SearchBar onSearch={(search) => alert(`you searched for ${search}`)} /> &larr; type here
      </VerticalTabsContent>

      <VerticalTabsContent value="Book Chapter Control">
        <BookChapterControl scrRef={scrRef} handleSubmit={setScrRef} />
        <div>{JSON.stringify(scrRef)}</div>
      </VerticalTabsContent>

      <VerticalTabsContent value="Theme Toggle">
        <ThemeToggle />
      </VerticalTabsContent>

      <VerticalTabsContent value="Data Table">
        <DataTable enablePagination showPaginationControls columns={columns} data={data} />
      </VerticalTabsContent>
    </VerticalTabs>
  );
}

export default Compositions;
