import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useIsProjectAutoSyncBlocked } from '@renderer/hooks/use-is-project-auto-sync-blocked.hook';
import { ProjectOrOtherSettingsList } from './project-or-other-settings-list.component';

// The hook under wiring test — controlled per test to simulate a blocked / unblocked project.
vi.mock('@renderer/hooks/use-is-project-auto-sync-blocked.hook', () => ({
  useIsProjectAutoSyncBlocked: vi.fn(),
}));

// Stub the leaf setting components to capture the `disabled` prop the list drives, without dragging
// in useProjectSetting / useData / localizationService. The list is the unit under test: it consumes
// the hook and disables each setting editor. The sync-blocked NOTICE itself moved up to render once
// at the settings-tab level (SettingsTab, see settings-tab.component.test.tsx) — a project can have
// several of these lists (one per settings group), which used to each stack an identical banner
// (PT-4214). The leaf forwarding of `disabled` into platform-bible-react's Input/Switch is a direct,
// type-checked prop pass (see setting.component.test.tsx).
vi.mock('./project-setting.component', () => ({
  ProjectSetting: ({ label, disabled }: { label: string; disabled?: boolean }) => (
    <div data-testid="project-setting" data-disabled={String(Boolean(disabled))}>
      {label}
    </div>
  ),
}));
vi.mock('./other-setting.component', () => ({
  OtherSetting: ({ label }: { label: string }) => <div data-testid="other-setting">{label}</div>,
}));

// Minimal Localized<ProjectSettingProperties>: one setting entry with a label the stub renders.
const PROJECT_SETTING_PROPERTIES = {
  'testExtension.aSetting': {
    label: 'A Project Setting',
    description: 'desc',
    default: 'value',
  },
};

describe('ProjectOrOtherSettingsList sync-block disabled wiring', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(false);
  });

  it('disables the setting editors when the project is sync-blocked', () => {
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(true);
    render(
      <ProjectOrOtherSettingsList
        settingProperties={PROJECT_SETTING_PROPERTIES}
        projectId="projA"
        groupLabel="Group"
      />,
    );

    expect(useIsProjectAutoSyncBlocked).toHaveBeenCalledWith('projA');
    expect(screen.getByTestId('project-setting')).toHaveAttribute('data-disabled', 'true');
  });

  it('leaves the setting editors enabled when the project is not blocked', () => {
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(false);
    render(
      <ProjectOrOtherSettingsList
        settingProperties={PROJECT_SETTING_PROPERTIES}
        projectId="projA"
        groupLabel="Group"
      />,
    );

    expect(screen.getByTestId('project-setting')).toHaveAttribute('data-disabled', 'false');
  });

  it('never renders a project-only notice or disables editors for a user/general settings list (no projectId)', () => {
    // The hook treats an undefined project id as never blocked; asserted here at the list level.
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(false);
    render(
      <ProjectOrOtherSettingsList
        settingProperties={PROJECT_SETTING_PROPERTIES}
        groupLabel="Group"
      />,
    );

    expect(useIsProjectAutoSyncBlocked).toHaveBeenCalledWith(undefined);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByTestId('other-setting')).toBeInTheDocument();
  });

  it('never renders a notice itself, regardless of block state (moved to the settings-tab level)', () => {
    vi.mocked(useIsProjectAutoSyncBlocked).mockReturnValue(true);
    render(
      <ProjectOrOtherSettingsList
        settingProperties={PROJECT_SETTING_PROPERTIES}
        projectId="projA"
        groupLabel="Group"
      />,
    );

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
