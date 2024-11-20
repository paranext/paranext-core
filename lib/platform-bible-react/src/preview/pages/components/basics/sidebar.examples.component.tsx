import { Button } from '@/components/shadcn-ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from '@/components/shadcn-ui/sidebar';
import { Slider, Switch } from '@/index';
import { useState } from 'react';

type SidebarExamplesProps = {
  direction?: string;
};

export default function SidebarExamples({ direction = 'ltr' }: SidebarExamplesProps) {
  const [sidebarSelection, setSidebarSelection] = useState('button');

  function renderSidebarContent() {
    switch (sidebarSelection) {
      case 'button':
        return <Button>This is a button</Button>;
      case 'switch':
        return <Switch />;
      case 'slider':
        return <Slider />;
      default:
        return <p>No content</p>;
    }
  }

  return (
    <SidebarProvider dir={direction}>
      <Sidebar collapsible="offcanvas" variant="sidebar">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <span className="font-semibold">Example Sidebar</span>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Components</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenuButton variant="default" onClick={() => setSidebarSelection('button')}>
                Button
              </SidebarMenuButton>
              <SidebarMenuButton onClick={() => setSidebarSelection('slider')}>
                Slider
              </SidebarMenuButton>
              <SidebarMenuButton onClick={() => setSidebarSelection('switch')}>
                Switch
              </SidebarMenuButton>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{renderSidebarContent()}</SidebarInset>
    </SidebarProvider>
  );
}
