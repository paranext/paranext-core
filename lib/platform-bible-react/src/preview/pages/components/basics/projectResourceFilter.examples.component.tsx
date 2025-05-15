import ProjectResourceFilter from '@/components/basics/projectResourceFilter.component';
import { Ear, Earth, Rss } from 'lucide-react';
import { ProjectType } from '@/components/advanced/filterable-resource-list/project-type';

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

export function ProjectResourceFilterExamples() {
  return (
    <>
      <ProjectResourceFilter types={types} onChange={() => {}} />
      <ProjectResourceFilter types={types} onChange={() => {}} variant="ghost" />
    </>
  );
}
