import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { ReactNode } from 'react';
import SmartLabel from './smart-label.component';

export type ChecklistProps = {
  /** Optional string representing the id attribute of the Checklist */
  id?: string;
  /** Optional string representing CSS class name(s) for styling */
  className?: string;
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
   * @param item The item for which a label is to be created
   * @returns A string representing the label text for the checkbox associated with that item
   */
  createLabel?: (item: string) => string;

  /**
   * Optional function creates a label for a provided checkable item
   *
   * @param item The item for which a label is to be created, including text and any additional
   *   elements (e.g. links)
   * @returns A react node representing the label text and any additional elements (e.g. links) for
   *   the checkbox associated with that item
   */
  createComplexLabel?: (item: string) => ReactNode;
};

/** Renders a list of checkboxes. Each checkbox corresponds to an item from the `listItems` array. */
export function Checklist({
  id,
  className,
  listItems,
  selectedListItems,
  handleSelectListItem,
  createLabel,
  createComplexLabel,
}: ChecklistProps) {
  return (
    <div id={id} className={className}>
      {listItems.map((item) => (
        <div key={item} className="tw-m-2 tw-flex tw-items-center">
          <Checkbox
            className="tw-me-2 tw-align-middle"
            checked={selectedListItems.includes(item)}
            onCheckedChange={(value: boolean) => handleSelectListItem(item, value)}
          />
          <SmartLabel
            item={item}
            createLabel={createLabel}
            createComplexLabel={createComplexLabel}
          />
        </div>
      ))}
    </div>
  );
}

export default Checklist;
