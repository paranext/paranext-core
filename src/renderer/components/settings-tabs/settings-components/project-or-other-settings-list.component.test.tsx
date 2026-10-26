import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProjectSettingLocks } from '@renderer/hooks/use-project-setting-locks.hook';
import { ProjectOrOtherSettingsList } from './project-or-other-settings-list.component';
import { SETTING_LOCK_REASON_KEYS } from './setting-lock.util';

// Stub the leaf setting components to capture the `disabled` prop the list forwards, without dragging
// in useProjectSetting / useData / localizationService. The list takes `disabled` as a PROP: the
// parent SettingsTab computes it once from the auto-sync-blocking store and passes it down, and also
// renders the single sync-blocked NOTICE above all of a project's groups (see
// settings-tab.component.test.tsx). A project can have several of these lists (one per settings
// group), so a per-list store subscription would stack listeners and duplicate the banner.
// This unit forwards `disabled` to each project setting and each setting's `isReadOnly` as
// `readOnly`; the leaf forwarding into platform-bible-react's Input/Switch is covered in
// setting.component.test.tsx.
type OtherSettingStubProps = { label: string; readOnly?: boolean; lockReason?: string };
type ProjectSettingStubProps = OtherSettingStubProps & { disabled?: boolean };
vi.mock('./project-setting.component', () => ({
  ProjectSetting: ({ label, disabled, readOnly, lockReason }: ProjectSettingStubProps) => (
    <div
      data-testid="project-setting"
      data-disabled={String(Boolean(disabled))}
      data-read-only={String(Boolean(readOnly))}
      data-lock-reason={lockReason ?? ''}
    >
      {label}
    </div>
  ),
}));
// Each reason "localizes" to its own key, so a test can tell which reason a setting was given.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: (keys: string[]) => [Object.fromEntries(keys.map((key) => [key, key]))],
}));
vi.mock('./other-setting.component', () => ({
  OtherSetting: ({ label, readOnly, lockReason }: OtherSettingStubProps) => (
    <div
      data-testid="other-setting"
      data-read-only={String(Boolean(readOnly))}
      data-lock-reason={lockReason ?? ''}
    >
      {label}
    </div>
  ),
}));

const UNLOCKED: ProjectSettingLocks = {
  isPublished: false,
  isRegistered: false,
  isCurrentUserAdministrator: true,
};

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
        projectSettingLocks={UNLOCKED}
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

describe('ProjectOrOtherSettingsList isReadOnly', () => {
  const PROPERTIES_WITH_READ_ONLY = {
    'testExtension.readOnlySetting': { label: 'Read-only', default: '', isReadOnly: true },
    'testExtension.editableSetting': { label: 'Editable', default: '' },
  };

  it('makes only the project settings contributed with isReadOnly read-only', () => {
    render(
      <ProjectOrOtherSettingsList
        settingProperties={PROPERTIES_WITH_READ_ONLY}
        projectId="projA"
        groupLabel="Group"
        projectSettingLocks={UNLOCKED}
      />,
    );

    expect(screen.getByText('Read-only')).toHaveAttribute('data-read-only', 'true');
    // Contributed read-only needs no explaining, so it carries no reason.
    expect(screen.getByText('Read-only')).toHaveAttribute('data-lock-reason', '');
    expect(screen.getByText('Editable')).toHaveAttribute('data-read-only', 'false');
    // Read-only is separate from the sync block, which still disables nothing here.
    expect(screen.getByText('Read-only')).toHaveAttribute('data-disabled', 'false');
  });

  it('makes only the user settings contributed with isReadOnly read-only', () => {
    render(
      <ProjectOrOtherSettingsList
        settingProperties={PROPERTIES_WITH_READ_ONLY}
        groupLabel="Group"
      />,
    );

    expect(screen.getByText('Read-only')).toHaveAttribute('data-read-only', 'true');
    // Contributed read-only needs no explaining, so it carries no reason.
    expect(screen.getByText('Read-only')).toHaveAttribute('data-lock-reason', '');
    expect(screen.getByText('Editable')).toHaveAttribute('data-read-only', 'false');
  });
});

describe('ProjectOrOtherSettingsList project locks', () => {
  const PLATFORM_PROPERTIES = {
    'platform.name': { label: 'Short name', default: '' },
    'platform.language': { label: 'Language', default: '' },
  };

  const renderWithLocks = (projectSettingLocks: ProjectSettingLocks | undefined) =>
    render(
      <ProjectOrOtherSettingsList
        settingProperties={PLATFORM_PROPERTIES}
        projectId="projA"
        groupLabel="Group"
        projectSettingLocks={projectSettingLocks}
      />,
    );

  it("keeps every project setting read-only, with no reason, until the project's locks load", () => {
    renderWithLocks(undefined);

    ['Short name', 'Language'].forEach((label) => {
      expect(screen.getByText(label)).toHaveAttribute('data-read-only', 'true');
      expect(screen.getByText(label)).toHaveAttribute('data-lock-reason', '');
    });
  });

  it("makes every setting of a published project read-only, leaving the reason to the tab's notice", () => {
    renderWithLocks({ ...UNLOCKED, isPublished: true });

    ['Short name', 'Language'].forEach((label) => {
      expect(screen.getByText(label)).toHaveAttribute('data-read-only', 'true');
      expect(screen.getByText(label)).toHaveAttribute('data-lock-reason', '');
    });
  });

  it("makes a registered project's name read-only and leaves its language editable", () => {
    renderWithLocks({ ...UNLOCKED, isRegistered: true });

    expect(screen.getByText('Short name')).toHaveAttribute(
      'data-lock-reason',
      SETTING_LOCK_REASON_KEYS.projectRegistered,
    );
    expect(screen.getByText('Language')).toHaveAttribute('data-read-only', 'false');
  });

  it('makes the language read-only for a user who is not the project administrator', () => {
    renderWithLocks({ ...UNLOCKED, isCurrentUserAdministrator: false });

    expect(screen.getByText('Language')).toHaveAttribute(
      'data-lock-reason',
      SETTING_LOCK_REASON_KEYS.notAdministrator,
    );
    expect(screen.getByText('Short name')).toHaveAttribute('data-read-only', 'false');
  });
});
