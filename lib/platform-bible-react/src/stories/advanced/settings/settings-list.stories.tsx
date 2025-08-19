import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  SettingsList,
  SettingsListHeader,
  SettingsListItem,
} from '@/components/advanced/settings-components/settings-list.component';
import { Input } from '@/components/shadcn-ui/input';
import { Switch } from '@/components/shadcn-ui/switch';
import { Button } from '@/components/shadcn-ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof SettingsList> = {
  title: 'Advanced/Settings/SettingsList',
  component: SettingsList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-max-w-2xl tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SettingsList>;

export const Default: Story = {
  render: () => (
    <SettingsList>
      <SettingsListHeader
        primary="Settings"
        secondary="User settings for styling the header"
        includeSeparator
      />
      <SettingsListItem
        primary="Header color"
        secondary="The color of the header"
        isLoading={false}
        loadingMessage="Loading setting"
      >
        <Input placeholder="Red" />
      </SettingsListItem>
      <SettingsListItem
        primary="Header size"
        secondary="The size of the header"
        isLoading
        loadingMessage="Loading setting"
      >
        <Input placeholder="56" />
      </SettingsListItem>
      <SettingsListItem
        primary="Header bold"
        secondary="Whether or not the header is bold"
        isLoading={false}
        loadingMessage="Loading setting"
      >
        <Input placeholder="color" />
      </SettingsListItem>
    </SettingsList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A basic settings list with header and multiple items, matching the original example.',
      },
    },
  },
};

export const WithoutHeader: Story = {
  render: () => (
    <SettingsList>
      <SettingsListItem primary="Theme" secondary="Choose your preferred theme" isLoading={false}>
        <Select>
          <SelectTrigger className="tw-w-[180px]">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </SettingsListItem>
      <SettingsListItem
        primary="Notifications"
        secondary="Receive notifications for important updates"
        isLoading={false}
      >
        <Switch />
      </SettingsListItem>
    </SettingsList>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A settings list without a header, showing different input types.',
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => (
    <SettingsList>
      <SettingsListHeader
        primary="Loading Examples"
        secondary="Settings showing different loading states"
        includeSeparator
      />
      <SettingsListItem
        primary="Loaded setting"
        secondary="This setting has finished loading"
        isLoading={false}
        loadingMessage="Loading setting"
      >
        <Input placeholder="Value loaded" />
      </SettingsListItem>
      <SettingsListItem
        primary="Loading setting"
        secondary="This setting is currently loading"
        isLoading
        loadingMessage="Fetching user preferences..."
      >
        <Input placeholder="Loading..." disabled />
      </SettingsListItem>
      <SettingsListItem
        primary="Another loading setting"
        secondary="This setting is also loading"
        isLoading
        loadingMessage="Syncing with server"
      >
        <Switch disabled />
      </SettingsListItem>
    </SettingsList>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Settings list showing both loaded and loading states with custom loading messages.',
      },
    },
  },
};

export const VariousControls: Story = {
  render: () => (
    <SettingsList>
      <SettingsListHeader
        primary="Application Settings"
        secondary="Configure your application preferences"
        includeSeparator
      />
      <SettingsListItem primary="Username" secondary="Your display name" isLoading={false}>
        <Input placeholder="Enter username" />
      </SettingsListItem>
      <SettingsListItem
        primary="Auto-save"
        secondary="Automatically save changes"
        isLoading={false}
      >
        <Switch />
      </SettingsListItem>
      <SettingsListItem
        primary="Language"
        secondary="Choose your preferred language"
        isLoading={false}
      >
        <Select>
          <SelectTrigger className="tw-w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
          </SelectContent>
        </Select>
      </SettingsListItem>
      <SettingsListItem
        primary="Reset Settings"
        secondary="Reset all settings to default values"
        isLoading={false}
      >
        <Button variant="destructive" size="sm">
          Reset
        </Button>
      </SettingsListItem>
    </SettingsList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Settings list with various control types including inputs, switches, selects, and buttons.',
      },
    },
  },
};

export const MinimalExample: Story = {
  render: () => (
    <SettingsList>
      <SettingsListItem primary="Simple setting" secondary="A basic setting without loading state">
        <Input placeholder="Enter value" />
      </SettingsListItem>
    </SettingsList>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A minimal settings list with just one item.',
      },
    },
  },
};

export const HeaderVariations: Story = {
  render: () => (
    <div className="tw-space-y-8">
      <SettingsList>
        <SettingsListHeader
          primary="With Separator"
          secondary="This header includes a separator"
          includeSeparator
        />
        <SettingsListItem primary="Setting 1" secondary="Description">
          <Input placeholder="Value" />
        </SettingsListItem>
      </SettingsList>

      <SettingsList>
        <SettingsListHeader
          primary="Without Separator"
          secondary="This header does not include a separator"
          includeSeparator={false}
        />
        <SettingsListItem primary="Setting 2" secondary="Description">
          <Input placeholder="Value" />
        </SettingsListItem>
      </SettingsList>

      <SettingsList>
        <SettingsListHeader primary="Primary Only" includeSeparator />
        <SettingsListItem primary="Setting 3" secondary="Description">
          <Input placeholder="Value" />
        </SettingsListItem>
      </SettingsList>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different header configurations showing separator and text variations.',
      },
    },
  },
};
