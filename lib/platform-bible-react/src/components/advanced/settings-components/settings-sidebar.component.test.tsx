// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SidebarProvider } from '@/components/shadcn-ui/sidebar';
import {
  SettingsSidebar,
  type ProjectInfo,
  type SettingsSidebarProps,
} from '@/components/advanced/settings-components/settings-sidebar.component';
import { ProjectSelector } from '@/components/advanced/project-selector/project-selector.component';

// The canonical <ProjectSelector> suppresses a `fullName` that is absent OR equal to `shortName`
// (its own de-dup rule — see project-selector.component.tsx), so a project with no full name at
// all renders identically to one whose full name was mirrored from its short name: both collapse
// to a single line. A DOM-level assertion on the rendered row therefore cannot distinguish the two
// states, which is exactly the mirroring bug this adapter must not reintroduce. Mock the selector
// so the test can inspect the `projects` prop the adapter actually produces.
vi.mock('@/components/advanced/project-selector/project-selector.component', () => ({
  ProjectSelector: vi.fn(() => <div data-testid="mock-project-selector" />),
}));

const requiredSidebarProps: Omit<SettingsSidebarProps, 'projectInfo'> = {
  extensionLabels: { core: 'Core' },
  handleSelectSidebarItem: vi.fn(),
  selectedSidebarItem: { label: 'core' },
  extensionsSidebarGroupLabel: 'Extensions',
  projectsSidebarGroupLabel: 'Projects',
  buttonPlaceholderText: 'Select a project',
};

function renderSidebar(projectInfo: ProjectInfo[]) {
  return render(
    <SidebarProvider>
      <SettingsSidebar projectInfo={projectInfo} {...requiredSidebarProps} />
    </SidebarProvider>,
  );
}

describe('SettingsSidebar — project full name adapter', () => {
  beforeEach(() => {
    vi.mocked(ProjectSelector).mockClear();
  });

  it('leaves the full name absent rather than mirroring the short name', () => {
    renderSidebar([{ projectId: 'p1', projectName: 'NOFULL' }]);

    const projectSelectorMock = vi.mocked(ProjectSelector);
    expect(projectSelectorMock).toHaveBeenCalled();
    const { projects } = projectSelectorMock.mock.calls[0][0];
    expect(projects).toEqual([{ id: 'p1', shortName: 'NOFULL', fullName: undefined }]);
  });

  it('passes a distinct full name through unchanged', () => {
    renderSidebar([
      { projectId: 'p1', projectName: 'ESV', projectFullName: 'English Standard Version' },
    ]);

    const projectSelectorMock = vi.mocked(ProjectSelector);
    const { projects } = projectSelectorMock.mock.calls[0][0];
    expect(projects).toEqual([
      { id: 'p1', shortName: 'ESV', fullName: 'English Standard Version' },
    ]);
  });
});
