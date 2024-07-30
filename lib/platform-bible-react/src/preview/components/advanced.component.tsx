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
import MarketplaceButtonExamples from '@/preview/components/advanced/marketplace-buttons.example.component';
import ScriptureResultsViewerExample from '@/preview/components/advanced/scripture-results-viewer.examples.component';
import { columns, data } from '@/preview/components/data-sources/data-table-content';
import NavigationContentSearch from '@/components/advanced-components/navigation-content-search.component';
import SettingsListExamples from './advanced/settings-list.examples.component';

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

function Compositions({ direction }: HasDirection) {
  const [scrRef, setScrRef] = useState(defaultScrRef);
  const [searchValue, setSearchValue] = useState<string>('');

  const tabList = [
    {
      key: 'tab1',
      value: 'tab1',
      content: (
        <div>
          <h1>TAB 1 CONTENT</h1>
        </div>
      ),
    },
    {
      key: 'tab2',
      value: 'tab2',
      content: (
        <div>
          <h3>TAB 2 CONTENT</h3>
        </div>
      ),
    },
    {
      key: 'tab3',
      value: 'tab3',
      content: (
        <div>
          <h2>TAB 3 CONTENT</h2>
        </div>
      ),
    },
  ];

  const handleSearchChange = (newSearchValue: string) => {
    setSearchValue(newSearchValue);
  };

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
          <VerticalTabsTrigger value="Marketplace Buttons">Marketplace Buttons</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Result List">Result List</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Inventory">Inventory</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Navigation Content Search">
            Navigation Content Search
          </VerticalTabsTrigger>
          <VerticalTabsTrigger value="Settings List">Settings Components</VerticalTabsTrigger>
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

        <VerticalTabsContent value="Marketplace Buttons">
          <MarketplaceButtonExamples />
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

        <VerticalTabsContent value="Navigation Content Search">
          <NavigationContentSearch
            headerTitle={`Testing the NavigationContentSearch, current search value: ${searchValue}`}
            tabList={tabList}
            onSearch={handleSearchChange}
            searchPlaceholder="Search..."
            isSearchBarFullWidth
          />
        </VerticalTabsContent>

        <VerticalTabsContent value="Settings List">
          <SettingsListExamples />
        </VerticalTabsContent>
      </VerticalTabs>
    </div>
  );
}

export default Compositions;
