import type { Meta, StoryObj } from '@storybook/react-vite';
import SmartLabel from '@/components/basics/smart-label.component';
import { Button } from '@/components/shadcn-ui/button';
import { Badge } from '@/components/shadcn-ui/badge';
import { ExternalLink, Star, User } from 'lucide-react';

const meta: Meta<typeof SmartLabel> = {
  title: 'Basics/SmartLabel',
  component: SmartLabel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A flexible label component that can create labels with plain text, transformed text, or complex React elements.

This component provides three ways to render labels:
1. **Default**: Direct display of the item string
2. **Text transformation**: Use \`createLabel\` to transform the item string
3. **Complex content**: Use \`createComplexLabel\` to return React elements

Perfect for dynamic labeling scenarios where the label content depends on the data.
        `,
      },
    },
  },
  argTypes: {
    item: {
      control: 'text',
      description: 'The base item string to create a label from',
    },
    createLabel: {
      control: false,
      description: 'Function to transform the item string into a label string',
    },
    createComplexLabel: {
      control: false,
      description: 'Function to transform the item string into React elements',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: 'Simple Label',
  },
};

export const WithTextTransformation: Story = {
  args: {
    item: 'john.doe@example.com',
    createLabel: (item: string) => `User: ${item.split('@')[0]}`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Using createLabel to transform the email into a formatted username label.',
      },
    },
  },
};

export const WithComplexContent: Story = {
  args: {
    item: 'external-link',
    createComplexLabel: (item: string) => (
      <span className="tw-flex tw-items-center tw-gap-2">
        <ExternalLink className="tw-h-4 tw-w-4" />
        {item.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
      </span>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Using createComplexLabel to render an icon with formatted text.',
      },
    },
  },
};

export const UserProfile: Story = {
  args: {
    item: 'john_doe_admin',
    createComplexLabel: (item: string) => {
      const [firstName, lastName, role] = item.split('_');
      return (
        <span className="tw-flex tw-items-center tw-gap-2">
          <User className="tw-h-4 tw-w-4" />
          <span>
            {firstName} {lastName}
          </span>
          <Badge variant="secondary" className="tw-text-xs">
            {role}
          </Badge>
        </span>
      );
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Creating a user profile label with icon, formatted name, and role badge.',
      },
    },
  },
};

export const Rating: Story = {
  args: {
    item: '4.5',
    createComplexLabel: (item: string) => {
      const rating = parseFloat(item);
      const stars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;

      return (
        <span className="tw-flex tw-items-center tw-gap-1">
          <span className="tw-text-sm tw-font-medium">{rating}</span>
          <div className="tw-flex">
            {[...Array(stars)].map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Star key={i} className="tw-h-4 tw-w-4 tw-fill-yellow-400 tw-text-yellow-400" />
            ))}
            {hasHalfStar && (
              <Star className="tw-h-4 tw-w-4 tw-fill-yellow-400/50 tw-text-yellow-400" />
            )}
            {[...Array(5 - Math.ceil(rating))].map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Star key={`empty-${i}`} className="tw-h-4 tw-w-4 tw-text-gray-300" />
            ))}
          </div>
        </span>
      );
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Creating a star rating display from a numeric rating value.',
      },
    },
  },
};

export const StatusIndicator: Story = {
  args: {
    item: 'online',
    createComplexLabel: (item: string) => {
      const statusConfig = {
        online: { color: 'tw-bg-green-500', text: 'Online', textColor: 'tw-text-green-700' },
        offline: { color: 'tw-bg-gray-500', text: 'Offline', textColor: 'tw-text-gray-700' },
        away: { color: 'tw-bg-yellow-500', text: 'Away', textColor: 'tw-text-yellow-700' },
        busy: { color: 'tw-bg-red-500', text: 'Busy', textColor: 'tw-text-red-700' },
      };

      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const config = statusConfig[item as keyof typeof statusConfig] || statusConfig.offline;

      return (
        <span className="tw-flex tw-items-center tw-gap-2">
          <div className={`tw-h-2 tw-w-2 tw-rounded-full ${config.color}`} />
          <span className={`tw-text-sm tw-font-medium ${config.textColor}`}>{config.text}</span>
        </span>
      );
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Creating a status indicator with colored dot and text.',
      },
    },
  },
};

export const FileType: Story = {
  args: {
    item: 'document.pdf',
    createComplexLabel: (item: string) => {
      const extension = item.split('.').pop()?.toLowerCase();
      const fileName = item.split('.').slice(0, -1).join('.');

      const typeConfig = {
        pdf: { color: 'tw-bg-red-100 tw-text-red-800', label: 'PDF' },
        doc: { color: 'tw-bg-blue-100 tw-text-blue-800', label: 'DOC' },
        docx: { color: 'tw-bg-blue-100 tw-text-blue-800', label: 'DOCX' },
        txt: { color: 'tw-bg-gray-100 tw-text-gray-800', label: 'TXT' },
        jpg: { color: 'tw-bg-green-100 tw-text-green-800', label: 'JPG' },
        png: { color: 'tw-bg-green-100 tw-text-green-800', label: 'PNG' },
      };

      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const config = typeConfig[extension as keyof typeof typeConfig] || {
        color: 'tw-bg-gray-100 tw-text-gray-800',
        label: extension?.toUpperCase() || 'FILE',
      };

      return (
        <span className="tw-flex tw-items-center tw-gap-2">
          <span className="tw-truncate tw-text-sm">{fileName}</span>
          <Badge variant="outline" className={config.color}>
            {config.label}
          </Badge>
        </span>
      );
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Creating a file label with name and type indicator.',
      },
    },
  },
};

export const ClickableLabel: Story = {
  args: {
    item: 'https://example.com',
    createComplexLabel: (item: string) => (
      <Button
        variant="link"
        className="tw-h-auto tw-p-0 tw-text-left"
        onClick={() => window.open(item, '_blank')}
      >
        <span className="tw-flex tw-items-center tw-gap-1">
          {item}
          <ExternalLink className="tw-h-3 tw-w-3" />
        </span>
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Creating a clickable label that opens a link.',
      },
    },
  },
};

export const MultipleLabels: Story = {
  render: () => {
    const items = ['john.doe@example.com', 'jane.smith@example.com', 'admin@example.com'];

    return (
      <div className="tw-space-y-2">
        <h4 className="tw-font-medium">User List</h4>
        {items.map((item) => (
          <div key={item} className="tw-flex tw-items-center tw-gap-2">
            <SmartLabel
              item={item}
              createComplexLabel={(email: string) => {
                const [username, domain] = email.split('@');
                const isAdmin = username.includes('admin');

                return (
                  <span className="tw-flex tw-items-center tw-gap-2">
                    <User
                      className={`tw-h-4 tw-w-4 ${isAdmin ? 'tw-text-red-500' : 'tw-text-blue-500'}`}
                    />
                    <span>{username}</span>
                    <span className="tw-text-xs tw-text-muted-foreground">@{domain}</span>
                    {isAdmin && (
                      <Badge variant="destructive" className="tw-text-xs">
                        Admin
                      </Badge>
                    )}
                  </span>
                );
              }}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing multiple SmartLabels in a list with different formatting.',
      },
    },
  },
};

export const PriorityTransformation: Story = {
  args: {
    item: 'high',
    createLabel: (item: string) => {
      const priorities = {
        low: '🟢 Low Priority',
        medium: '🟡 Medium Priority',
        high: '🔴 High Priority',
        urgent: '🚨 Urgent Priority',
      };
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return priorities[item as keyof typeof priorities] || `❓ ${item} Priority`;
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Using createLabel to transform priority levels into formatted text with emojis.',
      },
    },
  },
};
