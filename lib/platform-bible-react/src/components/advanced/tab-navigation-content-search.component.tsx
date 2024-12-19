import SearchBar from '@/components/basics/search-bar.component';
import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '@/components/basics/tabs-vertical';
import { ReactNode } from 'react';

export type TabKeyValueContent = {
  key: string;
  value: string;
  content: ReactNode;
};

export type TabNavigationContentSearchProps = {
  /** List of values and keys for each tab this component should provide */
  tabList: TabKeyValueContent[];

  /** Handler to run when the value of the search bar changes */
  onSearch: (searchQuery: string) => void;

  /** Optional placeholder for the search bar */
  searchPlaceholder?: string;

  /** Optional title to include in the header */
  headerTitle?: string;

  /** Optional flag to make the search bar appear full width */
  isSearchBarFullWidth?: boolean;
};

export default function TabNavigationContentSearch({
  tabList,
  onSearch,
  searchPlaceholder,
  headerTitle,
  isSearchBarFullWidth = false,
}: TabNavigationContentSearchProps) {
  return (
    <div className="pr-twp">
      <div className="tw-sticky tw-top-0 tw-space-y-2 tw-pb-2">
        {headerTitle ? <h1>{headerTitle}</h1> : ''}
        <SearchBar
          isFullWidth={isSearchBarFullWidth}
          onSearch={onSearch}
          placeholder={searchPlaceholder}
        />
      </div>
      <VerticalTabs>
        <VerticalTabsList>
          {tabList.map((tab) => (
            <VerticalTabsTrigger key={tab.key} value={tab.value}>
              {tab.value}
            </VerticalTabsTrigger>
          ))}
        </VerticalTabsList>
        {tabList.map((tab) => (
          <VerticalTabsContent key={tab.key} value={tab.value}>
            {tab.content}
          </VerticalTabsContent>
        ))}
      </VerticalTabs>
    </div>
  );
}
