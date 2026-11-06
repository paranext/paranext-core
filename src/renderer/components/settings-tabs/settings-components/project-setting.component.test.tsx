import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProjectSetting } from './project-setting.component';

// Records the props ProjectSetting hands the shared renderer; what Setting does with them is covered
// in setting.component.test.tsx.
const settingStub = vi.hoisted(() =>
  vi.fn<(props: { disabled?: boolean; readOnly?: boolean }) => undefined>(() => undefined),
);
vi.mock('./setting.component', () => ({ Setting: settingStub }));
vi.mock('@renderer/hooks/papi-hooks/use-project-setting.hook', () => ({
  useProjectSetting: vi.fn(() => ['a b c', vi.fn(), vi.fn(), false]),
}));
vi.mock('@shared/services/project-settings.service', () => ({
  projectSettingsService: { isValid: vi.fn() },
}));

const renderProjectSetting = (props: { disabled?: boolean; readOnly?: boolean }) =>
  render(
    <ProjectSetting
      settingKey="platformScripture.validCharacters"
      label="Valid characters"
      defaultSetting=""
      projectId="projA"
      {...props}
    />,
  );

describe('ProjectSetting', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('passes readOnly and disabled on to the setting editor', () => {
    renderProjectSetting({ disabled: true, readOnly: true });

    expect(settingStub.mock.lastCall?.[0]).toMatchObject({ disabled: true, readOnly: true });
  });

  it('leaves the setting editable when neither is passed', () => {
    renderProjectSetting({});

    expect(settingStub.mock.lastCall?.[0].disabled).toBeFalsy();
    expect(settingStub.mock.lastCall?.[0].readOnly).toBeFalsy();
  });
});
