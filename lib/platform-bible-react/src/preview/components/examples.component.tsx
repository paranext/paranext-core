import { Button } from '@/components/shadcn-ui/button';
import { ScriptureReference } from 'platform-bible-utils';
import { useState } from 'react';
import {
  BookChapterControl,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Tabs,
  TabsList,
  TabsTrigger,
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

function Examples({ direction }: HasDirection) {
  const [scrRef, setScrRef] = useState(defaultScrRef);

  return (
    <VerticalTabs defaultValue="Window" dir={direction}>
      <VerticalTabsList>
        <VerticalTabsTrigger value="Window">Window or Tab</VerticalTabsTrigger>
        <VerticalTabsTrigger value="Settings">Settings (n/a)</VerticalTabsTrigger>
      </VerticalTabsList>

      <VerticalTabsContent value="Window">
        <div className="pr-flex pr-flex-row pr-rounded-sm pr-rounded-b-none pr-border-2 pr-border-border pr-bg-muted/50">
          <div className="pr-m-2">
            <BookChapterControl scrRef={scrRef} handleSubmit={setScrRef} />
          </div>
          <div className="pr-grow" />
          <div className="pr-m-2 pr-flex">
            <Tabs defaultValue="a" dir={direction}>
              <TabsList>
                <TabsTrigger value="a">A</TabsTrigger>
                <TabsTrigger value="b">B</TabsTrigger>
              </TabsList>
            </Tabs>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">&#x22ee;</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Tab Options</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="pr-flex pr-justify-between pr-gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <span>Zoom</span>
                    <span className="pr-flex pr-gap-2">
                      <span>50%</span>
                      <span>-----o-----</span>
                      <span>200%</span>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="pr-flex pr-justify-between pr-gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <span>View</span>
                    <span>[Publish v]</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="pr-flex pr-justify-between pr-gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <span>Scroll with</span>
                    <Tabs defaultValue="a" dir={direction}>
                      <TabsList className="pr-h-7">
                        <TabsTrigger className="pr-h-6 pr-w-0" value="a">
                          A
                        </TabsTrigger>
                        <TabsTrigger className="pr-h-6 pr-w-0" value="b">
                          B
                        </TabsTrigger>
                        <TabsTrigger className="pr-h-6 pr-w-0" value="c">
                          C
                        </TabsTrigger>
                        <TabsTrigger className="pr-h-6 pr-w-0" value="d">
                          D
                        </TabsTrigger>
                        <TabsTrigger className="pr-h-6 pr-w-0" value="-">
                          -
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="pr-flex pr-justify-between pr-gap-2">
                    <span>1 item in a group</span>
                    <DropdownMenuShortcut>CTRL⇧F</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="pr-flex pr-justify-between pr-gap-2">
                  <span>Item without group</span>
                  <DropdownMenuShortcut>CTRL⇧F</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost">X</Button>
          </div>
          <Button
            className="pr-h-14 pr-w-14 pr-rounded-t-none pr-rounded-ee-none pr-rounded-ss-none"
            variant="secondary"
          >
            <p className="pr-text-2xl">+</p>
          </Button>
        </div>
        <div className="pr-rounded-sm pr-rounded-t-none pr-border-2 pr-border-t-0 pr-border-border pr-p-4">
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

export default Examples;
