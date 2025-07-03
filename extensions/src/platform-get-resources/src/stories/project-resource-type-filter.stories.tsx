import type { Meta, StoryObj } from '@storybook/react';
import {} from 'platform-bible-react';

import ProjectResourceFilter, {
  ProjectResourceFilterProps,
} from '../projectResourceFilter.component';
import { Ear, Earth, Rss } from 'lucide-react';
import { ProjectType } from '../types/project-type';

import { ReactElement } from 'react';

const types: ProjectType[] = [
  {
    key: 'project',
    localizedName: 'Earth',
    icon: Earth,
    actions: [],
  },
  {
    key: 'resource',
    localizedName: 'Radio-signal',
    icon: Rss,
    actions: [],
  },
  {
    key: 'dictionary',
    localizedName: 'Audio',
    icon: Ear,
    actions: [],
  },
];

function ProjectResourceFilterDecorator(
  Story: (update?: { args: Partial<ProjectResourceFilterProps> }) => ReactElement,
) {
  return (
    <Story
      args={{
        types,
        onChange: () => {},
        variant: 'ghost',
      }}
    />
  );
}

const meta: Meta<typeof ProjectResourceFilter> = {
  title: 'Bundled Extensions/platform-get-resources/ProjectResourceTypeFilter',
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
