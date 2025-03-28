import { SettingsSidebarContentSearch } from '@/components/advanced/settings-components/settings-sidebar-content-search.component';
import { SelectedSettingsSidebarItem } from '@/components/advanced/settings-components/settings-sidebar.component';
import { useState } from 'react';

export function SettingSidebarContentSearchExamples() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSidebarItem, setSelectedSidebarItem] = useState<SelectedSettingsSidebarItem>({
    label: 'A',
    projectId: undefined,
  });

  return (
    <div>
      <SettingsSidebarContentSearch
        buttonPlaceholderText="?? Select a project"
        extensionLabels={{ A: 'Aaaaaa', B: 'Bbbbb', C: 'Ccccccccccccccccccc cccccccccccc' }}
        projectInfo={[
          { projectName: 'a', projectId: '1' },
          { projectName: 'b', projectId: '2' },
          { projectName: 'c', projectId: '3' },
        ]}
        selectedSidebarItem={selectedSidebarItem}
        projectsSidebarGroupLabel="Projects Settings"
        extensionsSidebarGroupLabel="General Settings"
        handleSelectSidebarItem={(key: string, projId?: string) => {
          setSelectedSidebarItem({ label: key, projectId: projId });
          console.log('Selected:', key, projId);
        }}
        searchValue={searchQuery}
        onSearch={(query) => {
          setSearchQuery(query);
          console.log('Searching for:', query);
        }}
      >
        <div>This is where related settings entries should be rendered</div>
      </SettingsSidebarContentSearch>
    </div>
  );
}

export default SettingSidebarContentSearchExamples;
