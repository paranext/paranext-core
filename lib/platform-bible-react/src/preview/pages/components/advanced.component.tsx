import { BookChapterControl } from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { DataTable } from '@/components/advanced/data-table/data-table.component';
import { ScrollGroupSelector } from '@/components/advanced/scroll-group-selector.component';
import { TabNavigationContentSearch } from '@/components/advanced/tab-navigation-content-search.component';
import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '@/components/basics/tabs-vertical';
import { defaultScrRef, ScrollGroupId } from 'platform-bible-utils';
import { useState } from 'react';
import { FilterExample } from './advanced/filter-example';
import { InventoryExample } from './advanced/inventory-example.component';
import { MarkdownRendererExample } from './advanced/markdown-renderer-example.component';
import { MarketplaceExamples } from './advanced/marketplace.example.component';
import { MultiSelectComboBoxExample } from './advanced/multi-select-combo-box-example';
import { ScriptureResultsViewerExample } from './advanced/scripture-results-viewer.examples.component';
import { SettingsListExamples } from './advanced/settings-list.examples.component';
import { TabToolbarExample } from './advanced/tab-toolbar-example.component';
import { UiLanguageSelectorExample } from './advanced/ui-language-selector-example.component';
import { columns, data } from './data-sources/data-table-content';
import { TabDropdownMenuExample } from './advanced/tab-dropdown-menu-example.component';
import { SettingSidebarContentSearchExamples } from './advanced/settings-sidebar-content-search.example.component';
import { PlatformMenubarExample } from './advanced/platform-menubar-example.component';
import { ScopeSelectorExample } from './advanced/scope-selector-example.component';

export function Compositions() {
  const [scrRef, setScrRef] = useState(defaultScrRef);
  const [scrollGroupId, setScrollGroupId] = useState<ScrollGroupId | undefined>(0);
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
      <p className="tw-mb-2 tw-text-muted-foreground">
        A place for components that are composed from basic components
      </p>
      <VerticalTabs defaultValue="Book Chapter Control">
        <VerticalTabsList>
          <VerticalTabsTrigger value="Book Chapter Control">
            Book Chapter Control
          </VerticalTabsTrigger>
          <VerticalTabsTrigger value="Data Table">Data Table</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Filter">Filter</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Inventory">Inventory</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Markdown Renderer">Markdown Renderer</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Marketplace">Marketplace</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Multi-select Combo Box">
            Multi-select Combo Box
          </VerticalTabsTrigger>
          <VerticalTabsTrigger value="Navigation Content Search">
            Navigation Content Search
          </VerticalTabsTrigger>
          <VerticalTabsTrigger value="Platform Menubar">Platform Menubar</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Result List">Result List</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Scope Selector">Scope Selector</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Scroll Group Selector">
            Scroll Group Selector
          </VerticalTabsTrigger>
          <VerticalTabsTrigger value="Settings List">Settings List</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Settings Sidebar Content Search">
            Settings Sidebar Content Search
          </VerticalTabsTrigger>
          <VerticalTabsTrigger value="Tab Dropdown Menu">Tab Dropdown Menu</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Tab Toolbar">Tab Toolbar</VerticalTabsTrigger>
          <VerticalTabsTrigger value="UI Language Selector">
            UI Language Selector
          </VerticalTabsTrigger>
        </VerticalTabsList>

        <VerticalTabsContent value="Book Chapter Control">
          <BookChapterControl scrRef={scrRef} handleSubmit={setScrRef} />
        </VerticalTabsContent>

        <VerticalTabsContent value="Data Table">
          <DataTable enablePagination showPaginationControls columns={columns} data={data} />
        </VerticalTabsContent>

        <VerticalTabsContent value="Tab Toolbar">
          <TabToolbarExample />
        </VerticalTabsContent>

        <VerticalTabsContent value="Filter">
          <FilterExample />
        </VerticalTabsContent>

        <VerticalTabsContent value="Markdown Renderer">
          <MarkdownRendererExample />
        </VerticalTabsContent>

        <VerticalTabsContent value="Marketplace">
          <MarketplaceExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Multi-select Combo Box">
          <MultiSelectComboBoxExample />
        </VerticalTabsContent>

        <VerticalTabsContent value="Inventory">
          <InventoryExample />
        </VerticalTabsContent>

        <VerticalTabsContent value="Navigation Content Search">
          <TabNavigationContentSearch
            headerTitle={`Testing the NavigationContentSearch, current search value: ${searchValue}`}
            tabList={tabList}
            searchValue={searchValue}
            onSearch={handleSearchChange}
            searchPlaceholder="Search..."
            searchClassName="tw-w-9/12 tw-py-2"
          />
        </VerticalTabsContent>

        <VerticalTabsContent value="Platform Menubar">
          <PlatformMenubarExample />
        </VerticalTabsContent>

        <VerticalTabsContent value="Result List">
          <ScriptureResultsViewerExample />
        </VerticalTabsContent>

        <VerticalTabsContent value="Scope Selector">
          <ScopeSelectorExample />
        </VerticalTabsContent>

        <VerticalTabsContent value="Scroll Group Selector">
          <ScrollGroupSelector
            availableScrollGroupIds={[undefined, ...Array(5).keys()]}
            scrollGroupId={scrollGroupId}
            onChangeScrollGroupId={setScrollGroupId}
          />
          <div>Scroll Group Id: {`${scrollGroupId}`}</div>
        </VerticalTabsContent>

        <VerticalTabsContent value="Settings List">
          <SettingsListExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Settings Sidebar Content Search">
          <SettingSidebarContentSearchExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Tab Dropdown Menu">
          <TabDropdownMenuExample />
        </VerticalTabsContent>

        <VerticalTabsContent value="UI Language Selector">
          <UiLanguageSelectorExample />
        </VerticalTabsContent>
      </VerticalTabs>
    </div>
  );
}

export default Compositions;
