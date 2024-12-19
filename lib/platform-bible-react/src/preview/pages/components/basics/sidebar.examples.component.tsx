import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/shadcn-ui/sidebar';
import { useState } from 'react';

type SidebarExamplesProps = {
  direction?: string;
};

export default function SidebarExamples({ direction }: SidebarExamplesProps) {
  const [sidebarSelection, setSidebarSelection] = useState('button');

  const sidebarItems: { [title: string]: string } = {
    Home: 'This is the Home page',
    Inbox: 'This is the Inbox page',
    Calendar: 'This is the Calendar page',
    Search: 'This is the Search page',
    Settings: 'This is the Settings page',
  };

  return (
    <SidebarProvider dir={direction} side={direction === 'rtl' ? 'right' : 'left'}>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Object.keys(sidebarItems).map((item) => (
                  <SidebarMenuItem key={item}>
                    <SidebarMenuButton onClick={() => setSidebarSelection(item)}>
                      {item}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        {sidebarItems[sidebarSelection]}
      </SidebarInset>
    </SidebarProvider>
  );
}
