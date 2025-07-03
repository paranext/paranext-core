import { BookA, BookOpen, ImageIcon, ScrollText } from 'lucide-react';
import { ProjectType, ProjectTypeKey } from './project-type';

export const ProjectTypes: Record<ProjectTypeKey, ProjectType> = {
  project: {
    key: 'project',
    localizedName: 'Projects',
    icon: ScrollText,
    actions: [
      {
        buttonLabel: 'Open',
        condition: () => true,
        action: () => {},
        default: () => true,
      },
      {
        buttonLabel: 'Sync',
        condition: () => true,
        action: () => {},
      },
      {
        buttonLabel: 'Get',
        condition: () => true,
        action: () => {},
      },
    ],
  },
  resource: {
    key: 'resource',
    localizedName: 'Resources',
    icon: BookOpen,
    actions: [
      {
        buttonLabel: 'Open',
        condition: () => true,
        action: () => {},
        default: () => true,
      },
      {
        buttonLabel: 'Remove',
        condition: () => true,
        action: () => {},
      },
    ],
  },
  dictionary: {
    key: 'dictionary',
    localizedName: 'Dictionaries',
    icon: BookA,
    actions: [
      {
        buttonLabel: 'Open',
        condition: () => true,
        action: () => {},
        default: () => true,
      },
      {
        buttonLabel: 'Remove',
        condition: () => true,
        action: () => {},
      },
    ],
  },
  media: {
    key: 'media',
    localizedName: 'Media',
    icon: ImageIcon,
    actions: [
      {
        buttonLabel: 'Open',
        condition: () => true,
        action: () => {},
        default: () => true,
      },
      {
        buttonLabel: 'Remove',
        condition: () => true,
        action: () => {},
      },
    ],
  },
};
