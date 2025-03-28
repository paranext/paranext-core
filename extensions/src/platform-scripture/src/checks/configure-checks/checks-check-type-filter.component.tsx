import { ReactNode, useCallback, useMemo, useState } from 'react';
import { formatReplacementString, LocalizeKey } from 'platform-bible-utils';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Checklist, DropdownMenuGroup, Separator } from 'platform-bible-react';
import { logger } from '@papi/frontend';
import { ChecksFilterDropdown } from './checks-filter-dropdown.component';

const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_checksSidePanel_checkTypeFilter_countLabel%',
  '%webview_checksSidePanel_checkTypeFilter_deselectAll%',
  '%webView_checksSidePanel_checkTypeFilter_label%',
  '%webview_checksSidePanel_checkTypeFilter_selectAll%',
  '%webview_checksSidePanel_checkTypeFilter_setUp%',
];

// function SetUp(setUpLink: string, localizedSetUp: string) {
//   if (setUpLink && setUpLink !== '') {
//     return (
//       <div className="tw-text-blue-700 tw-text-right">
//         <a href="www.google.com">{localizedSetUp}</a>
//       </div>
//     );
//   }
//   return <div className="tw-text-right" />;
// }

/** Props for ChecksCheckTypeFilter component */
type ChecksCheckTypeFilterProps = {
  /**
   * Format of items: Localized display names of checks comma checkId comma set up link (e.g.
   * Palabras Repetidas,RepeatedWords,example.link)
   */
  filterItems: string[];
  /** Callback function to handle the most recent selection of a check type */
  handleSelectCheckTypeToggle: (selectedCheckIds: string[]) => void;
  /** The most recently selected checkTypes */
  selectedCheckTypeIds: string[];
};

/**
 * Details needed to display a localized name of the check, its set up link, and to find the actual
 * check the localized name relates to
 */
type CheckDisplayDetails = {
  /** Localized display name of the check */
  checkName: string;
  /** Unique identifier of the check */
  checkId: string;
  // TODO: Might need to change this to a command that we call when it is clicked on, but not sure
  // until we implement this more as part of https://paratextstudio.atlassian.net/browse/PT-2279
  /** Optional link to the relevant settings/inventories to set up */
  setUpLink?: string;
};

/** Dropdown component to select a project to run checks for */
export default function ChecksCheckTypeFilter({
  handleSelectCheckTypeToggle,
  filterItems,
  selectedCheckTypeIds: selectedCheckTypesFromWebview,
}: ChecksCheckTypeFilterProps) {
  const [selectedCheckTypeIds, setSelectedCheckTypeIds] = useState<string[]>(
    selectedCheckTypesFromWebview || [],
  );
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));
  const checkNameToDetails: CheckDisplayDetails[] = useMemo<CheckDisplayDetails[]>(
    () =>
      filterItems.map((filterItem) => {
        const [checkName, checkId, checkLink] = filterItem.split(',');
        if (!checkId)
          logger.warn(
            `Check identifies not in correct format (i.e. name,id,setupLink(link optional)): ${checkName}`,
          );
        return { checkName, checkId: checkId || '', setUpLink: checkLink || '' };
      }),
    [filterItems],
  );

  const createComplexLabel = useCallback(
    (item: string): ReactNode => {
      // The following commented out lines will be relevant once set up link support is implemented.
      // const link = checkNameToDetails.find((check) => check.checkName === item)?.setUpLink ?? '';
      return (
        <div>
          <div className="tw-text-start">{item}</div>
          {/* {SetUp(link, localizedStrings['%webview_checksSidePanel_checkTypeFilter_setUp%'])} */}
        </div>
      );
    },
    // [checkNameToDetails, localizedStrings],
    [],
  );

  const selectedChecksCountLabel = useMemo(
    () =>
      formatReplacementString(
        localizedStrings['%webView_checksSidePanel_checkTypeFilter_countLabel%'],
        {
          resultsCount: selectedCheckTypeIds.length,
        },
      ),
    [localizedStrings, selectedCheckTypeIds],
  );

  const getSelectionLabel = useCallback(() => {
    const selectionLabel =
      selectedCheckTypeIds.length > 0
        ? localizedStrings['%webview_checksSidePanel_checkTypeFilter_deselectAll%']
        : localizedStrings['%webview_checksSidePanel_checkTypeFilter_selectAll%'];
    return <span>{selectionLabel}</span>;
  }, [localizedStrings, selectedCheckTypeIds.length]);

  const onSelectionToggle = useCallback(() => {
    if (selectedCheckTypeIds.length > 0) {
      const newIds: string[] = [];
      setSelectedCheckTypeIds(newIds);
      handleSelectCheckTypeToggle(newIds);
    } else {
      const newIds = checkNameToDetails.map((check) => check.checkId);
      setSelectedCheckTypeIds(newIds);
      handleSelectCheckTypeToggle(newIds);
    }
  }, [checkNameToDetails, handleSelectCheckTypeToggle, selectedCheckTypeIds]);

  const onSelectedCheckTypesChange = useCallback(
    (toggledCheckName: string) => {
      const toggledCheckId = checkNameToDetails.find(
        (check) => check.checkName === toggledCheckName,
      )?.checkId;
      if (!toggledCheckId) {
        logger.warn(`No checkId found for check name: ${toggledCheckName}`);
        return;
      }

      if (selectedCheckTypeIds.includes(toggledCheckId)) {
        const newIds = selectedCheckTypeIds.filter((checkId) => checkId !== toggledCheckId);
        setSelectedCheckTypeIds(newIds);
        handleSelectCheckTypeToggle(newIds);
      } else {
        const newIds = [...selectedCheckTypeIds, toggledCheckId];
        setSelectedCheckTypeIds(newIds);
        handleSelectCheckTypeToggle(newIds);
      }
    },
    [checkNameToDetails, handleSelectCheckTypeToggle, selectedCheckTypeIds],
  );

  return (
    <ChecksFilterDropdown
      selectedValue=""
      radioGroupLabel={localizedStrings['%webView_checksSidePanel_checkTypeFilter_label%']}
      getSelectedValueLabel={() => selectedChecksCountLabel}
    >
      <DropdownMenuGroup>
        <Checklist
          id="checksCheckList"
          listItems={checkNameToDetails.map((check) => check.checkName)}
          selectedListItems={
            checkNameToDetails
              .filter((check) => selectedCheckTypeIds.includes(check.checkId))
              .map((check) => check.checkName) ?? []
          }
          handleSelectListItem={onSelectedCheckTypesChange}
          createComplexLabel={createComplexLabel}
        />
      </DropdownMenuGroup>
      <Separator />
      <div className="tw-text-center tw-p-2">
        <button type="button" onClick={onSelectionToggle}>
          {getSelectionLabel()}
        </button>
      </div>
    </ChecksFilterDropdown>
  );
}
