import Checkbox from '@/components/shadcn-ui/checkbox';
import { Label } from '@/components/shadcn-ui/label';

export type ChecklistProps = {
  /** Array of strings representing the checkable items */
  listItems: string[];
  /** Array of strings representing the checked items */
  selectedListItems: string[];
  /**
   * Function that is called when a checkbox item is selected or deselected
   *
   * @param item The string description for this item
   * @param selected True if selected, false if not selected
   */
  handleSelectListItem: (item: string, selected: boolean) => void;

  /**
   * Optional function creates a label for a provided checkable item
   *
   * @param item
   * @returns A string representing the label text for the checkbox associated with that item
   */
  createLabel?: (item: string) => string;
};

/** Renders a list of checkboxes. Each checkbox corresponds to an item from the `listItems` array. */
export default function Checklist({
  listItems,
  selectedListItems,
  handleSelectListItem,
  createLabel,
}: ChecklistProps) {
  return (
    <>
      {listItems.map((item) => (
        <div className="pr-m-2 pr-flex pr-items-center">
          <Checkbox
            key={item}
            className="pr-mr-2 pr-align-middle"
            checked={selectedListItems.includes(item)}
            onCheckedChange={(value: boolean) => handleSelectListItem(item, value)}
          />
          <Label>{createLabel ? createLabel(item) : item}</Label>
        </div>
      ))}
    </>
  );
}
