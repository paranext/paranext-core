import SettingsSidebarContentSearch from '@/components/advanced/settings-components/settings-sidebar-content-search.component';

export default function SettingSidebarContentSearchExamples() {
  return (
    <div>
      <SettingsSidebarContentSearch
        buttonPlaceholderText="?? Select a project"
        extensionLabels={['A', 'B', 'C']}
        projectInfo={[
          { projectName: 'a', projectId: '1' },
          { projectName: 'b', projectId: '2' },
          { projectName: 'c', projectId: '3' },
        ]}
        selectedSidebarItem={{ label: '', projectId: '' }}
        projectsSidebarGroupLabel=""
        extensionsSidebarGroupLabel=""
        handleSelectSidebarItem={(key: string, projId?: string) =>
          console.log('Selected:', key, projId)
        }
        onSearch={(query) => console.log('Searching for:', query)}
      />
    </div>
  );
}
