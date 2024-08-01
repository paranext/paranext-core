import BookChapterControl from '@/components/advanced-components/book-chapter-control/book-chapter-control.component';
import DataTable from '@/components/advanced-components/data-table/data-table.component';
import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '@/components/basics/tabs-vertical';
import CharacterInventory from '@/components/paratext-10-studio-components/inventory/character-inventory.component';
import { HasDirection } from '@/preview/preview-components/direction-toggle';
import ThemeToggle from '@/preview/preview-components/theme-toggle.component';
import { ScriptureReference } from 'platform-bible-utils';
import { useState } from 'react';
import MarketplaceButtonExamples from './advanced/marketplace-buttons.example.component';
import ScriptureResultsViewerExample from './advanced/scripture-results-viewer.examples.component';
import { columns, data } from './data-sources/data-table-content';
import MarketplaceExamples from './advanced/marketplace.example.component';

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

function Compositions({ direction }: HasDirection) {
  const [scrRef, setScrRef] = useState(defaultScrRef);

  return (
    <div>
      <p className="pr-mb-2 pr-text-muted-foreground">
        A place for components that are composed from basic components
      </p>
      <VerticalTabs defaultValue="Book Chapter Control" dir={direction}>
        <VerticalTabsList>
          <VerticalTabsTrigger value="Book Chapter Control">
            Book Chapter Control
          </VerticalTabsTrigger>
          <VerticalTabsTrigger value="Theme Toggle">Theme Toggle</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Data Table">Data Table</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Marketplace">Marketplace</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Result List">Result List</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Inventory">Inventory</VerticalTabsTrigger>
        </VerticalTabsList>

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

        <VerticalTabsContent value="Marketplace">
          <VerticalTabs dir={direction}>
            <VerticalTabsList>
              <VerticalTabsTrigger value="Marketplace Buttons">
                Marketplace Buttons
              </VerticalTabsTrigger>
              <VerticalTabsTrigger value="Marketplace Components">
                Marketplace Components
              </VerticalTabsTrigger>
            </VerticalTabsList>

            <VerticalTabsContent value="Marketplace Buttons">
              <MarketplaceButtonExamples />
            </VerticalTabsContent>

            <VerticalTabsContent value="Marketplace Components">
              <MarketplaceExamples />
            </VerticalTabsContent>
          </VerticalTabs>
        </VerticalTabsContent>

        <VerticalTabsContent value="Result List">
          <ScriptureResultsViewerExample />
        </VerticalTabsContent>

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
              throw new Error('getSetting not implemented.');
            }}
          />
        </VerticalTabsContent>
      </VerticalTabs>
    </div>
  );
}

export default Compositions;
