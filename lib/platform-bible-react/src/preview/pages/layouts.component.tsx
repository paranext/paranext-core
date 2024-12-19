import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '@/components/basics/tabs-vertical';

import WindowOrTabExample from './layouts/window.layout.component';
import Dashboard5Examples from './layouts/dashboard5.layout.component';
import ToolbarExamples from './layouts/toolbar.layout.component';
import DialogExamples from './layouts/dialog.layout.component';
import GetResourcesExample from './layouts/resource-manager.layout.component';

function Layouts() {
  return (
    <div>
      <p className="tw-mb-2 tw-text-muted-foreground">A place to add examples for layouts</p>
      <VerticalTabs defaultValue="Window">
        <VerticalTabsList>
          <VerticalTabsTrigger value="Window">Window or Tab</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Toolbar">MUI Toolbar</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Settings">Settings (n/a)</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Get Resources">Get Resources</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Shadcn Dashboard 5">Shadcn Dashboard 5</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Dialog">Dialog</VerticalTabsTrigger>
        </VerticalTabsList>

        <VerticalTabsContent value="Window">
          <div className="tw-mb-2 tw-flex tw-gap-2">
            <WindowOrTabExample isFocused />
            <WindowOrTabExample />
          </div>
          <WindowOrTabExample />
        </VerticalTabsContent>

        <VerticalTabsContent value="Toolbar">
          <ToolbarExamples />
        </VerticalTabsContent>

        <VerticalTabsContent value="Settings">TODO</VerticalTabsContent>

        <VerticalTabsContent value="Get Resources">
          <GetResourcesExample />
        </VerticalTabsContent>

        <VerticalTabsContent value="Shadcn Dashboard 5">
          <div className="tw-h-[405px] tw-rounded-md tw-border">
            <Dashboard5Examples />
          </div>
        </VerticalTabsContent>

        <VerticalTabsContent value="Dialog">
          <DialogExamples />
        </VerticalTabsContent>
      </VerticalTabs>
    </div>
  );
}

export default Layouts;
