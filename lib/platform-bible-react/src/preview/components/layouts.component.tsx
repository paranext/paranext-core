import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '@/components/basics/tabs-vertical';
import { HasDirection } from '@/preview/preview-components/direction-toggle';
import WindowOrTabExample from './examples/window.examples.component';

function Examples({ direction }: HasDirection) {
  return (
    <div>
      <p className="pr-mb-2 pr-text-muted-foreground">A place to add examples for layouts</p>
      <VerticalTabs defaultValue="Window" dir={direction}>
        <VerticalTabsList>
          <VerticalTabsTrigger value="Window">Window or Tab</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Settings">Settings (n/a)</VerticalTabsTrigger>
        </VerticalTabsList>

        <VerticalTabsContent value="Window">
          <div className="pr-mb-2 pr-flex pr-gap-2">
            <WindowOrTabExample direction={direction} />
            <WindowOrTabExample direction={direction} />
          </div>
          <WindowOrTabExample direction={direction} />
        </VerticalTabsContent>

        <VerticalTabsContent value="Settings">TODO</VerticalTabsContent>
      </VerticalTabs>
    </div>
  );
}

export default Examples;
