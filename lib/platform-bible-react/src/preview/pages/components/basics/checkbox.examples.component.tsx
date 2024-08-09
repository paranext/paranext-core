import Checkbox from '@/components/shadcn-ui/checkbox';
import { Label } from '@/components/shadcn-ui/label';

export default function CheckboxExamples() {
  return (
    <>
      <p>Note: that the bug of checkboxes jumping up and down is already coming from Shadcn</p>
      <br />
      <div>
        <Checkbox id="selectable" />
        <Label htmlFor="selectable" className="pr-ms-2">
          selectable checkbox
        </Label>
      </div>
      <div>
        <Checkbox id="not-checked" checked={false} />
        <Label htmlFor="not-checked" className="pr-ms-2">
          fix: not checked
        </Label>
      </div>
      <div>
        <Checkbox id="checked" checked />
        <Label htmlFor="checked" className="pr-ms-2">
          fix: checked
        </Label>
      </div>
      <div>
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled" className="pr-ms-2">
          disabled
        </Label>
      </div>
    </>
  );
}
