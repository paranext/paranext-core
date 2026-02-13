import type { Meta, StoryObj } from '@storybook/react';

import { ReactElement } from 'react';
import { BookOpen, ScrollText } from 'lucide-react';
import ProjectResourceFilter, {
  FilterOption,
  ProjectResourceFilterProps,
} from '../projectResourceFilter.component';

const options: FilterOption[] = [
  {
    key: 'paratextProject',
    label: 'Paratext Projects',
    icon: ScrollText,
  },
  {
    key: 'resource',
    label: 'Resources',
    icon: BookOpen,
  },
];

function ProjectResourceFilterDecorator(
  Story: (update?: { args: Partial<ProjectResourceFilterProps> }) => ReactElement,
) {
  return (
    <Story
      args={{
        options,
        onChange: () => {},
        localizedAllText: 'All',
      }}
    />
  );
}

const meta: Meta<typeof ProjectResourceFilter> = {
  title: 'Bundled Extensions/platform-get-resources/ProjectResourceFilter',
  component: ProjectResourceFilter,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [ProjectResourceFilterDecorator],
};
export default meta;

type Story = StoryObj<typeof ProjectResourceFilter>;

export const Default: Story = {
  args: {},
};
