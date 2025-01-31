import SettingsSidebarContentSearch from '@/components/advanced/settings-components/settings-sidebar-content-search.component';
import { useState } from 'react';

export default function SettingSidebarContentSearchExamples() {
  const [searchQuery, setSearchQuery] = useState<string>('');

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
        searchValue={searchQuery}
        onSearch={(query) => {
          setSearchQuery(query);
          console.log('Searching for:', query);
        }}
      />
    </div>
  );
}
