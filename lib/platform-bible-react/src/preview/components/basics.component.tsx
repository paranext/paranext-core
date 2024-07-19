import { VerticalTabs, VerticalTabsContent, VerticalTabsList, VerticalTabsTrigger } from '../..';
import { HasDirection } from '../direction-toggle';
import ExampleAlerts from './basics/alert.examples.component';
import ButtonExamples from './basics/button.examples.component';
import CardExamples from './basics/card.examples.component';
import CheckboxExamples from './basics/checkbox.examples.component';
import DropdownExamples from './basics/dropdown.examples.component';
import InputExamples from './basics/input.examples.component';
import SelectExamples from './basics/select.examples.component';
import SliderExamples from './basics/slider.examples.component';
import SwitchExamples from './basics/switch.examples.component';
import TabExamples from './basics/tab.examples.component';
import TableExamples from './basics/table.examples.component';

function Basics({ direction }: HasDirection) {
  return (
    <div>
      <p className="pr-mb-2 pr-text-muted-foreground">A place for the most simple components</p>
      <VerticalTabs defaultValue="Button" dir={direction}>
        <VerticalTabsList>
          <VerticalTabsTrigger value="Alert">Alert</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Button">Button</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Card">Card</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Checkbox">Checkbox</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Dropdown Menu">Dropdown Menu</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Input">Input</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Select">Select</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Slider">Slider</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Switch">Switch</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Tabs">Tabs</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Table">Table</VerticalTabsTrigger>
        </VerticalTabsList>

        <VerticalTabsContent value="Alert">
          <ExampleAlerts />
        </VerticalTabsContent>

        <VerticalTabsContent value="Button">
          <ButtonExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Card">
          <CardExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Checkbox">
          <CheckboxExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Input">
          <InputExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Select">
          <SelectExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Slider">
          <SliderExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Switch">
          <SwitchExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Dropdown Menu">
          <DropdownExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Tabs">
          <TabExamples direction={direction} />
        </VerticalTabsContent>

        <VerticalTabsContent value="Table">
          <TableExamples />
        </VerticalTabsContent>
      </VerticalTabs>
    </div>
  );
}

export default Basics;
