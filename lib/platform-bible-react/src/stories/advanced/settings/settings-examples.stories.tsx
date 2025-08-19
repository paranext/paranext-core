import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Switch } from '@/components/shadcn-ui/switch';
import { Label } from '@/components/shadcn-ui/label';
import { Input } from '@/components/shadcn-ui/input';
import { Button } from '@/components/shadcn-ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import { ThemeProvider } from '@/storybook/theme-provider.component';

// Create a dummy component for the meta
function SettingsExamples() {
  return <div>Settings Examples</div>;
}

const meta: Meta<typeof SettingsExamples> = {
  title: 'Advanced/Settings/SettingsExamples',
  component: SettingsExamples,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Examples of common settings patterns and layouts using various UI components.

These examples demonstrate:
- Switch-based settings with proper state management
- Mixed control types (switches, inputs, selects)
- Settings organization with cards and sections
- Form-like settings interfaces
- Real-world settings patterns
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicSettings: Story = {
  render: () => {
    const [airplaneMode, setAirplaneMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [locationServices, setLocationServices] = useState(false);

    return (
      <Card className="tw-w-full tw-max-w-md">
        <CardHeader>
          <CardTitle>Device Settings</CardTitle>
          <CardDescription>Configure your device preferences</CardDescription>
        </CardHeader>
        <CardContent className="tw-space-y-4">
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
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic settings layout using switches with clear labels and card container.',
      },
    },
  },
};

export const ComprehensiveSettings: Story = {
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
      <div className="tw-max-w-2xl tw-space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="tw-space-y-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="email-notifications" className="tw-text-sm tw-font-medium">
                  Email Notifications
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={updateSetting('emailNotifications')}
              />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="push-notifications" className="tw-text-sm tw-font-medium">
                  Push Notifications
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">Receive push notifications</p>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={updateSetting('pushNotifications')}
              />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="sms-notifications" className="tw-text-sm tw-font-medium">
                  SMS Notifications
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">Receive notifications via SMS</p>
              </div>
              <Switch
                id="sms-notifications"
                checked={settings.smsNotifications}
                onCheckedChange={updateSetting('smsNotifications')}
              />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="marketing-emails" className="tw-text-sm tw-font-medium">
                  Marketing Emails
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">
                  Receive marketing and promotional emails
                </p>
              </div>
              <Switch
                id="marketing-emails"
                checked={settings.marketingEmails}
                onCheckedChange={updateSetting('marketingEmails')}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>App Settings</CardTitle>
            <CardDescription>Configure application behavior</CardDescription>
          </CardHeader>
          <CardContent className="tw-space-y-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="auto-save" className="tw-text-sm tw-font-medium">
                  Auto Save
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">Automatically save your work</p>
              </div>
              <Switch
                id="auto-save"
                checked={settings.autoSave}
                onCheckedChange={updateSetting('autoSave')}
              />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="dark-mode" className="tw-text-sm tw-font-medium">
                  Dark Mode
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">Use dark theme</p>
              </div>
              <Switch
                id="dark-mode"
                checked={settings.darkMode}
                onCheckedChange={updateSetting('darkMode')}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Settings</CardTitle>
            <CardDescription>Debug view of current settings state</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="tw-text-xs tw-text-muted-foreground">
              {JSON.stringify(settings, undefined, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive settings example with grouped sections, descriptions, and state display.',
      },
    },
  },
};

export const MixedControlTypes: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      theme: 'light',
      language: 'en',
      username: 'user@example.com',
      autoBackup: false,
      backupFrequency: 'daily',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateSetting = (key: keyof typeof settings, value: any) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <div className="tw-max-w-2xl tw-space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="tw-space-y-6">
            <div className="tw-space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="email"
                value={settings.username}
                onChange={(e) => updateSetting('username', e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="tw-space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => updateSetting('language', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="tw-space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={settings.theme}
                onValueChange={(value) => updateSetting('theme', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="notifications" className="tw-text-sm tw-font-medium">
                  Enable Notifications
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">Receive app notifications</p>
              </div>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => updateSetting('notifications', checked)}
              />
            </div>

            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label htmlFor="auto-backup" className="tw-text-sm tw-font-medium">
                  Auto Backup
                </Label>
                <p className="tw-text-xs tw-text-muted-foreground">
                  Automatically backup your data
                </p>
              </div>
              <Switch
                id="auto-backup"
                checked={settings.autoBackup}
                onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
              />
            </div>

            {settings.autoBackup && (
              <div className="tw-space-y-2">
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value) => updateSetting('backupFrequency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="tw-flex tw-justify-end tw-space-x-2">
          <Button variant="outline" onClick={() => console.log('Settings reset')}>
            Reset
          </Button>
          <Button onClick={() => console.log('Settings saved:', settings)}>Save Changes</Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Settings form with mixed control types: inputs, selects, switches, and conditional fields.',
      },
    },
  },
};

export const SettingsGrid: Story = {
  render: () => {
    const [privacy, setPrivacy] = useState({
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      allowTracking: false,
    });

    const [security, setSecurity] = useState({
      twoFactor: true,
      loginAlerts: true,
      sessionTimeout: false,
      deviceTrust: true,
    });

    const updatePrivacy = (key: keyof typeof privacy) => (checked: boolean) => {
      setPrivacy((prev) => ({ ...prev, [key]: checked }));
    };

    const updateSecurity = (key: keyof typeof security) => (checked: boolean) => {
      setSecurity((prev) => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="tw-grid tw-grid-cols-1 tw-gap-6 lg:tw-grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Control your privacy preferences</CardDescription>
          </CardHeader>
          <CardContent className="tw-space-y-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Profile Visible</Label>
                <p className="tw-text-xs tw-text-muted-foreground">
                  Make your profile visible to others
                </p>
              </div>
              <Switch
                checked={privacy.profileVisible}
                onCheckedChange={updatePrivacy('profileVisible')}
              />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Show Email</Label>
                <p className="tw-text-xs tw-text-muted-foreground">Display email on profile</p>
              </div>
              <Switch checked={privacy.showEmail} onCheckedChange={updatePrivacy('showEmail')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Show Phone</Label>
                <p className="tw-text-xs tw-text-muted-foreground">Display phone number</p>
              </div>
              <Switch checked={privacy.showPhone} onCheckedChange={updatePrivacy('showPhone')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Allow Tracking</Label>
                <p className="tw-text-xs tw-text-muted-foreground">Allow analytics tracking</p>
              </div>
              <Switch
                checked={privacy.allowTracking}
                onCheckedChange={updatePrivacy('allowTracking')}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your security preferences</CardDescription>
          </CardHeader>
          <CardContent className="tw-space-y-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Two-Factor Auth</Label>
                <p className="tw-text-xs tw-text-muted-foreground">Enable 2FA for added security</p>
              </div>
              <Switch checked={security.twoFactor} onCheckedChange={updateSecurity('twoFactor')} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Login Alerts</Label>
                <p className="tw-text-xs tw-text-muted-foreground">Get notified of new logins</p>
              </div>
              <Switch
                checked={security.loginAlerts}
                onCheckedChange={updateSecurity('loginAlerts')}
              />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Auto Session Timeout</Label>
                <p className="tw-text-xs tw-text-muted-foreground">Auto logout after inactivity</p>
              </div>
              <Switch
                checked={security.sessionTimeout}
                onCheckedChange={updateSecurity('sessionTimeout')}
              />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>
                <Label className="tw-text-sm tw-font-medium">Trust This Device</Label>
                <p className="tw-text-xs tw-text-muted-foreground">Remember this device</p>
              </div>
              <Switch
                checked={security.deviceTrust}
                onCheckedChange={updateSecurity('deviceTrust')}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid layout for settings with multiple related sections displayed side by side.',
      },
    },
  },
};
