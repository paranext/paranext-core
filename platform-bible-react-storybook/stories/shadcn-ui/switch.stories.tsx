import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Switch } from '@/components/shadcn-ui/switch';
import { Label } from '@/components/shadcn-ui/label';
import { useState } from 'react';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Switch> = {
  title: 'Shadcn/Switch',
  component: Switch,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onCheckedChange: { action: 'checked changed' },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);

    const handleChange = (newChecked: boolean) => {
      setChecked(newChecked);
      args.onCheckedChange?.(newChecked);
    };

    return <Switch {...args} checked={checked} onCheckedChange={handleChange} />;
  },
  args: {
    checked: false,
    onCheckedChange: fn(),
  },
};

export const Checked: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? true);

    const handleChange = (newChecked: boolean) => {
      setChecked(newChecked);
      args.onCheckedChange?.(newChecked);
    };

    return <Switch {...args} checked={checked} onCheckedChange={handleChange} />;
  },
  args: {
    checked: true,
    onCheckedChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A switch in the checked state.',
      },
    },
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);

    const handleChange = (newChecked: boolean) => {
      setChecked(newChecked);
      args.onCheckedChange?.(newChecked);
    };

    return <Switch {...args} checked={checked} onCheckedChange={handleChange} />;
  },
  args: {
    checked: false,
    disabled: true,
    onCheckedChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled switch that cannot be toggled.',
      },
    },
  },
};

export const DisabledChecked: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? true);

    const handleChange = (newChecked: boolean) => {
      setChecked(newChecked);
      args.onCheckedChange?.(newChecked);
    };

    return <Switch {...args} checked={checked} onCheckedChange={handleChange} />;
  },
  args: {
    checked: true,
    disabled: true,
    onCheckedChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled switch in the checked state.',
      },
    },
  },
};

export const States: Story = {
  render: () => {
    const [value, setValue] = useState(false);

    return (
      <div className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-flex tw-items-center tw-space-x-2">
          <Switch checked={value} onCheckedChange={setValue} />
          <Label>Interactive switch</Label>
        </div>
        <div className="tw-flex tw-items-center tw-space-x-2">
          <Switch disabled />
          <Label>Disabled (unchecked)</Label>
        </div>
        <div className="tw-flex tw-items-center tw-space-x-2">
          <Switch checked disabled />
          <Label>Disabled (checked)</Label>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Different switch states including interactive, disabled unchecked, and disabled checked.',
      },
    },
  },
};

export const WithLabels: Story = {
  render: () => {
    const [airplaneMode, setAirplaneMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [locationServices, setLocationServices] = useState(false);

    return (
      <div className="tw-space-y-6">
        <div className="tw-flex tw-items-center tw-justify-between">
          <Label htmlFor="airplane-mode" className="tw-text-sm tw-font-medium">
            Airplane Mode
          </Label>
          <Switch id="airplane-mode" checked={airplaneMode} onCheckedChange={setAirplaneMode} />
        </div>
        <div className="tw-flex tw-items-center tw-justify-between">
          <Label htmlFor="notifications" className="tw-text-sm tw-font-medium">
            Push Notifications
          </Label>
          <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
        </div>
        <div className="tw-flex tw-items-center tw-justify-between">
          <Label htmlFor="location" className="tw-text-sm tw-font-medium">
            Location Services
          </Label>
          <Switch
            id="location"
            checked={locationServices}
            onCheckedChange={setLocationServices}
            disabled
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Switches with labels arranged in a settings-style layout with proper state management.',
      },
    },
  },
};

export const FormExample: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: false,
      marketingEmails: false,
      autoSave: true,
      darkMode: false,
    });

    const updateSetting = (key: keyof typeof settings) => (checked: boolean) => {
      setSettings((prev) => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="tw-max-w-md tw-space-y-6">
        <div>
          <h3 className="tw-mb-4 tw-text-lg tw-font-medium">Notification Settings</h3>
          <div className="tw-space-y-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <Label htmlFor="email-notifications" className="tw-text-sm tw-font-medium">
                Email Notifications
              </Label>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={updateSetting('emailNotifications')}
              />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <Label htmlFor="push-notifications" className="tw-text-sm tw-font-medium">
                Push Notifications
              </Label>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={updateSetting('pushNotifications')}
              />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <Label htmlFor="sms-notifications" className="tw-text-sm tw-font-medium">
                SMS Notifications
              </Label>
              <Switch
                id="sms-notifications"
                checked={settings.smsNotifications}
                onCheckedChange={updateSetting('smsNotifications')}
              />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <Label htmlFor="marketing-emails" className="tw-text-sm tw-font-medium">
                Marketing Emails
              </Label>
              <Switch
                id="marketing-emails"
                checked={settings.marketingEmails}
                onCheckedChange={updateSetting('marketingEmails')}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="tw-mb-4 tw-text-lg tw-font-medium">App Settings</h3>
          <div className="tw-space-y-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <Label htmlFor="auto-save" className="tw-text-sm tw-font-medium">
                Auto Save
              </Label>
              <Switch
                id="auto-save"
                checked={settings.autoSave}
                onCheckedChange={updateSetting('autoSave')}
              />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <Label htmlFor="dark-mode" className="tw-text-sm tw-font-medium">
                Dark Mode
              </Label>
              <Switch
                id="dark-mode"
                checked={settings.darkMode}
                onCheckedChange={updateSetting('darkMode')}
              />
            </div>
          </div>
        </div>

        <div className="tw-mt-6 tw-rounded-lg tw-bg-gray-50 tw-p-4">
          <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Current Settings:</h4>
          <pre className="tw-text-xs tw-text-gray-600">
            {JSON.stringify(settings, undefined, 2)}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive form example showing multiple switches with grouped settings and state display.',
      },
    },
  },
};
