import type { Meta, StoryObj } from '@storybook/react-vite';
import { LUCIDE_ICON_NAMES, LucideIcon } from '@/components/basics/lucide-icon.component';

const meta: Meta<typeof LucideIcon> = {
  title: 'Basics/LucideIcon',
  component: LucideIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Experimental.** Renders one of a curated set of lucide icons by its kebab-case name. The icon
strokes with the current text colour, so it follows the theme and the state of its surroundings.
A name outside the curated set renders nothing.
        `,
      },
    },
  },
  argTypes: {
    name: { control: 'select', options: LUCIDE_ICON_NAMES },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof LucideIcon>;

export const KnownName: Story = {
  args: { name: 'search' },
};

export const UnknownName: Story = {
  args: { name: 'not-a-real-icon' },
  parameters: {
    docs: {
      description: {
        story: 'A name outside the curated set renders nothing.',
      },
    },
  },
};

export const ClassNameOverride: Story = {
  args: { name: 'book', className: 'tw:h-8 tw:w-8 tw:text-primary' },
  parameters: {
    docs: {
      description: {
        story: '`className` is appended to the default 16px size, so it can resize or recolour.',
      },
    },
  },
};

export const AllIcons: Story = {
  render: () => (
    <div className="tw:grid tw:grid-cols-4 tw:gap-4">
      {LUCIDE_ICON_NAMES.map((name) => (
        <div key={name} className="tw:flex tw:items-center tw:gap-2">
          <LucideIcon name={name} />
          <span className="tw:text-sm">{name}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Every icon in the curated set, with its name.',
      },
    },
  },
};
