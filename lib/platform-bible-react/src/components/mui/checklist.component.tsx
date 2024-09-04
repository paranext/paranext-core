import Checkbox from '@/components/mui/checkbox.component';
import '@/components/mui/checklist.component.css';

export type ChecklistProps = {
  /** Optional string representing the id attribute of the fieldset element */
  id?: string;
  /** Optional string representing CSS class name(s) for styling */
  className?: string;
  /** Optional string representing legend for fieldset element */
  legend?: string;
  /** Array of strings representing the legend text for the fieldset element */
  listItems: string[];
  /** Array of strings representing items to be displayed as checkboxes in the checklist */
  selectedListItems: string[];
  /** Function that takes a string param and is called when a checkbox item is selected or deselected */
  handleSelectListItem: (item: string, selected: boolean) => void;
  /**
   * Optional function that takes a string param and returns a string representing the label text
   * for the checkbox associated with that item
   */
  createLabel?: (item: string) => string;
};

/**
 * Renders a list of checkboxes wrapped in a fieldset element. Each checkbox corresponds to an item
 * from the `listItems` array.
 */
export default function Checklist({
  id,
  className,
  legend,
  listItems,
  selectedListItems,
  handleSelectListItem,
  createLabel,
}: ChecklistProps) {
  return (
    <fieldset id={id} className={className}>
      {legend && <legend>{legend}</legend>}
      {listItems.map((item) => (
        <Checkbox
          key={item}
          className="check-item"
          isChecked={selectedListItems.includes(item)}
          labelText={createLabel ? createLabel(item) : item}
          onChange={(event) => handleSelectListItem(item, event.target.checked)}
        />
      ))}
    </fieldset>
  );
}
