import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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
import { Home, Inbox, Calendar, Search, Settings, File, Folder, User } from 'lucide-react';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Sidebar> = {
  title: 'Shadcn/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-h-96">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: { control: 'select', options: ['sidebar', 'floating', 'inset'] },
    collapsible: { control: 'select', options: ['offcanvas', 'icon', 'none'] },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home />
                    Home
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Inbox />
                    Inbox
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Calendar />
                    Calendar
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Search />
                    Search
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <div className="tw-p-4">
          <h1 className="tw-text-2xl tw-font-bold">Main Content</h1>
          <p>This is the main content area.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic sidebar with navigation items and main content area.',
      },
    },
  },
};

export const SecondarySidebar: Story = {
  render: () => (
    <SidebarProvider side="secondary">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Secondary Sidebar</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <File />
                    Lorem
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Folder />
                    Ipsum
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <User />
                    Dolor
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A secondary sidebar positioned on the right side.',
      },
    },
  },
};

export const WithGroups: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home />
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Inbox />
                    Messages
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Calendar />
                    Calendar
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Search />
                    Search
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <User />
                    Profile
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings />
                    Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <div className="tw-p-4">
          <h1 className="tw-text-2xl tw-font-bold">Dashboard</h1>
          <p>Welcome to your dashboard!</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A sidebar with multiple groups organizing different types of navigation items.',
      },
    },
  },
};

export const Variants: Story = {
  render: (args) => (
    <SidebarProvider>
      <Sidebar {...args}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home />
                    Home
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings />
                    Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <div className="tw-p-4">
          <h1 className="tw-text-2xl tw-font-bold">Content</h1>
          <p>Use the controls to experiment with different sidebar variants.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
  args: {
    variant: 'sidebar',
    collapsible: 'offcanvas',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive sidebar where you can experiment with different variants using the controls.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [sidebarSelection, setSidebarSelection] = useState('Home');

    const sidebarItems: { [title: string]: string } = {
      Home: 'This is the Home page',
      Inbox: 'This is the Inbox page',
      Calendar: 'This is the Calendar page',
      Search: 'This is the Search page',
      Settings: 'This is the Settings page',
    };

    const icons: { [key: string]: React.ComponentType } = {
      Home,
      Inbox,
      Calendar,
      Search,
      Settings,
    };

    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {Object.keys(sidebarItems).map((item) => {
                    const Icon = icons[item];
                    return (
                      <SidebarMenuItem key={item}>
                        <SidebarMenuButton
                          onClick={() => setSidebarSelection(item)}
                          isActive={sidebarSelection === item}
                        >
                          <Icon />
                          {item}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <SidebarTrigger />
          <div className="tw-p-4">
            <h1 className="tw-text-2xl tw-font-bold">{sidebarSelection}</h1>
            <p>{sidebarItems[sidebarSelection]}</p>
            {!sidebarItems[sidebarSelection] && (
              <p>If you can&apos;t see a sidebar, the screen is too narrow</p>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive sidebar with selectable navigation items, similar to the original example.',
      },
    },
  },
};
