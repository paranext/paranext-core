import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';

export default function ToggleGroupExamples() {
  return (
    <div className="*:tw-m-4">
      <ToggleGroup variant="outline" type="multiple">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
        <ToggleGroupItem value="c">C</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
        <ToggleGroupItem value="c">C</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
