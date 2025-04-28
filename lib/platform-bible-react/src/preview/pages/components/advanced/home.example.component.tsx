import { HomeDialog } from '@/components/advanced/filterable-resource-list/home.component';

const projectsAndResources = [
  {
    id: '1',
    isEditable: false,
    fullName: 'Resource 1',
    name: 'Res1',
    language: 'myLanguage',
    isResource: true,
  },
  {
    id: '2',
    isEditable: false,
    fullName: 'Resource 2',
    name: 'Res2',
    language: 'English',
    isResource: true,
  },
  {
    id: '13',
    isEditable: true,
    fullName: 'Project 4',
    name: 'Pr4',
    language: '2ndLanguage',
  },
  {
    id: '14',
    isEditable: false,
    fullName: 'Project 3',
    name: 'Pr3',
    language: '2ndLanguage',
  },
  {
    id: '25',
    isEditable: false,
    fullName: 'Project 5',
    name: 'Pr5',
    language: 'German',
    isResource: true,
  },
];

export function HomeExample() {
  return <HomeDialog staticProjectResourceList={projectsAndResources}></HomeDialog>;
}

export default HomeExample;
