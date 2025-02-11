import { useMemo, useState } from "react";
import FilterPopover from "./filter-popover.component";
import { LocalizeKey } from "platform-bible-utils";
import { useLocalizedStrings } from "@papi/frontend/react";

/** Props for ChecksCheckTypeFilter component  */
type ChecksCheckTypeFilterProps = {
  /** Callback function to handle the most recent selection of a check type*/
  handleSelectCheckTypeToggle: (toggledCheckId: string) => void;
/** The most recently selected checkType */
  initialSelectedCheckIds: string[];
}



const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_checksSidePanel_checkTypeFilter_label%',
  '%webView_checkResultsList_unspecifiedCheckId%',
  '%webView_checkResultsList_unspecifiedCheckDescription%',
]

/** Dropdown component to select a project to run checks for */
export default function ChecksCheckTypeFilter({
  handleSelectCheckTypeToggle,
  initialSelectedCheckIds,
}: ChecksCheckTypeFilterProps) {
  const [selectedCheckIds, setSelectedCheckIds] = useState<string[]>( initialSelectedCheckIds || [],);
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []))

  return (
    <FilterPopover selectedValue={""} radioGroupLabel={""} getSelectedValueLabel={function (value: string): string {
      throw new Error("Function not implemented.");
    } }>

    </FilterPopover>
  )
}
