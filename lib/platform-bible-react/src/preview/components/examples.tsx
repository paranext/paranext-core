import { useState } from 'react';
import { ScriptureReference } from 'platform-bible-utils';
import { Button } from '@/components/shadcn-ui/button';
import {
  BookChapterControl,
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
    <VerticalTabs defaultValue="Window">
      <VerticalTabsList>
        <VerticalTabsTrigger value="Window">Window / Tab</VerticalTabsTrigger>
      </VerticalTabsList>

      <VerticalTabsContent value="Window">
        <div className="pr-flex pr-flex-row pr-rounded-sm pr-border-2 pr-border-transparent pr-bg-muted">
          <div className="bcv-control-div">
            <BookChapterControl scrRef={scrRef} handleSubmit={setScrRef} />
          </div>
          <div className="pr-grow" />
          <div className="bcv-control-div pr-flex pr-space-x-2">
            <Button>&#x22ee;</Button>
            <Button>Help</Button>
            <Button>X</Button>
          </div>
        </div>
        <div className="pr-rounded-sm pr-border-2 pr-border-t-0 pr-border-muted pr-p-4">
          <p>
            Imagine here the text of <code>{JSON.stringify(scrRef)}</code>
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>
      </VerticalTabsContent>
    </VerticalTabs>
  );
}

export default Compositions;
