import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OtherSetting } from './other-setting.component';

// Records the props OtherSetting hands the shared renderer; what Setting does with them is covered
// in setting.component.test.tsx.
const settingStub = vi.hoisted(() =>
  vi.fn<(props: { readOnly?: boolean }) => undefined>(() => undefined),
);
vi.mock('./setting.component', () => ({ Setting: settingStub }));
vi.mock('@renderer/hooks/papi-hooks/use-setting.hook', () => ({
  useSetting: vi.fn(() => [30, vi.fn(), vi.fn(), false]),
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { validateSetting: vi.fn() },
}));

const renderOtherSetting = (props: { readOnly?: boolean }) =>
  render(
    <OtherSetting
      settingKey="platform.requestTimeout"
      label="Request timeout"
      defaultSetting={30}
      {...props}
    />,
  );

describe('OtherSetting', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('passes readOnly on to the setting editor', () => {
    renderOtherSetting({ readOnly: true });

    expect(settingStub.mock.lastCall?.[0].readOnly).toBe(true);
  });

  it('leaves the setting editable when readOnly is not passed', () => {
    renderOtherSetting({});

    expect(settingStub.mock.lastCall?.[0].readOnly).toBeFalsy();
  });
});
