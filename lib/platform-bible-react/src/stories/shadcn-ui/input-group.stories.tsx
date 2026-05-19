import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search, X, Eye, EyeOff, Mail, Lock, DollarSign, AtSign } from 'lucide-react';
import { useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/shadcn-ui/input-group';

const meta: Meta<typeof InputGroup> = {
  title: 'Shadcn/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A composable input group that combines an input with inline or block addons such as icons, buttons, and labels.\n\nShadcn docs: [Input Group](https://ui.shadcn.com/docs/components/input-group)',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: () => (
    <InputGroup className="tw:max-w-sm">
      <InputGroupInput placeholder="Enter text..." />
    </InputGroup>
  ),
};

export const WithInlineStartAddon: Story = {
  render: () => (
    <InputGroup className="tw:max-w-sm">
      <InputGroupAddon align="inline-start">
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An icon addon placed before the input using `align="inline-start"`.',
      },
    },
  },
};

export const WithInlineEndAddon: Story = {
  render: () => (
    <InputGroup className="tw:max-w-sm">
      <InputGroupInput placeholder="Enter email..." />
      <InputGroupAddon align="inline-end">
        <Mail />
      </InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An icon addon placed after the input using `align="inline-end"`.',
      },
    },
  },
};

export const WithBothInlineAddons: Story = {
  render: () => (
    <InputGroup className="tw:max-w-sm">
      <InputGroupAddon align="inline-start">
        <AtSign />
      </InputGroupAddon>
      <InputGroupInput placeholder="username" />
      <InputGroupAddon align="inline-end">
        <span className="tw:text-xs tw:text-muted-foreground">.example.com</span>
      </InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Addons on both sides of the input.',
      },
    },
  },
};

export const WithBlockStartAddon: Story = {
  render: () => (
    <InputGroup className="tw:max-w-sm">
      <InputGroupAddon align="block-start">
        <Mail className="tw:size-3.5" />
        Email address
      </InputGroupAddon>
      <InputGroupInput placeholder="you@example.com" />
    </InputGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A label addon placed above the input using `align="block-start"`.',
      },
    },
  },
};

export const WithBlockEndAddon: Story = {
  render: () => (
    <InputGroup className="tw:max-w-sm">
      <InputGroupInput placeholder="Enter username..." />
      <InputGroupAddon align="block-end">
        <span className="tw:text-xs">Must be 3–20 characters</span>
      </InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A helper text addon placed below the input using `align="block-end"`.',
      },
    },
  },
};

export const WithButton: Story = {
  render: () => (
    <InputGroup className="tw:max-w-sm">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>
          <Search />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An `InputGroupButton` inside an addon — a ghost button sized to fit the group.',
      },
    },
  },
};

export const SearchWithClear: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <InputGroup className="tw:max-w-sm">
        <InputGroupAddon align="inline-start">
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton onClick={() => setValue('')} aria-label="Clear search">
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A practical search field with a clear button that appears when the field has a value.',
      },
    },
  },
};

export const PasswordToggle: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <InputGroup className="tw:max-w-sm">
        <InputGroupAddon align="inline-start">
          <Lock />
        </InputGroupAddon>
        <InputGroupInput
          type={visible ? 'text' : 'password'}
          placeholder="Password"
          autoComplete="current-password"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <EyeOff /> : <Eye />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A password field with a toggle button to show or hide the value.',
      },
    },
  },
};

export const WithTextPrefix: Story = {
  render: () => (
    <InputGroup className="tw:max-w-sm">
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <DollarSign className="tw:size-4" />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput type="number" placeholder="0.00" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '`InputGroupText` used for non-interactive text labels alongside the input.',
      },
    },
  },
};

export const WithTextarea: Story = {
  render: () => (
    <InputGroup className="tw:max-w-sm">
      <InputGroupAddon align="block-start">
        <span>Message</span>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Write your message..." rows={4} />
    </InputGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '`InputGroupTextarea` for multi-line input inside the group.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="tw:flex tw:max-w-sm tw:flex-col tw:gap-4">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Disabled input" disabled />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Mail />
        </InputGroupAddon>
        <InputGroupInput placeholder="Also disabled" disabled />
        <InputGroupAddon align="inline-end">
          <InputGroupButton disabled>
            <X />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled state — the entire group dims and prevents interaction.',
      },
    },
  },
};

export const WithValidationError: Story = {
  render: () => (
    <InputGroup className="tw:max-w-sm">
      <InputGroupAddon align="inline-start">
        <Mail />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="you@example.com"
        defaultValue="not-an-email"
        aria-invalid="true"
      />
    </InputGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Setting `aria-invalid="true"` on the input triggers the destructive ring on the group border.',
      },
    },
  },
};

export const ButtonSizes: Story = {
  render: () => (
    <div className="tw:flex tw:max-w-lg tw:flex-col tw:gap-4">
      <div className="tw:flex tw:items-center tw:gap-2 tw:text-sm">
        <span className="tw:w-20 tw:text-muted-foreground">xs (default)</span>
        <InputGroup className="tw:flex-1">
          <InputGroupInput placeholder="xs button" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="xs">
              <Search />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="tw:flex tw:items-center tw:gap-2 tw:text-sm">
        <span className="tw:w-20 tw:text-muted-foreground">icon-xs</span>
        <InputGroup className="tw:flex-1">
          <InputGroupInput placeholder="icon-xs button" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs">
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="tw:flex tw:items-center tw:gap-2 tw:text-sm">
        <span className="tw:w-20 tw:text-muted-foreground">icon-sm</span>
        <InputGroup className="tw:flex-1">
          <InputGroupInput placeholder="icon-sm button" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-sm">
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available `InputGroupButton` size variants.',
      },
    },
  },
};

export const AddonAlignmentVariants: Story = {
  render: () => (
    <div className="tw:flex tw:max-w-sm tw:flex-col tw:gap-6">
      <div>
        <p className="tw:mb-1 tw:text-xs tw:text-muted-foreground">inline-start</p>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="inline-start addon" />
        </InputGroup>
      </div>
      <div>
        <p className="tw:mb-1 tw:text-xs tw:text-muted-foreground">inline-end</p>
        <InputGroup>
          <InputGroupInput placeholder="inline-end addon" />
          <InputGroupAddon align="inline-end">
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div>
        <p className="tw:mb-1 tw:text-xs tw:text-muted-foreground">block-start</p>
        <InputGroup>
          <InputGroupAddon align="block-start">Label above</InputGroupAddon>
          <InputGroupInput placeholder="block-start addon" />
        </InputGroup>
      </div>
      <div>
        <p className="tw:mb-1 tw:text-xs tw:text-muted-foreground">block-end</p>
        <InputGroup>
          <InputGroupInput placeholder="block-end addon" />
          <InputGroupAddon align="block-end">Helper text below</InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All four `InputGroupAddon` alignment variants side by side.',
      },
    },
  },
};
