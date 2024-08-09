import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/components/shadcn-ui/dropdown-menu';
import FilterButton from './buttons/filter-button.component';

export enum DropdownMenuItemType {
  Check,
  Radio,
}

export type DropdownItem = {
  /** The label is the text that will be displayed on the dropdown item. */
  label: string;
  /** The itemType determines the DropdownMenuItemType type as either Check or Radio. */
  itemType: DropdownMenuItemType;
  /** The onClick function is called when the item is clicked. */
  onClick: () => void;
};

export type DropdownGroup = {
  /**
   * The label is the text that will be displayed on the dropdown group. It is used to categorize
   * the items in the group.
   */
  label: string;
  /** The items array contains the items that will be displayed in the dropdown group */
  items: DropdownItem[];
};

export type FilterDropdownProps = {
  /** Object unique identifier */
  id?: string;
  /** The groups array contains the groups that will be displayed in the dropdown */
  groups: DropdownGroup[];
}; // TODO: extend the props later

/**
 * The FilterDropdown component is a dropdown designed for filtering content. It includes groups of
 * items that can be checkboxes or radio items.
 *
 * @param id Optional unique identifier
 * @param groups The groups array contains the groups that will be displayed in the dropdown
 * @returns A filter dropdown.
 */
export default function FilterDropdown({ id, groups }: FilterDropdownProps) {
  return (
    <div id={id}>
      {/* TODO: remove this once the DropDown Menu shadcn has an id prop */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <FilterButton />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {groups.map((group) => (
            <div key={group.label}>
              <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
              <DropdownMenuGroup>
                {group.items.map((item) => (
                  <div key={item.label}>
                    {item.itemType === DropdownMenuItemType.Check ? (
                      <DropdownMenuCheckboxItem onClick={item.onClick}>
                        {item.label}
                      </DropdownMenuCheckboxItem>
                    ) : (
                      <DropdownMenuRadioItem onClick={item.onClick} value={item.label}>
                        {item.label}
                      </DropdownMenuRadioItem>
                    )}
                  </div>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
