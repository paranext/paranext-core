import { HasDirection } from '@/preview/direction-toggle';
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '../../..';

export default function TabExamples({ direction }: HasDirection) {
  return (
    <>
      <Tabs defaultValue="2-youShouldNotSeeThis" dir={direction}>
        <TabsList>
          <TabsTrigger value="1">
            <Button>non-text tab trigger</Button>
          </TabsTrigger>
          <TabsTrigger value="2-youShouldNotSeeThis">Tab 2</TabsTrigger>
          <TabsTrigger value="3">Tab 3 - no linked content</TabsTrigger>
        </TabsList>
        <TabsContent value="1">Tab 1 Content</TabsContent>
        <TabsContent value="2-youShouldNotSeeThis">Tab 2 Content</TabsContent>
        {/* intentionally left out 3 to see the effect */}
      </Tabs>
      <hr className="pr-my-4" />
      <VerticalTabs defaultValue="2-youShouldNotSeeThis" dir={direction}>
        <VerticalTabsList>
          <VerticalTabsTrigger value="1">
            <Button>non-text tab trigger</Button>
          </VerticalTabsTrigger>
          <VerticalTabsTrigger value="2-youShouldNotSeeThis">Tab 2</VerticalTabsTrigger>
          <VerticalTabsTrigger value="3">Tab 3</VerticalTabsTrigger>
          <VerticalTabsTrigger value="4">Tab 4</VerticalTabsTrigger>
        </VerticalTabsList>
        <VerticalTabsContent value="1">Tab 1 Content</VerticalTabsContent>
        <VerticalTabsContent value="2-youShouldNotSeeThis">
          <div>
            Tab 2 Content: Another set of vertical tabs without a default value
            <VerticalTabs dir={direction}>
              <VerticalTabsList>
                <VerticalTabsTrigger value="1">Tab 2-1</VerticalTabsTrigger>
                <VerticalTabsTrigger value="2">Tab 2-2</VerticalTabsTrigger>
              </VerticalTabsList>
              <VerticalTabsContent value="1">Tab 2-1 Content</VerticalTabsContent>
              <VerticalTabsContent value="2">Tab 2-2 Content</VerticalTabsContent>
            </VerticalTabs>
          </div>
        </VerticalTabsContent>
        <VerticalTabsContent value="3">Tab 3 Content</VerticalTabsContent>
        <VerticalTabsContent value="4">Tab 4 Content</VerticalTabsContent>
      </VerticalTabs>
    </>
  );
}
