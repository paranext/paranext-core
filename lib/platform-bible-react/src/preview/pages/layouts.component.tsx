import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '@/components/basics/tabs-vertical';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';
import WindowOrTabExample from './layouts/window.layout.component';
import Dashboard5Examples from './layouts/dashboard5.layout.component';

function Layouts({ direction }: HasDirection) {
  return (
    <div>
      <p className="pr-mb-2 pr-text-muted-foreground">A place to add examples for layouts</p>
      <VerticalTabs defaultValue="Window" dir={direction}>
        <VerticalTabsList>
          <VerticalTabsTrigger value="Window">Window or Tab</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Settings">Settings (n/a)</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Shadcn Dashboard 5">Shadcn Dashboard 5</VerticalTabsTrigger>
        </VerticalTabsList>

        <VerticalTabsContent value="Window">
          <div className="pr-mb-2 pr-flex pr-gap-2">
            <WindowOrTabExample direction={direction} />
            <WindowOrTabExample direction={direction} />
          </div>
          <WindowOrTabExample direction={direction} />
        </VerticalTabsContent>

        <VerticalTabsContent value="Settings">TODO</VerticalTabsContent>

        <VerticalTabsContent value="Shadcn Dashboard 5">
          <div className="pr-h-[405px] pr-rounded-md pr-border">
            <Dashboard5Examples direction={direction} />
          </div>
        </VerticalTabsContent>
      </VerticalTabs>
    </div>
  );
}

export default Layouts;
