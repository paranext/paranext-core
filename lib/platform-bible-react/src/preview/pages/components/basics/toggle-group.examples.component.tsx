import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';

export default function ToggleGroupExamples({ direction }: HasDirection) {
  return (
    <div className="*:tw-m-4">
      <ToggleGroup variant="outline" type="multiple" dir={direction}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
        <ToggleGroupItem value="c">C</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" dir={direction}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
        <ToggleGroupItem value="c">C</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
