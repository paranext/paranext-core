import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Localized, SettingProperties } from 'platform-bible-utils';
import { useInterfaceMode } from '@renderer/hooks/use-interface-mode.hook';
import { ProjectOrOtherSettingsList } from './project-or-other-settings-list.component';

// Controlled per test so the `hiddenInterfaceModes` filter can be driven through both modes without
// standing up the real `platform.interfaceMode` setting subscription.
vi.mock('@renderer/hooks/use-interface-mode.hook', () => ({
  useInterfaceMode: vi.fn(),
}));

function mockInterfaceMode(mode: 'simple' | 'power') {
  vi.mocked(useInterfaceMode).mockReturnValue([mode, vi.fn()]);
}

// Stub the leaf setting components to capture the `disabled` prop the list forwards, without dragging
// in useProjectSetting / useData / localizationService. The list takes `disabled` as a PROP: the
// parent SettingsTab computes it once from the auto-sync-blocking store and passes it down, and also
// renders the single sync-blocked NOTICE above all of a project's groups (see
// settings-tab.component.test.tsx). A project can have several of these lists (one per settings
// group), so a per-list store subscription would stack listeners and duplicate the banner.
// This unit just forwards `disabled` to each project setting; the leaf forwarding into
// platform-bible-react's Input/Switch is covered in setting.component.test.tsx.
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
    mockInterfaceMode('simple');
  });

  it('forwards disabled to the project setting editors when disabled is passed', () => {
    render(
      <ProjectOrOtherSettingsList
        settingProperties={PROJECT_SETTING_PROPERTIES}
        projectId="projA"
        groupLabel="Group"
        disabled
      />,
    );

    expect(screen.getByTestId('project-setting')).toHaveAttribute('data-disabled', 'true');
  });

  it('leaves the setting editors enabled when disabled is not passed', () => {
    render(
      <ProjectOrOtherSettingsList
        settingProperties={PROJECT_SETTING_PROPERTIES}
        projectId="projA"
        groupLabel="Group"
      />,
    );

    expect(screen.getByTestId('project-setting')).toHaveAttribute('data-disabled', 'false');
  });

  it('renders a user/general settings list (no projectId) without a notice', () => {
    render(
      <ProjectOrOtherSettingsList
        settingProperties={PROJECT_SETTING_PROPERTIES}
        groupLabel="Group"
      />,
    );

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByTestId('other-setting')).toBeInTheDocument();
  });

  it('never renders a notice itself, regardless of disabled (the notice lives at the settings-tab level)', () => {
    render(
      <ProjectOrOtherSettingsList
        settingProperties={PROJECT_SETTING_PROPERTIES}
        projectId="projA"
        groupLabel="Group"
        disabled
      />,
    );

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

// One always-visible setting alongside one that declares itself Power-mode-hidden (the shape
// `platform.syncOnStartup` uses) and one hidden in every mode, so each filter branch is separable.
const MODE_SETTING_PROPERTIES: Localized<SettingProperties> = {
  'testExtension.alwaysShown': { label: 'Always Shown', default: true },
  'testExtension.simpleOnly': {
    label: 'Simple Only',
    default: true,
    hiddenInterfaceModes: ['power'],
  },
  'testExtension.neverShown': { label: 'Never Shown', default: true, isHidden: true },
};

describe('ProjectOrOtherSettingsList interface-mode visibility filtering', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows a setting hidden in power mode while the app is in simple mode', () => {
    mockInterfaceMode('simple');

    render(
      <ProjectOrOtherSettingsList settingProperties={MODE_SETTING_PROPERTIES} groupLabel="Group" />,
    );

    expect(screen.getByText('Simple Only')).toBeInTheDocument();
    expect(screen.getByText('Always Shown')).toBeInTheDocument();
  });

  it('drops a setting hidden in power mode while the app is in power mode', () => {
    mockInterfaceMode('power');

    render(
      <ProjectOrOtherSettingsList settingProperties={MODE_SETTING_PROPERTIES} groupLabel="Group" />,
    );

    expect(screen.queryByText('Simple Only')).not.toBeInTheDocument();
    // The rest of the group is untouched, so the filter isn't just emptying the list.
    expect(screen.getByText('Always Shown')).toBeInTheDocument();
  });

  it('keeps dropping isHidden settings in every mode', () => {
    mockInterfaceMode('simple');

    render(
      <ProjectOrOtherSettingsList settingProperties={MODE_SETTING_PROPERTIES} groupLabel="Group" />,
    );

    expect(screen.queryByText('Never Shown')).not.toBeInTheDocument();
  });
});
