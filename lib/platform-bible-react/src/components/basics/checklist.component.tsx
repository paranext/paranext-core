import Checkbox from '../shadcn-ui/checkbox';
import { Label } from '../shadcn-ui/label';

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
      {legend && <legend className="pr-font-sans">{legend}</legend>}
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
    </fieldset>
  );
}
