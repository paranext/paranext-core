// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SidebarProvider } from '@/components/shadcn-ui/sidebar';
import {
  SettingsSidebar,
  type ProjectInfo,
  type SettingsSidebarProps,
} from '@/components/advanced/settings-components/settings-sidebar.component';

// Deliberately does NOT mock <ProjectSelector>. Its sibling `settings-sidebar.full-name-adapter`
// suite mocks the selector to inspect the `projects` prop, which is the only way to tell an absent
// full name from a mirrored one. This suite asks the opposite question — what a user actually
// reads on the trigger — so it needs the real component, and a `triggerLabelFormat` regression
// that the prop-level assertion cannot see shows up here as the wrong rendered text.

const requiredSidebarProps: Omit<SettingsSidebarProps, 'projectInfo' | 'selectedSidebarItem'> = {
  extensionLabels: { core: 'Core' },
  handleSelectSidebarItem: vi.fn(),
  extensionsSidebarGroupLabel: 'Extensions',
  projectsSidebarGroupLabel: 'Projects',
  buttonPlaceholderText: 'Select a project',
};

/** Renders with the project selected, since the trigger label is what is under test. */
function renderSidebar(projectInfo: ProjectInfo[]) {
  return render(
    <SidebarProvider>
      <SettingsSidebar
        projectInfo={projectInfo}
        selectedSidebarItem={{
          label: projectInfo[0].projectName,
          projectId: projectInfo[0].projectId,
        }}
        {...requiredSidebarProps}
      />
    </SidebarProvider>,
  );
}

describe('SettingsSidebar — rendered trigger label', () => {
  it('reads short name first, joined to the full name', () => {
    renderSidebar([
      { projectId: 'p1', projectName: 'ESV', projectFullName: 'English Standard Version' },
    ]);

    // One ordered string rather than two `toContain`s: the point is the ORDER, and a
    // long-name-first label contains both names just as happily.
    expect(screen.getByRole('combobox')).toHaveTextContent('ESV - English Standard Version');
  });

  it('shows the short name alone when the project has no full name', () => {
    renderSidebar([{ projectId: 'p1', projectName: 'NOFULL' }]);

    expect(screen.getByRole('combobox')).toHaveTextContent(/^NOFULL$/);
  });

  it('does not repeat a full name that equals the short name', () => {
    renderSidebar([{ projectId: 'p1', projectName: 'WEB', projectFullName: 'WEB' }]);

    expect(screen.getByRole('combobox')).toHaveTextContent(/^WEB$/);
  });
});
