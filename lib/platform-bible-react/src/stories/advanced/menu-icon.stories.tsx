import type { Meta, StoryObj } from '@storybook/react-vite';
import MenuItemIcon from '@/components/advanced/menus/menu-icon.component';

const meta: Meta<typeof MenuItemIcon> = {
  title: 'Advanced/Menu/MenuItemIcon',
  component: MenuItemIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A utility component for displaying icons in menu items.

This component provides:
- Icon display with proper sizing and positioning
- Support for leading and trailing icon positions
- Accessibility with alt text based on menu label
- Consistent styling across menu implementations

Used internally by menu components to render icons consistently.
        `,
      },
    },
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'URL or path to the icon image',
    },
    menuLabel: {
      control: 'text',
      description: 'Label of the menu item for accessibility',
    },
    leading: {
      control: 'boolean',
      description: 'Whether the icon appears before (true) or after (false) the text',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample icon data URLs for demonstration
const sampleIcon =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMzMzMzMzIi8+Cjwvc3ZnPgo=';
const homeIcon =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDIwVjE0SDEwVjIwWk0xNCAyMFYxNEgxOFYyMEgxNFpNMyAxMkwxMiAzTDIxIDEySDE5VjIxSDVWMTJIM1oiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==';
const settingsIcon =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDhBNCA0IDAgMSAwIDEyIDE2QTQgNCAwIDAgMCAxMiA4Wk0xMiAxNEEyIDIgMCAxIDEgMTIgMTBBMiAyIDAgMCAxIDEyIDE0WiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMjEuNSAxMS41TDIwLjUgMTFMMjAuNSAxMEwyMS41IDguNUwyMiA3TDIwLjUgNi41TDIwIDVMMTguNSA0LjVMMTcgNEwxNi41IDVMMTYgNi41TDE1IDdMMTQuNSA4LjVMMTUgMTBMMTYgMTFMMTYuNSAxMS41TDE3IDEyTDE4LjUgMTIuNUwyMCAxM0wyMC41IDEyTDIxLjUgMTEuNVoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==';

export const Default: Story = {
  args: {
    icon: sampleIcon,
    menuLabel: 'Sample Menu Item',
    leading: true,
  },
};

export const LeadingIcon: Story = {
  args: {
    icon: homeIcon,
    menuLabel: 'Home',
    leading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon displayed before the menu text (leading position).',
      },
    },
  },
};

export const TrailingIcon: Story = {
  args: {
    icon: settingsIcon,
    menuLabel: 'Settings',
    leading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon displayed after the menu text (trailing position).',
      },
    },
  },
};

export const NoIcon: Story = {
  args: {
    icon: '',
    menuLabel: 'Menu Item Without Icon',
    leading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Component returns undefined when no icon is provided.',
      },
    },
  },
};

export const IconSizeExample: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <h3 className="tw-text-lg tw-font-semibold">Icon Size Demonstration</h3>
      <div className="tw-space-y-2">
        <div className="tw-flex tw-items-center tw-rounded tw-border tw-p-2">
          <MenuItemIcon icon={homeIcon} menuLabel="Home" leading />
          <span className="tw-text-sm">Home (Leading)</span>
        </div>
        <div className="tw-flex tw-items-center tw-rounded tw-border tw-p-2">
          <span className="tw-text-sm">Settings</span>
          <MenuItemIcon icon={settingsIcon} menuLabel="Settings" leading={false} />
        </div>
        <div className="tw-flex tw-items-center tw-rounded tw-border tw-p-2">
          <MenuItemIcon icon={sampleIcon} menuLabel="Star" leading />
          <span className="tw-text-sm">Star (Leading)</span>
        </div>
      </div>
      <p className="tw-text-xs tw-text-muted-foreground">
        Icons are constrained to max 20px (tw-max-h-5 tw-max-w-5) for consistent sizing.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing how icons appear in actual menu-like contexts.',
      },
    },
  },
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <h3 className="tw-text-lg tw-font-semibold">Accessibility Features</h3>
      <div className="tw-space-y-2">
        <div className="tw-flex tw-items-center tw-rounded tw-border tw-p-2">
          <MenuItemIcon icon={homeIcon} menuLabel="Dashboard" leading />
          <span className="tw-text-sm">Dashboard</span>
        </div>
        <div className="tw-flex tw-items-center tw-rounded tw-border tw-p-2">
          <span className="tw-text-sm">User Profile</span>
          <MenuItemIcon icon={settingsIcon} menuLabel="User Profile" leading={false} />
        </div>
      </div>
      <div className="tw-space-y-1 tw-text-xs">
        <p>
          <strong>Alt text:</strong> &quot;Leading icon for Dashboard&quot;
        </p>
        <p>
          <strong>Alt text:</strong> &quot;Trailing icon for User Profile&quot;
        </p>
      </div>
      <p className="tw-text-xs tw-text-muted-foreground">
        Icons include descriptive alt text that indicates position and menu item context.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the accessible alt text generation for screen readers.',
      },
    },
  },
};
