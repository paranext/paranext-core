import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from 'platform-bible-react';
import ChecksFilterDropdown from './checks-filter-dropdown.component';
import { Label, RadioGroup, RadioGroupItem } from 'platform-bible-react';
import FilterPopover from './filter-popover.component';

/**
 * Enum representing the different scopes that can be selected for checks.
 *
 * - `Chapter`: Scope of a single chapter.
 * - `Book`: Scope of an entire book.
 * - `All`: Scope of the entire project.
 */
export enum CheckScopes {
  Chapter = 'Chapter',
  Book = 'Book',
  All = 'All',
  /**
   * Section of project text that the user can currently see. Not yet implemented, commented out so
   * that it can still enumerate through these values
   */
  // VisibleText = 'VisibleText',
}

type ChecksScopeFilterProps = {
  /** Callback function to handle the selection of a scope. */
  handleSelectScope: (scope: CheckScopes) => void;
  /** The currently selected scope */
  selectedScope: CheckScopes;
};

const CHECK_SCOPE_FILTER_STRINGS: { [key in CheckScopes]: LocalizeKey } = {
  Chapter: '%webView_checksSidePanel_scopeFilter_chapter%',
  Book: '%webView_checksSidePanel_scopeFilter_book%',
  All: '%webView_checksSidePanel_scopeFilter_all%',
};

const LOCALIZED_STRINGS: LocalizeKey[] = ['%webView_checksSidePanel_scopeFilter_label%'];

/**
 * ChecksScopeFilter component provides a dropdown to select the scope for running checks. Users can
 * choose between Chapter, Book, or All scopes. The component leverages popover and radio group
 * elements for the UI and triggers a callback function when the scope changes.
 */
export default function ChecksScopeFilter({
  handleSelectScope,
  selectedScope: selectedScopeFromWebView,
}: ChecksScopeFilterProps) {
  const [selectedScope, setSelectedScope] = useState<CheckScopes>(selectedScopeFromWebView);
export default function ChecksScopeFilter({ handleSelectScope }: ChecksScopeFilterProps) {
  const [selectedScope, setSelectedScope] = useState<CheckScopes>(CheckScopes.Chapter);
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => Object.values(CHECK_SCOPE_FILTER_STRINGS).concat(LOCALIZED_STRINGS), []),
  );

  const onScopeChange = useCallback(
    (newScope: string) => {
      // The scope is a string but we are using tighter types in this component
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const scope = newScope as CheckScopes;
      setSelectedScope(scope);
      handleSelectScope(scope);
    },
    [handleSelectScope],
  );

  const getScopeLabel = useCallback(
    (scope: string) => {
      // The scope is a string but we are using tighter types in this component
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return localizedStrings[CHECK_SCOPE_FILTER_STRINGS[scope as CheckScopes]];
    },
    [localizedStrings],
  );

  return (
    <ChecksFilterDropdown
    <FilterPopover
      selectedValue={selectedScope}
      radioGroupLabel={localizedStrings['%webView_checksSidePanel_scopeFilter_label%']}
      getSelectedValueLabel={getScopeLabel}
    >
      <DropdownMenuRadioGroup value={selectedScope} onValueChange={onScopeChange}>
      <RadioGroup value={selectedScope} onValueChange={onScopeChange} className="tw-p-3">
        {Object.values(CheckScopes).map((scope) => (
          <DropdownMenuRadioItem key={scope} value={scope} id={scope}>
            {getScopeLabel(scope)}
          </DropdownMenuRadioItem>
          <div key={scope} className="tw-flex tw-gap-2 tw-items-center">
            <RadioGroupItem value={scope} id={scope} />
            <Label htmlFor={scope} className="tw-flex-1 tw-text-sm tw-font-normal">
              {getScopeLabel(scope)}
            </Label>
          </div>
        ))}
      </DropdownMenuRadioGroup>
    </ChecksFilterDropdown>
      </RadioGroup>
    </FilterPopover>
  );
}
