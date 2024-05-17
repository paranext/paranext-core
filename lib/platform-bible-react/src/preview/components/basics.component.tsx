import { Button } from '@/components/shadcn-ui/button';
import {
  Button as MUIButton,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '../..';

function Basics() {
  return (
    <div>
      <VerticalTabs>
        <VerticalTabsList>
          <VerticalTabsTrigger value="MUI Button">MUI Button</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Button">Button</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Input">Input</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Dropdown Menu">Dropdown Menu</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Tabs">Tabs</VerticalTabsTrigger>
        </VerticalTabsList>

        <VerticalTabsContent value="MUI Button">
          {/* eslint-disable-next-line no-alert */}
          <MUIButton onClick={() => alert('Hello World')}>Hello MUI</MUIButton>
        </VerticalTabsContent>

        <VerticalTabsContent value="Button">
          {/* eslint-disable-next-line no-alert */}
          <Button onClick={() => alert('Hello World')}>Hello Shadcn</Button>
        </VerticalTabsContent>

        <VerticalTabsContent value="Input">
          <table>
            <tr>
              <td>
                Shadcn Default Input
                <div className="pr-text-xs">(shadcn-ui/input)</div>
              </td>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <td>
                <Input />
              </td>
            </tr>
            <tr>
              <td>
                Small Input
                <div className="pr-text-xs">(from https://ui.jln.dev/ &rarr; popover)</div>
              </td>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <td>
                <Input className="pr-full pr-file:border-0 pr-col-span-2 pr-flex pr-h-8 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50" />
              </td>
            </tr>
            <tr>
              <td>
                Small Input <div className="pr-text-xs">(from BCV control)</div>
              </td>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <td>
                <Input className="pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none" />
              </td>
            </tr>
          </table>
        </VerticalTabsContent>

        <VerticalTabsContent value="Dropdown Menu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>DropdownMenuLabel</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>DropdownMenuItem</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </VerticalTabsContent>

        <VerticalTabsContent value="Tabs">
          <Tabs>
            <TabsList>
              <TabsTrigger value="1">Tab 1</TabsTrigger>
              <TabsTrigger value="2">Tab 2</TabsTrigger>
              <TabsTrigger value="3">Tab 3 - no linked content</TabsTrigger>
            </TabsList>
            <TabsContent value="1">Tab 1 Content</TabsContent>
            <TabsContent value="2">Tab 2 Content</TabsContent>
            {/* intentionally left out 3 to see the effect */}
          </Tabs>
          <hr className="pr-my-4" />
          <VerticalTabs defaultValue="2">
            <VerticalTabsList>
              <VerticalTabsTrigger value="1">Tab 1</VerticalTabsTrigger>
              <VerticalTabsTrigger value="2">Tab 2</VerticalTabsTrigger>
              <VerticalTabsTrigger value="3">Tab 3</VerticalTabsTrigger>
              <VerticalTabsTrigger value="4">Tab 4</VerticalTabsTrigger>
            </VerticalTabsList>
            <VerticalTabsContent value="1">Tab 1 Content</VerticalTabsContent>
            <VerticalTabsContent value="2">Tab 2 Content</VerticalTabsContent>
            <VerticalTabsContent value="3">Tab 3 Content</VerticalTabsContent>
            <VerticalTabsContent value="4">Tab 4 Content</VerticalTabsContent>
          </VerticalTabs>
        </VerticalTabsContent>
      </VerticalTabs>
    </div>
  );
}

export default Basics;
