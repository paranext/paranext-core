import Checkbox from '@/components/shadcn-ui/checkbox';
import { Label } from '@/components/shadcn-ui/label';

export default function CheckboxExamples() {
  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <p>Note: that the bug of checkboxes jumping up and down is already coming from Shadcn</p>
      <div>
        <Checkbox id="selectable" />
        <Label htmlFor="selectable" className="tw-ms-2">
          selectable checkbox
        </Label>
      </div>
      <div>
        <Checkbox id="not-checked" checked={false} />
        <Label htmlFor="not-checked" className="tw-ms-2">
          fix: not checked
        </Label>
      </div>
      <div>
        <Checkbox id="checked" checked />
        <Label htmlFor="checked" className="tw-ms-2">
          fix: checked
        </Label>
      </div>
      <div>
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled" className="tw-ms-2">
          disabled
        </Label>
      </div>
    </div>
  );
}
