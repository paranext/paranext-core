import React, { useState } from 'react';
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
import { HasDirection } from '../direction-toggle';

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
      </VerticalTabsList>

      <VerticalTabsContent value="Search Bar">
        <SearchBar onSearch={() => {}} />
      </VerticalTabsContent>

      <VerticalTabsContent value="Book Chapter Control">
        <RefSelector scrRef={scrRef} handleSubmit={setScrRef} />
        <BookChapterControl scrRef={scrRef} handleSubmit={setScrRef} />
        <div>{JSON.stringify(scrRef)}</div>
      </VerticalTabsContent>

      <VerticalTabsContent value="Theme Toggle">
        <ThemeToggle />
      </VerticalTabsContent>
    </VerticalTabs>
  );
}

export default Compositions;
