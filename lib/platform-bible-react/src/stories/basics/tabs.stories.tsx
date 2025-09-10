import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/shadcn-ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn-ui/tabs';
import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '@/components/basics/tabs-vertical';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Tabs> = {
  title: 'Basics/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    defaultValue: { control: 'text' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1</TabsContent>
      <TabsContent value="tab2">Content for Tab 2</TabsContent>
      <TabsContent value="tab3">Content for Tab 3</TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic horizontal tabs with text content.',
      },
    },
  },
};

export const Vertical: Story = {
  render: () => (
    <VerticalTabs defaultValue="tab1">
      <VerticalTabsList>
        <VerticalTabsTrigger value="tab1">First Tab</VerticalTabsTrigger>
        <VerticalTabsTrigger value="tab2">Second Tab</VerticalTabsTrigger>
        <VerticalTabsTrigger value="tab3">Third Tab</VerticalTabsTrigger>
      </VerticalTabsList>
      <VerticalTabsContent value="tab1">
        <div className="tw-p-4">
          <h3 className="tw-text-lg tw-font-semibold">First Tab Content</h3>
          <p>This is the content for the first vertical tab.</p>
        </div>
      </VerticalTabsContent>
      <VerticalTabsContent value="tab2">
        <div className="tw-p-4">
          <h3 className="tw-text-lg tw-font-semibold">Second Tab Content</h3>
          <p>This is the content for the second vertical tab.</p>
        </div>
      </VerticalTabsContent>
      <VerticalTabsContent value="tab3">
        <div className="tw-p-4">
          <h3 className="tw-text-lg tw-font-semibold">Third Tab Content</h3>
          <p>This is the content for the third vertical tab.</p>
        </div>
      </VerticalTabsContent>
    </VerticalTabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical tabs with content panels.',
      },
    },
  },
};

export const NestedVertical: Story = {
  render: () => (
    <VerticalTabs defaultValue="2-youShouldNotSeeThis">
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
          <VerticalTabs>
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
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Nested vertical tabs with buttons and complex content, matching the original example.',
      },
    },
  },
};

export const Rich: Story = {
  render: () => (
    <Tabs defaultValue="account" className="tw-w-96">
      <TabsList className="tw-grid tw-w-full tw-grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="tw-space-y-4">
        <div className="tw-space-y-2">
          <h3 className="tw-text-lg tw-font-medium">Account Settings</h3>
          <p className="tw-text-sm tw-text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <div className="tw-space-y-2">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="tw-text-sm tw-font-medium">Username</label>
          <input
            className="tw-w-full tw-rounded-md tw-border tw-px-3 tw-py-2"
            placeholder="Enter username"
          />
        </div>
      </TabsContent>
      <TabsContent value="password" className="tw-space-y-4">
        <div className="tw-space-y-2">
          <h3 className="tw-text-lg tw-font-medium">Password Settings</h3>
          <p className="tw-text-sm tw-text-muted-foreground">
            Change your password and security settings.
          </p>
        </div>
        <div className="tw-space-y-2">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="tw-text-sm tw-font-medium">Current Password</label>
          <input type="password" className="tw-w-full tw-rounded-md tw-border tw-px-3 tw-py-2" />
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Rich tabs with forms and detailed content.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="tw-p-4">
          <h3 className="tw-text-lg tw-font-semibold">Overview</h3>
          <p>Overview content here.</p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="tw-p-4">
          <h3 className="tw-text-lg tw-font-semibold">Analytics</h3>
          <p>Analytics content here.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="tw-p-4">
          <h3 className="tw-text-lg tw-font-semibold">Settings</h3>
          <p>Settings content here.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'overview',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive tabs where you can experiment with properties using the controls.',
      },
    },
  },
};
