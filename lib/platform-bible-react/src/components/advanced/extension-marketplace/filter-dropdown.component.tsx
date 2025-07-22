import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
} from '@/components/shadcn-ui/dropdown-menu';
import { Button } from '@/components/shadcn-ui/button';
import { ChevronDown, Filter } from 'lucide-react';
import { useState } from 'react';

/** The DropdownMenuItemType enum is used to determine the type of the dropdown item */
export enum DropdownMenuItemType {
  Check,
  Radio,
}

export type DropdownItem = {
  /** Unique identifier for this dropdown */
  id: string;
  /** The label is the text that will be displayed on the dropdown item. */
  label: string;
  /** The onUpdate function is called when the state of a dropdown item is changed. */
  onUpdate: (id: string, checked?: boolean) => void;
};

export type DropdownGroup = {
  /**
   * The label is the text that will be displayed on the dropdown group. It is used to categorize
   * the items in the group.
   */
  label: string;
  /** The itemType determines the DropdownMenuItemType type as either Check or Radio. */
  itemType: DropdownMenuItemType;
  /** The items array contains the items that will be displayed in the dropdown group */
  items: DropdownItem[];
};

export type FilterDropdownProps = {
  /** Object unique identifier */
  id?: string;
  /** Label for the trigger button */
  label: string;
  /** The groups array contains the groups that will be displayed in the dropdown */
  groups: DropdownGroup[];
}; // TODO: extend the props later

/**
 * The FilterDropdown component is a dropdown designed for filtering content. It includes groups of
 * items that can be checkboxes or radio items.
 *
 * @param FilterDropdownProps
 * @returns A filter dropdown.
 */
export function FilterDropdown({ id, label, groups }: FilterDropdownProps) {
  // Populates the boolean Arrays for the group indexes that are checkbox groups
  const [checkedStates, setCheckedStates] = useState<Record<number, boolean[]>>(
    Object.fromEntries(
      groups
        .map((group, index) =>
          group.itemType === DropdownMenuItemType.Check ? [index, []] : undefined,
        )
        .filter((entry) => !!entry),
    ),
  );
  const [radioStates, setRadioStates] = useState<Record<number, string>>({});

  const handleCheckboxUpdate = (groupIndex: number, index: number) => {
    const newCheckedState = !checkedStates[groupIndex][index];
    // Update the checked state first
    setCheckedStates((oldCheckedStates) => {
      oldCheckedStates[groupIndex][index] = newCheckedState;
      return { ...oldCheckedStates };
    });

    // Calls the `onUpdate()` handler function for the dropdown item
    const item = groups[groupIndex].items[index];
    item.onUpdate(item.id, newCheckedState);
  };

  const handleRadioUpdate = (groupIndex: number, value: string) => {
    // Updates the radio state first
    setRadioStates((oldRadioStates) => {
      oldRadioStates[groupIndex] = value;
      return { ...oldRadioStates };
    });

    // Calls the `onUpdate()` handler function for the dropdown item
    const currentItem = groups[groupIndex].items.find((item) => item.id === value);
    if (currentItem) {
      currentItem.onUpdate(value);
    } else {
      console.error(`Could not find dropdown radio item with id '${value}'!`);
    }
  };

  return (
    <div id={id}>
      {/* TODO: remove this once the DropDown Menu shadcn has an id prop */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default">
            <Filter size={16} className="tw-mr-2 tw-h-4 tw-w-4" />
            {label}
            <ChevronDown size={16} className="tw-ml-2 tw-h-4 tw-w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {groups.map((group, groupIndex) => (
            <div key={group.label}>
              <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
              <DropdownMenuGroup>
                {group.itemType === DropdownMenuItemType.Check ? (
                  <>
                    {group.items.map((item, index) => (
                      <div key={item.id}>
                        <DropdownMenuCheckboxItem
                          checked={checkedStates[groupIndex][index]}
                          onCheckedChange={() => handleCheckboxUpdate(groupIndex, index)}
                        >
                          {item.label}
                        </DropdownMenuCheckboxItem>
                      </div>
                    ))}
                  </>
                ) : (
                  <DropdownMenuRadioGroup
                    value={radioStates[groupIndex]}
                    onValueChange={(value) => handleRadioUpdate(groupIndex, value)}
                  >
                    {group.items.map((item) => (
                      <div key={item.id}>
                        <DropdownMenuRadioItem value={item.id}>{item.label}</DropdownMenuRadioItem>
                      </div>
                    ))}
                  </DropdownMenuRadioGroup>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default FilterDropdown;
