import { Label } from '@/components/shadcn-ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';

export default function RadioGroupExamples({ direction }: HasDirection) {
  return (
    <RadioGroup defaultValue="comfortable" dir={direction}>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}
