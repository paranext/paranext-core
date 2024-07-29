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

interface DropdownItem {
  /**
   * The label is the text that will be displayed on the dropdown item.
   */
  label: string;
  /**
   * The checkbox boolean value determines if the item is a checkbox or radio
   * item.
   */
  checkbox: boolean;
  /**
   * The onClick function is called when the item is clicked.
   */
  onClick: () => void;
}

interface DropdownGroup {
  /**
   * The label is the text that will be displayed on the dropdown group.
   * It is used to categorize the items in the group.
   */
  label: string;
  /**
   * The items array contains the items that will be displayed in the dropdown
   * group
   */
  items: DropdownItem[];
}

interface FilterDropdownProps {
  /**
   * The groups array contains the groups that will be displayed in the
   * dropdown
   */
  groups: DropdownGroup[];
}

/**
 * The FilterDropdown component is a dropdown designed for filtering content.
 * It includes groups of items that can be checkboxes or radio items.
 *
 * @param groups The groups array contains the groups that will be displayed in the dropdown
 * @returns A filter dropdown.
 */
export default function FilterDropdown({ groups }: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <FilterButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {groups.map((group) => (
          <>
            <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
            <DropdownMenuGroup>
              {group.items.map((item) => (
                <div>
                  {item.checkbox ? (
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
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
