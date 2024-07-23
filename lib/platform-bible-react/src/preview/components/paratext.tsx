import { useState } from 'react';
import { ScriptureReference } from 'platform-bible-utils';
import {
  CharacterInventory,
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '../..';
import { HasDirection } from '../direction-toggle';
import MarketplaceButtonExamples from './paratext/buttons.example.component';

function Paratext({ direction }: HasDirection) {
  const defaultScrRef: ScriptureReference = {
    bookNum: 1,
    chapterNum: 1,
    verseNum: 1,
  };
  const [scrRef, setScrRef] = useState(defaultScrRef);
  return (
    <div>
      <p className="pr-mb-2 pr-text-muted-foreground">
        A place to develop components for Paratext 10 Studio, that would later be moved to a
        separate Paratext extensions repo
      </p>
      <VerticalTabs defaultValue="Result List" dir={direction}>
        <VerticalTabsList>
          <VerticalTabsTrigger value="Marketplace Buttons">Marketplace Buttons</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Result List">Result List</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Inventory">Inventory</VerticalTabsTrigger>
        </VerticalTabsList>

        <VerticalTabsContent value="Marketplace Buttons">
          <MarketplaceButtonExamples />
        </VerticalTabsContent>
        <VerticalTabsContent value="Result List">TODO</VerticalTabsContent>

        <VerticalTabsContent value="Inventory">
          <CharacterInventory
            scriptureReference={scrRef}
            setScriptureReference={setScrRef}
            localizedStrings={{}}
            projectId=""
            setSetting={() => {}}
            getText={(): Promise<string | undefined> => {
              throw new Error('getText not implemented.');
            }}
            getSetting={(): Promise<string[]> => {
              throw new Error('Function not implemented.');
            }}
          />
        </VerticalTabsContent>
      </VerticalTabs>
    </div>
  );
}

export default Paratext;
