import { SearchBar } from '@/components/basics/search-bar.component';
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

  /** The search query in the search bar */
  searchValue: string;

  /** Handler to run when the value of the search bar changes */
  onSearch: (searchQuery: string) => void;

  /** Optional placeholder for the search bar */
  searchPlaceholder?: string;

  /** Optional title to include in the header */
  headerTitle?: string;

  /** Optional className to modify the search input */
  searchClassName?: string;
};

/**
 * TabNavigationContentSearch component provides a vertical tab navigation interface with a search
 * bar at the top. This component allows users to filter content within tabs based on a search
 * query.
 *
 * @param {TabNavigationContentSearchProps} props
 * @param {TabKeyValueContent[]} props.tabList - List of objects containing keys, values, and
 *   content for each tab to be displayed.
 * @param {string} props.searchValue - The current value of the search input.
 * @param {function} props.onSearch - Callback function called when the search input changes;
 *   receives the new search query as an argument.
 * @param {string} [props.searchPlaceholder] - Optional placeholder text for the search input.
 * @param {string} [props.headerTitle] - Optional title to display above the search input.
 * @param {string} [props.searchClassName] - Optional CSS class name to apply custom styles to the
 *   search input.
 */
export function TabNavigationContentSearch({
  tabList,
  searchValue,
  onSearch,
  searchPlaceholder,
  headerTitle,
  searchClassName,
}: TabNavigationContentSearchProps) {
  return (
    <div className="pr-twp">
      <div className="tw-sticky tw-top-0 tw-space-y-2 tw-pb-2">
        {headerTitle ? <h1>{headerTitle}</h1> : ''}
        <SearchBar
          className={searchClassName}
          value={searchValue}
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

export default TabNavigationContentSearch;
