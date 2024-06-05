import { useState } from 'react';
import { ScriptureReference } from 'platform-bible-utils';
import ThemeToggle from '@/preview/theme-toggle.component';
import {
  BookChapterControl,
  RefSelector,
  SearchBar,
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '../..';

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

function Compositions() {
  const [scrRef, setScrRef] = useState(defaultScrRef);

  return (
    <VerticalTabs defaultValue="Book Chapter Control">
      <VerticalTabsList>
        <VerticalTabsTrigger value="Search Bar">Search Bar</VerticalTabsTrigger>
        <VerticalTabsTrigger value="Book Chapter Control">Book Chapter Control</VerticalTabsTrigger>
        <VerticalTabsTrigger value="Theme Toggle">Theme Toggle</VerticalTabsTrigger>
      </VerticalTabsList>

      <VerticalTabsContent value="Search Bar">
        <SearchBar onSearch={() => {}} />
      </VerticalTabsContent>

      <VerticalTabsContent value="Book Chapter Control">
        <RefSelector scrRef={scrRef} handleSubmit={setScrRef} />
        <div className="bcv-control-div">
          <BookChapterControl scrRef={scrRef} handleSubmit={setScrRef} />
        </div>
        <div>{JSON.stringify(scrRef)}</div>
      </VerticalTabsContent>

      <VerticalTabsContent value="Theme Toggle">
        <ThemeToggle />
      </VerticalTabsContent>
    </VerticalTabs>
  );
}

export default Compositions;
