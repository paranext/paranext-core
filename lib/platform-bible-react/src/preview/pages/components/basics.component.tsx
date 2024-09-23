import SearchBar from '@/components/basics/search-bar.component';
import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '@/components/basics/tabs-vertical';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';
import ExampleAlerts from './basics/alert.examples.component';
import ButtonExamples from './basics/button.examples.component';
import CardExamples from './basics/card.examples.component';
import CheckboxExamples from './basics/checkbox.examples.component';
import ComboBoxExamples from './basics/combo-box.examples.component';
import DropdownExamples from './basics/dropdown.examples.component';
import InputExamples from './basics/input.examples.component';
import SelectExamples from './basics/select.examples.component';
import SliderExamples from './basics/slider.examples.component';
import SwitchExamples from './basics/switch.examples.component';
import TabExamples from './basics/tab.examples.component';
import TableExamples from './basics/table.examples.component';
import SpinnerExamples from './basics/spinner.examples.component';
import ChapterRangeSelectorExample from './basics/chapter-range-example.component';
import ToggleGroupExamples from './basics/toggle-group.examples.component';
import SonnerExamples from './basics/sonner.examples.component';
import ChecklistExamples from './basics/checklist.examples.component';
import RadioGroupExamples from './basics/radio-group.examples';

function Basics({ direction }: HasDirection) {
  return (
    <div>
      <p className="pr-mb-2 pr-text-muted-foreground">A place for the most simple components</p>
      <VerticalTabs defaultValue="Button" dir={direction}>
        <VerticalTabsList>
          <VerticalTabsTrigger value="Alert">Alert</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Button">Button</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Card">Card</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Chapter Range Selector">
            Chapter Range Selector
          </VerticalTabsTrigger>
          <VerticalTabsTrigger value="Checkbox">Checkbox</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Checklist">Checklist</VerticalTabsTrigger>
          <VerticalTabsTrigger value="ComboBox">Combo Box</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Dropdown Menu">Dropdown Menu</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Input">Input</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Radio Group">Radio Group</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Search Bar">Search Bar</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Select">Select</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Slider">Slider</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Sonner">Sonner</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Spinner">Spinner</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Switch">Switch</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Tabs">Tabs</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Table">Table</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Toggle Group">Toggle Group</VerticalTabsTrigger>
        </VerticalTabsList>

        <VerticalTabsContent value="Alert">
          <ExampleAlerts />
        </VerticalTabsContent>

        <VerticalTabsContent value="Button">
          <ButtonExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Card">
          <CardExamples direction={direction} />
        </VerticalTabsContent>

        <VerticalTabsContent value="Chapter Range Selector">
          <ChapterRangeSelectorExample />
        </VerticalTabsContent>

        <VerticalTabsContent value="Checkbox">
          <CheckboxExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Checklist">
          <ChecklistExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="ComboBox">
          <ComboBoxExamples direction={direction} />
        </VerticalTabsContent>

        <VerticalTabsContent value="Input">
          <InputExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Radio Group">
          <RadioGroupExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Search Bar">
          <div className="pr-flex pr-gap-2">
            <SearchBar onSearch={(search) => alert(`you searched for ${search}`)} />{' '}
            {direction === 'rtl' ? <>&rarr;</> : <>&larr;</>} type here
          </div>
        </VerticalTabsContent>

        <VerticalTabsContent value="Select">
          <SelectExamples direction={direction} />
        </VerticalTabsContent>

        <VerticalTabsContent value="Slider">
          <SliderExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Sonner">
          <SonnerExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Spinner">
          <SpinnerExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Switch">
          <SwitchExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Dropdown Menu">
          <DropdownExamples direction={direction} />
        </VerticalTabsContent>

        <VerticalTabsContent value="Tabs">
          <TabExamples direction={direction} />
        </VerticalTabsContent>

        <VerticalTabsContent value="Table">
          <TableExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Toggle Group">
          <ToggleGroupExamples />
        </VerticalTabsContent>
      </VerticalTabs>
    </div>
  );
}

export default Basics;
